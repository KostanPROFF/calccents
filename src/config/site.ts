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
  author: {
    name: 'Kostan Proff',
    role: 'Founder and author',
    bio: 'Writes the guides, maintains the calculation engine, and checks every published figure against a primary source.',
  },
  reviewer: {
    name: 'Kostan Proff',
    role: 'Reviewer',
    bio: 'Reviews each guide before it goes live: formulas, units, edge cases, and whether the wording stays inside what the tool actually computes.',
  },
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
