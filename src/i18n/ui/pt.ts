/** Todas as strings da interface em português do Brasil. A estrutura é a mesma de `en.ts`. */

export const pt = {
  /** O nome deste idioma, neste idioma. */
  localeName: 'Português',

  tagline: 'Calculadoras financeiras que mostram o cálculo',
  description:
    'Calculadoras financeiras gratuitas para parcela de financiamento imobiliário, alugar ou comprar, juros compostos, salário líquido, imposto federal e quitação de dívidas. Toda fórmula é mostrada.',

  author: {
    role: 'Autor',
    bio: 'Trabalha com infraestrutura de TI — nuvem, CI/CD, infraestrutura como código —, onde uma mudança que não pode ser verificada não vai para produção. Manter ambientes de nuvem enxutos e pipelines de entrega rápidos é o trabalho do dia a dia; o mesmo padrão atravessa este site. A aritmética fica em um só lugar, as fórmulas são cobertas por testes unitários que as conferem com números de empréstimos publicados, e todo número que vem de fora traz a fonte e a data em que foi lido. Escreve os guias e mantém o motor de cálculo. Uma segunda pessoa lê o conteúdo financeiro de cada guia antes da publicação. Nada aqui diz ao leitor o que fazer.',
  },

  reviewer: {
    role: 'Revisora financeira',
    bio: 'Lê o conteúdo financeiro de um guia antes da publicação: os números, as premissas por trás deles e as fontes de onde vêm. O autor constrói o motor de cálculo; a revisora lê o resultado do outro lado, o de quem lida com dinheiro e não com código. O nome dela aparece apenas nos guias que ela revisou.',
  },

  consent: {
    heading: 'Cookies',
    body: 'Este site usa cookies para exibir publicidade e contar quais páginas são lidas. Ao aceitar, são carregadas a publicidade e a análise de páginas, incluindo o beacon sem cookies do provedor de hospedagem; ao recusar, nada é carregado. Para um leitor na União Europeia, o beacon do provedor de hospedagem não é carregado de forma alguma. Você pode mudar sua resposta depois pelo rodapé. O que é coletado e quem fornece está na {privacyLink}.',
    privacyLink: 'página de privacidade',
    accept: 'Aceitar',
    reject: 'Recusar',
    settings: 'Configurações de cookies',
  },

  nav: {
    tools: 'Ferramentas',
    guides: 'Guias',
    sources: 'Fontes',
    about: 'Sobre',
  },

  footer: {
    taglineNote: 'Toda fórmula está escrita por extenso, toda premissa é sua.',
    calculatorsHeading: 'Calculadoras',
    siteHeading: 'Site',
    calculators: {
      'mortgage-payment': 'Parcela do financiamento',
      'rent-vs-buy': 'Alugar ou comprar',
      'compound-interest': 'Juros compostos',
      'net-pay': 'Salário líquido',
      'income-tax': 'Imposto de renda federal',
      'debt-payoff': 'Quitação de dívidas',
    },
    links: {
      guides: 'Guias',
      sources: 'Fontes',
      'editorial-team': 'Equipe editorial',
      about: 'Sobre',
      contact: 'Contato',
      privacy: 'Privacidade',
      terms: 'Termos',
    },
    cookieSettings: 'Configurações de cookies',
    note:
      '{name} publica cálculos e explicações, não aconselhamento financeiro. As ferramentas mostram a aritmética por trás de um número e as premissas por trás da aritmética. Elas não avaliam sua situação e não indicam um caminho a seguir. Todo número que uma ferramenta produz depende dos dados que você informa — leia as premissas antes de confiar em qualquer resultado. © {founded}–{year} {name}.',
  },

  ui: {
    skipToContent: 'Pular para o conteúdo',
    home: 'Início',
    breadcrumb: 'Trilha de navegação',
    primaryNav: 'Principal',
    lastChecked: 'Última verificação',
    by: 'Por',
    whereNumbersComeFrom: 'De onde vêm os números',
    minRead: '{n} min de leitura',
    guidesCount: (n: number) => `${n} ${n === 1 ? 'guia' : 'guias'}`,
    calculate: 'Calcular',
    open: 'Abrir',
    allGuides: 'Todos os guias →',
    readTheGuide: 'Ler o guia',
    guidesThatGoDeeper: 'Guias que vão mais fundo',
    commonQuestions: 'Perguntas frequentes',
    howThisIsCalculated: 'Como isto é calculado',
    whatThisCalculatorDoesNotDo: 'O que esta calculadora não faz',
    sources: 'Fontes',
    sourcesNote: 'Estas são as fontes primárias por trás dos números e do método deste guia.',
    calculatorsBehindThisGuide: 'Calculadoras deste guia',
    published: 'Publicado em',
    lastReviewed: 'Última revisão',
    reviewedBy: 'Revisado por',
    language: 'Idioma',
    switchTheme: 'Mudar tema',
    switchToLight: 'Mudar para o tema claro',
    switchToDark: 'Mudar para o tema escuro',
    detectedFromIp:
      'O estado é detectado pelo seu endereço IP e é aproximado: uma VPN, um proxy ou uma rede móvel podem apontar para o estado errado. O campo continua editável.',
  },

  newsletter: {
    emailAddress: 'Endereço de e-mail',
    placeholder: 'voce@exemplo.com',
    subscribe: 'Inscrever-se',
  },

  home: {
    title: 'Calccents — Calculadoras financeiras que mostram o cálculo',
    description:
      'Calculadoras financeiras gratuitas para parcela de financiamento imobiliário, alugar ou comprar, juros compostos, salário líquido, imposto federal e quitação de dívidas. Toda fórmula é mostrada.',
    eyebrow: 'Calculadoras financeiras',
    heading: 'Conheça o número antes de decidir',
    lede: 'Ferramentas gratuitas para a aritmética de um financiamento, um aluguel, um contracheque e uma pilha de dívidas. Toda fórmula está escrita por extenso, toda premissa é sua, e nenhuma página diz o que fazer com o resultado.',
    cta: 'Ver as calculadoras',
    calculatorsEyebrow: 'As calculadoras',
    calculatorsHeading: 'Seis perguntas, seis conjuntos de números',
    workHeading: 'Todo número mostra o cálculo',
    workPoints: [
      'A fórmula fica ao lado da resposta, em linguagem simples e em símbolos.',
      'Todo número que vem de algum lugar traz a fonte e a data.',
      'Toda ferramenta diz o que não faz, com as mesmas palavras, logo abaixo do resultado.',
    ],
    workLink: 'Como o site é construído →',
    sampleMonthlyPayment: 'Parcela mensal',
    samplePrincipalAndInterest: 'Principal e juros',
    samplePropertyTax: 'Imposto predial',
    sampleTotalInterest: 'Juros totais',
    calcTitle: 'Experimente: a parcela mensal de um financiamento',
    calcHomePrice: 'Preço do imóvel',
    calcDown: 'Entrada',
    calcRate: 'Taxa de juros',
    calcTerm: 'Prazo',
    calcYears: '{n} anos',
    calcMonthly: 'Principal e juros por mês',
    calcLoan: 'Valor financiado',
    calcTotalInterest: 'Juros totais',
    calcOpen: 'Abrir a calculadora completa',
    calcNote: 'Apenas principal e juros. Imposto predial, seguro e taxa de condomínio (HOA) estão na calculadora completa.',
    statCalculators: 'calculadoras',
    statGuides: 'guias com o cálculo mostrado',
    statLanguages: 'idiomas',
    statSignups: 'cadastros para usar qualquer coisa',
    guidesEyebrow: 'Guias',
    guidesHeading: 'A aritmética, escrita por extenso',
    newsletterHeading: 'Receba a matemática no seu e-mail',
    newsletterLede:
      'Uma carta curta quando uma nova calculadora entra no ar ou uma existente é revisada de novo. Sem ofertas, sem conteúdo patrocinado.',
  },

  illustration: {
    mortgagePayment: 'O saldo de um financiamento caindo com o tempo, com os juros pagos ao lado',
    rentVsBuy: 'Duas linhas que se cruzam: o custo de alugar contra o custo de ser dono',
    compoundInterest: 'Um saldo crescendo cada vez mais rápido à medida que os juros se acumulam',
    netPay: 'Uma barra do salário bruto dividida entre o salário líquido e os descontos',
    incomeTax: 'Uma pilha de faixas de imposto, cada uma mais larga que a de cima',
    debtPayoff: 'Dois conjuntos de barras, um para cada ordem em que as dívidas podem ser quitadas',
  },

  heroVisual: {
    label: 'Parcela mensal',
    caption: 'Um exemplo resolvido, desenhado do jeito que a calculadora desenha.',
  },

  chart: {
    months: 'Meses',
    years: 'Anos',
    start: 'Hoje',
    end: 'Fim',
    empty: 'O gráfico aparece assim que houver um número para desenhar.',
  },

  toolsIndex: {
    title: 'Calculadoras financeiras gratuitas',
    description:
      'Calculadoras gratuitas que mostram a aritmética da parcela de um financiamento, da comparação entre alugar e comprar e de uma projeção de juros compostos.',
    heading: 'Calculadoras financeiras gratuitas',
    lede: 'Cada calculadora mostra a fórmula que usa, lista as premissas por trás do resultado e diz claramente o que não faz. Nada aqui pede um endereço de e-mail, e nada aqui pede que você se cadastre em coisa alguma.',
    whatTheseAre: 'O que são estas ferramentas',
    whatTheseAreBody: [
      'São ferramentas de aritmética. Elas pegam os números que você informa, aplicam uma fórmula publicada e devolvem o resultado com o cálculo anexado. Uma calculadora de financiamento aqui não conhece sua pontuação de crédito, sua renda ou o que cada banco está oferecendo nesta semana, e não tenta adivinhar.',
      'O motivo é simples: um número que você pode conferir tem mais valor do que um número que outra pessoa escolheu por você. Toda ferramenta aqui mostra a fórmula em símbolos, aponta para as fontes primárias do método e traz uma data de revisão para você ver quando foi verificada pela última vez.',
    ],
  },

  guidesIndex: {
    title: 'Guias',
    description:
      'Explicações da aritmética por trás de financiamentos, de alugar ou comprar e de juros compostos, cada uma com sua fórmula, suas premissas e suas fontes.',
    heading: 'Guias',
    lede: 'Explicações detalhadas da aritmética e das premissas por trás das calculadoras. Todo guia mostra a fórmula, aponta para as fontes primárias e traz uma data de revisão.',
    missingHeading: 'Falta alguma coisa?',
    missingBody:
      'Os guias são escritos em torno da aritmética que os leitores acham mais difícil de acompanhar. Se um conceito financeiro não está aqui, conte qual é e o que nele confunde.',
    suggestTopic: 'Sugerir um tema',
    groups: {
      home: 'Moradia e financiamento',
      renting: 'Alugar e ser dono',
      investing: 'Investimentos',
    },
  },

  guide: {
    sourcesTitle: 'Fontes',
    sourcesNote: 'Estas são as fontes primárias por trás dos números e do método deste guia.',
  },

  about: {
    title: 'Sobre',
    description:
      'O que é este site, como é construído e as regras que segue para que todo número nele possa ser conferido.',
    heading: 'Sobre o {name}',
    lede: 'O {name} publica calculadoras financeiras e as explicações por trás delas. É um site pequeno com um propósito estreito: produzir um número que você possa conferir e mostrar o cálculo que o produziu.',
    isHeading: 'O que é este site',
    isBody: [
      'Seis calculadoras, dezoito guias e as fontes primárias por trás deles. As calculadoras pegam os números que você informa e aplicam uma fórmula publicada: a fórmula de amortização para um financiamento, uma comparação mês a mês do dinheiro gasto ao alugar e ao comprar, a fórmula de juros compostos para um saldo de poupança e a aritmética de quitar dívidas, do imposto de renda e do salário líquido.',
      'O site é financiado por publicidade gráfica. Isso molda como ele é construído. As páginas carregam rápido e têm pouco JavaScript, porque uma página rápida mantém o leitor tempo suficiente para ver a publicidade e porque é para a página rápida que as pessoas voltam. Nenhuma calculadora pede e-mail, e nenhum resultado fica bloqueado.',
    ],
    isNotHeading: 'O que este site não é',
    isNotBody: [
      'Não é uma corretora, não recebe propostas e não ganha comissão de ninguém que clique em alguma coisa. Não há conteúdo patrocinado, links de afiliados nem formulários de captação. A publicidade é apenas gráfica, o que significa que a única coisa que a visita do leitor paga é a atenção do leitor.',
      'Nenhuma ferramenta aqui avalia suas circunstâncias. Uma calculadora de financiamento que respondesse "dê 20 por cento de entrada" estaria errada na maioria das vezes, porque a resposta certa depende de coisas que a página não vê: suas outras economias, seu emprego, sua tolerância a um mês ruim. Por isso, toda ferramenta calcula e para por aí.',
    ],
    rulesHeading: 'As regras que o site segue',
    rules: [
      {
        label: 'Toda ferramenta declara seus limites.',
        body: 'Abaixo de cada resultado há um bloco que lista o que a ferramenta não faz, com as mesmas palavras em todas as páginas.',
      },
      {
        label: 'Todo número que vem de algum lugar tem fonte.',
        body: 'Os guias apontam para a fonte primária e trazem a data em que os dados foram lidos. A aritmética do próprio site é mostrada por inteiro.',
      },
      {
        label: 'Toda página traz uma data de revisão.',
        body: 'Um guia que não é olhado há muito tempo diz isso.',
      },
      {
        label: 'A IA rascunha, uma pessoa revisa.',
        body: 'Ferramentas de rascunho ajudam com as palavras. Toda página publicada foi lida por uma pessoa que conferiu a aritmética, as unidades e as afirmações.',
      },
    ],
    whoHeading: 'Quem cuida disto',
    whoBody:
      '{name}. {bio} {reviewerName} lê o conteúdo financeiro dos guias antes da publicação. A {whoEditorialLink} explica o que a revisão confere antes de uma página entrar no ar, e {whoCodeLink}: as fórmulas, os testes unitários e as verificações que bloqueiam uma versão com uma página quebrada.',
    whoEditorialLink: 'página editorial',
    whoCodeLink: 'o código é público',
    howHeading: 'Como as calculadoras funcionam',
    howBody:
      'A aritmética roda no seu navegador. Não existe servidor que receba os números que você digita, e nada sobre um cálculo é enviado a ninguém. As fórmulas são implementadas uma vez, em um só lugar, e cobertas por testes unitários que as conferem com números de empréstimos publicados e com as invariantes que a matemática exige — que um cronograma soma o valor emprestado, que um empréstimo fecha exatamente em zero, que um saldo sem juros cresce apenas com os depósitos.',
    correctionsHeading: 'Correções',
    correctionsBody:
      'Se um número está errado, um link de fonte está quebrado ou uma página se contradiz, isso é um defeito e deve ser corrigido. A {contactLink} explica como relatar, e toda correção resulta em uma data de revisão alterada, não em uma edição silenciosa.',
    contactLink: 'página de contato',
  },

  contact: {
    title: 'Contato',
    emailLine: 'Escreva para {email}.',
    description:
      'Como falar com o site sobre um número errado, um link quebrado, um tema que falta ou um problema com publicidade.',
    heading: 'Contato',
    lede: 'Um endereço, lido por uma pessoa. As respostas levam alguns dias, normalmente mais nas primeiras semanas depois que uma página é publicada.',
    worthHeading: 'Sobre o que escrever',
    worth: [
      {
        label: 'Um número errado.',
        body: 'Se um número em uma página não bate com o seu próprio cálculo, envie os dados que você usou e o número que obteve. Isso é um defeito e será analisado.',
      },
      {
        label: 'Um link de fonte quebrado ou desativado.',
        body: 'As fontes são verificadas periodicamente, mas um link pode quebrar entre uma verificação e outra.',
      },
      {
        label: 'Um tema que falta.',
        body: 'Os guias são escritos em torno da aritmética que os leitores acham mais difícil, então uma lacuna costuma ser uma lacuna nessa aritmética.',
      },
      {
        label: 'Um problema com publicidade.',
        body: 'Um anúncio que engana, quebra a página ou cobre o conteúdo merece ser relatado. O site é financiado por publicidade gráfica, então esse tipo de relato é levado a sério.',
      },
    ],
    nextHeading: 'O que acontece depois',
    nextBody:
      'Um número relatado é conferido com a fonte, e a página muda se o número estava errado. A data de revisão da página muda quando o conteúdo é verificado, tenha algo mudado ou não, então a data diz quando uma pessoa leu a página pela última vez.',
  },

  contactForm: {
    heading: 'Escrever uma mensagem',
    lede: 'O formulário envia uma mensagem para a pessoa que lê este site, e a resposta vai para o endereço que você escrever aqui.',
    nameLabel: 'Seu nome',
    emailLabel: 'Seu endereço de e-mail',
    subjectLabel: 'Assunto',
    messageLabel: 'Sua mensagem',
    submit: 'Enviar a mensagem',
    note: 'A mensagem é enviada por e-mail e lida por uma pessoa.',
    statuses: [
      { key: 'sent', text: 'A mensagem foi enviada. A resposta chega no endereço que você escreveu.' },
      { key: 'email', text: 'Esse endereço de e-mail parece incompleto. Confira e envie a mensagem de novo.' },
      { key: 'fields', text: 'Todos os campos precisam ser preenchidos.' },
      { key: 'rate', text: 'Várias mensagens saíram deste endereço em pouco tempo. Espere um minuto e envie de novo.' },
      { key: 'failed', text: 'A mensagem não foi enviada. Escreva para o endereço acima.' },
    ],
  },

  sourcesPage: {
    title: 'Fontes',
    description:
      'Todas as fontes primárias em que este site se apoia para seus números e métodos, e por que cada uma está aqui.',
    heading: 'Fontes',
    lede: 'Todo número neste site vem de uma das organizações abaixo ou de uma aritmética que o site mostra por inteiro. Nada é citado de um post de blog, de um resumo ou de uma releitura de segunda mão.',
    whyHeading: 'Por que existe uma lista de fontes',
    whyBody: [
      'Um número sem fonte é uma afirmação. Estas páginas são escritas para quem quer conferir a aritmética por conta própria, o que só funciona se os dados originais estiverem a um clique. Por isso cada guia traz sua própria lista de fontes, e esta página é o índice de todas elas.',
      'A regra do site é estreita de propósito: agências do governo, o regulador do mercado de valores mobiliários, o banco central e as agências hipotecárias patrocinadas pelo governo (GSEs). Quando um número vem de uma pesquisa comercial, a página diz isso e nomeia a pesquisa.',
    ],
    howHeading: 'Como as fontes são usadas',
    how: [
      {
        label: 'Métodos e fórmulas',
        body: 'vêm da agência que publica o método. A fórmula de amortização está nas orientações do próprio CFPB; as regras de frequência de capitalização vêm do glossário da SEC; os limites de imposto vêm do ajuste anual pela inflação do IRS.',
      },
      {
        label: 'Estatísticas publicadas',
        body: 'vêm da agência de estatística que as produziu, com a data em que o número foi lido.',
      },
      {
        label: 'Taxas de mercado',
        body: 'vêm da pesquisa que as publica e são datadas na página, porque uma taxa de outro mês é outro número.',
      },
      {
        label: 'Números dos estados',
        body: 'vêm da Tax Foundation, que compila as faixas do imposto de renda a partir das leis e dos formulários de cada estado, e as alíquotas do imposto predial a partir da American Community Survey que ela publica. As tabelas de chefe de família, a dedução do imposto federal pago e os créditos estaduais vêm das declarações e instruções dos próprios estados.',
      },
    ],
    sources: [
      {
        label: 'Consumer Financial Protection Bureau (CFPB) — financiamento imobiliário, crédito ao consumidor',
        url: 'https://www.consumerfinance.gov/',
      },
      {
        label: 'Internal Revenue Service (IRS) — faixas de imposto, ajustes pela inflação, regras de aposentadoria',
        url: 'https://www.irs.gov/',
      },
      {
        label: 'Social Security Administration (SSA) — alíquotas sobre a folha, teto salarial, limite anual',
        url: 'https://www.ssa.gov/',
      },
      {
        label: 'Freddie Mac — Primary Mortgage Market Survey',
        url: 'https://www.freddiemac.com/pmms',
      },
      {
        label: 'Fannie Mae — pesquisas e comentários de mercado',
        url: 'https://www.fanniemae.com/research-and-insights',
      },
      {
        label: 'Department of Housing and Urban Development (HUD) — FHA, HECM, moradia justa',
        url: 'https://www.hud.gov/',
      },
      {
        label: 'Bureau of Labor Statistics (BLS) — Índice de Preços ao Consumidor',
        url: 'https://www.bls.gov/cpi/',
      },
      {
        label: 'Federal Reserve Board — dados de taxas de juros (H.15)',
        url: 'https://www.federalreserve.gov/releases/h15/',
      },
      {
        label: 'Securities and Exchange Commission (SEC) — Investor.gov',
        url: 'https://www.investor.gov/',
      },
      {
        label: 'Federal Reserve Bank of St. Louis (FRED) — séries de dados econômicos',
        url: 'https://fred.stlouisfed.org/',
      },
      {
        label: 'Bureau of Labor Statistics — calculadora do CPI e tabelas de dados',
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
        label: 'Tax Foundation — Facts & Figures 2026, alíquotas estaduais do imposto de renda em 28 de abril de 2026',
        url: 'https://taxfoundation.org/data/all/state/2026-state-tax-data/',
      },
      {
        label: 'National Conference of State Legislatures (NCSL) — créditos estaduais por renda do trabalho e por filhos',
        url: 'https://www.ncsl.org/human-services/',
      },
      {
        label: 'Tax Policy Center — alíquotas e créditos estaduais do imposto de renda',
        url: 'https://taxpolicycenter.org/',
      },
      {
        label: 'Prenatal-to-3 Policy Impact Center — políticas estaduais de crédito tributário por filho',
        url: 'https://pn3policy.org/',
      },
    ],
  },

  editorial: {
    title: 'Equipe editorial',
    description:
      'Quem escreve os guias, quem os revisa e o que a revisão realmente confere antes de uma página ser publicada.',
    heading: 'Equipe editorial',
    lede: 'Uma pessoa escreve os guias. Outra lê o conteúdo financeiro de cada guia antes de ele entrar no ar. Esta página diz quem são, o que a revisão confere e o que você mesmo pode conferir.',
    authorEyebrow: 'Autor',
    reviewerEyebrow: 'Revisora financeira',
    checkEyebrow: 'O que você pode conferir',
    checkHeading: 'A aritmética é pública',
    checkBody:
      'O código por trás de cada calculadora está em um repositório público, com as fórmulas que implementa, os testes unitários que as conferem com números publicados conhecidos e as verificações que bloqueiam uma versão com uma página quebrada. Os números não dependem de confiança, e não é preciso perguntar a ninguém.',
    openRepository: 'Abrir o repositório',
    twoNamesHeading: 'Dois nomes, duas funções',
    twoNamesBody: [
      'Um nome escreve os guias e mantém o motor de cálculo. Outro lê o conteúdo financeiro de um guia antes da publicação, conferindo os números, as premissas por trás deles e as fontes de onde vêm. As duas funções são separadas de propósito: quem escreve um guia não é quem faz a leitura final.',
      'Quando um guia nomeia uma revisora, essa é a pessoa que o revisou, e o nome aparece nesse guia e em nenhum outro lugar. Uma revisão é uma afirmação sobre uma página específica, por isso fica ligada à página e não ao site como um todo.',
      'O restante desta página descreve o que a revisão confere e o que um leitor pode verificar sem perguntar a ninguém.',
    ],
    reviewHeading: 'O que a revisão confere',
    reviewIntro: 'Antes de um guia ser publicado, a revisora percorre a mesma lista toda vez:',
    review: [
      {
        label: 'A aritmética.',
        body: 'Toda fórmula é conferida com a fonte de onde vem, e o exemplo resolvido no texto é recalculado do zero. Quando um número aparece no código, os dois são comparados.',
      },
      {
        label: 'As unidades.',
        body: 'Porcentagens contra decimais, meses contra anos, dólares contra milhares. A maioria dos erros em um documento financeiro é um erro de unidade.',
      },
      {
        label: 'Os casos extremos.',
        body: 'Uma taxa zero, um prazo zero, um valor negativo. Cada um é conferido para produzir uma resposta sensata em vez de uma mensagem de erro.',
      },
      {
        label: 'A redação.',
        body: 'A página não pode dizer ao leitor o que fazer. Ela explica o que um número significa e do que depende, e para por aí. Um guia que indica uma ação é reescrito.',
      },
      {
        label: 'As fontes.',
        body: 'Cada link é aberto, conferido quanto à afirmação a que está ligado e datado.',
      },
    ],
    toolsHeading: 'Como as ferramentas de rascunho são usadas',
    toolsBody: [
      'As ferramentas de rascunho ajudam com o texto. Elas não decidem o que uma página diz. Todo número, toda fórmula e toda afirmação é escrito ou conferido por uma pessoa, e nenhuma página entra no ar sem a revisão acima. Uma ferramenta que produziu um número plausível é exatamente o tipo de coisa que este processo existe para pegar.',
      'A verificação que pega isso não é só humana. O motor de cálculo tem testes unitários que rodam a cada mudança e bloqueiam uma versão se um número se mover: o cronograma precisa somar o valor emprestado, o empréstimo precisa fechar exatamente em zero, e a projeção período a período precisa concordar com a fórmula fechada em toda frequência de capitalização. Um trecho de texto não pode falhar desse jeito. Uma fórmula pode, e quando falha, a compilação para.',
    ],
    datesHeading: 'Datas de revisão',
    datesBody:
      'Todo guia traz a data em que foi revisado pela última vez. Um guia cujo conteúdo depende de dados externos é revisado pelo menos duas vezes por ano; um guia que explica aritmética é revisado quando a fórmula por trás dele muda e, de qualquer forma, uma vez por ano. Quando uma página é revisada, a data muda, tenha o texto mudado ou não, então a data diz quando uma pessoa leu a página pela última vez.',
    correctionsHeading: 'Correções',
    correctionsBody:
      'As correções são feitas abertamente. Uma página corrigida tem a data de revisão atualizada, e a correção é descrita na conversa de contato de onde veio. Um guia com um número errado é um defeito da revisão, não da escrita, e é o processo de revisão que muda.',
    contactLink: 'contato',
  },

  privacy: {
    title: 'Privacidade',
    description:
      'O que este site coleta, o que não coleta e quais provedores de publicidade e análise aparecem nas páginas.',
    heading: 'Privacidade',
    lede: 'A versão curta: os números que você digita em uma calculadora ficam no seu navegador, e o próprio site não guarda nenhum cookie de rastreamento.',
    calculatorsHeading: 'O que as calculadoras fazem com seus dados',
    calculatorsBody:
      'Nada. A aritmética roda no seu navegador com JavaScript baixado junto com a página. Os valores que você digita não são transmitidos para lugar nenhum, não são armazenados e não ficam visíveis para o site nem para ninguém. Fechar a aba os descarta.',
    stateHeading: 'Seu estado',
    stateBody:
      'Duas das calculadoras precisam de um número do estado: a calculadora de imposto de renda federal, que soma um imposto estadual ao federal, e a calculadora de alugar ou comprar, que inclui o imposto predial no custo de ser dono de um imóvel. Quando uma dessas páginas abre, ela pergunta a este site de qual estado veio a requisição. A resposta vem da rede que serve o site, que lê o estado a partir do endereço da requisição, e é usada para preencher um campo. Nada mais acontece com ela: a resposta não é armazenada, não é gravada em um cookie e não é enviada ao Google nem à análise de páginas do provedor de hospedagem. O estado é aproximado — uma VPN, um proxy ou uma rede móvel podem apontar para o estado errado — e o campo preenchido pode ser alterado ou apagado, caso em que a página mantém o número que você digitou.',
    cookiesHeading: 'Cookies',
    cookiesBody:
      'O {name} não define cookies próprios. A análise do próprio site roda no Google Analytics 4, que o Google serve a partir dos seus próprios domínios e que guarda um identificador primário no seu navegador para distinguir uma visita da seguinte. Esse identificador não é usado para publicidade e não é compartilhado com outros sites. A análise de páginas do provedor de hospedagem não guarda nada no seu navegador: nenhum cookie, nenhum armazenamento local, nenhum identificador de qualquer tipo.',
    advertisingHeading: 'Publicidade',
    advertisingBody:
      'O site é financiado por publicidade gráfica exibida pelo Google AdSense. O Google e seus parceiros podem definir cookies ou usar tecnologias semelhantes para exibir e medir publicidade, e podem usá-los para exibir anúncios com base nas suas visitas anteriores a este ou a outros sites. Você pode rever e mudar suas escolhas nas {adsSettingsLink}, e a explicação do próprio Google sobre como usa dados de sites e apps que usam seus serviços está em {policiesLink}.',
    adsSettingsLink: 'Configurações de anúncios do Google',
    policiesLink: 'policies.google.com',
    analyticsPoliciesLink: 'policies.google.com',
    analyticsHeading: 'Análise',
    analyticsBody:
      'As visualizações de página são registradas com o Google Analytics 4, servido pelo Google a partir de googletagmanager.com. Os dados usados se limitam à página, à origem da visita e a uma localização aproximada por país ou cidade; o endereço IP é truncado em vez de armazenado por inteiro. Eles servem para contar visitas e descobrir quais páginas são lidas. A explicação do próprio Google sobre como usa dados de sites e apps que usam seus serviços está em {analyticsPoliciesLink}. O script só é carregado depois que você aceita os cookies, e também é carregado para leitores na União Europeia.',
    hostingAnalyticsHeading: 'Hospedagem e desempenho das páginas',
    hostingAnalyticsBody:
      'O site é hospedado na Cloudflare, e o Web Analytics da própria Cloudflare roda em todas as páginas. Um pequeno script servido a partir de static.cloudflareinsights.com mede a visualização: qual página foi aberta, de onde veio a visita, quais navegador e sistema operacional foram usados, de qual país veio a requisição e quanto tempo a página levou para carregar. O endereço IP é usado na borda da Cloudflare para descobrir o país e descartado ali, em vez de armazenado. O script não define cookie, não grava nada no armazenamento local e não cria nenhum identificador que possa seguir você de uma página para outra. O que sai dele é uma contagem de visualizações e visitas e uma medida de quão rápido as páginas carregam. O script só é carregado depois que você aceita os cookies. Um leitor na União Europeia não é contado de forma alguma: o script não é carregado para ele.',
    newsletterHeading: 'Newsletter',
    newsletterBody:
      'Se você se inscrever na newsletter, o endereço digitado é enviado ao Buttondown, o serviço que envia os e-mails, e armazenado lá para que a newsletter possa ser enviada. Esse endereço é usado para a newsletter e para nada mais, e toda edição traz um link para cancelar a inscrição.',
    contactHeading: 'O formulário de contato',
    contactBody:
      'Se você escrever uma mensagem pelo formulário de contato, o nome, o endereço de e-mail, o assunto e a própria mensagem são enviados por e-mail para a pessoa que cuida do site e guardados nessa caixa de correio. O formulário é servido por este site e a resposta vai para o endereço que você escreveu, para que você possa continuar a conversa. O formulário não envia nada ao Google e não define cookie próprio; os scripts de publicidade e de análise descritos acima pertencem à página como um todo e só carregam se você aceitou os cookies. Nada do que você digita é armazenado no próprio site, e a mensagem não é repassada a mais ninguém.',
    thirdPartyHeading: 'Links de terceiros',
    thirdPartyBody:
      'Os guias apontam para fontes primárias — agências do governo, a SEC, o Federal Reserve. Esses sites têm suas próprias políticas de privacidade, que este site não controla e não leu por você.',
    changesHeading: 'Mudanças',
    changesBody:
      'Se os provedores acima mudarem, esta página muda com eles. A data no fim da página é a data em que este texto foi revisado pela última vez.',
    consentHeading: 'Sua escolha',
    consentBody:
      'Nada é carregado do Google, e a análise de páginas do provedor de hospedagem fica desligada, até você responder. Se você aceitar, os scripts de publicidade e de análise são carregados e a resposta fica registrada no seu navegador; se recusar, o site funciona exatamente igual e nada é carregado. A análise de páginas do provedor de hospedagem fica de fora para um leitor na União Europeia, qualquer que seja a resposta. O link "{settingsLink}" no rodapé abre a pergunta de novo. Uma exceção: o próprio rastreador do Google, que verifica se o site exibe publicidade, recebe o script de publicidade diretamente, porque não pode responder à pergunta. Nenhuma escolha é registrada para ele e nada é guardado sobre ele. O estado descrito acima é lido em duas páginas de calculadoras e não faz parte desta escolha: nenhum cookie é definido para ele e nada sobre ele chega a um provedor de análise.',
    lastReviewed: 'Última revisão: {date}.',
  },

  terms: {
    title: 'Termos',
    description:
      'Os termos sob os quais este site é publicado, o que suas calculadoras cobrem e não cobrem e os limites do que ele pode prometer.',
    heading: 'Termos de uso',
    lede: 'Termos simples para um site que publica cálculos, não recomendações.',
    providesHeading: 'O que este site oferece',
    providesBody:
      'O {name} publica calculadoras e explicações escritas da aritmética por trás delas. As calculadoras aplicam fórmulas publicadas aos valores que você informa e devolvem o resultado junto com o cálculo. Esse é o serviço inteiro.',
    notProvidesHeading: 'O que este site não oferece',
    notProvidesBody: [
      'Nada aqui é aconselhamento financeiro, tributário, jurídico ou de investimento, e nada aqui é uma recomendação para comprar, vender, manter, alugar, ser dono, refinanciar ou assinar qualquer coisa. Um resultado reflete os dados que você digitou e a fórmula da página. Mude um dado e o resultado muda; é isso que o torna um cálculo, e não uma conclusão.',
      'Uma calculadora não vê suas finanças, sua renda, seu crédito, seu horizonte de tempo ou sua tolerância a risco, e não tenta adivinhá-los. Duas pessoas com os mesmos dados e circunstâncias diferentes chegarão a conclusões diferentes, e a calculadora não está em posição de dizer qual delas está certa.',
    ],
    figuresHeading: 'Números, fontes e datas',
    figuresBody:
      'Quando um número vem de uma fonte externa, a página aponta para essa fonte e informa a data em que foi lido. Dados externos mudam: limites de imposto, taxas publicadas e estatísticas oficiais são todos revistos. Um número em uma página é preciso na data de revisão dessa página e não depois, e a data de revisão está lá para você ver a idade dele.',
    errorsHeading: 'Erros',
    errorsBody:
      'Os cálculos são implementados uma vez, em um só lugar, e testados. Mesmo assim, um erro é possível. Se você encontrar um, a página de contato explica como relatá-lo, e os defeitos relatados são corrigidos e a data de revisão é atualizada.',
    advertisingHeading: 'Publicidade',
    advertisingBody:
      'O site é financiado por publicidade gráfica. Os anúncios são exibidos por um terceiro e não estão sob controle do site. Os anúncios são identificados e separados do conteúdo do próprio site. Nenhum anunciante paga por uma página, um posicionamento, um lugar em um resultado de busca ou a menção de um produto em um guia.',
    useHeading: 'Uso do site',
    useBody:
      'O site é publicado para uso pessoal. Você pode lê-lo, imprimi-lo e colocar links para ele. Não pode republicar partes substanciais dos guias como trabalho seu nem usar as calculadoras para construir um produto que concorra com o site.',
    changesHeading: 'Mudanças',
    changesBody:
      'Estes termos podem mudar conforme o site muda. A data de revisão abaixo é a data em que este texto foi lido pela última vez.',
    lastReviewed: 'Última revisão: {date}.',
    contactLink: 'página de contato',
  },

  notFound: {
    title: 'Página não encontrada',
    description: 'Essa página não existe neste site. Aqui é onde tudo realmente fica.',
    heading: 'Página não encontrada',
    lede: 'Esse endereço não existe aqui. Tudo o que o site publica são as calculadoras, os guias por trás delas ou as páginas que explicam de onde vêm os números.',
    calculators: {
      title: 'Calculadoras',
      text: 'Parcela do financiamento, alugar ou comprar, juros compostos.',
    },
    guides: {
      title: 'Guias',
      text: 'A aritmética por trás de cada calculadora, em detalhe.',
    },
    sources: {
      title: 'Fontes',
      text: 'Todas as fontes primárias em que o site se apoia.',
    },
    contact: {
      title: 'Contato',
      text: 'Conte o que está faltando ou errado.',
    },
  },

  tool: {
    'mortgage-payment': {
      name: 'Calculadora de financiamento imobiliário',
      title: 'Calculadora de parcela de financiamento com amortização',
      description:
        'Calcule a parcela mensal do financiamento, o custo total PITI e o cronograma completo de amortização. Veja cada dólar de juros e como pagamentos extras antecipam a quitação.',
      short: 'Principal e juros mensais, PITI completo, cronograma de amortização e o efeito de pagamentos extras.',
      category: 'Moradia',
      methodNote:
        'A fórmula da parcela, o cronograma de amortização e a forma como os pagamentos extras são aplicados estão descritos abaixo. Nada nesta página é uma cotação de mercado em tempo real.',
      fields: {
        homePrice: 'Preço do imóvel',
        downPayment: 'Entrada',
        percentOfPrice: 'porcentagem do preço',
        interestRate: 'Taxa de juros',
        annualFixed: 'anual, fixa',
        loanTerm: 'Prazo do empréstimo',
        propertyTax: 'Imposto predial',
        percentOfPricePerYear: '% do preço por ano',
        homeInsurance: 'Seguro residencial',
        perYear: 'por ano',
        hoaFee: 'Taxa de condomínio (HOA)',
        perMonth: 'por mês',
        extraPrincipal: 'Principal extra',
        firstPayment: 'Primeiro pagamento',
        month: 'mês',
        seeAmortization: 'Ver a amortização ano a ano',
      },
      terms: {
        years: (n: number) => `${n} ${n === 1 ? 'ano' : 'anos'}`,
      },
      table: {
        year: 'Ano',
        principal: 'Principal',
        interest: 'Juros',
        balance: 'Saldo',
      },
      result: {
        headlineLabel: 'Parcela mensal total (PITI)',
        principalAndInterest: 'Principal e juros',
        propertyTax: 'Imposto predial',
        insurance: 'Seguro',
        hoa: 'HOA',
        totalInterest: 'Juros totais',
        paidOff: 'Quitado em',
        note: 'Principal, juros, imposto predial, seguro e HOA, usando os números que você informou.',
      },
      resultNote:
        'Mude qualquer campo e os números se atualizam enquanto você digita. Nada é enviado a lugar nenhum: a aritmética roda nesta página.',
      chart: {
        title: 'O saldo e os juros, ano a ano',
        note: 'O saldo cai à medida que o empréstimo é pago, e os juros pagos a cada ano caem junto.',
        xAxis: 'years',
        series: [
          { key: 'balance', label: 'Saldo' },
          { key: 'interest', label: 'Juros pagos' },
        ],
      },
      formula: 'M = P · r(1 + r)ⁿ / ((1 + r)ⁿ − 1)',
      method: [
        'A parcela mensal programada vem da fórmula padrão de amortização:',
        'P é o valor emprestado, que esta página calcula como o preço do imóvel menos a entrada. r é a taxa anual que você informou dividida por doze, e n é o prazo em meses. A partir desse único número, a calculadora monta um cronograma mês a mês: os juros incidem sobre o saldo devedor no início do mês, e o que sobra da parcela depois desses juros reduz o saldo.',
        'A parcela mensal completa é o valor de principal e juros mais o imposto predial dividido por doze, o seguro dividido por doze e a taxa de condomínio, se houver. Esses três são você quem define: a calculadora não sabe quanto cobra a avaliação local ou a sua seguradora, e não chuta por você.',
        'Um pagamento mensal extra é aplicado ao principal, então reduz o saldo sobre o qual incidem os juros do mês seguinte. A parcela programada não muda, o empréstimo termina antes e os juros totais caem.',
      ],
      limits: [
        'Ela não verifica se você se qualifica para um empréstimo e não olha sua pontuação de crédito, renda, relação dívida-renda ou as regras de análise de crédito de qualquer banco.',
        'Ela não cota as taxas de mercado atuais para o seu CEP. A taxa de juros que você digita é a taxa usada, e nada nesta página é em tempo real.',
        'Ela não modela seguro hipotecário privado, pontos, tarifas de originação, custos de fechamento ou o calendário da conta de garantia (escrow) que decide em que mês chega uma conta de imposto.',
        'Ela não diz se você deve comprar um imóvel. Ela produz um número e o cálculo por trás dele.',
      ],
      faq: [
        {
          q: 'O que significa PITI?',
          a: 'Principal, Interest, Taxes and Insurance — principal, juros, impostos e seguro. É a parcela mensal de moradia em quatro partes: a parte que paga o empréstimo, a parte que remunera o banco pelo empréstimo, o imposto predial e o seguro residencial. Esta calculadora mostra cada parte separadamente para você ver o que compõe o total.',
        },
        {
          q: 'Como é calculada a parcela mensal de principal e juros?',
          a: 'Pela fórmula padrão de amortização: M = P · r(1 + r)ⁿ / ((1 + r)ⁿ − 1), em que P é o valor emprestado, r é a taxa de juros mensal e n é o número de parcelas mensais. O cronograma que se segue reduz os juros e aumenta o principal a cada mês, então as primeiras parcelas são, em sua maior parte, juros.',
        },
        {
          q: 'O que acontece com a última parcela?',
          a: 'A parcela programada é arredondada para o centavo mais próximo, o que deixa alguns centavos em aberto no fim do prazo. A última parcela programada é ajustada para que o empréstimo feche exatamente em zero, do mesmo jeito que um banco ajusta a parcela final.',
        },
        {
          q: 'Pagamentos extras encurtam o empréstimo ou a parcela?',
          a: 'Encurtam o empréstimo. Um pagamento extra é aplicado ao principal, o que reduz o saldo sobre o qual incidem os juros do mês seguinte. A parcela programada continua a mesma, e o empréstimo termina antes, com menos juros no total.',
        },
        {
          q: 'O valor de juros totais é afetado pelo imposto e pelo seguro que informei?',
          a: 'Não. Os juros totais cobrem apenas o empréstimo. Imposto predial, seguro e HOA são custos de moradia que continuam depois de quitado o empréstimo, por isso a calculadora mostra o custo total de moradia separadamente.',
        },
        {
          q: 'A calculadora considera a inflação?',
          a: 'Não. Todo número está nos dólares que você informou. Uma parcela daqui a 30 anos é uma parte muito menor da renda do que a mesma parcela hoje, e nenhum número desta página se ajusta a isso.',
        },
      ],
      sources: [
        {
          label: 'CFPB — Como calcular a parcela de um financiamento',
          url: 'https://www.consumerfinance.gov/ask-cfpb/how-do-i-calculate-my-mortgage-payment-en-144/',
        },
        {
          label: 'Freddie Mac — Primary Mortgage Market Survey (metodologia das taxas)',
          url: 'https://www.freddiemac.com/pmms',
        },
        {
          label: 'HUD — requisitos de empréstimos FHA e seguro hipotecário',
          url: 'https://www.hud.gov/helping_american_homeowners',
        },
        {
          label: 'BLS — Índice de Preços ao Consumidor (inflação, para a nota sobre valor real)',
          url: 'https://www.bls.gov/cpi/',
        },
      ],
      relatedGuides: [
        { slug: 'mortgage-payment-calculator-explained', title: 'A calculadora de financiamento explicada' },
        { slug: 'how-mortgage-amortization-works', title: 'Como funciona a amortização de um financiamento' },
        { slug: 'monthly-payment-vs-total-cost-mortgage', title: 'Parcela mensal versus custo total do financiamento' },
        { slug: 'extra-mortgage-payments-math', title: 'A matemática dos pagamentos extras' },
        { slug: 'how-to-read-an-amortization-schedule', title: 'Como ler um cronograma de amortização' },
      ],
    },

    'rent-vs-buy': {
      name: 'Calculadora alugar ou comprar',
      title: 'Alugar ou comprar: compare o custo real',
      description:
        'Compare alugar e ser dono pelos números: custo mensal, desembolso inicial, patrimônio e o mês em que os dois caminhos se cruzam. Sem veredito, só a aritmética.',
      short: 'Custo mensal, desembolso inicial, formação de patrimônio e o mês do cruzamento.',
      category: 'Moradia',
      methodNote:
        'A comparação é de saída de caixa e patrimônio. Ela não produz veredito de propósito — o mês do cruzamento é um fato sobre os números que você informou, não uma recomendação.',
      sections: {
        theHome: 'O imóvel',
        theRent: 'O aluguel',
        runningCosts: 'Custos recorrentes',
        assumptions: 'Premissas',
      },
      fields: {
        purchasePrice: 'Preço de compra',
        downPayment: 'Entrada',
        percentOfPrice: 'porcentagem do preço',
        mortgageRate: 'Taxa do financiamento',
        annualFixed: 'anual, fixa',
        loanTerm: 'Prazo do empréstimo',
        monthlyRent: 'Aluguel mensal',
        rentersInsurance: 'Seguro do inquilino',
        perMonth: 'por mês',
        propertyTax: 'Imposto predial',
        percentOfPricePerYear: '% do preço por ano',
        homeInsurance: 'Seguro residencial',
        perYear: 'por ano',
        hoaFee: 'Taxa de condomínio (HOA)',
        maintenance: 'Manutenção',
        annualChangeInValue: 'Variação anual do valor',
        negativeModelsAFall: 'negativo simula uma queda',
        compareOver: 'Comparar ao longo de',
        closingCosts: 'Custos de fechamento',
        percentOfPriceOnce: '% do preço, uma vez',
        sellingCosts: 'Custos de venda',
        percentOfFinalValue: '% do valor final',
      },
      terms: {
        years: (n: number) => `${n} ${n === 1 ? 'ano' : 'anos'}`,
      },
      result: {
        headlineLabel: 'Diferença mensal (ser dono menos alugar)',
        monthlyRent: 'Aluguel mensal',
        monthlyOwnership: 'Custo mensal de ser dono',
        monthlyOwnershipAfterLoan: 'Custo mensal de ser dono depois de quitado o empréstimo',
        upfrontOutlay: 'Desembolso inicial',
        equityBuilt: 'Patrimônio formado',
        homeValueAtHorizon: 'Valor do imóvel no horizonte',
        sellingCostsAtHorizon: 'Custos de venda no horizonte',
        netCostAtHorizon: 'Custo líquido de ser dono no horizonte',
        crossover: 'Cruzamento',
        note: 'O custo de ser dono inclui a parcela do financiamento enquanto o empréstimo dura, e imposto predial, seguro, HOA e manutenção depois dele. O patrimônio é o valor do imóvel menos o saldo ainda devido, descontados os custos que uma venda naquele momento teria.',
      },
      resultNote:
        'O cruzamento é o primeiro mês em que o custo líquido de ser dono — dinheiro pago menos o patrimônio que uma venda deixaria — fica abaixo do custo em dinheiro de alugar. É um fato sobre estes números, não uma recomendação.',
      chart: {
        title: 'O custo de alugar contra o custo de ser dono',
        note: 'As duas linhas são dinheiro acumulado: o aluguel pago e o dinheiro gasto com o imóvel depois de descontado o patrimônio que ele forma, líquido dos custos de uma venda naquele momento.',
        xAxis: 'years',
        series: [
          { key: 'rent', label: 'Aluguel pago' },
          { key: 'ownership', label: 'Custo líquido de ser dono' },
        ],
      },
      method: [
        'A cada mês, a calculadora mantém dois livros lado a lado. O livro do aluguel soma o aluguel e o seguro do inquilino. O livro de ser dono soma a parcela do financiamento pela fórmula padrão de amortização, imposto predial, seguro, HOA e a reserva de manutenção, além da entrada e dos custos de fechamento no primeiro mês. A parcela do financiamento para quando o empréstimo é quitado; os outros custos recorrentes continuam enquanto você for dono do imóvel.',
        'Junto com o segundo livro, ela acompanha o valor do imóvel, que cresce ou encolhe a cada mês na taxa anual que você informou, e o saldo ainda devido do empréstimo. A diferença entre os dois é o seu patrimônio:',
        'O custo líquido de ser dono é o dinheiro que você pagou, menos o patrimônio formado, mais os custos que uma venda naquele momento teria. O mês do cruzamento é o primeiro mês em que esse valor fica abaixo do aluguel que você teria pago no mesmo período. Os custos de venda não fazem parte da parcela mensal, porque você só os paga quando vende; eles ficam com o patrimônio, onde a venda acontece.',
      ],
      formula: 'patrimônio = valor do imóvel − saldo devedor do empréstimo',
      limits: [
        'Ela não diz qual opção é melhor para você. Os dois caminhos são comparados com os números que você informa, e o mês do cruzamento é informado, nada mais.',
        'Ela não modela a tributação de uma venda, a dedução dos juros do financiamento nem a depreciação de um imóvel ao longo do tempo.',
        'Ela não cota um empréstimo específico. A taxa do financiamento que você digita é a taxa usada; a página não traz cotações em tempo real nem informações de bancos.',
        'Ela não prevê preços de imóveis. A variação anual de valor que você informa é aplicada mês a mês durante todo o horizonte, nos dois sentidos se você digitar um número negativo.',
        'Ela não modela o custo de sair de um imóvel alugado. Caução, taxa de corretagem e custos de mudança ficam fora da comparação do lado do aluguel.',
        'Ela não usa a alíquota de um condado ou cidade específicos. A alíquota do imposto predial que a página pode preencher é a média do estado, e o imposto predial é definido localmente, então a alíquota de uma jurisdição costuma ser diferente da alíquota da vizinha.',
      ],
      faq: [
        {
          q: 'O que significa o mês do cruzamento?',
          a: 'É o primeiro mês em que o custo líquido de ser dono — o dinheiro que você pagou, menos o patrimônio formado, mais os custos de uma venda naquele momento — fica abaixo do dinheiro que você teria pago de aluguel no mesmo período. Antes desse ponto, alugar custou menos em dinheiro. Depois dele, ser dono custou menos quando o patrimônio é contado.',
        },
        {
          q: 'Por que o cálculo inclui uma reserva de manutenção?',
          a: 'Um imóvel custa dinheiro para manter em bom estado, com ou sem financiamento, e esse custo não aparece em nenhum documento de fechamento. A calculadora o aplica como uma porcentagem do preço de compra a cada ano, e a porcentagem é um dado que você define.',
        },
        {
          q: 'O que acontece com o valor do imóvel no cálculo?',
          a: 'Ele cresce ou encolhe a cada mês na taxa anual que você informa e depois é comparado com o saldo devedor do empréstimo para dar o número do patrimônio. Uma taxa negativa simula um mercado em queda; uma taxa zero mantém o preço estável.',
        },
        {
          q: 'Os custos de venda estão incluídos?',
          a: 'Sim. Os custos de venda incidem sobre o preço do imóvel no momento da venda, então não fazem parte da parcela mensal. Eles reduzem o patrimônio que uma venda deixaria e, por isso, fazem parte do custo líquido de ser dono e do mês do cruzamento. O valor é mostrado à parte no horizonte.',
        },
        {
          q: 'O que acontece com a parcela do financiamento depois de quitado o empréstimo?',
          a: 'Ela para. O principal e os juros do empréstimo terminam com o empréstimo, enquanto imposto predial, seguro, HOA e manutenção continuam enquanto o imóvel for seu. Quando a comparação vai além do fim do prazo, os meses seguintes incluem apenas os custos recorrentes.',
        },
        {
          q: 'Qual é a diferença entre o aluguel total e o custo líquido de ser dono?',
          a: 'O aluguel total é simplesmente o aluguel mensal multiplicado pelo número de meses. O custo líquido de ser dono é o que você paga de financiamento, imposto, seguro, HOA e manutenção, mais o desembolso inicial, menos o patrimônio acumulado, mais os custos de uma venda. O segundo valor pode ser negativo, o que significa que você formou mais patrimônio do que desembolsou.',
        },
        {
          q: 'Isto inclui as consequências tributárias de vender um imóvel?',
          a: 'Não. Qualquer ganho na venda, e qualquer isenção que se aplique a ele, está fora do escopo desta ferramenta. A comparação aqui é de dinheiro e patrimônio, não de impostos.',
        },
        {
          q: 'De onde vem a alíquota do imposto predial?',
          a: 'É um dado de entrada. Quando a rede consegue descobrir de qual estado vem a requisição, a página preenche o campo com a alíquota efetiva média do imposto predial desse estado, tirada da American Community Survey de 2024 e publicada pela Tax Foundation para 2026. O imposto predial é definido pelos governos locais, então a alíquota de um condado ou cidade específicos costuma ser diferente da média do estado, e o campo continua editável.',
        },
      ],
      sources: [
        {
          label: 'CFPB — custos de moradia, alugar e ser dono',
          url: 'https://www.consumerfinance.gov/consumer-tools/mortgages/',
        },
        {
          label: 'HUD — custos de moradia, impostos prediais e orientações sobre seguro',
          url: 'https://www.hud.gov/helping_american_homeowners',
        },
        {
          label: 'BLS — Índice de Preços ao Consumidor (inflação, para a nota sobre valorização)',
          url: 'https://www.bls.gov/cpi/',
        },
        {
          label: 'FRED — série do índice de preços de imóveis usada para o movimento de longo prazo',
          url: 'https://fred.stlouisfed.org/series/HPINUS',
        },
        {
          label: 'Tax Foundation — Property Taxes by State and County, 2026',
          url: 'https://taxfoundation.org/data/all/state/property-taxes-by-state-county/',
        },
      ],
      relatedGuides: [
        { slug: 'rent-vs-buy-calculator-explained', title: 'A calculadora alugar ou comprar explicada' },
        { slug: 'rent-vs-buy-common-mistakes', title: 'Erros comuns na comparação entre alugar e comprar' },
        { slug: 'estimating-property-tax-and-home-insurance', title: 'Como estimar o imposto predial e o seguro residencial' },
        { slug: 'down-payment-and-closing-costs-explained', title: 'Entrada e custos de fechamento explicados' },
        { slug: 'monthly-payment-vs-total-cost-mortgage', title: 'Parcela mensal versus custo total do financiamento' },
      ],
      script: {
        notWithinHorizon: 'Fora do horizonte',
        month: 'Mês {n}',
        propertyTaxDetected: 'Preenchido com {state}: a alíquota efetiva média do imposto predial do estado.',
      },
    },

    'compound-interest': {
      name: 'Calculadora de juros compostos',
      title: 'Calculadora de juros compostos com aportes mensais',
      description:
        'Projete um saldo com aportes regulares, escolha a frequência de capitalização e veja o resultado em dólares de hoje, descontada a inflação. Fórmulas mostradas.',
      short: 'Saldo, aportes, juros ganhos e o valor corrigido pela inflação.',
      category: 'Investimentos',
      methodNote:
        'A projeção avança um período de cada vez, então a tabela anual é produzida pela mesma aritmética que produz o número final.',
      fields: {
        startingBalance: 'Saldo inicial',
        today: 'hoje',
        monthlyContribution: 'Aporte mensal',
        addedEachMonth: 'somado todo mês',
        interestRate: 'Taxa de juros',
        annualNominal: 'anual, nominal',
        time: 'Prazo',
        years: 'anos',
        compounding: 'Capitalização',
        contributionTiming: 'Momento do aporte',
        inflation: 'Inflação',
        annualForRealValue: 'anual, para o valor real',
        seeBalance: 'Ver o saldo ano a ano',
      },
      frequencies: {
        monthly: 'Mensal',
        quarterly: 'Trimestral',
        twiceAYear: 'Semestral',
        annually: 'Anual',
        everyTwoMonths: 'Bimestral',
        everyFourMonths: 'Quadrimestral',
      },
      timing: {
        endOfMonth: 'Fim do mês',
        startOfMonth: 'Início do mês',
      },
      table: {
        year: 'Ano',
        balance: 'Saldo',
        contributed: 'Aportado',
        interest: 'Juros',
        inTodaysDollars: 'Em dólares de hoje',
      },
      result: {
        headlineLabel: 'Saldo no fim do período',
        totalContributions: 'Total aportado',
        interestEarned: 'Juros ganhos',
        inTodaysDollars: 'Em dólares de hoje',
        effectiveAnnualRate: 'Taxa anual efetiva',
        realAnnualRate: 'Taxa anual real',
        horizon: 'Horizonte',
        note: 'O saldo está nos dólares que você informou. O valor corrigido pela inflação o converte para o poder de compra do ano inicial.',
      },
      resultNote:
        'A taxa que você informa é usada exatamente como digitada durante todo o período. Esta página não busca uma taxa de mercado.',
      chart: {
        title: 'Do que o saldo é feito',
        note: 'A linha é o saldo. A faixa abaixo dela é a parte que veio dos juros, e não dos aportes.',
        xAxis: 'years',
        series: [
          { key: 'balance', label: 'Saldo' },
          { key: 'contributed', label: 'Aportado' },
        ],
      },
      method: [
        'A projeção avança um período de capitalização de cada vez. Em cada período, o saldo rende juros na taxa do período e depois o aporte desse período é somado — no fim ou no início do período, conforme a configuração. Rodar os períodos em sequência, em vez de usar uma única expressão fechada, é o que produz a tabela ano a ano, e o saldo final é o mesmo de qualquer forma.',
        'Em forma fechada, o mesmo resultado é:',
        'em que P é o saldo inicial, r é a taxa anual dividida pelo número de períodos de capitalização por ano, n é o número de períodos e PMT é o aporte feito em cada período. Um aporte feito no início do período rende juros durante todo esse período, então nesse caso o termo dos aportes é multiplicado por (1 + r).',
        'Os números reais vêm de dois ajustes. A taxa anual efetiva é (1 + r) elevado ao número de períodos por ano, que é o que uma taxa nominal de 7 % realmente vira depois de um ano de capitalização mensal. A taxa real pega essa taxa efetiva e a divide pelo fator de inflação, e o saldo em dólares de hoje é o saldo nominal dividido pela inflação acumulada no mesmo período.',
      ],
      formula: 'FV = P(1 + r)ⁿ + PMT · ((1 + r)ⁿ − 1) / r',
      limits: [
        'Ela não prevê um retorno. A taxa que você digita é usada exatamente como digitada durante todo o período; nenhuma média histórica, nenhuma previsão e nenhum dado de mercado alimentam esta página.',
        'Ela não modela impostos, tarifas ou encargos da conta. O saldo de uma conta real vai diferir pelo que o provedor cobrar.',
        'Ela não modela a volatilidade do mercado. Saldos reais caem nos anos em que os mercados reais caem, e nenhuma taxa fixa capta isso.',
        'Ela não diz como investir nem se é o caso de poupar. Ela projeta um número com as premissas que você informa.',
      ],
      faq: [
        {
          q: 'Por que a frequência de capitalização só pode ser 1, 2, 3, 4, 6 ou 12?',
          a: 'Porque os aportes aqui são mensais, e a calculadora mantém o período de capitalização e o período de aporte iguais. Qualquer frequência que divida doze mantém essa aritmética exata, e não aproximada. Na prática, essas seis cobrem de capitalização diária a anual com depósitos mensais.',
        },
        {
          q: 'Qual é a diferença entre a taxa nominal e a taxa anual efetiva?',
          a: 'A taxa nominal é o número da conta: 7 %. A efetiva é o que o saldo realmente rende depois de um ano de capitalização, então 7 % capitalizados mensalmente dão 7,229 %. A página mostra as duas, porque a diferença importa em períodos longos.',
        },
        {
          q: 'O que significa o valor real?',
          a: 'É o saldo final expresso no poder de compra do ano inicial. O cálculo divide o saldo nominal pela inflação acumulada no mesmo período, o que mostra quanto do saldo é crescimento real e quanto são os mesmos dólares valendo menos.',
        },
        {
          q: 'O momento do aporte muda o resultado?',
          a: 'Sim, e a página mostra os dois casos. Um aporte feito no início de cada período rende juros durante todo esse período, então termina com mais do que o mesmo aporte feito no fim. A diferença é pequena por pagamento, mas se acumula ao longo de décadas.',
        },
        {
          q: 'O que acontece com uma taxa de juros zero?',
          a: 'O saldo cresce apenas com os aportes, sem juros. A calculadora trata esse caso explicitamente, em vez de dividir por zero, e por isso o valor é exatamente o total depositado.',
        },
        {
          q: 'Um aporte regular é obrigatório?',
          a: 'Não. Colocar o aporte mensal em zero transforma o cálculo em uma projeção simples de juros compostos sobre o saldo inicial, que é o modelo adequado para uma quantia única já investida.',
        },
      ],
      sources: [
        {
          label: 'SEC — Investor.gov: juros compostos e o custo das tarifas',
          url: 'https://www.investor.gov/introduction-investing/investing-basics/glossary/compound-interest',
        },
        {
          label: 'BLS — Índice de Preços ao Consumidor (para os valores corrigidos pela inflação)',
          url: 'https://www.bls.gov/cpi/',
        },
        {
          label: 'Federal Reserve — dados de taxas de depósitos a prazo e poupança',
          url: 'https://www.federalreserve.gov/releases/h15/',
        },
        {
          label: 'IRS — juros compostos e o crescimento de um IRA tradicional',
          url: 'https://www.irs.gov/retirement-plans/traditional-iras',
        },
      ],
      relatedGuides: [
        { slug: 'compound-interest-calculator-explained', title: 'A calculadora de juros compostos explicada' },
        { slug: 'compound-vs-simple-interest', title: 'Juros compostos versus juros simples' },
        { slug: 'how-compounding-frequency-changes-results', title: 'Como a frequência de capitalização muda o resultado' },
        { slug: 'inflation-and-real-returns-explained', title: 'Inflação e retorno real explicados' },
        { slug: 'understanding-apr', title: 'Entendendo o APR, a taxa percentual anual' },
      ],
      script: {
        yearsOne: '1 ano',
        yearsOther: '{n} anos',
      },
    },
    'net-pay': {
      name: 'Calculadora de salário líquido',
      title: 'Calculadora de salário líquido para o ano fiscal de 2026',
      description:
        'Calcule o que sobra de um salário depois do imposto de renda federal, Social Security, Medicare e imposto estadual, para qualquer período de pagamento, com cada desconto mostrado.',
      short: 'O que um salário vira depois do imposto federal, dos impostos sobre a folha e do imposto estadual.',
      category: 'Salário',
      methodNote:
        'Os números são do ano fiscal de 2026: Rev. Proc. 2025-32 para as faixas federais e a dedução padrão, e a Social Security Administration para os limites dos impostos sobre a folha. Nada nesta página é uma cotação de um provedor de folha de pagamento.',
      fields: {
        grossPay: 'Salário bruto',
        payPeriod: 'Período de pagamento',
        filingStatus: 'Situação de declaração',
        stateRate: 'Alíquota do imposto de renda estadual',
        stateRateHint: 'a alíquota da sua faixa',
        retirementContribution: 'Contribuição para 401(k) ou 403(b)',
        retirementHint: 'por ano — ainda sujeita aos impostos sobre a folha',
        healthContribution: 'Contribuição para HSA ou FSA',
        healthHint: 'por ano — não sujeita aos impostos sobre a folha',
        perYear: 'por ano',
        debtName: 'Dívida',
        balance: 'Saldo',
        rate: 'Taxa',
        minimum: 'Pagamento mínimo',
      },
      terms: {
        payPeriods: {
          year: 'Anual',
          month: 'Mensal',
          week: 'Semanal',
          day: 'Por dia',
          hour: 'Por hora',
        },
        filingStatuses: {
          single: 'Solteiro',
          married: 'Casados, declaração conjunta',
          head: 'Chefe de família',
        },
      },
      result: {
        headlineLabel: 'Salário líquido',
        annualGross: 'Salário bruto do ano',
        federalTax: 'Imposto de renda federal',
        socialSecurity: 'Social Security',
        medicare: 'Medicare',
        additionalMedicare: 'Imposto adicional do Medicare',
        stateTax: 'Imposto de renda estadual',
        totalTax: 'Imposto total',
        netPerMonth: 'Líquido por mês',
        effectiveRate: 'Alíquota efetiva',
        note:
          'O valor líquido é o salário bruto menos os descontos acima, dividido pelo número de períodos de pagamento no ano.',
        negativeNote:
          'Os descontos são tão grandes quanto o salário bruto, e os impostos sobre a folha ainda incidem sobre eles, então o valor líquido fica abaixo de zero. Os limites anuais das contribuições não são verificados aqui.',
      },
      resultNote:
        'Um sistema de folha de pagamento usa as escolhas de retenção do formulário W-4 e os valores já retidos durante o ano, então o número em um contracheque real varia um pouco de mês para mês.',
      chart: {
        title: 'Para onde vai o salário bruto',
        note: 'Uma barra para o ano, dividida entre a parte que chega ao trabalhador e as partes descontadas dela.',
        xAxis: 'none',
        series: [
          { key: 'net', label: 'Salário líquido' },
          { key: 'federal', label: 'Imposto de renda federal' },
          { key: 'socialSecurity', label: 'Social Security' },
          { key: 'medicare', label: 'Medicare' },
          { key: 'state', label: 'Imposto de renda estadual' },
        ],
      },
      formula:
        'líquido = salário bruto − descontos antes do imposto − imposto de renda federal − Social Security − Medicare − imposto de renda estadual',
      method: [
        'O cálculo parte do salário bruto e volta pelos descontos, na ordem em que um sistema de folha de pagamento os aplica. Os descontos antes do imposto saem primeiro, porque uma contribuição para um 401(k) ou para uma conta de saúde é retirada do salário antes de ele ser tributado. O que sobra é o salário tributável.',
        'Os dois descontos não são tratados da mesma forma. Uma contribuição para 401(k) ou 403(b) é excluída da renda, mas continua sendo salário para Social Security e Medicare, então reduz o imposto federal e não mexe nos impostos sobre a folha. Uma contribuição para HSA ou FSA descontada do contracheque é excluída da renda e do salário para Social Security, então reduz os dois.',
        'O imposto de renda federal é calculado sobre esse salário tributável. Subtrai-se a dedução padrão da situação de declaração, e o resultado passa pela tabela de faixas de 2026. Cada faixa é um valor fixo de imposto mais uma porcentagem da renda acima do piso dessa faixa, que é como o IRS publica a tabela.',
        'Depois vêm os impostos sobre a folha. Eles são calculados sobre o salário menos qualquer contribuição para HSA ou FSA, porque uma contribuição para 401(k) continua no salário para esse fim. O Social Security é 6,2% do salário até o teto tributável de $184,500 em 2026. O Medicare é 1,45% de todo o salário, sem teto, e o imposto adicional do Medicare é 0,9% da parte acima de $200,000 para solteiros, ou acima de $250,000 para casados com declaração conjunta.',
        'O imposto de renda estadual é a alíquota que o leitor digita, aplicada à renda tributável. É uma estimativa: a maioria dos estados tributa por faixas, então um único número aplicado a toda a renda superestima o que a maioria das pessoas paga. O número final é o que sobra, dividido pelo número de períodos de pagamento no ano.',
      ],
      limits: [
        'Ela não modela créditos tributários. O crédito por filho, o crédito por renda do trabalho e os créditos de educação mudam o número final e não estão no cálculo.',
        'Ela não modela ganhos de capital, renda de trabalho autônomo nem o tratamento da renda acima do teto do Social Security, onde o Medicare ainda se aplica e o Social Security não.',
        'Ela não modela impostos locais. Impostos de renda de cidades e condados são separados da alíquota estadual.',
        'As contagens de períodos são convencionais: 12 meses, 52 semanas, 260 dias úteis ou 2.080 horas para uma semana de 40 horas ao longo de 52 semanas. Um leitor pago em outro calendário pode informar o valor anual.',
        'A contribuição para HSA ou FSA é tratada como uma redução salarial descontada do contracheque, o que a isenta de Social Security e Medicare. Uma contribuição para HSA feita direto de uma conta bancária é salário para o Social Security, e esse caso não está no cálculo.',
        'Uma contribuição para 401(k) acima do limite anual de 2026 volta a estar parcialmente sujeita aos impostos sobre a folha, e este cálculo cobra os impostos sobre a folha sobre toda a contribuição.',
        'Ela não verifica os limites anuais das contribuições. Uma contribuição para 401(k) ou HSA do tamanho de todo o salário deixa o valor líquido abaixo de zero, porque os impostos sobre a folha ainda incidem sobre ela.',
      ],
      faq: [
        {
          q: 'Por que meu salário líquido é menor que o bruto menos o imposto de renda?',
          a: 'Porque o salário também sofre os descontos de Social Security e Medicare. São impostos sobre a folha incidentes sobre o próprio emprego, separados do imposto de renda do contracheque.',
        },
        {
          q: 'Uma contribuição para 401(k) reduz meu Social Security e meu Medicare?',
          a: 'Não. Ela sai do salário antes do cálculo do imposto de renda federal, mas continua sendo salário para os impostos sobre a folha, então Social Security e Medicare incidem sobre ela. Uma contribuição para HSA ou FSA descontada do contracheque é diferente: ela também sai da base desses impostos. Por isso as duas são informadas separadamente.',
        },
        {
          q: 'Isto usa a minha faixa de imposto real?',
          a: 'Usa a tabela de faixas de 2026 e a dedução padrão da situação de declaração, então o número fica próximo do que um sistema de folha de pagamento calcula para um assalariado sem outra renda. Não sabe nada sobre créditos, outras deduções ou outras rendas.',
        },
        {
          q: 'Qual é a diferença entre a alíquota efetiva e a marginal?',
          a: 'A alíquota marginal é a alíquota sobre o próximo dólar de renda tributável, e é a faixa mais alta que a renda alcança. A alíquota efetiva é o imposto total dividido por toda a renda, e é menor, porque as faixas mais altas só se aplicam à parte da renda acima delas.',
        },
        {
          q: 'Qual alíquota estadual informar?',
          a: 'A alíquota que se aplica à sua própria faixa no seu estado. A maioria dos estados tributa por faixas, então a alíquota efetiva é menor que a alíquota máxima. O número único é exato em um estado de alíquota única e em um estado sem imposto de renda.',
        },
        {
          q: 'Por que o imposto do Social Security tem teto e o do Medicare não?',
          a: 'O Social Security tem um teto tributável definido todo ano, $184,500 em 2026, e o salário acima dele não é tributado para o Social Security. O Medicare não tem teto, então se aplica a cada dólar do salário.',
        },
        {
          q: 'Posso usar isto para calcular meu imposto na declaração?',
          a: 'Não. Isto calcula o imposto retido de um salário. A declaração de imposto é outro cálculo: inclui outras rendas, deduções, créditos e os pagamentos já feitos, e é entregue uma vez por ano, não a cada período de pagamento.',
        },
      ],
      sources: [
        {
          label: 'IRS — Rev. Proc. 2025-32, ajustes pela inflação para o ano fiscal de 2026',
          url: 'https://www.irs.gov/irb/2025-45_IRB',
        },
        {
          label: 'Social Security Administration — teto salarial e COLA de 2026',
          url: 'https://www.ssa.gov/cola/',
        },
        {
          label: 'Social Security Administration — Publication 15, guia tributário do empregador',
          url: 'https://www.ssa.gov/pubs/EN-05-10035.pdf',
        },
        {
          label: 'IRS — Tax Topic 401, salários e ordenados',
          url: 'https://www.irs.gov/taxtopics/tc401',
        },
        {
          label: 'Social Security Administration — POMS RS 01402.038, planos de saúde com benefício fiscal',
          url: 'https://secure.ssa.gov/poms.nsf/lnx/0301402038',
        },
        {
          label: 'IRS — Tax Topic 511, retenção na fonte',
          url: 'https://www.irs.gov/taxtopics/tc511',
        },
      ],
      relatedGuides: [
        {
          slug: 'net-pay-calculator-explained',
          title: 'Como o salário líquido é calculado',
        },
      ],
    },

    'income-tax': {
      name: 'Calculadora de imposto de renda federal',
      title: 'Calculadora de imposto de renda federal para o ano fiscal de 2026',
      description:
        'Calcule o imposto de renda federal de 2026 sobre um ano de rendimentos, com o imposto estadual calculado pelas faixas do próprio estado, a situação de declaração, a dedução e as alíquotas efetiva e marginal lado a lado.',
      short: 'Imposto de renda federal e estadual sobre um ano de rendimentos, com as duas alíquotas.',
      category: 'Salário',
      methodNote:
        'As faixas federais e a dedução padrão são os números de 2026 do Rev. Proc. 2025-32, publicado em 3 de novembro de 2025. O imposto estadual é calculado pelas faixas de 2026, pela dedução padrão, pela isenção pessoal e pelos créditos do estado escolhido, tirados das tabelas da Tax Foundation de 28 de abril de 2026. As tabelas de chefe de família, a dedução do imposto de renda federal e os créditos estaduais vêm dos formulários dos próprios estados. Os impostos sobre a folha descontados de um salário não fazem parte deste cálculo; eles estão na calculadora de salário líquido.',
      script: {
        stateDetected: 'Preenchido com {state}: o estado de onde vem a sua requisição.',
        childrenTotal: 'Total de filhos qualificados: {count}',
      },
      fields: {
        grossIncome: 'Renda bruta do ano',
        filingStatus: 'Situação de declaração',
        itemisedDeduction: 'Dedução detalhada',
        standardDeduction: 'Dedução padrão',
        useStandard: 'Usar a dedução padrão',
        state: 'Estado',
        stateHint: 'para o imposto estadual',
        stateNone: 'Nenhum estado',
        children: 'Filhos qualificados',
        childrenHint: 'pela idade no fim do ano fiscal',
        childBand: 'Filhos de {range} anos',
        stateTaxOverride: 'Seu próprio imposto estadual',
        stateTaxOverrideHint: 'deixe vazio para usar o modelo',
        preTax: 'Descontos antes do imposto',
        preTaxHint: '401(k), HSA, FSA por ano',
        perYear: 'por ano',
      },
      terms: {
        filingStatuses: {
          single: 'Solteiro',
          married: 'Casados, declaração conjunta',
          head: 'Chefe de família',
        },
      },
      result: {
        headlineLabel: 'Imposto de renda federal',
        taxableIncome: 'Renda tributável',
        deductionApplied: 'Dedução aplicada',
        standardDeduction: 'Dedução padrão',
        itemisedDeduction: 'Dedução detalhada',
        federalTax: 'Imposto de renda federal',
        stateTaxableIncome: 'Renda tributável estadual',
        stateCredits: 'Créditos estaduais',
        stateChildCredit: 'Crédito estadual por filho',
        federalTaxDeducted: 'Imposto federal deduzido',
        stateTax: 'Imposto de renda estadual',
        totalTax: 'Imposto total',
        effectiveRate: 'Alíquota efetiva',
        marginalRate: 'Alíquota marginal',
        afterTax: 'Renda após impostos',
        note:
          'A dedução aplicada é a maior das duas: a dedução padrão da situação de declaração ou a dedução detalhada informada à esquerda. O imposto estadual é calculado pelo estado escolhido.',
      },
      resultNote:
        'O número é um imposto devido, não o valor retido de um contracheque. O número federal não inclui os créditos federais nem os pagamentos já feitos durante o ano; o número estadual inclui os créditos estaduais que o modelo contempla.',
      chart: {
        title: 'Com o que a renda fica',
        note: 'Uma barra para o ano, dividida entre a parte que fica com o leitor e a parte que vai para impostos.',
        xAxis: 'none',
        series: [
          { key: 'afterTax', label: 'Renda após impostos' },
          { key: 'federal', label: 'Imposto de renda federal' },
          { key: 'state', label: 'Imposto de renda estadual' },
        ],
      },
      formula:
        'renda tributável = renda bruta − descontos antes do imposto − dedução; imposto = tabela de faixas aplicada à renda tributável; imposto estadual = faixas do estado aplicadas à renda bruta ajustada menos a dedução padrão e a isenção estaduais, menos o imposto de renda federal pago onde o estado permite, menos os créditos estaduais',
      method: [
        'O cálculo começa com a renda bruta do ano e tira os descontos antes do imposto, porque uma contribuição para 401(k) ou para uma conta de saúde não é tributada como renda.',
        'Em seguida vem a dedução. Usa-se a dedução padrão da situação de declaração, a menos que o leitor informe uma dedução detalhada, e vale a maior das duas. A dedução padrão de 2026 é $16,100 para solteiros, $32,200 para casados com declaração conjunta e $24,150 para chefe de família.',
        'O que sobra é a renda tributável, e o imposto é a tabela de faixas de 2026 aplicada a ela. Cada faixa é um valor fixo de imposto mais uma porcentagem da renda acima do piso dessa faixa, como o IRS publica.',
        'As duas alíquotas respondem a perguntas diferentes. A alíquota marginal é a alíquota sobre o próximo dólar de renda tributável, que é a faixa mais alta que a renda alcança. A alíquota efetiva é o imposto total dividido por toda a renda, e é menor porque as faixas mais altas só atingem a parte da renda acima delas.',
        'O imposto estadual é calculado à parte. O estado parte da renda bruta ajustada, tira a própria dedução padrão e a isenção pessoal quando as concede como exclusões, aplica as próprias faixas fatia por fatia e tira os créditos que paga. Os estados que concedem a isenção ou a dedução padrão como crédito a tiram do imposto, que é onde esses créditos são contados.',
        'Usa-se a tabela da situação de declaração. Os estados que publicam uma tabela própria de chefe de família a têm aqui, tirada dos próprios formulários, e os estados que não publicam são calculados pela tabela de solteiro.',
        'Três estados permitem deduzir o imposto de renda federal pago: Alabama, Missouri e Oregon. Onde o estado permite, a dedução sai da renda antes da aplicação das faixas estaduais, com o limite e a proporção que cada estado define.',
        'Os créditos estaduais são calculados pela idade dos filhos, porque é disso que dependem. Nova York paga $1,000 por filho com menos de quatro anos e $500 por filho de quatro a dezesseis, Minnesota paga $1,800 por filho com menos de dezoito, e alguns estados não pagam nada por um filho acima de certa idade.',
      ],
      limits: [
        'Ela não modela os créditos tributários federais. O crédito federal por filho, o crédito federal por renda do trabalho e os créditos de educação reduzem o imposto e não estão no cálculo.',
        'Ela não distingue ganhos de capital de renda comum, então um ano com renda de investimentos é calculado pelas alíquotas comuns.',
        'Ela não modela a dedução para idosos nem qualquer dedução fora dos valores padrão e detalhado informados à esquerda.',
        'Ela não modela o imposto de trabalho autônomo, que incide sobre o rendimento líquido de um autônomo e tem base e alíquota próprias.',
        'Ela não modela a dedução de impostos estaduais e locais que muitos estados permitem dentro das deduções detalhadas.',
        'Ela não modela alíquotas de ganhos de capital, as sobretaxas que alguns estados cobram de rendas altas nem os impostos de governos municipais e de condados.',
        'Ela não usa a tabela de chefe de família de Vermont, cujas alíquotas de 2026 foram publicadas como preliminares, então um chefe de família em Vermont é calculado pela tabela de solteiro.',
        'Ela não traz todos os créditos estaduais. O crédito estadual por renda do trabalho está presente para os estados que o definem como porcentagem do crédito federal e para os três que o calculam por conta própria, e o crédito por filho está presente para os estados em que ele depende da idade do filho. Os créditos dos outros estados não estão nele.',
      ],
      faq: [
        {
          q: 'Qual dedução se aplica?',
          a: 'A dedução padrão, a menos que as deduções detalhadas somem mais. A calculadora mostra a dedução padrão da situação de declaração e o valor detalhado lado a lado, então a comparação é feita num relance.',
        },
        {
          q: 'Qual é a diferença entre a alíquota efetiva e a marginal?',
          a: 'A alíquota marginal é a alíquota sobre o próximo dólar de renda tributável. A alíquota efetiva é o imposto total dividido por toda a renda, e é menor, porque as faixas acima da primeira só se aplicam à parte da renda acima delas.',
        },
        {
          q: 'Por que o imposto dá um salto em certa renda?',
          a: 'É o limite da faixa. Acima dele, mais um dólar é tributado na alíquota seguinte, então o imposto sobe mais rápido que a renda. A alíquota marginal mostra em que faixa a renda está.',
        },
        {
          q: 'Isto inclui Social Security e Medicare?',
          a: 'Não. São impostos sobre a folha cobrados sobre um salário, com tetos próprios, e são calculados na calculadora de salário líquido.',
        },
        {
          q: 'O que é o número do imposto estadual?',
          a: 'O imposto que o próprio estado cobra, calculado pelas faixas de 2026 desse estado, sua dedução padrão, sua isenção pessoal e seus créditos. O estado é escolhido na lista, e a página o preenche com o estado de onde vem a sua requisição quando a rede consegue descobrir isso. Mude o estado e todo o número muda com ele.',
        },
        {
          q: 'Posso informar meu próprio imposto estadual?',
          a: 'Sim. O campo abaixo do estado aceita um valor e substitui o calculado por ele. Ele vem vazio por padrão e, enquanto estiver vazio, a página mostra o cálculo.',
        },
        {
          q: 'Por que a página pergunta a idade de cada filho?',
          a: 'Porque os créditos estaduais por filho dependem da idade do filho. Nova York paga $1,000 por filho com menos de quatro anos e $500 por filho de quatro a dezesseis, Minnesota paga $1,800 por filho com menos de dezoito, e alguns estados não pagam nada por um filho acima de certa idade. As faixas são as idades em que os estados fazem o corte, e o número de filhos nelas é o que o crédito por renda do trabalho também conta.',
        },
        {
          q: 'Este é o valor que vou dever?',
          a: 'É o imposto antes dos créditos e antes dos pagamentos já feitos durante o ano. A declaração soma os créditos, soma tudo o mais que não foi tributado pela folha e subtrai o que já foi pago.',
        },
      ],
      sources: [
        {
          label: 'IRS — Rev. Proc. 2025-32, ajustes pela inflação para o ano fiscal de 2026',
          url: 'https://www.irs.gov/irb/2025-45_IRB',
        },
        {
          label: 'IRS — Tax Topic 505, retenção na fonte e pagamentos estimados',
          url: 'https://www.irs.gov/taxtopics/tc505',
        },
        {
          label: 'IRS — Tax Topic 611, imposto de renda',
          url: 'https://www.irs.gov/taxtopics/tc611',
        },
        {
          label: 'Tax Foundation — State Individual Income Tax Rates and Brackets, 2026',
          url: 'https://taxfoundation.org/data/all/state/state-income-tax-rates-2026/',
        },
        {
          label: 'Tax Foundation — Facts & Figures 2026, alíquotas estaduais do imposto de renda em 28 de abril de 2026',
          url: 'https://taxfoundation.org/data/all/state/2026-state-tax-data/',
        },
      ],
      relatedGuides: [
        {
          slug: 'income-tax-calculator-explained',
          title: 'Como o imposto de renda federal é calculado',
        },
      ],
    },

    'debt-payoff': {
      name: 'Calculadora de quitação de dívidas',
      title: 'Quitação de dívidas: avalanche e bola de neve',
      description:
        'Compare a quitação de várias dívidas ao mesmo tempo: só os mínimos, a ordem avalanche e a ordem bola de neve, com os meses até ficar sem dívidas e os juros economizados.',
      short: 'Quite várias dívidas ao mesmo tempo e compare a ordem.',
      category: 'Dívidas',
      methodNote:
        'O modelo é uma simulação mês a mês: os juros incidem sobre o saldo no início do mês, toda dívida ainda aberta recebe o próprio pagamento mínimo, e o resto do dinheiro vai para a dívida que o leitor escolheu.',
      fields: {
        debtName: 'Dívida',
        balance: 'Saldo',
        rate: 'Taxa de juros',
        minimum: 'Pagamento mínimo',
        addDebt: 'Adicionar uma dívida',
        removeDebt: 'Remover esta dívida',
        extraPayment: 'Pagamento mensal extra',
        extraPaymentHint: 'além de todos os pagamentos mínimos',
      },
      terms: {
        strategies: {
          minimum: 'Só os mínimos',
          avalanche: 'Avalanche',
          snowball: 'Bola de neve',
        },
        orderHints: {
          avalanche: 'maior taxa de juros primeiro',
          snowball: 'menor saldo primeiro',
        },
      },
      result: {
        headlineLabel: 'Juros economizados',
        interestSaved: 'Juros economizados em relação aos mínimos',
        monthsToFree: 'Meses até ficar sem dívidas',
        totalInterest: 'Juros totais',
        totalPaid: 'Total pago',
        minimumOnly: 'Só os mínimos',
        avalanche: 'Avalanche',
        snowball: 'Bola de neve',
        minimumsNeverCover: 'Nunca quitada',
        minimumsNeverCoverNote:
          'Pelo menos uma destas dívidas acumula mais juros em um mês do que os pagamentos cobrem, então esse saldo cresce em vez de cair. Uma simulação que nunca quita as dívidas não tem cronograma concluído, por isso não informa meses nem juros: esses números descreveriam o fim da simulação, e não as dívidas.',
        note:
          'A avalanche paga primeiro a maior taxa e custa menos em juros. A bola de neve quita primeiro o menor saldo e termina essa dívida mais cedo. A diferença entre as duas é o preço da ordem.',
      },
      resultNote:
        'As três simulações usam as mesmas dívidas e o mesmo pagamento extra. A única coisa que muda é a ordem em que o dinheiro extra é aplicado.',
      chart: {
        title: 'O saldo em cada ordem',
        note: 'Uma simulação que nunca quita as dívidas fica de fora: o saldo dela cresce em vez de cair, e o formato dessa linha descreveria o fim da simulação, e não um cronograma. A linha com o pagamento extra chega a zero.',
        xAxis: 'years',
        series: [
          { key: 'avalanche', label: 'Avalanche' },
          { key: 'snowball', label: 'Bola de neve' },
          { key: 'minimumOnly', label: 'Só os mínimos' },
        ],
      },
      formula:
        'juros do mês = saldo no início do mês × taxa anual ÷ 12; toda dívida aberta recebe o próprio pagamento mínimo, primeiro juros e depois principal; o resto do dinheiro vai para a dívida que a ordem indica',
      method: [
        'O cálculo é uma simulação mês a mês. No início de cada mês, os juros incidem sobre o saldo e são somados a ele. O dinheiro disponível naquele mês é a soma de todos os pagamentos mínimos mais o pagamento extra informado à esquerda. Toda dívida que ainda tem saldo recebe o próprio pagamento mínimo, e esse pagamento cobre primeiro os juros e depois o principal.',
        'Uma dívida quitada deixa de receber pagamento mínimo, e esse mínimo se junta ao dinheiro que vai para a próxima dívida. Esse é o mecanismo por trás da diferença entre as ordens: o mesmo valor mensal, gasto em outra dívida, encerra saldos diferentes mais cedo.',
        'A ordem avalanche manda o dinheiro extra primeiro para a maior taxa de juros. Ela custa menos em juros, porque os juros que interrompe são o dinheiro mais caro que o leitor está pagando.',
        'A ordem bola de neve manda o dinheiro extra primeiro para o menor saldo. Ela custa mais em juros no total e quita uma conta mais cedo, o que é outro tipo de resultado. A calculadora mostra as duas, e os juros economizados em cada caso, para que possam ser comparadas com os mesmos números.',
      ],
      limits: [
        'Ela não modela taxas variáveis. Um cartão de crédito com taxa variável muda os juros conforme o índice se move, e o cronograma aqui supõe que a taxa fica onde foi digitada.',
        'Ela não modela tarifas: multas por atraso, tarifas de transferência de saldo e anuidades de cartão não estão no total.',
        'Ela cobra juros mensalmente. Um cartão de crédito que capitaliza diariamente cobra um pouco mais ao longo do ano, e o valor real de um saldo de cartão costuma ser ligeiramente maior que este.',
        'Ela não modela o tratamento tributário dos juros, que em algumas dívidas podem ser deduzidos e em outras não.',
        'Ela não modela mudanças nos pagamentos mínimos, que os credores às vezes reduzem em caso de dificuldade e às vezes aumentam conforme o saldo cai.',
      ],
      faq: [
        {
          q: 'Qual é a diferença entre a avalanche e a bola de neve?',
          a: 'Só a ordem. A avalanche manda o dinheiro extra primeiro para a maior taxa de juros, a bola de neve para o menor saldo. As dívidas, os mínimos e o pagamento extra são os mesmos nas duas simulações.',
        },
        {
          q: 'Qual delas economiza mais dinheiro?',
          a: 'A avalanche, em juros. O dinheiro extra interrompe primeiro a dívida mais cara, então menos juros se acumulam ao longo da vida das dívidas. A calculadora mostra a diferença nos juros economizados em cada ordem.',
        },
        {
          q: 'Por que a bola de neve existe se custa mais?',
          a: 'Ela quita primeiro o menor saldo, então um saldo chega a zero mais cedo. É um resultado diferente daquele que os juros medem, e a calculadora mostra os dois para que possam ser comparados com os mesmos números.',
        },
        {
          q: 'Como os juros são calculados?',
          a: 'Sobre o saldo no início de cada mês, pela taxa anual dividida por doze, e são somados ao saldo. Os pagamentos vão primeiro para esses juros e depois para o principal.',
        },
        {
          q: 'O que acontece com o pagamento mínimo de uma dívida quitada?',
          a: 'Ele é somado ao dinheiro que vai para a próxima dívida, então o valor mensal destinado às dívidas nunca diminui. É isso que torna os prazos de quitação mais curtos do que a soma dos cronogramas separados.',
        },
        {
          q: 'Isto considera um cartão de crédito que capitaliza diariamente?',
          a: 'Não. O modelo cobra juros uma vez por mês. Um cartão que capitaliza todo dia cobra um pouco mais ao longo de um ano, então o valor real de um saldo de cartão costuma ser um pouco maior que o daqui.',
        },
      ],
      sources: [
        {
          label: 'CFPB — Ask CFPB, perguntas e respostas para consumidores',
          url: 'https://www.consumerfinance.gov/ask-cfpb/',
        },
        {
          label: 'CFPB — ferramentas e orientações sobre cartões de crédito',
          url: 'https://www.consumerfinance.gov/consumer-tools/credit-cards/',
        },
      ],
      relatedGuides: [
        {
          slug: 'debt-payoff-calculator-explained',
          title: 'Como funciona a quitação de várias dívidas',
        },
      ],
    },
  },
};
