/**
 * Every user-visible string on the site, in English.
 *
 * This file is the source of truth for the site's copy. The Russian and
 * Spanish dictionaries in the same folder have the same shape, and the type
 * of this object is the type they are checked against, so a missing or
 * renamed key fails the build rather than shipping a half-translated page.
 *
 * The strings that belong to the guides themselves are not here. They live
 * in the MDX files under `src/content/guides/<locale>/`, because a guide is
 * an article and an article has its own file.
 */

/**
 * Replace a placeholder in a translated string.
 *
 * The placeholders are the same in every language, so a translator can move
 * them around without breaking anything.
 */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

export const en = {
  /** The name of this language, in this language. */
  localeName: 'English',

  /** Short description of the site, used in structured data and meta tags. */
  tagline: 'Financial calculators that show their work',
  description:
    'Free financial calculators for mortgage payments, renting versus buying, and compound interest. Every formula is shown, every assumption belongs to you, and no page tells you what to do with the result.',

  author: {
    role: 'Author',
    bio: 'Works in IT infrastructure — cloud, CI/CD, infrastructure as code — where a change that cannot be verified does not ship. Keeping cloud environments lean and delivery pipelines fast is the day job; the same standard runs through this site. The arithmetic lives in one place, the formulas are covered by unit tests that check them against published loan figures, and every figure that comes from outside carries its source and the date it was read. Writes the guides and maintains the calculation engine. A second person reads the financial content of each guide before it goes live. Nothing here tells the reader what to do.',
  },

  reviewer: {
    role: 'Financial reviewer',
    bio: 'Reads the financial content of a guide before it is published: the figures, the assumptions behind them, and the sources they come from. The author builds the calculation engine; the reviewer reads the result from the other side, the side of someone who deals with money rather than with code. Her name appears only on the guides she reviewed.',
  },

  nav: {
    tools: 'Tools',
    guides: 'Guides',
    sources: 'Sources',
    about: 'About',
  },

  footer: {
    taglineNote:
      'Every formula is written out, every assumption belongs to you.',
    calculatorsHeading: 'Calculators',
    siteHeading: 'Site',
    calculators: {
      'mortgage-payment': 'Mortgage payment',
      'rent-vs-buy': 'Rent vs buy',
      'compound-interest': 'Compound interest',
    },
    links: {
      guides: 'Guides',
      sources: 'Sources',
      'editorial-team': 'Editorial team',
      about: 'About',
      contact: 'Contact',
      privacy: 'Privacy',
      terms: 'Terms',
    },
    note:
      '{name} publishes calculations and explanations, not financial advice. The tools show the arithmetic behind a number and the assumptions behind the arithmetic. They do not evaluate your situation and they do not recommend a course of action. Every figure a tool produces depends on the inputs you supply — read the assumptions before you rely on any result. © {founded}–{year} {name}.',
  },

  /** Strings that appear on more than one page. */
  ui: {
    skipToContent: 'Skip to content',
    home: 'Home',
    breadcrumb: 'Breadcrumb',
    primaryNav: 'Primary',
    lastChecked: 'Last checked',
    by: 'By',
    whereNumbersComeFrom: 'Where the numbers come from',
    minRead: '{n} min read',
    guidesCount: (n: number) => `${n} ${n === 1 ? 'guide' : 'guides'}`,
    calculate: 'Calculate →',
    open: 'Open →',
    allGuides: 'All guides →',
    readTheGuide: 'Read the guide',
    guidesThatGoDeeper: 'Guides that go deeper',
    commonQuestions: 'Common questions',
    howThisIsCalculated: 'How this is calculated',
    whatThisCalculatorDoesNotDo: 'What this calculator does not do',
    sources: 'Sources',
    sourcesNote: 'These are the primary sources behind the figures and the method in this guide.',
    calculatorsBehindThisGuide: 'Calculators behind this guide',
    published: 'Published',
    lastReviewed: 'Last reviewed',
    reviewedBy: 'Reviewed by',
    language: 'Language',
    switchTheme: 'Switch theme',
    switchToLight: 'Switch to light theme',
    switchToDark: 'Switch to dark theme',
  },

  newsletter: {
    emailAddress: 'Email address',
    placeholder: 'you@example.com',
    subscribe: 'Subscribe',
  },

  home: {
    title: 'Calccents — Financial calculators that show their work',
    description:
      'Free financial calculators for mortgage payments, renting versus buying, and compound interest. Every formula is shown, every assumption belongs to you, and no page tells you what to do with the result.',
    eyebrow: 'Financial calculators',
    heading: 'Know the number before you decide',
    lede: 'Free tools for the arithmetic behind a mortgage, a lease and a pile of savings. Every formula is written out, every assumption belongs to you, and no page tells you what to do with the result.',
    cta: 'Browse the calculators',
    calculatorsEyebrow: 'The calculators',
    calculatorsHeading: 'Three questions, three sets of numbers',
    workHeading: 'Every figure shows its work',
    workPoints: [
      'The formula sits next to the answer, in plain language and in symbols.',
      'Every number that comes from somewhere carries its source and its date.',
      'Every tool states what it does not do, in the same words, right under the result.',
    ],
    workLink: 'How the site is built →',
    sampleMonthlyPayment: 'Monthly payment',
    samplePrincipalAndInterest: 'Principal & interest',
    samplePropertyTax: 'Property tax',
    sampleTotalInterest: 'Total interest',
    guidesEyebrow: 'Guides',
    guidesHeading: 'The arithmetic, written out',
    newsletterHeading: 'Get the math in your inbox',
    newsletterLede:
      'One short letter when a new calculator goes live or an existing one is re-reviewed. No offers, no sponsored placements.',
  },

  toolsIndex: {
    title: 'Free Financial Calculators',
    description:
      'Three free calculators that show the arithmetic behind a mortgage payment, a rent versus buy comparison and a compound interest projection.',
    heading: 'Free financial calculators',
    lede: 'Each calculator shows the formula it uses, lists the assumptions behind the result, and states plainly what it does not do. Nothing here asks for an email address, and nothing here asks you to sign up for anything.',
    whatTheseAre: 'What these tools are',
    whatTheseAreBody: [
      'These are arithmetic tools. They take the numbers you supply, apply a published formula, and hand the result back with the working attached. A mortgage calculator here does not know your credit score, your income, or which lender is offering what this week, and it does not try to guess.',
      'The reason is simple: a number you can check is worth more than a number someone else picked for you. Every tool here shows the formula in symbols, links to the primary sources behind the method, and carries a review date so you can see when it was last checked.',
    ],
  },

  guidesIndex: {
    title: 'Guides',
    description:
      'Fifteen explanations of the arithmetic behind mortgages, renting versus buying and compound interest, each with its formula, its assumptions and its sources.',
    heading: 'Guides',
    lede: 'In-depth explanations of the arithmetic and the assumptions behind the calculators. Every guide shows the formula, links to the primary sources, and carries a review date.',
    missingHeading: 'Missing something?',
    missingBody:
      'Guides are written around the arithmetic readers find hardest to follow. If a financial concept is not covered here, tell us which one and what about it is confusing.',
    suggestTopic: 'Suggest a topic',
    groups: {
      home: 'Home and mortgages',
      renting: 'Renting and owning',
      investing: 'Investing',
    },
  },

  guide: {
    sourcesTitle: 'Sources',
    sourcesNote: 'These are the primary sources behind the figures and the method in this guide.',
  },

  about: {
    title: 'About',
    description:
      'What this site is, how it is built, and the rules it follows so that every number on it can be checked.',
    heading: 'About {name}',
    lede: '{name} publishes financial calculators and the explanations behind them. It is a small site with a narrow purpose: produce a number you can check, and show you the working that produced it.',
    isHeading: 'What this site is',
    isBody: [
      'Three calculators, fifteen guides, and the primary sources behind both. The calculators take numbers you supply and apply a published formula: the amortization formula for a mortgage, a month-by-month cash comparison for renting against buying, and the compound interest formula for a savings balance.',
      'The site is funded by display advertising. That shapes how it is built. Pages load quickly and carry little JavaScript, because a page that loads fast keeps the reader long enough to see the advertising, and because a page that loads fast is the one people come back to. No calculator asks for an email address, and no result is gated.',
    ],
    isNotHeading: 'What this site is not',
    isNotBody: [
      'It is not a brokerage, it does not accept applications, and it does not earn a commission from anyone who clicks anything. There are no sponsored placements, no affiliate links and no lead forms. The advertising is display advertising and nothing else, which means the only thing a reader\'s visit pays for is the reader\'s attention.',
      'No tool here evaluates your circumstances. A mortgage calculator that returned "put down 20 percent" would be wrong most of the time, because the right answer depends on things the page cannot see: your other savings, your job, your tolerance for a bad month. So every tool computes and stops there.',
    ],
    rulesHeading: 'The rules the site follows',
    rules: [
      {
        label: 'Every tool states its limits.',
        body: 'Under each result there is a block listing what the tool does not do, in the same words on every page.',
      },
      {
        label: 'Every figure that comes from somewhere has a source.',
        body: 'Guides link to the primary source and carry the date the data was read. The site\'s own arithmetic is shown in full.',
      },
      {
        label: 'Every page carries a review date.',
        body: 'A guide that has not been looked at in a long time says so.',
      },
      {
        label: 'AI drafts, human review.',
        body: 'Drafting tools help with the words. Every published page has been read by a person who checked the arithmetic, the units and the claims.',
      },
    ],
    whoHeading: 'Who runs this',
    whoBody:
      '{name}. {bio} {reviewerName} reads the financial content of the guides before they are published. The editorial page sets out what the review checks before a page goes live, and the code is public — the formulas, the unit tests and the checks that block a release with a broken page.',
    whoEditorialLink: 'editorial page',
    whoCodeLink: 'code is public',
    howHeading: 'How the calculators work',
    howBody:
      'The arithmetic runs in your browser. There is no server that receives the numbers you type, and nothing about a calculation is sent to anyone. The formulas are implemented once, in one place, and covered by unit tests that check them against known published loan figures and against the invariants the mathematics requires — that a schedule sums to the amount borrowed, that a loan closes at exactly zero, that an interest-free balance grows by the deposits alone.',
    correctionsHeading: 'Corrections',
    correctionsBody:
      'If a figure is wrong, a source link is dead or a page contradicts itself, that is a defect and it should be fixed. The contact page says how to report one, and every correction results in a changed review date rather than a silent edit.',
    contactLink: 'contact page',
  },

  contact: {
    title: 'Contact',
    emailLine: 'Email {email}.',
    description:
      'How to reach the site about a wrong figure, a broken link, a missing topic or an advertising problem.',
    heading: 'Contact',
    lede: 'One address, read by a person. Replies take a few days, usually longer in the first weeks after a page is published.',
    worthHeading: 'What is worth writing about',
    worth: [
      {
        label: 'A wrong number.',
        body: 'If a figure on a page does not match your own calculation, send the inputs you used and the figure you got. That is a defect and it will be looked at.',
      },
      {
        label: 'A broken or dead source link.',
        body: 'Sources are checked on a schedule, but a link can rot between checks.',
      },
      {
        label: 'A topic that is missing.',
        body: 'Guides are written around the arithmetic readers find hardest, so a gap is usually a gap in that arithmetic.',
      },
      {
        label: 'An advertising problem.',
        body: 'An advertisement that misleads, breaks the page, or covers content is worth reporting. The site is funded by display advertising, so this kind of report is taken seriously.',
      },
    ],
    nextHeading: 'What happens next',
    nextBody:
      'A reported figure is checked against the source, and the page changes if the figure was wrong. The review date on the page moves when the content is checked, whether or not anything changed, so the date tells you when a person last read the page.',
  },

  sourcesPage: {
    title: 'Sources',
    description:
      'Every primary source this site relies on for its figures and its methods, and why each one is here.',
    heading: 'Sources',
    lede: 'Every figure on this site comes from one of the organisations below, or from arithmetic the site shows in full. Nothing is quoted from a blog post, a summary or a secondary retelling.',
    whyHeading: 'Why a source list exists',
    whyBody: [
      'A number without a source is an assertion. These pages are written for people who want to check the arithmetic themselves, which only works if the original data is one click away. Each guide therefore carries its own list of sources, and this page is the index of all of them.',
      'The rule the site follows is narrow on purpose: government agencies, the securities regulator, the central bank and the mortgage GSEs. Where a figure comes from a commercial survey, the page says so and names the survey.',
    ],
    howHeading: 'How sources are used',
    how: [
      {
        label: 'Methods and formulas',
        body: 'come from the agency that publishes the method. The amortization formula is set out in the CFPB\'s own guidance; the compounding frequency rules come from the SEC\'s glossary; the tax thresholds come from the IRS annual inflation adjustment.',
      },
      {
        label: 'Published statistics',
        body: 'come from the statistical agency that produced them, with the date the figure was read.',
      },
      {
        label: 'Market rates',
        body: 'come from the survey that publishes them, and they are dated on the page, because a rate from a different month is a different number.',
      },
    ],
    sources: [
      {
        label: 'Consumer Financial Protection Bureau (CFPB) — mortgages, consumer credit',
        url: 'https://www.consumerfinance.gov/',
      },
      {
        label: 'Internal Revenue Service (IRS) — tax brackets, inflation adjustments, retirement rules',
        url: 'https://www.irs.gov/',
      },
      {
        label: 'Freddie Mac — Primary Mortgage Market Survey',
        url: 'https://www.freddiemac.com/pmms',
      },
      {
        label: 'Fannie Mae — research and market commentary',
        url: 'https://www.fanniemae.com/research-and-insights',
      },
      {
        label: 'Department of Housing and Urban Development (HUD) — FHA, HECM, fair housing',
        url: 'https://www.hud.gov/',
      },
      {
        label: 'Bureau of Labor Statistics (BLS) — Consumer Price Index',
        url: 'https://www.bls.gov/cpi/',
      },
      {
        label: 'Federal Reserve Board — interest rate data (H.15)',
        url: 'https://www.federalreserve.gov/releases/h15/',
      },
      {
        label: 'Securities and Exchange Commission (SEC) — Investor.gov',
        url: 'https://www.investor.gov/',
      },
      {
        label: 'Federal Reserve Bank of St. Louis (FRED) — economic data series',
        url: 'https://fred.stlouisfed.org/',
      },
      {
        label: 'Bureau of Labor Statistics — CPI calculator and data tables',
        url: 'https://www.bls.gov/data/',
      },
    ],
  },

  editorial: {
    title: 'Editorial team',
    description:
      'Who writes the guides, who reviews them, and what the review actually checks before a page is published.',
    heading: 'Editorial team',
    lede: 'One person writes the guides. Another reads the financial content of each guide before it goes live. This page says who they are, what the review checks, and what you can check for yourself.',
    authorEyebrow: 'Author',
    reviewerEyebrow: 'Financial reviewer',
    checkEyebrow: 'What you can check',
    checkHeading: 'The arithmetic is public',
    checkBody:
      'The code behind every calculator is in a public repository, with the formulas it implements, the unit tests that check them against known published figures, and the checks that block a release with a broken page. You do not have to take the numbers on trust, and you do not have to ask.',
    openRepository: 'Open the repository',
    twoNamesHeading: 'Two names, two jobs',
    twoNamesBody: [
      'One name writes the guides and maintains the calculation engine. Another reads the financial content of a guide before it is published, checking the figures, the assumptions behind them and the sources they come from. The two jobs are separate on purpose: the person who writes a guide is not the person who gives it the final read.',
      'Where a guide names a reviewer, that is the person who reviewed it, and the name appears on that guide and nowhere else. A review is a statement about a specific page, so it is attached to the page rather than to the site as a whole.',
      'Everything else on this page describes what the review checks, and what a reader can verify without asking anyone.',
    ],
    reviewHeading: 'What the review checks',
    reviewIntro:
      'Before a guide is published, the reviewer works through the same list every time:',
    review: [
      {
        label: 'The arithmetic.',
        body: 'Every formula is checked against the source it comes from, and the worked example in the text is recalculated from scratch. Where a figure appears in the code, the two are compared.',
      },
      {
        label: 'The units.',
        body: 'Percentages against decimals, months against years, dollars against thousands. Most mistakes in a financial document are a unit error.',
      },
      {
        label: 'The edge cases.',
        body: 'A zero rate, a zero term, a negative value. Each is checked to produce a sensible answer rather than an error message.',
      },
      {
        label: 'The wording.',
        body: 'The page must not tell the reader what to do. It explains what a number means and what it depends on, and stops there. A guide that recommends an action gets rewritten.',
      },
      {
        label: 'The sources.',
        body: 'Each link is opened, checked for the claim it is attached to, and dated.',
      },
    ],
    toolsHeading: 'How drafting tools are used',
    toolsBody: [
      'Drafting tools help with the prose. They do not decide what a page says. Every figure, every formula and every claim is written or checked by a person, and no page goes live without the review above. A tool that produced a plausible number is exactly the kind of thing this process exists to catch.',
      'The check that catches it is not only human. The calculation engine has unit tests that run on every change and block a release if a figure moves: the schedule has to sum to the amount borrowed, the loan has to close at exactly zero, and the period-by-period projection has to agree with the closed-form formula at every compounding frequency. A passage of prose cannot fail that way. A formula can, and when it does, the build stops.',
    ],
    datesHeading: 'Review dates',
    datesBody:
      'Every guide carries the date it was last reviewed. A guide whose content depends on outside data is reviewed at least twice a year; a guide that explains arithmetic is reviewed when the formula behind it changes, and in any case once a year. When a page is reviewed the date moves, whether or not the text changed, so the date tells you when a person last read the page.',
    correctionsHeading: 'Corrections',
    correctionsBody:
      'Corrections are made in the open. A page that has been corrected keeps its review date updated and the correction is described in the contact thread it came from. A guide with a wrong figure is a defect in the review, not in the writing, and the review process is what changes.',
    contactLink: 'contact',
  },

  privacy: {
    title: 'Privacy',
    description:
      'What this site collects, what it does not collect, and which advertising and analytics providers appear on the pages.',
    heading: 'Privacy',
    lede: 'The short version: the numbers you type into a calculator stay in your browser, and the site itself keeps no tracking cookie.',
    calculatorsHeading: 'What the calculators do with your input',
    calculatorsBody:
      'Nothing. The arithmetic runs in your browser using JavaScript that is downloaded with the page. The values you enter are not transmitted anywhere, are not stored, and are not visible to the site or to anyone else. Closing the tab discards them.',
    cookiesHeading: 'Cookies',
    cookiesBody:
      '{name} sets no cookies of its own. The site\'s analytics run on Google Analytics 4, which Google serves from its own domains and which stores a first-party identifier in your browser so that one visit can be told from the next. That identifier is not used for advertising and is not shared with other sites.',
    advertisingHeading: 'Advertising',
    advertisingBody:
      'The site is funded by display advertising served by Google AdSense. Google and its partners may set cookies or use similar technologies to serve and measure advertising, and may use them to serve ads based on your prior visits to this or other websites. You can review and change your choices at {adsSettingsLink}, and Google\'s own explanation of how it uses data from sites and apps that use its services is at {policiesLink}.',
    adsSettingsLink: 'Google Ads Settings',
    policiesLink: 'policies.google.com',
    analyticsPoliciesLink: 'policies.google.com',
    analyticsHeading: 'Analytics',
    analyticsBody:
      'Page views are recorded with Google Analytics 4, served by Google from googletagmanager.com. The data used is limited to the page, the referring source and a coarse country or city level location; the IP address is truncated rather than stored in full. It is used to count visits and to find out which pages are read. Google\'s own explanation of how it uses data from sites and apps that use its services is at {analyticsPoliciesLink}.',
    newsletterHeading: 'Newsletter',
    newsletterBody:
      'If you subscribe to the newsletter, the address you enter is stored by the email provider so that the newsletter can be sent. That address is used for the newsletter and for nothing else, and every issue carries an unsubscribe link.',
    thirdPartyHeading: 'Third-party links',
    thirdPartyBody:
      'Guides link to primary sources — government agencies, the SEC, the Federal Reserve. Those sites have their own privacy policies, which this site does not control and has not read on your behalf.',
    changesHeading: 'Changes',
    changesBody:
      'If the providers above change, this page changes with them. The date at the bottom of the page is the date this text was last reviewed.',
    lastReviewed: 'Last reviewed: {date}.',
  },

  terms: {
    title: 'Terms',
    description:
      'The terms under which this site is published, what its calculators do and do not cover, and the limits of what it can promise.',
    heading: 'Terms of use',
    lede: 'Plain terms for a site that publishes calculations rather than recommendations.',
    providesHeading: 'What this site provides',
    providesBody:
      '{name} publishes calculators and written explanations of the arithmetic behind them. The calculators apply published formulas to values you supply and return the result together with the working. That is the whole service.',
    notProvidesHeading: 'What this site does not provide',
    notProvidesBody: [
      'Nothing here is financial, tax, legal or investment advice, and nothing here is a recommendation to buy, sell, hold, rent, own, refinance or sign anything. A result reflects the inputs you entered and the formula on the page. Change an input and the result changes; that is what makes it a calculation rather than a conclusion.',
      'A calculator cannot see your finances, your income, your credit, your time horizon or your risk tolerance, and it does not try to guess at them. Two people with the same inputs and different circumstances will reach different conclusions, and the calculator is not in a position to say which of them is right.',
    ],
    figuresHeading: 'Figures, sources and dates',
    figuresBody:
      'Where a figure comes from an outside source, the page links to that source and gives the date it was read. Outside data changes: tax thresholds, published rates and official statistics are all revised. A figure on a page is accurate as of the review date on that page and no longer, and the review date is there so you can see how old it is.',
    errorsHeading: 'Errors',
    errorsBody:
      'The calculations are implemented once, in one place, and tested. Even so, a mistake is possible. If you find one, the contact page explains how to report it, and reported defects are fixed and the review date updated.',
    advertisingHeading: 'Advertising',
    advertisingBody:
      'The site is funded by display advertising. Advertisements are served by a third party and are not under the site\'s control. Advertisements are labelled and separated from the site\'s own content. No advertiser pays for a page, a placement, a placement in a search result, or a mention of a product in a guide.',
    useHeading: 'Use of the site',
    useBody:
      'The site is published for personal use. You may read it, print it and link to it. You may not republish substantial parts of the guides as your own work, or use the calculators to build a product that competes with the site.',
    changesHeading: 'Changes',
    changesBody:
      'These terms may change as the site changes. The review date below is the date this text was last read.',
    lastReviewed: 'Last reviewed: {date}.',
    contactLink: 'contact page',
  },

  notFound: {
    title: 'Page not found',
    description: 'That page does not exist on this site. Here is where everything actually lives.',
    heading: 'Page not found',
    lede: 'That URL does not exist here. Everything the site publishes is one of the three calculators, the guides behind them, or the pages that explain where the numbers come from.',
    calculators: {
      title: 'Calculators',
      text: 'Mortgage payment, rent versus buying, compound interest.',
    },
    guides: {
      title: 'Guides',
      text: 'The arithmetic behind each calculator, in detail.',
    },
    sources: {
      title: 'Sources',
      text: 'Every primary source the site relies on.',
    },
    contact: {
      title: 'Contact',
      text: 'Tell us what is missing or wrong.',
    },
  },

  /**
   * The three calculators.
   *
   * The `tools` key in `src/config/tools.ts` holds the parts that never
   * change (the slug, the category). Everything a reader sees comes from
   * here.
   */
  tool: {
    'mortgage-payment': {
      name: 'Mortgage Payment Calculator',
      title: 'Mortgage Payment Calculator with Amortization',
      description:
        'Calculate your monthly mortgage payment, total PITI cost and full amortization schedule. See every dollar of interest and how extra payments move the payoff date.',
      short: 'Monthly P&I, full PITI, amortization schedule and the effect of extra payments.',
      category: 'Home',
      methodNote:
        'The payment formula, the amortization schedule and the way extra payments are applied are described below. Nothing on this page is a live market quote.',
      fields: {
        homePrice: 'Home price',
        downPayment: 'Down payment',
        percentOfPrice: 'percent of price',
        interestRate: 'Interest rate',
        annualFixed: 'annual, fixed',
        loanTerm: 'Loan term',
        propertyTax: 'Property tax',
        percentOfPricePerYear: '% of price per year',
        homeInsurance: 'Home insurance',
        perYear: 'per year',
        hoaFee: 'HOA or condo fee',
        perMonth: 'per month',
        extraPrincipal: 'Extra principal',
        firstPayment: 'First payment',
        month: 'month',
        seeAmortization: 'See the year-by-year amortization',
      },
      terms: {
        years: (n: number) => `${n} ${n === 1 ? 'year' : 'years'}`,
      },
      table: {
        year: 'Year',
        principal: 'Principal',
        interest: 'Interest',
        balance: 'Balance',
      },
      result: {
        headlineLabel: 'Total monthly payment (PITI)',
        principalAndInterest: 'Principal & interest',
        propertyTax: 'Property tax',
        insurance: 'Insurance',
        hoa: 'HOA',
        totalInterest: 'Total interest',
        paidOff: 'Paid off',
        note: 'Principal, interest, property tax, insurance and HOA, using the numbers you entered.',
      },
      resultNote:
        'Change any field and the figures update as you type. Nothing is sent anywhere: the arithmetic runs in this page.',
      formula: 'M = P · r(1 + r)ⁿ / ((1 + r)ⁿ − 1)',
      method: [
        'The scheduled monthly payment comes from the standard amortization formula:',
        'P is the amount borrowed, which this page works out as the home price minus the down payment. r is the annual rate you entered divided by twelve, and n is the term in months. From that one figure the calculator builds a schedule month by month: interest is charged on the balance still outstanding at the start of the month, and whatever is left of the payment after that interest reduces the balance.',
        'The full monthly payment is the principal and interest figure plus property tax divided by twelve, insurance divided by twelve, and any HOA fee. Those three are yours to set: the calculator has no idea what your local assessment or your insurer charges, and it does not guess on your behalf.',
        'An extra monthly payment is applied to principal, so it lowers the balance that the next month\'s interest is charged on. The scheduled payment does not change, the loan finishes earlier, and the total interest falls.',
      ],
      limits: [
        'It does not check whether you qualify for a loan, and it does not look at your credit score, income, debt-to-income ratio or any lender\'s underwriting rules.',
        'It does not quote current market rates for your postcode. The interest rate you enter is the rate you use, and nothing on this page is live.',
        'It does not model private mortgage insurance, points, loan origination fees, closing costs, or the escrow timing that decides which month a tax bill lands in.',
        'It does not tell you whether to buy a home. It produces a number and the working behind it.',
      ],
      faq: [
        {
          q: 'What does PITI stand for?',
          a: 'Principal, Interest, Taxes and Insurance. It is the four-part monthly housing payment: the part that repays the loan, the part that pays the lender for borrowing, property tax, and homeowners insurance. This calculator shows each part separately so you can see what drives the total.',
        },
        {
          q: 'How is the monthly principal and interest payment worked out?',
          a: 'It is the standard amortization formula: M = P · r(1 + r)ⁿ / ((1 + r)ⁿ − 1), where P is the amount borrowed, r is the monthly interest rate and n is the number of monthly payments. The schedule that follows it moves interest down and principal up every month, so early payments are mostly interest.',
        },
        {
          q: 'What happens to the final payment?',
          a: 'The scheduled payment is rounded to the nearest cent, which leaves a few cents outstanding at the end of the term. The last scheduled payment is adjusted so the loan closes at exactly zero, the same way a lender adjusts a final payment.',
        },
        {
          q: 'Do extra payments shorten the loan or the payment?',
          a: 'They shorten the loan. An extra payment is applied to principal, which lowers the balance that the next month\'s interest is charged on. The scheduled payment stays the same, and the loan finishes sooner with less total interest.',
        },
        {
          q: 'Is the total interest figure affected by my tax and insurance inputs?',
          a: 'No. Total interest covers the loan only. Property tax, insurance and HOA are housing costs that continue after the loan is paid off, which is why the calculator reports total housing cost separately.',
        },
        {
          q: 'Does the calculator account for inflation?',
          a: 'No. Every figure is in the dollars you entered. A mortgage payment in 30 years is a much smaller share of income than the same payment today, and none of the numbers on this page adjust for that.',
        },
      ],
      sources: [
        {
          label: 'CFPB — How to calculate a mortgage payment',
          url: 'https://www.consumerfinance.gov/ask-cfpb/how-do-i-calculate-my-mortgage-payment-en-144/',
        },
        {
          label: 'Freddie Mac — Primary Mortgage Market Survey (rate methodology)',
          url: 'https://www.freddiemac.com/pmms',
        },
        {
          label: 'HUD — FHA loan requirements and mortgage insurance',
          url: 'https://www.hud.gov/helping_american_homeowners',
        },
        {
          label: 'BLS — Consumer Price Index (inflation, for the real-value note)',
          url: 'https://www.bls.gov/cpi/',
        },
      ],
      relatedGuides: [
        { slug: 'mortgage-payment-calculator-explained', title: 'Mortgage payment calculator explained' },
        { slug: 'how-mortgage-amortization-works', title: 'How mortgage amortization works' },
        { slug: 'monthly-payment-vs-total-cost-mortgage', title: 'Monthly payment vs total cost of a mortgage' },
        { slug: 'extra-mortgage-payments-math', title: 'The math behind extra mortgage payments' },
        { slug: 'how-to-read-an-amortization-schedule', title: 'How to read an amortization schedule' },
      ],
    },

    'rent-vs-buy': {
      name: 'Rent vs Buy Calculator',
      title: 'Rent vs Buy Calculator: Compare the Real Cost',
      description:
        'Compare renting and owning on the numbers: monthly cost, upfront outlay, equity and the month the two paths cross over. No verdict, just the arithmetic.',
      short: 'Monthly cost, upfront outlay, equity build-up and the crossover month.',
      category: 'Home',
      methodNote:
        'The comparison is cash outflow and equity. It deliberately produces no verdict — the crossover month is a fact about the numbers you entered, not a recommendation.',
      sections: {
        theHome: 'The home',
        theRent: 'The rent',
        runningCosts: 'Running costs',
        assumptions: 'Assumptions',
      },
      fields: {
        purchasePrice: 'Purchase price',
        downPayment: 'Down payment',
        percentOfPrice: 'percent of price',
        mortgageRate: 'Mortgage rate',
        annualFixed: 'annual, fixed',
        loanTerm: 'Loan term',
        monthlyRent: 'Monthly rent',
        rentersInsurance: "Renter's insurance",
        perMonth: 'per month',
        propertyTax: 'Property tax',
        percentOfPricePerYear: '% of price per year',
        homeInsurance: 'Home insurance',
        perYear: 'per year',
        hoaFee: 'HOA or condo fee',
        maintenance: 'Maintenance',
        annualChangeInValue: 'Annual change in value',
        negativeModelsAFall: 'negative models a fall',
        compareOver: 'Compare over',
        closingCosts: 'Closing costs',
        percentOfPriceOnce: '% of price, once',
        sellingCosts: 'Selling costs',
        percentOfFinalValue: '% of final value',
      },
      terms: {
        years: (n: number) => `${n} ${n === 1 ? 'year' : 'years'}`,
      },
      result: {
        headlineLabel: 'Monthly difference (owning minus renting)',
        monthlyRent: 'Monthly rent',
        monthlyOwnership: 'Monthly ownership',
        upfrontOutlay: 'Upfront outlay',
        equityBuilt: 'Equity built',
        homeValueAtHorizon: 'Home value at horizon',
        crossover: 'Crossover',
        note: 'Ownership includes mortgage, property tax, insurance, HOA and maintenance. Equity is the home value minus the balance still owed.',
      },
      resultNote:
        'The crossover is the first month where the net cost of owning — cash paid minus equity built — falls below the cash cost of renting. It is a fact about these numbers, not a recommendation.',
      method: [
        'Each month the calculator runs two ledgers side by side. The renting ledger adds your rent and renter\'s insurance. The owning ledger adds the mortgage payment from the standard amortization formula, property tax, insurance, HOA and the maintenance allowance, plus the down payment and closing costs on the first month.',
        "Alongside the second ledger it tracks the home's value, grown or shrunk each month at the annual rate you entered, and the balance still owed on the loan. The difference between the two is your equity:",
        'The net cost of owning is the cash you have paid, minus the equity you have built. The crossover month is the first month where that figure is lower than the rent you would have paid over the same period. Selling costs are held back and reported at the end of the horizon, because you do not pay them until you sell.',
      ],
      formula: 'equity = home value − remaining loan balance',
      limits: [
        'It does not say which option is better for you. The two paths are compared on the numbers you supply and the crossover month is reported, nothing more.',
        'It does not model the tax treatment of a sale, the mortgage interest deduction, or the depreciation of a property over time.',
        'It does not price a specific loan. The mortgage rate you enter is the rate used; the page carries no live quotes and no lender information.',
        'It does not forecast home prices. The annual change in value you enter is applied month by month for the whole horizon, in both directions if you enter a negative number.',
      ],
      faq: [
        {
          q: 'What does the crossover month mean?',
          a: 'It is the first month where the net cost of owning — the cash you have paid, minus the equity you have built — is lower than the cash you would have paid in rent over the same period. Before that point renting has cost less in cash terms. After it, owning has cost less once equity is counted.',
        },
        {
          q: 'Why does the calculation include a maintenance allowance?',
          a: 'A home costs money to keep in repair regardless of whether a mortgage is attached to it, and that cost does not appear on any closing statement. The calculator applies it as a percentage of the purchase price each year, and the percentage is an input you set.',
        },
        {
          q: 'What happens to the home value in the calculation?',
          a: 'It is grown or shrunk every month at the annual rate you enter, then compared with the remaining loan balance to give the equity figure. A negative rate models a falling market; a zero rate holds the price flat.',
        },
        {
          q: 'Are selling costs included?',
          a: 'Selling costs are shown separately at the end of the horizon, as a percentage of the final home value. They are not deducted month by month, because you do not pay them until you sell.',
        },
        {
          q: 'What is the difference between total rent and net cost of ownership?',
          a: 'Total rent is simply what you pay in rent each month multiplied by the number of months. Net cost of ownership is what you pay in mortgage, tax, insurance, HOA and maintenance, plus the upfront outlay, minus the equity you have accumulated. The second figure can be negative, which means you have built more equity than you have paid out.',
        },
        {
          q: 'Does this include the tax consequences of selling a home?',
          a: 'No. Any gain on the sale, and any exclusion that applies to it, is outside the scope of this tool. The comparison here is a cash and equity comparison, not a tax comparison.',
        },
      ],
      sources: [
        {
          label: 'CFPB — Housing costs, renting and owning',
          url: 'https://www.consumerfinance.gov/consumer-tools/mortgages/',
        },
        {
          label: 'HUD — Housing costs, property taxes and insurance guidance',
          url: 'https://www.hud.gov/helping_american_homeowners',
        },
        {
          label: 'BLS — Consumer Price Index (inflation, for the appreciation note)',
          url: 'https://www.bls.gov/cpi/',
        },
        {
          label: 'FRED — Home price index series used for long-run price movement',
          url: 'https://fred.stlouisfed.org/series/HPINUS',
        },
      ],
      relatedGuides: [
        { slug: 'rent-vs-buy-calculator-explained', title: 'Rent vs buy calculator explained' },
        { slug: 'rent-vs-buy-common-mistakes', title: 'Common mistakes in rent versus buy comparisons' },
        { slug: 'estimating-property-tax-and-home-insurance', title: 'Estimating property tax and home insurance' },
        { slug: 'down-payment-and-closing-costs-explained', title: 'Down payment and closing costs explained' },
        { slug: 'monthly-payment-vs-total-cost-mortgage', title: 'Monthly payment vs total cost of a mortgage' },
      ],
      script: {
        notWithinHorizon: 'Not within the horizon',
        month: 'Month {n}',
      },
    },

    'compound-interest': {
      name: 'Compound Interest Calculator',
      title: 'Compound Interest Calculator with Monthly Contributions',
      description:
        "Project a balance with regular contributions, choose the compounding frequency, and see the result in today's dollars after inflation. Formulas shown.",
      short: 'Balance, contributions, interest earned and the inflation-adjusted value.',
      category: 'Investing',
      methodNote:
        'The projection runs one period at a time, so the yearly table is produced by the same arithmetic that produces the final figure.',
      fields: {
        startingBalance: 'Starting balance',
        today: 'today',
        monthlyContribution: 'Monthly contribution',
        addedEachMonth: 'added each month',
        interestRate: 'Interest rate',
        annualNominal: 'annual, nominal',
        time: 'Time',
        years: 'years',
        compounding: 'Compounding',
        contributionTiming: 'Contribution timing',
        inflation: 'Inflation',
        annualForRealValue: 'annual, for the real-value figure',
        seeBalance: 'See the year-by-year balance',
      },
      frequencies: {
        monthly: 'Monthly',
        quarterly: 'Quarterly',
        twiceAYear: 'Twice a year',
        annually: 'Annually',
        everyTwoMonths: 'Every two months',
        everyFourMonths: 'Every four months',
      },
      timing: {
        endOfMonth: 'End of the month',
        startOfMonth: 'Start of the month',
      },
      table: {
        year: 'Year',
        balance: 'Balance',
        contributed: 'Contributed',
        interest: 'Interest',
        inTodaysDollars: "In today's dollars",
      },
      result: {
        headlineLabel: 'Balance at the end of the period',
        totalContributions: 'Total contributions',
        interestEarned: 'Interest earned',
        inTodaysDollars: "In today's dollars",
        effectiveAnnualRate: 'Effective annual rate',
        realAnnualRate: 'Real annual rate',
        horizon: 'Horizon',
        note: 'The balance is in the dollars you entered. The inflation-adjusted figure converts it to the purchasing power of the starting year.',
      },
      resultNote:
        'The rate you enter is used exactly as entered for the whole period. This page does not look up a market rate.',
      method: [
        'The projection advances one compounding period at a time. In each period the balance earns interest at the period rate, and then the contribution for that period is added — at the end of the period or the start of it, depending on the setting. Running the periods in sequence rather than using one closed expression is what produces the year-by-year table, and the final balance is the same either way.',
        'In closed form the same result is:',
        'where P is the starting balance, r is the annual rate divided by the number of compounding periods per year, n is the number of periods, and PMT is the contribution made in each period. A contribution made at the start of the period earns interest for that whole period, so the contribution term is multiplied by (1 + r) in that case.',
        'The real figures come from two adjustments. The effective annual rate is (1 + r) raised to the number of periods per year, which is what a 7 % nominal rate actually becomes once a year of monthly compounding is applied. The real rate divides the nominal rate by the inflation factor, and the balance in today\'s dollars is the nominal balance divided by inflation compounded over the same period.',
      ],
      formula: 'FV = P(1 + r)ⁿ + PMT · ((1 + r)ⁿ − 1) / r',
      limits: [
        'It does not predict a return. The rate you enter is used exactly as entered for the whole period; no historical average, no forecast and no market data feed this page.',
        "It does not model taxes, fees or account charges. A real account's balance will differ by whatever the provider takes.",
        'It does not model market volatility. Real balances fall in years when real markets fall, and no fixed rate captures that.',
        'It does not tell you how to invest or whether to save. It projects a number under the assumptions you supply.',
      ],
      faq: [
        {
          q: 'Why can the compounding frequency only be 1, 2, 3, 4, 6 or 12?',
          a: 'Because the contributions here are made monthly, and the calculator keeps the compounding period and the contribution period the same. Any frequency that divides twelve keeps that arithmetic exact rather than approximate. In practice those six cover daily-to-yearly compounding against monthly deposits.',
        },
        {
          q: 'What is the difference between the nominal and the effective annual rate?',
          a: 'The nominal rate is the number on the account: 7 %. The effective rate is what the balance actually earns once a year of compounding is applied, so 7 % compounded monthly is 7.229 %. The page shows both, because the difference matters over long periods.',
        },
        {
          q: 'What does the real value mean?',
          a: 'It is the final balance expressed in the purchasing power of the starting year. The calculation divides the nominal balance by the inflation rate compounded over the same period, which shows how much of the balance is real growth and how much is the same dollars going further.',
        },
        {
          q: 'Does the timing of the contribution change the result?',
          a: 'Yes, and the page shows both. A contribution made at the start of each period earns interest for that whole period, so it ends with more than the same contribution made at the end. The difference is small per payment but compounds over decades.',
        },
        {
          q: 'What happens at a zero interest rate?',
          a: 'The balance grows by the contributions alone, with no interest. The calculator handles this case explicitly rather than dividing by zero, which is why the figure is exactly the deposits made.',
        },
        {
          q: 'Is a regular contribution required?',
          a: 'No. Setting the monthly contribution to zero turns the calculation into a plain compound interest projection on the starting balance, which is the right model for a lump sum already invested.',
        },
      ],
      sources: [
        {
          label: 'SEC — Investor.gov: compound interest and the cost of fees',
          url: 'https://www.investor.gov/introduction-investing/investing-basics/glossary/compound-interest',
        },
        {
          label: 'BLS — Consumer Price Index (for the inflation-adjusted figures)',
          url: 'https://www.bls.gov/cpi/',
        },
        {
          label: 'Federal Reserve — Time deposit and savings rate data',
          url: 'https://www.federalreserve.gov/releases/h15/',
        },
        {
          label: 'IRS — Compound interest and the growth of a traditional IRA',
          url: 'https://www.irs.gov/retirement-plans/traditional-iras',
        },
      ],
      relatedGuides: [
        { slug: 'compound-interest-calculator-explained', title: 'Compound interest calculator explained' },
        { slug: 'compound-vs-simple-interest', title: 'Compound interest vs simple interest' },
        { slug: 'how-compounding-frequency-changes-results', title: 'How compounding frequency changes the result' },
        { slug: 'inflation-and-real-returns-explained', title: 'Inflation and real returns explained' },
        { slug: 'understanding-apr', title: 'Understanding APR and the annual percentage rate' },
      ],
      script: {
        yearsOne: '1 year',
        yearsOther: '{n} years',
      },
    },
  },
};

export type UiDictionary = typeof en;
