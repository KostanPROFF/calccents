/**
 * Federal income tax and payroll taxes for tax year 2026.
 *
 * The numbers in this file are constants with a date attached, not a
 * moving target. A tax year is part of the answer, so a reader has to be
 * able to see which year the figures belong to, and a figure that is two
 * years old has to be replaced on purpose rather than by accident.
 *
 * Where the numbers come from:
 *
 *   brackets and standard deduction
 *     Rev. Proc. 2025-32, Internal Revenue Bulletin 2025-45,
 *     published 3 November 2025
 *     https://www.irs.gov/irb/2025-45_IRB
 *
 *   Social Security taxable maximum, 184,500 for 2026
 *     Social Security Administration, 2026 wage base
 *     https://www.ssa.gov/cola/
 *
 *   Medicare rates and the Additional Medicare Tax thresholds
 *     Social Security Administration, Publication No. 15
 *     https://www.ssa.gov/pubs/EN-05-10035.pdf
 *
 * What this file does not do: it does not model credits, the additional
 * Medicare Tax for the year 2026 being the only payroll-tax item above
 * the standard rates, and it does not model anything below the line, such
 * as retirement contributions, which the reader enters directly.
 */

import { roundCents } from './money.ts';

/** The tax year these figures belong to. */
export const TAX_YEAR = 2026;

export type FilingStatus = 'single' | 'married' | 'head-of-household';

/**
 * One row of a rate table.
 *
 * The IRS publishes the tables as "tax of X plus Y percent of the excess
 * over Z", so a row carries the tax that applies at the bottom of the
 * bracket, the rate, and the income that tax was calculated from.
 */
interface Bracket {
  /** The income at which this bracket ends. Null for the top bracket. */
  upTo: number | null;
  rate: number;
  /** The tax owed when the income reaches the bottom of this bracket. */
  baseTax: number;
  /** The income at the bottom of this bracket. */
  baseIncome: number;
}

/** Table 1: married filing jointly and surviving spouses. */
const BRACKETS_MARRIED: Bracket[] = [
  { upTo: 24_800, rate: 0.1, baseTax: 0, baseIncome: 0 },
  { upTo: 100_800, rate: 0.12, baseTax: 2_480, baseIncome: 24_800 },
  { upTo: 211_400, rate: 0.22, baseTax: 11_600, baseIncome: 100_800 },
  { upTo: 403_550, rate: 0.24, baseTax: 35_932, baseIncome: 211_400 },
  { upTo: 512_450, rate: 0.32, baseTax: 82_048, baseIncome: 403_550 },
  { upTo: 768_700, rate: 0.35, baseTax: 116_896, baseIncome: 512_450 },
  { upTo: null, rate: 0.37, baseTax: 206_583.5, baseIncome: 768_700 },
];

/** Table 2: head of household. */
const BRACKETS_HEAD: Bracket[] = [
  { upTo: 17_700, rate: 0.1, baseTax: 0, baseIncome: 0 },
  { upTo: 67_450, rate: 0.12, baseTax: 1_770, baseIncome: 17_700 },
  { upTo: 105_700, rate: 0.22, baseTax: 7_740, baseIncome: 67_450 },
  { upTo: 201_750, rate: 0.24, baseTax: 16_155, baseIncome: 105_700 },
  { upTo: 256_200, rate: 0.32, baseTax: 39_207, baseIncome: 201_750 },
  { upTo: 640_600, rate: 0.35, baseTax: 56_631, baseIncome: 256_200 },
  { upTo: null, rate: 0.37, baseTax: 191_171, baseIncome: 640_600 },
];

/** Table 3: single and married filing separately. */
const BRACKETS_SINGLE: Bracket[] = [
  { upTo: 12_400, rate: 0.1, baseTax: 0, baseIncome: 0 },
  { upTo: 50_400, rate: 0.12, baseTax: 1_240, baseIncome: 12_400 },
  { upTo: 105_700, rate: 0.22, baseTax: 5_800, baseIncome: 50_400 },
  { upTo: 201_775, rate: 0.24, baseTax: 17_966, baseIncome: 105_700 },
  { upTo: 256_225, rate: 0.32, baseTax: 41_024, baseIncome: 201_775 },
  { upTo: 640_600, rate: 0.35, baseTax: 58_448, baseIncome: 256_225 },
  { upTo: null, rate: 0.37, baseTax: 192_979.25, baseIncome: 640_600 },
];

