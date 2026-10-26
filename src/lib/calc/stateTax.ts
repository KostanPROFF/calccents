/**
 * The state rate lookups.
 *
 * Two of the calculators take a state rate as an input: the federal income
 * tax calculator, which adds a state tax on top of the federal one, and the
 * rent versus buy calculator, which carries a property tax on the cost of
 * owning a home. Both rates are now filled in from the state the visitor's
 * request comes from, and this file is where that number comes from.
 *
 * The state is worked out at the edge from the address of the request, and it
 * is approximate: a virtual private network, a corporate proxy or a mobile
 * network can point it at the wrong state. So the rate is a default the
 * reader can change, never a fact about the reader.
 *
 * The income tax rate that comes out of here is the marginal rate of the
 * bracket the taxable income falls into. The calculator applies that single
 * rate to the whole of the taxable income, which is exact in a flat-rate
 * state and overstates the tax in a progressive one. The page says so, and
 * the reader can type any rate they like instead.
 */

import { STATES, type State, type StateBracket } from '../data/states.ts';
import type { FilingStatus } from './tax.ts';

/** What the reader gets back for a state. */
export interface StateIncomeRate {
  /** The two-letter code of the state. */
  readonly stateCode: string;
  /** The name of the state. */
  readonly stateName: string;
  /** The rate of the bracket the income falls into, as a percentage. */
  readonly rate: number;
  /** The highest rate the state charges on wages, as a percentage. */
  readonly topRate: number;
  /** False where the state levies no tax on wages. */
  readonly hasIncomeTax: boolean;
  /** True where the state taxes capital gains but not wages. */
  readonly capitalGainsOnly: boolean;
}

/**
 * Look a state up by its code.
 *
 * The code comes off the wire, so it is normalised before it is used: the
 * edge reports two letters, and a state is only ever found by a key that
 * exists in the table.
 */
export function stateByCode(code: string | null | undefined): State | undefined {
  if (typeof code !== 'string') return undefined;
  const key = code.trim().toUpperCase();
  return Object.prototype.hasOwnProperty.call(STATES, key) ? STATES[key] : undefined;
}

/**
 * The rate of the bracket an amount of taxable income falls into.
 *
 * A state whose lowest bracket starts above zero is exempt up to that
 * amount: Delaware, Idaho, Mississippi, Missouri, North Dakota and Ohio all
 * have one, and the income below it is taxed at nothing.
 */
function rateAt(brackets: readonly StateBracket[], income: number): number {
  if (brackets.length === 0) return 0;
  if (!Number.isFinite(income) || income <= 0) return 0;

  let rate = 0;
  for (const bracket of brackets) {
    if (income < bracket.from) break;
    rate = bracket.rate;
  }
  return rate;
}

/**
 * The brackets that apply to a filing status.
 *
 * Head of household is read from the single-filer table. The source
 * publishes the single and the married-filing-jointly tables and no third
 * one, so a head-of-household reader gets the single-filer brackets, which
 * are the nearer of the two.
 */
function bracketsFor(state: State, status: FilingStatus): readonly StateBracket[] {
  return status === 'married' ? state.incomeTax.married : state.incomeTax.single;
}

/**
 * The state income tax rate for a state, a filing status and an amount of
 * taxable income.
 *
 * Returns null when the code is not a state this site knows about, which is
 * the case for a visitor outside the United States and for a request the edge
 * could not place.
 */
export function stateIncomeRate(
  code: string | null | undefined,
  status: FilingStatus,
  taxableIncome: number,
): StateIncomeRate | null {
  const state = stateByCode(code);
  if (!state) return null;

  const brackets = bracketsFor(state, status);
  const hasIncomeTax = brackets.length > 0;

  return {
    stateCode: state.code,
    stateName: state.name,
    rate: hasIncomeTax ? rateAt(brackets, taxableIncome) : 0,
    topRate: hasIncomeTax ? brackets[brackets.length - 1].rate : 0,
    hasIncomeTax,
    capitalGainsOnly: state.incomeTax.capitalGainsOnly === true,
  };
}

/**
 * The average effective property tax rate of a state, as a percentage of the
 * value of the home.
 *
 * Returns null when the code is not a state this site knows about.
 */
export function statePropertyTaxRate(code: string | null | undefined): number | null {
  const state = stateByCode(code);
  return state ? state.propertyTaxRate : null;
}

/** The name of a state, or null when the code is not one. */
export function stateName(code: string | null | undefined): string | null {
  const state = stateByCode(code);
  return state ? state.name : null;
}
