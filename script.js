const STORAGE_KEY = "stocklist_storage_key";
let stocklist = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
const output = document.getElementById("output");

updateDisplay();
document.getElementById("clearBtn").addEventListener("click", e => {
  stocklist = [];
  updateLocalStorage();
  updateDisplay()
});

document.getElementById("addUnsized").addEventListener("click", e => {
  const form = document.getElementById("unsizedDataEntry");
  const description = form.querySelector("input[type=text]").value;
  const count = form.querySelector("input[type=number]").value;
  const notes = form.querySelector("textarea").value;
  const lineData = {
    id: nextId(),
    done: false,
    type: "unsized",
    description,
    count,
    notes
  };
  const lineDisplay = getLine(lineData);
  if (lineDisplay) {
    stocklist.push(lineData);
    output.appendChild(lineDisplay);
    updateLocalStorage();
  }
  form.reset();
});

function nextId() {
  const INDEX_KEY = "index_key";
  //NB: Number(null) is 0
  let index = Number(localStorage.getItem(INDEX_KEY));
  index += 1;
  localStorage.setItem(INDEX_KEY, index);
  return `item_${index}`;
}

function getLineById(id) {
  return stocklist.filter(x => x.id && x.id === id)[0] || null;
}

function updateLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stocklist));
}

function updateDisplay(){
  output.innerHTML = '';
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
    if (line.count) {
      html += `<p><span>${line.count}<span><img src="images/trash.svg" class="trash"/></p>`;
    }
  } else if (line.type === "sized") {
    if (line.counts) {
      html += "<p>";
      for (let [k, v] of Object.entries(line.counts)) {
        if (Number(v) > 0) {
          html += `<span class="me-3">${k}: ${v}</span>`;
        }
      }
      html += "</p>";
    }
  }
  if (line.notes) {
    html += `<p class="text-muted">${line.notes}</p>`;
  }
  l.innerHTML = html;
  l.addEventListener("dblclick", e => {
    l.classList.add("done");
    const dataLine = getLineById(l.getAttribute('id'));
    dataLine.done = true;
    updateLocalStorage();
  });
  l.querySelector('img.trash').addEventListener('click', () => {
    const removeIndex = stocklist.findIndex(x => (x.id === line.id));
    stocklist.splice(removeIndex, 1);
    updateLocalStorage();
    updateDisplay();
  });
  return l;
}
