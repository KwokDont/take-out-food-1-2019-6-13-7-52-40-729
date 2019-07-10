const bestCharge = require('../src/best-charge');

it("should be true when given items ['ITEM0001','ITEM0013']", ()=> {
  //given
  const arr = ['ITEM0001','ITEM0013'];
  //when
  //then
  const result = bestCharge.isItemExist(arr);
  expect(result).toBe(true);
})

it("should be true when given items ['ITEM0001','ITEM0013']", ()=> {
  //given
  const arr = ['ITEM0001','ITEM0aaa'];
  //when
  //then
  const result = bestCharge.isItemExist(arr);
  expect(result).toBe(false);
})

it("should order object when invoke createOrder given items ['ITEM0001 x 1','ITEM0013 x 1']", ()=> {
  //given
  const arr = ['ITEM0001 x 1','ITEM0013 x 1'];
  //when
  const result = bestCharge.createOrder(arr);
  //then
  expect(result).toStrictEqual([{id:'ITEM0001',name:'黄焖鸡',num:1,price:18.00},{id:'ITEM0013',name:'肉夹馍',num:1,price:6.00}]);
})

it("should discount object when invoke getDiscount given orderList", ()=> {
  //given
  const arr = [{id:'ITEM0001',name:'黄焖鸡',num:4,price:18.00},{id:'ITEM0013',name:'肉夹馍',num:1,price:6.00}];
  //when
  const result = bestCharge.getDiscount(arr);
  //then
  expect(result).toStrictEqual({total:78.00,mode:'指定菜品半价',offerPrice:36.00,items:['黄焖鸡']});
})

it("should discount object when invoke getDiscount given orderList", ()=> {
  //given
  const arr = [{id:'ITEM0022',name:'凉皮',num:1,price:8.00},{id:'ITEM0013',name:'肉夹馍',num:6,price:6.00}];
  //when
  const result = bestCharge.getDiscount(arr);
  //then
  expect(result).toStrictEqual({total:44.00,mode:'满30减6元',offerPrice:6.00,items:[]});
})
