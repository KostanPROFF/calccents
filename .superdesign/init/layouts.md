# Layouts

## src/layouts/Base.astro

The root layout. Every page renders through it. It owns the document head,
the metadata, the structured data, the analytics snippets and the ad loader
script (loaded last, so it finds every ad unit already parsed in the DOM).

**File:** `src/layouts/Base.astro`
**Description:** Document shell — head, metadata, nav, main, footer, ad loader.

```astro
---
import { SITE } from '../config/site.ts';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description: string;
  path: string;
  jsonLd?: Record<string, unknown>[];
  ogType?: 'website' | 'article';
  noindex?: boolean;
}

const {
  title,
  description,
  path,
  jsonLd = [],
  ogType = 'website',
  noindex = false,
} = Astro.props;

const canonical = new URL(path, SITE.origin).toString();
const fullTitle = path === '/' ? `${SITE.name} — ${SITE.tagline}` : `${title} | ${SITE.name}`;

const adsenseClient = import.meta.env.PUBLIC_ADSENSE_CLIENT;
const gaId = import.meta.env.PUBLIC_GA_ID;
---

<!doctype html>
<html lang={SITE.lang}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{fullTitle}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    {noindex && <meta name="robots" content="noindex, nofollow" />}

    <meta property="og:type" content={ogType} />
    <meta property="og:site_name" content={SITE.name} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />

    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="sitemap" href="/sitemap-index.xml" />

    {
      jsonLd.map((schema) => (
        <script type="application/ld+json" set:html={JSON.stringify(schema)} />
      ))
    }

    {
      gaId && (
        <script
          is:inline
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        />
      )
    }
    {
      gaId && (
        <script is:inline
          set:html={`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
        />
      )
    }
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    <Nav currentPath={Astro.url.pathname} />
    <main id="main">
      <slot />
    </main>
    <Footer />

    {
      adsenseClient && (
        <script
          is:inline
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
          crossorigin="anonymous"
        />
      )
    }
  </body>
</html>
```

## src/components/Nav.astro

Sticky top navigation. Marked `aria-current` on the active section.

**File:** `src/components/Nav.astro`
**Description:** Sticky header with brand mark and primary links.

```astro
---
import { SITE } from '../config/site.ts';

interface Props {
  currentPath: string;
}

const { currentPath } = Astro.props;

function isCurrent(href: string): boolean {
  if (href === '/') return currentPath === '/';
  return currentPath.startsWith(href);
}
---

<header class="site-header">
  <div class="container site-header__inner">
    <a class="brand" href="/">
      <span class="brand__mark" aria-hidden="true">C</span>
      {SITE.name}
    </a>
    <nav class="site-nav" aria-label="Primary">
      {
        SITE.nav.map((item) => (
          <a href={item.href} aria-current={isCurrent(item.href) ? 'page' : undefined}>
            {item.label}
          </a>
        ))
      }
    </nav>
  </div>
</header>
```

## src/components/Footer.astro

Four-column footer: brand, calculators, site links, and the standing
disclaimer that the site publishes calculations rather than advice.

**File:** `src/components/Footer.astro`
**Description:** Site footer with navigation and the non-advice disclaimer.

```astro
---
import { SITE } from '../config/site.ts';
---

<footer class="site-footer">
  <div class="container">
    <div class="site-footer__grid">
      <div>
        <a class="brand" href="/">
          <span class="brand__mark" aria-hidden="true">C</span>
          {SITE.name}
        </a>
        <p class="text-sm text-muted" style="margin-top: var(--space-3); max-width: 34ch;">
          {SITE.tagline}. Every formula is written out, every assumption belongs
          to you.
        </p>
      </div>
      <div>
        <h2>Calculators</h2>
        <ul>
          <li><a href="/tools/mortgage-payment/">Mortgage payment</a></li>
          <li><a href="/tools/rent-vs-buy/">Rent vs buy</a></li>
          <li><a href="/tools/compound-interest/">Compound interest</a></li>
        </ul>
      </div>
      <div>
        <h2>Site</h2>
        <ul>
          {
            SITE.footer
              .filter((item) => !item.href.startsWith('/tools/'))
              .map((item) => (
                <li>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))
          }
        </ul>
      </div>
    </div>
    <p class="site-footer__note">
      {SITE.name} publishes calculations and explanations, not financial advice.
      The tools show the arithmetic behind a number and the assumptions behind
      the arithmetic. They do not evaluate your situation and they do not
      recommend a course of action. Every figure a tool produces depends on the
      inputs you supply — read the assumptions before you rely on any result.
      © {SITE.founded}–{new Date().getFullYear()} {SITE.name}.
    </p>
  </div>
</footer>
```

## src/components/ToolShell.astro

The frame every calculator page shares: breadcrumb, heading, review line, the
two column calculator area (form left, result right), the method, the limits,
the sources, related guides and the FAQ.

**File:** `src/components/ToolShell.astro`
**Description:** Shared page structure for all three calculators.
**Key props:** `tool`, `faq`, `sources`, `limits`, `reviewedOn`, `relatedGuides`, `methodNote`.
**Slots:** `calculator` (the form), `result` (the result panel), `method` (the explanation).

```astro
---
import Base from '../layouts/Base.astro';
import AdSlot from './AdSlot.astro';
import AdAdvice from './AdAdvice.astro';
import SourceList from './SourceList.astro';
import Faq from './Faq.astro';
import { SITE } from '../config/site.ts';
import type { ToolDefinition } from '../config/tools.ts';

interface Props {
  tool: ToolDefinition;
  faq: { q: string; a: string }[];
  sources: { label: string; url: string }[];
  limits: string[];
  reviewedOn: string;
  relatedGuides?: { slug: string; title: string }[];
  methodNote?: string;
}

const { tool, faq, sources, limits, reviewedOn, relatedGuides = [], methodNote } = Astro.props;
const path = `/tools/${tool.slug}/`;
---
```

The page body order is fixed: `.page-head` → `.tool-layout` (calculator + result
panel) → "How this is calculated" → limits block → in-article ad → sources →
related guides → FAQ → footer ad.
