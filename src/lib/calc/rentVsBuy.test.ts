import { test } from 'node:test';
import assert from 'node:assert/strict';

import { compareRentAndBuy, realizedHomeReturn, type RentVsBuyInput } from './rentVsBuy.ts';

const START = new Date(2026, 0, 1);

function baseInput(overrides: Partial<RentVsBuyInput> = {}): RentVsBuyInput {
  return {
    homePrice: 400_000,
    downPaymentPercent: 20,
    mortgageRatePercent: 6.5,
    mortgageTermYears: 30,
    monthlyRent: 2_500,
    annualPropertyTaxPercent: 1.1,
    annualInsurance: 1_800,
    monthlyHoa: 0,
    annualMaintenancePercent: 1,
    annualAppreciationPercent: 3,
    sellingCostPercent: 6,
    closingCostPercent: 2.5,
    rentersInsuranceMonthly: 20,
    horizonYears: 5,
    startDate: START,
    ...overrides,
  };
}

test('compareRentAndBuy splits the purchase into down payment and loan', () => {
  const result = compareRentAndBuy(baseInput());
  assert.equal(result.downPayment, 80_000);
  assert.equal(result.loanAmount, 320_000);
  assert.equal(result.closingCosts, 10_000);
  assert.equal(result.upfrontCost, 90_000);
});

test('compareRentAndBuy builds the monthly ownership figure from every component', () => {
  const result = compareRentAndBuy(baseInput());
  const expected =
    result.monthlyPrincipalAndInterest +
    (400_000 * 0.011) / 12 +
    1_800 / 12 +
    0 +
    (400_000 * 0.01) / 12;
  assert.ok(Math.abs(result.monthlyOwnership - expected) < 0.05);
  assert.equal(result.monthlyRentTotal, 2_520);
  assert.ok(Math.abs(result.monthlyDifference - (result.monthlyOwnership - 2_520)) < 0.05);
});

test('compareRentAndBuy totals the rent over the whole horizon', () => {
  const result = compareRentAndBuy(baseInput());
  assert.equal(result.totalRentOverHorizon, 2_520 * 60);
});

test('compareRentAndBuy grows the home value with appreciation', () => {
  const result = compareRentAndBuy(baseInput({ annualAppreciationPercent: 3 }));
  assert.ok(result.homeValueAtHorizon > 400_000);
  // Appreciation is applied monthly, which is how a yearly rate actually
  // accumulates on a property.
  const expected = 400_000 * (1 + 0.03 / 12) ** 60;
  assert.ok(Math.abs(result.homeValueAtHorizon - expected) < 1);
});

test('compareRentAndBuy handles a falling home value', () => {
  const result = compareRentAndBuy(baseInput({ annualAppreciationPercent: -2 }));
  assert.ok(result.homeValueAtHorizon < 400_000);
  assert.ok(result.equityAtHorizon < result.downPayment + 1);
});

test('compareRentAndBuy never reports a crossover when rent is negligible', () => {
  const result = compareRentAndBuy(baseInput({ monthlyRent: 1, homePrice: 900_000 }));
  assert.equal(result.breakEvenMonth, null);
  assert.equal(result.breakEvenDate, null);
});

test('compareRentAndBuy reports a crossover month when rent is high', () => {
  const result = compareRentAndBuy(baseInput({ monthlyRent: 4_000 }));
  assert.notEqual(result.breakEvenMonth, null);
  assert.ok((result.breakEvenMonth ?? 0) > 0);
  assert.ok((result.breakEvenMonth ?? 0) <= 60);
});

test('compareRentAndBuy subtracts equity from the cash paid', () => {
  const result = compareRentAndBuy(baseInput());
  assert.ok(
    Math.abs(
      result.netOwnershipCostAtHorizon -
        (result.ownershipCashOutOverHorizon - result.equityAtHorizon),
    ) < 0.01,
  );
  assert.ok(
    Math.abs(
      result.equityAtHorizon -
        (result.homeValueAtHorizon - (result.yearly.at(-1)?.remainingBalance ?? 0)),
    ) < 0.01,
  );
});

test('compareRentAndBuy produces a yearly row for every year of the horizon', () => {
  const result = compareRentAndBuy(baseInput());
  assert.equal(result.yearly.length, 5);
  assert.equal(result.yearly[0]?.year, 1);
  assert.equal(result.yearly.at(-1)?.year, 5);
});

test('compareRentAndBuy charges selling costs only on the final value', () => {
  const result = compareRentAndBuy(baseInput());
  assert.ok(Math.abs(result.sellingCostsAtHorizon - result.homeValueAtHorizon * 0.06) < 1);
});

test('compareRentAndBuy rejects invalid inputs', () => {
  assert.throws(() => compareRentAndBuy(baseInput({ homePrice: 0 })), /greater than zero/);
  assert.throws(() => compareRentAndBuy(baseInput({ horizonYears: 0 })), /at least one year/);
  assert.throws(() => compareRentAndBuy(baseInput({ monthlyRent: -1 })), /zero or more/);
  assert.throws(() => compareRentAndBuy(baseInput({ startDate: new Date('nope') })), /valid date/);
});

test('realizedHomeReturn compares equity with the cash put in', () => {
  const result = compareRentAndBuy(baseInput());
  const value = realizedHomeReturn(result, result.upfrontCost);
  assert.ok(Number.isFinite(value));
  assert.ok(value > 0);
});
