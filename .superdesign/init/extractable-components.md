# Extractable components

Components that appear on more than one page, or that define a shared UI
pattern, and are therefore worth extracting as reusable Superdesign
`DraftComponent` entities.

## NavBar

- Source: `src/components/Nav.astro`
- Category: layout
- Description: Sticky top navigation with the brand mark and the primary links.
- Extractable props: `currentPath` (string, default: "/") — marks the active
  section with `aria-current="page"`.
- Hardcoded: the brand mark glyph "C", the site name, the link labels
  (Tools, Guides, Sources, About), all CSS classes.

## Footer

- Source: `src/components/Footer.astro`
- Category: layout
- Description: Site footer with the brand block, the calculator links, the site
  links and the standing non-advice disclaimer.
- Extractable props: none.
- Hardcoded: the three calculator link labels and hrefs, the disclaimer
  paragraph, all CSS classes.

## ToolShell

- Source: `src/components/ToolShell.astro`
- Category: layout
- Description: The shared frame of a calculator page — breadcrumb, heading,
  review line, two column calculator area, method, limits, sources, FAQ.
- Extractable props: `tool` (object with name, title, description),
  `reviewedOn` (string), `relatedGuides` (array).
- Hardcoded: the section headings "How this is calculated", "Common questions",
  the "Sources and assumptions" block, the disclaimer slot placement, all CSS
  classes.
- Note: the calculator and result panels are slots, so the extracted component
  provides the frame only.

## AdSlot

- Source: `src/components/AdSlot.astro`
- Category: layout
- Description: Env-gated advertising slot. Renders nothing until the AdSense
  publisher ID and slot ID are configured.
- Extractable props: `slot` (string: "result" | "in-article" | "footer").
- Hardcoded: the `ins.adsbygoogle` markup and its data attributes, all CSS.

## ResultPanel

- Source: `src/components/ResultPanel.astro`
- Category: layout
- Description: Headline result figure and a grid of secondary statistics for a
  calculator page.
- Extractable props: `headlineLabel` (string), `stats` (array of
  `{ id, label, value, tone }`).
- Hardcoded: the `.result`, `.stat-grid`, `.stat` markup, all CSS.

## Faq

- Source: `src/components/Faq.astro`
- Category: layout
- Description: Question and answer list used on tool pages and guides.
- Extractable props: `items` (array of `{ q, a }`).
- Hardcoded: the `.faq`, `.faq__item` markup, all CSS.

## SourceList

- Source: `src/components/SourceList.astro`
- Category: layout
- Description: Numbered list of primary sources with an optional intro note.
- Extractable props: `sources` (array of `{ label, url }`), `title` (string).
- Hardcoded: the "Sources and assumptions" section heading, the `[n]` index
  styling, all CSS.

## Newsletter

- Source: `src/components/Newsletter.astro`
- Category: layout
- Description: Email signup form. Renders nothing when no provider is set.
- Extractable props: none.
- Hardcoded: the field label, the placeholder, the "Subscribe" button label,
  all CSS.

## Basic components (inline, not extracted)

Button, input field, tile card, note block, badge, breadcrumb, table — these
are simple enough that inlining them in a draft produces a better result than
extracting them.
