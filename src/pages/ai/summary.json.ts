import type { APIRoute } from 'astro';
import { SITE } from '../../config/site.ts';
import { getTools } from '../../config/tools.ts';
import { getUi } from '../../i18n/ui/index.ts';
import { absolute, guidesIn, json, languages, trustPages } from '../../lib/geo/index.ts';

/** The site in one object: what it is, who runs it, and where everything else is. */
export const GET: APIRoute = async () => {
  const ui = getUi('en');
  const guides = await guidesIn('en');
  return json({
    name: SITE.name,
    url: SITE.origin,
    tagline: ui.tagline,
    description: ui.description,
    summary: ui.home.faq[0]?.a,
    type: 'Free personal finance calculators and explanatory guides',
    audience: 'People in the United States working out a mortgage, rent, savings, pay, tax or debt figure',
    topics: ['mortgages', 'renting versus buying', 'compound interest', 'take-home pay', 'federal income tax', 'debt payoff'],
    founded: SITE.founded,
    contact: SITE.email,
    author: { name: SITE.author.name, profiles: SITE.author.links.map((link) => link.href) },
    reviewer: { name: SITE.reviewer.name, profiles: SITE.reviewer.links.map((link) => link.href) },
    sourceCode: SITE.repository,
    pricing: 'Free. No account, sign-up or email address is needed.',
    advice: 'The site publishes calculations and explanations, not financial, tax, legal or investment advice.',
    privacy: 'Calculations run in the browser; the values entered are not sent anywhere or stored.',
    funding: 'Display advertising',
    languages: languages(),
    counts: { calculators: getTools('en').length, guides: guides.length },
    pages: trustPages('en'),
    machineReadable: {
      llms: absolute('/llms.txt'),
      faq: absolute('/ai/faq.json'),
      service: absolute('/ai/service.json'),
      aiPolicy: absolute('/.well-known/ai.txt'),
      feed: absolute('/rss.xml'),
      sitemap: absolute('/sitemap-index.xml'),
    },
  });
};
