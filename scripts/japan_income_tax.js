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
  let taxable_income = income - income_tax_deduction(data);
  //console.debug("所得税課税所得:%d", taxable_income);

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

  tax += tax * 0.021; // 特別復興税

  return floor100(tax);
}

/**
 * 所得税控除額
 */
function income_tax_deduction(data) {
  return (data["spouse"] ? 380000 : 0) // 配偶者控除
    + data["children16"] * 380000   // 一般の控除対象扶養親族
    + (data["children19"] * 630000)   // 特定扶養親族
    + 380000;   // 基礎控除
}

/**
 * 住民税計算
 *
 * @param data
 */
export function japan_resident_tax(data) {
  let income = payroll_deduction(data["income"]); // 給与所得控除

  // 課税所得
  let taxable_income = income - resident_tax_deduction(data);
  //console.debug("住民税課税所得:%d", taxable_income);

  let tax_prefecture = floor100(taxable_income * 0.04) + 1500;
  let tax_city = floor100(taxable_income * 0.06) + 3500;

  // 人的控除額の差
  let deduction_diff =  income_tax_deduction(data) - resident_tax_deduction(data);

  // 調整控除
  let adjust;
  if (taxable_income - tax_prefecture - tax_city < 2000000) {
    // 課税標準額 200万以下
    // min(人的控除額の差, 課税標準額) * 5%
    adjust = Math.min(taxable_income, deduction_diff) * 0.05;

  } else {
    // (人的控除額の差－(課税標準額-200万円)) * 5％
    // 2500未満の場合は2500
    adjust = (deduction_diff -  (taxable_income - 2000000)) * 0.05;
    adjust = Math.max(adjust, 2500);
  }

  return Math.floor(tax_prefecture + tax_city - adjust);
}

/**
 * 所得税控除額
 */
function resident_tax_deduction(data) {
  return (data["spouse"] ? 330000 : 0) // 配偶者控除
    + data["children16"] * 330000   // 扶養控除
    + (data["children19"] * 450000)   // 扶養控除
    + 330000;   // 基礎控除
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
    deducted = floor1000(income / 4.0) * 2.4;

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

/**
 * 100円未満切り捨て
 * @param v
 */
export function floor100(v) {
  return Math.floor(v / 100) * 100;
}

function income_tax_rate(data) {
  let income = payroll_deduction(data["income"]); // 給与所得控除

  // 課税所得
  let taxable_income = income - income_tax_deduction(data);

  let rate;
  if (taxable_income <= 1950000) {
    rate = 0.05;

  } else if (taxable_income < 3300000) {
    rate = 0.1;

  } else if (taxable_income < 6950000) {
    rate = 0.2;

  } else if (taxable_income < 9000000) {
    rate = 0.23;

  } else if (taxable_income < 18000000) {
    rate = 0.33;

  } else if (taxable_income < 40000000) {
    rate = 0.40;

  } else {
    rate = 0.45;
  }

  return rate;
}

/**
 * ふるさと納税上限
 */
export function furusato_tax_max(data) {
  //console.debug("---");
  let income_tax = japan_income_tax(data);
  let resident_tax = japan_resident_tax(data);
  let tax_rate = income_tax_rate(data);

  //console.debug("所得税:%d", income_tax);
  //console.debug("住民税:%d", resident_tax);
  //console.debug("所得税控除:%d", income_tax_deduction(data));
  //console.debug("住民税控除:%d", resident_tax_deduction(data));

  let furusato_max = (resident_tax * 0.2) / (0.9 - tax_rate) + 2000;
  furusato_max = Math.max(furusato_max, 0);
  return floor100(furusato_max);
}
