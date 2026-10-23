import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  ADDITIONAL_MEDICARE_THRESHOLD,
  MEDICARE_RATE,
  SOCIAL_SECURITY_RATE,
  SOCIAL_SECURITY_WAGE_BASE,
  STANDARD_DEDUCTION,
  TAX_YEAR,
  additionalMedicareTax,
  computeIncomeTax,
  federalIncomeTax,
  ficaTaxes,
  marginalRate,
  medicareTax,
  socialSecurityTax,
  standardDeduction,
  stateIncomeTax,
  taxableIncome,
} from './tax.ts';

test('the tax year and the standard deductions are the 2026 figures', () => {
  assert.equal(TAX_YEAR, 2026);
  assert.equal(STANDARD_DEDUCTION.single, 16_100);
  assert.equal(STANDARD_DEDUCTION.married, 32_200);
  assert.equal(STANDARD_DEDUCTION['head-of-household'], 24_150);
  assert.equal(standardDeduction('single'), 16_100);
});

test('federalIncomeTax matches the 2026 single rate table', () => {
  // 10% up to 12,400, then 12% up to 50,400.
  assert.equal(federalIncomeTax(12_400, 'single'), 1_240);
  assert.equal(federalIncomeTax(50_000, 'single'), 5_752);
  // The 22% bracket starts at 50,400 with a base tax of 5,800.
  assert.equal(federalIncomeTax(60_000, 'single'), 7_912);
  assert.equal(federalIncomeTax(150_000, 'single'), 28_598);
  // The top bracket: 191,171 + 37% over 640,600.
  assert.equal(federalIncomeTax(700_000, 'single'), 214_957.25);
});

test('federalIncomeTax matches the 2026 married filing jointly table', () => {
  assert.equal(federalIncomeTax(24_800, 'married'), 2_480);
  assert.equal(federalIncomeTax(100_000, 'married'), 11_504);
  // The 24% bracket: 35,932 + 24% of the income above 211,400.
  assert.equal(federalIncomeTax(300_000, 'married'), 57_196);
});

test('federalIncomeTax matches the 2026 head of household table', () => {
  assert.equal(federalIncomeTax(17_700, 'head-of-household'), 1_770);
  assert.equal(federalIncomeTax(60_000, 'head-of-household'), 6_846);
  // The 32% bracket: 39,207 + 32% of the income above 201,750.
  assert.equal(federalIncomeTax(250_000, 'head-of-household'), 54_647);
});

test('federalIncomeTax is zero for income that does not exist', () => {
  assert.equal(federalIncomeTax(0, 'single'), 0);
  assert.equal(federalIncomeTax(-5_000, 'single'), 0);
  assert.equal(federalIncomeTax(Number.NaN, 'single'), 0);
});

test('federalIncomeTax falls back to nothing for an income it cannot place', () => {
  assert.equal(federalIncomeTax(Number.POSITIVE_INFINITY, 'single'), 0);
});

test('marginalRate reports the rate the next dollar meets', () => {
  assert.equal(marginalRate(10_000, 'single'), 0.1);
  assert.equal(marginalRate(30_000, 'single'), 0.12);
  assert.equal(marginalRate(80_000, 'single'), 0.22);
  assert.equal(marginalRate(150_000, 'single'), 0.24);
  assert.equal(marginalRate(220_000, 'single'), 0.32);
  assert.equal(marginalRate(300_000, 'single'), 0.35);
  assert.equal(marginalRate(700_000, 'single'), 0.37);
  assert.equal(marginalRate(0, 'single'), 0.1);
  assert.equal(marginalRate(Number.NaN, 'single'), 0.1);
  assert.equal(marginalRate(Number.POSITIVE_INFINITY, 'single'), 0.1);
});

test('the Social Security tax stops at the wage base', () => {
  assert.equal(SOCIAL_SECURITY_WAGE_BASE, 184_500);
  assert.equal(SOCIAL_SECURITY_RATE, 0.062);
  assert.equal(socialSecurityTax(100_000), 6_200);
  assert.equal(socialSecurityTax(SOCIAL_SECURITY_WAGE_BASE), 11_439);
  // Above the base the tax does not grow any further.
  assert.equal(socialSecurityTax(300_000), 11_439);
  assert.equal(socialSecurityTax(0), 0);
});

test('the Medicare tax has no ceiling', () => {
  assert.equal(MEDICARE_RATE, 0.0145);
  assert.equal(medicareTax(100_000), 1_450);
  assert.equal(medicareTax(1_000_000), 14_500);
  assert.equal(medicareTax(-1), 0);
});

test('the Additional Medicare Tax starts above the threshold', () => {
  assert.equal(ADDITIONAL_MEDICARE_THRESHOLD.single, 200_000);
  assert.equal(ADDITIONAL_MEDICARE_THRESHOLD.married, 250_000);
  assert.equal(ADDITIONAL_MEDICARE_THRESHOLD['head-of-household'], 200_000);

  assert.equal(additionalMedicareTax(199_000, 'single'), 0);
  assert.equal(additionalMedicareTax(250_000, 'single'), 450);
  assert.equal(additionalMedicareTax(300_000, 'married'), 450);
  assert.equal(additionalMedicareTax(0, 'single'), 0);
});

