import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  comparePayoff,
  simulatePayoff,
  type Debt,
} from './debtPayoff.ts';

function debt(overrides: Partial<Debt> & { id: string }): Debt {
  return {
    name: overrides.id,
    balance: 1_000,
    aprPercent: 12,
    minimumPayment: 50,
    ...overrides,
  };
}

test('a single debt is paid off month by month', () => {
  const result = simulatePayoff([debt({ id: 'a', balance: 10_000, aprPercent: 18, minimumPayment: 200 })], 0, 'avalanche');

  // The interest is 150 dollars in the first month, so the principal falls
  // by 50 a month and then by a little more each month, because the
  // interest is charged on a balance that is going down. The loan clears
  // in 94 months.
  assert.equal(result.months, 94);
  assert.equal(result.payoffMonthById.a, 94);
  assert.ok(
    Math.abs(result.totalPaid - 18_622.34) < 1,
    `paid ${result.totalPaid}`,
  );
  assert.ok(
    Math.abs(result.totalInterest - 8_622.34) < 1,
    `interest was ${result.totalInterest}`,
  );
  assert.equal(result.yearlyBalances.length, 7);
  assert.ok(
    Math.abs(result.yearlyBalances[0].balances.a - 9_347.94) < 1,
    `balance after a year was ${result.yearlyBalances[0].balances.a}`,
  );
});

test('an extra payment shortens the payoff and saves interest', () => {
  const debts = [debt({ id: 'a', balance: 10_000, aprPercent: 18, minimumPayment: 200 })];
  const withExtra = simulatePayoff(debts, 300, 'avalanche');
  const without = simulatePayoff(debts, 0, 'avalanche');

  assert.ok(withExtra.months < without.months);
  assert.ok(withExtra.totalInterest < without.totalInterest);
});

test('the avalanche order pays the highest rate first', () => {
  const debts = [
    debt({ id: 'slow', balance: 5_000, aprPercent: 6, minimumPayment: 100 }),
    debt({ id: 'fast', balance: 5_000, aprPercent: 24, minimumPayment: 100 }),
  ];

  const result = simulatePayoff(debts, 400, 'avalanche');
  const avalancheFirst = result.payoffMonthById.fast;
  const avalancheLast = result.payoffMonthById.slow;
  assert.ok(avalancheFirst < avalancheLast, `${avalancheFirst} should be before ${avalancheLast}`);
});

test('the snowball order pays the smallest balance first', () => {
  const debts = [
    debt({ id: 'big', balance: 5_000, aprPercent: 24, minimumPayment: 100 }),
    debt({ id: 'small', balance: 1_000, aprPercent: 6, minimumPayment: 50 }),
  ];

  const result = simulatePayoff(debts, 400, 'snowball');
  assert.ok(
    result.payoffMonthById.small < result.payoffMonthById.big,
    `${result.payoffMonthById.small} should be before ${result.payoffMonthById.big}`,
  );
});

test('the avalanche order saves more interest than the snowball', () => {
  const debts = [
    debt({ id: 'big', balance: 5_000, aprPercent: 24, minimumPayment: 100 }),
    debt({ id: 'small', balance: 1_000, aprPercent: 6, minimumPayment: 50 }),
  ];

  const comparison = comparePayoff(debts, 300);

  // The minimums cover the interest on these debts, so the baseline is a
  // finished schedule and both savings figures exist.
  assert.ok(comparison.minimumOnly.paidOff);
  assert.notEqual(comparison.interestSavedAvalanche, null);
  assert.notEqual(comparison.interestSavedSnowball, null);
  assert.ok(
    comparison.interestSavedAvalanche! > comparison.interestSavedSnowball!,
    `${comparison.interestSavedAvalanche} should be more than ${comparison.interestSavedSnowball}`,
  );
  assert.ok(comparison.interestSavedAvalanche! > 0);
  assert.ok(comparison.interestSavedSnowball! > 0);
  assert.equal(comparison.firstDebtAvalanche, 'big');
  assert.equal(comparison.firstDebtSnowball, 'small');
});

test('paying the minimums only is the baseline the others are compared to', () => {
  const debts = [debt({ id: 'a', balance: 2_000, aprPercent: 10, minimumPayment: 100 })];
  const comparison = comparePayoff(debts, 200);

  assert.ok(comparison.minimumOnly.months > comparison.avalanche.months);
  assert.ok(comparison.minimumOnly.totalInterest > comparison.avalanche.totalInterest);
  assert.equal(
    comparison.interestSavedAvalanche,
    Math.round((comparison.minimumOnly.totalInterest - comparison.avalanche.totalInterest) * 100) / 100,
  );
});

test('a debt with a minimum payment larger than the balance clears in one month', () => {
  const result = simulatePayoff(
    [debt({ id: 'a', balance: 100, aprPercent: 0, minimumPayment: 500 })],
    0,
    'avalanche',
  );

  assert.equal(result.months, 1);
  assert.equal(result.payoffMonthById.a, 1);
  assert.equal(result.totalPaid, 100);
  assert.equal(result.totalInterest, 0);
});

