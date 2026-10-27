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
 *      that income, where the state gives them as exclusions, and so does the
 *      federal income tax paid in the states that let it be deducted
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
 *   - capital gains rates, surtaxes on high earners and the taxes of local
 *     governments
 *   - a refund: where the credits are worth more than the tax, the tax is
 *     shown as zero and the excess is not carried
 */

import { STATES, type State, type StateBracket, type StateAmount } from '../data/states.ts';
import {
  STATE_CREDITS,
  type StateChildTaxCredit,
  type StateCreditPhaseOut,
  type StateCreditTier,
  type StateEarnedIncomeCredit,
} from '../data/stateCredits.ts';
import { STATE_HEAD_OF_HOUSEHOLD } from '../data/stateHeadOfHousehold.ts';
import { STATE_FEDERAL_TAX_DEDUCTION } from '../data/stateFederalDeduction.ts';
import {
  childrenIn,
  emptyChildAges,
  totalChildren,
  youngestChildAge,
  type ChildAgeCounts,
} from '../data/childAges.ts';
import { federalEitc, FEDERAL_CHILD_TAX_CREDIT } from './credits.ts';
import type { FilingStatus } from './tax.ts';

/** What the state calculation needs to know. */
export interface StateTaxInput {
  /** The two-letter code of the state. */
  readonly stateCode: string;
  /** The filing status of the taxpayer. */
  readonly filingStatus: FilingStatus;
  /** The adjusted gross income: the gross income less the pre-tax deductions. */
  readonly adjustedGrossIncome: number;
  /**
   * The children, by the age band they fall in.
   *
   * The age matters to the state child tax credits, and the count matters to
   * the earned income credit, so the bands carry both.
   */
  readonly childAges?: ChildAgeCounts;
  /**
   * The federal income tax paid, which the states that allow it to be
   * deducted take off the income before their own brackets are applied.
   */
  readonly federalTax?: number;
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
    /** The federal income tax paid that came off the income. */
    readonly federalTaxDeduction: number;
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

/**
 * The brackets that apply to a filing status.
 *
 * Most states have no head of household table of their own, and a head of
 * household filer is taxed on the single filer brackets. The states that do
 * publish one have it in `stateHeadOfHousehold.ts`.
 */
function bracketsFor(state: State, status: FilingStatus): readonly StateBracket[] {
  if (status === 'married') return state.incomeTax.married;
  if (status === 'head-of-household') {
    const own = STATE_HEAD_OF_HOUSEHOLD[state.code]?.brackets;
    return own && own.length > 0 ? own : state.incomeTax.single;
  }
  return state.incomeTax.single;
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
 * The standard deduction for a filing status.
 *
 * A head of household usually gets the single filer amount, and the states
 * that give them more publish it separately.
 */
function standardDeductionFor(state: State, status: FilingStatus): number {
  const deduction = state.incomeTax.standardDeduction;
  if (!deduction) return 0;

  if (status === 'head-of-household') {
    const own = STATE_HEAD_OF_HOUSEHOLD[state.code]?.standardDeduction;
    if (own) return own.amount;
  }
  return forFilingStatus(
    { single: deduction.single.amount, married: deduction.married.amount },
    status,
  );
}

/**
 * The personal exemption for a filing status.
 *
 * The exemption for the filer comes first, and the exemption for each
 * dependent comes on top of it. The dependent amount is the one for a
 * single dependent, and the caller applies the number of children to it.
 */
function exemptionFor(
  state: State,
  status: FilingStatus,
): { readonly filer?: StateAmount; readonly dependent?: StateAmount } {
  const exemption = state.incomeTax.exemption;
  if (!exemption) return {};

  if (status === 'head-of-household') {
    const own = STATE_HEAD_OF_HOUSEHOLD[state.code]?.exemption;
    if (own) return { filer: own, dependent: exemption.dependent };
    return { filer: exemption.single, dependent: exemption.dependent };
  }

  return {
    filer: status === 'married' ? exemption.married : exemption.single,
    dependent: exemption.dependent,
  };
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
  const counts = input.childAges ?? emptyChildAges();
  const children = totalChildren(counts);
  const brackets = bracketsFor(state, input.filingStatus);

  const exemption = exemptionFor(state, input.filingStatus);

  /*
    The personal exemption comes either off the income or off the tax,
    depending on the state. Both are carried, and each one is used for the
    thing it is: an exclusion reduces what is taxed, a credit reduces what
    is owed.
  */
  const exemptionOffIncome =
    (exemption.filer && exemption.filer.kind === 'exclusion' ? exemption.filer.amount : 0) +
    (exemption.dependent && exemption.dependent.kind === 'exclusion'
      ? exemption.dependent.amount * children
      : 0);

  const exemptionCredit =
    (exemption.filer && exemption.filer.kind === 'credit' ? exemption.filer.amount : 0) +
    (exemption.dependent && exemption.dependent.kind === 'credit'
      ? exemption.dependent.amount * children
      : 0);

  /* What comes off the income before the brackets are applied. */
  const standardDeductionOffIncome = standardDeductionFor(state, input.filingStatus);

  /*
    The federal income tax paid comes off the income in the states that let a
    taxpayer deduct it. Each of those three states has a rule of its own: a
    limit on the amount, a share of the federal tax that depends on the
    income, and a limit on the income that qualifies.
  */
  const federalTaxDeduction = federalTaxDeductionFor(
    state.code,
    input.filingStatus,
    income,
    input.federalTax ?? 0,
  );

  const taxableIncome =
    brackets.length === 0
      ? 0
      : Math.max(
          0,
          income - standardDeductionOffIncome - exemptionOffIncome - federalTaxDeduction,
        );

  const taxBeforeCredits = bracketTax(brackets, taxableIncome);

  /* What comes off the tax afterwards. */
  const deductionCredit = state.incomeTax.standardDeductionCredit
    ? forFilingStatus(
        {
          single: state.incomeTax.standardDeductionCredit.single.amount,
          married: state.incomeTax.standardDeductionCredit.married.amount,
        },
        input.filingStatus,
      )
    : 0;

  const credits = STATE_CREDITS[state.code];
  const earnedIncomeCredit = credits?.earnedIncome
    ? stateEarnedIncomeCredit(credits.earnedIncome, income, counts, input.filingStatus)
    : 0;
  const childTaxCredit = credits?.child
    ? stateChildTaxCredit(credits.child, income, counts, input.filingStatus, earnedIncomeCredit)
    : 0;

  /*
    Some states reduce their two credits together rather than one at a time,
    which Minnesota does: the child tax credit and the working family credit
    are added up and the sum is reduced. The reduction cannot be applied to
    either of them on its own, so it is applied to the sum and the two are
    then split in the same proportion.
  */
  let finalEarnedIncomeCredit = earnedIncomeCredit;
  let finalChildTaxCredit = childTaxCredit;

  const joint = credits?.jointPhaseOut;
  if (joint) {
    const from =
      input.filingStatus === 'married' ? (joint.marriedFrom ?? joint.from) : joint.from;
    const combined = earnedIncomeCredit + childTaxCredit;
    if (combined > 0 && income > from) {
      const reduced = Math.max(0, combined - (income - from) * joint.shareOfExcessIncome);
      finalEarnedIncomeCredit =
        combined > 0 ? roundCents((reduced * earnedIncomeCredit) / combined) : 0;
      finalChildTaxCredit = roundCents(reduced - finalEarnedIncomeCredit);
    }
  }

  const totalCredits =
    deductionCredit +
    exemptionCredit +
    finalEarnedIncomeCredit +
    finalChildTaxCredit;

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
      federalTaxDeduction: roundCents(federalTaxDeduction),
      standardDeductionCredit: deductionCredit,
      exemptionCredit,
      earnedIncomeCredit: finalEarnedIncomeCredit,
      childTaxCredit: finalChildTaxCredit,
    },
  };
}

