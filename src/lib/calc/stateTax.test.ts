import { test } from 'node:test';
import assert from 'node:assert/strict';

import { STATES } from '../data/states.ts';
import { STATE_CREDITS } from '../data/stateCredits.ts';
import { STATE_HEAD_OF_HOUSEHOLD } from '../data/stateHeadOfHousehold.ts';
import { STATE_FEDERAL_TAX_DEDUCTION } from '../data/stateFederalDeduction.ts';
import { emptyChildAges, totalChildren, type ChildAgeBandId, type ChildAgeCounts } from '../data/childAges.ts';
import {
  bracketTax,
  computeStateTax,
  stateByCode,
  stateList,
  stateName,
  statePropertyTaxRate,
} from './stateTax.ts';

/**
 * The children of a family, by the age band each of them falls in.
 *
 * The tests read better when the age of a child is written down rather than
 * counted: a New York child under four is worth a different amount from a
 * New York child of ten.
 */
function children(...bands: ChildAgeBandId[]): ChildAgeCounts {
  const counts = emptyChildAges();
  for (const band of bands) counts[band] += 1;
  return counts;
}

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
      childAges: children('under4', 'under4'),
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
  });
  assert.ok(result);
  // 68,900 less the 5,900 standard deduction.
  assert.equal(result.taxableIncome, 63000);
  assert.equal(result.taxBeforeCredits, 2335.12);
  // The personal exemption in California is a credit, not an exclusion.
  assert.equal(result.breakdown.exemption, 0);
  assert.equal(result.breakdown.exemptionCredit, 158);
  assert.equal(result.tax, 2177.12);
});

test('Maine takes its 2026 standard deduction off the income', () => {
  const result = computeStateTax({
    stateCode: 'ME',
    filingStatus: 'single',
    adjustedGrossIncome: 60000,
  });
  assert.ok(result);
  // 60,000 less the 15,700 standard deduction and the 5,300 exemption.
  assert.equal(result.taxableIncome, 39000);
  // 5.8% of the first 27,400 and 6.75% of the rest.
  assert.equal(result.taxBeforeCredits, 2372.2);
  assert.equal(result.tax, 2372.2);
});

test('Maine pays the dependent exemption credit once, not twice', () => {
  const result = computeStateTax({
    stateCode: 'ME',
    filingStatus: 'single',
    adjustedGrossIncome: 80000,
    childAges: children('sevenToEleven'),
  });
  assert.ok(result);
  // 80,000 less the 15,700 standard deduction and the 5,300 exemption.
  assert.equal(result.taxableIncome, 59000);
  assert.equal(result.taxBeforeCredits, 3722.2);
  // The credit for a dependent is the $310 of the 2026 schedule, and there is
  // no second one on the side of the exemption.
  assert.equal(result.breakdown.exemptionCredit, 0);
  assert.equal(result.breakdown.childTaxCredit, 310);
  assert.equal(result.tax, 3412.2);
});

test('Arizona takes the standard deduction the federal basic deduction gives', () => {
  const result = computeStateTax({
    stateCode: 'AZ',
    filingStatus: 'single',
    adjustedGrossIncome: 50000,
    childAges: children('sevenToEleven'),
  });
  assert.ok(result);
  // 50,000 less the 16,100 standard deduction.
  assert.equal(result.taxableIncome, 33900);
  assert.equal(result.taxBeforeCredits, 847.5);
  // A dependent under seventeen is worth $125 in Arizona.
  assert.equal(result.breakdown.childTaxCredit, 125);
  assert.equal(result.tax, 722.5);
});

test('Arizona pays less for a dependent of seventeen', () => {
  const result = computeStateTax({
    stateCode: 'AZ',
    filingStatus: 'single',
    adjustedGrossIncome: 50000,
    childAges: children('seventeen'),
  });
  assert.ok(result);
  assert.equal(result.taxBeforeCredits, 847.5);
  assert.equal(result.breakdown.childTaxCredit, 25);
  assert.equal(result.tax, 822.5);
});

test('Hawaii takes the 2026 standard deduction off the income', () => {
  const result = computeStateTax({
    stateCode: 'HI',
    filingStatus: 'single',
    adjustedGrossIncome: 50000,
  });
  assert.ok(result);
  // 50,000 less the 8,000 standard deduction and the 1,144 exemption.
  assert.equal(result.taxableIncome, 40856);
  assert.equal(result.taxBeforeCredits, 2024.83);
  assert.equal(result.tax, 2024.83);
});

