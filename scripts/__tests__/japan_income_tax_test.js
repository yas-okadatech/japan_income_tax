//jest.dontMock('../japan_income_tax');
jest.autoMockOff();

let { japan_income_tax } = require('../japan_income_tax.js');

describe('income tax', () => {

  it('should calculate tax', () => {
    let data = {
      income: 5000000,
      spouse: false,
      children16: 0,
      children19: 0
    };
    let tax = japan_income_tax(data);

    expect(tax).toEqual(210500);
  });

  it('should calculate tax with deduction', () => {
    let data = {
      income: 5000000,
      spouse: true,
      children16: 0,
      children19: 0
    };
    let tax = japan_income_tax(data);

    expect(tax).toEqual(172500);
  });

});

describe ('floor1000', () => {
  let { floor1000 } = require('../japan_income_tax.js');

  it('should calculate', () => {

    expect(floor1000(1)).toEqual(0);
    expect(floor1000(999)).toEqual(0);
    expect(floor1000(1000)).toEqual(1000);
    expect(floor1000(1001)).toEqual(1000);
    expect(floor1000(1999)).toEqual(1000);
    expect(floor1000(2001)).toEqual(2000);
  });

});
