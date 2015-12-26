jest.autoMockOff();

let { japan_resident_tax } = require('../japan_income_tax.js');

describe('income', () => {

  it('should calculate tax from 5 mil', () => {
    let data = {
      income: 5000000,
      spouse: false,
      children16: 0,
      children19: 0,
      children23: 0
    };
    let tax = japan_resident_tax(data);

    expect(tax).toEqual(315500);
  });

  it('should calculate tax from 10 mil', () => {
    let data = {
      income: 10000000,
      spouse: false,
      children16: 0,
      children19: 0,
      children23: 0
    };
    let tax = japan_resident_tax(data);

    expect(tax).toEqual(749500);
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
    let tax = japan_resident_tax(data);

    expect(tax).toEqual(282500);
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

    expect(japan_resident_tax(data)).toEqual(282500);
  });
});