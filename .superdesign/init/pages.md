# Pages

Dependency trees for the pages that exist in the codebase. Traced
recursively through local imports.

## / (Home page)

Entry: `src/pages/index.astro`
Dependencies:
- `src/layouts/Base.astro`
  - `src/components/Nav.astro`
    - `src/config/site.ts`
  - `src/components/Footer.astro`
    - `src/config/site.ts`
  - `src/styles/global.css`
- `src/components/AdSlot.astro`
- `src/components/Newsletter.astro`
- `src/config/tools.ts`

Renders: a headline, the three calculators as tiles, a short "how this works"
block, an index of guides, and one advertising slot.

## /tools/mortgage-payment/ (primary tool page)

Entry: `src/pages/tools/mortgage-payment.astro`
Dependencies:
- `src/components/ToolShell.astro`
  - `src/layouts/Base.astro`
    - `src/components/Nav.astro`
    - `src/components/Footer.astro`
    - `src/styles/global.css`
  - `src/components/AdSlot.astro`
  - `src/components/AdAdvice.astro`
  - `src/components/SourceList.astro`
  - `src/components/Faq.astro`
  - `src/config/site.ts`
  - `src/config/tools.ts`
- `src/components/ResultPanel.astro`
- `src/lib/calc/mortgage.ts`
  - `src/lib/calc/money.ts`

Renders: the calculator form (principal, rate, term, tax, insurance, HOA,
extra payment) on the left, a sticky result panel on the right with the
monthly payment as the headline and a grid of secondary figures, then the
method, the limits block, sources, related guides and the FAQ.

## /tools/rent-vs-buy/

Entry: `src/pages/tools/rent-vs-buy.astro`
Dependencies:
- `src/components/ToolShell.astro` (as above)
- `src/components/ResultPanel.astro`
- `src/lib/calc/rentVsBuy.ts`
  - `src/lib/calc/money.ts`
  - `src/lib/calc/mortgage.ts`
    - `src/lib/calc/money.ts`

Renders: price, down payment, rate, term, rent, tax, insurance, HOA,
maintenance, appreciation, selling and closing cost inputs; the result panel
shows both monthly costs, the upfront outlay, the equity built up and the
crossover month.

## /tools/compound-interest/

Entry: `src/pages/tools/compound-interest.astro`
Dependencies:
- `src/components/ToolShell.astro` (as above)
- `src/components/ResultPanel.astro`
- `src/lib/calc/compound.ts`
  - `src/lib/calc/money.ts`

Renders: starting balance, monthly contribution, rate, years, compounding
frequency, inflation and contribution timing; the result panel shows the
future value, the interest earned and the inflation-adjusted value.

## /guides/<slug>/ (guide template)

Entry: `src/pages/guides/[...slug].astro`
Dependencies:
- `src/layouts/Base.astro`
  - `src/components/Nav.astro`
  - `src/components/Footer.astro`
  - `src/styles/global.css`
- `src/components/AdSlot.astro`
- `src/components/Faq.astro`
- `src/content.config.ts`
- `src/config/site.ts`
- `src/config/tools.ts`

Renders: title, review line, the MDX body inside `.prose`, a source list, the
FAQ from frontmatter, related tools and advertising slots.
