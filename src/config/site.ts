/**
 * The facts about the site that do not change with the language.
 *
 * Everything that a reader sees and that differs between English, Russian
 * and Spanish lives in `src/i18n/ui/`. What stays here is the identity: the
 * name, the domain, the email address, the person behind it and the
 * repository. Those are the same in every language.
 */

import { getUi } from '../i18n/ui/index.ts';
import { LOCALE_META, type Locale } from '../i18n/locales.ts';
import { AUTHOR, REVIEWER } from './people.ts';

export const SITE = {
  name: 'Calccents',
  domain: 'calccents.com',
  origin: 'https://calccents.com',
  email: 'hello@calccents.com',
  founded: '2026',
  /**
   * The date the legal pages were last reviewed.
   *
   * A date rather than a string, because the pages print it and a page in
   * Russian should not print a date written the English way.
   */
  reviewedOn: new Date('2026-10-23T00:00:00Z'),
  /**
   * One person writes the guides and maintains the calculation engine.
   *
   * The name and the profiles come from the people registry, so the same
   * person is called the same thing on every page and in every language.
   * The reviewer is a separate person, and their name appears only on the
   * pages they actually reviewed.
   */
  author: {
    name: AUTHOR.name,
    links: AUTHOR.links,
  },
  /** The person who reviews the financial content of the guides. */
  reviewer: {
    name: REVIEWER.name,
    links: REVIEWER.links,
  },
  /** The public repository, mentioned on the about and editorial pages. */
  repository: 'https://github.com/KostanPROFF/calccents',
  /**
   * The AdSense publisher ID.
   *
   * It is a fact about the site, not a setting, so it lives here with the
   * name and the domain rather than in an environment variable. The meta
   * tag in the document head carries it, which is how AdSense confirms the
   * site belongs to the account when the application is reviewed.
   *
   * This is not what turns the ads on. The ad code itself is gated on
   * environment variables, so the site can carry the ownership tag while
   * still shipping without a single ad request.
   */
  adsensePublisherId: 'ca-pub-5321511632415174',
  /**
   * The Google Analytics 4 measurement ID.
   *
   * The property belongs to this site, so the ID is a fact about the site
   * and lives here with the name and the domain. The environment variable
   * overrides it, which is how a build can prove the analytics path works
   * with a dummy ID.
   *
   * A GA4 measurement ID is public by design: it is visible in the source
   * of every page that loads the tag.
   */
  gaMeasurementId: 'G-J8H5VGPMS5',
  /**
   * The Cloudflare Web Analytics site token.
   *
   * Cloudflare used to add its beacon to every page it served, which meant
   * a request left the browser before anyone had answered the cookie
   * question. The automatic setup is switched off in the Cloudflare
   * dashboard, and the beacon is loaded by the consent bootstrap instead,
   * so it goes out only after the answer.
   *
   * A site token is public by design: Cloudflare says so itself, because
   * the token is visible in the source of every page that carries the
   * beacon and it only works on the domain it belongs to.
   */
  cloudflareBeaconToken: 'd7eea760851f48348f05f7a316598dc0',
} as const;

export type NavItem = { href: string; label: string };

/**
 * The site identity for a given language.
 *
 * This is what the rest of the codebase reads, so a page never has to know
 * whether a string comes from the config or from the dictionary.
 */
export interface SiteForLocale {
  name: string;
  domain: string;
  origin: string;
  email: string;
  founded: string;
  reviewedOn: Date;
  tagline: string;
  description: string;
  /** The value for `<html lang>`. */
  lang: string;
  /** The value for `og:locale`. */
  ogLocale: string;
  /** The locale passed to `Intl`. */
  intl: string;
  author: {
    name: string;
    role: string;
    bio: string;
    links: readonly { label: string; href: string }[];
  };
  /** The person who reviews the financial content of the guides. */
  reviewer: {
    name: string;
    role: string;
    bio: string;
    links: readonly { label: string; href: string }[];
  };
  repository: string;
  adsensePublisherId: string;
  /** The Google Analytics 4 measurement ID. */
  gaMeasurementId: string;
  nav: NavItem[];
  footer: NavItem[];
}

export function getSite(locale: Locale): SiteForLocale {
  const ui = getUi(locale);
  return {
    name: SITE.name,
    domain: SITE.domain,
    origin: SITE.origin,
    email: SITE.email,
    founded: SITE.founded,
    reviewedOn: SITE.reviewedOn,
    tagline: ui.tagline,
    description: ui.description,
    lang: LOCALE_META[locale].htmlLang,
    ogLocale: LOCALE_META[locale].ogLocale,
    intl: LOCALE_META[locale].intl,
    author: {
      name: SITE.author.name,
      role: ui.author.role,
      bio: ui.author.bio,
      links: SITE.author.links,
    },
    reviewer: {
      name: SITE.reviewer.name,
      role: ui.reviewer.role,
      bio: ui.reviewer.bio,
      links: SITE.reviewer.links,
    },
    repository: SITE.repository,
    adsensePublisherId: SITE.adsensePublisherId,
    gaMeasurementId: SITE.gaMeasurementId,
    nav: [
      { href: '/tools/', label: ui.nav.tools },
      { href: '/guides/', label: ui.nav.guides },
      { href: '/sources/', label: ui.nav.sources },
      { href: '/about/', label: ui.nav.about },
    ],
    footer: [
      { href: '/tools/', label: ui.footer.calculatorsHeading },
      { href: '/guides/', label: ui.footer.links.guides },
      { href: '/sources/', label: ui.footer.links.sources },
      { href: '/editorial-team/', label: ui.footer.links['editorial-team'] },
      { href: '/about/', label: ui.footer.links.about },
      { href: '/contact/', label: ui.footer.links.contact },
      { href: '/privacy/', label: ui.footer.links.privacy },
      { href: '/terms/', label: ui.footer.links.terms },
    ],
  };
}
