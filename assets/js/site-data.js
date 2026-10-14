/* =========================================================
   網站資料設定檔（替換醫師資料只需修改這個檔案）
   ---------------------------------------------------------
   ※ 以下醫師、診所資料皆為「作品集示範用虛構資料」。
   ※ 學經歷刻意使用「〇〇」佔位，避免虛構任何真實機構資歷。
   正式上線時，請替換為醫師本人提供並經確認的資料。
   ========================================================= */

window.SITE = {
  /* 網站基本設定 */
  siteName: "周以恆醫師｜脊椎・骨科衛教",
  siteUrl: "https://linmeialice1995-tech.github.io/ortho-education-site", // 部署後改成正式網址（不要結尾斜線）
  isDemo: true, // 正式上線改成 false，會移除頂端「作品集示範」提示列

  /* 首頁大圖輪播與輪播文字
     slides：目前為 Unsplash 免費授權圖庫照片（來源見 README）；換成診所或醫師照片時，把 src 改成照片路徑（建議 1600×1000，橫式 16:10）
     words：標題「讓你重新＿＿」輪流顯示的文字 */
  hero: {
    words: ["好好走路", "安心睡覺", "回到工作", "享受生活"],
    interval: 3000, // 文字切換間隔（毫秒）；圖片每兩次文字切換換一張
    slides: [
      { src: "assets/img/hero-spine-model.jpg", alt: "腰椎模型，紅色標示椎間盤突出位置" },
      { src: "assets/img/hero-spine-xray.jpg", alt: "脊椎 X 光影像" }
    ]
  },

  /* 首頁照片區（兩張並排）：建議換成診間環境、手術室或團隊照片 */
  gallery: [
      { src: "assets/img/gallery-operating-room.jpg", alt: "手術室（示意照片，非本診所）" },
      { src: "assets/img/gallery-surgeons.jpg", alt: "手術進行中的醫療團隊（示意照片，非本診所）" }
  ],

  /* 首頁「病人回饋」區塊
     ⚠️ 以下全部是「版面示範用」的虛構文字，不是真實病人評價。
     ⚠️ 正式上線前請注意：台灣醫療法與衛福部醫療廣告相關規定，限制以病人感謝函、
        見證或推薦等方式宣傳。實際使用前請確認合法性，或把陣列清空（[]）隱藏此區塊。 */
  testimonials: [
    { title: "說明很清楚", text: "醫師把 MRI 影像一張一張解釋，讓我知道腳麻的原因，也說明了不開刀和開刀各自的選擇。", name: "示範病人 A", note: "腰椎椎間盤突出（示範）" },
    { title: "不急著叫我開刀", text: "第一次看診時醫師先安排復健和運動，說明如果沒有改善再一起討論手術，讓我比較安心。", name: "示範病人 B", note: "下背痛（示範）" },
    { title: "術後照護很詳細", text: "出院前拿到完整的照護說明，什麼時候回診、哪些症狀要馬上回來，都寫得很清楚。", name: "示範病人 C", note: "腰椎管狹窄症（示範）" },
    { title: "願意回答問題", text: "我問了很多關於手術風險的問題，醫師都耐心回答，沒有讓我覺得被催促。", name: "示範病人 D", note: "脊椎手術諮詢（示範）" }
  ],

  /* 醫師資料 */
  doctor: {
    name: "周以恆",
    title: "骨科專科醫師",
    focus: "脊椎外科",
    nameWithTitle: "周以恆 醫師",
    photo: "assets/img/doctor.svg", // 換成 assets/img/doctor.jpg（建議 4:5 直式）
    photoAlt: "周以恆醫師（示範用插圖）",
    tagline: "先把脊椎的問題說清楚，再一起決定要不要開刀。",
    intro:
      "骨科專科醫師，以脊椎手術為主要專長，包括腰椎椎間盤突出、腰椎管狹窄症的評估與手術治療。看診時重視說明保守治療與手術各自的效果與風險，並陪伴病人完成術後復健。",
    specialties: [
      "腰椎椎間盤突出、坐骨神經痛",
      "腰椎管狹窄症",
      "微創脊椎手術",
      "脊椎術後照護與復健",
      "下背痛評估與治療",
      "一般骨科疾病"
    ],
    education: [
      "〇〇大學 醫學系 醫學士（示範欄位）",
      "〇〇大學 臨床醫學研究所 碩士（示範欄位）"
    ],
    experience: [
      "〇〇醫院 骨科部 脊椎外科 主治醫師（示範欄位）",
      "〇〇醫院 骨科部 住院醫師、總醫師（示範欄位）",
      "〇〇醫院 脊椎外科 研究醫師（示範欄位）"
    ],
    /* 首頁「年資」圓形徽章：請填入醫師實際年資（示範版刻意不填數字） */
    experienceYears: "〇〇",
    experienceLabel: "年 脊椎手術經驗",

    /* 首頁經歷時間軸（由新到舊）。icon 可用：surgery、spine、rehab、edu、check */
    timeline: [
      { title: "脊椎外科 主治醫師", place: "〇〇醫院 骨科部（示範欄位）", period: "〇〇〇〇 年 – 迄今", icon: "surgery",
        desc: "負責脊椎門診與手術，包括腰椎椎間盤突出、腰椎管狹窄症的評估與手術治療。（示範文字）" },
      { title: "脊椎外科 研究醫師", place: "〇〇醫院 脊椎外科（示範欄位）", period: "〇〇〇〇 – 〇〇〇〇 年", icon: "spine",
        desc: "接受脊椎外科次專科訓練，參與脊椎手術與術後照護。（示範文字）" },
      { title: "骨科 總醫師", place: "〇〇醫院 骨科部（示範欄位）", period: "〇〇〇〇 – 〇〇〇〇 年", icon: "check",
        desc: "負責骨科住院醫師教學與病房管理。（示範文字）" },
      { title: "骨科 住院醫師", place: "〇〇醫院 骨科部（示範欄位）", period: "〇〇〇〇 – 〇〇〇〇 年", icon: "rehab",
        desc: "完成骨科專科醫師訓練，取得部定骨科專科醫師資格。（示範文字）" },
      { title: "醫學系 畢業", place: "〇〇大學 醫學系（示範欄位）", period: "〇〇〇〇 年", icon: "edu",
        desc: "取得醫學士學位。（示範文字）" }
    ],

    certifications: [
      "部定骨科專科醫師（示範欄位，請填入證書字號）",
      "〇〇脊椎外科醫學會 會員（示範欄位）"
    ]
  },

  /* 診所 / 看診資訊 */
  clinic: {
    name: "〇〇骨科診所（示範）",
    address: "台北市〇〇區〇〇路 123 號 2 樓（示範地址）",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=%E5%8F%B0%E5%8C%97%E8%BB%8A%E7%AB%99",
    phone: "02-0000-0000",
    phoneHref: "tel:+886200000000",
    email: "clinic@example.com", // 首頁預約表單會以 Email 寄到這個信箱
    bookingUrl: "https://example.com/booking", // 外部掛號系統網址
    lineUrl: "https://line.me/", // 診所 LINE 官方帳號或社群網址
    transport: [
      "捷運〇〇站 2 號出口，步行約 5 分鐘（示範）",
      "附近設有公有停車場（示範）"
    ],
    /* 門診時間：true = 有門診 */
    schedule: {
      days: ["一", "二", "三", "四", "五", "六"],
      sessions: [
        { label: "上午 09:00–12:00", slots: [true, false, true, false, true, true] },
        { label: "下午 14:00–17:00", slots: [false, true, false, true, false, false] },
        { label: "晚上 18:00–21:00", slots: [true, false, true, false, false, false] }
      ],
      note: "門診時間為示範資料。國定假日休診，實際看診時間以診所公告為準。"
    }
  },

  /* 衛教分類
     group: "spine" = 首頁「脊椎專區」；"general" = 一般骨科 */
  categories: [
    { id: "lumbar", name: "腰椎疾病", desc: "椎間盤突出、椎管狹窄、下背痛", icon: "spine", group: "spine" },
    { id: "spine-surgery", name: "脊椎手術", desc: "微創手術、手術常見迷思", icon: "surgery", group: "spine" },
    { id: "spine-rehab", name: "術後照護與復健", desc: "傷口、活動、運動與回診", icon: "rehab", group: "spine" },
    { id: "knee", name: "膝關節", desc: "膝蓋疼痛、退化性關節炎", icon: "knee", group: "general" },
    { id: "shoulder", name: "肩關節", desc: "五十肩、肩膀疼痛", icon: "shoulder", group: "general" },
    { id: "fracture", name: "骨折照護", desc: "骨折處置、石膏照護", icon: "fracture", group: "general" },
    { id: "ankle", name: "足踝", desc: "腳踝扭傷、運動傷害", icon: "ankle", group: "general" },
    { id: "bone", name: "骨骼保健", desc: "骨質疏鬆、預防跌倒", icon: "bone", group: "general" }
  ],

  /* 衛教文章索引
     新增文章：1) 複製 articles/ 任一篇 HTML 修改內容
               2) 在下方加入一筆資料（slug 需與檔名相同） */
  articles: [
    {
      slug: "lumbar-disc-herniation",
      title: "腰椎椎間盤突出：多數不用開刀，什麼時候該考慮手術？",
      category: "lumbar",
      excerpt: "腰痛合併腳麻、坐骨神經痛，可能是椎間盤突出。了解保守治療的效果、手術的時機，以及必須立即就醫的警訊。",
      date: "2026-10-12",
      readTime: 8
    },
    {
      slug: "lumbar-spinal-stenosis",
      title: "腰椎管狹窄症：走一段路腳就痠麻，坐下來就好？",
      category: "lumbar",
      excerpt: "走路走到一半腳痠麻、要停下來彎腰休息，是腰椎管狹窄的典型症狀。認識保守治療與減壓手術的選擇。",
      date: "2026-10-09",
      readTime: 7
    },
    {
      slug: "minimally-invasive-spine-surgery",
      title: "微創脊椎手術與常見迷思：開刀會不會癱瘓？",
      category: "spine-surgery",
      excerpt: "微創手術是什麼？一定要打骨釘嗎？開完刀是不是一輩子不能彎腰？整理病人最常擔心的脊椎手術問題。",
      date: "2026-10-06",
      readTime: 8
    },
    {
      slug: "spine-surgery-recovery",
      title: "脊椎手術後的照護與復健：回家後怎麼做恢復最好",
      category: "spine-rehab",
      excerpt: "術後多久可以下床、上班、開車？傷口與護具怎麼照顧？什麼時候開始運動？哪些症狀要馬上回診？",
      date: "2026-10-03",
      readTime: 8
    },
    {
      slug: "knee-osteoarthritis",
      title: "膝蓋疼痛與退化性關節炎：運動是治療的核心",
      category: "knee",
      excerpt: "上下樓梯膝蓋痛、久坐起身卡卡？了解退化性關節炎的成因、常見治療選項，以及每天都能做的保養方法。",
      date: "2026-10-01",
      readTime: 7
    },
    {
      slug: "frozen-shoulder",
      title: "五十肩與肩膀疼痛：為什麼手舉不起來？",
      category: "shoulder",
      excerpt: "五十肩不只發生在五十歲。認識冰凍肩的三個階段、與其他肩膀疼痛的差別，以及居家伸展的注意事項。",
      date: "2026-09-24",
      readTime: 6
    },
    {
      slug: "low-back-pain",
      title: "下背痛與脊椎保健：多數會好轉，關鍵是保持活動",
      category: "lumbar",
      excerpt: "大多數下背痛不需要立刻照 X 光或 MRI。了解哪些警訊需要盡快就醫，以及日常姿勢與運動的建議。",
      date: "2026-09-17",
      readTime: 7
    },
    {
      slug: "fracture-care",
      title: "骨折與術後照護：回家後要注意的事",
      category: "fracture",
      excerpt: "打石膏或開刀後，如何減少腫脹、照顧傷口與石膏？哪些情況代表需要立即回診？一次整理給你。",
      date: "2026-09-10",
      readTime: 6
    },
    {
      slug: "ankle-sprain",
      title: "腳踝扭傷：不是休息就好，復健才能避免再扭",
      category: "ankle",
      excerpt: "扭傷後什麼時候該照 X 光？冰敷、護具與平衡訓練怎麼做？降低反覆扭傷的關鍵在恢復期。",
      date: "2026-09-03",
      readTime: 6
    },
    {
      slug: "osteoporosis",
      title: "骨質疏鬆與骨骼保健：沒有症狀，更要提早預防",
      category: "bone",
      excerpt: "骨質疏鬆常在骨折後才被發現。認識高風險族群、骨密度檢查，以及飲食、運動與預防跌倒的方法。",
      date: "2026-08-27",
      readTime: 7
    }
  ]
};
