/** 网站界面的全部简体中文文本。结构与 `en.ts` 相同。 */

export const zh = {
  /** 这种语言用它自己写出的名称。 */
  localeName: '简体中文',

  tagline: '展示计算过程的财务计算器',
  description:
    '免费的财务计算器：房贷月供、租房还是买房、复利、税后工资、联邦所得税和还债。每个公式都完整展示。',

  author: {
    role: '作者',
    bio: '从事 IT 基础设施工作——云平台、CI/CD、基础设施即代码——在这个领域，无法验证的改动不会上线。保持云环境精简、交付流水线快速是日常工作；同样的标准贯穿整个网站。计算逻辑集中在一个地方，公式由单元测试覆盖，并与公开的贷款数据核对；每个来自外部的数字都标明来源和读取日期。负责撰写指南并维护计算引擎。每篇指南发布前，财务内容都由第二个人审读。这里不会告诉读者该怎么做。',
  },

  reviewer: {
    role: '财务审读',
    bio: '在指南发布前审读其中的财务内容：数字、数字背后的假设，以及数字的来源。作者构建计算引擎，审读人从另一面来看结果——从和钱打交道、而不是和代码打交道的人的角度。她的名字只出现在她审读过的指南上。',
  },

  consent: {
    heading: 'Cookie',
    body: '本网站使用 Cookie 来展示广告，并统计哪些页面被阅读。接受后，将加载广告和页面分析，包括托管服务商的无 Cookie 信标；拒绝则不会加载任何内容。对欧盟读者，托管服务商的信标完全不会加载。之后可以通过页脚更改您的选择。收集什么、由谁提供，详见{privacyLink}。',
    privacyLink: '隐私页面',
    accept: '接受',
    reject: '拒绝',
    settings: 'Cookie 设置',
  },

  nav: {
    tools: '工具',
    guides: '指南',
    sources: '来源',
    about: '关于',
  },

  footer: {
    taglineNote: '每个公式都完整写出，每个假设都由您决定。',
    calculatorsHeading: '计算器',
    siteHeading: '网站',
    calculators: {
      'mortgage-payment': '房贷月供',
      'rent-vs-buy': '租房还是买房',
      'compound-interest': '复利',
      'net-pay': '税后工资',
      'income-tax': '联邦所得税',
      'debt-payoff': '还债',
    },
    links: {
      guides: '指南',
      sources: '来源',
      'editorial-team': '编辑团队',
      about: '关于',
      contact: '联系',
      privacy: '隐私',
      terms: '条款',
    },
    cookieSettings: 'Cookie 设置',
    note:
      '{name} 发布的是计算和解释，而非财务建议。这些工具展示一个数字背后的算术，以及算术背后的假设。它们不评估您的情况，也不推荐任何行动方案。工具得出的每个数字都取决于您输入的数据——在依赖任何结果之前，请先阅读其假设。© {founded}–{year} {name}。',
  },

  ui: {
    skipToContent: '跳到正文',
    home: '首页',
    breadcrumb: '面包屑导航',
    primaryNav: '主导航',
    lastChecked: '最近核对',
    by: '作者',
    whereNumbersComeFrom: '数字从哪里来',
    minRead: '阅读约 {n} 分钟',
    guidesCount: (n: number) => `${n} 篇指南`,
    calculate: '计算',
    open: '打开',
    allGuides: '全部指南 →',
    readTheGuide: '阅读指南',
    guidesThatGoDeeper: '更深入的指南',
    commonQuestions: '常见问题',
    howThisIsCalculated: '计算方法',
    whatThisCalculatorDoesNotDo: '这个计算器不做什么',
    sources: '来源',
    sourcesNote: '以下是本指南中数字和方法所依据的原始来源。',
    calculatorsBehindThisGuide: '本指南对应的计算器',
    published: '发布于',
    lastReviewed: '最近审阅',
    reviewedBy: '审读人',
    language: '语言',
    switchTheme: '切换主题',
    switchToLight: '切换到浅色主题',
    switchToDark: '切换到深色主题',
    detectedFromIp:
      '州是根据您的 IP 地址判断的，只是近似值：VPN、代理或移动网络可能指向错误的州。该字段仍可编辑。',
  },

  newsletter: {
    emailAddress: '电子邮件地址',
    placeholder: 'you@example.com',
    subscribe: '订阅',
  },

  home: {
    title: 'Calccents — 展示计算过程的财务计算器',
    description:
      '免费的财务计算器：房贷月供、租房还是买房、复利、税后工资、联邦所得税和还债。每个公式都完整展示。',
    eyebrow: '财务计算器',
    heading: '先知道数字，再做决定',
    lede: '免费工具，帮您算清房贷、租约、工资单和一堆债务背后的算术。每个公式都完整写出，每个假设都由您决定，没有任何页面告诉您该如何处理结果。',
    cta: '浏览计算器',
    calculatorsEyebrow: '计算器',
    calculatorsHeading: '六个问题，六组数字',
    workHeading: '每个数字都展示计算过程',
    workPoints: [
      '公式就放在答案旁边，既有通俗的文字，也有符号。',
      '每个来自外部的数字都标明来源和日期。',
      '每个工具都在结果正下方，用同样的措辞说明它不做什么。',
    ],
    workLink: '网站是如何构建的 →',
    sampleMonthlyPayment: '月供',
    samplePrincipalAndInterest: '本金和利息',
    samplePropertyTax: '房产税',
    sampleTotalInterest: '利息总额',
    calcTitle: '试一试：房贷月供',
    calcHomePrice: '房价',
    calcDown: '首付',
    calcRate: '利率',
    calcTerm: '期限',
    calcYears: '{n} 年',
    calcMonthly: '每月本金和利息',
    calcLoan: '贷款金额',
    calcTotalInterest: '利息总额',
    calcOpen: '打开完整计算器',
    calcNote: '仅含本金和利息。房产税、保险和业主协会费（HOA）在完整计算器中。',
    statCalculators: '计算器',
    statGuides: '展示计算过程的指南',
    statLanguages: '语言',
    statSignups: '使用所需的注册',
    guidesEyebrow: '指南',
    guidesHeading: '把算术完整写出来',
    newsletterHeading: '把数学送到您的邮箱',
    newsletterLede:
      '新计算器上线或现有计算器重新审阅时，发一封简短的邮件。没有推销，没有赞助内容。',
  },

  illustration: {
    mortgagePayment: '房贷余额随时间下降，旁边是已支付的利息',
    rentVsBuy: '两条相交的线：租房成本与拥有房屋的成本',
    compoundInterest: '随着利息复利，余额增长得越来越快',
    netPay: '一条税前工资柱，分为税后工资和从中扣除的部分',
    incomeTax: '一层层税级，每一层都比上一层更宽',
    debtPayoff: '两组柱形，分别对应两种还债顺序',
  },

  heroVisual: {
    label: '月供',
    caption: '一个算好的例子，按计算器的画法画出。',
  },

  chart: {
    months: '月',
    years: '年',
    start: '现在',
    end: '结束',
    empty: '一旦有数字可画，图表就会出现。',
  },

  toolsIndex: {
    title: '免费财务计算器',
    description:
      '免费计算器，展示房贷月供、租房与买房比较以及复利预测背后的算术。',
    heading: '免费财务计算器',
    lede: '每个计算器都展示所用的公式，列出结果背后的假设，并明确说明它不做什么。这里不要求填写电子邮件地址，也不要求您注册任何东西。',
    whatTheseAre: '这些工具是什么',
    whatTheseAreBody: [
      '这些是算术工具。它们使用您输入的数字，套用公开的公式，并连同计算过程一起返回结果。这里的房贷计算器不知道您的信用分数、收入，也不知道本周哪家贷款机构提供什么条件，而且不会去猜。',
      '原因很简单：一个您能核对的数字，比别人替您挑的数字更有价值。这里的每个工具都用符号展示公式，链接到方法的原始来源，并标明审阅日期，让您知道它上次是什么时候核对的。',
    ],
  },

  guidesIndex: {
    title: '指南',
    description:
      '讲解房贷、租房与买房以及复利背后的算术，每篇都附有公式、假设和来源。',
    heading: '指南',
    lede: '深入讲解计算器背后的算术和假设。每篇指南都展示公式，链接到原始来源，并标明审阅日期。',
    missingHeading: '缺了什么？',
    missingBody:
      '指南围绕读者最难理解的算术来写。如果这里没有涵盖某个财务概念，请告诉我们是哪个，以及哪里让人困惑。',
    suggestTopic: '建议一个主题',
    groups: {
      home: '住房与房贷',
      renting: '租房与拥有房屋',
      investing: '投资',
    },
  },

  guide: {
    sourcesTitle: '来源',
    sourcesNote: '以下是本指南中数字和方法所依据的原始来源。',
  },

  about: {
    title: '关于',
    description:
      '这个网站是什么、如何构建，以及它遵循哪些规则，好让上面的每个数字都能被核对。',
    heading: '关于 {name}',
    lede: '{name} 发布财务计算器以及背后的解释。这是一个目标很窄的小网站：给出一个您能核对的数字，并展示得出它的计算过程。',
    isHeading: '这个网站是什么',
    isBody: [
      '六个计算器、十八篇指南，以及它们所依据的原始来源。计算器使用您输入的数字并套用公开的公式：房贷用摊还公式，租房与买房用逐月现金比较，储蓄余额用复利公式，此外还有还债、所得税和税后工资的算术。',
      '网站靠展示广告维持运营，这决定了它的构建方式。页面加载快、JavaScript 很少，因为加载快的页面能让读者停留足够久、看到广告，也因为人们愿意回到加载快的页面。没有计算器要求填写电子邮件，也没有结果需要解锁。',
    ],
    isNotHeading: '这个网站不是什么',
    isNotBody: [
      '它不是经纪商，不受理申请，也不从任何点击中赚取佣金。这里没有赞助内容、没有联盟链接，也没有收集联系方式的表单。广告只有展示广告，这意味着读者的访问唯一付出的是注意力。',
      '这里没有任何工具评估您的个人情况。一个回答"首付付 20%"的房贷计算器多数时候都会出错，因为正确答案取决于页面看不到的东西：您的其他储蓄、您的工作、您能承受多糟糕的一个月。所以每个工具只做计算，然后就此打住。',
    ],
    rulesHeading: '网站遵循的规则',
    rules: [
      {
        label: '每个工具都说明自己的局限。',
        body: '每个结果下方都有一个区块，列出该工具不做的事，每个页面用的措辞都相同。',
      },
      {
        label: '每个来自外部的数字都有来源。',
        body: '指南链接到原始来源，并标明数据的读取日期。网站自己的算术完整展示。',
      },
      {
        label: '每个页面都标有审阅日期。',
        body: '很久没人看过的指南会直接说明这一点。',
      },
      {
        label: 'AI 起草，人工审阅。',
        body: '起草工具帮助处理文字。每个发布的页面都由一个人读过，并核对了算术、单位和陈述。',
      },
    ],
    whoHeading: '谁在运营',
    whoBody:
      '{name}。{bio} {reviewerName} 在指南发布前审读其财务内容。{whoEditorialLink}说明了页面上线前审阅要核对什么，而且{whoCodeLink}：公式、单元测试，以及阻止带有错误页面的版本发布的检查。',
    whoEditorialLink: '编辑页面',
    whoCodeLink: '代码是公开的',
    howHeading: '计算器如何工作',
    howBody:
      '算术在您的浏览器中运行。没有服务器接收您输入的数字，任何计算内容都不会发送给任何人。公式只实现一次、放在一个地方，并由单元测试覆盖，这些测试将其与已知的公开贷款数据核对，并检查数学所要求的不变量——还款计划之和等于借款金额，贷款恰好在零处结清，无息余额只随存款增长。',
    correctionsHeading: '更正',
    correctionsBody:
      '如果某个数字有误、来源链接失效，或某个页面自相矛盾，这就是缺陷，应当修正。{contactLink}说明了如何报告，每次更正都会更新审阅日期，而不是悄悄修改。',
    contactLink: '联系页面',
  },

  contact: {
    title: '联系',
    emailLine: '发邮件至 {email}。',
    description:
      '如何就错误的数字、失效的链接、缺少的主题或广告问题联系本网站。',
    heading: '联系',
    lede: '一个地址，由真人阅读。回复需要几天时间，在页面刚发布后的几周里通常更久。',
    worthHeading: '哪些事情值得来信',
    worth: [
      {
        label: '数字错误。',
        body: '如果页面上的数字与您自己的计算不符，请发送您使用的输入和得到的数字。这是缺陷，会被处理。',
      },
      {
        label: '来源链接损坏或失效。',
        body: '来源会定期检查，但链接可能在两次检查之间失效。',
      },
      {
        label: '缺少的主题。',
        body: '指南围绕读者觉得最难的算术来写，所以一个空缺通常就是这类算术中的空缺。',
      },
      {
        label: '广告问题。',
        body: '误导人、破坏页面或遮挡内容的广告值得报告。网站靠展示广告维持运营，所以这类报告会被认真对待。',
      },
    ],
    nextHeading: '接下来会发生什么',
    nextBody:
      '被报告的数字会与来源核对，如果数字有误，页面就会修改。每当内容被核对，页面上的审阅日期都会更新，无论是否有改动，所以这个日期告诉您最近一次有人读这个页面是什么时候。',
  },

  contactForm: {
    heading: '写一条消息',
    lede: '表单会把消息发给阅读本网站来信的人，回复会发到您在这里填写的地址。',
    nameLabel: '您的姓名',
    emailLabel: '您的电子邮件地址',
    subjectLabel: '主题',
    messageLabel: '您的消息',
    submit: '发送消息',
    note: '消息通过电子邮件发送，由真人阅读。',
    statuses: [
      { key: 'sent', text: '消息已发送。回复会发到您填写的地址。' },
      { key: 'email', text: '这个电子邮件地址看起来不完整。请检查后重新发送。' },
      { key: 'fields', text: '每个字段都需要填写。' },
      { key: 'rate', text: '这个地址在短时间内发送了多条消息。请等一分钟后再发送。' },
      { key: 'failed', text: '消息没有发送成功。请改为写信到上面的地址。' },
    ],
  },

  sourcesPage: {
    title: '来源',
    description:
      '本网站的数字和方法所依赖的全部原始来源，以及每个来源为什么在这里。',
    heading: '来源',
    lede: '本网站的每个数字都来自下列机构之一，或来自网站完整展示的算术。没有任何内容引用自博客文章、摘要或二手转述。',
    whyHeading: '为什么要有来源列表',
    whyBody: [
      '没有来源的数字只是一个断言。这些页面是为想要自己核对算术的人写的，而只有原始数据就在一次点击之外，这才行得通。因此每篇指南都有自己的来源列表，而这个页面是所有来源的索引。',
      '网站遵循的规则刻意保持狭窄：政府机构、证券监管机构、中央银行以及政府支持的住房抵押贷款机构（GSE）。如果某个数字来自商业调查，页面会说明并写出调查名称。',
    ],
    howHeading: '来源如何使用',
    how: [
      {
        label: '方法和公式',
        body: '来自发布该方法的机构。摊还公式出自 CFPB 自己的指引；复利频率规则来自 SEC 的术语表；税收门槛来自 IRS 每年的通胀调整。',
      },
      {
        label: '公开的统计数据',
        body: '来自编制这些数据的统计机构，并注明数字的读取日期。',
      },
      {
        label: '市场利率',
        body: '来自发布它们的调查，并在页面上注明日期，因为另一个月的利率就是另一个数字。',
      },
      {
        label: '各州数据',
        body: '来自 Tax Foundation，它根据各州的法规和表格汇编所得税税级，并根据其发布的美国社区调查（American Community Survey）汇编房产税税率。户主税表、已缴联邦所得税的扣除以及州税收抵免来自各州自己的申报表和说明。',
      },
    ],
    sources: [
      {
        label: '消费者金融保护局（CFPB）— 房贷、消费信贷',
        url: 'https://www.consumerfinance.gov/',
      },
      {
        label: '美国国税局（IRS）— 税级、通胀调整、退休规则',
        url: 'https://www.irs.gov/',
      },
      {
        label: '社会保障局（SSA）— 工资税税率、工资基数、年度上限',
        url: 'https://www.ssa.gov/',
      },
      {
        label: 'Freddie Mac — Primary Mortgage Market Survey',
        url: 'https://www.freddiemac.com/pmms',
      },
      {
        label: 'Fannie Mae — 研究与市场评论',
        url: 'https://www.fanniemae.com/research-and-insights',
      },
      {
        label: '住房和城市发展部（HUD）— FHA、HECM、公平住房',
        url: 'https://www.hud.gov/',
      },
      {
        label: '劳工统计局（BLS）— 消费者价格指数',
        url: 'https://www.bls.gov/cpi/',
      },
      {
        label: '美联储理事会 — 利率数据（H.15）',
        url: 'https://www.federalreserve.gov/releases/h15/',
      },
      {
        label: '证券交易委员会（SEC）— Investor.gov',
        url: 'https://www.investor.gov/',
      },
      {
        label: '圣路易斯联邦储备银行（FRED）— 经济数据序列',
        url: 'https://fred.stlouisfed.org/',
      },
      {
        label: '劳工统计局 — CPI 计算器和数据表',
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
        label: 'Tax Foundation — Facts & Figures 2026，截至 2026 年 4 月 28 日的各州个人所得税税率',
        url: 'https://taxfoundation.org/data/all/state/2026-state-tax-data/',
      },
      {
        label: '全国州议会联合会（NCSL）— 各州劳动所得税抵免和儿童税收抵免',
        url: 'https://www.ncsl.org/human-services/',
      },
      {
        label: 'Tax Policy Center — 各州所得税税率和抵免',
        url: 'https://taxpolicycenter.org/',
      },
      {
        label: 'Prenatal-to-3 Policy Impact Center — 各州儿童税收抵免政策',
        url: 'https://pn3policy.org/',
      },
    ],
  },

  editorial: {
    title: '编辑团队',
    description:
      '谁撰写指南、谁审读指南，以及页面发布前审阅实际核对什么。',
    heading: '编辑团队',
    lede: '一个人撰写指南。另一个人在每篇指南上线前审读其财务内容。这个页面介绍他们是谁、审阅核对什么，以及您可以自己核对什么。',
    authorEyebrow: '作者',
    reviewerEyebrow: '财务审读',
    checkEyebrow: '您可以核对的内容',
    checkHeading: '算术是公开的',
    checkBody:
      '每个计算器背后的代码都在一个公开的代码库中，包括它实现的公式、将这些公式与已知公开数字核对的单元测试，以及阻止带有错误页面的版本发布的检查。数字无需凭信任接受，也无需询问任何人。',
    openRepository: '打开代码库',
    twoNamesHeading: '两个名字，两份工作',
    twoNamesBody: [
      '一个人撰写指南并维护计算引擎。另一个人在指南发布前审读其财务内容，核对数字、数字背后的假设以及数字的来源。这两份工作是刻意分开的：写指南的人不是做最终审读的人。',
      '如果一篇指南署了审读人的名字，那就是审读这篇指南的人，这个名字只出现在这篇指南上，别处不会出现。审阅是针对某个具体页面的陈述，所以它附在页面上，而不是附在整个网站上。',
      '本页其余部分说明审阅核对什么，以及读者无需询问任何人就能验证什么。',
    ],
    reviewHeading: '审阅核对什么',
    reviewIntro: '每篇指南发布前，审读人每次都按同一份清单逐项检查：',
    review: [
      {
        label: '算术。',
        body: '每个公式都与其出处核对，正文中的算例从头重新计算。如果某个数字出现在代码中，两者会进行比对。',
      },
      {
        label: '单位。',
        body: '百分比与小数、月与年、美元与千美元。财务文件中的大多数错误都是单位错误。',
      },
      {
        label: '边界情况。',
        body: '零利率、零期限、负值。逐一检查，确保得出合理的答案，而不是错误信息。',
      },
      {
        label: '措辞。',
        body: '页面不得告诉读者该怎么做。它解释一个数字的含义和它取决于什么，然后就此打住。推荐某种行动的指南会被重写。',
      },
      {
        label: '来源。',
        body: '每个链接都会被打开，核对它所支撑的陈述，并注明日期。',
      },
    ],
    toolsHeading: '起草工具如何使用',
    toolsBody: [
      '起草工具帮助处理文字。它们不决定页面说什么。每个数字、每个公式和每个陈述都由人撰写或核对，没有经过上述审阅的页面不会上线。一个给出看似合理的数字的工具，正是这个流程要拦下的东西。',
      '拦下它的检查不只是人工的。计算引擎有单元测试，每次改动都会运行，只要某个数字变动就会阻止发布：还款计划之和必须等于借款金额，贷款必须恰好在零处结清，逐期预测在每种复利频率下都必须与闭式公式一致。一段文字不会以这种方式出错，公式会；一旦出错，构建就会停止。',
    ],
    datesHeading: '审阅日期',
    datesBody:
      '每篇指南都标有最近审阅的日期。内容依赖外部数据的指南每年至少审阅两次；讲解算术的指南在其背后的公式变化时审阅，并且无论如何每年审阅一次。页面被审阅时日期就会更新，无论文字是否有改动，所以这个日期告诉您最近一次有人读这个页面是什么时候。',
    correctionsHeading: '更正',
    correctionsBody:
      '更正公开进行。被更正的页面会更新审阅日期，更正内容会在引发它的联系往来中说明。一篇数字错误的指南是审阅的缺陷，而不是写作的缺陷，需要改变的是审阅流程。',
    contactLink: '联系',
  },

  privacy: {
    title: '隐私',
    description:
      '本网站收集什么、不收集什么，以及页面上出现了哪些广告和分析服务商。',
    heading: '隐私',
    lede: '简而言之：您在计算器中输入的数字留在您的浏览器里，网站本身不保存任何跟踪 Cookie。',
    calculatorsHeading: '计算器如何处理您的输入',
    calculatorsBody:
      '什么也不做。算术在您的浏览器中由随页面下载的 JavaScript 运行。您输入的值不会传输到任何地方，不会被存储，网站或任何其他人都看不到。关闭标签页即被丢弃。',
    stateHeading: '您所在的州',
    stateBody:
      '有两个计算器需要用到州的数据：联邦所得税计算器会在联邦税之上加上州所得税，租房还是买房计算器会把房产税计入拥有房屋的成本。打开其中一个页面时，它会向本网站询问请求来自哪个州。答案来自为网站提供服务的网络，它根据请求的地址判断州，并用于填写一个字段。除此之外不会对它做任何事：答案不会被存储，不会写入 Cookie，也不会发送给 Google 或托管服务商的页面分析。州只是近似值——VPN、代理或移动网络可能指向错误的州——被填写的字段可以修改或清空，此时页面会保留您输入的数字。',
    cookiesHeading: 'Cookie',
    cookiesBody:
      '{name} 不设置自己的 Cookie。网站自己的分析使用 Google Analytics 4，由 Google 从其自有域名提供，它会在您的浏览器中存储一个第一方标识符，以区分一次访问和下一次访问。该标识符不用于广告，也不与其他网站共享。托管服务商的页面分析不在您的浏览器中存储任何东西：没有 Cookie，没有本地存储，没有任何形式的标识符。',
    advertisingHeading: '广告',
    advertisingBody:
      '网站靠 Google AdSense 投放的展示广告维持运营。Google 及其合作伙伴可能会设置 Cookie 或使用类似技术来投放和衡量广告，并可能根据您以前访问本网站或其他网站的情况投放广告。您可以在{adsSettingsLink}查看和更改您的选择，Google 关于如何使用使用其服务的网站和应用中的数据的说明见 {policiesLink}。',
    adsSettingsLink: 'Google 广告设置',
    policiesLink: 'policies.google.com',
    analyticsPoliciesLink: 'policies.google.com',
    analyticsHeading: '分析',
    analyticsBody:
      '页面浏览通过 Google Analytics 4 记录，由 Google 从 googletagmanager.com 提供。使用的数据仅限于页面、来源以及国家或城市级别的粗略位置；IP 地址会被截断，而不是完整存储。这些数据用于统计访问量，并了解哪些页面被阅读。Google 关于如何使用使用其服务的网站和应用中的数据的说明见 {analyticsPoliciesLink}。该脚本只有在您接受 Cookie 后才会加载，对欧盟读者也同样加载。',
    hostingAnalyticsHeading: '托管与页面性能',
    hostingAnalyticsBody:
      '网站托管在 Cloudflare 上，Cloudflare 自己的 Web Analytics 在每个页面上运行。一个从 static.cloudflareinsights.com 提供的小脚本会测量页面浏览：打开了哪个页面、访问从哪里来、使用了什么浏览器和操作系统、请求来自哪个国家，以及页面加载用了多长时间。IP 地址在 Cloudflare 的边缘节点用于判断国家，并在那里丢弃，而不会被存储。该脚本不设置 Cookie，不向本地存储写入任何内容，也不创建任何能在页面之间跟踪您的标识符。它得出的是页面浏览量和访问量，以及页面加载速度的读数。该脚本只有在您接受 Cookie 后才会加载。欧盟读者完全不被统计：不会为他们加载该脚本。',
    newsletterHeading: '邮件通讯',
    newsletterBody:
      '如果您订阅邮件通讯，您输入的地址会发送给负责发送邮件的服务 Buttondown，并存储在那里，以便发送通讯。该地址只用于邮件通讯，不用于其他任何用途，每一期都附有退订链接。',
    contactHeading: '联系表单',
    contactBody:
      '如果您通过联系表单写信，姓名、电子邮件地址、主题和消息本身会通过电子邮件发送给运营本网站的人，并保存在那个邮箱里。表单由本网站提供，回复会发到您填写的地址，以便您继续对话。表单不向 Google 发送任何内容，也不设置自己的 Cookie；上文所述的广告脚本和分析脚本属于整个页面，只有在您接受 Cookie 后才会加载。您输入的任何内容都不会存储在网站本身，消息也不会转交给其他任何人。',
    thirdPartyHeading: '第三方链接',
    thirdPartyBody:
      '指南链接到原始来源——政府机构、SEC、美联储。这些网站有自己的隐私政策，本网站无法控制，也没有替您阅读过。',
    changesHeading: '变更',
    changesBody:
      '如果上述服务商发生变化，本页面也会随之更改。页面底部的日期是这段文字最近一次审阅的日期。',
    consentHeading: '您的选择',
    consentBody:
      '在您作出回答之前，不会从 Google 加载任何内容，托管服务商的页面分析也保持关闭。如果您接受，广告和分析脚本会加载，您的回答会记在您的浏览器中；如果您拒绝，网站照常运行，什么也不加载。对欧盟读者，无论回答如何，托管服务商的页面分析都不会启用。页脚中的"{settingsLink}"链接可以重新打开这个问题。一个例外：Google 自己的爬虫会检查网站是否投放广告，它会直接收到广告脚本，因为它无法回答这个问题。不会为它记录任何选择，也不会存储任何关于它的信息。上文所述的州是在两个计算器页面上读取的，不属于这个选择：不会为它设置 Cookie，有关它的任何信息也不会传给分析服务商。',
    lastReviewed: '最近审阅：{date}。',
  },

  terms: {
    title: '条款',
    description:
      '本网站发布所依据的条款、其计算器涵盖和不涵盖的内容，以及它所能承诺的界限。',
    heading: '使用条款',
    lede: '为一个发布计算而非建议的网站写的简明条款。',
    providesHeading: '本网站提供什么',
    providesBody:
      '{name} 发布计算器以及对其背后算术的书面解释。计算器将公开的公式应用于您输入的值，并连同计算过程一起返回结果。这就是全部服务。',
    notProvidesHeading: '本网站不提供什么',
    notProvidesBody: [
      '这里的任何内容都不是财务、税务、法律或投资建议，也不是建议您购买、出售、持有、租赁、拥有、再融资或签署任何东西。结果反映的是您输入的数据和页面上的公式。改变一个输入，结果就会改变；正因如此，它是计算，而不是结论。',
      '计算器看不到您的财务状况、收入、信用、时间跨度或风险承受能力，也不会去猜测。输入相同但情况不同的两个人会得出不同的结论，而计算器无法判断其中谁是对的。',
    ],
    figuresHeading: '数字、来源和日期',
    figuresBody:
      '如果某个数字来自外部来源，页面会链接到该来源并注明读取日期。外部数据会变化：税收门槛、公布的利率和官方统计数据都会修订。页面上的数字截至该页面的审阅日期是准确的，之后不再保证；审阅日期就是让您看到它有多旧。',
    errorsHeading: '错误',
    errorsBody:
      '计算只实现一次、放在一个地方，并经过测试。即便如此，错误仍有可能发生。如果您发现了错误，联系页面说明了如何报告，被报告的缺陷会被修正，审阅日期也会更新。',
    advertisingHeading: '广告',
    advertisingBody:
      '网站靠展示广告维持运营。广告由第三方投放，不受本网站控制。广告有标识，并与网站自己的内容分开。没有任何广告主为某个页面、某个位置、搜索结果中的排名或在指南中提及某个产品付费。',
    useHeading: '网站的使用',
    useBody:
      '本网站供个人使用。您可以阅读、打印并链接到它。您不得将指南的大部分内容作为自己的作品重新发布，也不得使用计算器打造与本网站竞争的产品。',
    changesHeading: '变更',
    changesBody:
      '这些条款可能随网站的变化而变化。下面的审阅日期是这段文字最近一次被阅读的日期。',
    lastReviewed: '最近审阅：{date}。',
    contactLink: '联系页面',
  },

  notFound: {
    title: '找不到页面',
    description: '本网站上没有这个页面。以下是所有内容实际所在的位置。',
    heading: '找不到页面',
    lede: '这里没有这个网址。网站发布的一切，不是计算器，就是它们背后的指南，或者解释数字从哪里来的页面。',
    calculators: {
      title: '计算器',
      text: '房贷月供、租房还是买房、复利。',
    },
    guides: {
      title: '指南',
      text: '每个计算器背后的算术，详细讲解。',
    },
    sources: {
      title: '来源',
      text: '网站所依赖的全部原始来源。',
    },
    contact: {
      title: '联系',
      text: '告诉我们缺了什么或哪里有误。',
    },
  },

  tool: {
    'mortgage-payment': {
      name: '房贷月供计算器',
      title: '房贷月供计算器（含摊还计划）',
      description:
        '计算每月房贷还款、PITI 总成本和完整的摊还计划。看清每一美元利息，以及额外还款如何让还清日期提前。',
      short: '每月本息、完整 PITI、摊还计划以及额外还款的效果。',
      category: '住房',
      methodNote:
        '月供公式、摊还计划以及额外还款的处理方式如下所述。本页面上的任何内容都不是实时市场报价。',
      fields: {
        homePrice: '房价',
        downPayment: '首付',
        percentOfPrice: '占房价的百分比',
        interestRate: '利率',
        annualFixed: '年利率，固定',
        loanTerm: '贷款期限',
        propertyTax: '房产税',
        percentOfPricePerYear: '每年占房价的 %',
        homeInsurance: '房屋保险',
        perYear: '每年',
        hoaFee: '业主协会费（HOA）或公寓管理费',
        perMonth: '每月',
        extraPrincipal: '额外偿还本金',
        firstPayment: '首次还款',
        month: '月份',
        seeAmortization: '查看逐年摊还',
      },
      terms: {
        years: (n: number) => `${n} 年`,
      },
      table: {
        year: '年份',
        principal: '本金',
        interest: '利息',
        balance: '余额',
      },
      result: {
        headlineLabel: '每月总还款（PITI）',
        principalAndInterest: '本金和利息',
        propertyTax: '房产税',
        insurance: '保险',
        hoa: 'HOA',
        totalInterest: '利息总额',
        paidOff: '还清时间',
        note: '本金、利息、房产税、保险和 HOA，使用您输入的数字。',
      },
      resultNote:
        '修改任一字段，数字都会随输入即时更新。不会发送任何内容：算术在本页面内运行。',
      chart: {
        title: '逐年的余额和利息',
        note: '余额随着贷款偿还而下降，每年支付的利息也随之下降。',
        xAxis: 'years',
        series: [
          { key: 'balance', label: '余额' },
          { key: 'interest', label: '已付利息' },
        ],
      },
      formula: 'M = P · r(1 + r)ⁿ / ((1 + r)ⁿ − 1)',
      method: [
        '计划月供来自标准摊还公式：',
        'P 是借款金额，本页面按房价减去首付计算。r 是您输入的年利率除以十二，n 是以月计的期限。计算器从这一个数字出发逐月构建还款计划：利息按月初尚未偿还的余额计算，月供扣除这部分利息后剩下的部分用于减少余额。',
        '完整月供是本金和利息加上房产税除以十二、保险除以十二，以及 HOA 费用（如有）。这三项由您设定：计算器不知道您当地的评估或您的保险公司收多少钱，也不会替您去猜。',
        '每月额外还款用于偿还本金，因此会减少下个月计息的余额。计划月供不变，贷款提前结束，利息总额减少。',
      ],
      limits: [
        '它不检查您是否符合贷款资格，也不考虑您的信用分数、收入、债务收入比或任何贷款机构的审批规则。',
        '它不提供您所在邮编的当前市场利率。您输入的利率就是所用的利率，本页面上没有任何实时内容。',
        '它不计算私人房贷保险、点数、贷款发放费、过户费用，也不计算决定税单落在哪个月的托管账户（escrow）时间安排。',
        '它不告诉您是否该买房。它给出一个数字以及背后的计算过程。',
      ],
      faq: [
        {
          q: 'PITI 是什么意思？',
          a: 'Principal、Interest、Taxes and Insurance——本金、利息、税和保险。它是由四部分组成的每月住房支出：偿还贷款的部分、支付给贷款机构作为借款代价的部分、房产税以及房屋保险。本计算器分别显示每一部分，让您看清是什么构成了总额。',
        },
        {
          q: '每月本金和利息是怎么算出来的？',
          a: '用标准摊还公式：M = P · r(1 + r)ⁿ / ((1 + r)ⁿ − 1)，其中 P 是借款金额，r 是月利率，n 是月供期数。随后的还款计划每月利息减少、本金增加，所以早期的还款大部分是利息。',
        },
        {
          q: '最后一期还款会怎样？',
          a: '计划月供四舍五入到分，这会在期末留下几分钱的余额。最后一期计划还款会被调整，使贷款恰好在零处结清，和贷款机构调整最后一期还款的方式相同。',
        },
        {
          q: '额外还款缩短的是贷款期限还是月供？',
          a: '缩短贷款期限。额外还款用于偿还本金，会减少下个月计息的余额。计划月供保持不变，贷款提前结束，利息总额更少。',
        },
        {
          q: '利息总额会受我输入的税和保险影响吗？',
          a: '不会。利息总额只涵盖贷款。房产税、保险和 HOA 是在贷款还清后仍会持续的住房成本，所以计算器单独报告住房总成本。',
        },
        {
          q: '计算器考虑通货膨胀吗？',
          a: '不考虑。每个数字都以您输入的美元计。30 年后的月供占收入的比例远低于今天同样的月供，而本页面上的数字都没有为此调整。',
        },
      ],
      sources: [
        {
          label: 'CFPB — 如何计算房贷月供',
          url: 'https://www.consumerfinance.gov/ask-cfpb/how-do-i-calculate-my-mortgage-payment-en-144/',
        },
        {
          label: 'Freddie Mac — Primary Mortgage Market Survey（利率方法）',
          url: 'https://www.freddiemac.com/pmms',
        },
        {
          label: 'HUD — FHA 贷款要求和房贷保险',
          url: 'https://www.hud.gov/helping_american_homeowners',
        },
        {
          label: 'BLS — 消费者价格指数（通胀，用于实际价值说明）',
          url: 'https://www.bls.gov/cpi/',
        },
      ],
      relatedGuides: [
        { slug: 'mortgage-payment-calculator-explained', title: '房贷月供计算器详解' },
        { slug: 'how-mortgage-amortization-works', title: '房贷摊还是如何运作的' },
        { slug: 'monthly-payment-vs-total-cost-mortgage', title: '房贷的月供与总成本' },
        { slug: 'extra-mortgage-payments-math', title: '房贷额外还款背后的数学' },
        { slug: 'how-to-read-an-amortization-schedule', title: '如何阅读摊还计划表' },
      ],
    },

    'rent-vs-buy': {
      name: '租房还是买房计算器',
      title: '租房还是买房：比较真实成本',
      description:
        '用数字比较租房和拥有房屋：每月成本、前期支出、房屋净值，以及两条路径交叉的月份。不下结论，只有算术。',
      short: '每月成本、前期支出、净值积累和交叉月份。',
      category: '住房',
      methodNote:
        '比较的是现金流出和房屋净值。它刻意不下结论——交叉月份是关于您所输入数字的一个事实，而不是建议。',
      sections: {
        theHome: '房屋',
        theRent: '租金',
        runningCosts: '持续费用',
        assumptions: '假设',
      },
      fields: {
        purchasePrice: '购买价格',
        downPayment: '首付',
        percentOfPrice: '占房价的百分比',
        mortgageRate: '房贷利率',
        annualFixed: '年利率，固定',
        loanTerm: '贷款期限',
        monthlyRent: '月租金',
        rentersInsurance: '租客保险',
        perMonth: '每月',
        propertyTax: '房产税',
        percentOfPricePerYear: '每年占房价的 %',
        homeInsurance: '房屋保险',
        perYear: '每年',
        hoaFee: '业主协会费（HOA）或公寓管理费',
        maintenance: '维护',
        annualChangeInValue: '房价年变化',
        negativeModelsAFall: '负数表示下跌',
        compareOver: '比较时长',
        closingCosts: '过户费用',
        percentOfPriceOnce: '占房价的 %，一次性',
        sellingCosts: '出售费用',
        percentOfFinalValue: '占最终价值的 %',
      },
      terms: {
        years: (n: number) => `${n} 年`,
      },
      result: {
        headlineLabel: '每月差额（拥有减去租房）',
        monthlyRent: '月租金',
        monthlyOwnership: '每月拥有成本',
        monthlyOwnershipAfterLoan: '贷款还清后的每月拥有成本',
        upfrontOutlay: '前期支出',
        equityBuilt: '积累的净值',
        homeValueAtHorizon: '期末房屋价值',
        sellingCostsAtHorizon: '期末出售费用',
        netCostAtHorizon: '期末拥有房屋的净成本',
        crossover: '交叉点',
        note: '拥有成本在贷款期间包括房贷月供，之后包括房产税、保险、HOA 和维护。净值是房屋价值减去尚欠余额，再减去在那个时间点出售所需的出售费用。',
      },
      resultNote:
        '交叉点是拥有房屋的净成本（已付现金减去出售后能留下的净值）首次低于租房现金成本的月份。它是关于这些数字的事实，而不是建议。',
      chart: {
        title: '租房成本与拥有房屋的成本',
        note: '两条线都是累计现金：已付的租金，以及花在房屋上的钱扣除其积累的净值后、再扣除在那个时间点出售的费用后的数额。',
        xAxis: 'years',
        series: [
          { key: 'rent', label: '已付租金' },
          { key: 'ownership', label: '拥有房屋的净成本' },
        ],
      },
      method: [
        '每个月，计算器并排记两本账。租房账加上租金和租客保险。拥有账加上按标准摊还公式算出的房贷月供、房产税、保险、HOA 和维护预留，第一个月还要加上首付和过户费用。贷款还清后房贷月供停止；其他持续费用只要您还拥有房屋就会继续。',
        '在第二本账旁边，它跟踪房屋价值——按您输入的年变化率每月上涨或下跌——以及贷款尚欠的余额。两者之差就是您的净值：',
        '拥有房屋的净成本是您已支付的现金，减去已积累的净值，再加上在那个时间点出售所需的出售费用。交叉月份是这个数字首次低于同期您本应支付的租金的月份。出售费用不计入每月还款，因为在出售之前您不需要支付；它们与净值放在一起，也就是出售发生的地方。',
      ],
      formula: '净值 = 房屋价值 − 剩余贷款余额',
      limits: [
        '它不告诉您哪个选项对您更好。两条路径按您提供的数字进行比较，并报告交叉月份，仅此而已。',
        '它不计算出售房屋的税务处理、房贷利息扣除或房产随时间的折旧。',
        '它不为具体贷款定价。所用的就是您输入的房贷利率；页面上没有实时报价，也没有贷款机构信息。',
        '它不预测房价。您输入的房价年变化在整个期间逐月应用，如果输入负数，则朝相反方向变化。',
        '它不计算搬出租住房屋的成本。押金、中介费和搬家费用不在租房一方的比较之内。',
        '它不使用特定县或城市的税率。页面能自动填写的房产税税率是全州平均值，而房产税由地方设定，所以一个辖区的税率通常与相邻辖区不同。',
      ],
      faq: [
        {
          q: '交叉月份是什么意思？',
          a: '它是拥有房屋的净成本——您已支付的现金，减去已积累的净值，再加上在那个时间点出售的费用——首次低于同期您本应支付的租金的月份。在这之前，按现金计算租房花得更少。在这之后，把净值算进去，拥有房屋花得更少。',
        },
        {
          q: '为什么计算中包括维护预留？',
          a: '无论是否有房贷，房屋都需要花钱维修，而这笔费用不会出现在任何过户结算单上。计算器每年按购买价格的一定百分比计入这笔费用，这个百分比由您设定。',
        },
        {
          q: '计算中的房屋价值会怎样变化？',
          a: '它按您输入的年变化率每月上涨或下跌，然后与剩余贷款余额比较，得出净值。负的变化率表示市场下跌；零变化率表示价格持平。',
        },
        {
          q: '包括出售费用吗？',
          a: '包括。出售费用按出售时的房价收取，所以不计入每月还款。它们会减少出售后能留下的净值，因此是拥有房屋净成本和交叉月份的一部分。期末单独报告这个数字。',
        },
        {
          q: '贷款还清后房贷月供会怎样？',
          a: '停止。贷款的本金和利息随贷款一起结束，而房产税、保险、HOA 和维护只要拥有房屋就会继续。当比较时长超过贷款期限时，之后的月份只计入持续费用。',
        },
        {
          q: '总租金和拥有房屋的净成本有什么区别？',
          a: '总租金就是每月租金乘以月数。拥有房屋的净成本是您在房贷、税、保险、HOA 和维护上的支出，加上前期支出，减去已积累的净值，再加上出售费用。第二个数字可能为负，意味着您积累的净值超过了您的支出。',
        },
        {
          q: '这包括出售房屋的税务后果吗？',
          a: '不包括。出售的任何收益以及适用的任何免税额，都超出了本工具的范围。这里比较的是现金和净值，而不是税务。',
        },
        {
          q: '房产税税率从哪里来？',
          a: '它是一个输入值。当网络能判断请求来自哪个州时，页面会用该州的平均实际房产税税率填写该字段，数据取自 2024 年美国社区调查，由 Tax Foundation 发布于 2026 年。房产税由地方政府设定，所以特定县或城市的税率通常与全州平均值不同，该字段仍可编辑。',
        },
      ],
      sources: [
        {
          label: 'CFPB — 住房成本、租房与拥有房屋',
          url: 'https://www.consumerfinance.gov/consumer-tools/mortgages/',
        },
        {
          label: 'HUD — 住房成本、房产税和保险指引',
          url: 'https://www.hud.gov/helping_american_homeowners',
        },
        {
          label: 'BLS — 消费者价格指数（通胀，用于升值说明）',
          url: 'https://www.bls.gov/cpi/',
        },
        {
          label: 'FRED — 用于长期价格走势的房价指数序列',
          url: 'https://fred.stlouisfed.org/series/HPINUS',
        },
        {
          label: 'Tax Foundation — Property Taxes by State and County, 2026',
          url: 'https://taxfoundation.org/data/all/state/property-taxes-by-state-county/',
        },
      ],
      relatedGuides: [
        { slug: 'rent-vs-buy-calculator-explained', title: '租房还是买房计算器详解' },
        { slug: 'rent-vs-buy-common-mistakes', title: '租房与买房比较中的常见错误' },
        { slug: 'estimating-property-tax-and-home-insurance', title: '估算房产税和房屋保险' },
        { slug: 'down-payment-and-closing-costs-explained', title: '首付和过户费用详解' },
        { slug: 'monthly-payment-vs-total-cost-mortgage', title: '房贷的月供与总成本' },
      ],
      script: {
        notWithinHorizon: '不在比较时长内',
        month: '第 {n} 个月',
        propertyTaxDetected: '已按 {state} 填写：该州的平均实际房产税税率。',
      },
    },

    'compound-interest': {
      name: '复利计算器',
      title: '复利计算器（含每月定投）',
      description:
        '预测定期存入后的余额，选择复利频率，并查看扣除通胀后以今天美元计的结果。公式完整展示。',
      short: '余额、存入金额、所得利息和经通胀调整的价值。',
      category: '投资',
      methodNote:
        '预测逐期推进，所以年度表格和最终数字由同一套算术得出。',
      fields: {
        startingBalance: '初始余额',
        today: '现在',
        monthlyContribution: '每月存入',
        addedEachMonth: '每月追加',
        interestRate: '利率',
        annualNominal: '年利率，名义',
        time: '时间',
        years: '年',
        compounding: '复利频率',
        contributionTiming: '存入时间',
        inflation: '通胀',
        annualForRealValue: '年率，用于计算实际价值',
        seeBalance: '查看逐年余额',
      },
      frequencies: {
        monthly: '每月',
        quarterly: '每季度',
        twiceAYear: '每半年',
        annually: '每年',
        everyTwoMonths: '每两个月',
        everyFourMonths: '每四个月',
      },
      timing: {
        endOfMonth: '月末',
        startOfMonth: '月初',
      },
      table: {
        year: '年份',
        balance: '余额',
        contributed: '已存入',
        interest: '利息',
        inTodaysDollars: '按今天美元计',
      },
      result: {
        headlineLabel: '期末余额',
        totalContributions: '存入总额',
        interestEarned: '所得利息',
        inTodaysDollars: '按今天美元计',
        effectiveAnnualRate: '实际年利率',
        realAnnualRate: '扣除通胀的年利率',
        horizon: '期限',
        note: '余额以您输入的美元计。经通胀调整的数字将其换算为起始年份的购买力。',
      },
      resultNote:
        '您输入的利率在整个期间内完全按输入值使用。本页面不查询市场利率。',
      chart: {
        title: '余额由什么组成',
        note: '这条线是余额。线下方的色带是其中来自利息、而不是来自存入的部分。',
        xAxis: 'years',
        series: [
          { key: 'balance', label: '余额' },
          { key: 'contributed', label: '已存入' },
        ],
      },
      method: [
        '预测每次推进一个复利周期。在每个周期里，余额按周期利率计息，然后加上该周期的存入——在周期末或周期初，取决于设置。按顺序逐期运算而不是使用一个闭式表达式，正是逐年表格的由来，而最终余额无论哪种方式都相同。',
        '用闭式表示，同样的结果是：',
        '其中 P 是初始余额，r 是年利率除以每年的复利周期数，n 是周期数，PMT 是每个周期的存入额。在周期初存入的钱会在整个周期内计息，所以在这种情况下存入项要乘以 (1 + r)。',
        '实际数字来自两项调整。实际年利率是 (1 + r) 的每年周期数次方，也就是 7% 的名义利率经过一年按月复利后实际变成的数。扣除通胀的利率是用这个实际年利率除以通胀系数，而按今天美元计的余额是名义余额除以同期累计的通胀。',
      ],
      formula: 'FV = P(1 + r)ⁿ + PMT · ((1 + r)ⁿ − 1) / r',
      limits: [
        '它不预测回报。您输入的利率在整个期间内完全按输入值使用；本页面不使用任何历史平均值、预测或市场数据。',
        '它不计算税费、手续费或账户费用。真实账户的余额会因服务商收取的费用而不同。',
        '它不模拟市场波动。真实市场下跌的年份，真实余额也会下跌，任何固定利率都无法反映这一点。',
        '它不告诉您如何投资或是否储蓄。它按您提供的假设预测一个数字。',
      ],
      faq: [
        {
          q: '为什么复利频率只能是 1、2、3、4、6 或 12？',
          a: '因为这里的存入是按月进行的，而计算器让复利周期和存入周期保持一致。任何能整除十二的频率都能让这套算术保持精确，而不是近似。实际上，这六种频率涵盖了按月存入时从按日到按年的各种复利方式。',
        },
        {
          q: '名义利率和实际年利率有什么区别？',
          a: '名义利率是账户上写的数字：7%。实际年利率是余额经过一年复利后真正赚到的，所以按月复利的 7% 等于 7.229%。页面同时显示两者，因为在长期内这个差异很重要。',
        },
        {
          q: '实际价值是什么意思？',
          a: '它是以起始年份购买力表示的最终余额。计算方法是用名义余额除以同期累计的通胀，从而显示余额中有多少是真实增长，有多少只是同样的美元变得不值钱了。',
        },
        {
          q: '存入时间会改变结果吗？',
          a: '会，页面同时显示两种情况。在每个周期初存入的钱会在整个周期内计息，所以最终会比在周期末存入同样的钱更多。每笔差异很小，但几十年下来会累积起来。',
        },
        {
          q: '利率为零时会怎样？',
          a: '余额只随存入增长，没有利息。计算器会明确处理这种情况，而不是除以零，所以数字恰好等于存入的总额。',
        },
        {
          q: '必须定期存入吗？',
          a: '不必。把每月存入设为零，计算就变成对初始余额的简单复利预测，这适用于一笔已经投入的一次性资金。',
        },
      ],
      sources: [
        {
          label: 'SEC — Investor.gov：复利与费用的成本',
          url: 'https://www.investor.gov/introduction-investing/investing-basics/glossary/compound-interest',
        },
        {
          label: 'BLS — 消费者价格指数（用于经通胀调整的数字）',
          url: 'https://www.bls.gov/cpi/',
        },
        {
          label: '美联储 — 定期存款和储蓄利率数据',
          url: 'https://www.federalreserve.gov/releases/h15/',
        },
        {
          label: 'IRS — 复利与传统 IRA 的增长',
          url: 'https://www.irs.gov/retirement-plans/traditional-iras',
        },
      ],
      relatedGuides: [
        { slug: 'compound-interest-calculator-explained', title: '复利计算器详解' },
        { slug: 'compound-vs-simple-interest', title: '复利与单利' },
        { slug: 'how-compounding-frequency-changes-results', title: '复利频率如何改变结果' },
        { slug: 'inflation-and-real-returns-explained', title: '通胀与实际回报详解' },
        { slug: 'understanding-apr', title: '理解 APR（年化百分比利率）' },
      ],
      script: {
        yearsOne: '1 年',
        yearsOther: '{n} 年',
      },
    },
    'net-pay': {
      name: '税后工资计算器',
      title: '2026 纳税年度税后工资计算器',
      description:
        '计算工资在扣除联邦所得税、社会保障税（Social Security）、联邦医疗保险税（Medicare）和州税后还剩多少，适用于任何发薪周期，每项扣除都会列出。',
      short: '工资在扣除联邦税、工资税和州税之后剩下多少。',
      category: '工资',
      methodNote:
        '数字为 2026 纳税年度：联邦税级和标准扣除额依据 Rev. Proc. 2025-32，工资税上限依据社会保障局。本页面上的任何内容都不是薪资服务商的报价。',
      fields: {
        grossPay: '税前工资',
        payPeriod: '发薪周期',
        filingStatus: '报税身份',
        stateRate: '州所得税税率',
        stateRateHint: '您所在税级的税率',
        retirementContribution: '401(k) 或 403(b) 缴款',
        retirementHint: '每年——仍需缴纳工资税',
        healthContribution: 'HSA 或 FSA 缴款',
        healthHint: '每年——无需缴纳工资税',
        perYear: '每年',
        debtName: '债务',
        balance: '余额',
        rate: '利率',
        minimum: '最低还款',
      },
      terms: {
        payPeriods: {
          year: '每年',
          month: '每月',
          week: '每周',
          day: '每天',
          hour: '每小时',
        },
        filingStatuses: {
          single: '单身',
          married: '已婚合并申报',
          head: '户主',
        },
      },
      result: {
        headlineLabel: '税后工资',
        annualGross: '全年税前工资',
        federalTax: '联邦所得税',
        socialSecurity: 'Social Security',
        medicare: 'Medicare',
        additionalMedicare: '额外 Medicare 税',
        stateTax: '州所得税',
        totalTax: '税费总额',
        netPerMonth: '每月税后',
        effectiveRate: '实际税率',
        note:
          '税后金额是税前工资减去上述各项扣除，再除以一年中的发薪次数。',
        negativeNote:
          '扣除额与税前工资一样多，而这些扣除额仍要缴纳工资税，所以税后数字低于零。这里不检查缴款的年度上限。',
      },
      resultNote:
        '薪资系统会使用 W-4 表上的预扣选择和年内已预扣的金额，所以真实工资单上的数字每个月会略有变动。',
      chart: {
        title: '税前工资去了哪里',
        note: '一年一根柱形，分为到手的部分和从中扣除的各部分。',
        xAxis: 'none',
        series: [
          { key: 'net', label: '税后工资' },
          { key: 'federal', label: '联邦所得税' },
          { key: 'socialSecurity', label: 'Social Security' },
          { key: 'medicare', label: 'Medicare' },
          { key: 'state', label: '州所得税' },
        ],
      },
      formula:
        '税后工资 = 税前工资 − 税前扣除 − 联邦所得税 − Social Security − Medicare − 州所得税',
      method: [
        '计算从税前工资开始，按照薪资系统应用扣除的顺序倒推。税前扣除最先扣掉，因为向 401(k) 或健康账户的缴款是在工资计税之前从中扣除的。剩下的就是应税工资。',
        '这两种扣除的处理方式不同。401(k) 或 403(b) 缴款不计入收入，但对 Social Security 和 Medicare 来说仍算工资，所以它会降低联邦税，而不影响工资税。从工资中扣除的 HSA 或 FSA 缴款既不计入收入，也不计入 Social Security 工资，所以两者都会降低。',
        '联邦所得税按这部分应税工资计算。减去对应报税身份的标准扣除额，结果再套用 2026 年税级表。每个税级是一笔固定税额加上超过该税级下限部分收入的一个百分比，IRS 就是这样公布税表的。',
        '接下来是工资税。它们按工资减去任何 HSA 或 FSA 缴款计算，因为在这方面 401(k) 缴款仍算在工资里。Social Security 税为工资的 6.2%，2026 年的应税上限为 $184,500。Medicare 税为全部工资的 1.45%，没有上限；额外 Medicare 税为单身申报者超过 $200,000 部分、已婚合并申报者超过 $250,000 部分的 0.9%。',
        '州所得税是读者输入的税率乘以应税收入。这只是估算：大多数州按税级征税，所以用一个数字乘以全部收入，会高估大多数人实际缴纳的税额。最终数字是剩下的部分，再除以一年中的发薪次数。',
      ],
      limits: [
        '它不计算税收抵免。儿童税收抵免、劳动所得税抵免和教育抵免会改变最终数字，但不在计算之内。',
        '它不计算资本利得、自雇收入，也不处理超过 Social Security 工资基数的收入——在这部分收入上，Medicare 仍然适用，Social Security 则不再适用。',
        '它不计算地方税。市和县的所得税与州税率是分开的。',
        '发薪次数采用惯例：12 个月、52 周、260 个工作日，或每周 40 小时、共 52 周的 2,080 小时。按其他周期领薪的读者可以改为输入全年数字。',
        'HSA 和 FSA 缴款被视为从工资单中扣除的减薪，这正是它免缴 Social Security 和 Medicare 的原因。直接从银行账户向 HSA 缴款，对 Social Security 来说仍算工资，这种情况不在计算之内。',
        '超过 2026 年年度上限的 401(k) 缴款，部分会重新需要缴纳工资税，而本计算对全部缴款都征收工资税。',
        '它不检查缴款的年度上限。与全部工资一样多的 401(k) 或 HSA 缴款会让税后数字低于零，因为这部分仍要缴纳工资税。',
      ],
      faq: [
        {
          q: '为什么我的税后工资比税前工资减去所得税还低？',
          a: '因为工资还要扣除 Social Security 和 Medicare。这些是针对工作本身的工资税，与工资单上的所得税是分开的。',
        },
        {
          q: '401(k) 缴款会减少我的 Social Security 和 Medicare 吗？',
          a: '不会。它在计算联邦所得税之前从工资中扣除，但对工资税来说仍算工资，所以仍要缴纳 Social Security 和 Medicare。从工资中扣除的 HSA 或 FSA 缴款则不同：它也会从这些税的计税基数中扣除。这就是两者要分开输入的原因。',
        },
        {
          q: '这用的是我真实的税级吗？',
          a: '它使用 2026 年税级表和对应报税身份的标准扣除额，所以对于没有其他收入的工薪族，这个数字接近薪资系统算出的结果。它对抵免、其他扣除或其他收入一无所知。',
        },
        {
          q: '实际税率和边际税率有什么区别？',
          a: '边际税率是下一美元应税收入适用的税率，也就是收入所达到的最高税级。实际税率是总税额除以全部收入，它更低，因为较高的税级只适用于超过其下限的那部分收入。',
        },
        {
          q: '州税率应该输入哪个？',
          a: '您所在州适用于您自己税级的税率。大多数州按税级征税，所以实际税率低于最高税率。在单一税率的州和没有所得税的州，这一个数字是完全准确的。',
        },
        {
          q: '为什么 Social Security 税有上限而 Medicare 税没有？',
          a: 'Social Security 每年设定一个应税上限，2026 年为 $184,500，超过这个数额的收入不缴 Social Security 税。Medicare 没有上限，所以适用于工资的每一美元。',
        },
        {
          q: '能用它来算我的报税税单吗？',
          a: '不能。它计算的是从工资中预扣的税。报税是另一种计算：它包括其他收入、扣除、抵免和已缴税款，每年申报一次，而不是每个发薪周期一次。',
        },
      ],
      sources: [
        {
          label: 'IRS — Rev. Proc. 2025-32，2026 纳税年度通胀调整',
          url: 'https://www.irs.gov/irb/2025-45_IRB',
        },
        {
          label: '社会保障局 — 2026 年工资基数和生活成本调整（COLA）',
          url: 'https://www.ssa.gov/cola/',
        },
        {
          label: '社会保障局 — Publication 15，雇主税务指南',
          url: 'https://www.ssa.gov/pubs/EN-05-10035.pdf',
        },
        {
          label: 'IRS — Tax Topic 401，工资和薪金',
          url: 'https://www.irs.gov/taxtopics/tc401',
        },
        {
          label: '社会保障局 — POMS RS 01402.038，税收优惠健康计划',
          url: 'https://secure.ssa.gov/poms.nsf/lnx/0301402038',
        },
        {
          label: 'IRS — Tax Topic 511，预扣税',
          url: 'https://www.irs.gov/taxtopics/tc511',
        },
      ],
      relatedGuides: [
        {
          slug: 'net-pay-calculator-explained',
          title: '税后工资是如何计算的',
        },
      ],
    },

    'income-tax': {
      name: '联邦所得税计算器',
      title: '2026 纳税年度联邦所得税计算器',
      description:
        '计算一年收入在 2026 年应缴的联邦所得税，州税按该州自己的税级计算，并并排显示报税身份、扣除额、实际税率和边际税率。',
      short: '一年收入的联邦和州所得税，两种税率都会显示。',
      category: '工资',
      methodNote:
        '联邦税级和标准扣除额为 2026 年数字，出自 2025 年 11 月 3 日发布的 Rev. Proc. 2025-32。州税按您所选州的 2026 年税级、标准扣除额、个人免税额和抵免计算，取自 Tax Foundation 2026 年 4 月 28 日的表格。户主税表、联邦所得税扣除和州抵免来自各州自己的表格。从工资中扣除的工资税不在本计算之内；它们在税后工资计算器中。',
      script: {
        stateDetected: '已按 {state} 填写：您的请求来自的州。',
        childrenTotal: '符合条件的子女共计：{count}',
      },
      fields: {
        grossIncome: '全年税前收入',
        filingStatus: '报税身份',
        itemisedDeduction: '分项扣除',
        standardDeduction: '标准扣除',
        useStandard: '使用标准扣除',
        state: '州',
        stateHint: '用于计算州税',
        stateNone: '不选州',
        children: '符合条件的子女',
        childrenHint: '按纳税年度末的年龄',
        childBand: '{range} 岁的子女',
        stateTaxOverride: '自行填写州税',
        stateTaxOverrideHint: '留空则使用模型',
        preTax: '税前扣除',
        preTaxHint: '每年的 401(k)、HSA、FSA',
        perYear: '每年',
      },
      terms: {
        filingStatuses: {
          single: '单身',
          married: '已婚合并申报',
          head: '户主',
        },
      },
      result: {
        headlineLabel: '联邦所得税',
        taxableIncome: '应税收入',
        deductionApplied: '适用的扣除',
        standardDeduction: '标准扣除',
        itemisedDeduction: '分项扣除',
        federalTax: '联邦所得税',
        stateTaxableIncome: '州应税收入',
        stateCredits: '州抵免',
        stateChildCredit: '州儿童税收抵免',
        federalTaxDeducted: '已扣除的联邦税',
        stateTax: '州所得税',
        totalTax: '税费总额',
        effectiveRate: '实际税率',
        marginalRate: '边际税率',
        afterTax: '税后收入',
        note:
          '适用的扣除是两者中较大的一个：对应报税身份的标准扣除，或在左侧输入的分项扣除。州税按您选择的州计算。',
      },
      resultNote:
        '这个数字是应纳税额，而不是从工资中预扣的金额。联邦数字不包括联邦抵免和年内已缴的税款；州数字包括模型所涵盖的州抵免。',
      chart: {
        title: '收入最后剩下什么',
        note: '一年一根柱形，分为留给读者的部分和用于缴税的部分。',
        xAxis: 'none',
        series: [
          { key: 'afterTax', label: '税后收入' },
          { key: 'federal', label: '联邦所得税' },
          { key: 'state', label: '州所得税' },
        ],
      },
      formula:
        '应税收入 = 税前收入 − 税前扣除 − 扣除额；税额 = 对应税收入套用税级表；州税 = 对调整后总收入减去州标准扣除和免税额、在州允许时再减去已缴联邦所得税后套用州税级，再减去州抵免',
      method: [
        '计算从全年税前收入开始，先减去税前扣除，因为向 401(k) 或健康账户的缴款不作为收入计税。',
        '接下来是扣除额。除非读者输入分项扣除，否则使用对应报税身份的标准扣除，两者取较大者。2026 年的标准扣除额为：单身申报者 $16,100，已婚合并申报者 $32,200，户主 $24,150。',
        '剩下的就是应税收入，税额就是对它套用 2026 年税级表。每个税级是一笔固定税额加上超过该税级下限部分收入的一个百分比，与 IRS 公布的方式相同。',
        '两种税率回答的是不同的问题。边际税率是下一美元应税收入适用的税率，也就是收入所达到的最高税级。实际税率是总税额除以全部收入，它更低，因为较高的税级只涉及超过其下限的那部分收入。',
        '州税单独计算。州从调整后总收入开始，在作为免除项给予时减去自己的标准扣除和个人免税额，逐段套用自己的税级，再减去它支付的抵免。以抵免形式给予免税额或标准扣除的州，会从税额中减去，这些抵免就在那里计入。',
        '使用对应报税身份的税表。发布了自己户主税表的州，这里使用取自其表格的税表；没有发布的州按单身申报税表计算。',
        '有三个州允许扣除已缴的联邦所得税：阿拉巴马州、密苏里州和俄勒冈州。在允许的州，这项扣除在套用州税级之前从收入中减去，限额和比例由各州规定。',
        '州抵免按子女的年龄计算，因为抵免取决于年龄。纽约州为四岁以下的子女支付 $1,000，为四到十六岁的子女支付 $500；明尼苏达州为十八岁以下的子女支付 $1,800；还有几个州对超过一定年龄的子女不支付任何抵免。',
      ],
      limits: [
        '它不计算联邦税收抵免。联邦儿童税收抵免、联邦劳动所得税抵免和教育抵免会减少税额，但不在计算之内。',
        '它不区分资本利得和普通收入，所以有投资收入的年份按普通税率计算。',
        '它不计算老年人扣除，也不计算左侧输入的标准和分项金额以外的任何扣除。',
        '它不计算自雇税，自雇税按自雇人士的净收入征收，有自己的计税基数和税率。',
        '它不计算许多州在分项扣除中允许的州和地方所得税扣除。',
        '它不计算资本利得税率、一些州对高收入者征收的附加税，也不计算市和县政府的税。',
        '它不使用佛蒙特州的户主税表，该州 2026 年的税率以初步数字公布，所以佛蒙特州的户主按单身申报税表计算。',
        '它没有涵盖所有州抵免。州劳动所得税抵免涵盖按联邦抵免百分比设定的州，以及另外三个自行计算的州；儿童税收抵免涵盖按子女年龄设定的州。其他州的抵免不在其中。',
      ],
      faq: [
        {
          q: '适用哪种扣除？',
          a: '除非分项扣除加起来更多，否则适用标准扣除。计算器把对应报税身份的标准扣除和分项数字并排显示，一眼就能比较。',
        },
        {
          q: '实际税率和边际税率有什么区别？',
          a: '边际税率是下一美元应税收入适用的税率。实际税率是总税额除以全部收入，它更低，因为第一个税级以上的税级只适用于超过其下限的那部分收入。',
        },
        {
          q: '为什么税额在某个收入点会跳升？',
          a: '那是税级的分界线。超过它之后，每多一美元都按下一级税率征税，所以税额比收入涨得更快。边际税率告诉您收入处在哪个税级。',
        },
        {
          q: '这包括 Social Security 和 Medicare 吗？',
          a: '不包括。它们是对工资征收的工资税，有各自的上限，在税后工资计算器中计算。',
        },
        {
          q: '州税数字是什么？',
          a: '州本身征收的税，按该州 2026 年的税级、标准扣除、个人免税额和抵免计算。州从列表中选择，当网络能判断时，页面会用您的请求来自的州自动填写。换一个州，整个数字都会随之改变。',
        },
        {
          q: '我可以填写自己的州税吗？',
          a: '可以。州下方的字段可以输入一个数字，并用它取代计算出的数字。它默认为空，只要它为空，页面显示的就是计算结果。',
        },
        {
          q: '为什么页面要问每个孩子的年龄？',
          a: '因为州儿童税收抵免取决于子女的年龄。纽约州为四岁以下的子女支付 $1,000，为四到十六岁的子女支付 $500；明尼苏达州为十八岁以下的子女支付 $1,800；有些州对超过一定年龄的子女不支付任何抵免。年龄段就是各州划线的年龄，各年龄段的子女人数也是劳动所得税抵免所计算的人数。',
        },
        {
          q: '这是我要缴的金额吗？',
          a: '这是扣除抵免之前、扣除年内已缴税款之前的税额。报税时会加上抵免，加上没有通过工资计税的其他收入，并减去已经缴纳的部分。',
        },
      ],
      sources: [
        {
          label: 'IRS — Rev. Proc. 2025-32，2026 纳税年度通胀调整',
          url: 'https://www.irs.gov/irb/2025-45_IRB',
        },
        {
          label: 'IRS — Tax Topic 505，预扣税和预估税款',
          url: 'https://www.irs.gov/taxtopics/tc505',
        },
        {
          label: 'IRS — Tax Topic 611，所得税',
          url: 'https://www.irs.gov/taxtopics/tc611',
        },
        {
          label: 'Tax Foundation — State Individual Income Tax Rates and Brackets, 2026',
          url: 'https://taxfoundation.org/data/all/state/state-income-tax-rates-2026/',
        },
        {
          label: 'Tax Foundation — Facts & Figures 2026，截至 2026 年 4 月 28 日的各州个人所得税税率',
          url: 'https://taxfoundation.org/data/all/state/2026-state-tax-data/',
        },
      ],
      relatedGuides: [
        {
          slug: 'income-tax-calculator-explained',
          title: '联邦所得税是如何计算的',
        },
      ],
    },

    'debt-payoff': {
      name: '还债计算器',
      title: '还债计算器：雪崩法和雪球法',
      description:
        '比较同时偿还多笔债务的方式：只还最低额、雪崩顺序和雪球顺序，显示还清所有债务所需的月数和节省的利息。',
      short: '同时偿还多笔债务，并比较还款顺序。',
      category: '债务',
      methodNote:
        '模型是逐月模拟：利息按月初余额计算，每笔尚未还清的债务支付各自的最低还款，剩下的钱用于读者选择的那笔债务。',
      fields: {
        debtName: '债务',
        balance: '余额',
        rate: '利率',
        minimum: '最低还款',
        addDebt: '添加一笔债务',
        removeDebt: '删除这笔债务',
        extraPayment: '每月额外还款',
        extraPaymentHint: '在所有最低还款之外',
      },
      terms: {
        strategies: {
          minimum: '只还最低额',
          avalanche: '雪崩法',
          snowball: '雪球法',
        },
        orderHints: {
          avalanche: '利率最高的先还',
          snowball: '余额最小的先还',
        },
      },
      result: {
        headlineLabel: '节省的利息',
        interestSaved: '与只还最低额相比节省的利息',
        monthsToFree: '还清所有债务所需月数',
        totalInterest: '利息总额',
        totalPaid: '还款总额',
        minimumOnly: '只还最低额',
        avalanche: '雪崩法',
        snowball: '雪球法',
        minimumsNeverCover: '永远还不清',
        minimumsNeverCoverNote:
          '这些债务中至少有一笔每月产生的利息超过了还款所能覆盖的金额，所以该余额不降反升。一次永远还不清债务的模拟没有完整的还款计划，因此不报告月数和利息：这些数字描述的会是模拟的终点，而不是债务本身。',
        note:
          '雪崩法先还利率最高的，利息花费最少。雪球法先还清余额最小的，那笔债务结束得更早。两者之间的差额就是顺序的代价。',
      },
      resultNote:
        '三次模拟使用相同的债务和相同的额外还款。唯一改变的是额外资金投入的顺序。',
      chart: {
        title: '每种顺序下的余额',
        note: '永远还不清债务的模拟不显示：它的余额不降反升，这条线的形状描述的会是模拟的终点，而不是还款计划。有额外还款的那条线会降到零。',
        xAxis: 'years',
        series: [
          { key: 'avalanche', label: '雪崩法' },
          { key: 'snowball', label: '雪球法' },
          { key: 'minimumOnly', label: '只还最低额' },
        ],
      },
      formula:
        '当月利息 = 月初余额 × 年利率 ÷ 12；每笔未还清的债务支付各自的最低还款，先还利息，后还本金；剩下的钱用于顺序所指向的那笔债务',
      method: [
        '计算是逐月模拟。每个月初，利息按余额计算并加到余额上。当月可用的钱是所有最低还款之和加上左侧输入的额外还款。每笔仍有余额的债务支付各自的最低还款，这笔还款先覆盖利息，再覆盖本金。',
        '一笔还清的债务不再需要最低还款，这笔最低还款会并入流向下一笔债务的资金。这就是不同顺序产生差别的机制：同样的月度金额用在不同的债务上，会让不同的余额更早结束。',
        '雪崩顺序把额外资金先用于利率最高的债务。它的利息花费最少，因为它终止的利息是读者所付的最贵的钱。',
        '雪球顺序把额外资金先用于余额最小的债务。总体上它的利息花费更多，但会更早还清一个账户，这是另一种结果。计算器同时显示两者以及各自节省的利息，以便在相同的数字上比较。',
      ],
      limits: [
        '它不模拟浮动利率。浮动利率的信用卡会随指数变动而改变利息，而这里的还款计划假设利率保持在输入值。',
        '它不计算费用：滞纳金、余额转移费和信用卡年费都不在总额之内。',
        '它按月计息。按日复利的信用卡一年下来收取的会稍多一些，所以信用卡余额的真实数字通常比这里略高。',
        '它不计算利息的税务处理，有些债务的利息可以扣除，有些则不能。',
        '它不模拟最低还款的变化，贷款机构有时会因困难而降低最低还款，有时会随余额下降而提高。',
      ],
      faq: [
        {
          q: '雪崩法和雪球法有什么区别？',
          a: '只有顺序不同。雪崩法把额外资金先用于利率最高的债务，雪球法先用于余额最小的债务。两次模拟中的债务、最低还款和额外还款都相同。',
        },
        {
          q: '哪一种节省的钱更多？',
          a: '在利息上，雪崩法更省。额外资金先终止最贵的债务，所以在债务的整个存续期内产生的利息更少。计算器会列出每种顺序节省利息的差额。',
        },
        {
          q: '既然雪球法花费更多，为什么还存在？',
          a: '它先还清余额最小的债务，所以有一笔余额会更早归零。这是与利息所衡量的不同的结果，计算器同时显示两者，以便在相同的数字上比较。',
        },
        {
          q: '利息是怎么计算的？',
          a: '按每个月初的余额、以年利率除以十二计算，并加到余额上。然后还款先用于这部分利息，再用于本金。',
        },
        {
          q: '还清的债务的最低还款会怎样？',
          a: '它会加到流向下一笔债务的资金里，所以每月用于还债的金额永远不会减少。这就是还清日期比各笔单独计划之和更短的原因。',
        },
        {
          q: '这考虑了按日复利的信用卡吗？',
          a: '没有。模型每月计息一次。每天复利的信用卡一年下来收取的会稍多一些，所以信用卡余额的真实数字通常比这里的略高。',
        },
      ],
      sources: [
        {
          label: 'CFPB — Ask CFPB，消费者问答',
          url: 'https://www.consumerfinance.gov/ask-cfpb/',
        },
        {
          label: 'CFPB — 信用卡工具和消费者指引',
          url: 'https://www.consumerfinance.gov/consumer-tools/credit-cards/',
        },
      ],
      relatedGuides: [
        {
          slug: 'debt-payoff-calculator-explained',
          title: '同时偿还多笔债务是如何运作的',
        },
      ],
    },
  },
};
