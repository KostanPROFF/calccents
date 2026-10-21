/**
 * Single source of truth for site identity.
 *
 * Every place that needs the brand name, the canonical origin, the author
 * or the reviewer reads from here. Changing the domain means editing this
 * file (and `.env`) — no other file hard-codes a URL.
 */

export const SITE = {
  name: 'Calccents',
  domain: 'calccents.com',
  origin: 'https://calccents.com',
  lang: 'en',
  locale: 'en_US',
  tagline: 'Financial calculators that show their work',
  description:
    'Free financial calculators for mortgage payments, renting versus buying, and compound interest. Every formula is shown, every assumption belongs to you, and no page tells you what to do with the result.',
  email: 'hello@calccents.com',
  founded: '2026',
  /**
   * One person runs this site.
   *
   * There is deliberately no separate "reviewer" entry. A site with one
   * author who also does the review should say so: a second name on the
   * page that does not exist is a fabricated credential, and this one is
   * open source, so anybody can look. When an outside reviewer is added,
   * their name goes on the pages they actually reviewed, in the guide
   * frontmatter, and the byline prints it there.
   */
  author: {
    name: 'Kostan Proff',
    role: 'Author and reviewer',
    bio: 'Engineer by trade. Writes the guides, maintains the calculation engine, and checks every published figure against a primary source. The code that does the arithmetic is public, and the formulas are covered by unit tests that run on every change.',
    links: [{ label: 'GitHub', href: 'https://github.com/KostanPROFF' }],
  },
  /** The public repository, mentioned on the about and editorial pages. */
  repository: 'https://github.com/KostanPROFF/calccents',
  nav: [
    { href: '/tools/', label: 'Tools' },
    { href: '/guides/', label: 'Guides' },
    { href: '/sources/', label: 'Sources' },
    { href: '/about/', label: 'About' },
  ],
  footer: [
    { href: '/tools/', label: 'Calculators' },
    { href: '/guides/', label: 'Guides' },
    { href: '/sources/', label: 'Sources' },
    { href: '/editorial-team/', label: 'Editorial team' },
    { href: '/about/', label: 'About' },
    { href: '/contact/', label: 'Contact' },
    { href: '/privacy/', label: 'Privacy' },
    { href: '/terms/', label: 'Terms' },
  ],
} as const;

export type NavItem = (typeof SITE.nav)[number];
