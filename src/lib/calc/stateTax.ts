/**
 * The state tax.
 *
 * This is the model behind the state figure in the federal income tax
 * calculator. It is a real calculation, not a rate applied to the whole of
 * the income:
 *
 *   1. the income the state starts from is the adjusted gross income, which
 *      is the gross income less the pre-tax deductions
 *   2. the state's own standard deduction and personal exemption come off
 *      that income, where the state gives them as exclusions
 *   3. the brackets of the state are applied to what is left, slice by
 *      slice, so that each part of the income is taxed at the rate of the
 *      bracket it falls in
 *   4. the credits come off the tax: the credit some states give in place of
 *      a standard deduction, the personal exemption where the state gives
 *      it as a credit, the state earned income tax credit and the state
 *      child tax credit
 *
 * What it does not do, and the page says so:
 *
 *   - the federal income tax deduction, which a score of states allow and
 *     which is not reproduced here
 *   - capital gains rates, surtaxes on high earners and the taxes of local
 *     governments
 *   - the head of household tables, which the source does not publish, so
 *     the single filer figures are used
 *   - a refund: where the credits are worth more than the tax, the tax is
 *     shown as zero and the excess is not carried
 */

import { STATES, type State, type StateBracket } from '../data/states.ts';
import { STATE_CREDITS } from '../data/stateCredits.ts';
import { federalEitc } from './credits.ts';
import type { FilingStatus } from './tax.ts';

/** What the state calculation needs to know. */
export interface StateTaxInput {
  /** The two-letter code of the state. */
  readonly stateCode: string;
  /** The filing status of the taxpayer. */
  readonly filingStatus: FilingStatus;
  /** The adjusted gross income: the gross income less the pre-tax deductions. */
  readonly adjustedGrossIncome: number;
  /** The qualifying children under 17, which the credits depend on. */
  readonly children: number;
}

