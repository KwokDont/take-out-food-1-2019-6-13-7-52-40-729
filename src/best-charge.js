const loadAllItems = require('../src/items');
const loadPromotions = require('../src/promotions');

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
    order.push({id:items[pos].id,name:items[pos].name,num:Number(item.substring(index+1,item.length)),price:items[pos].price});
  })
  return order;
}

const crateReceipt = selectedItems => {
  const orderList = createOrder(selectedItems);
  const discount = getDiscount(orderList);

}

const getDiscount = orderList => {
  const orderIdList = orderList.map(order => order['id']);
  let totalFirst = 0;
  let total = 0;
  orderList.forEach(order => {
    totalFirst += order.num * order.price;
    total = totalFirst;
  })
  let discount = {total:total,mode:'',offerPrice:0};
  const promotions = loadPromotions();
  promotions.forEach(promotion => {
    if(promotion.items == undefined){
      if(total > 30){
        total -= 6;
        discount.mode = promotion.type;
        discount.offerPrice = 6;
      }
    }else{
      let number = 0;
      let idList = promotion.items;
      orderIdList.forEach(orderId => {
        if(idList.indexOf(orderId) > -1){
          let order = orderList[orderIdList.indexOf(orderId)];
          number = totalFirst - order.price * order.num / 2;
          if(number < total){
            total = number;
            discount.mode = promotion.type;
            discount.offerPrice = order.price * order.num / 2;
            console.log(discount.offerPrice);
          }
        }
      })
    }
  })
  return discount;
}
module.exports = {isItemExist,createOrder,getDiscount};


