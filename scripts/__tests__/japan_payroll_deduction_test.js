jest.autoMockOff();

let { payroll_deduction } = require('../japan_income_tax.js');

describe('payroll_deduction', () => {

  it('should calculate tax from 5 mil', () => {
    expect(payroll_deduction(5000000)).toEqual(3460000);
  });

  it('should calculate tax from 10 mil', () => {
    expect(payroll_deduction(10000000)).toEqual(7800000);
  });

});