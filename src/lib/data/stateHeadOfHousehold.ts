/**
 * The head of household tables of the states.
 *
 * Most states have no head of household table of their own. A head of
 * household filer is taxed on the single filer brackets in those states, and
 * the table in `states.ts` is used for them.
 *
 * The states that do publish one are in this file. Each entry carries the
 * brackets the state publishes, and the standard deduction and the personal
 * exemption where they differ from the single filer ones.
 *
 * The file is separate from `states.ts` on purpose: that table is generated
 * from the Tax Foundation workbooks, and a generation run must not wipe the
 * head of household figures that came from the state forms.
 *
 * Two states are handled by their own rule rather than by a table:
 *
 *   Idaho   a head of household return is treated as a joint return, so the
 *           joint schedule in the state table is the one that applies
 *   Kansas  there is no head of household schedule, and the standard
 *           deduction and the exemption are the only differences
 *
 * Every figure below is from the state's own form or from the state's
 * revenue department, and the source and the date of the source are on every
 * entry.
 */

import type { StateAmount } from './states.ts';

/** One bracket of a state rate schedule. */
export interface StateHeadOfHouseholdBracket {
  /** The income at the bottom of the bracket. */
  readonly from: number;
  /** The rate of the bracket, as a percentage. */
  readonly rate: number;
}

/** What a state publishes for a head of household. */
export interface StateHeadOfHousehold {
  /** The brackets the state publishes for a head of household. */
  readonly brackets?: readonly StateHeadOfHouseholdBracket[];
  /** The standard deduction for a head of household, where it is its own. */
  readonly standardDeduction?: StateAmount;
  /** The personal exemption for a head of household, where it is its own. */
  readonly exemption?: StateAmount;
  /** Where the figures come from. */
  readonly source: string;
  /** The date of the source. */
  readonly sourceDate: string;
}

/**
 * The states that publish a head of household table of their own.
 *
 * A state that is not in this list is taxed on the single filer brackets.
 */
