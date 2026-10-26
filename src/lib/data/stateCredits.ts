/**
 * The state credits the model carries.
 *
 * Three credits are modelled: the state earned income tax credit, the state
 * child tax credit, and the credits that hang off them in a few states.
 *
 * The research behind every number is in the two files next to this one:
 *
 *   stateEitc.source.json
 *     the shape of each earned income credit, whether it is refundable, the
 *     income above which it stops, the source and the date of each one
 *   stateCtc.source.json
 *     the amount per child, the age limit, the phase-out, the source and the
 *     date of each one
 *
 * The sources behind them are the Tax Policy Center, the National Conference
 * of State Legislatures, the Prenatal-to-3 Policy Impact Center, the Franchise
 * Tax Board, the state revenue departments and the state tax forms themselves.
 *
 * The earned income credit comes in four shapes, because four states do not
 * follow the ordinary one:
 *
 *   percent-of-federal    most of the states: a share of the federal credit
 *   percent-by-children   Wisconsin: a share that depends on the number of
 *                          children, and no credit without a child
 *   own-schedule          California: the credit is calculated on the state's
 *                          own table, with its own maximum and its own limit
 *                          on the income that qualifies
 *   earned-income-share   Minnesota: a share of the earned income, up to a
 *                          maximum
 *
 * The child tax credit is grouped by the age of the child, because that is
 * what the states use: New York pays $1,000 for a child under four and $500
 * for a child from four to sixteen, Minnesota pays $1,800 for a child under
 * eighteen, and a state that credits only the youngest children is not
 * modelled by a single number of children. The bands themselves are in
 * `src/lib/data/childAges.ts`.
 *
 * The amounts that come off the tax rather than off the income are marked as
 * such in the sources and marked as such here: a credit that does not reduce
 * the tax below zero is not refundable, and the model shows the tax as zero
 * rather than carrying the excess.
 */

import type { ChildAgeBandId } from './childAges.ts';

/** The share of the federal credit a state pays, which is most of them. */
export interface PercentOfFederalCredit {
  readonly kind: 'percent-of-federal';
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
  /**
   * A larger share where the youngest child is under three, which is Oregon.
   */
  readonly percentWithYoungChild?: number;
}

/** A share that depends on how many children there are, which is Wisconsin. */
export interface PercentByChildrenCredit {
  readonly kind: 'percent-by-children';
  /** The share for one child, for two and for three or more. */
  readonly percentByChildren: readonly [number, number, number];
  /** The income above which the credit is not paid. */
  readonly maxIncomeSingle?: number;
  /** The same, for a married couple. */
  readonly maxIncomeMarried?: number;
}

/** A credit the state calculates on its own table, which is California. */
export interface OwnScheduleCredit {
  readonly kind: 'own-schedule';
  /**
   * The share of the federal credit the two tables show. California's maximum
   * is about 47 percent of the federal maximum in every family size.
   */
  readonly percentOfFederal: number;
  /**
   * The most the credit can be, by number of qualifying children: none, one,
   * two and three or more.
   */
  readonly maxCredit: readonly [number, number, number, number];
  /** The income above which the state pays no credit at all. */
  readonly maxIncomeSingle: number;
  /** The same, for a married couple. */
  readonly maxIncomeMarried: number;
}

/** A share of the earned income up to a maximum, which is Minnesota. */
export interface EarnedIncomeShareCredit {
  readonly kind: 'earned-income-share';
  /** The share of the earned income the credit is. */
  readonly percent: number;
  /** The earned income the share applies to, where the state limits it. */
  readonly earnedIncomeBase?: number;
  /** The most the credit can be. */
  readonly maxCredit: number;
}

/**
 * The rule a state follows for its earned income tax credit.
 *
 * The four kinds are in the comment at the top of this file.
 */
export type StateEarnedIncomeCredit =
  | PercentOfFederalCredit
  | PercentByChildrenCredit
  | OwnScheduleCredit
  | EarnedIncomeShareCredit;

/**
 * One income band of a credit, where the amount depends on the income.
 *
 * The bands are read from the top down: the first band whose limit the income
 * falls under is the one that applies.
 */