/**
 * The state earned income tax credit.
 *
 * Most states set their credit as a percentage of the federal credit and
 * stop paying it above an income of their own. Four states do it their own
 * way, and each of those has a rule of its own in the table.
 */
function stateEarnedIncomeCredit(
  credit: StateEarnedIncomeCredit,
  income: number,
  counts: ChildAgeCounts,
  status: FilingStatus,
): number {
  const children = totalChildren(counts);
  const married = status === 'married';

  switch (credit.kind) {
    case 'percent-of-federal': {
      if (credit.childrenOnly && children === 0) return 0;

      const federal = federalEitc(income, children, married);
      if (federal <= 0) return 0;

      let percent = credit.percent;
      if (children === 0 && credit.percentWithoutChildren !== undefined) {
        percent = credit.percentWithoutChildren;
      }

      /*
        Oregon pays a larger share where the youngest child is under three,
        which is why the age bands are part of the input and not a detail.
      */
      const youngest = youngestChildAge(counts);
      if (credit.percentWithYoungChild !== undefined && youngest !== null && youngest < 3) {
        percent = credit.percentWithYoungChild;
      }

      let amount = (federal * percent) / 100;
      if (credit.cap !== undefined) amount = Math.min(amount, credit.cap);
      if (credit.flatWithChildren !== undefined && children > 0) {
        amount += credit.flatWithChildren;
      }
      return roundCents(amount);
    }

    case 'percent-by-children': {
      if (children === 0) return 0;

      const federal = federalEitc(income, children, married);
      if (federal <= 0) return 0;

      const index = Math.min(children, credit.percentByChildren.length) - 1;
      return roundCents((federal * credit.percentByChildren[index]) / 100);
    }

    case 'own-schedule': {
      const limit = married ? credit.maxIncomeMarried : credit.maxIncomeSingle;
      if (income > limit) return 0;

      const federal = federalEitc(income, children, married);
      if (federal <= 0) return 0;

      const index = Math.min(children, credit.maxCredit.length - 1);
      const amount = Math.min((federal * credit.percentOfFederal) / 100, credit.maxCredit[index]);
      return roundCents(amount);
    }

    case 'earned-income-share': {
      const base = credit.earnedIncomeBase ?? income;
      const earned = Math.min(income, base);
      return roundCents(Math.min((earned * credit.percent) / 100, credit.maxCredit));
    }
  }
}

