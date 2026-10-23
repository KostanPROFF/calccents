/**
 * The people behind the site.
 *
 * The author writes the guides and maintains the calculation engine. The
 * reviewer reads the financial content of a guide before it goes live.
 *
 * The names and the profile links are facts about the site, not settings, so
 * they live here rather than in the dictionary: the same person is called the
 * same thing in every language. The roles and the biographies are prose, and
 * prose is translated, so those live in `src/i18n/ui/`.
 *
 * A guide names its author and its reviewer in its frontmatter, and the
 * collection schema checks those names against this registry. A guide cannot
 * credit somebody who is not listed here, and the build fails if it tries.
 */

export interface PersonLink {
  label: string;
  href: string;
}

export interface Person {
  /** The name as it appears on the site and in the frontmatter. */
  name: string;
  /** The profiles that identify this person, for `rel="me"` and schema.org. */
  links: PersonLink[];
}

/** The person who writes the guides and maintains the calculation engine. */
export const AUTHOR: Person = {
  name: 'Kostan Proff',
  links: [{ label: 'GitHub', href: 'https://github.com/KostanPROFF' }],
};

/**
 * The person who reviews the financial content of the guides.
 *
 * The review is a second reading of the numbers, the assumptions and the
 * sources, before a guide is published.
 */
export const REVIEWER: Person = {
  name: 'Tetiana Goncharko',
  links: [{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/tetiana-goncharko/' }],
};

/**
 * Every person a page may name, in the order the editorial page shows them.
 *
 * The guide frontmatter stores names rather than identifiers, because a name
 * is what a reader sees and what a page has to get right. This tuple is the
 * list the collection schema checks those names against.
 */
export const PEOPLE_NAMES = [AUTHOR.name, REVIEWER.name] as const;

/**
 * The profiles of a person named in the frontmatter.
 *
 * An unknown name returns an empty list rather than throwing, because the
 * schema is what rejects unknown names. This function is only reached after
 * that check has passed.
 */
export function personLinks(name: string): PersonLink[] {
  if (name === REVIEWER.name) return REVIEWER.links;
  if (name === AUTHOR.name) return AUTHOR.links;
  return [];
}
