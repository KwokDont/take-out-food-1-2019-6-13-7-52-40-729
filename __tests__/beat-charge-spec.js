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
