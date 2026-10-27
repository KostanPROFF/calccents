/**
 * Compound interest with regular contributions.
 *
 * Compounding frequency and contribution frequency are the same period, so
 * the compounding frequency has to divide 12 (1, 2, 3, 4, 6 or 12). That
 * covers every case a person actually meets and keeps the arithmetic exact.
 */

import { roundCents, roundTo, sum } from './money.ts';

export type ContributionTiming = 'end' | 'begin';

export interface CompoundInput {
  /** Starting balance, in dollars. */
  principal: number;
  /** Contribution made every month, in dollars. */
  monthlyContribution: number;
  /** Nominal annual interest rate, in percent. */
  annualRatePercent: number;
  /** Number of years. */
  years: number;
  /** Compounding periods per year. Must divide 12. */
  compoundsPerYear: number;
  /** Annual inflation rate, in percent. Used to express the result in today's dollars. */
  inflationPercent: number;
  /** Whether a contribution is made at the start or the end of each period. */
  contributionTiming: ContributionTiming;
}

export interface CompoundYearRow {
  year: number;
  balance: number;
  contributed: number;
  earned: number;
  /** Balance expressed in the purchasing power of the starting year. */
  realBalance: number;
}

export interface CompoundResult {
  futureValue: number;
  totalContributions: number;
  totalInterest: number;
  /** Future value expressed in the purchasing power of the starting year. */
  realValue: number;
  /** Total contributions expressed in the purchasing power of the starting year. */
  realTotalContributions: number;
  /** Nominal annual rate compounded at the chosen frequency, in percent. */
  effectiveAnnualRatePercent: number;
  /** Inflation-adjusted annual rate, in percent. */
  realAnnualRatePercent: number;
  years: number;
  /** Compounding periods the horizon covers. It is a whole number unless the horizon ends part-way through a period. */
  periods: number;
  yearly: CompoundYearRow[];
}

const ALLOWED_FREQUENCIES = [1, 2, 3, 4, 6, 12];

function assertNonNegative(value: number, label: string): void {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`${label} must be a finite number of zero or more`);
  }
}

/** A ceiling on the horizon, so a typo cannot make the projection loop for billions of periods. */
const MAX_YEARS = 100;

/**
 * The shape of the horizon.
 *
 * A horizon of 1.5 years with annual compounding is eighteen months of
 * contributions and one and a half compounding periods. Rounding the
 * periods to a whole number would drop the last six months of deposits, so
 * the last period is kept as a fraction: it carries the part of the period
 * that is left, with the contribution and the interest in the same
 * proportion.
 */
interface Horizon {
  /** The number of compounding periods, as a whole number plus a fraction. */
  exactPeriods: number;
  /** The number of whole compounding periods. */
  fullPeriods: number;
  /** The part of the last period the horizon covers, from 0 to 1. */
  remainder: number;
  /** The contribution made in one whole compounding period. */
  contributionPerPeriod: number;
  /** The contribution made in the part of the last period the horizon covers. */
  partialContribution: number;
}

/** Work out the horizon from the number of years and the compounding frequency. */
function describeHorizon(input: CompoundInput): Horizon {
  const periodsPerYear = input.compoundsPerYear;
  const exactPeriods = input.years * periodsPerYear;
  // The rounding guard keeps 10 years at a monthly frequency out of the
  // partial-period branch, where floating point arithmetic would put it.
  const fullPeriods = Math.floor(exactPeriods + 1e-9);
  const remainder = Math.max(0, exactPeriods - fullPeriods);
  const contributionPerPeriod = input.monthlyContribution * (12 / periodsPerYear);

  return {
    exactPeriods,
    fullPeriods,
    remainder,
    contributionPerPeriod,
    partialContribution: contributionPerPeriod * remainder,
  };
}

/**
 * Closed-form future value.
 *
 *   FV = P * (1 + r)^n + PMT * [((1 + r)^n - 1) / r]
 *
 * Contributions made at the start of each period earn one extra period of
 * interest, which is the annuity-due adjustment of multiplying the
 * contribution part by (1 + r).
 *
 * When the horizon ends part-way through a compounding period, the
 * contribution for that part is carried at the same proportion as the
 * interest, and it earns no interest of its own.
 */
export function compoundFutureValue(input: CompoundInput): number {
  assertNonNegative(input.principal, 'Starting balance');
  assertNonNegative(input.monthlyContribution, 'Monthly contribution');
  assertNonNegative(input.annualRatePercent, 'Interest rate');
  assertNonNegative(input.years, 'Number of years');
  if (input.years > MAX_YEARS) {
    throw new Error(`Number of years must be ${MAX_YEARS} or fewer`);
  }
  assertNonNegative(input.inflationPercent, 'Inflation rate');
  if (!ALLOWED_FREQUENCIES.includes(input.compoundsPerYear)) {
    throw new Error(
      `Compounding frequency must be one of ${ALLOWED_FREQUENCIES.join(', ')}`,
    );
  }

  const periodsPerYear = input.compoundsPerYear;
  const periodRate = input.annualRatePercent / 100 / periodsPerYear;
  const { exactPeriods, fullPeriods, remainder, contributionPerPeriod, partialContribution } =
    describeHorizon(input);

  if (exactPeriods === 0) {
    return roundCents(input.principal);
  }

  const growth = (1 + periodRate) ** exactPeriods;
  const periodGrowth = 1 + periodRate;
  const annuity =
    periodRate === 0 ? fullPeriods : (periodGrowth ** fullPeriods - 1) / periodRate;
  const annuityFactor =
    input.contributionTiming === 'begin' ? annuity * periodGrowth : annuity;

  // The contribution in the part period is made at the end of it, so it
  // earns no interest of its own. When it is made at the start, it earns
  // the part of the period that is left.
  const partial = input.contributionTiming === 'begin' ? partialContribution * periodGrowth ** remainder : partialContribution;

  return roundCents(
    input.principal * growth + contributionPerPeriod * annuityFactor * periodGrowth ** remainder + partial,
  );
}

