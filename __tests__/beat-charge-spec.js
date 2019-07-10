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
  expect(result).toStrictEqual([{name:'黄焖鸡',num:1,price:18.00},{name:'肉夹馍',num:1,price:6.00}]);
})