test('ficaTaxes adds the three payroll taxes together', () => {
  const under = ficaTaxes(100_000, 'single');
  assert.equal(under.socialSecurity, 6_200);
  assert.equal(under.medicare, 1_450);
  assert.equal(under.additionalMedicare, 0);
  assert.equal(under.total, 7_650);

  const over = ficaTaxes(250_000, 'single');
  assert.equal(over.socialSecurity, 11_439);
  assert.equal(over.medicare, 3_625);
  assert.equal(over.additionalMedicare, 450);
  assert.equal(over.total, 15_514);
});

test('taxableIncome subtracts the standard deduction by default', () => {
  assert.equal(taxableIncome(100_000, 'single'), 83_900);
  assert.equal(taxableIncome(100_000, 'married'), 67_800);
  assert.equal(taxableIncome(10_000, 'single'), 0);
});

test('taxableIncome uses an itemised deduction when one is given', () => {
  assert.equal(taxableIncome(100_000, 'single', 25_000), 75_000);
  // A deduction below the standard one is used as given.
  assert.equal(taxableIncome(100_000, 'single', 5_000), 95_000);
});

test('stateIncomeTax applies the rate the reader typed', () => {
  assert.equal(stateIncomeTax(100_000, 5), 5_000);
  assert.equal(stateIncomeTax(100_000, 0), 0);
  assert.equal(stateIncomeTax(100_000, -3), 0);
  assert.equal(stateIncomeTax(0, 5), 0);
});

test('computeIncomeTax separates the federal tax from the state tax', () => {
  const result = computeIncomeTax({
    grossIncome: 100_000,
    filingStatus: 'single',
    preTaxDeductions: 0,
    itemisedDeduction: 0,
    stateRatePercent: 0,
  });

  assert.equal(result.deduction, 16_100);
  assert.equal(result.taxableIncome, 83_900);
  // 17,966 + 24% of the income above 105,700 is not reached; this is the
  // 24% bracket: 17,966 + 24% of (83,900 - 105,700) cannot apply, so the
  // 22% bracket applies: 5,800 + 22% of (83,900 - 50,400).
  assert.equal(result.federalTax, 5_800 + 0.22 * (83_900 - 50_400));
  assert.equal(result.stateTax, 0);
  assert.equal(result.totalTax, result.federalTax);
  assert.equal(result.afterTaxIncome, 100_000 - result.federalTax);
  assert.equal(result.marginalRate, 0.22);
});

test('computeIncomeTax adds a state rate on top of the federal tax', () => {
  const result = computeIncomeTax({
    grossIncome: 100_000,
    filingStatus: 'single',
    preTaxDeductions: 0,
    itemisedDeduction: 0,
    stateRatePercent: 5,
  });

  assert.equal(result.stateTax, 83_900 * 0.05);
  assert.equal(result.totalTax, result.federalTax + result.stateTax);
  assert.equal(result.effectiveRate, 17.37);
});

test('computeIncomeTax takes pre-tax deductions off before the deduction', () => {
  const result = computeIncomeTax({
    grossIncome: 100_000,
    filingStatus: 'single',
    preTaxDeductions: 10_000,
    itemisedDeduction: 0,
    stateRatePercent: 0,
  });

  assert.equal(result.preTaxDeductions, 10_000);
  assert.equal(result.taxableIncome, 100_000 - 10_000 - 16_100);
  assert.equal(result.afterTaxIncome, 100_000 - 10_000 - result.federalTax);
});

test('computeIncomeTax prefers an itemised deduction over the standard one', () => {
  const result = computeIncomeTax({
    grossIncome: 100_000,
    filingStatus: 'single',
    preTaxDeductions: 0,
    itemisedDeduction: 30_000,
    stateRatePercent: 0,
  });

  assert.equal(result.deduction, 30_000);
  assert.equal(result.taxableIncome, 70_000);
});

test('computeIncomeTax keeps the standard deduction when itemising is smaller', () => {
  const result = computeIncomeTax({
    grossIncome: 100_000,
    filingStatus: 'single',
    preTaxDeductions: 0,
    itemisedDeduction: 5_000,
    stateRatePercent: 0,
  });

  // A taxpayer who itemises below the standard amount still gets the
  // standard deduction: it is the larger of the two that applies.
  assert.equal(result.deduction, 16_100);
  assert.equal(result.taxableIncome, 83_900);
});

test('computeIncomeTax handles an income of nothing', () => {
  const result = computeIncomeTax({
    grossIncome: 0,
    filingStatus: 'single',
    preTaxDeductions: 0,
    itemisedDeduction: 0,
    stateRatePercent: 5,
  });

  assert.equal(result.taxableIncome, 0);
  assert.equal(result.totalTax, 0);
  assert.equal(result.effectiveRate, 0);
  assert.equal(result.afterTaxIncome, 0);
});
