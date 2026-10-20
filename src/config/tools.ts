/**
 * Registry of the calculators published on the site.
 *
 * Tool pages, the tool index, the home page, the `relatedTools` field of
 * every guide and the `SoftwareApplication` structured data all read from
 * this list, so a new tool is registered in exactly one place.
 */

export interface ToolDefinition {
  /** URL segment, also used as the key in `relatedTools`. */
  slug: string;
  /** Display name used in cards and navigation. */
  name: string;
  /** Page title. Kept under 60 characters so it is not truncated in results. */
  title: string;
  /** Meta description. Kept between 140 and 160 characters. */
  description: string;
  /** One-sentence summary used on cards. */
  short: string;
  /** Grouping label used on the tools index. */
  category: 'Home' | 'Investing';
}

export const TOOLS: ToolDefinition[] = [
  {
    slug: 'mortgage-payment',
    name: 'Mortgage Payment Calculator',
    title: 'Mortgage Payment Calculator with Amortization',
    description:
      'Calculate your monthly mortgage payment, total PITI cost and full amortization schedule. See every dollar of interest and how extra payments move the payoff date.',
    short: 'Monthly P&I, full PITI, amortization schedule and the effect of extra payments.',
    category: 'Home',
  },
  {
    slug: 'rent-vs-buy',
    name: 'Rent vs Buy Calculator',
    title: 'Rent vs Buy Calculator: Compare the Real Cost',
    description:
      'Compare renting and owning on the numbers: monthly cost, upfront outlay, equity and the month the two paths cross over. No verdict, just the arithmetic.',
    short: 'Monthly cost, upfront outlay, equity build-up and the crossover month.',
    category: 'Home',
  },
  {
    slug: 'compound-interest',
    name: 'Compound Interest Calculator',
    title: 'Compound Interest Calculator with Monthly Contributions',
    description:
      'Project a balance with regular contributions, choose the compounding frequency, and see the result in today’s dollars after inflation. Formulas shown.',
    short: 'Balance, contributions, interest earned and the inflation-adjusted value.',
    category: 'Investing',
  },
];

export const TOOL_BY_SLUG: Record<string, ToolDefinition> = Object.fromEntries(
  TOOLS.map((tool) => [tool.slug, tool]),
);

export function getTool(slug: string): ToolDefinition {
  const tool = TOOL_BY_SLUG[slug];
  if (!tool) {
    throw new Error(`Unknown tool slug: ${slug}`);
  }
  return tool;
}
