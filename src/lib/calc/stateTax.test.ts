import { test } from 'node:test';
import assert from 'node:assert/strict';

import { STATES } from '../data/states.ts';
import {
  stateByCode,
  stateIncomeRate,
  stateName,
  statePropertyTaxRate,
} from './stateTax.ts';

/** The states that levy no tax on wages. */
const NO_WAGE_TAX = ['AK', 'FL', 'NV', 'NH', 'SD', 'TN', 'TX', 'WY'];

test('the table holds every state and the District of Columbia', () => {
  assert.equal(Object.keys(STATES).length, 51);
  for (const [code, state] of Object.entries(STATES)) {
    assert.equal(state.code, code);
    assert.ok(state.name.length > 0, `${code} has a name`);
  }
});

test('every state carries a property tax rate between zero and ten percent', () => {
  for (const [code, state] of Object.entries(STATES)) {
    assert.ok(state.propertyTaxRate > 0, `${code} has a property tax rate`);
    assert.ok(state.propertyTaxRate < 10, `${code} has a plausible property tax rate`);
  }
});

test('the property tax rates are the published 2026 state averages', () => {
  assert.equal(statePropertyTaxRate('NJ'), 1.88);
  assert.equal(statePropertyTaxRate('IL'), 1.88);
  assert.equal(statePropertyTaxRate('CT'), 1.54);
  assert.equal(statePropertyTaxRate('TX'), 1.4);
  assert.equal(statePropertyTaxRate('CA'), 0.7);
  assert.equal(statePropertyTaxRate('HI'), 0.29);
  assert.equal(statePropertyTaxRate('DC'), 0.6);
});

test('a code that is not a state has no rate', () => {
  assert.equal(statePropertyTaxRate('XX'), null);
  assert.equal(statePropertyTaxRate(''), null);
  assert.equal(statePropertyTaxRate(null), null);
  assert.equal(statePropertyTaxRate(undefined), null);
  assert.equal(stateName('XX'), null);
  assert.equal(stateByCode('XX'), undefined);
});

test('a code off the wire is normalised before it is used', () => {
  assert.equal(stateName(' tx '), 'Texas');
  assert.equal(statePropertyTaxRate('ny'), 1.3);
  assert.equal(stateName('XX'), null);
});

test('the states without a wage tax report a rate of zero', () => {
  for (const code of NO_WAGE_TAX) {
    const rate = stateIncomeRate(code, 'single', 100_000);
    assert.ok(rate, `${code} is known`);
    assert.equal(rate.rate, 0);
    assert.equal(rate.hasIncomeTax, false);
    assert.equal(rate.topRate, 0);
  }
});

test('Washington is a capital gains state and its wage rate is zero', () => {
  const rate = stateIncomeRate('WA', 'single', 250_000);
  assert.ok(rate);
  assert.equal(rate.hasIncomeTax, false);
  assert.equal(rate.rate, 0);
  assert.equal(rate.capitalGainsOnly, true);
});

test('a flat rate state charges the same rate at every income', () => {
  assert.equal(stateIncomeRate('AZ', 'single', 20_000)?.rate, 2.5);
  assert.equal(stateIncomeRate('AZ', 'single', 900_000)?.rate, 2.5);
  assert.equal(stateIncomeRate('PA', 'single', 50_000)?.rate, 3.07);
  assert.equal(stateIncomeRate('IN', 'single', 50_000)?.rate, 2.95);
  assert.equal(stateIncomeRate('UT', 'single', 50_000)?.rate, 4.5);
});

test('a progressive state reports the rate of the bracket the income reaches', () => {
  const california = stateIncomeRate('CA', 'single', 68_900);
  assert.ok(california);
  assert.equal(california.rate, 8);
  assert.equal(california.topRate, 13.3);
  assert.equal(california.stateName, 'California');

  assert.equal(stateIncomeRate('CA', 'single', 11_078)?.rate, 1);
  assert.equal(stateIncomeRate('CA', 'single', 11_079)?.rate, 2);
  assert.equal(stateIncomeRate('CA', 'single', 26_264)?.rate, 4);
  assert.equal(stateIncomeRate('CA', 'single', 41_452)?.rate, 6);
  assert.equal(stateIncomeRate('CA', 'single', 57_542)?.rate, 8);
  assert.equal(stateIncomeRate('CA', 'single', 72_724)?.rate, 9.3);
  assert.equal(stateIncomeRate('CA', 'single', 1_000_000)?.rate, 13.3);
});

test('the filing status changes which table is read', () => {
  // New Jersey: a single filer is in the 5.53% band at $60,000, a married
  // couple filing jointly is in the 2.45% band at the same income.
  assert.equal(stateIncomeRate('NJ', 'single', 60_000)?.rate, 5.53);
  assert.equal(stateIncomeRate('NJ', 'married', 60_000)?.rate, 2.45);
});

test('head of household is read from the single filer table', () => {
  assert.equal(stateIncomeRate('CA', 'head-of-household', 68_900)?.rate, 8);
  assert.equal(stateIncomeRate('NJ', 'head-of-household', 60_000)?.rate, 5.53);
});

test('a state that exempts its lowest band taxes nothing below it', () => {
  assert.equal(stateIncomeRate('OH', 'single', 20_000)?.rate, 0);
  assert.equal(stateIncomeRate('OH', 'single', 30_000)?.rate, 2.75);
  assert.equal(stateIncomeRate('ID', 'single', 4_000)?.rate, 0);
  assert.equal(stateIncomeRate('ID', 'single', 5_000)?.rate, 5.3);
  assert.equal(stateIncomeRate('DE', 'single', 1_999)?.rate, 0);
  assert.equal(stateIncomeRate('DE', 'single', 2_000)?.rate, 2.2);
});

test('no income means no rate', () => {
  assert.equal(stateIncomeRate('CA', 'single', 0)?.rate, 0);
  assert.equal(stateIncomeRate('CA', 'single', -1_000)?.rate, 0);
  assert.equal(stateIncomeRate('CA', 'single', Number.NaN)?.rate, 0);
});

test('the rates of every bracket of every state are in order', () => {
  for (const [code, state] of Object.entries(STATES)) {
    for (const table of [state.incomeTax.single, state.incomeTax.married]) {
      let previousFrom = -1;
      let previousRate = -1;
      for (const bracket of table) {
        assert.ok(bracket.from > previousFrom, `${code} brackets start in order`);
        assert.ok(bracket.rate >= previousRate, `${code} rates do not fall`);
        assert.ok(bracket.rate >= 0 && bracket.rate <= 15, `${code} rate is plausible`);
        previousFrom = bracket.from;
        previousRate = bracket.rate;
      }
    }
  }
});

test('the married table is never shorter than the single table', () => {
  for (const [code, state] of Object.entries(STATES)) {
    assert.ok(
      state.incomeTax.married.length >= state.incomeTax.single.length,
      `${code} has both tables`,
    );
  }
});
