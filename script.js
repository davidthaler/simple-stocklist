let data = [
  {type:'general', description:'Bk W sch', count: 8}, 
  {type: 'general', description: 'Neil W mug', count:20, notes:'4 to display table'}, 
  {type: 'clothing', description: 'GY seal crew', counts: {S: 3, M: 2, L:1}}, 
  {type: 'clothing', description: '47 Wt retro dog tee', counts:{S:2, M:2}, notes:'folded'}
];

function getListItem(){
  const l = 
  l.classList.add('list-group-item');
  return l;
}

function getClothingLine(line){
  const l = getListItem();
  
  return l;
}

function getGeneralLine(line){
  const l = document.createElement('li');
  l.classList.add('list-group-item');
  if(!line || !line.description) return;
  let html = `<h5>${line.description}</h5>`;
  if(line.count){
    html += `<p>${line.count}</p>`;
  }
  if(line.notes){
    html += `<p class="text-muted">${line.notes}</p>`
  }
  l.innerHTML = html;
  return l;
}