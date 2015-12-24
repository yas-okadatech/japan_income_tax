//jest.dontMock('../japan_income_tax');
jest.autoMockOff();


describe('income tax', () => {
  let { japan_income_tax } = require('../japan_income_tax.js');

  it('should calculate tax', () => {
    let data = {
      income: 5000000,
      spouse: false,
      children16: 0,
      children19: 0
    };
    let tax = japan_income_tax(data);

    expect(tax).toEqual(214900);
  });

  it('should calculate tax with deduction', () => {
    let data = {
      income: 5000000,
      spouse: true,
      children16: 0,
      children19: 0
    };
    let tax = japan_income_tax(data);

    expect(tax).toEqual(176100);
  });

});

describe('resident tax', () => {
  let { japan_resident_tax } = require('../japan_income_tax.js');

  it('should calculate tax', () => {
    let data = {
      income: 5000000,
      spouse: false,
      children16: 0,
      children19: 0
    };
    let tax = japan_resident_tax(data);

    expect(tax).toEqual(315500);
  });

  it('should calculate tax with deduction', () => {
    let data = {
      income: 5000000,
      spouse: true,
      children16: 0,
      children19: 0
    };
    let tax = japan_resident_tax(data);

    expect(tax).toEqual(282500);
  });

});

describe('furusato max', () => {
  let { furusato_tax_max } = require('../japan_income_tax.js');

  it('should calculate', () => {
    let data = {
      income: 5000000,
      spouse: false,
      children16: 0,
      children19: 0
    };
    let max = furusato_tax_max(data);

    expect(max).toEqual(80800);
  });

  it('should calculate it with deduction', () => {
    let data = {
      income: 5000000,
      spouse: true,
      children16: 0,
      children19: 0
    };
    let max = furusato_tax_max(data);

    expect(max).toEqual(72600);
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

describe ('floor100', () => {
  let { floor100 } = require('../japan_income_tax.js');

  it('should calculate', () => {

    expect(floor100(1)).toEqual(0);
    expect(floor100(99)).toEqual(0);
    expect(floor100(100)).toEqual(100);
    expect(floor100(101)).toEqual(100);
    expect(floor100(199)).toEqual(100);
    expect(floor100(201)).toEqual(200);
  });

});
