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
├─ config/tools.ts         registry of the six calculators
├─ content.config.ts       Zod schema for the guides collection
├─ content/guides/         18 guides × 3 languages
│  ├─ *.mdx                English, at the root
│  ├─ ru/*.mdx             Russian
│  └─ es/*.mdx             Spanish
├─ i18n/
│  ├─ locales.ts           the locale list, path helpers, date formatting
│  ├─ guides.ts            reading the guides collection by language
│  └─ ui/{en,ru,es}.ts     every user-visible string, one file per language
├─ lib/calc/               calculation engine + unit tests
├─ lib/client/dom.ts       browser helpers used by the page scripts
├─ lib/client/chart.ts     chart geometry, no DOM
├─ lib/client/chartView.ts the SVG a chart is drawn into
├─ components/             AdSlot, ToolShell, ResultPanel, Faq, SourceList, …
├─ components/pages/       the page bodies, one component per page
├─ components/tools/       the six calculator forms
├─ components/visuals/     the illustrations and the hero picture
functions/api/contact.ts   the endpoint the contact form posts to
worker/src/                the mailer worker, and the rules it checks
wrangler.toml              the Pages project: build output and the binding
├─ layouts/Base.astro      document shell
├─ pages/                  routes
│  ├─ *.astro              English, at the root
│  ├─ ru/**                Russian
│  └─ es/**                Spanish
└─ styles/global.css       design tokens and every component style

scripts/
├─ lint-advisory.ts        YMYL guardrail, plus its own test suite
├─ check-links.ts          internal link resolution
├─ check-ads.ts            AdSense gating, both directions
├─ check-consent.ts        consent gating: no tracker before the answer
├─ check-dom-ids.ts        duplicate id detection in the built HTML
└─ og-image.html           the source of the social card
```

## Languages

The site is published in English, Russian and Spanish. English is the source
language and lives at the root of the site, so every existing link keeps
working; the other two live under `/ru/` and `/es/`.

Astro's i18n routing expects the folder structure to match the URL structure,
so the pages are not dynamic: `src/pages/about.astro` and
`src/pages/ru/about.astro` are both thin wrappers around the same component
with a different `locale`. `src/pages/ru/guides/[...slug].astro` collects the
Russian guides and nothing else.

Two rules keep this honest:

- **Every reader-visible string lives in a dictionary.** `src/i18n/ui/en.ts`
  is the reference, and `ru.ts` and `es.ts` have to match it key for key.
  A renamed or missing key is a type error, not a blank space on the page.
- **The guides are files.** A guide is an article, so it has its own file per
  language, in `src/content/guides/<locale>/`. The URL segment is the same
  in every language, which is what lets the language switcher keep a reader
  on the same guide.

Dates follow the language of the page. Currency does not: the site calculates
in US dollars, so every figure is written the same way in every language, and
a number that reads differently on two pages of one site is a number nobody
can check.

The YMYL guardrail has a rule set per language. A linter that only knew
English would pass a Russian guide full of "вы должны покупать" without a
word, so `scripts/lint-advisory.ts` carries English, Russian and Spanish
rules, each with its own negation list, and each pinned by tests.

## Content model

Every guide carries frontmatter that is validated at build time. A guide
without a source, without a review date or without a named author fails the
build rather than shipping.

```yaml
title: string            # 10–60 characters
description: string      # 140–160 characters in English, 60–200 in the others
locale: 'en' | 'ru' | 'es'
date: date
lastReviewed: date       # cannot be in the future
author: string           # a name from src/config/people.ts
reviewedBy: string       # a name from src/config/people.ts
group: 'home' | 'renting' | 'investing'
readingMinutes: number
sources:                 # at least one, each with a label and a URL
  - label: string
    url: string
relatedTools: string[]   # tool slugs
faq:                     # 5–8 pairs
  - q: string
    a: string
```

The description length rule is stricter for English than for the
translations. The 140 to 160 character window is a search-result rule written
for English, and holding a Russian description to the same number of
characters would push the translator into writing worse sentences.

## Environment variables

Copy `.env.example` to `.env`. Every variable is public and is embedded in
the shipped HTML; no secret belongs in this file.

| Variable | Effect when unset |
|---|---|
| `PUBLIC_ADSENSE_CLIENT` | No ad markup is shipped at all — the slots render nothing |
| `PUBLIC_ADSENSE_SLOT_RESULT` / `_IN_ARTICLE` / `_FOOTER` | The corresponding slot stays empty |
| `PUBLIC_GA_ID` | Overrides the Google Analytics measurement ID from the config; the tag loads either way |
| `PUBLIC_BUTTONDOWN_FORM` | The newsletter form is not rendered |

The ad slots are env-gated on purpose. An `<ins>` element on a page that has
no publisher content behind it is one of the reasons a site gets rejected by
AdSense, and the site has to be live before AdSense will even review it.

## Deployment

The build runs in GitHub Actions and the finished `dist/` is uploaded to
Cloudflare Pages with `wrangler`. Cloudflare never builds the site itself, so
its own project settings stay empty — every variable lives in GitHub.

1. Create a free Cloudflare account.
2. Add two GitHub repository **secrets**: `CLOUDFLARE_API_TOKEN` and
   `CLOUDFLARE_ACCOUNT_ID`.
3. Push to `main`. The workflow verifies the build, creates the Cloudflare
   Pages project `calccents` if it does not exist yet, deploys the mailer
   worker and then deploys the site.

Until those two secrets exist, the deploy step is skipped and the pipeline
reports why; the rest of CI still runs. The first push after the secrets are
added deploys on its own, with no further action.

The site itself is static, so there is no server to run, patch or pay for.
Two small pieces move: the Pages Function that receives the contact form and
the worker that sends the mail. Both are Cloudflare's own runtime and both
are deployed by the same workflow. Rollback is a matter of promoting an
earlier deployment from the Cloudflare Pages dashboard.

### Cloudflare Web Analytics

Cloudflare's Web Analytics is switched on for the zone, and the automatic
setup in the dashboard is off: Cloudflare no longer adds its beacon to the
pages it serves, and the site installs the snippet itself. That snippet is
loaded by the consent bootstrap, after the answer, with the site token from
`src/config/site.ts`.

The code that takes an automatically added beacon out of the document is
still on every page. It costs nothing and it covers the case where the
dashboard setting is turned back on: a script that is removed before it
runs does not run, so the page view would still wait for the answer.

The beacon reports to Cloudflare's own analytics service, at
`cloudflareinsights.com/cdn-cgi/rum`, which answers with the CORS headers
this domain needs. The configuration is the one Cloudflare's dashboard
hands out for a manual installation: the site token and nothing else. It
must not carry the `version` field. That field points the beacon at the
site's own `/cdn-cgi/rum` endpoint instead, and that endpoint answers 404
while the automatic setup in the dashboard is off, so the page view would
be counted nowhere. `scripts/check-consent.ts` fails the build if the
field comes back.

The beacon sets no cookie, writes nothing to local storage and creates no
identifier, and the IP address it carries is used at the edge to work out
the country and is discarded there. It is still a third party that receives
a request from every visitor who accepts, so the privacy policy names it in
all three languages.

Two gates watch this:

- `scripts/check-consent.ts` checks that the policy still names the
  provider, that the beacon URL is in the source, that the beacon is not in
  the document as a script tag, that the code which removes an injected
  beacon is still on every page, and that the beacon configuration does not
  carry the `version` field.
- `scripts/check-edge-analytics.ts` asks the live site for a page the way a
  browser does and reports whether Cloudflare is still adding its own
  beacon. It is the only way to see this from the outside, because
  Cloudflare leaves the beacon out of the page for anything that does not
  look like a browser navigation.

The automatic setup in the Cloudflare dashboard is off, and the site
installs the snippet itself, so nothing is downloaded before the answer.

### The domain

The site lives at **https://calccents.com**. The domain zone and the Pages
project are in the same Cloudflare account, so `.github/workflows/attach-domain.yml`
sets the whole thing up:

```bash
gh workflow run attach-domain.yml -f domain=calccents.com
```
It attaches the apex domain to the Pages project, creates the CNAME to the
project's `pages.dev` hostname if it is missing, points `www` at the apex and
waits for the domain to answer with a 200.

Two things about that workflow are worth knowing:

- The Pages attach API registers the custom domain but does not create the
  DNS record. Without the record the domain sits in `initializing` forever,
  which is why the workflow creates the CNAME itself.
- Cloudflare Pages answers `522` for a hostname the project does not know, so
  `www` has to be attached to the project too, not only pointed at it.

The workflow also tries to create a 301 redirect from `www` to the apex. That
call needs a token with the zone rulesets permission; with the Pages and DNS
permissions alone it is skipped, and the site is served at both addresses
instead. The canonical tag on every page points at the apex either way.

### The contact address

`hello@calccents.com` is the address the contact page and the structured
data publish. It is not a placeholder: Cloudflare Email Routing is enabled on
the zone, and a rule forwards mail for that address to
`info@constantinecs.com`, a real mailbox. The catch-all rule is off, so
nothing but the addresses named here can reach the site.

The chain, in the order a message takes it:

| Layer | What it is |
|---|---|
| MX | `route1/2/3.mx.cloudflare.net` |
| SPF | `include:_spf.mx.cloudflare.net` |
| Routing | `hello@calccents.com` → `info@constantinecs.com` |
| Destination | A mailbox on Purelymail, verified in 2024 |

`gh workflow run setup-email.yml` reports all of it, and adds a destination
address when one is needed.

Email Routing only receives. A reply to a reader therefore goes out from the
addressing domain rather than from `calccents.com`. Adding `calccents.com` to
the existing Purelymail account would give the site a mailbox that both sends
and receives under its own name.

## The contact form

The contact page carries a form that sends the message by email. The path a
message takes, and the reason it is built this way:

| Step | What it is |
|---|---|
| The page | `src/components/ContactForm.astro` posts to `/api/contact` |
| The endpoint | `functions/api/contact.ts` checks the request and forwards it |
| The mailer | `worker/src/index.ts` sends the mail |
| The binding | `send_email`, authorised by the account |

The important part is what is **not** in that chain. There is no API token in
the repository, none in the Pages project and none to rotate: the
`send_email` binding is authorised by the account itself, and the Pages
project reaches the worker over a service binding rather than over the
internet.

The worker is private. Its `workers.dev` route is switched off in
`worker/wrangler.toml`, so the only way to reach it is the binding from the
Pages project, and the binding is pinned to one destination address
(`info@constantinecs.com`) and one sender address (`hello@calccents.com`).
The worker cannot be used to send mail anywhere else, even if somebody finds
a way to make it run.

What the message goes through, in order:

- the fields have to be present and within their length limits
- the email address has to look like an email address
- a hidden field a person cannot fill has to stay empty, and a filled one is
  answered as though it worked, so a robot learns nothing
- a line break cannot be smuggled into a subject or a name, because those
  end up in a mail header
- one address may send two messages a minute, which stops a script from
  filling the mailbox and does not stop a person writing twice

The form works without JavaScript as well: it is a real form, and the
endpoint answers with a page saying the message was sent. With JavaScript the
answer arrives on the page, in the language of the page. The privacy page
says what the form does with what is typed into it, in all three languages.

## ads.txt

The site declares who is allowed to sell its advertising inventory:

```
google.com, pub-5321511632415174, DIRECT, f08c47fec0942fa0
```

It lives at `public/ads.txt` and is served as `/ads.txt`. AdSense reads it
to confirm that Google is an authorised seller for this publisher, and the
AdSense dashboard reports on the file separately from the review: a site
without it shows "ads.txt not found", which is a missing declaration rather
than a defect.

The line has to name the publisher account the site belongs to, and it has
to match the ownership tag in the head. The ad gate checks that it does, so
the file cannot silently drift away from the account: it reads the publisher
ID out of the built page rather than from the environment, because the
environment overrides the client for CI builds with dummy IDs.

## Turning on advertising

The AdSense account exists and the publisher ID is
`ca-pub-5321511632415174`. It is recorded in `src/config/site.ts` and used in
two places in every page head: the ownership tag AdSense checks when it
reviews the application, and the loader script it asks for.

```html
<meta name="google-adsense-account" content="ca-pub-5321511632415174" />
<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5321511632415174"
  crossorigin="anonymous"
></script>
```

The loader script is what turns on **auto ads**: Google decides where the
units go and places them itself. The site therefore makes an ad request on
every page, once the reader has answered the cookie question, and it shows
no ad until the account is approved.

The site also has three hand-placed positions: one in the result panel, one
in the article, one at the foot of the page. They are a second mechanism,
separate from auto ads, and they render nothing until their slot IDs are
configured. To use them:

1. Create three display ad units in the AdSense dashboard: one for the
   result panel, one for the in-article position, one for the footer. Note
   each slot ID.
2. **Turn auto ads off in the dashboard.** A page carrying auto ads and
   hand-placed units at the same time has twice as many ads as it should,
   and that is the kind of thing that lowers the click-through rate rather
   than raising it.
3. Set the three slot IDs as GitHub repository **variables** — not secrets,
   because every one of them is embedded in the public HTML:

   ```bash
   gh variable set PUBLIC_ADSENSE_SLOT_RESULT      --body "<slot id>"
   gh variable set PUBLIC_ADSENSE_SLOT_IN_ARTICLE  --body "<slot id>"
   gh variable set PUBLIC_ADSENSE_SLOT_FOOTER      --body "<slot id>"
   ```

4. Push anything. The deploy job builds with the variables, runs
   `check-ads.ts --auto` against the build that is about to ship, and
   publishes it.

`PUBLIC_ADSENSE_CLIENT` is not needed. The publisher ID is in the config
with the name and the domain, and the variable is only an override for the
CI build that uses dummy IDs.

The loader itself is not a script tag in the page. The consent component
injects it once the reader has agreed to cookies, so the ad units stay
hidden until then and a reader who declines never sends a request to
Google.

**The crawler exception.** Google's own crawler reviews the site for
advertising. It renders the page but it cannot answer a cookie question, so
on a site where the advertising only loads after a click it sees no
advertising at all — which is one of the commonest reasons an application is
turned down. The consent bootstrap therefore recognises a crawler user agent
and gives it the ad script straight away, with no banner and without the
analytics. It is not a reader: no choice is recorded for it and nothing is
stored about it. `check-consent.ts` checks that this branch is still there,
because a site that passes every other gate and shows the reviewer an empty
page is exactly the failure this guards against. The privacy page says so in
all three languages.

The automatic gate is the part that matters. It reads the three slot
variables and works out what the build should contain: all three set means
the hand-placed units are rendered, none set means they are not, and some
but not all stops the deploy. The gate also checks that the units point at
the same publisher account as the loader script, because a mismatch there
serves ads from an account that is not this site's and the symptom is an
empty box rather than an error.

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

## The pictures

The site carries no raster images except the social card. Everything else is
inline SVG, and there are three kinds of it.

**The card illustrations.** Every calculator card and every guide has a
picture: an abstract chart that shows the shape of the arithmetic the tool
does — an amortisation curve for the mortgage, two crossing lines for rent
against ownership, a rising curve for compound interest, a bar split into its
deductions for take-home pay, a stack of brackets for the tax, two orders of
bars for the debt payoff. They live in `src/components/visuals/` and are
drawn from the theme variables, so they follow the light and the dark theme
and cost no request.

The guides index is a grid of cards rather than a list of rows, and each card
carries the picture of the guide it links to, so the index reads as a set of
pictures first and a list of titles second.

All eighteen drawings share one house style, and it is deliberately busier than
a single line on an empty rectangle: a faint grid, a row of dim background
columns, a baseline, a gradient fill under the main curve, one dashed second
series, an accent dot on the point that matters and a scatter of quiet data
points. The drawings carry no text and no numbers, because a number on a
picture is a claim, and a claim we cannot check does not belong on the page.

A guide carries three of them: one under the title, and two more inside the
text, placed before the second and the fourth section, each on the subject
the guide is talking about at that point. The picture under the title is
named by the guide itself in the frontmatter, so the drawing and the text it
belongs to cannot drift apart: renaming a guide file means renaming the
picture as well, and the build fails if they disagree.

**The result charts.** Each calculator draws a chart under its figures, from
the numbers the calculation has already produced. Nothing is recomputed for
the picture, so the picture cannot disagree with the numbers above it. The
geometry is in `src/lib/client/chart.ts` and the drawing in
`src/lib/client/chartView.ts`; the text on the chart comes from the
dictionary, so a Russian reader gets a Russian legend.

**The hero picture** on the home page and the social card. The social card is
the one raster file, because social platforms do not accept SVG in
`og:image`. It is rendered from `scripts/og-image.html` by headless Chrome
and committed as `public/og-image.png`:

```
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-sandbox --hide-scrollbars \
  --screenshot=public/og-image.png --window-size=1200,630 \
  "file://$PWD/scripts/og-image.html"
```

The picture is decorative and carries no figures of its own, so a guide
picture repeats the arithmetic of the guide rather than inventing a number
nobody can check.

## Analytics

Google Analytics 4 is loaded on every page a reader has agreed to cookies
on. The measurement ID lives in `src/config/site.ts` next to the name and the
domain, because the property belongs to the site, and a GA4 measurement ID is
public by design — it is visible in the source of every page that loads the
tag. `PUBLIC_GA_ID` overrides it, which is how a build can prove the tag
path works with a dummy ID.

The privacy page names the provider and says what is collected. It used to
promise a cookieless provider served from the site's own domain, which was
true only while no analytics were running at all; GA4 is served by Google
from `googletagmanager.com` and stores a first-party identifier, so the text
now describes what actually happens.

## Consent

The AdSense loader and the Google Analytics loader both set cookies, so
neither one is in the document until the reader has answered the cookie
question. `src/components/CookieConsent.astro` owns the whole thing:

- the banner is on every page and is the only thing in the body that is
  rendered by the component
- the answer is kept in `localStorage` under `cc-consent`, as `granted` or
  `denied`
- accepting injects both scripts and pushes the hand-placed ad units to
  Google; declining removes the ad units from the page and loads nothing
- changing the answer later reloads the page, because a script that has
  already run cannot be unloaded
- the footer carries a button that opens the banner again, so the answer is
  not a one-time decision

The URLs of both scripts are in the source of every page, because that is
what the ad gate reads, and the check for a script *tag* is what proves that
nothing goes out before the answer. `scripts/check-consent.ts` runs that
check over the built output, in the verify job and again in the deploy job
for the build that is about to ship.

The trade-off is deliberate: a reader who declines sees no advertising, and
the site earns nothing from that visit. That is the honest reading of
"decline", and the alternative — loading the ad script for a reader who said
no — is the thing the banner exists to prevent.

## The tax year

The take-home pay and income tax calculators work from the 2026 tax year.
The figures are constants with a date attached, not a live feed:

| Figure | 2026 value | Where it comes from |
|---|---|---|
| Brackets, single filer | 10 / 12 / 22 / 24 / 32 / 35 / 37 % | Rev. Proc. 2025-32, IRB 2025-45, 3 November 2025 |
| Standard deduction | $16,100 / $32,200 / $24,150 | the same |
| Social Security | 6.2 % up to $184,500 | SSA wage base for 2026 |
| Medicare | 1.45 % of all wages | SSA Publication 15 |
| Additional Medicare Tax | 0.9 % above $200,000 / $250,000 | SSA Publication 15 |

Nothing in `src/lib/calc/tax.ts` reaches the network. The figures are read
from the source, dated, and replaced by hand when the next set is published,
which is usually in October. A unit test pins each bracket against the
revenue procedure, so a mistyped digit fails the build rather than the
reader.

The state income tax is deliberately not modelled: most states tax in bands,
and a per-state table that is out of date is worse than a rate the reader
types in. The calculators take the rate as an input and say so on the page.

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

`pnpm verify` runs seven gates, and all seven block a deployment:

1. `astro check` — no type or template errors.
2. Unit tests — 90 % line coverage, 90 % function coverage and 85 % branch
   coverage over `src/lib/calc/`, enforced by the Node test runner. The test
   suite also covers the advisory linter itself, pinning the sentences it must
   reject and the sentences it must accept, and the rules the contact form
   checks, which are the last thing between the public internet and a real
   mailbox.
3. Linters — zero advisory-language findings, zero broken internal links.
4. `astro build` — the site builds.
5. Ad gating — the built HTML and JS contain no AdSense code while no
   publisher ID is configured, and no page carries more than three slots.
6. Consent gating — the banner is on every page, both trackers are present
   in the source, and neither one is loaded as a script tag before the
   reader has answered.
7. DOM ids — every id in the built HTML appears exactly once.

The last three gates exist because the build proves the code compiles, not that
it behaves. A result cell and an input field that shared an id once left the
monthly rent figure stuck on a placeholder while every test still passed; the
duplicate-id gate now catches that class of defect before it ships.

The calculation engine is tested against published loan figures and against
the invariants the mathematics requires: a schedule sums to the amount
borrowed, a loan closes at exactly zero, an interest-free balance grows by
the deposits alone, and the period-by-period projection agrees with the
closed-form formula at every compounding frequency.

## Known gaps and next steps

- The site has two people behind it: an author who writes the guides and maintains
  the calculation engine, and a reviewer who reads the financial content of each
  guide before it goes live. The names live in `src/config/people.ts`, the roles
  and the biographies in the locale dictionaries. The collection schema checks
  every `author` and `reviewedBy` against the people registry, so a guide cannot
  credit somebody the site cannot support, and the byline prints the reviewer
  only when it differs from the author.
- The reviewer's bio is deliberately short. It says what she does on the site, not
  what she is professionally qualified to do; a real credential and a profile
  that shows the financial background would strengthen the E-E-A-T signal.
- The tax figures are for the 2026 tax year and they have to be replaced by
  hand when the next set is published, usually in October. The brackets and the
  standard deduction live in `src/lib/calc/tax.ts` with the revenue procedure
  they came from; the payroll tax limits live next to them with the Social
  Security Administration's figures. Nothing in that file reads from a network
  service, so a year going by is a maintenance task and not a break.
- The state income tax is a rate the reader types in, applied to the whole of
  the taxable income. Most states tax in bands, so the real figure is usually
  lower, and a per-state table would be a better answer than one number.
- The debt payoff calculator refuses to print a figure that does not exist.
  When the payments are smaller than the monthly interest, the balance grows
  and the debts are never cleared, so there is no finished schedule to
  measure the other runs against. The interest-saved cells stay empty and the
  page says why, rather than printing a number made of a hundred years of
  interest that never ends. A run that never finishes also reports no months
  and no interest of its own.
- The AdSense account is the last thing standing between the site and its
  first advertisement. Apply with the site at its final address.
- The newsletter form is hidden until a Buttondown form URL is configured, so
  there is no email list yet.
- The `www` to apex redirect needs a Cloudflare token with the zone rulesets
  permission. Until then both addresses serve the site.
- The brand and the domain are placeholders. `Calccents` and `calccents.com`
  live in `src/config/site.ts` and change in one place.

## Current state

The site is live at **https://calccents.com**, deployed from `main` by GitHub
Actions, with `www.calccents.com` pointing at the same place.

The repository builds clean and every gate passes: 100 pages, 211 tests, 99.49 %
line coverage over the calculation engine, zero advisory findings in three
languages, zero broken links, zero duplicate ids, and no AdSense code in the
output.

The site has been checked in a browser at desktop and narrow widths, on the
live domain as well as locally: the three calculators compute, the results
update as the inputs change, the amortization table fills, and the console is
free of errors. The mortgage and compound interest figures were checked
against independently calculated values and agree to the cent. The same
figures were checked in the Russian and Spanish pages and are identical, with
the dates written the way the language writes them.

The language switcher sits in the header next to the theme toggle and keeps a
reader on the same page when they change language. Every page carries
`hreflang` links for all three languages and an `x-default` pointing at the
English one, and the sitemap lists the alternates.
