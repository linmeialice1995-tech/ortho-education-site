# 骨科醫師個人衛教網站（作品集示範）

這是一個骨科醫師個人衛教網站的範本，使用純 HTML、CSS 與原生 JavaScript 建置，不需要資料庫、後端或建置工具，可以直接部署到 Cloudflare Pages。

> ⚠️ **示範聲明**：網站中的醫師「周以恆」與診所皆為虛構。學經歷以「〇〇」佔位，不代表任何真實人物或機構。衛教內容依公開醫療指引（NICE、NHS、AAOS 等）整理，**尚未經骨科專業人員審閱**，正式公開前必須由骨科醫師審閱。

---

## 檔案結構

```
骨科衛教網站範本/
├─ index.html                 首頁（醫師簡介、專長、衛教分類、最新文章）
├─ about.html                 醫師介紹（學經歷、專業領域、門診時間）
├─ articles.html              衛教文章列表（分類篩選＋搜尋）
├─ faq.html                   常見問題
├─ contact.html               聯絡與看診資訊
├─ 404.html                   找不到頁面（Cloudflare Pages 會自動使用）
├─ articles/                  衛教文章內頁（每篇一個檔案）
│  ├─ knee-osteoarthritis.html   膝蓋疼痛與退化性關節炎
│  ├─ frozen-shoulder.html       五十肩與肩膀疼痛
│  ├─ low-back-pain.html         下背痛與脊椎保健
│  ├─ fracture-care.html         骨折與術後照護
│  ├─ ankle-sprain.html          腳踝扭傷
│  └─ osteoporosis.html          骨質疏鬆與骨骼保健
├─ assets/
│  ├─ css/style.css           全站樣式（色彩變數在檔案最上方 :root）
│  ├─ js/site-data.js         ★ 醫師、診所、門診、分類、文章索引資料
│  ├─ js/main.js              共用頁首頁尾、資料填入、篩選、相關文章、分享
│  └─ img/
│     ├─ doctor.svg           醫師照片（示範插圖）
│     ├─ og-image.png         LINE / Facebook 分享預覽圖（1200×630）
│     └─ favicon.svg          網站圖示
├─ _headers                   Cloudflare Pages 安全性與快取標頭
├─ robots.txt
├─ sitemap.xml
└─ .gitignore
```

## 本機預覽

直接雙擊 `index.html` 即可預覽。若要模擬正式環境（建議），在專案資料夾執行：

```bash
python -m http.server 8080
```

然後開啟 <http://localhost:8080>。

---

## 如何替換內容

### 1. 醫師與診所資料 → `assets/js/site-data.js`

姓名、職稱、簡介、專長、學歷、經歷、證照、診所地址、電話、掛號連結、LINE 連結、Google 地圖連結、門診時間表，**全部集中在這個檔案**，修改後所有頁面會自動更新。

正式上線時記得把 `isDemo: true` 改成 `false`，會移除頂端的「作品集示範」提示列與頁尾的示範聲明。

### 2. 醫師照片

把照片放到 `assets/img/doctor.jpg`（建議 4:5 直式、寬 800px 以上），然後在 `site-data.js` 把 `photo` 改成 `"assets/img/doctor.jpg"`。

### 3. SEO 與分享資訊（需要逐頁修改）

LINE 和 Facebook 的分享預覽不會執行 JavaScript，所以每個 HTML 檔 `<head>` 內的資訊需要寫死在檔案裡。替換醫師姓名或網域時，請用編輯器的「全專案搜尋取代」：

| 搜尋 | 取代為 |
| --- | --- |
| `周以恆` | 醫師真實姓名 |
| `https://ortho-demo.pages.dev` | 正式網址（包含 `robots.txt`、`sitemap.xml`） |

分享預覽圖 `assets/img/og-image.png` 也包含醫師姓名，需要重新製作（1200×630 PNG）。

### 4. 修改文章

每篇文章的內文位於以下兩行註解之間：

```html
<!-- ===== 文章內容開始（替換文章時修改此區） ===== -->
...
<!-- ===== 文章內容結束 ===== -->
```

文章結構：前言（`.lead`）→ 目錄 → 內文（`.prose`）→ 就醫警訊 → 重點整理（`.key-points`）→ 參考資料。相關文章會自動依分類產生。

### 5. 新增文章

1. 複製 `articles/` 內任一篇，改檔名（例如 `hip-pain.html`）。
2. 修改 `<head>` 的 title、description、canonical、og 標籤，以及 `<body>` 的 `data-slug="hip-pain"`。
3. 修改文章內容區。
4. 在 `site-data.js` 的 `articles` 陣列加入一筆資料（`slug` 與檔名相同）。
5. 在 `sitemap.xml` 加入網址。

新增分類：在 `site-data.js` 的 `categories` 加一筆資料，`icon` 可用 knee、shoulder、spine、fracture、ankle、bone。

---

## GitHub 版本管理

```bash
git add .
git commit -m "Initial commit: orthopedic patient education site"
```

到 GitHub 建立新的 repository（不要勾選自動產生 README），然後：

```bash
git branch -M main
git remote add origin https://github.com/<你的帳號>/<repo名稱>.git
git push -u origin main
```

## 部署到 Cloudflare Pages

1. 登入 Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**。
2. 選擇剛剛的 GitHub repository。
3. 建置設定：
   - Framework preset：**None**
   - Build command：**留空**
   - Build output directory：**`/`**（根目錄）
4. 按 **Save and Deploy**。完成後會得到 `https://<專案名稱>.pages.dev` 網址。
5. 之後每次 `git push` 到 main，Cloudflare 會自動重新部署。

部署後：

- 把全站的 `https://ortho-demo.pages.dev` 換成實際網址（見上方「SEO 與分享資訊」）。
- Cloudflare Pages 會自動提供不含 `.html` 的網址（例如 `/about`），站內連結使用 `.html` 也能正常運作。
- `404.html` 會自動作為找不到頁面時的畫面。
- 可以用 [LINE Page Poker](https://poker.line.naver.jp/) 檢查與刷新 LINE 分享預覽。

---

## 正式上線檢查清單

- [ ] 醫師資料、照片、學經歷皆由醫師本人提供並確認
- [ ] 每篇衛教文章已由骨科醫師審閱，並依台灣臨床實務與用藥習慣調整
- [ ] 檢查參考資料連結仍有效，必要時補充台灣本土指引
- [ ] `site-data.js` 的 `isDemo` 改為 `false`
- [ ] 替換網域、重新製作 `og-image.png`
- [ ] 診所地址、電話、掛號與 LINE 連結正確
- [ ] 確認內容符合醫療法及醫療廣告相關規範（衛教內容不得涉及招攬或誇大療效）

## 技術說明

- 手機優先（mobile-first）的響應式設計，斷點約為 640px、768px、900px、960px。
- 字型使用 Google Fonts「Noto Sans TC」，載入失敗時會改用系統字型（蘋方、微軟正黑體）。
- 頁首、頁尾與導覽由 `main.js` 產生，修改導覽項目只需改一個地方（`NAV` 陣列）。
- 文章列表的篩選條件會反映在網址上（例如 `articles.html?cat=knee`），可以直接分享特定分類。
- 從文章列表進入文章後，按「返回文章列表」會保留原本的篩選條件。
