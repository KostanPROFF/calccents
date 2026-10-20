# Routes

Astro file-based routing, `output: 'static'`, `trailingSlash: 'always'`.
Every page renders through `src/layouts/Base.astro`.

## Route map

| URL | File | Layout | Renders |
|---|---|---|---|
| `/` | `src/pages/index.astro` | Base | Home: value proposition, the three calculators, how the site works, guide index |
| `/tools/` | `src/pages/tools/index.astro` | Base | Index of all calculators |
| `/tools/mortgage-payment/` | `src/pages/tools/mortgage-payment.astro` | Base + ToolShell | Mortgage payment calculator |
| `/tools/rent-vs-buy/` | `src/pages/tools/rent-vs-buy.astro` | Base + ToolShell | Rent vs buy calculator |
| `/tools/compound-interest/` | `src/pages/tools/compound-interest.astro` | Base + ToolShell | Compound interest calculator |
| `/guides/` | `src/pages/guides/index.astro` | Base | Index of the 15 guides |
| `/guides/<slug>/` | `src/pages/guides/[...slug].astro` | Base | One guide, from the `guides` content collection |
| `/about/` | `src/pages/about.astro` | Base | What the site is and what it is not |
| `/contact/` | `src/pages/contact.astro` | Base | Contact details |
| `/privacy/` | `src/pages/privacy.astro` | Base | Privacy policy |
| `/terms/` | `src/pages/terms.astro` | Base | Terms of use |
| `/editorial-team/` | `src/pages/editorial-team.astro` | Base | Who writes and reviews the content |
| `/sources/` | `src/pages/sources.astro` | Base | Every primary source the site relies on |
| `/404` | `src/pages/404.astro` | Base | Not found |
| `/robots.txt` | `src/pages/robots.txt.ts` | — | Generated from the site config |

## Collection

`src/content/guides/*.mdx` — 15 entries, loaded through `src/content.config.ts`
with the `glob()` loader. Each entry carries frontmatter validated by Zod:
`title` (≤ 60 characters), `description` (140–160 characters), `date`,
`lastReviewed`, `author`, `reviewedBy`, `sources` (≥ 1), `relatedTools`,
`faq` (5–8 pairs). A missing source or a missing review date fails the build.

The 15 guide slugs:

1. `mortgage-payment-calculator-explained` (hub)
2. `rent-vs-buy-calculator-explained` (hub)
3. `compound-interest-calculator-explained` (hub)
4. `how-mortgage-amortization-works`
5. `monthly-payment-vs-total-cost-mortgage`
6. `extra-mortgage-payments-math`
7. `estimating-property-tax-and-home-insurance`
8. `rent-vs-buy-common-mistakes`
9. `down-payment-and-closing-costs-explained`
10. `compound-vs-simple-interest`
11. `how-compounding-frequency-changes-results`
12. `inflation-and-real-returns-explained`
13. `understanding-apr`
14. `mortgage-rate-and-term-tradeoffs`
15. `how-to-read-an-amortization-schedule`

## Configuration

`astro.config.mjs` — `site` comes from `src/config/site.ts` (single source of
truth), `output: 'static'`, `trailingSlash: 'always'`, integrations `mdx()` and
`sitemap()`.
