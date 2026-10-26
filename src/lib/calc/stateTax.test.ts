import { test } from 'node:test';
import assert from 'node:assert/strict';

import { STATES } from '../data/states.ts';
import { STATE_CREDITS } from '../data/stateCredits.ts';
import {
  bracketTax,
  computeStateTax,
  stateByCode,
  stateList,
  stateName,
  statePropertyTaxRate,
} from './stateTax.ts';

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
});

test('the state picker lists every state by name', () => {
  const list = stateList();
  assert.equal(list.length, 51);
  assert.equal(list[0].name, 'Alabama');
  assert.ok(list.some((state) => state.code === 'WY' && state.name === 'Wyoming'));
});

test('the states without a wage tax pay no tax', () => {
  for (const code of ['AK', 'FL', 'NV', 'NH', 'SD', 'TN', 'TX', 'WY', 'WA']) {
    const result = computeStateTax({
      stateCode: code,
      filingStatus: 'single',
      adjustedGrossIncome: 250_000,
      children: 2,
    });
    assert.ok(result, `${code} is known`);
    assert.equal(result.tax, 0);
    assert.equal(result.taxableIncome, 0);
    assert.equal(result.taxBeforeCredits, 0);
  }
});

test('a code that is not a state has no tax', () => {
  assert.equal(
    computeStateTax({
      stateCode: 'XX',
      filingStatus: 'single',
      adjustedGrossIncome: 100_000,
      children: 0,
    }),
    null,
  );
});

test('the brackets tax each slice of the income at the rate of its own bracket', () => {
  // California, single filer: 1% to 11,079, 2% to 26,264, 4% to 41,452,
  // 6% to 57,542 and 8% above that.
  const tax = bracketTax(
    [
      { rate: 1, from: 0 },
      { rate: 2, from: 11079 },
      { rate: 4, from: 26264 },
      { rate: 6, from: 41452 },
      { rate: 8, from: 57542 },
    ],
    68900,
  );
  assert.equal(tax, 2896.05);
});

test('a state with a standard deduction takes it off the income', () => {
  const result = computeStateTax({
    stateCode: 'CA',
    filingStatus: 'single',
    adjustedGrossIncome: 68900,
    children: 0,
  });
  assert.ok(result);
  // 68,900 less the 5,540 standard deduction.
  assert.equal(result.taxableIncome, 63360);
  assert.equal(result.taxBeforeCredits, 2452.85);
  // The personal exemption in California is a credit, not an exclusion.
  assert.equal(result.breakdown.exemption, 0);
  assert.equal(result.breakdown.exemptionCredit, 153);
  assert.equal(result.tax, 2299.85);
});

test('a state that gives the exemption as an exclusion takes it off the income', () => {
  const result = computeStateTax({
    stateCode: 'OH',
    filingStatus: 'single',
    adjustedGrossIncome: 40000,
    children: 0,
  });
  assert.ok(result);
  // Ohio has no standard deduction and a 2,400 exemption, and its first
  // bracket starts at 26,050: the income below that is not taxed.
  assert.equal(result.taxableIncome, 37600);
  assert.equal(result.taxBeforeCredits, 317.63);
  assert.equal(result.tax, 317.63);
});

test('the filing status changes the brackets and the exemption', () => {
  const single = computeStateTax({
    stateCode: 'OH',
    filingStatus: 'single',
    adjustedGrossIncome: 80000,
    children: 0,
  });
  const married = computeStateTax({
    stateCode: 'OH',
    filingStatus: 'married',
    adjustedGrossIncome: 80000,
    children: 0,
  });
  assert.ok(single && married);
  assert.equal(single.taxableIncome, 77600);
  assert.equal(married.taxableIncome, 75200);
  assert.ok(married.tax < single.tax);
});

test('head of household is read from the single filer table', () => {
  const single = computeStateTax({
    stateCode: 'OH',
    filingStatus: 'single',
    adjustedGrossIncome: 80000,
    children: 0,
  });
  const head = computeStateTax({
    stateCode: 'OH',
    filingStatus: 'head-of-household',
    adjustedGrossIncome: 80000,
    children: 0,
  });
  assert.ok(single && head);
  assert.equal(head.taxableIncome, single.taxableIncome);
  assert.equal(head.tax, single.tax);
});

test('no income means no tax', () => {
  const result = computeStateTax({
    stateCode: 'CA',
    filingStatus: 'single',
    adjustedGrossIncome: 0,
    children: 0,
  });
  assert.ok(result);
  assert.equal(result.tax, 0);
  assert.equal(result.taxableIncome, 0);
});

test('the state earned income credit comes off the tax', () => {
  // Illinois: 20% of the federal credit. A single parent with one child and
  // $30,000 of income has a federal credit of 4,427 less 15.98% of the
  // 6,110 above the phase-out threshold.
  const result = computeStateTax({
    stateCode: 'IL',
    filingStatus: 'single',
    adjustedGrossIncome: 30000,
    children: 1,
  });
  assert.ok(result);
  const federal = 4427 - (30000 - 23890) * 0.1598;
  assert.equal(result.breakdown.earnedIncomeCredit, Math.round(federal * 0.2 * 100) / 100);
  assert.ok(result.tax < result.taxBeforeCredits);
});

test('a state without a state earned income credit gets none', () => {
  const result = computeStateTax({
    stateCode: 'TX',
    filingStatus: 'single',
    adjustedGrossIncome: 30000,
    children: 3,
  });
  assert.ok(result);
  assert.equal(result.breakdown.earnedIncomeCredit, 0);
});

test('the state child tax credit comes off the tax', () => {
  const result = computeStateTax({
    stateCode: 'MN',
    filingStatus: 'single',
    adjustedGrossIncome: 60000,
    children: 2,
  });
  assert.ok(result);
  // Minnesota gives 1,800 for each child, and the credit falls away above
  // 32,680 for a single filer, so an income of 60,000 is past it.
  assert.equal(result.breakdown.childTaxCredit, 0);
});

test('a credit that falls away above an income is not paid', () => {
  const result = computeStateTax({
    stateCode: 'MN',
    filingStatus: 'single',
    adjustedGrossIncome: 30000,
    children: 2,
  });
  assert.ok(result);
  assert.equal(result.breakdown.childTaxCredit, 3600);
});

test('the credits never push the tax below zero', () => {
  const result = computeStateTax({
    stateCode: 'MN',
    filingStatus: 'single',
    adjustedGrossIncome: 20000,
    children: 2,
  });
  assert.ok(result);
  assert.equal(result.tax, 0);
  assert.ok(result.credits > result.taxBeforeCredits);
});

test('the credits table only names states that exist', () => {
  for (const code of Object.keys(STATE_CREDITS)) {
    assert.ok(STATES[code], `${code} is a state`);
  }
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

test('every state that taxes wages has brackets, and every state that does not says so', () => {
  for (const [code, state] of Object.entries(STATES)) {
    const brackets = state.incomeTax.single;
    if (brackets.length === 0) {
      assert.ok(
        state.incomeTax.noIncomeTax || state.incomeTax.capitalGainsOnly,
        `${code} has no brackets and says why`,
      );
    }
  }
});
