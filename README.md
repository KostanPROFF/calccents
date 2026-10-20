# Calccents

A static, English-language site of financial calculators, funded by display
advertising.

Three calculators — mortgage payment, rent versus buying, compound interest —
each with the formula shown, the assumptions stated, primary sources linked,
and an explicit list of what the tool does not do. Fifteen guides explain the
arithmetic behind them.

The site publishes calculations, not recommendations. That constraint is
enforced in code: a linter blocks advisory language from reaching a published
page.

## Stack

| Layer | Choice |
|---|---|
| Framework | Astro 7.4.1, `output: 'static'`, no client framework |
| Content | Content Collections with the `glob()` loader, MDX, Zod-validated frontmatter |
| Styling | One global stylesheet with CSS custom properties |
| Interactivity | Plain TypeScript in `<script>` blocks, roughly 5–10 KB per page |
| Calculation engine | Pure TypeScript in `src/lib/calc/`, no DOM dependency |
| Tests | Node's built-in test runner, with built-in coverage thresholds |
| Hosting | Cloudflare Pages, deployed from GitHub Actions via `wrangler` |

No Tailwind, no CSS-in-JS, no UI library. Every kilobyte of JavaScript costs
viewability, and viewability is the revenue.

## Commands

```bash
pnpm install
pnpm dev          # local dev server
pnpm check        # astro check — types and templates
pnpm test         # unit tests with coverage thresholds enforced
pnpm lint         # advisory-language lint + internal link check
pnpm build        # static build into dist/
pnpm lint:ads     # no AdSense code in the build without a publisher ID
pnpm lint:ids     # no duplicate DOM ids in the built HTML
pnpm verify       # all of the above, in the order CI runs them
```

Node 22.22 or newer is required. `pnpm` 12 is the tested version. pnpm 12
blocks install scripts by default; `pnpm-workspace.yaml` allows the two that
are needed (`esbuild` for the Astro toolchain, `workerd` for wrangler).

## Layout

```
src/
├─ config/site.ts          site identity — the single source of truth
├─ config/tools.ts         registry of the three calculators
├─ content.config.ts       Zod schema for the guides collection
├─ content/guides/*.mdx    15 guides
├─ lib/calc/               calculation engine + unit tests
├─ lib/client/dom.ts       browser helpers used by the page scripts
├─ components/             AdSlot, ToolShell, ResultPanel, Faq, SourceList, …
├─ layouts/Base.astro      document shell
├─ pages/                  routes
└─ styles/global.css       design tokens and every component style

scripts/
├─ lint-advisory.ts        YMYL guardrail, plus its own test suite
├─ check-links.ts          internal link resolution
├─ check-ads.ts            AdSense gating, both directions
└─ check-dom-ids.ts        duplicate id detection in the built HTML
```

## Content model

Every guide carries frontmatter that is validated at build time. A guide
without a source, without a review date or without a named author fails the
build rather than shipping.

```yaml
title: string            # 10–60 characters
description: string      # 140–160 characters
date: date
lastReviewed: date       # cannot be in the future
author: string
reviewedBy: string
group: 'Home and mortgages' | 'Renting and owning' | 'Investing'
readingMinutes: number
sources:                 # at least one, each with a label and a URL
  - label: string
    url: string
relatedTools: string[]   # tool slugs
faq:                     # 5–8 pairs
  - q: string
    a: string
```

## Environment variables

Copy `.env.example` to `.env`. Every variable is public and is embedded in
the shipped HTML; no secret belongs in this file.

| Variable | Effect when unset |
|---|---|
| `PUBLIC_ADSENSE_CLIENT` | No ad markup is shipped at all — the slots render nothing |
| `PUBLIC_ADSENSE_SLOT_RESULT` / `_IN_ARTICLE` / `_FOOTER` | The corresponding slot stays empty |
| `PUBLIC_GA_ID` | Google Analytics is not loaded; Cloudflare Web Analytics still works |
| `PUBLIC_BUTTONDOWN_FORM` | The newsletter form is not rendered |

The ad slots are env-gated on purpose. An `<ins>` element on a page that has
no publisher content behind it is one of the reasons a site gets rejected by
AdSense, and the site has to be live before AdSense will even review it.

## Deployment

The build runs in GitHub Actions and the finished `dist/` is uploaded to
Cloudflare Pages with `wrangler`. Cloudflare never builds the site itself, so
its own project settings stay empty — every variable lives in GitHub.

1. Create a free Cloudflare account, then a Pages project named `calccents`.
2. Add two GitHub repository **secrets**: `CLOUDFLARE_API_TOKEN` and
   `CLOUDFLARE_ACCOUNT_ID`.
3. Push to `main`. The workflow verifies the build and then deploys `dist/`.

