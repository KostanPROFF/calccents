# Components

Project: Calccents — a static Astro site of financial calculators monetised by
display advertising. There is no component library: the site is built from a
small set of hand-written Astro components and one global stylesheet.

- Framework: Astro 7.4.1, `output: 'static'`
- Styling: vanilla CSS with custom properties in `src/styles/global.css`
- UI library: none (deliberate — every kilobyte costs viewability and RPM)
- Interactivity: plain TypeScript in `<script>` blocks, no client framework

## src/components/ResultPanel.astro

The result block on every calculator page. Values ship with placeholders and
ids so the page script can fill them in.

**File:** `src/components/ResultPanel.astro`
**Description:** Headline result figure plus a grid of secondary statistics.
**Key props:** `headlineId`, `headlineLabel`, `headline`, `stats: { id, label, value, tone }[]`, `note`.

```astro
---
interface Stat {
  id: string;
  label: string;
  value: string;
  tone?: 'positive' | 'negative';
}

interface Props {
  headlineId: string;
  headlineLabel: string;
  headline: string;
  stats: Stat[];
  note?: string;
}

const { headlineId, headlineLabel, headline, stats, note } = Astro.props;
---

<div class="result" aria-live="polite">
  <p class="result__label">{headlineLabel}</p>
  <p class="result__headline" id={headlineId}>{headline}</p>
  <div class="stat-grid">
    {
      stats.map((stat) => (
        <div class="stat">
          <p class="stat__label">{stat.label}</p>
          <p
            class={`stat__value${stat.tone ? ` stat__value--${stat.tone}` : ''}`}
            id={stat.id}
          >
            {stat.value}
          </p>
        </div>
      ))
    }
  </div>
  {note && <p class="muted-block" style="margin-top: var(--space-4);">{note}</p>}
</div>
```

## src/components/AdSlot.astro

Renders nothing at all until the AdSense publisher ID and a slot ID exist.
This avoids the "ads on screens without publisher content" rejection reason.

**File:** `src/components/AdSlot.astro`
**Description:** Env-gated Google AdSense display slot.
**Key props:** `slot: 'result' | 'in-article' | 'footer'`.

```astro
---
interface Props {
  slot: 'result' | 'in-article' | 'footer';
}

const { slot } = Astro.props;

const client = import.meta.env.PUBLIC_ADSENSE_CLIENT;
const slotIds = {
  result: import.meta.env.PUBLIC_ADSENSE_SLOT_RESULT,
  'in-article': import.meta.env.PUBLIC_ADSENSE_SLOT_IN_ARTICLE,
  footer: import.meta.env.PUBLIC_ADSENSE_SLOT_FOOTER,
};

const slotId = slotIds[slot];
const enabled = Boolean(client && slotId);
---

{
  enabled && (
    <ins
      class="adsbygoogle"
      data-ad-client={client}
      data-ad-slot={slotId}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}
```

## src/components/AdAdvice.astro

The "what this calculator does not do" block. Structural guardrail against the
site drifting into giving financial advice.

**File:** `src/components/AdAdvice.astro`
**Description:** Warning-toned list of the tool's explicit limits.
**Key props:** `items: string[]`, `title?`.

```astro
---
interface Props {
  items: string[];
  title?: string;
}

const { items, title = 'What this calculator does not do' } = Astro.props;
---

<div class="note note--warning">
  <p class="note__title">{title}</p>
  <ul>
    {items.map((item) => <li>{item}</li>)}
  </ul>
</div>
```

## src/components/SourceList.astro

Numbered list of primary sources for a page. Every guide and every tool
carries one, because the site's YMYL position depends on traceability.

**File:** `src/components/SourceList.astro`
**Description:** Numbered reference list.
**Key props:** `sources: { label, url }[]`, `title?`, `note?`.

```astro
---
interface Props {
  sources: { label: string; url: string }[];
  title?: string;
  note?: string;
}

const { sources, title = 'Sources and assumptions', note } = Astro.props;
---

<section class="section-sm">
  <h2>{title}</h2>
  {
    note && (
      <p class="text-secondary" style="margin-top: var(--space-3); max-width: 68ch;">
        {note}
      </p>
    )
  }
  <ol class="sources" style="margin-top: var(--space-4);">
    {
      sources.map((source, index) => (
        <li>
          <span class="sources__index">[{index + 1}]</span>
          <a href={source.url} rel="nofollow noopener" target="_blank">
            {source.label}
          </a>
        </li>
      ))
    }
  </ol>
</section>
```

## src/components/Faq.astro

**File:** `src/components/Faq.astro`
**Description:** Question and answer list, mirrored into FAQPage JSON-LD.
**Key props:** `items: { q, a }[]`.

```astro
---
interface Props {
  items: { q: string; a: string }[];
}

const { items } = Astro.props;
---

<div class="faq">
  {
    items.map((item) => (
      <div class="faq__item">
        <p class="faq__question">{item.q}</p>
        <p class="faq__answer">{item.a}</p>
      </div>
    ))
  }
</div>
```

## src/components/Newsletter.astro

**File:** `src/components/Newsletter.astro`
**Description:** Buttondown signup form, rendered only when a provider URL is set.
**Key props:** none.

```astro
---
const form = import.meta.env.PUBLIC_BUTTONDOWN_FORM;
---

{
  form && (
    <form class="newsletter" action={form} method="post" target="popupwindow">
      <label class="sr-only" for="newsletter-email">
        Email address
      </label>
      <input
        class="input newsletter__input"
        id="newsletter-email"
        type="email"
        name="email"
        placeholder="you@example.com"
        autocomplete="email"
        required
      />
      <button class="btn btn--primary" type="submit">
        Subscribe
      </button>
    </form>
  )
}
```

## src/config/tools.ts

The registry of published calculators. Tool pages, the tool index, the home
page and structured data all read from this one list.

**File:** `src/config/tools.ts`
**Description:** Single registry of the three calculators.

```ts
export interface ToolDefinition {
  slug: string;
  name: string;
  title: string;
  description: string;
  short: string;
  category: 'Home' | 'Investing';
}

export const TOOLS: ToolDefinition[] = [
  {
    slug: 'mortgage-payment',
    name: 'Mortgage Payment Calculator',
    title: 'Mortgage Payment Calculator with Amortization',
    description:
      'Calculate your monthly mortgage payment, total PITI cost and full amortization schedule. See every dollar of interest and how extra payments move the payoff date.',
    short: 'Monthly P&I, full PITI, amortization schedule and the effect of extra payments.',
    category: 'Home',
  },
  {
    slug: 'rent-vs-buy',
    name: 'Rent vs Buy Calculator',
    title: 'Rent vs Buy Calculator: Compare the Real Cost',
    description:
      'Compare renting and owning on the numbers: monthly cost, upfront outlay, equity and the month the two paths cross over. No verdict, just the arithmetic.',
    short: 'Monthly cost, upfront outlay, equity build-up and the crossover month.',
    category: 'Home',
  },
  {
    slug: 'compound-interest',
    name: 'Compound Interest Calculator',
    title: 'Compound Interest Calculator with Monthly Contributions',
    description:
      'Project a balance with regular contributions, choose the compounding frequency, and see the result in today’s dollars after inflation. Formulas shown.',
    short: 'Balance, contributions, interest earned and the inflation-adjusted value.',
    category: 'Investing',
  },
];
```
