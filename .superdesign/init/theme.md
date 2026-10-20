# Theme

## Part 1 — Compact token summary

Dark, minimal, high-contrast. One accent (indigo-blue), one positive (green),
one negative (red), one warning (amber). Near-black backgrounds, hairline
borders, almost no shadow.

**Colour palette**

| Token | Value | Use |
|---|---|---|
| `--bg` | `#08090a` | Page background |
| `--surface` | `#0f1113` | Cards, panels |
| `--surface-raised` | `#16181b` | Elevated cards, result panel, table header |
| `--surface-inset` | `#0b0c0e` | Input fields, stat tiles |
| `--border` | `#23262a` | Default border |
| `--border-subtle` | `#1a1d20` | Hairline separators |
| `--border-strong` | `#34383d` | Hover borders, inputs |
| `--text` | `#f3f5f6` | Primary text |
| `--text-secondary` | `#9aa2a8` | Body copy, labels |
| `--text-muted` | `#6b7379` | Captions, meta |
| `--accent` | `#6e8fff` | Links, primary button, focus ring |
| `--accent-hover` | `#8aa3ff` | Hover state |
| `--positive` | `#4ade80` | Favourable figures |
| `--negative` | `#f87171` | Unfavourable figures |
| `--warning` | `#fbbf24` | Limits block, warnings |

**Typography**

- Family: `Inter Variable` (self-hosted, `@fontsource-variable/inter`), fallback `ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto`.
- Mono: `ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas`.
- Scale (rem): `--text-xs` 0.75 · `--text-sm` 0.875 · `--text-base` 1 · `--text-lg` 1.125 · `--text-xl` 1.375 · `--text-2xl` 1.75 · `--text-3xl` 2.25 · `--text-4xl` 2.75
- Line height: tight 1.2 (headings) · snug 1.4 (lede) · normal 1.65 (body)
- Headings: weight 600, `letter-spacing: -0.02em`, balanced wrapping.
- Numbers: `font-variant-numeric: tabular-nums` everywhere a figure appears.

**Spacing** — 4px base: `--space-1` 0.25rem · `--space-2` 0.5 · `--space-3` 0.75 · `--space-4` 1 · `--space-5` 1.25 · `--space-6` 1.5 · `--space-8` 2 · `--space-10` 2.5 · `--space-12` 3 · `--space-16` 4 · `--space-20` 5

**Radii** — `--radius-sm` 6px · `--radius-md` 10px · `--radius-lg` 14px · `--radius-full` 999px

**Shadows** — `--shadow-sm` `0 1px 2px rgba(0,0,0,.4)` · `--shadow-md` `0 4px 16px rgba(0,0,0,.35)` · `--shadow-lg` `0 12px 40px rgba(0,0,0,.45)`

**Layout** — `--container-max` 1120px · `--prose-max` 720px · tool layout `1.15fr / 0.85fr` collapsing to one column under 940px

**Breakpoints** — 720px (footer, mobile nav) · 940px (tool layout)

**Motion** — `--transition` 140ms `cubic-bezier(.4,0,.2,1)`; all animation disabled under `prefers-reduced-motion`.

## Part 2 — Raw source

### src/styles/global.css

Full stylesheet lives at `src/styles/global.css` (about 900 lines). The token
block above is authoritative for the design; the key component rules are
reproduced here.

```css
:root {
  --bg: #08090a;
  --surface: #0f1113;
  --surface-raised: #16181b;
  --surface-inset: #0b0c0e;
  --border: #23262a;
  --border-subtle: #1a1d20;
  --border-strong: #34383d;
  --text: #f3f5f6;
  --text-secondary: #9aa2a8;
  --text-muted: #6b7379;
  --accent: #6e8fff;
  --accent-hover: #8aa3ff;
  --accent-subtle: rgba(110, 143, 255, 0.12);
  --positive: #4ade80;
  --negative: #f87171;
  --warning: #fbbf24;
  --font-sans: 'Inter Variable', 'Inter', ui-sans-serif, system-ui, -apple-system,
    'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  --text-xs: 0.75rem;  --text-sm: 0.875rem; --text-base: 1rem;
  --text-lg: 1.125rem; --text-xl: 1.375rem; --text-2xl: 1.75rem;
  --text-3xl: 2.25rem; --text-4xl: 2.75rem;
  --radius-sm: 6px; --radius-md: 10px; --radius-lg: 14px; --radius-full: 999px;
  --container-max: 1120px; --prose-max: 720px;
  --transition: 140ms cubic-bezier(0.4, 0, 0.2, 1);
}

body {
  background-color: var(--bg);
  color: var(--text);
  font-family: var(--font-sans);
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
}

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
}

.btn {
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-strong);
  background: var(--surface-raised);
  font-size: var(--text-sm);
  font-weight: 500;
}

.btn--primary {
  background: var(--accent);
  border-color: var(--accent);
  color: #05070f;
  font-weight: 600;
}

.input {
  padding: var(--space-3) var(--space-4);
  background: var(--surface-inset);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-variant-numeric: tabular-nums;
}

.result {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface-raised);
  padding: var(--space-6);
}

.result__headline {
  font-size: var(--text-2xl);
  font-weight: 650;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
}

.stat {
  padding: var(--space-4);
  background: var(--surface-inset);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
}

.stat__value--positive { color: var(--positive); }
.stat__value--negative { color: var(--negative); }

.tool-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  gap: var(--space-8);
  align-items: start;
}

.prose p, .prose li { color: var(--text-secondary); }
.prose h2 { margin-top: var(--space-12); font-size: var(--text-xl); }
```

### Design system notes

- No Tailwind, no CSS-in-JS, no CSS modules: one global stylesheet, tokens as
  custom properties, component classes named by role (`.card`, `.tile`,
  `.stat`, `.result`, `.note`).
- Every figure uses `tabular-nums` so columns of numbers align.
- The site never uses a drop shadow to separate surfaces; it uses a one-pixel
  border and a small change in background lightness.
