import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';

import { alternates, formatDate, LOCALE_META, LOCALES, localePath, stripLocale } from './locales.ts';

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

describe('LOCALE_META', () => {
  it('writes Arabic right to left and every other language left to right', () => {
    for (const locale of LOCALES) {
      assert.equal(LOCALE_META[locale].dir, locale === 'ar' ? 'rtl' : 'ltr');
    }
  });
});
