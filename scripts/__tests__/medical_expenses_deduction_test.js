jest.autoMockOff();

let { medical_expenses_deduction } = require('../medical_expenses_deduction.js');

describe ('income over 2 mil', () => {

  it('should calculate with 0', () => {
    let data = {
      income: 5000000,
      medical_expenses: 0
    };

    expect(medical_expenses_deduction(data)).toEqual(0);
  });

  it('should calculate with less 100,000', () => {
    let data = {
      income: 5000000,
      medical_expenses: 90000
    };

    expect(medical_expenses_deduction(data)).toEqual(0);
  });

  it('should calculate with over 100,000', () => {
    let data = {
      income: 5000000,
      medical_expenses: 120000
    };

    expect(medical_expenses_deduction(data)).toEqual(20000);
  });

  it('should calculate with over 2 mil', () => {
    let data = {
      income: 5000000,
      medical_expenses: 2120000
    };

    expect(medical_expenses_deduction(data)).toEqual(2000000);
  });
});

describe ('income under 2 mil', () => {

  it('should calculate with 0', () => {
    let data = {
      income: 1900000,
      medical_expenses: 0
    };

    expect(medical_expenses_deduction(data)).toEqual(0);
  });

  it('should calculate with less 17500', () => {
    let data = {
      income: 1000000,
      medical_expenses: 17500
    };

    expect(medical_expenses_deduction(data)).toEqual(0);
  });

  it('should calculate with over 100,000', () => {
    let data = {
      income: 1000000,
      medical_expenses: 120000
    };

    expect(medical_expenses_deduction(data)).toEqual(102500);
  });

  it('should calculate with over 2 mil', () => {
    let data = {
      income: 1000000,
      medical_expenses: 2120000
    };

    expect(medical_expenses_deduction(data)).toEqual(2000000);
  });
});