/**
 * The state child tax credit.
 *
 * The credit is worked out by the groups of children the state pays for, and
 * each group carries the age bands it covers. A group without a child in it
 * pays nothing, which is how a rule that needs a young child works.
 */
function stateChildTaxCredit(
  credit: StateChildTaxCredit,
  income: number,
  counts: ChildAgeCounts,
  status: FilingStatus,
  earnedIncomeCredit: number,
): number {
  const phaseOut = phaseOutFor(credit, status);
  if (phaseOut?.upTo !== undefined && income > phaseOut.upTo) return 0;

  /* The income above which the state pays no credit at all. */
  const maxIncome =
    status === 'married' ? credit.maxIncomeMarried : credit.maxIncomeSingle;
  if (maxIncome !== undefined && income > maxIncome) return 0;

  const tier = tierFor(credit, income, status);
  if (credit.tiers && !tier) return 0;

  let amount = 0;

  for (const group of credit.groups) {
    let children = childrenIn(counts, group.bands);
    if (children === 0) continue;
    if (group.maxChildren !== undefined) children = Math.min(children, group.maxChildren);

    if (group.percentOfStateEitc !== undefined) {
      amount += earnedIncomeCredit * (group.percentOfStateEitc / 100);
      continue;
    }

    if (group.percentOfFederalCtc !== undefined) {
      amount += children * (FEDERAL_CHILD_TAX_CREDIT * (group.percentOfFederalCtc / 100));
      continue;
    }

    const perChild = group.perChild ?? (tier ? tier.perChild : 0);
    const multiplier = group.tierMultiplier ?? 1;
    amount += (group.perReturn ? 1 : children) * perChild * multiplier;
  }

  if (amount <= 0) return 0;

  const reduced = applyPhaseOut(amount, income, phaseOut);
  return roundCents(Math.max(0, reduced));
}

