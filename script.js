let data = [
  {type:'general', name:'Bk W sch', quantity: 8}, 
  {type: 'general', name: 'Neil W mug', quantity:20, notes:'4 to display table'}, 
  {type: 'clothing', name: 'GY seal crew', quantity: {S: 3, M: 2, L:1}}, 
  {type: 'clothing', name: '47 Wt retro dog tee', quantity:{S:2, M:2}, notes:'folded'}
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
  
}