/**
 * Run the projection period by period and report the balance, the
 * contributions, the interest earned and the inflation-adjusted balance
 * for every year.
 */
export function projectCompoundInterest(input: CompoundInput): CompoundResult {
  // Validates the inputs before any arithmetic runs.
  compoundFutureValue(input);

  const periodsPerYear = input.compoundsPerYear;
  const periodRate = input.annualRatePercent / 100 / periodsPerYear;
  const { exactPeriods, fullPeriods, remainder, contributionPerPeriod, partialContribution } =
    describeHorizon(input);
  const inflationFactor = 1 + input.inflationPercent / 100;

  let balance = input.principal;
  let contributed = 0;
  let earned = 0;
  const yearly: CompoundYearRow[] = [];

  for (let period = 1; period <= fullPeriods; period += 1) {
    let contribution = 0;
    if (input.contributionTiming === 'begin') {
      contribution = contributionPerPeriod;
      balance += contribution;
      contributed += contribution;
    }

    const interest = balance * periodRate;
    balance += interest;
    earned += interest;

    if (input.contributionTiming === 'end') {
      contribution = contributionPerPeriod;
      balance += contribution;
      contributed += contribution;
    }

    if (period % periodsPerYear === 0) {
      const year = period / periodsPerYear;
      const rowBalance = roundCents(balance);
      yearly.push({
        year,
        balance: rowBalance,
        contributed: roundCents(contributed),
        earned: roundCents(earned),
        realBalance: roundCents(rowBalance / inflationFactor ** year),
      });
    }
  }

  /*
   * The last part of a period, when the horizon ends part-way through one.
   * The interest is the part of the period's growth that is left, and the
   * contribution is the part of the deposits that falls in it.
   */
  if (remainder > 0) {
    let contribution = 0;
    if (input.contributionTiming === 'begin') {
      contribution = partialContribution;
      balance += contribution;
      contributed += contribution;
    }

    const interest = balance * ((1 + periodRate) ** remainder - 1);
    balance += interest;
    earned += interest;

    if (input.contributionTiming === 'end') {
      contribution = partialContribution;
      balance += contribution;
      contributed += contribution;
    }
  }

  /*
   * The last row has to sit at the end of the horizon. A horizon of one
   * and a half years at a monthly frequency crosses one year boundary and
   * then stops, and the balance at that point is what the reader asked
   * about. A horizon of less than a year crosses no boundary at all, so
   * the row for the end of it is the only row there is.
   */
  const lastRow = yearly.at(-1);
  if (input.years > 0 && (!lastRow || lastRow.year !== input.years)) {
    const rowBalance = roundCents(balance);
    yearly.push({
      year: input.years,
      balance: rowBalance,
      contributed: roundCents(contributed),
      earned: roundCents(earned),
      realBalance: roundCents(rowBalance / inflationFactor ** input.years),
    });
  }

  const futureValue = roundCents(balance);
  const totalContributions = roundCents(contributed);
  const totalInterest = roundCents(futureValue - input.principal - totalContributions);
  /*
   * The figure in today's dollars is the balance that is shown, converted.
   * Rounding the balance first and then dividing it keeps the card and the
   * last row of the table on the same number, so the reader never finds two
   * versions of one figure on the same page.
   */
  const realValue = roundCents(futureValue / inflationFactor ** input.years);
  const realTotalContributions = roundCents(
    totalContributions / inflationFactor ** input.years,
  );
  const effectiveAnnualRatePercent = roundTo(
    ((1 + periodRate) ** periodsPerYear - 1) * 100,
    4,
  );
  /*
   * The real rate is the Fisher equation on the rate the money actually
   * earns: the effective annual rate, because that is what the balance
   * grows by in a year, divided by the inflation factor. Using the nominal
   * rate here would understate it, because the nominal rate is not what
   * lands in the account once compounding is applied.
   */
  const realAnnualRatePercent = roundTo(
    ((1 + effectiveAnnualRatePercent / 100) / inflationFactor - 1) * 100,
    4,
  );

  return {
    futureValue,
    totalContributions,
    totalInterest,
    realValue,
    realTotalContributions,
    effectiveAnnualRatePercent,
    realAnnualRatePercent,
    years: input.years,
    periods: exactPeriods,
    yearly,
  };
}

/** Sum of a series of yearly balances, used for simple average figures. */
export function averageYearlyBalance(result: CompoundResult): number {
  if (result.yearly.length === 0) return 0;
  return roundCents(sum(result.yearly.map((row) => row.balance)) / result.yearly.length);
}
