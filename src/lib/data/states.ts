/**
 * The state figures behind the two calculators that need one.
 *
 * Everything in this file is a published constant with a date attached, not a
 * moving target: a tax year is part of the answer, so a reader has to be able
 * to see which year the figures belong to, and a figure that is two years old
 * has to be replaced on purpose rather than by accident.
 *
 * Where the numbers come from:
 *
 *   income tax brackets, single filers, as of 28 April 2026
 *     Tax Foundation, "Facts & Figures 2026", table 11
 *     https://taxfoundation.org/wp-content/uploads/2026/05/2026_F_26F26F_ALL_Tables_Master_LAYOUT_post_release_updates_4.30.26_v3.xlsx
 *
 *   income tax brackets for married filing jointly, the standard deduction
 *   and the personal exemption, February 2026
 *     Tax Foundation, "State Individual Income Tax Rates and Brackets, 2026"
 *     https://taxfoundation.org/wp-content/uploads/2026/02/2026-State-Individual-Income-Tax-Rates-Brackets.xlsx
 *
 *   property tax
 *     Tax Foundation, "Property Taxes by State and County, 2026", built on
 *     the American Community Survey 2024 five-year estimate, read 25
 *     October 2026
 *     https://taxfoundation.org/data/all/state/property-taxes-by-state-county/
 *
 * The two income tax tables disagree for five states, and the April table is
 * the one that carries the rates enacted for 2026 that take effect during the
 * year: Maine, Oklahoma, South Carolina, Utah and West Virginia. For those
 * five the joint filing brackets are the February brackets, widened the way
 * the source says the state widens them, with the April rates.
 *
 * What the brackets are and are not:
 *
 *   - They are the marginal brackets, so the tax is what the brackets add up
 *     to: each slice of income is taxed at the rate of the slice it falls in.
 *   - Head of household is read from the single-filer table, because the
 *     source publishes the single and the married-filing-jointly tables and
 *     no third one.
 *   - A state that levies no tax on wages has no brackets at all. Washington
 *     taxes capital gains only, which is a different tax from the one these
 *     calculators model, so its wage rate is zero.
 *
 * The amounts that come off the tax rather than off the income are marked as
 * such, because that is the difference between them: a state that gives a
 * personal exemption as a credit takes it off the tax, and a state that gives
 * it as an exclusion takes it off the income before the brackets are applied.
 * The source marks the difference in the cell, and the cell is what is here.
 *
 * The property tax rate is the average effective rate for the state: the tax
 * actually paid as a share of the value of the home. It is a state figure,
 * not a county or city figure, and the rate in a particular locality is
 * usually different from it.
 */

export interface StateBracket {
  /** The rate in percent. */
  readonly rate: number;
  /** The taxable income at which this rate starts. */
  readonly from: number;
}

export interface StateAmount {
  /** The amount in dollars. */
  readonly amount: number;
  /**
   * Whether the amount comes off the income before the brackets are applied
   * or off the tax after they have been.
   */
  readonly kind: 'exclusion' | 'credit';
}

export interface StateIncomeTax {
  /** The brackets for a single filer. Empty where wages are not taxed. */
  readonly single: readonly StateBracket[];
  /** The brackets for married filing jointly. */
  readonly married: readonly StateBracket[];
  /** True where the state levies no tax on wages at all. */
  readonly noIncomeTax?: boolean;
  /** True where the state taxes capital gains but not wages. */
  readonly capitalGainsOnly?: boolean;
  /** The standard deduction, for the states that have one. */
  readonly standardDeduction?: {
    readonly single: StateAmount;
    readonly married: StateAmount;
  };
  /** The credit some states give in place of a standard deduction. */
  readonly standardDeductionCredit?: {
    readonly single: StateAmount;
    readonly married: StateAmount;
  };
  /**
   * The personal exemption. The three amounts are the exemption for a single
   * filer, the exemption for a couple, and the amount for each dependent.
   */
  readonly exemption?: {
    readonly single?: StateAmount;
    readonly married?: StateAmount;
    readonly dependent?: StateAmount;
  };
}

export interface State {
  /** The two-letter code the edge reports. */
  readonly code: string;
  /** The name of the state. */
  readonly name: string;
  /** The income tax figures for 2026. */
  readonly incomeTax: StateIncomeTax;
  /**
   * The average effective property tax rate for the state, as a percentage of
   * the value of the home.
   */
  readonly propertyTaxRate: number;
}