const BRACKETS: Record<FilingStatus, Bracket[]> = {
  single: BRACKETS_SINGLE,
  married: BRACKETS_MARRIED,
  'head-of-household': BRACKETS_HEAD,
};

/**
 * The standard deduction for 2026.
 *
 * Married filing jointly and surviving spouses get the larger amount;
 * everybody else gets the smaller one.
 */
export const STANDARD_DEDUCTION: Record<FilingStatus, number> = {
  single: 16_100,
  married: 32_200,
  'head-of-household': 24_150,
};

/** Social Security (OASDI) rate, applied up to the wage base. */
export const SOCIAL_SECURITY_RATE = 0.062;

/** The Social Security taxable maximum for 2026. */
export const SOCIAL_SECURITY_WAGE_BASE = 184_500;

/** Medicare rate, applied to all wages with no ceiling. */
export const MEDICARE_RATE = 0.0145;

/** The Additional Medicare Tax rate. */
export const ADDITIONAL_MEDICARE_RATE = 0.009;

/**
 * The Additional Medicare Tax thresholds.
 *
 * These are $200,000 for single filers and head of household, and
 * $250,000 for married filing jointly. They are not indexed for inflation.
 */
export const ADDITIONAL_MEDICARE_THRESHOLD: Record<FilingStatus, number> = {
  single: 200_000,
  married: 250_000,
  'head-of-household': 200_000,
};

/** The standard deduction for a filing status. */
export function standardDeduction(status: FilingStatus): number {
  return STANDARD_DEDUCTION[status];
}

/**
 * The federal income tax on an amount of taxable income.
 *
 * Taxable income is income after the standard or itemised deduction, so
 * this function takes the income that is actually taxed and returns the
 * tax on it.
 */
export function federalIncomeTax(taxableIncome: number, status: FilingStatus): number {
  if (!Number.isFinite(taxableIncome) || taxableIncome <= 0) return 0;

  const brackets = BRACKETS[status];
  for (const bracket of brackets) {
    if (bracket.upTo === null || taxableIncome <= bracket.upTo) {
      const tax = bracket.baseTax + bracket.rate * (taxableIncome - bracket.baseIncome);
      return roundCents(tax);
    }
  }
  return 0;
}

/**
 * The marginal rate: the rate the next dollar of taxable income is taxed
 * at. It is the rate a reader would meet next, and it is not the rate
 * they pay on their whole income.
 */
export function marginalRate(taxableIncome: number, status: FilingStatus): number {
  if (!Number.isFinite(taxableIncome) || taxableIncome <= 0) return BRACKETS[status][0].rate;

  for (const bracket of BRACKETS[status]) {
    if (bracket.upTo === null || taxableIncome <= bracket.upTo) return bracket.rate;
  }
  return 0;
}

/** The Social Security tax on a year of wages. */
export function socialSecurityTax(annualWages: number): number {
  if (!Number.isFinite(annualWages) || annualWages <= 0) return 0;
  const taxable = Math.min(annualWages, SOCIAL_SECURITY_WAGE_BASE);
  return roundCents(taxable * SOCIAL_SECURITY_RATE);
}

/** The Medicare tax on a year of wages. */
export function medicareTax(annualWages: number): number {
  if (!Number.isFinite(annualWages) || annualWages <= 0) return 0;
  return roundCents(annualWages * MEDICARE_RATE);
}

/** The Additional Medicare Tax on a year of wages. */
export function additionalMedicareTax(
  annualWages: number,
  status: FilingStatus,
): number {
  if (!Number.isFinite(annualWages) || annualWages <= 0) return 0;
  const excess = annualWages - ADDITIONAL_MEDICARE_THRESHOLD[status];
  if (excess <= 0) return 0;
  return roundCents(excess * ADDITIONAL_MEDICARE_RATE);
}

export interface FicaTaxes {
  socialSecurity: number;
  medicare: number;
  additionalMedicare: number;
  total: number;
}

