const loadAllItems = require('../src/items');
const loadPromotions = require('../src/promotions');

const TITLE = '============= 订餐明细 =============\n';
const LINE = '-----------------------------------\n'
const EDN_LINE = '==================================='

function bestCharge(selectedItems) {
  const orderList = createOrder(selectedItems);
  const discount = chooseDiscount(orderList);
  let result = TITLE;
  result += printItemString(orderList);
  result += LINE;
  if(discount.mode !== ''){
    result = printPromotionString(discount,result);
  }
  result += `总计：${discount.total - discount.offerPrice}元\n`;
  result += EDN_LINE;
  return result;
}

const printItemString = orderList => {
  let result = '';
  orderList.forEach(order => {
    result += `${order.name} x ${order.num} = ${order.num * order.price}元\n`;
  })
  return result;
}

const printPromotionString = (discount,result) => {
  result += `使用优惠:\n${discount.mode}`;
  if(discount.mode === '指定菜品半价'){
    let itemString = discount.items.join('，');
    result += `(${itemString})`;
  }
  result += `，省${discount.offerPrice}元\n`;
  result += LINE;
  return result;
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
    order.push({id:items[pos].id,
      name:items[pos].name,
      num:Number(item.substring(index+1,item.length)),
      price:items[pos].price});
  })
  return order;
}

const chooseDiscount = orderList => {
  const orderIdList = orderList.map(order => order['id']);
  let totalFirst = 0;
  let total = 0;
  orderList.forEach(order => {
    totalFirst += order.num * order.price;
    total = totalFirst;
  })
  let discount = {total:total,mode:'',offerPrice:0,items:[]};
  const promotions = loadPromotions();
  promotions.forEach(promotion => {
    if(promotion.items == undefined){
      if(total > 30){
        total -= 6;
        discount.mode = promotion.type;
        discount.offerPrice = 6;
      }
    }else{
      let number = totalFirst;
      let idList = promotion.items;
      let items = [];
      orderIdList.forEach(orderId => {
        if(idList.indexOf(orderId) > -1){
          let order = orderList[orderIdList.indexOf(orderId)];
          items.push(order.name);
          number = number - order.price * order.num / 2;
        }
        if(number < total){
          total = number;
          discount.mode = promotion.type;
          discount.offerPrice = totalFirst - number;
          discount.items = items;
        }
      })
    }
  })
  return discount;
}

module.exports = {isItemExist,createOrder,chooseDiscount,bestCharge};