test('Vermont uses the 2026 preliminary rates', () => {
  const result = computeStateTax({
    stateCode: 'VT',
    filingStatus: 'single',
    adjustedGrossIncome: 52950,
  });
  assert.ok(result);
  // 52,950 less the 7,650 standard deduction and the 5,300 exemption.
  assert.equal(result.taxableIncome, 40000);
  assert.equal(result.taxBeforeCredits, 1340);
  assert.equal(result.tax, 1340);
});

test('Vermont has a head of household schedule of its own', () => {
  const result = computeStateTax({
    stateCode: 'VT',
    filingStatus: 'head-of-household',
    adjustedGrossIncome: 52950,
  });
  assert.ok(result);
  // 52,950 less the 11,450 head of household standard deduction and the 5,300
  // exemption.
  assert.equal(result.taxableIncome, 36200);
  assert.equal(result.taxBeforeCredits, 1212.7);
  assert.equal(result.tax, 1212.7);
});

test('a state that gives the exemption as an exclusion takes it off the income', () => {  const result = computeStateTax({
    stateCode: 'OH',
    filingStatus: 'single',
    adjustedGrossIncome: 40000,
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
  });
  const married = computeStateTax({
    stateCode: 'OH',
    filingStatus: 'married',
    adjustedGrossIncome: 80000,
  });
  assert.ok(single && married);
  assert.equal(single.taxableIncome, 77600);
  assert.equal(married.taxableIncome, 75200);
  assert.ok(married.tax < single.tax);
});

test('a state without a head of household table is read from the single filer table', () => {
  const single = computeStateTax({
    stateCode: 'OH',
    filingStatus: 'single',
    adjustedGrossIncome: 80000,
  });
  const head = computeStateTax({
    stateCode: 'OH',
    filingStatus: 'head-of-household',
    adjustedGrossIncome: 80000,
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
    childAges: children('under4'),
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
    childAges: children('under4', 'under4', 'under4'),
  });
  assert.ok(result);
  assert.equal(result.breakdown.earnedIncomeCredit, 0);
});

test('a state credit that needs children is not paid without them', () => {
  const withChild = computeStateTax({
    stateCode: 'WI',
    filingStatus: 'single',
    adjustedGrossIncome: 20000,
    childAges: children('under4'),
  });
  const withoutChild = computeStateTax({
    stateCode: 'WI',
    filingStatus: 'single',
    adjustedGrossIncome: 20000,
  });
  assert.ok(withChild && withoutChild);
  assert.ok(withChild.breakdown.earnedIncomeCredit > 0);
  assert.equal(withoutChild.breakdown.earnedIncomeCredit, 0);
});

test('the Wisconsin credit grows with the number of children', () => {
  // At $20,000 the federal credit is at its maximum for one child, $4,427,
  // and for two, $7,316. Wisconsin pays 4% of the first and 11% of the
  // second.
  const one = computeStateTax({
    stateCode: 'WI',
    filingStatus: 'single',
    adjustedGrossIncome: 20000,
    childAges: children('under4'),
  });
  const two = computeStateTax({
    stateCode: 'WI',
    filingStatus: 'single',
    adjustedGrossIncome: 20000,
    childAges: children('under4', 'fourToFive'),
  });
  assert.ok(one && two);
  assert.equal(one.breakdown.earnedIncomeCredit, 177.08);
  assert.equal(two.breakdown.earnedIncomeCredit, 804.76);
});

test('the state child tax credit comes off the tax', () => {
  const result = computeStateTax({
    stateCode: 'MN',
    filingStatus: 'single',
    adjustedGrossIncome: 60000,
    childAges: children('under4', 'under4'),
  });
  assert.ok(result);
  // Minnesota gives 1,800 for each child and 4% of the earned income for
  // the working family credit. The two are added up and fall away together
  // at 12% of the income above 32,680, so at 60,000 there is still a little
  // left of them.
  const combined = 3600 + 387.6;
  assert.equal(result.credits, Math.round((combined - (60000 - 32680) * 0.12) * 100) / 100);
});

test('a credit that falls away above an income is not paid', () => {
  const result = computeStateTax({
    stateCode: 'MN',
    filingStatus: 'single',
    adjustedGrossIncome: 30000,
    childAges: children('under4', 'under4'),
  });
  assert.ok(result);
  assert.equal(result.breakdown.childTaxCredit, 3600);
});

