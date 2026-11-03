import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';
import { LOCALES } from './i18n/locales.ts';
import { PEOPLE_NAMES } from './config/people.ts';

/**
 * The guides collection.
 *
 * The schema is the mechanism that keeps the site's editorial standard
 * enforced: a guide without a source, without a review date or without a
 * named author fails the build rather than shipping.
 *
 * One guide exists in every language, and each language has its own file.
 * The English guides sit at the root of the collection, the Russian ones in
 * `ru/` and the Spanish ones in `es/`, which mirrors the URL structure of
 * the site: English at the root, the others under their locale prefix.
 *
 * The description length rule is stricter for English than for the
 * translations. The 140 to 160 character window is a search-result rule
 * written for English, and holding a Russian or Spanish description to the
 * same number of characters would push the translators into writing worse
 * sentences. The English window is enforced; the translations get a range
 * wide enough to say the same thing naturally, measured in the same units
 * for every script: a square glyph counts as two, because a Chinese
 * description of forty characters says what an English one of a hundred and
 * twenty says.
 */
/**
 * The length of a string in the units a search result is measured in.
 *
 * A Chinese or Korean glyph is square and carries about as much as two Latin
 * letters: a Chinese description of forty characters says what an English one
 * of a hundred and twenty says. Counting every glyph as one would hold the
 * CJK guides to a number their language cannot reach without padding, so a
 * wide glyph counts double.
 */
function displayLength(text: string): number {
  let length = 0;
  for (const character of text) {
    const code = character.codePointAt(0) ?? 0;
    const wide =
      (code >= 0x1100 && code <= 0x115f) || // Hangul Jamo
      (code >= 0x2e80 && code <= 0xa4cf) || // CJK radicals through Yi
      (code >= 0xac00 && code <= 0xd7a3) || // Hangul syllables
      (code >= 0xf900 && code <= 0xfaff) || // CJK compatibility ideographs
      (code >= 0xfe30 && code <= 0xfe4f) || // CJK compatibility forms
      (code >= 0xff00 && code <= 0xff60) || // full-width forms
      (code >= 0xffe0 && code <= 0xffe6);
    length += wide ? 2 : 1;
  }
  return length;
}

/**
 * A field with a length window, measured in the units above.
 *
 * The English window is enforced separately and more tightly; this one is
 * the range that lets every language say the same thing naturally.
 */
function sized(minimum: number, maximum: number, label: string) {
  return z.string().superRefine((value, ctx) => {
    const length = displayLength(value);
    if (length < minimum || length > maximum) {
      ctx.addIssue({
        code: 'custom',
        message: `A guide ${label} is ${minimum} to ${maximum} characters wide, this one is ${length}`,
      });
    }
  });
}

const guides = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/guides' }),
  schema: z
    .object({
      title: sized(10, 60, 'title'),
      description: sized(60, 200, 'description'),
      locale: z.enum(LOCALES),
      date: z.coerce.date(),
      lastReviewed: z.coerce.date().refine(
        (value) => value <= new Date(),
        'lastReviewed cannot be a date in the future',
      ),
      author: z.string().min(1),
      reviewedBy: z.string().min(1),
      group: z.enum(['home', 'renting', 'investing']),
      /**
       * The picture that sits under the title of the guide.
       *
       * The slug is the name of the guide, so the drawing and the text it
       * belongs to cannot drift apart: renaming a guide file means renaming
       * the picture as well, and the build fails if they disagree.
       */
      illustration: z.enum([
        'compound-interest-calculator-explained',
        'compound-vs-simple-interest',
        'debt-payoff-calculator-explained',
        'down-payment-and-closing-costs-explained',
        'estimating-property-tax-and-home-insurance',
        'extra-mortgage-payments-math',
        'how-compounding-frequency-changes-results',
        'how-mortgage-amortization-works',
        'how-to-read-an-amortization-schedule',
        'income-tax-calculator-explained',
        'inflation-and-real-returns-explained',
        'monthly-payment-vs-total-cost-mortgage',
        'mortgage-payment-calculator-explained',
        'mortgage-rate-and-term-tradeoffs',
        'net-pay-calculator-explained',
        'rent-vs-buy-calculator-explained',
        'rent-vs-buy-common-mistakes',
        'understanding-apr',
      ]),
      readingMinutes: z.number().int().min(3).max(25),
      sources: z
        .array(
          z.object({
            label: z.string().min(3),
            url: z.url(),
          }),
        )
        .min(1),
      relatedTools: z.array(z.string()).default([]),
      faq: z
        .array(
          z.object({
            q: z.string().min(3),
            a: z.string().min(3),
          }),
        )
        .min(5)
        .max(8),
    })
    .superRefine((data, ctx) => {
      // A guide can only credit somebody the site knows about. The names
      // come from the people registry, so a typo in the frontmatter or a
      // credit to a person who is not listed fails the build instead of
      // quietly publishing a name the site cannot support.
      for (const field of ['author', 'reviewedBy'] as const) {
        if (!PEOPLE_NAMES.includes(data[field] as (typeof PEOPLE_NAMES)[number])) {
          ctx.addIssue({
            code: 'custom',
            path: [field],
            message: `${field} must be one of: ${PEOPLE_NAMES.join(', ')}`,
          });
        }
      }

      if (data.locale !== 'en') return;
      if (data.description.length < 140 || data.description.length > 160) {
        ctx.addIssue({
          code: 'custom',
          path: ['description'],
          message: `An English description must be 140 to 160 characters, this one is ${data.description.length}`,
        });
      }
    }),
});

export const collections = { guides };
