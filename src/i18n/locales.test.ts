import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';

import {
  DEFAULT_LOCALE,
  LOCALE_META,
  LOCALES,
  alternates,
  formatDate,
  forwardArrow,
  localePath,
  stripLocale,
  type Locale,
} from './locales.ts';

describe('the locales the site publishes in', () => {
  /*
   * The site is published in ten languages. A language that is declared but has
   * no metadata fails the build here rather than shipping a page that says
   * the wrong thing about itself.
   */
  it('has metadata for every declared locale', () => {
    for (const locale of LOCALES) {
      const meta = LOCALE_META[locale];
      assert.ok(meta, `${locale} has no metadata`);
      assert.equal(meta.code, locale);
      assert.ok(meta.htmlLang, `${locale} has no htmlLang`);
      assert.ok(meta.ogLocale, `${locale} has no ogLocale`);
      assert.ok(meta.intl, `${locale} has no intl locale`);
      assert.ok(meta.nativeName, `${locale} has no native name`);
      assert.ok(meta.englishName, `${locale} has no English name`);
    }
  });

  it('names every locale in its own language', () => {
    const names = LOCALES.map((locale) => LOCALE_META[locale].nativeName);
    assert.equal(new Set(names).size, names.length, 'two locales share a name');
  });

  /*
   * Arabic is written right to left. A page that does not say so lays the
   * whole layout out backwards, so the direction is part of the metadata
   * rather than a detail left to the browser.
   */
  it('marks Arabic as right to left and the rest as left to right', () => {
    for (const locale of LOCALES) {
      const expected = locale === 'ar' ? 'rtl' : 'ltr';
      assert.equal(LOCALE_META[locale].dir, expected, `${locale} has the wrong direction`);
    }
  });

  it('keeps English at the root of the site', () => {
    assert.equal(DEFAULT_LOCALE, 'en');
    assert.equal(localePath('en', '/guides/'), '/guides/');
  });
});

describe('formatDate', () => {
  /*
   * Every date on the site is a calendar day, and the dates are stored as
   * midnight UTC. A reader in New York or Los Angeles used to see the day
   * before the one the site was claiming, because the formatter fell back
   * to the machine's own time zone.
   */
  const reviewed = new Date('2026-10-23T00:00:00Z');

  it('does not move the day in a western time zone', () => {
    const original = process.env.TZ;
    try {
      process.env.TZ = 'America/Los_Angeles';
      assert.equal(formatDate(reviewed, 'en'), 'October 23, 2026');
    } finally {
      if (original === undefined) delete process.env.TZ;
      else process.env.TZ = original;
    }
  });

  it('does not move the day in an eastern time zone', () => {
    const original = process.env.TZ;
    try {
      process.env.TZ = 'Asia/Tokyo';
      assert.equal(formatDate(reviewed, 'en'), 'October 23, 2026');
    } finally {
      if (original === undefined) delete process.env.TZ;
      else process.env.TZ = original;
    }
  });

  it('writes the date the way each locale writes it', () => {
    assert.equal(formatDate(reviewed, 'en'), 'October 23, 2026');
    assert.equal(formatDate(reviewed, 'ru'), '23 октября 2026 г.');
    assert.equal(formatDate(reviewed, 'es'), '23 de octubre de 2026');
    assert.equal(formatDate(reviewed, 'uk'), '23 жовтня 2026 р.');
    assert.equal(formatDate(reviewed, 'zh'), '2026年10月23日');
    assert.equal(formatDate(reviewed, 'pt'), '23 de outubro de 2026');
  });

  /*
   * The Arabic pages print their figures in Latin digits, the way the
   * calculators do, so a date written in Arabic-Indic digits would be the
   * only number on the page that does not match the rest.
   */
  it('writes an Arabic date with the same digits the calculators use', () => {
    assert.match(formatDate(reviewed, 'ar'), /^23 .+ 2026$/);
  });
});

describe('localePath', () => {
  it('leaves an English path alone', () => {
    assert.equal(localePath('en', '/tools/net-pay/'), '/tools/net-pay/');
  });

  it('prefixes a Russian path', () => {
    assert.equal(localePath('ru', '/tools/net-pay/'), '/ru/tools/net-pay/');
  });

  it('prefixes a Spanish path', () => {
    assert.equal(localePath('es', '/guides/'), '/es/guides/');
  });

  it('does not prefix the root twice', () => {
    for (const locale of LOCALES) {
      const path = localePath(locale, '/');
      assert.equal(path.startsWith('//'), false);
    }
  });
});

describe('alternates', () => {
  it('lists the same page in every locale', () => {
    const links = alternates('/ko/tools/net-pay/');
    assert.equal(links.length, LOCALES.length);
    assert.deepEqual(
      links.find((link) => link.locale === 'ar'),
      { locale: 'ar', href: '/ar/tools/net-pay/' },
    );
  });

  it('strips every prefix back to the English path', () => {
    for (const locale of LOCALES) {
      assert.equal(stripLocale(localePath(locale, '/guides/')), '/guides/');
    }
  });
});

describe('forwardArrow', () => {
  /*
   * The arrow that means "go on" points the way the line reads, so in Arabic
   * it points to the left.
   */
  it('points left in Arabic and right everywhere else', () => {
    assert.equal(forwardArrow('ar'), '←');
    for (const locale of LOCALES) {
      if (locale === 'ar') continue;
      assert.equal(forwardArrow(locale), '→', `${locale} points the wrong way`);
    }
  });
});
