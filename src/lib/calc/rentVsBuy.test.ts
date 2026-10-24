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
  // The yearly rate entered is the effective yearly change, spread evenly
  // across the months, so five years at 3 percent is 1.03 to the fifth.
  const expected = 400_000 * 1.03 ** 5;
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
        (result.ownershipCashOutOverHorizon - result.equityAtHorizon + result.sellingCostsAtHorizon),
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

test('compareRentAndBuy stops the mortgage payment when the loan is paid off', () => {
  // A 12,000 dollar loan at no interest over one year is 1,000 dollars a
  // month for twelve months. A two year horizon must not add a second
  // year of payments that the loan does not have.
  const result = compareRentAndBuy(
    baseInput({
      homePrice: 12_000,
      downPaymentPercent: 0,
      mortgageRatePercent: 0,
      mortgageTermYears: 1,
      annualPropertyTaxPercent: 0,
      annualInsurance: 0,
      annualMaintenancePercent: 0,
      closingCostPercent: 0,
      sellingCostPercent: 0,
      horizonYears: 2,
    }),
  );

  assert.equal(result.monthlyPrincipalAndInterest, 1_000);
  assert.equal(result.ownershipCashOutOverHorizon, 12_000);
});

test('compareRentAndBuy keeps the running costs after the loan is paid off', () => {
  const result = compareRentAndBuy(
    baseInput({
      homePrice: 120_000,
      downPaymentPercent: 20,
      mortgageRatePercent: 0,
      mortgageTermYears: 1,
      annualPropertyTaxPercent: 1,
      annualInsurance: 1_200,
      annualMaintenancePercent: 1,
      horizonYears: 2,
    }),
  );

  // 100 a month of tax, 100 a month of insurance and 100 a month of
  // maintenance once the loan is gone.
  assert.equal(result.monthlyOwnershipAfterPayoff, 300);
  assert.ok(result.monthlyOwnership > result.monthlyOwnershipAfterPayoff);
});

test('compareRentAndBuy counts the selling costs in the cost of owning', () => {
  const without = compareRentAndBuy(baseInput({ sellingCostPercent: 0 }));
  const with_ = compareRentAndBuy(baseInput({ sellingCostPercent: 10 }));

  assert.ok(
    Math.abs(
      with_.netOwnershipCostAtHorizon -
        (without.netOwnershipCostAtHorizon + with_.sellingCostsAtHorizon),
    ) < 0.01,
  );
  assert.ok(
    Math.abs(
      with_.netEquityAtHorizon -
        (with_.equityAtHorizon - with_.sellingCostsAtHorizon),
    ) < 0.01,
  );
});

test('compareRentAndBuy lets the selling costs move the crossover', () => {
  // A home bought outright for 12,000 dollars with no rent: the cost of
  // owning is zero at the start, and 10 percent of selling costs puts it
  // above the rent of zero, so the crossover disappears.
  const shared = {
    homePrice: 12_000,
    downPaymentPercent: 0,
    mortgageRatePercent: 0,
    mortgageTermYears: 1,
    monthlyRent: 0,
    annualPropertyTaxPercent: 0,
    annualInsurance: 0,
    monthlyHoa: 0,
    annualMaintenancePercent: 0,
    annualAppreciationPercent: 0,
    closingCostPercent: 0,
    rentersInsuranceMonthly: 0,
    horizonYears: 1,
    startDate: START,
  };

  const without = compareRentAndBuy({ ...shared, sellingCostPercent: 0 });
  const with_ = compareRentAndBuy({ ...shared, sellingCostPercent: 10 });

  assert.equal(without.breakEvenMonth, 1);
  assert.equal(with_.breakEvenMonth, null);
  assert.equal(with_.sellingCostsAtHorizon, 1_200);
  assert.equal(without.netOwnershipCostAtHorizon, 0);
  assert.equal(with_.netOwnershipCostAtHorizon, 1_200);
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
