/**
 * Registry of the calculators published on the site.
 *
 * The slugs and the grouping never change and live here. Everything a
 * reader sees — the name, the title, the description, the field labels, the
 * FAQ — comes from the dictionary for the language the page is in.
 *
 * Tool pages, the tool index, the home page, the `relatedTools` field of
 * every guide and the `SoftwareApplication` structured data all read from
 * this list, so a new tool is registered in exactly one place.
 */

import { getUi } from '../i18n/ui/index.ts';
import type { Locale } from '../i18n/locales.ts';

export const TOOL_SLUGS = ['mortgage-payment', 'rent-vs-buy', 'compound-interest'] as const;

export type ToolSlug = (typeof TOOL_SLUGS)[number];

/** The grouping a tool belongs to. It picks the icon, not the wording. */
export type ToolGroup = 'home' | 'investing';

export interface ToolDefinition {
  /** URL segment, also used as the key in `relatedTools`. */
  slug: ToolSlug;
  /** Display name used in cards and navigation. */
  name: string;
  /** Page title. Kept under 60 characters so it is not truncated in results. */
  title: string;
  /** Meta description. Kept between 140 and 160 characters. */
  description: string;
  /** One-sentence summary used on cards. */
  short: string;
  /** Grouping label used on the tools index. */
  category: string;
  /** The grouping the tool belongs to, used to pick an icon. */
  group: ToolGroup;
  /**
   * The date the calculation behind the tool was last checked.
   *
   * A date rather than a string, because the page prints it and a page in
   * Russian should not print a date written the English way.
   */
  reviewedOn: Date;
}

const GROUPS: Record<ToolSlug, ToolGroup> = {
  'mortgage-payment': 'home',
  'rent-vs-buy': 'home',
  'compound-interest': 'investing',
};

/** All three calculators were last checked on the same day. */
const REVIEWED_ON = new Date('2026-10-20T00:00:00Z');

export function getTools(locale: Locale): ToolDefinition[] {
  const ui = getUi(locale);
  return TOOL_SLUGS.map((slug) => {
    const copy = ui.tool[slug];
    return {
      slug,
      name: copy.name,
      title: copy.title,
      description: copy.description,
      short: copy.short,
      category: copy.category,
      group: GROUPS[slug],
      reviewedOn: REVIEWED_ON,
    };
  });
}

export function getTool(slug: ToolSlug, locale: Locale): ToolDefinition {
  const tool = getTools(locale).find((entry) => entry.slug === slug);
  if (!tool) {
    throw new Error(`Unknown tool slug: ${slug}`);
  }
  return tool;
}

export function isToolSlug(value: string): value is ToolSlug {
  return (TOOL_SLUGS as readonly string[]).includes(value);
}
