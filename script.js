let data = [
  {type:'general', name:'Bk W sch', count: 8}, 
  {type: 'general', name: 'Neil W mug', count:20, notes:'4 to display table'}, 
  {type: 'clothing', name: 'GY seal crew', count: {S: 3, M: 2, L:1}}, 
  {type: 'clothing', name: '47 Wt retro dog tee', count:{S:2, M:2}, notes:'folded'}
];

function getListItem(){
  const l = document.createElement('li');
  l.classList.add('list-group-item');
  return l;
}

function getClothingLine(line){
  const l = getListItem();
  
  return l;
}

function getGeneralLine(line){
  const l = getListItem();
  if(line.name && line.count){
    const p1 = document.createElement('p');
    p1.textContent = `name: ${line.name}`;
    l.appendChild(p1);
    const p2 = document.createElement('p');
    p2.textContent = `count: ${line.count}`;
    l.appendChild(p2);
  }else{
    return l;
  }
  if(line.notes){
    const pNote = document.createElement('p');
    pNote.textContent = `name: ${line.notes}`;
    l.appendChild(pNote);
  }
  return l;
}