/** Every state, with the District of Columbia. */
export const STATES: Record<string, State> = {
  AL: {
    code: 'AL',
    name: 'Alabama',
    incomeTax: {
      single: [
        { rate: 2, from: 0 },
        { rate: 4, from: 500 },
        { rate: 5, from: 3000 },
      ],
      married: [
        { rate: 2, from: 0 },
        { rate: 4, from: 1000 },
        { rate: 5, from: 6000 },
      ],
      standardDeduction: {
        single: { amount: 3000, kind: 'exclusion' },
        married: { amount: 8500, kind: 'exclusion' },
      },
      exemption: {
        single: { amount: 1500, kind: 'exclusion' },
        married: { amount: 3000, kind: 'exclusion' },
        dependent: { amount: 1000, kind: 'exclusion' },
      },
    },
    propertyTaxRate: 0.37,
  },
  AK: {
    code: 'AK',
    name: 'Alaska',
    incomeTax: {
      single: [],
      married: [],
      noIncomeTax: true,
    },
    propertyTaxRate: 0.94,
  },
  AZ: {
    code: 'AZ',
    name: 'Arizona',
    incomeTax: {
      single: [
        { rate: 2.5, from: 0 },
      ],
      married: [
        { rate: 2.5, from: 0 },
      ],
      standardDeduction: {
        single: { amount: 8350, kind: 'exclusion' },
        married: { amount: 16700, kind: 'exclusion' },
      },
      exemption: {
        dependent: { amount: 100, kind: 'credit' },
      },
    },
    propertyTaxRate: 0.48,
  },
  AR: {
    code: 'AR',
    name: 'Arkansas',
    incomeTax: {
      single: [
        { rate: 2, from: 0 },
        { rate: 3.9, from: 4600 },
      ],
      married: [
        { rate: 2, from: 0 },
        { rate: 3.9, from: 4600 },
      ],
      standardDeduction: {
        single: { amount: 2470, kind: 'exclusion' },
        married: { amount: 4940, kind: 'exclusion' },
      },
      exemption: {
        single: { amount: 29, kind: 'credit' },
        married: { amount: 58, kind: 'credit' },
        dependent: { amount: 29, kind: 'credit' },
      },
    },
    propertyTaxRate: 0.56,
  },
  CA: {
    code: 'CA',
    name: 'California',
    incomeTax: {
      single: [
        { rate: 1, from: 0 },
        { rate: 2, from: 11079 },
        { rate: 4, from: 26264 },
        { rate: 6, from: 41452 },
        { rate: 8, from: 57542 },
        { rate: 9.3, from: 72724 },
        { rate: 10.3, from: 371479 },
        { rate: 11.3, from: 445771 },
        { rate: 12.3, from: 742953 },
        { rate: 13.3, from: 1000000 },
      ],
      married: [
        { rate: 1, from: 0 },
        { rate: 2, from: 22158 },
        { rate: 4, from: 52528 },
        { rate: 6, from: 82904 },
        { rate: 8, from: 115084 },
        { rate: 9.3, from: 145448 },
        { rate: 10.3, from: 742958 },
        { rate: 11.3, from: 891542 },
        { rate: 12.3, from: 1000000 },
        { rate: 13.3, from: 1485906 },
      ],
      standardDeduction: {
        single: { amount: 5540, kind: 'exclusion' },
        married: { amount: 11080, kind: 'exclusion' },
      },
      exemption: {
        single: { amount: 153, kind: 'credit' },
        married: { amount: 306, kind: 'credit' },
        dependent: { amount: 153, kind: 'credit' },
      },
    },
    propertyTaxRate: 0.7,
  },
  CO: {
    code: 'CO',
    name: 'Colorado',
    incomeTax: {
      single: [
        { rate: 4.4, from: 0 },
      ],
      married: [
        { rate: 4.4, from: 0 },
      ],
      standardDeduction: {
        single: { amount: 16100, kind: 'exclusion' },
        married: { amount: 32200, kind: 'exclusion' },
      },
    },
    propertyTaxRate: 0.5,
  },
  CT: {
    code: 'CT',
    name: 'Connecticut',
    incomeTax: {
      single: [
        { rate: 2, from: 0 },
        { rate: 4.5, from: 10000 },
        { rate: 5.5, from: 50000 },
        { rate: 6, from: 100000 },
        { rate: 6.5, from: 200000 },
        { rate: 6.9, from: 250000 },
        { rate: 6.99, from: 500000 },
      ],
      married: [
        { rate: 2, from: 0 },
        { rate: 4.5, from: 20000 },
        { rate: 5.5, from: 100000 },
        { rate: 6, from: 200000 },
        { rate: 6.5, from: 400000 },
        { rate: 6.9, from: 500000 },
        { rate: 6.99, from: 1000000 },
      ],
      exemption: {
        single: { amount: 15000, kind: 'exclusion' },
        married: { amount: 24000, kind: 'exclusion' },
      },
    },
    propertyTaxRate: 1.54,
  },
  DE: {
    code: 'DE',
    name: 'Delaware',
    incomeTax: {
      single: [
        { rate: 2.2, from: 2000 },
        { rate: 3.9, from: 5000 },
        { rate: 4.8, from: 10000 },
        { rate: 5.2, from: 20000 },
        { rate: 5.55, from: 25000 },
        { rate: 6.6, from: 60000 },
      ],
      married: [
        { rate: 2.2, from: 2000 },
        { rate: 3.9, from: 5000 },
        { rate: 4.8, from: 10000 },
        { rate: 5.2, from: 20000 },
        { rate: 5.55, from: 25000 },
        { rate: 6.6, from: 60000 },
      ],
      standardDeduction: {
        single: { amount: 3250, kind: 'exclusion' },
        married: { amount: 6500, kind: 'exclusion' },
      },
      exemption: {
        single: { amount: 110, kind: 'credit' },
        married: { amount: 220, kind: 'credit' },
        dependent: { amount: 110, kind: 'credit' },
      },
    },
    propertyTaxRate: 0.54,
  },
  FL: {
    code: 'FL',
    name: 'Florida',
    incomeTax: {
      single: [],
      married: [],
      noIncomeTax: true,
    },
    propertyTaxRate: 0.78,
  },
  GA: {
    code: 'GA',
    name: 'Georgia',
    incomeTax: {
      single: [
        { rate: 5.19, from: 0 },
      ],
      married: [
        { rate: 5.19, from: 0 },
      ],
      standardDeduction: {
        single: { amount: 12000, kind: 'exclusion' },
        married: { amount: 24000, kind: 'exclusion' },
      },
      exemption: {
        dependent: { amount: 4000, kind: 'exclusion' },
      },
    },
    propertyTaxRate: 0.79,
  },
  HI: {
    code: 'HI',
    name: 'Hawaii',
    incomeTax: {
      single: [
        { rate: 1.4, from: 0 },
        { rate: 3.2, from: 9600 },
        { rate: 5.5, from: 14400 },
        { rate: 6.4, from: 19200 },
        { rate: 6.8, from: 24000 },
        { rate: 7.2, from: 36000 },
        { rate: 7.6, from: 48000 },
        { rate: 7.9, from: 125000 },
        { rate: 8.25, from: 175000 },
        { rate: 9, from: 225000 },
        { rate: 10, from: 275000 },
        { rate: 11, from: 325000 },
      ],
      married: [
        { rate: 1.4, from: 0 },
        { rate: 3.2, from: 19200 },
        { rate: 5.5, from: 28800 },
        { rate: 6.4, from: 38400 },
        { rate: 6.8, from: 48000 },
        { rate: 7.2, from: 72000 },
        { rate: 7.6, from: 96000 },
        { rate: 7.9, from: 250000 },
        { rate: 8.25, from: 350000 },
        { rate: 9, from: 450000 },
        { rate: 10, from: 550000 },
        { rate: 11, from: 650000 },
      ],
      standardDeduction: {
        single: { amount: 4400, kind: 'exclusion' },
        married: { amount: 8800, kind: 'exclusion' },
      },
      exemption: {
        single: { amount: 1144, kind: 'exclusion' },
        married: { amount: 2288, kind: 'exclusion' },
        dependent: { amount: 1144, kind: 'exclusion' },
      },
    },
    propertyTaxRate: 0.29,
  },
  ID: {
    code: 'ID',
    name: 'Idaho',
    incomeTax: {
      single: [
        { rate: 5.3, from: 4811 },
      ],
      married: [
        { rate: 5.3, from: 9622 },
      ],
      standardDeduction: {
        single: { amount: 16100, kind: 'exclusion' },
        married: { amount: 32200, kind: 'exclusion' },
      },
    },
    propertyTaxRate: 0.5,
  },
  IL: {
    code: 'IL',
    name: 'Illinois',
    incomeTax: {
      single: [
        { rate: 4.95, from: 0 },
      ],
      married: [
        { rate: 4.95, from: 0 },
      ],
      exemption: {
        single: { amount: 2925, kind: 'exclusion' },
        married: { amount: 5850, kind: 'exclusion' },
        dependent: { amount: 2925, kind: 'exclusion' },
      },
    },
    propertyTaxRate: 1.88,
  },
  IN: {
    code: 'IN',
    name: 'Indiana',
    incomeTax: {
      single: [
        { rate: 2.95, from: 0 },
      ],
      married: [
        { rate: 2.95, from: 0 },
      ],
      exemption: {
        single: { amount: 1000, kind: 'exclusion' },
        married: { amount: 2000, kind: 'exclusion' },
        dependent: { amount: 1000, kind: 'exclusion' },
      },
    },
    propertyTaxRate: 0.76,
  },
  IA: {
    code: 'IA',
    name: 'Iowa',
    incomeTax: {
      single: [
        { rate: 3.8, from: 0 },
      ],
      married: [
        { rate: 3.8, from: 0 },
      ],
      standardDeduction: {
        single: { amount: 16100, kind: 'exclusion' },
        married: { amount: 32200, kind: 'exclusion' },
      },
      exemption: {
        single: { amount: 40, kind: 'credit' },
        married: { amount: 80, kind: 'credit' },
        dependent: { amount: 40, kind: 'credit' },
      },
    },
    propertyTaxRate: 1.33,
  },
  KS: {
    code: 'KS',
    name: 'Kansas',
    incomeTax: {
      single: [
        { rate: 5.2, from: 0 },
        { rate: 5.58, from: 23000 },
      ],
      married: [
        { rate: 5.2, from: 0 },
        { rate: 5.58, from: 46000 },
      ],
      standardDeduction: {
        single: { amount: 3605, kind: 'exclusion' },
        married: { amount: 8240, kind: 'exclusion' },
      },
      exemption: {
        single: { amount: 9160, kind: 'exclusion' },
        married: { amount: 18320, kind: 'exclusion' },
        dependent: { amount: 2320, kind: 'exclusion' },
      },
    },
    propertyTaxRate: 1.21,
  },
  KY: {
    code: 'KY',
    name: 'Kentucky',
    incomeTax: {
      single: [
        { rate: 3.5, from: 0 },
      ],
      married: [
        { rate: 3.5, from: 0 },
      ],
      standardDeduction: {
        single: { amount: 3360, kind: 'exclusion' },
        married: { amount: 3360, kind: 'exclusion' },
      },
    },
    propertyTaxRate: 0.74,
  },
  LA: {
    code: 'LA',
    name: 'Louisiana',
    incomeTax: {
      single: [
        { rate: 3, from: 0 },
      ],
      married: [
        { rate: 3, from: 0 },
      ],
      standardDeduction: {
        single: { amount: 12875, kind: 'exclusion' },
        married: { amount: 25750, kind: 'exclusion' },
      },
    },
    propertyTaxRate: 0.55,
  },
  ME: {
    code: 'ME',
    name: 'Maine',
    incomeTax: {
      single: [
        { rate: 5.8, from: 0 },
        { rate: 6.75, from: 27399 },
        { rate: 7.15, from: 64849 },
        { rate: 9.15, from: 1000000 },
      ],
      married: [
        { rate: 5.8, from: 0 },
        { rate: 6.75, from: 54849 },
        { rate: 7.15, from: 129749 },
        { rate: 9.15, from: 2000000 },
      ],
      standardDeduction: {
        single: { amount: 8350, kind: 'exclusion' },
        married: { amount: 16700, kind: 'exclusion' },
      },
      exemption: {
        single: { amount: 5300, kind: 'exclusion' },
        married: { amount: 10600, kind: 'exclusion' },
        dependent: { amount: 305, kind: 'credit' },
      },
    },
    propertyTaxRate: 0.98,
  },
  MD: {
    code: 'MD',
    name: 'Maryland',
    incomeTax: {
      single: [
        { rate: 2, from: 0 },
        { rate: 3, from: 1000 },
        { rate: 4, from: 2000 },
        { rate: 4.75, from: 3000 },
        { rate: 5, from: 100000 },
        { rate: 5.25, from: 125000 },
        { rate: 5.5, from: 150000 },
        { rate: 5.75, from: 250000 },
        { rate: 6.25, from: 500000 },
        { rate: 6.5, from: 1000000 },
      ],
      married: [
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
      standardDeduction: {
        single: { amount: 3350, kind: 'exclusion' },
        married: { amount: 6700, kind: 'exclusion' },
      },
      exemption: {
        single: { amount: 3200, kind: 'exclusion' },
        married: { amount: 6400, kind: 'exclusion' },
        dependent: { amount: 3200, kind: 'exclusion' },
      },
    },
    propertyTaxRate: 0.92,
  },
  MA: {
    code: 'MA',
    name: 'Massachusetts',
    incomeTax: {
      single: [
        { rate: 5, from: 0 },
        { rate: 9, from: 1083150 },
      ],
      married: [
        { rate: 5, from: 0 },
        { rate: 9, from: 1083150 },
      ],
      exemption: {
        single: { amount: 4400, kind: 'exclusion' },
        married: { amount: 8800, kind: 'exclusion' },
        dependent: { amount: 1000, kind: 'exclusion' },
      },
    },
    propertyTaxRate: 1.0,
  },
  MI: {
    code: 'MI',
    name: 'Michigan',
    incomeTax: {
      single: [
        { rate: 4.25, from: 0 },
      ],
      married: [
        { rate: 4.25, from: 0 },
      ],
      exemption: {
        single: { amount: 5900, kind: 'exclusion' },
        married: { amount: 11800, kind: 'exclusion' },
        dependent: { amount: 5900, kind: 'exclusion' },
      },
    },
    propertyTaxRate: 1.19,
  },
  MN: {
    code: 'MN',
    name: 'Minnesota',
    incomeTax: {
      single: [
        { rate: 5.35, from: 0 },
        { rate: 6.8, from: 33310 },
        { rate: 7.85, from: 109430 },
        { rate: 9.85, from: 203150 },
      ],
      married: [
        { rate: 5.35, from: 0 },
        { rate: 6.8, from: 48700 },
        { rate: 7.85, from: 193480 },
        { rate: 9.85, from: 337930 },
      ],
      standardDeduction: {
        single: { amount: 15300, kind: 'exclusion' },
        married: { amount: 30600, kind: 'exclusion' },
      },
      exemption: {
        dependent: { amount: 5300, kind: 'exclusion' },
      },
    },
    propertyTaxRate: 1.0,
  },
  MS: {
    code: 'MS',
    name: 'Mississippi',
    incomeTax: {
      single: [
        { rate: 4, from: 10000 },
      ],
      married: [
        { rate: 4, from: 10000 },
      ],
      standardDeduction: {
        single: { amount: 2300, kind: 'exclusion' },
        married: { amount: 4600, kind: 'exclusion' },
      },
      exemption: {
        single: { amount: 6000, kind: 'exclusion' },
        married: { amount: 12000, kind: 'exclusion' },
        dependent: { amount: 1500, kind: 'exclusion' },
      },
    },
    propertyTaxRate: 0.58,
  },
  MO: {
    code: 'MO',
    name: 'Missouri',
    incomeTax: {
      single: [
        { rate: 2, from: 1348 },
        { rate: 2.5, from: 2696 },
        { rate: 3, from: 4044 },
        { rate: 3.5, from: 5392 },
        { rate: 4, from: 6740 },
        { rate: 4.5, from: 8088 },
        { rate: 4.7, from: 9436 },
      ],
      married: [
        { rate: 2, from: 1348 },
        { rate: 2.5, from: 2696 },
        { rate: 3, from: 4044 },
        { rate: 3.5, from: 5392 },
        { rate: 4, from: 6740 },
        { rate: 4.5, from: 8088 },
        { rate: 4.7, from: 9436 },
      ],
      standardDeduction: {
        single: { amount: 16100, kind: 'exclusion' },
        married: { amount: 32200, kind: 'exclusion' },
      },
    },
    propertyTaxRate: 0.89,
  },
  MT: {
    code: 'MT',
    name: 'Montana',
    incomeTax: {
      single: [
        { rate: 4.7, from: 0 },
        { rate: 5.65, from: 47500 },
      ],
      married: [
        { rate: 4.7, from: 0 },
        { rate: 5.65, from: 95000 },
      ],
      standardDeduction: {
        single: { amount: 16100, kind: 'exclusion' },
        married: { amount: 32200, kind: 'exclusion' },
      },
    },
    propertyTaxRate: 0.61,
  },
  NE: {
    code: 'NE',
    name: 'Nebraska',
    incomeTax: {
      single: [
        { rate: 2.46, from: 0 },
        { rate: 3.51, from: 4130 },
        { rate: 4.55, from: 24760 },
      ],
      married: [
        { rate: 2.46, from: 0 },
        { rate: 3.51, from: 8250 },
        { rate: 4.55, from: 49530 },
      ],
      standardDeduction: {
        single: { amount: 8850, kind: 'exclusion' },
        married: { amount: 17700, kind: 'exclusion' },
      },
      exemption: {
        single: { amount: 176, kind: 'credit' },
        married: { amount: 352, kind: 'credit' },
        dependent: { amount: 176, kind: 'credit' },
      },
    },
    propertyTaxRate: 1.44,
  },
  NV: {
    code: 'NV',
    name: 'Nevada',
    incomeTax: {
      single: [],
      married: [],
      noIncomeTax: true,
    },
    propertyTaxRate: 0.5,
  },
  NH: {
    code: 'NH',
    name: 'New Hampshire',
    incomeTax: {
      single: [],
      married: [],
      noIncomeTax: true,
    },
    propertyTaxRate: 1.5,
  },
  NJ: {
    code: 'NJ',
    name: 'New Jersey',
    incomeTax: {
      single: [
        { rate: 1.4, from: 0 },
        { rate: 1.75, from: 20000 },
        { rate: 3.5, from: 35000 },
        { rate: 5.525, from: 40000 },
        { rate: 6.37, from: 75000 },
        { rate: 8.97, from: 500000 },
        { rate: 10.75, from: 1000000 },
      ],
      married: [
        { rate: 1.4, from: 0 },
        { rate: 1.75, from: 20000 },
        { rate: 2.45, from: 50000 },
        { rate: 3.5, from: 70000 },
        { rate: 5.525, from: 80000 },
        { rate: 6.37, from: 150000 },
        { rate: 8.97, from: 500000 },
        { rate: 10.75, from: 1000000 },
      ],
      exemption: {
        single: { amount: 1000, kind: 'exclusion' },
        married: { amount: 2000, kind: 'exclusion' },
        dependent: { amount: 1500, kind: 'exclusion' },
      },
    },
    propertyTaxRate: 1.88,
  },
  NM: {
    code: 'NM',
    name: 'New Mexico',
    incomeTax: {
      single: [
        { rate: 1.5, from: 0 },
        { rate: 3.2, from: 5500 },
        { rate: 4.3, from: 16500 },
        { rate: 4.7, from: 33500 },
        { rate: 4.9, from: 66500 },
        { rate: 5.9, from: 210000 },
      ],
      married: [
        { rate: 1.5, from: 0 },
        { rate: 3.2, from: 8000 },
        { rate: 4.3, from: 25000 },
        { rate: 4.7, from: 50000 },
        { rate: 4.9, from: 100000 },
        { rate: 5.9, from: 315000 },
      ],
      standardDeduction: {
        single: { amount: 16100, kind: 'exclusion' },
        married: { amount: 32200, kind: 'exclusion' },
      },
      exemption: {
        dependent: { amount: 4000, kind: 'exclusion' },
      },
    },
    propertyTaxRate: 0.63,
  },
  NY: {
    code: 'NY',
    name: 'New York',
    incomeTax: {
      single: [
        { rate: 3.9, from: 0 },
        { rate: 4.4, from: 8500 },
        { rate: 5.15, from: 11700 },
        { rate: 5.4, from: 13900 },
        { rate: 5.9, from: 80650 },
        { rate: 6.85, from: 215400 },
        { rate: 9.65, from: 1077550 },
        { rate: 10.3, from: 5000000 },
        { rate: 10.9, from: 25000000 },
      ],
      married: [
        { rate: 3.9, from: 0 },
        { rate: 4.4, from: 17150 },
        { rate: 5.15, from: 23600 },
        { rate: 5.4, from: 27900 },
        { rate: 5.9, from: 161550 },
        { rate: 6.85, from: 323200 },
        { rate: 9.65, from: 2155350 },
        { rate: 10.3, from: 5000000 },
        { rate: 10.9, from: 25000000 },
      ],
      standardDeduction: {
        single: { amount: 8000, kind: 'exclusion' },
        married: { amount: 16050, kind: 'exclusion' },
      },
      exemption: {
        dependent: { amount: 1000, kind: 'exclusion' },
      },
    },
    propertyTaxRate: 1.3,
  },
  NC: {
    code: 'NC',
    name: 'North Carolina',
    incomeTax: {
      single: [
        { rate: 3.99, from: 0 },
      ],
      married: [
        { rate: 3.99, from: 0 },
      ],
      standardDeduction: {
        single: { amount: 12750, kind: 'exclusion' },
        married: { amount: 25500, kind: 'exclusion' },
      },
    },
    propertyTaxRate: 0.66,
  },
  ND: {
    code: 'ND',
    name: 'North Dakota',
    incomeTax: {
      single: [
        { rate: 1.95, from: 48475 },
        { rate: 2.5, from: 244825 },
      ],
      married: [
        { rate: 1.95, from: 80975 },
        { rate: 2.5, from: 298075 },
      ],
      standardDeduction: {
        single: { amount: 16100, kind: 'exclusion' },
        married: { amount: 32200, kind: 'exclusion' },
      },
    },
    propertyTaxRate: 0.92,
  },
  OH: {
    code: 'OH',
    name: 'Ohio',
    incomeTax: {
      single: [
        { rate: 2.75, from: 26050 },
      ],
      married: [
        { rate: 2.75, from: 26050 },
      ],
      exemption: {
        single: { amount: 2400, kind: 'exclusion' },
        married: { amount: 4800, kind: 'exclusion' },
        dependent: { amount: 2400, kind: 'exclusion' },
      },
    },
    propertyTaxRate: 1.36,
  },
  OK: {
    code: 'OK',
    name: 'Oklahoma',
    incomeTax: {
      single: [
        { rate: 0, from: 0 },
        { rate: 2.5, from: 3750 },
        { rate: 3.5, from: 4900 },
        { rate: 4.5, from: 7200 },
      ],
      married: [
        { rate: 0, from: 0 },
        { rate: 2.5, from: 7500 },
        { rate: 3.5, from: 9800 },
        { rate: 4.5, from: 14400 },
      ],
      standardDeduction: {
        single: { amount: 6350, kind: 'exclusion' },
        married: { amount: 12700, kind: 'exclusion' },
      },
      exemption: {
        single: { amount: 1000, kind: 'exclusion' },
        married: { amount: 2000, kind: 'exclusion' },
        dependent: { amount: 1000, kind: 'exclusion' },
      },
    },
    propertyTaxRate: 0.79,
  },
  OR: {
    code: 'OR',
    name: 'Oregon',
    incomeTax: {
      single: [
        { rate: 4.75, from: 0 },
        { rate: 6.75, from: 4550 },
        { rate: 8.75, from: 11400 },
        { rate: 9.9, from: 125000 },
      ],
      married: [
        { rate: 4.75, from: 0 },
        { rate: 6.75, from: 9100 },
        { rate: 8.75, from: 22800 },
        { rate: 9.9, from: 250000 },
      ],
      standardDeduction: {
        single: { amount: 2910, kind: 'exclusion' },
        married: { amount: 5820, kind: 'exclusion' },
      },
      exemption: {
        single: { amount: 256, kind: 'credit' },
        married: { amount: 512, kind: 'credit' },
        dependent: { amount: 256, kind: 'credit' },
      },
    },
    propertyTaxRate: 0.81,
  },
  PA: {
    code: 'PA',
    name: 'Pennsylvania',
    incomeTax: {
      single: [
        { rate: 3.07, from: 0 },
      ],
      married: [
        { rate: 3.07, from: 0 },
      ],
    },
    propertyTaxRate: 1.26,
  },
  RI: {
    code: 'RI',
    name: 'Rhode Island',
    incomeTax: {
      single: [
        { rate: 3.75, from: 0 },
        { rate: 4.75, from: 82050 },
        { rate: 5.99, from: 186450 },
      ],
      married: [
        { rate: 3.75, from: 0 },
        { rate: 4.75, from: 82050 },
        { rate: 5.99, from: 186450 },
      ],
      standardDeduction: {
        single: { amount: 11200, kind: 'exclusion' },
        married: { amount: 22400, kind: 'exclusion' },
      },
      exemption: {
        single: { amount: 5250, kind: 'exclusion' },
        married: { amount: 10500, kind: 'exclusion' },
        dependent: { amount: 5250, kind: 'exclusion' },
      },
    },
    propertyTaxRate: 1.12,
  },
  SC: {
    code: 'SC',
    name: 'South Carolina',
    incomeTax: {
      single: [
        { rate: 1.99, from: 0 },
        { rate: 5.21, from: 29999 },
      ],
      married: [
        { rate: 1.99, from: 0 },
        { rate: 5.21, from: 29999 },
      ],
      standardDeduction: {
        single: { amount: 8350, kind: 'exclusion' },
        married: { amount: 16700, kind: 'exclusion' },
      },
      exemption: {
        dependent: { amount: 4930, kind: 'exclusion' },
      },
    },
    propertyTaxRate: 0.49,
  },
  SD: {
    code: 'SD',
    name: 'South Dakota',
    incomeTax: {
      single: [],
      married: [],
      noIncomeTax: true,
    },
    propertyTaxRate: 1.0,
  },
  TN: {
    code: 'TN',
    name: 'Tennessee',
    incomeTax: {
      single: [],
      married: [],
      noIncomeTax: true,
    },
    propertyTaxRate: 0.52,
  },
  TX: {
    code: 'TX',
    name: 'Texas',
    incomeTax: {
      single: [],
      married: [],
      noIncomeTax: true,
    },
    propertyTaxRate: 1.4,
  },
  UT: {
    code: 'UT',
    name: 'Utah',
    incomeTax: {
      single: [
        { rate: 4.45, from: 0 },
      ],
      married: [
        { rate: 4.45, from: 0 },
      ],
      standardDeductionCredit: {
        single: { amount: 966, kind: 'credit' },
        married: { amount: 1932, kind: 'credit' },
      },
      exemption: {
        dependent: { amount: 2111, kind: 'exclusion' },
      },
    },
    propertyTaxRate: 0.48,
  },
  VT: {
    code: 'VT',
    name: 'Vermont',
    incomeTax: {
      single: [
        { rate: 3.35, from: 0 },
        { rate: 6.6, from: 49400 },
        { rate: 7.6, from: 119700 },
        { rate: 8.75, from: 249700 },
      ],
      married: [
        { rate: 3.35, from: 0 },
        { rate: 6.6, from: 82500 },
        { rate: 7.6, from: 199450 },
        { rate: 8.75, from: 304000 },
      ],
      standardDeduction: {
        single: { amount: 7650, kind: 'exclusion' },
        married: { amount: 15300, kind: 'exclusion' },
      },
      exemption: {
        single: { amount: 5300, kind: 'exclusion' },
        married: { amount: 10600, kind: 'exclusion' },
        dependent: { amount: 5300, kind: 'exclusion' },
      },
    },
    propertyTaxRate: 1.51,
  },
  VA: {
    code: 'VA',
    name: 'Virginia',
    incomeTax: {
      single: [
        { rate: 2, from: 0 },
        { rate: 3, from: 3000 },
        { rate: 5, from: 5000 },
        { rate: 5.75, from: 17000 },
      ],
      married: [
        { rate: 2, from: 0 },
        { rate: 3, from: 3000 },
        { rate: 5, from: 5000 },
        { rate: 5.75, from: 17000 },
      ],
      standardDeduction: {
        single: { amount: 8750, kind: 'exclusion' },
        married: { amount: 17500, kind: 'exclusion' },
      },
      exemption: {
        single: { amount: 930, kind: 'exclusion' },
        married: { amount: 1860, kind: 'exclusion' },
        dependent: { amount: 930, kind: 'exclusion' },
      },
    },
    propertyTaxRate: 0.78,
  },
  WA: {
    code: 'WA',
    name: 'Washington',
    incomeTax: {
      single: [],
      married: [],
      capitalGainsOnly: true,
    },
    propertyTaxRate: 0.75,
  },
  WV: {
    code: 'WV',
    name: 'West Virginia',
    incomeTax: {
      single: [
        { rate: 2.11, from: 0 },
        { rate: 2.81, from: 10000 },
        { rate: 3.16, from: 25000 },
        { rate: 4.22, from: 40000 },
        { rate: 4.58, from: 60000 },
      ],
      married: [
        { rate: 2.11, from: 0 },
        { rate: 2.81, from: 10000 },
        { rate: 3.16, from: 25000 },
        { rate: 4.22, from: 40000 },
        { rate: 4.58, from: 60000 },
      ],
      exemption: {
        single: { amount: 2000, kind: 'exclusion' },
        married: { amount: 4000, kind: 'exclusion' },
        dependent: { amount: 2000, kind: 'exclusion' },
      },
    },
    propertyTaxRate: 0.51,
  },
  WI: {
    code: 'WI',
    name: 'Wisconsin',
    incomeTax: {
      single: [
        { rate: 3.5, from: 0 },
        { rate: 4.4, from: 15110 },
        { rate: 5.3, from: 51950 },
        { rate: 7.65, from: 332720 },
      ],
      married: [
        { rate: 3.5, from: 0 },
        { rate: 4.4, from: 20150 },
        { rate: 5.3, from: 69260 },
        { rate: 7.65, from: 443630 },
      ],
      standardDeduction: {
        single: { amount: 13960, kind: 'exclusion' },
        married: { amount: 25840, kind: 'exclusion' },
      },
      exemption: {
        single: { amount: 700, kind: 'exclusion' },
        married: { amount: 1400, kind: 'exclusion' },
        dependent: { amount: 700, kind: 'exclusion' },
      },
    },
    propertyTaxRate: 1.32,
  },
  WY: {
    code: 'WY',
    name: 'Wyoming',
    incomeTax: {
      single: [],
      married: [],
      noIncomeTax: true,
    },
    propertyTaxRate: 0.53,
  },
  DC: {
    code: 'DC',
    name: 'District of Columbia',
    incomeTax: {
      single: [
        { rate: 4, from: 0 },
        { rate: 6, from: 10000 },
        { rate: 6.5, from: 40000 },
        { rate: 8.5, from: 60000 },
        { rate: 9.25, from: 250000 },
        { rate: 9.75, from: 500000 },
        { rate: 10.75, from: 1000000 },
      ],
      married: [
        { rate: 4, from: 0 },
        { rate: 6, from: 10000 },
        { rate: 6.5, from: 40000 },
        { rate: 8.5, from: 60000 },
        { rate: 9.25, from: 250000 },
        { rate: 9.75, from: 500000 },
        { rate: 10.75, from: 1000000 },
      ],
      standardDeduction: {
        single: { amount: 16100, kind: 'exclusion' },
        married: { amount: 32200, kind: 'exclusion' },
      },
    },
    propertyTaxRate: 0.6,
  }
};
