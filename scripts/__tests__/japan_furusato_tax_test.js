jest.autoMockOff();


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
