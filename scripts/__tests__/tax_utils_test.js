jest.autoMockOff();


describe ('floor1000', () => {
  let { floor1000 } = require('../tax_utils.js');

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
  let { floor100 } = require('../tax_utils.js');

  it('should calculate', () => {

    expect(floor100(1)).toEqual(0);
    expect(floor100(99)).toEqual(0);
    expect(floor100(100)).toEqual(100);
    expect(floor100(101)).toEqual(100);
    expect(floor100(199)).toEqual(100);
    expect(floor100(201)).toEqual(200);
  });

});
