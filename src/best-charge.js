const loadAllItems = require('../src/items');

function bestCharge(selectedItems) {
  return /*TODO*/;
}

const isItemExist = selectedItems => {
  let flag = true;
  const items = loadAllItems();
  const idList = items.map(item => item['id']);

  selectedItems.forEach(item => {
    if(idList.indexOf(item) === -1){
      flag = false;
    }
  })
  return flag;
}

const createOrder = selectedItems => {
  const items = loadAllItems();
  let order = new Array();
  const idList = items.map(item => item['id']);
  selectedItems.forEach(item => {
    let index = item.indexOf('x');
    let id = item.substring(0,index-1);
    let pos = idList.indexOf(id);
    order.push({name:items[pos].name,num:Number(item.substring(index+1,item.length)),price:items[pos].price});
  })
  return order;
}
module.exports = {isItemExist,createOrder};


