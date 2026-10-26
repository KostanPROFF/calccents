/**
 * The state credits the model carries.
 *
 * Two credits are modelled: the state earned income tax credit, for the
 * states that set it as a percentage of the federal credit, and the state
 * child tax credit, for the states whose credit reaches every child under
 * seventeen.
 *
 * The research behind every number is in the two files next to this one:
 *
 *   stateEitc.source.json
 *     the percentage each state pays, whether the credit is refundable, the
 *     income above which it stops, the source and the date of each one
 *   stateCtc.source.json
 *     the amount per child, the phase-out, the age limit, the source and the
 *     date of each one
 *
 * The sources behind them are the Tax Policy Center and the National
 * Conference of State Legislatures for the earned income credit, and the
 * Prenatal-to-3 Policy Impact Center, the NCSL and the official documents of
 * the states themselves for the child tax credit. Where a state publishes a
 * different rule from the one the model can carry, the state is not in this
 * file, and the guide says which ones.
 */

/** The rule a state follows for its earned income tax credit. */
export interface StateEarnedIncomeCredit {
  /** The percentage of the federal credit the state pays. */
  readonly percent: number;
  /** The percentage used when the taxpayer has no qualifying children. */
  readonly percentWithoutChildren?: number;
  /** A cap on the credit in dollars, where the state sets one. */
  readonly cap?: number;
  /** True where the credit is only paid to taxpayers with children. */
  readonly childrenOnly?: boolean;
  /** A flat amount added to the credit where the taxpayer has children. */
  readonly flatWithChildren?: number;
  /** True where the credit does not reduce the tax below zero. */
  readonly nonRefundable?: boolean;
  /** The income above which the credit is not paid. */
  readonly maxIncomeSingle?: number;
  /** The income above which the credit is not paid, for a married couple. */
  readonly maxIncomeMarried?: number;
}

/** The rule a state follows for its child tax credit. */
export interface StateChildTaxCredit {
  /** The credit for each child. */
  readonly perChild: number;
  /** The income above which the credit starts to fall away. */
  readonly phaseOutSingle?: number;
  /** The same, for a married couple. */
  readonly phaseOutMarried?: number;
  /** The income above which the credit is not paid at all. */
  readonly maxIncomeSingle?: number;
  /** The same, for a married couple. */
  readonly maxIncomeMarried?: number;
  /** True where the credit does not reduce the tax below zero. */
  readonly nonRefundable?: boolean;
}

/** The credits of a state. */
export interface StateCredits {
  readonly earnedIncome?: StateEarnedIncomeCredit;
  readonly child?: StateChildTaxCredit;
}

/**
 * The credits the model carries, by state code.
 *
 * The earned income credit is the percentage of the federal credit, which is
 * how most of the states that have one define it. The child tax credit is
 * the states whose credit reaches every child under seventeen; the states
 * that credit only younger children are not here, because a single number
 * of children cannot carry the age of each one.
 */
export const STATE_CREDITS: Record<string, StateCredits> = {
  AZ: {
    child: {
      perChild: 125,
      phaseOutSingle: 200000,
      phaseOutMarried: 400000,
      nonRefundable: true,
    },
  },
  CO: { earnedIncome: { percent: 25 } },
  CT: { earnedIncome: { percent: 40, flatWithChildren: 250 } },
  DC: { earnedIncome: { percent: 85 } },
  DE: { earnedIncome: { percent: 4.5 } },
  HI: { earnedIncome: { percent: 40 } },
  IA: { earnedIncome: { percent: 15 } },
  IL: { earnedIncome: { percent: 20 } },
  IN: { earnedIncome: { percent: 10, childrenOnly: true } },
  KS: { earnedIncome: { percent: 17 } },
  LA: { earnedIncome: { percent: 5 } },
  MA: { earnedIncome: { percent: 40 } },
  MD: { earnedIncome: { percent: 45, percentWithoutChildren: 100 } },
  ME: { earnedIncome: { percent: 25, percentWithoutChildren: 50 } },
  MI: { earnedIncome: { percent: 30 } },
  MN: {
    child: {
      perChild: 1800,
      phaseOutSingle: 32680,
      phaseOutMarried: 38770,
    },
  },
  MO: { earnedIncome: { percent: 20, nonRefundable: true } },
  MT: { earnedIncome: { percent: 20 } },
  NE: { earnedIncome: { percent: 10 } },
  NJ: { earnedIncome: { percent: 40 } },
  NM: { earnedIncome: { percent: 25 } },
  NY: { earnedIncome: { percent: 30 } },
  OH: { earnedIncome: { percent: 30, nonRefundable: true } },
  OK: { earnedIncome: { percent: 5 } },
  OR: { earnedIncome: { percent: 14 } },
  PA: { earnedIncome: { percent: 10 } },
  RI: { earnedIncome: { percent: 16 } },
  SC: { earnedIncome: { percent: 125, cap: 200 } },
  UT: { earnedIncome: { percent: 20, nonRefundable: true } },
  VA: { earnedIncome: { percent: 20 } },
  VT: { earnedIncome: { percent: 38, percentWithoutChildren: 100 } },
};
