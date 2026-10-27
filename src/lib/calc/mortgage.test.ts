import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  balanceAfterMonths,
  buildAmortization,
  computeMonthlyPayment,
  percentPaid,
  type MortgageInput,
} from './mortgage.ts';

const START = new Date(2026, 0, 1);

function baseInput(overrides: Partial<MortgageInput> = {}): MortgageInput {
  return {
    principal: 300_000,
    annualRatePercent: 6.5,
    termYears: 30,
    propertyTaxAnnual: 6_000,
    homeownersInsuranceAnnual: 1_800,
    hoaMonthly: 0,
    extraMonthlyPayment: 0,
    startDate: START,
    ...overrides,
  };
}

test('computeMonthlyPayment matches published amortized loan figures', () => {
  assert.equal(computeMonthlyPayment(300_000, 6.5, 360), 1896.2);
  assert.equal(computeMonthlyPayment(200_000, 5, 360), 1073.64);
  assert.equal(computeMonthlyPayment(100_000, 4, 180), 739.69);
});

test('computeMonthlyPayment degenerates to principal over n months at a zero rate', () => {
  assert.equal(computeMonthlyPayment(120_000, 0, 12), 10_000);
  assert.equal(computeMonthlyPayment(120_000, 0, 360), 333.33);
});

test('computeMonthlyPayment returns zero for a zero loan', () => {
  assert.equal(computeMonthlyPayment(0, 6.5, 360), 0);
});

test('computeMonthlyPayment rejects impossible inputs', () => {
  assert.throws(() => computeMonthlyPayment(100_000, 6.5, 0), /at least one month/);
  assert.throws(() => computeMonthlyPayment(-1, 6.5, 360), /zero or more/);
  assert.throws(() => computeMonthlyPayment(100_000, -1, 360), /zero or more/);
});

test('buildAmortization produces a schedule that closes out exactly', () => {
  const result = buildAmortization(baseInput());

  assert.equal(result.numberOfPayments, 360);
  assert.equal(result.payoffMonths, 360);
  assert.equal(result.schedule.at(-1)?.balance, 0);

  const paidPrincipal =
    result.schedule.reduce((total, row) => total + row.principal + row.extra, 0);
  assert.ok(Math.abs(paidPrincipal - result.originalPrincipal) < 0.05);
  assert.ok(Math.abs(result.totalPaid - (result.originalPrincipal + result.totalInterest)) < 0.05);
});

test('buildAmortization totals match the sum of the schedule rows', () => {
  const result = buildAmortization(baseInput());
  const interest = result.schedule.reduce((total, row) => total + row.interest, 0);
  assert.ok(Math.abs(result.totalInterest - interest) < 0.05);
  assert.equal(result.totalExtraPayments, 0);
});

test('buildAmortization adds tax, insurance and HOA to the monthly figure', () => {
  const result = buildAmortization(
    baseInput({ propertyTaxAnnual: 6_000, homeownersInsuranceAnnual: 1_800, hoaMonthly: 150 }),
  );
  const expected =
    result.monthlyPrincipalAndInterest + 6000 / 12 + 1800 / 12 + 150;
  assert.ok(Math.abs(result.monthlyPiti - expected) < 0.01);
});

test('buildAmortization shortens the schedule when extra payments are made', () => {
  const plain = buildAmortization(baseInput());
  const accelerated = buildAmortization(baseInput({ extraMonthlyPayment: 200 }));

  assert.ok(accelerated.numberOfPayments < plain.numberOfPayments);
  assert.ok(accelerated.totalInterest < plain.totalInterest);
  assert.ok(accelerated.totalExtraPayments > 0);
  assert.equal(accelerated.schedule.at(-1)?.balance, 0);
});

test('buildAmortization sums extra payments into the principal total', () => {
  const result = buildAmortization(baseInput({ extraMonthlyPayment: 200 }));
  const extra = result.schedule.reduce((total, row) => total + row.extra, 0);
  assert.ok(Math.abs(result.totalExtraPayments - extra) < 0.05);
});

test('buildAmortization reports the payoff month', () => {
  const result = buildAmortization(baseInput());
  // The first payment is made in January 2026, so the 360th is made in
  // December 2055, and that is the month the loan closes in.
  assert.equal(result.payoffDate.getTime(), new Date(2055, 11, 1).getTime());
});

test('buildAmortization reports the month of a loan that closes on the first payment', () => {
  const result = buildAmortization(baseInput({ principal: 1_000, termYears: 1 }));
  assert.equal(result.numberOfPayments, 12);
  assert.equal(result.payoffDate.getTime(), new Date(2026, 11, 1).getTime());
});

test('computeMonthlyPayment stays finite at a rate that is almost zero', () => {
  const payment = computeMonthlyPayment(300_000, 1e-18, 360);
  assert.ok(Number.isFinite(payment));
  // The payment tends to the loan spread over the term.
  assert.ok(Math.abs(payment - 300_000 / 360) < 0.01);
  const tiny = computeMonthlyPayment(300_000, 1e-30, 360);
  assert.ok(Number.isFinite(tiny));
});

test('buildAmortization handles a zero interest rate', () => {
  const result = buildAmortization(baseInput({ annualRatePercent: 0, termYears: 5 }));
  assert.equal(result.numberOfPayments, 60);
  assert.equal(result.totalInterest, 0);
  assert.equal(result.schedule.at(-1)?.balance, 0);
});

test('buildAmortization handles a zero loan', () => {
  const result = buildAmortization(baseInput({ principal: 0 }));
  assert.equal(result.monthlyPrincipalAndInterest, 0);
  assert.equal(result.numberOfPayments, 0);
  assert.equal(result.schedule.length, 0);
});

test('buildAmortization builds a yearly summary with one row per year', () => {
  const result = buildAmortization(baseInput());
  assert.equal(result.yearly.length, 30);
  assert.equal(result.yearly[0]?.year, 1);
  assert.equal(result.yearly.at(-1)?.year, 30);
  assert.equal(result.yearly.at(-1)?.yearEndBalance, 0);
});

test('buildAmortization rejects invalid inputs', () => {
  assert.throws(() => buildAmortization(baseInput({ annualRatePercent: -1 })), /zero or more/);
  assert.throws(() => buildAmortization(baseInput({ termYears: 0 })), /at least one year/);
  assert.throws(() => buildAmortization(baseInput({ startDate: new Date('nonsense') })), /valid date/);
  assert.throws(() => buildAmortization(baseInput({ extraMonthlyPayment: -5 })), /zero or more/);
});

test('balanceAfterMonths walks the balance down to zero', () => {
  const result = buildAmortization(baseInput());
  assert.equal(balanceAfterMonths(result, 0), result.originalPrincipal);
  assert.equal(balanceAfterMonths(result, 360), 0);
  assert.equal(balanceAfterMonths(result, 999), 0);
  assert.ok(balanceAfterMonths(result, 12) < result.originalPrincipal);
});

test('percentPaid reports the share of the original loan already repaid', () => {
  const result = buildAmortization(baseInput());
  assert.equal(percentPaid(result, 0), 0);
  assert.equal(percentPaid(result, 360), 100);
  assert.ok(percentPaid(result, 12) > 0 && percentPaid(result, 12) < 5);
});
