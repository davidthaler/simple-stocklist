let data = [
  { type: "unsized", description: "Bk W sch", count: 8 },
  {
    type: "unsized",
    description: "Neil W mug",
    count: 20,
    notes: "4 to display table"
  },
  { type: "sized", description: "GY seal crew", counts: { S: 3, M: 2, L: 1 } },
  {
    type: "sized",
    description: "47 Wt retro dog tee",
    counts: { S: 2, M: 2 },
    notes: "folded"
  }
];

document.getElementById('unsizedDone').addEventListener('click', (e) => {
  
  document.getElementById('unsizedDataEntry').reset();
  //close modal
});

function getLine(line) {
  const l = document.createElement("li");
  l.classList.add("list-group-item");
  if (!line || !line.description) return;
  let html = `<h5>${line.description}</h5>`;
  if (line.type && line.type === "unsized") {
    if (line.count) {
      html += `<p>${line.count}</p>`;
    }
  }else if(line.type && line.type==='sized'){
    if(line.counts){
      html += '<p>';
      for(let [k, v] of Object.entries(line.counts)){
        if(Number(v) > 0){
          html += `<span class="me-3">${k}: ${v}</span>`;
        }
      }
      html += '</p>';
    }
  }
  if (line.notes) {
    html += `<p class="text-muted">${line.notes}</p>`;
  }
  l.innerHTML = html;
  return l;
}


