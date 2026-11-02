/** Toàn bộ chuỗi giao diện bằng tiếng Việt. Cấu trúc giống hệt `en.ts`. */

export const vi = {
  /** Tên ngôn ngữ này, viết bằng chính ngôn ngữ này. */
  localeName: 'Tiếng Việt',

  tagline: 'Máy tính tài chính có trình bày cách tính',
  description:
    'Máy tính tài chính miễn phí cho khoản trả góp vay mua nhà, thuê hay mua, lãi kép, lương thực nhận, thuế liên bang và trả nợ. Mọi công thức đều được trình bày.',

  author: {
    role: 'Tác giả',
    bio: 'Làm việc trong mảng hạ tầng CNTT — điện toán đám mây, CI/CD, hạ tầng dưới dạng mã — nơi một thay đổi không thể kiểm chứng thì không được phát hành. Giữ cho môi trường đám mây gọn nhẹ và quy trình triển khai nhanh là công việc hằng ngày; cùng một tiêu chuẩn đó xuyên suốt trang web này. Phần tính toán nằm ở một chỗ duy nhất, các công thức được kiểm thử đơn vị đối chiếu với số liệu khoản vay đã công bố, và mọi con số lấy từ bên ngoài đều ghi nguồn cùng ngày đọc. Viết các bài hướng dẫn và duy trì bộ máy tính toán. Một người thứ hai đọc phần nội dung tài chính của mỗi bài hướng dẫn trước khi đăng. Không có gì ở đây bảo người đọc phải làm gì.',
  },

  reviewer: {
    role: 'Người thẩm định tài chính',
    bio: 'Đọc phần nội dung tài chính của bài hướng dẫn trước khi đăng: các con số, giả định đằng sau chúng và nguồn mà chúng được lấy ra. Tác giả xây dựng bộ máy tính toán; người thẩm định đọc kết quả từ phía bên kia, phía của người làm việc với tiền chứ không phải với mã. Tên của cô chỉ xuất hiện trên những bài hướng dẫn cô đã thẩm định.',
  },

  consent: {
    heading: 'Cookie',
    body: 'Trang web này dùng cookie để hiển thị quảng cáo và đếm xem trang nào được đọc. Nếu chấp nhận, quảng cáo và phân tích trang sẽ được tải, kể cả beacon không dùng cookie của nhà cung cấp lưu trữ; nếu từ chối, không có gì được tải cả. Với người đọc ở Liên minh châu Âu, beacon của nhà cung cấp lưu trữ hoàn toàn không được tải. Bạn có thể đổi câu trả lời sau qua chân trang. Những gì được thu thập và ai cung cấp có trên {privacyLink}.',
    privacyLink: 'trang quyền riêng tư',
    accept: 'Chấp nhận',
    reject: 'Từ chối',
    settings: 'Cài đặt cookie',
  },

  nav: {
    tools: 'Công cụ',
    guides: 'Hướng dẫn',
    sources: 'Nguồn',
    about: 'Giới thiệu',
  },

  footer: {
    taglineNote: 'Mọi công thức đều được viết đầy đủ, mọi giả định đều do bạn đặt.',
    calculatorsHeading: 'Máy tính',
    siteHeading: 'Trang web',
    calculators: {
      'mortgage-payment': 'Khoản trả góp vay mua nhà',
      'rent-vs-buy': 'Thuê hay mua',
      'compound-interest': 'Lãi kép',
      'net-pay': 'Lương thực nhận',
      'income-tax': 'Thuế thu nhập liên bang',
      'debt-payoff': 'Trả nợ',
    },
    links: {
      guides: 'Hướng dẫn',
      sources: 'Nguồn',
      'editorial-team': 'Ban biên tập',
      about: 'Giới thiệu',
      contact: 'Liên hệ',
      privacy: 'Quyền riêng tư',
      terms: 'Điều khoản',
    },
    cookieSettings: 'Cài đặt cookie',
    note:
      '{name} đăng các phép tính và lời giải thích, không phải lời khuyên tài chính. Các công cụ cho thấy phép tính đằng sau một con số và các giả định đằng sau phép tính. Chúng không đánh giá hoàn cảnh của bạn và không đề ra hướng hành động nào. Mọi con số một công cụ đưa ra đều phụ thuộc vào dữ liệu bạn nhập — hãy đọc các giả định trước khi dựa vào bất kỳ kết quả nào. © {founded}–{year} {name}.',
  },

  ui: {
    skipToContent: 'Chuyển đến nội dung',
    home: 'Trang chủ',
    breadcrumb: 'Đường dẫn',
    primaryNav: 'Điều hướng chính',
    lastChecked: 'Kiểm tra lần cuối',
    by: 'Tác giả',
    whereNumbersComeFrom: 'Các con số đến từ đâu',
    minRead: '{n} phút đọc',
    guidesCount: (n: number) => `${n} bài hướng dẫn`,
    calculate: 'Tính',
    open: 'Mở',
    allGuides: 'Tất cả hướng dẫn →',
    readTheGuide: 'Đọc hướng dẫn',
    guidesThatGoDeeper: 'Hướng dẫn đi sâu hơn',
    commonQuestions: 'Câu hỏi thường gặp',
    howThisIsCalculated: 'Cách tính',
    whatThisCalculatorDoesNotDo: 'Những gì máy tính này không làm',
    sources: 'Nguồn',
    sourcesNote: 'Đây là các nguồn gốc làm cơ sở cho số liệu và phương pháp trong bài hướng dẫn này.',
    calculatorsBehindThisGuide: 'Máy tính của bài hướng dẫn này',
    published: 'Đăng ngày',
    lastReviewed: 'Thẩm định lần cuối',
    reviewedBy: 'Thẩm định bởi',
    language: 'Ngôn ngữ',
    switchTheme: 'Đổi giao diện',
    switchToLight: 'Chuyển sang giao diện sáng',
    switchToDark: 'Chuyển sang giao diện tối',
    detectedFromIp:
      'Tiểu bang được xác định từ địa chỉ IP của bạn và chỉ là ước chừng: VPN, proxy hoặc mạng di động có thể trỏ sai tiểu bang. Ô này vẫn sửa được.',
  },

  newsletter: {
    emailAddress: 'Địa chỉ email',
    placeholder: 'ban@vidu.com',
    subscribe: 'Đăng ký',
  },

  home: {
    title: 'Calccents — Máy tính tài chính có trình bày cách tính',
    description:
      'Máy tính tài chính miễn phí cho khoản trả góp vay mua nhà, thuê hay mua, lãi kép, lương thực nhận, thuế liên bang và trả nợ. Mọi công thức đều được trình bày.',
    eyebrow: 'Máy tính tài chính',
    heading: 'Biết con số trước khi quyết định',
    lede: 'Công cụ miễn phí cho phép tính đằng sau một khoản vay mua nhà, một hợp đồng thuê, một phiếu lương và một chồng nợ. Mọi công thức đều được viết ra, mọi giả định đều thuộc về bạn, và không trang nào bảo bạn phải làm gì với kết quả.',
    cta: 'Xem các máy tính',
    calculatorsEyebrow: 'Các máy tính',
    calculatorsHeading: 'Sáu câu hỏi, sáu bộ con số',
    workHeading: 'Mọi con số đều cho thấy cách tính',
    workPoints: [
      'Công thức nằm ngay cạnh câu trả lời, bằng lời đơn giản và bằng ký hiệu.',
      'Mọi con số lấy từ đâu đó đều ghi nguồn và ngày.',
      'Mọi công cụ đều nói rõ những gì nó không làm, bằng cùng một câu chữ, ngay dưới kết quả.',
    ],
    workLink: 'Trang web được xây dựng thế nào →',
    sampleMonthlyPayment: 'Khoản trả hằng tháng',
    samplePrincipalAndInterest: 'Gốc và lãi',
    samplePropertyTax: 'Thuế bất động sản',
    sampleTotalInterest: 'Tổng tiền lãi',
    calcTitle: 'Thử ngay: khoản trả góp vay mua nhà hằng tháng',
    calcHomePrice: 'Giá nhà',
    calcDown: 'Trả trước',
    calcRate: 'Lãi suất',
    calcTerm: 'Kỳ hạn',
    calcYears: '{n} năm',
    calcMonthly: 'Gốc và lãi hằng tháng',
    calcLoan: 'Số tiền vay',
    calcTotalInterest: 'Tổng tiền lãi',
    calcOpen: 'Mở máy tính đầy đủ',
    calcNote: 'Chỉ gồm gốc và lãi. Thuế bất động sản, bảo hiểm và phí hội chủ nhà (HOA) có trong máy tính đầy đủ.',
    statCalculators: 'máy tính',
    statGuides: 'bài hướng dẫn có trình bày cách tính',
    statLanguages: 'ngôn ngữ',
    statSignups: 'lần đăng ký cần để dùng',
    guidesEyebrow: 'Hướng dẫn',
    guidesHeading: 'Phép tính, viết ra đầy đủ',
    newsletterHeading: 'Nhận toán học qua email',
    newsletterLede:
      'Một lá thư ngắn khi có máy tính mới ra mắt hoặc một máy tính hiện có được thẩm định lại. Không chào hàng, không nội dung được tài trợ.',
  },

  illustration: {
    mortgagePayment: 'Dư nợ vay mua nhà giảm dần theo thời gian, bên cạnh là tiền lãi đã trả',
    rentVsBuy: 'Hai đường cắt nhau: chi phí thuê so với chi phí sở hữu',
    compoundInterest: 'Số dư tăng ngày càng nhanh khi lãi được nhập vào gốc',
    netPay: 'Một thanh lương gộp được chia thành lương thực nhận và các khoản khấu trừ',
    incomeTax: 'Một chồng bậc thuế, mỗi bậc rộng hơn bậc phía trên',
    debtPayoff: 'Hai nhóm cột, mỗi nhóm cho một thứ tự trả các khoản nợ',
  },

  heroVisual: {
    label: 'Khoản trả hằng tháng',
    caption: 'Một ví dụ đã tính sẵn, vẽ theo cách máy tính vẽ.',
  },

  chart: {
    months: 'Tháng',
    years: 'Năm',
    start: 'Hiện tại',
    end: 'Kết thúc',
    empty: 'Biểu đồ sẽ hiện ra khi có con số để vẽ.',
  },

  toolsIndex: {
    title: 'Máy tính tài chính miễn phí',
    description:
      'Các máy tính miễn phí cho thấy phép tính đằng sau khoản trả góp vay mua nhà, so sánh thuê và mua, và dự phóng lãi kép.',
    heading: 'Máy tính tài chính miễn phí',
    lede: 'Mỗi máy tính đều trình bày công thức nó dùng, liệt kê các giả định đằng sau kết quả và nói thẳng những gì nó không làm. Không có gì ở đây hỏi địa chỉ email, và không có gì ở đây yêu cầu bạn đăng ký bất cứ thứ gì.',
    whatTheseAre: 'Những công cụ này là gì',
    whatTheseAreBody: [
      'Đây là công cụ tính toán. Chúng lấy những con số bạn nhập, áp dụng một công thức đã công bố và trả lại kết quả kèm theo cách tính. Máy tính vay mua nhà ở đây không biết điểm tín dụng, thu nhập của bạn hay tuần này bên cho vay nào đang đưa ra điều kiện gì, và nó không cố đoán.',
      'Lý do rất đơn giản: một con số bạn kiểm tra được có giá trị hơn một con số người khác chọn hộ bạn. Mọi công cụ ở đây đều trình bày công thức bằng ký hiệu, dẫn tới các nguồn gốc của phương pháp và ghi ngày thẩm định để bạn thấy lần cuối nó được kiểm tra là khi nào.',
    ],
  },

  guidesIndex: {
    title: 'Hướng dẫn',
    description:
      'Giải thích phép tính đằng sau khoản vay mua nhà, thuê hay mua và lãi kép, mỗi bài có công thức, giả định và nguồn.',
    heading: 'Hướng dẫn',
    lede: 'Giải thích chi tiết về phép tính và các giả định đằng sau các máy tính. Mọi bài hướng dẫn đều trình bày công thức, dẫn tới nguồn gốc và ghi ngày thẩm định.',
    missingHeading: 'Còn thiếu gì?',
    missingBody:
      'Các bài hướng dẫn được viết xoay quanh những phép tính người đọc thấy khó theo dõi nhất. Nếu một khái niệm tài chính chưa có ở đây, hãy cho chúng tôi biết đó là khái niệm nào và điều gì ở nó gây khó hiểu.',
    suggestTopic: 'Đề xuất chủ đề',
    groups: {
      home: 'Nhà ở và vay mua nhà',
      renting: 'Thuê và sở hữu',
      investing: 'Đầu tư',
    },
  },

  guide: {
    sourcesTitle: 'Nguồn',
    sourcesNote: 'Đây là các nguồn gốc làm cơ sở cho số liệu và phương pháp trong bài hướng dẫn này.',
  },

  about: {
    title: 'Giới thiệu',
    description:
      'Trang web này là gì, được xây dựng thế nào và tuân theo những quy tắc nào để mọi con số trên đó đều kiểm tra được.',
    heading: 'Giới thiệu {name}',
    lede: '{name} đăng các máy tính tài chính và lời giải thích đằng sau chúng. Đây là một trang web nhỏ với mục đích hẹp: đưa ra một con số bạn kiểm tra được, và cho bạn thấy cách tính đã tạo ra nó.',
    isHeading: 'Trang web này là gì',
    isBody: [
      'Sáu máy tính, mười tám bài hướng dẫn và các nguồn gốc đằng sau chúng. Các máy tính lấy những con số bạn nhập và áp dụng một công thức đã công bố: công thức trả dần cho khoản vay mua nhà, so sánh tiền mặt từng tháng giữa thuê và mua, công thức lãi kép cho số dư tiết kiệm, cùng phép tính trả nợ, thuế thu nhập và lương thực nhận.',
      'Trang web sống nhờ quảng cáo hiển thị. Điều đó quyết định cách nó được xây dựng. Các trang tải nhanh và có ít JavaScript, vì trang tải nhanh giữ người đọc đủ lâu để thấy quảng cáo, và vì trang tải nhanh là trang người ta quay lại. Không máy tính nào hỏi email, và không kết quả nào bị khóa.',
    ],
    isNotHeading: 'Trang web này không phải là gì',
    isNotBody: [
      'Đây không phải là công ty môi giới, không nhận hồ sơ và không hưởng hoa hồng từ bất kỳ ai bấm vào bất cứ thứ gì. Không có nội dung được tài trợ, không có liên kết tiếp thị liên kết và không có biểu mẫu thu thập thông tin liên hệ. Quảng cáo chỉ là quảng cáo hiển thị, nghĩa là thứ duy nhất lượt truy cập của người đọc trả là sự chú ý của người đọc.',
      'Không công cụ nào ở đây đánh giá hoàn cảnh của bạn. Một máy tính vay mua nhà trả lời "hãy trả trước 20 phần trăm" sẽ sai trong hầu hết trường hợp, vì câu trả lời đúng phụ thuộc vào những điều trang web không thấy được: khoản tiết kiệm khác của bạn, công việc của bạn, mức bạn chịu được một tháng khó khăn. Vì vậy mọi công cụ chỉ tính rồi dừng ở đó.',
    ],
    rulesHeading: 'Các quy tắc trang web tuân theo',
    rules: [
      {
        label: 'Mọi công cụ đều nêu giới hạn của mình.',
        body: 'Dưới mỗi kết quả có một khối liệt kê những gì công cụ không làm, bằng cùng một câu chữ trên mọi trang.',
      },
      {
        label: 'Mọi con số lấy từ đâu đó đều có nguồn.',
        body: 'Các bài hướng dẫn dẫn tới nguồn gốc và ghi ngày dữ liệu được đọc. Phép tính của chính trang web được trình bày đầy đủ.',
      },
      {
        label: 'Mọi trang đều ghi ngày thẩm định.',
        body: 'Một bài hướng dẫn đã lâu không ai xem lại sẽ nói rõ điều đó.',
      },
      {
        label: 'AI soạn nháp, con người thẩm định.',
        body: 'Công cụ soạn nháp giúp phần câu chữ. Mọi trang đã đăng đều được một người đọc, kiểm tra phép tính, đơn vị và các khẳng định.',
      },
    ],
    whoHeading: 'Ai vận hành trang này',
    whoBody:
      '{name}. {bio} {reviewerName} đọc phần nội dung tài chính của các bài hướng dẫn trước khi đăng. {whoEditorialLink} nêu những gì việc thẩm định kiểm tra trước khi một trang được đăng, và {whoCodeLink}: các công thức, kiểm thử đơn vị và các bước kiểm tra chặn một bản phát hành có trang bị lỗi.',
    whoEditorialLink: 'Trang biên tập',
    whoCodeLink: 'mã nguồn được công khai',
    howHeading: 'Các máy tính hoạt động thế nào',
    howBody:
      'Phép tính chạy trong trình duyệt của bạn. Không có máy chủ nào nhận những con số bạn gõ, và không có gì về một phép tính được gửi cho ai. Các công thức được cài đặt một lần, ở một chỗ, và được kiểm thử đơn vị đối chiếu với số liệu khoản vay đã công bố và với các bất biến mà toán học đòi hỏi — rằng tổng lịch trả nợ bằng số tiền vay, rằng khoản vay khép lại đúng bằng không, rằng số dư không lãi chỉ tăng bằng các khoản gửi vào.',
    correctionsHeading: 'Đính chính',
    correctionsBody:
      'Nếu một con số sai, một liên kết nguồn bị hỏng hoặc một trang tự mâu thuẫn, đó là lỗi và cần được sửa. {contactLink} nói cách báo lỗi, và mọi lần đính chính đều dẫn tới việc đổi ngày thẩm định chứ không phải sửa lặng lẽ.',
    contactLink: 'Trang liên hệ',
  },

  contact: {
    title: 'Liên hệ',
    emailLine: 'Gửi email tới {email}.',
    description:
      'Cách liên hệ với trang web về một con số sai, một liên kết hỏng, một chủ đề còn thiếu hoặc một vấn đề quảng cáo.',
    heading: 'Liên hệ',
    lede: 'Một địa chỉ, do một người đọc. Thư trả lời mất vài ngày, thường lâu hơn trong những tuần đầu sau khi một trang được đăng.',
    worthHeading: 'Những điều nên viết thư',
    worth: [
      {
        label: 'Một con số sai.',
        body: 'Nếu một con số trên trang không khớp với phép tính của chính bạn, hãy gửi dữ liệu bạn đã dùng và con số bạn nhận được. Đó là lỗi và sẽ được xem xét.',
      },
      {
        label: 'Một liên kết nguồn bị hỏng hoặc không còn.',
        body: 'Các nguồn được kiểm tra định kỳ, nhưng một liên kết có thể hỏng giữa hai lần kiểm tra.',
      },
      {
        label: 'Một chủ đề còn thiếu.',
        body: 'Các bài hướng dẫn được viết xoay quanh những phép tính người đọc thấy khó nhất, nên một chỗ trống thường là chỗ trống trong chính phép tính đó.',
      },
      {
        label: 'Một vấn đề quảng cáo.',
        body: 'Một quảng cáo gây hiểu lầm, làm hỏng trang hoặc che mất nội dung là điều nên báo. Trang web sống nhờ quảng cáo hiển thị, nên loại báo cáo này được xem xét nghiêm túc.',
      },
    ],
    nextHeading: 'Điều gì xảy ra tiếp theo',
    nextBody:
      'Một con số được báo sẽ được đối chiếu với nguồn, và trang sẽ thay đổi nếu con số sai. Ngày thẩm định trên trang thay đổi khi nội dung được kiểm tra, dù có gì thay đổi hay không, nên ngày đó cho bạn biết lần cuối một người đọc trang là khi nào.',
  },

  contactForm: {
    heading: 'Viết tin nhắn',
    lede: 'Biểu mẫu gửi tin nhắn tới người đọc thư của trang web này, và thư trả lời sẽ gửi tới địa chỉ bạn viết ở đây.',
    nameLabel: 'Tên của bạn',
    emailLabel: 'Địa chỉ email của bạn',
    subjectLabel: 'Chủ đề',
    messageLabel: 'Tin nhắn của bạn',
    submit: 'Gửi tin nhắn',
    note: 'Tin nhắn được gửi qua email và do một người đọc.',
    statuses: [
      { key: 'sent', text: 'Tin nhắn đã được gửi. Thư trả lời sẽ tới địa chỉ bạn đã viết.' },
      { key: 'email', text: 'Địa chỉ email này có vẻ chưa đầy đủ. Hãy kiểm tra rồi gửi lại tin nhắn.' },
      { key: 'fields', text: 'Ô nào cũng cần được điền.' },
      { key: 'rate', text: 'Đã có nhiều tin nhắn gửi từ địa chỉ này trong thời gian ngắn. Hãy đợi một phút rồi gửi lại.' },
      { key: 'failed', text: 'Tin nhắn chưa gửi được. Hãy viết thư tới địa chỉ ở trên.' },
    ],
  },

  sourcesPage: {
    title: 'Nguồn',
    description:
      'Mọi nguồn gốc mà trang web dựa vào cho số liệu và phương pháp, và lý do mỗi nguồn có mặt ở đây.',
    heading: 'Nguồn',
    lede: 'Mọi con số trên trang web này đều đến từ một trong các tổ chức dưới đây, hoặc từ phép tính mà trang web trình bày đầy đủ. Không có gì được trích từ bài blog, bản tóm tắt hay lời kể lại qua tay người khác.',
    whyHeading: 'Vì sao có danh sách nguồn',
    whyBody: [
      'Một con số không có nguồn chỉ là một lời khẳng định. Các trang này được viết cho những ai muốn tự kiểm tra phép tính, và điều đó chỉ khả thi khi dữ liệu gốc chỉ cách một cú nhấp chuột. Vì vậy mỗi bài hướng dẫn có danh sách nguồn riêng, và trang này là mục lục của tất cả.',
      'Quy tắc trang web tuân theo được cố ý giữ hẹp: các cơ quan chính phủ, cơ quan quản lý chứng khoán, ngân hàng trung ương và các doanh nghiệp cho vay mua nhà được chính phủ bảo trợ (GSE). Khi một con số đến từ một khảo sát thương mại, trang sẽ nói rõ và nêu tên khảo sát.',
    ],
    howHeading: 'Các nguồn được dùng thế nào',
    how: [
      {
        label: 'Phương pháp và công thức',
        body: 'đến từ cơ quan công bố phương pháp đó. Công thức trả dần có trong hướng dẫn của chính CFPB; quy tắc về tần suất nhập lãi đến từ bảng thuật ngữ của SEC; các ngưỡng thuế đến từ đợt điều chỉnh lạm phát hằng năm của IRS.',
      },
      {
        label: 'Số liệu thống kê đã công bố',
        body: 'đến từ cơ quan thống kê đã lập ra chúng, kèm ngày con số được đọc.',
      },
      {
        label: 'Lãi suất thị trường',
        body: 'đến từ khảo sát công bố chúng, và được ghi ngày trên trang, vì lãi suất của một tháng khác là một con số khác.',
      },
      {
        label: 'Số liệu tiểu bang',
        body: 'đến từ Tax Foundation, tổ chức tổng hợp các bậc thuế thu nhập từ luật và biểu mẫu của từng tiểu bang, và thuế suất bất động sản từ Khảo sát Cộng đồng Hoa Kỳ (American Community Survey) mà tổ chức này công bố. Bảng cho chủ hộ, khoản khấu trừ thuế liên bang đã nộp và các khoản tín thuế tiểu bang đến từ tờ khai và hướng dẫn của chính các tiểu bang.',
      },
    ],
    sources: [
      {
        label: 'Cục Bảo vệ Tài chính Người tiêu dùng (CFPB) — vay mua nhà, tín dụng tiêu dùng',
        url: 'https://www.consumerfinance.gov/',
      },
      {
        label: 'Sở Thuế vụ (IRS) — bậc thuế, điều chỉnh lạm phát, quy định hưu trí',
        url: 'https://www.irs.gov/',
      },
      {
        label: 'Cơ quan An sinh Xã hội (SSA) — thuế suất thuế lương, mức lương tính thuế, giới hạn hằng năm',
        url: 'https://www.ssa.gov/',
      },
      {
        label: 'Freddie Mac — Primary Mortgage Market Survey',
        url: 'https://www.freddiemac.com/pmms',
      },
      {
        label: 'Fannie Mae — nghiên cứu và bình luận thị trường',
        url: 'https://www.fanniemae.com/research-and-insights',
      },
      {
        label: 'Bộ Gia cư và Phát triển Đô thị (HUD) — FHA, HECM, nhà ở công bằng',
        url: 'https://www.hud.gov/',
      },
      {
        label: 'Cục Thống kê Lao động (BLS) — Chỉ số giá tiêu dùng',
        url: 'https://www.bls.gov/cpi/',
      },
      {
        label: 'Hội đồng Thống đốc Cục Dự trữ Liên bang — dữ liệu lãi suất (H.15)',
        url: 'https://www.federalreserve.gov/releases/h15/',
      },
      {
        label: 'Ủy ban Chứng khoán và Giao dịch (SEC) — Investor.gov',
        url: 'https://www.investor.gov/',
      },
      {
        label: 'Ngân hàng Dự trữ Liên bang St. Louis (FRED) — chuỗi dữ liệu kinh tế',
        url: 'https://fred.stlouisfed.org/',
      },
      {
        label: 'Cục Thống kê Lao động — máy tính CPI và bảng dữ liệu',
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
        label: 'Tax Foundation — Facts & Figures 2026, thuế suất thuế thu nhập cá nhân của tiểu bang tính đến 28 tháng 4 năm 2026',
        url: 'https://taxfoundation.org/data/all/state/2026-state-tax-data/',
      },
      {
        label: 'Hội nghị Quốc gia các Cơ quan Lập pháp Tiểu bang (NCSL) — tín thuế thu nhập lao động và tín thuế trẻ em của tiểu bang',
        url: 'https://www.ncsl.org/human-services/',
      },
      {
        label: 'Tax Policy Center — thuế suất và tín thuế thuế thu nhập tiểu bang',
        url: 'https://taxpolicycenter.org/',
      },
      {
        label: 'Prenatal-to-3 Policy Impact Center — chính sách tín thuế trẻ em của tiểu bang',
        url: 'https://pn3policy.org/',
      },
    ],
  },

  editorial: {
    title: 'Ban biên tập',
    description:
      'Ai viết các bài hướng dẫn, ai thẩm định chúng, và việc thẩm định thực sự kiểm tra những gì trước khi một trang được đăng.',
    heading: 'Ban biên tập',
    lede: 'Một người viết các bài hướng dẫn. Một người khác đọc phần nội dung tài chính của mỗi bài trước khi đăng. Trang này cho biết họ là ai, việc thẩm định kiểm tra những gì và những gì bạn có thể tự kiểm tra.',
    authorEyebrow: 'Tác giả',
    reviewerEyebrow: 'Người thẩm định tài chính',
    checkEyebrow: 'Những gì bạn có thể kiểm tra',
    checkHeading: 'Phép tính được công khai',
    checkBody:
      'Mã nguồn đằng sau mọi máy tính nằm trong một kho mã công khai, cùng với các công thức nó cài đặt, kiểm thử đơn vị đối chiếu chúng với số liệu đã công bố và các bước kiểm tra chặn một bản phát hành có trang bị lỗi. Các con số không đòi hỏi lòng tin, và cũng không cần hỏi ai cả.',
    openRepository: 'Mở kho mã',
    twoNamesHeading: 'Hai cái tên, hai công việc',
    twoNamesBody: [
      'Một người viết các bài hướng dẫn và duy trì bộ máy tính toán. Người kia đọc phần nội dung tài chính của bài hướng dẫn trước khi đăng, kiểm tra các con số, giả định đằng sau chúng và nguồn của chúng. Hai công việc được cố ý tách riêng: người viết một bài hướng dẫn không phải là người đọc lần cuối.',
      'Khi một bài hướng dẫn ghi tên người thẩm định, đó là người đã thẩm định bài đó, và tên này xuất hiện trên bài đó chứ không ở đâu khác. Một lần thẩm định là một khẳng định về một trang cụ thể, nên nó gắn với trang đó chứ không phải với toàn bộ trang web.',
      'Phần còn lại của trang này mô tả việc thẩm định kiểm tra những gì, và những gì người đọc có thể tự xác minh mà không cần hỏi ai.',
    ],
    reviewHeading: 'Việc thẩm định kiểm tra những gì',
    reviewIntro: 'Trước khi một bài hướng dẫn được đăng, người thẩm định lần lượt đi qua cùng một danh sách mỗi lần:',
    review: [
      {
        label: 'Phép tính.',
        body: 'Mọi công thức đều được đối chiếu với nguồn của nó, và ví dụ đã giải trong bài được tính lại từ đầu. Khi một con số xuất hiện trong mã, hai bên sẽ được so sánh.',
      },
      {
        label: 'Đơn vị.',
        body: 'Phần trăm với số thập phân, tháng với năm, đô la với nghìn đô la. Phần lớn lỗi trong một tài liệu tài chính là lỗi đơn vị.',
      },
      {
        label: 'Các trường hợp biên.',
        body: 'Lãi suất bằng không, kỳ hạn bằng không, giá trị âm. Từng trường hợp được kiểm tra để cho ra một câu trả lời hợp lý thay vì một thông báo lỗi.',
      },
      {
        label: 'Câu chữ.',
        body: 'Trang không được bảo người đọc phải làm gì. Nó giải thích một con số có nghĩa gì và phụ thuộc vào đâu, rồi dừng ở đó. Bài hướng dẫn nào khuyến khích một hành động sẽ được viết lại.',
      },
      {
        label: 'Nguồn.',
        body: 'Mỗi liên kết đều được mở, kiểm tra xem có đúng với khẳng định nó đi kèm không, và ghi ngày.',
      },
    ],
    toolsHeading: 'Công cụ soạn nháp được dùng thế nào',
    toolsBody: [
      'Công cụ soạn nháp giúp phần câu chữ. Chúng không quyết định một trang nói gì. Mọi con số, mọi công thức và mọi khẳng định đều do một người viết hoặc kiểm tra, và không trang nào được đăng nếu chưa qua việc thẩm định ở trên. Một công cụ đưa ra một con số nghe có vẻ hợp lý chính là thứ mà quy trình này tồn tại để bắt được.',
      'Bước kiểm tra bắt được nó không chỉ do con người. Bộ máy tính toán có kiểm thử đơn vị chạy ở mỗi lần thay đổi và chặn bản phát hành nếu một con số xê dịch: tổng lịch trả nợ phải bằng số tiền vay, khoản vay phải khép lại đúng bằng không, và dự phóng theo từng kỳ phải khớp với công thức dạng đóng ở mọi tần suất nhập lãi. Một đoạn văn không thể sai theo cách đó. Một công thức thì có thể, và khi điều đó xảy ra, quá trình build sẽ dừng.',
    ],
    datesHeading: 'Ngày thẩm định',
    datesBody:
      'Mọi bài hướng dẫn đều ghi ngày thẩm định lần cuối. Bài có nội dung phụ thuộc vào dữ liệu bên ngoài được thẩm định ít nhất hai lần một năm; bài giải thích phép tính được thẩm định khi công thức đằng sau thay đổi, và dù sao cũng mỗi năm một lần. Khi một trang được thẩm định, ngày sẽ thay đổi dù văn bản có đổi hay không, nên ngày đó cho bạn biết lần cuối một người đọc trang là khi nào.',
    correctionsHeading: 'Đính chính',
    correctionsBody:
      'Việc đính chính được thực hiện công khai. Một trang đã được đính chính sẽ cập nhật ngày thẩm định, và nội dung đính chính được mô tả trong chuỗi thư liên hệ đã dẫn tới nó. Một bài hướng dẫn có con số sai là lỗi của việc thẩm định chứ không phải của việc viết, và thứ thay đổi là quy trình thẩm định.',
    contactLink: 'liên hệ',
  },

  privacy: {
    title: 'Quyền riêng tư',
    description:
      'Trang web thu thập gì, không thu thập gì, và những nhà cung cấp quảng cáo và phân tích nào xuất hiện trên các trang.',
    heading: 'Quyền riêng tư',
    lede: 'Nói ngắn gọn: những con số bạn gõ vào máy tính nằm lại trong trình duyệt của bạn, và bản thân trang web không giữ cookie theo dõi nào.',
    calculatorsHeading: 'Các máy tính làm gì với dữ liệu bạn nhập',
    calculatorsBody:
      'Không làm gì cả. Phép tính chạy trong trình duyệt của bạn bằng JavaScript tải xuống cùng trang. Các giá trị bạn nhập không được truyền đi đâu, không được lưu và không hiển thị với trang web hay bất kỳ ai khác. Đóng thẻ là chúng bị xóa.',
    stateHeading: 'Tiểu bang của bạn',
    stateBody:
      'Hai trong số các máy tính cần số liệu tiểu bang: máy tính thuế thu nhập liên bang, cộng thêm thuế thu nhập tiểu bang vào thuế liên bang, và máy tính thuê hay mua, tính thuế bất động sản vào chi phí sở hữu nhà. Khi một trong các trang đó mở ra, nó hỏi trang web này yêu cầu đến từ tiểu bang nào. Câu trả lời đến từ mạng phục vụ trang web, mạng này đọc tiểu bang từ địa chỉ của yêu cầu, và câu trả lời được dùng để điền một ô. Ngoài ra không có gì xảy ra với nó: câu trả lời không được lưu, không ghi vào cookie và không gửi cho Google hay phân tích trang của nhà cung cấp lưu trữ. Tiểu bang chỉ là ước chừng — VPN, proxy hoặc mạng di động có thể trỏ sai tiểu bang — và ô được điền có thể sửa hoặc xóa, khi đó trang giữ con số bạn đã gõ.',
    cookiesHeading: 'Cookie',
    cookiesBody:
      '{name} không đặt cookie riêng. Phân tích của chính trang web chạy trên Google Analytics 4, do Google phục vụ từ tên miền của mình và lưu một mã định danh bên thứ nhất trong trình duyệt của bạn để phân biệt lượt truy cập này với lượt sau. Mã định danh đó không dùng cho quảng cáo và không chia sẻ với trang web khác. Phân tích trang của nhà cung cấp lưu trữ không lưu gì trong trình duyệt của bạn: không cookie, không bộ nhớ cục bộ, không mã định danh nào.',
    advertisingHeading: 'Quảng cáo',
    advertisingBody:
      'Trang web sống nhờ quảng cáo hiển thị do Google AdSense phân phối. Google và các đối tác có thể đặt cookie hoặc dùng công nghệ tương tự để phân phối và đo lường quảng cáo, và có thể dùng chúng để hiển thị quảng cáo dựa trên các lần bạn đã truy cập trang này hoặc trang khác. Bạn có thể xem và thay đổi lựa chọn của mình tại {adsSettingsLink}, và lời giải thích của chính Google về cách họ dùng dữ liệu từ các trang web và ứng dụng sử dụng dịch vụ của họ có tại {policiesLink}.',
    adsSettingsLink: 'Cài đặt quảng cáo của Google',
    policiesLink: 'policies.google.com',
    analyticsPoliciesLink: 'policies.google.com',
    analyticsHeading: 'Phân tích',
    analyticsBody:
      'Lượt xem trang được ghi lại bằng Google Analytics 4, do Google phục vụ từ googletagmanager.com. Dữ liệu được dùng chỉ giới hạn ở trang, nguồn giới thiệu và vị trí ước chừng ở cấp quốc gia hoặc thành phố; địa chỉ IP bị cắt bớt chứ không lưu đầy đủ. Nó được dùng để đếm lượt truy cập và tìm hiểu trang nào được đọc. Lời giải thích của chính Google về cách họ dùng dữ liệu từ các trang web và ứng dụng sử dụng dịch vụ của họ có tại {analyticsPoliciesLink}. Mã kịch bản chỉ được tải sau khi bạn chấp nhận cookie, và cũng được tải cho người đọc ở Liên minh châu Âu.',
    hostingAnalyticsHeading: 'Lưu trữ và hiệu năng trang',
    hostingAnalyticsBody:
      'Trang web được lưu trữ trên Cloudflare, và Web Analytics của chính Cloudflare chạy trên mọi trang. Một đoạn mã nhỏ phục vụ từ static.cloudflareinsights.com đo lượt xem trang: trang nào được mở, lượt truy cập đến từ đâu, trình duyệt và hệ điều hành nào được dùng, yêu cầu đến từ quốc gia nào, và trang tải mất bao lâu. Địa chỉ IP được dùng tại biên mạng của Cloudflare để xác định quốc gia và bị loại bỏ ở đó chứ không được lưu. Đoạn mã không đặt cookie, không ghi gì vào bộ nhớ cục bộ và không tạo mã định danh nào có thể theo bạn từ trang này sang trang khác. Kết quả thu được là số lượt xem trang, số lượt truy cập và số đo tốc độ tải trang. Đoạn mã chỉ được tải sau khi bạn chấp nhận cookie. Người đọc ở Liên minh châu Âu hoàn toàn không được đếm: đoạn mã không được tải cho họ.',
    newsletterHeading: 'Bản tin',
    newsletterBody:
      'Nếu bạn đăng ký bản tin, địa chỉ bạn nhập sẽ được gửi tới Buttondown, dịch vụ gửi thư, và được lưu ở đó để có thể gửi bản tin. Địa chỉ đó chỉ dùng cho bản tin và không dùng cho việc gì khác, và mỗi số đều có liên kết hủy đăng ký.',
    contactHeading: 'Biểu mẫu liên hệ',
    contactBody:
      'Nếu bạn viết tin nhắn qua biểu mẫu liên hệ, tên, địa chỉ email, chủ đề và chính tin nhắn được gửi qua email tới người vận hành trang web và được giữ trong hộp thư đó. Biểu mẫu do trang web này phục vụ và thư trả lời gửi tới địa chỉ bạn đã viết, để bạn có thể tiếp tục trao đổi. Biểu mẫu không gửi gì cho Google và không đặt cookie riêng; các đoạn mã quảng cáo và phân tích mô tả ở trên thuộc về toàn bộ trang và chỉ được tải nếu bạn đã chấp nhận cookie. Không có gì bạn gõ được lưu trên chính trang web, và tin nhắn không được chuyển cho ai khác.',
    thirdPartyHeading: 'Liên kết bên thứ ba',
    thirdPartyBody:
      'Các bài hướng dẫn dẫn tới nguồn gốc — các cơ quan chính phủ, SEC, Cục Dự trữ Liên bang. Những trang đó có chính sách quyền riêng tư riêng, mà trang web này không kiểm soát và chưa đọc thay bạn.',
    changesHeading: 'Thay đổi',
    changesBody:
      'Nếu các nhà cung cấp ở trên thay đổi, trang này sẽ thay đổi theo. Ngày ở cuối trang là ngày văn bản này được thẩm định lần cuối.',
    consentHeading: 'Lựa chọn của bạn',
    consentBody:
      'Không có gì được tải từ Google, và phân tích trang của nhà cung cấp lưu trữ vẫn tắt, cho đến khi bạn trả lời. Nếu bạn chấp nhận, các đoạn mã quảng cáo và phân tích được tải và câu trả lời được ghi nhớ trong trình duyệt của bạn; nếu bạn từ chối, trang web vẫn hoạt động y như vậy và không có gì được tải. Với người đọc ở Liên minh châu Âu, phân tích trang của nhà cung cấp lưu trữ không được bật, dù câu trả lời là gì. Liên kết "{settingsLink}" ở chân trang mở lại câu hỏi. Một ngoại lệ: trình thu thập dữ liệu của chính Google, công cụ kiểm tra xem trang web có quảng cáo hay không, được nhận thẳng đoạn mã quảng cáo vì nó không thể trả lời câu hỏi. Không có lựa chọn nào được ghi lại cho nó và không có gì được lưu về nó. Tiểu bang mô tả ở trên được đọc trên hai trang máy tính và không thuộc lựa chọn này: không có cookie nào được đặt cho nó và không có gì về nó đến tay nhà cung cấp phân tích.',
    lastReviewed: 'Thẩm định lần cuối: {date}.',
  },

  terms: {
    title: 'Điều khoản',
    description:
      'Các điều khoản theo đó trang web này được đăng, những gì các máy tính bao gồm và không bao gồm, và giới hạn của những gì trang web có thể hứa.',
    heading: 'Điều khoản sử dụng',
    lede: 'Điều khoản đơn giản cho một trang web đăng các phép tính chứ không phải lời khuyến nghị.',
    providesHeading: 'Trang web này cung cấp gì',
    providesBody:
      '{name} đăng các máy tính và lời giải thích bằng văn bản về phép tính đằng sau chúng. Các máy tính áp dụng những công thức đã công bố vào các giá trị bạn nhập và trả lại kết quả cùng với cách tính. Đó là toàn bộ dịch vụ.',
    notProvidesHeading: 'Trang web này không cung cấp gì',
    notProvidesBody: [
      'Không có gì ở đây là lời khuyên tài chính, thuế, pháp lý hay đầu tư, và không có gì ở đây là khuyến nghị mua, bán, giữ, thuê, sở hữu, tái cấp vốn hay ký bất cứ thứ gì. Một kết quả phản ánh dữ liệu bạn nhập và công thức trên trang. Đổi một dữ liệu đầu vào thì kết quả đổi theo; chính điều đó khiến nó là một phép tính chứ không phải một kết luận.',
      'Một máy tính không thấy được tình hình tài chính, thu nhập, tín dụng, khoảng thời gian hay mức chấp nhận rủi ro của bạn, và nó không cố đoán. Hai người có cùng dữ liệu đầu vào nhưng hoàn cảnh khác nhau sẽ đi tới những kết luận khác nhau, và máy tính không ở vị trí để nói ai trong hai người đúng.',
    ],
    figuresHeading: 'Số liệu, nguồn và ngày',
    figuresBody:
      'Khi một con số đến từ nguồn bên ngoài, trang sẽ dẫn tới nguồn đó và ghi ngày nó được đọc. Dữ liệu bên ngoài thay đổi: ngưỡng thuế, lãi suất đã công bố và số liệu thống kê chính thức đều được điều chỉnh. Một con số trên trang chính xác tính đến ngày thẩm định của trang đó và không lâu hơn, và ngày thẩm định ở đó để bạn thấy nó đã cũ đến đâu.',
    errorsHeading: 'Sai sót',
    errorsBody:
      'Các phép tính được cài đặt một lần, ở một chỗ, và đã được kiểm thử. Dù vậy, sai sót vẫn có thể xảy ra. Nếu bạn tìm thấy một lỗi, trang liên hệ giải thích cách báo, và các lỗi được báo sẽ được sửa và ngày thẩm định được cập nhật.',
    advertisingHeading: 'Quảng cáo',
    advertisingBody:
      'Trang web sống nhờ quảng cáo hiển thị. Quảng cáo do một bên thứ ba phân phối và không nằm trong tầm kiểm soát của trang web. Quảng cáo được gắn nhãn và tách biệt khỏi nội dung của chính trang web. Không nhà quảng cáo nào trả tiền cho một trang, một vị trí, một chỗ trong kết quả tìm kiếm hay việc nhắc tới một sản phẩm trong bài hướng dẫn.',
    useHeading: 'Sử dụng trang web',
    useBody:
      'Trang web được đăng cho mục đích cá nhân. Bạn có thể đọc, in và dẫn liên kết tới nó. Bạn không được đăng lại những phần đáng kể của các bài hướng dẫn như tác phẩm của mình, hoặc dùng các máy tính để xây dựng một sản phẩm cạnh tranh với trang web.',
    changesHeading: 'Thay đổi',
    changesBody:
      'Các điều khoản này có thể thay đổi khi trang web thay đổi. Ngày thẩm định dưới đây là ngày văn bản này được đọc lần cuối.',
    lastReviewed: 'Thẩm định lần cuối: {date}.',
    contactLink: 'trang liên hệ',
  },

  notFound: {
    title: 'Không tìm thấy trang',
    description: 'Trang đó không có trên trang web này. Đây là nơi mọi thứ thực sự nằm.',
    heading: 'Không tìm thấy trang',
    lede: 'Địa chỉ đó không có ở đây. Mọi thứ trang web đăng đều là các máy tính, các bài hướng dẫn đằng sau chúng, hoặc các trang giải thích các con số đến từ đâu.',
    calculators: {
      title: 'Máy tính',
      text: 'Khoản trả góp vay mua nhà, thuê hay mua, lãi kép.',
    },
    guides: {
      title: 'Hướng dẫn',
      text: 'Phép tính đằng sau mỗi máy tính, chi tiết.',
    },
    sources: {
      title: 'Nguồn',
      text: 'Mọi nguồn gốc trang web dựa vào.',
    },
    contact: {
      title: 'Liên hệ',
      text: 'Cho chúng tôi biết còn thiếu gì hoặc sai ở đâu.',
    },
  },

  tool: {
    'mortgage-payment': {
      name: 'Máy tính khoản trả góp vay mua nhà',
      title: 'Máy tính khoản trả góp vay mua nhà kèm lịch trả dần',
      description:
        'Tính khoản trả góp vay mua nhà hằng tháng, tổng chi phí PITI và lịch trả dần đầy đủ. Xem từng đô la tiền lãi và cách các khoản trả thêm đẩy sớm ngày tất toán.',
      short: 'Gốc và lãi hằng tháng, PITI đầy đủ, lịch trả dần và tác động của các khoản trả thêm.',
      category: 'Nhà ở',
      methodNote:
        'Công thức tính khoản trả, lịch trả dần và cách áp dụng các khoản trả thêm được mô tả bên dưới. Không có gì trên trang này là báo giá thị trường theo thời gian thực.',
      fields: {
        homePrice: 'Giá nhà',
        downPayment: 'Trả trước',
        percentOfPrice: 'phần trăm giá',
        interestRate: 'Lãi suất',
        annualFixed: 'hằng năm, cố định',
        loanTerm: 'Kỳ hạn vay',
        propertyTax: 'Thuế bất động sản',
        percentOfPricePerYear: '% giá mỗi năm',
        homeInsurance: 'Bảo hiểm nhà',
        perYear: 'mỗi năm',
        hoaFee: 'Phí HOA hoặc phí chung cư',
        perMonth: 'mỗi tháng',
        extraPrincipal: 'Trả thêm vào gốc',
        firstPayment: 'Lần trả đầu tiên',
        month: 'tháng',
        seeAmortization: 'Xem lịch trả dần theo từng năm',
      },
      terms: {
        years: (n: number) => `${n} năm`,
      },
      table: {
        year: 'Năm',
        principal: 'Gốc',
        interest: 'Lãi',
        balance: 'Dư nợ',
      },
      result: {
        headlineLabel: 'Tổng khoản trả hằng tháng (PITI)',
        principalAndInterest: 'Gốc và lãi',
        propertyTax: 'Thuế bất động sản',
        insurance: 'Bảo hiểm',
        hoa: 'HOA',
        totalInterest: 'Tổng tiền lãi',
        paidOff: 'Tất toán',
        note: 'Gốc, lãi, thuế bất động sản, bảo hiểm và HOA, theo các con số bạn đã nhập.',
      },
      resultNote:
        'Đổi bất kỳ ô nào và các con số cập nhật ngay khi bạn gõ. Không có gì được gửi đi đâu: phép tính chạy ngay trong trang này.',
      chart: {
        title: 'Dư nợ và tiền lãi theo từng năm',
        note: 'Dư nợ giảm dần khi khoản vay được trả, và tiền lãi trả mỗi năm cũng giảm theo.',
        xAxis: 'years',
        series: [
          { key: 'balance', label: 'Dư nợ' },
          { key: 'interest', label: 'Tiền lãi đã trả' },
        ],
      },
      formula: 'M = P · r(1 + r)ⁿ / ((1 + r)ⁿ − 1)',
      method: [
        'Khoản trả hằng tháng theo lịch được tính bằng công thức trả dần tiêu chuẩn:',
        'P là số tiền vay, trang này tính bằng giá nhà trừ khoản trả trước. r là lãi suất năm bạn nhập chia cho mười hai, và n là kỳ hạn tính bằng tháng. Từ con số duy nhất đó, máy tính dựng lịch từng tháng: lãi được tính trên dư nợ còn lại vào đầu tháng, và phần còn lại của khoản trả sau khi trừ tiền lãi đó sẽ làm giảm dư nợ.',
        'Khoản trả hằng tháng đầy đủ là phần gốc và lãi cộng với thuế bất động sản chia mười hai, bảo hiểm chia mười hai và phí HOA nếu có. Ba khoản này do bạn đặt: máy tính không biết cơ quan định giá địa phương hay công ty bảo hiểm của bạn thu bao nhiêu, và nó không đoán thay bạn.',
        'Một khoản trả thêm hằng tháng được áp vào gốc, nên nó làm giảm dư nợ mà tiền lãi tháng sau được tính trên đó. Khoản trả theo lịch không đổi, khoản vay kết thúc sớm hơn và tổng tiền lãi giảm.',
      ],
      limits: [
        'Nó không kiểm tra xem bạn có đủ điều kiện vay hay không, và không xem điểm tín dụng, thu nhập, tỷ lệ nợ trên thu nhập hay quy tắc thẩm định của bất kỳ bên cho vay nào.',
        'Nó không báo lãi suất thị trường hiện tại cho mã bưu chính của bạn. Lãi suất bạn nhập là lãi suất được dùng, và không có gì trên trang này là theo thời gian thực.',
        'Nó không tính bảo hiểm khoản vay tư nhân, điểm phí, phí khởi tạo khoản vay, chi phí hoàn tất giao dịch, hay lịch tài khoản ký quỹ (escrow) quyết định hóa đơn thuế rơi vào tháng nào.',
        'Nó không cho bạn biết có nên mua nhà hay không. Nó đưa ra một con số và cách tính đằng sau con số đó.',
      ],
      faq: [
        {
          q: 'PITI là viết tắt của gì?',
          a: 'Principal, Interest, Taxes and Insurance — gốc, lãi, thuế và bảo hiểm. Đó là khoản chi nhà ở hằng tháng gồm bốn phần: phần trả khoản vay, phần trả cho bên cho vay vì đã cho vay, thuế bất động sản và bảo hiểm nhà. Máy tính này hiển thị riêng từng phần để bạn thấy điều gì tạo nên tổng số.',
        },
        {
          q: 'Khoản gốc và lãi hằng tháng được tính thế nào?',
          a: 'Bằng công thức trả dần tiêu chuẩn: M = P · r(1 + r)ⁿ / ((1 + r)ⁿ − 1), trong đó P là số tiền vay, r là lãi suất tháng và n là số lần trả hằng tháng. Lịch trả theo sau nó làm phần lãi giảm và phần gốc tăng mỗi tháng, nên các khoản trả đầu tiên chủ yếu là tiền lãi.',
        },
        {
          q: 'Khoản trả cuối cùng thì sao?',
          a: 'Khoản trả theo lịch được làm tròn đến cent gần nhất, khiến vài cent còn lại vào cuối kỳ hạn. Khoản trả theo lịch cuối cùng được điều chỉnh để khoản vay khép lại đúng bằng không, giống cách bên cho vay điều chỉnh khoản trả cuối.',
        },
        {
          q: 'Các khoản trả thêm rút ngắn khoản vay hay giảm khoản trả?',
          a: 'Chúng rút ngắn khoản vay. Một khoản trả thêm được áp vào gốc, làm giảm dư nợ mà tiền lãi tháng sau được tính trên đó. Khoản trả theo lịch giữ nguyên, và khoản vay kết thúc sớm hơn với tổng tiền lãi ít hơn.',
        },
        {
          q: 'Tổng tiền lãi có bị ảnh hưởng bởi thuế và bảo hiểm tôi nhập không?',
          a: 'Không. Tổng tiền lãi chỉ tính cho khoản vay. Thuế bất động sản, bảo hiểm và HOA là chi phí nhà ở vẫn tiếp tục sau khi khoản vay được trả hết, vì vậy máy tính báo tổng chi phí nhà ở riêng.',
        },
        {
          q: 'Máy tính có tính đến lạm phát không?',
          a: 'Không. Mọi con số đều tính bằng đô la bạn nhập. Một khoản trả góp sau 30 năm chiếm tỷ lệ thu nhập nhỏ hơn nhiều so với cùng khoản trả đó hôm nay, và không con số nào trên trang này điều chỉnh cho điều đó.',
        },
      ],
      sources: [
        {
          label: 'CFPB — Cách tính khoản trả góp vay mua nhà',
          url: 'https://www.consumerfinance.gov/ask-cfpb/how-do-i-calculate-my-mortgage-payment-en-144/',
        },
        {
          label: 'Freddie Mac — Primary Mortgage Market Survey (phương pháp tính lãi suất)',
          url: 'https://www.freddiemac.com/pmms',
        },
        {
          label: 'HUD — yêu cầu khoản vay FHA và bảo hiểm khoản vay mua nhà',
          url: 'https://www.hud.gov/helping_american_homeowners',
        },
        {
          label: 'BLS — Chỉ số giá tiêu dùng (lạm phát, cho ghi chú về giá trị thực)',
          url: 'https://www.bls.gov/cpi/',
        },
      ],
      relatedGuides: [
        { slug: 'mortgage-payment-calculator-explained', title: 'Giải thích máy tính khoản trả góp vay mua nhà' },
        { slug: 'how-mortgage-amortization-works', title: 'Trả dần khoản vay mua nhà hoạt động thế nào' },
        { slug: 'monthly-payment-vs-total-cost-mortgage', title: 'Khoản trả hằng tháng và tổng chi phí khoản vay' },
        { slug: 'extra-mortgage-payments-math', title: 'Toán học đằng sau các khoản trả thêm' },
        { slug: 'how-to-read-an-amortization-schedule', title: 'Cách đọc lịch trả dần' },
      ],
    },

    'rent-vs-buy': {
      name: 'Máy tính thuê hay mua',
      title: 'Thuê hay mua: so sánh chi phí thực',
      description:
        'So sánh thuê và sở hữu bằng con số: chi phí hằng tháng, khoản chi ban đầu, giá trị tài sản ròng và tháng mà hai con đường giao nhau. Không phán quyết, chỉ có phép tính.',
      short: 'Chi phí hằng tháng, khoản chi ban đầu, tích lũy giá trị ròng và tháng giao nhau.',
      category: 'Nhà ở',
      methodNote:
        'Phép so sánh là dòng tiền chi ra và giá trị ròng. Nó cố ý không đưa ra phán quyết — tháng giao nhau là một sự thật về các con số bạn nhập, không phải khuyến nghị.',
      sections: {
        theHome: 'Căn nhà',
        theRent: 'Tiền thuê',
        runningCosts: 'Chi phí thường xuyên',
        assumptions: 'Giả định',
      },
      fields: {
        purchasePrice: 'Giá mua',
        downPayment: 'Trả trước',
        percentOfPrice: 'phần trăm giá',
        mortgageRate: 'Lãi suất vay mua nhà',
        annualFixed: 'hằng năm, cố định',
        loanTerm: 'Kỳ hạn vay',
        monthlyRent: 'Tiền thuê hằng tháng',
        rentersInsurance: 'Bảo hiểm người thuê',
        perMonth: 'mỗi tháng',
        propertyTax: 'Thuế bất động sản',
        percentOfPricePerYear: '% giá mỗi năm',
        homeInsurance: 'Bảo hiểm nhà',
        perYear: 'mỗi năm',
        hoaFee: 'Phí HOA hoặc phí chung cư',
        maintenance: 'Bảo trì',
        annualChangeInValue: 'Thay đổi giá trị hằng năm',
        negativeModelsAFall: 'số âm mô phỏng giảm giá',
        compareOver: 'So sánh trong',
        closingCosts: 'Chi phí hoàn tất giao dịch',
        percentOfPriceOnce: '% giá, một lần',
        sellingCosts: 'Chi phí bán',
        percentOfFinalValue: '% giá trị cuối kỳ',
      },
      terms: {
        years: (n: number) => `${n} năm`,
      },
      result: {
        headlineLabel: 'Chênh lệch hằng tháng (sở hữu trừ thuê)',
        monthlyRent: 'Tiền thuê hằng tháng',
        monthlyOwnership: 'Chi phí sở hữu hằng tháng',
        monthlyOwnershipAfterLoan: 'Chi phí sở hữu hằng tháng sau khi trả hết khoản vay',
        upfrontOutlay: 'Khoản chi ban đầu',
        equityBuilt: 'Giá trị ròng tích lũy',
        homeValueAtHorizon: 'Giá trị nhà cuối kỳ',
        sellingCostsAtHorizon: 'Chi phí bán cuối kỳ',
        netCostAtHorizon: 'Chi phí sở hữu ròng cuối kỳ',
        crossover: 'Điểm giao nhau',
        note: 'Chi phí sở hữu gồm khoản trả góp trong thời gian vay, cùng thuế bất động sản, bảo hiểm, HOA và bảo trì cả sau đó. Giá trị ròng là giá trị nhà trừ dư nợ còn lại, trừ thêm chi phí của một lần bán vào thời điểm đó.',
      },
      resultNote:
        'Điểm giao nhau là tháng đầu tiên mà chi phí sở hữu ròng — tiền đã trả trừ giá trị ròng một lần bán sẽ để lại — xuống thấp hơn chi phí tiền mặt của việc thuê. Đó là một sự thật về các con số này, không phải khuyến nghị.',
      chart: {
        title: 'Chi phí thuê so với chi phí sở hữu',
        note: 'Cả hai đường đều là tiền mặt cộng dồn: tiền thuê đã trả, và tiền chi cho căn nhà sau khi trừ giá trị ròng nó tạo ra, đã trừ chi phí của một lần bán vào thời điểm đó.',
        xAxis: 'years',
        series: [
          { key: 'rent', label: 'Tiền thuê đã trả' },
          { key: 'ownership', label: 'Chi phí sở hữu ròng' },
        ],
      },
      method: [
        'Mỗi tháng, máy tính ghi hai sổ song song. Sổ thuê cộng tiền thuê và bảo hiểm người thuê. Sổ sở hữu cộng khoản trả góp theo công thức trả dần tiêu chuẩn, thuế bất động sản, bảo hiểm, HOA và khoản dự phòng bảo trì, cộng thêm khoản trả trước và chi phí hoàn tất giao dịch ở tháng đầu tiên. Khoản trả góp dừng khi khoản vay được trả hết; các chi phí thường xuyên khác tiếp tục chừng nào bạn còn sở hữu căn nhà.',
        'Song song với sổ thứ hai, máy tính theo dõi giá trị căn nhà, tăng hoặc giảm mỗi tháng theo tỷ lệ hằng năm bạn nhập, và dư nợ còn lại của khoản vay. Chênh lệch giữa hai con số đó là giá trị ròng của bạn:',
        'Chi phí sở hữu ròng là số tiền bạn đã trả, trừ giá trị ròng đã tích lũy, cộng chi phí của một lần bán vào thời điểm đó. Tháng giao nhau là tháng đầu tiên con số này thấp hơn tiền thuê bạn lẽ ra đã trả trong cùng thời gian. Chi phí bán không nằm trong khoản trả hằng tháng, vì bạn chỉ trả khi bán; chúng đi cùng giá trị ròng, nơi việc bán diễn ra.',
      ],
      formula: 'giá trị ròng = giá trị nhà − dư nợ còn lại',
      limits: [
        'Nó không nói lựa chọn nào tốt hơn cho bạn. Hai con đường được so sánh bằng các con số bạn cung cấp và tháng giao nhau được báo ra, không gì hơn.',
        'Nó không tính thuế khi bán nhà, khoản khấu trừ lãi vay mua nhà hay khấu hao bất động sản theo thời gian.',
        'Nó không định giá một khoản vay cụ thể. Lãi suất vay bạn nhập là lãi suất được dùng; trang không có báo giá theo thời gian thực hay thông tin bên cho vay.',
        'Nó không dự báo giá nhà. Mức thay đổi giá trị hằng năm bạn nhập được áp dụng từng tháng trong suốt thời gian so sánh, theo cả hai chiều nếu bạn nhập số âm.',
        'Nó không tính chi phí dọn ra khỏi nhà thuê. Tiền đặt cọc, phí môi giới và chi phí chuyển nhà nằm ngoài phép so sánh ở phía thuê.',
        'Nó không dùng thuế suất của một quận hay thành phố cụ thể. Thuế suất bất động sản mà trang có thể điền là mức trung bình của tiểu bang, và thuế bất động sản do địa phương quy định, nên thuế suất ở một khu vực thường khác với khu vực bên cạnh.',
      ],
      faq: [
        {
          q: 'Tháng giao nhau có nghĩa là gì?',
          a: 'Đó là tháng đầu tiên mà chi phí sở hữu ròng — số tiền bạn đã trả, trừ giá trị ròng đã tích lũy, cộng chi phí của một lần bán vào thời điểm đó — thấp hơn số tiền bạn lẽ ra đã trả tiền thuê trong cùng thời gian. Trước thời điểm đó, thuê tốn ít tiền mặt hơn. Sau đó, sở hữu tốn ít hơn khi tính cả giá trị ròng.',
        },
        {
          q: 'Vì sao phép tính có khoản dự phòng bảo trì?',
          a: 'Một căn nhà tốn tiền sửa chữa dù có khoản vay hay không, và chi phí đó không xuất hiện trên bất kỳ giấy tờ hoàn tất giao dịch nào. Máy tính áp dụng nó theo phần trăm giá mua mỗi năm, và phần trăm đó là dữ liệu do bạn đặt.',
        },
        {
          q: 'Giá trị căn nhà trong phép tính thay đổi thế nào?',
          a: 'Nó tăng hoặc giảm mỗi tháng theo tỷ lệ hằng năm bạn nhập, rồi được so với dư nợ còn lại để ra con số giá trị ròng. Tỷ lệ âm mô phỏng thị trường đi xuống; tỷ lệ bằng không giữ giá không đổi.',
        },
        {
          q: 'Có tính chi phí bán không?',
          a: 'Có. Chi phí bán được tính trên giá nhà vào thời điểm bán, nên không nằm trong khoản trả hằng tháng. Chúng làm giảm giá trị ròng một lần bán sẽ để lại, và vì vậy là một phần của chi phí sở hữu ròng và của tháng giao nhau. Con số này được báo riêng ở cuối kỳ.',
        },
        {
          q: 'Khoản trả góp thì sao sau khi trả hết khoản vay?',
          a: 'Nó dừng lại. Gốc và lãi của khoản vay kết thúc cùng khoản vay, còn thuế bất động sản, bảo hiểm, HOA và bảo trì tiếp tục chừng nào bạn còn sở hữu căn nhà. Khi thời gian so sánh vượt quá kỳ hạn vay, các tháng sau đó chỉ tính chi phí thường xuyên.',
        },
        {
          q: 'Tổng tiền thuê khác chi phí sở hữu ròng thế nào?',
          a: 'Tổng tiền thuê đơn giản là tiền thuê hằng tháng nhân với số tháng. Chi phí sở hữu ròng là những gì bạn trả cho khoản vay, thuế, bảo hiểm, HOA và bảo trì, cộng khoản chi ban đầu, trừ giá trị ròng đã tích lũy, cộng chi phí bán. Con số thứ hai có thể âm, nghĩa là bạn đã tích lũy giá trị ròng nhiều hơn số tiền đã chi ra.',
        },
        {
          q: 'Phép tính có bao gồm hệ quả thuế của việc bán nhà không?',
          a: 'Không. Mọi khoản lãi khi bán, và mọi khoản miễn trừ áp dụng cho nó, đều nằm ngoài phạm vi công cụ này. Phép so sánh ở đây là so sánh tiền mặt và giá trị ròng, không phải so sánh thuế.',
        },
        {
          q: 'Thuế suất bất động sản lấy từ đâu?',
          a: 'Đó là một dữ liệu đầu vào. Khi mạng xác định được yêu cầu đến từ tiểu bang nào, trang sẽ điền ô này bằng thuế suất bất động sản thực tế trung bình của tiểu bang đó, lấy từ Khảo sát Cộng đồng Hoa Kỳ năm 2024 và được Tax Foundation công bố cho năm 2026. Thuế bất động sản do chính quyền địa phương quy định, nên thuế suất ở một quận hay thành phố cụ thể thường khác mức trung bình của tiểu bang, và ô này vẫn sửa được.',
        },
      ],
      sources: [
        {
          label: 'CFPB — chi phí nhà ở, thuê và sở hữu',
          url: 'https://www.consumerfinance.gov/consumer-tools/mortgages/',
        },
        {
          label: 'HUD — chi phí nhà ở, thuế bất động sản và hướng dẫn về bảo hiểm',
          url: 'https://www.hud.gov/helping_american_homeowners',
        },
        {
          label: 'BLS — Chỉ số giá tiêu dùng (lạm phát, cho ghi chú về tăng giá)',
          url: 'https://www.bls.gov/cpi/',
        },
        {
          label: 'FRED — chuỗi chỉ số giá nhà dùng cho biến động giá dài hạn',
          url: 'https://fred.stlouisfed.org/series/HPINUS',
        },
        {
          label: 'Tax Foundation — Property Taxes by State and County, 2026',
          url: 'https://taxfoundation.org/data/all/state/property-taxes-by-state-county/',
        },
      ],
      relatedGuides: [
        { slug: 'rent-vs-buy-calculator-explained', title: 'Giải thích máy tính thuê hay mua' },
        { slug: 'rent-vs-buy-common-mistakes', title: 'Những sai lầm thường gặp khi so sánh thuê và mua' },
        { slug: 'estimating-property-tax-and-home-insurance', title: 'Ước tính thuế bất động sản và bảo hiểm nhà' },
        { slug: 'down-payment-and-closing-costs-explained', title: 'Giải thích khoản trả trước và chi phí hoàn tất giao dịch' },
        { slug: 'monthly-payment-vs-total-cost-mortgage', title: 'Khoản trả hằng tháng và tổng chi phí khoản vay' },
      ],
      script: {
        notWithinHorizon: 'Không nằm trong thời gian so sánh',
        month: 'Tháng {n}',
        propertyTaxDetected: 'Đã điền theo {state}: thuế suất bất động sản thực tế trung bình của tiểu bang.',
      },
    },

    'compound-interest': {
      name: 'Máy tính lãi kép',
      title: 'Máy tính lãi kép với khoản góp hằng tháng',
      description:
        'Dự phóng số dư với các khoản góp đều đặn, chọn tần suất nhập lãi và xem kết quả theo đô la hôm nay sau lạm phát. Có trình bày công thức.',
      short: 'Số dư, tiền góp, tiền lãi nhận được và giá trị đã điều chỉnh lạm phát.',
      category: 'Đầu tư',
      methodNote:
        'Dự phóng chạy từng kỳ một, nên bảng theo năm được tạo ra bởi cùng phép tính tạo ra con số cuối cùng.',
      fields: {
        startingBalance: 'Số dư ban đầu',
        today: 'hôm nay',
        monthlyContribution: 'Góp hằng tháng',
        addedEachMonth: 'thêm vào mỗi tháng',
        interestRate: 'Lãi suất',
        annualNominal: 'hằng năm, danh nghĩa',
        time: 'Thời gian',
        years: 'năm',
        compounding: 'Nhập lãi',
        contributionTiming: 'Thời điểm góp',
        inflation: 'Lạm phát',
        annualForRealValue: 'hằng năm, cho giá trị thực',
        seeBalance: 'Xem số dư theo từng năm',
      },
      frequencies: {
        monthly: 'Hằng tháng',
        quarterly: 'Hằng quý',
        twiceAYear: 'Hai lần một năm',
        annually: 'Hằng năm',
        everyTwoMonths: 'Hai tháng một lần',
        everyFourMonths: 'Bốn tháng một lần',
      },
      timing: {
        endOfMonth: 'Cuối tháng',
        startOfMonth: 'Đầu tháng',
      },
      table: {
        year: 'Năm',
        balance: 'Số dư',
        contributed: 'Đã góp',
        interest: 'Tiền lãi',
        inTodaysDollars: 'Theo đô la hôm nay',
      },
      result: {
        headlineLabel: 'Số dư cuối kỳ',
        totalContributions: 'Tổng tiền góp',
        interestEarned: 'Tiền lãi nhận được',
        inTodaysDollars: 'Theo đô la hôm nay',
        effectiveAnnualRate: 'Lãi suất năm thực tế',
        realAnnualRate: 'Lãi suất năm thực (sau lạm phát)',
        horizon: 'Thời gian',
        note: 'Số dư tính bằng đô la bạn nhập. Con số đã điều chỉnh lạm phát quy đổi nó về sức mua của năm bắt đầu.',
      },
      resultNote:
        'Lãi suất bạn nhập được dùng đúng như đã nhập cho cả thời gian. Trang này không tra cứu lãi suất thị trường.',
      chart: {
        title: 'Số dư được tạo nên từ đâu',
        note: 'Đường kẻ là số dư. Dải bên dưới là phần số dư đến từ tiền lãi chứ không phải từ tiền góp.',
        xAxis: 'years',
        series: [
          { key: 'balance', label: 'Số dư' },
          { key: 'contributed', label: 'Đã góp' },
        ],
      },
      method: [
        'Dự phóng đi từng kỳ nhập lãi một. Trong mỗi kỳ, số dư sinh lãi theo lãi suất kỳ, rồi khoản góp của kỳ đó được cộng vào — vào cuối kỳ hoặc đầu kỳ, tùy theo thiết lập. Chạy các kỳ lần lượt thay vì dùng một biểu thức đóng chính là thứ tạo ra bảng theo năm, và số dư cuối cùng vẫn như nhau dù theo cách nào.',
        'Ở dạng đóng, cùng kết quả đó là:',
        'trong đó P là số dư ban đầu, r là lãi suất năm chia cho số kỳ nhập lãi mỗi năm, n là số kỳ, và PMT là khoản góp trong mỗi kỳ. Khoản góp vào đầu kỳ sinh lãi cho cả kỳ đó, nên trong trường hợp này số hạng tiền góp được nhân với (1 + r).',
        'Các con số thực đến từ hai phép điều chỉnh. Lãi suất năm thực tế là (1 + r) lũy thừa số kỳ mỗi năm, tức là thứ mà lãi suất danh nghĩa 7 % thực sự trở thành sau một năm nhập lãi hằng tháng. Lãi suất thực lấy lãi suất thực tế đó chia cho hệ số lạm phát, và số dư theo đô la hôm nay là số dư danh nghĩa chia cho lạm phát cộng dồn trong cùng thời gian.',
      ],
      formula: 'FV = P(1 + r)ⁿ + PMT · ((1 + r)ⁿ − 1) / r',
      limits: [
        'Nó không dự đoán lợi nhuận. Lãi suất bạn nhập được dùng đúng như đã nhập cho cả thời gian; không có mức trung bình lịch sử, dự báo hay dữ liệu thị trường nào đưa vào trang này.',
        'Nó không tính thuế, phí hay phí tài khoản. Số dư của một tài khoản thật sẽ khác đi bằng đúng phần nhà cung cấp thu.',
        'Nó không mô phỏng biến động thị trường. Số dư thật giảm trong những năm thị trường thật đi xuống, và không lãi suất cố định nào thể hiện được điều đó.',
        'Nó không cho bạn biết cách đầu tư hay có tiết kiệm hay không. Nó dự phóng một con số theo các giả định bạn cung cấp.',
      ],
      faq: [
        {
          q: 'Vì sao tần suất nhập lãi chỉ có thể là 1, 2, 3, 4, 6 hoặc 12?',
          a: 'Vì các khoản góp ở đây là hằng tháng, và máy tính giữ kỳ nhập lãi và kỳ góp giống nhau. Bất kỳ tần suất nào chia hết mười hai đều giữ phép tính chính xác thay vì xấp xỉ. Trên thực tế, sáu tần suất này bao quát từ nhập lãi hằng ngày đến hằng năm với các khoản gửi hằng tháng.',
        },
        {
          q: 'Lãi suất danh nghĩa và lãi suất năm thực tế khác nhau thế nào?',
          a: 'Lãi suất danh nghĩa là con số ghi trên tài khoản: 7 %. Lãi suất thực tế là mức số dư thật sự kiếm được sau một năm nhập lãi, nên 7 % nhập lãi hằng tháng thành 7,229 %. Trang hiển thị cả hai, vì chênh lệch này quan trọng trong thời gian dài.',
        },
        {
          q: 'Giá trị thực có nghĩa là gì?',
          a: 'Đó là số dư cuối cùng biểu thị bằng sức mua của năm bắt đầu. Phép tính chia số dư danh nghĩa cho lạm phát cộng dồn trong cùng thời gian, cho thấy bao nhiêu phần số dư là tăng trưởng thực và bao nhiêu chỉ là những đồng đô la cũ mất giá.',
        },
        {
          q: 'Thời điểm góp có làm thay đổi kết quả không?',
          a: 'Có, và trang hiển thị cả hai trường hợp. Khoản góp vào đầu mỗi kỳ sinh lãi cho cả kỳ đó, nên cuối cùng nhiều hơn cùng khoản góp vào cuối kỳ. Chênh lệch mỗi lần nhỏ nhưng cộng dồn qua nhiều thập kỷ.',
        },
        {
          q: 'Điều gì xảy ra khi lãi suất bằng không?',
          a: 'Số dư chỉ tăng bằng các khoản góp, không có lãi. Máy tính xử lý riêng trường hợp này thay vì chia cho không, nên con số đúng bằng tổng tiền đã gửi.',
        },
        {
          q: 'Có bắt buộc góp đều đặn không?',
          a: 'Không. Đặt khoản góp hằng tháng bằng không sẽ biến phép tính thành dự phóng lãi kép đơn giản trên số dư ban đầu, đúng mô hình cho một khoản tiền một lần đã được đầu tư.',
        },
      ],
      sources: [
        {
          label: 'SEC — Investor.gov: lãi kép và chi phí của các loại phí',
          url: 'https://www.investor.gov/introduction-investing/investing-basics/glossary/compound-interest',
        },
        {
          label: 'BLS — Chỉ số giá tiêu dùng (cho các con số đã điều chỉnh lạm phát)',
          url: 'https://www.bls.gov/cpi/',
        },
        {
          label: 'Cục Dự trữ Liên bang — dữ liệu lãi suất tiền gửi có kỳ hạn và tiết kiệm',
          url: 'https://www.federalreserve.gov/releases/h15/',
        },
        {
          label: 'IRS — lãi kép và sự tăng trưởng của IRA truyền thống',
          url: 'https://www.irs.gov/retirement-plans/traditional-iras',
        },
      ],
      relatedGuides: [
        { slug: 'compound-interest-calculator-explained', title: 'Giải thích máy tính lãi kép' },
        { slug: 'compound-vs-simple-interest', title: 'Lãi kép và lãi đơn' },
        { slug: 'how-compounding-frequency-changes-results', title: 'Tần suất nhập lãi thay đổi kết quả thế nào' },
        { slug: 'inflation-and-real-returns-explained', title: 'Giải thích lạm phát và lợi nhuận thực' },
        { slug: 'understanding-apr', title: 'Hiểu về APR, lãi suất phần trăm hằng năm' },
      ],
      script: {
        yearsOne: '1 năm',
        yearsOther: '{n} năm',
      },
    },
    'net-pay': {
      name: 'Máy tính lương thực nhận',
      title: 'Máy tính lương thực nhận cho năm thuế 2026',
      description:
        'Tính phần còn lại của tiền lương sau thuế thu nhập liên bang, Social Security, Medicare và thuế tiểu bang, cho bất kỳ kỳ lương nào, với mọi khoản khấu trừ được trình bày.',
      short: 'Tiền lương còn lại bao nhiêu sau thuế liên bang, thuế lương và thuế tiểu bang.',
      category: 'Lương',
      methodNote:
        'Số liệu thuộc năm thuế 2026: Rev. Proc. 2025-32 cho các bậc thuế liên bang và khoản khấu trừ tiêu chuẩn, và Cơ quan An sinh Xã hội cho các giới hạn thuế lương. Không có gì trên trang này là báo giá từ một nhà cung cấp dịch vụ tính lương.',
      fields: {
        grossPay: 'Lương gộp',
        payPeriod: 'Kỳ lương',
        filingStatus: 'Tình trạng khai thuế',
        stateRate: 'Thuế suất thuế thu nhập tiểu bang',
        stateRateHint: 'thuế suất của bậc bạn thuộc',
        retirementContribution: 'Đóng góp 401(k) hoặc 403(b)',
        retirementHint: 'mỗi năm — vẫn chịu thuế lương',
        healthContribution: 'Đóng góp HSA hoặc FSA',
        healthHint: 'mỗi năm — không chịu thuế lương',
        perYear: 'mỗi năm',
        debtName: 'Khoản nợ',
        balance: 'Dư nợ',
        rate: 'Lãi suất',
        minimum: 'Khoản trả tối thiểu',
      },
      terms: {
        payPeriods: {
          year: 'Hằng năm',
          month: 'Hằng tháng',
          week: 'Hằng tuần',
          day: 'Mỗi ngày',
          hour: 'Mỗi giờ',
        },
        filingStatuses: {
          single: 'Độc thân',
          married: 'Vợ chồng khai chung',
          head: 'Chủ hộ',
        },
      },
      result: {
        headlineLabel: 'Lương thực nhận',
        annualGross: 'Lương gộp cả năm',
        federalTax: 'Thuế thu nhập liên bang',
        socialSecurity: 'Social Security',
        medicare: 'Medicare',
        additionalMedicare: 'Thuế Medicare bổ sung',
        stateTax: 'Thuế thu nhập tiểu bang',
        totalTax: 'Tổng thuế',
        netPerMonth: 'Thực nhận mỗi tháng',
        effectiveRate: 'Thuế suất thực tế',
        note:
          'Số tiền thực nhận là lương gộp trừ các khoản khấu trừ ở trên, chia cho số kỳ lương trong năm.',
        negativeNote:
          'Các khoản khấu trừ lớn bằng lương gộp, và thuế lương vẫn tính trên chúng, nên con số thực nhận thấp hơn không. Giới hạn hằng năm của các khoản đóng góp không được kiểm tra ở đây.',
      },
      resultNote:
        'Hệ thống tính lương dùng các lựa chọn khấu lưu trên mẫu W-4 và số tiền đã khấu lưu trong năm, nên con số trên phiếu lương thật thay đổi chút ít từ tháng này sang tháng khác.',
      chart: {
        title: 'Lương gộp đi về đâu',
        note: 'Một cột cho cả năm, chia thành phần đến tay người lao động và các phần bị trừ ra.',
        xAxis: 'none',
        series: [
          { key: 'net', label: 'Lương thực nhận' },
          { key: 'federal', label: 'Thuế thu nhập liên bang' },
          { key: 'socialSecurity', label: 'Social Security' },
          { key: 'medicare', label: 'Medicare' },
          { key: 'state', label: 'Thuế thu nhập tiểu bang' },
        ],
      },
      formula:
        'thực nhận = lương gộp − khấu trừ trước thuế − thuế thu nhập liên bang − Social Security − Medicare − thuế thu nhập tiểu bang',
      method: [
        'Phép tính bắt đầu từ lương gộp và đi ngược qua các khoản khấu trừ, theo đúng thứ tự hệ thống tính lương áp dụng. Các khoản khấu trừ trước thuế được trừ trước, vì khoản đóng góp vào 401(k) hoặc tài khoản y tế được lấy ra khỏi lương trước khi bị đánh thuế. Phần còn lại là lương chịu thuế.',
        'Hai khoản khấu trừ không được xử lý giống nhau. Khoản đóng góp 401(k) hoặc 403(b) được loại khỏi thu nhập, nhưng vẫn là lương đối với Social Security và Medicare, nên nó làm giảm thuế liên bang mà không ảnh hưởng thuế lương. Khoản đóng góp HSA hoặc FSA trừ thẳng từ phiếu lương được loại khỏi cả thu nhập lẫn lương tính Social Security, nên làm giảm cả hai.',
        'Thuế thu nhập liên bang được tính trên phần lương chịu thuế đó. Khoản khấu trừ tiêu chuẩn theo tình trạng khai thuế được trừ đi, và kết quả được đưa qua bảng bậc thuế năm 2026. Mỗi bậc là một số tiền thuế cố định cộng một tỷ lệ phần trăm của thu nhập vượt trên mức sàn của bậc đó, đúng như cách IRS công bố bảng.',
        'Tiếp theo là thuế lương. Chúng được tính trên lương trừ mọi khoản đóng góp HSA hoặc FSA, vì khoản đóng góp 401(k) vẫn nằm trong lương cho mục đích này. Social Security là 6,2% tiền lương cho đến mức tối đa chịu thuế $184,500 năm 2026. Medicare là 1,45% toàn bộ tiền lương, không có mức trần, và thuế Medicare bổ sung là 0,9% phần vượt trên $200,000 với người khai độc thân, hoặc trên $250,000 với vợ chồng khai chung.',
        'Thuế thu nhập tiểu bang là thuế suất người đọc gõ vào, áp lên thu nhập chịu thuế. Đó là một ước tính: phần lớn các tiểu bang đánh thuế theo bậc, nên một con số áp lên toàn bộ thu nhập sẽ cao hơn mức hầu hết mọi người thực trả. Con số cuối cùng là phần còn lại, chia cho số kỳ lương trong năm.',
      ],
      limits: [
        'Nó không tính các khoản tín thuế. Tín thuế trẻ em, tín thuế thu nhập lao động và tín thuế giáo dục làm thay đổi con số cuối cùng và không có trong phép tính.',
        'Nó không tính lãi vốn, thu nhập tự doanh, hay cách xử lý thu nhập vượt mức lương tính Social Security, nơi Medicare vẫn áp dụng còn Social Security thì không.',
        'Nó không tính thuế địa phương. Thuế thu nhập của thành phố và quận tách riêng khỏi thuế suất tiểu bang.',
        'Số kỳ lương theo quy ước: 12 tháng, 52 tuần, 260 ngày làm việc, hoặc 2.080 giờ cho tuần 40 giờ trong 52 tuần. Người đọc được trả lương theo lịch khác có thể nhập con số cả năm.',
        'Khoản đóng góp HSA và FSA được coi là khoản giảm lương trừ thẳng từ phiếu lương, chính điều đó giúp nó không chịu Social Security và Medicare. Khoản đóng góp HSA chuyển thẳng từ tài khoản ngân hàng vẫn là lương đối với Social Security, và trường hợp đó không có trong phép tính.',
        'Khoản đóng góp 401(k) vượt giới hạn hằng năm năm 2026 lại chịu một phần thuế lương, và phép tính này tính thuế lương trên toàn bộ khoản đóng góp.',
        'Nó không kiểm tra giới hạn hằng năm của các khoản đóng góp. Một khoản đóng góp 401(k) hoặc HSA lớn bằng toàn bộ tiền lương sẽ làm con số thực nhận thấp hơn không, vì thuế lương vẫn tính trên nó.',
      ],
      faq: [
        {
          q: 'Vì sao lương thực nhận của tôi thấp hơn lương gộp trừ thuế thu nhập?',
          a: 'Vì tiền lương còn bị trừ Social Security và Medicare. Đó là các khoản thuế lương đánh vào chính công việc, tách riêng khỏi thuế thu nhập trên phiếu lương.',
        },
        {
          q: 'Khoản đóng góp 401(k) có làm giảm Social Security và Medicare của tôi không?',
          a: 'Không. Nó được trừ khỏi lương trước khi tính thuế thu nhập liên bang, nhưng vẫn là lương đối với thuế lương, nên Social Security và Medicare vẫn tính trên nó. Khoản đóng góp HSA hoặc FSA trừ thẳng từ phiếu lương thì khác: nó cũng được trừ khỏi cơ sở tính các khoản thuế đó. Vì vậy hai khoản được nhập riêng.',
        },
        {
          q: 'Phép tính có dùng bậc thuế thực của tôi không?',
          a: 'Nó dùng bảng bậc thuế năm 2026 và khoản khấu trừ tiêu chuẩn theo tình trạng khai thuế, nên con số gần với kết quả hệ thống tính lương đưa ra cho người làm công ăn lương không có thu nhập khác. Nó không biết gì về tín thuế, khoản khấu trừ khác hay thu nhập khác.',
        },
        {
          q: 'Thuế suất thực tế và thuế suất biên khác nhau thế nào?',
          a: 'Thuế suất biên là thuế suất áp lên đô la thu nhập chịu thuế tiếp theo, và đó là bậc cao nhất mà thu nhập chạm tới. Thuế suất thực tế là tổng thuế chia cho toàn bộ thu nhập, và nó thấp hơn, vì các bậc cao hơn chỉ áp lên phần thu nhập vượt trên chúng.',
        },
        {
          q: 'Nên nhập thuế suất tiểu bang nào?',
          a: 'Thuế suất áp dụng cho bậc của chính bạn ở tiểu bang của bạn. Phần lớn các tiểu bang đánh thuế theo bậc, nên thuế suất thực tế thấp hơn thuế suất cao nhất. Một con số duy nhất là hoàn toàn chính xác ở tiểu bang có thuế suất đồng nhất và ở tiểu bang không có thuế thu nhập.',
        },
        {
          q: 'Vì sao thuế Social Security có mức trần còn thuế Medicare thì không?',
          a: 'Social Security có mức tối đa chịu thuế được đặt mỗi năm, $184,500 năm 2026, và thu nhập vượt mức đó không chịu thuế Social Security. Medicare không có mức trần, nên nó áp lên mọi đô la tiền lương.',
        },
        {
          q: 'Tôi có thể dùng công cụ này để tính số thuế phải nộp khi khai thuế không?',
          a: 'Không. Nó tính số thuế khấu lưu từ tiền lương. Tờ khai thuế là một phép tính khác: nó bao gồm thu nhập khác, các khoản khấu trừ, tín thuế và các khoản đã nộp, và được nộp mỗi năm một lần chứ không phải mỗi kỳ lương.',
        },
      ],
      sources: [
        {
          label: 'IRS — Rev. Proc. 2025-32, điều chỉnh lạm phát cho năm thuế 2026',
          url: 'https://www.irs.gov/irb/2025-45_IRB',
        },
        {
          label: 'Cơ quan An sinh Xã hội — mức lương tính thuế và COLA năm 2026',
          url: 'https://www.ssa.gov/cola/',
        },
        {
          label: 'Cơ quan An sinh Xã hội — Publication 15, hướng dẫn thuế cho chủ lao động',
          url: 'https://www.ssa.gov/pubs/EN-05-10035.pdf',
        },
        {
          label: 'IRS — Tax Topic 401, tiền công và tiền lương',
          url: 'https://www.irs.gov/taxtopics/tc401',
        },
        {
          label: 'Cơ quan An sinh Xã hội — POMS RS 01402.038, các chương trình y tế được ưu đãi thuế',
          url: 'https://secure.ssa.gov/poms.nsf/lnx/0301402038',
        },
        {
          label: 'IRS — Tax Topic 511, khấu lưu thuế',
          url: 'https://www.irs.gov/taxtopics/tc511',
        },
      ],
      relatedGuides: [
        {
          slug: 'net-pay-calculator-explained',
          title: 'Lương thực nhận được tính thế nào',
        },
      ],
    },

    'income-tax': {
      name: 'Máy tính thuế thu nhập liên bang',
      title: 'Máy tính thuế thu nhập liên bang cho năm thuế 2026',
      description:
        'Tính thuế thu nhập liên bang năm 2026 trên thu nhập cả năm, với thuế tiểu bang tính theo bậc thuế riêng của tiểu bang đó, tình trạng khai thuế, khoản khấu trừ, thuế suất thực tế và thuế suất biên đặt cạnh nhau.',
      short: 'Thuế thu nhập liên bang và tiểu bang trên thu nhập cả năm, hiển thị cả hai thuế suất.',
      category: 'Lương',
      methodNote:
        'Các bậc thuế liên bang và khoản khấu trừ tiêu chuẩn là số liệu năm 2026 từ Rev. Proc. 2025-32, công bố ngày 3 tháng 11 năm 2025. Thuế tiểu bang được tính theo các bậc thuế năm 2026, khoản khấu trừ tiêu chuẩn, khoản miễn trừ cá nhân và các khoản tín thuế của tiểu bang bạn chọn, lấy từ các bảng của Tax Foundation ngày 28 tháng 4 năm 2026. Bảng cho chủ hộ, khoản khấu trừ thuế thu nhập liên bang và các khoản tín thuế tiểu bang lấy từ biểu mẫu của chính các tiểu bang. Các khoản thuế lương trừ từ tiền lương không nằm trong phép tính này; chúng có trong máy tính lương thực nhận.',
      script: {
        stateDetected: 'Đã điền {state}: tiểu bang mà yêu cầu của bạn đến từ.',
        childrenTotal: 'Tổng số con đủ điều kiện: {count}',
      },
      fields: {
        grossIncome: 'Thu nhập gộp cả năm',
        filingStatus: 'Tình trạng khai thuế',
        itemisedDeduction: 'Khấu trừ theo từng khoản',
        standardDeduction: 'Khấu trừ tiêu chuẩn',
        useStandard: 'Dùng khấu trừ tiêu chuẩn',
        state: 'Tiểu bang',
        stateHint: 'cho thuế tiểu bang',
        stateNone: 'Không chọn tiểu bang',
        children: 'Con đủ điều kiện',
        childrenHint: 'theo tuổi vào cuối năm thuế',
        childBand: 'Con từ {range} tuổi',
        stateTaxOverride: 'Thuế tiểu bang tự nhập',
        stateTaxOverrideHint: 'để trống để dùng mô hình',
        preTax: 'Khấu trừ trước thuế',
        preTaxHint: '401(k), HSA, FSA mỗi năm',
        perYear: 'mỗi năm',
      },
      terms: {
        filingStatuses: {
          single: 'Độc thân',
          married: 'Vợ chồng khai chung',
          head: 'Chủ hộ',
        },
      },
      result: {
        headlineLabel: 'Thuế thu nhập liên bang',
        taxableIncome: 'Thu nhập chịu thuế',
        deductionApplied: 'Khoản khấu trừ được áp dụng',
        standardDeduction: 'Khấu trừ tiêu chuẩn',
        itemisedDeduction: 'Khấu trừ theo từng khoản',
        federalTax: 'Thuế thu nhập liên bang',
        stateTaxableIncome: 'Thu nhập chịu thuế tiểu bang',
        stateCredits: 'Tín thuế tiểu bang',
        stateChildCredit: 'Tín thuế trẻ em của tiểu bang',
        federalTaxDeducted: 'Thuế liên bang được khấu trừ',
        stateTax: 'Thuế thu nhập tiểu bang',
        totalTax: 'Tổng thuế',
        effectiveRate: 'Thuế suất thực tế',
        marginalRate: 'Thuế suất biên',
        afterTax: 'Thu nhập sau thuế',
        note:
          'Khoản khấu trừ được áp dụng là khoản lớn hơn trong hai khoản: khấu trừ tiêu chuẩn theo tình trạng khai thuế, hoặc khấu trừ theo từng khoản nhập ở bên trái. Thuế tiểu bang được tính theo tiểu bang bạn chọn.',
      },
      resultNote:
        'Con số này là nghĩa vụ thuế, không phải số tiền khấu lưu từ phiếu lương. Con số liên bang không bao gồm các khoản tín thuế liên bang hay các khoản đã nộp trong năm; con số tiểu bang bao gồm các khoản tín thuế tiểu bang mà mô hình có.',
      chart: {
        title: 'Thu nhập còn lại những gì',
        note: 'Một cột cho cả năm, chia thành phần ở lại với người đọc và phần dành cho thuế.',
        xAxis: 'none',
        series: [
          { key: 'afterTax', label: 'Thu nhập sau thuế' },
          { key: 'federal', label: 'Thuế thu nhập liên bang' },
          { key: 'state', label: 'Thuế thu nhập tiểu bang' },
        ],
      },
      formula:
        'thu nhập chịu thuế = thu nhập gộp − khấu trừ trước thuế − khoản khấu trừ; thuế = bảng bậc thuế áp lên thu nhập chịu thuế; thuế tiểu bang = các bậc của tiểu bang áp lên tổng thu nhập điều chỉnh trừ khấu trừ tiêu chuẩn và khoản miễn trừ của tiểu bang, trừ thuế thu nhập liên bang đã nộp nếu tiểu bang cho phép, trừ các khoản tín thuế tiểu bang',
      method: [
        'Phép tính bắt đầu với thu nhập gộp cả năm và trừ các khoản khấu trừ trước thuế, vì khoản đóng góp 401(k) hay tài khoản y tế không bị đánh thuế như thu nhập.',
        'Tiếp theo là khoản khấu trừ. Khấu trừ tiêu chuẩn theo tình trạng khai thuế được dùng trừ khi người đọc nhập khấu trừ theo từng khoản, và khoản lớn hơn trong hai khoản sẽ được áp dụng. Khấu trừ tiêu chuẩn năm 2026 là $16,100 cho người khai độc thân, $32,200 cho vợ chồng khai chung và $24,150 cho chủ hộ.',
        'Phần còn lại là thu nhập chịu thuế, và thuế là bảng bậc thuế năm 2026 áp lên nó. Mỗi bậc là một số tiền thuế cố định cộng một tỷ lệ phần trăm của thu nhập vượt trên mức sàn của bậc đó, đúng như cách IRS công bố.',
        'Hai thuế suất trả lời hai câu hỏi khác nhau. Thuế suất biên là thuế suất áp lên đô la thu nhập chịu thuế tiếp theo, tức là bậc cao nhất mà thu nhập chạm tới. Thuế suất thực tế là tổng thuế chia cho toàn bộ thu nhập, và nó thấp hơn vì các bậc cao hơn chỉ chạm tới phần thu nhập vượt trên chúng.',
        'Thuế tiểu bang được tính riêng. Tiểu bang bắt đầu từ tổng thu nhập điều chỉnh, trừ khấu trừ tiêu chuẩn và khoản miễn trừ cá nhân của mình khi chúng được cho dưới dạng loại trừ, áp các bậc thuế của mình từng lớp một, và trừ các khoản tín thuế mà tiểu bang chi trả. Những tiểu bang cho khoản miễn trừ hay khấu trừ tiêu chuẩn dưới dạng tín thuế thì trừ nó khỏi số thuế, và các khoản tín thuế đó được tính ở đó.',
        'Bảng theo tình trạng khai thuế được sử dụng. Những tiểu bang công bố bảng riêng cho chủ hộ có bảng đó ở đây, lấy từ biểu mẫu của chính họ, còn những tiểu bang không công bố thì được tính theo bảng của người khai độc thân.',
        'Ba tiểu bang cho phép khấu trừ thuế thu nhập liên bang đã nộp: Alabama, Missouri và Oregon. Ở những tiểu bang đó, khoản khấu trừ được trừ khỏi thu nhập trước khi áp các bậc thuế tiểu bang, với giới hạn và tỷ lệ do từng tiểu bang quy định.',
        'Các khoản tín thuế tiểu bang được tính theo tuổi của các con, vì chúng phụ thuộc vào tuổi. New York trả $1,000 cho mỗi con dưới bốn tuổi và $500 cho mỗi con từ bốn đến mười sáu tuổi, Minnesota trả $1,800 cho mỗi con dưới mười tám tuổi, và một vài tiểu bang không trả gì cho con đã quá một độ tuổi nhất định.',
      ],
      limits: [
        'Nó không tính các khoản tín thuế liên bang. Tín thuế trẻ em liên bang, tín thuế thu nhập lao động liên bang và tín thuế giáo dục làm giảm số thuế và không có trong phép tính.',
        'Nó không phân biệt lãi vốn với thu nhập thông thường, nên một năm có thu nhập đầu tư được tính theo thuế suất thông thường.',
        'Nó không tính khoản khấu trừ cho người cao tuổi, hay bất kỳ khoản khấu trừ nào ngoài khoản tiêu chuẩn và khoản theo từng khoản nhập ở bên trái.',
        'Nó không tính thuế tự doanh, loại thuế đánh vào thu nhập ròng của người tự doanh và có cơ sở tính cùng thuế suất riêng.',
        'Nó không tính khoản khấu trừ thuế thu nhập tiểu bang và địa phương mà nhiều tiểu bang cho phép trong khấu trừ theo từng khoản.',
        'Nó không tính thuế suất lãi vốn, các khoản phụ thu một số tiểu bang đánh vào người thu nhập cao, hay thuế của chính quyền thành phố và quận.',
        'Nó không dùng bảng chủ hộ của Vermont, vì thuế suất năm 2026 của tiểu bang này được công bố dưới dạng sơ bộ, nên chủ hộ ở Vermont được tính theo bảng của người khai độc thân.',
        'Nó không có mọi khoản tín thuế tiểu bang. Tín thuế thu nhập lao động của tiểu bang có cho các tiểu bang đặt nó theo phần trăm tín thuế liên bang và cho ba tiểu bang tự tính riêng, còn tín thuế trẻ em có cho các tiểu bang mà khoản tín thuế phụ thuộc vào tuổi của con. Các khoản tín thuế của những tiểu bang khác không có trong đó.',
      ],
      faq: [
        {
          q: 'Khoản khấu trừ nào được áp dụng?',
          a: 'Khấu trừ tiêu chuẩn, trừ khi tổng các khoản khấu trừ theo từng khoản lớn hơn. Máy tính hiển thị khấu trừ tiêu chuẩn theo tình trạng khai thuế và con số theo từng khoản cạnh nhau, nên chỉ cần nhìn một lần là so sánh được.',
        },
        {
          q: 'Thuế suất thực tế và thuế suất biên khác nhau thế nào?',
          a: 'Thuế suất biên là thuế suất áp lên đô la thu nhập chịu thuế tiếp theo. Thuế suất thực tế là tổng thuế chia cho toàn bộ thu nhập, và nó thấp hơn, vì các bậc trên bậc đầu tiên chỉ áp lên phần thu nhập vượt trên chúng.',
        },
        {
          q: 'Vì sao số thuế nhảy vọt ở một mức thu nhập nhất định?',
          a: 'Đó là ranh giới của bậc thuế. Vượt qua nó, mỗi đô la thêm vào bị đánh thuế theo thuế suất kế tiếp, nên thuế tăng nhanh hơn thu nhập. Thuế suất biên cho biết thu nhập đang ở bậc nào.',
        },
        {
          q: 'Có bao gồm Social Security và Medicare không?',
          a: 'Không. Đó là các khoản thuế lương đánh trên tiền lương, có mức trần riêng, và được tính trong máy tính lương thực nhận.',
        },
        {
          q: 'Con số thuế tiểu bang là gì?',
          a: 'Là thuế do chính tiểu bang thu, tính theo các bậc thuế năm 2026 của tiểu bang đó, khoản khấu trừ tiêu chuẩn, khoản miễn trừ cá nhân và các khoản tín thuế của nó. Tiểu bang được chọn từ danh sách, và trang sẽ điền tiểu bang mà yêu cầu của bạn đến từ khi mạng xác định được. Đổi tiểu bang thì cả con số đổi theo.',
        },
        {
          q: 'Tôi có thể tự nhập thuế tiểu bang không?',
          a: 'Có. Ô bên dưới tiểu bang nhận một con số và thay thế con số đã tính bằng nó. Mặc định ô này trống, và khi còn trống, trang hiển thị kết quả tính.',
        },
        {
          q: 'Vì sao trang hỏi tuổi của từng con?',
          a: 'Vì các khoản tín thuế trẻ em của tiểu bang phụ thuộc vào tuổi của con. New York trả $1,000 cho mỗi con dưới bốn tuổi và $500 cho mỗi con từ bốn đến mười sáu tuổi, Minnesota trả $1,800 cho mỗi con dưới mười tám tuổi, và một số tiểu bang không trả gì cho con đã quá một độ tuổi nhất định. Các nhóm tuổi là những mốc tuổi mà các tiểu bang lấy làm ranh giới, và số con trong các nhóm đó cũng là số mà tín thuế thu nhập lao động đếm.',
        },
        {
          q: 'Đây có phải số tiền tôi sẽ nợ không?',
          a: 'Đây là số thuế trước các khoản tín thuế và trước các khoản đã nộp trong năm. Tờ khai thuế cộng thêm các khoản tín thuế, cộng mọi thứ khác chưa bị đánh thuế qua tiền lương, và trừ đi số đã nộp.',
        },
      ],
      sources: [
        {
          label: 'IRS — Rev. Proc. 2025-32, điều chỉnh lạm phát cho năm thuế 2026',
          url: 'https://www.irs.gov/irb/2025-45_IRB',
        },
        {
          label: 'IRS — Tax Topic 505, khấu lưu thuế và các khoản nộp thuế ước tính',
          url: 'https://www.irs.gov/taxtopics/tc505',
        },
        {
          label: 'IRS — Tax Topic 611, thuế thu nhập',
          url: 'https://www.irs.gov/taxtopics/tc611',
        },
        {
          label: 'Tax Foundation — State Individual Income Tax Rates and Brackets, 2026',
          url: 'https://taxfoundation.org/data/all/state/state-income-tax-rates-2026/',
        },
        {
          label: 'Tax Foundation — Facts & Figures 2026, thuế suất thuế thu nhập cá nhân của tiểu bang tính đến 28 tháng 4 năm 2026',
          url: 'https://taxfoundation.org/data/all/state/2026-state-tax-data/',
        },
      ],
      relatedGuides: [
        {
          slug: 'income-tax-calculator-explained',
          title: 'Thuế thu nhập liên bang được tính thế nào',
        },
      ],
    },

    'debt-payoff': {
      name: 'Máy tính trả nợ',
      title: 'Máy tính trả nợ: tuyết lở và quả cầu tuyết',
      description:
        'So sánh cách trả nhiều khoản nợ cùng lúc: chỉ trả tối thiểu, thứ tự tuyết lở và thứ tự quả cầu tuyết, với số tháng đến khi hết nợ và số tiền lãi tiết kiệm được.',
      short: 'Trả nhiều khoản nợ cùng lúc và so sánh thứ tự.',
      category: 'Nợ',
      methodNote:
        'Mô hình là mô phỏng từng tháng: lãi được tính trên dư nợ đầu tháng, mỗi khoản nợ còn mở nhận khoản trả tối thiểu riêng của nó, và phần tiền còn lại dồn vào khoản nợ người đọc đã chọn.',
      fields: {
        debtName: 'Khoản nợ',
        balance: 'Dư nợ',
        rate: 'Lãi suất',
        minimum: 'Khoản trả tối thiểu',
        addDebt: 'Thêm một khoản nợ',
        removeDebt: 'Xóa khoản nợ này',
        extraPayment: 'Khoản trả thêm hằng tháng',
        extraPaymentHint: 'ngoài mọi khoản trả tối thiểu',
      },
      terms: {
        strategies: {
          minimum: 'Chỉ trả tối thiểu',
          avalanche: 'Tuyết lở',
          snowball: 'Quả cầu tuyết',
        },
        orderHints: {
          avalanche: 'lãi suất cao nhất trước',
          snowball: 'dư nợ nhỏ nhất trước',
        },
      },
      result: {
        headlineLabel: 'Tiền lãi tiết kiệm được',
        interestSaved: 'Tiền lãi tiết kiệm được so với chỉ trả tối thiểu',
        monthsToFree: 'Số tháng đến khi hết nợ',
        totalInterest: 'Tổng tiền lãi',
        totalPaid: 'Tổng đã trả',
        minimumOnly: 'Chỉ trả tối thiểu',
        avalanche: 'Tuyết lở',
        snowball: 'Quả cầu tuyết',
        minimumsNeverCover: 'Không bao giờ trả hết',
        minimumsNeverCoverNote:
          'Ít nhất một trong các khoản nợ này có tiền lãi mỗi tháng lớn hơn số tiền trả, nên dư nợ đó tăng lên thay vì giảm xuống. Một lần chạy không bao giờ trả hết nợ thì không có lịch trả hoàn chỉnh, nên nó không báo số tháng hay tiền lãi: những con số đó sẽ mô tả điểm kết thúc của mô phỏng chứ không phải các khoản nợ.',
        note:
          'Tuyết lở trả lãi suất cao nhất trước và tốn ít tiền lãi nhất. Quả cầu tuyết xóa dư nợ nhỏ nhất trước và kết thúc khoản nợ đó sớm hơn. Chênh lệch giữa hai cách là cái giá của thứ tự.',
      },
      resultNote:
        'Ba lần chạy dùng cùng các khoản nợ và cùng khoản trả thêm. Điều duy nhất thay đổi là thứ tự tiền trả thêm được dồn vào.',
      chart: {
        title: 'Dư nợ theo từng thứ tự',
        note: 'Lần chạy không bao giờ trả hết nợ không được vẽ: dư nợ của nó tăng lên thay vì giảm, và hình dạng đường đó sẽ mô tả điểm kết thúc của mô phỏng chứ không phải một lịch trả. Đường có khoản trả thêm chạm mức không.',
        xAxis: 'years',
        series: [
          { key: 'avalanche', label: 'Tuyết lở' },
          { key: 'snowball', label: 'Quả cầu tuyết' },
          { key: 'minimumOnly', label: 'Chỉ trả tối thiểu' },
        ],
      },
      formula:
        'tiền lãi trong tháng = dư nợ đầu tháng × lãi suất năm ÷ 12; mỗi khoản nợ còn mở nhận khoản trả tối thiểu riêng, trả lãi trước và gốc sau; phần tiền còn lại dồn vào khoản nợ mà thứ tự chỉ tới',
      method: [
        'Phép tính là mô phỏng từng tháng. Đầu mỗi tháng, lãi được tính trên dư nợ và cộng vào dư nợ. Số tiền có trong tháng đó là tổng mọi khoản trả tối thiểu cộng khoản trả thêm nhập ở bên trái. Mỗi khoản nợ còn dư nợ nhận khoản trả tối thiểu riêng, và khoản trả này trả lãi trước, gốc sau.',
        'Một khoản nợ đã trả hết thì không nhận khoản trả tối thiểu nữa, và khoản tối thiểu đó nhập vào số tiền dồn cho khoản nợ kế tiếp. Đó là cơ chế đằng sau sự khác biệt giữa các thứ tự: cùng một số tiền hằng tháng, chi cho một khoản nợ khác, sẽ chấm dứt những dư nợ khác sớm hơn.',
        'Thứ tự tuyết lở dồn tiền trả thêm vào lãi suất cao nhất trước. Nó tốn ít tiền lãi nhất, vì phần lãi nó chặn lại là khoản tiền đắt nhất người đọc đang trả.',
        'Thứ tự quả cầu tuyết dồn tiền trả thêm vào dư nợ nhỏ nhất trước. Tổng cộng nó tốn nhiều tiền lãi hơn và xóa một tài khoản sớm hơn, đó là một loại kết quả khác. Máy tính hiển thị cả hai, cùng tiền lãi tiết kiệm được trong mỗi trường hợp, để có thể so sánh trên cùng các con số.',
      ],
      limits: [
        'Nó không mô phỏng lãi suất thả nổi. Thẻ tín dụng có lãi suất thả nổi thay đổi tiền lãi khi chỉ số biến động, còn lịch trả ở đây giả định lãi suất giữ nguyên như đã nhập.',
        'Nó không tính các loại phí: phí trả chậm, phí chuyển dư nợ và phí thường niên của thẻ không có trong tổng số.',
        'Nó tính lãi hằng tháng. Thẻ tín dụng nhập lãi hằng ngày thu nhiều hơn một chút trong năm, và con số thật trên dư nợ thẻ thường cao hơn con số này một chút.',
        'Nó không tính cách xử lý thuế đối với tiền lãi, vì với một số khoản nợ tiền lãi được khấu trừ còn với khoản khác thì không.',
        'Nó không mô phỏng thay đổi của khoản trả tối thiểu, vốn đôi khi được bên cho vay hạ xuống khi gặp khó khăn và đôi khi được nâng lên khi dư nợ giảm.',
      ],
      faq: [
        {
          q: 'Tuyết lở và quả cầu tuyết khác nhau thế nào?',
          a: 'Chỉ khác ở thứ tự. Tuyết lở dồn tiền trả thêm vào lãi suất cao nhất trước, quả cầu tuyết vào dư nợ nhỏ nhất trước. Các khoản nợ, khoản trả tối thiểu và khoản trả thêm giống nhau ở cả hai lần chạy.',
        },
        {
          q: 'Cách nào tiết kiệm được nhiều tiền hơn?',
          a: 'Tuyết lở, xét về tiền lãi. Tiền trả thêm chặn khoản nợ đắt nhất trước, nên ít tiền lãi phát sinh hơn trong suốt đời các khoản nợ. Máy tính in ra chênh lệch về tiền lãi tiết kiệm được cho từng thứ tự.',
        },
        {
          q: 'Vì sao quả cầu tuyết tồn tại nếu nó tốn hơn?',
          a: 'Nó xóa dư nợ nhỏ nhất trước, nên một dư nợ về không sớm hơn. Đó là một kết quả khác với thứ mà tiền lãi đo lường, và máy tính hiển thị cả hai để có thể so sánh trên cùng các con số.',
        },
        {
          q: 'Tiền lãi được tính thế nào?',
          a: 'Trên dư nợ đầu mỗi tháng, theo lãi suất năm chia mười hai, và được cộng vào dư nợ. Sau đó các khoản trả đi vào tiền lãi trước và vào gốc sau.',
        },
        {
          q: 'Khoản trả tối thiểu của một khoản nợ đã trả hết thì sao?',
          a: 'Nó được cộng vào số tiền dồn cho khoản nợ kế tiếp, nên số tiền hằng tháng dành cho các khoản nợ không bao giờ giảm. Đó là lý do ngày trả hết ngắn hơn tổng các lịch trả riêng lẻ.',
        },
        {
          q: 'Có tính đến thẻ tín dụng nhập lãi hằng ngày không?',
          a: 'Không. Mô hình tính lãi mỗi tháng một lần. Thẻ nhập lãi mỗi ngày thu nhiều hơn một chút trong một năm, nên con số thật trên dư nợ thẻ thường cao hơn con số ở đây một chút.',
        },
      ],
      sources: [
        {
          label: 'CFPB — Ask CFPB, hỏi đáp cho người tiêu dùng',
          url: 'https://www.consumerfinance.gov/ask-cfpb/',
        },
        {
          label: 'CFPB — công cụ và hướng dẫn về thẻ tín dụng',
          url: 'https://www.consumerfinance.gov/consumer-tools/credit-cards/',
        },
      ],
      relatedGuides: [
        {
          slug: 'debt-payoff-calculator-explained',
          title: 'Trả nhiều khoản nợ cùng lúc hoạt động thế nào',
        },
      ],
    },
  },
};
