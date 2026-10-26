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
 *
 * Run: node scripts/check-state-data.ts
 */

import { STATES, type State } from '../src/lib/data/states.ts';

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

console.log(
  `State table check passed: ${Object.keys(STATES).length} jurisdictions ` +
    `(${withBrackets} taxing wages, ${Object.keys(STATES).length - withBrackets} not), ` +
    '0 problems.',
);
