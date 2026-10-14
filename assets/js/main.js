/* =========================================================
   骨科衛教網站 — 共用功能（原生 JavaScript，無相依套件）
   - 產生共用 Header / Footer / 導覽
   - 將 site-data.js 的資料填入頁面
   - 文章列表分類篩選、搜尋、相關文章
   ========================================================= */
(function () {
  "use strict";

  var SITE = window.SITE;
  if (!SITE) return;

  var body = document.body;
  var ROOT = body.getAttribute("data-root") || ""; // "" = 根目錄頁面；"../" = articles/ 內頁
  var PAGE = body.getAttribute("data-page") || "";

  /* ---------- 小工具 ---------- */
  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function get(path) {
    return path.split(".").reduce(function (o, k) { return o == null ? undefined : o[k]; }, SITE);
  }
  function url(path) {
    return /^(https?:|tel:|mailto:|#|\/)/.test(path) ? path : ROOT + path;
  }
  function isExternal(href) { return /^https?:/.test(href); }
  function formatDate(iso) {
    var p = iso.split("-");
    return p[0] + " 年 " + Number(p[1]) + " 月 " + Number(p[2]) + " 日";
  }
  function categoryById(id) {
    for (var i = 0; i < SITE.categories.length; i++) if (SITE.categories[i].id === id) return SITE.categories[i];
    return { id: id, name: id, icon: "bone" };
  }

  /* ---------- 圖示（inline SVG） ---------- */
  var S = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
  var ICONS = {
    logo: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.5 4.5a2.5 2.5 0 0 0-4 2.9 2.5 2.5 0 0 0 2.9 4l6.2 6.2a2.5 2.5 0 0 0 4 2.9 2.5 2.5 0 0 0-.4-4.4 2.5 2.5 0 0 0-2.5-2.5L8.5 7.4a2.5 2.5 0 0 0 0-2.9Z"/></svg>',
    bone: S + '<path d="M8.5 4.5a2.5 2.5 0 0 0-4 2.9 2.5 2.5 0 0 0 2.9 4l6.2 6.2a2.5 2.5 0 0 0 4 2.9 2.5 2.5 0 0 0-.4-4.4 2.5 2.5 0 0 0-2.5-2.5L8.5 7.4a2.5 2.5 0 0 0 0-2.9Z"/></svg>',
    knee: S + '<path d="M9 2v7.5a3 3 0 0 0 .9 2.1l1.2 1.2a3 3 0 0 1 .9 2.1V22"/><path d="M15 2v6"/><path d="M15 14v8"/><circle cx="14.5" cy="11" r="2"/></svg>',
    shoulder: S + '<circle cx="12" cy="5" r="2.6"/><path d="M5 21v-6a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v6"/><path d="M8 21v-4"/><path d="M16 21v-4"/></svg>',
    spine: S + '<rect x="8.5" y="2" width="7" height="3.6" rx="1.4"/><rect x="8" y="7.4" width="8" height="3.6" rx="1.4"/><rect x="8" y="12.8" width="8" height="3.6" rx="1.4"/><rect x="8.5" y="18.2" width="7" height="3.6" rx="1.4"/></svg>',
    fracture: S + '<path d="M4 20 9.5 14.5"/><path d="m14.5 9.5 5.5-5.5"/><path d="m9.5 14.5 1-3 2 1 1-3"/><path d="M3 18.5a1.5 1.5 0 1 0 2.5 2.5"/><path d="M18.5 3a1.5 1.5 0 1 1 2.5 2.5"/></svg>',
    ankle: S + '<path d="M9 2v9.5c0 1-.5 2-1.3 2.6L5 16a2.6 2.6 0 0 0 1.5 4.8H19a2 2 0 0 0 2-2v-.5a3 3 0 0 0-2.2-2.9l-3-1A2.5 2.5 0 0 1 14 12V2"/></svg>',
    menu: S + '<path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: S + '<path d="M6 6l12 12M18 6 6 18"/></svg>',
    arrowLeft: S + '<path d="M19 12H5M11 18l-6-6 6-6"/></svg>',
    arrowRight: S + '<path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    search: S + '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    phone: S + '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"/></svg>',
    pin: S + '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    calendar: S + '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    chat: S + '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.7-.8L3 21l1.6-4.4A8 8 0 0 1 3 11.5 8.6 8.6 0 0 1 12 3a8.6 8.6 0 0 1 9 8.5Z"/></svg>',
    clock: S + '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    train: S + '<rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 11h14M9 21l-2-4M15 21l2-4"/><circle cx="9" cy="14" r=".6"/><circle cx="15" cy="14" r=".6"/></svg>'
  };
  window.SITE_ICONS = ICONS;

  /* ---------- 作品集示範提示列 ---------- */
  function renderDemoBar() {
    if (!SITE.isDemo) return;
    var bar = document.createElement("div");
    bar.className = "demo-bar";
    bar.innerHTML = "<strong>作品集示範網站</strong>：醫師、診所資料皆為虛構；衛教內容僅供一般參考，正式使用前須經骨科專業人員審閱。";
    body.insertBefore(bar, body.firstChild);
  }

  /* ---------- Header / 導覽 ---------- */
  var NAV = [
    { href: "index.html", label: "首頁", page: "home" },
    { href: "about.html", label: "醫師介紹", page: "about" },
    { href: "articles.html", label: "衛教文章", page: "articles" },
    { href: "faq.html", label: "常見問題", page: "faq" },
    { href: "contact.html", label: "看診資訊", page: "contact" }
  ];

  function renderHeader() {
    var mount = document.getElementById("site-header");
    if (!mount) return;
    var links = NAV.map(function (n) {
      var current = n.page === PAGE || (PAGE === "article" && n.page === "articles");
      return '<li><a href="' + url(n.href) + '"' + (current ? ' aria-current="page"' : "") + ">" + n.label + "</a></li>";
    }).join("");
    mount.outerHTML =
      '<header class="site-header">' +
      '<div class="container header-inner">' +
      '<a class="brand" href="' + url("index.html") + '">' +
      '<span class="brand-mark">' + ICONS.logo + "</span>" +
      '<span class="brand-text"><span class="brand-name">' + esc(SITE.doctor.nameWithTitle) + "</span>" +
      '<span class="brand-sub">' + esc(SITE.doctor.title) + "｜骨科衛教</span></span></a>" +
      '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="開啟選單">' + ICONS.menu + "</button>" +
      '<nav class="site-nav" id="site-nav" aria-label="主要導覽"><ul>' + links +
      '<li class="nav-cta"><a class="btn btn-primary" href="' + esc(SITE.clinic.bookingUrl) + '" target="_blank" rel="noopener">線上掛號</a></li>' +
      "</ul></nav></div></header>";

    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("site-nav");
    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "關閉選單" : "開啟選單");
      toggle.innerHTML = open ? ICONS.close : ICONS.menu;
    }
    toggle.addEventListener("click", function () { setOpen(!nav.classList.contains("is-open")); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
    document.addEventListener("click", function (e) {
      if (nav.classList.contains("is-open") && !e.target.closest(".site-header")) setOpen(false);
    });
  }

  /* ---------- Footer ---------- */
  function renderFooter() {
    var mount = document.getElementById("site-footer");
    if (!mount) return;
    var cats = SITE.categories.map(function (c) {
      return '<li><a href="' + url("articles.html?cat=" + c.id) + '">' + esc(c.name) + "</a></li>";
    }).join("");
    var pages = NAV.map(function (n) { return '<li><a href="' + url(n.href) + '">' + n.label + "</a></li>"; }).join("");
    mount.outerHTML =
      '<footer class="site-footer"><div class="container">' +
      '<div class="footer-grid">' +
      "<div><h3>" + esc(SITE.doctor.nameWithTitle) + "</h3>" +
      "<p>" + esc(SITE.clinic.name) + "<br>" + esc(SITE.clinic.address) + "<br>電話：" +
      '<a href="' + esc(SITE.clinic.phoneHref) + '">' + esc(SITE.clinic.phone) + "</a></p></div>" +
      "<div><h3>網站導覽</h3><ul>" + pages + "</ul></div>" +
      "<div><h3>衛教分類</h3><ul>" + cats + "</ul></div>" +
      "</div>" +
      '<p class="footer-disclaimer">本網站衛教內容僅供一般健康資訊參考，不能取代醫師面對面的診斷與治療。若有急性外傷、劇烈疼痛、發燒、肢體麻木無力等情況，請儘速就醫。' +
      (SITE.isDemo ? "<br>此為作品集示範網站，醫師與診所資料皆為虛構，衛教內容尚未經骨科專業人員審閱，請勿作為醫療依據。" : "") +
      "<br>© " + new Date().getFullYear() + " " + esc(SITE.siteName) + "</p>" +
      "</div></footer>";
  }

  /* ---------- 資料綁定 ----------
     data-bind="doctor.name"          → 文字
     data-bind-href="clinic.phoneHref" → 連結
     data-bind-src="doctor.photo"      → 圖片
     data-list="doctor.specialties"    → 產生 <li>，data-list-class 可指定 class
  */
  function bindData() {
    document.querySelectorAll("[data-bind]").forEach(function (el) {
      var v = get(el.getAttribute("data-bind"));
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll("[data-bind-href]").forEach(function (el) {
      var v = get(el.getAttribute("data-bind-href"));
      if (v != null) el.setAttribute("href", url(v));
      if (v && isExternal(v)) { el.setAttribute("target", "_blank"); el.setAttribute("rel", "noopener"); }
    });
    document.querySelectorAll("[data-bind-src]").forEach(function (el) {
      var v = get(el.getAttribute("data-bind-src"));
      if (v != null) el.setAttribute("src", url(v));
    });
    document.querySelectorAll("[data-list]").forEach(function (el) {
      var list = get(el.getAttribute("data-list")) || [];
      var cls = el.getAttribute("data-list-class");
      el.innerHTML = list.map(function (item) {
        return "<li>" + (cls ? '<span class="' + esc(cls) + '">' + esc(item) + "</span>" : esc(item)) + "</li>";
      }).join("");
    });
    document.querySelectorAll("[data-icon]").forEach(function (el) {
      var icon = ICONS[el.getAttribute("data-icon")];
      if (icon) el.innerHTML = icon;
    });
  }

  /* ---------- 卡片模板 ---------- */
  function articleCard(a) {
    var cat = categoryById(a.category);
    return (
      '<a class="article-card" href="' + url("articles/" + a.slug + ".html") + '">' +
      '<div class="article-thumb">' + (ICONS[cat.icon] || ICONS.bone) + "</div>" +
      '<div class="article-body">' +
      '<div class="article-meta"><span class="tag">' + esc(cat.name) + "</span>" +
      "<span>" + formatDate(a.date) + "</span><span>約 " + a.readTime + " 分鐘</span></div>" +
      "<h3>" + esc(a.title) + "</h3><p>" + esc(a.excerpt) + "</p>" +
      '<span class="read">閱讀文章 →</span></div></a>'
    );
  }
  function sortedArticles() {
    return SITE.articles.slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });
  }

  /* 首頁：分類 */
  function renderCategories() {
    var el = document.getElementById("category-grid");
    if (!el) return;
    el.innerHTML = SITE.categories.map(function (c) {
      return '<a class="cat-card" href="' + url("articles.html?cat=" + c.id) + '">' +
        '<span class="card-icon">' + (ICONS[c.icon] || "") + "</span>" +
        "<strong>" + esc(c.name) + "</strong><span>" + esc(c.desc) + "</span></a>";
    }).join("");
  }

  /* 首頁：最新文章 */
  function renderLatest() {
    var el = document.getElementById("latest-articles");
    if (!el) return;
    var n = Number(el.getAttribute("data-limit")) || 3;
    el.innerHTML = sortedArticles().slice(0, n).map(articleCard).join("");
  }

  /* 文章列表：篩選 + 搜尋 */
  function renderArticleList() {
    var listEl = document.getElementById("article-list");
    if (!listEl) return;
    var chipsEl = document.getElementById("category-chips");
    var searchEl = document.getElementById("article-search");
    var countEl = document.getElementById("result-count");

    var params = new URLSearchParams(location.search);
    var state = { cat: params.get("cat") || "all", q: params.get("q") || "" };
    if (state.cat !== "all" && !SITE.categories.some(function (c) { return c.id === state.cat; })) state.cat = "all";
    searchEl.value = state.q;

    var chipData = [{ id: "all", name: "全部" }].concat(SITE.categories);
    chipsEl.innerHTML = chipData.map(function (c) {
      return '<button type="button" class="chip" data-cat="' + c.id + '" aria-pressed="false">' + esc(c.name) + "</button>";
    }).join("");

    function syncUrl() {
      var p = new URLSearchParams();
      if (state.cat !== "all") p.set("cat", state.cat);
      if (state.q) p.set("q", state.q);
      var qs = p.toString();
      history.replaceState(null, "", location.pathname + (qs ? "?" + qs : ""));
    }

    function draw() {
      chipsEl.querySelectorAll(".chip").forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.getAttribute("data-cat") === state.cat));
      });
      var q = state.q.trim().toLowerCase();
      var items = sortedArticles().filter(function (a) {
        var okCat = state.cat === "all" || a.category === state.cat;
        var okQ = !q || (a.title + a.excerpt + categoryById(a.category).name).toLowerCase().indexOf(q) !== -1;
        return okCat && okQ;
      });
      countEl.textContent = "共 " + items.length + " 篇文章";
      listEl.innerHTML = items.length
        ? items.map(articleCard).join("")
        : '<div class="empty-state">找不到符合的文章，試試其他關鍵字或分類。</div>';
      listEl.classList.toggle("grid-3", items.length > 0);
    }

    chipsEl.addEventListener("click", function (e) {
      var b = e.target.closest(".chip");
      if (!b) return;
      state.cat = b.getAttribute("data-cat");
      syncUrl(); draw();
    });
    searchEl.addEventListener("input", function () {
      state.q = searchEl.value;
      syncUrl(); draw();
    });
    draw();
  }

  /* 文章內頁：分類標籤、日期、相關文章、返回按鈕 */
  function renderArticlePage() {
    if (PAGE !== "article") return;
    var slug = body.getAttribute("data-slug");
    var current = null;
    SITE.articles.forEach(function (a) { if (a.slug === slug) current = a; });
    if (!current) return;
    var cat = categoryById(current.category);

    var metaEl = document.getElementById("article-meta");
    if (metaEl) {
      metaEl.innerHTML = '<a class="tag" href="' + url("articles.html?cat=" + cat.id) + '">' + esc(cat.name) + "</a>" +
        "<span>更新日期：" + formatDate(current.date) + "</span><span>閱讀時間約 " + current.readTime + " 分鐘</span>";
    }

    var relEl = document.getElementById("related-articles");
    if (relEl) {
      var others = sortedArticles().filter(function (a) { return a.slug !== slug; });
      var same = others.filter(function (a) { return a.category === current.category; });
      var rest = others.filter(function (a) { return a.category !== current.category; });
      relEl.innerHTML = same.concat(rest).slice(0, 3).map(articleCard).join("");
    }

    /* 若從文章列表點進來，返回時保留原本的篩選條件 */
    document.querySelectorAll(".js-back").forEach(function (a) {
      a.addEventListener("click", function (e) {
        try {
          var ref = new URL(document.referrer);
          if (ref.origin === location.origin && /articles(\.html)?$/.test(ref.pathname) && history.length > 1) {
            e.preventDefault();
            history.back();
          }
        } catch (err) { /* 沒有 referrer 時使用一般連結 */ }
      });
    });
  }

  /* 分享：LINE 與複製連結（使用 canonical 正式網址） */
  function setupShare() {
    var canonical = document.querySelector('link[rel="canonical"]');
    var shareUrl = location.protocol.indexOf("http") === 0 ? location.href.split("#")[0] : (canonical ? canonical.href : location.href);
    document.querySelectorAll(".js-share-line").forEach(function (a) {
      a.href = "https://social-plugins.line.me/lineit/share?url=" + encodeURIComponent(shareUrl);
      a.target = "_blank";
      a.rel = "noopener";
    });
    document.querySelectorAll(".js-copy-link").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var done = function () {
          var old = btn.textContent;
          btn.textContent = "已複製連結 ✓";
          setTimeout(function () { btn.textContent = old; }, 2000);
        };
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(shareUrl).then(done, function () { window.prompt("請複製以下連結：", shareUrl); });
        } else {
          window.prompt("請複製以下連結：", shareUrl);
        }
      });
    });
  }

  /* 看診時間表 */
  function renderSchedule() {
    document.querySelectorAll("[data-schedule]").forEach(function (el) {
      var s = SITE.clinic.schedule;
      var head = "<tr><th scope=\"col\">時段</th>" + s.days.map(function (d) { return '<th scope="col">' + d + "</th>"; }).join("") + "</tr>";
      var rows = s.sessions.map(function (row) {
        return '<tr><th scope="row">' + esc(row.label) + "</th>" + row.slots.map(function (on) {
          return on ? '<td class="on">●<span class="sr-only">有門診</span></td>' : '<td class="off">—<span class="sr-only">休診</span></td>';
        }).join("") + "</tr>";
      }).join("");
      el.innerHTML = '<div class="table-wrap"><table class="schedule"><caption class="sr-only">門診時間表</caption><thead>' +
        head + "</thead><tbody>" + rows + '</tbody></table></div><p class="note">' + esc(s.note) + "</p>";
    });
  }

  renderDemoBar();
  renderHeader();
  renderFooter();
  bindData();
  renderCategories();
  renderLatest();
  renderArticleList();
  renderArticlePage();
  renderSchedule();
  setupShare();
})();
