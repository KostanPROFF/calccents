#!/usr/bin/env node
/**
 * The state figures check.
 *
 * The two calculators that take a state rate read them from one file,
 * `src/lib/data/states.ts`, and that file is a table of published numbers:
 * the income tax brackets of 2026 for every state and the District of
 * Columbia, and the average effective property tax rate of the same
 * jurisdictions.
 *
 * A table like that fails quietly. A rate typed in the wrong column, a
 * bracket whose threshold sits below the previous one, a code that is spelled
 * slightly differently from the one the edge reports — none of these throw an
 * error. The page simply fills a field with a wrong number, and the wrong
 * number is a plausible one, which is the worst kind.
 *
 * So the check reads the table and holds it to what a rate table has to look
 * like:
 *
 *   - every jurisdiction is there, under the code the edge reports
 *   - the brackets run upwards: each one starts above the last, and no rate
 *     falls below the one before it
 *   - the rates are rates: between zero and fifteen percent
 *   - every jurisdiction carries a property tax rate, because every state
 *     levies one
 *   - a state that levies no tax on wages has no brackets at all
 *   - the deductions and the exemptions are amounts a state could charge
 *   - the credits name states that exist, with percentages and amounts that
 *     are worth something
 *
 * Run: node scripts/check-state-data.ts
 */

import { STATES, type State } from '../src/lib/data/states.ts';
import { STATE_CREDITS } from '../src/lib/data/stateCredits.ts';

/**
 * The codes the edge can report.
 *
 * This list is the postal abbreviations of the fifty states and the District
 * of Columbia. It is written out here rather than derived, because the point
 * of the check is to catch a code that is spelled wrong: a code that is not
 * on this list is a code the edge will never send.
 */
const CODES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL',
  'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
  'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
  'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
  'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI',
  'WY',
];

/** The highest rate a state income tax can reach. */
const MAXIMUM_RATE = 15;

/** The highest property tax rate a state can carry. */
const MAXIMUM_PROPERTY_TAX = 10;

const problems: string[] = [];

function check(state: State, key: string): void {
  const where = `${key} (${state.name})`;

  if (state.code !== key) {
    problems.push(`${where}: the code in the entry is "${state.code}", the key is "${key}"`);
  }
  if (state.name.trim().length === 0) {
    problems.push(`${where}: the state has no name`);
  }

  if (!(state.propertyTaxRate > 0) || state.propertyTaxRate > MAXIMUM_PROPERTY_TAX) {
    problems.push(
      `${where}: the property tax rate is ${state.propertyTaxRate}, which is not a rate a state charges`,
    );
  }

  /* The amounts that come off the income or off the tax. */
  const amounts: { label: string; amount: number }[] = [];
  if (state.incomeTax.standardDeduction) {
    amounts.push({ label: 'the standard deduction', amount: state.incomeTax.standardDeduction.single.amount });
    amounts.push({ label: 'the standard deduction', amount: state.incomeTax.standardDeduction.married.amount });
  }
  if (state.incomeTax.standardDeductionCredit) {
    amounts.push({
      label: 'the standard deduction credit',
      amount: state.incomeTax.standardDeductionCredit.single.amount,
    });
    amounts.push({
      label: 'the standard deduction credit',
      amount: state.incomeTax.standardDeductionCredit.married.amount,
    });
  }
  if (state.incomeTax.exemption) {
    for (const [label, value] of Object.entries(state.incomeTax.exemption)) {
      if (value) amounts.push({ label: `the ${label} exemption`, amount: value.amount });
    }
  }

  for (const amount of amounts) {
    if (amount.amount <= 0 || amount.amount > 100000) {
      problems.push(
        `${where}: ${amount.label} is ${amount.amount}, which is not an amount a state charges`,
      );
    }
  }

  for (const [label, brackets] of [
    ['single', state.incomeTax.single],
    ['married', state.incomeTax.married],
  ] as const) {
    let previousFrom = -1;
    let previousRate = -1;

    for (const bracket of brackets) {
      if (bracket.from <= previousFrom) {
        problems.push(
          `${where}: the ${label} brackets start at ${bracket.from}, which is not above the previous one`,
        );
      }
      if (bracket.rate < previousRate) {
        problems.push(
          `${where}: the ${label} rate ${bracket.rate}% is below the rate before it`,
        );
      }
      if (bracket.rate < 0 || bracket.rate > MAXIMUM_RATE) {
        problems.push(`${where}: the ${label} rate ${bracket.rate}% is not a rate a state charges`);
      }
      previousFrom = bracket.from;
      previousRate = bracket.rate;
    }
  }

  /*
    A state that does not tax wages has no wage brackets, and a state that
    taxes wages has at least one. The two ways that can happen are both
    recorded: a state that levies no income tax at all, and Washington,
    which taxes capital gains, a different tax, so its wage brackets are
    empty on purpose.
  */
  const taxWages = state.incomeTax.single.length > 0;
  const noIncomeTax = state.incomeTax.noIncomeTax === true;
  const capitalGainsOnly = state.incomeTax.capitalGainsOnly === true;
  if (!taxWages && !noIncomeTax && !capitalGainsOnly) {
    problems.push(`${where}: the state has no brackets and does not say why`);
  }
  if (taxWages && noIncomeTax) {
    problems.push(`${where}: the state has brackets and says it levies no income tax`);
  }
}

