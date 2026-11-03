/**
 * Bawat string na nakikita ng user sa site, sa Ingles.
 *
 * Ang file na ito ang pinagmumulan ng totoong kopya ng site. Ang mga diksyonaryo
 * sa Ruso at Espanyol sa parehong folder ay may parehong hugis, at ang uri
 * ng object na ito ang uri laban sa kanila sinusuri, kaya ang build ay gagal kapag
 * may kulang o pinapalanag na key, sa halip na mag-publish ng bahagyang isinalin na pahina.
 *
 * Hindi dito nakalagay ang mga string na pag-aari ng mga gabay mismo. Naroon
 * sila sa mga MDX file sa ilalim ng `src/content/guides/<locale>/`, dahil ang gabay ay
 * isang artikulo at ang artikulo ay may sariling file.
  */

export const tl = {
  /** Ang pangalan ng wikang ito, sa wikang ito.  */
  localeName: 'Tagalog',

  /** Maikling paglalarawan ng site, ginagamit sa structured data at meta tag.  */
  tagline: 'Mga kalkulator na pinapakita ang kanilang kalkulasyon',
  description:
    'Libeng mga financial calculator para sa mortgage payments, rent versus buy, compound interest, take-home pay, federal tax at debt payoff. Ipinapakita ang bawat formula.',

  author: {
    role: 'May-akda',
    bio: 'Nakatrabaho sa IT infrastructure — cloud, CI/CD, infrastructure as code — kung saan hindi ipinapadala ang isang pagbabago kapag hindi ito naberipika. Panatilihing lean ang mga cloud environment at mabilis ang delivery pipeline ang karaniwang trabaho; pareho ring standard ang ginagamit sa site na ito. Nasa isang lugar ang lahat ng kalkulasyon, saklaw ng unit test ang mga formula upang suriin ang mga ito laban sa mga nakalathalang loan figure, at may source at petsa ng pagbasa ang bawat datos na galing sa labas. Sumusulat ng mga gabay at nagpapanatili ng calculation engine. Isang pangalawang tao ang nagbabasa ng financial content ng bawat gabay bago ito ipublish. Walang anuman dito sa site ang nagsasabi sa mambabasa kung ano ang gagawin.',
  },

  reviewer: {
    role: 'Tagasuri ng pinansyal',
    bio: 'Binabasa ang financial content ng isang gabay bago ito ipublish: ang mga datos, ang mga assumption sa likod ng mga ito, at ang mga pinagmulan nila. Binubuo ng may-akda ang calculation engine; binabasa ng reviewer ang resulta mula sa kabilang panig, ang panig ng isang taong humahawak ng pera kaysa code. Lumalabas lamang ang kanyang pangalan sa mga gabay na sinuri niya.',
  },

  consent: {
    heading: 'Mga cookies',
    body: 'Ginagamit ng site na ito ang cookies para maghatid ng advertising at bilangin kung aling mga pahina ang binabasa. Ang pagtanggap ay naglo-load ng advertising at page analytics, kasama ang cookieless beacon ng hosting provider; ang pagtanggi ay walang naglo-load. Para sa mambabasa sa European Union, hindi talagang nalo-load ang beacon ng hosting provider. Maaari mong palitan ang iyong sagot sa footer. Nasa {privacyLink} ang nakolekta at sino ang nagbibigay nito.',
    privacyLink: 'pahina ng privacy',
    accept: 'Tanggapin',
    reject: 'Tanggihan',
    settings: 'Mga setting ng cookie',
  },

  nav: {
    tools: 'Mga tool',
    guides: 'Mga gabay',
    sources: 'Mga pinagkukunan',
    about: 'Tungkol',
  },

  footer: {
    taglineNote:
      'Isang nakasulat na formula ang bawat isa, at ikaw ang may-ari ng bawat assumpsiyon.',
    calculatorsHeading: 'Mga calculator',
    siteHeading: 'Website',
    calculators: {
      'mortgage-payment': 'Pagbayad ng mortgage',
      'rent-vs-buy': 'Pagm rent o pagbili',
      'compound-interest': 'Palabaw na-interest',
      'net-pay': 'Netong kinikita',
      'income-tax': 'Pederal na buwis sa kitaon',
      'debt-payoff': 'Pagbabayad ng utang',
    },
    links: {
      guides: 'Mga gabay',
      sources: 'Mga pinagkukunan',
      'editorial-team': 'Redaktang koponan',
      about: 'Tungkol',
      contact: 'Makipag-ugnayan',
      privacy: 'Pagkapagkapamilya',
      terms: 'Mga tuntunin',
    },
    cookieSettings: 'Mga setting ng cookie',
    note:
      '{name} ay naglalathala ng kalkulasyon at paliwanag, hindi payo sa pananalapi. Ang mga tool ay ipinapakita ang aritmetika sa likod ng isang numero at ang mga tuntuning ginamit sa aritmetika. Hindi nito sinusuri ang iyong sitwasyon at hindi nito inirerekomenda ang anumang hakbang. Depende sa mga input na ibinibigay mo ang bawat bilang na nilikha ng isang tool — basahin ang mga tuntuning bago umasa sa anumang resulta. © {founded}–{year} {name}.',
  },

  /** Mga string na lumalabas sa higit sa isang pahina.  */
  ui: {
    skipToContent: 'Lumaktaw sa nilalaman',
    home: 'Bahay',
    breadcrumb: 'Balcrumb',
    primaryNav: 'Pangunahin',
    lastChecked: 'Huling sinuri',
    by: 'Ni',
    whereNumbersComeFrom: 'Saan nagmumula ang mga numero',
    minRead: '{n} min pagbasa',
    guidesCount: (n: number) => `${n} ${n === 1 ? 'balangkas' : 'mga balangkas'}`,
    calculate: 'Kalkulahin',
    open: 'Buksan',
    allGuides: 'Lahat ng gabay →',
    readTheGuide: 'Basahin ang gabay',
    guidesThatGoDeeper: 'Mga gabay na mas malalim',
    commonQuestions: 'Mga karaniwang tanong',
    howThisIsCalculated: 'Paano ito kinakalkula',
    whatThisCalculatorDoesNotDo: 'Ang hindi ginagawa ng calculator na ito',
    sources: 'Mga pinagkukunan',
    sourcesNote: 'Ito ang mga pangunahing pinagmulan ng mga datos at paraang ginamit sa gabay na ito.',
    calculatorsBehindThisGuide: 'Mga calculator sa likod ng gabay na ito',
    published: 'Nailathala',
    lastReviewed: 'Huling sinuri',
    reviewedBy: 'Sinuri ni',
    language: 'Wika',
    switchTheme: 'Palitan ang tema',
    switchToLight: 'Palitan sa maliwanag na tema',
    switchToDark: 'Lumipat sa madilim na tema',
    /*
      Shown under a field the site filled in from the region the request came
      from. The state is a default, not a fact about the reader, and the
      sentence says so.
    */
    detectedFromIp:
      'Natutukoy ang estado mula sa iyong IP address at ito ay approximate: ang isang VPN, proxy o mobile network ay maaaring ituro ito sa maling estado. Nananatiling editable ang field.',
  },

  newsletter: {
    emailAddress: 'Alamat ng email',
    placeholder: 'you@example.com',
    subscribe: 'Mag-subscribe',
  },

  home: {
    title: 'Calccents — Mga financial calculator na nagpapakita ng kanilang kalkulasyon',
    description:
      'Libeng mga financial calculator para sa mortgage payments, rent versus buy, compound interest, take-home pay, federal tax at debt payoff. Ipinapakita ang bawat formula.',
    eyebrow: 'Mga financial calculator',
    heading: 'Alamin ang numero bago ka magpasya',
    lede: 'Libeng mga tool para sa aritmetika sa likod ng mortgage, lease, payslip at isang pile ngUtang. Isinulat ang bawat formula, ikaw ang may hawak ng bawat assumption, at walang pahinang nagsasabi sa iyo kung ano ang gagawin sa resulta.',
    cta: 'Tingnan ang mga calculator',
    calculatorsEyebrow: 'Ang mga calculator',
    calculatorsHeading: 'Anim na tanong, anim na set ng numero',
    workHeading: 'Ipinapakita ng bawat numero ang kalkulasyon nito',
    workPoints: [
      'Nasa tabi ng sagot ang formula, sa payak na wika at sa mga simbolo.',
      'Bawat numero ay may pinagmulan at petsa.',
      'Bawat tool ay naglalaman ng sinasabi nitong hindi nito ginagawa, sa parehong salita, direkta sa ibaba ng resulta.',
    ],
    workLink: 'Paano nabuo ang site →',
    sampleMonthlyPayment: 'Buwanang pagbabayad',
    samplePrincipalAndInterest: 'Pangunahing prinsipal at interest',
    samplePropertyTax: 'Buwis sa ari-arian',
    sampleTotalInterest: 'Kabuuang interes',
    calcTitle: 'Subukan: buwanang pagbabayad ng mortgage',
    calcHomePrice: 'Presyo ng bahay',
    calcDown: 'Down payment',
    calcRate: 'Rate ng interes',
    calcTerm: 'Termino',
    calcYears: '{n} taon',
    calcMonthly: 'Buwanang pangunahin at interes',
    calcLoan: 'Halaga ng loan',
    calcTotalInterest: 'Kabuuang interes',
    calcOpen: 'Buksan ang buong calculator',
    calcNote: 'Prinsipal at interes lamang. Ang property tax, insurance at HOA ay nasa buong calculator.',
    statCalculators: 'mga calculator',
    statGuides: 'mga gabay na may ipinapakita ang kalkulasyon',
    statLanguages: 'mga wika',
    statSignups: 'mga sign-up upang magamit ang alinman sa mga ito',
    guidesEyebrow: 'Mga gabay',
    guidesHeading: 'Ang kalkulasyon, nakasulat nang detalyado',
    newsletterHeading: 'Get the math sa iyong inbox',
    newsletterLede:
      'Isang maikling liham kapag may bagong calculator na na-live o muling sinuri ang kasalukuyan. Walang alok, walang sponsored placements.',
  },

  /*
   * The key visual in the hero and the illustration on each calculator card.
   *
   * The illustrations are drawn as inline SVG from the design tokens, so
   * they follow the light and the dark theme and carry no image request.
   * The alt text is here because the illustration is a picture of a chart,
   * and a screen reader needs to be told what the chart is about.
   */
  illustration: {
    mortgagePayment: 'Isang mortgage balance na unti-unting lumiliit, kasama ang interes na binabayad',
    rentVsBuy: 'Dalawang linya na nagsasalubong: ang halaga ng pagpapiramay laban sa halaga ng pagmamay-ari',
    compoundInterest: 'Isang balance na mas mabilis na tumataas habang nagpupunta ang interes',
    netPay: 'Isang bar ng gross pay na nahati sa take-home pay at mga deductions na kinuha rito',
    incomeTax: 'Isang stack ng mga bracket ng buwis, mas malaki ang bawat isa kaysa sa nasa ibaba',
    debtPayoff: 'Dalawang set ng mga bar, isa para sa bawat pagkakasunod ng pagbabayaran ng mga utang',
  },

  heroVisual: {
    label: 'Buwanang pagbabayad',
    caption: 'Isang halimbawa na sinusuri, iginuhit ang paraan ng calculator.',
  },

  /*
   * The labels around a result chart.
   *
   * The chart itself is drawn as inline SVG from the numbers the calculator
   * has already worked out, so nothing is re-computed for the picture and
   * the picture cannot disagree with the figures above it.
   */
  chart: {
    months: 'Mga buwan',
    years: 'Mga taon',
    start: 'Ngayon',
    end: 'Wakas',
    empty: 'Pupunan ang tsart kapag mayroon nang datos na iginuhit.',
  },

  toolsIndex: {
    title: 'Mga libreng financial calculator',
    description:
      'Tatlong libreng calculator na nagpapakita ng aritmetika sa likod ng pagbabayad ng mortgage, paghahambing ng pag Rent o pagbili, at projection ng compound interest.',
    heading: 'Mga libreng financial calculator',
    lede: 'Ipinapakita ng bawat calculator ang formula na ginagamit nito, nakalista ang mga assumption sa likod ng resulta, at malinaw na sinasabi kung ano ang hindi nito ginagawa. Walang email address na hinihingi rito, at walang anumang sign up na hinihingi sa iyo.',
    whatTheseAre: 'Ano ang mga tool na ito',
    whatTheseAreBody: [
      'Mga aritmetikong tool ito. Kinukuha nila ang mga datos na ibinibigay mo, nag-aaplay ng nakalathalang formula, at ibinabalik ang resulta kasama ang kalkulasyon. Ang mortgage calculator dito ay hindi nakakaalam ng iyong credit score, iyong kita, o kung aling lender ang nag-aalok ng kung ano ngayong linggo, at hindi nito susubukan na hguessin.',
      'Ang dahilan ay simple: ang numerong magagawa mong suriin ay higit-halaga sa numerong pinili ng iba para sa iyo. Ipinapakita ng bawat tool dito ang formula sa mga simbolo, nagbibigay ng link sa mga pangunahing pinagmulan ng paraan, at may petsa ng pagsusuri upang makita mo kung kailan ito huling sinuri.',
    ],
  },

  guidesIndex: {
    title: 'Mga gabay',
    description:
      'Labing-limang paliwanag sa aritmetikang nasa likod ng mga mortgage, pagtatanding ng pagrent at pagbili, at compound interest, bawat isa ay may formula, mga pag-aassumption, at mga pinagmulan.',
    heading: 'Mga gabay',
    lede: 'Malalim na paliwanag sa aritmetika at mga pag-aassumption sa likod ng mga calculator. Ipinapakita ng bawat gabay ang formula, nagbibigay ng link sa mga pangunahing pinagmulan, at may petsa ng pagsusuri.',
    missingHeading: 'May kulang ba?',
    missingBody:
      'Isinulat ang mga gabay batay sa aritmetikang mahirap sundan ng mga mambabasa. Kung walang saklaw na konseptong pinansyal dito, sabihin sa amin kung alin at ano ang nakikita mong nakakalito.',
    suggestTopic: 'Magmungkahi ng paksa',
    groups: {
      home: 'Tahanan at mortgage',
      renting: 'Pagrent at pag-aari',
      investing: 'Pag-iinvest',
    },
  },

  guide: {
    sourcesTitle: 'Mga pinagkukunan',
    sourcesNote: 'Ito ang mga pangunahing pinagmulan ng mga datos at paraang ginamit sa gabay na ito.',
  },

  about: {
    title: 'Tungkol',
    description:
      'Ano ang site na ito, paano ito ginawa, at ano ang mga patakaran nang sinusundan upang maging mapatunayan ang bawat numero dito.',
    heading: 'Tungkol sa {name}',
    lede: 'Nag-publish ng mga kalkulator ng pinansyal at ang mga paliwanag sa kanila ang {name}. Ito ay isang maliit na site na may tiyak na layunin: gumawa ng isang bilang na maaari mong i-check, at ipinapakita ang mga kalkulasyon na nagresulta dito.',
    isHeading: 'Ano ang site na ito',
    isBody: [
      'Anim na calculator, labingwalong gabay, at ang pangunahing pinagmulan sa likod ng mga ito. Ginagamit ng mga calculator ang mga numerong ibinibigay mo at isinasagawa ang isang nakalathalang formula: ang amortization formula para sa mortgage, ang buwan-buwan na paghah Comparison ng pagkakabenta sa pagmamayapa, ang compound interest formula para sa balanse ng ipon, at ang aritmetika ng pagbabayad ng utang, buwis sa kita at take-home pay.',
      'Sinusuportahan ng display advertising ang site. Ipinapasiya nito ang paraan ng paggawa nito. Mabilis na naglo-load ang mga pahina at kaunti ang JavaScript dahil ang mabilis na naglo-load na pahina ay nagbibigay ng sapat na panahon sa mambabasa upang makita ang advertisement, at dahil ang mabilis na naglo-load na pahina ang mga tao ay bumabalik. Walang kalkulator ang humihingi ng email address, at walang resulta ang pinaghihigpit.',
    ],
    isNotHeading: 'Ano ang hindi site na ito',
    isNotBody: [
      'Hindi ito isang brokerage, hindi tumatanggap ng mga aplikasyon, at hindi kumikita ng komisyon mula sa sinumang nag-click. Walang sponsored placement, affiliate link o lead form. Ang advertising ay display advertising lamang, ibig sabihin, ang tanging binabayaran ng pagbisita ng mambabasa ay ang pansin ng mambabasa.',
      'Walang tool dito ang nagsusuri sa iyong mga kalagayan. Ang mortgage calculator na nagbabalik ng “maglagay ng 20%” ay mali sa karamihan ng mga pagkakataon, dahil depende ang tamang sagot sa mga bagay na hindi nakikita ng pahina: ang iyong iba pang naipon, ang iyong trabaho, at ang iyong kakayahang tiisin ang isang masamang buwan. Kaya ang bawat tool ay nagko-compute at titigil doon.',
    ],
    rulesHeading: 'Ang mga patakaran na sinusundan ng site',
    rules: [
      {
        label: 'Ipinapakita ng bawat tool ang mga limitasyon nito.',
        body: 'Sa ilalim ng bawat resulta ay may block na nakalista kung ano ang hindi ginagawa ng tool, sa parehong mga salita sa bawat pahina.',
      },
      {
        label: 'May pinagmulang tala ang bawat datos na nagmumula sa isang lugar.',
        body: 'Naka-link sa pangunahing pinagmulan ang mga gabay at may kasamang petsa kung kailan basahin ang datos. Ipapakita nang buo ang sariling kalkulasyon ng site.',
      },
      {
        label: 'May petsa ng pagsusuri ang bawat pahina.',
        body: 'Sasabihin ng isang gabay na hindi na matagal tiningnan kung ito ang kasalukuyan.',
      },
      {
        label: 'Mga draft ng AI, pagsusuri ng tao.',
        body: 'Ang mga draft ay ginawa ng AI, at sinusuri ng tao. Bawat pahinang inilathala ay binasa ng isang tao na nakisuri sa aritmetika, yunit, at mga pahayag.',
      },
    ],
    whoHeading: 'Sino ang nagpapatakbo nito',
    whoBody:
      '{name}. {bio} {reviewerName} ang nagbabasa ng nilalaman sa pananalakbong pinansyal bago ito ilathala. Itinatakda ng {whoEditorialLink} kung ano ang sinusuri bago mag-online ang isang pahina, at {whoCodeLink}: ang mga formula, unit test, at pagsusuri na humahadlang sa paglabas kapag may sirang pahina.',
    whoEditorialLink: 'pahina ng editoryal',
    whoCodeLink: 'pampublikong code',
    howHeading: 'Paano gumagana ang mga calculator',
    howBody:
      'Gumagana ang aritmetika sa iyong browser. Walang server na tumatanggap ng mga numerong ini-type mo, at walang bahagi ng kalkulasyon na ipinapadala sa kahit sino. Isinasagawa ang mga formula nang is beses sa iisang lugar, at saklaw ng unit test na naghahambing sa kanila sa mga kilalang inilathalang numero ng loan at sa mga invariant na kailangan ng matematika — na ang iskedyul ay nagbabuo sa halamang hinutunan, na ang loan ay eksaktong zero kapag tapos na, at na ang balanseng walang interest ay lumalaki lamang batay sa mga deposito.',
    correctionsHeading: 'Mga pagwawasto',
    correctionsBody:
      'Kung may maling numero, patay na source link, o pahinang nakakasalungat sa sarili, isa iyonong defect at dapat itong ayusin. Sinasabi ng {contactLink} kung paano ito iulat, at ang bawat pagwawasto ay nag|resulta sa binagong petsa ng pagsusuri sa halip na tahimik na pag-edit.',
    contactLink: 'pahina ng pakikipag-ugnayan',
  },

  contact: {
    title: 'Makipag-ugnayan',
    emailLine: 'I-email ang {email}.',
    description:
      'Paano makipag-ugnayan sa site para sa maling numero, sirang link, nawawalang paksa, o problema sa advertising.',
    heading: 'Makipag-ugnayan',
    lede: 'Isang address, binabasa ng tao. Ang mga sagot ay tumatagal ng ilang araw, karaniwang mas mahaba sa mga unang linggo matapos mailathala ang isang pahina.',
    worthHeading: 'Sulit na isulat',
    worth: [
      {
        label: 'Hindi tama ang numero.',
        body: 'Kung hindi tumutugma ang isang pigura sa pahina sa sarili mong kalkulasyon, ipadala ang mga input na ginamit mo at ang numerong nakuha mo. Ito ay isang pagkakamali at titingnan ito.',
      },
      {
        label: 'Nasira o patay na link ng pinagmulan.',
        body: 'Sinusuri ang mga pinagmulan sa isang iskedyul, ngunit maaaring maging sirado ang isang link sa pagitan ng mga pagsusuri.',
      },
      {
        label: 'Nakapagpalit na paksa.',
        body: 'Isinulat ang mga gabay batay sa aritmetikong mahirap sa mga mambabasa, kaya kadalasang ang gap ay gap din sa aritmetikong iyon.',
      },
      {
        label: 'Problemang pang-advertisement.',
        body: 'Ang advertisement na mapanloko, sumisira sa pahina, o takpan ang nilalaman ay sulit iulat. Ang site ay pinapansanan ng display advertising, kaya sineseryoso ang ganitong uri ng ulat.',
      },
    ],
    nextHeading: 'Ano ang susunod',
    nextBody:
      'Tinutugma ang isang naiulat na pigura sa pinagmulan, at binabago ang pahina kung mali ang pigura. Inililipat ang petsa ng pagsusuri sa pahina kapag sinusuri ang nilalaman, mayroon man itong binago o wala, upang ipakita sa iyo kung kailan huling binasa ng isang tao ang pahina.',
  },

  /**
   * The contact form.
   *
   * The statuses are keyed rather than ordered, because the script picks
   * one by key and the page carries all of them.
   */
  contactForm: {
    heading: 'Magsulat ng mensahe',
    lede: 'Ipinapadala ng form ang mensahe sa taong nagbabasa ng site na ito, at ipinapadala ang sagot sa address na isinusulat mo rito.',
    nameLabel: 'Iyong pangalan',
    emailLabel: 'Ang iyong email address',
    subjectLabel: 'Tungkol sa ano',
    messageLabel: 'Ang iyong mensahe',
    submit: 'Ipadala ang mensahe',
    note: 'Ipinapadala ang mensahe sa email at binabasa ito ng isang tao.',
    statuses: [
      { key: 'sent', text: 'Naipadala ang mensahe. Dumating ang sagot sa address na isulat mo.' },
      { key: 'email', text: 'Mukhang hindi kumpleto ang email address na iyon. Suriin ito at ipadala muli ang mensahe.' },
      { key: 'fields', text: 'Kailangan ng laman ang bawat field.' },
      { key: 'rate', text: 'Maraming mensahe ang ipinadala mula sa address na ito sa maikling panahon. Maghintay ng isang minuto at ipadala itong muli.' },
      { key: 'failed', text: 'Hindi naabot ang mensahe. Sumulat sa address sa itaas sa halip.' },
    ],
  },

  sourcesPage: {
    title: 'Mga pinagkukunan',
    description:
      'Bawat pangunahing pinagmulang ginagamit ng site na ito para sa mga numero at metodolohiya nito, at kung bakit kasama rito ang bawat isa.',
    heading: 'Mga pinagkukunan',
    lede: 'Bawat numero sa site na ito ay mula sa isa sa mga organisasyon sa ibaba, o mula sa aritmetikang ipinapakita nang buo ng site. Walang sinipi mula sa isang blog post, buod, o pangalawang pagkakasaysay.',
    whyHeading: 'Bakit may listahan ng mga pinagmulan',
    whyBody: [
      'Ang isang numero nang walang pinagmulan ay isang pahayag lamang. Isinusulat ang mga pahinang ito para sa mga taong gustong suriin mismo ang aritmetika, na posible lamang kung isang click lang ang orihinal na datos. Kaya\'t may sariling listahan ng mga pinagmulan ang bawat gabay, at ang pahinang ito ang index ng lahat ng mga iyon.',
      'N Deliberately pinakamaid ang tuntunin na sinusunod ng site: mga ahensiya ng pamahalan, tagapang-regula ng mga<Response> securities, sentral na bangko, at mga GSE ng mortgage. Kapag mula sa isang commercially na survey ang isang numero, sinasabi ito ng pahina at pangalanan ang survey.',
    ],
    howHeading: 'Paano ginagamit ang mga pinagmulan',
    how: [
      {
        label: 'Mga metodolohiya at formula',
        body: 'mula sa ahensiya na naglathala ng metodolohiya. Nakalagay ang formula ng amortization sa sariling gabay ng CFPB; ang mga tuntunin sa compounding frequency ay mula sa glossary ng SEC; at ang mga tax threshold ay mula sa taunang inflation adjustment ng IRS.',
      },
      {
        label: 'Nakalathalang statistic',
        body: 'mula sa ahensiya ng estadistika na nang-produce nito, kasama ang petsa kung kailan binasa ang numero.',
      },
      {
        label: 'Mga rate ng merkado',
        body: 'mula sa survey na naglathala nito, at may petsa ang mga ito sa pahina, dahil ang rate mula sa ibang buwan ay ibang numero.',
      },
      {
        label: 'Mga numero ng estado',
        body: 'mula sa Tax Foundation, na nagtitipon ng mga brackets ng buwis sa kita mula sa mga batas at mga anyo ng bawat estado, at ang mga rates ng buwis sa property mula sa American Community Survey na ini-publish nito. Ang mga talahanayan ng ulo ng sambahayan, ang deduction para sa federal income tax na bayad at ang mga credit ng estado ay mula sa mga return at tagubilin ng mga estado mismo.',
      },
    ],
    sources: [
      {
        label: 'Consumer Financial Protection Bureau (CFPB) — mortgage, consumer credit',
        url: 'https://www.consumerfinance.gov/',
      },
      {
        label: 'Internal Revenue Service (IRS) — tax bracket, adjustment sa inflation, patakaran sairement',
        url: 'https://www.irs.gov/',
      },
      {
        label: 'Social Security Administration (SSA) — rate ng payroll tax, wage base, taunang limitasyon',
        url: 'https://www.ssa.gov/',
      },
      {
        label: 'Freddie Mac — Pangunahing Survey ng Mortgage Market',
        url: 'https://www.freddiemac.com/pmms',
      },
      {
        label: 'Fannie Mae — pananaliksik at pagsusuri sa merkado',
        url: 'https://www.fanniemae.com/research-and-insights',
      },
      {
        label: 'Department of Housing and Urban Development (HUD) — FHA, HECM, pantay-patang pabahay',
        url: 'https://www.hud.gov/',
      },
      {
        label: 'Federal na Estadistika sa Paggawa (BLS) — Index ng Presyo ng Konsumer',
        url: 'https://www.bls.gov/cpi/',
      },
      {
        label: 'Federal Reserve Board — datos ng rate ng-interest (H.15)',
        url: 'https://www.federalreserve.gov/releases/h15/',
      },
      {
        label: 'Securities and Exchange Commission (SEC) — Investor.gov',
        url: 'https://www.investor.gov/',
      },
      {
        label: 'Federal Reserve Bank of St. Louis (FRED) — serye ng datos ekonomiko',
        url: 'https://fred.stlouisfed.org/',
      },
      {
        label: 'Bureau of Labor Statistics — kalkulator ng CPI at mga talahanayan ng datos',
        url: 'https://www.bls.gov/data/',
      },
      {
        label: 'Tax Foundation — Mga Rate at Bracket ng Individual Income Tax ng mga Estado, 2026',
        url: 'https://taxfoundation.org/data/all/state/state-income-tax-rates-2026/',
      },
      {
        label: 'Tax Foundation — Mga Buwis sa Ari-arian ayon sa Estado at County, 2026',
        url: 'https://taxfoundation.org/data/all/state/property-taxes-by-state-county/',
      },
      {
        label: 'Tax Foundation — Facts & Figures 2026, mga rate ng individual income tax ng mga estado noong 28 Abril 2026',
        url: 'https://taxfoundation.org/data/all/state/2026-state-tax-data/',
      },
      {
        label: 'National Conference of State Legislatures (NCSL) — earned income tax credit at child tax credit ng estado',
        url: 'https://www.ncsl.org/human-services/',
      },
      {
        label: 'Tax Policy Center — mga bayarin at credit sa buwis ng estado',
        url: 'https://taxpolicycenter.org/',
      },
      {
        label: 'Prenatal-to-3 Policy Impact Center — mga patakaran sa tax credit ng bata sa estado',
        url: 'https://pn3policy.org/',
      },
    ],
  },

  editorial: {
    title: 'Redaktang koponan',
    description:
      'Sino ang nagsusulat ng mga gabay, sino ang nagsusuri sa kanila, at ano talaga ang sinusuri bago mag-publish ang isang pahina.',
    heading: 'Redaktang koponan',
    lede: 'Isang tao ang nagsusulat ng mga gabay. Isa pang tao ang nagbabasa ng materyal na pinansyal ng bawat gabay bago ito ilabas. Sinasabi ng pahinang ito kung sino sila, ano ang sinusuri ng pagsusuri, at ano ang maaari mong i-check mismo.',
    authorEyebrow: 'May-akda',
    reviewerEyebrow: 'Tagasuri ng pinansyal',
    checkEyebrow: 'Ano ang maaari mong i-check',
    checkHeading: 'Pampublikong aritmetika',
    checkBody:
      'Nasa pampublikong repository ang code ng bawat calculator, kasama ang mga formula na ginagamit nito, ang mga unit test na nagsusuri sa kanila laban sa mga kilalang nai-publish na pigura, at ang mga tseke na humahadlang sa paglabas ng isang bersyon kapag may sirang pahina. Hindi mo kailangang tiwalaan ang mga numero nang walang nakikita, at hindi mo kailangang magtanong.',
    openRepository: 'Buksan ang repository',
    twoNamesHeading: 'Dalawang pangalan, dalawang trabaho',
    twoNamesBody: [
      'Isang pangalan ang nagsusulat ng mga gabay at nagpapanatili ng calculation engine. Isa naman ang nagbabasa ng financial content ng isang gabay bago ito ilathala, na sinusuri ang mga numero, ang mga assumption sa likod nito, at ang mga pinagmulanan nito. Hiwalay ang dalawang trabaho nang may layunin: ang taong sumusulat ng isang gabay ay hindi ang taong nagbibigay ng final read dito.',
      'Kapag may pangalan ng reviewer ang isang gabay, siya ang taong nagsuri nito, at lumalabas ang pangalan sa gabay na iyon lamang. Ang pagsusuri ay isang pahayag tungkol sa isang partikular na pahina, kaya nakakabit ito sa pahina, hindi sa buong site.',
      'Inilalarawan ng lahat ng iba sa pahinong ito ang sinusuri ng review at ang maaaring i-verify ng isang mambabasa nang hindi nagtatanong kaninuman.',
    ],
    reviewHeading: 'Ano ang sinusuri ng review',
    reviewIntro:
      'Bago ilathala ang isang gabay, dumaan ang reviewer sa parehong listahan sa bawat pagkakataon:',
    review: [
      {
        label: 'Ang arithmetic.',
        body: 'Sinusuri ang bawat formula laban sa pinagmulanan nito, at muling kinakalkula mula sa simula ang worked example sa teksto. Kapag lumalabas ang isang numero sa code, ikinokompare ang dalawa.',
      },
      {
        label: 'Ang mga unit.',
        body: 'Mga porsyento laban sa mga decimal, mga buwan laban sa mga taon, dolyar laban sa libu-libong dolyar. Karamihan sa mga kamalian sa isang pinansyal na dokumento ay error sa yunit.',
      },
      {
        label: 'Ang mga edge case.',
        body: 'Isang zero rate, isang zero term, isang negatibong halaga. Sinusuri ang bawat isa upang magbigay ng makatuwirang sagot sa halip na error message.',
      },
      {
        label: 'Ang pananalitang pananaw.',
        body: 'Hindi dapat sabihin ng pahina sa mambabasa kung ano ang gagawin. Ipinaliliwanag nito ang ibig sabihin ng isang numero at kung ano ang depende nito, at doon din ito humihinto. Ang gabay na nag-recommend ng isang aksyon ay sinusulatan ulit.',
      },
      {
        label: 'Ang mga pinagmulanan.',
        body: 'Kinukumpuni, sinusuri, at pinapetsahan ang bawat link para sa claim na nakakabit dito.',
      },
    ],
    toolsHeading: 'Kung paano ginagamit ang mga drafting tool',
    toolsBody: [
      'Nakakatulong ang mga drafting tool sa pagkakaiba ng salita. Hindi nila ipinapasya kung ano ang nakasulat sa isang pahina. Isang tao ang sumusulat o sumusuri sa bawat bilang, bawat formula, at bawat claim, at walang pahinang ipinapublish nang hindi munang dumadaan sa pagsusuri sa itaas. Ang tool na gumawa ng makatotohanang bilang ay eksaktong uri ng bagay na hinahanap ng prosesong ito.',
      'May mga pagsusuri ring hindi lamang tao ang nagsasagawa nito. May unit test ang calculation engine na tumatakbo sa bawat pagbabago at humahadlang sa release kapag may bilang na nagbago: kailangang tumugma ang amortization schedule sa halagang hinutunan, kailangang eksaktong zero ang pagtatapos ng loan, at kailangang magkatugma ang projection para sa bawat yugto sa closed-form formula sa bawat compounding frequency. Hindi maaaring mabigo ang isang bahagi ng prosa sa ganitong paraan. Maaari naman sa formula, at kapag nangyari iyon, humihinto ang build.',
    ],
    datesHeading: 'Mga petsa ng pagsusuri',
    datesBody:
      'Nakakabit sa bawat guide ang petsa kung kailan ito huling sinuri. Ang guide na nakadepende sa datos mula sa labas ay sinusuri hindi k menos ng dalawang beses sa isang taon; ang guide na nagpapaliwanag ng aritmetika ay sinusuri kapag nagbago ang formula sa likod nito, at sa anumang kaso, isang beses sa isang taon. Kapag sinuri ang isang pahina, nagbabago ang petsa nito, mayroon man itong binago o hindi, upang ipakita sa iyo kung kailan huling binasa ng isang tao ang pahina.',
    correctionsHeading: 'Mga pagwawasto',
    correctionsBody:
      'Ibinubuka ang mga pagwawasto. Kapag nawasto ang isang pahina, nananatiling updated ang petsa ng pagsusuri nito at inilalarawan ang pagwawasto sa contact thread na pinagmulan nito. Ang guide na may maling bilang ay isang defect sa pagsusuri, hindi sa pagkakaiba, at ang proseso ng pagsusuri ang nagbabago nito.',
    contactLink: 'makipag-ugnayan',
  },

  privacy: {
    title: 'Pagkapagkapamilya',
    description:
      'Ang kinokolekta ng site na ito, ang hindi nito kinokolekta, at kung sinong mga advertising at analytics provider ang lumalabas sa mga pahina.',
    heading: 'Pagkapagkapamilya',
    lede: 'Sa maikling bersyon: nananatili sa browser mo ang mga bilang na inilalagay mo sa calculator, at walang tracking cookie na iniingatan mismo ang site.',
    calculatorsHeading: 'Kung ano ang ginagawa ng mga calculator sa iyong input',
    calculatorsBody:
      'Wala. Tumatakbo ang aritmetika sa browser mo gamit ang JavaScript na na-download kasama ang pahina. Hindi ipinapadala kahit saan ang mga halagang inilalagay mo, hindi iniingatan, at hindi nakikita ng site o ng sinumang iba. Kapag isinara mo ang tab, nawala ang mga ito.',
    stateHeading: 'Ang iyong estado',
    stateBody:
      'Dalawa sa mga kalkulator ay nangangailangan ng state figure: ang kalkulator ng federal income tax, na nagdaragdag ng state income tax sa federal tax, at ang kalkulator ng rent versus buy, na may kasamang property tax sa halaga ng pag-aari ng bahay. Kapag binuksan ang isa sa mga pahinang iyon, ninasya itong site kung saang state galing ang request. Ang sagot ay mula sa network na nagha-serve ng site, na binabasa ang state mula sa address ng request, at ginagamit ito para punan ang isang field. Walang ibang nangyayari rito: hindi ini-store ang sagot, hindi ito sinusulatan sa cookie, at hindi ito ipinapadala sa Google o sa page analytics ng hosting provider. Ang state ay approximate — maaaring ituro ng VPN, proxy, o mobile network sa maling state — at ang field na pinupunan ay maaaring baguhin o burahin; kung gayon, pinapanatili ng pahina ang numero na iyong inilagay.',
    cookiesHeading: 'Mga cookies',
    cookiesBody:
      'Walang sariling cookies na itinatakda ng {name}. Ang analytics ng mismong site ay tumatakbo sa Google Analytics 4, na ini-serve ng Google mula sa sarili nitong mga domain at nag-i-store ng first-party identifier sa iyong browser para maihiwalay ang isang visit mula sa susunod. Hindi ito ginagamit para sa advertising at hindi ito ibinabahagi sa ibang site. Ang page analytics ng hosting provider ay walang itinatagda sa iyong browser: walang cookie, walang local storage, at walang anumang uri ng identifier.',
    advertisingHeading: 'Patalastas',
    advertisingBody:
      'Pinapalansahan ng display advertising ang site na ini-serve ng Google AdSense. Maaaring magtakda ng cookies o gumamit ng katulad na mga teknolohiya ang Google at ang mga partner nito para mag-serve at sukatin ang advertising, at maaaring gamitin ang mga ito para mag-serve ng ads batay sa iyong mga dating pagbisita sa site na ito o sa iba pang website. Maaari mong suriin at baguhin ang iyong mga pagpipilian sa {adsSettingsLink}, at ang sariling explainer ng Google kung paano nito ginagamit ang data mula sa mga site at app na gumagamit ng mga serbisyo nito ay nasa {policiesLink}.',
    adsSettingsLink: 'Google Ads Settings',
    policiesLink: 'policies.google.com',
    analyticsPoliciesLink: 'policies.google.com',
    analyticsHeading: 'Pagtataya',
    analyticsBody:
      'Ini-record ang page views gamit ang Google Analytics 4, na ini-serve ng Google mula sa googletagmanager.com. Limitado ang ginagamit na data sa mismong pahina, referring source, at banayad na antas ng lokasyon ng bansa o lungsod; pinuputol ang IP address sa halip na ito ay i-store nang buo. Ginagamit ito para bilangin ang mga visit at matukoy kung aling mga pahina ang binabasa. Ang sariling explainer ng Google kung paano nito ginagamit ang data mula sa mga site at app na gumagamit ng mga serbisyo nito ay nasa {analyticsPoliciesLink}. Isinus-load lamang ang script pagkatanggap mo ng tanong tungkol sa cookie, at isinusoload ito para sa mga mambabasa sa European Union din.',
    hostingAnalyticsHeading: 'Hosting at page performance',
    hostingAnalyticsBody:
      'Naka-host ang site sa Cloudflare, at ang sariling Web Analytics ng Cloudflare ay tumatakbo sa bawat pahina. Isang maliit na script na ini-serve mula sa static.cloudflareinsights.com ang sumusukat sa page view: kung aling pahina ang binuksan, kung saan galing ang visit, kung anong browser at operating system ang ginamit, kung saang bansa galing ang request, at gaano katagal bago ma-load ang pahina. Ginagamit ang IP address sa edge ng Cloudflare para matukoy ang bansa at ito ay itinatapon doon sa halip na i-store. Walang cookie na itinatakda ng script, walang isinusulat sa local storage, at walang identifier na maaaring sundan ka mula sa isang pahina sa susunod. Ang resulta ay bilang ng page views at visit, at sukat kung mabilis mag-load ang mga pahina. Isinus-load lamang ang script pagkatanggap mo ng tanong tungkol sa cookie. Hindi ganapong binibilang ang mambabasa sa European Union: hindi isinus-load ang script para sa kanila.',
    newsletterHeading: 'Newsletter',
    newsletterBody:
      'Kung mag-subscribe ka sa newsletter, ipinapadala ang address na iyong inilagay sa Buttondown, ang serbisyo na nagpapadala ng mail, at ini-store ito doon para mailin ang newsletter. Gamitin lamang ang address na iyon para sa newsletter, at may unsubscribe link ang bawat isyu.',
    contactHeading: 'Ang contact form',
    contactBody:
      'Kung magsusulat ka ng mensahe sa pamamagitan ng contact form, ipapadala ng email ang pangalan, email address, subject, at mismong mensahe sa taong nagpapatakbo ng site, at ito ay itatago sa mailbox na iyon. Mula sa site na ito ibinibigay ang form at napupunta ang tugon sa address na isulat mo, upang maaari mong ipagpatuloy ang usapan. Walang ipinapadala ng form sa Google at walang sariling cookie na itinatakda; ang mga advertising script at analytics script na nabanggit sa itaas ay pag-aari ng pahina bilang buo at naglo-load lamang kung pumayag ka sa cookies. Walang naitatip na sinusulat mo sa mismong site, at hindi ipinapasa ang mensahe sa kaninuman.',
    thirdPartyHeading: 'Mga link ng third-party',
    thirdPartyBody:
      'Nag-u-link ang mga gabay sa pangunahing mapagkukunan — mga ahensya ng pamahalaan, ang SEC, ang Federal Reserve. May sarili silang privacy policy ang mga site na iyon, na hindi kontrolado ng site na ito at hindi pa binabasa para sa iyo.',
    changesHeading: 'Mga pagbabago',
    changesBody:
      'Kung magbago ang mga provider sa itaas, magbabago rin ang pahinang ito kasama nila. Ang petsa sa ibaba ng pahina ay ang petsa kung kailan huling sinuri ang tekstong ito.',
    consentHeading: 'Ang iyong pagpili',
    consentBody:
      'Walang nilo-load mula sa Google, at naka-off ang page analytics ng hosting provider, hanggang sa tumugon ka. Kung pumayag ka, maglo-load ang advertising at analytics script at naaalala ang iyong sagot sa iyong browser; kung tumanggi ka, gumagana ang site sa parehong paraan at walang nilo-load. Hindi kasama ang page analytics ng hosting provider para sa mambabasa sa European Union, anuman ang iyong sagot. Ang link na {settingsLink} sa footer ay muling binubuksan ang tanong. Isang pagbubukod: mismong crawler ng Google, na nagsusuri kung may advertising ang site, ay direktang ibinibigay ang advertising script, dahil hindi nito masagot ang tanong. Walang naitatala na pagpili para dito at walang naitatip tungkol dito. Ang estado na inilarawan sa itaas ay binabasa sa dalawang calculator page at hindi bahagi ng pagpiling ito: walang cookie na itinatakda para dito at walang dumadaan sa analytics provider ang anumang bagay tungkol dito.',
    lastReviewed: 'Huling sinuri: {date}.',
  },

  terms: {
    title: 'Mga tuntunin',
    description:
      'Ang mga tuntuning ilalathala ang site na ito, ang saklaw at hindi saklaw ng mga calculator nito, at ang mga limitasyon ng kung ano ang maaari nitong ipangako.',
    heading: 'Mga tuntunin ng paggamit',
    lede: 'Malinaw na tuntunin para sa isang site na naglalathala ng kalkulasyon sa halip na mga rekomendasyon.',
    providesHeading: 'Ang ibinibigay ng site na ito',
    providesBody:
      'Nagla-publish ang {name} ng mga calculator at nakasulat na paliwanag ng aritmetika sa likod nila. Inaalapat ng mga calculator ang mga nakalathalang formula sa mga halagang ibinibigay mo at ibinabalik ang resulta kasama ang pagkalkula. Iyon lamang ang buong serbisyo.',
    notProvidesHeading: 'Ano ang hindi ibinibigay ng site na ito',
    notProvidesBody: [
      'Walang anuman dito ang payo sa pananalapi, buwis, batas, o pamumuhay, at walang anuman dito ang rekomendasyong bumili, magbenta, maghawak, mag-upa, magkaroon ng ari-arian, mag-refinance, o pumirma sa kahit anuman. Ang resulta ay nagpapakita ng mga input na ipinasok mo at ang formula sa pahina. Kapag binago mo ang isang input, nagbabago rin ang resulta; iyon ang dahilan kung bakit ito kalkulasyon at hindi konklusyon.',
      'Hindi nakikita ng calculator ang iyong pananalapi, kita, kredito, timeframe o pagpapahalaga sa panganib, at hindi nito tinatangkang hulaan ang mga ito. Magkakaroon ng iba’t ibang konklusyon ang dalawang tao na may parehong input at magkakaibang kalagayan, at hindi malalagyan ng tungkulin ang calculator na sabihin kung alin sa kanila ang tama.',
    ],
    figuresHeading: 'Mga numero, pinagmulan, at petsa',
    figuresBody:
      'Kapag galing sa panlabas na pinagmulan ang isang numero, nagli-link ang pahina sa pinagmulang iyon at ibinibigay ang petsa kung kailan ito binasa. Nagbabago ang panlabas na datos: binabago ang mga tax threshold, nahahayag na rate, at opisyal na istatistika. Tama ang numero sa isang pahina sa petsa ng pagsusuri ng pahinang iyon at hindi na pagkatapos nito, at nakalagay doon ang petsa ng pagsusuri upang makita mo kung gaano na ito luma.',
    errorsHeading: 'Mga error',
    errorsBody:
      'Isinasagawa ang mga kalkulasyon sa isang lugar lamang, at sinusuri. Gayunpaman, posibleng may kasalanan. Kung makita mo ang isa, ipinapaliwanag ng contact page kung paano ito iulat, at ang mga naiulat na defect ay tinatfix at ang petsa ng pagsusuri ay ina-update.',
    advertisingHeading: 'Patalastas',
    advertisingBody:
      'Pinapalansahan ng display advertising ang site. Ang mga patalastas ay inihahain ng third party at hindi kontrolado ng site. May label ang mga patalastas at pinaghihiwalay mula sa sariling nilalaman ng site. Walang advertiser ang nagbabayad para sa isang pahina, placement, placement sa resulta ng paghahanap, o pagbanggit ng produkto sa isang guide.',
    useHeading: 'Paggamit ng site',
    useBody:
      'Inilathala ang site para sa personal na paggamit. Maaari mong basahin, i-print, at mag-link dito. Hindi mo maaaring i-republish ang malaking bahagi ng mga guide bilang sarili mong gawa, o gamitin ang mga kalkulator upang bumuo ng produkto na nakikipagkumpitensya sa site.',
    changesHeading: 'Mga pagbabago',
    changesBody:
      'Maaaring magbago ang mga tuntunin na ito habang nagbabago ang site. Ang petsa ng pagsusuri sa ibaba ay ang petsa kung kailan huling binasa ang tekstong ito.',
    lastReviewed: 'Huling sinuri: {date}.',
    contactLink: 'pahina ng pakikipag-ugnayan',
  },

  notFound: {
    title: 'Hindi nahanap ang pahina',
    description: 'Hindi umiiral ang pahinang iyon sa site na ito. Narito kung saan talaga nasa lokasyon ang lahat.',
    heading: 'Hindi nahanap ang pahina',
    lede: 'Hindi umiiral ang URL na iyon dito. Ang lahat na inilalathala ng site ay isa sa tatlong calculator, ang mga gabay sa likod ng mga ito, o ang mga pahinang nagpapaliwanag kung saan nagmumula ang mga numero.',
    calculators: {
      title: 'Mga calculator',
      text: 'Pagbayad ng mortgage, paghahambing ng upa at pagbili, compound interest.',
    },
    guides: {
      title: 'Mga gabay',
      text: 'Detalyado ang aritmetika sa likod ng bawat calculator.',
    },
    sources: {
      title: 'Mga pinagkukunan',
      text: 'Lahat ng pangunahing pinagkukunan na umaasa ang site.',
    },
    contact: {
      title: 'Makipag-ugnayan',
      text: 'Sabihin sa amin kung ano ang kulang o mali.',
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
      name: 'Calculator ng Pagbayad ng Mortgage',
      title: 'Calculator ng Pagbayad ng Mortgage na may Amortization',
      description:
        'Kalkulahin ang iyong buwanang pagbayad ng mortgage, kabuuang PITI na gastos, at buong amortization schedule. Tingnan ang bawat dolyar ng interest at kung paano binabago ng karagdagang pagbabayad ang petsa ng pagbabayaran.',
      short: 'Buwanang P&I, buong PITI, iskedyul ng amortisasyon at epekto ng karagdagang bayad.',
      category: 'Bahay',
      methodNote:
        'Inilalarawan sa ibaba ang formula ng bayad, iskedyul ng amortisasyon at paraan ng paglalapat ng karagdagang bayad. Walang anuman sa pahinang ito ang live na market quote.',
      fields: {
        homePrice: 'Presyo ng bahay',
        downPayment: 'Down payment',
        percentOfPrice: 'porsyento ng presyo',
        interestRate: 'Rate ng interes',
        annualFixed: 'taunan, nakapirmi',
        loanTerm: 'Tanda ng loan',
        propertyTax: 'Buwis sa ari-arian',
        percentOfPricePerYear: '% ng presyo kada taon',
        homeInsurance: 'Insurance ng bahay',
        perYear: 'kada taon',
        hoaFee: 'Bayad sa HOA o condo',
        perMonth: 'kada buwan',
        extraPrincipal: 'Karagdagang pangunahing prinsipal',
        firstPayment: 'Unang bayad',
        month: 'buwan',
        seeAmortization: 'Tingnan ang amortization taon-taon',
      },
      terms: {
        years: (n: number) => `${n} ${n === 1 ? 'isang taon' : 'taon'}`,
      },
      table: {
        year: 'Taon',
        principal: 'Pangunahing prinsipal',
        interest: 'Interes',
        balance: 'Balanse',
      },
      result: {
        headlineLabel: 'Kabuuang buwanang bayad (PITI)',
        principalAndInterest: 'Pangunahing prinsipal at interest',
        propertyTax: 'Buwis sa ari-arian',
        insurance: 'Seguransya',
        hoa: 'HOA',
        totalInterest: 'Kabuuang interes',
        paidOff: 'Tapos na bayad',
        note: 'Pangunahing prinsipal, interes, property tax,insurance at HOA, gamit ang mga numerong inilagay mo.',
      },
      resultNote:
        'Palitan ang anumang field at magbabago ang mga datos habang nagta-type ka. Walang ipinapadala sa kahit saan: ang pagkalkula ay isinasagawa sa pahinang ito.',
      chart: {
        title: 'Ang balanse at ang interes, taon sa taon',
        note: 'Bumababa ang balanse habang bayarin ang loan, at bumababa rin ang interes na binabayad taon sa taon.',
        xAxis: 'years',
        series: [
          { key: 'balance', label: 'Balanse' },
          { key: 'interest', label: 'Interes na binayaran' },
        ],
      },
      formula: 'M = P · r(1 + r)ⁿ / ((1 + r)ⁿ − 1)',
      method: [
        'Galing sa karaniwang amortization formula ang nakatakdang monthly payment:',
        'Ang P ay ang halagang hiniram, na kinakalkula ng pahinang ito bilang presyo ng bahay minus ang down payment. Ang r ay ang taunang rate na inilagay mo na hatsa sa twelve, at ang n ay ang term sa mga buwan. Mula sa iisang numerong ito, nagtatayo ang calculator ng iskedyul buwan sa buwan: naniningil ang interes sa balanseng nanatiling hindi pa bayad sa simula ng buwan, at ang natitirang bahagi ng bayarin pagkatapos ng interes ay bumababa sa balanse.',
        'Ang buong monthly payment ay ang prinsipal at interes, kasama ang property tax na hatsa sa twelve, ang insurance na hatsa sa twelve, at anumang HOA fee. Iyon ang tatlong bagay na ikaw ang nagtatakda: walang alam ang calculator kung magkano ang iyong local assessment o ang singil ng iyong insurer, at hindi nito haka-hakain para sa iyo.',
        'Inilalapat ang karagdagang monthly payment sa prinsipal, kaya bumababa nito ang balanseng basehan ng interes sa susunod na buwan. Hindi nagbabago ang nakatakdang bayarin, masuurat ang loan, at lumiliit ang kabuuang interes.',
      ],
      limits: [
        'Hindi nito sinusuriin kung kwalipikado ka para sa loan, at hindi nito tinitingnan ang iyong credit score, kita, debt-to-income ratio o anumang underwriting rules ng lender.',
        'Hindi nito binubuo ang kasalukuyang merkadong rates para sa iyong postcode. Ang interest rate na ipinasok mo ang rate na gagamitin mo, at walang live na laman ang pahinang ito.',
        'Hindi nito binubuo ang private mortgage insurance, points, loan origination fees, closing costs, o ang escrow timing na nagpapasiya kung saang buwan babagsak ang tax bill.',
        'Hindi nito sinasabi sa iyo kung dapat kang bumili ng bahay. Nagbibigay ito ng isang numero at ang kalkulasyon sa likod nito.',
      ],
      faq: [
        {
          q: 'Ano ang ibig sabihin ng PITI?',
          a: 'Principal, Interest, Taxes at Insurance. Ito ang apat na bahagi ng buwanang bayarin sa pabahay: ang bahagi na nagbabayad ng loan, ang bahagi na nagbabayad sa lender para sa pag borrowing, property tax, at homeowners insurance. Ipinapakita ng calculator na ito ang bawat bahagi nang hiwalay upang makita mo kung ano ang bumubuo sa kabuuan.',
        },
        {
          q: 'Paano kinakalkula ang buwanang principal at interest payment?',
          a: 'Ito ang karaniwang formula ng amortisasyon: M = P · r(1 + r)ⁿ / ((1 + r)ⁿ − 1), kung saan ang P ay halangang hinutang, ang r ay buwanang rate ng-interest, at ang n ay bilang ng buwanang pagbabayad. Inililipat ng sumusunod na iskedyul ang-interest sa baba at ang principal sa itaas bawat buwan, kaya ang mga unang pagbabayad ay karamihan na interest.',
        },
        {
          q: 'Ano ang nangyayari sa huling payment?',
          a: 'Nililingkuran ang nakatakdang payment sa pinakamalapit na sentimo, kaya may ilang sentimo na natitira sa dulo ng term. Iniaadjust ang huling nakatakdang payment upang eksaktong zero ang magkaroon ng loan sa pagtatapos, gaya ng ginagawa ng lender sa huling payment.',
        },
        {
          q: 'Pinapaikli ng ba pang bayarin ang loan o ang payment?',
          a: 'Pinapaikli nito ang loan. Ang karagdagang payment ay inilalapat sa principal, na nagpapababa ng balanse na pinapataasan ng interest sa susunod na buwan. Nananatiling pareho ang nakatakdang payment, at mas maaga tapos ang loan na may mas mababang kabuuang interest.',
        },
        {
          q: 'Naaapektuhan ba ng tax at insurance inputs ko ang kabuuang interest?',
          a: 'Hindi. Ang kabuuang interest ay para lang sa loan. Ang property tax, insurance, at HOA ay mga gastos sa pabahay na nagpapatuloy pagkatapos mabayaran ang loan, kaya ito ay hiwalay na nag-uulat ng calculator ng kabuuang gastos sa pabahay.',
        },
        {
          q: 'Sinasama ba ng calculator ang inflation?',
          a: 'Hindi. Lahat ng numero ay nasa dolyar na ipinasok mo. Ang mortgage payment sa loob ng 30 taon ay napakaliit na bahagi ng kitaan kumpara sa parehong payment ngayon, at walang sinusuklayan ang anumang numero sa pahinang ito para sa inflation.',
        },
      ],
      sources: [
        {
          label: 'CFPB — Paano kalkulahin ang bayad sa mortgage',
          url: 'https://www.consumerfinance.gov/ask-cfpb/how-do-i-calculate-my-mortgage-payment-en-144/',
        },
        {
          label: 'Freddie Mac — Primary Mortgage Market Survey (metodolohiya ng rate)',
          url: 'https://www.freddiemac.com/pmms',
        },
        {
          label: 'HUD — Mga kinakailangan sa FHA loan at insurance sa mortgage',
          url: 'https://www.hud.gov/helping_american_homeowners',
        },
        {
          label: 'BLS — Consumer Price Index (inflation, para sa tala ng real na halaga)',
          url: 'https://www.bls.gov/cpi/',
        },
      ],
      relatedGuides: [
        { slug: 'mortgage-payment-calculator-explained', title: 'Paliwanag sa kalkulador ng bayad sa mortgage' },
        { slug: 'how-mortgage-amortization-works', title: 'Paano gumagana ang amortization ng mortgage' },
        { slug: 'monthly-payment-vs-total-cost-mortgage', title: 'Buwanang bayarin kumpara sa kabuuang gastos ng mortgage' },
        { slug: 'extra-mortgage-payments-math', title: 'Ang matematika sa likod ng dagdag na mortgage payment' },
        { slug: 'how-to-read-an-amortization-schedule', title: 'Paano basahin ang amortization schedule' },
      ],
    },

    'rent-vs-buy': {
      name: 'Calculator ng Pag rents vs Pagbili',
      title: 'Rent vs Buy Calculator: Ih compares ang tunay na gastos',
      description:
        'Ihambing ang pag-upuan at pag-aari batay sa mga numero: buwanang gastos, unang bayad, equity at ang buwan kung kailan nagkrossover ang dalawang landas. Walang pasya, math lang ang ito.',
      short: 'Buwanang gastos, unang bayad, pagtatipon ng equity at ang crossover month.',
      category: 'Bahay',
      methodNote:
        'Ang comparison ay cash outflow at equity. Walang layunin itong magbigay ng pasya — ang crossover month ay katotohanan tungkol sa mga numerong ipinasok mo, hindi isang rekomendasyon.',
      sections: {
        theHome: 'Ang bahay',
        theRent: 'Ang upuan',
        runningCosts: 'Mga patakoy na gastos',
        assumptions: 'Mga assumption',
      },
      fields: {
        purchasePrice: 'Presyo ng pagbili',
        downPayment: 'Down payment',
        percentOfPrice: 'porsyento ng presyo',
        mortgageRate: 'Rate ng mortgage',
        annualFixed: 'taunan, nakapirmi',
        loanTerm: 'Tanda ng loan',
        monthlyRent: 'Buwanang upa',
        rentersInsurance: "Insurance ng nangungupahan",
        perMonth: 'kada buwan',
        propertyTax: 'Buwis sa ari-arian',
        percentOfPricePerYear: '% ng presyo kada taon',
        homeInsurance: 'Insurance ng bahay',
        perYear: 'kada taon',
        hoaFee: 'Bayad sa HOA o condo',
        maintenance: 'Pagpapanatili',
        annualChangeInValue: 'Taunang pagbabago sa halaga',
        negativeModelsAFall: 'negatibo para sa pagbagsak',
        compareOver: 'Maghambing sa higit sa',
        closingCosts: 'Mga pagsasara',
        percentOfPriceOnce: '% ng presyo, minsan',
        sellingCosts: 'Mga gastos sa pagbebenta',
        percentOfFinalValue: '% ng huling halaga',
      },
      terms: {
        years: (n: number) => `${n} ${n === 1 ? 'isang taon' : 'taon'}`,
      },
      result: {
        headlineLabel: 'Buwanang pagkakaiba (pag-aari minus pagupa)',
        monthlyRent: 'Buwanang upa',
        monthlyOwnership: 'Buwanang pag-aari',
        monthlyOwnershipAfterLoan: 'Buwanang pag-aari kapag natapos na ang loan',
        upfrontOutlay: 'Unang pamanaag',
        equityBuilt: 'Naitong equity',
        homeValueAtHorizon: 'Halaga ng bahay sa taning',
        sellingCostsAtHorizon: 'Mga gastos sa pagbebenta sa taning',
        netCostAtHorizon: 'Netong gastos ng pag-aari sa taning',
        crossover: 'Pagpapalit',
        note: 'Kasama sa ownership ang mortgage payment habang umiiral ang loan, at ang property tax, insurance, HOA at maintenance pagkatapos nito. Ang equity ay ang halaga ng bahay minus ang balanse na hindi pa nbayad, minus ang mga gastos sa pagbebenta kung ipinagbenta ang bahay sa puntong iyon.',
      },
      resultNote:
        'Ang crossover ay ang unang buwan kung saan ang net cost ng owning — cash na bayad minus ang equity na maiiwan sa iyo kapag nagbenta — ay mas mababa sa cash cost ng pag-upuan. Ito ay isang katotohanan tungkol sa mga numerong ito, hindi isang rekomendasyon.',
      chart: {
        title: 'Ang gastos ng pag-upuan kumpara sa gastos ng owning',
        note: 'Parehong pinagsamang cumulative cash: ang bayad na inilagay sa upuan, at ang pera na ginugol sa bahay pagkatapos ng equity na nabuo, net ng mga gastos sa pagbebenta kung ipinagbenta ang bahay sa puntong iyon.',
        xAxis: 'years',
        series: [
          { key: 'rent', label: 'Bayad na inilagay sa upuan' },
          { key: 'ownership', label: 'Net cost ng owning' },
        ],
      },
      method: [
        'Bawat buwan, pinapagana ng calculator ang dalawang ledger nang magkasabay. Ang ledger ng pag-upuan ay nagdaragdag ng iyong upuan at renter’s insurance. Ang ledger ng owning ay nagdaragdag ng mortgage payment mula sa karaniwang amortization formula, property tax, insurance, HOA at allowance para sa maintenance, at ang down payment at closing costs sa unang buwan. Humihinto ang mortgage payment kapag nbayad na ang loan; nagpapatuloy ang iba pang mabilis na gastos habang may hawak ka sa bahay.',
        "Kasama ang pangalawang talaan, sinusundan nito ang halaga ng bahay, na lumalaki o lumiliit bawat buwan sa taunang rate na inilagay mo, at ang balanse na hinahalikuran pa sa loan. Ang pagkakaiba sa dalawa ay ang iyong equity:",
        'Ang net cost ng owning ay ang cash na nabayad mo, minus ang equity na nabuo mo, plus ang mga gastos sa pagbebenta kung ipinagbenta ang bahay sa puntong iyon. Ang crossover month ay ang unang buwan kung saan mas mababa ang halagang ito sa upuan na mababayaran mo sa parehong panahon. Hindi bahagi ng monthly payment ang mga gastos sa pagbebenta dahil hindi mo ito binabayaran hangga’t hindi ka nagbebenta; nasa equity ito, kung saan occurs ang pagbebenta.',
      ],
      formula: 'equity = halaga ng bahay − natitirang balanse ng loan',
      limits: [
        'Hindi nito sinasabi kung aling option ang mas mainam para sa iyo. Ikinukumpara ang dalawang landas batay sa mga numerong ibinigay mo at iniuulat ang crossover month, lamang.',
        'Hindi nito ini-model ang tax treatment ng pagbebenta, mortgage interest deduction, o ang depreciation ng property sa pagkamatagal.',
        'Hindi nito presyahan ang isang partikular na loan. Ang mortgage rate na ilalagay mo ang rate na ginagamit; walang live quotes o impormasyon ng lender ang pahina.',
        'Hindi nito forecast ng presyo ng bahay. Ang taunang pagbabago ng halaga na ilalagay mo ay inilalapat buwan-buwan sa buong panahon, sa parehong direksyon kung maglagay ka ng negatibong numero.',
        'Hindi nito modelin ang gastusin ng paglikas sa inyong binabayarang bahay. Ang deposit, bayarin ng agent at mga gastos sa paglikas ay nasa labas ng paghahComparing sa panig ng pagbabayad ng upa.',
        'Hindi nito ginagamit ang rate ng isang partikular na county o lungsod. Ang property tax rate na kayang punan ng pahina ay average ng estado, at lokal na itinakda ang property tax, kaya karaniwang iba ang rate ng isang hurisdiksiyon sa rate ng susunod.',
      ],
      faq: [
        {
          q: 'Ano ang ibig sabihin ng crossover month?',
          a: 'Ito ang unang buan kung saan ang net cost ng pag-ari — ang pera mong bayad, minus ang equity na naipon mo, plus ang mga gastos sa pagbebenta sa panahong iyon — ay mas mababa sa pera mong sana ay nagbayad ng upa sa parehong panahon. Bago ang puntong iyon, mas mababa ang gastos ng pagbabayad ng upa sa cash. Pagkatapos nito, mas mababa ang gastos ng pag-ari kapag sinalok ang equity.',
        },
        {
          q: 'Bakit kasama sa kalkulasyon ang maintenance allowance?',
          a: 'May gastos ang pag-aring bahay sa pagkapanatili nito ayon pa sa pagkailangan, may kasamang mortgage man o wala, at hindi ito lumalabas sa anumang closing statement. Inilalapat ng calculator ito bilang porsyento ng presyo ng pagbili kada taon, at ang porsyentong iyon ay input na itinakda mo.',
        },
        {
          q: 'Ano ang nangyayari sa halaga ng bahay sa kalkulasyon?',
          a: 'Tumutubo o lumiliit ito kada buwan ayon sa taunang rate na ilalagay mo, pagkatapos ay ihinahambing sa natitirang balanse ng loan upang makuha ang equity. Ang negatibong rate ay nag-model ng pababagsak na merkado; ang zero rate ay nagpapatigil sa presyo.',
        },
        {
          q: 'Kasama ba ang mga gastos sa pagbebenta?',
          a: 'Oo. Singil ang mga gastos sa pagbebenta sa presyo ng bahay sa sandaling ito ay ipinagbenta, kaya hindi ito bahagi ng monthly payment. Pagbabawasan nito ang equity na mauuwi sa iyo mula sa pagbebenta, at kaya ito bahagi ng net cost ng pag-ari at ng crossover month. Hiwalay itong iniulat sa dulo ng panahon.',
        },
        {
          q: 'Ano ang nangyayari sa mortgage payment kapag nTapos na ang loan?',
          a: 'Nahihinto ito. Natatapos ang principal at interest ng loan kasama ang loan, habang patuloy ang property tax, insurance, HOA at maintenance habang pag-aari mo ang bahay. Kapag lampas sa katapusan ng term ang paghahambing, ang mga buwan pagkatapos nito ay may kasamang lamang ang patuloy na gastos.',
        },
        {
          q: 'Ano ang pagkakaiba ng kabuuang upa at net cost ng pag-ari?',
          a: 'Ang kabuuang upa ay ang bayad mo sa upa bawat buwan na pinarami ng bilang ng buwan. Ang netong halaga ng pag-aari ay ang bayad mo sa mortgage, buwis, seguro, HOA at pagkukumpuni, kasama ang paunang bayad, minus ang equity na naipon mo, kasama ang mga gastos sa pagbebenta ng ari-arian. Maaaring negatibo ang pangalawang bilang, na nangangahulugang mas marami na equity ang naipon mo kaysa sa kabuuang bayad mo.',
        },
        {
          q: 'Kasama ba rito ang buwis na bunga ng pagbebenta ng bahay?',
          a: 'Hindi. Anumang kita sa pagbebenta at anumang pag exemption na nalalapat dito ay wala sa saklaw ng tool na ito. Ang paghahambing dito ay paghahambing ng cash at equity, hindi paghahambing ng buwis.',
        },
        {
          q: 'Saan galing ang tax rate ng property?',
          a: 'Isa itong input. Kapag naintentihan ng network kung saang estadong nagmumula ang request, pupunan ng pahina ang field na ito gamit ang average effective property tax rate ng estadong iyon, na kinuha mula sa American Community Survey para sa 2024 at inilathala ng Tax Foundation para sa 2026. Itinatakda ng mga lokal na pamahalaan ang property tax, kaya karaniwang iba ang rate sa isang partikular na county o lungsod kaysa sa average ng estado, at nananatiling editable ang field na iyon.',
        },
      ],
      sources: [
        {
          label: 'CFPB — Mga gastos sa pabahay, pag rents at pag-aari',
          url: 'https://www.consumerfinance.gov/consumer-tools/mortgages/',
        },
        {
          label: 'HUD — Gabay sa mga gastos sa pabahay, property taxes at seguro',
          url: 'https://www.hud.gov/helping_american_homeowners',
        },
        {
          label: 'BLS — Consumer Price Index (inflation, para sa tala sa pagtaas ng halaga)',
          url: 'https://www.bls.gov/cpi/',
        },
        {
          label: 'FRED — Seri ng index ng presyo ng mga bahay na ginagamit para sa pagbabago ng presyo sa mahabang panahon',
          url: 'https://fred.stlouisfed.org/series/HPINUS',
        },
        {
          label: 'Tax Foundation — Mga Buwis sa Ari-arian ayon sa Estado at County, 2026',
          url: 'https://taxfoundation.org/data/all/state/property-taxes-by-state-county/',
        },
      ],
      relatedGuides: [
        { slug: 'rent-vs-buy-calculator-explained', title: 'Paliwanag sa calculator ng paghah comparing ng upuan at pagbili' },
        { slug: 'rent-vs-buy-common-mistakes', title: 'Karaniwang kamalian sa paghahambing ng upuan at pagbili' },
        { slug: 'estimating-property-tax-and-home-insurance', title: 'Pagtataya ng buwis sa property at insurance ng tahanan' },
        { slug: 'down-payment-and-closing-costs-explained', title: 'Paliwanag sa down payment at closing costs' },
        { slug: 'monthly-payment-vs-total-cost-mortgage', title: 'Buwanang bayarin kumpara sa kabuuang gastos ng mortgage' },
      ],
      script: {
        notWithinHorizon: 'Hindi saklaw ng panahong nakikita',
        month: 'Buwan {n}',
        propertyTaxDetected: 'Puno ng {state}: ang average na epektibong rate ng buwis sa property ng estado.',
      },
    },

    'compound-interest': {
      name: 'Calculator ng Compound Interest',
      title: 'Calculator ng Compound Interest na may Buwanang Kontribusyon',
      description:
        "Proyektahin ang balanse na may regular na kontribusyon, piliin ang dalas ng pag-compound, at tingnan ang resulta sa dolyar ngayon pagkatapos ng inflation. Ipinapakita ang mga formula.",
      short: 'Balanse, kontribusyon, nab earn na interes at halagang nakikisangkot sa inflation.',
      category: 'Pag-iinvest',
      methodNote:
        'Isinasagawa ang proyeksyon isa-isa ang bawat panahon, kaya ang taunang talahanayan ay ginagawa ng parehong aritmetikang ginagamit para sa huling numero.',
      fields: {
        startingBalance: 'Simulang balanse',
        today: 'ngayon',
        monthlyContribution: 'Buwanang kontribusyon',
        addedEachMonth: 'idinagdag bawat buwan',
        interestRate: 'Rate ng interes',
        annualNominal: 'taunan, nominal',
        time: 'Oras',
        years: 'taon',
        compounding: 'Pag-compound',
        contributionTiming: 'Oras ng kontribusyon',
        inflation: 'Inflasyon',
        annualForRealValue: 'taon, para sa halaga sa kasalukuyang pera',
        seeBalance: 'Tingnan ang balanse taon-taon',
      },
      frequencies: {
        monthly: 'Buwanan',
        quarterly: 'SQuarterly',
        twiceAYear: 'Dalawang beses sa isang taon',
        annually: 'Taunan',
        everyTwoMonths: 'Bawat dalawang buwan',
        everyFourMonths: 'Bawat apat na buwan',
      },
      timing: {
        endOfMonth: 'Dulo ng buwan',
        startOfMonth: 'Simula ng buwan',
      },
      table: {
        year: 'Taon',
        balance: 'Balanse',
        contributed: 'Nagdagdag',
        interest: 'Interes',
        inTodaysDollars: "Sa kasalukuyang dolyar",
      },
      result: {
        headlineLabel: 'Balanso sa dulo ng panahon',
        totalContributions: 'Kabuuang kontribusyon',
        interestEarned: 'Interes na itinamo',
        inTodaysDollars: "Sa kasalukuyang dolyar",
        effectiveAnnualRate: 'Epektibong taunang rate',
        realAnnualRate: 'Tunay na taunang rate',
        horizon: 'Tagong panahon',
        note: 'Ang balanso ay nasa dolyar na inilagay mo. Ang pigsa na-adjust sa inflation ay ginagawang katumbas ng kapangyarihan ng pagbili sa simulang taon.',
      },
      resultNote:
        'Ang rate na ilalagay mo ay ginagamit nang eksakto gaya ng inilagay sa buong panahon. Hindi naghahanap ng market rate ang pahinang ito.',
      chart: {
        title: 'Ang binubuo ng balanso',
        note: 'Ang linya ay ang balanso. Ang band sa ilalim nito ay ang bahagi ng balanso na nagmula sa interes, hindi sa mga kontribusyon.',
        xAxis: 'years',
        series: [
          { key: 'balance', label: 'Balanse' },
          { key: 'contributed', label: 'Nagdagdag' },
        ],
      },
      method: [
        'Ang projection ay sumusulong ng isang compounding period sa isang panahon. Sa bawat panahon, nakak earns ang balanse ng interest sa rate ng panahong iyon, at pagkatapos ay idinadagdag ang contribution para sa panahong iyon — sa dulo ng panahon o sa simula nito, depende sa setting. Ang pagpapatakbo ng mga panahon nang magkakapareho sa halip na paggamit ng iisang closed expression ang lumilikha ng year-by-year table, at pareho ang final balance kahit anong paraan.',
        'Sa closed form,pareho ang resulta:',
        'saan ang P ay ang starting balance, ang r ay ang annual rate na hatim sa bilang ng compounding periods kada taon, ang n ay ang bilang ng panahon, at ang PMT ay ang contribution na ginagawa sa bawat panahon. Ang contribution na ginagawa sa simula ng panahon ay earns interest sa buong panahong iyon, kaya ang contribution term ay pinapaliwanag ng (1 + r) sa ganitoong kaso.',
        'Mula sa dalawang adjustment ang mga tunay na numero. Ang effective annual rate ay (1 + r) na itataas sa bilang ng periods kada taon, na siyang aktuwal na naging halaga ng 7 % nominal rate kapag isang taon ng monthly compounding ang ginamit. Ang real rate ay kinukuha sa effective rate na ito at hahatiin sa inflation factor, at ang balanse sa dolyar ngayon ay ang nominal balance na hahatiin sa inflation na compounded sa parehong panahon.',
      ],
      formula: 'FV = P(1 + r)ⁿ + PMT · ((1 + r)ⁿ − 1) / r',
      limits: [
        'Hindi nito predikto ang isang return. Ang rate na inilagay mo ay ginagamit nang eksakto bilang inilagay sa buong panahon; walang pangkalahatang average ng nakaraan, walang forecast, at walang market data na nagpapatakbo sa pahinang ito.',
        "Hindi nito i-model ang taxes, fees, o account charges. Mag-iiba ang balanse ng totoong account depende sa kinukuha ng provider.",
        'Hindi nito i-model ang market volatility. Bumababa ang mga tunay na balanse sa mga taon kapag bumaba ang mga tunay na merkado, at walang fixed rate na nakakak.capture iyon.',
        'Hindi nito sasabihin sa iyo kung paano mag-invest o kung save o hindi. Nagpo-project ito ng isang numero batay sa mga assumption na ibinigay mo.',
      ],
      faq: [
        {
          q: 'Bakit 1, 2, 3, 4, 6, o 12 lang ang maaaring compounding frequency?',
          a: 'Sapagkat monthly ang mga contribution na ginagawa rito, at pinapanatili ng calculator na pareho ang compounding period at contribution period. Ang anumang frequency na nahahati sa labindalawa ay nagpapanatili ng eksaktong aritmetika sa halip na approximation. Sa pagsasanay, saklaw ng anim na frequency ang daily-to-yearly compounding laban sa monthly deposits.',
        },
        {
          q: 'Ano ang pagkakaiba ng nominal rate at effective annual rate?',
          a: 'Ang nominal rate ay ang numero sa account: 7 %. Ang effective rate ay ang aktuwal na kinikita ng balanse kapag isang taon ng compounding ang ginamit, kaya ang 7 % na compounded monthly ay 7.229 %. Ipinapakita ng pahina ang dalawa, dahil mahalaga ang pagkakaiba sa mahabang panahon.',
        },
        {
          q: 'Ano ang ibig sabihin ng real value?',
          a: 'Ito ang panghuling balanse, na nakal expressed sa kapangyarihan ng pambibili ng taon ng simula. Hinahati ng kalkulasyon ang nominal na balanse sa rate ng inflation na p compounded sa parehong panahon, na nagpapakita kung magkano sa balanse ang tunay na paglago at magkano lamang ang parehong dolyar na nagkakaroon ng mas malaking kapangyarihan.',
        },
        {
          q: 'Dapat ba palitan ang resulta ang timing ng kontribusyon?',
          a: 'Oo, at ipinapakita ng pahina ang dalawa. Ang ambag na ginawa sa simula ng bawat panahon ay kumikita ng-interest sa buong panahong iyon, kaya mas malaki ang kinahabasan nito kaysa sa parehong ambag na ginawa sa dulo. Maliit ang pagkakaiba sa bawat bayad, ngunit p compounded ito sa loob ng ilang dekada.',
        },
        {
          q: 'Ano ang mangyayari sa zero interest rate?',
          a: 'Ang balanse ay lumalaki batay sa ambag lamang, walang-interest. Tinatalo nang tiyak ang kalkulasyon para sa sitwasyong ito sa halip na maghati ng zero, kaya eksaktong katumbas ng mga deposito ang bilang.',
        },
        {
          q: 'Kailangan ba ng regular na kontribusyon?',
          a: 'Hindi. Ang pagtatakda ng buwanlyong ambag sa zero ay ginagawang simpleng compound interest projection ang kalkulasyon para sa panimulang balanse, at ito ang tamang modelo para sa lump sum na naka-invest na.',
        },
      ],
      sources: [
        {
          label: 'SEC — Investor.gov: compound interest at ang gastos ng mga bayarin',
          url: 'https://www.investor.gov/introduction-investing/investing-basics/glossary/compound-interest',
        },
        {
          label: 'BLS — Consumer Price Index (para sa mga bilang na in-adjust sa inflation)',
          url: 'https://www.bls.gov/cpi/',
        },
        {
          label: 'Federal Reserve — datos ng time deposit at savings rate',
          url: 'https://www.federalreserve.gov/releases/h15/',
        },
        {
          label: 'IRS — compound interest at paglago ng tradisyonal IRA',
          url: 'https://www.irs.gov/retirement-plans/traditional-iras',
        },
      ],
      relatedGuides: [
        { slug: 'compound-interest-calculator-explained', title: 'Paliwanag sa calculator ng compound interest' },
        { slug: 'compound-vs-simple-interest', title: 'Compound interest laban sa simple interest' },
        { slug: 'how-compounding-frequency-changes-results', title: 'Paano binabago ng dalas ng compounding ang resulta' },
        { slug: 'inflation-and-real-returns-explained', title: 'Paliwanag sa inflation at real returns' },
        { slug: 'understanding-apr', title: 'Pag-unawa sa APR at taunangBahagi' },
      ],
      script: {
        yearsOne: '1 taon',
        yearsOther: '{n} taon',
      },
    },
    'net-pay': {
      name: 'Kalkulator ng Take-Home Pay',
      title: 'Take-Home Pay Calculator para sa 2026 Tax Year',
      description:
        'Kalkulahin kung magkano ang natitira sa sahod pagkatapos ng federal income tax, Social Security, Medicare at state tax, para sa kahit anong panahon ng sahod, at ipakita ang bawat deduction.',
      short: 'Ano ang nagiging kita ng sahod pagkatapos ng pederal na buwis, payroll tax, at buwis sa estado.',
      category: 'Bayad',
      methodNote:
        'Ang mga numero ay para sa tax year 2026: Rev. Proc. 2025-32 para sa mga pederal na bracket at karaniwang deduction, at ang Social Security Administration para sa mga limitasyon ng payroll tax. Walang anuman sa pahinang ito ang sipi mula sa isang payroll provider.',
      fields: {
        grossPay: 'Kita mula sa sahod',
        payPeriod: 'Sahod na panahon',
        filingStatus: 'Status ng pagpapahayag',
        stateRate: 'Bawatis ng buwis sa kita ng estado',
        stateRateHint: 'ang rate para sa iyong bracket',
        retirementContribution: 'Ambag sa 401(k) o 403(b)',
        retirementHint: 'taon — nahaharap pa rin sa mga payroll tax',
        healthContribution: 'Ambag sa HSA o FSA',
        healthHint: 'taon — hindi napapatawan ng mga payroll tax',
        perYear: 'kada taon',
        debtName: 'UTANG',
        balance: 'Balanse',
        rate: 'Rate',
        minimum: 'Minimum na bayad',
      },
      terms: {
        payPeriods: {
          year: 'Taunan',
          month: 'Buwanan',
          week: 'Linggohan',
          day: 'Kada araw',
          hour: 'Oras-oras',
        },
        filingStatuses: {
          single: 'Isa lang',
          married: 'Mag-asawa na mag-file nang magkasama',
          head: 'Ulo ng sambahayan',
        },
      },
      result: {
        headlineLabel: 'Netong kinikita',
        annualGross: 'Brutong sahod para sa taon',
        federalTax: 'Pederal na buwis sa kitaon',
        socialSecurity: 'Social Security',
        medicare: 'Medicare',
        additionalMedicare: 'Karagdagang Medicare tax',
        stateTax: 'Buwis sa kitaon ng estado',
        totalTax: 'Kabuuang tax',
        netPerMonth: 'Take-home kada buwan',
        effectiveRate: 'Epektibong rate ng tax',
        note:
          'Ang take-home amount ay ang gross pay menos ang mga deductions sa itaas, na hahatiin sa bilang ng panahon ng sahod sa isang taon.',
        negativeNote:
          'Ang mga deductions ay halos pareho sa gross pay, at nananatiling naniningil ang payroll taxes sa mga ito, kaya ang take-home figure ay nasa ibaba ng zero. Hindi sinusuri rito ang mga taunang limitas sa mga kontribusyon.',
      },
      resultNote:
        'Gumagamit ang payroll system ng mga withholding na napili sa W-4 at ng halaga nang nawithhold na sa loob ng taon, kaya bahagyang nagbabago ang figure sa aktuwal na paycheque mula buwan sa buwan.',
      chart: {
        title: 'Saan napupunta ang gross pay',
        note: 'Isang bar para sa taon, na nahahati sa bahaging dumating sa sahod at mga bahaging kinuha rito.',
        xAxis: 'none',
        series: [
          { key: 'net', label: 'Netong kinikita' },
          { key: 'federal', label: 'Pederal na buwis sa kitaon' },
          { key: 'socialSecurity', label: 'Social Security' },
          { key: 'medicare', label: 'Medicare' },
          { key: 'state', label: 'Buwis sa kitaon ng estado' },
        ],
      },
      formula:
        'take-home = gross pay − mga deduction bago ang tax − federal income tax − Social Security − Medicare − state income tax',
      method: [
        'Ang kalkulasyon ay nagsisimula sa gross pay at nagsasalubong sa mga deduction sa pagkakasunod na ginagamit ng payroll system. Ang mga pre-tax deduction ay nauunang bibilhin dahil ang kontribusyon sa 401(k) o sa health account ay kinuha mula sahod bago ito buisahan. Ang natitira ay ang taxable wage.',
        'Ang dalawang deduction ay hindi itinuturing nang pareho. Ang kontribusyon sa 401(k) o 403(b) ay hindi kasama sa kita, ngunit ito ay itinuturing pa ring sahod para sa Social Security at Medicare, kaya pinapababa nito ang federal tax at hindi binabago ang payroll tax. Ang kontribusyon sa HSA o FSA na kinuha mula sa paycheque ay hindi kasama sa kita at sa Social Security wages, kaya pinapababa nito ang dalawa.',
        'Ang federal income tax ay kalkulado sa taxable wage na iyon. Ibinabawas ang standard deduction para sa filing status, at ang resulta ay ipinapailawin sa 2026 bracket table. Ang bawat bracket ay may nakapirming halaga ng tax dagdag pa ng porsyento ng kita na higit sa ilalim ng bracket na iyon, na siyang paraan ng paglathala ng IRS ng talahanayan.',
        'Susunod ang payroll tax. Kinakalkula ito sa sahod na pagk Minus ng anumang kontribusyon sa HSA o FSA, dahil nananatili sa sahod ang kontribusyon sa 401(k) para sa mga layunin na ito. Ang Social Security ay 6.2% ng sahod hanggang sa taxable maximum na $184,500 para sa 2026. Ang Medicare ay 1.45% ng buong sahod nang walang ceiling, at ang Additional Medicare Tax ay 0.9% ng bahagi na higit sa $200,000 para sa single filer, o higit sa $250,000 para sa mag-asawang filing jointly.',
        'Ang state income tax ay ang rate na itinutype ng mambabasa, na ipinapatupad sa taxable income. Ito ay pagtatantya: karamihan sa mga estado ay nagbubuwis sa mga band, kaya ang isang numero na ipinapatupad sa buong kita ay nagpapalaki ng aktuwal na bayad ng karamihan sa mga tao. Ang huling numero ay ang natitira, na hahatiin sa bilang ng pay period sa isang taon.',
      ],
      limits: [
        'Hindi nito sinusuri ang mga tax credit. Ang child tax credit, earned income credit at education credits ay nagbabago ng huling numero at wala sa kalkulasyon.',
        'Hindi nito sinusuri ang capital gains, kita ng sarili negosyo, o ang pakikitunguhan ng kita na higit sa Social Security wage base, kung saan pa rin tumatapat ang Medicare nang hindi ang Social Security.',
        'Hindi nito sinusuri ang local tax. Ang income tax ng lungsod at county ay hiwalay sa rate ng estado.',
        'Ang bilang ng panahon ng sahod ay karaniwan: 12 buwan, 52 linggo, 260 araw ng trabaho, o 2,080 oras para sa 40 oras na trabaho sa loob ng 52 linggo. Maaaring magpasok ng taonang halaga ang mambabasa na may iba pang iskedyul ng sahod.',
        'Ang kontribusyon sa HSA at FSA ay itinuturing na pagbawasan ng sahod na kinuha mula sa payslip, kaya libre ito mula sa Social Security at Medicare. Ang kontribusyon sa HSA na direktang galing sa account ng bangko ay sahod para sa Social Security, at hindi kasama ang sitwasyong iyon sa kalkulasyon.',
        'Bahagyang napapataas muli ng payroll tax ang kontribusyon sa 401(k) na lumampas sa taunang limitasyon para sa 2026, at kinak-charge ng kalkulasyong ito ang payroll tax sa buong kontribusyon.',
        'Hindi nito sinusuri ang taunang limitasyon sa mga kontribusyon. Kapag ang kontribusyon sa 401(k) o HSA ay halos katumbas ng buong sahod, nagiging negatibo ang take-home figure dahil kinak-charge pa rin ang payroll tax dito.',
      ],
      faq: [
        {
          q: 'Bakit mas mababa ang aking take-home pay kaysa sa gross minus ang income tax?',
          a: 'Dahil binarawan ng Social Security at Medicare ang sahod bago kalkulatin ang income tax. Separate ang mga ito mula sa income tax sa payslip dahil payroll tax para mismo ang trabaho.',
        },
        {
          q: 'Biniqbawan ba ng kontribusyon sa 401(k) ang aking Social Security at Medicare?',
          a: 'Hindi. Kinuha ito mula sa sahod bago kalkulatin ang federal income tax, ngunit sahod pa rin ito para sa payroll tax, kaya may pananatili na Social Security at Medicare. Iba ang kontribusyon sa HSA o FSA na kinuha mula sa payslip: kinuha rin ito mula sa base ng mga tax na iyon. Kaya naman maghiwalay na ipinasok ang dalawa.',
        },
        {
          q: 'Ginagamit ba nito ang aking aktuwal na tax bracket?',
          a: 'Ginagamit nito ang bracket table ng 2026 at ang standard deduction para sa filing status, kaya malapit ang resulta sa kinakalkula ng payroll system para sa manggagawa na walang iba pang kita. Walang alam ito tungkol sa mga credit, iba pang deduction o iba pang kita.',
        },
        {
          q: 'Ano ang pagkakaiba ng effective rate at marginal rate?',
          a: 'Ang marginal rate ay ang rate na kinakatawan ng susunod na dolyar ng taxable income, at ito ang pinakamataas na bracket na abot ng kita. Ang effective rate ay ang kabuuang tax na hatid sa kabuuang kita, at mas mababa ito dahil ang mas mataas na bracket ay nalalapat lamang sa bahagi ng kita na lampas sa bracket na iyon.',
        },
        {
          q: 'Aling rate ng estado ang dapat kong gamitin?',
          a: 'Ang rate na nalalapat sa iyong sariling bracket sa iyong estado. Karamihan sa mga estado ay may mga band ng taxation, kaya mas mababa ang effective rate kaysa sa pinakamataas na rate. Eksaktong tama ang iisang bilang sa isang estado na may flat rate at sa isang estado na walang income tax.',
        },
        {
          q: 'Bakit may limitasyon ang Social Security tax ngunit wala ang Medicare tax?',
          a: 'May maximum na buong buwis ang Social Security na itinatakda taun-taon, $184,500 para sa 2026, at hindi napapansinan ang kita na lampas dito para sa Social Security. Walang limitas ang Medicare, kaya nalalapat ito sa bawat dolyar ng sahod.',
        },
        {
          q: 'Maaari ko bang gamitin ito upang malaman ang halaga ng aking tax bill?',
          a: 'Hindi. Kinakalkula nito ang tax na ibinabawas sa sahod. Iba ang kalkulasyon sa tax return: kasama rito ang iba pang kita, deductions, credits, at mga bayad na naitala na, at isinusumite ito isang beses sa isang taon sa halip na sa bawat panahon ng sahod.',
        },
      ],
      sources: [
        {
          label: 'IRS — Rev. Proc. 2025-32, mga pagsasaayos dahil sa inflation para sa tax year ng 2026',
          url: 'https://www.irs.gov/irb/2025-45_IRB',
        },
        {
          label: 'Social Security Administration — 2026 wage base at cola',
          url: 'https://www.ssa.gov/cola/',
        },
        {
          label: 'Social Security Administration — Publication 15, Gabay ng Employer sa Buwis',
          url: 'https://www.ssa.gov/pubs/EN-05-10035.pdf',
        },
        {
          label: 'IRS — Tax Topic 401, Mga sahod at suweldo',
          url: 'https://www.irs.gov/taxtopics/tc401',
        },
        {
          label: 'Social Security Administration — POMS RS 01402.038, Mga plano ng kalusugang may kaugnayan sa tax',
          url: 'https://secure.ssa.gov/poms.nsf/lnx/0301402038',
        },
        {
          label: 'IRS — Paksa sa Buwis 511, Withholding',
          url: 'https://www.irs.gov/taxtopics/tc511',
        },
      ],
      relatedGuides: [
        {
          slug: 'net-pay-calculator-explained',
          title: 'Paano kinakalkula ang take-home pay',
        },
      ],
    },

    'income-tax': {
      name: 'Kalkulator ng Federal Income Tax',
      title: 'Federal Income Tax Calculator para sa 2026 Tax Year',
      description:
        'Kalkulahin ang 2026 federal income tax sa isang taon ng kita, kasama ang state tax na nakalkula mula sa sariling brackets ng estadong iyon, filing status, deduction, at ang effective at marginal rates na magkasama sa isang display.',
      short: 'Federal at state income tax sa isang taon ng kita, na may ipinapakita ang dalawang rates.',
      category: 'Bayad',
      methodNote:
        'Ang federal brackets at standard deduction ay ang mga 2026 na datos mula sa Rev. Proc. 2025-32, na inilathala noong 3 Nobyembre 2025. Ang state tax ay kinakalkula mula sa 2026 brackets, standard deduction, personal exemption, at credits ng estadong pipiliin mo, na kinuha mula sa mga talahanayan ng Tax Foundation noong 28 Abril 2026. Ang talahanayan ng head of household, federal income tax deduction, at state credits ay mula mismo sa mga form ng mga estadong kaugnay nito. Hindi kasama sa kalkulasyong ito ang payroll taxes na bawas sa sahod; nasa take-home pay calculator ang mga ito.',
      script: {
        stateDetected: 'Puno ng {state}: ang estadong pinagmulan ng iyong kahilingan.',
        childrenTotal: 'Kabuuang bilang ng mga kwalipikadong anak: {count}',
      },
      fields: {
        grossIncome: 'Gross income para sa taon',
        filingStatus: 'Status ng pagpapahayag',
        itemisedDeduction: 'Detalyadong deduction',
        standardDeduction: 'Karaniwang deduction',
        useStandard: 'Gumamit ng standard deduction',
        state: 'Estado',
        stateHint: 'para ang buwis ng estado',
        stateNone: 'Walang estado',
        children: ' mga qualifying na anak',
        childrenHint: 'batay sa edad sa dulo ng taon ng buwis',
        childBand: 'Anak na may edad na {range}',
        stateTaxOverride: 'Ang sarili mong buwis ng estado',
        stateTaxOverrideHint: 'iwanang blangko upang gamitin ang modelo',
        preTax: 'Mga deductions bago ang buwis',
        preTaxHint: '401(k), HSA, FSA kada taon',
        perYear: 'kada taon',
      },
      terms: {
        filingStatuses: {
          single: 'Isa lang',
          married: 'Mag-asawa na mag-file nang magkasama',
          head: 'Ulo ng sambahayan',
        },
      },
      result: {
        headlineLabel: 'Pederal na buwis sa kitaon',
        taxableIncome: 'Buo sa buwis na kita',
        deductionApplied: 'Nailapat na deduction',
        standardDeduction: 'Karaniwang deduction',
        itemisedDeduction: 'Detalyadong deduction',
        federalTax: 'Pederal na buwis sa kitaon',
        stateTaxableIncome: 'Taxable income ng estado',
        stateCredits: 'Mga credit ng estado',
        stateChildCredit: 'Credit ng child tax ng estado',
        federalTaxDeducted: 'Federal tax na ibinawas',
        stateTax: 'Buwis sa kitaon ng estado',
        totalTax: 'Kabuuang tax',
        effectiveRate: 'Epektibong rate',
        marginalRate: 'Marginal na rate',
        afterTax: 'Kitaon pagkatapos ng buwis',
        note:
          'Ang applied na deduction ay ang mas malaki sa dalawa: ang standard deduction para sa filing status, o ang itemised deduction na ipinasok sa kaliwa. Kinakalkula ang state tax batay sa estado na pipiliin mo.',
      },
      resultNote:
        'Ang numero ay isang pananagutang buwis, hindi ang halagang withheld mula sa sahod. Ang pederal na numero ay hindi kasama ang mga pederal na credit o ang mga bayad na nagawa na sa loob ng taon; ang numero ng estado ay kasama ang mga credit ng estado na dala ng modelo.',
      chart: {
        title: 'Ang natitira sa kitaon',
        note: 'Isang bar para sa taon, na hati sa bahagi na nananatili sa mambabasa at bahagi na napupunta sa buwis.',
        xAxis: 'none',
        series: [
          { key: 'afterTax', label: 'Kitaon pagkatapos ng buwis' },
          { key: 'federal', label: 'Pederal na buwis sa kitaon' },
          { key: 'state', label: 'Buwis sa kitaon ng estado' },
        ],
      },
      formula:
        'taxable income = gross income − mga deduction bago ang tax − deduction; tax = bracket table na applied sa taxable income; state tax = state brackets na applied sa adjusted gross income pagkatapos ng state standard deduction at exemption, pagkatapos ng federal income tax na binayaran kung allowed ito ng state, at pagkatapos ng state credits',
      method: [
        'Nagsisimula ang kalkulasyon sa gross income para sa taon at kinakain ang mga pre-tax deduction dahil hindi buwisang kitaon ang ambag sa 401(k) o sa health account.',
        'Susunod ang deduction. Ginagamit ang standard deduction para sa filing status kung walang itemised deduction na inilalagay ang mambabasa, at ang mas malaki sa dalawa ang naaangkop. Ang standard deduction para sa 2026 ay $16,100 para sa single filer, $32,200 para sa married filing jointly, at $24,150 para sa head of household.',
        'Ang natitira ay taxable income, at ang buwis ay ang 2026 bracket table na nalalapat dito. Ang bawat bracket ay may nakapirming halagang buwis plus ng bahagpi sa kitaon na lagpas sa ibaba ng bracket na iyon, gaya ng ini-publish ng IRS.',
        'Sinasagot ng dalawang rate ang iba\'t ibang tanong. Ang marginal rate ay ang rate kung saan buwisang ang susunod na dolyar ng taxable income, na siyang pinakamataas na bracket na maaabot ng kitaon. Ang effective rate ay ang kabuuang buwis na hatol sa buong kitaon, at mas mababa ito dahil ang mas mataas na bracket ay t touch lamang ang bahagi ng kitaon na lagpas sa mga ito.',
        'Ang buwis ng estado ay kinakalkula nang hiwalay. Nagsisimula ang estado sa adjusted gross income, tinatanggal ang sarili nitong standard deduction at personal exemption kung ibinibigay ito bilang mga exclusion, ilalapat ang sarili nitong brackets nang isa-isa, at tinatanggal ang mga credit na ibinabayad nito. Ang mga estadong nagbibigay ng exemption o standard deduction bilang credit ay nakakakuha nito mula sa buwis, kung saan binibilang ang mga credit na iyon.',
        'Ginagamit ang talaan ng filing status. May sariling head of household table ang mga estadong naglalathala nito, na kinuha rito mula sa kanilang sariling mga form. Ang mga estadong wala nang lathala ng sariling talaan ay kinakalkula mula sa talaan ng single filer.',
        'Tatlong estado ang nagpapahintulot sa taxpayer na bawasan ang bayad na federal income tax: Alabama, Missouri, at Oregon. Kapag may ganyang estado, mula sa kita bago ilapat ang brackets ng estado ang deduction, na may limit at bahagi na itinatakda ng bawat estado.',
        'Kinakalkula ang mga credit ng estado batay sa edad ng mga anak, dahil doon nakasalalay ang mga ito. Nagbabayaran ang New York ng $1,000 para sa batang wala pang apat na taon at $500 para sa batang apat hanggang labing-an taon, nagbabayaran ang Minnesota ng $1,800 para sa batang wala pang labing-walong taon, at walang bayad ang ilang estado para sa batang lumampas na sa isang partikular na edad.',
      ],
      limits: [
        'Hindi nito modeling ang mga federal tax credit. Pinapaikli ng federal child tax credit, federal earned income credit, at education credits ang buwis at wala sa kalkulasyon.',
        'Hindi nito modeling ang pagkakaiba sa pagitan ng capital gains at ordinary income, kaya ang taon na may investment income ay kinakalkula sa mga ordinary rate.',
        'Hindi nito modeling ang senior deduction, o anumang deduction sa labas ng mga standard at itemised na halagang ipinasok sa kaliwa.',
        'Hindi nito modeling ang self-employment tax, na singil sa net earnings ng self-employed na tao at may sariling base at rate.',
        'Hindi nito modeling ang state at local income tax deduction na ipinapayag ng maraming estado sa loob ng kanilang mga itemised deduction.',
        'Hindi nito modeling ang mga rate ng capital gains, ang mga surtax na ipinap-charge ng ilang estado sa mga mataong pagk earning, o ang mga buwis ng lungsod at county.',
        'Hindi nito ginagamit ang head of household table ng Vermont, na preliminaryong pigilan pa ang mga rate nito para sa 2026, kaya ang head of household sa Vermont ay kinakalkula mula sa talaan ng single filer.',
        'Hindi nito kasama ang lahat ng credit ng estado. Naroroon dito ang state earned income tax credit para sa mga estadong itinatakda ito bilang porsiyento ng federal credit at para sa tatlong estadong kinakalkula nang sarili nila, at naroroon din ang child tax credit para sa mga estadong nakasalalay ang credit sa edad ng anak. Wala rito ang mga credit ng iba pang estado.',
      ],
      faq: [
        {
          q: 'Aling deduction ang dapat kong gamitin?',
          a: 'Ang standard deduction, maliban kung mas malaki ang kabuuan ng mga itemised deduction. Ipapakita ng calculator nang magkatabi ang standard deduction para sa filing status at ang itemised na halaga, kaya isang sulyap lang ang paghahambing.',
        },
        {
          q: 'Ano ang pagkakaiba ng effective rate at marginal rate?',
          a: 'Ang marginal rate ay ang rate kung saan nabayaran ng tax ang susunod na dollar ng taxable income. Ang effective rate ay ang kabuuang tax na hahatiin sa buong kita, at mas mababa ito dahil ang mga bracket sa itaas ng una ay nalalapat lamang sa bahagi ng kita na lampas sa mga bracket na iyon.',
        },
        {
          q: 'Bakit tumataas ang tax sa ilang partikular na kita?',
          a: 'Iyan ang hangganan ng bracket. Kapag lampas na rito, ang isa pang dollar ay nabayaran sa mas mataas na rate, kaya mas mabilis tumataas ang tax kaysa kita. Ang marginal rate ay nagpapakiisa kung saanong band ng kita ka nabibilang.',
        },
        {
          q: 'Kasama ba rito ang Social Security at Medicare?',
          a: 'Hindi. Mga payroll tax ang mga ito na ibinabawas sa sahod, may sarili silang ceilings, at kinakalkula sa take-home pay calculator.',
        },
        {
          q: 'Ano ang bilang ng state tax?',
          a: 'Ang tax na ipinapataas mismo ng estado, kinakalkula mula sa mga bracket ng estado para sa 2026, standard deduction nito, personal exemption nito, at mga credit nito. Napipili ang estado mula sa listahan, at pinupunan ng pahina ito ng estado mula sa iyong request kapag nawa-yang nDetermine ng network. Kapag nagpalit ka ng estado, nagbabago rin ang kabuuang bilang.',
        },
        {
          q: 'Maaari ba akong magpasok ng sarili kong state tax?',
          a: 'Oo. Ang field sa ilalim ng estado ay tumatanggap ng bilang at pinapalitan nito ang kinalkulang bilang. Walang laman ito sa simula, at habang walang lamang dito, ang kalkulasyon ang ipinapakita ng pahina.',
        },
        {
          q: 'Bakit hinihingi ng pahina ang edad ng bawat anak?',
          a: 'Dahil nakadepende ang mga state child tax credit sa edad ng anak. Nagbabayad ang New York ng $1,000 para sa anak na wala pang apat na taon at $500 para sa anak na mula apat hanggang labing-an na taon, nagbabayad ang Minnesota ng $1,800 para sa anak na wala pang labing-walong taon, at ilang estado ay walang bayad para sa anak na lumampas na sa ilang partikular na edad. Ang mga band ay ang mga edad kung saan naghihati ang mga estado, at ang dami ng mga anak sa bawat band ay siyang binibilang ng earned income credit.',
        },
        {
          q: 'Ito ba ang halagang babayaran ko?',
          a: 'Ito ang tax bago ang mga credit at bago ang mga bayad na ginawa na sa loob ng taon. Idinaragdag ng return ang mga credit, idinaragdag ang iba pang kita na hindi nabayaran sa pamamagitan ng payroll, at binarawan ang naunang bayad.',
        },
      ],
      sources: [
        {
          label: 'IRS — Rev. Proc. 2025-32, mga pagsasaayos dahil sa inflation para sa tax year ng 2026',
          url: 'https://www.irs.gov/irb/2025-45_IRB',
        },
        {
          label: 'IRS — Paksa sa Buwis 505, Pagbawas ng Buwis at Estimated Tax Payments',
          url: 'https://www.irs.gov/taxtopics/tc505',
        },
        {
          label: 'IRS — Paksa sa Buwis 611, Buwis sa Kita',
          url: 'https://www.irs.gov/taxtopics/tc611',
        },
        {
          label: 'Tax Foundation — Mga Rate at Bracket ng Individual Income Tax ng mga Estado, 2026',
          url: 'https://taxfoundation.org/data/all/state/state-income-tax-rates-2026/',
        },
        {
          label: 'Tax Foundation — Facts & Figures 2026, mga rate ng individual income tax ng mga estado noong 28 Abril 2026',
          url: 'https://taxfoundation.org/data/all/state/2026-state-tax-data/',
        },
      ],
      relatedGuides: [
        {
          slug: 'income-tax-calculator-explained',
          title: 'Paano kinakalkula ang federal income tax',
        },
      ],
    },

    'debt-payoff': {
      name: 'Kalkulator ng Pagbabayad ng Utang',
      title: 'Debt Payoff Calculator: Avalanche at Snowball',
      description:
        'Ihambah ang pagbabayad ng ilangutang nang sabay: minimum lamang, avalanche order at snowball order, kasama ang mga buwan bago maging debt-free at ang naipong interest.',
      short: 'Bayarin ang ilangutang nang sabay at ihambah ang pagkakasunod-sunod.',
      category: 'UTANG',
      methodNote:
        'Ang modelo ay isang simulasyon buwan sa buwan: ang interes ay naiipon sa balanse sa simula ng bawat buwan, ang bawat UTANG na hindi pa bayad ay may sariling minimum na bayad, at ang natitirang pera ay napupunta sa UTANG na pinili ng mambabasa.',
      fields: {
        debtName: 'UTANG',
        balance: 'Balanse',
        rate: 'Rate ng interes',
        minimum: 'Minimum na bayad',
        addDebt: 'Magdagdag ng UTANG',
        removeDebt: 'Alisin ang UTANG na ito',
        extraPayment: 'Karagdagang bayad kada buwan',
        extraPaymentHint: 'sa ibabaw ng bawat minimum na bayad',
      },
      terms: {
        strategies: {
          minimum: 'Minimums lamang',
          avalanche: 'Avalanche',
          snowball: 'Snowball',
        },
        orderHints: {
          avalanche: 'pinakamataas na rate ng interes muna',
          snowball: 'pinakamalitong balanse muna',
        },
      },
      result: {
        headlineLabel: 'NaipSaving na interes',
        interestSaved: 'Interest na naipon laban sa minimum na bayarin',
        monthsToFree: 'Mga buwan hanggang maibayad ang utang',
        totalInterest: 'Kabuuang interes',
        totalPaid: 'Kabuuang bayad',
        minimumOnly: 'Minimums lamang',
        avalanche: 'Avalanche',
        snowball: 'Snowball',
        minimumsNeverCover: 'Hindi kailanman naibayad',
        minimumsNeverCoverNote:
          'May hindi bababa sa isa sa mga utang na ito ang singil na interes sa isang buwan kaysa sa bayad, kaya ang balanse ay lumalaki sa halip na lumiliit. Ang isang takbo na hindi kailanman nakakapagbayad ng mga utang ay walang tapos na iskedyul, kaya walang ipinapakita na buwan at walang interes: ang mga numerong iyon ay naglalarawan sa pagtatapos ng simulation at hindi sa mga utang.',
        note:
          'Pinagbabayaran ng avalanche ang pinakamataas na rate una at ito ang may pinakamalit na kabuuang interes. Pinapabayad ng snowball ang pinakamaliit na balanse una at natatapos ang bayad sa utang na iyon nang mas maaga. Ang pagkakaiba sa dalawa ay ang halaga ng pagkakasunod-sunod.',
      },
      resultNote:
        'Ginagamit ng tatlong takbo ang parehong mga utang at parehong dagdag na bayad. Ang tanging nagbabago ay ang pagkakasunod-sunod kung saan ilalagay ang dagdag na pera.',
      chart: {
        title: 'Ang balanse sa ilalim ng bawat pagkakasunod-sunod',
        note: 'Hindi isinama ang isang takbo na hindi kailanman nakakapagbayad ng mga utang: lumalaki ang balanse nito sa halip na lumiliit, at ang hugis ng linya ay naglalarawan sa pagtatapos ng simulation at hindi sa isang iskedyul. Ang linya para sa dagdag na bayad ay umaabot sa zero.',
        xAxis: 'years',
        series: [
          { key: 'avalanche', label: 'Avalanche' },
          { key: 'snowball', label: 'Snowball' },
          { key: 'minimumOnly', label: 'Minimums lamang' },
        ],
      },
      formula:
        'interest para sa buwan = balanse sa simula ng buwan × annual rate ÷ 12; bawat bukas na debt ay may sariling minimum payment, interest muna at principal pagkatapos; ang natitirang pera ay napupunta sa debt na itinuturo ng pagkakasunod-sunod',
      method: [
        'Ang kalkulasyon ay simulation ng buwan sa buwan. Sa simula ng bawat buwan,charged ang interes sa balanse at idinadagdag dito. Ang perang available sa buwang iyon ay kabuuan ng lahat ng minimum na bayad at ang karagdagang bayad na inilagay sa kaliwa. Bawat utang na mayroon pang balanse ay may sariling minimum na bayad, at saklaw ng bayad na iyon ang interes muna at ang pangunahing prinsipyo ikalawa.',
        'Ang utang na n bayaran ay hindi na kailangang magbayad ng minimum, at kasama na sa perang papunta sa susunod na utang ang minimum na iyon. Ito ang sistema sa likod ng pagkakaiba ng dalawang pagkakasunod-sunod: ang parehong buwanang halaga, na ibang utang ang ginagastos, ay mas madaling tumigil sa iba\'t ibang balanse.',
        'Sa avalanche order, pinupunta muna ang karagdagang pera sa pinakamataas na rate ng interes. Ito ang may pinakamalitong kabuuang interes, dahil ito ang pinakamamahal na pera na binabayaran ng mambabasa na hindi na naipapansin.',
        'Sa snowball order, pinupunta muna ang karagdagang pera sa pinakamalaking balanse. Mas malaki ang kabuuang interes nito at mas mabilis itong magbayad ng isang account, na iba itong uri ng resulta. Ipinapakita ng kalkulator ang dalawa, at ang naipundang interes sa bawat kaso, upang maihambagi ang dalawa gamit ang parehong mga numero.',
      ],
      limits: [
        'Hindi nito modela ang mga variable na rate. Ang credit card na may variable na rate ay nagbabago ng interes habang gumagalaw ang index, at ipinapalagay ng iskedyul na nakasulat dito na nananatiling pareho ang rate na inilagay.',
        'Hindi nito modela ang mga bayarin: ang mga late fee, balance transfer fee at taunang bayarin sa card ay wala sa kabuuan.',
        'Charged nito ang interes kada buwan. Ang credit card na naghahapunan ng interes araw-araw ay may mas maliit na interes sa isang taon, at karaniwang bahagyang mas mataas ang totoong halaga sa balanse ng card kaysa sa ipinapakita rito.',
        'Hindi nito modela ang paraan ng pagbubuwis ng interes, na maaaring i deduction sa ilang utang ngunit hindi sa iba.',
        'Hindi nito modela ang pagbabago sa mga minimum na bayad, na minsan ay babaan ng mga lender dahil sa kahirapan at minsan ay pinataas habang lumiliit ang balanse.',
      ],
      faq: [
        {
          q: 'Ano ang pagkakaiba ng avalanche at snowball?',
          a: 'Ang pagkakaayos lamang. Sa avalanche, ipinapadala ang karagdagang pera sa pinakamataas na interes muna; sa snowball, sa pinakamalaking balanse muna. Pareho ang mga utang, minimum payment, at karagdagang bayad sa dalawang kalkulasyon.',
        },
        {
          q: 'Alin ang nagse-save ng mas maraming pera?',
          a: 'Avalanche, dahil sa interes. Pinipigil ng karagadang pera ang pinakamahal na utang muna, kaya mas kaunting interes ang naiipon habang buhay ang mga utang. Ipinapakita ng calculator ang pagkakaiba ng naipong interes sa bawat pagkakaayos.',
        },
        {
          q: 'Bakit may snowball kung mas mahal ito?',
          a: 'Binubura nito ang pinakamalaking balanse muna, kaya mas mabilis maabot ang zero ang isang balanse. Ito ay iba sa resulta na sinusukat ng interes, at ipinapakita ng calculator ang dalawa upang maisaring ihambing sa parehong mga numero.',
        },
        {
          q: 'Paano kinakalkula ang interes?',
          a: 'Batay sa balanse sa simula ng bawat buwan, sa annual rate na bahagi ng labindosing, at idinadagdag sa balanse. Pagkatapos, ang bayad ay napupunta muna sa interes at pagkatapos ay sa principal.',
        },
        {
          q: 'Ano ang nangyayari sa minimum payment ng utang na nalinis?',
          a: 'Idinadagdag ito sa perang papunta sa susunod na utang, kaya hindi kailanman bumababa ang buwanang halagang napupunta sa mga utang. Iyan ang dahilan kung bakit mas maikli ang mga petsa ng pagbabayad kaysa sa kabuuan ng hiwalay na iskedyul.',
        },
        {
          q: 'Isinasa-account ba nito ang daily compounding ng credit card?',
          a: 'Hindi. Singil nang isang beses sa buwan ang model. May card na naiipon ang interes araw-araw, kaya bahagyang mas mahal ito sa isang taon, kaya karaniwang bahagyang mas mataas ang totoong numero ng balanse ng card kaysa sa ipinapakita rito.',
        },
      ],
      sources: [
        {
          label: 'CFPB — Magtanong sa CFPB, mga tanong at sagot ng mga consumer',
          url: 'https://www.consumerfinance.gov/ask-cfpb/',
        },
        {
          label: 'CFPB — Mga tool para sa credit card at gabay para sa mga consumer',
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