export const STATE_HEAD_OF_HOUSEHOLD: Record<string, StateHeadOfHousehold> = {
  AZ: {
    /*
      Arizona has no head of household schedule: the single filer rate
      applies, because the rate is a flat one. The standard deduction of a
      head of household is $24,150, which is the single filer deduction of
      $16,100 times one and a half, the way the statute sets the three
      amounts against each other.

      The amounts are not printed on the return yet: the Department of
      Taxation prints them with the form, and the 2026 form comes out in
      2027. Arizona ties the deduction to the federal basic standard
      deduction and indexes it the same way, so the 2026 figure is the
      federal one for 2026, and the three agree with each other: $16,100 for
      a single filer, $24,150 for a head of household and $32,200 for a
      couple.
    */
    standardDeduction: { amount: 24150, kind: 'exclusion' },
    source: 'https://www.azleg.gov/ars/43/01041.htm',
    sourceDate: '2026-06-13',
  },
  CA: {
    /*
      California publishes a head of household schedule of its own, Schedule
      Z. It is not the single filer schedule with the brackets twice as wide:
      the two schedules differ in the middle, so the schedule below is the one
      the state publishes. The standard deduction of a head of household is the
      one a couple gets.

      The top of the schedule carries the 1% Mental Health Services tax the
      state adds to taxable income above $1,000,000, which is why the rate
      above that line is one point more than the schedule itself says.
    */
    brackets: [
      { rate: 1, from: 0 },
      { rate: 2, from: 22927 },
      { rate: 4, from: 54316 },
      { rate: 6, from: 70018 },
      { rate: 8, from: 86654 },
      { rate: 9.3, from: 102356 },
      { rate: 10.3, from: 522385 },
      { rate: 11.3, from: 626864 },
      { rate: 12.3, from: 1000000 },
      { rate: 13.3, from: 1044771 },
    ],
    standardDeduction: { amount: 11800, kind: 'exclusion' },
    source: 'https://www.ftb.ca.gov/about-ftb/newsroom/tax-news/',
    sourceDate: '2026-10-01',
  },
  CT: {
    /*
      Connecticut publishes a head of household schedule of its own in the
      2026 Form CT-1040-ES, and the personal exemption of a head of
      household is $19,000.
    */
    brackets: [
      { rate: 2, from: 0 },
      { rate: 4.5, from: 16000 },
      { rate: 5.5, from: 80000 },
      { rate: 6, from: 160000 },
      { rate: 6.5, from: 320000 },
      { rate: 6.9, from: 400000 },
      { rate: 6.99, from: 800000 },
    ],
    exemption: { amount: 19000, kind: 'exclusion' },
    source: 'https://portal.ct.gov/-/media/drs/forms/2025/income/ct1040es-flat0126.pdf',
    sourceDate: '2026-01-01',
  },
  HI: {
    /*
      Hawaii publishes a head of household schedule of its own, Schedule III,
      and the standard deduction of a head of household is $12,000 for tax
      years that begin after 31 December 2025.
    */
    brackets: [
      { rate: 1.4, from: 0 },
      { rate: 3.2, from: 14400 },
      { rate: 5.5, from: 21600 },
      { rate: 6.4, from: 28800 },
      { rate: 6.8, from: 36000 },
      { rate: 7.2, from: 54000 },
      { rate: 7.6, from: 72000 },
      { rate: 7.9, from: 187500 },
      { rate: 8.25, from: 262500 },
      { rate: 9, from: 337500 },
      { rate: 10, from: 412500 },
      { rate: 11, from: 487500 },
    ],
    standardDeduction: { amount: 12000, kind: 'exclusion' },
    source: 'https://tax.hawaii.gov/forms/d_25table-on/d_25table-on_p13/',
    sourceDate: '2026-01-20',
  },
  ID: {
    /*
      Idaho has no head of household schedule of its own. I.C. 63-3024
      treats a head of household return as a joint return, so the joint
      schedule applies. The standard deduction follows the federal rule,
      which is $24,150 for a head of household.
    */
    brackets: [{ rate: 5.3, from: 9622 }],
    standardDeduction: { amount: 24150, kind: 'exclusion' },
    source: 'https://tax.idaho.gov/taxes/income-tax/individual-income/individual-income-tax-rate-schedule/',
    sourceDate: '2026-10-15',
  },
  KS: {
    /*
      Kansas has no head of household schedule: the single filer brackets
      apply. The standard deduction of a head of household is $6,180 and the
      personal exemption is $11,480.
    */
    standardDeduction: { amount: 6180, kind: 'exclusion' },
    exemption: { amount: 11480, kind: 'exclusion' },
    source: 'https://www.ksrevenue.gov/pdf/k-40es26.pdf',
    sourceDate: '2026-01-01',
  },
  MA: {
    /*
      Massachusetts has no head of household schedule: the single filer
      brackets apply. The personal exemption of a head of household is
      $6,800, and Massachusetts has no standard deduction.
    */
    exemption: { amount: 6800, kind: 'exclusion' },
    source: 'https://www.mass.gov/info-details/personal-income-tax-exemptions',
    sourceDate: '2026-10-26',
  },
  MD: {
    /*
      Maryland publishes a head of household schedule of its own, and the
      personal exemption is $3,200, which is what the single filer gets.
    */
    brackets: [
      { rate: 2, from: 0 },
      { rate: 3, from: 1000 },
      { rate: 4, from: 2000 },
      { rate: 4.75, from: 3000 },
      { rate: 5, from: 150000 },
      { rate: 5.25, from: 175000 },
      { rate: 5.5, from: 225000 },
      { rate: 5.75, from: 300000 },
      { rate: 6.25, from: 600000 },
      { rate: 6.5, from: 1200000 },
    ],
    source: 'https://www.marylandcomptroller.gov/content/dam/mdcomp/tax/forms/worksheets/2026-pv-worksheet.pdf',
    sourceDate: '2026-01-01',
  },
  ME: {
    /*
      Maine publishes a head of household schedule of its own, and the
      standard deduction of a head of household is $23,550. A surcharge of
      2% applies to the Maine taxable income above $1,500,000, and that
      surcharge is not carried here: the top bracket is the 9.15% the
      schedule itself gives.
    */
    brackets: [
      { rate: 5.8, from: 0 },
      { rate: 6.75, from: 41100 },
      { rate: 7.15, from: 97300 },
      { rate: 9.15, from: 1500000 },
    ],
    standardDeduction: { amount: 23550, kind: 'exclusion' },
    source:
      'https://www.maine.gov/revenue/sites/maine.gov.revenue/files/2026-05/ind_tax_rate_sched_2026_rev.pdf',
    sourceDate: '2026-05-20',
  },
  MN: {
    /*
      Minnesota publishes a head of household schedule of its own, and the
      standard deduction of a head of household is $23,000.
    */
    brackets: [
      { rate: 5.35, from: 0 },
      { rate: 6.8, from: 41010 },
      { rate: 7.85, from: 164800 },
      { rate: 9.85, from: 270060 },
    ],
    standardDeduction: { amount: 23000, kind: 'exclusion' },
    source: 'https://www.revenue.state.mn.us/minnesota-income-tax-rates-and-brackets',
    sourceDate: '2026-10-26',
  },
  MT: {
    /*
      Montana publishes a head of household schedule of its own, and the
      standard deduction follows the federal rule, which is $24,150 for a
      head of household.
    */
    brackets: [
      { rate: 4.7, from: 0 },
      { rate: 5.65, from: 71250 },
    ],
    standardDeduction: { amount: 24150, kind: 'exclusion' },
    source: 'https://revenue.mt.gov/news/recent-news/HB-337',
    sourceDate: '2025-11-14',
  },
  NJ: {
    /*
      New Jersey publishes a head of household schedule of its own, and the
      personal exemption is $1,000, which is what the single filer gets.
    */
    brackets: [
      { rate: 1.4, from: 0 },
      { rate: 1.75, from: 20000 },
      { rate: 2.45, from: 50000 },
      { rate: 3.5, from: 70000 },
      { rate: 5.525, from: 80000 },
      { rate: 6.37, from: 150000 },
      { rate: 8.97, from: 500000 },
      { rate: 10.75, from: 1000000 },
    ],
    source: 'https://www.nj.gov/treasury/taxation/pdf/current/1040i.pdf',
    sourceDate: '2026-10-26',
  },
  NM: {
    /*
      New Mexico publishes a head of household schedule of its own, and the
      standard deduction follows the federal rule, which is $24,150 for a
      head of household.
    */
    brackets: [
      { rate: 1.5, from: 0 },
      { rate: 3.2, from: 8000 },
      { rate: 4.3, from: 25000 },
      { rate: 4.7, from: 50000 },
      { rate: 4.9, from: 100000 },
      { rate: 5.9, from: 315000 },
    ],
    standardDeduction: { amount: 24150, kind: 'exclusion' },
    source: 'https://www.tax.newmexico.gov/individuals/personal-income-tax-information-overview/',
    sourceDate: '2026-10-26',
  },
  NY: {
    /*
      New York publishes a head of household schedule of its own in the
      2026 Form IT-2105-I, and the standard deduction of a head of household
      is $11,200. The brackets of a head of household are one and a half
      times as wide as the single filer brackets.
    */
    brackets: [
      { rate: 3.9, from: 0 },
      { rate: 4.4, from: 12800 },
      { rate: 5.15, from: 17650 },
      { rate: 5.4, from: 20900 },
      { rate: 5.9, from: 107650 },
      { rate: 6.85, from: 269300 },
      { rate: 9.65, from: 1616450 },
      { rate: 10.3, from: 5000000 },
      { rate: 10.9, from: 25000000 },
    ],
    standardDeduction: { amount: 11200, kind: 'exclusion' },
    source: 'https://www.tax.ny.gov/pdf/current_forms/it/it2105i.pdf',
    sourceDate: '2026-01-01',
  },
  OK: {
    /*
      Oklahoma has no head of household schedule of its own: a head of
      household is taxed on the single filer brackets. The standard deduction
      of a head of household is $9,350.
    */
    standardDeduction: { amount: 9350, kind: 'exclusion' },
    source: 'https://oklahoma.gov/content/dam/ok/en/tax/documents/forms/software-developers/Dev511-Pkt-26.pdf',
    sourceDate: '2026-01-01',
  },
  OR: {
    /*
      Oregon publishes a head of household schedule of its own in the
      2026 Form OR-40-FY instructions, and the standard deduction of a head
      of household is $4,685.
    */
    brackets: [
      { rate: 4.75, from: 0 },
      { rate: 6.75, from: 9100 },
      { rate: 8.75, from: 22800 },
      { rate: 9.9, from: 250000 },
    ],
    standardDeduction: { amount: 4685, kind: 'exclusion' },
    source: 'https://secure.dor.state.or.us/Services/draftforms/api/document/7872/download',
    sourceDate: '2026-10-26',
  },
  VT: {
    /*
      Vermont publishes a head of household schedule of its own, Schedule Z,
      in the 2026 instructions of the estimated tax voucher, and it publishes
      the 2026 schedules as preliminary figures. The standard deduction of a
      head of household is $11,450, which is the last one the Department
      published: the 2026 amount comes out with the 2026 return.
    */
    brackets: [
      { rate: 3.35, from: 0 },
      { rate: 6.6, from: 68000 },
      { rate: 7.6, from: 175500 },
      { rate: 8.75, from: 284150 },
    ],
    standardDeduction: { amount: 11450, kind: 'exclusion' },
    source: 'https://tax.vermont.gov/sites/tax/files/documents/IN-114-Instr-2026.pdf',
    sourceDate: '2025-10-01',
  },
  WI: {
    /*
      Wisconsin has no head of household schedule: the single filer brackets
      apply. The standard deduction of a head of household is $18,030.
    */
    standardDeduction: { amount: 18030, kind: 'exclusion' },
    source: 'https://www.revenue.wi.gov/TaxForms2026/2026-Form1-ES-Inst.pdf',
    sourceDate: '2026-01-16',
  },
};
