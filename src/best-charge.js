const loadAllItems = require('../src/items');
const loadPromotions = require('../src/promotions');

function bestCharge(selectedItems) {
  const orderList = createOrder(selectedItems);
  const discount = getDiscount(orderList);
  let result = '============= 订餐明细 =============\n';
  orderList.forEach(order => {
    result += order.name + ' x ' + order.num +' = ' + order.num * order.price + '元\n';
  })
  result += '-----------------------------------\n';
  if(discount.mode !== ''){
    result += '使用优惠:\n' + discount.mode;
    if(discount.mode === '指定菜品半价'){
      let itemString = discount.items.join('');
      result += '(' + itemString +')';
    }
    result += '，省' + discount.offerPrice + '元\n-----------------------------------\n';
  }
  result += '总计：' + (discount.total - discount.offerPrice) + '元\n===================================';
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
    order.push({id:items[pos].id,name:items[pos].name,num:Number(item.substring(index+1,item.length)),price:items[pos].price});
  })
  return order;
}

const getDiscount = orderList => {
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
      let number = Number.POSITIVE_INFINITY;
      let idList = promotion.items;
      let items = [];
      orderIdList.forEach(orderId => {
        if(idList.indexOf(orderId) > -1){
          let order = orderList[orderIdList.indexOf(orderId)];
          items.push(order.name);
          number = totalFirst - order.price * order.num / 2;
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
module.exports = {isItemExist,createOrder,getDiscount,bestCharge};


