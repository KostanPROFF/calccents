/**
 * Mọi chuỗi hiển thị cho người dùng trên trang web, bằng tiếng Anh.
 *
 * Tệp này là nguồn sự thật cho nội dung của trang web. Các từ điển tiếng Nga và
 * tiếng Tây Ban Nha trong cùng thư mục có cùng cấu trúc, và kiểu dữ liệu
 * của đối tượng này là kiểu dữ liệu mà chúng được kiểm tra đối chiếu, vì vậy một khóa bị thiếu hoặc
 * bị đổi tên sẽ làm hỏng quá trình build thay vì xuất bản một trang được dịch một nửa.
 *
 * Các chuỗi thuộc về chính các hướng dẫn không nằm ở đây. Chúng nằm
 * trong các tệp MDX tại `src/content/guides/<locale>/`, vì một hướng dẫn là
 * một bài viết và một bài viết có tệp riêng của nó.
  */

export const vi = {
  /** Tên của ngôn ngữ này, bằng chính ngôn ngữ đó.  */
  localeName: 'Tiếng Việt',

  /** Mô tả ngắn về trang web, được sử dụng trong dữ liệu có cấu trúc và thẻ meta.  */
  tagline: 'Các công cụ tính toán tài chính hiển thị cách tính',
  description:
    'Các công cụ tính toán tài chính miễn phí cho khoản vay thế chấp, thuê nhà so với mua nhà, lãi kép, thu nhập thực nhận, thuế liên bang và trả nợ. Mọi công thức đều được hiển thị.',

  author: {
    role: 'Tác giả',
    bio: 'Làm việc trong lĩnh vực cơ sở hạ tầng CNTT — đám mây, CI/CD, cơ sở hạ tầng dưới dạng mã — nơi một thay đổi không thể xác minh sẽ không được triển khai. Giữ cho môi trường đám mây tinh gọn và các đường ống phân phối nhanh chóng là công việc hàng ngày; tiêu chuẩn tương tự cũng được áp dụng cho trang web này. Các phép tính nằm ở một nơi, các công thức được bao phủ bởi các bài kiểm tra đơn vị đối chiếu với các số liệu khoản vay đã công bố, và mọi số liệu từ bên ngoài đều ghi rõ nguồn và ngày truy xuất. Viết các hướng dẫn và duy trì công cụ tính toán.',
  },

  reviewer: {
    role: 'Người đánh giá tài chính',
    bio: 'Đọc nội dung tài chính của một hướng dẫn trước khi nó được xuất bản: các con số, các giả định đằng sau chúng và các nguồn mà chúng lấy từ đó. Tác giả xây dựng công cụ tính toán; người đánh giá đọc kết quả từ phía bên kia, phía của một người làm việc với tiền bạc thay vì mã nguồn. Tên của cô ấy chỉ xuất hiện trên các hướng dẫn mà cô ấy đã đánh giá.',
  },

  nav: {
    tools: 'Công cụ',
    guides: 'Hướng dẫn',
    sources: 'Nguồn',
    about: 'Giới thiệu',
  },

  footer: {
    taglineNote:
      'Mọi công thức đều được trình bày rõ ràng, mọi giả định đều do bạn quyết định.',
    calculatorsHeading: 'Công cụ tính toán',
    siteHeading: 'Trang web',
    calculators: {
      'mortgage-payment': 'Khoản thanh toán thế chấp',
      'rent-vs-buy': 'Thuê hay mua',
      'compound-interest': 'Lãi kép',
      'net-pay': 'Thu nhập thực nhận',
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
      '{name} công bố các phép tính và giải thích, không phải lời khuyên tài chính. Các công cụ này hiển thị các phép tính đằng sau một con số và các giả định đằng sau các phép tính đó. Chúng không đánh giá tình hình của bạn và không đề xuất hướng hành động. Mọi con số mà công cụ tạo ra đều phụ thuộc vào dữ liệu đầu vào bạn cung cấp — hãy đọc các giả định trước khi bạn dựa vào bất kỳ kết quả nào. © {founded}–{year} {name}.',
  },

  /** Các chuỗi xuất hiện trên nhiều hơn một trang.  */
  ui: {
    skipToContent: 'Chuyển đến nội dung',
    home: 'Trang chủ',
    breadcrumb: 'Đường dẫn điều hướng',
    primaryNav: 'Chính',
    lastChecked: 'Kiểm tra lần cuối',
    by: 'Bởi',
    whereNumbersComeFrom: 'Nguồn gốc các con số',
    minRead: '{n} phút đọc',
    guidesCount: (n: number) => `${n} hướng dẫn`,
    calculate: 'Tính toán',
    open: 'Mở',
    allGuides: 'Tất cả hướng dẫn →',
    readTheGuide: 'Đọc hướng dẫn',
    guidesThatGoDeeper: 'Các hướng dẫn chuyên sâu',
    commonQuestions: 'Câu hỏi thường gặp',
    howThisIsCalculated: 'Cách tính toán này',
    whatThisCalculatorDoesNotDo: 'Những điều công cụ này không thực hiện',
    sources: 'Nguồn',
    sourcesNote: 'Đây là các nguồn chính đằng sau các con số và phương pháp trong hướng dẫn này.',
    calculatorsBehindThisGuide: 'Các công cụ tính toán đằng sau hướng dẫn này',
    published: 'Đã xuất bản',
    lastReviewed: 'Xem xét lần cuối',
    reviewedBy: 'Được xem xét bởi',
    language: 'Ngôn ngữ',
    switchTheme: 'Chuyển đổi giao diện',
    switchToLight: 'Chuyển sang giao diện sáng',
    switchToDark: 'Chuyển sang giao diện tối',
    /*
      Shown under a field the site filled in from the region the request came
      from. The state is a default, not a fact about the reader, and the
      sentence says so.
    */
    detectedFromIp:
      'Tiểu bang được xác định từ địa chỉ IP của bạn và chỉ là ước tính: VPN, proxy hoặc mạng di động có thể khiến vị trí hiển thị không chính xác. Bạn vẫn có thể chỉnh sửa trường này.',
  },

  newsletter: {
    emailAddress: 'Địa chỉ email',
    note: 'Hủy đăng ký chỉ với một cú nhấp trong bất kỳ thư nào. Địa chỉ chỉ được dùng cho thư này.',
    placeholder: 'you@example.com',
    subscribe: 'Đăng ký',
  },

  home: {
    title: 'Calccents — Các công cụ tính toán tài chính hiển thị cách tính',
    description:
      'Các công cụ tính toán tài chính miễn phí cho khoản vay thế chấp, thuê nhà so với mua nhà, lãi kép, thu nhập thực nhận, thuế liên bang và trả nợ. Mọi công thức đều được hiển thị.',
    socialDescription:
      'Máy tính miễn phí cho thế chấp, thuê hay mua, lãi kép, lương thực nhận, thuế và nợ. Hiện rõ mọi công thức.',
    eyebrow: 'Công cụ tính toán tài chính',
    heading: 'Biết con số trước khi bạn quyết định',
    lede: 'Các công cụ miễn phí để tính toán số học đằng sau khoản vay thế chấp, hợp đồng thuê nhà, phiếu lương và các khoản nợ. Mọi công thức đều được viết ra, mọi giả định đều do bạn quyết định và không trang nào bảo bạn phải làm gì với kết quả đó.',
    cta: 'Duyệt các công cụ tính toán',
    calculatorsEyebrow: 'Các công cụ tính toán',
    calculatorsHeading: 'Sáu câu hỏi, sáu bộ số liệu',
    workHeading: 'Mọi con số đều hiển thị cách tính',
    workPoints: [
      'Công thức nằm ngay cạnh kết quả, bằng ngôn ngữ đơn giản và bằng các ký hiệu.',
      'Mọi con số xuất phát từ một nguồn nào đó đều mang theo nguồn gốc và ngày tháng của nó.',
      'Mọi công cụ đều nêu rõ những gì nó không thực hiện, bằng cùng một cách diễn đạt, ngay bên dưới kết quả.',
    ],
    workLink: 'Cách trang web này được xây dựng →',
    sampleMonthlyPayment: 'Khoản thanh toán hàng tháng',
    samplePrincipalAndInterest: 'Gốc & lãi',
    samplePropertyTax: 'Thuế bất động sản',
    sampleTotalInterest: 'Tổng tiền lãi',
    calcTitle: 'Thử nghiệm: khoản thanh toán thế chấp hàng tháng',
    calcHomePrice: 'Giá nhà',
    calcDown: 'Khoản trả trước',
    calcRate: 'Lãi suất',
    calcTerm: 'Thời hạn',
    calcYears: '{n} năm',
    calcMonthly: 'Gốc & lãi hàng tháng',
    calcLoan: 'Số tiền vay',
    calcTotalInterest: 'Tổng tiền lãi',
    calcOpen: 'Mở máy tính đầy đủ',
    calcNote: 'Chỉ bao gồm tiền gốc và lãi. Thuế bất động sản, bảo hiểm và phí HOA có trong máy tính đầy đủ.',
    statCalculators: 'máy tính',
    statGuides: 'hướng dẫn kèm theo cách tính',
    statLanguages: 'ngôn ngữ',
    statSignups: 'đăng ký để sử dụng bất kỳ tính năng nào',
    guidesEyebrow: 'Hướng dẫn',
    guidesHeading: 'Các phép tính được trình bày chi tiết',
    newsletterHeading: 'Nhận các phép tính trong hộp thư đến của bạn',
    newsletterLede:
      'Một lá thư ngắn khi một máy tính mới được ra mắt hoặc một máy tính hiện có được xem xét lại.',
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
    mortgagePayment: 'Số dư thế chấp giảm dần theo thời gian, cùng với tiền lãi được trả kèm theo',
    rentVsBuy: 'Hai đường cắt nhau: chi phí thuê nhà so với chi phí sở hữu nhà',
    compoundInterest: 'Số dư tăng ngày càng nhanh khi lãi kép được tính',
    netPay: 'Một thanh biểu thị tổng thu nhập được chia thành thu nhập thực nhận và các khoản khấu trừ từ đó',
    incomeTax: 'Một chồng các khung thuế, mỗi khung rộng hơn khung bên trên nó',
    debtPayoff: 'Hai bộ biểu đồ cột, mỗi bộ cho một thứ tự thanh toán nợ khác nhau',
  },

  heroVisual: {
    label: 'Khoản thanh toán hàng tháng',
    caption: 'Một ví dụ minh họa, được vẽ theo cách máy tính thực hiện.',
  },

  /*
   * The labels around a result chart.
   *
   * The chart itself is drawn as inline SVG from the numbers the calculator
   * has already worked out, so nothing is re-computed for the picture and
   * the picture cannot disagree with the figures above it.
   */
  chart: {
    months: 'Tháng',
    years: 'Năm',
    start: 'Hiện tại',
    end: 'Kết thúc',
    empty: 'Biểu đồ sẽ hiển thị khi có số liệu để vẽ.',
  },

  toolsIndex: {
    title: 'Máy tính tài chính miễn phí',
    description:
      'Sáu máy tính miễn phí: khoản trả góp thế chấp, thuê hay mua nhà, lãi kép, lương thực nhận, thuế thu nhập liên bang và trả nợ. Mỗi máy tính đều hiển thị công thức.',
    heading: 'Máy tính tài chính miễn phí',
    lede: 'Mỗi máy tính đều hiển thị công thức được sử dụng, liệt kê các giả định đằng sau kết quả và nêu rõ những gì nó không thực hiện. Không kết quả nào yêu cầu địa chỉ email hay đăng ký tài khoản.',
    whatTheseAre: 'Các công cụ này là gì',
    whatTheseAreBody: [
      'Đây là các công cụ tính toán số học. Chúng lấy các con số bạn cung cấp, áp dụng một công thức đã được công bố và trả lại kết quả kèm theo cách tính chi tiết. Máy tính thế chấp ở đây không biết điểm tín dụng, thu nhập của bạn hoặc bên cho vay nào đang cung cấp ưu đãi gì trong tuần này và nó không cố gắng đoán.',
      'Lý do rất đơn giản: một con số bạn có thể tự kiểm tra thì giá trị hơn một con số do người khác chọn cho bạn. Mọi công cụ ở đây đều hiển thị công thức bằng ký hiệu, liên kết đến các nguồn chính đằng sau phương pháp và có ngày xem xét để bạn biết khi nào nó được kiểm tra lần cuối.',
    ],
  },

  guidesIndex: {
    title: 'Hướng dẫn',
    description:
      'Mười tám hướng dẫn về các phép tính đằng sau thế chấp, thuê hay mua nhà, lãi kép, tiền lương, thuế thu nhập và nợ, mỗi bài đều có công thức, giả định và nguồn.',
    heading: 'Hướng dẫn',
    lede: 'Giải thích chuyên sâu về các phép tính và các giả định đằng sau các công cụ tính toán. Mỗi hướng dẫn đều hiển thị công thức, liên kết đến các nguồn chính và có ngày xem xét.',
    missingHeading: 'Thiếu nội dung nào đó?',
    missingBody:
      'Các hướng dẫn được viết xoay quanh những phép tính mà người đọc thấy khó theo dõi nhất. Nếu một khái niệm tài chính chưa được đề cập ở đây, hãy cho chúng tôi biết đó là khái niệm nào và điều gì khiến bạn thấy khó hiểu.',
    suggestTopic: 'Đề xuất một chủ đề',
    groups: {
      home: 'Nhà ở và thế chấp',
      money: 'Lương, thuế và nợ',
      renting: 'Thuê nhà và sở hữu nhà',
      investing: 'Đầu tư',
    },
  },

  guide: {
    sourcesTitle: 'Nguồn',
    sourcesNote: 'Đây là các nguồn chính đằng sau các con số và phương pháp trong hướng dẫn này.',
  },

  about: {
    title: 'Giới thiệu',
    description:
      'Trang web này là gì, cách xây dựng và các quy tắc mà nó tuân theo để mọi con số trên đó đều có thể được kiểm tra.',
    heading: 'Về {name}',
    lede: '{name} xuất bản các công cụ tính toán tài chính và các giải thích đằng sau chúng. Đây là một trang web nhỏ với mục đích cụ thể: tạo ra một con số mà bạn có thể kiểm tra và hiển thị các bước tính toán đã tạo ra con số đó.',
    isHeading: 'Trang web này là gì',
    isBody: [
      'Sáu công cụ tính toán, mười tám bài hướng dẫn và các nguồn tài liệu chính đằng sau chúng. Các công cụ này sử dụng những con số bạn cung cấp và áp dụng một công thức đã được công bố: công thức khấu hao cho khoản vay thế chấp, so sánh dòng tiền theo từng tháng giữa việc thuê và mua nhà, công thức lãi kép cho số dư tiết kiệm, cùng các phép tính về trả nợ, thuế thu nhập và thu nhập thực nhận.',
      'Trang web được duy trì bằng quảng cáo hiển thị, và điều đó quyết định cách nó được xây dựng. Các trang tải nhanh và dùng ít JavaScript, nên máy tính trả kết quả trên điện thoại cũ nhanh như trên máy tính để bàn. Không máy tính nào yêu cầu địa chỉ email, và không kết quả nào bị khóa.',
    ],
    isNotHeading: 'Trang web này không phải là gì',
    isNotBody: [
      'Đây không phải là một công ty môi giới, không chấp nhận đơn đăng ký và không nhận hoa hồng từ bất kỳ ai nhấp vào bất cứ thứ gì. Không có vị trí được tài trợ, không có liên kết tiếp thị liên kết và không có biểu mẫu thu thập thông tin khách hàng tiềm năng. Quảng cáo chỉ là quảng cáo hiển thị và không gì khác, nghĩa là thứ duy nhất mà lượt truy cập của người đọc chi trả chính là sự chú ý của người đọc.',
      'Không có công cụ nào ở đây đánh giá hoàn cảnh của bạn. Một công cụ tính toán vay thế chấp đưa ra kết quả "trả trước 20 phần trăm" sẽ sai trong hầu hết các trường hợp, vì câu trả lời đúng phụ thuộc vào những điều mà trang web không thể biết: các khoản tiết kiệm khác của bạn, công việc của bạn, khả năng chịu đựng của bạn trước một tháng khó khăn. Vì vậy, mọi công cụ chỉ thực hiện tính toán và dừng lại ở đó.',
    ],
    rulesHeading: 'Các quy tắc mà trang web tuân theo',
    rules: [
      {
        label: 'Mỗi công cụ đều nêu rõ các giới hạn của nó.',
        body: 'Dưới mỗi kết quả là một khối liệt kê những gì công cụ không thực hiện, với cùng một nội dung trên mọi trang.',
      },
      {
        label: 'Mọi con số có nguồn gốc đều có dẫn chứng.',
        body: 'Các bài hướng dẫn liên kết đến nguồn tài liệu chính và ghi rõ ngày dữ liệu được đọc. Các phép tính của riêng trang web được hiển thị đầy đủ.',
      },
      {
        label: 'Mỗi trang đều có ngày xem xét lại.',
        body: 'Một bài hướng dẫn chưa được xem xét trong một thời gian dài sẽ hiển thị thông báo đó.',
      },
      {
        label: 'Bản thảo do AI tạo, con người kiểm duyệt.',
        body: 'Các công cụ soạn thảo hỗ trợ về mặt ngôn từ. Mọi trang được xuất bản đều đã được một người đọc qua để kiểm tra các phép tính, đơn vị và các khẳng định.',
      },
    ],
    whoHeading: 'Ai điều hành trang web này',
    whoBody:
      '{name}. {bio} {reviewerName} đọc nội dung tài chính của các hướng dẫn trước khi chúng được xuất bản. {whoEditorialLink} nêu rõ những gì quá trình kiểm duyệt sẽ thực hiện trước khi một trang được đăng tải, và {whoCodeLink}: các công thức, các bài kiểm tra đơn vị và các bước kiểm tra ngăn chặn việc phát hành nếu trang bị lỗi.',
    whoEditorialLink: 'trang biên tập',
    whoCodeLink: 'mã nguồn được công khai',
    howHeading: 'Cách thức hoạt động của các công cụ tính toán',
    howBody:
      'Các phép tính chạy ngay trên trình duyệt của bạn. Không có máy chủ nào nhận các con số bạn nhập và không có thông tin nào về phép tính được gửi cho bất kỳ ai. Các công thức được triển khai một lần, tại một nơi duy nhất và được bao phủ bởi các bài kiểm tra đơn vị để đối chiếu với các số liệu khoản vay đã công bố và các bất biến mà toán học yêu cầu — rằng một lịch trình phải cộng dồn bằng đúng số tiền vay, rằng một khoản vay phải kết thúc chính xác ở mức bằng không, rằng số dư không lãi suất chỉ tăng lên nhờ các khoản tiền gửi.',
    correctionsHeading: 'Đính chính',
    correctionsBody:
      'Nếu một con số bị sai, một liên kết nguồn bị hỏng hoặc một trang tự mâu thuẫn với chính nó, đó là một lỗi và cần được khắc phục. {contactLink} cho biết cách báo cáo lỗi và mọi đính chính đều dẫn đến việc thay đổi ngày kiểm duyệt thay vì chỉnh sửa âm thầm.',
    contactLink: 'trang liên hệ',
  },

  contact: {
    title: 'Liên hệ',
    emailLine: 'Gửi email tới {email}.',
    description:
      'Cách liên hệ với trang web về một con số sai, một liên kết hỏng, một chủ đề còn thiếu hoặc vấn đề quảng cáo.',
    heading: 'Liên hệ',
    lede: 'Một địa chỉ, được đọc bởi một người. Phản hồi mất vài ngày, thường lâu hơn trong những tuần đầu tiên sau khi một trang được xuất bản.',
    worthHeading: 'Điều đáng viết',
    worth: [
      {
        label: 'Một con số sai.',
        body: 'Nếu một con số trên trang không khớp với tính toán của bạn, hãy gửi các dữ liệu đầu vào bạn đã sử dụng và con số bạn nhận được. Đó là một lỗi và nó sẽ được xem xét.',
      },
      {
        label: 'Một liên kết nguồn bị hỏng hoặc không hoạt động.',
        body: 'Các nguồn được kiểm tra theo lịch trình, nhưng một liên kết có thể bị hỏng giữa các lần kiểm tra.',
      },
      {
        label: 'Một chủ đề còn thiếu.',
        body: 'Các hướng dẫn được viết xoay quanh các phép tính mà người đọc thấy khó nhất, vì vậy một khoảng trống thường là một khoảng trống trong các phép tính đó.',
      },
      {
        label: 'Một vấn đề về quảng cáo.',
        body: 'Một quảng cáo gây hiểu lầm, làm hỏng trang hoặc che khuất nội dung rất đáng để báo cáo. Trang web được tài trợ bởi quảng cáo hiển thị, vì vậy loại báo cáo này được xem xét nghiêm túc.',
      },
    ],
    nextHeading: 'Điều gì xảy ra tiếp theo',
    nextBody:
      'Một con số được báo cáo sẽ được đối chiếu với nguồn và trang sẽ thay đổi nếu con số đó sai. Ngày xem xét trên trang sẽ thay đổi khi nội dung được kiểm tra, bất kể có thay đổi gì hay không, vì vậy ngày đó cho bạn biết khi nào một người đã đọc trang lần cuối.',
  },

  /**
   * The contact form.
   *
   * The statuses are keyed rather than ordered, because the script picks
   * one by key and the page carries all of them.
   */
  contactForm: {
    heading: 'Viết tin nhắn',
    lede: 'Biểu mẫu này gửi tin nhắn đến người đọc trang web này và phản hồi sẽ được gửi đến địa chỉ bạn viết tại đây.',
    nameLabel: 'Tên của bạn',
    emailLabel: 'Địa chỉ email của bạn',
    subjectLabel: 'Nội dung về vấn đề gì',
    messageLabel: 'Tin nhắn của bạn',
    submit: 'Gửi tin nhắn',
    note: 'Tin nhắn được gửi qua email và sẽ có người đọc.',
    statuses: [
      { key: 'sent', text: 'Tin nhắn đã được gửi. Phản hồi sẽ được gửi đến địa chỉ bạn đã nhập.' },
      { key: 'email', text: 'Địa chỉ email đó có vẻ chưa đầy đủ. Hãy kiểm tra lại và gửi tin nhắn lần nữa.' },
      { key: 'fields', text: 'Mọi trường đều cần có nội dung.' },
      { key: 'rate', text: 'Nhiều tin nhắn đã được gửi từ địa chỉ này trong thời gian ngắn. Hãy đợi một phút rồi gửi lại.' },
      { key: 'failed', text: 'Tin nhắn chưa được gửi đi. Thay vào đó, hãy viết thư đến địa chỉ ở trên.' },
    ],
  },

  sourcesPage: {
    title: 'Nguồn',
    description:
      'Mọi nguồn chính mà trang web này dựa vào để đưa ra các con số và phương pháp, cùng lý do mỗi nguồn được liệt kê tại đây.',
    heading: 'Nguồn',
    lede: 'Mọi con số trên trang web này đều đến từ một trong các tổ chức dưới đây, hoặc từ các phép tính được hiển thị đầy đủ trên trang. Không có thông tin nào được trích dẫn từ bài đăng trên blog, bản tóm tắt hoặc nội dung thuật lại từ nguồn thứ cấp.',
    whyHeading: 'Tại sao lại có danh sách nguồn',
    whyBody: [
      'Một con số không có nguồn gốc chỉ là một khẳng định. Các trang này được viết cho những người muốn tự kiểm tra các phép tính, điều này chỉ khả thi nếu dữ liệu gốc chỉ cách bạn một cú nhấp chuột. Do đó, mỗi hướng dẫn đều có danh sách nguồn riêng và trang này là mục lục của tất cả các nguồn đó.',
      'Quy tắc mà trang web tuân theo được giới hạn một cách có chủ đích: các cơ quan chính phủ, cơ quan quản lý chứng khoán, ngân hàng trung ương và các tổ chức GSE thế chấp. Khi một con số đến từ một khảo sát thương mại, trang web sẽ nêu rõ điều đó và đặt tên cho khảo sát đó.',
    ],
    howHeading: 'Cách sử dụng các nguồn',
    how: [
      {
        label: 'Phương pháp và công thức',
        body: 'đến từ cơ quan công bố phương pháp đó. Công thức khấu hao được nêu trong hướng dẫn của chính CFPB; các quy tắc về tần suất lãi kép đến từ bảng thuật ngữ của SEC; các ngưỡng thuế đến từ điều chỉnh lạm phát hàng năm của IRS.',
      },
      {
        label: 'Số liệu thống kê đã công bố',
        body: 'đến từ cơ quan thống kê đã tạo ra chúng, kèm theo ngày mà con số đó được ghi nhận.',
      },
      {
        label: 'Lãi suất thị trường',
        body: 'đến từ khảo sát công bố chúng và được ghi ngày tháng trên trang, vì lãi suất của một tháng khác sẽ là một con số khác.',
      },
      {
        label: 'Số liệu tiểu bang',
        body: 'đến từ Tax Foundation, tổ chức tổng hợp các khung thuế thu nhập từ các văn bản luật và biểu mẫu của từng tiểu bang, cùng với thuế suất bất động sản từ Khảo sát Cộng đồng Hoa Kỳ mà họ công bố. Các bảng dành cho chủ hộ, khoản khấu trừ cho thuế thu nhập liên bang đã nộp và các khoản tín dụng tiểu bang đến từ các tờ khai và hướng dẫn của chính các tiểu bang.',
      },
    ],
    sources: [
      {
        label: 'Cục Bảo vệ Tài chính Người tiêu dùng (CFPB) — các khoản thế chấp, tín dụng tiêu dùng',
        url: 'https://www.consumerfinance.gov/',
      },
      {
        label: 'Sở Thuế vụ (IRS) — các khung thuế, điều chỉnh lạm phát, các quy định về hưu trí',
        url: 'https://www.irs.gov/',
      },
      {
        label: 'Cơ quan An sinh Xã hội (SSA) — thuế suất tiền lương, cơ sở tiền lương, giới hạn hàng năm',
        url: 'https://www.ssa.gov/',
      },
      {
        label: 'Freddie Mac — Khảo sát Thị trường Thế chấp Sơ cấp',
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
        label: 'Cục Thống kê Lao động (BLS) — Chỉ số Giá Tiêu dùng',
        url: 'https://www.bls.gov/cpi/',
      },
      {
        label: 'Cục Dự trữ Liên bang — dữ liệu lãi suất (H.15)',
        url: 'https://www.federalreserve.gov/releases/h15/',
      },
      {
        label: 'Securities and Exchange Commission (SEC) — Investor.gov',
        url: 'https://www.investor.gov/',
      },
      {
        label: 'Ngân hàng Dự trữ Liên bang St. Louis (FRED) — chuỗi dữ liệu kinh tế',
        url: 'https://fred.stlouisfed.org/',
      },
      {
        label: 'Cục Thống kê Lao động — công cụ tính CPI và các bảng dữ liệu',
        url: 'https://www.bls.gov/data/',
      },
      {
        label: 'Tax Foundation — Thuế suất và Khung thuế Thu nhập Cá nhân của Tiểu bang, 2026',
        url: 'https://taxfoundation.org/data/all/state/state-income-tax-rates-2026/',
      },
      {
        label: 'Tax Foundation — Thuế tài sản theo Tiểu bang và Quận, 2026',
        url: 'https://taxfoundation.org/data/all/state/property-taxes-by-state-county/',
      },
      {
        label: 'Tax Foundation — Sự kiện & Số liệu 2026, thuế suất thuế thu nhập cá nhân của tiểu bang tính đến ngày 28 tháng 4 năm 2026',
        url: 'https://taxfoundation.org/data/all/state/2026-state-tax-data/',
      },
      {
        label: 'Hội nghị Quốc gia các Cơ quan Lập pháp Tiểu bang (NCSL) — tín dụng thuế thu nhập kiếm được và tín dụng thuế trẻ em của tiểu bang',
        url: 'https://www.ncsl.org/human-services/',
      },
      {
        label: 'Tax Policy Center — thuế suất và các khoản tín dụng thuế thu nhập tiểu bang',
        url: 'https://taxpolicycenter.org/',
      },
      {
        label: 'Prenatal-to-3 Policy Impact Center — các chính sách tín dụng thuế trẻ em của tiểu bang',
        url: 'https://pn3policy.org/',
      },
    ],
  },

  editorial: {
    title: 'Ban biên tập',
    description:
      'Ai là người viết các hướng dẫn, ai là người đánh giá và nội dung đánh giá thực tế kiểm tra những gì trước khi một trang được xuất bản.',
    heading: 'Ban biên tập',
    lede: 'Một người viết các hướng dẫn. Một người khác đọc nội dung tài chính của mỗi hướng dẫn trước khi nó được đăng tải. Trang này cho biết họ là ai, nội dung đánh giá kiểm tra những gì và bạn có thể tự kiểm tra những gì.',
    authorEyebrow: 'Tác giả',
    reviewerEyebrow: 'Người đánh giá tài chính',
    checkEyebrow: 'Những gì bạn có thể kiểm tra',
    checkHeading: 'Các phép tính được công khai',
    checkBody:
      'Mã nguồn đằng sau mỗi máy tính đều nằm trong một kho lưu trữ công khai, cùng với các công thức mà nó thực hiện, các bài kiểm tra đơn vị đối chiếu chúng với các số liệu đã công bố và các bước kiểm tra ngăn chặn việc phát hành khi trang bị lỗi. Bạn không cần phải tin tưởng vào các con số và bạn không cần phải hỏi.',
    openRepository: 'Mở kho lưu trữ',
    twoNamesHeading: 'Hai tên, hai công việc',
    twoNamesBody: [
      'Một người viết các hướng dẫn và duy trì công cụ tính toán. Một người khác đọc nội dung tài chính của hướng dẫn trước khi nó được xuất bản, kiểm tra các con số, các giả định đằng sau chúng và các nguồn mà chúng được lấy từ đó. Hai công việc này được tách biệt một cách có chủ đích: người viết hướng dẫn không phải là người đọc kiểm duyệt cuối cùng.',
      'Khi một hướng dẫn nêu tên người đánh giá, đó là người đã đánh giá nó, và tên đó chỉ xuất hiện trên hướng dẫn đó chứ không xuất hiện ở nơi nào khác. Một bài đánh giá là một tuyên bố về một trang cụ thể, vì vậy nó được gắn với trang đó thay vì toàn bộ trang web.',
      'Mọi thứ khác trên trang này mô tả những gì bài đánh giá kiểm tra và những gì người đọc có thể xác minh mà không cần hỏi bất kỳ ai.',
    ],
    reviewHeading: 'Những gì bài đánh giá kiểm tra',
    reviewIntro:
      'Trước khi một hướng dẫn được xuất bản, người đánh giá luôn thực hiện theo cùng một danh sách:',
    review: [
      {
        label: 'Phép tính.',
        body: 'Mọi công thức đều được đối chiếu với nguồn gốc của nó và ví dụ minh họa trong văn bản được tính toán lại từ đầu. Khi một con số xuất hiện trong mã, cả hai sẽ được so sánh với nhau.',
      },
      {
        label: 'Các đơn vị.',
        body: 'Phần trăm so với số thập phân, tháng so với năm, đô la so với hàng nghìn. Hầu hết các sai sót trong một tài liệu tài chính đều là lỗi đơn vị.',
      },
      {
        label: 'Các trường hợp ngoại lệ.',
        body: 'Lãi suất bằng không, kỳ hạn bằng không, giá trị âm. Mỗi trường hợp đều được kiểm tra để đưa ra câu trả lời hợp lý thay vì thông báo lỗi.',
      },
      {
        label: 'Cách diễn đạt.',
        body: 'Trang này không được bảo người đọc phải làm gì. Nó giải thích ý nghĩa của một con số và những yếu tố mà nó phụ thuộc vào, rồi dừng lại ở đó. Một hướng dẫn đưa ra lời khuyên về một hành động sẽ được viết lại.',
      },
      {
        label: 'Các nguồn.',
        body: 'Mỗi liên kết đều được mở, kiểm tra đối chiếu với tuyên bố đi kèm và ghi ngày tháng.',
      },
    ],
    toolsHeading: 'Cách sử dụng các công cụ soạn thảo',
    toolsBody: [
      'Các công cụ soạn thảo hỗ trợ việc viết văn bản. Chúng không quyết định nội dung của trang. Mọi con số, mọi công thức và mọi tuyên bố đều được viết hoặc kiểm tra bởi con người, và không có trang nào được đăng tải nếu chưa qua quy trình đánh giá nêu trên. Một công cụ tạo ra con số nghe có vẻ hợp lý chính là thứ mà quy trình này tồn tại để phát hiện.',
      'Quy trình kiểm tra không chỉ dựa vào con người. Công cụ tính toán có các bài kiểm tra đơn vị chạy trên mỗi thay đổi và chặn việc phát hành nếu một con số bị thay đổi: lịch trình phải cộng dồn bằng đúng số tiền vay, khoản vay phải kết thúc ở mức chính xác bằng không, và dự báo theo từng kỳ phải khớp với công thức dạng đóng ở mọi tần suất lãi kép. Một đoạn văn bản không thể sai theo cách đó. Một công thức thì có thể, và khi điều đó xảy ra, quá trình xây dựng sẽ dừng lại.',
    ],
    datesHeading: 'Ngày đánh giá',
    datesBody:
      'Mỗi hướng dẫn đều ghi ngày được đánh giá lần cuối. Một hướng dẫn có nội dung phụ thuộc vào dữ liệu bên ngoài sẽ được đánh giá ít nhất hai lần một năm; một hướng dẫn giải thích về số học sẽ được đánh giá khi công thức đằng sau nó thay đổi, và trong mọi trường hợp là ít nhất mỗi năm một lần. Khi một trang được đánh giá, ngày tháng sẽ được cập nhật, bất kể văn bản có thay đổi hay không, vì vậy ngày tháng cho bạn biết thời điểm một người đọc trang đó lần cuối.',
    correctionsHeading: 'Đính chính',
    correctionsBody:
      'Các đính chính được thực hiện công khai. Một trang đã được đính chính sẽ giữ nguyên ngày đánh giá được cập nhật và nội dung đính chính được mô tả trong luồng liên hệ mà nó xuất phát. Một hướng dẫn có con số sai là lỗi trong khâu đánh giá, không phải lỗi trong khâu viết, và quy trình đánh giá là thứ cần thay đổi.',
    contactLink: 'liên hệ',
  },

  privacy: {
    title: 'Quyền riêng tư',
    description:
      'Những gì trang web này thu thập, những gì không thu thập, và các nhà cung cấp quảng cáo và phân tích nào xuất hiện trên các trang.',
    heading: 'Quyền riêng tư',
    lede: 'Tóm tắt: các con số bạn nhập vào máy tính vẫn nằm trong trình duyệt của bạn, và bản thân trang web không lưu giữ cookie theo dõi nào.',
    calculatorsHeading: 'Các máy tính làm gì với dữ liệu đầu vào của bạn',
    calculatorsBody:
      'Không làm gì cả. Phép tính chạy trong trình duyệt của bạn bằng JavaScript được tải xuống cùng với trang. Các giá trị bạn nhập không được truyền đi bất cứ đâu, không được lưu trữ và không hiển thị với trang web hoặc bất kỳ ai khác. Việc đóng tab sẽ xóa bỏ chúng.',
    stateHeading: 'Tiểu bang của bạn',
    stateBody:
      'Hai trong số các công cụ tính toán cần thông tin về tiểu bang: công cụ tính thuế thu nhập liên bang, vốn cộng thêm thuế thu nhập tiểu bang vào thuế liên bang, và công cụ tính thuê hay mua nhà, vốn bao gồm thuế bất động sản vào chi phí sở hữu nhà. Khi một trong các trang đó mở ra, nó sẽ hỏi trang web này rằng yêu cầu đến từ tiểu bang nào. Câu trả lời đến từ mạng lưới cung cấp trang web, nơi đọc tiểu bang từ địa chỉ của yêu cầu, và nó được dùng để điền vào một trường thông tin. Không có gì khác xảy ra với thông tin này: câu trả lời không được lưu trữ, không được ghi vào cookie và không được gửi cho Google hay dịch vụ phân tích trang của nhà cung cấp dịch vụ lưu trữ. Tiểu bang được xác định là xấp xỉ — VPN, proxy hoặc mạng di động có thể chỉ sai tiểu bang — và trường thông tin mà nó điền vào có thể được thay đổi hoặc xóa đi, trong trường hợp đó trang web sẽ giữ lại con số bạn đã nhập.',
    cookiesHeading: 'Cookie',
    cookiesBody:
      '{name} không tự thiết lập cookie riêng. Dịch vụ phân tích của trang web chạy trên Google Analytics 4, do Google cung cấp từ các tên miền của chính họ và lưu trữ một định danh bên thứ nhất trong trình duyệt của bạn để phân biệt lượt truy cập này với lượt truy cập khác. Định danh đó không được dùng cho quảng cáo và không được chia sẻ với các trang web khác. Dịch vụ phân tích trang của nhà cung cấp dịch vụ lưu trữ không lưu trữ bất cứ thứ gì trong trình duyệt của bạn: không cookie, không bộ nhớ cục bộ, không bất kỳ loại định danh nào.',
    advertisingHeading: 'Quảng cáo',
    advertisingBody:
      'Trang web được tài trợ bởi quảng cáo hiển thị do Google AdSense cung cấp. Google và các đối tác có thể thiết lập cookie hoặc sử dụng các công nghệ tương tự để phân phối và đo lường quảng cáo, đồng thời có thể sử dụng chúng để hiển thị quảng cáo dựa trên các lượt truy cập trước đây của bạn vào trang web này hoặc các trang web khác. Bạn có thể xem lại và thay đổi lựa chọn của mình tại {adsSettingsLink}, và giải thích của riêng Google về cách họ sử dụng dữ liệu từ các trang web và ứng dụng sử dụng dịch vụ của họ có tại {policiesLink}.',
    adsSettingsLink: 'Google Ads Settings',
    policiesLink: 'policies.google.com',
    analyticsPoliciesLink: 'policies.google.com',
    analyticsHeading: 'Phân tích',
    analyticsBody:
      'Số lượt xem trang được ghi lại bằng Google Analytics 4, do Google cung cấp từ googletagmanager.com. Dữ liệu được sử dụng giới hạn ở trang, nguồn giới thiệu và vị trí ở cấp quốc gia hoặc thành phố; địa chỉ IP được cắt bớt thay vì lưu trữ đầy đủ. Dữ liệu này được dùng để đếm lượt truy cập và tìm hiểu những trang nào được đọc. Giải thích của riêng Google về cách họ sử dụng dữ liệu từ các trang web và ứng dụng sử dụng dịch vụ của họ có tại {analyticsPoliciesLink}. Tập lệnh chạy trên mọi trang ở chế độ đồng ý (Consent Mode). Với độc giả ở Khu vực Kinh tế Châu Âu, Vương quốc Anh hoặc Thụy Sĩ, nó khởi động với cookie bị tắt: cho đến khi bạn đồng ý trong thông báo đồng ý của Google, hoặc nếu bạn từ chối, nó không đặt và không đọc cookie nào, chỉ gửi cho Google một tín hiệu không dùng cookie rằng một trang đã được xem, không kèm mã định danh nào liên kết lượt truy cập này với lượt sau; Google dùng các tín hiệu này để ước tính những lượt truy cập không đếm được. Khi bạn đồng ý, phân tích sẽ bật cookie của nó. Ở các quốc gia khác, cookie phân tích được bật ngay từ trang đầu tiên.',
    hostingAnalyticsHeading: 'Lưu trữ và hiệu suất trang',
    hostingAnalyticsBody:
      'Trang web được lưu trữ trên Cloudflare, và Web Analytics của riêng Cloudflare chạy trên mọi trang. Một tập lệnh nhỏ được cung cấp từ static.cloudflareinsights.com đo lường lượt xem trang: trang nào đã được mở, lượt truy cập đến từ đâu, trình duyệt và hệ điều hành nào đã được sử dụng, quốc gia gửi yêu cầu và thời gian tải trang. Địa chỉ IP được sử dụng tại biên của Cloudflare để xác định quốc gia và bị loại bỏ tại đó thay vì được lưu trữ. Tập lệnh không thiết lập cookie, không ghi bất cứ thứ gì vào bộ nhớ cục bộ và không tạo ra định danh nào có thể theo dõi bạn từ trang này sang trang khác. Kết quả thu được là số lượt xem trang và lượt truy cập, cùng với chỉ số về tốc độ tải trang. Vì không lưu gì cả, nó không chờ câu hỏi về cookie. Độc giả ở Liên minh Châu Âu hoàn toàn không được tính: tập lệnh không được tải cho họ.',
    newsletterHeading: 'Bản tin',
    newsletterBody:
      'Nếu bạn đăng ký nhận bản tin, địa chỉ bạn nhập sẽ được gửi đến Buttondown, dịch vụ gửi thư, và được lưu trữ tại đó để bản tin có thể được gửi đi. Địa chỉ đó chỉ được sử dụng cho bản tin và không dùng cho mục đích nào khác, và mỗi số bản tin đều có kèm theo liên kết hủy đăng ký.',
    contactHeading: 'Biểu mẫu liên hệ',
    contactBody:
      'Nếu bạn viết tin nhắn qua biểu mẫu liên hệ, tên, địa chỉ email, chủ đề và chính nội dung tin nhắn đó sẽ được gửi qua email cho người quản lý trang web và được lưu giữ trong hộp thư đó. Biểu mẫu được cung cấp từ trang web này và phản hồi sẽ được gửi đến địa chỉ bạn đã nhập để bạn có thể tiếp tục cuộc trò chuyện. Biểu mẫu không gửi bất kỳ thông tin nào cho Google và không đặt cookie riêng; quảng cáo và phân tích nêu ở trên thuộc về toàn bộ trang và hoạt động theo lựa chọn được giải thích bên dưới. Không có thông tin nào bạn nhập được lưu trữ trên chính trang web này và tin nhắn không được chuyển cho bất kỳ ai khác.',
    thirdPartyHeading: 'Liên kết của bên thứ ba',
    thirdPartyBody:
      'Các hướng dẫn liên kết đến các nguồn chính — các cơ quan chính phủ, SEC, Cục Dự trữ Liên bang. Các trang web đó có chính sách bảo mật riêng, mà trang web này không kiểm soát và chưa đọc thay cho bạn.',
    changesHeading: 'Thay đổi',
    changesBody:
      'Nếu các nhà cung cấp nêu trên thay đổi, trang này cũng sẽ thay đổi theo. Ngày ở cuối trang là ngày văn bản này được xem xét lần cuối.',
    consentHeading: 'Lựa chọn của bạn',
    consentBody:
      'Câu hỏi về cookie do thông báo đồng ý của Google đưa ra — một nền tảng quản lý sự đồng ý được chứng nhận theo IAB Transparency and Consent Framework — và chỉ ở những nơi luật pháp yêu cầu: Khu vực Kinh tế Châu Âu, Vương quốc Anh và Thụy Sĩ. Ở đó, cho đến khi bạn trả lời, Google Analytics không đặt cookie và Google hiển thị quảng cáo theo câu trả lời của bạn; thông báo của Google lưu câu trả lời trong trình duyệt của bạn, và liên kết “Cài đặt cookie” ở chân trang mở lại nó. Ở các nơi khác không có câu hỏi nào: quảng cáo và cookie phân tích hoạt động ngay từ trang đầu tiên, và bạn có thể thay đổi cách Google cá nhân hóa quảng cáo trong cài đặt quảng cáo của Google. Trong mọi trường hợp, phân tích trang của nhà cung cấp dịch vụ lưu trữ không được tải cho độc giả ở Liên minh Châu Âu. Tiểu bang được mô tả ở trên chỉ được đọc trên hai trang máy tính và không thuộc lựa chọn này: không có cookie nào được đặt cho nó và không có thông tin nào về nó đến tay nhà cung cấp phân tích.',
    lastReviewed: 'Xem lần cuối: {date}.',
  },

  terms: {
    title: 'Điều khoản',
    description:
      'Các điều khoản mà trang web này được xuất bản, những gì các máy tính của nó thực hiện và không bao gồm, cũng như các giới hạn về những gì nó có thể cam kết.',
    heading: 'Điều khoản sử dụng',
    lede: 'Các điều khoản đơn giản cho một trang web xuất bản các phép tính thay vì các khuyến nghị.',
    providesHeading: 'Những gì trang web này cung cấp',
    providesBody:
      '{name} xuất bản các máy tính và giải thích bằng văn bản về các phép tính đằng sau chúng. Các máy tính áp dụng các công thức đã được công bố vào các giá trị bạn cung cấp và trả về kết quả cùng với các bước tính toán. Đó là toàn bộ dịch vụ.',
    notProvidesHeading: 'Những gì trang web này không cung cấp',
    notProvidesBody: [
      'Không có nội dung nào ở đây là lời khuyên về tài chính, thuế, pháp lý hoặc đầu tư, và không có nội dung nào là khuyến nghị mua, bán, giữ, thuê, sở hữu, tái cấp vốn hoặc ký kết bất kỳ điều gì. Kết quả phản ánh các thông tin đầu vào bạn đã nhập và công thức trên trang. Thay đổi một thông tin đầu vào và kết quả sẽ thay đổi; đó là điều khiến nó trở thành một phép tính thay vì một kết luận.',
      'Một máy tính không thể nhìn thấy tài chính, thu nhập, tín dụng, thời hạn hoặc mức độ chấp nhận rủi ro của bạn và nó không cố gắng đoán biết những điều đó. Hai người có cùng thông tin đầu vào nhưng hoàn cảnh khác nhau sẽ đi đến những kết luận khác nhau, và máy tính không ở vị thế có thể nói ai trong số họ là đúng.',
    ],
    figuresHeading: 'Số liệu, nguồn và ngày tháng',
    figuresBody:
      'Khi một số liệu đến từ nguồn bên ngoài, trang web sẽ liên kết đến nguồn đó và cung cấp ngày đọc số liệu. Dữ liệu bên ngoài thay đổi: ngưỡng thuế, lãi suất được công bố và số liệu thống kê chính thức đều được sửa đổi. Một số liệu trên trang chỉ chính xác tại thời điểm ngày xem trên trang đó và không còn hiệu lực sau đó, ngày xem được hiển thị để bạn biết số liệu đó cũ đến mức nào.',
    errorsHeading: 'Lỗi',
    errorsBody:
      'Các phép tính được triển khai một lần, tại một nơi và đã được kiểm thử. Mặc dù vậy, sai sót vẫn có thể xảy ra. Nếu bạn tìm thấy lỗi, trang liên hệ sẽ giải thích cách báo cáo lỗi đó, và các lỗi được báo cáo sẽ được khắc phục và ngày xem sẽ được cập nhật.',
    advertisingHeading: 'Quảng cáo',
    advertisingBody:
      'Trang web được tài trợ bởi quảng cáo hiển thị. Quảng cáo được phân phối bởi bên thứ ba và không nằm dưới sự kiểm soát của trang web. Quảng cáo được dán nhãn và tách biệt khỏi nội dung của trang web. Không nhà quảng cáo nào trả tiền cho một trang, một vị trí đặt quảng cáo, một vị trí trong kết quả tìm kiếm hoặc việc đề cập đến một sản phẩm trong hướng dẫn.',
    useHeading: 'Sử dụng trang web',
    useBody:
      'Trang web được xuất bản cho mục đích sử dụng cá nhân. Bạn có thể đọc, in và liên kết đến trang web. Bạn không được phép xuất bản lại các phần đáng kể của các hướng dẫn dưới dạng tác phẩm của riêng bạn, hoặc sử dụng các máy tính để xây dựng một sản phẩm cạnh tranh với trang web.',
    changesHeading: 'Thay đổi',
    changesBody:
      'Các điều khoản này có thể thay đổi khi trang web thay đổi. Ngày xem bên dưới là ngày văn bản này được đọc lần cuối.',
    lastReviewed: 'Xem lần cuối: {date}.',
    contactLink: 'trang liên hệ',
  },

  notFound: {
    title: 'Không tìm thấy trang',
    description: 'Trang đó không tồn tại trên trang web này. Đây là nơi chứa mọi nội dung thực tế.',
    heading: 'Không tìm thấy trang',
    lede: 'URL đó không tồn tại ở đây. Mọi nội dung trang web xuất bản đều nằm trong ba công cụ tính toán, các hướng dẫn đi kèm hoặc các trang giải thích nguồn gốc của các con số.',
    calculators: {
      title: 'Công cụ tính toán',
      text: 'Thanh toán thế chấp, thuê so với mua, lãi suất kép.',
    },
    guides: {
      title: 'Hướng dẫn',
      text: 'Phép tính đằng sau mỗi công cụ, một cách chi tiết.',
    },
    sources: {
      title: 'Nguồn',
      text: 'Mọi nguồn chính mà trang web dựa vào.',
    },
    contact: {
      title: 'Liên hệ',
      text: 'Hãy cho chúng tôi biết những gì còn thiếu hoặc không chính xác.',
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
      name: 'Công cụ tính thanh toán thế chấp',
      title: 'Công cụ tính thanh toán thế chấp với lịch trả nợ',
      description:
        'Tính toán khoản thanh toán thế chấp hàng tháng, tổng chi phí PITI và lịch trả nợ đầy đủ của bạn. Xem từng đô la tiền lãi và cách các khoản thanh toán thêm giúp thay đổi ngày tất toán.',
      short: 'Tiền gốc và lãi hàng tháng, tổng khoản trả gồm thuế và bảo hiểm (PITI), lịch trình khấu hao và ảnh hưởng của các khoản thanh toán thêm.',
      category: 'Trang chủ',
      methodNote:
        'Công thức tính khoản thanh toán, lịch trình khấu hao và cách áp dụng các khoản thanh toán thêm được mô tả dưới đây. Không có nội dung nào trên trang này là báo giá thị trường trực tiếp.',
      fields: {
        homePrice: 'Giá nhà',
        downPayment: 'Khoản trả trước',
        percentOfPrice: 'phần trăm giá',
        interestRate: 'Lãi suất',
        annualFixed: 'hàng năm, cố định',
        loanTerm: 'Thời hạn khoản vay',
        propertyTax: 'Thuế bất động sản',
        percentOfPricePerYear: '% giá mỗi năm',
        homeInsurance: 'Bảo hiểm nhà ở',
        perYear: 'mỗi năm',
        hoaFee: 'Phí HOA hoặc phí chung cư',
        perMonth: 'mỗi tháng',
        extraPrincipal: 'Gốc bổ sung',
        firstPayment: 'Khoản thanh toán đầu tiên',
        month: 'tháng',
        seeAmortization: 'Xem bảng khấu hao theo từng năm',
      },
      terms: {
        years: (n: number) => `${n} năm`,
      },
      table: {
        year: 'Năm',
        principal: 'Tiền gốc',
        interest: 'Tiền lãi',
        balance: 'Số dư',
      },
      result: {
        headlineLabel: 'Tổng thanh toán hàng tháng (PITI)',
        principalAndInterest: 'Gốc & lãi',
        propertyTax: 'Thuế bất động sản',
        insurance: 'Bảo hiểm',
        hoa: 'HOA',
        totalInterest: 'Tổng tiền lãi',
        paidOff: 'Đã thanh toán xong',
        note: 'Gốc, lãi, thuế bất động sản, bảo hiểm và phí HOA, dựa trên các con số bạn đã nhập.',
      },
      resultNote:
        'Thay đổi bất kỳ trường nào và các con số sẽ cập nhật khi bạn nhập. Không có dữ liệu nào được gửi đi đâu cả: phép tính chạy ngay trên trang này.',
      chart: {
        title: 'Số dư và tiền lãi, theo từng năm',
        note: 'Số dư giảm dần khi khoản vay được thanh toán, và tiền lãi phải trả mỗi năm cũng giảm theo.',
        xAxis: 'years',
        series: [
          { key: 'balance', label: 'Số dư' },
          { key: 'interest', label: 'Tiền lãi đã trả' },
        ],
      },
      formula: 'M = P · r(1 + r)ⁿ / ((1 + r)ⁿ − 1)',
      method: [
        'Khoản thanh toán hàng tháng theo lịch trình được tính từ công thức khấu hao tiêu chuẩn:',
        'P là số tiền vay, được trang này tính bằng giá nhà trừ đi khoản trả trước. r là lãi suất hàng năm bạn đã nhập chia cho mười hai, và n là thời hạn tính bằng tháng. Từ con số đó, máy tính sẽ lập lịch trình theo từng tháng: tiền lãi được tính trên số dư còn nợ vào đầu tháng, và phần còn lại của khoản thanh toán sau khi trừ đi tiền lãi đó sẽ làm giảm số dư.',
        'Khoản thanh toán hàng tháng đầy đủ là con số gốc và lãi cộng với thuế bất động sản chia cho mười hai, bảo hiểm chia cho mười hai, và bất kỳ khoản phí HOA nào. Ba khoản này do bạn tự thiết lập: máy tính không biết mức định giá tại địa phương hoặc mức phí bảo hiểm của bạn là bao nhiêu, và nó không tự ý đoán thay cho bạn.',
        'Một khoản thanh toán hàng tháng bổ sung được áp dụng vào tiền gốc, vì vậy nó làm giảm số dư mà tiền lãi của tháng tiếp theo được tính dựa trên đó. Khoản thanh toán theo lịch trình không thay đổi, khoản vay kết thúc sớm hơn và tổng tiền lãi giảm xuống.',
      ],
      limits: [
        'Nó không kiểm tra xem bạn có đủ điều kiện vay vốn hay không, và nó không xem xét điểm tín dụng, thu nhập, tỷ lệ nợ trên thu nhập hoặc các quy tắc thẩm định của bất kỳ bên cho vay nào.',
        'Công cụ này không báo giá lãi suất thị trường hiện tại cho mã bưu chính của bạn. Lãi suất bạn nhập là lãi suất bạn sử dụng và không có thông tin nào trên trang này là dữ liệu trực tiếp.',
        'Công cụ này không mô hình hóa bảo hiểm thế chấp tư nhân, điểm tín dụng, phí khởi tạo khoản vay, chi phí đóng hồ sơ hoặc thời điểm ký quỹ quyết định tháng nào phải nộp hóa đơn thuế.',
        'Công cụ này không khuyên bạn có nên mua nhà hay không. Nó chỉ đưa ra một con số và các phép tính đằng sau con số đó.',
      ],
      faq: [
        {
          q: 'PITI là viết tắt của gì?',
          a: 'Tiền gốc, Lãi suất, Thuế và Bảo hiểm. Đây là khoản thanh toán nhà ở hàng tháng gồm bốn phần: phần trả nợ gốc, phần trả lãi cho bên cho vay, thuế bất động sản và bảo hiểm chủ nhà. Máy tính này hiển thị riêng từng phần để bạn có thể thấy những yếu tố nào tạo nên tổng số tiền.',
        },
        {
          q: 'Khoản thanh toán gốc và lãi hàng tháng được tính như thế nào?',
          a: 'Đây là công thức trả góp tiêu chuẩn: M = P · r(1 + r)ⁿ / ((1 + r)ⁿ − 1), trong đó P là số tiền đã vay, r là lãi suất hằng tháng và n là số kỳ trả góp hằng tháng. Lịch trả góp sau đó chuyển tiền lãi xuống và tiền gốc lên mỗi tháng, nên các khoản trả ban đầu chủ yếu là tiền lãi.',
        },
        {
          q: 'Điều gì xảy ra với khoản thanh toán cuối cùng?',
          a: 'Khoản thanh toán theo lịch trình được làm tròn đến xu gần nhất, để lại một vài xu còn thiếu vào cuối kỳ hạn. Khoản thanh toán theo lịch trình cuối cùng được điều chỉnh để khoản vay kết thúc chính xác bằng không, giống như cách bên cho vay điều chỉnh khoản thanh toán cuối cùng.',
        },
        {
          q: 'Các khoản thanh toán thêm có làm rút ngắn thời hạn vay hay giảm số tiền thanh toán không?',
          a: 'Chúng làm rút ngắn thời hạn vay. Một khoản thanh toán thêm được áp dụng vào tiền gốc, giúp giảm số dư mà lãi suất của tháng tiếp theo được tính dựa trên đó. Khoản thanh toán theo lịch trình vẫn giữ nguyên và khoản vay kết thúc sớm hơn với tổng số tiền lãi ít hơn.',
        },
        {
          q: 'Tổng số tiền lãi có bị ảnh hưởng bởi các thông tin đầu vào về thuế và bảo hiểm của tôi không?',
          a: 'Không. Tổng số tiền lãi chỉ bao gồm khoản vay. Thuế bất động sản, bảo hiểm và phí HOA là các chi phí nhà ở vẫn tiếp tục sau khi khoản vay đã được trả hết, đó là lý do tại sao máy tính báo cáo tổng chi phí nhà ở một cách riêng biệt.',
        },
        {
          q: 'Máy tính có tính đến lạm phát không?',
          a: 'Không. Mọi con số đều tính bằng số đô la bạn đã nhập. Một khoản thanh toán thế chấp sau 30 năm sẽ chiếm tỷ trọng thu nhập nhỏ hơn nhiều so với cùng khoản thanh toán đó ngày hôm nay, và không có con số nào trên trang này được điều chỉnh cho yếu tố đó.',
        },
      ],
      sources: [
        {
          label: 'CFPB — Cách tính khoản thanh toán thế chấp',
          url: 'https://www.consumerfinance.gov/ask-cfpb/how-do-i-calculate-my-mortgage-payment-en-144/',
        },
        {
          label: 'Freddie Mac — Khảo sát Thị trường Thế chấp Sơ cấp (phương pháp luận tính lãi suất)',
          url: 'https://www.freddiemac.com/pmms',
        },
        {
          label: 'HUD — Yêu cầu đối với khoản vay FHA và bảo hiểm thế chấp',
          url: 'https://www.hud.gov/helping_american_homeowners',
        },
        {
          label: 'BLS — Chỉ số Giá tiêu dùng (lạm phát, dùng cho ghi chú giá trị thực)',
          url: 'https://www.bls.gov/cpi/',
        },
      ],
      relatedGuides: [
        { slug: 'mortgage-payment-calculator-explained', title: 'Giải thích công cụ tính khoản thanh toán thế chấp' },
        { slug: 'how-mortgage-amortization-works', title: 'Cách thức hoạt động của khấu hao thế chấp' },
        { slug: 'monthly-payment-vs-total-cost-mortgage', title: 'Thanh toán hàng tháng so với tổng chi phí của một khoản thế chấp' },
        { slug: 'extra-mortgage-payments-math', title: 'Phép tính đằng sau các khoản thanh toán thế chấp bổ sung' },
        { slug: 'how-to-read-an-amortization-schedule', title: 'Cách đọc lịch trả nợ' },
      ],
    },

    'rent-vs-buy': {
      name: 'Công cụ tính Thuê hay Mua',
      title: 'Công cụ tính Thuê hay Mua: So sánh chi phí thực tế',
      description:
        'So sánh việc thuê và sở hữu dựa trên các con số: chi phí hàng tháng, khoản chi ban đầu, vốn chủ sở hữu và tháng mà hai phương án giao nhau. Không đưa ra kết luận, chỉ có các phép tính.',
      short: 'Chi phí hàng tháng, khoản chi ban đầu, tích lũy vốn chủ sở hữu và tháng giao nhau.',
      category: 'Trang chủ',
      methodNote:
        'Sự so sánh này dựa trên dòng tiền chi ra và vốn chủ sở hữu. Công cụ cố tình không đưa ra kết luận — tháng giao nhau là một thực tế dựa trên các con số bạn đã nhập, không phải là một lời khuyên.',
      sections: {
        theHome: 'Ngôi nhà',
        theRent: 'Việc thuê nhà',
        runningCosts: 'Chi phí vận hành',
        assumptions: 'Các giả định',
      },
      fields: {
        purchasePrice: 'Giá mua',
        downPayment: 'Khoản trả trước',
        percentOfPrice: 'phần trăm giá',
        mortgageRate: 'Lãi suất thế chấp',
        annualFixed: 'hàng năm, cố định',
        loanTerm: 'Thời hạn khoản vay',
        monthlyRent: 'Tiền thuê hàng tháng',
        rentersInsurance: "Bảo hiểm người thuê nhà",
        perMonth: 'mỗi tháng',
        propertyTax: 'Thuế bất động sản',
        percentOfPricePerYear: '% giá mỗi năm',
        homeInsurance: 'Bảo hiểm nhà ở',
        perYear: 'mỗi năm',
        hoaFee: 'Phí HOA hoặc phí chung cư',
        maintenance: 'Bảo trì',
        annualChangeInValue: 'Thay đổi giá trị hàng năm',
        negativeModelsAFall: 'số âm mô phỏng mức giảm',
        compareOver: 'So sánh trong vòng',
        closingCosts: 'Chi phí đóng hồ sơ',
        percentOfPriceOnce: '% giá trị, một lần',
        sellingCosts: 'Chi phí bán nhà',
        percentOfFinalValue: '% giá trị cuối cùng',
      },
      terms: {
        years: (n: number) => `${n} năm`,
      },
      result: {
        headlineLabel: 'Chênh lệch hàng tháng (sở hữu trừ đi thuê)',
        monthlyRent: 'Tiền thuê hàng tháng',
        monthlyOwnership: 'Chi phí sở hữu hàng tháng',
        monthlyOwnershipAfterLoan: 'Chi phí sở hữu hàng tháng sau khi trả hết khoản vay',
        upfrontOutlay: 'Khoản chi trả ban đầu',
        equityBuilt: 'Vốn chủ sở hữu đã tích lũy',
        homeValueAtHorizon: 'Giá trị nhà tại thời điểm dự tính',
        sellingCostsAtHorizon: 'Chi phí bán nhà tại thời điểm dự tính',
        netCostAtHorizon: 'Chi phí ròng của việc sở hữu tại thời điểm dự tính',
        crossover: 'Điểm giao thoa',
        note: 'Quyền sở hữu bao gồm khoản thanh toán thế chấp trong thời gian vay, cùng với thuế bất động sản, bảo hiểm, phí HOA và chi phí bảo trì sau đó. Vốn chủ sở hữu là giá trị ngôi nhà trừ đi số dư nợ còn lại, sau khi đã trừ đi các chi phí bán hàng nếu bạn bán tại thời điểm đó.',
      },
      resultNote:
        'Điểm giao nhau là tháng đầu tiên mà chi phí ròng của việc sở hữu — tiền mặt đã trả trừ đi vốn chủ sở hữu thu được khi bán nhà — thấp hơn chi phí tiền mặt của việc thuê nhà. Đây là một thực tế dựa trên các con số này, không phải là một lời khuyên.',
      chart: {
        title: 'Chi phí thuê nhà so với chi phí sở hữu',
        note: 'Cả hai đường biểu thị tổng số tiền mặt tích lũy: tiền thuê nhà đã trả và số tiền chi cho ngôi nhà sau khi đã trừ đi vốn chủ sở hữu tích lũy được, tính cả chi phí bán hàng tại thời điểm đó.',
        xAxis: 'years',
        series: [
          { key: 'rent', label: 'Tiền thuê đã trả' },
          { key: 'ownership', label: 'Chi phí ròng của việc sở hữu' },
        ],
      },
      method: [
        'Mỗi tháng, máy tính sẽ chạy hai bảng tính song song. Bảng tính thuê nhà cộng tiền thuê và bảo hiểm người thuê nhà của bạn. Bảng tính sở hữu cộng khoản thanh toán thế chấp từ công thức khấu hao tiêu chuẩn, thuế bất động sản, bảo hiểm, phí HOA và khoản dự phòng bảo trì, cộng với khoản trả trước và chi phí đóng hồ sơ trong tháng đầu tiên. Khoản thanh toán thế chấp dừng lại khi khoản vay được trả hết; các chi phí vận hành khác vẫn tiếp tục chừng nào bạn còn sở hữu ngôi nhà.',
        "Bên cạnh bảng tính thứ hai, nó theo dõi giá trị ngôi nhà, tăng hoặc giảm mỗi tháng theo tỷ lệ hàng năm bạn đã nhập, và số dư nợ còn lại của khoản vay. Sự khác biệt giữa hai con số này là vốn chủ sở hữu của bạn:",
        'Chi phí ròng của việc sở hữu là số tiền mặt bạn đã trả, trừ đi vốn chủ sở hữu bạn đã tích lũy, cộng với các chi phí bán hàng nếu bạn bán tại thời điểm đó. Tháng giao nhau là tháng đầu tiên mà con số đó thấp hơn số tiền thuê bạn đã trả trong cùng khoảng thời gian. Chi phí bán hàng không phải là một phần của khoản thanh toán hàng tháng, vì bạn không phải trả chúng cho đến khi bán nhà; chúng được tính cùng với vốn chủ sở hữu khi việc bán hàng diễn ra.',
      ],
      formula: 'vốn chủ sở hữu = giá trị nhà − số dư khoản vay còn lại',
      limits: [
        'Công cụ này không cho biết lựa chọn nào tốt hơn cho bạn. Hai phương án được so sánh dựa trên các con số bạn cung cấp và tháng giao nhau được báo cáo, không có gì hơn.',
        'Công cụ này không mô hình hóa việc xử lý thuế khi bán nhà, khấu trừ lãi vay thế chấp hoặc khấu hao tài sản theo thời gian.',
        'Công cụ này không định giá một khoản vay cụ thể. Lãi suất thế chấp bạn nhập là lãi suất được sử dụng; trang này không cung cấp báo giá trực tiếp hay thông tin của bên cho vay.',
        'Công cụ này không dự báo giá nhà. Mức thay đổi giá trị hàng năm bạn nhập sẽ được áp dụng theo từng tháng trong suốt khoảng thời gian dự tính, theo cả hai chiều nếu bạn nhập số âm.',
        'Công cụ này không mô hình hóa chi phí chuyển ra khỏi nhà thuê. Tiền đặt cọc, phí môi giới và chi phí chuyển nhà nằm ngoài phạm vi so sánh ở phía thuê nhà.',
        'Công cụ này không sử dụng mức thuế của một quận hoặc thành phố cụ thể. Thuế bất động sản mà trang có thể tự điền là mức trung bình của tiểu bang, và thuế bất động sản được quy định tại địa phương, vì vậy mức thuế ở khu vực này thường khác với mức thuế ở khu vực khác.',
      ],
      faq: [
        {
          q: 'Tháng giao thoa có nghĩa là gì?',
          a: 'Đó là tháng đầu tiên mà chi phí sở hữu ròng — số tiền mặt bạn đã trả, trừ đi vốn chủ sở hữu bạn đã tích lũy, cộng với chi phí bán nhà tại thời điểm đó — thấp hơn số tiền mặt bạn đã trả cho việc thuê nhà trong cùng khoảng thời gian. Trước thời điểm đó, thuê nhà tốn ít chi phí hơn xét về mặt tiền mặt. Sau thời điểm đó, sở hữu nhà tốn ít chi phí hơn khi tính đến vốn chủ sở hữu.',
        },
        {
          q: 'Tại sao phép tính lại bao gồm khoản dự phòng bảo trì?',
          a: 'Một ngôi nhà cần tốn chi phí để duy trì sửa chữa bất kể có khoản thế chấp gắn liền với nó hay không, và chi phí đó không xuất hiện trên bất kỳ bảng quyết toán nào. Công cụ tính toán áp dụng chi phí này dưới dạng phần trăm giá mua mỗi năm, và tỷ lệ phần trăm này là thông tin đầu vào do bạn thiết lập.',
        },
        {
          q: 'Điều gì xảy ra với giá trị ngôi nhà trong phép tính?',
          a: 'Giá trị này được tăng hoặc giảm mỗi tháng theo tỷ lệ hàng năm bạn nhập, sau đó được so sánh với số dư khoản vay còn lại để đưa ra con số vốn chủ sở hữu. Tỷ lệ âm mô hình hóa một thị trường đang giảm; tỷ lệ bằng không giữ giá nhà không đổi.',
        },
        {
          q: 'Chi phí bán nhà có được bao gồm không?',
          a: 'Có. Chi phí bán nhà được tính trên giá trị ngôi nhà tại thời điểm bán, vì vậy chúng không phải là một phần của khoản thanh toán hàng tháng. Chúng làm giảm vốn chủ sở hữu mà việc bán nhà mang lại cho bạn, và do đó chúng là một phần của chi phí sở hữu ròng và tháng giao thoa. Con số này được báo cáo riêng tại thời điểm kết thúc.',
        },
        {
          q: 'Điều gì xảy ra với khoản thanh toán thế chấp sau khi khoản vay được trả hết?',
          a: 'Khoản thanh toán đó sẽ dừng lại. Tiền gốc và lãi của khoản vay kết thúc cùng với khoản vay, trong khi thuế bất động sản, bảo hiểm, phí HOA và chi phí bảo trì vẫn tiếp tục chừng nào bạn còn sở hữu ngôi nhà. Khi phép so sánh vượt quá thời hạn vay, các tháng sau đó chỉ bao gồm các chi phí vận hành.',
        },
        {
          q: 'Sự khác biệt giữa tổng tiền thuê nhà và chi phí sở hữu ròng là gì?',
          a: 'Tổng tiền thuê nhà đơn giản là số tiền bạn trả tiền thuê mỗi tháng nhân với số tháng. Chi phí sở hữu ròng là số tiền bạn trả cho khoản thế chấp, thuế, bảo hiểm, phí HOA và bảo trì, cộng với khoản chi phí trả trước, trừ đi vốn chủ sở hữu bạn đã tích lũy được, cộng với chi phí bán nhà. Con số thứ hai có thể là số âm, nghĩa là bạn đã tích lũy được nhiều vốn chủ sở hữu hơn số tiền bạn đã chi trả.',
        },
        {
          q: 'Công cụ này có bao gồm các hệ quả về thuế khi bán nhà không?',
          a: 'Không. Bất kỳ khoản lợi nhuận nào từ việc bán nhà và bất kỳ khoản miễn trừ nào áp dụng cho khoản lợi nhuận đó đều nằm ngoài phạm vi của công cụ này. So sánh ở đây là so sánh về tiền mặt và vốn chủ sở hữu, không phải so sánh về thuế.',
        },
        {
          q: 'Thuế suất thuế tài sản được lấy từ đâu?',
          a: 'Đó là một dữ liệu đầu vào. Khi mạng lưới có thể xác định được tiểu bang mà yêu cầu bắt nguồn, trang web sẽ tự động điền vào trường này mức thuế suất thuế tài sản hiệu dụng trung bình cho tiểu bang đó, được lấy từ Khảo sát Cộng đồng Hoa Kỳ năm 2024 và do Tax Foundation công bố năm 2026. Thuế tài sản do chính quyền địa phương quy định, vì vậy mức thuế suất ở một quận hoặc thành phố cụ thể thường khác với mức trung bình của tiểu bang, và trường này vẫn có thể chỉnh sửa được.',
        },
      ],
      sources: [
        {
          label: 'CFPB — Chi phí nhà ở, thuê nhà và sở hữu nhà',
          url: 'https://www.consumerfinance.gov/consumer-tools/mortgages/',
        },
        {
          label: 'HUD — Hướng dẫn về chi phí nhà ở, thuế tài sản và bảo hiểm',
          url: 'https://www.hud.gov/helping_american_homeowners',
        },
        {
          label: 'BLS — Chỉ số giá tiêu dùng (lạm phát, cho ghi chú về mức tăng giá)',
          url: 'https://www.bls.gov/cpi/',
        },
        {
          label: 'FRED — Chuỗi chỉ số giá nhà được sử dụng cho biến động giá dài hạn',
          url: 'https://fred.stlouisfed.org/series/HPINUS',
        },
        {
          label: 'Tax Foundation — Thuế tài sản theo Tiểu bang và Quận, 2026',
          url: 'https://taxfoundation.org/data/all/state/property-taxes-by-state-county/',
        },
      ],
      relatedGuides: [
        { slug: 'rent-vs-buy-calculator-explained', title: 'Giải thích về công cụ tính thuê hay mua nhà' },
        { slug: 'rent-vs-buy-common-mistakes', title: 'Những sai lầm phổ biến khi so sánh giữa thuê và mua nhà' },
        { slug: 'estimating-property-tax-and-home-insurance', title: 'Ước tính thuế bất động sản và bảo hiểm nhà ở' },
        { slug: 'down-payment-and-closing-costs-explained', title: 'Giải thích về khoản trả trước và chi phí đóng hồ sơ' },
        { slug: 'monthly-payment-vs-total-cost-mortgage', title: 'Thanh toán hàng tháng so với tổng chi phí của một khoản thế chấp' },
      ],
      script: {
        notWithinHorizon: 'Không nằm trong tầm nhìn',
        month: 'Tháng {n}',
        propertyTaxDetected: 'Được điền với {state}: thuế suất bất động sản hiệu dụng trung bình cho tiểu bang này.',
      },
    },

    'compound-interest': {
      name: 'Máy tính Lãi suất Kép',
      title: 'Máy tính Lãi suất Kép với các khoản đóng góp hàng tháng',
      description:
        "Dự tính số dư với các khoản đóng góp định kỳ, chọn tần suất gộp lãi và xem kết quả theo giá trị đô la ngày nay sau khi đã điều chỉnh lạm phát. Các công thức được hiển thị.",
      short: 'Số dư, các khoản đóng góp, tiền lãi kiếm được và giá trị đã điều chỉnh theo lạm phát.',
      category: 'Đầu tư',
      methodNote:
        'Phép tính dự phóng chạy từng kỳ một, vì vậy bảng hàng năm được tạo ra bởi cùng một phép tính tạo ra con số cuối cùng.',
      fields: {
        startingBalance: 'Số dư ban đầu',
        today: 'hôm nay',
        monthlyContribution: 'Khoản đóng góp hàng tháng',
        addedEachMonth: 'được thêm vào mỗi tháng',
        interestRate: 'Lãi suất',
        annualNominal: 'hàng năm, danh nghĩa',
        time: 'Thời gian',
        years: 'năm',
        compounding: 'Gộp lãi',
        contributionTiming: 'Thời điểm đóng góp',
        inflation: 'Lạm phát',
        annualForRealValue: 'hàng năm, cho con số giá trị thực',
        seeBalance: 'Xem số dư theo từng năm',
      },
      frequencies: {
        monthly: 'Hàng tháng',
        quarterly: 'Hàng quý',
        twiceAYear: 'Hai lần một năm',
        annually: 'Hàng năm',
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
        contributed: 'Đã đóng góp',
        interest: 'Tiền lãi',
        inTodaysDollars: "Theo giá trị đô la ngày nay",
      },
      result: {
        headlineLabel: 'Số dư vào cuối kỳ',
        totalContributions: 'Tổng số tiền đóng góp',
        interestEarned: 'Tiền lãi kiếm được',
        inTodaysDollars: "Theo giá trị đô la ngày nay",
        effectiveAnnualRate: 'Lãi suất thực tế hàng năm',
        realAnnualRate: 'Lãi suất thực hàng năm',
        horizon: 'Thời hạn',
        note: 'Số dư được tính bằng số đô la bạn đã nhập. Con số đã điều chỉnh theo lạm phát chuyển đổi nó sang sức mua của năm bắt đầu.',
      },
      resultNote:
        'Lãi suất bạn nhập được sử dụng chính xác như đã nhập cho toàn bộ thời kỳ. Trang này không tra cứu lãi suất thị trường.',
      chart: {
        title: 'Cấu thành của số dư',
        note: 'Đường biểu đồ là số dư. Dải màu bên dưới là phần số dư đến từ tiền lãi thay vì từ các khoản đóng góp.',
        xAxis: 'years',
        series: [
          { key: 'balance', label: 'Số dư' },
          { key: 'contributed', label: 'Đã đóng góp' },
        ],
      },
      method: [
        'Phép tính dự báo tiến hành từng kỳ tính lãi một. Trong mỗi kỳ, số dư sẽ sinh lãi theo lãi suất của kỳ đó, sau đó khoản đóng góp cho kỳ đó được cộng vào — vào cuối kỳ hoặc đầu kỳ, tùy thuộc vào cài đặt của bạn. Việc chạy tuần tự các kỳ thay vì sử dụng một biểu thức đóng là cách tạo ra bảng tính theo từng năm, và số dư cuối cùng vẫn giống nhau trong cả hai trường hợp.',
        'Ở dạng đóng, kết quả tương tự là:',
        'trong đó P là số dư ban đầu, r là lãi suất hàng năm chia cho số kỳ tính lãi mỗi năm, n là số kỳ, và PMT là khoản đóng góp được thực hiện trong mỗi kỳ. Khoản đóng góp thực hiện vào đầu kỳ sẽ sinh lãi cho toàn bộ kỳ đó, vì vậy trong trường hợp này, số tiền đóng góp được nhân với (1 + r).',
        'Các con số thực tế đến từ hai điều chỉnh. Lãi suất thực tế hàng năm là (1 + r) lũy thừa với số kỳ mỗi năm, đây là mức lãi suất mà lãi suất danh nghĩa 7 % thực sự đạt được sau khi áp dụng lãi kép hàng tháng trong một năm. Lãi suất thực tế lấy lãi suất hiệu dụng đó chia cho hệ số lạm phát, và số dư theo giá trị đô la ngày nay bằng số dư danh nghĩa chia cho lạm phát được tính kép trong cùng khoảng thời gian đó.',
      ],
      formula: 'FV = P(1 + r)ⁿ + PMT · ((1 + r)ⁿ − 1) / r',
      limits: [
        'Công cụ này không dự đoán lợi nhuận. Lãi suất bạn nhập được sử dụng chính xác như đã nhập cho toàn bộ thời kỳ; không có mức trung bình lịch sử, không có dự báo và không có dữ liệu thị trường nào được đưa vào trang này.',
        "Công cụ này không mô hình hóa các loại thuế, phí hoặc lệ phí tài khoản. Số dư của một tài khoản thực tế sẽ khác biệt tùy thuộc vào các khoản phí mà nhà cung cấp thu.",
        'Công cụ này không mô hình hóa biến động thị trường. Số dư thực tế sẽ giảm trong những năm thị trường thực tế đi xuống, và không có lãi suất cố định nào phản ánh được điều đó.',
        'Công cụ này không hướng dẫn bạn cách đầu tư hay liệu có nên tiết kiệm hay không. Nó chỉ dự báo một con số dựa trên các giả định mà bạn cung cấp.',
      ],
      faq: [
        {
          q: 'Tại sao tần suất tính lãi chỉ có thể là 1, 2, 3, 4, 6 hoặc 12?',
          a: 'Vì các khoản đóng góp ở đây được thực hiện hàng tháng, và máy tính giữ cho kỳ tính lãi và kỳ đóng góp giống nhau. Bất kỳ tần suất nào chia hết cho mười hai đều giữ cho phép tính đó chính xác thay vì xấp xỉ. Trên thực tế, sáu tần suất này bao quát từ tính lãi hàng ngày đến hàng năm so với các khoản tiền gửi hàng tháng.',
        },
        {
          q: 'Sự khác biệt giữa lãi suất danh nghĩa và lãi suất thực tế hàng năm là gì?',
          a: 'Lãi suất danh nghĩa là con số trên tài khoản: 7 %. Lãi suất thực tế là mức lãi mà số dư thực sự kiếm được sau khi áp dụng lãi kép trong một năm, vì vậy 7 % tính lãi kép hàng tháng sẽ là 7.229 %. Trang này hiển thị cả hai, vì sự khác biệt này rất quan trọng trong các khoảng thời gian dài.',
        },
        {
          q: 'Giá trị thực có nghĩa là gì?',
          a: 'Đây là số dư cuối cùng được thể hiện theo sức mua của năm bắt đầu. Phép tính chia số dư danh nghĩa cho tỷ lệ lạm phát được cộng dồn trong cùng khoảng thời gian, cho thấy bao nhiêu phần của số dư là tăng trưởng thực tế và bao nhiêu là giá trị của cùng một số tiền đó theo thời gian.',
        },
        {
          q: 'Thời điểm đóng góp có làm thay đổi kết quả không?',
          a: 'Có, và trang này hiển thị cả hai trường hợp. Một khoản đóng góp thực hiện vào đầu mỗi kỳ sẽ sinh lãi cho toàn bộ kỳ đó, vì vậy kết quả cuối cùng sẽ cao hơn so với cùng khoản đóng góp đó thực hiện vào cuối kỳ. Sự khác biệt là nhỏ trên mỗi lần thanh toán nhưng sẽ tích lũy qua nhiều thập kỷ.',
        },
        {
          q: 'Điều gì xảy ra ở mức lãi suất bằng không?',
          a: 'Số dư chỉ tăng theo các khoản đóng góp mà không có lãi suất. Công cụ tính toán xử lý trường hợp này một cách rõ ràng thay vì chia cho số không, đó là lý do tại sao con số này chính xác bằng tổng các khoản tiền đã gửi.',
        },
        {
          q: 'Có bắt buộc phải đóng góp định kỳ không?',
          a: 'Không. Việc đặt khoản đóng góp hàng tháng bằng không sẽ biến phép tính thành dự báo lãi kép đơn thuần trên số dư ban đầu, đây là mô hình phù hợp cho một khoản tiền gốc đã được đầu tư.',
        },
      ],
      sources: [
        {
          label: 'SEC — Investor.gov: lãi kép và chi phí của các loại phí',
          url: 'https://www.investor.gov/introduction-investing/investing-basics/glossary/compound-interest',
        },
        {
          label: 'BLS — Chỉ số giá tiêu dùng (cho các số liệu đã điều chỉnh theo lạm phát)',
          url: 'https://www.bls.gov/cpi/',
        },
        {
          label: 'Cục Dự trữ Liên bang — Dữ liệu về tiền gửi có kỳ hạn và lãi suất tiết kiệm',
          url: 'https://www.federalreserve.gov/releases/h15/',
        },
        {
          label: 'IRS — Lãi kép và sự tăng trưởng của tài khoản hưu trí truyền thống (IRA)',
          url: 'https://www.irs.gov/retirement-plans/traditional-iras',
        },
      ],
      relatedGuides: [
        { slug: 'compound-interest-calculator-explained', title: 'Giải thích máy tính lãi kép' },
        { slug: 'compound-vs-simple-interest', title: 'Lãi kép so với lãi đơn' },
        { slug: 'how-compounding-frequency-changes-results', title: 'Tần suất nhập lãi thay đổi kết quả như thế nào' },
        { slug: 'inflation-and-real-returns-explained', title: 'Giải thích lạm phát và lợi nhuận thực' },
        { slug: 'understanding-apr', title: 'Hiểu về APR và lãi suất phần trăm hàng năm' },
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
        'Tính toán số tiền còn lại từ tiền lương sau khi trừ thuế thu nhập liên bang, An sinh xã hội, Medicare và thuế tiểu bang, cho bất kỳ kỳ trả lương nào, với mọi khoản khấu trừ được hiển thị.',
      short: 'Số tiền lương còn lại sau khi trừ thuế liên bang, thuế lương và thuế tiểu bang.',
      category: 'Tiền lương',
      methodNote:
        'Các con số này áp dụng cho năm tính thuế 2026: Rev. Proc. 2025-32 cho các khung thuế liên bang và mức khấu trừ tiêu chuẩn, và Cơ quan An sinh Xã hội cho các giới hạn thuế lương. Không có thông tin nào trên trang này là báo giá từ nhà cung cấp dịch vụ trả lương.',
      fields: {
        grossPay: 'Tổng lương',
        payPeriod: 'Kỳ trả lương',
        filingStatus: 'Tình trạng khai thuế',
        stateRate: 'Thuế suất thu nhập tiểu bang',
        stateRateHint: 'thuế suất cho khung thuế của bạn',
        retirementContribution: 'Đóng góp vào 401(k) hoặc 403(b)',
        retirementHint: 'mỗi năm — vẫn phải chịu thuế lương',
        healthContribution: 'Đóng góp vào HSA hoặc FSA',
        healthHint: 'mỗi năm — không phải chịu thuế lương',
        perYear: 'mỗi năm',
        debtName: 'Khoản nợ',
        balance: 'Số dư',
        rate: 'Lãi suất',
        minimum: 'Khoản thanh toán tối thiểu',
      },
      terms: {
        payPeriods: {
          year: 'Hàng năm',
          month: 'Hàng tháng',
          week: 'Hàng tuần',
          day: 'Mỗi ngày',
          hour: 'Mỗi giờ',
        },
        filingStatuses: {
          single: 'Độc thân',
          married: 'Đã kết hôn khai thuế chung',
          head: 'Chủ hộ',
        },
      },
      result: {
        headlineLabel: 'Thu nhập thực nhận',
        annualGross: 'Tổng thu nhập trong năm',
        federalTax: 'Thuế thu nhập liên bang',
        socialSecurity: 'Social Security',
        medicare: 'Medicare',
        additionalMedicare: 'Thuế Medicare bổ sung',
        stateTax: 'Thuế thu nhập tiểu bang',
        totalTax: 'Tổng thuế',
        netPerMonth: 'Thu nhập thực nhận mỗi tháng',
        effectiveRate: 'Thuế suất thực tế',
        note:
          'Số tiền thực nhận là tổng thu nhập trừ đi các khoản khấu trừ nêu trên, chia cho số kỳ trả lương trong năm.',
        negativeNote:
          'Các khoản khấu trừ lớn bằng tổng thu nhập và các loại thuế lương vẫn được tính trên đó, vì vậy con số thực nhận nhỏ hơn không. Các giới hạn đóng góp hàng năm không được kiểm tra tại đây.',
      },
      resultNote:
        'Hệ thống tính lương sử dụng các lựa chọn khấu trừ trên mẫu W-4 và số tiền đã khấu trừ trong năm, vì vậy con số trên phiếu lương thực tế sẽ thay đổi đôi chút theo từng tháng.',
      chart: {
        title: 'Tổng thu nhập đi đâu',
        note: 'Một thanh biểu đồ cho cả năm, được chia thành phần thu nhập thực nhận và các phần bị khấu trừ.',
        xAxis: 'none',
        series: [
          { key: 'net', label: 'Thu nhập thực nhận' },
          { key: 'federal', label: 'Thuế thu nhập liên bang' },
          { key: 'socialSecurity', label: 'Social Security' },
          { key: 'medicare', label: 'Medicare' },
          { key: 'state', label: 'Thuế thu nhập tiểu bang' },
        ],
      },
      formula:
        'thu nhập thực nhận = thu nhập trước thuế − các khoản khấu trừ trước thuế − thuế thu nhập liên bang − Social Security − Medicare − thuế thu nhập tiểu bang',
      method: [
        'Phép tính bắt đầu từ tổng lương và tính ngược lại qua các khoản khấu trừ, theo thứ tự mà hệ thống bảng lương áp dụng. Các khoản khấu trừ trước thuế được trừ ra trước, vì khoản đóng góp vào 401(k) hoặc tài khoản y tế được trích từ tiền lương trước khi bị đánh thuế. Phần còn lại là tiền lương chịu thuế.',
        'Hai khoản khấu trừ này không được xử lý theo cùng một cách. Khoản đóng góp vào 401(k) hoặc 403(b) được loại trừ khỏi thu nhập, nhưng vẫn được tính là tiền lương cho An sinh xã hội và Medicare, vì vậy nó làm giảm thuế liên bang và giữ nguyên các loại thuế bảng lương. Khoản đóng góp vào HSA hoặc FSA được trích từ tiền lương được loại trừ khỏi thu nhập và khỏi tiền lương tính An sinh xã hội, vì vậy nó làm giảm cả hai.',
        'Thuế thu nhập liên bang được tính trên tiền lương chịu thuế đó. Khoản khấu trừ tiêu chuẩn cho tình trạng khai thuế được trừ đi, và kết quả được tính theo bảng thuế suất năm 2026. Mỗi khung thuế là một số tiền thuế cố định cộng với một tỷ lệ phần trăm của thu nhập trên mức thấp nhất của khung đó, đây là cách IRS công bố bảng thuế.',
        'Các loại thuế bảng lương được tính tiếp theo. Chúng được tính trên tiền lương trừ đi bất kỳ khoản đóng góp HSA hoặc FSA nào, vì khoản đóng góp 401(k) vẫn nằm trong tiền lương cho các mục đích này. An sinh xã hội là 6,2% tiền lương lên đến mức tối đa chịu thuế là $184,500 cho năm 2026. Medicare là 1,45% toàn bộ tiền lương không có giới hạn, và Thuế Medicare bổ sung là 0,9% phần trên $200,000 đối với người khai thuế độc thân, hoặc trên $250,000 đối với vợ chồng khai thuế chung.',
        'Thuế thu nhập tiểu bang là mức thuế suất bạn nhập vào, áp dụng cho thu nhập chịu thuế. Đây là một ước tính: hầu hết các tiểu bang đánh thuế theo khung, vì vậy một con số áp dụng cho toàn bộ thu nhập sẽ cao hơn mức mà hầu hết mọi người phải trả. Con số cuối cùng là phần còn lại, chia cho số kỳ trả lương trong năm.',
      ],
      limits: [
        'Phép tính này không mô hình hóa các khoản tín dụng thuế. Tín dụng thuế trẻ em, tín dụng thu nhập do làm việc và các tín dụng giáo dục làm thay đổi con số cuối cùng và không có trong phép tính.',
        'Phép tính này không mô hình hóa lãi vốn, thu nhập tự doanh, hoặc cách xử lý thu nhập trên mức cơ sở tiền lương An sinh xã hội, nơi Medicare vẫn áp dụng còn An sinh xã hội thì không.',
        'Phép tính này không mô hình hóa các loại thuế địa phương. Thuế thu nhập thành phố và quận tách biệt với mức thuế suất tiểu bang.',
        'Số kỳ thanh toán được tính theo quy ước: 12 tháng, 52 tuần, 260 ngày làm việc, hoặc 2.080 giờ cho một tuần làm việc 40 giờ trong 52 tuần. Nếu bạn được trả lương theo lịch trình khác, bạn có thể nhập con số hàng năm thay thế.',
        'Khoản đóng góp HSA và FSA được coi là khoản giảm lương trừ trực tiếp vào phiếu lương, đây là lý do khiến khoản này không phải chịu thuế An sinh Xã hội và Medicare. Khoản đóng góp HSA được thực hiện trực tiếp từ tài khoản ngân hàng được tính là tiền lương cho mục đích đóng thuế An sinh Xã hội, và trường hợp đó không nằm trong tính toán này.',
        'Khoản đóng góp 401(k) vượt quá giới hạn hàng năm cho năm 2026 sẽ phải chịu lại một phần thuế lương, và tính toán này áp dụng thuế lương cho toàn bộ khoản đóng góp.',
        'Công cụ này không kiểm tra các giới hạn hàng năm đối với các khoản đóng góp. Một khoản đóng góp 401(k) hoặc HSA lớn bằng toàn bộ tiền lương sẽ khiến con số thu nhập thực nhận xuống dưới mức không, vì thuế lương vẫn được tính trên khoản đó.',
      ],
      faq: [
        {
          q: 'Tại sao thu nhập thực nhận của tôi lại thấp hơn tổng lương trừ đi thuế thu nhập?',
          a: 'Vì tiền lương bị giảm bởi thuế An sinh Xã hội và Medicare trước khi thuế thu nhập được tính. Đó là các loại thuế lương đánh vào chính công việc, tách biệt với thuế thu nhập trên phiếu lương.',
        },
        {
          q: 'Khoản đóng góp 401(k) có làm giảm thuế An sinh Xã hội và Medicare của tôi không?',
          a: 'Không. Khoản này được trừ vào tiền lương trước khi thuế thu nhập liên bang được tính, nhưng vẫn được coi là tiền lương để tính thuế lương, vì vậy thuế An sinh Xã hội và Medicare vẫn được áp dụng trên khoản đó. Khoản đóng góp HSA hoặc FSA được trừ vào phiếu lương thì khác: nó cũng được trừ vào cơ sở tính các loại thuế đó. Đó là lý do tại sao hai khoản này được nhập riêng biệt.',
        },
        {
          q: 'Công cụ này có sử dụng khung thuế thực tế của tôi không?',
          a: 'Nó sử dụng bảng khung thuế năm 2026 và mức giảm trừ gia cảnh tiêu chuẩn cho tình trạng khai thuế của bạn, vì vậy con số này gần với mức mà hệ thống tính lương áp dụng cho người làm công ăn lương không có thu nhập nào khác. Nó không biết về các khoản tín dụng, các khoản khấu trừ khác hoặc thu nhập khác.',
        },
        {
          q: 'Sự khác biệt giữa thuế suất hiệu dụng và thuế suất biên là gì?',
          a: 'Thuế suất biên là mức thuế áp dụng cho mỗi đô la thu nhập chịu thuế tiếp theo, và đó là khung thuế cao nhất mà thu nhập của bạn đạt tới. Thuế suất hiệu dụng là tổng số thuế chia cho toàn bộ thu nhập, và nó thấp hơn vì các khung thuế cao hơn chỉ áp dụng cho phần thu nhập vượt trên các mức đó.',
        },
        {
          q: 'Tôi nên sử dụng mức thuế suất tiểu bang nào?',
          a: 'Mức thuế suất áp dụng cho khung thuế của riêng bạn tại tiểu bang của bạn. Hầu hết các tiểu bang đánh thuế theo bậc, vì vậy thuế suất hiệu dụng thấp hơn thuế suất cao nhất. Con số này hoàn toàn chính xác đối với tiểu bang có thuế suất cố định và tiểu bang không có thuế thu nhập.',
        },
        {
          q: 'Tại sao thuế An sinh Xã hội bị giới hạn còn thuế Medicare thì không?',
          a: 'An sinh Xã hội có mức thu nhập chịu thuế tối đa được ấn định hàng năm, là $184,500 cho năm 2026, và các khoản thu nhập vượt mức này sẽ không bị đánh thuế An sinh Xã hội. Medicare không có mức trần, vì vậy thuế này áp dụng cho mọi đô la tiền lương.',
        },
        {
          q: 'Tôi có thể sử dụng công cụ này để tính hóa đơn thuế của mình không?',
          a: 'Không. Công cụ này tính toán số thuế được khấu trừ từ tiền lương. Tờ khai thuế là một phép tính khác: nó bao gồm các khoản thu nhập khác, các khoản khấu trừ, tín dụng thuế và các khoản thanh toán đã thực hiện, và được nộp mỗi năm một lần thay vì mỗi kỳ trả lương.',
        },
      ],
      sources: [
        {
          label: 'IRS — Rev. Proc. 2025-32, điều chỉnh lạm phát cho năm tính thuế 2026',
          url: 'https://www.irs.gov/irb/2025-45_IRB',
        },
        {
          label: 'Cơ quan An sinh Xã hội — Cơ sở tiền lương và cola năm 2026',
          url: 'https://www.ssa.gov/cola/',
        },
        {
          label: 'Cơ quan An sinh Xã hội — Ấn phẩm 15, Hướng dẫn Thuế cho Người sử dụng lao động',
          url: 'https://www.ssa.gov/pubs/EN-05-10035.pdf',
        },
        {
          label: 'IRS — Chủ đề Thuế 401, Tiền lương và tiền công',
          url: 'https://www.irs.gov/taxtopics/tc401',
        },
        {
          label: 'Cơ quan An sinh Xã hội — POMS RS 01402.038, Các chương trình chăm sóc sức khỏe được ưu đãi thuế',
          url: 'https://secure.ssa.gov/poms.nsf/lnx/0301402038',
        },
        {
          label: 'IRS — Chủ đề Thuế 511, Khấu trừ thuế',
          url: 'https://www.irs.gov/taxtopics/tc511',
        },
      ],
      relatedGuides: [
        {
          slug: 'net-pay-calculator-explained',
          title: 'Cách tính thu nhập thực nhận',
        },
      ],
    },

    'income-tax': {
      name: 'Công cụ tính Thuế Thu nhập Liên bang',
      title: 'Công cụ tính Thuế Thu nhập Liên bang cho Năm Thuế 2026',
      description:
        'Tính thuế thu nhập liên bang năm 2026 dựa trên thu nhập trong năm, với thuế tiểu bang được tính từ các khung thuế, tình trạng khai thuế, khoản khấu trừ của tiểu bang đó, cùng với thuế suất hiệu dụng và thuế suất biên được hiển thị song song.',
      short: 'Thuế thu nhập liên bang và tiểu bang trên thu nhập trong năm, với cả hai mức thuế suất được hiển thị.',
      category: 'Tiền lương',
      methodNote:
        'Các khung thuế liên bang và khoản khấu trừ tiêu chuẩn là các số liệu năm 2026 từ Rev. Proc. 2025-32, được công bố ngày 3 tháng 11 năm 2025. Thuế tiểu bang được tính từ các khung thuế, khoản khấu trừ tiêu chuẩn, miễn trừ cá nhân và các khoản tín dụng của tiểu bang bạn chọn, lấy từ các bảng của Tax Foundation ngày 28 tháng 4 năm 2026. Các bảng dành cho chủ hộ, khoản khấu trừ thuế thu nhập liên bang và các khoản tín dụng tiểu bang được lấy từ các biểu mẫu của chính các tiểu bang. Các loại thuế lương được khấu trừ từ tiền lương không phải là một phần của phép tính này; chúng nằm trong công cụ tính thu nhập thực nhận.',
      script: {
        stateDetected: 'Được điền với {state}: tiểu bang nơi yêu cầu của bạn xuất phát.',
        childrenTotal: 'Tổng số trẻ em đủ điều kiện: {count}',
      },
      fields: {
        grossIncome: 'Tổng thu nhập trong năm',
        filingStatus: 'Tình trạng khai thuế',
        itemisedDeduction: 'Khấu trừ theo hạng mục',
        standardDeduction: 'Khấu trừ tiêu chuẩn',
        useStandard: 'Sử dụng mức khấu trừ tiêu chuẩn',
        state: 'Tiểu bang',
        stateHint: 'cho thuế tiểu bang',
        stateNone: 'Không có tiểu bang',
        children: 'Trẻ em đủ điều kiện',
        childrenHint: 'theo độ tuổi vào cuối năm tính thuế',
        childBand: 'Trẻ em từ {range} tuổi',
        stateTaxOverride: 'Thuế tiểu bang của bạn',
        stateTaxOverrideHint: 'để trống để sử dụng mô hình',
        preTax: 'Các khoản khấu trừ trước thuế',
        preTaxHint: '401(k), HSA, FSA mỗi năm',
        perYear: 'mỗi năm',
      },
      terms: {
        filingStatuses: {
          single: 'Độc thân',
          married: 'Đã kết hôn khai thuế chung',
          head: 'Chủ hộ',
        },
      },
      result: {
        headlineLabel: 'Thuế thu nhập liên bang',
        taxableIncome: 'Thu nhập chịu thuế',
        deductionApplied: 'Khoản khấu trừ đã áp dụng',
        standardDeduction: 'Khấu trừ tiêu chuẩn',
        itemisedDeduction: 'Khấu trừ theo hạng mục',
        federalTax: 'Thuế thu nhập liên bang',
        stateTaxableIncome: 'Thu nhập chịu thuế tiểu bang',
        stateCredits: 'Các khoản tín dụng tiểu bang',
        stateChildCredit: 'Tín dụng thuế trẻ em của tiểu bang',
        federalTaxDeducted: 'Thuế liên bang đã khấu trừ',
        stateTax: 'Thuế thu nhập tiểu bang',
        totalTax: 'Tổng thuế',
        effectiveRate: 'Thuế suất thực tế',
        marginalRate: 'Thuế suất biên',
        afterTax: 'Thu nhập sau thuế',
        note:
          'Khoản khấu trừ được áp dụng là giá trị lớn hơn trong hai khoản: khấu trừ tiêu chuẩn cho tình trạng khai thuế hoặc khấu trừ theo hạng mục đã nhập ở bên trái. Thuế tiểu bang được tính dựa trên tiểu bang bạn chọn.',
      },
      resultNote:
        'Con số này là nghĩa vụ thuế, không phải số tiền bị khấu trừ từ phiếu lương. Con số liên bang không bao gồm các khoản tín dụng liên bang hoặc các khoản thanh toán đã thực hiện trong năm; con số tiểu bang bao gồm các khoản tín dụng tiểu bang mà mô hình áp dụng.',
      chart: {
        title: 'Số thu nhập còn lại',
        note: 'Một thanh biểu thị cho cả năm, được chia thành phần bạn giữ lại và phần nộp thuế.',
        xAxis: 'none',
        series: [
          { key: 'afterTax', label: 'Thu nhập sau thuế' },
          { key: 'federal', label: 'Thuế thu nhập liên bang' },
          { key: 'state', label: 'Thuế thu nhập tiểu bang' },
        ],
      },
      formula:
        'thu nhập chịu thuế = thu nhập trước thuế − các khoản khấu trừ trước thuế − khoản khấu trừ; thuế = bảng thuế áp dụng cho thu nhập chịu thuế; thuế tiểu bang = các mức thuế tiểu bang áp dụng cho thu nhập trước thuế đã điều chỉnh trừ khoản khấu trừ tiêu chuẩn và miễn trừ của tiểu bang, trừ thuế thu nhập liên bang đã nộp nếu tiểu bang cho phép, trừ các khoản tính thuế tiểu bang',
      method: [
        'Phép tính bắt đầu với tổng thu nhập trong năm và trừ đi các khoản khấu trừ trước thuế, vì khoản đóng góp vào 401(k) hoặc tài khoản y tế không bị đánh thuế như thu nhập.',
        'Tiếp theo là khoản khấu trừ. Khoản khấu trừ tiêu chuẩn cho tình trạng khai thuế được sử dụng trừ khi bạn nhập khoản khấu trừ theo hạng mục, và giá trị lớn hơn trong hai khoản sẽ được áp dụng. Khoản khấu trừ tiêu chuẩn cho năm 2026 là $16,100 đối với người khai thuế độc thân, $32,200 đối với vợ chồng khai thuế chung và $24,150 đối với chủ hộ.',
        'Phần còn lại là thu nhập chịu thuế, và thuế là số tiền dựa trên bảng khung thuế năm 2026 áp dụng cho thu nhập đó. Mỗi khung thuế là một số tiền thuế cố định cộng với một tỷ lệ phần trăm của thu nhập vượt quá mức thấp nhất của khung đó, theo cách mà IRS công bố.',
        'Hai mức thuế suất này trả lời cho các câu hỏi khác nhau. Thuế suất biên là mức thuế áp dụng cho mỗi đô la thu nhập chịu thuế tiếp theo, đây là khung thuế cao nhất mà thu nhập của bạn đạt tới. Thuế suất thực tế là tổng số thuế chia cho toàn bộ thu nhập, và mức này thấp hơn vì các khung thuế cao hơn chỉ áp dụng cho phần thu nhập vượt trên các ngưỡng đó.',
        'Thuế tiểu bang được tính riêng. Tiểu bang bắt đầu từ thu nhập gộp đã điều chỉnh, trừ đi khoản khấu trừ tiêu chuẩn và miễn trừ cá nhân của riêng mình nếu đó là các khoản loại trừ, áp dụng các khung thuế theo từng phần và trừ đi các khoản tín dụng mà tiểu bang chi trả. Các tiểu bang áp dụng khoản miễn trừ hoặc khấu trừ tiêu chuẩn dưới dạng tín dụng sẽ trừ trực tiếp vào số thuế phải nộp, đây là nơi các khoản tín dụng đó được tính.',
        'Bảng trạng thái khai thuế được sử dụng. Các tiểu bang công bố bảng thuế riêng cho chủ hộ gia đình sẽ được áp dụng tại đây, lấy từ các biểu mẫu của chính họ, và các tiểu bang không công bố bảng này sẽ được tính toán dựa trên bảng dành cho người khai thuế độc thân.',
        'Ba tiểu bang cho phép người nộp thuế khấu trừ thuế thu nhập liên bang đã nộp: Alabama, Missouri và Oregon. Tại nơi áp dụng, khoản khấu trừ này được trừ vào thu nhập trước khi áp dụng các khung thuế của tiểu bang, với giới hạn và tỷ lệ do mỗi tiểu bang quy định.',
        'Các khoản tín dụng của tiểu bang được tính dựa trên độ tuổi của trẻ em, vì đó là yếu tố quyết định. New York chi trả $1,000 cho trẻ dưới bốn tuổi và $500 cho trẻ từ bốn đến mười sáu tuổi, Minnesota chi trả $1,800 cho trẻ dưới mười tám tuổi, và một vài tiểu bang không chi trả gì cho trẻ đã quá độ tuổi nhất định.',
      ],
      limits: [
        'Công cụ này không mô hình hóa các khoản tín dụng thuế liên bang. Tín dụng thuế trẻ em liên bang, tín dụng thu nhập kiếm được liên bang và các khoản tín dụng giáo dục giúp giảm thuế và không nằm trong tính toán này.',
        'Công cụ này không mô hình hóa sự khác biệt giữa lãi vốn và thu nhập thông thường, vì vậy một năm có thu nhập từ đầu tư được tính theo thuế suất thu nhập thông thường.',
        'Công cụ này không mô hình hóa khoản khấu trừ cho người cao tuổi, hoặc bất kỳ khoản khấu trừ nào ngoài các khoản tiêu chuẩn và các khoản khấu trừ chi tiết được nhập ở bên trái.',
        'Công cụ này không mô hình hóa thuế tự doanh, loại thuế được tính trên thu nhập ròng của người tự doanh và có cơ sở cũng như thuế suất riêng.',
        'Công cụ này không mô hình hóa khoản khấu trừ thuế thu nhập tiểu bang và địa phương mà nhiều tiểu bang cho phép trong các khoản khấu trừ chi tiết.',
        'Công cụ này không mô hình hóa thuế suất lãi vốn, các khoản phụ thu mà một số tiểu bang áp dụng đối với người có thu nhập cao, hoặc thuế của chính quyền thành phố và quận.',
        'Công cụ này không sử dụng bảng chủ hộ gia đình của Vermont, nơi có thuế suất cho năm 2026 được công bố dưới dạng số liệu sơ bộ, vì vậy trạng thái chủ hộ gia đình tại Vermont được tính toán dựa trên bảng dành cho người khai thuế độc thân.',
        'Công cụ này không bao gồm mọi khoản tín dụng của tiểu bang. Tín dụng thuế thu nhập kiếm được của tiểu bang được áp dụng cho các tiểu bang đặt mức tín dụng là một tỷ lệ phần trăm của tín dụng liên bang và cho ba tiểu bang tự tính toán riêng, còn tín dụng thuế trẻ em được áp dụng cho các tiểu bang có mức tín dụng dựa trên độ tuổi của trẻ. Các khoản tín dụng của những tiểu bang khác không có trong công cụ này.',
      ],
      faq: [
        {
          q: 'Tôi nên sử dụng khoản khấu trừ nào?',
          a: 'Khoản khấu trừ tiêu chuẩn trừ khi tổng các khoản khấu trừ chi tiết lớn hơn. Máy tính hiển thị khoản khấu trừ tiêu chuẩn cho trạng thái khai thuế và số liệu khấu trừ chi tiết cạnh nhau, vì vậy bạn có thể so sánh chỉ trong một cái nhìn.',
        },
        {
          q: 'Sự khác biệt giữa thuế suất hiệu dụng và thuế suất biên là gì?',
          a: 'Thuế suất biên là mức thuế áp dụng cho mỗi đô la thu nhập chịu thuế tiếp theo. Thuế suất thực tế là tổng số thuế chia cho toàn bộ thu nhập, và con số này thấp hơn vì các khung thuế cao hơn khung đầu tiên chỉ áp dụng cho phần thu nhập vượt trên các mức đó.',
        },
        {
          q: 'Tại sao thuế lại tăng vọt ở một mức thu nhập nhất định?',
          a: 'Đó là ranh giới của khung thuế. Trên mức này, mỗi đô la tiếp theo sẽ bị đánh thuế ở mức cao hơn, vì vậy số thuế tăng nhanh hơn thu nhập. Thuế suất biên cho bạn biết thu nhập của bạn đang nằm trong khung nào.',
        },
        {
          q: 'Con số này đã bao gồm An sinh xã hội và Medicare chưa?',
          a: 'Chưa. Đó là các loại thuế lương đánh trên tiền công, có mức trần riêng và được tính toán trong công cụ tính thu nhập thực nhận.',
        },
        {
          q: 'Số liệu thuế tiểu bang là gì?',
          a: 'Là khoản thuế do chính tiểu bang thu, được tính dựa trên các khung thuế năm 2026, mức giảm trừ gia cảnh, mức miễn trừ cá nhân và các khoản tín dụng của tiểu bang đó. Tiểu bang được chọn từ danh sách và trang web sẽ tự động điền dựa trên tiểu bang nơi bạn truy cập khi mạng có thể xác định được. Thay đổi tiểu bang và toàn bộ con số sẽ thay đổi theo.',
        },
        {
          q: 'Tôi có thể tự nhập thuế tiểu bang của mình không?',
          a: 'Có. Trường thông tin bên dưới phần tiểu bang sẽ nhận một con số và thay thế con số đã được tính toán bằng con số đó. Theo mặc định, trường này để trống và khi để trống, trang sẽ hiển thị kết quả tính toán tự động.',
        },
        {
          q: 'Tại sao trang này lại hỏi tuổi của từng đứa trẻ?',
          a: 'Vì các khoản tín dụng thuế trẻ em của tiểu bang phụ thuộc vào độ tuổi của trẻ. New York trả 1.000 đô la cho trẻ dưới bốn tuổi và 500 đô la cho trẻ từ bốn đến mười sáu tuổi, Minnesota trả 1.800 đô la cho trẻ dưới mười tám tuổi, và một số tiểu bang không trả gì cho trẻ đã quá độ tuổi nhất định. Các nhóm tuổi là độ tuổi mà các tiểu bang áp dụng giới hạn, và số lượng trẻ em trong các nhóm này cũng là điều mà khoản tín dụng thu nhập kiếm được tính đến.',
        },
        {
          q: 'Đây có phải là số tiền tôi sẽ nợ không?',
          a: 'Đây là số thuế trước khi áp dụng các khoản tín dụng và trước các khoản thanh toán đã thực hiện trong năm. Tờ khai thuế sẽ cộng thêm các khoản tín dụng, cộng thêm bất kỳ khoản nào khác chưa bị đánh thuế thông qua bảng lương và trừ đi những gì đã được thanh toán.',
        },
      ],
      sources: [
        {
          label: 'IRS — Rev. Proc. 2025-32, điều chỉnh lạm phát cho năm tính thuế 2026',
          url: 'https://www.irs.gov/irb/2025-45_IRB',
        },
        {
          label: 'IRS — Chủ đề Thuế 505, Khấu trừ Thuế và Các khoản Thanh toán Thuế Ước tính',
          url: 'https://www.irs.gov/taxtopics/tc505',
        },
        {
          label: 'IRS — Chủ đề Thuế 611, Thuế Thu nhập',
          url: 'https://www.irs.gov/taxtopics/tc611',
        },
        {
          label: 'Tax Foundation — Thuế suất và Khung thuế Thu nhập Cá nhân của Tiểu bang, 2026',
          url: 'https://taxfoundation.org/data/all/state/state-income-tax-rates-2026/',
        },
        {
          label: 'Tax Foundation — Sự kiện & Số liệu 2026, thuế suất thuế thu nhập cá nhân của tiểu bang tính đến ngày 28 tháng 4 năm 2026',
          url: 'https://taxfoundation.org/data/all/state/2026-state-tax-data/',
        },
      ],
      relatedGuides: [
        {
          slug: 'income-tax-calculator-explained',
          title: 'Cách tính thuế thu nhập liên bang',
        },
      ],
    },

    'debt-payoff': {
      name: 'Công cụ Tính toán Trả nợ',
      title: 'Công cụ Tính toán Trả nợ: Phương pháp Avalanche và Snowball',
      description:
        'So sánh việc trả nhiều khoản nợ cùng lúc: chỉ trả mức tối thiểu, theo thứ tự avalanche và theo thứ tự snowball, cùng với số tháng để hết nợ và số tiền lãi tiết kiệm được.',
      short: 'Trả nhiều khoản nợ cùng lúc và so sánh thứ tự ưu tiên.',
      category: 'Khoản nợ',
      methodNote:
        'Mô hình này là một mô phỏng theo từng tháng: tiền lãi phát sinh trên số dư vào đầu tháng, mỗi khoản nợ vẫn còn hiệu lực sẽ có khoản thanh toán tối thiểu riêng, và số tiền còn lại sẽ được dùng để trả cho khoản nợ mà bạn đã chọn.',
      fields: {
        debtName: 'Khoản nợ',
        balance: 'Số dư',
        rate: 'Lãi suất',
        minimum: 'Khoản thanh toán tối thiểu',
        addDebt: 'Thêm một khoản nợ',
        removeDebt: 'Xóa khoản nợ này',
        extraPayment: 'Khoản thanh toán hàng tháng bổ sung',
        extraPaymentHint: 'ngoài mỗi khoản thanh toán tối thiểu',
      },
      terms: {
        strategies: {
          minimum: 'Chỉ thanh toán tối thiểu',
          avalanche: 'Phân tuyến',
          snowball: 'Tuyết lăn',
        },
        orderHints: {
          avalanche: 'lãi suất cao nhất trước',
          snowball: 'số dư nhỏ nhất trước',
        },
      },
      result: {
        headlineLabel: 'Tiền lãi tiết kiệm được',
        interestSaved: 'Tiền lãi tiết kiệm được so với mức thanh toán tối thiểu',
        monthsToFree: 'Số tháng để trả hết nợ',
        totalInterest: 'Tổng tiền lãi',
        totalPaid: 'Tổng số tiền đã trả',
        minimumOnly: 'Chỉ thanh toán tối thiểu',
        avalanche: 'Phân tuyến',
        snowball: 'Tuyết lăn',
        minimumsNeverCover: 'Không bao giờ trả hết nợ',
        minimumsNeverCoverNote:
          'Ít nhất một trong các khoản nợ này bị tính lãi hàng tháng nhiều hơn số tiền bạn thanh toán, vì vậy số dư nợ sẽ tăng thay vì giảm. Một phương án không bao giờ trả hết nợ sẽ không có lịch trình hoàn tất, do đó nó không hiển thị số tháng và số tiền lãi: những con số đó sẽ mô tả kết thúc của quá trình mô phỏng thay vì các khoản nợ.',
        note:
          'Avalanche ưu tiên trả khoản nợ có lãi suất cao nhất trước và giúp tiết kiệm chi phí lãi vay nhất. Snowball ưu tiên trả khoản nợ có số dư nhỏ nhất trước và giúp bạn dứt nợ khoản đó sớm hơn. Sự khác biệt giữa hai phương pháp này chính là cái giá của thứ tự ưu tiên.',
      },
      resultNote:
        'Ba phương án này sử dụng cùng các khoản nợ và cùng một khoản thanh toán thêm. Điều duy nhất thay đổi là thứ tự phân bổ số tiền thanh toán thêm.',
      chart: {
        title: 'Số dư nợ theo từng thứ tự ưu tiên',
        note: 'Một phương án không bao giờ trả hết nợ sẽ bị loại bỏ: số dư nợ của nó tăng thay vì giảm, và hình dạng của đường biểu đồ đó sẽ mô tả kết thúc của quá trình mô phỏng thay vì một lịch trình trả nợ. Đường biểu đồ cho khoản thanh toán thêm sẽ chạm mức 0.',
        xAxis: 'years',
        series: [
          { key: 'avalanche', label: 'Phân tuyến' },
          { key: 'snowball', label: 'Tuyết lăn' },
          { key: 'minimumOnly', label: 'Chỉ thanh toán tối thiểu' },
        ],
      },
      formula:
        'tiền lãi trong tháng = số dư đầu tháng × lãi suất năm ÷ 12; mỗi khoản nợ đang mở có khoản trả tối thiểu riêng, trả tiền lãi trước và tiền gốc sau; phần tiền còn lại dùng để trả khoản nợ theo thứ tự được chỉ định',
      method: [
        'Phép tính này là một mô phỏng theo từng tháng. Vào đầu mỗi tháng, tiền lãi được tính trên số dư và cộng vào số dư đó. Số tiền khả dụng trong tháng đó là tổng của mọi khoản thanh toán tối thiểu cộng với khoản thanh toán thêm đã nhập ở bên trái. Mọi khoản nợ vẫn còn số dư đều yêu cầu khoản thanh toán tối thiểu riêng, và khoản thanh toán đó chi trả cho tiền lãi trước rồi mới đến tiền gốc.',
        'Một khoản nợ đã được thanh toán hết sẽ không còn yêu cầu khoản thanh toán tối thiểu nữa, và số tiền tối thiểu đó sẽ được cộng vào số tiền dùng để trả cho khoản nợ tiếp theo. Đó là cơ chế tạo nên sự khác biệt giữa các thứ tự ưu tiên: cùng một số tiền hàng tháng, khi được chi trả cho các khoản nợ khác nhau, sẽ giúp xóa sạch các số dư khác nhau sớm hơn.',
        'Thứ tự avalanche (lãi suất cao nhất) ưu tiên dùng số tiền dư để trả cho khoản nợ có lãi suất cao nhất trước. Cách này tốn ít tiền lãi nhất vì nó loại bỏ khoản lãi đắt đỏ nhất mà bạn đang phải trả.',
        'Thứ tự snowball (số dư nhỏ nhất) ưu tiên dùng số tiền dư để trả cho khoản nợ có số dư nhỏ nhất trước. Cách này tốn nhiều tiền lãi hơn xét về tổng thể và giúp xóa sạch một tài khoản sớm hơn, đây là một kết quả khác biệt. Công cụ tính toán hiển thị cả hai phương pháp và số tiền lãi tiết kiệm được trong từng trường hợp để bạn có thể so sánh dựa trên cùng một con số.',
      ],
      limits: [
        'Công cụ này không mô phỏng lãi suất thả nổi. Thẻ tín dụng có lãi suất thả nổi sẽ thay đổi tiền lãi khi chỉ số thay đổi, còn lịch trình ở đây giả định lãi suất giữ nguyên như mức đã nhập.',
        'Công cụ này không mô phỏng các loại phí: phí trả chậm, phí chuyển đổi số dư và phí thường niên của thẻ không được tính vào tổng số.',
        'Công cụ này tính lãi hàng tháng. Thẻ tín dụng tính lãi kép hàng ngày sẽ phát sinh thêm một chút tiền lãi trong năm, và con số thực tế trên số dư thẻ thường cao hơn một chút so với con số này.',
        'Công cụ này không mô phỏng việc xử lý thuế đối với tiền lãi, vốn có thể được khấu trừ đối với một số khoản nợ nhưng lại không được đối với các khoản khác.',
        'Công cụ này không mô phỏng sự thay đổi trong các khoản thanh toán tối thiểu, vốn đôi khi được bên cho vay giảm xuống do khó khăn tài chính hoặc tăng lên khi số dư giảm xuống.',
      ],
      faq: [
        {
          q: 'Sự khác biệt giữa phương pháp avalanche (trả nợ lãi suất cao trước) và snowball (trả nợ số dư nhỏ trước) là gì?',
          a: 'Chỉ là thứ tự ưu tiên. Phương pháp avalanche ưu tiên dùng số tiền dư để trả cho khoản nợ có lãi suất cao nhất trước, còn snowball ưu tiên khoản nợ có số dư nhỏ nhất trước. Các khoản nợ, số tiền thanh toán tối thiểu và khoản thanh toán thêm đều giống nhau trong cả hai phương án.',
        },
        {
          q: 'Phương pháp nào tiết kiệm tiền hơn?',
          a: 'Phương pháp avalanche, xét về tiền lãi. Số tiền dư giúp thanh toán khoản nợ đắt đỏ nhất trước, vì vậy tổng số tiền lãi phát sinh trong suốt thời gian trả nợ sẽ ít hơn. Công cụ tính toán sẽ hiển thị sự khác biệt về số tiền lãi tiết kiệm được cho mỗi phương pháp.',
        },
        {
          q: 'Tại sao phương pháp snowball lại tồn tại nếu nó tốn kém hơn?',
          a: 'Nó giúp xóa sạch số dư nhỏ nhất trước, vì vậy một khoản nợ sẽ về mức 0 sớm hơn. Đó là một kết quả khác với kết quả đo lường bằng tiền lãi, và công cụ tính toán hiển thị cả hai để bạn có thể so sánh dựa trên cùng một số liệu.',
        },
        {
          q: 'Tiền lãi được tính như thế nào?',
          a: 'Tiền lãi được tính trên số dư vào đầu mỗi tháng, theo lãi suất hàng năm chia cho mười hai, và được cộng vào số dư. Các khoản thanh toán sau đó sẽ được ưu tiên trả cho phần lãi này trước rồi mới đến nợ gốc.',
        },
        {
          q: 'Điều gì xảy ra với khoản thanh toán tối thiểu của một khoản nợ đã được trả hết?',
          a: 'Số tiền đó được cộng vào khoản tiền dành cho khoản nợ tiếp theo, vì vậy tổng số tiền hàng tháng dành cho việc trả nợ không bao giờ giảm xuống. Đó là lý do khiến thời hạn trả nợ ngắn hơn so với tổng thời gian của các lịch trình trả nợ riêng lẻ.',
        },
        {
          q: 'Công cụ này có tính đến việc thẻ tín dụng tính lãi kép hàng ngày không?',
          a: 'Không. Mô hình này tính lãi mỗi tháng một lần. Một chiếc thẻ tính lãi kép hàng ngày sẽ tính thêm một chút trong một năm, vì vậy con số thực tế trên số dư thẻ thường cao hơn một chút so với con số ở đây.',
        },
      ],
      sources: [
        {
          label: 'CFPB — Ask CFPB, câu hỏi và câu trả lời của người tiêu dùng',
          url: 'https://www.consumerfinance.gov/ask-cfpb/',
        },
        {
          label: 'CFPB — Các công cụ thẻ tín dụng và hướng dẫn cho người tiêu dùng',
          url: 'https://www.consumerfinance.gov/consumer-tools/credit-cards/',
        },
      ],
      relatedGuides: [
        {
          slug: 'debt-payoff-calculator-explained',
          title: 'Cách thức hoạt động của việc thanh toán nhiều khoản nợ',
        },
      ],
    },

  },
};