/** All three payroll taxes on a year of wages. */
export function ficaTaxes(annualWages: number, status: FilingStatus): FicaTaxes {
  const socialSecurity = socialSecurityTax(annualWages);
  const medicare = medicareTax(annualWages);
  const additionalMedicare = additionalMedicareTax(annualWages, status);
  return {
    socialSecurity,
    medicare,
    additionalMedicare,
    total: roundCents(socialSecurity + medicare + additionalMedicare),
  };
}

/**
 * Taxable income: gross income minus the deduction.
 *
 * A deduction of zero means the standard deduction for the filing status.
 * Any other figure is the reader's own deduction, used as given: the
 * tool does not second-guess it, because a reader who itemises below the
 * standard amount has a reason for it.
 */
export function taxableIncome(
  grossIncome: number,
  status: FilingStatus,
  deduction = 0,
): number {
  if (!Number.isFinite(grossIncome) || grossIncome <= 0) return 0;
  const used = deduction > 0 ? deduction : standardDeduction(status);
  return roundCents(Math.max(0, grossIncome - used));
}

/**
 * A state income tax estimate.
 *
 * The rate is the reader's own: state rates differ, and most of them are
 * progressive, so a single number cannot be right for everybody. The
 * figure is applied to the whole of the income, which overstates the tax
 * in a progressive state and is exact in a flat-rate one.
 */
export function stateIncomeTax(taxableIncome: number, ratePercent: number): number {
  if (!Number.isFinite(taxableIncome) || taxableIncome <= 0) return 0;
  if (!Number.isFinite(ratePercent) || ratePercent <= 0) return 0;
  return roundCents(taxableIncome * (ratePercent / 100));
}

export interface IncomeTaxInput {
  /** The gross income for the year. */
  grossIncome: number;
  filingStatus: FilingStatus;
  /** Pre-tax deductions: 401(k), HSA, FSA. */
  preTaxDeductions: number;
  /** The itemised deduction the reader claims. Zero means the standard one. */
  itemisedDeduction: number;
  /** The reader's state income tax rate, as a percentage. */
  stateRatePercent: number;
}

export interface IncomeTaxResult {
  grossIncome: number;
  preTaxDeductions: number;
  /** The deduction actually used. */
  deduction: number;
  taxableIncome: number;
  federalTax: number;
  stateTax: number;
  totalTax: number;
  /** Total tax as a share of gross income. */
  effectiveRate: number;
  /** The rate the next dollar of taxable income is taxed at. */
  marginalRate: number;
  /** The income left after tax. */
  afterTaxIncome: number;
}

/**
 * The income tax on a year of earnings.
 *
 * This is the tax itself, without the payroll taxes that come out of a
 * wage: Social Security and Medicare are a separate mechanism with their
 * own ceilings, and a reader thinking about a tax bill wants the two
 * apart.
 */
export function computeIncomeTax(input: IncomeTaxInput): IncomeTaxResult {
  const gross = Number.isFinite(input.grossIncome) ? Math.max(0, input.grossIncome) : 0;
  const preTax = Number.isFinite(input.preTaxDeductions)
    ? Math.min(Math.max(0, input.preTaxDeductions), gross)
    : 0;
  // The deduction actually used. A taxpayer who itemises may still claim
  // the standard deduction when it is the larger of the two, so the
  // larger amount is the one that applies.
  const deduction =
    Number.isFinite(input.itemisedDeduction) && input.itemisedDeduction > 0
      ? Math.max(input.itemisedDeduction, standardDeduction(input.filingStatus))
      : standardDeduction(input.filingStatus);

  const taxable = taxableIncome(gross - preTax, input.filingStatus, deduction);
  const federalTax = federalIncomeTax(taxable, input.filingStatus);
  const stateTax = stateIncomeTax(taxable, input.stateRatePercent);
  const totalTax = roundCents(federalTax + stateTax);

  return {
    grossIncome: roundCents(gross),
    preTaxDeductions: roundCents(preTax),
    deduction: roundCents(deduction),
    taxableIncome: taxable,
    federalTax,
    stateTax,
    totalTax,
    effectiveRate: gross > 0 ? roundCents((totalTax / gross) * 100) : 0,
    marginalRate: marginalRate(taxable, input.filingStatus),
    afterTaxIncome: roundCents(gross - preTax - totalTax),
  };
}