Until those two secrets exist, the deploy step is skipped and the pipeline
reports why; the rest of CI still runs. The first push after the secrets are
added deploys on its own, with no further action.

Attach the custom domain to the Pages project in the Cloudflare dashboard. The
canonical origin in `src/config/site.ts` and the generated `robots.txt` and
`sitemap-index.xml` already point at `calccents.com`.

The build is fully static, so there is no server to run, patch or pay for.
Rollback is a matter of promoting an earlier deployment from the Cloudflare
Pages dashboard.

## Turning on advertising

1. Apply for AdSense once the site is live at its final address.
2. Create three display ad units: one for the result panel, one for the
   in-article position, one for the footer.
3. Add the publisher ID and the three slot IDs as GitHub repository
   **variables** — not secrets, because every one of them is embedded in the
   public HTML — and push again.

| Variable | Where it goes |
|---|---|
| `PUBLIC_ADSENSE_CLIENT`, `PUBLIC_ADSENSE_SLOT_*` | Repository → Settings → Secrets and variables → Actions → **Variables** |
| `PUBLIC_GA_ID`, `PUBLIC_BUTTONDOWN_FORM` | Same place, also as variables |
| `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` | Same place, under **Secrets** |

The ad slots are env-gated on purpose. An `<ins>` element on a page that has
no publisher content behind it is one of the reasons a site gets rejected by
AdSense, and the site has to be live before AdSense will even review it.

Keep the number of ad units per page at three or fewer. On a comparable
site, cutting the ad units on the main page from 18 to 9 raised page RPM by
40 % and monthly revenue by nearly 50 %, because the ads were pushing the
content down and slowing the page.

## The ladder after AdSense

Each network has a threshold that has to be reached before the account can be
applied for. Check the current figures on the network's own rules page
before applying, because they change.

| Network | Typical threshold |
|---|---|
| Journey by Mediavine | 1 000 Tier-1 sessions in 30 days |
| Raptive | 25 000 pageviews a month, with at least 50 % Tier-1 traffic |
| Mediavine | $5 000 trailing annual advertising revenue |
| Ezoic | 250 000 monthly active users |

Tier 1 means the United States, the United Kingdom, Canada and Australia.
This is why the site is English and aimed at that audience: traffic outside
those markets earns a fraction of the same page view.

## Editorial rules

- Every tool states what it does not do, in the same words, directly under
  the result.
- Every figure that comes from outside carries a source and a date.
- Every page carries a review date and a named reviewer.
- Drafting tools help with prose; a person checks the arithmetic, the units
  and the claims before anything is published.

## Verification gates

`pnpm verify` runs six gates, and all six block a deployment:

1. `astro check` — no type or template errors.
2. Unit tests — 90 % line coverage, 90 % function coverage and 85 % branch
   coverage over `src/lib/calc/`, enforced by the Node test runner. The test
   suite also covers the advisory linter itself, pinning the sentences it must
   reject and the sentences it must accept.
3. Linters — zero advisory-language findings, zero broken internal links.
4. `astro build` — the site builds.
5. Ad gating — the built HTML and JS contain no AdSense code while no
   publisher ID is configured, and no page carries more than three slots.
6. DOM ids — every id in the built HTML appears exactly once.

The last two gates exist because the build proves the code compiles, not that
it behaves. A result cell and an input field that shared an id once left the
monthly rent figure stuck on a placeholder while every test still passed; the
duplicate-id gate now catches that class of defect before it ships.

The calculation engine is tested against published loan figures and against
the invariants the mathematics requires: a schedule sums to the amount
borrowed, a loan closes at exactly zero, an interest-free balance grows by
the deposits alone, and the period-by-period projection agrees with the
closed-form formula at every compounding frequency.

## Known gaps and next steps

- A second reviewer has not been added; the editorial team page currently
  names the same person as author and reviewer. This is the weakest point in
  the trust story and should be fixed before the site scales.
- Net pay, debt payoff and tax calculators are planned but not built. They
  need reference data with dates, which is a different kind of work from the
  pure-arithmetic tools here.
- The domain, the Cloudflare account and the AdSense account are all still
  outstanding, and they are the only things between this repository and a
  live site.
- The brand and the domain are placeholders. `Calccents` and `calccents.com`
  live in `src/config/site.ts` and change in one place.

## Current state

The repository builds clean and every gate passes: 28 pages, 84 tests, 99.23 %
line coverage over the calculation engine, zero advisory findings, zero broken
links, zero duplicate ids, and no AdSense code in the output.

The site has been checked in a browser at desktop and narrow widths: the
three calculators compute, the results update as the inputs change, the
amortization table fills, and the console is free of errors. The mortgage and
compound interest figures were checked against independently calculated values
and agree to the cent.
