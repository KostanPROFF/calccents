import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  averageYearlyBalance,
  compoundFutureValue,
  projectCompoundInterest,
  type CompoundInput,
} from './compound.ts';

function baseInput(overrides: Partial<CompoundInput> = {}): CompoundInput {
  return {
    principal: 10_000,
    monthlyContribution: 500,
    annualRatePercent: 7,
    years: 10,
    compoundsPerYear: 12,
    inflationPercent: 2.5,
    contributionTiming: 'end',
    ...overrides,
  };
}

test('compoundFutureValue matches the closed-form annuity result', () => {
  // 10,000 at 7% for 10 years with 500 a month.
  // P(1+r)^n + PMT((1+r)^n - 1)/r with r = 0.07/12 and n = 120.
  const rate = 0.07 / 12;
  const growth = (1 + rate) ** 120;
  const expected = 10_000 * growth + 500 * ((growth - 1) / rate);
  assert.ok(Math.abs(compoundFutureValue(baseInput()) - expected) < 0.02);
});

test('compoundFutureValue grows with a higher rate and a longer horizon', () => {
  const base = compoundFutureValue(baseInput());
  assert.ok(compoundFutureValue(baseInput({ annualRatePercent: 8 })) > base);
  assert.ok(compoundFutureValue(baseInput({ years: 20 })) > base);
  assert.ok(compoundFutureValue(baseInput({ monthlyContribution: 1000 })) > base);
});

test('compoundFutureValue at a zero rate is just the deposits', () => {
  const result = compoundFutureValue(baseInput({ annualRatePercent: 0 }));
  assert.ok(Math.abs(result - (10_000 + 500 * 12 * 10)) < 0.02);
});

test('compoundFutureValue over zero years returns the starting balance', () => {
  assert.equal(compoundFutureValue(baseInput({ years: 0 })), 10_000);
});

test('compoundFutureValue rejects a compounding frequency that does not divide twelve', () => {
  assert.throws(() => compoundFutureValue(baseInput({ compoundsPerYear: 5 })), /must be one of/);
  assert.throws(() => compoundFutureValue(baseInput({ compoundsPerYear: 0 })), /must be one of/);
});

test('projectCompoundInterest agrees with the closed form', () => {
  for (const compoundsPerYear of [1, 2, 3, 4, 6, 12]) {
    const input = baseInput({ compoundsPerYear });
    const projected = projectCompoundInterest(input);
    const analytical = compoundFutureValue(input);
    assert.ok(
      Math.abs(projected.futureValue - analytical) < 0.05,
      `frequency ${compoundsPerYear}: ${projected.futureValue} vs ${analytical}`,
    );
  }
});

test('projectCompoundInterest splits the final balance into contributions and interest', () => {
  const result = projectCompoundInterest(baseInput());
  assert.equal(result.totalContributions, 500 * 12 * 10);
  assert.ok(
    Math.abs(
      result.totalInterest -
        (result.futureValue - 10_000 - result.totalContributions),
    ) < 0.05,
  );
  assert.ok(result.totalInterest > 0);
});

test('projectCompoundInterest reports a real value below the nominal one when inflation is positive', () => {
  const result = projectCompoundInterest(baseInput());
  assert.ok(result.realValue < result.futureValue);
  assert.ok(result.realAnnualRatePercent < result.effectiveAnnualRatePercent);
  assert.ok(result.realAnnualRatePercent > 0);
});

test('projectCompoundInterest leaves the real value equal to the nominal one at zero inflation', () => {
  const result = projectCompoundInterest(baseInput({ inflationPercent: 0 }));
  assert.ok(Math.abs(result.realValue - result.futureValue) < 0.05);
  // With no inflation the real annual rate is the nominal rate, which is
  // not the same number as the effective rate once compounding is applied.
  assert.ok(Math.abs(result.realAnnualRatePercent - 7) < 0.0001);
});

test('projectCompoundInterest reports the effective annual rate for each frequency', () => {
  const monthly = projectCompoundInterest(baseInput({ compoundsPerYear: 12 }));
  const annual = projectCompoundInterest(baseInput({ compoundsPerYear: 1 }));
  const expectedMonthly = ((1 + 0.07 / 12) ** 12 - 1) * 100;
  assert.ok(Math.abs(monthly.effectiveAnnualRatePercent - expectedMonthly) < 0.001);
  assert.ok(Math.abs(annual.effectiveAnnualRatePercent - 7) < 0.0001);
});

test('projectCompoundInterest gives a larger balance for contributions made at the start', () => {
  const end = projectCompoundInterest(baseInput({ contributionTiming: 'end' }));
  const begin = projectCompoundInterest(baseInput({ contributionTiming: 'begin' }));
  assert.ok(begin.futureValue > end.futureValue);
});

test('projectCompoundInterest builds one row per year', () => {
  const result = projectCompoundInterest(baseInput());
  assert.equal(result.yearly.length, 10);
  assert.equal(result.yearly[0]?.year, 1);
  assert.equal(result.yearly.at(-1)?.year, 10);
  assert.ok((result.yearly.at(-1)?.balance ?? 0) > (result.yearly[0]?.balance ?? 0));
});

test('projectCompoundInterest over zero years returns the starting balance', () => {
  const result = projectCompoundInterest(baseInput({ years: 0 }));
  assert.equal(result.futureValue, 10_000);
  assert.equal(result.totalContributions, 0);
  assert.equal(result.totalInterest, 0);
  assert.equal(result.yearly.length, 0);
});

test('averageYearlyBalance divides the yearly balances', () => {
  const result = projectCompoundInterest(baseInput());
  const value = averageYearlyBalance(result);
  assert.ok(value > 0);
  assert.ok(value < result.futureValue);
});

test('compoundFutureValue rejects a horizon that would loop for billions of periods', () => {
  assert.throws(
    () =>
      compoundFutureValue({
        principal: 1000,
        monthlyContribution: 0,
        annualRatePercent: 5,
        years: 1e9,
        compoundsPerYear: 12,
        contributionTiming: 'end',
        inflationPercent: 0,
      }),
    /100 or fewer/,
  );
});
