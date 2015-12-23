/**
 * 所得税の計算
 *
 * https://www.nta.go.jp/taxanswer/shotoku/shoto320.htm
 *
 * data : {
 *   income: 5,000,000    // 給与
 *   spouse: true / false // 配偶者
 *   children16: 1        // 16~18歳の子 (人)
 *   children19: 1        // 19~23歳の子 (人)
 * }
 */
export function japan_income_tax(data) {
  let income = payroll_deduction(data["income"]); // 給与所得控除

  // 課税所得
  let taxable_income = income
    - (data["spouse"] ? 380000 : 0) // 配偶者控除
    - data["children16"] * 380000   // 一般の控除対象扶養親族
    - data["children19"] * 630000   // 特定扶養親族
      //- 16100 * 12                    // 国民年金
    - 380000;   // 基礎控除

  let tax;
  if (taxable_income <= 1950000) {
    tax = taxable_income * 0.05;

  } else if (taxable_income < 3300000) {
    tax = taxable_income * 0.1 - 97500;

  } else if (taxable_income < 6950000) {
    tax = taxable_income * 0.2 - 427500;

  } else if (taxable_income < 9000000) {
    tax = taxable_income * 0.23 - 636000;

  } else if (taxable_income < 18000000) {
    tax = taxable_income * 0.33 - 1536000;

  } else if (taxable_income < 40000000) {
    tax = taxable_income * 0.40 - 2796000;

  } else {
    tax = taxable_income * 0.45 - 4796000;
  }

  return tax;
}


/**
 * 給与所得控除
 *
 * https://www.nta.go.jp/taxanswer/shotoku/1410.htm
 *
 * @param income 給与
 */
function payroll_deduction(income) {
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
    deducted = floor1000(income / 4.0) * 2.5;

  } else if (income < 3600000) {
    deducted = floor1000(income / 4.0) * 2.8 - 180000;

  } else if (income < 6600000) {
    deducted = floor1000(income / 4.0) * 3.2 - 540000;

  } else if (income < 10000000) {
    deducted = income * 0.9 - 1200000;

  } else if (income < 10000000) {
    deducted = income * 0.95 - 1700000;

  } else {
    deducted = 2450000;
  }

  return deducted;
}

/**
 * 1000円未満切り捨て
 * @param v
 */
export function floor1000(v) {
  return Math.floor(v / 1000) * 1000;
}

export default japan_income_tax;
