const STORAGE_KEY = "stocklist_storage_key";
const output = document.getElementById("output");
let stocklist;

idbKeyval.get(STORAGE_KEY).then(data => {
    stocklist = data || [];
    console.log('loaded data');
    updateDisplay();
})

document.getElementById("clearBtn").addEventListener("click", async (e) => {
  stocklist = [];
  await updateStorage();
  updateDisplay();
});

document.getElementById("addSized").addEventListener("click", async (e) => {
  const form = document.getElementById("sizedDataEntry");
  const description = form.querySelector("input[type=text]").value;
  if (!description) {
    return;
  }
  const counts = {
    XS: document.getElementById("xs_input").value,
    S: document.getElementById("small_input").value,
    M: document.getElementById("medium_input").value,
    L: document.getElementById("large_input").value,
    XL: document.getElementById("xl_input").value,
    XXL: document.getElementById("xxl_input").value,
    "3XL": document.getElementById("3xl_input").value,
    "4XL": document.getElementById("4xl_input").value
  };

  // remove empties
  for (let [k, v] of Object.entries(counts)) {
    if (v === "" || v === "0") {
      delete counts[k];
    }
  }

  const notes = form.querySelector("textarea").value;
  const lineData = {
    id: await nextIndex(),
    done: false,
    type: "sized",
    description,
    counts,
    notes
  };
  stocklist.push(lineData);
  await updateStorage();
  updateDisplay();
  form.reset();
});

document.getElementById("addUnsized").addEventListener("click", 
  async (e) => {
    const form = document.getElementById("unsizedDataEntry");
    const description = form.querySelector("input[type=text]").value;
    if(!description) return;
    const count = form.querySelector("input[type=number]").value;
    const notes = form.querySelector("textarea").value;
    const lineData = {
      id: await nextIndex(),
      done: false,
      type: "unsized",
      description,
      count,
      notes
  };
  const lineDisplay = getLine(lineData);
  stocklist.push(lineData);
  output.appendChild(lineDisplay);
  await updateStorage();
  form.reset();
});

document.getElementById('doneUnsized').addEventListener('click', () => {
  document.getElementById('addUnsized').click();
  document.getElementById('closeUnsized').click();
});

document.getElementById('doneSized').addEventListener('click', () => {
  document.getElementById('addSized').click();
  document.getElementById('closeSized').click();
});

async function nextIndex(){
    await idbKeyval.update('index', (idx) => (idx || 0) + 1);
    return idbKeyval.get('index');
}

function getLineById(id) {
  return stocklist.filter(x => x.id && x.id === Number(id))[0] || null;
}

function updateStorage(){
    return idbKeyval.set(STORAGE_KEY, stocklist);
}

function updateDisplay() {
  output.innerHTML = "";
  stocklist.forEach(line => output.appendChild(getLine(line)));
}

function getLine(line) {
  const l = document.createElement("li");
  l.setAttribute("id", line.id);
  if (line.done) {
    l.classList.add("done");
  }
  l.classList.add("list-group-item");
  if (!line.description) return;
  let html = `<h5>${line.description}</h5>`;
  if (line.type === "unsized") {
    html += `<p><span>${line.count}<span>`;
  } else if (line.type === "sized") {
    html += "<p>";
    for (let [k, v] of Object.entries(line.counts)) {
      if (Number(v) > 0) {
        html += `<span class="me-3">${k}: ${v}</span>`;
      }
    }
  }
  html += '<img src="images/trash.svg" class="trash"/></p>';
  if (line.notes) {
    html += `<p class="text-muted">${line.notes}</p>`;
  }
  l.innerHTML = html;
  l.addEventListener("dblclick", e => {
    l.classList.add("done");
    const dataLine = getLineById(l.getAttribute("id"));
    dataLine.done = true;
    updateStorage();
  });
  l.querySelector("img.trash").addEventListener("click", () => {
    const removeIndex = stocklist.findIndex(x => x.id === line.id);
    stocklist.splice(removeIndex, 1);
    updateStorage();
    updateDisplay();
  });
  return l;
}