test('a debt at zero interest is paid off by the principal alone', () => {
  const result = simulatePayoff(
    [debt({ id: 'a', balance: 1_200, aprPercent: 0, minimumPayment: 100 })],
    0,
    'avalanche',
  );

  assert.equal(result.months, 12);
  assert.equal(result.totalInterest, 0);
  assert.equal(result.totalPaid, 1_200);
});

test('a debt that never clears stops at the horizon instead of looping', () => {
  const result = simulatePayoff(
    [debt({ id: 'a', balance: 1_000_000, aprPercent: 29, minimumPayment: 10 })],
    0,
    'avalanche',
  );

  assert.equal(result.months, 1_200);
  assert.ok(result.totalInterest > 0);
  assert.equal(result.paidOff, false);
});

test('a debt that clears reports that it cleared', () => {
  const result = simulatePayoff(
    [debt({ id: 'a', balance: 1_200, aprPercent: 0, minimumPayment: 100 })],
    0,
    'avalanche',
  );

  assert.equal(result.paidOff, true);
});

test('a minimum payment below the monthly interest never clears the debt', () => {
  // 19.99 percent on 12,000 dollars is about 200 dollars of interest a
  // month, and the minimum payment is 120. The balance grows every month,
  // so the run hits the horizon without ever clearing the debt.
  const debts = [
    debt({ id: 'a', balance: 12_000, aprPercent: 19.99, minimumPayment: 120 }),
  ];

  const comparison = comparePayoff(debts, 300);

  assert.equal(comparison.minimumOnly.paidOff, false);
  assert.equal(comparison.minimumOnly.months, 1_200);
  // There is no finished baseline to save interest against, so the figure
  // is left empty rather than printed as a number that means nothing.
  assert.equal(comparison.interestSavedAvalanche, null);
  assert.equal(comparison.interestSavedSnowball, null);
  // The extra payment is what clears the debt.
  assert.equal(comparison.avalanche.paidOff, true);
  assert.equal(comparison.snowball.paidOff, true);
  assert.equal(comparison.avalanche.months, 40);
});

test('no debts means nothing to pay off', () => {
  const result = simulatePayoff([], 100, 'avalanche');

  assert.equal(result.months, 0);
  assert.equal(result.totalInterest, 0);
  assert.equal(result.totalPaid, 0);
  assert.deepEqual(result.payoffMonthById, {});
});

test('a figure that is not a number does not break the simulation', () => {
  const result = simulatePayoff(
    [debt({ id: 'a', balance: Number.NaN, minimumPayment: Number.NaN })],
    Number.NaN,
    'avalanche',
  );

  assert.equal(result.months, 0);
});

test('a debt with no balance is left out of the simulation', () => {
  const result = simulatePayoff(
    [
      debt({ id: 'paid', balance: 0, minimumPayment: 100 }),
      debt({ id: 'live', balance: 600, aprPercent: 0, minimumPayment: 100 }),
    ],
    0,
    'avalanche',
  );

  assert.equal(result.months, 6);
  assert.equal(result.payoffMonthById.paid, undefined);
  assert.equal(result.payoffMonthById.live, 6);
});

test('a debt with a rate that is not a number is treated as no interest', () => {
  const result = simulatePayoff(
    [debt({ id: 'a', balance: 1_000, aprPercent: Number.NaN, minimumPayment: 100 })],
    0,
    'avalanche',
  );

  assert.equal(result.totalInterest, 0);
  assert.equal(result.months, 10);
});

test('a debt with a negative rate is treated as no interest', () => {
  const result = simulatePayoff(
    [debt({ id: 'a', balance: 1_000, aprPercent: -5, minimumPayment: 100 })],
    0,
    'avalanche',
  );

  assert.equal(result.totalInterest, 0);
});

test('debts with the same rate are ordered by their id', () => {
  const debts = [
    debt({ id: 'b', balance: 2_000, aprPercent: 12, minimumPayment: 50 }),
    debt({ id: 'a', balance: 1_000, aprPercent: 12, minimumPayment: 50 }),
  ];

  const result = simulatePayoff(debts, 200, 'avalanche');
  assert.ok(
    result.payoffMonthById.a < result.payoffMonthById.b,
    `${result.payoffMonthById.a} should be before ${result.payoffMonthById.b}`,
  );
});

test('debts with the same balance are ordered by their id', () => {
  const debts = [
    debt({ id: 'b', balance: 1_000, aprPercent: 6, minimumPayment: 50 }),
    debt({ id: 'a', balance: 1_000, aprPercent: 24, minimumPayment: 50 }),
  ];

  const result = simulatePayoff(debts, 200, 'snowball');
  assert.ok(
    result.payoffMonthById.a < result.payoffMonthById.b,
    `${result.payoffMonthById.a} should be before ${result.payoffMonthById.b}`,
  );
});
