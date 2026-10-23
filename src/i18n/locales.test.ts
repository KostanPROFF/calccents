import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';

import { formatDate, localePath, type Locale } from './locales.ts';

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
    const locales: Locale[] = ['en', 'ru', 'es'];
    for (const locale of locales) {
      const path = localePath(locale, '/');
      assert.equal(path.startsWith('//'), false);
    }
  });
});