test('the credits never push the tax below zero', () => {
  const result = computeStateTax({
    stateCode: 'MN',
    filingStatus: 'single',
    adjustedGrossIncome: 20000,
    childAges: children('under4', 'under4'),
  });
  assert.ok(result);
  assert.equal(result.tax, 0);
  assert.ok(result.credits > result.taxBeforeCredits);
});

test('the child tax credit follows the age of the child', () => {
  // New York pays 1,000 for a child under four and 500 for a child from four
  // to sixteen.
  const young = computeStateTax({
    stateCode: 'NY',
    filingStatus: 'single',
    adjustedGrossIncome: 60000,
    childAges: children('under4'),
  });
  const older = computeStateTax({
    stateCode: 'NY',
    filingStatus: 'single',
    adjustedGrossIncome: 60000,
    childAges: children('fourToFive'),
  });
  assert.ok(young && older);
  assert.equal(young.breakdown.childTaxCredit, 1000);
  assert.equal(older.breakdown.childTaxCredit, 500);
});

test('a child the state does not credit is worth nothing to the credit', () => {
  // A child of seventeen is outside the New York credit, which reaches
  // children from four to sixteen.
  const result = computeStateTax({
    stateCode: 'NY',
    filingStatus: 'single',
    adjustedGrossIncome: 60000,
    childAges: children('seventeen'),
  });
  assert.ok(result);
  assert.equal(result.breakdown.childTaxCredit, 0);
});

test('a credit that needs a young child is not paid without one', () => {
  // The California young child tax credit needs a child under six, and it
  // falls away with the earned income above $27,425.
  const withChild = computeStateTax({
    stateCode: 'CA',
    filingStatus: 'single',
    adjustedGrossIncome: 26000,
    childAges: children('under4'),
  });
  const withoutChild = computeStateTax({
    stateCode: 'CA',
    filingStatus: 'single',
    adjustedGrossIncome: 26000,
    childAges: children('sevenToEleven'),
  });
  assert.ok(withChild && withoutChild);
  assert.equal(withChild.breakdown.childTaxCredit, 1189);
  assert.equal(withoutChild.breakdown.childTaxCredit, 0);
});

test('a credit that is granted once per return does not grow with the children', () => {
  const one = computeStateTax({
    stateCode: 'CA',
    filingStatus: 'single',
    adjustedGrossIncome: 40000,
    childAges: children('under4'),
  });
  const two = computeStateTax({
    stateCode: 'CA',
    filingStatus: 'single',
    adjustedGrossIncome: 40000,
    childAges: children('under4', 'under4'),
  });
  assert.ok(one && two);
  assert.equal(one.breakdown.childTaxCredit, two.breakdown.childTaxCredit);
});

test('the Minnesota credits fall away together', () => {
  // The child tax credit and the working family credit are added up and the
  // sum is reduced by 12% of the income above 32,680.
  const result = computeStateTax({
    stateCode: 'MN',
    filingStatus: 'single',
    adjustedGrossIncome: 40000,
    childAges: children('under4'),
  });
  assert.ok(result);
  const combined = 1800 + 387.6;
  const reduced = combined - (40000 - 32680) * 0.12;
  assert.equal(result.credits, Math.round(reduced * 100) / 100);
});

test('the credits table only names states that exist', () => {
  for (const code of Object.keys(STATE_CREDITS)) {
    assert.ok(STATES[code], `${code} is a state`);
  }
});

test('the head of household tables only name states that exist', () => {
  for (const code of Object.keys(STATE_HEAD_OF_HOUSEHOLD)) {
    assert.ok(STATES[code], `${code} is a state`);
  }
});