export interface StateCreditTier {
  /** The income at the top of the band. Null for the open band above it. */
  readonly upTo: number | null;
  /** The amount for each child in this band. */
  readonly perChild: number;
}

/**
 * How a credit falls away as the income rises.
 *
 * The states do it in several ways: an amount for each thousand dollars of
 * income, a share of the credit for each thousand, a share of the income above
 * the threshold, and a cliff where the credit simply stops.
 */
export interface StateCreditPhaseOut {
  /** The income at which the credit starts to fall away. */
  readonly from: number;
  /** The income above which there is no credit at all. */
  readonly upTo?: number;
  /** The amount taken off for each $1,000 of income above the threshold. */
  readonly perThousand?: number;
  /** The amount taken off for each $500 of income above the threshold. */
  readonly per500?: number;
  /** The share of the credit taken off for each $1,000 above the threshold. */
  readonly shareOfCreditPerThousand?: number;
  /** The share of the income above the threshold that comes off the credit. */
  readonly shareOfExcessIncome?: number;
}

/** The way a credit falls away, by filing status. */
export interface StateCreditPhaseOuts {
  readonly single?: StateCreditPhaseOut;
  readonly headOfHousehold?: StateCreditPhaseOut;
  readonly married?: StateCreditPhaseOut;
}

/**
 * One group of children a state credit pays for.
 *
 * A group only counts where it has a child in it, which is how a rule that
 * needs a young child works: the Illinois credit needs a child under twelve,
 * so the group carries the bands below twelve and nothing happens without a
 * child in them.
 */
export interface StateChildCreditGroup {
  /** The age bands the group covers. */
  readonly bands: readonly ChildAgeBandId[];
  /** The credit for each child, where the state gives a flat amount. */
  readonly perChild?: number;
  /** A multiple of the income band amount, where the state doubles it. */
  readonly tierMultiplier?: number;
  /** A share of the state earned income credit, where the state gives one. */
  readonly percentOfStateEitc?: number;
  /** A share of the federal child tax credit, where the state gives one. */
  readonly percentOfFederalCtc?: number;
  /** True where the credit is granted once per return and not per child. */
  readonly perReturn?: boolean;
  /** The most children the group counts, where the state sets a limit. */
  readonly maxChildren?: number;
}

/** The rule a state follows for its child tax credit. */
export interface StateChildTaxCredit {
  /** The groups of children the credit pays for. */
  readonly groups: readonly StateChildCreditGroup[];
  /** The income bands, where the amount depends on the income. */
  readonly tiers?: {
    /** The bands that apply to every filing status. */
    readonly all?: readonly StateCreditTier[];
    /** The bands for a single filer and for a head of household. */
    readonly single?: readonly StateCreditTier[];
    /** The bands for a married couple. */
    readonly married?: readonly StateCreditTier[];
  };
  /** How the credit falls away as the income rises. */
  readonly phaseOut?: StateCreditPhaseOuts;
  /** The income above which the credit is not paid at all. */
  readonly maxIncomeSingle?: number;
  /** The same, for a married couple. */
  readonly maxIncomeMarried?: number;
  /** True where the credit does not reduce the tax below zero. */
  readonly nonRefundable?: boolean;
}

/**
 * A phase-out that falls on the two credits of a state together.
 *
 * Minnesota adds its child tax credit and its working family credit and
 * reduces the sum, so the reduction cannot be applied to either credit on
 * its own.
 */
export interface StateJointPhaseOut {
  /** The income at which the credits start to fall away. */
  readonly from: number;
  /** The same, for a married couple. */
  readonly marriedFrom?: number;
  /** The share of the income above the threshold that comes off the credits. */
  readonly shareOfExcessIncome: number;
}

/** The credits of a state. */
export interface StateCredits {
  readonly earnedIncome?: StateEarnedIncomeCredit;
  readonly child?: StateChildTaxCredit;
  /** A phase-out that falls on both credits together. */
  readonly jointPhaseOut?: StateJointPhaseOut;
}

