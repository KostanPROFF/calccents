/**
 * 网站上每个用户可见的字符串（英文）。
 *
 * 本文件是网站文案的唯一事实来源。同一文件夹下的俄语和
 * 西班牙语词典具有相同的结构，且该对象的类型是它们进行校验的依据，
 * 因此缺失或重命名的键会导致构建失败，而不是发布一个翻译不完整的页面。
 *
 * 指南本身的字符串不在此处。它们位于 `src/content/guides/<locale>/` 下的 MDX 文件中，
 * 因为指南是一篇文章，而文章有其独立的文件。
  */

export const zh = {
  /** 此语言的名称（用该语言表示）。  */
  localeName: '中文',

  /** 网站的简短描述，用于结构化数据和元标签。  */
  tagline: '展示计算过程的财务计算器',
  description:
    '免费的理财计算器，涵盖抵押贷款、租房与买房对比、复利、实发工资、联邦税和债务偿还。显示每一项计算公式。',

  author: {
    role: '作者',
    bio: '从事 IT 基础设施工作——云、CI/CD、基础设施即代码——无法验证的变更不会发布。保持云环境精简和交付流程快速是日常工作；本网站也遵循同样的标准。计算过程集中在一处，公式由单元测试覆盖，并与公布的贷款数据核对，所有外部来源的数据都标注了来源和读取日期。编写指南并维护计算引擎。',
  },

  reviewer: {
    role: '财务审核员',
    bio: '在指南发布前阅读其中的财务内容：数据、其背后的假设以及来源。作者构建计算引擎；审核员从另一侧读取结果，即从处理金钱而非代码的人的角度。她的名字仅出现在她审核过的指南上。',
  },

  nav: {
    tools: '工具',
    guides: '指南',
    sources: '来源',
    about: '关于',
  },

  footer: {
    taglineNote:
      '每个公式都已列出，每个假设都由您决定。',
    calculatorsHeading: '计算器',
    siteHeading: '网站',
    calculators: {
      'mortgage-payment': '抵押贷款还款',
      'rent-vs-buy': '租房与买房',
      'compound-interest': '复利',
      'net-pay': '实发工资',
      'income-tax': '联邦所得税',
      'debt-payoff': '债务偿还',
    },
    links: {
      guides: '指南',
      sources: '来源',
      'editorial-team': '编辑团队',
      about: '关于',
      contact: '联系方式',
      privacy: '隐私',
      terms: '条款',
    },
    cookieSettings: 'Cookie 设置',
    note:
      '{name} 发布计算结果和说明，而非财务建议。这些工具展示了数字背后的算术逻辑以及算术背后的假设。它们不会评估您的个人情况，也不会建议您采取任何行动。工具生成的每个数字都取决于您提供的输入——在依赖任何结果之前，请阅读相关假设。© {founded}–{year} {name}。',
  },

  /** 出现在多个页面上的字符串。  */
  ui: {
    skipToContent: '跳转到内容',
    home: '首页',
    breadcrumb: '面包屑导航',
    primaryNav: '主要',
    lastChecked: '最后检查时间',
    by: '作者',
    whereNumbersComeFrom: '数据来源',
    minRead: '{n} 分钟阅读',
    guidesCount: (n: number) => `${n} 篇指南`,
    calculate: '计算',
    open: '打开',
    allGuides: '所有指南 →',
    readTheGuide: '阅读指南',
    guidesThatGoDeeper: '深入指南',
    commonQuestions: '常见问题',
    howThisIsCalculated: '计算方法',
    whatThisCalculatorDoesNotDo: '此计算器无法实现的功能',
    sources: '来源',
    sourcesNote: '这些是本指南中数字和方法背后的原始来源。',
    calculatorsBehindThisGuide: '本指南所涉及的计算器',
    published: '发布日期',
    lastReviewed: '最后审核日期',
    reviewedBy: '审核人',
    language: '语言',
    switchTheme: '切换主题',
    switchToLight: '切换至浅色主题',
    switchToDark: '切换至深色模式',
    /*
      Shown under a field the site filled in from the region the request came
      from. The state is a default, not a fact about the reader, and the
      sentence says so.
    */
    detectedFromIp:
      '系统根据您的 IP 地址检测所在州，结果仅供参考：使用 VPN、代理或移动网络可能会导致检测结果有误。该字段可手动编辑。',
  },

  newsletter: {
    emailAddress: '电子邮箱地址',
    note: '每封邮件都可一键退订。邮箱地址仅用于此邮件通讯。',
    placeholder: 'you@example.com',
    subscribe: '订阅',
  },

  home: {
    title: 'Calccents — 展示计算过程的财务计算器',
    description:
      '免费的理财计算器，涵盖抵押贷款月供、租房与买房对比、复利、实发工资、联邦所得税和债务偿还。每个结果都附有完整公式和数据来源。',
    socialDescription:
      '免费计算抵押贷款、租房与买房、复利、实发工资、税款和债务。每个公式和数据来源都公开可查。',
    eyebrow: '财务计算器',
    heading: '决策前先算清账',
    lede: '免费工具，助您计算抵押贷款、租赁、工资单和债务的算术结果。每个公式都已列出，所有假设均由您设定，页面绝不会告诉您如何处理计算结果。',
    cta: '浏览计算器',
    calculatorsEyebrow: '计算器',
    calculatorsHeading: '六个问题，六组数字',
    workHeading: '每个数字都有计算过程',
    workPoints: [
      '公式与答案并列，以通俗语言和符号呈现。',
      '每个数字的来源和日期都有据可查。',
      '每个工具都会在结果下方以相同的措辞说明其局限性。',
    ],
    workLink: '网站构建方式 →',
    sampleMonthlyPayment: '月供',
    samplePrincipalAndInterest: '本金与利息',
    samplePropertyTax: '房产税',
    sampleTotalInterest: '利息总额',
    calcTitle: '试算一下：每月抵押贷款还款额',
    calcHomePrice: '房屋价格',
    calcDown: '首付款',
    calcRate: '利率',
    calcTerm: '期限',
    calcYears: '{n} 年',
    calcMonthly: '每月本金和利息',
    calcLoan: '贷款金额',
    calcTotalInterest: '利息总额',
    calcOpen: '打开完整计算器',
    calcNote: '仅本金和利息。财产税、保险和 HOA 费用包含在完整计算器中。',
    statCalculators: '计算器',
    statGuides: '附带计算过程的指南',
    statLanguages: '语言',
    statSignups: '使用任何功能无需注册',
    guidesEyebrow: '指南',
    guidesHeading: '书面化的算术过程',
    newsletterHeading: '将计算结果发送到您的收件箱',
    newsletterLede:
      '当新计算器上线或现有计算器经过重新审核时，发送一封简短的邮件。',
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
    mortgagePayment: '随时间减少的抵押贷款余额，以及同时支付的利息',
    rentVsBuy: '两条交叉的线：租房成本与购房成本的对比',
    compoundInterest: '随着复利效应而加速增长的余额',
    netPay: '将总收入拆分为实得工资和各项扣除额的柱状图',
    incomeTax: '一叠税阶，每一阶都比上面的一阶更宽',
    debtPayoff: '两组柱状图，分别对应两种不同的债务清偿顺序',
  },

  heroVisual: {
    label: '月供',
    caption: '一个计算示例，绘制方式与计算器显示的一致。',
  },

  /*
   * The labels around a result chart.
   *
   * The chart itself is drawn as inline SVG from the numbers the calculator
   * has already worked out, so nothing is re-computed for the picture and
   * the picture cannot disagree with the figures above it.
   */
  chart: {
    months: '月',
    years: '年',
    start: '现在',
    end: '结束',
    empty: '一旦有可绘制的数值，图表就会自动填充。',
  },

  toolsIndex: {
    title: '免费财务计算器',
    description:
      '六个免费计算器：房贷月供、租房还是买房、复利、税后工资、联邦所得税和还债计划。每个都列出所用公式。',
    heading: '免费财务计算器',
    lede: '每个计算器都展示了其使用的公式，列出了结果背后的假设，并明确说明了其功能范围。查看任何结果都不需要提供电子邮件地址或注册。',
    whatTheseAre: '这些工具是什么',
    whatTheseAreBody: [
      '这些是算术工具。它们使用您提供的数字，应用已发布的公式，并将计算结果连同运算过程一起返回。此处的抵押贷款计算器不知道您的信用评分、收入或本周哪家贷款机构提供了什么优惠，它也不会尝试进行猜测。',
      '原因很简单：你自己核对出的数字，比别人为你选定的数字更有价值。这里的每一个工具都展示了符号形式的公式，链接到了该方法背后的原始来源，并标注了审查日期，以便你查看它最后一次被核对的时间。',
    ],
  },

  guidesIndex: {
    title: '指南',
    description:
      '十八篇指南，讲解房贷、租房与买房、复利、工资、所得税和债务背后的算术，每篇都附有公式、假设和来源。',
    heading: '指南',
    lede: '对计算器背后的算术原理和假设的深入解释。每一份指南都展示了公式，链接到了原始来源，并标注了审查日期。',
    missingHeading: '缺少内容？',
    missingBody:
      '指南是围绕读者觉得最难理解的算术原理编写的。如果这里没有涵盖某个金融概念，请告诉我们是哪一个，以及它哪里让你感到困惑。',
    suggestTopic: '建议主题',
    groups: {
      home: '住房与抵押贷款',
      money: '工资、税款与债务',
      renting: '租房与拥有房产',
      investing: '投资',
    },
  },

  guide: {
    sourcesTitle: '来源',
    sourcesNote: '这些是本指南中数字和方法背后的原始来源。',
  },

  about: {
    title: '关于',
    description:
      '本网站的性质、构建方式以及它所遵循的规则，旨在确保网站上的每一个数字都可以被核对。',
    heading: '关于 {name}',
    lede: '{name} 发布金融计算器及其背后的解释。这是一个目标明确的小型网站：生成一个您可以核对的数字，并向您展示得出该数字的计算过程。',
    isHeading: '本网站的定位',
    isBody: [
      '包含六个计算器、十八篇指南及其背后的主要来源。这些计算器使用您提供的数据并应用已发布的公式：抵押贷款的摊销公式、租房与买房的逐月现金对比、储蓄余额的复利公式，以及偿还债务、所得税和实发工资的算术计算。',
      '本网站靠展示广告维持运营，这决定了它的构建方式。页面加载迅速、JavaScript 很少，所以计算器在旧手机上和在电脑上一样快。没有任何计算器要求提供电子邮件地址，也没有任何结果需要注册才能查看。',
    ],
    isNotHeading: '本网站不提供的内容',
    isNotBody: [
      '它不是经纪公司，不接受申请，也不会从任何点击行为中赚取佣金。这里没有赞助位、联盟链接或潜在客户表单。广告仅为展示广告，这意味着读者访问所带来的唯一收益就是读者的注意力。',
      '这里的任何工具都不会评估您的个人情况。如果抵押贷款计算器返回“首付 20%”这样的建议，那在大多数情况下是错误的，因为正确的答案取决于页面无法获知的情况：您的其他储蓄、您的工作以及您对财务状况波动的承受能力。因此，每个工具都只负责计算，到此为止。',
    ],
    rulesHeading: '本网站遵循的规则',
    rules: [
      {
        label: '每个工具都会说明其局限性。',
        body: '在每个结果下方都有一个区块，列出了该工具无法实现的功能，且每页的措辞完全相同。',
      },
      {
        label: '每一个来自外部的数据都有其来源。',
        body: '指南会链接到主要来源，并标注数据读取的日期。本网站自身的计算过程会完整展示。',
      },
      {
        label: '每个页面都标注了审查日期。',
        body: '如果一篇指南很久没有更新，页面会予以说明。',
      },
      {
        label: 'AI 起草，人工审核。',
        body: '起草工具协助撰写文字。每一篇发布的页面都经过人工阅读，核对了算术、单位和声明。',
      },
    ],
    whoHeading: '谁在运营此网站',
    whoBody:
      '{name}。{bio} {reviewerName} 会在指南发布前审阅其中的财务内容。{whoEditorialLink} 列出了页面上线前审核的内容，而 {whoCodeLink} 则涵盖了公式、单元测试以及阻止发布损坏页面的检查机制。',
    whoEditorialLink: '编辑页面',
    whoCodeLink: '代码公开',
    howHeading: '计算器的工作原理',
    howBody:
      '算术运算在您的浏览器中运行。没有服务器会接收您输入的数字，计算过程中的任何信息都不会发送给任何人。公式在同一处实现一次，并由单元测试覆盖，这些测试会根据已知的已发布贷款数据以及数学要求的恒等式进行核对——即还款计划表总额等于借款金额、贷款结清时余额恰好为零、无息余额仅随存款增加。',
    correctionsHeading: '更正',
    correctionsBody:
      '如果某个数字有误、来源链接失效或页面前后矛盾，这属于缺陷，应当予以修复。{contactLink} 说明了如何报告此类问题，每一次更正都会导致审核日期更新，而不是进行无声的编辑。',
    contactLink: '联系页面',
  },

  contact: {
    title: '联系方式',
    emailLine: '发送电子邮件至 {email}。',
    description:
      '关于如何就错误的数字、失效的链接、缺失的主题或广告问题联系本网站。',
    heading: '联系方式',
    lede: '一个地址，由专人阅读。回复需要几天时间，在页面发布后的最初几周通常会更久。',
    worthHeading: '值得写的内容',
    worth: [
      {
        label: '错误的数字。',
        body: '如果页面上的数字与您的计算结果不符，请发送您使用的输入数据以及您得出的数字。这是一个缺陷，我们会进行核查。',
      },
      {
        label: '损坏或失效的来源链接。',
        body: '我们会定期检查来源，但链接可能会在两次检查之间失效。',
      },
      {
        label: '缺失的主题。',
        body: '指南是围绕读者认为最难的算术编写的，因此缺失的主题通常意味着该算术部分存在空白。',
      },
      {
        label: '广告问题。',
        body: '如果广告具有误导性、导致页面损坏或遮挡内容，请务必举报。本网站由展示广告资助，因此我们会认真对待此类报告。',
      },
    ],
    nextHeading: '接下来会发生什么',
    nextBody:
      '我们会根据来源核对被举报的数字，如果数字有误，页面将会更改。无论内容是否发生变化，页面上的审查日期都会在内容被核查时更新，因此该日期显示的是专人最后一次阅读该页面的时间。',
  },

  /**
   * The contact form.
   *
   * The statuses are keyed rather than ordered, because the script picks
   * one by key and the page carries all of them.
   */
  contactForm: {
    heading: '写信',
    lede: '该表单会将消息发送给本网站的负责人，回复将发送至您在此处填写的地址。',
    nameLabel: '您的姓名',
    emailLabel: '您的电子邮件地址',
    subjectLabel: '关于什么',
    messageLabel: '您的留言',
    submit: '发送留言',
    note: '留言将通过电子邮件发送并由专人阅读。',
    statuses: [
      { key: 'sent', text: '留言已发送。回复将发送至您填写的地址。' },
      { key: 'email', text: '该电子邮件地址看起来不完整。请检查后重新发送留言。' },
      { key: 'fields', text: '每个字段都需要填写内容。' },
      { key: 'rate', text: '该地址在短时间内发送了多条留言。请稍候片刻再发送。' },
      { key: 'failed', text: '留言未能发送。请改用上述地址写信。' },
    ],
  },

  sourcesPage: {
    title: '来源',
    description:
      '本网站用于计算数据和方法的所有主要来源，以及它们在此处的原因。',
    heading: '来源',
    lede: '本网站上的每一个数字均来自以下机构之一，或来自本网站完整展示的算术运算。没有任何内容引用自博客文章、摘要或二次转述。',
    whyHeading: '为什么需要来源列表',
    whyBody: [
      '没有来源的数字只是断言。这些页面是为那些想要亲自核对算术的人编写的，而这只有在原始数据触手可及的情况下才有效。因此，每篇指南都有自己的来源列表，而此页面是所有来源的索引。',
      '本网站遵循的规则是有意设定的：仅限于政府机构、证券监管机构、中央银行和抵押贷款政府支持企业（GSE）。如果数据来自商业调查，页面会明确说明并注明调查名称。',
    ],
    howHeading: '如何使用来源',
    how: [
      {
        label: '方法和公式',
        body: '来自发布该方法的机构。摊销公式载于消费者金融保护局（CFPB）的指南中；复利频率规则来自美国证券交易委员会（SEC）的术语表；税收起征点来自美国国税局（IRS）的年度通胀调整。',
      },
      {
        label: '已发布统计数据',
        body: '来自发布它们的统计机构，并附有读取该数字的日期。',
      },
      {
        label: '市场利率',
        body: '来自发布它们的调查，并在页面上注明日期，因为不同月份的利率是不同的数字。',
      },
      {
        label: '州级数据',
        body: '数据来自 Tax Foundation，该机构根据各州的法规和表格汇编所得税税率表，并根据其发布的 American Community Survey 汇编房产税税率。户主税率表、已缴联邦所得税扣除额和州税收抵免来自各州提交的申报表及相关说明。',
      },
    ],
    sources: [
      {
        label: '消费者金融保护局（CFPB）——抵押贷款、消费信贷',
        url: 'https://www.consumerfinance.gov/',
      },
      {
        label: '美国国税局（IRS）——税率等级、通胀调整、退休规则',
        url: 'https://www.irs.gov/',
      },
      {
        label: '社会保障局（SSA）——工资税率、工资基数、年度限额',
        url: 'https://www.ssa.gov/',
      },
      {
        label: '房地美（Freddie Mac）——主要抵押贷款市场调查',
        url: 'https://www.freddiemac.com/pmms',
      },
      {
        label: '房利美（Fannie Mae）——研究与市场评论',
        url: 'https://www.fanniemae.com/research-and-insights',
      },
      {
        label: '住房和城市发展部（HUD）——FHA、HECM、公平住房',
        url: 'https://www.hud.gov/',
      },
      {
        label: '劳工统计局（BLS）——消费者价格指数',
        url: 'https://www.bls.gov/cpi/',
      },
      {
        label: '联邦储备委员会 — 利率数据 (H.15)',
        url: 'https://www.federalreserve.gov/releases/h15/',
      },
      {
        label: 'Securities and Exchange Commission (SEC) — Investor.gov',
        url: 'https://www.investor.gov/',
      },
      {
        label: '圣路易斯联邦储备银行 (FRED) — 经济数据系列',
        url: 'https://fred.stlouisfed.org/',
      },
      {
        label: '美国劳工统计局 — CPI 计算器和数据表',
        url: 'https://www.bls.gov/data/',
      },
      {
        label: '税务基金会 — 2026 年各州个人所得税税率及税阶',
        url: 'https://taxfoundation.org/data/all/state/state-income-tax-rates-2026/',
      },
      {
        label: '税务基金会 — 2026年各州及各县房产税',
        url: 'https://taxfoundation.org/data/all/state/property-taxes-by-state-county/',
      },
      {
        label: '税务基金会 — 2026 年事实与数据，截至 2026 年 4 月 28 日的各州个人所得税税率',
        url: 'https://taxfoundation.org/data/all/state/2026-state-tax-data/',
      },
      {
        label: '美国州立法会议 (NCSL) — 各州劳动所得税抵免和子女税收抵免',
        url: 'https://www.ncsl.org/human-services/',
      },
      {
        label: '税务政策中心 — 各州所得税税率与抵免额',
        url: 'https://taxpolicycenter.org/',
      },
      {
        label: '产前至3岁政策影响中心——各州儿童税收抵免政策',
        url: 'https://pn3policy.org/',
      },
    ],
  },

  editorial: {
    title: '编辑团队',
    description:
      '谁撰写了这些指南，谁负责审核，以及页面发布前审核的具体内容。',
    heading: '编辑团队',
    lede: '由一人撰写指南。另一人在指南发布前审核其中的财务内容。本页面介绍了他们是谁、审核的内容，以及您可以自行核对的事项。',
    authorEyebrow: '作者',
    reviewerEyebrow: '财务审核员',
    checkEyebrow: '您可以核对的内容',
    checkHeading: '计算过程公开透明',
    checkBody:
      '每个计算器背后的代码均存放于公开的代码库中，包括其所采用的公式、用于对照已知公开数据进行验证的单元测试，以及防止发布错误页面的检查机制。您无需盲目相信计算结果，也无需询问。',
    openRepository: '打开代码库',
    twoNamesHeading: '两个名字，两项工作',
    twoNamesBody: [
      '一个名字负责撰写指南并维护计算引擎。另一个名字在指南发布前阅读其财务内容，核对数据、背后的假设以及来源。这两项工作是特意分开的：撰写指南的人并非最终审阅指南的人。',
      '如果指南中列出了审阅者，则该人即为审阅者，其名字仅出现在该指南上，不会出现在其他地方。审阅是对特定页面的说明，因此它附属于该页面，而非整个网站。',
      '本页面的其余部分描述了审阅的内容，以及读者无需询问任何人即可自行核实的内容。',
    ],
    reviewHeading: '审阅内容',
    reviewIntro:
      '在指南发布之前，审阅者每次都会按照相同的清单进行核对：',
    review: [
      {
        label: '算术。',
        body: '每个公式都根据其来源进行了核对，文中的示例计算过程也经过了重新推算。当代码中出现数值时，会将两者进行比对。',
      },
      {
        label: '单位。',
        body: '百分比与小数、月与年、美元与千位。财务文档中的大多数错误都是单位错误。',
      },
      {
        label: '边界情况。',
        body: '零利率、零期限、负值。每一项都经过检查，以确保得出合理的答案，而不是错误信息。',
      },
      {
        label: '措辞。',
        body: '页面不得告诉读者该怎么做。它只解释数字的含义及其依赖因素，仅此而已。任何建议采取行动的指南都会被重写。',
      },
      {
        label: '来源。',
        body: '每个链接都会被打开、核实其所附带的主张，并标注日期。',
      },
    ],
    toolsHeading: '如何使用起草工具',
    toolsBody: [
      '起草工具用于辅助撰写文章。它们不会决定页面内容。每一个数字、每一个公式和每一个主张都由专人撰写或核实，没有经过上述审查的页面不会发布。能够生成看似合理但错误数字的工具，正是此流程旨在发现的问题。',
      '发现错误的检查机制不仅依靠人工。计算引擎设有单元测试，在每次更改时运行，如果数字发生变动则会阻止发布：还款计划表必须加总至借款金额，贷款必须在结束时正好归零，且分期预测必须在每个复利频率下与封闭式公式一致。文章段落不会以这种方式出错，但公式可能会，一旦出错，构建过程就会停止。',
    ],
    datesHeading: '审查日期',
    datesBody:
      '每篇指南都标有上次审查的日期。内容依赖外部数据的指南每年至少审查两次；解释算术的指南在背后的公式发生变化时进行审查，且无论如何每年至少审查一次。当页面被审查时，日期会更新，无论文本是否发生变化，因此该日期告知您某人上次阅读该页面的时间。',
    correctionsHeading: '更正',
    correctionsBody:
      '修正过程是公开的。已修正的页面会更新其审核日期，并在其来源的联系讨论串中说明修正内容。如果指南中的数字有误，那是审核环节的缺陷，而非写作问题，审核流程即是改进的途径。',
    contactLink: '联系',
  },

  privacy: {
    title: '隐私',
    description:
      '本网站收集什么信息、不收集什么信息，以及页面上出现了哪些广告和分析服务提供商。',
    heading: '隐私',
    lede: '简而言之：您输入计算器的数字会保留在您的浏览器中，本网站本身不会保留任何追踪 Cookie。',
    calculatorsHeading: '计算器如何处理您的输入',
    calculatorsBody:
      '不做任何处理。算术运算在您的浏览器中通过随页面下载的 JavaScript 执行。您输入的值不会传输到任何地方，不会被存储，也不会被本网站或任何其他人看到。关闭标签页即会丢弃这些数据。',
    stateHeading: '您所在的州',
    stateBody:
      '有两个计算器需要州信息：联邦所得税计算器（在联邦税基础上增加州所得税）和租房与买房计算器（将房产税计入购房成本）。当您打开这些页面时，系统会询问本网站请求来自哪个州。答案来自提供本网站的网络，该网络通过请求地址读取州信息，并将其用于自动填充一个字段。除此之外不会进行任何其他操作：该答案不会被存储，不会写入 Cookie，也不会发送给 Google 或托管服务商的页面分析工具。该州信息仅为近似值——VPN、代理服务器或移动网络可能会导致定位错误——且该字段可以更改或清除，在这种情况下，页面将保留您输入的数据。',
    cookiesHeading: 'Cookie',
    cookiesBody:
      '{name} 本身不设置任何 Cookie。本网站的自有分析功能运行在 Google Analytics 4 上，由 Google 从其自有域名提供，并在您的浏览器中存储第一方标识符，以便区分不同访问。该标识符不用于广告，也不会与其他网站共享。托管服务商的页面分析工具不会在您的浏览器中存储任何内容：没有 Cookie、没有本地存储，也没有任何类型的标识符。',
    advertisingHeading: '广告',
    advertisingBody:
      '本网站由 Google AdSense 提供的展示广告资助。Google 及其合作伙伴可能会设置 Cookie 或使用类似技术来投放和衡量广告，并可能利用这些技术根据您之前对本网站或其他网站的访问记录来投放广告。您可以在 {adsSettingsLink} 查看并更改您的选择，Google 关于其如何使用使用其服务的网站和应用数据的说明请见 {policiesLink}。',
    adsSettingsLink: 'Google Ads Settings',
    policiesLink: 'policies.google.com',
    analyticsPoliciesLink: 'policies.google.com',
    analyticsHeading: '分析',
    analyticsBody:
      '页面浏览量通过 Google Analytics 4 记录，相关服务由 Google 通过 googletagmanager.com 提供。所用数据仅限于页面、引流来源以及粗略到国家或城市级别的位置；IP 地址会被截断，而不是完整存储。这些数据用于统计访问次数和了解哪些页面被阅读。Google 对其如何使用来自网站和应用的服务的说明见 {analyticsPoliciesLink}。该脚本以同意模式（Consent Mode）在每个页面上运行。对于欧洲经济区、英国或瑞士的读者，它在启动时关闭 Cookie：在您于 Google 的同意消息中表示同意之前，或在您拒绝之后，它不会设置或读取任何 Cookie，只向 Google 发送页面已被浏览的无 Cookie 信号，不带任何能把一次访问与下一次访问关联起来的标识符；Google 利用这些信号估算无法直接统计的访问。同意后，分析功能会启用其 Cookie。在其他国家和地区，分析 Cookie 从第一个页面起即已启用。',
    hostingAnalyticsHeading: '托管与页面性能',
    hostingAnalyticsBody:
      '本网站托管在 Cloudflare 上，Cloudflare 自有的网络分析会在每个页面上运行。由 static.cloudflareinsights.com 提供的小脚本会测量页面浏览情况：打开了哪个页面、访问来自哪里、使用了哪种浏览器和操作系统、请求来自哪个国家，以及页面加载用了多长时间。IP 地址在 Cloudflare 的边缘节点用于判断国家，并在那里丢弃，而不是存储。该脚本不设置 Cookie、不向本地存储写入任何内容，也不创建可能跨页面追踪您的标识符。它输出的数据包括页面浏览量和访问次数统计，以及页面加载速度。由于它不存储任何内容，因此无需等待 Cookie 询问。欧盟读者完全不会被统计：不会为其加载该脚本。',
    newsletterHeading: '简报',
    newsletterBody:
      '如果您订阅了简报，您输入的地址将被发送至负责发送邮件的服务商 Buttondown，并存储在那里以便发送简报。该地址仅用于简报，不会用于其他任何用途，且每一期简报都包含退订链接。',
    contactHeading: '联系表单',
    contactBody:
      '如果您通过联系表单发送消息，您的姓名、电子邮件地址、主题和消息内容将通过电子邮件发送给网站运营者，并保存在该邮箱中。该表单由本网站提供，回复将发送至您填写的地址，以便您继续对话。该表单不会向 Google 发送任何信息，也不会设置任何自有 Cookie；上述广告和分析属于整个页面，按下文所述的选择运行。您输入的内容不会存储在本网站上，消息也不会传递给任何第三方。',
    thirdPartyHeading: '第三方链接',
    thirdPartyBody:
      '指南链接至原始来源——政府机构、美国证券交易委员会（SEC）和美联储。这些网站拥有各自的隐私政策，本网站无法控制，也未曾代您阅读。',
    changesHeading: '变更',
    changesBody:
      '如果上述提供商发生变动，本页面也会随之更新。页面底部的日期为本内容最后一次审核的日期。',
    consentHeading: '您的选择',
    consentBody:
      'Cookie 询问由 Google 的同意消息提出，这是一个通过 IAB 透明度与同意框架（Transparency and Consent Framework）认证的同意管理平台，并且只在法律要求的地区显示：欧洲经济区、英国和瑞士。在这些地区，在您作答之前，Google Analytics 不会设置 Cookie，Google 会根据您的回答投放广告；您的回答由 Google 的消息保存在您的浏览器中，页脚的“Cookie 设置”链接可以再次打开它。在其他地区不会提出这一询问：广告和分析 Cookie 从第一个页面起即运行，您可以在 Google 广告设置中更改 Google 个性化广告的方式。无论哪种情况，托管服务商的页面分析都不会为欧盟读者加载。上文所述的州信息只在两个计算器页面上读取，不属于这一选择：不会为它设置 Cookie，也不会有任何相关信息发送给分析服务商。',
    lastReviewed: '最后审查日期：{date}。',
  },

  terms: {
    title: '条款',
    description:
      '本网站的发布条款、计算器涵盖与不涵盖的范围，以及本网站所能承诺的限度。',
    heading: '使用条款',
    lede: '针对发布计算而非建议的网站所制定的简明条款。',
    providesHeading: '本网站提供的内容',
    providesBody:
      '{name} 发布计算器以及其背后算术逻辑的书面解释。计算器将已发布的公式应用于您提供的值，并返回结果及计算过程。这就是本服务的全部内容。',
    notProvidesHeading: '本网站不提供的内容',
    notProvidesBody: [
      '此处内容不构成任何财务、税务、法律或投资建议，也不构成购买、出售、持有、租赁、拥有、再融资或签署任何文件的建议。计算结果仅反映您输入的数值及页面所使用的公式。更改输入值，结果即会随之改变；这正是计算而非结论的本质所在。',
      '计算器无法获知您的财务状况、收入、信用、时间跨度或风险承受能力，也不会对此进行猜测。两个输入相同但处境不同的人会得出不同的结论，而计算器无法判断谁的结论是正确的。',
    ],
    figuresHeading: '数据、来源与日期',
    figuresBody:
      '若数据来自外部来源，页面会提供该来源的链接并注明读取日期。外部数据会发生变化：税收起征点、已发布利率和官方统计数据均会修订。页面上的数据仅在页面标注的审查日期当天准确，此后不再保证准确；提供审查日期是为了让您了解数据的时效性。',
    errorsHeading: '错误',
    errorsBody:
      '本站的计算逻辑均经过统一编写与测试。即便如此，仍可能存在错误。如果您发现错误，请通过联系页面说明如何报告，报告的缺陷经修复后，页面审查日期将会更新。',
    advertisingHeading: '广告',
    advertisingBody:
      '本网站由展示广告提供资金支持。广告由第三方投放，本网站无法控制。广告均有明确标注，并与本站内容区分开来。没有任何广告商为页面、广告位、搜索结果中的排名或指南中提及的产品支付费用。',
    useHeading: '网站使用',
    useBody:
      '本网站仅供个人使用。您可以阅读、打印及链接本网站。您不得将指南中的实质性内容作为自己的作品重新发布，也不得利用这些计算器构建与本网站竞争的产品。',
    changesHeading: '变更',
    changesBody:
      '这些条款可能会随网站的更新而改变。下方的审查日期即为本段文字最后一次审阅的日期。',
    lastReviewed: '最后审查日期：{date}。',
    contactLink: '联系页面',
  },

  notFound: {
    title: '页面未找到',
    description: '该页面在本网站上不存在。以下是本站所有内容的存放位置。',
    heading: '页面未找到',
    lede: '该网址在此处不存在。本站发布的所有内容均为三个计算器之一、其背后的指南，或解释数字来源的页面。',
    calculators: {
      title: '计算器',
      text: '抵押贷款还款、租房与买房对比、复利。',
    },
    guides: {
      title: '指南',
      text: '每个计算器背后的详细算术逻辑。',
    },
    sources: {
      title: '来源',
      text: '本站所依赖的每一个主要来源。',
    },
    contact: {
      title: '联系方式',
      text: '告诉我们缺少了什么或哪里有误。',
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
      name: '抵押贷款还款计算器',
      title: '含摊销的抵押贷款还款计算器',
      description:
        '计算您的每月抵押贷款还款额、PITI 总成本以及完整的摊销时间表。查看每一美元的利息，以及额外还款如何提前还清贷款日期。',
      short: '每月本金和利息、含税费和保险的完整月供（PITI）、摊还计划以及额外还款的影响。',
      category: '首页',
      methodNote:
        '以下说明了付款公式、摊销计划以及额外还款的计算方式。本页面上的任何内容均非实时市场报价。',
      fields: {
        homePrice: '房屋价格',
        downPayment: '首付款',
        percentOfPrice: '价格百分比',
        interestRate: '利率',
        annualFixed: '年度，固定',
        loanTerm: '贷款期限',
        propertyTax: '房产税',
        percentOfPricePerYear: '每年价格的百分比',
        homeInsurance: '房屋保险',
        perYear: '每年',
        hoaFee: '业主协会或公寓费用',
        perMonth: '每月',
        extraPrincipal: '额外本金',
        firstPayment: '首次还款',
        month: '月',
        seeAmortization: '查看逐年摊销明细',
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
        headlineLabel: '每月还款总额 (PITI)',
        principalAndInterest: '本金与利息',
        propertyTax: '房产税',
        insurance: '保险',
        hoa: 'HOA',
        totalInterest: '利息总额',
        paidOff: '已还清',
        note: '本金、利息、房产税、保险和业主协会（HOA）费用，基于您输入的数据。',
      },
      resultNote:
        '更改任何字段，数字会随您的输入实时更新。数据不会发送到任何地方：计算过程在当前页面运行。',
      chart: {
        title: '逐年的余额和利息',
        note: '随着贷款的偿还，余额会减少，每年支付的利息也会随之减少。',
        xAxis: 'years',
        series: [
          { key: 'balance', label: '余额' },
          { key: 'interest', label: '已付利息' },
        ],
      },
      formula: 'M = P · r(1 + r)ⁿ / ((1 + r)ⁿ − 1)',
      method: [
        '预定的每月还款额来自标准的摊销公式：',
        'P 是借款金额，本页面将其计算为房价减去首付款。r 是您输入的年利率除以十二，n 是以月为单位的期限。计算器根据这一个数字逐月建立还款计划：利息按月初未偿还的余额计算，还款额在扣除利息后，剩余部分用于减少余额。',
        '每月全额还款为本金和利息之和，加上除以十二后的房产税、除以十二后的保险费以及任何业主协会（HOA）费用。这三项由您自行设定：计算器无法得知您当地的评估额或保险公司的收费，也不会代您进行猜测。',
        '额外的每月还款将用于偿还本金，因此会降低下个月计算利息的余额基数。预定的还款额不会改变，贷款会提前结清，总利息也会减少。',
      ],
      limits: [
        '它不会检查您是否符合贷款资格，也不会查看您的信用评分、收入、债务收入比或任何贷款机构的承销规则。',
        '本页面不提供您所在邮编区域的当前市场利率。您输入的利率即为您使用的利率，本页面上的任何内容均非实时数据。',
        '本页面不模拟私人抵押贷款保险、点数、贷款发放费、过户费，或决定税单所属月份的托管时间安排。',
        '本页面不建议您是否应该买房。它仅提供一个数字及其背后的计算过程。',
      ],
      faq: [
        {
          q: 'PITI 代表什么？',
          a: '本金（Principal）、利息（Interest）、税款（Taxes）和保险（Insurance）。这是每月住房支出的四个组成部分：偿还贷款的部分、支付给贷款方的借款利息、房产税以及房主保险。此计算器将每个部分单独列出，以便您查看各项支出的构成。',
        },
        {
          q: '每月本金和利息支出是如何计算出来的？',
          a: '这是标准的摊销公式：M = P · r(1 + r)ⁿ / ((1 + r)ⁿ − 1)，其中 P 是借入金额，r 是月利率，n 是月度还款次数。随后的还款计划表每月将更多款项分配给本金、较少分配给利息，因此早期还款主要偿还利息。',
        },
        {
          q: '最后一期还款会怎样？',
          a: '预定还款额会四舍五入到最接近的货币单位，这会导致期限结束时剩余几分钱。最后一期预定还款额会进行调整，以确保贷款余额正好结清为零，这与贷款机构调整最终还款额的方式相同。',
        },
        {
          q: '额外还款是缩短贷款期限还是减少还款额？',
          a: '它们会缩短贷款期限。额外还款直接用于偿还本金，从而降低了计算下个月利息的余额基数。预定还款额保持不变，贷款将提前结清，总利息支出也会减少。',
        },
        {
          q: '总利息数字会受到我输入的税款和保险信息的影响吗？',
          a: '不会。总利息仅涵盖贷款本身。房产税、保险和 HOA 费用属于贷款还清后仍需持续支付的住房成本，因此计算器将总住房成本单独列出。',
        },
        {
          q: '计算器是否考虑了通货膨胀？',
          a: '不考虑。所有数字均以您输入的金额为准。30 年后的抵押贷款还款额占收入的比例将远低于今天的同一还款额，本页面上的数字均未对此进行调整。',
        },
      ],
      sources: [
        {
          label: 'CFPB — 如何计算抵押贷款还款额',
          url: 'https://www.consumerfinance.gov/ask-cfpb/how-do-i-calculate-my-mortgage-payment-en-144/',
        },
        {
          label: 'Freddie Mac — 主要抵押贷款市场调查（利率计算方法）',
          url: 'https://www.freddiemac.com/pmms',
        },
        {
          label: 'HUD——FHA 贷款要求和抵押贷款保险',
          url: 'https://www.hud.gov/helping_american_homeowners',
        },
        {
          label: 'BLS — 消费者价格指数（通货膨胀，用于实际价值说明）',
          url: 'https://www.bls.gov/cpi/',
        },
      ],
      relatedGuides: [
        { slug: 'mortgage-payment-calculator-explained', title: '抵押贷款还款计算器详解' },
        { slug: 'how-mortgage-amortization-works', title: '抵押贷款摊销的工作原理' },
        { slug: 'monthly-payment-vs-total-cost-mortgage', title: '抵押贷款月供与总成本对比' },
        { slug: 'extra-mortgage-payments-math', title: '额外抵押贷款还款背后的数学原理' },
        { slug: 'how-to-read-an-amortization-schedule', title: '如何阅读摊销表' },
      ],
    },

    'rent-vs-buy': {
      name: '租房与买房计算器',
      title: '租房与买房计算器：比较实际成本',
      description:
        '通过数据比较租房和买房：月度成本、前期支出、资产净值以及两者成本持平的月份。不提供结论，仅展示计算结果。',
      short: '月度成本、前期支出、资产净值积累以及持平月份。',
      category: '首页',
      methodNote:
        '此比较基于现金流出和资产净值。它特意不提供任何结论——持平月份是基于您输入的数据得出的事实，而非建议。',
      sections: {
        theHome: '自有住房',
        theRent: '租房',
        runningCosts: '运营成本',
        assumptions: '假设条件',
      },
      fields: {
        purchasePrice: '购买价格',
        downPayment: '首付款',
        percentOfPrice: '价格百分比',
        mortgageRate: '抵押贷款利率',
        annualFixed: '年度，固定',
        loanTerm: '贷款期限',
        monthlyRent: '每月租金',
        rentersInsurance: "租房者保险",
        perMonth: '每月',
        propertyTax: '房产税',
        percentOfPricePerYear: '每年价格的百分比',
        homeInsurance: '房屋保险',
        perYear: '每年',
        hoaFee: '业主协会或公寓费用',
        maintenance: '维护费用',
        annualChangeInValue: '年度价值变化',
        negativeModelsAFall: '负数表示下跌',
        compareOver: '比较超过',
        closingCosts: '成交费用',
        percentOfPriceOnce: '% 的价格，一次性',
        sellingCosts: '销售费用',
        percentOfFinalValue: '% 的最终价值',
      },
      terms: {
        years: (n: number) => `${n} 年`,
      },
      result: {
        headlineLabel: '每月差额（拥有减去租赁）',
        monthlyRent: '每月租金',
        monthlyOwnership: '每月拥有成本',
        monthlyOwnershipAfterLoan: '贷款还清后的每月拥有成本',
        upfrontOutlay: '前期支出',
        equityBuilt: '已积累的权益',
        homeValueAtHorizon: '持有期内的房屋价值',
        sellingCostsAtHorizon: '持有期内的销售费用',
        netCostAtHorizon: '持有期内的拥有净成本',
        crossover: '盈亏平衡点',
        note: '拥有房产涵盖了贷款期间的抵押贷款还款，以及之后的房产税、保险、物业费和维护费用。权益等于房屋价值减去尚欠的贷款余额，再减去届时出售房屋所需的销售成本。',
      },
      resultNote:
        '交叉点是指拥有房产的净成本（支付的现金减去出售后留给您的权益）首次低于租房现金成本的月份。这是基于这些数字得出的事实，而非建议。',
      chart: {
        title: '租房成本与拥有房产成本的对比',
        note: '两条线均代表累计现金支出：租金支出，以及扣除房屋增值权益并净去届时出售成本后的房屋支出。',
        xAxis: 'years',
        series: [
          { key: 'rent', label: '已付租金' },
          { key: 'ownership', label: '拥有房产的净成本' },
        ],
      },
      method: [
        '计算器每月并行运行两个账目。租房账目累加您的租金和租客保险。拥有房产账目累加根据标准摊销公式计算的抵押贷款还款额、房产税、保险、物业费和维护津贴，以及首月的首付款和过户费。抵押贷款还款在贷款还清后停止；其他日常费用则在您拥有房屋期间持续存在。',
        "在第二个账目旁边，它会追踪房屋价值（按您输入的年增长率每月增减）以及尚欠的贷款余额。两者的差额即为您的权益：",
        '拥有房产的净成本是您已支付的现金，减去您已建立的权益，再加上届时出售房屋所需的销售成本。交叉月份是指该数字首次低于您在同一时期内支付的租金的月份。销售成本不属于月供的一部分，因为您直到出售时才支付；它们与权益挂钩，在出售发生时计算。',
      ],
      formula: '净值 = 房屋价值 − 剩余贷款余额',
      limits: [
        '它不会说明哪种选择更适合您。这两个方案是根据您提供的数字进行比较的，仅报告交叉月份，不包含其他内容。',
        '它未对出售的税务处理、抵押贷款利息扣除或房产随时间的折旧进行建模。',
        '它不对特定贷款进行定价。您输入的抵押贷款利率即为所用利率；本页面不提供实时报价，也不包含任何贷款机构信息。',
        '它不对房价进行预测。您输入的年度价值变化将按月应用于整个期限，如果您输入负数，则会向相反方向应用。',
        '它不对搬离租赁房屋的成本进行建模。押金、中介费和搬家费用不包含在租赁方的比较中。',
        '它不使用特定县或市的税率。本页面可填写的房产税率为该州的平均水平，而房产税由地方设定，因此一个司法管辖区的税率通常与另一个不同。',
      ],
      faq: [
        {
          q: '交叉月份是什么意思？',
          a: '这是自有住房净成本——即您已支付的现金，减去您已建立的权益，加上此时出售房屋的销售成本——低于您在同一时期支付的租金现金成本的第一个月。在此之前，从现金角度看，租房成本更低。在此之后，计入权益后，自有住房成本更低。',
        },
        {
          q: '为什么计算中包含维护津贴？',
          a: '无论是否有抵押贷款，房屋都需要维修费用，而这笔费用不会出现在任何成交结算单上。计算器将其设定为每年购买价格的一个百分比，该百分比由您输入。',
        },
        {
          q: '计算中房屋价值会发生什么变化？',
          a: '它会按照您输入的年利率每月增长或缩减，然后与剩余贷款余额进行比较，得出资产净值。负利率模拟下跌的市场；零利率则表示价格持平。',
        },
        {
          q: '是否包含销售成本？',
          a: '是的。销售成本是在房屋出售时按售价收取的，因此它们不属于每月还款的一部分。它们会减少您出售房屋后获得的净值，因此它们是拥有成本和盈亏平衡月份的一部分。该数字会在期限结束时单独报告。',
        },
        {
          q: '贷款还清后抵押贷款还款会怎样？',
          a: '它会停止。贷款的本金和利息随贷款结束而终止，而房产税、保险、物业费和维护费则在拥有房屋期间持续存在。当比较时间超过贷款期限时，之后的月份仅包含日常运营成本。',
        },
        {
          q: '总租金与拥有净成本之间有什么区别？',
          a: '总租金即您每月支付的租金乘以月份数。房屋净持有成本是您在抵押贷款、税费、保险、业主协会（HOA）费用和维护费用上的支出，加上前期投入，减去您已积累的权益，再加上出售房屋时的销售成本。第二个数字可能为负，这意味着您积累的权益超过了您的支出。',
        },
        {
          q: '这是否包含出售房屋的税务影响？',
          a: '不包含。出售房屋产生的任何收益以及适用的任何免税额均不在本工具的计算范围内。此处的比较仅为现金和权益的比较，而非税务比较。',
        },
        {
          q: '房产税率从何而来？',
          a: '这是一个输入项。当网络能够识别请求来源的州时，页面会自动填入该州的平均有效房产税率，该数据取自2024年美国社区调查，并由税务基金会于2026年发布。房产税由地方政府设定，因此特定县或市的税率通常与州平均水平不同，该字段保持可编辑状态。',
        },
      ],
      sources: [
        {
          label: 'CFPB — 住房成本、租房与购房',
          url: 'https://www.consumerfinance.gov/consumer-tools/mortgages/',
        },
        {
          label: 'HUD — 住房成本、房产税和保险指南',
          url: 'https://www.hud.gov/helping_american_homeowners',
        },
        {
          label: 'BLS — 消费者价格指数（通货膨胀，用于增值说明）',
          url: 'https://www.bls.gov/cpi/',
        },
        {
          label: 'FRED — 用于长期价格变动的房价指数系列',
          url: 'https://fred.stlouisfed.org/series/HPINUS',
        },
        {
          label: '税务基金会 — 2026年各州及各县房产税',
          url: 'https://taxfoundation.org/data/all/state/property-taxes-by-state-county/',
        },
      ],
      relatedGuides: [
        { slug: 'rent-vs-buy-calculator-explained', title: '租房与买房计算器说明' },
        { slug: 'rent-vs-buy-common-mistakes', title: '租房与买房比较中的常见误区' },
        { slug: 'estimating-property-tax-and-home-insurance', title: '估算房产税和房屋保险' },
        { slug: 'down-payment-and-closing-costs-explained', title: '首付和过户费用说明' },
        { slug: 'monthly-payment-vs-total-cost-mortgage', title: '抵押贷款月供与总成本对比' },
      ],
      script: {
        notWithinHorizon: '不在视野范围内',
        month: '第 {n} 个月',
        propertyTaxDetected: '已填充 {state}：该州的平均有效房产税率。',
      },
    },

    'compound-interest': {
      name: '复利计算器',
      title: '带每月供款的复利计算器',
      description:
        "通过定期供款预测余额，选择复利频率，并查看扣除通胀后以今日货币价值计算的结果。显示计算公式。",
      short: '余额、供款、已赚取利息以及经通胀调整后的价值。',
      category: '投资',
      methodNote:
        '预测按每一期逐一进行，因此年度表格由得出最终数字的相同算术逻辑生成。',
      fields: {
        startingBalance: '初始余额',
        today: '今日',
        monthlyContribution: '每月供款',
        addedEachMonth: '每月增加',
        interestRate: '利率',
        annualNominal: '年度，名义利率',
        time: '时间',
        years: '年',
        compounding: '复利',
        contributionTiming: '供款时间',
        inflation: '通货膨胀',
        annualForRealValue: '按年计算，得出实际价值',
        seeBalance: '查看逐年余额',
      },
      frequencies: {
        monthly: '每月',
        quarterly: '每季度',
        twiceAYear: '半年一次',
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
        inTodaysDollars: "以今日美元计",
      },
      result: {
        headlineLabel: '期末余额',
        totalContributions: '总缴款额',
        interestEarned: '已赚取利息',
        inTodaysDollars: "以今日美元计",
        effectiveAnnualRate: '实际年利率',
        realAnnualRate: '真实年利率',
        horizon: '期限',
        note: '余额以您输入的美元金额为准。经通胀调整后的数字将其转换为起始年份的购买力。',
      },
      resultNote:
        '您输入的利率将按原样用于整个期间。本页面不会查询市场利率。',
      chart: {
        title: '余额构成',
        note: '折线代表余额。下方的色带表示余额中源自利息而非缴款的部分。',
        xAxis: 'years',
        series: [
          { key: 'balance', label: '余额' },
          { key: 'contributed', label: '已存入' },
        ],
      },
      method: [
        '该预测每次推进一个复利周期。在每个周期内，余额按周期利率赚取利息，然后加上该周期的存入金额——具体是在周期末还是周期初，取决于您的设置。按顺序运行这些周期而不是使用一个封闭表达式，从而生成了逐年表格，且最终余额在两种方式下是相同的。',
        '其封闭形式的结果为：',
        '其中 P 是初始余额，r 是年利率除以每年复利次数，n 是周期数，PMT 是每个周期存入的金额。在周期初存入的金额会赚取整个周期的利息，因此在这种情况下，存入项需乘以 (1 + r)。',
        '实际数值来自两项调整。有效年利率是 (1 + r) 的周期数次方，即 7% 的名义利率在按月复利一年后实际达到的利率。实际利率是将该有效利率除以通胀因子，而以今日美元计算的余额则是名义余额除以同期复利后的通胀率。',
      ],
      formula: 'FV = P(1 + r)ⁿ + PMT · ((1 + r)ⁿ − 1) / r',
      limits: [
        '它不预测回报。您输入的利率将完全按原样用于整个周期；本页面不使用历史平均值、预测数据或市场数据。',
        "它不模拟税费、手续费或账户费用。真实账户的余额会因提供商收取的费用而有所不同。",
        '它不模拟市场波动。在实际市场下跌的年份，真实余额会下降，而固定利率无法体现这一点。',
        '它不建议您如何投资或是否储蓄。它仅根据您提供的假设预测一个数值。',
      ],
      faq: [
        {
          q: '为什么复利频率只能是 1、2、3、4、6 或 12？',
          a: '因为此处的存入是按月进行的，计算器保持复利周期与存入周期一致。任何能整除 12 的频率都能使计算结果精确而非近似。实际上，这六个频率涵盖了从每日到每年的复利与每月存入的组合。',
        },
        {
          q: '名义年利率和有效年利率有什么区别？',
          a: '名义利率是账户上的数字：7%。有效利率是按年复利后余额实际赚取的收益，因此 7% 按月复利后为 7.229%。页面同时显示两者，因为这种差异在长期内很重要。',
        },
        {
          q: '实际价值是什么意思？',
          a: '这是以起始年份购买力表示的最终余额。该计算将名义余额除以同期复利计算的通货膨胀率，从而显示出余额中有多少是实际增长，有多少是货币购买力的变化。',
        },
        {
          q: '缴款时间会改变结果吗？',
          a: '会，本页面展示了两种情况。在每个周期开始时缴款，该笔款项会获得整个周期的利息，因此最终金额会高于在周期末缴款的金额。单次缴款的差额很小，但经过数十年会产生复利效应。',
        },
        {
          q: '利率为零时会怎样？',
          a: '余额仅随缴款增加，没有利息。计算器会明确处理这种情况，而不是进行除以零的运算，因此所得数字即为存入的总额。',
        },
        {
          q: '必须定期缴款吗？',
          a: '不需要。将每月缴款额设为零，计算即变为针对起始余额的简单复利预测，这正是针对已投资的一次性资金的正确模型。',
        },
      ],
      sources: [
        {
          label: 'SEC — Investor.gov：复利和费用成本',
          url: 'https://www.investor.gov/introduction-investing/investing-basics/glossary/compound-interest',
        },
        {
          label: 'BLS — 消费者价格指数（用于通胀调整后的数据）',
          url: 'https://www.bls.gov/cpi/',
        },
        {
          label: '美联储 — 定期存款和储蓄利率数据',
          url: 'https://www.federalreserve.gov/releases/h15/',
        },
        {
          label: 'IRS — 复利与传统个人退休账户（IRA）的增长',
          url: 'https://www.irs.gov/retirement-plans/traditional-iras',
        },
      ],
      relatedGuides: [
        { slug: 'compound-interest-calculator-explained', title: '复利计算器详解' },
        { slug: 'compound-vs-simple-interest', title: '复利与单利' },
        { slug: 'how-compounding-frequency-changes-results', title: '复利频率如何影响结果' },
        { slug: 'inflation-and-real-returns-explained', title: '通货膨胀与实际收益详解' },
        { slug: 'understanding-apr', title: '理解 APR 和年利率' },
      ],
      script: {
        yearsOne: '1 年',
        yearsOther: '{n} 年',
      },
    },
    'net-pay': {
      name: '实得工资计算器',
      title: '2026 税年实得工资计算器',
      description:
        '计算扣除联邦所得税、社会保障税、医疗保险税和州税后剩余的工资，适用于任何支付周期，并显示每一项扣除额。',
      short: '扣除联邦税、工资税和州税后的工资额。',
      category: '支付',
      methodNote:
        '以上数据适用于2026纳税年度：联邦税阶和标准扣除额参考 Rev. Proc. 2025-32，工资税限额参考社会保障局（Social Security Administration）的规定。本页面内容不构成任何薪资服务提供商的报价。',
      fields: {
        grossPay: '税前工资',
        payPeriod: '发薪周期',
        filingStatus: '报税身份',
        stateRate: '州所得税率',
        stateRateHint: '您所在税阶的税率',
        retirementContribution: '401(k) 或 403(b) 缴款',
        retirementHint: '每年 — 仍需缴纳工资税',
        healthContribution: 'HSA 或 FSA 供款',
        healthHint: '每年 — 无需缴纳工资税',
        perYear: '每年',
        debtName: '债务',
        balance: '余额',
        rate: '利率',
        minimum: '最低还款额',
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
          married: '已婚联合申报',
          head: '户主',
        },
      },
      result: {
        headlineLabel: '实发工资',
        annualGross: '年度总收入',
        federalTax: '联邦所得税',
        socialSecurity: 'Social Security',
        medicare: 'Medicare',
        additionalMedicare: '额外医疗保险税',
        stateTax: '州所得税',
        totalTax: '税款总额',
        netPerMonth: '每月实发工资',
        effectiveRate: '实际税率',
        note:
          '实发工资额为总工资减去上述扣除额，再除以一年中的发薪周期数。',
        negativeNote:
          '扣除额与总工资相等，且仍需缴纳工资税，因此实发工资额低于零。此处未核对年度缴款限额。',
      },
      resultNote:
        '工资系统会使用 W-4 表格上的预扣税选择以及年内已预扣的金额，因此实际工资单上的数字每月会有小幅波动。',
      chart: {
        title: '总工资的去向',
        note: '一根代表全年的柱状图，分为到手工资部分和扣除部分。',
        xAxis: 'none',
        series: [
          { key: 'net', label: '实发工资' },
          { key: 'federal', label: '联邦所得税' },
          { key: 'socialSecurity', label: 'Social Security' },
          { key: 'medicare', label: 'Medicare' },
          { key: 'state', label: '州所得税' },
        ],
      },
      formula:
        '实得工资 = 税前工资 − 税前扣除项 − 联邦所得税 − Social Security − Medicare − 州所得税',
      method: [
        '计算从总工资开始，按照工资系统应用的顺序反向扣除各项费用。税前扣除额首先扣除，因为向 401(k) 或健康账户的缴款是在工资征税前扣除的。剩余部分即为应纳税工资。',
        '这两种扣除额的处理方式不同。401(k) 或 403(b) 缴款虽从收入中扣除，但仍计入社会保障和联邦医疗保险的工资基数，因此它会降低联邦税，但不影响工资税。从工资支票中扣除的 HSA 或 FSA 缴款则从收入和社会保障工资基数中同时扣除，因此两者都会降低。',
        '联邦所得税是根据该应纳税工资计算的。减去申报身份对应的标准扣除额，并将结果代入 2026 年税率表进行计算。每个税率档次包含固定税额加上超过该档次起征点部分的百分比，这是美国国税局 (IRS) 发布税率表的方式。',
        '接下来是工资税。计算基数为工资减去任何 HSA 或 FSA 缴款，因为 401(k) 缴款在计算这些税项时仍计入工资。2026 年社会保障税为工资的 6.2%，最高应纳税额上限为 $184,500。联邦医疗保险税为全部工资的 1.45%，没有上限；对于单身申报者，超过 $200,000 的部分需缴纳 0.9% 的额外联邦医疗保险税；对于夫妻联合申报者，该门槛为 $250,000。',
        '州所得税是您输入的税率应用于应纳税收入的结果。这是一个估算值：大多数州采用分档税率，因此用单一税率应用于全部收入会高估大多数人的实际税负。最终数字是剩余金额除以一年中的发薪期数。',
      ],
      limits: [
        '本计算器未模拟税收抵免。子女税收抵免、劳动所得税抵免和教育抵免会改变最终数字，因此未包含在计算中。',
        '本计算器未模拟资本利得、自雇收入，或超过社会保障工资基数部分的收入处理（在该部分中，联邦医疗保险税依然适用，但社会保障税不再适用）。',
        '本计算器未模拟地方税。市级和县级所得税与州税率是分开的。',
        '薪资周期的计算方式为常规标准：12个月、52周、260个工作日，或按每周40小时、全年52周计算的2,080小时。如果您的支付周期不同，可以直接输入年度总额。',
        'HSA 和 FSA 缴款按工资扣减处理，从工资中扣除，因此不计入 Social Security 和 Medicare。直接用银行账户缴入的 HSA 款项属于 Social Security 工资收入，这种情况不计入计算。',
        '超过2026年年度限额的401(k)缴款部分会再次受到工资税的影响，此计算器会对全部缴款额征收工资税。',
        '它不检查缴款的年度上限。如果 401(k) 或 HSA 缴款金额等于全部工资，税后收入会低于零，因为缴款仍需缴纳工资税。',
      ],
      faq: [
        {
          q: '为什么我的到手工资低于总工资减去所得税后的金额？',
          a: '因为在计算所得税之前，工资已扣除了社会保障税和医疗保险税。这些是针对工作本身征收的工资税，与薪资单上的所得税是分开的。',
        },
        {
          q: '401(k)缴款会减少我的社会保障税和医疗保险税吗？',
          a: '不会。它在计算联邦所得税前从工资中扣除，但缴款仍属于工资税应税工资，因此仍需缴纳 Social Security 和 Medicare。从工资中扣除的 HSA 或 FSA 缴款不同：这些款项也会从这些税费的计税基数中扣除。因此，这两项需要分别输入。',
        },
        {
          q: '这是否使用了我实际的税率等级？',
          a: '它使用了2026年的税率表和申报身份的标准扣除额，因此该数字与工资系统为没有其他收入的工薪族计算出的结果相近。它不包含任何税收抵免、其他扣除额或其他收入信息。',
        },
        {
          q: '有效税率和边际税率有什么区别？',
          a: '边际税率是您下一美元应纳税收入所适用的税率，即您的收入所达到的最高税率等级。有效税率是总税额除以总收入，通常较低，因为更高的税率等级仅适用于超出该等级部分的收入。',
        },
        {
          q: '我应该使用哪个州税率？',
          a: '应使用您所在州适用于您个人税率等级的税率。大多数州采用分段征税，因此有效税率低于最高税率。对于实行单一税率的州或没有所得税的州，该数字是完全准确的。',
        },
        {
          q: '为什么社会保障税有上限，而医疗保险税没有？',
          a: '社会保障税每年都有应纳税上限，2026年为184,500美元，超过该金额的收入无需缴纳社会保障税。医疗保险税没有上限，因此适用于每一美元的工资。',
        },
        {
          q: '我可以用它来计算我的税单吗？',
          a: '不能。它计算的是从工资中预扣的税款。纳税申报表是另一种计算方式：它包含其他收入、扣除额、抵免额以及已缴纳的税款，并且每年申报一次，而不是在每个发薪期申报。',
        },
      ],
      sources: [
        {
          label: 'IRS — Rev. Proc. 2025-32，2026 纳税年度的通胀调整',
          url: 'https://www.irs.gov/irb/2025-45_IRB',
        },
        {
          label: '美国社会保障局 — 2026年工资基数和生活成本调整 (COLA)',
          url: 'https://www.ssa.gov/cola/',
        },
        {
          label: '社会保障局 — 第15号出版物，雇主税务指南',
          url: 'https://www.ssa.gov/pubs/EN-05-10035.pdf',
        },
        {
          label: '美国国税局 — 税务主题401，工资与薪金',
          url: 'https://www.irs.gov/taxtopics/tc401',
        },
        {
          label: '社会保障管理局 — POMS RS 01402.038，税收优惠健康计划',
          url: 'https://secure.ssa.gov/poms.nsf/lnx/0301402038',
        },
        {
          label: '美国国税局 — 税务主题511，预扣税',
          url: 'https://www.irs.gov/taxtopics/tc511',
        },
      ],
      relatedGuides: [
        {
          slug: 'net-pay-calculator-explained',
          title: '如何计算实得工资',
        },
      ],
    },

    'income-tax': {
      name: '联邦所得税计算器',
      title: '2026纳税年度联邦所得税计算器',
      description:
        '计算2026年全年的联邦所得税，并根据各州税率表、申报身份、扣除额，并排显示有效税率和边际税率，从而得出州税。',
      short: '全年联邦和州所得税，并显示两种税率。',
      category: '支付',
      methodNote:
        '联邦税级和标准扣除额采用 Rev. Proc. 2025-32 中的 2026 年数据，该文件发布于 2025 年 11 月 3 日。州税根据你所选州的 2026 年税级、标准扣除额、个人免税额和抵免额计算，这些数据取自 Tax Foundation 2026 年 4 月 28 日的表格。户主税表、联邦所得税扣除额和州抵免额来自各州本身的表格。从工资中扣除的工薪税不计入这项计算；这些税包含在税后收入计算器中。',
      script: {
        stateDetected: '已填充 {state}：您请求所在的州。',
        childrenTotal: '符合条件的子女总数：{count}',
      },
      fields: {
        grossIncome: '年度总收入',
        filingStatus: '报税身份',
        itemisedDeduction: '逐项扣除额',
        standardDeduction: '标准扣除额',
        useStandard: '使用标准扣除额',
        state: '州',
        stateHint: '针对州税',
        stateNone: '无州税',
        children: '符合条件的子女',
        childrenHint: '按纳税年度末的年龄计算',
        childBand: '年龄在 {range} 的儿童',
        stateTaxOverride: '您个人的州税',
        stateTaxOverrideHint: '留空以使用模型',
        preTax: '税前扣除额',
        preTaxHint: '401(k)、HSA、FSA 每年缴款额',
        perYear: '每年',
      },
      terms: {
        filingStatuses: {
          single: '单身',
          married: '已婚联合申报',
          head: '户主',
        },
      },
      result: {
        headlineLabel: '联邦所得税',
        taxableIncome: '应纳税收入',
        deductionApplied: '已应用的扣除额',
        standardDeduction: '标准扣除额',
        itemisedDeduction: '逐项扣除额',
        federalTax: '联邦所得税',
        stateTaxableIncome: '州应纳税收入',
        stateCredits: '州税抵免',
        stateChildCredit: '州子女税收抵免',
        federalTaxDeducted: '已扣除的联邦税',
        stateTax: '州所得税',
        totalTax: '税款总额',
        effectiveRate: '实际税率',
        marginalRate: '边际税率',
        afterTax: '税后收入',
        note:
          '所应用的扣除额为以下两者中的较大值：您申报身份对应的标准扣除额，或左侧输入的逐项扣除额。州税根据您选择的州计算得出。',
      },
      resultNote:
        '此数字为税务负债，而非从工资支票中预扣的金额。联邦数字不包含联邦抵免额或年内已缴纳的税款；州数字包含模型所载的州抵免额。',
      chart: {
        title: '剩余的收入',
        note: '一根年度柱状图，分为留给读者的部分和缴纳税款的部分。',
        xAxis: 'none',
        series: [
          { key: 'afterTax', label: '税后收入' },
          { key: 'federal', label: '联邦所得税' },
          { key: 'state', label: '州所得税' },
        ],
      },
      formula:
        '应税收入 = 总收入 − 税前扣除项 − 扣除额；税额 = 将应税收入代入税率表计算；州税 = 将调整后总收入扣除州标准扣除额和免税额后适用州税率表，再扣除州允许抵扣的联邦所得税和州税收抵免',
      method: [
        '计算从年度总收入开始，并扣除税前扣除额，因为 401(k) 缴款或健康账户缴款不作为收入征税。',
        '接下来是扣除额。除非读者输入了逐项扣除额，否则将使用申报身份对应的标准扣除额，两者中金额较大者适用。2026 年的标准扣除额为：单身申报者 $16,100，夫妻联合申报者 $32,200，户主申报者 $24,150。',
        '剩余部分即为应纳税所得额，税额是应用 2026 年税率表计算得出的。每个税级均为固定税额加上超出该税级下限收入的百分比，计算方式与美国国税局（IRS）发布的一致。',
        '这两个税率回答了不同的问题。边际税率是下一美元应纳税所得额所适用的税率，即收入所达到的最高税级。有效税率是总税额除以全部收入，由于较高税级仅适用于超出该部分门槛的收入，因此有效税率较低。',
        '州税是单独计算的。各州从调整后总收入开始，扣除其自身的标准扣除额和个人免税额（若作为排除项提供），逐级应用其税率表，并减去其支付的抵免额。将免税额或标准扣除额作为抵免额提供的州，则直接从税额中扣除，这些抵免额即计入此处。',
        '使用申报状态表。发布了各自“户主”申报表的州，其数据取自该州的表格；未发布该表的州，则根据“单身”申报表计算。',
        '有三个州允许纳税人扣除已缴纳的联邦所得税：阿拉巴马州、密苏里州和俄勒冈州。在这些州，扣除额会在应用州税率表之前从收入中减去，并受各州设定的限额和比例限制。',
        '州税抵免额根据子女年龄计算，因为这是抵免额的触发条件。纽约州为四岁以下子女提供 1,000 美元，为四至十六岁子女提供 500 美元；明尼苏达州为十八岁以下子女提供 1,800 美元；少数州对超过特定年龄的子女不提供任何抵免。',
      ],
      limits: [
        '本计算器不模拟联邦税收抵免。联邦子女税收抵免、联邦劳动所得税抵免和教育抵免会减少税额，但不包含在本次计算中。',
        '本计算器不模拟资本利得与普通收入的区别，因此投资收入年度按普通税率计算。',
        '本计算器不模拟老年人扣除额，也不模拟左侧输入的标准扣除额和逐项扣除额之外的任何扣除额。',
        '本计算器不模拟自雇税，该税针对自雇人士的净收入征收，并有其独立的税基和税率。',
        '本计算器不模拟许多州在逐项扣除额中允许的州和地方所得税扣除额。',
        '本计算器不模拟资本利得税率、部分州对高收入者征收的附加税，或市县政府的税收。',
        '本计算器不使用佛蒙特州的户主申报表，因为该州 2026 年的税率目前仅作为初步数据发布，因此佛蒙特州的户主税额是根据单身申报表计算的。',
        '本计算器未包含所有州税抵免。州劳动所得税抵免适用于那些将其设定为联邦抵免额百分比的州，以及三个自行计算该抵免额的州；子女税收抵免适用于那些以子女年龄为触发条件的州。其他州的抵免额未包含在内。',
      ],
      faq: [
        {
          q: '我应该使用哪种扣除方式？',
          a: '除非逐项扣除额的总和更高，否则应使用标准扣除额。计算器将申报状态对应的标准扣除额与逐项扣除额并列显示，以便您一目了然地进行比较。',
        },
        {
          q: '有效税率和边际税率有什么区别？',
          a: '边际税率是指下一美元应纳税所得额所适用的税率。有效税率是总税额除以总收入，由于只有超过第一级税阶的部分才适用更高的税率，因此有效税率通常较低。',
        },
        {
          q: '为什么税额会在特定收入水平时出现跳跃？',
          a: '这是税阶的分界线。超过此界限后，每一美元都将按下一级税率征税，因此税额的增长速度快于收入。边际税率反映了收入所处的税阶。',
        },
        {
          q: '这是否包含社会保障税和医疗保险税？',
          a: '不包含。这些属于工资税，针对工资征收且有各自的上限，它们在“实发工资计算器”中进行计算。',
        },
        {
          q: '州税数据是什么？',
          a: '这是州政府根据其2026年税阶、标准扣除额、个人免税额和税收抵免计算出的税额。州名从列表中选择，当网络能够识别时，页面会自动根据您所在的州进行填充。更改州名，整个数值也会随之改变。',
        },
        {
          q: '我可以输入自己的州税金额吗？',
          a: '可以。州名下方的字段允许您输入数值，并用其替换计算出的结果。该字段默认留空，在留空时，页面显示的是计算出的数值。',
        },
        {
          q: '为什么页面要询问每个孩子的年龄？',
          a: '因为各州的子女税收抵免政策取决于孩子的年龄。纽约州为四岁以下儿童提供1,000美元抵免，为四至十六岁儿童提供500美元抵免；明尼苏达州为十八岁以下儿童提供1,800美元抵免；而有些州对超过特定年龄的儿童不提供任何抵免。这些年龄段是各州设定的界限，劳动所得税抵免计算时也会用到这些年龄段的儿童人数。',
        },
        {
          q: '这是我将要缴纳的税额吗？',
          a: '这是扣除抵免和年内已缴纳税款之前的税额。报税表会加上抵免额，加上其他未通过工资预扣的收入，并减去已缴纳的税款。',
        },
      ],
      sources: [
        {
          label: 'IRS — Rev. Proc. 2025-32，2026 纳税年度的通胀调整',
          url: 'https://www.irs.gov/irb/2025-45_IRB',
        },
        {
          label: '美国国税局 — 税务主题 505，预扣税与预估税款',
          url: 'https://www.irs.gov/taxtopics/tc505',
        },
        {
          label: '美国国税局 — 税务主题 611，所得税',
          url: 'https://www.irs.gov/taxtopics/tc611',
        },
        {
          label: '税务基金会 — 2026 年各州个人所得税税率及税阶',
          url: 'https://taxfoundation.org/data/all/state/state-income-tax-rates-2026/',
        },
        {
          label: '税务基金会 — 2026 年事实与数据，截至 2026 年 4 月 28 日的各州个人所得税税率',
          url: 'https://taxfoundation.org/data/all/state/2026-state-tax-data/',
        },
      ],
      relatedGuides: [
        {
          slug: 'income-tax-calculator-explained',
          title: '联邦所得税的计算方式',
        },
      ],
    },

    'debt-payoff': {
      name: '债务偿还计算器',
      title: '债务偿还计算器：雪崩法与雪球法',
      description:
        '比较同时偿还多笔债务的方式：仅支付最低还款额、雪崩法顺序和雪球法顺序，并查看实现无债状态所需月份及节省的利息。',
      short: '同时偿还多笔债务并比较偿还顺序。',
      category: '债务',
      methodNote:
        '该模型是逐月模拟：利息在月初根据余额产生，每笔未结清的债务都需要支付最低还款额，剩余的资金则用于偿还您选择的债务。',
      fields: {
        debtName: '债务',
        balance: '余额',
        rate: '利率',
        minimum: '最低还款额',
        addDebt: '添加债务',
        removeDebt: '移除此债务',
        extraPayment: '每月额外还款',
        extraPaymentHint: '在每笔最低还款额之外',
      },
      terms: {
        strategies: {
          minimum: '仅最低还款额',
          avalanche: '雪崩法',
          snowball: '雪球法',
        },
        orderHints: {
          avalanche: '先偿还利率最高的债务',
          snowball: '先偿还余额最小的债务',
        },
      },
      result: {
        headlineLabel: '节省的利息',
        interestSaved: '相对于最低还款额节省的利息',
        monthsToFree: '还清债务所需的月数',
        totalInterest: '利息总额',
        totalPaid: '支付总额',
        minimumOnly: '仅最低还款额',
        avalanche: '雪崩法',
        snowball: '雪球法',
        minimumsNeverCover: '从未还清',
        minimumsNeverCoverNote:
          '这些债务中至少有一项每月的利息高于还款额，因此余额不减反增。无法还清债务的方案没有完成时间表，因此不会显示月数和利息：这些数字描述的是模拟结束时的状态，而非债务本身。',
        note:
          '雪崩法优先偿还利率最高的债务，利息成本最低。雪球法优先偿还余额最小的债务，能更快结清该笔债务。两者之间的差异即为偿还顺序带来的成本。',
      },
      resultNote:
        '这三种方案使用相同的债务和相同的额外还款额。唯一的变化是额外还款的分配顺序。',
      chart: {
        title: '各顺序下的余额',
        note: '未还清债务的方案被排除在外：其余额不减反增，该曲线的走势描述的是模拟结束时的状态，而非还款计划。额外还款的曲线达到零。',
        xAxis: 'years',
        series: [
          { key: 'avalanche', label: '雪崩法' },
          { key: 'snowball', label: '雪球法' },
          { key: 'minimumOnly', label: '仅最低还款额' },
        ],
      },
      formula:
        '本月利息 = 月初余额 × 年利率 ÷ 12；每笔未偿债务都有自己的最低还款额，先还利息，后还本金；剩余资金按照债务偿还顺序偿还',
      method: [
        '该计算为逐月模拟。每月月初，系统会根据余额计算利息并将其计入余额。当月可用资金为所有最低还款额与左侧输入的额外还款额之和。每笔尚有余额的债务均需支付各自的最低还款额，该还款额先用于偿还利息，再用于偿还本金。',
        '已结清的债务不再需要支付最低还款额，该金额将并入下一笔债务的还款中。这就是不同排序方式产生差异的机制：相同的月还款额，用于偿还不同的债务，会使不同债务的余额更快清零。',
        '雪崩法将额外资金优先用于偿还利率最高的债务。这种方式支付的利息总额最少，因为您停止支付的是成本最高的利息。',
        '雪球法将额外资金优先用于偿还余额最小的债务。这种方式支付的利息总额较高，但能更快结清一个账户，这是一种不同的结果。计算器会展示两种方式及其各自节省的利息，以便您在相同数据下进行比较。',
      ],
      limits: [
        '本计算器不模拟浮动利率。浮动利率信用卡的利率会随指数变动，而此处的计划假设利率保持您输入时的水平。',
        '本计算器不模拟费用：滞纳金、余额转账费和信用卡年费均未计入总额。',
        '本计算器按月计息。按日复利的信用卡在一年内产生的利息会略多一些，因此信用卡余额的实际数字通常会略高于此处的计算结果。',
        '本计算器不模拟利息的税务处理，部分债务的利息可以抵扣，而其他债务则不能。',
        '本计算器不模拟最低还款额的变化，贷款机构有时会因财务困难而降低最低还款额，有时也会随着余额下降而提高最低还款额。',
      ],
      faq: [
        {
          q: '雪崩法和雪球法有什么区别？',
          a: '区别仅在于顺序。雪崩法优先将额外资金用于利率最高的债务，雪球法优先用于余额最小的债务。在两种计算方式中，债务总额、最低还款额和额外还款额均保持不变。',
        },
        {
          q: '哪种方法更省钱？',
          a: '雪崩法，因为利息更少。额外资金优先偿还利息成本最高的债务，因此在债务存续期间产生的利息更少。计算器会显示两种顺序下节省利息的差额。',
        },
        {
          q: '如果雪球法成本更高，为什么还要存在？',
          a: '它能优先结清余额最小的债务，从而更快地将某项债务余额清零。这与利息计算的结果不同，计算器会同时显示这两种结果，以便您基于相同的数据进行比较。',
        },
        {
          q: '利息是如何计算的？',
          a: '在每个月初的余额基础上，按年利率除以十二计算利息，并将其计入余额。还款将首先用于支付该利息，剩余部分再用于偿还本金。',
        },
        {
          q: '清偿债务后的最低还款额会怎样？',
          a: '它会被加到下一笔债务的还款中，因此每月用于偿还债务的总金额不会减少。这就是为什么债务清偿日期比单独还款计划的总和要短的原因。',
        },
        {
          q: '这是否考虑了信用卡的日复利？',
          a: '不。该模型按月计息。按日复利的信用卡在一年内产生的利息会略多一些，因此信用卡余额的实际数字通常会比此处显示的略高。',
        },
      ],
      sources: [
        {
          label: 'CFPB — 咨询 CFPB，消费者问题与解答',
          url: 'https://www.consumerfinance.gov/ask-cfpb/',
        },
        {
          label: 'CFPB — 信用卡工具与消费者指南',
          url: 'https://www.consumerfinance.gov/consumer-tools/credit-cards/',
        },
      ],
      relatedGuides: [
        {
          slug: 'debt-payoff-calculator-explained',
          title: '偿还多笔债务的运作方式',
        },
      ],
    },

  },
};