/** The line by line result of the state calculation. */
export interface StateTaxResult {
  readonly stateCode: string;
  readonly stateName: string;
  /** The income the state tax is worked out on. */
  readonly taxableIncome: number;
  /** What the brackets add up to, before the credits. */
  readonly taxBeforeCredits: number;
  /** The credits taken off the tax. */
  readonly credits: number;
  /** The tax after the credits. */
  readonly tax: number;
  /** The rate the state charges on the income it taxes. */
  readonly effectiveRate: number;
  readonly breakdown: {
    /** The state standard deduction that came off the income. */
    readonly standardDeduction: number;
    /** The personal exemption that came off the income. */
    readonly exemption: number;
    /** The credit in place of a standard deduction. */
    readonly standardDeductionCredit: number;
    /** The personal exemption that came off the tax. */
    readonly exemptionCredit: number;
    /** The state earned income tax credit. */
    readonly earnedIncomeCredit: number;
    /** The state child tax credit. */
    readonly childTaxCredit: number;
  };
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

/** The tax the brackets add up to for an amount of taxable income. */
export function bracketTax(brackets: readonly StateBracket[], taxableIncome: number): number {
  if (brackets.length === 0 || taxableIncome <= 0) return 0;

  let tax = 0;
  for (let index = 0; index < brackets.length; index += 1) {
    const bracket = brackets[index];
    const next = brackets[index + 1];
    const upper = next ? next.from : Number.POSITIVE_INFINITY;
    const slice = Math.min(taxableIncome, upper) - bracket.from;
    if (slice > 0) tax += slice * (bracket.rate / 100);
  }
  return roundCents(tax);
}

/** The brackets that apply to a filing status. */
function bracketsFor(state: State, status: FilingStatus): readonly StateBracket[] {
  return status === 'married' ? state.incomeTax.married : state.incomeTax.single;
}

/** The amount that applies to a taxpayer, for a single filer or a couple. */
function forFilingStatus(
  amounts: { readonly single: number; readonly married: number },
  status: FilingStatus,
): number {
  return status === 'married' ? amounts.married : amounts.single;
}

function roundCents(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * The state tax for a state, a filing status and an amount of income.
 *
 * Returns null when the code is not a state this site knows about, which is
 * the case for a visitor outside the United States and for a request the edge
 * could not place.
 */
export function computeStateTax(input: StateTaxInput): StateTaxResult | null {
  const state = stateByCode(input.stateCode);
  if (!state) return null;

  const income = Number.isFinite(input.adjustedGrossIncome)
    ? Math.max(0, input.adjustedGrossIncome)
    : 0;
  const children = Math.max(0, Math.trunc(input.children));
  const brackets = bracketsFor(state, input.filingStatus);

  const exemption = state.incomeTax.exemption;
  const standardDeduction = state.incomeTax.standardDeduction;
  const standardDeductionCredit = state.incomeTax.standardDeductionCredit;

  /*
    The personal exemption comes either off the income or off the tax,
    depending on the state. Both are carried, and each one is used for the
    thing it is: an exclusion reduces what is taxed, a credit reduces what
    is owed.
  */
  const personalExemption =
    exemption && input.filingStatus === 'married' && exemption.married
      ? exemption.married
      : exemption?.single;

  const exemptionOffIncome =
    (personalExemption && personalExemption.kind === 'exclusion'
      ? personalExemption.amount
      : 0) +
    (exemption?.dependent && exemption.dependent.kind === 'exclusion'
      ? exemption.dependent.amount * children
      : 0);

  const exemptionCredit =
    (personalExemption && personalExemption.kind === 'credit'
      ? personalExemption.amount
      : 0) +
    (exemption?.dependent && exemption.dependent.kind === 'credit'
      ? exemption.dependent.amount * children
      : 0);

  /* What comes off the income before the brackets are applied. */
  const standardDeductionOffIncome = standardDeduction
    ? forFilingStatus(
        { single: standardDeduction.single.amount, married: standardDeduction.married.amount },
        input.filingStatus,
      )
    : 0;

  const taxableIncome =
    brackets.length === 0
      ? 0
      : Math.max(0, income - standardDeductionOffIncome - exemptionOffIncome);

  const taxBeforeCredits = bracketTax(brackets, taxableIncome);

  /* What comes off the tax afterwards. */
  const deductionCredit = standardDeductionCredit
    ? forFilingStatus(
        {
          single: standardDeductionCredit.single.amount,
          married: standardDeductionCredit.married.amount,
        },
        input.filingStatus,
      )
    : 0;

  const credits = STATE_CREDITS[state.code];
  const earnedIncomeCredit = credits?.earnedIncome
    ? stateEarnedIncomeCredit(
        credits.earnedIncome,
        income,
        children,
        input.filingStatus,
      )
    : 0;
  const childTaxCredit = credits?.child
    ? stateChildTaxCredit(credits.child, income, children, input.filingStatus)
    : 0;

  const totalCredits =
    deductionCredit + exemptionCredit + earnedIncomeCredit + childTaxCredit;

  const tax = Math.max(0, roundCents(taxBeforeCredits - totalCredits));

  return {
    stateCode: state.code,
    stateName: state.name,
    taxableIncome: roundCents(taxableIncome),
    taxBeforeCredits,
    credits: roundCents(totalCredits),
    tax,
    effectiveRate: taxableIncome > 0 ? roundCents((tax / taxableIncome) * 100) : 0,
    breakdown: {
      standardDeduction: standardDeductionOffIncome,
      exemption: exemptionOffIncome,
      standardDeductionCredit: deductionCredit,
      exemptionCredit,
      earnedIncomeCredit,
      childTaxCredit,
    },
  };
}

/**
 * The state earned income tax credit.
 *
 * Most states set their credit as a percentage of the federal credit and
 * stop paying it above an income of their own. That is what is modelled
 * here. The states whose credit is built differently are not in the table.
 */
function stateEarnedIncomeCredit(
  credit: {
    readonly percent: number;
    readonly percentWithoutChildren?: number;
    readonly cap?: number;
    readonly childrenOnly?: boolean;
    readonly flatWithChildren?: number;
    readonly maxIncomeSingle?: number;
    readonly maxIncomeMarried?: number;
  },
  income: number,
  children: number,
  status: FilingStatus,
): number {
  if (credit.childrenOnly && children === 0) return 0;

  const limit = status === 'married' ? credit.maxIncomeMarried : credit.maxIncomeSingle;
  if (limit !== undefined && income > limit) return 0;

  const married = status === 'married';
  const federal = federalEitc(income, children, married);
  if (federal <= 0) return 0;

  const percent =
    children === 0 && credit.percentWithoutChildren !== undefined
      ? credit.percentWithoutChildren
      : credit.percent;

  let amount = (federal * percent) / 100;
  if (credit.cap !== undefined) amount = Math.min(amount, credit.cap);
  if (credit.flatWithChildren !== undefined && children > 0) {
    amount += credit.flatWithChildren;
  }

  return roundCents(amount);
}

/**
 * The state child tax credit.
 *
 * A credit per child, which is taken away above the income the state sets.
 */
function stateChildTaxCredit(
  credit: {
    readonly perChild?: number;
    readonly percentOfFederal?: number;
    readonly phaseOutSingle?: number;
    readonly phaseOutMarried?: number;
    readonly maxIncomeSingle?: number;
    readonly maxIncomeMarried?: number;
  },
  income: number,
  children: number,
  status: FilingStatus,
): number {
  if (children <= 0) return 0;

  const maxIncome = status === 'married' ? credit.maxIncomeMarried : credit.maxIncomeSingle;
  if (maxIncome !== undefined && income > maxIncome) return 0;

  const phaseOut = status === 'married' ? credit.phaseOutMarried : credit.phaseOutSingle;
  if (phaseOut !== undefined && income > phaseOut) return 0;

  if (credit.perChild !== undefined) return roundCents(credit.perChild * children);

  /* A credit set as a share of the federal one, which the model does not
     carry: the federal child tax credit is not part of the federal figure
     on this site, so there is nothing here to take the share of. */
  return 0;
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

/** The names and codes of every state, for the state picker. */
export function stateList(): { code: string; name: string }[] {
  return Object.values(STATES)
    .map((state) => ({ code: state.code, name: state.name }))
    .sort((a, b) => a.name.localeCompare(b.name, 'en'));
}
