import { floor1000 } from './tax_utils'

/**
 * 給与所得控除後の所得
 *
 * https://www.nta.go.jp/taxanswer/shotoku/1410.htm
 *
 * @param income 給与
 */
export function payroll_deduction(income) {
  let deducted;

  if (income < 651000) {
    deducted = 0;

  } else if (income < 1619000) {
    deducted = income - 650000;

  } else if (income < 1620000) {
    deducted = 969000;

  } else if (income < 1622000) {
    deducted = 970000;

  } else if (income < 1624000) {
    deducted = 972000;

  } else if (income < 1628000) {
    deducted = 974000;

  } else if (income < 1800000) {
    deducted = floor1000(income / 4.0) * 2.4;

  } else if (income < 3600000) {
    deducted = floor1000(income / 4.0) * 2.8 - 180000;

  } else if (income < 6600000) {
    deducted = floor1000(income / 4.0) * 3.2 - 540000;

  } else if (income < 10000000) {
    deducted = income * 0.9 - 1200000;

  } else if (income < 15000000) {
    deducted = income * 0.95 - 1700000;

  } else {
    deducted = income - 2450000;
  }

  return deducted;
}
