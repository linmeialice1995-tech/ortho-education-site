/* =========================================================
   網站資料設定檔（替換醫師資料只需修改這個檔案）
   ---------------------------------------------------------
   ※ 以下醫師、診所資料皆為「作品集示範用虛構資料」。
   ※ 學經歷刻意使用「〇〇」佔位，避免虛構任何真實機構資歷。
   正式上線時，請替換為醫師本人提供並經確認的資料。
   ========================================================= */

window.SITE = {
  /* 網站基本設定 */
  siteName: "周以恆醫師｜骨科衛教",
  siteUrl: "https://ortho-demo.pages.dev", // 部署後改成正式網址（不要結尾斜線）
  isDemo: true, // 正式上線改成 false，會移除頂端「作品集示範」提示列

  /* 醫師資料 */
  doctor: {
    name: "周以恆",
    title: "骨科專科醫師",
    nameWithTitle: "周以恆 醫師",
    photo: "assets/img/doctor.svg", // 換成 assets/img/doctor.jpg（建議 4:5 直式）
    photoAlt: "周以恆醫師（示範用插圖）",
    tagline: "用病人聽得懂的話，說清楚骨頭與關節的事。",
    intro:
      "專注於退化性關節疾病、運動傷害與骨折術後照護。看診時重視完整說明病情與治療選項，希望每一位病人回家後都知道自己可以做什麼。",
    specialties: [
      "膝關節退化與疼痛",
      "肩關節疾病（五十肩等）",
      "下背痛與脊椎保健",
      "骨折治療與術後復健",
      "運動傷害與腳踝扭傷",
      "骨質疏鬆評估與預防"
    ],
    education: [
      "〇〇大學 醫學系 醫學士（示範欄位）",
      "〇〇大學 臨床醫學研究所 碩士（示範欄位）"
    ],
    experience: [
      "〇〇醫院 骨科部 主治醫師（示範欄位）",
      "〇〇醫院 骨科部 住院醫師、總醫師（示範欄位）",
      "〇〇醫院 運動醫學中心 特約醫師（示範欄位）"
    ],
    certifications: [
      "部定骨科專科醫師（示範欄位，請填入證書字號）",
      "〇〇醫學會 會員（示範欄位）"
    ]
  },

  /* 診所 / 看診資訊 */
  clinic: {
    name: "〇〇骨科診所（示範）",
    address: "台北市〇〇區〇〇路 123 號 2 樓（示範地址）",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=%E5%8F%B0%E5%8C%97%E8%BB%8A%E7%AB%99",
    phone: "02-0000-0000",
    phoneHref: "tel:+886200000000",
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

  /* 衛教分類 */
  categories: [
    { id: "knee", name: "膝關節", desc: "膝蓋疼痛、退化性關節炎", icon: "knee" },
    { id: "shoulder", name: "肩關節", desc: "五十肩、肩膀疼痛", icon: "shoulder" },
    { id: "spine", name: "脊椎", desc: "下背痛、姿勢與脊椎保健", icon: "spine" },
    { id: "fracture", name: "骨折與術後", desc: "骨折處置、石膏與術後照護", icon: "fracture" },
    { id: "ankle", name: "足踝", desc: "腳踝扭傷、運動傷害", icon: "ankle" },
    { id: "bone", name: "骨骼保健", desc: "骨質疏鬆、預防跌倒", icon: "bone" }
  ],

  /* 衛教文章索引
     新增文章：1) 複製 articles/ 任一篇 HTML 修改內容
               2) 在下方加入一筆資料（slug 需與檔名相同） */
  articles: [
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
      category: "spine",
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