test('the federal tax deduction only names states that exist', () => {
  for (const code of Object.keys(STATE_FEDERAL_TAX_DEDUCTION)) {
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

test('the children are counted in the bands they fall in', () => {
  const counts = children('under4', 'fourToFive', 'fourToFive', 'seventeen');
  assert.equal(totalChildren(counts), 4);
  assert.equal(counts.under4, 1);
  assert.equal(counts.fourToFive, 2);
  assert.equal(counts.seventeen, 1);
});

test('a state that gives a credit in place of a standard deduction gets it off the tax', () => {
  const result = computeStateTax({
    stateCode: 'UT',
    filingStatus: 'single',
    adjustedGrossIncome: 50000,
  });
  assert.ok(result);
  // Utah gives $966 as a credit rather than a deduction.
  assert.equal(result.breakdown.standardDeduction, 0);
  assert.equal(result.breakdown.standardDeductionCredit, 966);
  assert.equal(result.tax, result.taxBeforeCredits - 966);
});

test('a credit that pays more without children than with them is carried through', () => {
  // Maryland pays 45% of the federal credit for a taxpayer with children and
  // 100% of it for a taxpayer without.
  const withChild = computeStateTax({
    stateCode: 'MD',
    filingStatus: 'single',
    adjustedGrossIncome: 15000,
    childAges: children('under4'),
  });
  const withoutChild = computeStateTax({
    stateCode: 'MD',
    filingStatus: 'single',
    adjustedGrossIncome: 15000,
  });
  assert.ok(withChild && withoutChild);
  // The federal credit is $4,427 for one child and $347.29 for none.
  assert.equal(withChild.breakdown.earnedIncomeCredit, 1992.15);
  assert.equal(withoutChild.breakdown.earnedIncomeCredit, 347.29);
});

test('a state that pays more where the youngest child is under three is carried through', () => {
  // Oregon pays 17% of the federal credit where the youngest child is under
  // three and 14% otherwise.
  const young = computeStateTax({
    stateCode: 'OR',
    filingStatus: 'single',
    adjustedGrossIncome: 20000,
    childAges: children('under4'),
  });
  const older = computeStateTax({
    stateCode: 'OR',
    filingStatus: 'single',
    adjustedGrossIncome: 20000,
    childAges: children('fourToFive'),
  });
  assert.ok(young && older);
  assert.equal(young.breakdown.earnedIncomeCredit, 752.59);
  assert.equal(older.breakdown.earnedIncomeCredit, 619.78);
});

test('a cap on the credit is applied', () => {
  // South Carolina pays 125% of the federal credit, up to $200.
  const result = computeStateTax({
    stateCode: 'SC',
    filingStatus: 'single',
    adjustedGrossIncome: 30000,
    childAges: children('under4'),
  });
  assert.ok(result);
  assert.equal(result.breakdown.earnedIncomeCredit, 200);
});

test('a flat amount is added to the credit where the state gives one', () => {
  // Connecticut pays 40% of the federal credit and $250 more where the
  // taxpayer has children.
  const withChild = computeStateTax({
    stateCode: 'CT',
    filingStatus: 'single',
    adjustedGrossIncome: 20000,
    childAges: children('under4'),
  });
  const withoutChild = computeStateTax({
    stateCode: 'CT',
    filingStatus: 'single',
    adjustedGrossIncome: 20000,
  });
  assert.ok(withChild && withoutChild);
  // 40% of the federal credit is $1,770.80, and Connecticut adds $250 where
  // the taxpayer has children. Without a child the federal credit is gone at
  // that income.
  assert.equal(withChild.breakdown.earnedIncomeCredit, 2020.8);
  assert.equal(withoutChild.breakdown.earnedIncomeCredit, 0);
});

test('a state that calculates the credit on its own schedule uses its own limits', () => {
  const inside = computeStateTax({
    stateCode: 'CA',
    filingStatus: 'single',
    adjustedGrossIncome: 20000,
    childAges: children('under4'),
  });
  const outside = computeStateTax({
    stateCode: 'CA',
    filingStatus: 'single',
    adjustedGrossIncome: 40000,
    childAges: children('under4'),
  });
  assert.ok(inside && outside);
  // The CalEITC is about 47% of the federal credit, and the state pays
  // nothing above $34,050 of income.
  assert.equal(inside.breakdown.earnedIncomeCredit, 2080.69);
  assert.equal(outside.breakdown.earnedIncomeCredit, 0);
});

test('a state with a head of household table of its own uses it', () => {
  // New York publishes a head of household schedule, and the standard
  // deduction of a head of household is $11,200 against $8,000 for a single
  // filer.
  const single = computeStateTax({
    stateCode: 'NY',
    filingStatus: 'single',
    adjustedGrossIncome: 100000,
  });
  const head = computeStateTax({
    stateCode: 'NY',
    filingStatus: 'head-of-household',
    adjustedGrossIncome: 100000,
  });
  assert.ok(single && head);
  assert.equal(single.taxableIncome, 92000);
  assert.equal(head.taxableIncome, 88800);
  assert.ok(head.tax < single.tax);
});

test('a state that treats a head of household as a joint return uses the joint schedule', () => {
  // Idaho treats a head of household return as a joint return.
  const single = computeStateTax({
    stateCode: 'ID',
    filingStatus: 'single',
    adjustedGrossIncome: 50000,
  });
  const head = computeStateTax({
    stateCode: 'ID',
    filingStatus: 'head-of-household',
    adjustedGrossIncome: 50000,
  });
  assert.ok(single && head);
  assert.equal(single.taxableIncome, 33900);
  assert.equal(head.taxableIncome, 25850);
  // Idaho has no tax below $9,622 of income, and 5.3% above it.
  assert.equal(head.tax, 860.08);
});

test('the federal income tax paid comes off the income in Alabama', () => {
  const result = computeStateTax({
    stateCode: 'AL',
    filingStatus: 'single',
    adjustedGrossIncome: 100000,
    federalTax: 20000,
  });
  assert.ok(result);
  // Alabama has no limit on the deduction.
  assert.equal(result.breakdown.federalTaxDeduction, 20000);
});

test('the federal income tax paid is not deducted in a state that does not allow it', () => {
  const result = computeStateTax({
    stateCode: 'CA',
    filingStatus: 'single',
    adjustedGrossIncome: 100000,
    federalTax: 20000,
  });
  assert.ok(result);
  assert.equal(result.breakdown.federalTaxDeduction, 0);
});

test('Missouri takes a share of the federal tax that depends on the income', () => {
  const low = computeStateTax({
    stateCode: 'MO',
    filingStatus: 'single',
    adjustedGrossIncome: 20000,
    federalTax: 20000,
  });
  const middle = computeStateTax({
    stateCode: 'MO',
    filingStatus: 'single',
    adjustedGrossIncome: 60000,
    federalTax: 20000,
  });
  const high = computeStateTax({
    stateCode: 'MO',
    filingStatus: 'single',
    adjustedGrossIncome: 130000,
    federalTax: 20000,
  });
  assert.ok(low && middle && high);
  // 35% of the federal tax below $25,000 of Missouri income, and the amount
  // is capped at $5,000.
  assert.equal(low.breakdown.federalTaxDeduction, 5000);
  // 15% between $50,000 and $100,000 of Missouri income.
  assert.equal(middle.breakdown.federalTaxDeduction, 3000);
  // Nothing above $125,000 of Missouri income.
  assert.equal(high.breakdown.federalTaxDeduction, 0);
});

test('Missouri allows a couple more than a single filer', () => {
  const single = computeStateTax({
    stateCode: 'MO',
    filingStatus: 'single',
    adjustedGrossIncome: 20000,
    federalTax: 20000,
  });
  const married = computeStateTax({
    stateCode: 'MO',
    filingStatus: 'married',
    adjustedGrossIncome: 20000,
    federalTax: 20000,
  });
  assert.ok(single && married);
  // 35% of the federal tax is $7,000, and a single filer is capped at
  // $5,000 where a couple is capped at $10,000.
  assert.equal(single.breakdown.federalTaxDeduction, 5000);
  assert.equal(married.breakdown.federalTaxDeduction, 7000);
});

test('Oregon limits the deduction and takes it away with the income', () => {
  const ordinary = computeStateTax({
    stateCode: 'OR',
    filingStatus: 'single',
    adjustedGrossIncome: 100000,
    federalTax: 20000,
  });
  const wealthy = computeStateTax({
    stateCode: 'OR',
    filingStatus: 'single',
    adjustedGrossIncome: 200000,
    federalTax: 20000,
  });
  assert.ok(ordinary && wealthy);
  assert.equal(ordinary.breakdown.federalTaxDeduction, 8750);
  // A single filer is at $7,000 above $145,000 of income.
  assert.equal(wealthy.breakdown.federalTaxDeduction, 7000);
});

test('a head of household in Oregon loses the deduction at a higher income', () => {
  const result = computeStateTax({
    stateCode: 'OR',
    filingStatus: 'head-of-household',
    adjustedGrossIncome: 300000,
    federalTax: 40000,
  });
  assert.ok(result);
  assert.equal(result.breakdown.federalTaxDeduction, 0);
});