/**
 * The credits the model carries, by state code.
 *
 * The earned income credit is the share of the federal credit, which is how
 * most of the states that have one define it, and the child tax credit is
 * grouped by the age of the child, which is how the states that credit only
 * the youngest children define it.
 */
export const STATE_CREDITS: Record<string, StateCredits> = {
  AZ: {
    /*
      Arizona gives a dependent tax credit, not a federal-style child tax
      credit: $125 for a dependent under seventeen and $25 for a dependent of
      seventeen or older, reduced by 5% of the credit for every $1,000 of
      federal AGI above the threshold. It is not refundable.
      A.R.S. 43-1073.01, H.B. 4168 for tax year 2026.
    */
    child: {
      groups: [
        { bands: ['under4', 'fourToFive', 'six', 'sevenToEleven', 'twelve', 'thirteenToSixteen'], perChild: 125 },
        { bands: ['seventeen'], perChild: 25 },
      ],
      phaseOut: {
        single: { from: 200000, shareOfCreditPerThousand: 0.05 },
        headOfHousehold: { from: 200000, shareOfCreditPerThousand: 0.05 },
        married: { from: 400000, shareOfCreditPerThousand: 0.05 },
      },
      nonRefundable: true,
    },
  },
  CA: {
    /*
      California calculates its own earned income credit, the CalEITC, with
      its own maximum and its own limit on the income that qualifies. The
      table the Franchise Tax Board publishes shows a maximum about 47 percent
      of the federal maximum in every family size, which is what is modelled
      here, with the maximum credit and the income limit taken from the
      table. The state also gives a Young Child Tax Credit once per return
      for a child under six, which is the second group below.
      FTB CalEITC eligibility and credit information, tax year 2025 table.
    */
    earnedIncome: {
      kind: 'own-schedule',
      percentOfFederal: 47,
      maxCredit: [313, 2088, 3447, 3878],
      maxIncomeSingle: 34050,
      maxIncomeMarried: 34050,
    },
    child: {
      groups: [
        { bands: ['under4', 'fourToFive'], perChild: 1189, perReturn: true },
      ],
      /*
        The Young Child Tax Credit is reduced by $21.71 for each $100 of
        earned income above $27,425 and is gone at $32,901. The state
        measures it against earned income and this site measures it against
        the adjusted gross income, which is the same figure for most
        filers.
      */
      phaseOut: {
        single: { from: 27425, shareOfExcessIncome: 0.2171, upTo: 32901 },
        headOfHousehold: { from: 27425, shareOfExcessIncome: 0.2171, upTo: 32901 },
        married: { from: 27425, shareOfExcessIncome: 0.2171, upTo: 32901 },
      },
    },
  },
  CO: {
    /*
      Colorado's child tax credit no longer depends on the federal credit: it
      is a flat amount for a child under six, and the amount depends on the
      income. The tax year 2025 table is the published one: $1,200, $600 or
      $200 for a single filer and $1,200, $600 or $200 for a couple, and a
      head of household uses the single table.
      Colorado DOR, Income Tax Topics: Child Tax Credit, January 2026.
    */
    earnedIncome: { kind: 'percent-of-federal', percent: 25 },
    child: {
      groups: [{ bands: ['under4', 'fourToFive'] }],
      tiers: {
        single: [
          { upTo: 26000, perChild: 1200 },
          { upTo: 51000, perChild: 600 },
          { upTo: 77000, perChild: 200 },
        ],
        married: [
          { upTo: 36000, perChild: 1200 },
          { upTo: 61000, perChild: 600 },
          { upTo: 87000, perChild: 200 },
        ],
      },
    },
  },
  CT: {
    earnedIncome: { kind: 'percent-of-federal', percent: 40, flatWithChildren: 250 },
  },
  DC: {
    earnedIncome: { kind: 'percent-of-federal', percent: 85 },
  },
  DE: {
    earnedIncome: { kind: 'percent-of-federal', percent: 4.5 },
  },
  GA: {
    /*
      Georgia's qualifying child credit is $250 for each child under six, for
      tax year 2026 and later. There is no income phase-out: every family that
      qualifies gets the same amount. The credit is not refundable.
      H.B. 136 (2025), O.C.G.A. 48-7-29.27.
    */
    child: {
      groups: [{ bands: ['under4', 'fourToFive'], perChild: 250 }],
      nonRefundable: true,
    },
  },
  HI: {
    earnedIncome: { kind: 'percent-of-federal', percent: 40 },
  },
  IA: {
    earnedIncome: { kind: 'percent-of-federal', percent: 15 },
  },
  IL: {
    earnedIncome: { kind: 'percent-of-federal', percent: 20 },
    /*
      The Illinois child tax credit is 40% of the Illinois earned income
      credit, and the Illinois credit is 20% of the federal one, so it is 8%
      of the federal credit. It needs a child under twelve and it is fully
      refundable. 35 ILCS 5/244.
    */
    child: {
      groups: [
        {
          bands: ['under4', 'fourToFive', 'six', 'sevenToEleven'],
          percentOfStateEitc: 40,
          perReturn: true,
        },
      ],
    },
  },
  IN: {
    earnedIncome: { kind: 'percent-of-federal', percent: 10, childrenOnly: true },
  },
  KS: {
    earnedIncome: { kind: 'percent-of-federal', percent: 17 },
  },
  LA: {
    earnedIncome: { kind: 'percent-of-federal', percent: 5 },
  },
  MA: {
    earnedIncome: { kind: 'percent-of-federal', percent: 40 },
    /*
      The Massachusetts child and family tax credit is $440 for each eligible
      individual, which is a dependent child under thirteen, a dependent or a
      spouse with a disability, or a dependent of 65 or older. It is
      refundable and there is no income limit.
      Massachusetts DOR, Child and Family Tax Credit.
    */
    child: {
      groups: [
        {
          bands: [
            'under4',
            'fourToFive',
            'six',
            'sevenToEleven',
            'twelve',
          ],
          perChild: 440,
        },
      ],
    },
  },
  MD: {
    earnedIncome: { kind: 'percent-of-federal', percent: 45, percentWithoutChildren: 100 },
    /*
      The Maryland child tax credit is $500 for a qualified child, which is a
      dependent under six, or a dependent over five and under seventeen with a
      disability. The full amount is paid at a federal AGI of $15,000 or
      less, the credit is reduced by $50 for each $1,000 above that and it is
      zero above $24,000. The thresholds are the same for every filing status.
      Maryland Form 502CR instructions, revision 10/25.
    */
    child: {
      groups: [{ bands: ['under4', 'fourToFive'], perChild: 500 }],
      phaseOut: {
        single: { from: 15000, perThousand: 50, upTo: 24000 },
        headOfHousehold: { from: 15000, perThousand: 50, upTo: 24000 },
        married: { from: 15000, perThousand: 50, upTo: 24000 },
      },
    },
  },
  ME: {
    earnedIncome: { kind: 'percent-of-federal', percent: 25, percentWithoutChildren: 50 },
    /*
      The Maine dependent exemption tax credit changed for tax year 2026: it
      is paid for each dependent the taxpayer could claim a federal personal
      exemption for, so there is no age limit, and a child who has not
      attained six before the end of the year counts twice. The credit is
      refundable and it falls away at $20 for each $500 of Maine AGI above
      $100,000 for a single filer, $125,000 for a head of household and
      $150,000 for a couple.
      36 MRS 5219-SS, subsection 1-A for tax years 2026 and later.
    */
    child: {
      groups: [
        { bands: ['under4', 'fourToFive'], perChild: 620 },
        {
          bands: ['six', 'sevenToEleven', 'twelve', 'thirteenToSixteen', 'seventeen'],
          perChild: 310,
        },
      ],
      phaseOut: {
        single: { from: 100000, per500: 20 },
        headOfHousehold: { from: 125000, per500: 20 },
        married: { from: 150000, per500: 20 },
      },
    },
  },
  MI: {
    earnedIncome: { kind: 'percent-of-federal', percent: 30 },
  },
  MN: {
    /*
      Minnesota's Working Family Credit is 4% of the first $9,690 of earned
      income, up to a maximum of $388. It is not a share of the federal
      credit. The credit for older children and the child tax credit are
      separate and are not modelled here.
      Minnesota DOR, 2026 Schedule M1CWFC, final draft 1 October 2026.
    */
    earnedIncome: {
      kind: 'earned-income-share',
      percent: 4,
      earnedIncomeBase: 9690,
      maxCredit: 388,
    },
    /*
      The Minnesota child tax credit is $1,800 for a qualifying child under
      eighteen. The child credit and the Working Family Credit are added
      together and the sum falls away at 12% of the income above $32,680 for
      an unmarried filer and $38,770 for a couple, so the phase-out is on
      the two credits together and not on either of them.
      Minnesota DOR, child and Working Family Credit flyer, August 2026.
    */
    child: {
      groups: [
        {
          bands: [
            'under4',
            'fourToFive',
            'six',
            'sevenToEleven',
            'twelve',
            'thirteenToSixteen',
            'seventeen',
          ],
          perChild: 1800,
        },
      ],
    },
    jointPhaseOut: {
      from: 32680,
      marriedFrom: 38770,
      shareOfExcessIncome: 0.12,
    },
  },
  MO: {
    earnedIncome: { kind: 'percent-of-federal', percent: 20 },
  },
  MT: {
    earnedIncome: { kind: 'percent-of-federal', percent: 20 },
  },
  NE: {
    earnedIncome: { kind: 'percent-of-federal', percent: 10 },
  },
  NJ: {
    earnedIncome: { kind: 'percent-of-federal', percent: 40 },
    /*
      The New Jersey child tax credit is $1,250 for a child who has not
      attained age six, and the amount falls with the income: $1,250 at
      $30,000 or less, $1,000 up to $40,000, $750 up to $50,000, $500 up to
      $60,000 and $250 up to $80,000. The same limits apply to every filing
      status. P.L. 2026 c.26, enacted 30 June 2026.
    */
    child: {
      groups: [{ bands: ['under4', 'fourToFive'] }],
      tiers: {
        all: [
          { upTo: 30000, perChild: 1250 },
          { upTo: 40000, perChild: 1000 },
          { upTo: 50000, perChild: 750 },
          { upTo: 60000, perChild: 500 },
          { upTo: 80000, perChild: 250 },
        ],
      },
    },
  },
  NM: {
    earnedIncome: { kind: 'percent-of-federal', percent: 25 },
    /*
      The New Mexico child income tax credit depends on the adjusted gross
      income: $637 for a child up to $25,000 of income, then $424, $212,
      $106, $79, $53 and $26. The amount for a child under six is double the
      amount for an older child. New Mexico Taxation and Revenue Department.
    */
    child: {
      groups: [
        { bands: ['under4', 'fourToFive'], tierMultiplier: 2 },
        {
          bands: ['six', 'sevenToEleven', 'twelve', 'thirteenToSixteen', 'seventeen'],
          tierMultiplier: 1,
        },
      ],
      tiers: {
        all: [
          { upTo: 25000, perChild: 637 },
          { upTo: 50000, perChild: 424 },
          { upTo: 75000, perChild: 212 },
          { upTo: 100000, perChild: 106 },
          { upTo: 200000, perChild: 79 },
          { upTo: 350000, perChild: 53 },
          { upTo: null, perChild: 26 },
        ],
      },
    },
  },
  NY: {
    earnedIncome: { kind: 'percent-of-federal', percent: 30 },
    /*
      The Empire State child credit is $1,000 for a qualifying child under
      four and $500 for a child from four to sixteen, for tax years 2026 and
      2027. It falls away at $16.50 for each $1,000 of federal AGI above
      $75,000 for a single filer or a head of household and $110,000 for a
      couple. A3009 (2025).
    */
    child: {
      groups: [
        { bands: ['under4'], perChild: 1000 },
        {
          bands: ['fourToFive', 'six', 'sevenToEleven', 'twelve', 'thirteenToSixteen'],
          perChild: 500,
        },
      ],
      phaseOut: {
        single: { from: 75000, perThousand: 16.5 },
        headOfHousehold: { from: 75000, perThousand: 16.5 },
        married: { from: 110000, perThousand: 16.5 },
      },
    },
  },
  OH: {
    earnedIncome: { kind: 'percent-of-federal', percent: 30 },
  },
  OK: {
    earnedIncome: { kind: 'percent-of-federal', percent: 5 },
    /*
      The Oklahoma credit is the greater of 20% of the federal child and
      dependent care credit or 5% of the federal child tax credit, so 5% of
      $2,200 for each qualifying child under seventeen. It is allowed only
      where the federal AGI is $100,000 or less and it is not refundable.
      26 Okl. Stat. tit. 68, sec. 2355(B)(2).
    */
    child: {
      groups: [
        {
          bands: [
            'under4',
            'fourToFive',
            'six',
            'sevenToEleven',
            'twelve',
            'thirteenToSixteen',
          ],
          percentOfFederalCtc: 5,
        },
      ],
      maxIncomeSingle: 100000,
      maxIncomeMarried: 100000,
      nonRefundable: true,
    },
  },
  OR: {
    earnedIncome: {
      kind: 'percent-of-federal',
      percent: 14,
      percentWithYoungChild: 17,
    },
    /*
      The Oregon kids credit is $1,050 for a qualifying dependent of five or
      younger, for up to five dependents. The full amount is paid at an
      Oregon qualifying income of $27,250 or less and the credit is gone at
      $32,250. Oregon Form OR-40-FY instructions for tax year 2026.
    */
    child: {
      groups: [{ bands: ['under4', 'fourToFive'], perChild: 1050, maxChildren: 5 }],
      phaseOut: {
        single: { from: 27250, perThousand: 210, upTo: 32250 },
        headOfHousehold: { from: 27250, perThousand: 210, upTo: 32250 },
        married: { from: 27250, perThousand: 210, upTo: 32250 },
      },
    },
  },
  PA: {
    earnedIncome: { kind: 'percent-of-federal', percent: 10 },
  },
  RI: {
    earnedIncome: { kind: 'percent-of-federal', percent: 16 },
  },
  SC: {
    earnedIncome: { kind: 'percent-of-federal', percent: 125, cap: 200 },
  },
  UT: {
    earnedIncome: { kind: 'percent-of-federal', percent: 20 },
    /*
      The Utah child tax credit is $1,000 for a qualifying child under six
      and it is reduced by $0.10 for each dollar of modified AGI above
      $49,000 for a single filer or a head of household and $61,000 for a
      couple. H.B. 290, 2026 General Session.
    */
    child: {
      groups: [{ bands: ['under4', 'fourToFive'], perChild: 1000 }],
      phaseOut: {
        single: { from: 49000, perThousand: 100 },
        headOfHousehold: { from: 49000, perThousand: 100 },
        married: { from: 61000, perThousand: 100 },
      },
      nonRefundable: true,
    },
  },
  VA: {
    earnedIncome: { kind: 'percent-of-federal', percent: 20 },
  },
  VT: {
    earnedIncome: { kind: 'percent-of-federal', percent: 38, percentWithoutChildren: 100 },
    /*
      The Vermont child credit is $1,000 for an eligible child who is six or
      younger at the close of the tax year. It is fully refundable and it
      falls away at $20 for each $1,000 of AGI above $125,000, so it is gone
      at $175,000. Act 71 of 2025.
    */
    child: {
      groups: [{ bands: ['under4', 'fourToFive', 'six'], perChild: 1000 }],
      phaseOut: {
        single: { from: 125000, perThousand: 20, upTo: 175000 },
        headOfHousehold: { from: 125000, perThousand: 20, upTo: 175000 },
        married: { from: 125000, perThousand: 20, upTo: 175000 },
      },
    },
  },
  WI: {
    /*
      The Wisconsin credit is 4% of the federal credit for one qualifying
      child, 11% for two and 34% for three or more. There is no credit for a
      filer without a qualifying child.
      Wisconsin Department of Revenue, Wisconsin EITC FAQ.
    */
    earnedIncome: {
      kind: 'percent-by-children',
      percentByChildren: [4, 11, 34],
    },
  },
};
