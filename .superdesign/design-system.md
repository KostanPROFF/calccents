# Design system — Calccents

## Product context

Calccents publishes free financial calculators that show their work. The site
exists to earn revenue from display advertising, which shapes almost every
design decision: a page that loads fast and keeps the reader on it produces
more ad impressions, and ad impressions are the only revenue line.

**Audience.** A person with a number to work out — a mortgage payment, a
monthly cost of owning versus renting, a balance after years of
contributions. They arrive from a search engine, they are in a hurry, and
they want a figure, not a lecture. A secondary audience reads the guides
after getting their answer.

**Jobs to be done.**
1. "I need this number and I need to trust it." → the tool shows the formula
   and the assumptions, and states plainly what it does not do.
2. "I want to understand the arithmetic." → the method section and the guides.
3. "I want to come back when my numbers change." → the newsletter, the
   review dates, the stable URLs.

**What the site is not.** It is not a brokerage, not a lead-generation site
and not an advice column. There is no "recommended lender" and no "should you
buy". The calculators compute, and the writing explains the computation.

## Key pages

| Page | Purpose |
|---|---|
| `/` | Entry point: what the site does, the three calculators, how the site works |
| `/tools/` | Index of the calculators |
| `/tools/<slug>/` | The calculator itself — the only pages that carry the revenue |
| `/guides/<slug>/` | Long-form explanation, the traffic and citation engine |
| `/sources/`, `/editorial-team/`, `/about/`, `/contact/`, `/privacy/`, `/terms/` | Trust and housekeeping |

## Architecture and layout

- Container: 1120px max, 20px inline padding. Prose (guides) caps at 720px.
- The calculator page is a two column split: **form on the left (1.15fr)**,
  **result panel on the right (0.85fr)**, collapsing to a single column below
  940px. The result panel is sticky at the top of the page so the figure stays
  visible while the reader changes inputs.
- Page order on a tool page: breadcrumb → eyebrow-free H1 → lede → review
  line → calculator + result → "How this is calculated" → limits block →
  in-article ad → sources → related guides → FAQ → footer ad.
- The limits block ("What this calculator does not do") always sits directly
  under the method, in amber, before any advertising.

## Branding and styling

Dark, minimal, high-contrast. The reference feel is Linear and Vercel: a
near-black canvas, hairline borders, one accent, almost no shadow, generous
whitespace, and a single number per screen that is allowed to be large.

**Colour.** Full token values are in `.superdesign/init/theme.md`. In short:
background `#08090a`, cards `#0f1113`, raised surfaces `#16181b`, borders
`#23262a`, text `#f3f5f6` / `#9aa2a8` / `#6b7379`, accent `#6e8fff`, positive
`#4ade80`, negative `#f87171`, warning `#fbbf24`.

**Type.** Inter Variable, self-hosted. Headings 600 weight with `-0.02em`
tracking. Numbers are always `tabular-nums` so columns align. Scale runs
0.75 → 2.75rem.

**Surfaces.** Separated by a one-pixel border and a small change in
background lightness — never by a heavy shadow.

**Results.** The headline figure is the largest thing on the page: 1.75rem,
weight 650, `-0.03em` tracking, tabular figures. Secondary figures sit in a
grid of inset tiles, label above value, label in uppercase 0.75rem muted.

**Advertising.** A reserved 90px band, centred, one per region, never more
than three per page.

## Motion

Transitions are 140ms on `cubic-bezier(.4, 0, .2, 1)` and limited to colour,
border and background changes. Tiles lift by 1px on hover. All motion is
disabled under `prefers-reduced-motion: reduce`. There is no animation on
result values: the number simply changes, because a counting animation delays
the answer the reader came for.

## Specific project requirements

- **Every page states its limits.** The amber limits block is part of the
  template, not optional.
- **Every page carries sources.** A numbered list, with real primary sources
  (CFPB, IRS, Freddie Mac, HUD, BLS, SEC).
- **Every page carries a review line** — last reviewed date, reviewer name
  linked to the editorial team page.
- **No cookie banner is needed** because the primary analytics is cookie-less
  Cloudflare Web Analytics and Google Analytics is off by default.
- **The calculator works without JavaScript for reading.** The formula, the
  assumptions and the sources are static HTML; only the arithmetic needs JS.
- **No client framework.** The calculators are plain TypeScript, roughly 5–10
  KB per page, so the page stays fast enough to convert and to keep
  viewability.