/**
 * The income band that applies to a taxpayer.
 *
 * Where the state has no bands, there is no band to find.
 */
function tierFor(
  credit: StateChildTaxCredit,
  income: number,
  status: FilingStatus,
): StateCreditTier | null {
  const tiers = credit.tiers;
  if (!tiers) return null;

  const list =
    status === 'married' ? (tiers.married ?? tiers.all ?? tiers.single) : (tiers.single ?? tiers.all);

  if (!list) return null;

  for (const tier of list) {
    if (tier.upTo === null || income <= tier.upTo) return tier;
  }
  return null;
}

/** The way the credit falls away, for a filing status. */
function phaseOutFor(
  credit: StateChildTaxCredit,
  status: FilingStatus,
): StateCreditPhaseOut | null {
  const phaseOut = credit.phaseOut;
  if (!phaseOut) return null;

  if (status === 'married') return phaseOut.married ?? phaseOut.single ?? null;
  if (status === 'head-of-household') {
    return phaseOut.headOfHousehold ?? phaseOut.single ?? null;
  }
  return phaseOut.single ?? null;
}

/**
 * The credit after it has fallen away with the income.
 *
 * The states do this in several ways and each of them has its own rule in
 * the table, so every way is carried here and only the one that applies is
 * used.
 */
function applyPhaseOut(
  amount: number,
  income: number,
  phaseOut: StateCreditPhaseOut | null,
): number {
  if (!phaseOut || income <= phaseOut.from) return amount;

  const excess = income - phaseOut.from;

  if (phaseOut.perThousand !== undefined) {
    return amount - phaseOut.perThousand * Math.ceil(excess / 1000);
  }
  if (phaseOut.per500 !== undefined) {
    return amount - phaseOut.per500 * Math.ceil(excess / 500);
  }
  if (phaseOut.shareOfCreditPerThousand !== undefined) {
    return amount - amount * phaseOut.shareOfCreditPerThousand * Math.ceil(excess / 1000);
  }
  if (phaseOut.shareOfExcessIncome !== undefined) {
    return amount - excess * phaseOut.shareOfExcessIncome;
  }
  return amount;
}

/**
 * The federal income tax paid that comes off the state taxable income.
 *
 * Only three states let a taxpayer deduct it, and each of them has a rule
 * of its own, so the rule is looked up by the state and the amount is
 * worked out from it.
 */
function federalTaxDeductionFor(
  stateCode: string,
  status: FilingStatus,
  income: number,
  federalTax: number,
): number {
  const rule = STATE_FEDERAL_TAX_DEDUCTION[stateCode];
  if (!rule) return 0;

  const paid = Number.isFinite(federalTax) ? Math.max(0, federalTax) : 0;
  if (paid <= 0) return 0;

  /* Missouri takes a share of the federal tax, and the share depends on the income. */
  let amount = paid;
  if (rule.share) {
    let percent = 0;
    for (const band of rule.share) {
      if (band.upTo === null || income <= band.upTo) {
        percent = band.percent;
        break;
      }
    }
    amount = (paid * percent) / 100;
  }

  /* The limit on the amount, which is a different one for a combined return. */
  const cap = status === 'married' ? (rule.combinedCap ?? rule.cap) : rule.cap;
  if (cap !== undefined) amount = Math.min(amount, cap);

  /*
    Oregon takes the amount away again as the income rises. The limit falls
    from what it is at the first income to what it is at the second, in a
    straight line.
  */
  const phaseOut =
    status === 'married'
      ? rule.phaseOut?.married
      : status === 'head-of-household'
        ? (rule.phaseOut?.headOfHousehold ?? rule.phaseOut?.single)
        : rule.phaseOut?.single;

  if (phaseOut && income > phaseOut.from) {
    const start = cap ?? amount;
    const span = phaseOut.to - phaseOut.from;
    const ratio = span > 0 ? Math.min(1, Math.max(0, (income - phaseOut.from) / span)) : 1;
    const reduced = start + (phaseOut.amount - start) * ratio;
    amount = Math.min(amount, reduced);
  }

  return roundCents(Math.max(0, amount));
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
