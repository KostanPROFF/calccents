/**
 * The internal links between the guides and the calculators.
 *
 * A guide names the calculators it explains in its `relatedTools`
 * frontmatter, and that list is the one source of truth for the links in
 * both directions:
 *
 * - a guide links to the calculators it names;
 * - a calculator links to every guide that names it, after the guides its
 *   dictionary lists by hand, so a new guide reaches the calculator page the
 *   day it is published without anybody editing ten dictionaries;
 * - a guide links to the other guides that explain the same calculators,
 *   then to the guides of the same group.
 *
 * Nothing here reads the content collection, so the rules can be tested
 * with the plain Node test runner.
 */

/** What the linking rules need to know about a guide. */
export interface LinkableGuide {
  /** The URL segment of the guide, the same in every language. */
  slug: string;
  /** The group the guide is filed under on the guides index. */
  group: string;
  /** The calculators the guide names, by slug. */
  relatedTools: readonly string[];
  /** The publication date, used to break ties: newer first. */
  date: Date;
}

/** How many guides the related guides block shows. Two rows of two tiles. */
export const RELATED_GUIDES_LIMIT = 4;

const newestFirst = (a: LinkableGuide, b: LinkableGuide): number =>
  b.date.getTime() - a.date.getTime() || a.slug.localeCompare(b.slug);

/**
 * How closely another guide is related to this one.
 *
 * A calculator the two guides share counts for more than the group they
 * share, because it means the two articles explain the same arithmetic.
 * Zero means the guides have nothing in common and are not linked.
 */
export function relatedness(guide: LinkableGuide, other: LinkableGuide): number {
  const shared = other.relatedTools.filter((tool) => guide.relatedTools.includes(tool)).length;
  return shared * 2 + (guide.group === other.group ? 1 : 0);
}

/**
 * The guides to link from the bottom of a guide.
 *
 * The most closely related first, the newest first among equals, never the
 * guide itself and never a guide with nothing in common with it.
 */
export function relatedGuidesFor<T extends LinkableGuide>(
  guide: LinkableGuide,
  candidates: readonly T[],
  limit: number = RELATED_GUIDES_LIMIT,
): T[] {
  return candidates
    .filter((other) => other.slug !== guide.slug)
    .map((other) => ({ other, score: relatedness(guide, other) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || newestFirst(a.other, b.other))
    .slice(0, limit)
    .map(({ other }) => other);
}

/**
 * The guides to link from a calculator page, by slug.
 *
 * The hand-picked list from the dictionary comes first, in its own order,
 * because somebody chose it. Every other guide that names the calculator
 * follows, newest first. A slug never appears twice.
 */
export function guideSlugsForTool(
  tool: string,
  curated: readonly string[],
  guides: readonly LinkableGuide[],
): string[] {
  const seen = new Set(curated);
  const tagged = guides
    .filter((guide) => guide.relatedTools.includes(tool) && !seen.has(guide.slug))
    .sort(newestFirst)
    .map((guide) => guide.slug);
  return [...new Set([...curated, ...tagged])];
}
