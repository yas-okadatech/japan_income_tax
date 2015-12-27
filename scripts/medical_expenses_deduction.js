import { payroll_deduction } from './payroll_deduction'

/**
 * 医療費控除
 * @param data
 */
export function medical_expenses_deduction(data) {
  let { income, medical_expenses } = data;

  medical_expenses = medical_expenses ? medical_expenses : 0;

  let deducted_income = payroll_deduction(income);

  let deduction = medical_expenses - (deducted_income > 2000000 ? 100000 : (deducted_income * 0.05));
  deduction = Math.min(2000000, deduction);
  return Math.max(0, deduction);
}
