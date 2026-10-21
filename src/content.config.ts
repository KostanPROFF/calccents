import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';
import { LOCALES } from './i18n/locales.ts';

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
 * wide enough to say the same thing naturally.
 */
const guides = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/guides' }),
  schema: z
    .object({
      title: z.string().min(10).max(60),
      description: z.string().min(60).max(200),
      locale: z.enum(LOCALES),
      date: z.coerce.date(),
      lastReviewed: z.coerce.date().refine(
        (value) => value <= new Date(),
        'lastReviewed cannot be a date in the future',
      ),
      author: z.string().min(1),
      reviewedBy: z.string().min(1),
      group: z.enum(['home', 'renting', 'investing']),
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
