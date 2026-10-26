/**
 * The states that let a taxpayer deduct the federal income tax paid.
 *
 * A score of states used to allow the federal income tax paid to come off
 * the state taxable income. By tax year 2026 three do:
 *
 *   Alabama    the deduction has no limit, and it does not depend on whether
 *              the taxpayer itemised on the federal return
 *   Missouri   the deduction is a share of the federal tax, and the share
 *              depends on the Missouri income, with a limit on the amount
 *   Oregon     the deduction is the federal tax, with a limit on the amount
 *              and a limit on the income that qualifies
 *
 * The list is the Tax Foundation's: the footnote on the state income tax
 * rates table of 28 April 2026 that reads "These states allow some or all of
 * federal income tax paid to be deducted from state taxable income" is
 * marked against Alabama, Missouri and Oregon and against nothing else.
 * Every state was then checked against its own return, and the three are the
 * only ones with a federal income tax paid line on the return.
 *
 * The states that used to have the deduction do not any more: Louisiana
 * dropped it, Iowa has no line on its return, and Montana took it away
 * from tax year 2024. The states that let a taxpayer deduct their own state
 * and local income taxes paid are a different rule and are not in this file.
 *
 * The deduction that is subtracted is the federal income tax this site
 * calculates. A return carries more than that: the personal exemptions and
 * the credits of the federal return are not in the federal figure on this
 * site, so the deduction is larger here than it would be on a real return.
 * Alabama's deduction also leaves out the refundable credits, which is the
 * one difference that matters at the incomes where the credit is paid.
 */

import type { StateAmount } from './states.ts';

/**
 * The share of the federal tax that can be deducted, by the state income.
 *
 * The bands are read from the top down: the first band whose limit the
 * income falls under is the one that applies.
 */
export interface StateDeductionShare {
  /** The income at the top of the band. Null for the band above the last. */
  readonly upTo: number | null;
  /** The share of the federal tax that can be deducted, as a percentage. */
  readonly percent: number;
}

/**
 * The income above which the deduction falls away.
 *
 * The amount falls from what it is at the first income to what it is at the
 * second, in a straight line.
 */
export interface StateDeductionPhaseOut {
  /** The income at which the reduction starts. */
  readonly from: number;
  /** The income at which the reduction ends. */
  readonly to: number;
  /** The amount the deduction falls to. */
  readonly amount: number;
}

/** What a state allows as a deduction for the federal income tax paid. */
export interface StateFederalTaxDeduction {
  /**
   * The most that can be deducted on a return other than a combined return.
   */
  readonly cap?: number;
  /** The most that can be deducted on a combined return. */
  readonly combinedCap?: number;
  /** The share of the federal tax that can be deducted, by the state income. */
  readonly share?: readonly StateDeductionShare[];
  /** The income above which the amount falls away, by filing status. */
  readonly phaseOut?: {
    readonly single?: StateDeductionPhaseOut;
    readonly headOfHousehold?: StateDeductionPhaseOut;
    readonly married?: StateDeductionPhaseOut;
  };
  /** Where the rule comes from. */
  readonly source: string;
  /** The date of the source. */
  readonly sourceDate: string;
}

/**
 * The states that let the federal income tax paid come off the state taxable
 * income.
 */
export const STATE_FEDERAL_TAX_DEDUCTION: Record<string, StateFederalTaxDeduction> = {
  AL: {
    /*
      Alabama Form 40, line 12: the federal income tax deduction is a line of
      its own, separate from the standard or itemised deduction, so it does
      not depend on itemising on the federal return. The short form carries
      the same worksheet, which is what a taxpayer who does not itemise
      uses. There is no limit on the amount.

      The deduction is the federal tax after the credits that reduce it, less
      the refundable credits, and it is worked out in proportion to the
      Alabama income for a part-year resident and for a married couple
      filing separately. This site has one state and one income for the
      taxpayer, so the proportion is the whole amount.

      The tax year 2026 booklet is not published yet, so the tax year 2025
      booklet is the rule that is carried here.
    */
    source: 'https://www.revenue.alabama.gov/wp-content/uploads/2026/01/25f40bk.pdf',
    sourceDate: '2025-12-31',
  },
  MO: {
    /*
      Missouri MO-1040, line 13: the deduction is the federal income tax
      multiplied by a share that depends on the Missouri income: 35% up to
      $25,000, 25% up to $50,000, 15% up to $100,000, 5% up to $125,000 and
      nothing above that. The amount that comes out of it may not exceed
      $5,000 on any return other than a combined return, where the limit is
      $10,000. The limits are fixed amounts in the statute and are not
      indexed for inflation.

      The tax year 2026 instructions are not published yet, so the tax year
      2025 instructions are the rule that is carried here.
    */
    cap: 5000,
    combinedCap: 10000,
    share: [
      { upTo: 25000, percent: 35 },
      { upTo: 50000, percent: 25 },
      { upTo: 100000, percent: 15 },
      { upTo: 125000, percent: 5 },
      { upTo: null, percent: 0 },
    ],
    source: 'https://dor.mo.gov/forms/MO-1040%20Instructions_2025.pdf',
    sourceDate: '2025-12-29',
  },
  OR: {
    /*
      Oregon OR-40, line 10: the federal tax liability of the tax year comes
      off the Oregon adjusted gross income. The amount that may be deducted
      is limited to $8,750 for tax year 2026, and the limit falls away with
      the income: a single filer is at $7,000 above $145,000, and a couple
      or a head of household is at nothing above $290,000. The line is a
      subtraction of its own and is not part of the itemised deductions, so
      itemising on the federal return is not needed.
    */
    cap: 8750,
    phaseOut: {
      single: { from: 125000, to: 145000, amount: 7000 },
      headOfHousehold: { from: 250000, to: 290000, amount: 0 },
      married: { from: 250000, to: 290000, amount: 0 },
    },
    source: 'https://secure.dor.state.or.us/Services/draftforms/api/document/7872/download',
    sourceDate: '2026-09-11',
  },
};

/** The standard deduction of a state, as it is carried in the state table. */
export type { StateAmount };
