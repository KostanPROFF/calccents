import type { APIRoute } from 'astro';
import { SITE } from '../config/site.ts';
import { getTools } from '../config/tools.ts';
import { getUi } from '../i18n/ui/index.ts';
import { absolute, guidesIn, guideUrl, languages, text, trustPages } from '../lib/geo/index.ts';

/**
 * The site in the `llms.txt` format: a title, a one-paragraph summary, and
 * lists of links with a line on each.
 *
 * The format is a convention described at llmstxt.org rather than a
 * standard, and no search engine has said that it reads it. It is here
 * because it is the cheapest way to hand a language model the shape of the
 * site, and it is built from the registries so it is never out of date.
 */
export const GET: APIRoute = async () => {
  const ui = getUi('en');
  const tools = getTools('en');
  const guides = await guidesIn('en');

  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${ui.home.faq[0]?.a ?? ui.description}`,
    '',
    'Each tool shows the formula it uses, the assumptions behind the result, the primary sources of every published figure with the date it was checked, and a list of what it does not do. The arithmetic runs in the browser and the values entered are not stored. The site publishes calculations and explanations, not financial advice, and no page recommends a course of action.',
    '',
    `Written by ${SITE.author.name}; the financial content of each guide is reviewed by ${SITE.reviewer.name}. Free, with no account. Funded by display advertising.`,
    '',
    '## Calculators',
    '',
    ...tools.map((tool) => `- [${tool.name}](${absolute(`/tools/${tool.slug}/`)}): ${tool.description}`),
    '',
    '## Guides',
    '',
    ...guides.map((guide) => `- [${guide.data.title}](${guideUrl(guide)}): ${guide.data.description}`),
    '',
    '## About the site',
    '',
    ...trustPages('en').map((page) => `- [${page.title}](${page.url})`),
    '',
    '## Machine-readable files',
    '',
    `- [Site summary](${absolute('/ai/summary.json')}): name, description, people, languages and policies as JSON`,
    `- [FAQ](${absolute('/ai/faq.json')}): questions about the site and about each calculator, with answers`,
    `- [Service description](${absolute('/ai/service.json')}): what each calculator computes, its formula and its limits`,
    `- [AI crawler permissions](${absolute('/.well-known/ai.txt')})`,
    `- [RSS feed of the guides](${absolute('/rss.xml')})`,
    `- [Sitemap](${absolute('/sitemap-index.xml')})`,
    '',
    '## Optional',
    '',
    ...languages()
      .filter((language) => language.code !== 'en')
      .map((language) => `- [${language.name} (${language.nativeName})](${language.url}): the site in ${language.name}`),
    '',
  ];

  return text(lines.join('\n'));
};
