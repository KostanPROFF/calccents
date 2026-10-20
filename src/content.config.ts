import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

/**
 * The guides collection.
 *
 * The schema is the mechanism that keeps the site's editorial standard
 * enforced: a guide without a source, without a review date or without a
 * named author fails the build rather than shipping.
 */
const guides = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/guides' }),
  schema: z.object({
    title: z.string().min(10).max(60),
    description: z.string().min(140).max(160),
    date: z.coerce.date(),
    lastReviewed: z.coerce.date().refine(
      (value) => value <= new Date(),
      'lastReviewed cannot be a date in the future',
    ),
    author: z.string().min(1),
    reviewedBy: z.string().min(1),
    group: z.enum(['Home and mortgages', 'Renting and owning', 'Investing']),
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
  }),
});

export const collections = { guides };
