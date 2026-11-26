import type { APIRoute } from 'astro';
import { SITE } from '../../config/site.ts';
import { getUi } from '../../i18n/ui/index.ts';
import { json, languages, services } from '../../lib/geo/index.ts';

/** What the calculators do, what they take into account and what they leave out. */
export const GET: APIRoute = () => {
  const ui = getUi('en');
  return json({
    name: SITE.name,
    url: SITE.origin,
    description: ui.description,
    provider: { name: SITE.name, email: SITE.email },
    price: 0,
    currency: 'USD',
    accountRequired: false,
    runsIn: 'The reader\'s browser. Inputs are not transmitted or stored.',
    jurisdiction: 'United States',
    languages: languages().map((language) => language.code),
    doesNot: [
      'give financial, tax, legal or investment advice',
      'recommend a course of action',
      'check eligibility for a loan or look at a credit score',
      'quote live market rates',
    ],
    capabilities: services('en'),
  });
};
