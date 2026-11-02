/** Lahat ng teksto ng interface sa Tagalog. Kapareho ng istruktura ng `en.ts`. */

export const tl = {
  /** Ang pangalan ng wikang ito, sa wikang ito. */
  localeName: 'Tagalog',

  tagline: 'Mga financial calculator na ipinapakita ang kuwenta',
  description:
    'Libreng financial calculator para sa hulog sa mortgage, pag-upa o pagbili, compound interest, take-home pay, federal na buwis at pagbabayad ng utang. Ipinapakita ang bawat formula.',

  author: {
    role: 'May-akda',
    bio: 'Nagtatrabaho sa IT infrastructure — cloud, CI/CD, infrastructure as code — kung saan hindi inilalabas ang pagbabagong hindi mabeberipika. Ang pagpapanatiling magaan ng mga cloud environment at mabilis ng mga delivery pipeline ang pang-araw-araw na trabaho; ang parehong pamantayan ang sinusunod sa site na ito. Nasa iisang lugar ang kuwenta, may unit test ang mga formula na inihahambing ang mga ito sa nailathalang numero ng mga pautang, at bawat numerong galing sa labas ay may kasamang pinagmulan at petsa kung kailan ito binasa. Siya ang sumusulat ng mga gabay at nagpapanatili ng calculation engine. May ikalawang taong bumabasa sa nilalamang pampinansiyal ng bawat gabay bago ito ilathala. Walang anuman dito ang nagsasabi sa mambabasa kung ano ang gagawin.',
  },

  reviewer: {
    role: 'Tagasuring pampinansiyal',
    bio: 'Binabasa niya ang nilalamang pampinansiyal ng isang gabay bago ito ilathala: ang mga numero, ang mga palagay sa likod ng mga ito, at ang mga pinagmulan nito. Ang may-akda ang bumubuo ng calculation engine; binabasa ng tagasuri ang resulta mula sa kabilang panig, ang panig ng taong humahawak ng pera at hindi ng code. Lumalabas lamang ang pangalan niya sa mga gabay na sinuri niya.',
  },

  consent: {
    heading: 'Cookies',
    body: 'Gumagamit ang site na ito ng cookies para magpakita ng advertising at para bilangin kung aling mga pahina ang binabasa. Kapag tinanggap mo, ilo-load ang advertising at ang page analytics, kasama ang cookieless na beacon ng hosting provider; kapag tinanggihan mo, walang ilo-load kahit ano. Para sa mambabasang nasa European Union, hindi kailanman ilo-load ang beacon ng hosting provider. Mababago mo ang sagot mo mamaya mula sa footer. Kung ano ang kinokolekta at sino ang nagbibigay nito ay nasa {privacyLink}.',
    privacyLink: 'pahina ng privacy',
    accept: 'Tanggapin',
    reject: 'Tanggihan',
    settings: 'Mga setting ng cookie',
  },

  nav: {
    tools: 'Mga tool',
    guides: 'Mga gabay',
    sources: 'Mga sanggunian',
    about: 'Tungkol',
  },

  footer: {
    taglineNote: 'Nakasulat nang buo ang bawat formula, sa iyo ang bawat palagay.',
    calculatorsHeading: 'Mga calculator',
    siteHeading: 'Site',
    calculators: {
      'mortgage-payment': 'Hulog sa mortgage',
      'rent-vs-buy': 'Upa o bili',
      'compound-interest': 'Compound interest',
      'net-pay': 'Take-home pay',
      'income-tax': 'Federal income tax',
      'debt-payoff': 'Pagbabayad ng utang',
    },
    links: {
      guides: 'Mga gabay',
      sources: 'Mga sanggunian',
      'editorial-team': 'Editorial team',
      about: 'Tungkol',
      contact: 'Makipag-ugnayan',
      privacy: 'Privacy',
      terms: 'Mga tuntunin',
    },
    cookieSettings: 'Mga setting ng cookie',
    note:
      'Naglalathala ang {name} ng mga kuwenta at paliwanag, hindi ng payong pampinansiyal. Ipinapakita ng mga tool ang aritmetika sa likod ng isang numero at ang mga palagay sa likod ng aritmetika. Hindi nila sinusuri ang sitwasyon mo at hindi sila nagtuturo ng hakbang na gagawin. Bawat numerong inilalabas ng isang tool ay nakadepende sa datos na inilagay mo — basahin ang mga palagay bago umasa sa anumang resulta. © {founded}–{year} {name}.',
  },

  ui: {
    skipToContent: 'Lumaktaw sa nilalaman',
    home: 'Home',
    breadcrumb: 'Breadcrumb',
    primaryNav: 'Pangunahing nabigasyon',
    lastChecked: 'Huling sinuri',
    by: 'Ni',
    whereNumbersComeFrom: 'Saan nagmumula ang mga numero',
    minRead: '{n} minutong basa',
    guidesCount: (n: number) => `${n} ${n === 1 ? 'gabay' : 'na gabay'}`,
    calculate: 'Kalkulahin',
    open: 'Buksan',
    allGuides: 'Lahat ng gabay →',
    readTheGuide: 'Basahin ang gabay',
    guidesThatGoDeeper: 'Mga gabay na mas malalim',
    commonQuestions: 'Mga karaniwang tanong',
    howThisIsCalculated: 'Paano ito kinukuwenta',
    whatThisCalculatorDoesNotDo: 'Ang hindi ginagawa ng calculator na ito',
    sources: 'Mga sanggunian',
    sourcesNote: 'Ito ang mga pangunahing sanggunian sa likod ng mga numero at ng pamamaraan sa gabay na ito.',
    calculatorsBehindThisGuide: 'Mga calculator ng gabay na ito',
    published: 'Inilathala',
    lastReviewed: 'Huling sinuri',
    reviewedBy: 'Sinuri ni',
    language: 'Wika',
    switchTheme: 'Palitan ang tema',
    switchToLight: 'Lumipat sa maliwanag na tema',
    switchToDark: 'Lumipat sa madilim na tema',
    detectedFromIp:
      'Natukoy ang estado mula sa iyong IP address at tantiya lamang ito: maaaring ituro ng VPN, proxy o mobile network ang maling estado. Maaari pa ring baguhin ang field.',
  },

  newsletter: {
    emailAddress: 'Email address',
    placeholder: 'ikaw@halimbawa.com',
    subscribe: 'Mag-subscribe',
  },

  home: {
    title: 'Calccents — Mga financial calculator na ipinapakita ang kuwenta',
    description:
      'Libreng financial calculator para sa hulog sa mortgage, pag-upa o pagbili, compound interest, take-home pay, federal na buwis at pagbabayad ng utang. Ipinapakita ang bawat formula.',
    eyebrow: 'Mga financial calculator',
    heading: 'Alamin ang numero bago magpasya',
    lede: 'Mga libreng tool para sa aritmetika sa likod ng isang mortgage, isang upa, isang payslip at isang tambak ng utang. Nakasulat ang bawat formula, sa iyo ang bawat palagay, at walang pahinang nagsasabi kung ano ang gagawin mo sa resulta.',
    cta: 'Tingnan ang mga calculator',
    calculatorsEyebrow: 'Ang mga calculator',
    calculatorsHeading: 'Anim na tanong, anim na hanay ng numero',
    workHeading: 'Ipinapakita ng bawat numero ang kuwenta nito',
    workPoints: [
      'Nasa tabi ng sagot ang formula, sa simpleng salita at sa mga simbolo.',
      'Bawat numerong galing sa kung saan ay may kasamang pinagmulan at petsa.',
      'Sinasabi ng bawat tool kung ano ang hindi nito ginagawa, sa parehong mga salita, sa ilalim mismo ng resulta.',
    ],
    workLink: 'Paano binuo ang site →',
    sampleMonthlyPayment: 'Buwanang hulog',
    samplePrincipalAndInterest: 'Principal at interes',
    samplePropertyTax: 'Buwis sa ari-arian',
    sampleTotalInterest: 'Kabuuang interes',
    calcTitle: 'Subukan: buwanang hulog sa mortgage',
    calcHomePrice: 'Presyo ng bahay',
    calcDown: 'Down payment',
    calcRate: 'Interest rate',
    calcTerm: 'Termino',
    calcYears: '{n} taon',
    calcMonthly: 'Buwanang principal at interes',
    calcLoan: 'Halaga ng utang',
    calcTotalInterest: 'Kabuuang interes',
    calcOpen: 'Buksan ang buong calculator',
    calcNote: 'Principal at interes lamang. Nasa buong calculator ang buwis sa ari-arian, insurance at HOA.',
    statCalculators: 'calculator',
    statGuides: 'gabay na ipinapakita ang kuwenta',
    statLanguages: 'wika',
    statSignups: 'sign-up na kailangan para gamitin',
    guidesEyebrow: 'Mga gabay',
    guidesHeading: 'Ang aritmetika, nakasulat nang buo',
    newsletterHeading: 'Ang math, diretso sa inbox mo',
    newsletterLede:
      'Isang maikling sulat kapag may bagong calculator o kapag muling sinuri ang isang dati nang calculator. Walang alok, walang sponsored na nilalaman.',
  },

  illustration: {
    mortgagePayment: 'Ang balanse ng mortgage na bumababa sa paglipas ng panahon, katabi ang interes na naibayad',
    rentVsBuy: 'Dalawang linyang nagsasalubong: ang gastos ng pag-upa laban sa gastos ng pagmamay-ari',
    compoundInterest: 'Isang balanseng palaki nang palaki habang nagko-compound ang interes',
    netPay: 'Isang bar ng gross pay na hinati sa take-home pay at sa mga kaltas dito',
    incomeTax: 'Isang patong ng tax bracket, bawat isa mas malapad kaysa sa nasa itaas nito',
    debtPayoff: 'Dalawang hanay ng bar, isa para sa bawat pagkakasunod-sunod ng pagbabayad ng utang',
  },

  heroVisual: {
    label: 'Buwanang hulog',
    caption: 'Isang halimbawang kinuwenta, iginuhit sa paraang iginuguhit ito ng calculator.',
  },

  chart: {
    months: 'Buwan',
    years: 'Taon',
    start: 'Ngayon',
    end: 'Katapusan',
    empty: 'Mapupuno ang chart kapag may numero nang iguguhit.',
  },

  toolsIndex: {
    title: 'Libreng financial calculator',
    description:
      'Mga libreng calculator na ipinapakita ang aritmetika sa likod ng hulog sa mortgage, ng paghahambing ng pag-upa at pagbili, at ng projection ng compound interest.',
    heading: 'Libreng financial calculator',
    lede: 'Ipinapakita ng bawat calculator ang formula na ginagamit nito, inililista ang mga palagay sa likod ng resulta, at malinaw na sinasabi kung ano ang hindi nito ginagawa. Walang anuman dito ang humihingi ng email address, at walang anuman dito ang nagpapa-sign up sa iyo sa kahit ano.',
    whatTheseAre: 'Ano ang mga tool na ito',
    whatTheseAreBody: [
      'Mga tool ito para sa aritmetika. Kinukuha nila ang mga numerong inilagay mo, inilalapat ang isang nailathalang formula, at ibinabalik ang resulta kasama ang kuwenta. Hindi alam ng mortgage calculator dito ang credit score mo, ang kita mo, o kung anong alok ng aling nagpapautang ngayong linggo, at hindi ito nanghuhula.',
      'Simple ang dahilan: mas mahalaga ang numerong kaya mong suriin kaysa sa numerong pinili ng iba para sa iyo. Ipinapakita ng bawat tool dito ang formula sa mga simbolo, nagli-link sa mga pangunahing sanggunian ng pamamaraan, at may petsa ng pagsusuri para makita mo kung kailan ito huling sinuri.',
    ],
  },

  guidesIndex: {
    title: 'Mga gabay',
    description:
      'Mga paliwanag sa aritmetika sa likod ng mortgage, pag-upa laban sa pagbili at compound interest, bawat isa may formula, mga palagay at mga sanggunian.',
    heading: 'Mga gabay',
    lede: 'Malalalim na paliwanag sa aritmetika at mga palagay sa likod ng mga calculator. Ipinapakita ng bawat gabay ang formula, nagli-link sa mga pangunahing sanggunian, at may petsa ng pagsusuri.',
    missingHeading: 'May kulang ba?',
    missingBody:
      'Isinusulat ang mga gabay sa paligid ng aritmetikang pinakamahirap sundan ng mga mambabasa. Kung may konseptong pampinansiyal na wala rito, sabihin sa amin kung alin ito at kung ano ang nakalilito tungkol dito.',
    suggestTopic: 'Magmungkahi ng paksa',
    groups: {
      home: 'Bahay at mortgage',
      renting: 'Pag-upa at pagmamay-ari',
      investing: 'Pamumuhunan',
    },
  },

  guide: {
    sourcesTitle: 'Mga sanggunian',
    sourcesNote: 'Ito ang mga pangunahing sanggunian sa likod ng mga numero at ng pamamaraan sa gabay na ito.',
  },

  about: {
    title: 'Tungkol',
    description:
      'Ano ang site na ito, paano ito binuo, at ang mga patakarang sinusunod nito para masuri ang bawat numero rito.',
    heading: 'Tungkol sa {name}',
    lede: 'Naglalathala ang {name} ng mga financial calculator at ng mga paliwanag sa likod ng mga ito. Maliit na site ito na may makitid na layunin: magbigay ng numerong kaya mong suriin, at ipakita sa iyo ang kuwentang nagbunga nito.',
    isHeading: 'Ano ang site na ito',
    isBody: [
      'Anim na calculator, labing-walong gabay, at ang mga pangunahing sanggunian sa likod ng mga ito. Kinukuha ng mga calculator ang mga numerong inilagay mo at inilalapat ang isang nailathalang formula: ang amortization formula para sa mortgage, isang buwan-buwang paghahambing ng perang lumalabas sa pag-upa at sa pagbili, ang compound interest formula para sa balanse ng ipon, at ang aritmetika ng pagbabayad ng utang, ng income tax at ng take-home pay.',
      'Pinopondohan ang site ng display advertising. Hinuhubog nito kung paano binuo ang site. Mabilis mag-load ang mga pahina at kaunti ang JavaScript, dahil ang mabilis na pahina ang nagpapanatili sa mambabasa nang sapat na tagal para makita ang advertising, at dahil ang mabilis na pahina ang binabalikan ng mga tao. Walang calculator na humihingi ng email address, at walang resultang nakakandado.',
    ],
    isNotHeading: 'Ang hindi ang site na ito',
    isNotBody: [
      'Hindi ito brokerage, hindi ito tumatanggap ng aplikasyon, at hindi ito kumikita ng komisyon mula sa sinumang nag-click ng kahit ano. Walang sponsored na puwesto, walang affiliate link at walang lead form. Display advertising lamang ang advertising, ibig sabihin, ang tanging ibinabayad ng pagbisita ng mambabasa ay ang atensiyon ng mambabasa.',
      'Walang tool dito ang sumusuri sa kalagayan mo. Ang mortgage calculator na sasagot ng "mag-down ng 20 porsiyento" ay mali sa halos lahat ng pagkakataon, dahil nakadepende ang tamang sagot sa mga bagay na hindi nakikita ng pahina: ang iba mong ipon, ang trabaho mo, kung gaano mo kakayanin ang isang mahirap na buwan. Kaya nagkukuwenta ang bawat tool at doon humihinto.',
    ],
    rulesHeading: 'Ang mga patakarang sinusunod ng site',
    rules: [
      {
        label: 'Sinasabi ng bawat tool ang hangganan nito.',
        body: 'Sa ilalim ng bawat resulta ay may bloke na naglilista ng hindi ginagawa ng tool, sa parehong mga salita sa bawat pahina.',
      },
      {
        label: 'May pinagmulan ang bawat numerong galing sa kung saan.',
        body: 'Nagli-link ang mga gabay sa pangunahing sanggunian at may petsa kung kailan binasa ang datos. Ipinapakita nang buo ang sariling aritmetika ng site.',
      },
      {
        label: 'May petsa ng pagsusuri ang bawat pahina.',
        body: 'Ang gabay na matagal nang hindi tinitingnan ay sinasabi iyon.',
      },
      {
        label: 'AI ang gumagawa ng draft, tao ang sumusuri.',
        body: 'Tumutulong ang mga drafting tool sa mga salita. Bawat nailathalang pahina ay binasa ng isang taong sumuri sa aritmetika, sa mga yunit at sa mga pahayag.',
      },
    ],
    whoHeading: 'Sino ang nagpapatakbo nito',
    whoBody:
      '{name}. {bio} Binabasa ni {reviewerName} ang nilalamang pampinansiyal ng mga gabay bago ilathala ang mga ito. Inilalahad ng {whoEditorialLink} kung ano ang sinusuri ng review bago mailathala ang isang pahina, at {whoCodeLink}: ang mga formula, ang mga unit test at ang mga check na pumipigil sa release na may sirang pahina.',
    whoEditorialLink: 'editorial na pahina',
    whoCodeLink: 'pampubliko ang code',
    howHeading: 'Paano gumagana ang mga calculator',
    howBody:
      'Tumatakbo ang aritmetika sa browser mo. Walang server na tumatanggap ng mga numerong itina-type mo, at walang anumang tungkol sa kuwenta ang ipinapadala kaninuman. Isang beses lang ipinatupad ang mga formula, sa iisang lugar, at may mga unit test na inihahambing ang mga ito sa kilalang nailathalang numero ng mga pautang at sa mga invariant na hinihingi ng matematika — na ang kabuuan ng iskedyul ay katumbas ng hiniram na halaga, na nagsasara ang utang sa eksaktong zero, na ang balanseng walang interes ay lumalaki lamang sa mga deposito.',
    correctionsHeading: 'Mga pagwawasto',
    correctionsBody:
      'Kung mali ang isang numero, sira ang isang link sa sanggunian, o sinasalungat ng isang pahina ang sarili nito, depekto iyon at dapat itong ayusin. Sinasabi ng {contactLink} kung paano ito iulat, at bawat pagwawasto ay nagreresulta sa binagong petsa ng pagsusuri sa halip na tahimik na pag-edit.',
    contactLink: 'pahina ng pakikipag-ugnayan',
  },

  contact: {
    title: 'Makipag-ugnayan',
    emailLine: 'Mag-email sa {email}.',
    description:
      'Paano makipag-ugnayan sa site tungkol sa maling numero, sirang link, kulang na paksa o problema sa advertising.',
    heading: 'Makipag-ugnayan',
    lede: 'Isang address, binabasa ng isang tao. Ilang araw bago makasagot, kadalasan mas matagal sa mga unang linggo matapos mailathala ang isang pahina.',
    worthHeading: 'Ano ang dapat isulat sa amin',
    worth: [
      {
        label: 'Maling numero.',
        body: 'Kung hindi tugma ang isang numero sa pahina sa sarili mong kuwenta, ipadala ang mga input na ginamit mo at ang numerong nakuha mo. Depekto iyon at titingnan ito.',
      },
      {
        label: 'Sira o patay na link sa sanggunian.',
        body: 'Regular na sinusuri ang mga sanggunian, pero maaaring masira ang isang link sa pagitan ng mga pagsusuri.',
      },
      {
        label: 'Kulang na paksa.',
        body: 'Isinusulat ang mga gabay sa paligid ng aritmetikang pinakamahirap para sa mga mambabasa, kaya ang puwang ay kadalasang puwang sa aritmetikang iyon.',
      },
      {
        label: 'Problema sa advertising.',
        body: 'Dapat iulat ang ad na nanlilinlang, sumisira sa pahina, o tumatakip sa nilalaman. Pinopondohan ang site ng display advertising, kaya sineseryoso ang ganitong ulat.',
      },
    ],
    nextHeading: 'Ano ang susunod na mangyayari',
    nextBody:
      'Inihahambing sa sanggunian ang iniulat na numero, at nagbabago ang pahina kung mali ang numero. Gumagalaw ang petsa ng pagsusuri sa pahina kapag sinuri ang nilalaman, may nagbago man o wala, kaya sinasabi ng petsa kung kailan huling binasa ng isang tao ang pahina.',
  },

  contactForm: {
    heading: 'Sumulat ng mensahe',
    lede: 'Ipinapadala ng form ang mensahe sa taong nagbabasa ng site na ito, at ang sagot ay pupunta sa address na isusulat mo rito.',
    nameLabel: 'Pangalan mo',
    emailLabel: 'Email address mo',
    subjectLabel: 'Paksa',
    messageLabel: 'Mensahe mo',
    submit: 'Ipadala ang mensahe',
    note: 'Ipinapadala ang mensahe sa email at binabasa ng isang tao.',
    statuses: [
      { key: 'sent', text: 'Naipadala na ang mensahe. Darating ang sagot sa address na isinulat mo.' },
      { key: 'email', text: 'Mukhang kulang ang email address na iyan. Suriin ito at ipadala muli ang mensahe.' },
      { key: 'fields', text: 'Kailangang may laman ang bawat field.' },
      { key: 'rate', text: 'Ilang mensahe na ang ipinadala mula sa address na ito sa maikling panahon. Maghintay ng isang minuto at ipadala muli.' },
      { key: 'failed', text: 'Hindi naipadala ang mensahe. Sumulat na lang sa address sa itaas.' },
    ],
  },

  sourcesPage: {
    title: 'Mga sanggunian',
    description:
      'Bawat pangunahing sanggunian na pinagbabatayan ng site para sa mga numero at pamamaraan nito, at kung bakit narito ang bawat isa.',
    heading: 'Mga sanggunian',
    lede: 'Bawat numero sa site na ito ay galing sa isa sa mga organisasyon sa ibaba, o sa aritmetikang ipinapakita nang buo ng site. Walang sinipi mula sa blog post, buod o kuwentong ipinasa-pasa.',
    whyHeading: 'Bakit may listahan ng sanggunian',
    whyBody: [
      'Ang numerong walang pinagmulan ay isang pahayag lamang. Isinulat ang mga pahinang ito para sa mga gustong suriin mismo ang aritmetika, at magagawa lang iyon kung isang click lang ang layo ng orihinal na datos. Kaya may sariling listahan ng sanggunian ang bawat gabay, at ang pahinang ito ang index ng lahat ng iyon.',
      'Sadyang makitid ang patakarang sinusunod ng site: mga ahensiya ng gobyerno, ang regulator ng securities, ang central bank at ang mga mortgage GSE. Kapag galing sa komersiyal na survey ang isang numero, sinasabi iyon ng pahina at pinapangalanan ang survey.',
    ],
    howHeading: 'Paano ginagamit ang mga sanggunian',
    how: [
      {
        label: 'Mga pamamaraan at formula',
        body: 'ay galing sa ahensiyang naglalathala ng pamamaraan. Nasa sariling gabay ng CFPB ang amortization formula; galing sa glossary ng SEC ang mga patakaran sa dalas ng compounding; galing sa taunang inflation adjustment ng IRS ang mga threshold ng buwis.',
      },
      {
        label: 'Mga nailathalang estadistika',
        body: 'ay galing sa ahensiyang pang-estadistika na gumawa ng mga ito, kasama ang petsa kung kailan binasa ang numero.',
      },
      {
        label: 'Mga rate sa merkado',
        body: 'ay galing sa survey na naglalathala ng mga ito, at may petsa sa pahina, dahil ibang numero ang rate mula sa ibang buwan.',
      },
      {
        label: 'Mga numero ng estado',
        body: 'ay galing sa Tax Foundation, na nagtitipon ng mga income tax bracket mula sa mga batas at form ng bawat estado, at ng mga rate ng buwis sa ari-arian mula sa American Community Survey na inilalathala nito. Ang mga table para sa head of household, ang deduction para sa naibayad na federal income tax at ang mga credit ng estado ay galing sa mga tax return at tagubilin ng mga estado mismo.',
      },
    ],
    sources: [
      {
        label: 'Consumer Financial Protection Bureau (CFPB) — mortgage, consumer credit',
        url: 'https://www.consumerfinance.gov/',
      },
      {
        label: 'Internal Revenue Service (IRS) — mga tax bracket, inflation adjustment, mga patakaran sa pagreretiro',
        url: 'https://www.irs.gov/',
      },
      {
        label: 'Social Security Administration (SSA) — mga rate ng payroll tax, wage base, taunang limitasyon',
        url: 'https://www.ssa.gov/',
      },
      {
        label: 'Freddie Mac — Primary Mortgage Market Survey',
        url: 'https://www.freddiemac.com/pmms',
      },
      {
        label: 'Fannie Mae — pananaliksik at komentaryo sa merkado',
        url: 'https://www.fanniemae.com/research-and-insights',
      },
      {
        label: 'Department of Housing and Urban Development (HUD) — FHA, HECM, patas na pabahay',
        url: 'https://www.hud.gov/',
      },
      {
        label: 'Bureau of Labor Statistics (BLS) — Consumer Price Index',
        url: 'https://www.bls.gov/cpi/',
      },
      {
        label: 'Federal Reserve Board — datos ng interest rate (H.15)',
        url: 'https://www.federalreserve.gov/releases/h15/',
      },
      {
        label: 'Securities and Exchange Commission (SEC) — Investor.gov',
        url: 'https://www.investor.gov/',
      },
      {
        label: 'Federal Reserve Bank of St. Louis (FRED) — mga serye ng datos pang-ekonomiya',
        url: 'https://fred.stlouisfed.org/',
      },
      {
        label: 'Bureau of Labor Statistics — CPI calculator at mga table ng datos',
        url: 'https://www.bls.gov/data/',
      },
      {
        label: 'Tax Foundation — State Individual Income Tax Rates and Brackets, 2026',
        url: 'https://taxfoundation.org/data/all/state/state-income-tax-rates-2026/',
      },
      {
        label: 'Tax Foundation — Property Taxes by State and County, 2026',
        url: 'https://taxfoundation.org/data/all/state/property-taxes-by-state-county/',
      },
      {
        label: 'Tax Foundation — Facts & Figures 2026, mga rate ng state income tax noong 28 Abril 2026',
        url: 'https://taxfoundation.org/data/all/state/2026-state-tax-data/',
      },
      {
        label: 'National Conference of State Legislatures (NCSL) — mga earned income tax credit at child tax credit ng estado',
        url: 'https://www.ncsl.org/human-services/',
      },
      {
        label: 'Tax Policy Center — mga rate at credit ng state income tax',
        url: 'https://taxpolicycenter.org/',
      },
      {
        label: 'Prenatal-to-3 Policy Impact Center — mga patakaran ng estado sa child tax credit',
        url: 'https://pn3policy.org/',
      },
    ],
  },

  editorial: {
    title: 'Editorial team',
    description:
      'Sino ang sumusulat ng mga gabay, sino ang sumusuri sa mga ito, at ano talaga ang sinusuri ng review bago ilathala ang isang pahina.',
    heading: 'Editorial team',
    lede: 'Isang tao ang sumusulat ng mga gabay. Isa pa ang bumabasa sa nilalamang pampinansiyal ng bawat gabay bago ito ilathala. Sinasabi ng pahinang ito kung sino sila, kung ano ang sinusuri ng review, at kung ano ang kaya mong suriin nang mag-isa.',
    authorEyebrow: 'May-akda',
    reviewerEyebrow: 'Tagasuring pampinansiyal',
    checkEyebrow: 'Ang kaya mong suriin',
    checkHeading: 'Pampubliko ang aritmetika',
    checkBody:
      'Nasa pampublikong repository ang code sa likod ng bawat calculator, kasama ang mga formula na ipinapatupad nito, ang mga unit test na inihahambing ang mga ito sa kilalang nailathalang numero, at ang mga check na pumipigil sa release na may sirang pahina. Hindi kailangang ipagkatiwala ang mga numero, at hindi kailangang magtanong kaninuman.',
    openRepository: 'Buksan ang repository',
    twoNamesHeading: 'Dalawang pangalan, dalawang trabaho',
    twoNamesBody: [
      'Isang pangalan ang sumusulat ng mga gabay at nagpapanatili ng calculation engine. Isa pa ang bumabasa sa nilalamang pampinansiyal ng isang gabay bago ito ilathala, sinusuri ang mga numero, ang mga palagay sa likod ng mga ito at ang mga pinagmulan nito. Sadyang magkahiwalay ang dalawang trabaho: ang sumulat ng gabay ay hindi ang huling bumabasa nito.',
      'Kapag may pangalan ng tagasuri ang isang gabay, iyon ang taong sumuri dito, at lumalabas ang pangalan sa gabay na iyon at wala nang iba. Ang review ay pahayag tungkol sa isang tiyak na pahina, kaya nakakabit ito sa pahina at hindi sa buong site.',
      'Inilalarawan ng natitirang bahagi ng pahinang ito kung ano ang sinusuri ng review, at kung ano ang kayang beripikahin ng mambabasa nang hindi nagtatanong kaninuman.',
    ],
    reviewHeading: 'Ano ang sinusuri ng review',
    reviewIntro: 'Bago ilathala ang isang gabay, dinadaanan ng tagasuri ang parehong listahan sa bawat pagkakataon:',
    review: [
      {
        label: 'Ang aritmetika.',
        body: 'Inihahambing ang bawat formula sa pinagmulan nito, at muling kinukuwenta mula sa simula ang halimbawang nasa teksto. Kapag lumalabas ang isang numero sa code, pinaghahambing ang dalawa.',
      },
      {
        label: 'Ang mga yunit.',
        body: 'Porsiyento laban sa decimal, buwan laban sa taon, dolyar laban sa libo. Karamihan ng pagkakamali sa dokumentong pampinansiyal ay pagkakamali sa yunit.',
      },
      {
        label: 'Ang mga edge case.',
        body: 'Zero na rate, zero na termino, negatibong halaga. Sinusuri ang bawat isa para magbigay ng makatwirang sagot sa halip na error message.',
      },
      {
        label: 'Ang pananalita.',
        body: 'Hindi dapat sabihin ng pahina sa mambabasa kung ano ang gagawin. Ipinapaliwanag nito kung ano ang ibig sabihin ng isang numero at kung saan ito nakadepende, at doon humihinto. Muling isinusulat ang gabay na nagtutulak ng isang hakbang.',
      },
      {
        label: 'Ang mga sanggunian.',
        body: 'Binubuksan ang bawat link, sinusuri kung tugma sa pahayag na kinakabitan nito, at nilalagyan ng petsa.',
      },
    ],
    toolsHeading: 'Paano ginagamit ang mga drafting tool',
    toolsBody: [
      'Tumutulong ang mga drafting tool sa pagsulat. Hindi sila ang nagpapasya kung ano ang sinasabi ng pahina. Bawat numero, bawat formula at bawat pahayag ay isinusulat o sinusuri ng isang tao, at walang pahinang nailalathala nang hindi dumaan sa review sa itaas. Ang tool na naglabas ng kapani-paniwalang numero ang eksaktong bagay na umiiral ang prosesong ito para mahuli.',
      'Hindi lamang tao ang check na nakahuhuli nito. May mga unit test ang calculation engine na tumatakbo sa bawat pagbabago at pumipigil sa release kapag gumalaw ang isang numero: kailangang katumbas ng hiniram na halaga ang kabuuan ng iskedyul, kailangang magsara ang utang sa eksaktong zero, at kailangang tumugma ang projection bawat period sa closed-form na formula sa bawat dalas ng compounding. Hindi maaaring pumalya sa ganoong paraan ang isang talata. Ang formula ay maaari, at kapag nangyari iyon, humihinto ang build.',
    ],
    datesHeading: 'Mga petsa ng pagsusuri',
    datesBody:
      'May petsa ng huling pagsusuri ang bawat gabay. Ang gabay na ang nilalaman ay nakadepende sa datos mula sa labas ay sinusuri nang hindi bababa sa dalawang beses sa isang taon; ang gabay na nagpapaliwanag ng aritmetika ay sinusuri kapag nagbago ang formula sa likod nito, at sa anumang kaso isang beses sa isang taon. Kapag sinuri ang isang pahina, gumagalaw ang petsa, nagbago man ang teksto o hindi, kaya sinasabi ng petsa kung kailan huling binasa ng isang tao ang pahina.',
    correctionsHeading: 'Mga pagwawasto',
    correctionsBody:
      'Hayagan ang mga pagwawasto. Naa-update ang petsa ng pagsusuri ng pahinang naitama, at inilalarawan ang pagwawasto sa thread ng pakikipag-ugnayan na pinagmulan nito. Ang gabay na may maling numero ay depekto ng review, hindi ng pagsulat, at ang proseso ng review ang binabago.',
    contactLink: 'pakikipag-ugnayan',
  },

  privacy: {
    title: 'Privacy',
    description:
      'Ano ang kinokolekta ng site na ito, ano ang hindi nito kinokolekta, at aling mga provider ng advertising at analytics ang lumalabas sa mga pahina.',
    heading: 'Privacy',
    lede: 'Ang maikling bersiyon: nananatili sa browser mo ang mga numerong itina-type mo sa calculator, at walang tracking cookie na iniingatan ang site mismo.',
    calculatorsHeading: 'Ano ang ginagawa ng mga calculator sa input mo',
    calculatorsBody:
      'Wala. Tumatakbo ang aritmetika sa browser mo gamit ang JavaScript na dina-download kasama ng pahina. Hindi ipinapadala kahit saan ang mga halagang inilagay mo, hindi iniimbak, at hindi nakikita ng site o ng sinuman. Nabubura ang mga ito kapag isinara mo ang tab.',
    stateHeading: 'Ang estado mo',
    stateBody:
      'Dalawa sa mga calculator ang nangangailangan ng numero ng estado: ang federal income tax calculator, na nagdaragdag ng state income tax sa ibabaw ng federal, at ang rent vs buy calculator, na isinasama ang buwis sa ari-arian sa gastos ng pagmamay-ari ng bahay. Kapag nagbukas ang isa sa mga pahinang iyon, tinatanong nito sa site na ito kung saang estado nagmula ang request. Ang sagot ay galing sa network na naghahatid ng site, na binabasa ang estado mula sa address ng request, at ginagamit ito para punan ang isang field. Wala nang ibang nangyayari dito: hindi iniimbak ang sagot, hindi isinusulat sa cookie, at hindi ipinapadala sa Google o sa page analytics ng hosting provider. Tantiya lamang ang estado — maaaring ituro ng VPN, proxy o mobile network ang maling estado — at maaaring baguhin o burahin ang napunang field, at sa ganoong kaso pinapanatili ng pahina ang numerong itinype mo.',
    cookiesHeading: 'Cookies',
    cookiesBody:
      'Walang sariling cookie ang {name}. Tumatakbo sa Google Analytics 4 ang sariling analytics ng site, na inihahatid ng Google mula sa sarili nitong mga domain at nag-iimbak ng first-party identifier sa browser mo para maihiwalay ang isang pagbisita sa susunod. Hindi ginagamit ang identifier na iyon para sa advertising at hindi ibinabahagi sa ibang site. Walang iniimbak sa browser mo ang page analytics ng hosting provider: walang cookie, walang local storage, walang anumang uri ng identifier.',
    advertisingHeading: 'Advertising',
    advertisingBody:
      'Pinopondohan ang site ng display advertising na inihahatid ng Google AdSense. Maaaring maglagay ng cookies o gumamit ng katulad na teknolohiya ang Google at ang mga partner nito para maghatid at sumukat ng advertising, at maaari nilang gamitin ang mga ito para magpakita ng ad batay sa mga nauna mong pagbisita sa site na ito o sa ibang website. Maaari mong suriin at baguhin ang mga pinili mo sa {adsSettingsLink}, at ang sariling paliwanag ng Google kung paano nito ginagamit ang datos mula sa mga site at app na gumagamit ng mga serbisyo nito ay nasa {policiesLink}.',
    adsSettingsLink: 'Google Ads Settings',
    policiesLink: 'policies.google.com',
    analyticsPoliciesLink: 'policies.google.com',
    analyticsHeading: 'Analytics',
    analyticsBody:
      'Itinatala ang mga page view gamit ang Google Analytics 4, na inihahatid ng Google mula sa googletagmanager.com. Limitado ang ginagamit na datos sa pahina, sa pinanggalingang link at sa tantiyang lokasyon sa antas ng bansa o lungsod; pinuputol ang IP address sa halip na iimbak nang buo. Ginagamit ito para bilangin ang mga pagbisita at alamin kung aling mga pahina ang binabasa. Ang sariling paliwanag ng Google kung paano nito ginagamit ang datos mula sa mga site at app na gumagamit ng mga serbisyo nito ay nasa {analyticsPoliciesLink}. Ilo-load lamang ang script matapos mong tanggapin ang tanong tungkol sa cookies, at ilo-load din ito para sa mga mambabasa sa European Union.',
    hostingAnalyticsHeading: 'Hosting at bilis ng pahina',
    hostingAnalyticsBody:
      'Naka-host ang site sa Cloudflare, at tumatakbo sa bawat pahina ang sariling Web Analytics ng Cloudflare. Sinusukat ng maliit na script na inihahatid mula sa static.cloudflareinsights.com ang page view: kung aling pahina ang binuksan, saan nanggaling ang pagbisita, anong browser at operating system ang ginamit, saang bansa nagmula ang request, at gaano katagal nag-load ang pahina. Ginagamit ang IP address sa edge ng Cloudflare para matukoy ang bansa at itinatapon doon sa halip na iimbak. Hindi naglalagay ng cookie ang script, walang isinusulat sa local storage, at hindi lumilikha ng identifier na makasusunod sa iyo mula sa isang pahina patungo sa susunod. Ang lumalabas dito ay bilang ng mga page view at pagbisita, at sukat ng bilis ng pag-load ng mga pahina. Ilo-load lamang ang script matapos mong tanggapin ang tanong tungkol sa cookies. Hindi binibilang kailanman ang mambabasa sa European Union: hindi ilo-load ang script para sa kanila.',
    newsletterHeading: 'Newsletter',
    newsletterBody:
      'Kung mag-subscribe ka sa newsletter, ipapadala ang address na inilagay mo sa Buttondown, ang serbisyong nagpapadala ng mail, at iimbakin doon para maipadala ang newsletter. Ginagamit ang address na iyon para sa newsletter at wala nang iba, at may link para mag-unsubscribe ang bawat isyu.',
    contactHeading: 'Ang contact form',
    contactBody:
      'Kung sumulat ka ng mensahe sa contact form, ipinapadala sa email ang pangalan, email address, paksa at ang mensahe mismo sa taong nagpapatakbo ng site, at iniingatan sa mailbox na iyon. Inihahatid ng site na ito ang form at pupunta ang sagot sa address na isinulat mo, para maipagpatuloy mo ang usapan. Walang ipinapadala ang form sa Google at walang sariling cookie; ang mga script ng advertising at analytics na inilarawan sa itaas ay pag-aari ng buong pahina at nilo-load lamang kung tinanggap mo ang cookies. Walang anumang itina-type mo ang iniimbak sa site mismo, at hindi ipinapasa ang mensahe sa iba.',
    thirdPartyHeading: 'Mga link sa third party',
    thirdPartyBody:
      'Nagli-link ang mga gabay sa mga pangunahing sanggunian — mga ahensiya ng gobyerno, ang SEC, ang Federal Reserve. May sariling privacy policy ang mga site na iyon, na hindi kontrolado ng site na ito at hindi nito binasa para sa iyo.',
    changesHeading: 'Mga pagbabago',
    changesBody:
      'Kung magbago ang mga provider sa itaas, magbabago rin ang pahinang ito. Ang petsa sa ibaba ng pahina ay ang petsa ng huling pagsusuri sa tekstong ito.',
    consentHeading: 'Ang pinili mo',
    consentBody:
      'Walang ilo-load mula sa Google, at nakapatay ang page analytics ng hosting provider, hanggang sumagot ka. Kung tatanggapin mo, ilo-load ang mga script ng advertising at analytics at tatandaan ang sagot sa browser mo; kung tatanggihan mo, gagana ang site nang eksaktong pareho at walang ilo-load. Hindi isinasama ang page analytics ng hosting provider para sa mambabasa sa European Union, anuman ang sagot. Muling binubuksan ng link na "{settingsLink}" sa footer ang tanong. Isang eksepsiyon: ang sariling crawler ng Google, na sumusuri kung may advertising ang site, ay direktang binibigyan ng advertising script, dahil hindi nito masasagot ang tanong. Walang pinipiling itinatala para dito at walang iniimbak tungkol dito. Ang estadong inilarawan sa itaas ay binabasa sa dalawang pahina ng calculator at hindi bahagi ng pagpiling ito: walang cookie na inilalagay para dito at walang anumang tungkol dito ang umaabot sa analytics provider.',
    lastReviewed: 'Huling sinuri: {date}.',
  },

  terms: {
    title: 'Mga tuntunin',
    description:
      'Ang mga tuntunin kung saan inilalathala ang site na ito, ang sakop at hindi sakop ng mga calculator nito, at ang hangganan ng maipapangako nito.',
    heading: 'Mga tuntunin ng paggamit',
    lede: 'Simpleng tuntunin para sa site na naglalathala ng mga kuwenta, hindi ng mga rekomendasyon.',
    providesHeading: 'Ang ibinibigay ng site na ito',
    providesBody:
      'Naglalathala ang {name} ng mga calculator at ng nakasulat na paliwanag sa aritmetika sa likod ng mga ito. Inilalapat ng mga calculator ang mga nailathalang formula sa mga halagang inilagay mo at ibinabalik ang resulta kasama ang kuwenta. Iyon na ang buong serbisyo.',
    notProvidesHeading: 'Ang hindi ibinibigay ng site na ito',
    notProvidesBody: [
      'Walang anuman dito ang payong pampinansiyal, pambuwis, legal o pampamumuhunan, at walang anuman dito ang rekomendasyon na bumili, magbenta, humawak, umupa, magmay-ari, mag-refinance o pumirma ng kahit ano. Sinasalamin ng resulta ang mga input na inilagay mo at ang formula sa pahina. Baguhin ang isang input at magbabago ang resulta; iyon ang dahilan kung bakit kuwenta ito at hindi konklusyon.',
      'Hindi nakikita ng calculator ang pananalapi mo, ang kita mo, ang credit mo, ang abot ng panahon mo o ang kakayahan mong humarap sa panganib, at hindi nito sinusubukang hulaan ang mga ito. Ang dalawang taong may parehong input at magkaibang kalagayan ay aabot sa magkaibang konklusyon, at wala sa posisyon ang calculator para sabihin kung alin sa kanila ang tama.',
    ],
    figuresHeading: 'Mga numero, sanggunian at petsa',
    figuresBody:
      'Kapag galing sa labas ang isang numero, nagli-link ang pahina sa pinagmulang iyon at ibinibigay ang petsa kung kailan ito binasa. Nagbabago ang datos mula sa labas: nirerebisa ang mga threshold ng buwis, ang mga nailathalang rate at ang mga opisyal na estadistika. Tumpak ang numero sa isang pahina hanggang sa petsa ng pagsusuri ng pahinang iyon at hindi lampas doon, at naroon ang petsa ng pagsusuri para makita mo kung gaano na ito kaluma.',
    errorsHeading: 'Mga pagkakamali',
    errorsBody:
      'Isang beses lang ipinatupad ang mga kuwenta, sa iisang lugar, at sinubok. Gayunman, posible pa rin ang pagkakamali. Kung may makita ka, ipinapaliwanag ng pahina ng pakikipag-ugnayan kung paano ito iulat, at inaayos ang mga naiulat na depekto at ina-update ang petsa ng pagsusuri.',
    advertisingHeading: 'Advertising',
    advertisingBody:
      'Pinopondohan ang site ng display advertising. Inihahatid ng isang third party ang mga ad at hindi ito kontrolado ng site. May label ang mga ad at hiwalay sa sariling nilalaman ng site. Walang advertiser na nagbabayad para sa isang pahina, isang puwesto, isang puwesto sa resulta ng paghahanap, o pagbanggit ng isang produkto sa isang gabay.',
    useHeading: 'Paggamit ng site',
    useBody:
      'Inilalathala ang site para sa personal na paggamit. Maaari mo itong basahin, i-print at i-link. Hindi mo maaaring muling ilathala ang malalaking bahagi ng mga gabay bilang sarili mong gawa, o gamitin ang mga calculator para bumuo ng produktong kakumpitensiya ng site.',
    changesHeading: 'Mga pagbabago',
    changesBody:
      'Maaaring magbago ang mga tuntuning ito habang nagbabago ang site. Ang petsa ng pagsusuri sa ibaba ay ang petsa kung kailan huling binasa ang tekstong ito.',
    lastReviewed: 'Huling sinuri: {date}.',
    contactLink: 'pahina ng pakikipag-ugnayan',
  },

  notFound: {
    title: 'Hindi nahanap ang pahina',
    description: 'Wala ang pahinang iyan sa site na ito. Narito kung saan talaga naroroon ang lahat.',
    heading: 'Hindi nahanap ang pahina',
    lede: 'Walang ganyang URL dito. Lahat ng inilalathala ng site ay mga calculator, ang mga gabay sa likod ng mga ito, o ang mga pahinang nagpapaliwanag kung saan nagmumula ang mga numero.',
    calculators: {
      title: 'Mga calculator',
      text: 'Hulog sa mortgage, upa o bili, compound interest.',
    },
    guides: {
      title: 'Mga gabay',
      text: 'Ang aritmetika sa likod ng bawat calculator, nang detalyado.',
    },
    sources: {
      title: 'Mga sanggunian',
      text: 'Bawat pangunahing sanggunian na pinagbabatayan ng site.',
    },
    contact: {
      title: 'Makipag-ugnayan',
      text: 'Sabihin sa amin kung ano ang kulang o mali.',
    },
  },

  tool: {
    'mortgage-payment': {
      name: 'Mortgage Payment Calculator',
      title: 'Mortgage Payment Calculator na may Amortization',
      description:
        'Kuwentahin ang buwanang hulog sa mortgage, ang kabuuang gastos na PITI at ang buong amortization schedule. Tingnan ang bawat dolyar ng interes at kung paano inaagahan ng mga dagdag na bayad ang petsa ng pagkabayad.',
      short: 'Buwanang P&I, buong PITI, amortization schedule at ang epekto ng mga dagdag na bayad.',
      category: 'Bahay',
      methodNote:
        'Inilalarawan sa ibaba ang formula ng hulog, ang amortization schedule at kung paano inilalapat ang mga dagdag na bayad. Walang anuman sa pahinang ito ang live na quote mula sa merkado.',
      fields: {
        homePrice: 'Presyo ng bahay',
        downPayment: 'Down payment',
        percentOfPrice: 'porsiyento ng presyo',
        interestRate: 'Interest rate',
        annualFixed: 'taunan, fixed',
        loanTerm: 'Termino ng utang',
        propertyTax: 'Buwis sa ari-arian',
        percentOfPricePerYear: '% ng presyo bawat taon',
        homeInsurance: 'Insurance ng bahay',
        perYear: 'bawat taon',
        hoaFee: 'HOA o condo fee',
        perMonth: 'bawat buwan',
        extraPrincipal: 'Dagdag na bayad sa principal',
        firstPayment: 'Unang hulog',
        month: 'buwan',
        seeAmortization: 'Tingnan ang amortization bawat taon',
      },
      terms: {
        years: (n: number) => `${n} taon`,
      },
      table: {
        year: 'Taon',
        principal: 'Principal',
        interest: 'Interes',
        balance: 'Balanse',
      },
      result: {
        headlineLabel: 'Kabuuang buwanang hulog (PITI)',
        principalAndInterest: 'Principal at interes',
        propertyTax: 'Buwis sa ari-arian',
        insurance: 'Insurance',
        hoa: 'HOA',
        totalInterest: 'Kabuuang interes',
        paidOff: 'Bayad na sa',
        note: 'Principal, interes, buwis sa ari-arian, insurance at HOA, gamit ang mga numerong inilagay mo.',
      },
      resultNote:
        'Baguhin ang anumang field at mag-a-update ang mga numero habang nagta-type ka. Walang ipinapadala kahit saan: tumatakbo ang aritmetika sa pahinang ito.',
      chart: {
        title: 'Ang balanse at ang interes, bawat taon',
        note: 'Bumababa ang balanse habang binabayaran ang utang, at bumababa rin kasama nito ang interes na binabayaran bawat taon.',
        xAxis: 'years',
        series: [
          { key: 'balance', label: 'Balanse' },
          { key: 'interest', label: 'Interes na naibayad' },
        ],
      },
      formula: 'M = P · r(1 + r)ⁿ / ((1 + r)ⁿ − 1)',
      method: [
        'Galing sa karaniwang amortization formula ang nakatakdang buwanang hulog:',
        'Ang P ay ang halagang hiniram, na kinukuwenta ng pahinang ito bilang presyo ng bahay bawas ang down payment. Ang r ay ang taunang rate na inilagay mo na hinati sa labindalawa, at ang n ay ang termino sa buwan. Mula sa iisang numerong iyon bumubuo ang calculator ng iskedyul buwan-buwan: sinisingil ang interes sa balanseng natitira sa simula ng buwan, at ang natitira sa hulog matapos ang interes na iyon ang nagbabawas sa balanse.',
        'Ang buong buwanang hulog ay ang principal at interes kasama ang buwis sa ari-arian na hinati sa labindalawa, ang insurance na hinati sa labindalawa, at anumang HOA fee. Ikaw ang nagtatakda ng tatlong ito: hindi alam ng calculator kung magkano ang singil ng lokal na assessment o ng insurer mo, at hindi ito nanghuhula para sa iyo.',
        'Inilalapat sa principal ang dagdag na buwanang bayad, kaya binabawasan nito ang balanseng sisingilan ng interes sa susunod na buwan. Hindi nagbabago ang nakatakdang hulog, mas maagang natatapos ang utang, at bumababa ang kabuuang interes.',
      ],
      limits: [
        'Hindi nito sinusuri kung kuwalipikado ka sa utang, at hindi nito tinitingnan ang credit score mo, kita, debt-to-income ratio o ang mga patakaran sa underwriting ng anumang nagpapautang.',
        'Hindi ito nagbibigay ng kasalukuyang rate sa merkado para sa postal code mo. Ang interest rate na inilagay mo ang ginagamit na rate, at walang anuman sa pahinang ito ang live.',
        'Hindi nito kinukuwenta ang private mortgage insurance, points, loan origination fee, closing cost, o ang timing ng escrow na nagpapasya kung aling buwan darating ang singil sa buwis.',
        'Hindi nito sinasabi kung bibili ka ng bahay. Naglalabas ito ng numero at ng kuwenta sa likod nito.',
      ],
      faq: [
        {
          q: 'Ano ang ibig sabihin ng PITI?',
          a: 'Principal, Interest, Taxes and Insurance — principal, interes, buwis at insurance. Ito ang apat na bahagi ng buwanang bayad sa bahay: ang bahaging nagbabayad sa utang, ang bahaging ibinabayad sa nagpapautang para sa paghiram, ang buwis sa ari-arian, at ang homeowners insurance. Ipinapakita ng calculator na ito ang bawat bahagi nang hiwalay para makita mo kung ano ang bumubuo sa kabuuan.',
        },
        {
          q: 'Paano kinukuwenta ang buwanang principal at interes?',
          a: 'Sa karaniwang amortization formula: M = P · r(1 + r)ⁿ / ((1 + r)ⁿ − 1), kung saan ang P ay ang halagang hiniram, ang r ay ang buwanang interest rate at ang n ay ang bilang ng buwanang hulog. Sa iskedyul na kasunod nito, bumababa ang interes at tumataas ang principal bawat buwan, kaya karamihan ng mga unang hulog ay interes.',
        },
        {
          q: 'Ano ang nangyayari sa huling hulog?',
          a: 'Ini-round sa pinakamalapit na sentimo ang nakatakdang hulog, na nag-iiwan ng ilang sentimo sa katapusan ng termino. Inaayos ang huling nakatakdang hulog para magsara ang utang sa eksaktong zero, sa parehong paraan ng pag-aayos ng nagpapautang sa huling hulog.',
        },
        {
          q: 'Pinaiikli ba ng dagdag na bayad ang utang o ang hulog?',
          a: 'Ang utang. Inilalapat sa principal ang dagdag na bayad, na nagbabawas sa balanseng sisingilan ng interes sa susunod na buwan. Nananatili ang nakatakdang hulog, at mas maagang natatapos ang utang na may mas kaunting kabuuang interes.',
        },
        {
          q: 'Naaapektuhan ba ng buwis at insurance na inilagay ko ang kabuuang interes?',
          a: 'Hindi. Sakop lamang ng kabuuang interes ang utang. Ang buwis sa ari-arian, insurance at HOA ay mga gastos sa bahay na nagpapatuloy kahit bayad na ang utang, kaya hiwalay na iniuulat ng calculator ang kabuuang gastos sa bahay.',
        },
        {
          q: 'Isinasaalang-alang ba ng calculator ang inflation?',
          a: 'Hindi. Nasa dolyar na inilagay mo ang bawat numero. Ang hulog sa mortgage pagkalipas ng 30 taon ay mas maliit na bahagi ng kita kaysa sa parehong hulog ngayon, at walang numero sa pahinang ito ang inaayos para doon.',
        },
      ],
      sources: [
        {
          label: 'CFPB — Paano kuwentahin ang hulog sa mortgage',
          url: 'https://www.consumerfinance.gov/ask-cfpb/how-do-i-calculate-my-mortgage-payment-en-144/',
        },
        {
          label: 'Freddie Mac — Primary Mortgage Market Survey (pamamaraan ng rate)',
          url: 'https://www.freddiemac.com/pmms',
        },
        {
          label: 'HUD — mga kinakailangan sa FHA loan at mortgage insurance',
          url: 'https://www.hud.gov/helping_american_homeowners',
        },
        {
          label: 'BLS — Consumer Price Index (inflation, para sa tala tungkol sa tunay na halaga)',
          url: 'https://www.bls.gov/cpi/',
        },
      ],
      relatedGuides: [
        { slug: 'mortgage-payment-calculator-explained', title: 'Ipinaliwanag ang mortgage payment calculator' },
        { slug: 'how-mortgage-amortization-works', title: 'Paano gumagana ang mortgage amortization' },
        { slug: 'monthly-payment-vs-total-cost-mortgage', title: 'Buwanang hulog laban sa kabuuang gastos ng mortgage' },
        { slug: 'extra-mortgage-payments-math', title: 'Ang math sa likod ng dagdag na bayad sa mortgage' },
        { slug: 'how-to-read-an-amortization-schedule', title: 'Paano basahin ang amortization schedule' },
      ],
    },

    'rent-vs-buy': {
      name: 'Rent vs Buy Calculator',
      title: 'Rent vs Buy Calculator: Ihambing ang Tunay na Gastos',
      description:
        'Ihambing ang pag-upa at pagmamay-ari sa numero: buwanang gastos, paunang gastos, equity at ang buwan kung kailan nagsasalubong ang dalawang landas. Walang hatol, aritmetika lamang.',
      short: 'Buwanang gastos, paunang gastos, pag-ipon ng equity at ang buwan ng pagsasalubong.',
      category: 'Bahay',
      methodNote:
        'Perang lumalabas at equity ang inihahambing. Sadyang walang hatol ito — ang buwan ng pagsasalubong ay katotohanan tungkol sa mga numerong inilagay mo, hindi rekomendasyon.',
      sections: {
        theHome: 'Ang bahay',
        theRent: 'Ang upa',
        runningCosts: 'Mga tuloy-tuloy na gastos',
        assumptions: 'Mga palagay',
      },
      fields: {
        purchasePrice: 'Presyo ng pagbili',
        downPayment: 'Down payment',
        percentOfPrice: 'porsiyento ng presyo',
        mortgageRate: 'Mortgage rate',
        annualFixed: 'taunan, fixed',
        loanTerm: 'Termino ng utang',
        monthlyRent: 'Buwanang upa',
        rentersInsurance: 'Renter’s insurance',
        perMonth: 'bawat buwan',
        propertyTax: 'Buwis sa ari-arian',
        percentOfPricePerYear: '% ng presyo bawat taon',
        homeInsurance: 'Insurance ng bahay',
        perYear: 'bawat taon',
        hoaFee: 'HOA o condo fee',
        maintenance: 'Maintenance',
        annualChangeInValue: 'Taunang pagbabago ng halaga',
        negativeModelsAFall: 'ang negatibo ay pagbaba',
        compareOver: 'Ihambing sa loob ng',
        closingCosts: 'Closing cost',
        percentOfPriceOnce: '% ng presyo, minsan',
        sellingCosts: 'Gastos sa pagbebenta',
        percentOfFinalValue: '% ng huling halaga',
      },
      terms: {
        years: (n: number) => `${n} taon`,
      },
      result: {
        headlineLabel: 'Buwanang diperensiya (pagmamay-ari bawas pag-upa)',
        monthlyRent: 'Buwanang upa',
        monthlyOwnership: 'Buwanang gastos ng pagmamay-ari',
        monthlyOwnershipAfterLoan: 'Buwanang gastos ng pagmamay-ari kapag bayad na ang utang',
        upfrontOutlay: 'Paunang gastos',
        equityBuilt: 'Naipong equity',
        homeValueAtHorizon: 'Halaga ng bahay sa dulo',
        sellingCostsAtHorizon: 'Gastos sa pagbebenta sa dulo',
        netCostAtHorizon: 'Netong gastos ng pagmamay-ari sa dulo',
        crossover: 'Pagsasalubong',
        note: 'Kasama sa pagmamay-ari ang hulog sa mortgage habang tumatakbo ang utang, at ang buwis sa ari-arian, insurance, HOA at maintenance pagkatapos nito. Ang equity ay ang halaga ng bahay bawas ang natitirang utang, bawas ang gastos sa pagbebenta kung ibebenta sa puntong iyon.',
      },
      resultNote:
        'Ang pagsasalubong ay ang unang buwan kung kailan ang netong gastos ng pagmamay-ari — perang naibayad bawas ang equity na maiiwan ng pagbebenta — ay bumaba sa perang gastos ng pag-upa. Katotohanan ito tungkol sa mga numerong ito, hindi rekomendasyon.',
      chart: {
        title: 'Ang gastos ng pag-upa laban sa gastos ng pagmamay-ari',
        note: 'Parehong naiipong pera ang dalawang linya: ang upang naibayad, at ang perang ginastos sa bahay matapos ibawas ang equity na naipon nito, neto sa gastos ng pagbebenta sa puntong iyon.',
        xAxis: 'years',
        series: [
          { key: 'rent', label: 'Upang naibayad' },
          { key: 'ownership', label: 'Netong gastos ng pagmamay-ari' },
        ],
      },
      method: [
        'Bawat buwan, dalawang ledger ang sabay na pinapatakbo ng calculator. Idinadagdag ng ledger ng pag-upa ang upa mo at ang renter’s insurance. Idinadagdag ng ledger ng pagmamay-ari ang hulog sa mortgage mula sa karaniwang amortization formula, ang buwis sa ari-arian, insurance, HOA at ang laang-gugol para sa maintenance, pati ang down payment at closing cost sa unang buwan. Humihinto ang hulog sa mortgage kapag bayad na ang utang; nagpapatuloy ang ibang tuloy-tuloy na gastos habang pag-aari mo ang bahay.',
        'Kasabay ng ikalawang ledger, sinusubaybayan nito ang halaga ng bahay, na tumataas o bumababa bawat buwan ayon sa taunang rate na inilagay mo, at ang natitirang balanse ng utang. Ang diperensiya ng dalawa ang equity mo:',
        'Ang netong gastos ng pagmamay-ari ay ang perang naibayad mo, bawas ang equity na naipon mo, dagdag ang gastos sa pagbebenta kung ibebenta sa puntong iyon. Ang buwan ng pagsasalubong ay ang unang buwan kung kailan mas mababa ang numerong iyon kaysa sa upang naibayad mo sana sa parehong panahon. Hindi bahagi ng buwanang hulog ang gastos sa pagbebenta, dahil hindi mo ito binabayaran hangga’t hindi ka nagbebenta; kasama ito ng equity, kung saan nangyayari ang pagbebenta.',
      ],
      formula: 'equity = halaga ng bahay − natitirang balanse ng utang',
      limits: [
        'Hindi nito sinasabi kung aling opsiyon ang mas angkop sa iyo. Inihahambing ang dalawang landas gamit ang mga numerong ibinigay mo at iniuulat ang buwan ng pagsasalubong, wala nang iba.',
        'Hindi nito kinukuwenta ang pagbubuwis sa pagbebenta, ang mortgage interest deduction, o ang depreciation ng ari-arian sa paglipas ng panahon.',
        'Hindi nito pinepresyuhan ang isang partikular na utang. Ang mortgage rate na inilagay mo ang ginagamit; walang live na quote at walang impormasyon ng nagpapautang sa pahina.',
        'Hindi nito hinuhulaan ang presyo ng bahay. Inilalapat buwan-buwan sa buong panahon ang taunang pagbabago ng halaga na inilagay mo, sa dalawang direksiyon kung negatibong numero ang ilalagay mo.',
        'Hindi nito kinukuwenta ang gastos ng pag-alis sa inuupahang bahay. Nasa labas ng paghahambing sa panig ng pag-upa ang deposito, bayad sa ahente at gastos sa paglipat.',
        'Hindi nito ginagamit ang rate ng isang partikular na county o lungsod. Ang rate ng buwis sa ari-arian na maaaring punan ng pahina ay ang average ng estado, at lokal na itinatakda ang buwis sa ari-arian, kaya kadalasang iba ang rate sa isang hurisdiksiyon kaysa sa kasunod nito.',
      ],
      faq: [
        {
          q: 'Ano ang ibig sabihin ng buwan ng pagsasalubong?',
          a: 'Ito ang unang buwan kung kailan ang netong gastos ng pagmamay-ari — ang perang naibayad mo, bawas ang equity na naipon mo, dagdag ang gastos sa pagbebenta sa puntong iyon — ay mas mababa kaysa sa perang naibayad mo sana sa upa sa parehong panahon. Bago ang puntong iyon, mas mura sa pera ang pag-upa. Pagkatapos nito, mas mura ang pagmamay-ari kapag isinama ang equity.',
        },
        {
          q: 'Bakit may laang-gugol para sa maintenance ang kuwenta?',
          a: 'Gumagastos ang bahay para manatiling maayos may mortgage man o wala, at hindi lumalabas ang gastos na iyon sa anumang closing statement. Inilalapat ito ng calculator bilang porsiyento ng presyo ng pagbili bawat taon, at ikaw ang nagtatakda ng porsiyento.',
        },
        {
          q: 'Ano ang nangyayari sa halaga ng bahay sa kuwenta?',
          a: 'Tumataas o bumababa ito bawat buwan ayon sa taunang rate na inilagay mo, saka inihahambing sa natitirang balanse ng utang para makuha ang equity. Ang negatibong rate ay merkadong bumababa; ang zero na rate ay nagpapanatili sa presyo.',
        },
        {
          q: 'Kasama ba ang gastos sa pagbebenta?',
          a: 'Oo. Sinisingil ang gastos sa pagbebenta sa presyo ng bahay sa sandali ng pagbebenta, kaya hindi ito bahagi ng buwanang hulog. Binabawasan nito ang equity na maiiwan ng pagbebenta, kaya bahagi ito ng netong gastos ng pagmamay-ari at ng buwan ng pagsasalubong. Iniuulat ang numero nang hiwalay sa dulo.',
        },
        {
          q: 'Ano ang nangyayari sa hulog sa mortgage kapag bayad na ang utang?',
          a: 'Humihinto ito. Natatapos ang principal at interes kasabay ng utang, habang nagpapatuloy ang buwis sa ari-arian, insurance, HOA at maintenance hangga’t pag-aari ang bahay. Kapag lumampas sa termino ang paghahambing, ang mga buwan pagkatapos nito ay may tuloy-tuloy na gastos lamang.',
        },
        {
          q: 'Ano ang diperensiya ng kabuuang upa at ng netong gastos ng pagmamay-ari?',
          a: 'Ang kabuuang upa ay ang binabayad mong upa bawat buwan na pinarami sa bilang ng buwan. Ang netong gastos ng pagmamay-ari ay ang ibinabayad mo sa mortgage, buwis, insurance, HOA at maintenance, dagdag ang paunang gastos, bawas ang naipong equity, dagdag ang gastos sa pagbebenta. Maaaring negatibo ang ikalawang numero, ibig sabihin, mas malaki ang naipon mong equity kaysa sa naibayad mo.',
        },
        {
          q: 'Kasama ba rito ang epekto sa buwis ng pagbebenta ng bahay?',
          a: 'Hindi. Nasa labas ng saklaw ng tool na ito ang anumang tubo sa pagbebenta, at anumang exclusion na naaangkop dito. Paghahambing ito ng pera at equity, hindi ng buwis.',
        },
        {
          q: 'Saan galing ang rate ng buwis sa ari-arian?',
          a: 'Isa itong input. Kapag natukoy ng network kung saang estado nagmula ang request, pinupunan ng pahina ang field ng average na effective na rate ng buwis sa ari-arian ng estadong iyon, mula sa American Community Survey ng 2024 at inilathala ng Tax Foundation para sa 2026. Itinatakda ng mga lokal na pamahalaan ang buwis sa ari-arian, kaya kadalasang iba ang rate sa isang partikular na county o lungsod kaysa sa average ng estado, at maaari pa ring baguhin ang field.',
        },
      ],
      sources: [
        {
          label: 'CFPB — mga gastos sa pabahay, pag-upa at pagmamay-ari',
          url: 'https://www.consumerfinance.gov/consumer-tools/mortgages/',
        },
        {
          label: 'HUD — mga gastos sa pabahay, buwis sa ari-arian at gabay sa insurance',
          url: 'https://www.hud.gov/helping_american_homeowners',
        },
        {
          label: 'BLS — Consumer Price Index (inflation, para sa tala tungkol sa pagtaas ng halaga)',
          url: 'https://www.bls.gov/cpi/',
        },
        {
          label: 'FRED — serye ng home price index para sa pangmatagalang galaw ng presyo',
          url: 'https://fred.stlouisfed.org/series/HPINUS',
        },
        {
          label: 'Tax Foundation — Property Taxes by State and County, 2026',
          url: 'https://taxfoundation.org/data/all/state/property-taxes-by-state-county/',
        },
      ],
      relatedGuides: [
        { slug: 'rent-vs-buy-calculator-explained', title: 'Ipinaliwanag ang rent vs buy calculator' },
        { slug: 'rent-vs-buy-common-mistakes', title: 'Mga karaniwang pagkakamali sa paghahambing ng upa at bili' },
        { slug: 'estimating-property-tax-and-home-insurance', title: 'Pagtantiya sa buwis sa ari-arian at insurance ng bahay' },
        { slug: 'down-payment-and-closing-costs-explained', title: 'Ipinaliwanag ang down payment at closing cost' },
        { slug: 'monthly-payment-vs-total-cost-mortgage', title: 'Buwanang hulog laban sa kabuuang gastos ng mortgage' },
      ],
      script: {
        notWithinHorizon: 'Wala sa loob ng panahon',
        month: 'Buwan {n}',
        propertyTaxDetected: 'Pinunan para sa {state}: ang average na effective na rate ng buwis sa ari-arian ng estado.',
      },
    },

    'compound-interest': {
      name: 'Compound Interest Calculator',
      title: 'Compound Interest Calculator na may Buwanang Hulog',
      description:
        'I-project ang balanse na may regular na hulog, piliin ang dalas ng compounding, at tingnan ang resulta sa dolyar ngayon matapos ang inflation. Ipinapakita ang mga formula.',
      short: 'Balanse, mga hulog, kinitang interes at ang halagang inayos sa inflation.',
      category: 'Pamumuhunan',
      methodNote:
        'Tumatakbo ang projection nang isang period sa bawat pagkakataon, kaya ang taunang table ay galing sa parehong aritmetikang naglalabas ng huling numero.',
      fields: {
        startingBalance: 'Panimulang balanse',
        today: 'ngayon',
        monthlyContribution: 'Buwanang hulog',
        addedEachMonth: 'idinadagdag bawat buwan',
        interestRate: 'Interest rate',
        annualNominal: 'taunan, nominal',
        time: 'Panahon',
        years: 'taon',
        compounding: 'Compounding',
        contributionTiming: 'Oras ng hulog',
        inflation: 'Inflation',
        annualForRealValue: 'taunan, para sa tunay na halaga',
        seeBalance: 'Tingnan ang balanse bawat taon',
      },
      frequencies: {
        monthly: 'Buwanan',
        quarterly: 'Kada tatlong buwan',
        twiceAYear: 'Dalawang beses sa isang taon',
        annually: 'Taunan',
        everyTwoMonths: 'Kada dalawang buwan',
        everyFourMonths: 'Kada apat na buwan',
      },
      timing: {
        endOfMonth: 'Katapusan ng buwan',
        startOfMonth: 'Simula ng buwan',
      },
      table: {
        year: 'Taon',
        balance: 'Balanse',
        contributed: 'Naihulog',
        interest: 'Interes',
        inTodaysDollars: 'Sa dolyar ngayon',
      },
      result: {
        headlineLabel: 'Balanse sa katapusan ng panahon',
        totalContributions: 'Kabuuang hulog',
        interestEarned: 'Kinitang interes',
        inTodaysDollars: 'Sa dolyar ngayon',
        effectiveAnnualRate: 'Effective na taunang rate',
        realAnnualRate: 'Tunay na taunang rate',
        horizon: 'Panahon',
        note: 'Nasa dolyar na inilagay mo ang balanse. Kino-convert ito ng numerong inayos sa inflation sa purchasing power ng unang taon.',
      },
      resultNote:
        'Ginagamit ang rate na inilagay mo nang eksakto sa buong panahon. Hindi naghahanap ng rate sa merkado ang pahinang ito.',
      chart: {
        title: 'Saan gawa ang balanse',
        note: 'Ang linya ang balanse. Ang banda sa ilalim nito ay ang bahaging galing sa interes at hindi sa mga hulog.',
        xAxis: 'years',
        series: [
          { key: 'balance', label: 'Balanse' },
          { key: 'contributed', label: 'Naihulog' },
        ],
      },
      method: [
        'Umaabante ang projection nang isang compounding period sa bawat pagkakataon. Sa bawat period, kumikita ng interes ang balanse sa rate ng period, saka idinadagdag ang hulog para sa period na iyon — sa katapusan o sa simula ng period, depende sa setting. Ang pagpapatakbo ng mga period nang sunod-sunod sa halip na gumamit ng iisang closed expression ang naglalabas ng table bawat taon, at pareho ang huling balanse alinman ang gamitin.',
        'Sa closed form, ang parehong resulta ay:',
        'kung saan ang P ay ang panimulang balanse, ang r ay ang taunang rate na hinati sa bilang ng compounding period bawat taon, ang n ay ang bilang ng period, at ang PMT ay ang hulog sa bawat period. Ang hulog sa simula ng period ay kumikita ng interes sa buong period na iyon, kaya pinararami sa (1 + r) ang bahagi ng hulog sa ganoong kaso.',
        'Galing sa dalawang pag-aayos ang mga tunay na numero. Ang effective na taunang rate ay (1 + r) na itinaas sa bilang ng period bawat taon, na siyang tunay na nagiging halaga ng 7 % na nominal rate matapos ang isang taon ng buwanang compounding. Kinukuha ng tunay na rate ang effective na rate na iyon at hinahati sa inflation factor, at ang balanse sa dolyar ngayon ay ang nominal na balanse na hinati sa inflation na naipon sa parehong panahon.',
      ],
      formula: 'FV = P(1 + r)ⁿ + PMT · ((1 + r)ⁿ − 1) / r',
      limits: [
        'Hindi ito nanghuhula ng kita. Ginagamit ang rate na inilagay mo nang eksakto sa buong panahon; walang historical average, walang forecast at walang datos ng merkado na pumapasok sa pahinang ito.',
        'Hindi nito kinukuwenta ang buwis, bayarin o singil ng account. Mag-iiba ang balanse ng tunay na account ayon sa kinukuha ng provider.',
        'Hindi nito kinukuwenta ang volatility ng merkado. Bumababa ang tunay na balanse sa mga taong bumababa ang tunay na merkado, at walang fixed na rate na nakahuhuli niyon.',
        'Hindi nito sinasabi kung paano mamuhunan o kung mag-iipon. Nagpo-project ito ng numero ayon sa mga palagay na ibinigay mo.',
      ],
      faq: [
        {
          q: 'Bakit 1, 2, 3, 4, 6 o 12 lang ang maaaring dalas ng compounding?',
          a: 'Dahil buwanan ang mga hulog dito, at pinananatiling pareho ng calculator ang compounding period at ang period ng hulog. Anumang dalas na naghahati nang buo sa labindalawa ay nagpapanatiling eksakto ang aritmetika sa halip na tantiya. Sa praktika, saklaw ng anim na ito ang compounding mula araw-araw hanggang taunan na may buwanang deposito.',
        },
        {
          q: 'Ano ang diperensiya ng nominal at ng effective na taunang rate?',
          a: 'Ang nominal rate ay ang numerong nakasulat sa account: 7 %. Ang effective ay ang tunay na kinikita ng balanse matapos ang isang taon ng compounding, kaya ang 7 % na buwanang kino-compound ay 7.229 %. Ipinapakita ng pahina ang dalawa, dahil mahalaga ang diperensiya sa mahahabang panahon.',
        },
        {
          q: 'Ano ang ibig sabihin ng tunay na halaga?',
          a: 'Ito ang huling balanse na ipinahayag sa purchasing power ng unang taon. Hinahati ng kuwenta ang nominal na balanse sa inflation na naipon sa parehong panahon, na nagpapakita kung gaano kalaki ng balanse ang tunay na paglago at gaano kalaki ang parehong dolyar na bumaba ang halaga.',
        },
        {
          q: 'Binabago ba ng oras ng hulog ang resulta?',
          a: 'Oo, at ipinapakita ng pahina ang dalawa. Ang hulog sa simula ng bawat period ay kumikita ng interes sa buong period na iyon, kaya mas malaki ang kinalalabasan nito kaysa sa parehong hulog sa katapusan. Maliit ang diperensiya bawat bayad pero naiipon ito sa loob ng mga dekada.',
        },
        {
          q: 'Ano ang nangyayari sa zero na interest rate?',
          a: 'Lumalaki ang balanse sa mga hulog lamang, walang interes. Hayagang hinahawakan ng calculator ang kasong ito sa halip na maghati sa zero, kaya eksaktong katumbas ng mga deposito ang numero.',
        },
        {
          q: 'Kailangan ba ang regular na hulog?',
          a: 'Hindi. Kapag ginawang zero ang buwanang hulog, nagiging simpleng projection ng compound interest sa panimulang balanse ang kuwenta, na siyang angkop na modelo para sa isang lump sum na naipuhunan na.',
        },
      ],
      sources: [
        {
          label: 'SEC — Investor.gov: compound interest at ang gastos ng mga bayarin',
          url: 'https://www.investor.gov/introduction-investing/investing-basics/glossary/compound-interest',
        },
        {
          label: 'BLS — Consumer Price Index (para sa mga numerong inayos sa inflation)',
          url: 'https://www.bls.gov/cpi/',
        },
        {
          label: 'Federal Reserve — datos ng rate ng time deposit at savings',
          url: 'https://www.federalreserve.gov/releases/h15/',
        },
        {
          label: 'IRS — compound interest at ang paglago ng tradisyonal na IRA',
          url: 'https://www.irs.gov/retirement-plans/traditional-iras',
        },
      ],
      relatedGuides: [
        { slug: 'compound-interest-calculator-explained', title: 'Ipinaliwanag ang compound interest calculator' },
        { slug: 'compound-vs-simple-interest', title: 'Compound interest laban sa simple interest' },
        { slug: 'how-compounding-frequency-changes-results', title: 'Paano binabago ng dalas ng compounding ang resulta' },
        { slug: 'inflation-and-real-returns-explained', title: 'Ipinaliwanag ang inflation at tunay na kita' },
        { slug: 'understanding-apr', title: 'Pag-unawa sa APR, ang annual percentage rate' },
      ],
      script: {
        yearsOne: '1 taon',
        yearsOther: '{n} taon',
      },
    },
    'net-pay': {
      name: 'Take-Home Pay Calculator',
      title: 'Take-Home Pay Calculator para sa 2026 Tax Year',
      description:
        'Kuwentahin kung ano ang natitira sa sahod matapos ang federal income tax, Social Security, Medicare at state tax, para sa anumang pay period, kasama ang bawat kaltas.',
      short: 'Ano ang natitira sa sahod matapos ang federal tax, payroll tax at state tax.',
      category: 'Sahod',
      methodNote:
        'Para sa 2026 tax year ang mga numero: Rev. Proc. 2025-32 para sa mga federal bracket at standard deduction, at ang Social Security Administration para sa mga limitasyon ng payroll tax. Walang anuman sa pahinang ito ang quote mula sa isang payroll provider.',
      fields: {
        grossPay: 'Gross pay',
        payPeriod: 'Pay period',
        filingStatus: 'Filing status',
        stateRate: 'Rate ng state income tax',
        stateRateHint: 'ang rate para sa bracket mo',
        retirementContribution: 'Kontribusyon sa 401(k) o 403(b)',
        retirementHint: 'bawat taon — sakop pa rin ng payroll tax',
        healthContribution: 'Kontribusyon sa HSA o FSA',
        healthHint: 'bawat taon — hindi sakop ng payroll tax',
        perYear: 'bawat taon',
        debtName: 'Utang',
        balance: 'Balanse',
        rate: 'Rate',
        minimum: 'Minimum na bayad',
      },
      terms: {
        payPeriods: {
          year: 'Taunan',
          month: 'Buwanan',
          week: 'Lingguhan',
          day: 'Bawat araw',
          hour: 'Bawat oras',
        },
        filingStatuses: {
          single: 'Single',
          married: 'Married filing jointly',
          head: 'Head of household',
        },
      },
      result: {
        headlineLabel: 'Take-home pay',
        annualGross: 'Gross pay para sa taon',
        federalTax: 'Federal income tax',
        socialSecurity: 'Social Security',
        medicare: 'Medicare',
        additionalMedicare: 'Additional Medicare tax',
        stateTax: 'State income tax',
        totalTax: 'Kabuuang buwis',
        netPerMonth: 'Take-home bawat buwan',
        effectiveRate: 'Effective tax rate',
        note:
          'Ang take-home na halaga ay ang gross pay bawas ang mga kaltas sa itaas, na hinati sa bilang ng pay period sa isang taon.',
        negativeNote:
          'Kasinglaki ng gross pay ang mga kaltas, at sinisingil pa rin dito ang payroll tax, kaya mas mababa sa zero ang take-home. Hindi sinusuri dito ang taunang limitasyon ng mga kontribusyon.',
      },
      resultNote:
        'Ginagamit ng payroll system ang mga withholding election sa W-4 at ang mga halagang naikaltas na sa taon, kaya bahagyang gumagalaw buwan-buwan ang numero sa tunay na payslip.',
      chart: {
        title: 'Saan napupunta ang gross pay',
        note: 'Isang bar para sa taon, hinati sa bahaging umaabot sa manggagawa at sa mga bahaging kinakaltas dito.',
        xAxis: 'none',
        series: [
          { key: 'net', label: 'Take-home pay' },
          { key: 'federal', label: 'Federal income tax' },
          { key: 'socialSecurity', label: 'Social Security' },
          { key: 'medicare', label: 'Medicare' },
          { key: 'state', label: 'State income tax' },
        ],
      },
      formula:
        'take-home = gross pay − pre-tax na kaltas − federal income tax − Social Security − Medicare − state income tax',
      method: [
        'Nagsisimula ang kuwenta sa gross pay at pabalik na dumadaan sa mga kaltas, sa pagkakasunod-sunod na ginagamit ng payroll system. Unang kinakaltas ang mga pre-tax na kaltas, dahil kinukuha sa sahod ang kontribusyon sa 401(k) o sa health account bago ito buwisan. Ang natitira ay ang taxable na sahod.',
        'Hindi pareho ang trato sa dalawang kaltas. Hindi kasama sa kita ang kontribusyon sa 401(k) o 403(b), pero sahod pa rin ito para sa Social Security at Medicare, kaya binabawasan nito ang federal tax at hindi ginagalaw ang payroll tax. Ang kontribusyon sa HSA o FSA na kinaltas sa payslip ay hindi kasama sa kita at sa sahod para sa Social Security, kaya binabawasan nito ang dalawa.',
        'Kinukuwenta ang federal income tax sa taxable na sahod na iyon. Ibinabawas ang standard deduction para sa filing status, at pinapadaan ang resulta sa table ng mga bracket ng 2026. Bawat bracket ay isang fixed na halaga ng buwis dagdag ang porsiyento ng kita na lampas sa ibaba ng bracket na iyon, na siyang paraan ng paglalathala ng IRS sa table.',
        'Susunod ang mga payroll tax. Kinukuwenta ang mga ito sa sahod bawas ang anumang kontribusyon sa HSA o FSA, dahil nananatili sa sahod ang kontribusyon sa 401(k) para rito. Ang Social Security ay 6.2% ng sahod hanggang sa taxable maximum na $184,500 para sa 2026. Ang Medicare ay 1.45% ng buong sahod na walang kisame, at ang Additional Medicare Tax ay 0.9% ng bahaging lampas sa $200,000 para sa single filer, o lampas sa $250,000 para sa married filing jointly.',
        'Ang state income tax ay ang rate na itina-type ng mambabasa, na inilalapat sa taxable na kita. Tantiya ito: karamihan ng estado ay nagbubuwis ayon sa bracket, kaya ang iisang numerong inilapat sa buong kita ay lumalampas sa binabayaran ng karamihan. Ang huling numero ay ang natitira, na hinati sa bilang ng pay period sa isang taon.',
      ],
      limits: [
        'Hindi nito kinukuwenta ang mga tax credit. Binabago ng child tax credit, ng earned income credit at ng mga education credit ang huling numero at wala ang mga ito sa kuwenta.',
        'Hindi nito kinukuwenta ang capital gains, ang kita mula sa self-employment, o ang trato sa kitang lampas sa Social Security wage base, kung saan naaangkop pa rin ang Medicare at hindi na ang Social Security.',
        'Hindi nito kinukuwenta ang mga lokal na buwis. Hiwalay sa rate ng estado ang income tax ng lungsod at county.',
        'Kumbensiyonal ang bilang ng mga pay period: 12 buwan, 52 linggo, 260 araw ng trabaho, o 2,080 oras para sa 40-oras na linggo sa loob ng 52 linggo. Ang mambabasang binabayaran sa ibang iskedyul ay maaaring ilagay na lang ang taunang numero.',
        'Itinuturing ang kontribusyon sa HSA at FSA bilang salary reduction na kinaltas sa payslip, na siyang nagpapalaya dito sa Social Security at Medicare. Ang kontribusyon sa HSA na direktang galing sa bank account ay sahod para sa Social Security, at wala sa kuwenta ang kasong iyon.',
        'Ang kontribusyon sa 401(k) na lampas sa taunang limitasyon para sa 2026 ay bahagyang sakop muli ng payroll tax, at sinisingil ng kuwentang ito ang payroll tax sa buong kontribusyon.',
        'Hindi nito sinusuri ang taunang limitasyon ng mga kontribusyon. Ang kontribusyon sa 401(k) o HSA na kasinglaki ng buong sahod ay nagpapababa sa take-home sa ilalim ng zero, dahil sinisingil pa rin dito ang payroll tax.',
      ],
      faq: [
        {
          q: 'Bakit mas mababa ang take-home pay ko kaysa sa gross bawas ang income tax?',
          a: 'Dahil kinakaltasan din ang sahod ng Social Security at Medicare. Mga payroll tax ito sa trabaho mismo, hiwalay sa income tax sa payslip.',
        },
        {
          q: 'Binabawasan ba ng kontribusyon sa 401(k) ang Social Security at Medicare ko?',
          a: 'Hindi. Ibinabawas ito sa sahod bago kuwentahin ang federal income tax, pero sahod pa rin ito para sa payroll tax, kaya sinisingil dito ang Social Security at Medicare. Iba ang kontribusyon sa HSA o FSA na kinaltas sa payslip: ibinabawas din ito sa base ng mga buwis na iyon. Kaya hiwalay na inilalagay ang dalawa.',
        },
        {
          q: 'Ginagamit ba nito ang tunay kong tax bracket?',
          a: 'Ginagamit nito ang table ng mga bracket ng 2026 at ang standard deduction para sa filing status, kaya malapit ang numero sa kinukuwenta ng payroll system para sa manggagawang walang ibang kita. Wala itong alam tungkol sa mga credit, ibang deduction o ibang kita.',
        },
        {
          q: 'Ano ang diperensiya ng effective at marginal rate?',
          a: 'Ang marginal rate ay ang rate kung saan binubuwisan ang susunod na dolyar ng taxable na kita, at ito ang pinakamataas na bracket na naaabot ng kita. Ang effective rate ay ang kabuuang buwis na hinati sa buong kita, at mas mababa ito, dahil ang mas matataas na bracket ay naaangkop lamang sa bahagi ng kitang lampas sa mga ito.',
        },
        {
          q: 'Aling rate ng estado ang ilalagay?',
          a: 'Ang rate na naaangkop sa sarili mong bracket sa estado mo. Karamihan ng estado ay nagbubuwis ayon sa bracket, kaya mas mababa ang effective rate kaysa sa pinakamataas na rate. Eksaktong tama ang iisang numero sa estadong flat ang rate at sa estadong walang income tax.',
        },
        {
          q: 'Bakit may kisame ang Social Security tax at wala ang Medicare tax?',
          a: 'May taxable maximum ang Social Security na itinatakda bawat taon, $184,500 para sa 2026, at hindi binubuwisan para sa Social Security ang kitang lampas dito. Walang kisame ang Medicare, kaya naaangkop ito sa bawat dolyar ng sahod.',
        },
        {
          q: 'Magagamit ko ba ito para kuwentahin ang buwis ko sa tax return?',
          a: 'Hindi. Kinukuwenta nito ang buwis na kinaltas sa sahod. Ibang kuwenta ang tax return: kasama rito ang ibang kita, mga deduction, mga credit at ang mga naibayad na, at isang beses itong inihahain sa isang taon, hindi bawat pay period.',
        },
      ],
      sources: [
        {
          label: 'IRS — Rev. Proc. 2025-32, inflation adjustment para sa 2026 tax year',
          url: 'https://www.irs.gov/irb/2025-45_IRB',
        },
        {
          label: 'Social Security Administration — 2026 wage base at COLA',
          url: 'https://www.ssa.gov/cola/',
        },
        {
          label: 'Social Security Administration — Publication 15, Employer Tax Guide',
          url: 'https://www.ssa.gov/pubs/EN-05-10035.pdf',
        },
        {
          label: 'IRS — Tax Topic 401, Wages and salaries',
          url: 'https://www.irs.gov/taxtopics/tc401',
        },
        {
          label: 'Social Security Administration — POMS RS 01402.038, Tax-favored health plans',
          url: 'https://secure.ssa.gov/poms.nsf/lnx/0301402038',
        },
        {
          label: 'IRS — Tax Topic 511, Withholding',
          url: 'https://www.irs.gov/taxtopics/tc511',
        },
      ],
      relatedGuides: [
        {
          slug: 'net-pay-calculator-explained',
          title: 'Paano kinukuwenta ang take-home pay',
        },
      ],
    },

    'income-tax': {
      name: 'Federal Income Tax Calculator',
      title: 'Federal Income Tax Calculator para sa 2026 Tax Year',
      description:
        'Kuwentahin ang federal income tax ng 2026 sa kita ng isang taon, kasama ang state tax na kinuwenta mula sa sariling mga bracket ng estado, ang filing status, ang deduction, at ang effective at marginal rate na magkatabi.',
      short: 'Federal at state income tax sa kita ng isang taon, ipinapakita ang dalawang rate.',
      category: 'Sahod',
      methodNote:
        'Ang mga federal bracket at standard deduction ay ang mga numero ng 2026 mula sa Rev. Proc. 2025-32, na inilathala noong 3 Nobyembre 2025. Kinukuwenta ang state tax mula sa mga bracket ng 2026, standard deduction, personal exemption at mga credit ng estadong pipiliin mo, mula sa mga table ng Tax Foundation noong 28 Abril 2026. Ang mga table para sa head of household, ang federal income tax deduction at ang mga credit ng estado ay galing sa mga form ng mga estado mismo. Hindi bahagi ng kuwentang ito ang mga payroll tax na kinakaltas sa sahod; nasa take-home pay calculator ang mga iyon.',
      script: {
        stateDetected: 'Pinunan ng {state}: ang estadong pinagmulan ng request mo.',
        childrenTotal: 'Kabuuang kuwalipikadong anak: {count}',
      },
      fields: {
        grossIncome: 'Gross na kita para sa taon',
        filingStatus: 'Filing status',
        itemisedDeduction: 'Itemized deduction',
        standardDeduction: 'Standard deduction',
        useStandard: 'Gamitin ang standard deduction',
        state: 'Estado',
        stateHint: 'para sa state tax',
        stateNone: 'Walang estado',
        children: 'Mga kuwalipikadong anak',
        childrenHint: 'ayon sa edad sa katapusan ng tax year',
        childBand: 'Mga anak na edad {range}',
        stateTaxOverride: 'Sariling state tax',
        stateTaxOverrideHint: 'iwanang blangko para gamitin ang modelo',
        preTax: 'Mga pre-tax na kaltas',
        preTaxHint: '401(k), HSA, FSA bawat taon',
        perYear: 'bawat taon',
      },
      terms: {
        filingStatuses: {
          single: 'Single',
          married: 'Married filing jointly',
          head: 'Head of household',
        },
      },
      result: {
        headlineLabel: 'Federal income tax',
        taxableIncome: 'Taxable na kita',
        deductionApplied: 'Inilapat na deduction',
        standardDeduction: 'Standard deduction',
        itemisedDeduction: 'Itemized deduction',
        federalTax: 'Federal income tax',
        stateTaxableIncome: 'Taxable na kita sa estado',
        stateCredits: 'Mga credit ng estado',
        stateChildCredit: 'Child tax credit ng estado',
        federalTaxDeducted: 'Ibinawas na federal tax',
        stateTax: 'State income tax',
        totalTax: 'Kabuuang buwis',
        effectiveRate: 'Effective rate',
        marginalRate: 'Marginal rate',
        afterTax: 'Kita pagkatapos ng buwis',
        note:
          'Ang inilapat na deduction ay ang mas malaki sa dalawa: ang standard deduction para sa filing status, o ang itemized deduction na inilagay sa kaliwa. Kinukuwenta ang state tax mula sa estadong pipiliin mo.',
      },
      resultNote:
        'Tax liability ang numero, hindi ang halagang kinaltas sa payslip. Hindi kasama sa federal na numero ang mga federal credit o ang mga naibayad na sa taon; kasama sa numero ng estado ang mga credit ng estado na dala ng modelo.',
      chart: {
        title: 'Ano ang natitira sa kita',
        note: 'Isang bar para sa taon, hinati sa bahaging naiiwan sa mambabasa at sa bahaging napupunta sa buwis.',
        xAxis: 'none',
        series: [
          { key: 'afterTax', label: 'Kita pagkatapos ng buwis' },
          { key: 'federal', label: 'Federal income tax' },
          { key: 'state', label: 'State income tax' },
        ],
      },
      formula:
        'taxable na kita = gross na kita − pre-tax na kaltas − deduction; buwis = table ng bracket na inilapat sa taxable na kita; state tax = mga bracket ng estado na inilapat sa adjusted gross income bawas ang standard deduction at exemption ng estado, bawas ang naibayad na federal income tax kung saan pinapayagan ng estado, bawas ang mga credit ng estado',
      method: [
        'Nagsisimula ang kuwenta sa gross na kita para sa taon at ibinabawas ang mga pre-tax na kaltas, dahil hindi binubuwisan bilang kita ang kontribusyon sa 401(k) o sa health account.',
        'Susunod ang deduction. Ginagamit ang standard deduction para sa filing status maliban kung maglagay ang mambabasa ng itemized deduction, at ang mas malaki sa dalawa ang naaangkop. Ang standard deduction para sa 2026 ay $16,100 para sa single filer, $32,200 para sa married filing jointly at $24,150 para sa head of household.',
        'Ang natitira ay ang taxable na kita, at ang buwis ay ang table ng mga bracket ng 2026 na inilapat dito. Bawat bracket ay isang fixed na halaga ng buwis dagdag ang porsiyento ng kitang lampas sa ibaba ng bracket na iyon, gaya ng paglalathala ng IRS.',
        'Magkaibang tanong ang sinasagot ng dalawang rate. Ang marginal rate ay ang rate kung saan binubuwisan ang susunod na dolyar ng taxable na kita, na siyang pinakamataas na bracket na naaabot ng kita. Ang effective rate ay ang kabuuang buwis na hinati sa buong kita, at mas mababa ito dahil ang mas matataas na bracket ay umaabot lamang sa bahagi ng kitang lampas sa mga ito.',
        'Hiwalay na kinukuwenta ang state tax. Nagsisimula ang estado sa adjusted gross income, ibinabawas ang sarili nitong standard deduction at personal exemption kapag ibinibigay nito ang mga ito bilang exclusion, inilalapat ang sarili nitong mga bracket bawat hiwa, at ibinabawas ang mga credit na ibinabayad nito. Ang mga estadong nagbibigay ng exemption o standard deduction bilang credit ay ibinabawas ito sa buwis, at doon binibilang ang mga credit na iyon.',
        'Ginagamit ang table ng filing status. Ang mga estadong naglalathala ng sariling table para sa head of household ay may table dito, mula sa sarili nilang mga form, at ang mga estadong hindi naglalathala nito ay kinukuwenta mula sa table ng single filer.',
        'Tatlong estado ang nagpapahintulot na ibawas ang naibayad na federal income tax: Alabama, Missouri at Oregon. Kung saan pinapayagan ito ng estado, ibinabawas ang deduction sa kita bago ilapat ang mga bracket ng estado, ayon sa limitasyon at bahaging itinatakda ng bawat estado.',
        'Kinukuwenta ang mga credit ng estado mula sa edad ng mga anak, dahil doon sila nakasalalay. Nagbabayad ang New York ng $1,000 para sa anak na wala pang apat na taon at $500 para sa anak na apat hanggang labing-anim, nagbabayad ang Minnesota ng $1,800 para sa anak na wala pang labing-walo, at may ilang estadong walang ibinabayad para sa anak na lampas na sa isang tiyak na edad.',
      ],
      limits: [
        'Hindi nito kinukuwenta ang mga federal tax credit. Binabawasan ng federal child tax credit, ng federal earned income credit at ng mga education credit ang buwis at wala ang mga ito sa kuwenta.',
        'Hindi nito pinag-iiba ang capital gains at ordinaryong kita, kaya kinukuwenta sa ordinaryong rate ang taong may kita mula sa pamumuhunan.',
        'Hindi nito kinukuwenta ang senior deduction, o anumang deduction maliban sa standard at itemized na halagang inilagay sa kaliwa.',
        'Hindi nito kinukuwenta ang self-employment tax, na sinisingil sa netong kita ng taong self-employed at may sariling base at rate.',
        'Hindi nito kinukuwenta ang deduction para sa state at local income tax na pinapayagan ng maraming estado sa loob ng kanilang itemized deduction.',
        'Hindi nito kinukuwenta ang mga rate ng capital gains, ang mga surtax na sinisingil ng ilang estado sa malalaki ang kita, o ang mga buwis ng pamahalaan ng lungsod at county.',
        'Hindi nito ginagamit ang table ng head of household ng Vermont, na ang mga rate para sa 2026 ay inilathala bilang paunang numero, kaya kinukuwenta ang head of household sa Vermont mula sa table ng single filer.',
        'Hindi nito dala ang bawat credit ng estado. Naroon ang earned income tax credit ng estado para sa mga estadong nagtatakda nito bilang porsiyento ng federal credit at para sa tatlong estadong sarili nilang kinukuwenta ito, at naroon ang child tax credit para sa mga estadong nakasalalay ang credit sa edad ng anak. Wala rito ang mga credit ng ibang estado.',
      ],
      faq: [
        {
          q: 'Aling deduction ang naaangkop?',
          a: 'Ang standard deduction maliban kung mas malaki ang kabuuan ng mga itemized deduction. Ipinapakita ng calculator nang magkatabi ang standard deduction para sa filing status at ang itemized na numero, kaya isang tingin lang ang paghahambing.',
        },
        {
          q: 'Ano ang diperensiya ng effective at marginal rate?',
          a: 'Ang marginal rate ay ang rate kung saan binubuwisan ang susunod na dolyar ng taxable na kita. Ang effective rate ay ang kabuuang buwis na hinati sa buong kita, at mas mababa ito, dahil ang mga bracket na nasa itaas ng una ay naaangkop lamang sa bahagi ng kitang lampas sa mga ito.',
        },
        {
          q: 'Bakit tumatalon ang buwis sa isang tiyak na kita?',
          a: 'Iyon ang hangganan ng bracket. Lampas dito, binubuwisan ang isa pang dolyar sa susunod na rate, kaya mas mabilis tumaas ang buwis kaysa sa kita. Sinasabi ng marginal rate kung saang bracket naroon ang kita.',
        },
        {
          q: 'Kasama ba rito ang Social Security at Medicare?',
          a: 'Hindi. Mga payroll tax ang mga iyon na sinisingil sa sahod, may sariling kisame, at sa take-home pay calculator kinukuwenta.',
        },
        {
          q: 'Ano ang numero ng state tax?',
          a: 'Ang buwis na sinisingil ng estado mismo, na kinuwenta mula sa mga bracket ng estadong iyon para sa 2026, sa standard deduction nito, sa personal exemption nito at sa mga credit nito. Pinipili ang estado sa listahan, at pinupunan ito ng pahina ng estadong pinagmulan ng request mo kapag natutukoy iyon ng network. Baguhin ang estado at magbabago ang buong numero kasama nito.',
        },
        {
          q: 'Maaari ko bang ilagay ang sarili kong state tax?',
          a: 'Oo. Tumatanggap ng numero ang field sa ilalim ng estado at pinapalitan nito ang kinuwentang numero. Blangko ito bilang default, at habang blangko ito, ang kuwenta ang ipinapakita ng pahina.',
        },
        {
          q: 'Bakit itinatanong ng pahina ang edad ng bawat anak?',
          a: 'Dahil nakasalalay sa edad ng anak ang mga child tax credit ng estado. Nagbabayad ang New York ng $1,000 para sa anak na wala pang apat na taon at $500 para sa anak na apat hanggang labing-anim, nagbabayad ang Minnesota ng $1,800 para sa anak na wala pang labing-walo, at may ilang estadong walang ibinabayad para sa anak na lampas na sa isang tiyak na edad. Ang mga grupo ay ang mga edad kung saan naghahati ang mga estado, at ang bilang ng mga anak sa mga ito ang binibilang din ng earned income credit.',
        },
        {
          q: 'Ito ba ang halagang uutangin ko?',
          a: 'Ito ang buwis bago ang mga credit at bago ang mga naibayad na sa taon. Idinadagdag ng tax return ang mga credit, idinadagdag ang anumang hindi nabuwisan sa pamamagitan ng payroll, at ibinabawas ang naibayad na.',
        },
      ],
      sources: [
        {
          label: 'IRS — Rev. Proc. 2025-32, inflation adjustment para sa 2026 tax year',
          url: 'https://www.irs.gov/irb/2025-45_IRB',
        },
        {
          label: 'IRS — Tax Topic 505, Tax Withholding and Estimated Tax Payments',
          url: 'https://www.irs.gov/taxtopics/tc505',
        },
        {
          label: 'IRS — Tax Topic 611, Income Tax',
          url: 'https://www.irs.gov/taxtopics/tc611',
        },
        {
          label: 'Tax Foundation — State Individual Income Tax Rates and Brackets, 2026',
          url: 'https://taxfoundation.org/data/all/state/state-income-tax-rates-2026/',
        },
        {
          label: 'Tax Foundation — Facts & Figures 2026, mga rate ng state income tax noong 28 Abril 2026',
          url: 'https://taxfoundation.org/data/all/state/2026-state-tax-data/',
        },
      ],
      relatedGuides: [
        {
          slug: 'income-tax-calculator-explained',
          title: 'Paano kinukuwenta ang federal income tax',
        },
      ],
    },

    'debt-payoff': {
      name: 'Debt Payoff Calculator',
      title: 'Debt Payoff Calculator: Avalanche at Snowball',
      description:
        'Ihambing ang sabay na pagbabayad ng ilang utang: minimum lamang, ang avalanche na pagkakasunod-sunod at ang snowball na pagkakasunod-sunod, kasama ang bilang ng buwan hanggang walang utang at ang natipid na interes.',
      short: 'Bayaran nang sabay ang ilang utang at ihambing ang pagkakasunod-sunod.',
      category: 'Utang',
      methodNote:
        'Buwan-buwang simulation ang modelo: naiipon ang interes sa balanse sa simula ng buwan, kinukuha ng bawat bukas pang utang ang sarili nitong minimum na bayad, at ang natitirang pera ay napupunta sa utang na pinili ng mambabasa.',
      fields: {
        debtName: 'Utang',
        balance: 'Balanse',
        rate: 'Interest rate',
        minimum: 'Minimum na bayad',
        addDebt: 'Magdagdag ng utang',
        removeDebt: 'Alisin ang utang na ito',
        extraPayment: 'Dagdag na buwanang bayad',
        extraPaymentHint: 'bukod sa bawat minimum na bayad',
      },
      terms: {
        strategies: {
          minimum: 'Minimum lamang',
          avalanche: 'Avalanche',
          snowball: 'Snowball',
        },
        orderHints: {
          avalanche: 'pinakamataas na interest rate muna',
          snowball: 'pinakamaliit na balanse muna',
        },
      },
      result: {
        headlineLabel: 'Natipid na interes',
        interestSaved: 'Natipid na interes kumpara sa minimum',
        monthsToFree: 'Buwan hanggang walang utang',
        totalInterest: 'Kabuuang interes',
        totalPaid: 'Kabuuang naibayad',
        minimumOnly: 'Minimum lamang',
        avalanche: 'Avalanche',
        snowball: 'Snowball',
        minimumsNeverCover: 'Hindi kailanman mababayaran',
        minimumsNeverCoverNote:
          'Kahit isa sa mga utang na ito ay sinisingilan ng mas malaking interes sa isang buwan kaysa sa sakop ng mga bayad, kaya lumalaki ang balanseng iyon sa halip na bumaba. Walang tapos na iskedyul ang run na hindi kailanman nakababayad ng mga utang, kaya hindi ito nag-uulat ng buwan o interes: ilalarawan ng mga numerong iyon ang katapusan ng simulation at hindi ang mga utang.',
        note:
          'Binabayaran muna ng avalanche ang pinakamataas na rate at pinakamaliit ang gastos nito sa interes. Inuubos muna ng snowball ang pinakamaliit na balanse at mas maagang natatapos ang utang na iyon. Ang diperensiya ng dalawa ay ang presyo ng pagkakasunod-sunod.',
      },
      resultNote:
        'Parehong mga utang at parehong dagdag na bayad ang ginagamit ng tatlong run. Ang tanging nagbabago ay ang pagkakasunod-sunod kung saan napupunta ang dagdag na pera.',
      chart: {
        title: 'Ang balanse sa bawat pagkakasunod-sunod',
        note: 'Hindi isinama ang run na hindi kailanman nakababayad ng mga utang: lumalaki ang balanse nito sa halip na bumaba, at ilalarawan ng hugis ng linyang iyon ang katapusan ng simulation at hindi ang isang iskedyul. Umaabot sa zero ang linyang may dagdag na bayad.',
        xAxis: 'years',
        series: [
          { key: 'avalanche', label: 'Avalanche' },
          { key: 'snowball', label: 'Snowball' },
          { key: 'minimumOnly', label: 'Minimum lamang' },
        ],
      },
      formula:
        'interes para sa buwan = balanse sa simula ng buwan × taunang rate ÷ 12; kinukuha ng bawat bukas na utang ang sarili nitong minimum na bayad, interes muna at principal pagkatapos; ang natitirang pera ay napupunta sa utang na itinuturo ng pagkakasunod-sunod',
      method: [
        'Buwan-buwang simulation ang kuwenta. Sa simula ng bawat buwan, sinisingil ang interes sa balanse at idinadagdag dito. Ang perang magagamit sa buwang iyon ay ang kabuuan ng bawat minimum na bayad dagdag ang dagdag na bayad na inilagay sa kaliwa. Kinukuha ng bawat utang na may balanse pa ang sarili nitong minimum na bayad, at sinasakop muna ng bayad na iyon ang interes nito at pagkatapos ang principal.',
        'Ang utang na bayad na ay hindi na kumukuha ng minimum na bayad, at sumasama ang minimum na iyon sa perang papunta sa susunod na utang. Iyan ang mekanismo sa likod ng diperensiya ng mga pagkakasunod-sunod: ang parehong buwanang halaga, kapag ginastos sa ibang utang, ay nagpapahinto sa ibang mga balanse nang mas maaga.',
        'Ipinapadala ng avalanche na pagkakasunod-sunod ang dagdag na pera sa pinakamataas na interest rate muna. Pinakamaliit ang gastos nito sa interes, dahil ang interes na pinahihinto nito ang pinakamahal na perang binabayaran ng mambabasa.',
        'Ipinapadala ng snowball na pagkakasunod-sunod ang dagdag na pera sa pinakamaliit na balanse muna. Mas malaki ang kabuuang gastos nito sa interes at mas maaga nitong naisasara ang isang account, na ibang uri ng resulta. Ipinapakita ng calculator ang dalawa, at ang natipid na interes sa bawat kaso, para maihambing ang dalawa sa parehong mga numero.',
      ],
      limits: [
        'Hindi nito kinukuwenta ang mga variable rate. Nagbabago ang interes ng credit card na may variable rate habang gumagalaw ang index, at ipinapalagay ng iskedyul dito na nananatili ang rate kung saan ito itinype.',
        'Hindi nito kinukuwenta ang mga bayarin: wala sa kabuuan ang late fee, balance transfer fee at taunang bayad sa card.',
        'Buwanan nitong sinisingil ang interes. Ang credit card na araw-araw nagko-compound ay naniningil nang bahagyang mas malaki sa loob ng isang taon, at kadalasang bahagyang mas mataas ang tunay na numero sa balanse ng card kaysa rito.',
        'Hindi nito kinukuwenta ang trato sa buwis ng interes, na sa ilang utang ay maaaring ibawas at sa iba ay hindi.',
        'Hindi nito kinukuwenta ang pagbabago sa mga minimum na bayad, na minsang ibinababa ng mga nagpapautang dahil sa kagipitan at minsang itinataas habang bumababa ang balanse.',
      ],
      faq: [
        {
          q: 'Ano ang diperensiya ng avalanche at snowball?',
          a: 'Ang pagkakasunod-sunod lamang. Ipinapadala ng avalanche ang dagdag na pera sa pinakamataas na interest rate muna, at ng snowball sa pinakamaliit na balanse muna. Pareho ang mga utang, ang mga minimum at ang dagdag na bayad sa dalawang run.',
        },
        {
          q: 'Alin ang mas nakatitipid ng pera?',
          a: 'Ang avalanche, sa interes. Pinahihinto muna ng dagdag na pera ang pinakamahal na utang, kaya mas kaunting interes ang naiipon sa buong buhay ng mga utang. Inililimbag ng calculator ang diperensiya sa natipid na interes para sa bawat pagkakasunod-sunod.',
        },
        {
          q: 'Bakit may snowball kung mas malaki ang gastos nito?',
          a: 'Inuubos nito muna ang pinakamaliit na balanse, kaya mas maagang umaabot sa zero ang isang balanse. Ibang resulta iyon kaysa sa sinusukat ng interes, at ipinapakita ng calculator ang dalawa para maihambing ang mga ito sa parehong mga numero.',
        },
        {
          q: 'Paano kinukuwenta ang interes?',
          a: 'Sa balanse sa simula ng bawat buwan, sa taunang rate na hinati sa labindalawa, at idinadagdag ito sa balanse. Pagkatapos, napupunta muna ang mga bayad sa interes na iyon at pagkatapos sa principal.',
        },
        {
          q: 'Ano ang nangyayari sa minimum na bayad ng utang na bayad na?',
          a: 'Idinadagdag ito sa perang papunta sa susunod na utang, kaya hindi kailanman bumababa ang buwanang halagang napupunta sa mga utang. Iyan ang nagpapaikli sa mga petsa ng pagkabayad kumpara sa kabuuan ng mga hiwalay na iskedyul.',
        },
        {
          q: 'Isinasaalang-alang ba nito ang credit card na araw-araw nagko-compound?',
          a: 'Hindi. Isang beses sa isang buwan naniningil ng interes ang modelo. Ang card na araw-araw nagko-compound ay naniningil nang bahagyang mas malaki sa loob ng isang taon, kaya kadalasang bahagyang mas mataas ang tunay na numero sa balanse ng card kaysa sa narito.',
        },
      ],
      sources: [
        {
          label: 'CFPB — Ask CFPB, mga tanong at sagot para sa mamimili',
          url: 'https://www.consumerfinance.gov/ask-cfpb/',
        },
        {
          label: 'CFPB — mga tool at gabay sa credit card',
          url: 'https://www.consumerfinance.gov/consumer-tools/credit-cards/',
        },
      ],
      relatedGuides: [
        {
          slug: 'debt-payoff-calculator-explained',
          title: 'Paano gumagana ang pagbabayad ng ilang utang',
        },
      ],
    },
  },
};