for (const [key, state] of Object.entries(STATES)) {
  check(state, key);
}

/* Every jurisdiction the edge can name is in the table, and nothing else is. */
const known = new Set(CODES);
for (const code of Object.keys(STATES)) {
  if (!known.has(code)) problems.push(`${code}: not a code the edge reports`);
}
for (const code of CODES) {
  if (!Object.prototype.hasOwnProperty.call(STATES, code)) {
    problems.push(`${code}: the jurisdiction is missing from the table`);
  }
}

/* The credits. */
for (const [code, credits] of Object.entries(STATE_CREDITS)) {
  if (!STATES[code]) {
    problems.push(`${code}: the credits name a state that is not in the table`);
    continue;
  }

  if (credits.earnedIncome) {
    const eitc = credits.earnedIncome;
    if (eitc.percent <= 0 || eitc.percent > 200) {
      problems.push(`${code}: the earned income credit is ${eitc.percent}% of the federal credit`);
    }
    if (
      eitc.percentWithoutChildren !== undefined &&
      (eitc.percentWithoutChildren <= 0 || eitc.percentWithoutChildren > 200)
    ) {
      problems.push(
        `${code}: the earned income credit for a taxpayer without children is ${eitc.percentWithoutChildren}% of the federal credit`,
      );
    }
    if (eitc.cap !== undefined && eitc.cap <= 0) {
      problems.push(`${code}: the cap on the earned income credit is ${eitc.cap}`);
    }
  }

  if (credits.child) {
    const child = credits.child;
    if (child.perChild <= 0 || child.perChild > 10000) {
      problems.push(`${code}: the child tax credit is ${child.perChild} for each child`);
    }
    for (const [label, phaseOut, maxIncome] of [
      ['a single filer', child.phaseOutSingle, child.maxIncomeSingle],
      ['a married couple', child.phaseOutMarried, child.maxIncomeMarried],
    ] as const) {
      if (phaseOut !== undefined && maxIncome !== undefined && phaseOut > maxIncome) {
        problems.push(
          `${code}: the child tax credit starts to fall away for ${label} above ${phaseOut}, which is above the income of ${maxIncome} above which it is gone`,
        );
      }
    }
  }
}

if (problems.length > 0) {
  console.error(`The state table has ${problems.length} problem(s):\n`);
  for (const problem of problems) console.error(`  ${problem}`);
  console.error(
    '\nThe table holds published figures for 2026. A problem here means a rate that\n' +
      'would be filled into a field on the page, so it has to be corrected before\n' +
      'the site ships.',
  );
  process.exit(1);
}

const withBrackets = Object.values(STATES).filter((state) => state.incomeTax.single.length > 0).length;
const withCredits = Object.keys(STATE_CREDITS).length;

console.log(
  `State table check passed: ${Object.keys(STATES).length} jurisdictions ` +
    `(${withBrackets} taxing wages, ${Object.keys(STATES).length - withBrackets} not), ` +
    `${withCredits} with credits, 0 problems.`,
);
