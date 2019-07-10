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

module.exports = {isItemExist};


