const STORAGE_KEY = 'stocklist_storage_key';
let stocklist = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
const output = document.getElementById("output");
stocklist.forEach(line => output.appendChild(getLine(line)));

document.getElementById('clearBtn').addEventListener('click', e => {
  stocklist = [];
  updateLocalStorage();
  output.innerHTML = '';
});

document.getElementById("addUnsized").addEventListener("click", e => {
  const form = document.getElementById("unsizedDataEntry");
  const description = form.querySelector("input[type=text]").value;
  const count = form.querySelector("input[type=number]").value;
  const notes = form.querySelector("textarea").value;
  const lineData = { type: "unsized", description, count, notes };
  const line = getLine(lineData);
  if (line) {
    stocklist.push(lineData);
    output.appendChild(line);
    updateLocalStorage();
  }
  form.reset();
});

function updateLocalStorage(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stocklist));  
}

function getLine(line, id) {
  const l = document.createElement("li");
  if(id){
    l.setAttribute('id', id);
    console.log(id);
  }
  l.classList.add("list-group-item");
  if (!line || !line.description) return;
  let html = `<h5>${line.description}</h5>`;
  if (line.type && line.type === "unsized") {
    if (line.count) {
      html += `<p>${line.count}</p>`;
    }
  } else if (line.type && line.type === "sized") {
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
  return l;
}
