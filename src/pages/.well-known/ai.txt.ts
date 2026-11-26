import type { APIRoute } from 'astro';
import { SITE } from '../../config/site.ts';
import { absolute, text } from '../../lib/geo/index.ts';

/**
 * What AI systems may do with the site.
 *
 * The file follows the `ai.txt` convention, which borrows the syntax of
 * `robots.txt`. It says the same thing `robots.txt` does, because the site
 * wants to be found and quoted by AI answers as much as by search: every page
 * may be read, indexed, quoted and used, and a citation with a link back is
 * asked for, since a figure on these pages is only as good as the date and the
 * source printed next to it.
 */
export const GET: APIRoute = () =>
  text(
    [
      `# ai.txt for ${SITE.domain}`,
      '#',
      '# AI crawlers, assistants and answer engines may read, index, quote and',
      '# summarise every public page. Please cite the page a figure comes from,',
      '# with a link, and carry the date it was last checked: tax figures and',
      '# rates change every year.',
      '#',
      '# The site publishes calculations and explanations, not financial advice.',
      '',
      'User-Agent: *',
      'Allow: /',
      '',
      `# Summary for language models: ${absolute('/llms.txt')}`,
      `# Site summary: ${absolute('/ai/summary.json')}`,
      `# FAQ: ${absolute('/ai/faq.json')}`,
      `# Service description: ${absolute('/ai/service.json')}`,
      `# Sitemap: ${absolute('/sitemap-index.xml')}`,
      `# Contact: ${SITE.email}`,
      '',
    ].join('\n'),
  );
