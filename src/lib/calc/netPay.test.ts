import { test } from 'node:test';
import assert from 'node:assert/strict';

import { PERIODS_PER_YEAR, computeNetPay, type NetPayInput } from './netPay.ts';

function baseInput(overrides: Partial<NetPayInput> = {}): NetPayInput {
  return {
    grossPay: 30,
    period: 'hour',
    filingStatus: 'single',
    stateRatePercent: 0,
    retirementContributionAnnual: 0,
    healthAccountDeductionsAnnual: 0,
    ...overrides,
  };
}

test('the number of pay periods in a year is the conventional one', () => {
  assert.equal(PERIODS_PER_YEAR.year, 1);
  assert.equal(PERIODS_PER_YEAR.month, 12);
  assert.equal(PERIODS_PER_YEAR.week, 52);
  assert.equal(PERIODS_PER_YEAR.day, 260);
  assert.equal(PERIODS_PER_YEAR.hour, 2_080);
});

test('an hourly wage becomes an annual salary', () => {
  const result = computeNetPay(baseInput());

  // 30 dollars an hour for 2,080 hours a year.
  assert.equal(result.annualGross, 62_400);
  // Taxable income is the salary less the 16,100 standard deduction.
  assert.equal(result.annualTaxableIncome, 46_300);
  // Federal tax: 1,240 + 12% of (46,300 - 12,400).
  assert.equal(result.federalTax, 5_308);
  assert.equal(result.socialSecurity, 3_868.8);
  assert.equal(result.medicare, 904.8);
  assert.equal(result.additionalMedicare, 0);
  assert.equal(result.stateTax, 0);
  assert.equal(result.totalTax, 10_081.6);
  assert.equal(result.annualNet, 52_318.4);
  assert.equal(result.netPerPeriod, 25.15);
  assert.equal(result.netPerMonth, 4_359.87);
  assert.equal(result.effectiveTaxRate, 16.16);
  assert.equal(result.marginalRate, 0.12);
});

test('a monthly salary is divided back into months', () => {
  const result = computeNetPay(baseInput({ grossPay: 5_000, period: 'month' }));

  assert.equal(result.annualGross, 60_000);
  assert.equal(result.annualTaxableIncome, 43_900);
  // 1,240 + 12% of (43,900 - 12,400).
  assert.equal(result.federalTax, 5_020);
  assert.equal(result.totalTax, 5_020 + 3_720 + 870);
  assert.equal(result.netPerPeriod, 4_199.17);
  assert.equal(result.netPerMonth, 4_199.17);
});

test('a yearly salary is the whole year', () => {
  const result = computeNetPay(baseInput({ grossPay: 120_000, period: 'year' }));

  assert.equal(result.annualGross, 120_000);
  assert.equal(result.netPerPeriod, result.annualNet);
});

test('a state rate is taken off the taxable income', () => {
  const result = computeNetPay(baseInput({ stateRatePercent: 5 }));

  assert.equal(result.stateTax, 2_315);
  assert.equal(result.totalTax, 12_396.6);
});

test('a 401(k) contribution comes off the taxable income and stays in the payroll taxes', () => {
  const result = computeNetPay(baseInput({ retirementContributionAnnual: 6_240 }));

  assert.equal(result.preTaxDeductions, 6_240);
  assert.equal(result.retirementContribution, 6_240);
  // The 401(k) money is not taxed, so the taxable income falls with it.
  assert.equal(result.annualTaxableIncome, 46_300 - 6_240);
  assert.equal(result.federalTax, 1_240 + 0.12 * (46_300 - 6_240 - 12_400));
  // It is still wages for Social Security and Medicare: IRS Tax Topic 401.
  assert.equal(result.socialSecurity, 62_400 * 0.062);
  assert.equal(result.medicare, 904.8);
  assert.equal(result.annualNet, 62_400 - 6_240 - result.totalTax);
});

