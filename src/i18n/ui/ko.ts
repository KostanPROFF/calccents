/** 사이트 인터페이스의 모든 한국어 문구. 구조는 `en.ts`와 같습니다. */

export const ko = {
  /** 이 언어를 이 언어로 쓴 이름. */
  localeName: '한국어',

  tagline: '계산 과정을 보여 주는 금융 계산기',
  description:
    '주택담보대출 월 상환액, 임차와 매수 비교, 복리, 실수령액, 연방 소득세, 부채 상환을 위한 무료 금융 계산기. 모든 공식을 보여 줍니다.',

  author: {
    role: '저자',
    bio: 'IT 인프라 분야에서 일합니다. 클라우드, CI/CD, 코드형 인프라처럼 검증할 수 없는 변경은 배포되지 않는 곳입니다. 클라우드 환경을 군더더기 없이 유지하고 배포 파이프라인을 빠르게 만드는 것이 본업이며, 같은 기준이 이 사이트 전체에 적용됩니다. 계산은 한곳에 모여 있고, 공식은 공개된 대출 수치와 대조하는 단위 테스트로 검증되며, 외부에서 가져온 모든 수치에는 출처와 확인한 날짜가 붙어 있습니다. 가이드를 쓰고 계산 엔진을 관리합니다. 각 가이드의 금융 내용은 게시 전에 다른 한 사람이 읽습니다. 이곳의 어떤 내용도 독자에게 무엇을 하라고 말하지 않습니다.',
  },

  reviewer: {
    role: '금융 검토자',
    bio: '가이드가 게시되기 전에 금융 내용을 읽습니다. 수치, 그 수치의 바탕이 된 가정, 그리고 수치의 출처입니다. 저자가 계산 엔진을 만들고, 검토자는 코드가 아니라 돈을 다루는 사람의 관점에서 결과를 반대편에서 읽습니다. 그녀의 이름은 그녀가 검토한 가이드에만 표시됩니다.',
  },

  consent: {
    heading: '쿠키',
    body: '이 사이트는 광고를 게재하고 어떤 페이지가 읽히는지 집계하기 위해 쿠키를 사용합니다. 동의하면 호스팅 업체의 쿠키 없는 비콘을 포함해 광고와 페이지 분석이 로드되고, 거부하면 아무것도 로드되지 않습니다. 유럽연합의 독자에게는 호스팅 업체의 비콘이 전혀 로드되지 않습니다. 답변은 나중에 바닥글에서 바꿀 수 있습니다. 무엇이 수집되고 누가 제공하는지는 {privacyLink}에 있습니다.',
    privacyLink: '개인정보 페이지',
    accept: '동의',
    reject: '거부',
    settings: '쿠키 설정',
  },

  nav: {
    tools: '도구',
    guides: '가이드',
    sources: '출처',
    about: '소개',
  },

  footer: {
    taglineNote: '모든 공식은 끝까지 적혀 있고, 모든 가정은 여러분이 정합니다.',
    calculatorsHeading: '계산기',
    siteHeading: '사이트',
    calculators: {
      'mortgage-payment': '주택담보대출 상환액',
      'rent-vs-buy': '임차 대 매수',
      'compound-interest': '복리',
      'net-pay': '실수령액',
      'income-tax': '연방 소득세',
      'debt-payoff': '부채 상환',
    },
    links: {
      guides: '가이드',
      sources: '출처',
      'editorial-team': '편집팀',
      about: '소개',
      contact: '문의',
      privacy: '개인정보',
      terms: '이용약관',
    },
    cookieSettings: '쿠키 설정',
    note:
      '{name}은 금융 조언이 아니라 계산과 설명을 게시합니다. 도구는 숫자 뒤의 계산과 그 계산 뒤의 가정을 보여 줍니다. 여러분의 상황을 평가하지 않으며 어떤 행동 방침도 권하지 않습니다. 도구가 내놓는 모든 수치는 여러분이 입력한 값에 따라 달라집니다. 어떤 결과든 의지하기 전에 가정을 읽어 보세요. © {founded}–{year} {name}.',
  },

  ui: {
    skipToContent: '본문으로 건너뛰기',
    home: '홈',
    breadcrumb: '이동 경로',
    primaryNav: '주 메뉴',
    lastChecked: '최근 확인',
    by: '글',
    whereNumbersComeFrom: '숫자의 출처',
    minRead: '{n}분 분량',
    guidesCount: (n: number) => `가이드 ${n}개`,
    calculate: '계산',
    open: '열기',
    allGuides: '모든 가이드 →',
    readTheGuide: '가이드 읽기',
    guidesThatGoDeeper: '더 깊이 다루는 가이드',
    commonQuestions: '자주 묻는 질문',
    howThisIsCalculated: '계산 방법',
    whatThisCalculatorDoesNotDo: '이 계산기가 하지 않는 일',
    sources: '출처',
    sourcesNote: '이 가이드의 수치와 방법의 바탕이 된 1차 출처입니다.',
    calculatorsBehindThisGuide: '이 가이드의 계산기',
    published: '게시일',
    lastReviewed: '최근 검토',
    reviewedBy: '검토',
    language: '언어',
    switchTheme: '테마 전환',
    switchToLight: '밝은 테마로 전환',
    switchToDark: '어두운 테마로 전환',
    detectedFromIp:
      '주(州)는 IP 주소로 추정한 것이라 정확하지 않을 수 있습니다. VPN, 프록시, 모바일 네트워크 때문에 다른 주로 잡힐 수 있습니다. 이 필드는 직접 수정할 수 있습니다.',
  },

  newsletter: {
    emailAddress: '이메일 주소',
    placeholder: 'you@example.com',
    subscribe: '구독',
  },

  home: {
    title: 'Calccents — 계산 과정을 보여 주는 금융 계산기',
    description:
      '주택담보대출 월 상환액, 임차와 매수 비교, 복리, 실수령액, 연방 소득세, 부채 상환을 위한 무료 금융 계산기. 모든 공식을 보여 줍니다.',
    eyebrow: '금융 계산기',
    heading: '결정하기 전에 숫자부터 알아 두세요',
    lede: '주택담보대출, 임대차 계약, 급여 명세서, 쌓인 부채 뒤의 계산을 위한 무료 도구입니다. 모든 공식은 끝까지 적혀 있고, 모든 가정은 여러분이 정하며, 어떤 페이지도 결과로 무엇을 하라고 말하지 않습니다.',
    cta: '계산기 둘러보기',
    calculatorsEyebrow: '계산기',
    calculatorsHeading: '여섯 가지 질문, 여섯 가지 숫자',
    workHeading: '모든 수치는 계산 과정을 보여 줍니다',
    workPoints: [
      '공식은 쉬운 말과 기호로 답 바로 옆에 있습니다.',
      '어딘가에서 가져온 모든 숫자에는 출처와 날짜가 붙어 있습니다.',
      '모든 도구는 결과 바로 아래에 같은 문장으로 자신이 하지 않는 일을 밝힙니다.',
    ],
    workLink: '사이트가 만들어진 방식 →',
    sampleMonthlyPayment: '월 상환액',
    samplePrincipalAndInterest: '원금과 이자',
    samplePropertyTax: '재산세',
    sampleTotalInterest: '총이자',
    calcTitle: '직접 해 보기: 주택담보대출 월 상환액',
    calcHomePrice: '주택 가격',
    calcDown: '계약금',
    calcRate: '이자율',
    calcTerm: '기간',
    calcYears: '{n}년',
    calcMonthly: '월 원금과 이자',
    calcLoan: '대출 금액',
    calcTotalInterest: '총이자',
    calcOpen: '전체 계산기 열기',
    calcNote: '원금과 이자만 포함합니다. 재산세, 보험, 주택 소유자 협회비(HOA)는 전체 계산기에 있습니다.',
    statCalculators: '계산기',
    statGuides: '계산 과정을 보여 주는 가이드',
    statLanguages: '언어',
    statSignups: '이용에 필요한 가입',
    guidesEyebrow: '가이드',
    guidesHeading: '끝까지 적어 내려간 계산',
    newsletterHeading: '수학을 이메일로 받아 보세요',
    newsletterLede:
      '새 계산기가 공개되거나 기존 계산기를 다시 검토했을 때 짧은 편지 한 통. 판촉도, 협찬 게재도 없습니다.',
  },

  illustration: {
    mortgagePayment: '시간이 지나며 줄어드는 대출 잔액과 그 옆에 쌓이는 납부 이자',
    rentVsBuy: '교차하는 두 선: 임차 비용과 소유 비용',
    compoundInterest: '이자가 복리로 붙으면서 점점 빨라지는 잔액 증가',
    netPay: '세전 급여 막대가 실수령액과 공제액으로 나뉜 모습',
    incomeTax: '위로 갈수록 넓어지는 세율 구간의 층',
    debtPayoff: '부채를 갚는 두 가지 순서에 대한 두 묶음의 막대',
  },

  heroVisual: {
    label: '월 상환액',
    caption: '계산기가 그리는 방식대로 그린 계산 예시입니다.',
  },

  chart: {
    months: '개월',
    years: '년',
    start: '현재',
    end: '종료',
    empty: '그릴 수치가 생기면 차트가 채워집니다.',
  },

  toolsIndex: {
    title: '무료 금융 계산기',
    description:
      '주택담보대출 상환액, 임차와 매수 비교, 복리 전망 뒤의 계산을 보여 주는 무료 계산기.',
    heading: '무료 금융 계산기',
    lede: '각 계산기는 사용하는 공식을 보여 주고, 결과의 바탕이 된 가정을 나열하며, 하지 않는 일을 분명히 밝힙니다. 이곳에서는 이메일 주소를 묻지 않고, 무엇에도 가입하라고 하지 않습니다.',
    whatTheseAre: '이 도구들은 무엇인가',
    whatTheseAreBody: [
      '이것들은 계산 도구입니다. 여러분이 입력한 숫자에 공개된 공식을 적용하고, 계산 과정을 붙여 결과를 돌려줍니다. 이곳의 주택담보대출 계산기는 여러분의 신용 점수나 소득, 이번 주에 어느 대출 기관이 무엇을 제시하는지 알지 못하며, 추측하려고 하지도 않습니다.',
      '이유는 간단합니다. 직접 확인할 수 있는 숫자가 다른 사람이 대신 골라 준 숫자보다 더 가치 있기 때문입니다. 이곳의 모든 도구는 공식을 기호로 보여 주고, 방법의 1차 출처로 연결되며, 마지막으로 언제 확인했는지 알 수 있도록 검토 날짜를 표시합니다.',
    ],
  },

  guidesIndex: {
    title: '가이드',
    description:
      '주택담보대출, 임차와 매수, 복리 뒤의 계산에 대한 설명. 각각 공식, 가정, 출처를 담고 있습니다.',
    heading: '가이드',
    lede: '계산기 뒤의 계산과 가정에 대한 자세한 설명입니다. 모든 가이드는 공식을 보여 주고, 1차 출처로 연결되며, 검토 날짜를 표시합니다.',
    missingHeading: '빠진 내용이 있나요?',
    missingBody:
      '가이드는 독자가 가장 따라가기 어려워하는 계산을 중심으로 쓰입니다. 여기서 다루지 않는 금융 개념이 있다면 어떤 개념인지, 어떤 점이 헷갈리는지 알려 주세요.',
    suggestTopic: '주제 제안하기',
    groups: {
      home: '주택과 주택담보대출',
      renting: '임차와 소유',
      investing: '투자',
    },
  },

  guide: {
    sourcesTitle: '출처',
    sourcesNote: '이 가이드의 수치와 방법의 바탕이 된 1차 출처입니다.',
  },

  about: {
    title: '소개',
    description:
      '이 사이트가 무엇인지, 어떻게 만들어졌는지, 그리고 모든 숫자를 확인할 수 있도록 어떤 규칙을 따르는지.',
    heading: '{name} 소개',
    lede: '{name}은 금융 계산기와 그 뒤의 설명을 게시합니다. 목적이 좁은 작은 사이트입니다. 확인할 수 있는 숫자를 내놓고, 그 숫자를 만든 계산 과정을 보여 주는 것입니다.',
    isHeading: '이 사이트는 무엇인가',
    isBody: [
      '여섯 개의 계산기, 열여덟 개의 가이드, 그리고 그 바탕이 된 1차 출처입니다. 계산기는 여러분이 입력한 숫자에 공개된 공식을 적용합니다. 주택담보대출에는 상환 공식을, 임차와 매수에는 월별 현금 비교를, 저축 잔액에는 복리 공식을 쓰고, 부채 상환, 소득세, 실수령액의 계산도 다룹니다.',
      '이 사이트는 디스플레이 광고로 운영됩니다. 이것이 사이트의 구조를 결정합니다. 페이지는 빠르게 로드되고 JavaScript가 적습니다. 빠른 페이지가 독자를 광고를 볼 만큼 오래 머물게 하고, 사람들이 다시 찾는 것도 빠른 페이지이기 때문입니다. 어떤 계산기도 이메일 주소를 묻지 않으며, 어떤 결과도 잠겨 있지 않습니다.',
    ],
    isNotHeading: '이 사이트가 아닌 것',
    isNotBody: [
      '이곳은 중개 회사가 아니며, 신청을 받지 않고, 누가 무엇을 클릭하든 수수료를 받지 않습니다. 협찬 게재도, 제휴 링크도, 연락처 수집 양식도 없습니다. 광고는 디스플레이 광고뿐이며, 이는 독자의 방문이 대가로 치르는 것이 독자의 주의뿐이라는 뜻입니다.',
      '이곳의 어떤 도구도 여러분의 사정을 평가하지 않습니다. "계약금으로 20퍼센트를 내라"고 답하는 주택담보대출 계산기는 대부분 틀릴 것입니다. 올바른 답은 페이지가 볼 수 없는 것들, 즉 여러분의 다른 저축, 직장, 힘든 한 달을 견딜 수 있는 정도에 달려 있기 때문입니다. 그래서 모든 도구는 계산하고 거기서 멈춥니다.',
    ],
    rulesHeading: '사이트가 따르는 규칙',
    rules: [
      {
        label: '모든 도구는 한계를 밝힙니다.',
        body: '각 결과 아래에는 도구가 하지 않는 일을 나열한 블록이 있으며, 모든 페이지에서 같은 문장을 씁니다.',
      },
      {
        label: '어딘가에서 가져온 모든 수치에는 출처가 있습니다.',
        body: '가이드는 1차 출처로 연결되고 데이터를 확인한 날짜를 표시합니다. 사이트 자체의 계산은 전부 보여 줍니다.',
      },
      {
        label: '모든 페이지에는 검토 날짜가 있습니다.',
        body: '오랫동안 아무도 살펴보지 않은 가이드는 그렇다고 밝힙니다.',
      },
      {
        label: 'AI가 초안을 쓰고, 사람이 검토합니다.',
        body: '초안 도구는 문장을 다듬는 데 도움을 줍니다. 게시된 모든 페이지는 계산, 단위, 주장을 확인한 사람이 읽었습니다.',
      },
    ],
    whoHeading: '운영하는 사람',
    whoBody:
      '{name}. {bio} {reviewerName}은 가이드가 게시되기 전에 금융 내용을 읽습니다. {whoEditorialLink}에는 페이지가 공개되기 전에 검토에서 무엇을 확인하는지 나와 있으며, {whoCodeLink}: 공식, 단위 테스트, 그리고 깨진 페이지가 있는 배포를 막는 검사까지.',
    whoEditorialLink: '편집 페이지',
    whoCodeLink: '코드는 공개되어 있습니다',
    howHeading: '계산기의 작동 방식',
    howBody:
      '계산은 여러분의 브라우저에서 실행됩니다. 입력한 숫자를 받는 서버는 없으며, 계산에 관한 어떤 것도 누구에게도 전송되지 않습니다. 공식은 한 번, 한곳에 구현되어 있고, 알려진 공개 대출 수치 및 수학이 요구하는 불변 조건과 대조하는 단위 테스트로 검증됩니다. 상환 일정의 합이 빌린 금액과 같은지, 대출이 정확히 0에서 끝나는지, 이자 없는 잔액이 입금액만큼만 늘어나는지 같은 것들입니다.',
    correctionsHeading: '정정',
    correctionsBody:
      '수치가 틀렸거나, 출처 링크가 끊겼거나, 페이지가 스스로 모순된다면 그것은 결함이며 고쳐져야 합니다. {contactLink}에 신고 방법이 나와 있으며, 모든 정정은 조용한 수정이 아니라 검토 날짜의 변경으로 이어집니다.',
    contactLink: '문의 페이지',
  },

  contact: {
    title: '문의',
    emailLine: '{email}로 이메일을 보내 주세요.',
    description:
      '틀린 수치, 끊긴 링크, 빠진 주제, 광고 문제에 대해 사이트에 연락하는 방법.',
    heading: '문의',
    lede: '사람이 직접 읽는 주소 하나입니다. 답장에는 며칠이 걸리며, 페이지가 게시된 직후 몇 주 동안은 보통 더 오래 걸립니다.',
    worthHeading: '이런 내용을 알려 주세요',
    worth: [
      {
        label: '틀린 숫자.',
        body: '페이지의 수치가 직접 계산한 값과 맞지 않으면, 사용한 입력값과 얻은 수치를 보내 주세요. 그것은 결함이며 확인하겠습니다.',
      },
      {
        label: '깨지거나 끊긴 출처 링크.',
        body: '출처는 정기적으로 확인하지만, 확인과 확인 사이에 링크가 끊길 수 있습니다.',
      },
      {
        label: '빠진 주제.',
        body: '가이드는 독자가 가장 어려워하는 계산을 중심으로 쓰이므로, 빠진 부분은 대개 그 계산에서 빠진 부분입니다.',
      },
      {
        label: '광고 문제.',
        body: '오해를 부르거나, 페이지를 망가뜨리거나, 내용을 가리는 광고는 신고할 만합니다. 사이트가 디스플레이 광고로 운영되므로 이런 신고는 진지하게 다룹니다.',
      },
    ],
    nextHeading: '그다음에는',
    nextBody:
      '신고된 수치는 출처와 대조되며, 수치가 틀렸다면 페이지가 바뀝니다. 페이지의 검토 날짜는 내용을 확인할 때마다 바뀌며, 무언가 바뀌었든 아니든 마찬가지입니다. 그래서 그 날짜는 사람이 마지막으로 페이지를 읽은 때를 알려 줍니다.',
  },

  contactForm: {
    heading: '메시지 쓰기',
    lede: '이 양식은 이 사이트를 읽는 사람에게 메시지를 보내며, 답장은 여기에 적은 주소로 갑니다.',
    nameLabel: '이름',
    emailLabel: '이메일 주소',
    subjectLabel: '제목',
    messageLabel: '메시지',
    submit: '메시지 보내기',
    note: '메시지는 이메일로 전송되며 사람이 읽습니다.',
    statuses: [
      { key: 'sent', text: '메시지를 보냈습니다. 답장은 적어 주신 주소로 갑니다.' },
      { key: 'email', text: '이메일 주소가 완전하지 않은 것 같습니다. 확인한 뒤 다시 보내 주세요.' },
      { key: 'fields', text: '모든 필드를 채워 주세요.' },
      { key: 'rate', text: '짧은 시간에 이 주소에서 여러 메시지가 전송되었습니다. 1분 기다린 뒤 다시 보내 주세요.' },
      { key: 'failed', text: '메시지를 보내지 못했습니다. 대신 위의 주소로 이메일을 보내 주세요.' },
    ],
  },

  sourcesPage: {
    title: '출처',
    description:
      '이 사이트가 수치와 방법에서 기대는 모든 1차 출처와, 각 출처가 여기 있는 이유.',
    heading: '출처',
    lede: '이 사이트의 모든 수치는 아래 기관 중 하나에서 오거나, 사이트가 전부 보여 주는 계산에서 나옵니다. 블로그 글, 요약, 2차 재서술에서 인용한 것은 없습니다.',
    whyHeading: '출처 목록이 있는 이유',
    whyBody: [
      '출처 없는 숫자는 주장일 뿐입니다. 이 페이지들은 계산을 직접 확인하고 싶은 사람을 위해 쓰였고, 그러려면 원본 데이터가 클릭 한 번 거리에 있어야 합니다. 그래서 각 가이드에는 자체 출처 목록이 있고, 이 페이지는 그 모두의 색인입니다.',
      '사이트가 따르는 규칙은 의도적으로 좁습니다. 정부 기관, 증권 규제 기관, 중앙은행, 그리고 정부 후원 주택담보대출 기관(GSE)입니다. 수치가 민간 조사에서 나온 경우, 페이지는 그 사실을 밝히고 조사 이름을 적습니다.',
    ],
    howHeading: '출처를 쓰는 방식',
    how: [
      {
        label: '방법과 공식',
        body: '은 그 방법을 공표하는 기관에서 가져옵니다. 상환 공식은 CFPB의 지침에, 복리 주기 규칙은 SEC의 용어집에, 세금 기준액은 IRS의 연간 물가 조정에 있습니다.',
      },
      {
        label: '공표된 통계',
        body: '는 그 통계를 만든 통계 기관에서 가져오며, 수치를 확인한 날짜를 함께 적습니다.',
      },
      {
        label: '시장 금리',
        body: '는 그것을 공표하는 조사에서 가져오고 페이지에 날짜를 표시합니다. 다른 달의 금리는 다른 숫자이기 때문입니다.',
      },
      {
        label: '주별 수치',
        body: '는 각 주의 법령과 서식에서 소득세 구간을 정리하고, 자신이 발표하는 미국 지역사회 조사(American Community Survey)에서 재산세율을 정리하는 Tax Foundation에서 가져옵니다. 세대주 세율표, 납부한 연방 소득세 공제, 주 세액공제는 각 주의 신고서와 안내서에서 가져옵니다.',
      },
    ],
    sources: [
      {
        label: '소비자금융보호국(CFPB) — 주택담보대출, 소비자 신용',
        url: 'https://www.consumerfinance.gov/',
      },
      {
        label: '국세청(IRS) — 세율 구간, 물가 조정, 은퇴 규정',
        url: 'https://www.irs.gov/',
      },
      {
        label: '사회보장국(SSA) — 급여세율, 과세 상한, 연간 한도',
        url: 'https://www.ssa.gov/',
      },
      {
        label: 'Freddie Mac — Primary Mortgage Market Survey',
        url: 'https://www.freddiemac.com/pmms',
      },
      {
        label: 'Fannie Mae — 연구와 시장 논평',
        url: 'https://www.fanniemae.com/research-and-insights',
      },
      {
        label: '주택도시개발부(HUD) — FHA, HECM, 공정 주거',
        url: 'https://www.hud.gov/',
      },
      {
        label: '노동통계국(BLS) — 소비자물가지수',
        url: 'https://www.bls.gov/cpi/',
      },
      {
        label: '연방준비제도 이사회 — 금리 데이터(H.15)',
        url: 'https://www.federalreserve.gov/releases/h15/',
      },
      {
        label: '증권거래위원회(SEC) — Investor.gov',
        url: 'https://www.investor.gov/',
      },
      {
        label: '세인트루이스 연방준비은행(FRED) — 경제 데이터 시계열',
        url: 'https://fred.stlouisfed.org/',
      },
      {
        label: '노동통계국 — CPI 계산기와 데이터 표',
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
        label: 'Tax Foundation — Facts & Figures 2026, 2026년 4월 28일 기준 주 개인 소득세율',
        url: 'https://taxfoundation.org/data/all/state/2026-state-tax-data/',
      },
      {
        label: '전미주의회협의회(NCSL) — 주 근로장려세액공제와 자녀세액공제',
        url: 'https://www.ncsl.org/human-services/',
      },
      {
        label: 'Tax Policy Center — 주 소득세율과 세액공제',
        url: 'https://taxpolicycenter.org/',
      },
      {
        label: 'Prenatal-to-3 Policy Impact Center — 주 자녀세액공제 정책',
        url: 'https://pn3policy.org/',
      },
    ],
  },

  editorial: {
    title: '편집팀',
    description:
      '누가 가이드를 쓰고, 누가 검토하며, 페이지가 게시되기 전에 검토에서 실제로 무엇을 확인하는지.',
    heading: '편집팀',
    lede: '한 사람이 가이드를 씁니다. 다른 한 사람이 각 가이드가 공개되기 전에 금융 내용을 읽습니다. 이 페이지는 그들이 누구인지, 검토에서 무엇을 확인하는지, 그리고 여러분이 직접 확인할 수 있는 것이 무엇인지 알려 줍니다.',
    authorEyebrow: '저자',
    reviewerEyebrow: '금융 검토자',
    checkEyebrow: '직접 확인할 수 있는 것',
    checkHeading: '계산은 공개되어 있습니다',
    checkBody:
      '모든 계산기의 코드는 공개 저장소에 있습니다. 구현한 공식, 그 공식을 알려진 공개 수치와 대조하는 단위 테스트, 깨진 페이지가 있는 배포를 막는 검사까지 함께 있습니다. 숫자를 믿음으로 받아들일 필요도, 누구에게 물어볼 필요도 없습니다.',
    openRepository: '저장소 열기',
    twoNamesHeading: '두 이름, 두 역할',
    twoNamesBody: [
      '한 사람은 가이드를 쓰고 계산 엔진을 관리합니다. 다른 한 사람은 가이드가 게시되기 전에 금융 내용을 읽으며 수치, 그 바탕이 된 가정, 수치의 출처를 확인합니다. 두 역할은 일부러 나뉘어 있습니다. 가이드를 쓴 사람이 마지막으로 읽는 사람이 아닙니다.',
      '가이드에 검토자의 이름이 있다면 그 사람이 그 가이드를 검토한 사람이며, 그 이름은 그 가이드에만 나오고 다른 곳에는 나오지 않습니다. 검토는 특정 페이지에 대한 진술이므로 사이트 전체가 아니라 그 페이지에 붙습니다.',
      '이 페이지의 나머지는 검토에서 무엇을 확인하는지, 그리고 독자가 누구에게도 묻지 않고 무엇을 검증할 수 있는지 설명합니다.',
    ],
    reviewHeading: '검토에서 확인하는 것',
    reviewIntro: '가이드가 게시되기 전에 검토자는 매번 같은 목록을 차례로 확인합니다.',
    review: [
      {
        label: '계산.',
        body: '모든 공식은 출처와 대조되고, 본문의 계산 예시는 처음부터 다시 계산됩니다. 수치가 코드에도 있다면 둘을 비교합니다.',
      },
      {
        label: '단위.',
        body: '백분율과 소수, 개월과 년, 달러와 천 달러. 금융 문서의 실수 대부분은 단위 오류입니다.',
      },
      {
        label: '경계 사례.',
        body: '이자율 0, 기간 0, 음수 값. 각각 오류 메시지가 아니라 합리적인 답이 나오는지 확인합니다.',
      },
      {
        label: '문장.',
        body: '페이지는 독자에게 무엇을 하라고 말해서는 안 됩니다. 숫자가 무엇을 뜻하고 무엇에 달려 있는지 설명하고 거기서 멈춥니다. 행동을 권하는 가이드는 다시 씁니다.',
      },
      {
        label: '출처.',
        body: '모든 링크를 열어 보고, 연결된 주장과 맞는지 확인하고, 날짜를 적습니다.',
      },
    ],
    toolsHeading: '초안 도구를 쓰는 방식',
    toolsBody: [
      '초안 도구는 문장에 도움을 줍니다. 페이지가 무엇을 말할지 결정하지는 않습니다. 모든 수치, 모든 공식, 모든 주장은 사람이 쓰거나 확인하며, 위의 검토 없이 공개되는 페이지는 없습니다. 그럴듯한 숫자를 내놓은 도구야말로 이 과정이 잡아내려고 존재하는 대상입니다.',
      '그것을 잡아내는 검사는 사람만의 일이 아닙니다. 계산 엔진에는 변경될 때마다 실행되는 단위 테스트가 있어 수치가 바뀌면 배포를 막습니다. 상환 일정의 합은 빌린 금액과 같아야 하고, 대출은 정확히 0에서 끝나야 하며, 기간별 전망은 모든 복리 주기에서 닫힌 형태의 공식과 일치해야 합니다. 문장 한 단락은 이런 식으로 실패할 수 없습니다. 공식은 그럴 수 있고, 그렇게 되면 빌드가 멈춥니다.',
    ],
    datesHeading: '검토 날짜',
    datesBody:
      '모든 가이드에는 마지막으로 검토한 날짜가 있습니다. 내용이 외부 데이터에 달린 가이드는 적어도 1년에 두 번 검토하고, 계산을 설명하는 가이드는 그 공식이 바뀔 때, 그리고 어떤 경우든 1년에 한 번 검토합니다. 페이지를 검토하면 본문이 바뀌었든 아니든 날짜가 바뀌므로, 그 날짜는 사람이 마지막으로 페이지를 읽은 때를 알려 줍니다.',
    correctionsHeading: '정정',
    correctionsBody:
      '정정은 공개적으로 이루어집니다. 정정된 페이지는 검토 날짜가 갱신되고, 정정 내용은 그 정정이 시작된 문의 스레드에 설명됩니다. 수치가 틀린 가이드는 글쓰기가 아니라 검토의 결함이며, 바뀌는 것은 검토 과정입니다.',
    contactLink: '문의',
  },

  privacy: {
    title: '개인정보',
    description:
      '이 사이트가 수집하는 것, 수집하지 않는 것, 그리고 페이지에 나오는 광고 및 분석 제공 업체.',
    heading: '개인정보',
    lede: '짧게 말하면: 계산기에 입력한 숫자는 여러분의 브라우저에 머물고, 사이트 자체는 추적 쿠키를 보관하지 않습니다.',
    calculatorsHeading: '계산기가 입력값으로 하는 일',
    calculatorsBody:
      '아무것도 하지 않습니다. 계산은 페이지와 함께 내려받은 JavaScript로 여러분의 브라우저에서 실행됩니다. 입력한 값은 어디에도 전송되지 않고, 저장되지 않으며, 사이트나 다른 누구에게도 보이지 않습니다. 탭을 닫으면 사라집니다.',
    stateHeading: '여러분의 주',
    stateBody:
      '계산기 중 두 개는 주(州)의 수치가 필요합니다. 연방 세금 위에 주 소득세를 더하는 연방 소득세 계산기와, 주택 소유 비용에 재산세를 포함하는 임차 대 매수 계산기입니다. 이 페이지 중 하나가 열리면, 요청이 어느 주에서 왔는지 이 사이트에 묻습니다. 답은 사이트를 제공하는 네트워크가 요청 주소로 주를 판별해 내놓으며, 필드 하나를 채우는 데 쓰입니다. 그 밖에는 아무 일도 일어나지 않습니다. 답은 저장되지 않고, 쿠키에 기록되지 않으며, Google이나 호스팅 업체의 페이지 분석으로 전송되지 않습니다. 주는 근사치입니다. VPN, 프록시, 모바일 네트워크 때문에 다른 주로 잡힐 수 있으며, 채워진 필드는 바꾸거나 지울 수 있고, 그 경우 페이지는 여러분이 입력한 수치를 유지합니다.',
    cookiesHeading: '쿠키',
    cookiesBody:
      '{name}은 자체 쿠키를 설정하지 않습니다. 사이트 자체의 분석은 Google Analytics 4로 실행되며, Google이 자체 도메인에서 제공하고 한 방문과 다음 방문을 구별하기 위해 여러분의 브라우저에 퍼스트 파티 식별자를 저장합니다. 이 식별자는 광고에 쓰이지 않고 다른 사이트와 공유되지 않습니다. 호스팅 업체의 페이지 분석은 여러분의 브라우저에 아무것도 저장하지 않습니다. 쿠키도, 로컬 저장소도, 어떤 종류의 식별자도 없습니다.',
    advertisingHeading: '광고',
    advertisingBody:
      '이 사이트는 Google AdSense가 게재하는 디스플레이 광고로 운영됩니다. Google과 파트너는 광고를 게재하고 측정하기 위해 쿠키를 설정하거나 비슷한 기술을 쓸 수 있으며, 이 사이트나 다른 웹사이트에 대한 이전 방문을 바탕으로 광고를 게재하는 데 쓸 수 있습니다. {adsSettingsLink}에서 선택 사항을 검토하고 바꿀 수 있으며, Google이 자사 서비스를 이용하는 사이트와 앱의 데이터를 어떻게 쓰는지에 대한 Google의 설명은 {policiesLink}에 있습니다.',
    adsSettingsLink: 'Google 광고 설정',
    policiesLink: 'policies.google.com',
    analyticsPoliciesLink: 'policies.google.com',
    analyticsHeading: '분석',
    analyticsBody:
      '페이지 조회는 Google이 googletagmanager.com에서 제공하는 Google Analytics 4로 기록됩니다. 사용하는 데이터는 페이지, 유입 경로, 국가나 도시 수준의 대략적인 위치로 한정되며, IP 주소는 전부 저장하지 않고 잘라 냅니다. 이 데이터는 방문 수를 세고 어떤 페이지가 읽히는지 알아내는 데 쓰입니다. Google이 자사 서비스를 이용하는 사이트와 앱의 데이터를 어떻게 쓰는지에 대한 Google의 설명은 {analyticsPoliciesLink}에 있습니다. 스크립트는 쿠키에 동의한 뒤에만 로드되며, 유럽연합의 독자에게도 로드됩니다.',
    hostingAnalyticsHeading: '호스팅과 페이지 성능',
    hostingAnalyticsBody:
      '이 사이트는 Cloudflare에서 호스팅되며, Cloudflare의 Web Analytics가 모든 페이지에서 실행됩니다. static.cloudflareinsights.com에서 제공하는 작은 스크립트가 페이지 조회를 측정합니다. 어떤 페이지가 열렸는지, 방문이 어디서 왔는지, 어떤 브라우저와 운영 체제를 썼는지, 요청이 어느 나라에서 왔는지, 페이지가 로드되는 데 얼마나 걸렸는지입니다. IP 주소는 Cloudflare 엣지에서 국가를 판별하는 데 쓰이고 그곳에서 저장되지 않고 폐기됩니다. 이 스크립트는 쿠키를 설정하지 않고, 로컬 저장소에 아무것도 쓰지 않으며, 페이지에서 페이지로 여러분을 따라다닐 수 있는 식별자를 만들지 않습니다. 결과로 나오는 것은 페이지 조회 수와 방문 수, 그리고 페이지 로드 속도에 대한 측정치입니다. 스크립트는 쿠키에 동의한 뒤에만 로드됩니다. 유럽연합의 독자는 전혀 집계되지 않습니다. 그들에게는 스크립트가 로드되지 않습니다.',
    newsletterHeading: '뉴스레터',
    newsletterBody:
      '뉴스레터를 구독하면 입력한 주소가 메일을 보내는 서비스인 Buttondown으로 전송되어, 뉴스레터를 보낼 수 있도록 그곳에 저장됩니다. 그 주소는 뉴스레터에만 쓰이고 다른 어떤 용도로도 쓰이지 않으며, 모든 호에는 구독 취소 링크가 있습니다.',
    contactHeading: '문의 양식',
    contactBody:
      '문의 양식으로 메시지를 보내면 이름, 이메일 주소, 제목, 메시지 자체가 사이트를 운영하는 사람에게 이메일로 전송되어 그 메일함에 보관됩니다. 양식은 이 사이트에서 제공되며, 대화를 이어 갈 수 있도록 답장은 여러분이 적은 주소로 갑니다. 양식은 Google에 아무것도 보내지 않고 자체 쿠키를 설정하지 않습니다. 위에서 설명한 광고 스크립트와 분석 스크립트는 페이지 전체에 속하며, 쿠키에 동의한 경우에만 로드됩니다. 입력한 어떤 것도 사이트 자체에 저장되지 않으며, 메시지는 다른 누구에게도 전달되지 않습니다.',
    thirdPartyHeading: '제3자 링크',
    thirdPartyBody:
      '가이드는 정부 기관, SEC, 연방준비제도 같은 1차 출처로 연결됩니다. 그 사이트들에는 자체 개인정보 처리방침이 있으며, 이 사이트는 그것을 통제하지 않고 여러분을 대신해 읽지도 않았습니다.',
    changesHeading: '변경',
    changesBody:
      '위의 제공 업체가 바뀌면 이 페이지도 함께 바뀝니다. 페이지 하단의 날짜는 이 글을 마지막으로 검토한 날짜입니다.',
    consentHeading: '여러분의 선택',
    consentBody:
      '여러분이 답하기 전까지는 Google에서 아무것도 로드되지 않으며, 호스팅 업체의 페이지 분석도 꺼져 있습니다. 동의하면 광고와 분석 스크립트가 로드되고 답변은 브라우저에 기억됩니다. 거부해도 사이트는 똑같이 작동하며 아무것도 로드되지 않습니다. 유럽연합의 독자에게는 어떤 답을 하든 호스팅 업체의 페이지 분석이 빠집니다. 바닥글의 "{settingsLink}" 링크를 누르면 질문이 다시 열립니다. 한 가지 예외가 있습니다. 사이트에 광고가 있는지 확인하는 Google의 크롤러는 질문에 답할 수 없으므로 광고 스크립트를 바로 받습니다. 크롤러에 대해서는 어떤 선택도 기록되지 않고 아무것도 저장되지 않습니다. 위에서 설명한 주는 두 계산기 페이지에서 읽히며 이 선택에 포함되지 않습니다. 주를 위해 설정되는 쿠키는 없고, 주에 관한 어떤 것도 분석 제공 업체에 전달되지 않습니다.',
    lastReviewed: '최근 검토: {date}.',
  },

  terms: {
    title: '이용약관',
    description:
      '이 사이트가 게시되는 조건, 계산기가 다루는 것과 다루지 않는 것, 그리고 사이트가 약속할 수 있는 범위.',
    heading: '이용약관',
    lede: '권고가 아니라 계산을 게시하는 사이트를 위한 간단한 약관입니다.',
    providesHeading: '이 사이트가 제공하는 것',
    providesBody:
      '{name}은 계산기와 그 뒤의 계산을 글로 설명한 내용을 게시합니다. 계산기는 공개된 공식을 여러분이 입력한 값에 적용하고 계산 과정과 함께 결과를 돌려줍니다. 그것이 서비스의 전부입니다.',
    notProvidesHeading: '이 사이트가 제공하지 않는 것',
    notProvidesBody: [
      '이곳의 어떤 것도 금융, 세무, 법률, 투자 조언이 아니며, 무엇을 사거나 팔거나 보유하거나 임차하거나 소유하거나 재융자하거나 서명하라는 권고도 아닙니다. 결과는 여러분이 입력한 값과 페이지의 공식을 반영합니다. 입력값을 바꾸면 결과가 바뀝니다. 바로 그 점이 그것을 결론이 아니라 계산으로 만듭니다.',
      '계산기는 여러분의 재정, 소득, 신용, 투자 기간, 위험 감수 성향을 볼 수 없으며 추측하려고 하지도 않습니다. 입력값은 같지만 사정이 다른 두 사람은 서로 다른 결론에 이를 것이고, 계산기는 그중 누가 옳은지 말할 위치에 있지 않습니다.',
    ],
    figuresHeading: '수치, 출처, 날짜',
    figuresBody:
      '수치가 외부 출처에서 온 경우, 페이지는 그 출처로 연결되고 확인한 날짜를 적습니다. 외부 데이터는 바뀝니다. 세금 기준액, 공표 금리, 공식 통계는 모두 개정됩니다. 페이지의 수치는 그 페이지의 검토 날짜 기준으로 정확하며 그 이후는 보장하지 않습니다. 검토 날짜는 그 수치가 얼마나 오래되었는지 보여 주기 위해 있습니다.',
    errorsHeading: '오류',
    errorsBody:
      '계산은 한 번, 한곳에 구현되어 있고 테스트를 거쳤습니다. 그래도 실수는 있을 수 있습니다. 오류를 발견하면 문의 페이지에 신고 방법이 나와 있으며, 신고된 결함은 고쳐지고 검토 날짜가 갱신됩니다.',
    advertisingHeading: '광고',
    advertisingBody:
      '이 사이트는 디스플레이 광고로 운영됩니다. 광고는 제3자가 게재하며 사이트가 통제하지 않습니다. 광고는 표시되어 있고 사이트 자체의 내용과 분리되어 있습니다. 어떤 광고주도 페이지, 게재 위치, 검색 결과 내 순위, 가이드 속 제품 언급에 돈을 내지 않습니다.',
    useHeading: '사이트 이용',
    useBody:
      '이 사이트는 개인 용도로 게시됩니다. 읽고, 인쇄하고, 링크할 수 있습니다. 가이드의 상당 부분을 자신의 저작물로 재게시하거나, 계산기를 이용해 이 사이트와 경쟁하는 제품을 만들 수는 없습니다.',
    changesHeading: '변경',
    changesBody:
      '이 약관은 사이트가 바뀌면서 바뀔 수 있습니다. 아래의 검토 날짜는 이 글을 마지막으로 읽은 날짜입니다.',
    lastReviewed: '최근 검토: {date}.',
    contactLink: '문의 페이지',
  },

  notFound: {
    title: '페이지를 찾을 수 없습니다',
    description: '이 사이트에는 그런 페이지가 없습니다. 모든 것이 실제로 있는 곳은 여기입니다.',
    heading: '페이지를 찾을 수 없습니다',
    lede: '그런 주소는 여기 없습니다. 사이트가 게시하는 것은 모두 계산기, 그 뒤의 가이드, 또는 숫자의 출처를 설명하는 페이지입니다.',
    calculators: {
      title: '계산기',
      text: '주택담보대출 상환액, 임차 대 매수, 복리.',
    },
    guides: {
      title: '가이드',
      text: '각 계산기 뒤의 계산을 자세히.',
    },
    sources: {
      title: '출처',
      text: '사이트가 기대는 모든 1차 출처.',
    },
    contact: {
      title: '문의',
      text: '빠지거나 틀린 것을 알려 주세요.',
    },
  },

  tool: {
    'mortgage-payment': {
      name: '주택담보대출 상환액 계산기',
      title: '상환 일정을 포함한 주택담보대출 상환액 계산기',
      description:
        '월 주택담보대출 상환액, PITI 총비용, 전체 상환 일정을 계산합니다. 이자를 1달러 단위까지 확인하고, 추가 상환이 완납일을 어떻게 앞당기는지 살펴보세요.',
      short: '월 원리금, 전체 PITI, 상환 일정, 추가 상환의 효과.',
      category: '주택',
      methodNote:
        '상환액 공식, 상환 일정, 추가 상환을 적용하는 방식은 아래에 설명되어 있습니다. 이 페이지의 어떤 것도 실시간 시장 시세가 아닙니다.',
      fields: {
        homePrice: '주택 가격',
        downPayment: '계약금',
        percentOfPrice: '가격 대비 비율',
        interestRate: '이자율',
        annualFixed: '연, 고정',
        loanTerm: '대출 기간',
        propertyTax: '재산세',
        percentOfPricePerYear: '연간 가격 대비 %',
        homeInsurance: '주택 보험',
        perYear: '연간',
        hoaFee: 'HOA 또는 콘도 관리비',
        perMonth: '월간',
        extraPrincipal: '추가 원금 상환',
        firstPayment: '첫 상환',
        month: '월',
        seeAmortization: '연도별 상환 내역 보기',
      },
      terms: {
        years: (n: number) => `${n}년`,
      },
      table: {
        year: '연도',
        principal: '원금',
        interest: '이자',
        balance: '잔액',
      },
      result: {
        headlineLabel: '월 총상환액(PITI)',
        principalAndInterest: '원금과 이자',
        propertyTax: '재산세',
        insurance: '보험',
        hoa: 'HOA',
        totalInterest: '총이자',
        paidOff: '완납',
        note: '입력한 숫자를 사용한 원금, 이자, 재산세, 보험, HOA.',
      },
      resultNote:
        '어떤 필드든 바꾸면 입력하는 동안 수치가 갱신됩니다. 어디로도 전송되지 않습니다. 계산은 이 페이지 안에서 실행됩니다.',
      chart: {
        title: '연도별 잔액과 이자',
        note: '대출을 갚아 나가면서 잔액이 줄고, 매년 내는 이자도 함께 줄어듭니다.',
        xAxis: 'years',
        series: [
          { key: 'balance', label: '잔액' },
          { key: 'interest', label: '납부 이자' },
        ],
      },
      formula: 'M = P · r(1 + r)ⁿ / ((1 + r)ⁿ − 1)',
      method: [
        '예정된 월 상환액은 표준 상환 공식에서 나옵니다.',
        'P는 빌린 금액으로, 이 페이지는 주택 가격에서 계약금을 뺀 값으로 계산합니다. r은 입력한 연이율을 12로 나눈 값이고, n은 개월 수로 나타낸 기간입니다. 이 숫자 하나로 계산기는 월별 일정을 만듭니다. 이자는 그달 초에 남아 있는 잔액에 붙고, 상환액에서 그 이자를 뺀 나머지가 잔액을 줄입니다.',
        '전체 월 상환액은 원리금에 재산세를 12로 나눈 값, 보험료를 12로 나눈 값, 그리고 HOA 관리비가 있다면 그것을 더한 것입니다. 이 세 가지는 여러분이 정합니다. 계산기는 지역 평가액이나 보험사가 얼마를 청구하는지 알지 못하며, 대신 추측하지 않습니다.',
        '월 추가 상환은 원금에 적용되므로 다음 달 이자가 붙는 잔액을 줄입니다. 예정된 상환액은 바뀌지 않고, 대출이 더 일찍 끝나며, 총이자가 줄어듭니다.',
      ],
      limits: [
        '대출 자격이 되는지 확인하지 않으며, 신용 점수, 소득, 총부채상환비율, 어떤 대출 기관의 심사 기준도 보지 않습니다.',
        '여러분의 우편번호에 대한 현재 시장 금리를 제시하지 않습니다. 입력한 이자율이 사용하는 이자율이며, 이 페이지의 어떤 것도 실시간이 아닙니다.',
        '민간 주택담보대출 보험, 포인트, 대출 취급 수수료, 클로징 비용, 세금 고지서가 몇 월에 나오는지를 정하는 에스크로 일정은 반영하지 않습니다.',
        '집을 살지 말지 알려 주지 않습니다. 숫자 하나와 그 뒤의 계산 과정을 내놓을 뿐입니다.',
      ],
      faq: [
        {
          q: 'PITI는 무슨 뜻인가요?',
          a: 'Principal, Interest, Taxes and Insurance, 즉 원금, 이자, 세금, 보험입니다. 네 부분으로 된 월 주거비로, 대출을 갚는 부분, 돈을 빌린 대가로 대출 기관에 내는 부분, 재산세, 주택 소유자 보험입니다. 이 계산기는 각 부분을 따로 보여 주어 무엇이 총액을 좌우하는지 알 수 있게 합니다.',
        },
        {
          q: '월 원리금은 어떻게 계산하나요?',
          a: '표준 상환 공식 M = P · r(1 + r)ⁿ / ((1 + r)ⁿ − 1)을 씁니다. P는 빌린 금액, r은 월 이자율, n은 월 상환 횟수입니다. 그에 따른 일정에서는 매달 이자가 줄고 원금이 늘어나므로, 초기 상환액은 대부분 이자입니다.',
        },
        {
          q: '마지막 상환은 어떻게 되나요?',
          a: '예정된 상환액은 센트 단위로 반올림되므로 기간이 끝날 때 몇 센트가 남습니다. 대출 기관이 마지막 상환액을 조정하는 것과 같은 방식으로, 마지막 예정 상환액을 조정해 대출이 정확히 0에서 끝나게 합니다.',
        },
        {
          q: '추가 상환은 대출 기간을 줄이나요, 상환액을 줄이나요?',
          a: '대출 기간을 줄입니다. 추가 상환은 원금에 적용되어 다음 달 이자가 붙는 잔액을 줄입니다. 예정된 상환액은 그대로이고, 대출은 더 일찍 끝나며 총이자도 줄어듭니다.',
        },
        {
          q: '총이자 수치는 입력한 세금과 보험의 영향을 받나요?',
          a: '아니요. 총이자는 대출만 다룹니다. 재산세, 보험, HOA는 대출을 다 갚은 뒤에도 계속되는 주거비이므로, 계산기는 총주거비를 따로 보여 줍니다.',
        },
        {
          q: '계산기가 물가 상승을 반영하나요?',
          a: '아니요. 모든 수치는 입력한 달러 기준입니다. 30년 뒤의 상환액은 오늘의 같은 상환액보다 소득에서 차지하는 비중이 훨씬 작지만, 이 페이지의 어떤 숫자도 그것을 반영해 조정하지 않습니다.',
        },
      ],
      sources: [
        {
          label: 'CFPB — 주택담보대출 상환액 계산 방법',
          url: 'https://www.consumerfinance.gov/ask-cfpb/how-do-i-calculate-my-mortgage-payment-en-144/',
        },
        {
          label: 'Freddie Mac — Primary Mortgage Market Survey(금리 산정 방법)',
          url: 'https://www.freddiemac.com/pmms',
        },
        {
          label: 'HUD — FHA 대출 요건과 주택담보대출 보험',
          url: 'https://www.hud.gov/helping_american_homeowners',
        },
        {
          label: 'BLS — 소비자물가지수(물가 상승, 실질 가치 설명용)',
          url: 'https://www.bls.gov/cpi/',
        },
      ],
      relatedGuides: [
        { slug: 'mortgage-payment-calculator-explained', title: '주택담보대출 상환액 계산기 해설' },
        { slug: 'how-mortgage-amortization-works', title: '주택담보대출 상환은 어떻게 이루어지나' },
        { slug: 'monthly-payment-vs-total-cost-mortgage', title: '주택담보대출의 월 상환액과 총비용' },
        { slug: 'extra-mortgage-payments-math', title: '주택담보대출 추가 상환의 수학' },
        { slug: 'how-to-read-an-amortization-schedule', title: '상환 일정표 읽는 법' },
      ],
    },

    'rent-vs-buy': {
      name: '임차 대 매수 계산기',
      title: '임차 대 매수 계산기: 실제 비용 비교',
      description:
        '임차와 소유를 숫자로 비교합니다. 월 비용, 초기 지출, 순자산, 두 경로가 교차하는 달까지. 판정 없이 계산만.',
      short: '월 비용, 초기 지출, 순자산 형성, 교차 시점.',
      category: '주택',
      methodNote:
        '비교 대상은 현금 유출과 순자산입니다. 일부러 판정을 내리지 않습니다. 교차 시점은 입력한 숫자에 관한 사실이지 권고가 아닙니다.',
      sections: {
        theHome: '주택',
        theRent: '임차료',
        runningCosts: '유지 비용',
        assumptions: '가정',
      },
      fields: {
        purchasePrice: '매입 가격',
        downPayment: '계약금',
        percentOfPrice: '가격 대비 비율',
        mortgageRate: '주택담보대출 금리',
        annualFixed: '연, 고정',
        loanTerm: '대출 기간',
        monthlyRent: '월 임차료',
        rentersInsurance: '세입자 보험',
        perMonth: '월간',
        propertyTax: '재산세',
        percentOfPricePerYear: '연간 가격 대비 %',
        homeInsurance: '주택 보험',
        perYear: '연간',
        hoaFee: 'HOA 또는 콘도 관리비',
        maintenance: '유지 보수',
        annualChangeInValue: '연간 가치 변화',
        negativeModelsAFall: '음수는 하락을 뜻함',
        compareOver: '비교 기간',
        closingCosts: '클로징 비용',
        percentOfPriceOnce: '가격 대비 %, 1회',
        sellingCosts: '매도 비용',
        percentOfFinalValue: '최종 가치 대비 %',
      },
      terms: {
        years: (n: number) => `${n}년`,
      },
      result: {
        headlineLabel: '월 차액(소유 빼기 임차)',
        monthlyRent: '월 임차료',
        monthlyOwnership: '월 소유 비용',
        monthlyOwnershipAfterLoan: '대출을 다 갚은 뒤의 월 소유 비용',
        upfrontOutlay: '초기 지출',
        equityBuilt: '형성된 순자산',
        homeValueAtHorizon: '기간 말 주택 가치',
        sellingCostsAtHorizon: '기간 말 매도 비용',
        netCostAtHorizon: '기간 말 순 소유 비용',
        crossover: '교차 시점',
        note: '소유 비용에는 대출 기간 동안의 주택담보대출 상환액, 그 이후의 재산세, 보험, HOA, 유지 보수가 포함됩니다. 순자산은 주택 가치에서 남은 대출 잔액을 빼고, 그 시점에 매도할 때 드는 매도 비용을 뺀 값입니다.',
      },
      resultNote:
        '교차 시점은 순 소유 비용(낸 현금에서 매도 시 남을 순자산을 뺀 값)이 임차의 현금 비용보다 처음으로 낮아지는 달입니다. 이 숫자들에 관한 사실이지 권고가 아닙니다.',
      chart: {
        title: '임차 비용 대 소유 비용',
        note: '두 선 모두 누적 현금입니다. 낸 임차료, 그리고 주택에 쓴 돈에서 형성된 순자산을 빼고 그 시점의 매도 비용을 반영한 값입니다.',
        xAxis: 'years',
        series: [
          { key: 'rent', label: '낸 임차료' },
          { key: 'ownership', label: '순 소유 비용' },
        ],
      },
      method: [
        '매달 계산기는 두 장부를 나란히 기록합니다. 임차 장부에는 임차료와 세입자 보험이 더해집니다. 소유 장부에는 표준 상환 공식에 따른 주택담보대출 상환액, 재산세, 보험, HOA, 유지 보수 충당금이 더해지고, 첫 달에는 계약금과 클로징 비용도 더해집니다. 주택담보대출 상환은 대출을 다 갚으면 멈추고, 나머지 유지 비용은 집을 소유하는 동안 계속됩니다.',
        '두 번째 장부와 함께 계산기는 입력한 연간 변화율로 매달 오르거나 내리는 주택 가치와 남은 대출 잔액을 추적합니다. 둘의 차이가 여러분의 순자산입니다.',
        '순 소유 비용은 낸 현금에서 형성된 순자산을 빼고, 그 시점에 매도할 때 드는 매도 비용을 더한 값입니다. 교차 시점은 이 수치가 같은 기간에 냈을 임차료보다 처음으로 낮아지는 달입니다. 매도 비용은 팔 때까지 내지 않으므로 월 상환액에 포함되지 않고, 매도가 일어나는 순자산 쪽에 들어갑니다.',
      ],
      formula: '순자산 = 주택 가치 − 남은 대출 잔액',
      limits: [
        '어느 쪽이 여러분에게 더 나은지 말하지 않습니다. 두 경로를 입력한 숫자로 비교하고 교차 시점을 알려 줄 뿐입니다.',
        '매도에 대한 세금, 주택담보대출 이자 공제, 시간에 따른 부동산 감가상각은 반영하지 않습니다.',
        '특정 대출의 가격을 매기지 않습니다. 입력한 주택담보대출 금리를 그대로 쓰며, 페이지에는 실시간 시세나 대출 기관 정보가 없습니다.',
        '주택 가격을 예측하지 않습니다. 입력한 연간 가치 변화는 전체 기간 동안 매달 적용되며, 음수를 입력하면 반대 방향으로 적용됩니다.',
        '임차 주택에서 이사 나가는 비용은 반영하지 않습니다. 보증금, 중개 수수료, 이사 비용은 임차 쪽 비교에서 빠져 있습니다.',
        '특정 카운티나 도시의 세율을 쓰지 않습니다. 페이지가 채울 수 있는 재산세율은 주 평균이며, 재산세는 지역에서 정하므로 한 관할 구역의 세율은 대개 이웃 구역과 다릅니다.',
      ],
      faq: [
        {
          q: '교차 시점은 무슨 뜻인가요?',
          a: '순 소유 비용, 즉 낸 현금에서 형성된 순자산을 빼고 그 시점의 매도 비용을 더한 값이, 같은 기간에 임차료로 냈을 현금보다 처음으로 낮아지는 달입니다. 그 전까지는 현금 기준으로 임차가 덜 들었습니다. 그 뒤로는 순자산을 셈에 넣으면 소유가 덜 들었습니다.',
        },
        {
          q: '계산에 유지 보수 충당금이 왜 들어가나요?',
          a: '집은 주택담보대출이 있든 없든 수리하는 데 돈이 들고, 그 비용은 어떤 클로징 서류에도 나오지 않습니다. 계산기는 이를 매년 매입 가격의 일정 비율로 적용하며, 그 비율은 여러분이 정하는 입력값입니다.',
        },
        {
          q: '계산에서 주택 가치는 어떻게 되나요?',
          a: '입력한 연간 변화율로 매달 오르거나 내리고, 남은 대출 잔액과 비교해 순자산 수치를 냅니다. 음수 변화율은 하락장을, 0은 가격 유지를 뜻합니다.',
        },
        {
          q: '매도 비용이 포함되나요?',
          a: '네. 매도 비용은 매도 시점의 주택 가격에 붙으므로 월 상환액에는 포함되지 않습니다. 매도 시 남을 순자산을 줄이므로 순 소유 비용과 교차 시점의 일부가 됩니다. 이 수치는 기간 말에 따로 보여 줍니다.',
        },
        {
          q: '대출을 다 갚은 뒤 주택담보대출 상환은 어떻게 되나요?',
          a: '멈춥니다. 대출의 원금과 이자는 대출과 함께 끝나고, 재산세, 보험, HOA, 유지 보수는 집을 소유하는 동안 계속됩니다. 비교 기간이 대출 기간보다 길면 그 이후의 달에는 유지 비용만 들어갑니다.',
        },
        {
          q: '총임차료와 순 소유 비용은 어떻게 다른가요?',
          a: '총임차료는 단순히 월 임차료에 개월 수를 곱한 것입니다. 순 소유 비용은 주택담보대출, 세금, 보험, HOA, 유지 보수에 낸 돈에 초기 지출을 더하고, 쌓인 순자산을 빼고, 매도 비용을 더한 값입니다. 두 번째 수치는 음수가 될 수 있는데, 이는 낸 돈보다 더 많은 순자산을 쌓았다는 뜻입니다.',
        },
        {
          q: '집을 팔 때의 세금 문제도 포함되나요?',
          a: '아니요. 매도 차익과 그에 적용되는 공제는 이 도구의 범위 밖입니다. 여기서의 비교는 세금 비교가 아니라 현금과 순자산 비교입니다.',
        },
        {
          q: '재산세율은 어디서 오나요?',
          a: '입력값입니다. 네트워크가 요청이 어느 주에서 왔는지 판별할 수 있으면, 페이지는 그 주의 평균 실효 재산세율로 필드를 채웁니다. 이 값은 2024년 미국 지역사회 조사에서 가져와 Tax Foundation이 2026년 기준으로 발표한 것입니다. 재산세는 지방 정부가 정하므로 특정 카운티나 도시의 세율은 대개 주 평균과 다르며, 필드는 계속 수정할 수 있습니다.',
        },
      ],
      sources: [
        {
          label: 'CFPB — 주거비, 임차와 소유',
          url: 'https://www.consumerfinance.gov/consumer-tools/mortgages/',
        },
        {
          label: 'HUD — 주거비, 재산세, 보험 안내',
          url: 'https://www.hud.gov/helping_american_homeowners',
        },
        {
          label: 'BLS — 소비자물가지수(물가 상승, 가치 상승 설명용)',
          url: 'https://www.bls.gov/cpi/',
        },
        {
          label: 'FRED — 장기 가격 변동에 쓰는 주택 가격 지수 시계열',
          url: 'https://fred.stlouisfed.org/series/HPINUS',
        },
        {
          label: 'Tax Foundation — Property Taxes by State and County, 2026',
          url: 'https://taxfoundation.org/data/all/state/property-taxes-by-state-county/',
        },
      ],
      relatedGuides: [
        { slug: 'rent-vs-buy-calculator-explained', title: '임차 대 매수 계산기 해설' },
        { slug: 'rent-vs-buy-common-mistakes', title: '임차 대 매수 비교에서 흔한 실수' },
        { slug: 'estimating-property-tax-and-home-insurance', title: '재산세와 주택 보험 추정하기' },
        { slug: 'down-payment-and-closing-costs-explained', title: '계약금과 클로징 비용 해설' },
        { slug: 'monthly-payment-vs-total-cost-mortgage', title: '주택담보대출의 월 상환액과 총비용' },
      ],
      script: {
        notWithinHorizon: '비교 기간 내에 없음',
        month: '{n}개월째',
        propertyTaxDetected: '{state} 기준으로 채움: 해당 주의 평균 실효 재산세율.',
      },
    },

    'compound-interest': {
      name: '복리 계산기',
      title: '월 적립을 포함한 복리 계산기',
      description:
        '정기 적립과 함께 잔액을 전망하고, 복리 주기를 고르고, 물가 상승을 반영한 오늘의 달러 기준 결과를 확인하세요. 공식을 보여 줍니다.',
      short: '잔액, 적립액, 이자 수익, 물가 반영 가치.',
      category: '투자',
      methodNote:
        '전망은 한 기간씩 진행되므로, 연도별 표는 최종 수치를 만드는 것과 같은 계산으로 만들어집니다.',
      fields: {
        startingBalance: '시작 잔액',
        today: '현재',
        monthlyContribution: '월 적립액',
        addedEachMonth: '매달 추가',
        interestRate: '이자율',
        annualNominal: '연, 명목',
        time: '기간',
        years: '년',
        compounding: '복리 주기',
        contributionTiming: '적립 시점',
        inflation: '물가 상승률',
        annualForRealValue: '연, 실질 가치 계산용',
        seeBalance: '연도별 잔액 보기',
      },
      frequencies: {
        monthly: '매월',
        quarterly: '분기마다',
        twiceAYear: '반년마다',
        annually: '매년',
        everyTwoMonths: '두 달마다',
        everyFourMonths: '넉 달마다',
      },
      timing: {
        endOfMonth: '월말',
        startOfMonth: '월초',
      },
      table: {
        year: '연도',
        balance: '잔액',
        contributed: '적립액',
        interest: '이자',
        inTodaysDollars: '오늘의 달러 기준',
      },
      result: {
        headlineLabel: '기간 말 잔액',
        totalContributions: '총적립액',
        interestEarned: '이자 수익',
        inTodaysDollars: '오늘의 달러 기준',
        effectiveAnnualRate: '실효 연이율',
        realAnnualRate: '실질 연이율',
        horizon: '기간',
        note: '잔액은 입력한 달러 기준입니다. 물가 반영 수치는 이를 시작 연도의 구매력으로 환산합니다.',
      },
      resultNote:
        '입력한 이자율은 전체 기간 동안 입력한 그대로 쓰입니다. 이 페이지는 시장 금리를 조회하지 않습니다.',
      chart: {
        title: '잔액의 구성',
        note: '선은 잔액입니다. 그 아래의 띠는 적립액이 아니라 이자에서 나온 부분입니다.',
        xAxis: 'years',
        series: [
          { key: 'balance', label: '잔액' },
          { key: 'contributed', label: '적립액' },
        ],
      },
      method: [
        '전망은 복리 주기 하나씩 진행됩니다. 각 기간마다 잔액에 기간 이율로 이자가 붙고, 그다음 설정에 따라 기간 말이나 기간 초에 그 기간의 적립액이 더해집니다. 닫힌 식 하나 대신 기간을 차례로 계산하기 때문에 연도별 표가 만들어지며, 최종 잔액은 어느 방식이든 같습니다.',
        '닫힌 형태로 쓰면 같은 결과는 다음과 같습니다.',
        '여기서 P는 시작 잔액, r은 연이율을 연간 복리 횟수로 나눈 값, n은 기간 수, PMT는 각 기간의 적립액입니다. 기간 초에 적립한 돈은 그 기간 내내 이자가 붙으므로, 그 경우 적립 항에 (1 + r)을 곱합니다.',
        '실질 수치는 두 가지 조정에서 나옵니다. 실효 연이율은 (1 + r)을 연간 기간 수만큼 거듭제곱한 값으로, 명목 7% 금리가 1년간 월 복리를 거친 뒤 실제로 되는 값입니다. 실질 이율은 그 실효 이율을 물가 계수로 나눈 것이고, 오늘의 달러 기준 잔액은 명목 잔액을 같은 기간 누적된 물가 상승률로 나눈 것입니다.',
      ],
      formula: 'FV = P(1 + r)ⁿ + PMT · ((1 + r)ⁿ − 1) / r',
      limits: [
        '수익률을 예측하지 않습니다. 입력한 이자율은 전체 기간 동안 입력한 그대로 쓰이며, 과거 평균, 예측, 시장 데이터는 이 페이지에 들어가지 않습니다.',
        '세금, 수수료, 계좌 비용은 반영하지 않습니다. 실제 계좌의 잔액은 금융사가 가져가는 만큼 다를 것입니다.',
        '시장 변동성은 반영하지 않습니다. 실제 시장이 떨어지는 해에는 실제 잔액도 떨어지며, 어떤 고정 금리도 이를 담아내지 못합니다.',
        '어떻게 투자할지, 저축할지 말지는 알려 주지 않습니다. 입력한 가정 아래에서 숫자 하나를 전망합니다.',
      ],
      faq: [
        {
          q: '복리 주기는 왜 1, 2, 3, 4, 6, 12만 되나요?',
          a: '이곳의 적립은 매달 이루어지고, 계산기는 복리 기간과 적립 기간을 같게 유지하기 때문입니다. 12를 나누어떨어지게 하는 주기라면 이 계산이 근사가 아니라 정확하게 유지됩니다. 실제로 이 여섯 가지면 월 적립 기준으로 매일부터 매년까지의 복리를 아우릅니다.',
        },
        {
          q: '명목 이율과 실효 연이율은 어떻게 다른가요?',
          a: '명목 이율은 계좌에 적힌 숫자, 예컨대 7%입니다. 실효 이율은 1년간 복리를 적용한 뒤 잔액이 실제로 버는 비율이므로, 월 복리 7%는 7.229%가 됩니다. 긴 기간에서는 이 차이가 중요하기 때문에 페이지는 둘 다 보여 줍니다.',
        },
        {
          q: '실질 가치는 무슨 뜻인가요?',
          a: '시작 연도의 구매력으로 나타낸 최종 잔액입니다. 명목 잔액을 같은 기간 누적된 물가 상승률로 나누어, 잔액 중 얼마가 실제 성장이고 얼마가 가치가 떨어진 같은 달러인지 보여 줍니다.',
        },
        {
          q: '적립 시점이 결과를 바꾸나요?',
          a: '네, 페이지는 두 경우를 모두 보여 줍니다. 각 기간 초에 적립한 돈은 그 기간 내내 이자가 붙으므로, 기간 말에 같은 금액을 적립한 경우보다 더 많아집니다. 한 번당 차이는 작지만 수십 년에 걸쳐 쌓입니다.',
        },
        {
          q: '이자율이 0이면 어떻게 되나요?',
          a: '잔액은 이자 없이 적립액만큼만 늘어납니다. 계산기는 0으로 나누지 않고 이 경우를 따로 처리하므로, 수치는 정확히 적립한 금액과 같습니다.',
        },
        {
          q: '정기 적립이 꼭 필요한가요?',
          a: '아니요. 월 적립액을 0으로 두면 계산은 시작 잔액에 대한 단순 복리 전망이 되며, 이미 투자한 목돈에 맞는 모델입니다.',
        },
      ],
      sources: [
        {
          label: 'SEC — Investor.gov: 복리와 수수료의 비용',
          url: 'https://www.investor.gov/introduction-investing/investing-basics/glossary/compound-interest',
        },
        {
          label: 'BLS — 소비자물가지수(물가 반영 수치용)',
          url: 'https://www.bls.gov/cpi/',
        },
        {
          label: '연방준비제도 — 정기 예금과 저축 금리 데이터',
          url: 'https://www.federalreserve.gov/releases/h15/',
        },
        {
          label: 'IRS — 복리와 전통 IRA의 성장',
          url: 'https://www.irs.gov/retirement-plans/traditional-iras',
        },
      ],
      relatedGuides: [
        { slug: 'compound-interest-calculator-explained', title: '복리 계산기 해설' },
        { slug: 'compound-vs-simple-interest', title: '복리와 단리' },
        { slug: 'how-compounding-frequency-changes-results', title: '복리 주기가 결과를 바꾸는 방식' },
        { slug: 'inflation-and-real-returns-explained', title: '물가 상승과 실질 수익률 해설' },
        { slug: 'understanding-apr', title: 'APR(연간 이자율) 이해하기' },
      ],
      script: {
        yearsOne: '1년',
        yearsOther: '{n}년',
      },
    },
    'net-pay': {
      name: '실수령액 계산기',
      title: '2026 과세 연도 실수령액 계산기',
      description:
        '연방 소득세, 사회보장세(Social Security), 메디케어세(Medicare), 주 세금을 뺀 뒤 급여에서 남는 금액을 어떤 급여 주기로든 계산합니다. 모든 공제 항목을 보여 줍니다.',
      short: '연방세, 급여세, 주 세금을 뺀 뒤의 급여.',
      category: '급여',
      methodNote:
        '수치는 2026 과세 연도 기준입니다. 연방 세율 구간과 표준 공제는 Rev. Proc. 2025-32, 급여세 한도는 사회보장국 자료입니다. 이 페이지의 어떤 것도 급여 대행업체의 견적이 아닙니다.',
      fields: {
        grossPay: '세전 급여',
        payPeriod: '급여 주기',
        filingStatus: '신고 유형',
        stateRate: '주 소득세율',
        stateRateHint: '해당 구간의 세율',
        retirementContribution: '401(k) 또는 403(b) 납입액',
        retirementHint: '연간 — 급여세는 그대로 부과',
        healthContribution: 'HSA 또는 FSA 납입액',
        healthHint: '연간 — 급여세 부과 안 됨',
        perYear: '연간',
        debtName: '부채',
        balance: '잔액',
        rate: '이율',
        minimum: '최소 상환액',
      },
      terms: {
        payPeriods: {
          year: '연간',
          month: '월간',
          week: '주간',
          day: '일당',
          hour: '시급',
        },
        filingStatuses: {
          single: '독신',
          married: '부부 공동 신고',
          head: '세대주',
        },
      },
      result: {
        headlineLabel: '실수령액',
        annualGross: '연간 세전 급여',
        federalTax: '연방 소득세',
        socialSecurity: 'Social Security',
        medicare: 'Medicare',
        additionalMedicare: '추가 메디케어세',
        stateTax: '주 소득세',
        totalTax: '총세금',
        netPerMonth: '월 실수령액',
        effectiveRate: '실효 세율',
        note:
          '실수령액은 세전 급여에서 위의 공제액을 빼고, 연간 급여 지급 횟수로 나눈 값입니다.',
        negativeNote:
          '공제액이 세전 급여만큼 크고 급여세는 여전히 그 공제액에도 부과되므로, 실수령액이 0보다 작아집니다. 납입액의 연간 한도는 여기서 확인하지 않습니다.',
      },
      resultNote:
        '급여 시스템은 W-4 양식의 원천징수 선택과 연중 이미 원천징수한 금액을 사용하므로, 실제 급여 명세서의 수치는 달마다 조금씩 달라집니다.',
      chart: {
        title: '세전 급여가 가는 곳',
        note: '1년치 막대 하나를, 손에 들어오는 부분과 빠져나가는 부분들로 나눈 것입니다.',
        xAxis: 'none',
        series: [
          { key: 'net', label: '실수령액' },
          { key: 'federal', label: '연방 소득세' },
          { key: 'socialSecurity', label: 'Social Security' },
          { key: 'medicare', label: 'Medicare' },
          { key: 'state', label: '주 소득세' },
        ],
      },
      formula:
        '실수령액 = 세전 급여 − 세전 공제 − 연방 소득세 − Social Security − Medicare − 주 소득세',
      method: [
        '계산은 세전 급여에서 시작해, 급여 시스템이 적용하는 순서대로 공제를 거슬러 올라갑니다. 401(k)나 건강 계좌 납입액은 과세 전에 급여에서 빠지므로 세전 공제가 먼저 빠집니다. 남은 것이 과세 대상 급여입니다.',
        '두 공제는 같은 방식으로 다루지 않습니다. 401(k)나 403(b) 납입액은 소득에서 제외되지만 Social Security와 Medicare에서는 여전히 급여이므로, 연방세는 줄이고 급여세는 그대로 둡니다. 급여에서 빠지는 HSA나 FSA 납입액은 소득과 Social Security 급여 양쪽에서 제외되므로 둘 다 줄입니다.',
        '연방 소득세는 그 과세 대상 급여로 계산합니다. 신고 유형별 표준 공제를 빼고, 그 결과를 2026년 세율 구간표에 적용합니다. 각 구간은 고정 세액에 그 구간 하한을 넘는 소득의 일정 비율을 더한 것으로, IRS가 표를 발표하는 방식 그대로입니다.',
        '다음은 급여세입니다. 급여세는 급여에서 HSA나 FSA 납입액을 뺀 금액으로 계산합니다. 이 목적에서는 401(k) 납입액이 급여에 남아 있기 때문입니다. Social Security는 2026년 과세 상한 $184,500까지의 급여에 6.2%입니다. Medicare는 상한 없이 전체 급여에 1.45%이며, 추가 메디케어세는 독신 신고자의 경우 $200,000, 부부 공동 신고자의 경우 $250,000를 넘는 부분에 0.9%입니다.',
        '주 소득세는 독자가 입력한 세율을 과세 소득에 적용한 것입니다. 이는 추정치입니다. 대부분의 주는 구간별로 과세하므로, 하나의 숫자를 전체 소득에 적용하면 대부분의 사람이 실제로 내는 금액보다 많아집니다. 최종 수치는 남은 금액을 연간 급여 지급 횟수로 나눈 값입니다.',
      ],
      limits: [
        '세액공제는 반영하지 않습니다. 자녀세액공제, 근로장려세액공제, 교육 세액공제는 최종 수치를 바꾸지만 계산에 들어 있지 않습니다.',
        '자본 이득, 자영업 소득, Social Security 과세 상한을 넘는 소득의 처리는 반영하지 않습니다. 그 소득에는 Medicare는 여전히 적용되지만 Social Security는 적용되지 않습니다.',
        '지방세는 반영하지 않습니다. 시와 카운티의 소득세는 주 세율과 별개입니다.',
        '급여 지급 횟수는 관례를 따릅니다. 12개월, 52주, 260 근무일, 또는 주 40시간 52주 기준 2,080시간입니다. 다른 주기로 급여를 받는 독자는 대신 연간 수치를 입력할 수 있습니다.',
        'HSA와 FSA 납입액은 급여 명세서에서 빠지는 급여 감액으로 취급하며, 이 때문에 Social Security와 Medicare가 면제됩니다. 은행 계좌에서 직접 넣은 HSA 납입액은 Social Security에서는 급여이며, 그 경우는 계산에 들어 있지 않습니다.',
        '2026년 연간 한도를 넘는 401(k) 납입액에는 일부 급여세가 다시 부과되며, 이 계산은 전체 납입액에 급여세를 부과합니다.',
        '납입액의 연간 한도는 확인하지 않습니다. 급여 전체만큼 큰 401(k)나 HSA 납입액은 급여세가 여전히 부과되므로 실수령액을 0보다 작게 만듭니다.',
      ],
      faq: [
        {
          q: '왜 실수령액이 세전 급여에서 소득세를 뺀 것보다 적나요?',
          a: '급여에서 Social Security와 Medicare도 빠지기 때문입니다. 이것은 일 자체에 붙는 급여세로, 급여 명세서의 소득세와는 별개입니다.',
        },
        {
          q: '401(k) 납입이 Social Security와 Medicare를 줄이나요?',
          a: '아니요. 연방 소득세를 계산하기 전에 급여에서 빠지지만 급여세에서는 여전히 급여이므로, Social Security와 Medicare가 부과됩니다. 급여에서 빠지는 HSA나 FSA 납입은 다릅니다. 이 세금의 과세 기준에서도 빠집니다. 그래서 둘을 따로 입력합니다.',
        },
        {
          q: '내 실제 세율 구간을 쓰나요?',
          a: '2026년 세율 구간표와 신고 유형별 표준 공제를 쓰므로, 다른 소득이 없는 급여 소득자라면 급여 시스템이 계산하는 값에 가깝습니다. 세액공제, 다른 공제, 다른 소득에 대해서는 아무것도 모릅니다.',
        },
        {
          q: '실효 세율과 한계 세율은 어떻게 다른가요?',
          a: '한계 세율은 과세 소득의 다음 1달러에 붙는 세율로, 소득이 도달한 가장 높은 구간입니다. 실효 세율은 총세금을 전체 소득으로 나눈 것으로, 높은 구간은 그 하한을 넘는 소득에만 적용되므로 더 낮습니다.',
        },
        {
          q: '어떤 주 세율을 입력하나요?',
          a: '여러분의 주에서 여러분의 구간에 적용되는 세율입니다. 대부분의 주는 구간별로 과세하므로 실효 세율은 최고 세율보다 낮습니다. 단일 세율 주와 소득세가 없는 주에서는 이 숫자 하나가 정확합니다.',
        },
        {
          q: 'Social Security 세금에는 상한이 있는데 Medicare에는 왜 없나요?',
          a: 'Social Security에는 매년 정해지는 과세 상한이 있으며 2026년은 $184,500입니다. 이를 넘는 소득에는 Social Security 세금이 붙지 않습니다. Medicare에는 상한이 없으므로 급여의 모든 1달러에 적용됩니다.',
        },
        {
          q: '이것으로 세금 신고액을 계산할 수 있나요?',
          a: '아니요. 이것은 급여에서 원천징수되는 세금을 계산합니다. 세금 신고는 다른 계산입니다. 다른 소득, 공제, 세액공제, 이미 낸 금액을 포함하며, 급여 주기마다가 아니라 1년에 한 번 신고합니다.',
        },
      ],
      sources: [
        {
          label: 'IRS — Rev. Proc. 2025-32, 2026 과세 연도 물가 조정',
          url: 'https://www.irs.gov/irb/2025-45_IRB',
        },
        {
          label: '사회보장국 — 2026년 과세 상한과 생계비 조정(COLA)',
          url: 'https://www.ssa.gov/cola/',
        },
        {
          label: '사회보장국 — Publication 15, 고용주 세금 안내서',
          url: 'https://www.ssa.gov/pubs/EN-05-10035.pdf',
        },
        {
          label: 'IRS — Tax Topic 401, 임금과 급여',
          url: 'https://www.irs.gov/taxtopics/tc401',
        },
        {
          label: '사회보장국 — POMS RS 01402.038, 세제 혜택 건강 플랜',
          url: 'https://secure.ssa.gov/poms.nsf/lnx/0301402038',
        },
        {
          label: 'IRS — Tax Topic 511, 원천징수',
          url: 'https://www.irs.gov/taxtopics/tc511',
        },
      ],
      relatedGuides: [
        {
          slug: 'net-pay-calculator-explained',
          title: '실수령액은 어떻게 계산하나',
        },
      ],
    },

    'income-tax': {
      name: '연방 소득세 계산기',
      title: '2026 과세 연도 연방 소득세 계산기',
      description:
        '1년 소득에 대한 2026년 연방 소득세를 계산합니다. 주 세금은 그 주의 세율 구간으로 계산하고, 신고 유형, 공제, 실효 세율과 한계 세율을 나란히 보여 줍니다.',
      short: '1년 소득에 대한 연방 및 주 소득세, 두 세율 모두 표시.',
      category: '급여',
      methodNote:
        '연방 세율 구간과 표준 공제는 2025년 11월 3일 발표된 Rev. Proc. 2025-32의 2026년 수치입니다. 주 세금은 선택한 주의 2026년 세율 구간, 표준 공제, 인적 공제, 세액공제로 계산하며, 2026년 4월 28일자 Tax Foundation 표에서 가져왔습니다. 세대주 세율표, 연방 소득세 공제, 주 세액공제는 각 주의 서식에서 가져왔습니다. 급여에서 빠지는 급여세는 이 계산에 포함되지 않으며, 실수령액 계산기에 있습니다.',
      script: {
        stateDetected: '{state}(으)로 채움: 요청이 온 주입니다.',
        childrenTotal: '해당 자녀 총수: {count}',
      },
      fields: {
        grossIncome: '연간 세전 소득',
        filingStatus: '신고 유형',
        itemisedDeduction: '항목별 공제',
        standardDeduction: '표준 공제',
        useStandard: '표준 공제 사용',
        state: '주',
        stateHint: '주 세금 계산용',
        stateNone: '주 없음',
        children: '해당 자녀',
        childrenHint: '과세 연도 말 기준 나이',
        childBand: '{range}세 자녀',
        stateTaxOverride: '직접 입력하는 주 세금',
        stateTaxOverrideHint: '비워 두면 모델을 사용',
        preTax: '세전 공제',
        preTaxHint: '연간 401(k), HSA, FSA',
        perYear: '연간',
      },
      terms: {
        filingStatuses: {
          single: '독신',
          married: '부부 공동 신고',
          head: '세대주',
        },
      },
      result: {
        headlineLabel: '연방 소득세',
        taxableIncome: '과세 소득',
        deductionApplied: '적용된 공제',
        standardDeduction: '표준 공제',
        itemisedDeduction: '항목별 공제',
        federalTax: '연방 소득세',
        stateTaxableIncome: '주 과세 소득',
        stateCredits: '주 세액공제',
        stateChildCredit: '주 자녀세액공제',
        federalTaxDeducted: '공제된 연방세',
        stateTax: '주 소득세',
        totalTax: '총세금',
        effectiveRate: '실효 세율',
        marginalRate: '한계 세율',
        afterTax: '세후 소득',
        note:
          '적용된 공제는 신고 유형별 표준 공제와 왼쪽에 입력한 항목별 공제 중 더 큰 쪽입니다. 주 세금은 선택한 주로 계산합니다.',
      },
      resultNote:
        '이 수치는 납세 의무액이지 급여에서 원천징수되는 금액이 아닙니다. 연방 수치에는 연방 세액공제와 연중 이미 낸 금액이 포함되지 않으며, 주 수치에는 모델이 다루는 주 세액공제가 포함됩니다.',
      chart: {
        title: '소득에서 남는 것',
        note: '1년치 막대 하나를, 독자에게 남는 부분과 세금으로 가는 부분으로 나눈 것입니다.',
        xAxis: 'none',
        series: [
          { key: 'afterTax', label: '세후 소득' },
          { key: 'federal', label: '연방 소득세' },
          { key: 'state', label: '주 소득세' },
        ],
      },
      formula:
        '과세 소득 = 세전 소득 − 세전 공제 − 공제; 세금 = 과세 소득에 적용한 세율 구간표; 주 세금 = 조정 총소득에서 주 표준 공제와 인적 공제를 빼고, 주가 허용하는 경우 납부한 연방 소득세를 뺀 금액에 주 세율 구간을 적용한 뒤 주 세액공제를 뺀 값',
      method: [
        '계산은 1년 세전 소득에서 시작해 세전 공제를 뺍니다. 401(k)나 건강 계좌 납입액은 소득으로 과세되지 않기 때문입니다.',
        '다음은 공제입니다. 독자가 항목별 공제를 입력하지 않으면 신고 유형별 표준 공제를 쓰며, 둘 중 큰 쪽이 적용됩니다. 2026년 표준 공제는 독신 신고자 $16,100, 부부 공동 신고자 $32,200, 세대주 $24,150입니다.',
        '남은 것이 과세 소득이며, 세금은 여기에 2026년 세율 구간표를 적용한 것입니다. 각 구간은 고정 세액에 그 구간 하한을 넘는 소득의 일정 비율을 더한 것으로, IRS가 발표하는 방식 그대로입니다.',
        '두 세율은 서로 다른 질문에 답합니다. 한계 세율은 과세 소득의 다음 1달러에 붙는 세율로, 소득이 도달한 가장 높은 구간입니다. 실효 세율은 총세금을 전체 소득으로 나눈 것이며, 높은 구간은 그 하한을 넘는 소득에만 닿으므로 더 낮습니다.',
        '주 세금은 따로 계산합니다. 주는 조정 총소득에서 시작해, 제외 항목으로 주는 경우 자체 표준 공제와 인적 공제를 빼고, 자체 세율 구간을 구간별로 적용한 뒤, 지급하는 세액공제를 뺍니다. 인적 공제나 표준 공제를 세액공제 형태로 주는 주는 그것을 세액에서 빼며, 그 세액공제는 그곳에서 셈합니다.',
        '신고 유형별 세율표를 씁니다. 자체 세대주 세율표를 발표하는 주는 그 주의 서식에서 가져온 표를 여기서 쓰고, 발표하지 않는 주는 독신 세율표로 계산합니다.',
        '세 주는 납부한 연방 소득세를 공제할 수 있게 합니다. 앨라배마, 미주리, 오리건입니다. 허용하는 주에서는 주 세율 구간을 적용하기 전에 소득에서 이 공제를 빼며, 한도와 비율은 각 주가 정합니다.',
        '주 세액공제는 자녀의 나이로 계산합니다. 나이에 따라 달라지기 때문입니다. 뉴욕은 네 살 미만 자녀에게 $1,000, 네 살부터 열여섯 살 자녀에게 $500를 지급하고, 미네소타는 열여덟 살 미만 자녀에게 $1,800를 지급하며, 몇몇 주는 일정 나이를 넘은 자녀에게는 아무것도 지급하지 않습니다.',
      ],
      limits: [
        '연방 세액공제는 반영하지 않습니다. 연방 자녀세액공제, 연방 근로장려세액공제, 교육 세액공제는 세금을 줄이지만 계산에 들어 있지 않습니다.',
        '자본 이득과 일반 소득을 구분하지 않으므로, 투자 소득이 있는 해도 일반 세율로 계산합니다.',
        '노인 공제나, 왼쪽에 입력한 표준 및 항목별 금액 외의 공제는 반영하지 않습니다.',
        '자영업자의 순소득에 부과되며 자체 과세 기준과 세율이 있는 자영업세는 반영하지 않습니다.',
        '많은 주가 항목별 공제 안에서 허용하는 주 및 지방 소득세 공제는 반영하지 않습니다.',
        '자본 이득 세율, 일부 주가 고소득자에게 부과하는 부가세, 시와 카운티 정부의 세금은 반영하지 않습니다.',
        '2026년 세율이 잠정치로 발표된 버몬트의 세대주 세율표는 쓰지 않으므로, 버몬트의 세대주는 독신 세율표로 계산합니다.',
        '모든 주 세액공제를 담고 있지는 않습니다. 주 근로장려세액공제는 연방 공제의 일정 비율로 정하는 주와 자체적으로 계산하는 세 주에 대해 있고, 자녀세액공제는 자녀 나이에 따라 달라지는 주에 대해 있습니다. 다른 주의 세액공제는 들어 있지 않습니다.',
      ],
      faq: [
        {
          q: '어떤 공제가 적용되나요?',
          a: '항목별 공제의 합계가 더 크지 않다면 표준 공제입니다. 계산기는 신고 유형별 표준 공제와 항목별 수치를 나란히 보여 주므로 한눈에 비교할 수 있습니다.',
        },
        {
          q: '실효 세율과 한계 세율은 어떻게 다른가요?',
          a: '한계 세율은 과세 소득의 다음 1달러에 붙는 세율입니다. 실효 세율은 총세금을 전체 소득으로 나눈 것이며, 첫 구간 위의 구간들은 그 하한을 넘는 소득에만 적용되므로 더 낮습니다.',
        },
        {
          q: '왜 특정 소득에서 세금이 뛰나요?',
          a: '그것이 구간 경계입니다. 그 위로는 1달러가 다음 세율로 과세되므로 세금이 소득보다 빨리 늘어납니다. 한계 세율은 소득이 어느 구간에 있는지 알려 줍니다.',
        },
        {
          q: 'Social Security와 Medicare도 포함되나요?',
          a: '아니요. 그것들은 급여에 부과되는 급여세로 자체 상한이 있으며, 실수령액 계산기에서 계산합니다.',
        },
        {
          q: '주 세금 수치는 무엇인가요?',
          a: '주 자체가 부과하는 세금으로, 그 주의 2026년 세율 구간, 표준 공제, 인적 공제, 세액공제로 계산합니다. 주는 목록에서 고르며, 네트워크가 판별할 수 있으면 페이지가 요청이 온 주로 채웁니다. 주를 바꾸면 전체 수치도 함께 바뀝니다.',
        },
        {
          q: '주 세금을 직접 입력할 수 있나요?',
          a: '네. 주 아래의 필드에 수치를 입력하면 계산된 값을 대신합니다. 기본적으로 비어 있으며, 비어 있는 동안에는 페이지가 계산 결과를 보여 줍니다.',
        },
        {
          q: '페이지가 왜 자녀마다 나이를 묻나요?',
          a: '주 자녀세액공제가 자녀 나이에 따라 달라지기 때문입니다. 뉴욕은 네 살 미만 자녀에게 $1,000, 네 살부터 열여섯 살 자녀에게 $500를 지급하고, 미네소타는 열여덟 살 미만 자녀에게 $1,800를 지급하며, 일부 주는 일정 나이를 넘은 자녀에게는 아무것도 지급하지 않습니다. 구간은 주들이 선을 긋는 나이이며, 각 구간의 자녀 수는 근로장려세액공제가 세는 수이기도 합니다.',
        },
        {
          q: '이것이 내가 내야 할 금액인가요?',
          a: '세액공제 전, 그리고 연중 이미 낸 금액을 빼기 전의 세금입니다. 신고서는 세액공제를 더하고, 급여를 통해 과세되지 않은 다른 것들을 더하고, 이미 낸 금액을 뺍니다.',
        },
      ],
      sources: [
        {
          label: 'IRS — Rev. Proc. 2025-32, 2026 과세 연도 물가 조정',
          url: 'https://www.irs.gov/irb/2025-45_IRB',
        },
        {
          label: 'IRS — Tax Topic 505, 원천징수와 예정 납부',
          url: 'https://www.irs.gov/taxtopics/tc505',
        },
        {
          label: 'IRS — Tax Topic 611, 소득세',
          url: 'https://www.irs.gov/taxtopics/tc611',
        },
        {
          label: 'Tax Foundation — State Individual Income Tax Rates and Brackets, 2026',
          url: 'https://taxfoundation.org/data/all/state/state-income-tax-rates-2026/',
        },
        {
          label: 'Tax Foundation — Facts & Figures 2026, 2026년 4월 28일 기준 주 개인 소득세율',
          url: 'https://taxfoundation.org/data/all/state/2026-state-tax-data/',
        },
      ],
      relatedGuides: [
        {
          slug: 'income-tax-calculator-explained',
          title: '연방 소득세는 어떻게 계산하나',
        },
      ],
    },

    'debt-payoff': {
      name: '부채 상환 계산기',
      title: '부채 상환 계산기: 눈사태 방식과 눈덩이 방식',
      description:
        '여러 부채를 한꺼번에 갚는 방법을 비교합니다. 최소 상환만, 눈사태 순서, 눈덩이 순서로 부채가 없어지기까지의 개월 수와 절약한 이자를 보여 줍니다.',
      short: '여러 부채를 한꺼번에 갚고 순서를 비교합니다.',
      category: '부채',
      methodNote:
        '모델은 월별 시뮬레이션입니다. 이자는 그달 초 잔액에 붙고, 아직 남은 모든 부채가 각자의 최소 상환액을 받으며, 나머지 돈은 독자가 고른 부채로 갑니다.',
      fields: {
        debtName: '부채',
        balance: '잔액',
        rate: '이자율',
        minimum: '최소 상환액',
        addDebt: '부채 추가',
        removeDebt: '이 부채 삭제',
        extraPayment: '월 추가 상환액',
        extraPaymentHint: '모든 최소 상환액 외에 더',
      },
      terms: {
        strategies: {
          minimum: '최소 상환만',
          avalanche: '눈사태',
          snowball: '눈덩이',
        },
        orderHints: {
          avalanche: '이자율이 가장 높은 것부터',
          snowball: '잔액이 가장 작은 것부터',
        },
      },
      result: {
        headlineLabel: '절약한 이자',
        interestSaved: '최소 상환 대비 절약한 이자',
        monthsToFree: '부채가 없어지기까지의 개월 수',
        totalInterest: '총이자',
        totalPaid: '총상환액',
        minimumOnly: '최소 상환만',
        avalanche: '눈사태',
        snowball: '눈덩이',
        minimumsNeverCover: '끝내 갚지 못함',
        minimumsNeverCoverNote:
          '이 부채들 중 적어도 하나는 한 달에 붙는 이자가 상환액보다 커서, 그 잔액이 줄지 않고 늘어납니다. 부채를 끝내 갚지 못하는 실행에는 완성된 일정이 없으므로 개월 수와 이자를 보고하지 않습니다. 그 수치는 부채가 아니라 시뮬레이션의 끝을 설명할 것이기 때문입니다.',
        note:
          '눈사태 방식은 가장 높은 이자율부터 갚고 이자가 가장 적게 듭니다. 눈덩이 방식은 가장 작은 잔액부터 없애고 그 부채를 더 일찍 끝냅니다. 둘의 차이가 순서의 대가입니다.',
      },
      resultNote:
        '세 실행은 같은 부채와 같은 추가 상환액을 씁니다. 바뀌는 것은 추가 금액이 들어가는 순서뿐입니다.',
      chart: {
        title: '순서별 잔액',
        note: '부채를 끝내 갚지 못하는 실행은 빠져 있습니다. 그 잔액은 줄지 않고 늘어나며, 그 선의 모양은 일정이 아니라 시뮬레이션의 끝을 설명할 것이기 때문입니다. 추가 상환이 있는 선은 0에 도달합니다.',
        xAxis: 'years',
        series: [
          { key: 'avalanche', label: '눈사태' },
          { key: 'snowball', label: '눈덩이' },
          { key: 'minimumOnly', label: '최소 상환만' },
        ],
      },
      formula:
        '그달 이자 = 그달 초 잔액 × 연이율 ÷ 12; 남은 모든 부채가 각자의 최소 상환액을 받아 이자를 먼저, 원금을 나중에 갚음; 나머지 돈은 순서가 가리키는 부채로 감',
      method: [
        '계산은 월별 시뮬레이션입니다. 매달 초 잔액에 이자가 붙어 잔액에 더해집니다. 그달 쓸 수 있는 돈은 모든 최소 상환액의 합에 왼쪽에 입력한 추가 상환액을 더한 것입니다. 잔액이 남은 모든 부채는 각자의 최소 상환액을 받고, 그 상환액은 이자를 먼저, 원금을 나중에 갚습니다.',
        '다 갚은 부채는 더 이상 최소 상환액을 받지 않고, 그 최소 상환액은 다음 부채로 가는 돈에 합쳐집니다. 이것이 순서 간 차이를 만드는 원리입니다. 같은 월 금액이라도 다른 부채에 쓰면 다른 잔액이 더 일찍 끝납니다.',
        '눈사태 순서는 추가 금액을 가장 높은 이자율의 부채에 먼저 보냅니다. 독자가 내는 가장 비싼 돈의 이자를 멈추기 때문에 이자가 가장 적게 듭니다.',
        '눈덩이 순서는 추가 금액을 가장 작은 잔액에 먼저 보냅니다. 전체적으로 이자가 더 들지만 계좌 하나를 더 일찍 정리하며, 이는 다른 종류의 결과입니다. 계산기는 두 가지와 각각 절약한 이자를 모두 보여 주어 같은 숫자로 비교할 수 있게 합니다.',
      ],
      limits: [
        '변동 금리는 반영하지 않습니다. 변동 금리 신용카드는 지수가 움직이면 이자가 바뀌지만, 이곳의 일정은 입력한 금리가 그대로 유지된다고 가정합니다.',
        '수수료는 반영하지 않습니다. 연체료, 잔액 이체 수수료, 카드 연회비는 총액에 들어 있지 않습니다.',
        '이자를 매달 부과합니다. 매일 복리로 붙는 신용카드는 1년 동안 조금 더 부과하므로, 카드 잔액의 실제 수치는 대개 이보다 약간 높습니다.',
        '이자의 세금 처리는 반영하지 않습니다. 어떤 부채의 이자는 공제할 수 있고 어떤 부채는 그렇지 않습니다.',
        '최소 상환액의 변화는 반영하지 않습니다. 대출 기관은 어려운 사정에 따라 낮추기도 하고 잔액이 줄면서 높이기도 합니다.',
      ],
      faq: [
        {
          q: '눈사태 방식과 눈덩이 방식은 어떻게 다른가요?',
          a: '순서만 다릅니다. 눈사태는 추가 금액을 가장 높은 이자율에 먼저, 눈덩이는 가장 작은 잔액에 먼저 보냅니다. 부채, 최소 상환액, 추가 상환액은 두 실행에서 같습니다.',
        },
        {
          q: '어느 쪽이 돈을 더 아끼나요?',
          a: '이자로 보면 눈사태입니다. 추가 금액이 가장 비싼 부채를 먼저 멈추게 하므로 부채 전체 기간 동안 붙는 이자가 적습니다. 계산기는 순서별 절약 이자의 차이를 보여 줍니다.',
        },
        {
          q: '비용이 더 드는데 왜 눈덩이 방식이 있나요?',
          a: '가장 작은 잔액부터 없애므로 잔액 하나가 더 일찍 0이 됩니다. 이자가 재는 것과는 다른 결과이며, 계산기는 같은 숫자로 비교할 수 있도록 둘 다 보여 줍니다.',
        },
        {
          q: '이자는 어떻게 계산하나요?',
          a: '매달 초 잔액에 연이율을 12로 나눈 비율로 계산해 잔액에 더합니다. 그다음 상환액은 그 이자를 먼저, 원금을 나중에 갚습니다.',
        },
        {
          q: '다 갚은 부채의 최소 상환액은 어떻게 되나요?',
          a: '다음 부채로 가는 돈에 더해지므로, 부채에 들어가는 월 금액은 결코 줄지 않습니다. 그래서 완납 시점이 각 일정을 따로 합친 것보다 짧아집니다.',
        },
        {
          q: '매일 복리로 붙는 신용카드도 반영하나요?',
          a: '아니요. 모델은 한 달에 한 번 이자를 부과합니다. 매일 복리로 붙는 카드는 1년 동안 조금 더 부과하므로, 카드 잔액의 실제 수치는 대개 여기보다 약간 높습니다.',
        },
      ],
      sources: [
        {
          label: 'CFPB — Ask CFPB, 소비자 질문과 답변',
          url: 'https://www.consumerfinance.gov/ask-cfpb/',
        },
        {
          label: 'CFPB — 신용카드 도구와 소비자 안내',
          url: 'https://www.consumerfinance.gov/consumer-tools/credit-cards/',
        },
      ],
      relatedGuides: [
        {
          slug: 'debt-payoff-calculator-explained',
          title: '여러 부채를 갚는 방식',
        },
      ],
    },
  },
};
