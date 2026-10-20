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
  periods: number;
  yearly: CompoundYearRow[];
}

const ALLOWED_FREQUENCIES = [1, 2, 3, 4, 6, 12];

function assertNonNegative(value: number, label: string): void {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`${label} must be a finite number of zero or more`);
  }
}

/**
 * Closed-form future value.
 *
 *   FV = P * (1 + r)^n + PMT * [((1 + r)^n - 1) / r]
 *
 * Contributions made at the start of each period earn one extra period of
 * interest, which is the annuity-due adjustment of multiplying the
 * contribution part by (1 + r).
 */
export function compoundFutureValue(input: CompoundInput): number {
  assertNonNegative(input.principal, 'Starting balance');
  assertNonNegative(input.monthlyContribution, 'Monthly contribution');
  assertNonNegative(input.annualRatePercent, 'Interest rate');
  assertNonNegative(input.years, 'Number of years');
  assertNonNegative(input.inflationPercent, 'Inflation rate');
  if (!ALLOWED_FREQUENCIES.includes(input.compoundsPerYear)) {
    throw new Error(
      `Compounding frequency must be one of ${ALLOWED_FREQUENCIES.join(', ')}`,
    );
  }

  const periodsPerYear = input.compoundsPerYear;
  const periodRate = input.annualRatePercent / 100 / periodsPerYear;
  const periods = Math.round(input.years * periodsPerYear);
  const contributionPerPeriod =
    input.monthlyContribution * (12 / periodsPerYear);

  if (periods === 0) {
    return roundCents(input.principal);
  }

  const growth = (1 + periodRate) ** periods;
  const annuity = periodRate === 0 ? periods : (growth - 1) / periodRate;
  const annuityFactor =
    input.contributionTiming === 'begin' ? annuity * (1 + periodRate) : annuity;

  return roundCents(
    input.principal * growth + contributionPerPeriod * annuityFactor,
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
  const periods = Math.round(input.years * periodsPerYear);
  const contributionPerPeriod = input.monthlyContribution * (12 / periodsPerYear);
  const inflationFactor = 1 + input.inflationPercent / 100;

  let balance = input.principal;
  let contributed = 0;
  let earned = 0;
  const yearly: CompoundYearRow[] = [];

  for (let period = 1; period <= periods; period += 1) {
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
      yearly.push({
        year,
        balance: roundCents(balance),
        contributed: roundCents(contributed),
        earned: roundCents(earned),
        realBalance: roundCents(balance / inflationFactor ** year),
      });
    }
  }

  const futureValue = roundCents(balance);
  const totalContributions = roundCents(contributed);
  const totalInterest = roundCents(futureValue - input.principal - totalContributions);
  const realValue = roundCents(futureValue / inflationFactor ** input.years);
  const realTotalContributions = roundCents(
    totalContributions / inflationFactor ** input.years,
  );
  const effectiveAnnualRatePercent = roundTo(
    ((1 + periodRate) ** periodsPerYear - 1) * 100,
    4,
  );
  const realAnnualRatePercent = roundTo(
    ((1 + input.annualRatePercent / 100) / inflationFactor - 1) * 100,
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
    periods,
    yearly,
  };
}

/** Sum of a series of yearly balances, used for simple average figures. */
export function averageYearlyBalance(result: CompoundResult): number {
  if (result.yearly.length === 0) return 0;
  return roundCents(sum(result.yearly.map((row) => row.balance)) / result.yearly.length);
}