test('an HSA or FSA contribution comes off the payroll taxes as well', () => {
  const result = computeNetPay(baseInput({ healthAccountDeductionsAnnual: 6_240 }));

  assert.equal(result.preTaxDeductions, 6_240);
  assert.equal(result.healthAccountDeductions, 6_240);
  assert.equal(result.annualTaxableIncome, 46_300 - 6_240);
  assert.equal(result.federalTax, 1_240 + 0.12 * (46_300 - 6_240 - 12_400));
  // A salary reduction is not Social Security wages: SSA POMS RS 01402.038.
  assert.equal(result.socialSecurity, 3_481.92);
  assert.equal(result.medicare, 814.32);
  assert.equal(result.annualNet, 62_400 - 6_240 - result.totalTax);
});

test('a $60,000 salary with a $12,000 401(k) leaves the payroll taxes in place', () => {
  const result = computeNetPay(
    baseInput({ grossPay: 60_000, period: 'year', retirementContributionAnnual: 12_000 }),
  );

  assert.equal(result.federalTax, 3_580);
  assert.equal(result.socialSecurity, 3_720);
  assert.equal(result.medicare, 870);
  assert.equal(result.totalTax, 8_170);
  assert.equal(result.netPerMonth, 3_319.17);
});

test('a $60,000 salary with a $12,000 salary reduction leaves more of the pay', () => {
  const result = computeNetPay(
    baseInput({ grossPay: 60_000, period: 'year', healthAccountDeductionsAnnual: 12_000 }),
  );

  assert.equal(result.federalTax, 3_580);
  assert.equal(result.socialSecurity, 2_976);
  assert.equal(result.medicare, 696);
  assert.equal(result.totalTax, 7_252);
  assert.equal(result.netPerMonth, 3_395.67);
});

test('the two deductions together cannot exceed the gross pay', () => {
  const result = computeNetPay(
    baseInput({ retirementContributionAnnual: 40_000, healthAccountDeductionsAnnual: 40_000 }),
  );

  assert.equal(result.preTaxDeductions, 62_400);
  assert.equal(result.annualTaxableIncome, 0);
  // The payroll taxes are still charged on the part of the wage that is not
  // a salary reduction, so there is nothing left to take home.
  assert.equal(result.totalTax, 3_060);
  assert.equal(result.annualNet, -3_060);
});

test('pre-tax deductions cannot exceed the gross pay', () => {
  const result = computeNetPay(baseInput({ retirementContributionAnnual: 100_000 }));

  assert.equal(result.preTaxDeductions, 62_400);
  assert.equal(result.annualTaxableIncome, 0);
  // The whole wage is deferred into the 401(k), and the payroll taxes are
  // charged on it all the same.
  assert.equal(result.annualNet, -4_773.6);
});

test('the Additional Medicare Tax appears above the threshold', () => {
  const result = computeNetPay(
    baseInput({ grossPay: 200_000, period: 'year', filingStatus: 'single' }),
  );

  assert.equal(result.additionalMedicare, 0);
  assert.equal(result.socialSecurity, 11_439);
});

test('a married filing jointly salary is taxed on the wider table', () => {
  const result = computeNetPay(
    baseInput({ grossPay: 100_000, period: 'year', filingStatus: 'married' }),
  );

  assert.equal(result.annualTaxableIncome, 100_000 - 32_200);
  assert.equal(result.federalTax, 2_480 + 0.12 * (67_800 - 24_800));
});

test('an income of nothing produces a result of nothing', () => {
  const result = computeNetPay(
    baseInput({ grossPay: 0, period: 'hour', stateRatePercent: 5 }),
  );

  assert.equal(result.annualGross, 0);
  assert.equal(result.totalTax, 0);
  assert.equal(result.annualNet, 0);
  assert.equal(result.netPerPeriod, 0);
  assert.equal(result.effectiveTaxRate, 0);
});

test('a figure that is not a number does not break the calculation', () => {
  const result = computeNetPay(
    baseInput({
      grossPay: Number.NaN,
      retirementContributionAnnual: Number.NaN,
      healthAccountDeductionsAnnual: Number.NaN,
    }),
  );

  assert.equal(result.annualGross, 0);
  assert.equal(result.preTaxDeductions, 0);
  assert.equal(result.annualNet, 0);
});
