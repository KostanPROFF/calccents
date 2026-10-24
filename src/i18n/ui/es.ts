export const es = {
  /** El nombre de este idioma, en este idioma. */
  localeName: 'Español',

  /** Descripción breve del sitio, usada en datos estructurados y etiquetas meta. */
  tagline: 'Calculadoras financieras que muestran sus cuentas',
  description:
    'Calculadoras financieras gratuitas para el pago de hipotecas, para comparar alquiler y compra y para el interés compuesto. Se muestra cada fórmula, cada supuesto te corresponde a ti, y ninguna página te dice qué hacer con el resultado.',

  author: {
    role: 'Autor',
    bio: 'Trabaja en infraestructura de TI —nubes, CI/CD, infraestructura como código—, donde un cambio que no se puede verificar no llega a producción. Mantener las nubes en orden y los pipelines de entrega rápidos es el trabajo del día a día; el mismo criterio recorre todo este sitio. La aritmética vive en un solo sitio, las fórmulas están cubiertas por pruebas unitarias que las contrastan con cifras de préstamos publicadas, y toda cifra externa lleva su fuente y la fecha en que se consultó. Escribe las guías y mantiene el motor de cálculo. Otra persona lee la parte financiera de cada guía antes de publicarla. Aquí no se le dice al lector qué hacer.',
  },

  reviewer: {
    role: 'Revisora financiera',
    bio: 'Lee la parte financiera de una guía antes de publicarla: las cifras, las suposiciones que hay detrás y las fuentes de donde salen. El autor construye el motor de cálculo; la revisora mira el resultado desde el otro lado, el lado de alguien que trata con dinero y no con código. Su nombre aparece solo en las guías que revisó.',
  },

  consent: {
    heading: 'Cookies',
    body: 'Este sitio usa cookies para servir publicidad y para contar qué páginas se leen. Puedes aceptarlas o rechazarlas, y puedes cambiar tu decisión más tarde desde el pie de página. Qué se recoge y quién lo proporciona está en la {privacyLink}.',
    privacyLink: 'página de privacidad',
    accept: 'Aceptar',
    reject: 'Rechazar',
    settings: 'Configuración de cookies',
  },

  nav: {
    tools: 'Herramientas',
    guides: 'Guías',
    sources: 'Fuentes',
    about: 'Acerca de',
  },

  footer: {
    taglineNote: 'Cada fórmula está escrita, cada supuesto te corresponde a ti.',
    calculatorsHeading: 'Calculadoras',
    siteHeading: 'Sitio',
    calculators: {
      'mortgage-payment': 'Pago de hipoteca',
      'rent-vs-buy': 'Alquiler o compra',
      'compound-interest': 'Interés compuesto',
      'net-pay': 'Salario neto',
      'income-tax': 'Impuesto federal sobre la renta',
      'debt-payoff': 'Amortización de deudas',
    },
    links: {
      guides: 'Guías',
      sources: 'Fuentes',
      'editorial-team': 'Equipo editorial',
      about: 'Acerca de',
      contact: 'Contacto',
      privacy: 'Privacidad',
      terms: 'Términos',
    },
    cookieSettings: 'Configuración de cookies',
    note:
      '{name} publica cálculos y explicaciones, no asesoramiento financiero. Las herramientas muestran la aritmética que hay detrás de una cifra y los supuestos que hay detrás de la aritmética. No evalúan tu situación ni recomiendan una vía de acción. Toda cifra que produce una herramienta depende de los datos que introduces: lee los supuestos antes de basarte en algún resultado. © {founded}–{year} {name}.',
  },

  /** Cadenas que aparecen en más de una página. */
  ui: {
    skipToContent: 'Ir al contenido',
    home: 'Inicio',
    breadcrumb: 'Ruta de navegación',
    primaryNav: 'Principal',
    lastChecked: 'Última comprobación',
    by: 'Por',
    whereNumbersComeFrom: 'De dónde salen los números',
    minRead: '{n} min de lectura',
    guidesCount: (n: number) => `${n} ${n === 1 ? 'guía' : 'guías'}`,
    calculate: 'Calcular →',
    open: 'Abrir →',
    allGuides: 'Todas las guías →',
    readTheGuide: 'Leer la guía',
    guidesThatGoDeeper: 'Guías que profundizan',
    commonQuestions: 'Preguntas frecuentes',
    howThisIsCalculated: 'Cómo se calcula esto',
    whatThisCalculatorDoesNotDo: 'Qué no hace esta calculadora',
    sources: 'Fuentes',
    sourcesNote: 'Estas son las fuentes primarias detrás de las cifras y el método de esta guía.',
    calculatorsBehindThisGuide: 'Calculadoras detrás de esta guía',
    published: 'Publicado',
    lastReviewed: 'Última revisión',
    reviewedBy: 'Revisado por',
    language: 'Idioma',
    switchTheme: 'Cambiar el tema',
    switchToLight: 'Cambiar al tema claro',
    switchToDark: 'Cambiar al tema oscuro',
  },

  newsletter: {
    emailAddress: 'Correo electrónico',
    placeholder: 'you@example.com',
    subscribe: 'Suscribirse',
  },

  home: {
    title: 'Calccents — Calculadoras financieras que muestran sus cuentas',
    description:
      'Calculadoras financieras gratuitas para el pago de hipotecas, comparar alquiler y compra, el interés compuesto, el salario neto, el impuesto federal y la amortización de deudas. Se muestra cada fórmula.',
    eyebrow: 'Calculadoras financieras',
    heading: 'Conoce la cifra antes de decidir',
    lede: 'Herramientas gratuitas para la aritmética de una hipoteca, un alquiler, un salario neto y un montón de ahorros. Cada fórmula está escrita, cada supuesto te corresponde a ti, y ninguna página te dice qué hacer con el resultado.',
    cta: 'Ver las calculadoras',
    calculatorsEyebrow: 'Las calculadoras',
    calculatorsHeading: 'Seis preguntas, seis conjuntos de cifras',
    workHeading: 'Cada cifra muestra sus cuentas',
    workPoints: [
      'La fórmula está junto a la respuesta, en lenguaje claro y en símbolos.',
      'Cada número que viene de algún sitio lleva su fuente y su fecha.',
      'Cada herramienta dice lo que no hace, con las mismas palabras, justo debajo del resultado.',
    ],
    workLink: 'Cómo está construido el sitio →',
    sampleMonthlyPayment: 'Pago mensual',
    samplePrincipalAndInterest: 'Capital e intereses',
    samplePropertyTax: 'Impuesto sobre la propiedad',
    sampleTotalInterest: 'Intereses totales',
    guidesEyebrow: 'Guías',
    guidesHeading: 'La aritmética, escrita',
    newsletterHeading: 'Recibe los cálculos en tu correo',
    newsletterLede:
      'Una carta corta cuando sale una calculadora nueva o cuando se revisa una existente. Sin ofertas ni espacios patrocinados.',
  },

  illustration: {
    mortgagePayment:
      'Un saldo de hipoteca que baja con el tiempo, con los intereses pagados al lado',
    rentVsBuy:
      'Dos líneas que se cruzan: el coste de alquilar frente al coste de ser propietario',
    compoundInterest:
      'Un saldo que sube cada vez más rápido a medida que se capitalizan los intereses',
    netPay:
      'Una barra de salario bruto partida entre el salario neto y las deducciones que se le restan',
    incomeTax:
      'Una pila de tramos fiscales, cada uno más ancho que el de arriba',
    debtPayoff:
      'Dos juegos de barras, uno por cada orden en el que se pueden saldar las deudas',
  },

  heroVisual: {
    label: 'Pago mensual',
    caption: 'Un ejemplo resuelto, dibujado tal como lo dibuja la calculadora.',
  },

  chart: {
    months: 'Meses',
    years: 'Años',
    start: 'Ahora',
    end: 'Fin',
    empty: 'El gráfico se rellena en cuanto hay una cifra que dibujar.',
  },

  toolsIndex: {
    title: 'Calculadoras financieras gratuitas',
    description:
      'Tres calculadoras gratuitas que muestran la aritmética que hay detrás del pago de una hipoteca, de la comparación entre alquiler y compra y de la proyección del interés compuesto.',
    heading: 'Calculadoras financieras gratuitas',
    lede: 'Cada calculadora muestra la fórmula que usa, enumera los supuestos que hay detrás del resultado y dice con claridad lo que no hace. Nada de esto pide una dirección de correo ni te pide que te suscribas a nada.',
    whatTheseAre: 'Qué son estas herramientas',
    whatTheseAreBody: [
      'Son herramientas aritméticas. Toman los números que introduces, aplican una fórmula publicada y devuelven el resultado con la cuenta adjunta. Una calculadora de hipotecas de este sitio no conoce tu historial crediticio, tus ingresos ni qué entidad ofrece qué esta semana, y no lo adivina.',
      'La razón es sencilla: una cifra que puedes comprobar vale más que una cifra que eligió otra persona por ti. Cada herramienta de aquí muestra la fórmula en símbolos, enlaza con las fuentes primarias que hay detrás del método e incluye una fecha de revisión para que veas cuándo se comprobó por última vez.',
    ],
  },

  guidesIndex: {
    title: 'Guías',
    description:
      'Quince explicaciones de la aritmética que hay detrás de las hipotecas, del alquiler frente a la compra y del interés compuesto, cada una con su fórmula, sus supuestos y sus fuentes.',
    heading: 'Guías',
    lede: 'Explicaciones a fondo de la aritmética y de los supuestos que hay detrás de las calculadoras. Cada guía muestra la fórmula, enlaza con las fuentes primarias e incluye una fecha de revisión.',
    missingHeading: '¿Falta algo?',
    missingBody:
      'Las guías se escriben en torno a la aritmética que a los lectores les cuesta más seguir. Si aquí no se cubre un concepto financiero, dinos cuál es y qué parte te resulta confusa.',
    suggestTopic: 'Sugerir un tema',
    groups: {
      home: 'Vivienda e hipotecas',
      renting: 'Alquiler y propiedad',
      investing: 'Inversión',
    },
  },

  guide: {
    sourcesTitle: 'Fuentes',
    sourcesNote: 'Estas son las fuentes primarias detrás de las cifras y el método de esta guía.',
  },

  about: {
    title: 'Acerca de',
    description:
      'Qué es este sitio, cómo está construido y las reglas que sigue para que cada cifra de aquí pueda comprobarse.',
    heading: 'Acerca de {name}',
    lede: '{name} publica calculadoras financieras y las explicaciones que hay detrás de ellas. Es un sitio pequeño con un propósito concreto: producir una cifra que puedas comprobar y mostrarte la cuenta que la produjo.',
    isHeading: 'Qué es este sitio',
    isBody: [
      'Tres calculadoras, quince guías y las fuentes primarias de ambas. Las calculadoras toman los números que introduces y aplican una fórmula publicada: la fórmula de amortización de una hipoteca, una comparación de efectivo mes a mes entre alquiler y compra y la fórmula del interés compuesto para un saldo de ahorro.',
      'El sitio se financia con publicidad gráfica. Eso condiciona cómo está construido. Las páginas cargan rápido y llevan poco JavaScript, porque una página que carga rápido retiene al lector el tiempo suficiente para ver la publicidad, y porque una página que carga rápido es a la que la gente vuelve. Ninguna calculadora pide una dirección de correo, y ningún resultado está bloqueado.',
    ],
    isNotHeading: 'Qué no es este sitio',
    isNotBody: [
      'No es una corretora, no acepta solicitudes y no cobra comisión a nadie por hacer clic en nada. No hay espacios patrocinados, ni enlaces de afiliado, ni formularios de captación. La publicidad es publicidad gráfica y nada más, lo que significa que lo único que paga la visita de un lector es su atención.',
      'Ninguna herramienta de aquí evalúa tus circunstancias. Una calculadora de hipotecas que devolviera «aporta el 20 %» estaría equivocada la mayoría de las veces, porque la respuesta correcta depende de cosas que la página no puede ver: tus otros ahorros, tu trabajo, tu tolerancia a un mal mes. Así que cada herramienta calcula y ahí se detiene.',
    ],
    rulesHeading: 'Las reglas que sigue el sitio',
    rules: [
      {
        label: 'Cada herramienta declara sus límites.',
        body: 'Bajo cada resultado hay un bloque que enumera lo que la herramienta no hace, con las mismas palabras en todas las páginas.',
      },
      {
        label: 'Cada cifra que viene de algún sitio tiene una fuente.',
        body: 'Las guías enlazan con la fuente primaria e incluyen la fecha en que se leyó el dato. La aritmética del propio sitio se muestra completa.',
      },
      {
        label: 'Cada página incluye una fecha de revisión.',
        body: 'Una guía que lleva mucho sin revisarse lo dice.',
      },
      {
        label: 'Borradores de IA, revisión humana.',
        body: 'Las herramientas de redacción ayudan con las palabras. Cada página publicada la ha leído una persona que ha comprobado la aritmética, las unidades y las afirmaciones.',
      },
    ],
    whoHeading: 'Quién lo lleva',
    whoBody:
      '{name}. {bio} {reviewerName} lee la parte financiera de las guías antes de publicarlas. La página editorial expone lo que comprueba la revisión antes de publicar una página, y el código es público: las fórmulas, las pruebas unitarias y las comprobaciones que bloquean una publicación con una página rota.',
    whoEditorialLink: 'página editorial',
    whoCodeLink: 'el código es público',
    howHeading: 'Cómo funcionan las calculadoras',
    howBody:
      'La aritmética se ejecuta en tu navegador. No hay ningún servidor que reciba los números que escribes, y nada de un cálculo se envía a nadie. Las fórmulas se implementan una sola vez, en un solo sitio, y están cubiertas por pruebas unitarias que las contrastan con cifras de préstamos publicadas y conocidas y con los invariantes que exige la matemática: que un cuadro de amortización sume la cantidad prestada, que un préstamo cierre exactamente en cero, que un saldo sin intereses crezca solo con los depósitos.',
    correctionsHeading: 'Correcciones',
    correctionsBody:
      'Si una cifra está mal, un enlace de fuente está roto o una página se contradice, eso es un defecto y el sitio lo corrige. La página de contacto explica cómo comunicarlo, y cada corrección se traduce en una fecha de revisión nueva y no en una edición silenciosa.',
    contactLink: 'página de contacto',
  },

  contact: {
    title: 'Contacto',
    emailLine: 'Correo {email}.',
    description:
      'Cómo ponerse en contacto con el sitio por una cifra incorrecta, un enlace roto, un tema que falta o un problema con la publicidad.',
    heading: 'Contacto',
    lede: 'Una sola dirección, leída por una persona. Las respuestas tardan unos días, normalmente más durante las primeras semanas tras la publicación de una página.',
    worthHeading: 'Motivos para escribir',
    worth: [
      {
        label: 'Una cifra incorrecta.',
        body: 'Si una cifra de una página no coincide con tu propio cálculo, envía los datos que usaste y la cifra que obtuviste. Eso es un defecto y se revisará.',
      },
      {
        label: 'Un enlace de fuente roto o muerto.',
        body: 'Las fuentes se comprueban con periodicidad, pero un enlace puede estropearse entre comprobaciones.',
      },
      {
        label: 'Un tema que falta.',
        body: 'Las guías se escriben en torno a la aritmética más difícil, así que un hueco suele ser un hueco en esa aritmética.',
      },
      {
        label: 'Un problema con la publicidad.',
        body: 'Un anuncio que engaña, rompe la página o tapa contenido merece ser comunicado. El sitio se financia con publicidad gráfica, así que este tipo de aviso se toma en serio.',
      },
    ],
    nextHeading: 'Qué pasa después',
    nextBody:
      'Una cifra comunicada se contrasta con la fuente, y la página cambia si la cifra estaba mal. La fecha de revisión de la página se mueve cuando se comprueba el contenido, haya cambiado algo o no, de modo que la fecha indica cuándo leyó la página una persona por última vez.',
  },

  sourcesPage: {
    title: 'Fuentes',
    description:
      'Todas las fuentes primarias en las que se apoya este sitio para sus cifras y sus métodos, y el motivo de que cada una esté aquí.',
    heading: 'Fuentes',
    lede: 'Cada cifra de este sitio procede de una de las organizaciones siguientes o de una aritmética que el sitio muestra completa. No se cita nada de una entrada de blog, de un resumen o de una reformulación secundaria.',
    whyHeading: 'Por qué existe una lista de fuentes',
    whyBody: [
      'Una cifra sin fuente es una afirmación. Estas páginas están escritas para quienes quieren comprobar la aritmética por su cuenta, y eso solo funciona si los datos originales están a un clic. Por eso cada guía lleva su propia lista de fuentes, y esta página es el índice de todas ellas.',
      'La regla que sigue el sitio es estrecha a propósito: organismos públicos, el regulador de valores, el banco central y las empresas de hipotecas patrocinadas por el gobierno (GSE). Cuando una cifra procede de una encuesta comercial, la página lo dice y nombra la encuesta.',
    ],
    howHeading: 'Cómo se usan las fuentes',
    how: [
      {
        label: 'Métodos y fórmulas',
        body: 'provienen del organismo que publica el método. La fórmula de amortización está expuesta en la guía propia del CFPB; las reglas de frecuencia de capitalización proceden del glosario de la SEC; los umbrales fiscales proceden del ajuste anual por inflación del IRS.',
      },
      {
        label: 'Estadísticas publicadas',
        body: 'provienen del organismo estadístico que las elaboró, junto con la fecha en que se leyó la cifra.',
      },
      {
        label: 'Tipos de mercado',
        body: 'provienen de la encuesta que los publica, y la página lleva su fecha, porque un tipo de otro mes es otra cifra.',
      },
    ],
    sources: [
      {
        label: 'Consumer Financial Protection Bureau (CFPB) — hipotecas, crédito al consumo',
        url: 'https://www.consumerfinance.gov/',
      },
      {
        label: 'Internal Revenue Service (IRS) — brackets fiscales, ajustes por inflación, reglas de jubilación',
        url: 'https://www.irs.gov/',
      },
      {
        label: 'Social Security Administration (SSA) — tipos de las cargas sociales, base imponible, límite anual',
        url: 'https://www.ssa.gov/',
      },
      {
        label: 'Freddie Mac — Encuesta sobre el mercado hipotecario primario',
        url: 'https://www.freddiemac.com/pmms',
      },
      {
        label: 'Fannie Mae — investigación y comentarios de mercado',
        url: 'https://www.fanniemae.com/research-and-insights',
      },
      {
        label: 'Department of Housing and Urban Development (HUD) — FHA, HECM, vivienda justa',
        url: 'https://www.hud.gov/',
      },
      {
        label: 'Bureau of Labor Statistics (BLS) — Índice de precios al consumidor',
        url: 'https://www.bls.gov/cpi/',
      },
      {
        label: 'Federal Reserve Board — datos de tipos de interés (H.15)',
        url: 'https://www.federalreserve.gov/releases/h15/',
      },
      {
        label: 'Securities and Exchange Commission (SEC) — Investor.gov',
        url: 'https://www.investor.gov/',
      },
      {
        label: 'Federal Reserve Bank of St. Louis (FRED) — series de datos económicos',
        url: 'https://fred.stlouisfed.org/',
      },
      {
        label: 'Bureau of Labor Statistics — calculadora del IPC y tablas de datos',
        url: 'https://www.bls.gov/data/',
      },
    ],
  },

  editorial: {
    title: 'Equipo editorial',
    description:
      'Quién escribe las guías, quién las revisa y qué comprueba realmente la revisión antes de publicar una página.',
    heading: 'Equipo editorial',
    lede: 'Una persona escribe las guías. Otra lee la parte financiera de cada guía antes de publicarla. Esta página dice quiénes son, qué comprueba la revisión y qué puedes comprobar tú.',
    authorEyebrow: 'Autor',
    reviewerEyebrow: 'Revisora financiera',
    checkEyebrow: 'Lo que puedes comprobar',
    checkHeading: 'La aritmética es pública',
    checkBody:
      'El código que hay detrás de cada calculadora está en un repositorio público, con las fórmulas que implementa, las pruebas unitarias que las contrastan con cifras publicadas conocidas y las comprobaciones que bloquean una publicación con una página rota. No hace falta que te fíes de los números, ni que tengas que pedir nada.',
    openRepository: 'Abrir el repositorio',
    twoNamesHeading: 'Dos nombres, dos funciones',
    twoNamesBody: [
      'Un nombre escribe las guías y mantiene el motor de cálculo. Otro lee la parte financiera de una guía antes de publicarla: las cifras, las suposiciones que hay detrás y las fuentes de donde salen. Las dos funciones están separadas a propósito: quien escribe una guía no es quien le hace la última lectura.',
      'Cuando una guía nombra a quien la revisó, esa es la persona que la revisó, y el nombre aparece en esa guía y en ninguna otra. Una revisión es una afirmación sobre una página concreta, así que se aplica a la página y no al sitio entero.',
      'Todo lo demás en esta página describe qué comprueba la revisión y qué puede verificar un lector sin preguntar a nadie.',
    ],
    reviewHeading: 'Qué comprueba la revisión',
    reviewIntro:
      'Antes de publicar una guía, quien revisa recorre la misma lista cada vez:',
    review: [
      {
        label: 'La aritmética.',
        body: 'Cada fórmula se contrasta con la fuente de la que procede, y el ejemplo resuelto del texto se recalcula desde cero. Cuando una cifra aparece también en el código, se comparan las dos.',
      },
      {
        label: 'Las unidades.',
        body: 'Porcentajes contra decimales, meses contra años, dólares contra miles. La mayoría de los errores en un documento financiero son errores de unidad.',
      },
      {
        label: 'Los casos límite.',
        body: 'Un tipo cero, un plazo cero, un valor negativo. Cada uno se comprueba para que produzca una respuesta razonable y no un mensaje de error.',
      },
      {
        label: 'La redacción.',
        body: 'La página no puede decirle al lector qué hacer. Explica qué significa una cifra y de qué depende, y ahí se detiene. Una guía que recomienda una acción se reescribe.',
      },
      {
        label: 'Las fuentes.',
        body: 'Cada enlace se abre, se comprueba con la afirmación que acompaña y se fecha.',
      },
    ],
    toolsHeading: 'Cómo se usan las herramientas de redacción',
    toolsBody: [
      'Las herramientas de redacción ayudan con la prosa. No deciden lo que dice una página. Cada cifra, cada fórmula y cada afirmación las escribe o las comprueba una persona, y ninguna página se publica sin la revisión de arriba. Una herramienta que haya producido una cifra verosímil es justo el tipo de cosa que este proceso existe para detectar.',
      'La comprobación que lo detecta no es solo humana. El motor de cálculo tiene pruebas unitarias que se ejecutan en cada cambio y bloquean una publicación si una cifra se mueve: el cuadro tiene que sumar la cantidad prestada, el préstamo tiene que cerrar exactamente en cero, y la proyección periodo a periodo tiene que coincidir con la fórmula cerrada en cada frecuencia de capitalización. Un párrafo de prosa no puede fallar así. Una fórmula sí, y cuando lo hace, la compilación se detiene.',
    ],
    datesHeading: 'Fechas de revisión',
    datesBody:
      'Cada guía lleva la fecha de su última revisión. Una guía cuyo contenido depende de datos externos se revisa al menos dos veces al año; una guía que explica aritmética se revisa cuando cambia la fórmula que hay detrás y, en cualquier caso, una vez al año. Cuando se revisa una página, la fecha se mueve, haya cambiado el texto o no, de modo que la fecha indica cuándo leyó la página una persona por última vez.',
    correctionsHeading: 'Correcciones',
    correctionsBody:
      'Las correcciones se hacen a la vista. Una página corregida mantiene su fecha de revisión actualizada y la corrección se describe en el hilo de contacto del que salió. Una guía con una cifra equivocada es un defecto de la revisión, no de la redacción, y lo que cambia es el proceso de revisión.',
    contactLink: 'contacto',
  },

  privacy: {
    title: 'Privacidad',
    description:
      'Qué recoge este sitio, qué no recoge y qué proveedores de publicidad y analítica aparecen en las páginas.',
    heading: 'Privacidad',
    lede: 'La versión corta: los números que escribes en una calculadora se quedan en tu navegador, y el sitio no guarda por su cuenta ninguna cookie de seguimiento.',
    calculatorsHeading: 'Qué hacen las calculadoras con los datos que introduces',
    calculatorsBody:
      'Nada. La aritmética se ejecuta en tu navegador con JavaScript que se descarga junto con la página. Los valores que introduces no se transmiten a ninguna parte, no se almacenan y no son visibles ni para el sitio ni para nadie más. Al cerrar la pestaña se descartan.',
    cookiesHeading: 'Cookies',
    cookiesBody:
      '{name} no instala cookies propias. La analítica del sitio funciona con Google Analytics 4, que Google sirve desde sus propios dominios y que guarda en tu navegador un identificador de primera parte para distinguir una visita de otra. Ese identificador no se usa para publicidad ni se comparte con otros sitios.',
    advertisingHeading: 'Publicidad',
    advertisingBody:
      'El sitio se financia con publicidad gráfica servida por Google AdSense. Google y sus socios pueden instalar cookies o usar tecnologías similares para servir y medir la publicidad, y pueden usarlas para mostrar anuncios según tus visitas anteriores a este u otros sitios web. Puedes revisar y cambiar tus preferencias en {adsSettingsLink}, y la explicación de Google sobre cómo usa los datos de los sitios y las aplicaciones que usan sus servicios está en {policiesLink}.',
    adsSettingsLink: 'Google Ads Settings',
    policiesLink: 'policies.google.com',
    analyticsPoliciesLink: 'policies.google.com',
    analyticsHeading: 'Analítica',
    analyticsBody:
      'Las vistas de página se registran con Google Analytics 4, que Google sirve desde googletagmanager.com. Los datos usados se limitan a la página, la fuente de referencia y una ubicación aproximada a nivel de país o ciudad; la dirección IP se trunca en lugar de guardarse entera. Sirven para contar visitas y para saber qué páginas se leen. La explicación de Google sobre cómo usa los datos de los sitios y las aplicaciones que usan sus servicios está en {analyticsPoliciesLink}.',
    newsletterHeading: 'Boletín',
    newsletterBody:
      'Si te suscribes al boletín, la dirección que introduces la almacena el proveedor de correo para poder enviar el boletín. Esa dirección se usa para el boletín y para nada más, y cada número incluye un enlace para cancelar la suscripción.',
    thirdPartyHeading: 'Enlaces de terceros',
    thirdPartyBody:
      'Las guías enlazan con fuentes primarias: organismos públicos, la SEC, la Reserva Federal. Esos sitios tienen sus propias políticas de privacidad, que este sitio no controla ni ha leído en tu nombre.',
    changesHeading: 'Cambios',
    changesBody:
      'Si los proveedores de arriba cambian, esta página cambia con ellos. La fecha al pie de la página es la fecha en que se revisó este texto por última vez.',
    consentHeading: 'Tu elección',
    consentBody:
      'No se carga nada de Google hasta que respondes. Si aceptas, se cargan los scripts de publicidad y de analítica y la respuesta queda guardada en tu navegador; si rechazas, el sitio funciona exactamente igual y no se carga nada. El enlace {settingsLink} del pie de página vuelve a abrir la pregunta. Una excepción: el propio rastreador de Google, que comprueba si el sitio lleva publicidad, recibe el script de publicidad directamente, porque no puede responder la pregunta. No se registra ninguna elección para él y no se guarda nada sobre él.',
    lastReviewed: 'Última revisión: {date}.',
  },

  terms: {
    title: 'Términos',
    description:
      'Los términos en los que se publica este sitio, qué cubren y qué no cubren sus calculadoras, y los límites de lo que puede prometer.',
    heading: 'Términos de uso',
    lede: 'Términos claros para un sitio que publica cálculos en lugar de recomendaciones.',
    providesHeading: 'Qué ofrece este sitio',
    providesBody:
      '{name} publica calculadoras y explicaciones escritas de la aritmética que hay detrás. Las calculadoras aplican fórmulas publicadas a los valores que introduces y devuelven el resultado junto con la cuenta. Ese es todo el servicio.',
    notProvidesHeading: 'Qué no ofrece este sitio',
    notProvidesBody: [
      'Nada de lo que hay aquí es asesoramiento financiero, fiscal, legal o de inversión, y nada de lo que hay aquí es una recomendación de comprar, vender, mantener, alquilar, ser propietario, refinanciar o firmar nada. Un resultado refleja los datos que introdujiste y la fórmula de la página. Cambia un dato y el resultado cambia; eso es lo que lo convierte en un cálculo y no en una conclusión.',
      'Una calculadora no puede ver tus finanzas, tus ingresos, tu crédito, tu horizonte temporal ni tu tolerancia al riesgo, y no intenta adivinarlos. Dos personas con los mismos datos y circunstancias distintas llegarán a conclusiones distintas, y la calculadora no está en condiciones de decir cuál de ellas es la correcta.',
    ],
    figuresHeading: 'Cifras, fuentes y fechas',
    figuresBody:
      'Cuando una cifra procede de una fuente externa, la página enlaza con esa fuente e indica la fecha en que se leyó. Los datos externos cambian: los umbrales fiscales, los tipos publicados y las estadísticas oficiales se revisan. Una cifra en una página es exacta en la fecha de revisión de esa página y deja de serlo después, y la fecha de revisión está ahí para que veas su antigüedad.',
    errorsHeading: 'Errores',
    errorsBody:
      'Los cálculos se implementan una sola vez, en un solo sitio, y se prueban. Aun así, es posible que haya un error. Si encuentras uno, la página de contacto explica cómo comunicarlo, y los defectos comunicados se corrigen y se actualiza la fecha de revisión.',
    advertisingHeading: 'Publicidad',
    advertisingBody:
      'El sitio se financia con publicidad gráfica. Los anuncios los sirve un tercero y no están bajo el control del sitio. Los anuncios se etiquetan y se separan del contenido propio del sitio. Ningún anunciante paga por una página, por una ubicación, por una posición en un resultado de búsqueda ni por una mención de un producto en una guía.',
    useHeading: 'Uso del sitio',
    useBody:
      'El sitio se publica para uso personal. Puedes leerlo, imprimirlo y enlazarlo. No puedes republicar partes sustanciales de las guías como trabajo propio, ni usar las calculadoras para crear un producto que compita con el sitio.',
    changesHeading: 'Cambios',
    changesBody:
      'Estos términos pueden cambiar a medida que cambia el sitio. La fecha de revisión que figura abajo es la fecha en que se leyó este texto por última vez.',
    lastReviewed: 'Última revisión: {date}.',
    contactLink: 'página de contacto',
  },

  notFound: {
    title: 'Página no encontrada',
    description: 'Esa página no existe en este sitio. Esto es donde vive realmente todo.',
    heading: 'Página no encontrada',
    lede: 'Esa URL no existe aquí. Todo lo que publica el sitio es una de las tres calculadoras, las guías que hay detrás o las páginas que explican de dónde salen los números.',
    calculators: {
      title: 'Calculadoras',
      text: 'Pago de hipoteca, alquiler frente a compra, interés compuesto.',
    },
    guides: {
      title: 'Guías',
      text: 'La aritmética de cada calculadora, en detalle.',
    },
    sources: {
      title: 'Fuentes',
      text: 'Todas las fuentes primarias en las que se apoya el sitio.',
    },
    contact: {
      title: 'Contacto',
      text: 'Dinos qué falta o qué está mal.',
    },
  },

  /**
   * Las tres calculadoras.
   *
   * La clave `tools` de `src/config/tools.ts` guarda las partes que no
   * cambian (el slug, la categoría). Todo lo que ve el lector sale de aquí.
   */
  tool: {
    'mortgage-payment': {
      name: 'Calculadora de pago de hipoteca',
      title: 'Calculadora de pago de hipoteca con amortización',
      description:
        'Calcula tu pago mensual de hipoteca, el coste total PITI y el cuadro completo de amortización. Mira cada dólar de intereses y cómo los pagos adicionales adelantan la fecha de cancelación.',
      short: 'Capital e intereses mensuales, PITI completo, cuadro de amortización y el efecto de los pagos adicionales.',
      category: 'Vivienda',
      methodNote:
        'La fórmula del pago, el cuadro de amortización y el modo en que se aplican los pagos adicionales se describen más abajo. Nada de esta página es una cotización de mercado en vivo.',
      fields: {
        homePrice: 'Precio de la vivienda',
        downPayment: 'Entrada',
        percentOfPrice: 'porcentaje del precio',
        interestRate: 'Tipo de interés',
        annualFixed: 'anual, fijo',
        loanTerm: 'Plazo del préstamo',
        propertyTax: 'Impuesto sobre la propiedad',
        percentOfPricePerYear: '% del precio al año',
        homeInsurance: 'Seguro del hogar',
        perYear: 'al año',
        hoaFee: 'Cuota de HOA o del condominio',
        perMonth: 'al mes',
        extraPrincipal: 'Capital adicional',
        firstPayment: 'Primer pago',
        month: 'mes',
        seeAmortization: 'Ver la amortización año a año',
      },
      terms: {
        years: (n: number) => `${n} ${n === 1 ? 'año' : 'años'}`,
      },
      table: {
        year: 'Año',
        principal: 'Capital',
        interest: 'Intereses',
        balance: 'Saldo',
      },
      result: {
        headlineLabel: 'Pago mensual total (PITI)',
        principalAndInterest: 'Capital e intereses',
        propertyTax: 'Impuesto sobre la propiedad',
        insurance: 'Seguro',
        hoa: 'HOA',
        totalInterest: 'Intereses totales',
        paidOff: 'Último pago',
        note: 'Capital, intereses, impuesto sobre la propiedad, seguro y HOA, con los números que introdujiste.',
      },
      resultNote:
        'Cambia cualquier campo y las cifras se actualizan mientras escribes. No se envía nada a ninguna parte: la aritmética se ejecuta en esta página.',
      chart: {
        title: 'El saldo y los intereses, año a año',
        note: 'El saldo baja a medida que se amortiza el préstamo, y los intereses pagados cada año bajan con él.',
        xAxis: 'years',
        series: [
          { key: 'balance', label: 'Saldo' },
          { key: 'interest', label: 'Intereses pagados' },
        ],
      },
      formula: 'M = P · r(1 + r)ⁿ / ((1 + r)ⁿ − 1)',
      method: [
        'El pago mensual programado sale de la fórmula estándar de amortización:',
        'P es la cantidad prestada, que esta página calcula como el precio de la vivienda menos la entrada. r es el tipo anual que introdujiste dividido entre doce, y n es el plazo en meses. A partir de esa cifra la calculadora construye un cuadro mes a mes: los intereses se cobran sobre el saldo pendiente al inicio del mes, y lo que queda del pago después de esos intereses reduce el saldo.',
        'El pago mensual completo es la cifra de capital e intereses más el impuesto sobre la propiedad dividido entre doce, el seguro dividido entre doce y cualquier cuota de HOA. Esos tres los pones tú: la calculadora no sabe cuánto cobra tu comunidad de vecinos ni tu aseguradora, y no lo adivina por ti.',
        'Un pago mensual adicional se aplica al capital, así que reduce el saldo sobre el que se cobran los intereses del mes siguiente. El pago programado no cambia, el préstamo termina antes y los intereses totales bajan.',
      ],
      limits: [
        'No comprueba si cumples los requisitos para un préstamo, ni mira tu historial crediticio, tus ingresos, tu ratio de deuda sobre ingresos ni las reglas de clasificación de ninguna entidad prestamista.',
        'No cotiza los tipos de mercado actuales de tu código postal. El tipo de interés que introduces es el tipo que usas, y nada de esta página está en vivo.',
        'No modela el seguro privado de la hipoteca, los puntos, las comisiones de apertura, los gastos de cierre ni la calendarización de las cuentas en depósito que decide en qué mes cae una factura de impuestos.',
        'No te dice si conviene comprar una vivienda. Produce una cifra y la cuenta que hay detrás.',
      ],
      faq: [
        {
          q: '¿Qué significa PITI?',
          a: 'Capital, Intereses, Impuestos y Seguros. Es el pago mensual de vivienda en cuatro partes: la parte que amortiza el préstamo, la parte que paga al prestamista por prestar, el impuesto sobre la propiedad y el seguro del hogar. Esta calculadora muestra cada parte por separado para que veas qué determina el total.',
        },
        {
          q: '¿Cómo se calcula el pago mensual de capital e intereses?',
          a: 'Es la fórmula estándar de amortización: M = P · r(1 + r)ⁿ / ((1 + r)ⁿ − 1), donde P es la cantidad prestada, r es el tipo de interés mensual y n es el número de pagos mensuales. El cuadro que la acompaña baja los intereses y sube el capital cada mes, así que los primeros pagos son casi todo intereses.',
        },
        {
          q: '¿Qué ocurre con el último pago?',
          a: 'El pago programado se redondea al céntimo más cercano, lo que deja unos céntimos pendientes al final del plazo. El último pago programado se ajusta para que el préstamo cierre exactamente en cero, igual que hace un prestamista con el pago final.',
        },
        {
          q: '¿Los pagos adicionales acortan el préstamo o el pago?',
          a: 'Acortan el préstamo. Un pago adicional se aplica al capital, lo que reduce el saldo sobre el que se cobran los intereses del mes siguiente. El pago programado se mantiene igual, y el préstamo termina antes y con menos intereses totales.',
        },
        {
          q: '¿Afecta la cifra de intereses totales a los datos de impuestos y seguro?',
          a: 'No. Los intereses totales cubren solo el préstamo. El impuesto sobre la propiedad, el seguro y la HOA son costes de vivienda que continúan después de cancelar el préstamo, y por eso la calculadora informa del coste total de vivienda por separado.',
        },
        {
          q: '¿La calculadora tiene en cuenta la inflación?',
          a: 'No. Todas las cifras están en los dólares que introdujiste. Un pago de hipoteca dentro de 30 años es una parte mucho menor de los ingresos que el mismo pago de hoy, y ninguno de los números de esta página se ajusta por eso.',
        },
      ],
      sources: [
        {
          label: 'CFPB — Cómo calcular el pago de una hipoteca',
          url: 'https://www.consumerfinance.gov/ask-cfpb/how-do-i-calculate-my-mortgage-payment-en-144/',
        },
        {
          label: 'Freddie Mac — Encuesta sobre el mercado hipotecario primario (metodología de los tipos)',
          url: 'https://www.freddiemac.com/pmms',
        },
        {
          label: 'HUD — Requisitos de los préstamos FHA y seguro hipotecario',
          url: 'https://www.hud.gov/helping_american_homeowners',
        },
        {
          label: 'BLS — Índice de precios al consumidor (inflación, para la nota sobre valor real)',
          url: 'https://www.bls.gov/cpi/',
        },
      ],
      relatedGuides: [
        { slug: 'mortgage-payment-calculator-explained', title: 'Calculadora de pago de hipoteca explicada' },
        { slug: 'how-mortgage-amortization-works', title: 'Cómo funciona la amortización de una hipoteca' },
        { slug: 'monthly-payment-vs-total-cost-mortgage', title: 'Pago mensual frente a coste total de una hipoteca' },
        { slug: 'extra-mortgage-payments-math', title: 'La aritmética de los pagos adicionales de hipoteca' },
        { slug: 'how-to-read-an-amortization-schedule', title: 'Cómo leer un cuadro de amortización' },
      ],
    },

    'rent-vs-buy': {
      name: 'Calculadora de alquiler o compra',
      title: 'Calculadora de alquiler o compra: compara el coste real',
      description:
        'Compara el alquiler y la propiedad con los números: coste mensual, desembolso inicial, patrimonio y el mes en que se cruzan los dos caminos. Sin veredicto, solo la aritmética.',
      short: 'Coste mensual, desembolso inicial, acumulación de patrimonio y mes de equilibrio.',
      category: 'Vivienda',
      methodNote:
        'La comparación es de salida de efectivo y de patrimonio. No produce ningún veredicto a propósito: el mes de equilibrio es un dato sobre los números que introdujiste, no una recomendación.',
      sections: {
        theHome: 'La vivienda',
        theRent: 'El alquiler',
        runningCosts: 'Costes de mantenimiento',
        assumptions: 'Supuestos',
      },
      fields: {
        purchasePrice: 'Precio de compra',
        downPayment: 'Entrada',
        percentOfPrice: 'porcentaje del precio',
        mortgageRate: 'Tipo de interés de la hipoteca',
        annualFixed: 'anual, fijo',
        loanTerm: 'Plazo del préstamo',
        monthlyRent: 'Alquiler mensual',
        rentersInsurance: 'Seguro del inquilino',
        perMonth: 'al mes',
        propertyTax: 'Impuesto sobre la propiedad',
        percentOfPricePerYear: '% del precio al año',
        homeInsurance: 'Seguro del hogar',
        perYear: 'al año',
        hoaFee: 'Cuota de HOA o del condominio',
        maintenance: 'Mantenimiento',
        annualChangeInValue: 'Variación anual del valor',
        negativeModelsAFall: 'un negativo modela una caída',
        compareOver: 'Comparar durante',
        closingCosts: 'Gastos de cierre',
        percentOfPriceOnce: '% del precio, una vez',
        sellingCosts: 'Gastos de venta',
        percentOfFinalValue: '% del valor final',
      },
      terms: {
        years: (n: number) => `${n} ${n === 1 ? 'año' : 'años'}`,
      },
      result: {
        headlineLabel: 'Diferencia mensual (propiedad menos alquiler)',
        monthlyRent: 'Alquiler mensual',
        monthlyOwnership: 'Coste mensual de la propiedad',
        upfrontOutlay: 'Desembolso inicial',
        equityBuilt: 'Patrimonio acumulado',
        homeValueAtHorizon: 'Valor de la vivienda en el horizonte',
        crossover: 'Mes de equilibrio',
        note: 'La propiedad incluye hipoteca, impuesto sobre la propiedad, seguro, HOA y mantenimiento. El patrimonio es el valor de la vivienda menos el saldo pendiente del préstamo.',
      },
      resultNote:
        'El mes de equilibrio es el primer mes en que el coste neto de ser propietario —el efectivo pagado menos el patrimonio acumulado— baja del coste en efectivo de alquilar. Es un dato sobre estos números, no una recomendación.',
      chart: {
        title: 'El coste de alquilar frente al coste de ser propietario',
        note: 'Las dos líneas son efectivo acumulado: el alquiler pagado y el dinero gastado en la casa una vez descontado el patrimonio que genera.',
        xAxis: 'years',
        series: [
          { key: 'rent', label: 'Alquiler pagado' },
          { key: 'ownership', label: 'Coste neto de ser propietario' },
        ],
      },
      method: [
        'Cada mes la calculadora lleva dos libros en paralelo. El libro del alquiler suma tu alquiler y el seguro del inquilino. El libro de la propiedad suma el pago de la hipoteca de la fórmula estándar de amortización, el impuesto sobre la propiedad, el seguro, la HOA y la reserva de mantenimiento, más la entrada y los gastos de cierre en el primer mes.',
        'Junto al segundo libro, la calculadora sigue el valor de la vivienda, que crece o mengua cada mes al tipo anual que introdujiste, y el saldo pendiente del préstamo. La diferencia entre ambos es tu patrimonio:',
        'El coste neto de ser propietario es el efectivo que has pagado, menos el patrimonio que has acumulado. El mes de equilibrio es el primer mes en que esa cifra es menor que el alquiler que habrías pagado en el mismo periodo. Los gastos de venta se apartan y se informan al final del horizonte, porque no se pagan hasta que vendes.',
      ],
      formula: 'patrimonio = valor de la vivienda − saldo pendiente del préstamo',
      limits: [
        'No dice qué opción es mejor para ti. Los dos caminos se comparan con los números que introduces y se informa del mes de equilibrio, nada más.',
        'No modela el tratamiento fiscal de una venta, la deducción de los intereses de la hipoteca ni la depreciación de un inmueble con el tiempo.',
        'No cotiza un préstamo concreto. El tipo de interés que introduces es el tipo que se usa; la página no lleva cotizaciones en vivo ni información de entidades prestamistas.',
        'No pronostica los precios de la vivienda. La variación anual del valor que introduces se aplica mes a mes durante todo el horizonte, en ambos sentidos si introduces un número negativo.',
      ],
      faq: [
        {
          q: '¿Qué significa el mes de equilibrio?',
          a: 'Es el primer mes en que el coste neto de ser propietario —el efectivo que has pagado, menos el patrimonio que has acumulado— es menor que el efectivo que habrías pagado en alquiler durante el mismo periodo. Antes de ese punto, alquilar ha costado menos en efectivo. Después, ser propietario ha costado menos una vez que se cuenta el patrimonio.',
        },
        {
          q: '¿Por qué el cálculo incluye una reserva de mantenimiento?',
          a: 'Una vivienda cuesta dinero mantenerla en buen estado haya hipoteca o no, y ese coste no aparece en ningún acta de cierre. La calculadora lo aplica como un porcentaje del precio de compra cada año, y ese porcentaje es un dato que introduces.',
        },
        {
          q: '¿Qué ocurre con el valor de la vivienda en el cálculo?',
          a: 'Crece o mengua cada mes al tipo anual que introduces, y luego se compara con el saldo pendiente del préstamo para dar la cifra de patrimonio. Un tipo negativo modela un mercado a la baja; un tipo cero mantiene el precio constante.',
        },
        {
          q: '¿Se incluyen los gastos de venta?',
          a: 'Los gastos de venta se muestran aparte al final del horizonte, como un porcentaje del valor final de la vivienda. No se descuentan mes a mes, porque no se pagan hasta que vendes.',
        },
        {
          q: '¿Cuál es la diferencia entre el alquiler total y el coste neto de la propiedad?',
          a: 'El alquiler total es simplemente lo que pagas de alquiler cada mes multiplicado por el número de meses. El coste neto de la propiedad es lo que pagas en hipoteca, impuestos, seguro, HOA y mantenimiento, más el desembolso inicial, menos el patrimonio que has acumulado. La segunda cifra puede ser negativa, lo que significa que has acumulado más patrimonio del que has pagado.',
        },
        {
          q: '¿Esto incluye las consecuencias fiscales de vender una vivienda?',
          a: 'No. Cualquier ganancia por la venta, y cualquier exclusión que le aplique, queda fuera del alcance de esta herramienta. La comparación de aquí es de efectivo y patrimonio, no fiscal.',
        },
      ],
      sources: [
        {
          label: 'CFPB — Costes de vivienda, alquiler y propiedad',
          url: 'https://www.consumerfinance.gov/consumer-tools/mortgages/',
        },
        {
          label: 'HUD — Guía sobre costes de vivienda, impuestos sobre la propiedad y seguros',
          url: 'https://www.hud.gov/helping_american_homeowners',
        },
        {
          label: 'BLS — Índice de precios al consumidor (inflación, para la nota sobre la apreciación)',
          url: 'https://www.bls.gov/cpi/',
        },
        {
          label: 'FRED — Series del índice de precios de la vivienda usadas para el movimiento de precios a largo plazo',
          url: 'https://fred.stlouisfed.org/series/HPINUS',
        },
      ],
      relatedGuides: [
        { slug: 'rent-vs-buy-calculator-explained', title: 'Calculadora de alquiler o compra explicada' },
        { slug: 'rent-vs-buy-common-mistakes', title: 'Errores comunes en las comparaciones entre alquiler y compra' },
        { slug: 'estimating-property-tax-and-home-insurance', title: 'Cómo estimar el impuesto sobre la propiedad y el seguro del hogar' },
        { slug: 'down-payment-and-closing-costs-explained', title: 'Entrada y gastos de cierre explicados' },
        { slug: 'monthly-payment-vs-total-cost-mortgage', title: 'Pago mensual frente a coste total de una hipoteca' },
      ],
      script: {
        notWithinHorizon: 'Fuera del horizonte',
        month: 'Mes {n}',
      },
    },

    'compound-interest': {
      name: 'Calculadora de interés compuesto',
      title: 'Calculadora de interés compuesto con aportaciones mensuales',
      description:
        'Proyecta un saldo con aportaciones periódicas, elige la frecuencia de capitalización y mira el resultado en dólares de hoy tras la inflación. Fórmulas a la vista.',
      short: 'Saldo, aportaciones, intereses ganados y valor ajustado por la inflación.',
      category: 'Inversión',
      methodNote:
        'La proyección avanza un periodo cada vez, así que la tabla anual la produce la misma aritmética que produce la cifra final.',
      fields: {
        startingBalance: 'Saldo inicial',
        today: 'hoy',
        monthlyContribution: 'Aportación mensual',
        addedEachMonth: 'añadido cada mes',
        interestRate: 'Tipo de interés',
        annualNominal: 'anual, nominal',
        time: 'Plazo',
        years: 'años',
        compounding: 'Capitalización',
        contributionTiming: 'Momento de la aportación',
        inflation: 'Inflación',
        annualForRealValue: 'anual, para la cifra de valor real',
        seeBalance: 'Ver el saldo año a año',
      },
      frequencies: {
        monthly: 'Mensual',
        quarterly: 'Trimestral',
        twiceAYear: 'Dos veces al año',
        annually: 'Anual',
        everyTwoMonths: 'Cada dos meses',
        everyFourMonths: 'Cada cuatro meses',
      },
      timing: {
        endOfMonth: 'Final del mes',
        startOfMonth: 'Principio del mes',
      },
      table: {
        year: 'Año',
        balance: 'Saldo',
        contributed: 'Aportado',
        interest: 'Intereses',
        inTodaysDollars: 'En dólares de hoy',
      },
      result: {
        headlineLabel: 'Saldo al final del periodo',
        totalContributions: 'Aportaciones totales',
        interestEarned: 'Intereses ganados',
        inTodaysDollars: 'En dólares de hoy',
        effectiveAnnualRate: 'Tipo anual efectivo',
        realAnnualRate: 'Tipo anual real',
        horizon: 'Horizonte',
        note: 'El saldo está en los dólares que introdujiste. La cifra ajustada por la inflación lo convierte al poder adquisitivo del año de partida.',
      },
      resultNote:
        'El tipo que introduces se usa tal cual durante todo el periodo. Esta página no busca un tipo de mercado.',
      chart: {
        title: 'De qué está hecho el saldo',
        note: 'La línea es el saldo. La banda que hay debajo es la parte que vino de los intereses y no de las aportaciones.',
        xAxis: 'years',
        series: [
          { key: 'balance', label: 'Saldo' },
          { key: 'contributed', label: 'Aportado' },
        ],
      },
      method: [
        'La proyección avanza un periodo de capitalización cada vez. En cada periodo el saldo genera intereses al tipo del periodo, y luego se suma la aportación de ese periodo, al final del periodo o al principio, según el ajuste. Recorrer los periodos en secuencia en lugar de usar una sola expresión cerrada es lo que produce la tabla año a año, y el saldo final es el mismo en ambos casos.',
        'En forma cerrada, el mismo resultado es:',
        'donde P es el saldo inicial, r es el tipo anual dividido por el número de periodos de capitalización al año, n es el número de periodos y PMT es la aportación hecha en cada periodo. Una aportación hecha al principio del periodo genera intereses durante todo ese periodo, así que en ese caso el término de la aportación se multiplica por (1 + r).',
        'Las cifras reales salen de dos ajustes. El tipo anual efectivo es (1 + r) elevado al número de periodos al año, que es lo que un tipo nominal del 7 % se convierte realmente en cuanto se aplica un año de capitalización mensual. El tipo real divide el tipo nominal por el factor de inflación, y el saldo en dólares de hoy es el saldo nominal dividido por la inflación capitalizada en el mismo periodo.',
      ],
      formula: 'FV = P(1 + r)ⁿ + PMT · ((1 + r)ⁿ − 1) / r',
      limits: [
        'No predice una rentabilidad. El tipo que introduces se usa tal cual durante todo el periodo; ninguna media histórica, ninguna previsión ni datos de mercado alimentan esta página.',
        'No modela impuestos, comisiones ni cargos de la cuenta. El saldo de una cuenta real cambiará en lo que la entidad cobre.',
        'No modela la volatilidad del mercado. Los saldos reales caen en los años en que caen los mercados reales, y ningún tipo fijo recoge eso.',
        'No te dice cómo invertir ni si conviene ahorrar. Proyecta una cifra con los supuestos que introduces.',
      ],
      faq: [
        {
          q: '¿Por qué la frecuencia de capitalización solo puede ser 1, 2, 3, 4, 6 o 12?',
          a: 'Porque aquí las aportaciones son mensuales, y la calculadora mantiene iguales el periodo de capitalización y el periodo de aportación. Cualquier frecuencia que divida a doce mantiene esa aritmética exacta en lugar de aproximada. En la práctica, esas seis cubren la capitalización de diaria a anual frente a depósitos mensuales.',
        },
        {
          q: '¿Cuál es la diferencia entre el tipo nominal y el tipo anual efectivo?',
          a: 'El tipo nominal es el número de la cuenta: 7 %. El tipo efectivo es lo que el saldo gana realmente en cuanto se aplica un año de capitalización, así que un 7 % capitalizado mensualmente es 7.229 %. La página muestra los dos, porque la diferencia importa en periodos largos.',
        },
        {
          q: '¿Qué significa el valor real?',
          a: 'Es el saldo final expresado en el poder adquisitivo del año de partida. El cálculo divide el saldo nominal por el tipo de inflación capitalizado en el mismo periodo, lo que muestra cuánto del saldo es crecimiento real y cuánto son los mismos dólares llegando más lejos.',
        },
        {
          q: '¿El momento de la aportación cambia el resultado?',
          a: 'Sí, y la página muestra los dos. Una aportación hecha al principio de cada periodo genera intereses durante todo ese periodo, así que termina con más que la misma aportación hecha al final. La diferencia es pequeña en cada pago, pero se capitaliza durante décadas.',
        },
        {
          q: '¿Qué ocurre con un tipo de interés cero?',
          a: 'El saldo crece solo con las aportaciones, sin intereses. La calculadora maneja este caso de forma explícita en lugar de dividir entre cero, y por eso la cifra es exactamente lo aportado.',
        },
        {
          q: '¿Hace falta una aportación periódica?',
          a: 'No. Poner la aportación mensual a cero convierte el cálculo en una proyección de interés compuesto simple sobre el saldo inicial, que es el modelo adecuado para un pago único ya invertido.',
        },
      ],
      sources: [
        {
          label: 'SEC — Investor.gov: interés compuesto y el coste de las comisiones',
          url: 'https://www.investor.gov/introduction-investing/investing-basics/glossary/compound-interest',
        },
        {
          label: 'BLS — Índice de precios al consumidor (para las cifras ajustadas por la inflación)',
          url: 'https://www.bls.gov/cpi/',
        },
        {
          label: 'Federal Reserve — Datos de tipos de depósitos a plazo y de ahorro',
          url: 'https://www.federalreserve.gov/releases/h15/',
        },
        {
          label: 'IRS — Interés compuesto y el crecimiento de un IRA tradicional',
          url: 'https://www.irs.gov/retirement-plans/traditional-iras',
        },
      ],
      relatedGuides: [
        { slug: 'compound-interest-calculator-explained', title: 'Calculadora de interés compuesto explicada' },
        { slug: 'compound-vs-simple-interest', title: 'Interés compuesto frente a interés simple' },
        { slug: 'how-compounding-frequency-changes-results', title: 'Cómo la frecuencia de capitalización cambia el resultado' },
        { slug: 'inflation-and-real-returns-explained', title: 'Inflación y rentabilidad real explicadas' },
        { slug: 'understanding-apr', title: 'Cómo entender el APR y el tipo de interés anual efectivo' },
      ],
      script: {
        yearsOne: '1 año',
        yearsOther: '{n} años',
      },
    },

    'net-pay': {
      name: 'Calculadora de salario neto',
      title: 'Calculadora de salario neto para el ejercicio fiscal 2026',
      description:
        'Calcula lo que queda de un salario después del impuesto federal sobre la renta, el Social Security, el Medicare y el impuesto estatal, para cualquier periodo de pago, con cada deducción a la vista.',
      short: 'Lo que queda de un salario tras el impuesto federal, las cargas sociales y el impuesto estatal.',
      category: 'Nómina',
      methodNote:
        'Las cifras son las del ejercicio fiscal 2026: Rev. Proc. 2025-32 para los tramos federales y la deducción estándar, y la Social Security Administration para los límites de las cargas sociales. Nada de esta página es una cotización de un proveedor de nóminas.',
      fields: {
        grossPay: 'Salario bruto',
        payPeriod: 'Periodo de pago',
        filingStatus: 'Situación fiscal',
        stateRate: 'Tipo de impuesto estatal sobre la renta',
        stateRateHint: 'el tipo de tu tramo',
        preTax: 'Deducciones antes de impuestos',
        preTaxHint: '401(k), HSA, FSA al año',
        perYear: 'al año',
        debtName: 'Deuda',
        balance: 'Saldo',
        rate: 'Tipo',
        minimum: 'Pago mínimo',
      },
      terms: {
        payPeriods: {
          year: 'Anualmente',
          month: 'Mensual',
          week: 'Semanal',
          day: 'Por día',
          hour: 'Por hora',
        },
        filingStatuses: {
          single: 'Soltero',
          married: 'Casado, declaración conjunta',
          head: 'Cabeza de familia',
        },
      },
      result: {
        headlineLabel: 'Salario neto',
        annualGross: 'Salario bruto del año',
        federalTax: 'Impuesto federal sobre la renta',
        socialSecurity: 'Social Security',
        medicare: 'Medicare',
        additionalMedicare: 'Impuesto adicional de Medicare',
        stateTax: 'Impuesto estatal sobre la renta',
        totalTax: 'Impuesto total',
        netPerMonth: 'Neto al mes',
        effectiveRate: 'Tipo efectivo de impuesto',
        note:
          'El importe neto es el salario bruto menos las deducciones anteriores, dividido por el número de periodos de pago del año.',
      },
      resultNote:
        'Un sistema de nóminas aplica las elecciones de retención del W-4 y los importes ya retenidos durante el año, así que la cifra de una nómina real se mueve un poco de un mes a otro.',
      chart: {
        title: 'Adónde va el salario bruto',
        note: 'Una barra para el año, partida entre la parte que llega al salario y las partes que se le retiran.',
        xAxis: 'none',
        series: [
          { key: 'net', label: 'Salario neto' },
          { key: 'federal', label: 'Impuesto federal sobre la renta' },
          { key: 'socialSecurity', label: 'Social Security' },
          { key: 'medicare', label: 'Medicare' },
          { key: 'state', label: 'Impuesto estatal sobre la renta' },
        ],
      },
      formula:
        'salario neto = salario bruto − deducciones antes de impuestos − impuesto federal sobre la renta − Social Security − Medicare − impuesto estatal sobre la renta',
      method: [
        'El cálculo parte del salario bruto y retrocede por las deducciones, en el mismo orden en que las aplica un sistema de nóminas. Las deducciones antes de impuestos salen primero, porque una aportación a un 401(k) o a una cuenta de salud se resta del salario antes de que este se grave. Lo que queda es el salario gravable.',
        'El impuesto federal sobre la renta se calcula sobre ese salario gravable. Se resta la deducción estándar de la situación fiscal y el resultado pasa por la tabla de tramos de 2026. Cada tramo es un importe fijo de impuesto más un porcentaje de los ingresos por encima del suelo de ese tramo, que es como el IRS publica la tabla.',
        'Después vienen las cargas sociales. El Social Security es el 6.2% del salario hasta el máximo imponible de $184,500 para 2026. El Medicare es el 1.45% de todo el salario sin techo, y el impuesto adicional de Medicare es el 0.9% de la parte por encima de $200,000 para un declarante soltero, o por encima de $250,000 para una declaración conjunta de casados.',
        'El impuesto estatal sobre la renta es el tipo que introduces, aplicado a los ingresos gravables. Es una estimación: la mayoría de los estados grava por tramos, así que un único tipo aplicado a todos los ingresos sobreestima lo que paga la mayoría de la gente. La cifra final es lo que queda, dividido por el número de periodos de pago del año.',
      ],
      limits: [
        'No modela los créditos fiscales. El crédito fiscal por hijos, el crédito fiscal por ingresos del trabajo y los créditos educativos cambian la cifra final y no están en el cálculo.',
        'No modela las plusvalías, los ingresos por trabajo autónomo ni el tratamiento de los ingresos por encima de la base imponible del Social Security, donde el Medicare se sigue aplicando y el Social Security no.',
        'No modela los impuestos locales. Los impuestos sobre la renta de ciudad y de condado son distintos del tipo estatal.',
        'Los recuentos de periodos de pago son convencionales: 12 meses, 52 semanas, 260 días laborables o 2,080 horas para una semana de 40 horas a lo largo de 52 semanas. Quien cobra con otro calendario puede introducir la cifra anual.',
        'Una aportación a un 401(k) por encima del límite anual no queda exenta de las cargas sociales en su totalidad, y este cálculo trata todo el importe antes de impuestos como exento.',
      ],
      faq: [
        {
          q: '¿Por qué mi salario neto es menor que el bruto menos el impuesto sobre la renta?',
          a: 'Porque el salario se reduce por el Social Security y el Medicare antes de calcular el impuesto sobre la renta. Esas son cargas sociales sobre el empleo, distintas del impuesto sobre la renta de la nómina.',
        },
        {
          q: '¿Esto usa mi tramo de impuestos real?',
          a: 'Usa la tabla de tramos de 2026 y la deducción estándar de la situación fiscal, así que la cifra se acerca a lo que calcula un sistema de nóminas para quien cobra un salario y no tiene otros ingresos. No sabe nada de créditos, otras deducciones ni otros ingresos.',
        },
        {
          q: '¿Cuál es la diferencia entre el tipo efectivo y el marginal?',
          a: 'El tipo marginal es el tipo al que se grava el siguiente dólar de ingresos gravables, y es el tramo más alto al que llega el ingreso. El tipo efectivo es el impuesto total dividido por todos los ingresos, y es menor, porque los tramos más altos solo se aplican a la parte de los ingresos que los supera.',
        },
        {
          q: '¿Qué tipo estatal corresponde?',
          a: 'El que se aplica a tu propio tramo en tu estado. La mayoría de los estados grava por tramos, así que el tipo efectivo es menor que el tipo máximo. Ese único número es exacto en un estado con tipo plano y en un estado sin impuesto sobre la renta.',
        },
        {
          q: '¿Por qué el Social Security tiene tope y el Medicare no?',
          a: 'El Social Security tiene un máximo imponible que se fija cada año, $184,500 para 2026, y las ganancias por encima de él no tributan por Social Security. El Medicare no tiene techo, así que se aplica a cada dólar del salario.',
        },
        {
          q: '¿Sirve esto para calcular mi factura de impuestos?',
          a: 'No. Calcula el impuesto retenido de un salario. Una declaración de impuestos es otro cálculo: incluye otros ingresos, deducciones, créditos y los pagos ya realizados, y se presenta una vez al año en lugar de en cada periodo de pago.',
        },
      ],
      sources: [
        {
          label: 'IRS — Rev. Proc. 2025-32, ajustes por inflación para el ejercicio fiscal 2026',
          url: 'https://www.irs.gov/irb/2025-45_IRB',
        },
        {
          label: 'Social Security Administration — base imponible y COLA de 2026',
          url: 'https://www.ssa.gov/cola/',
        },
        {
          label: 'Social Security Administration — Publicación 15, Guía de impuestos del empleador',
          url: 'https://www.ssa.gov/pubs/EN-05-10035.pdf',
        },
        {
          label: 'IRS — Tax Topic 511, Retenciones',
          url: 'https://www.irs.gov/taxtopics/tc511',
        },
      ],
      relatedGuides: [
        { slug: 'net-pay-calculator-explained', title: 'Cómo se calcula el salario neto' },
      ],
    },

    'income-tax': {
      name: 'Calculadora del impuesto federal sobre la renta',
      title: 'Calculadora del impuesto federal sobre la renta para el ejercicio fiscal 2026',
      description:
        'Calcula el impuesto federal sobre la renta de 2026 sobre un año de ingresos, con la situación fiscal, la deducción y los tipos efectivo y marginal uno al lado del otro.',
      short: 'Impuesto federal sobre la renta de un año de ingresos, con los dos tipos a la vista.',
      category: 'Impuestos',
      methodNote:
        'Los tramos y la deducción estándar son las cifras de 2026 de Rev. Proc. 2025-32, publicadas el 3 de noviembre de 2025. Las cargas sociales que se restan de un salario no forman parte de este cálculo; están en la calculadora de salario neto.',
      fields: {
        grossIncome: 'Ingresos brutos del año',
        filingStatus: 'Situación fiscal',
        itemisedDeduction: 'Deducciones detalladas',
        standardDeduction: 'Deducción estándar',
        useStandard: 'Usar la deducción estándar',
        stateRate: 'Tipo de impuesto estatal sobre la renta',
        stateRateHint: 'el tipo de tu tramo',
        preTax: 'Deducciones antes de impuestos',
        preTaxHint: '401(k), HSA, FSA al año',
        perYear: 'al año',
      },
      terms: {
        filingStatuses: {
          single: 'Soltero',
          married: 'Casado, declaración conjunta',
          head: 'Cabeza de familia',
        },
      },
      result: {
        headlineLabel: 'Impuesto federal sobre la renta',
        taxableIncome: 'Ingresos gravables',
        deductionApplied: 'Deducción aplicada',
        standardDeduction: 'Deducción estándar',
        itemisedDeduction: 'Deducción detallada',
        federalTax: 'Impuesto federal sobre la renta',
        stateTax: 'Impuesto estatal sobre la renta',
        totalTax: 'Impuesto total',
        effectiveRate: 'Tipo efectivo',
        marginalRate: 'Tipo marginal',
        afterTax: 'Ingresos después de impuestos',
        note:
          'La deducción que se aplica es la mayor de las dos: la deducción estándar o la deducción detallada que se introduce a la izquierda.',
      },
      resultNote:
        'La cifra es una obligación tributaria, no el importe retenido de una nómina. No incluye créditos ni los pagos ya realizados durante el año.',
      chart: {
        title: 'Qué queda del ingreso',
        note: 'Una barra para el año, partida entre la parte que se queda con quien lee y la parte que va a impuestos.',
        xAxis: 'none',
        series: [
          { key: 'afterTax', label: 'Ingresos después de impuestos' },
          { key: 'federal', label: 'Impuesto federal sobre la renta' },
          { key: 'state', label: 'Impuesto estatal sobre la renta' },
        ],
      },
      formula:
        'ingresos gravables = ingresos brutos − deducciones antes de impuestos − deducción; impuesto = tabla de tramos aplicada a los ingresos gravables',
      method: [
        'El cálculo parte de los ingresos brutos del año y resta las deducciones antes de impuestos, porque una aportación a un 401(k) o a una cuenta de salud no tributa como ingreso.',
        'Después viene la deducción. Se usa la deducción estándar de la situación fiscal salvo que se introduzcan deducciones detalladas, y se aplica la mayor de las dos. La deducción estándar de 2026 es $16,100 para un declarante soltero, $32,200 para una declaración conjunta de casados y $24,150 para cabeza de familia.',
        'Lo que queda son los ingresos gravables, y el impuesto es la tabla de tramos de 2026 aplicada a esa cifra. Cada tramo es un importe fijo de impuesto más un porcentaje de los ingresos por encima del suelo de ese tramo, tal como lo publica el IRS.',
        'Los dos tipos responden a preguntas distintas. El tipo marginal es el tipo al que se grava el siguiente dólar de ingresos gravables, que es el tramo más alto al que llega el ingreso. El tipo efectivo es el impuesto total dividido por todos los ingresos, y es menor porque los tramos más altos solo alcanzan a la parte de los ingresos que los supera.',
      ],
      limits: [
        'No modela los créditos fiscales. El crédito fiscal por hijos, el crédito fiscal por ingresos del trabajo y los créditos educativos reducen el impuesto y no están en el cálculo.',
        'No modela la diferencia entre las plusvalías y los ingresos ordinarios, así que un año con ingresos de inversión se calcula con los tipos ordinarios.',
        'No modela la deducción por edad ni ninguna deducción fuera de los importes estándar y detallado que se introducen a la izquierda.',
        'No modela el impuesto por trabajo autónomo, que se cobra sobre los ingresos netos de quien trabaja por cuenta propia y tiene su propia base y su propio tipo.',
        'La cifra estatal es un tipo que introduces, aplicado a la totalidad de los ingresos gravables. La mayoría de los estados grava por tramos, así que el impuesto estatal real suele ser menor.',
      ],
      faq: [
        {
          q: '¿Qué deducción se aplica?',
          a: 'La estándar, salvo que las deducciones detalladas sumen más. La calculadora muestra la deducción estándar de la situación fiscal y la cifra detallada una al lado de la otra, así que la comparación es de un vistazo.',
        },
        {
          q: '¿Cuál es la diferencia entre el tipo efectivo y el marginal?',
          a: 'El tipo marginal es el tipo al que se grava el siguiente dólar de ingresos gravables. El tipo efectivo es el impuesto total dividido por todos los ingresos, y es menor, porque los tramos por encima del primero solo se aplican a la parte de los ingresos que los supera.',
        },
        {
          q: '¿Por qué el impuesto da un salto en ciertos ingresos?',
          a: 'Ese es el límite de un tramo. Por encima de él, otro dólar se grava al tipo siguiente, así que el impuesto sube más deprisa que los ingresos. El tipo marginal indica en qué tramo está el ingreso.',
        },
        {
          q: '¿Esto incluye el Social Security y el Medicare?',
          a: 'No. Esas son cargas sociales que se cobran sobre un salario, con sus propios topes, y se calculan en la calculadora de salario neto.',
        },
        {
          q: '¿Qué es la cifra del impuesto estatal?',
          a: 'El tipo que se introduce a la izquierda, aplicado a los ingresos gravables. La mayoría de los estados grava por tramos, así que la cifra real para un ingreso concreto suele ser menor que esta estimación.',
        },
        {
          q: '¿Es esta la cantidad final?',
          a: 'Es el impuesto antes de los créditos y antes de los pagos ya realizados durante el año. Una declaración suma los créditos, suma todo lo demás que no se gravó por nómina y resta lo ya pagado.',
        },
      ],
      sources: [
        {
          label: 'IRS — Rev. Proc. 2025-32, ajustes por inflación para el ejercicio fiscal 2026',
          url: 'https://www.irs.gov/irb/2025-45_IRB',
        },
        {
          label: 'IRS — Tax Topic 505, Retenciones y pagos estimados de impuestos',
          url: 'https://www.irs.gov/taxtopics/tc505',
        },
        {
          label: 'IRS — Tax Topic 611, Impuesto sobre la renta',
          url: 'https://www.irs.gov/taxtopics/tc611',
        },
      ],
      relatedGuides: [
        { slug: 'income-tax-calculator-explained', title: 'Cómo se calcula el impuesto federal sobre la renta' },
      ],
    },

    'debt-payoff': {
      name: 'Calculadora de amortización de deudas',
      title: 'Calculadora de amortización de deudas: Avalancha y bola de nieve',
      description:
        'Compara la amortización de varias deudas a la vez: solo los pagos mínimos, el orden Avalancha y el orden bola de nieve, con los meses hasta quedar libre de deudas y el interés ahorrado.',
      short: 'Amortiza varias deudas a la vez y compara el orden.',
      category: 'Deuda',
      methodNote:
        'El modelo es una simulación mes a mes: los intereses se acumulan sobre el saldo al inicio del mes, los pagos van primero a los intereses y el dinero extra va a la deuda que has elegido.',
      fields: {
        debtName: 'Deuda',
        balance: 'Saldo',
        rate: 'Tipo de interés',
        minimum: 'Pago mínimo',
        addDebt: 'Añadir una deuda',
        removeDebt: 'Quitar esta deuda',
        extraPayment: 'Pago mensual extra',
        extraPaymentHint: 'además de cada pago mínimo',
      },
      terms: {
        strategies: {
          minimum: 'Solo mínimos',
          avalanche: 'Avalancha',
          snowball: 'Bola de nieve',
        },
        orderHints: {
          avalanche: 'el tipo de interés más alto primero',
          snowball: 'el saldo más pequeño primero',
        },
      },
      result: {
        headlineLabel: 'Interés ahorrado',
        interestSaved: 'Interés ahorrado frente a los pagos mínimos',
        monthsToFree: 'Meses hasta quedar libre de deudas',
        totalInterest: 'Interés total',
        totalPaid: 'Total pagado',
        minimumOnly: 'Solo mínimos',
        avalanche: 'Avalancha',
        snowball: 'Bola de nieve',
        minimumsNeverCover: 'Nunca se salda',
        minimumsNeverCoverNote:
          'Los pagos mínimos de estas deudas no cubren los intereses, así que el saldo crece en lugar de bajar. Solo con los pagos mínimos las deudas nunca se saldan, y no hay intereses que ahorrar frente a esa situación. El pago extra es lo que las hace bajar.',
        note:
          'Avalancha paga primero la deuda con el tipo más alto y cuesta menos intereses. Bola de nieve salda antes el saldo más pequeño y termina esa deuda antes. La diferencia entre las dos es el precio del orden.',
      },
      resultNote:
        'Las tres simulaciones usan las mismas deudas y el mismo pago extra. Lo único que cambia es el orden en el que va el dinero extra.',
      chart: {
        title: 'El saldo con cada orden',
        note: 'La línea de solo los pagos mínimos sigue subiendo allí donde los pagos no cubren los intereses, y la línea del pago extra llega a cero.',
        xAxis: 'years',
        series: [
          { key: 'avalanche', label: 'Avalancha' },
          { key: 'snowball', label: 'Bola de nieve' },
          { key: 'minimumOnly', label: 'Solo mínimos' },
        ],
      },
      formula:
        'interés del mes = saldo al inicio del mes × tipo anual ÷ 12; el pago va primero a los intereses y después al capital',
      method: [
        'El cálculo es una simulación mes a mes. Al inicio de cada mes los intereses se cobran sobre el saldo y se suman a este. El dinero disponible ese mes es la suma de todos los pagos mínimos más el pago extra que introduces a la izquierda, y se aplica primero a los intereses y después al capital.',
        'Una deuda saldada deja de recibir su pago mínimo, y ese mínimo se suma al dinero que va a la siguiente deuda. Ese es el mecanismo detrás de la diferencia entre los órdenes: la misma cantidad mensual, gastada en una deuda u otra, termina antes saldos diferentes.',
        'El orden avalanche envía el dinero extra primero a la deuda con el tipo de interés más alto. Es el orden que menos cuesta en dólares, porque los intereses que deja de generar son los más caros de los que se pagan.',
        'El orden bola de nieve envía el dinero extra primero al saldo más pequeño. Cuesta más intereses en total y salda antes una cuenta, que es otro tipo de resultado. La calculadora muestra los dos y el interés ahorrado en cada caso, de modo que se pueden comparar con las mismas cifras.',
      ],
      limits: [
        'No modela los tipos variables. Una tarjeta de crédito con tipo variable cambia los intereses según se mueva el índice, y el calendario de aquí supone que el tipo se mantiene donde se escribió.',
        'No modela las comisiones: los recargos por pago tardío, las comisiones por traspaso de saldo y las cuotas anuales de las tarjetas no están en el total.',
        'Carga los intereses una vez al mes. Una tarjeta de crédito que capitaliza a diario cobra algo más a lo largo del año, así que la cifra real de un saldo de tarjeta suele ser algo mayor que esta.',
        'No modela el tratamiento fiscal de los intereses, que en algunas deudas se pueden deducir y en otras no.',
        'No modela un cambio en los pagos mínimos, que los prestamistas a veces bajan por dificultad y a veces suben conforme baja el saldo.',
      ],
      faq: [
        {
          q: '¿Cuál es la diferencia entre avalanche y bola de nieve?',
          a: 'Solo el orden. Avalancha envía el dinero extra primero a la deuda con el tipo de interés más alto, y bola de nieve primero al saldo más pequeño. Las deudas, los pagos mínimos y el pago extra son los mismos en las dos simulaciones.',
        },
        {
          q: '¿Cuál de las dos ahorra más dinero?',
          a: 'Avalancha, en intereses. El dinero extra frena primero la deuda más cara, así que se acumulan menos intereses a lo largo de la vida de las deudas. La calculadora imprime la diferencia del interés ahorrado para cada orden.',
        },
        {
          q: '¿Por qué existe la bola de nieve si cuesta más?',
          a: 'Salda primero el saldo más pequeño, así que una deuda llega a cero antes. Ese es un resultado distinto del que miden los intereses, y la calculadora muestra los dos para compararlos con las mismas cifras.',
        },
        {
          q: '¿Cómo se calculan los intereses?',
          a: 'Sobre el saldo al inicio de cada mes, al tipo anual dividido entre doce, y se suman al saldo. Los pagos van después primero a esos intereses y después al capital.',
        },
        {
          q: '¿Qué pasa con el pago mínimo de una deuda saldada?',
          a: 'Se suma al dinero que va a la siguiente deuda, así que la cantidad mensual que va a las deudas nunca baja. Eso es lo que hace que las fechas de cancelación sean más cortas que la suma de los calendarios por separado.',
        },
        {
          q: '¿Esto tiene en cuenta una tarjeta de crédito que capitaliza a diario?',
          a: 'No. El modelo carga los intereses una vez al mes. Una tarjeta que capitaliza cada día cobra algo más a lo largo de un año, así que la cifra real de un saldo de tarjeta suele ser algo mayor que la de aquí.',
        },
      ],
      sources: [
        {
          label: 'CFPB — Ask CFPB, preguntas y respuestas de consumo',
          url: 'https://www.consumerfinance.gov/ask-cfpb/',
        },
        {
          label: 'CFPB — Herramientas para tarjetas de crédito y orientación al consumidor',
          url: 'https://www.consumerfinance.gov/consumer-tools/credit-cards/',
        },
      ],
      relatedGuides: [
        { slug: 'debt-payoff-calculator-explained', title: 'Cómo funciona amortizar varias deudas' },
      ],
    },

  },
};
