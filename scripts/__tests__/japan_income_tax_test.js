//jest.dontMock('../japan_income_tax');
jest.autoMockOff();

let { japan_income_tax, income_tax_deduction } = require('../japan_income_tax.js');

describe('income', () => {

  it('should calculate tax from 5 mil', () => {
    let data = {
      income: 5000000,
      spouse: false,
      children16: 0,
      children19: 0,
      children23: 0
    };

    expect(income_tax_deduction(data)).toEqual(380000);
    expect(japan_income_tax(data)).toEqual(214900);
  });

  it('should calculate tax from 10 mil', () => {
    let data = {
      income: 10000000,
      spouse: false,
      children16: 0,
      children19: 0,
      children23: 0
    };

    expect(income_tax_deduction(data)).toEqual(380000);
    expect(japan_income_tax(data)).toEqual(1093000);
  });

});

describe('spouse', () => {
  it('should calculate tax with deduction', () => {
    let data = {
      income: 5000000,
      spouse: true,
      children16: 0,
      children19: 0,
      children23: 0
    };
    let tax = japan_income_tax(data);

    expect(tax).toEqual(176100);
  });

});

describe('child23', () => {
  it('should calculate tax with 1 children23', () => {
    let data = {
      income: 5000000,
      spouse: false,
      children16: 0,
      children19: 0,
      children23: 1
    };

    expect(japan_income_tax(data)).toEqual(176100);
  });
});

describe('medical_expenses', () => {
  it('should calculate tax with medical_expenses', () => {
    let data = {
      income: 5000000,
      medical_expenses: 120000
    };

    expect(japan_income_tax(data)).toEqual(212800);
  });
});

