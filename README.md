<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="茶山刘 — 校园生活记录与分享，本站与任何高校官方无关" />
  <title>茶山刘 · 校园生活</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=ZCOOL+XiaoWei&family=Noto+Serif+SC:wght@400;600&family=Lora:ital@0;1&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --green-deep:   #042C1A;
      --green-dark:   #085041;
      --green-mid:    #0F6E56;
      --green-bright: #1D9E75;
      --green-light:  #9FE1CB;
      --green-pale:   #E1F5EE;
      --ink:          #1a2e25;
      --ink-muted:    #4a6558;
      --cream:        #f7f3ec;
      --gold:         #c8a84b;
    }

    html { scroll-behavior: smooth; }

    body {
      background-color: var(--cream);
      color: var(--ink);
      font-family: 'Noto Serif SC', 'STSong', serif;
      line-height: 1.8;
      overflow-x: hidden;
    }

    /* ── DISCLAIMER BANNER ── */
    .disclaimer {
      background: #fffbe6;
      border-bottom: 1px solid #e6d87a;
      text-align: center;
      padding: 0.55rem 1.5rem;
      font-size: 0.8rem;
      color: #7a6200;
      letter-spacing: 0.04em;
    }

    /* ── HEADER ── */
    header {
      position: relative;
      background: linear-gradient(160deg, #062d1d 0%, #0a4434 50%, #0f5e48 100%);
      overflow: hidden;
      padding: 3.5rem 1.5rem 4rem;
      text-align: center;
    }

    header::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image:
        repeating-linear-gradient(90deg,
          rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px,
          transparent 1px, transparent 60px);
      pointer-events: none;
    }

    .header-tagline {
      font-family: 'Lora', Georgia, serif;
      font-style: italic;
      font-size: clamp(0.75rem, 2vw, 0.9rem);
      letter-spacing: 0.25em;
      color: var(--green-light);
      opacity: 0.75;
      margin-bottom: 2rem;
      animation: fadeDown 0.8s ease both;
    }

    .logo-wrap {
      display: inline-block;
      max-width: min(560px, 92vw);
      width: 100%;
      animation: fadeUp 1s ease 0.2s both;
      filter: drop-shadow(0 8px 32px rgba(0,0,0,0.35));
    }

    .logo-wrap svg {
      width: 100%;
      height: auto;
      display: block;
    }

    .header-sub {
      margin-top: 1.8rem;
      font-size: clamp(0.7rem, 1.8vw, 0.82rem);
      letter-spacing: 0.3em;
      color: var(--green-light);
      opacity: 0.6;
      animation: fadeUp 1s ease 0.5s both;
    }

    /* ── NAV ── */
    nav {
      background: var(--green-dark);
      border-bottom: 1px solid rgba(255,255,255,0.07);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    nav ul {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      list-style: none;
      gap: 0;
      max-width: 860px;
      margin: 0 auto;
    }

    nav ul li a {
      display: block;
      padding: 0.85rem 1.4rem;
      font-family: 'ZCOOL XiaoWei', serif;
      font-size: 1rem;
      color: var(--green-pale);
      text-decoration: none;
      letter-spacing: 0.1em;
      opacity: 0.8;
      transition: opacity 0.2s, color 0.2s;
      position: relative;
    }

    nav ul li a::after {
      content: '';
      position: absolute;
      bottom: 0; left: 50%; right: 50%;
      height: 2px;
      background: var(--gold);
      transition: left 0.25s, right 0.25s;
    }

    nav ul li a:hover { opacity: 1; color: #fff; }
    nav ul li a:hover::after { left: 1rem; right: 1rem; }

    /* ── HERO ── */
    .hero {
      max-width: 780px;
      margin: 4rem auto;
      padding: 0 1.5rem;
      text-align: center;
      animation: fadeUp 0.9s ease 0.3s both;
    }

    .hero-eyebrow {
      font-family: 'Lora', serif;
      font-style: italic;
      font-size: 0.85rem;
      letter-spacing: 0.2em;
      color: var(--green-mid);
      margin-bottom: 0.8rem;
    }

    .hero h1 {
      font-family: 'ZCOOL XiaoWei', serif;
      font-size: clamp(1.8rem, 5vw, 2.6rem);
      font-weight: 400;
      color: var(--green-deep);
      line-height: 1.4;
      margin-bottom: 1.2rem;
    }

    .hero p {
      font-size: 1rem;
      color: var(--ink-muted);
      max-width: 560px;
      margin: 0 auto 2rem;
    }

    .hero-divider {
      display: flex;
      align-items: center;
      gap: 1rem;
      justify-content: center;
      margin-bottom: 2.5rem;
    }

    .hero-divider::before,
    .hero-divider::after {
      content: '';
      flex: 1;
      max-width: 120px;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--green-bright));
      opacity: 0.4;
    }
    .hero-divider::after { background: linear-gradient(270deg, transparent, var(--green-bright)); }

    .hero-divider span {
      font-size: 1.2rem;
      color: var(--green-bright);
      opacity: 0.6;
    }

    /* ── CARDS ── */
    .section {
      max-width: 1040px;
      margin: 0 auto 5rem;
      padding: 0 1.5rem;
    }

    .section-title {
      font-family: 'ZCOOL XiaoWei', serif;
      font-size: 1.5rem;
      font-weight: 400;
      color: var(--green-dark);
      border-left: 3px solid var(--green-bright);
      padding-left: 0.8rem;
      margin-bottom: 1.8rem;
      letter-spacing: 0.05em;
    }

    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .card {
      background: #fff;
      border: 1px solid rgba(15,110,86,0.12);
      border-radius: 10px;
      padding: 1.6rem 1.5rem;
      transition: transform 0.25s, box-shadow 0.25s;
      position: relative;
      overflow: hidden;
    }

    .card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--green-bright), var(--green-mid));
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s;
    }

    .card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(8,80,65,0.1); }
    .card:hover::before { transform: scaleX(1); }

    .card-icon {
      font-size: 1.8rem;
      margin-bottom: 0.8rem;
      display: block;
    }

    .card h3 {
      font-family: 'ZCOOL XiaoWei', serif;
      font-size: 1.15rem;
      font-weight: 400;
      color: var(--green-dark);
      margin-bottom: 0.5rem;
      letter-spacing: 0.05em;
    }

    .card p {
      font-size: 0.88rem;
      color: var(--ink-muted);
      line-height: 1.75;
    }

    /* ── ABOUT STRIP ── */
    .about-strip {
      background: linear-gradient(135deg, var(--green-dark), var(--green-deep));
      color: var(--green-pale);
      padding: 4rem 1.5rem;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .about-strip::before {
      content: '茶山刘';
      position: absolute;
      font-family: 'ZCOOL XiaoWei', serif;
      font-size: 12rem;
      color: rgba(255,255,255,0.03);
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      white-space: nowrap;
      pointer-events: none;
      letter-spacing: 0.2em;
    }

    .about-strip h2 {
      font-family: 'ZCOOL XiaoWei', serif;
      font-size: clamp(1.4rem, 4vw, 2rem);
      font-weight: 400;
      margin-bottom: 1rem;
      letter-spacing: 0.08em;
    }

    .about-strip p {
      font-size: 0.95rem;
      max-width: 580px;
      margin: 0 auto 1rem;
      opacity: 0.75;
      line-height: 1.9;
    }

    /* ── FOOTER ── */
    footer {
      background: var(--green-deep);
      color: var(--green-light);
      text-align: center;
      padding: 2rem 1.5rem;
      font-size: 0.8rem;
      letter-spacing: 0.1em;
      opacity: 0.9;
    }

    footer a { color: var(--green-light); text-decoration: none; opacity: 0.7; }
    footer a:hover { opacity: 1; }

    .footer-disclaimer {
      margin-top: 0.6rem;
      font-size: 0.72rem;
      opacity: 0.45;
      letter-spacing: 0.05em;
    }

    /* ── ANIMATIONS ── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeDown {
      from { opacity: 0; transform: translateY(-12px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* ── RESPONSIVE ── */
    @media (max-width: 600px) {
      nav ul li a { padding: 0.7rem 0.9rem; font-size: 0.9rem; }
      .card-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>

<!-- ══ DISCLAIMER BANNER ══ -->
<div class="disclaimer">
  ⚠️ 本站与任何高校官方无关，内容仅代表个人观点。
</div>

<!-- ══ HEADER ══ -->
<header>
  <p class="header-tagline">Campus Life on Chashan Hill · chashanliu.top</p>

  <div class="logo-wrap">
    <svg width="680" height="340" viewBox="0 0 680 340" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>茶山刘 chashanliu.top logo</title>
      <desc>Logo for chashanliu.top featuring stylized Chinese characters and a rolling hill silhouette</desc>
      <defs>
        <linearGradient id="hillGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1D9E75" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#0F6E56" stop-opacity="1"/>
        </linearGradient>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#E1F5EE"/>
          <stop offset="100%" stop-color="#9FE1CB" stop-opacity="0.4"/>
        </linearGradient>
        <clipPath id="hillClip">
          <rect x="100" y="80" width="480" height="200" rx="12"/>
        </clipPath>
      </defs>
      <rect width="680" height="340" fill="none"/>
      <rect x="100" y="80" width="480" height="200" rx="12" fill="url(#skyGrad)"/>
      <g clip-path="url(#hillClip)">
        <path d="M100 260 Q200 130 340 155 Q430 170 480 200 L580 260 Z" fill="url(#hillGrad)" opacity="0.35"/>
        <path d="M100 280 Q180 195 260 200 Q320 205 370 225 Q430 248 580 240 L580 280 Z" fill="url(#hillGrad)" opacity="0.5"/>
        <path d="M100 290 Q160 255 220 258 Q280 262 330 272 L580 272 L580 290 Z" fill="#085041" opacity="0.6"/>
      </g>
      <rect x="100" y="80" width="480" height="200" rx="12" fill="none" stroke="#0F6E56" stroke-width="1.5"/>
      <text x="220" y="215" font-size="72" font-weight="400" fill="#085041" opacity="0.12" letter-spacing="2" text-anchor="middle" font-family="'ZCOOL XiaoWei','STSong','SimSun',serif">茶山刘</text>
      <text x="220" y="213" font-size="72" font-weight="400" fill="#085041" letter-spacing="2" text-anchor="middle" font-family="'ZCOOL XiaoWei','STSong','SimSun',serif">茶山刘</text>
      <circle cx="392" cy="120" r="5" fill="#1D9E75" opacity="0.7"/>
      <circle cx="392" cy="120" r="2.5" fill="#085041"/>
      <line x1="392" y1="115" x2="392" y2="104" stroke="#1D9E75" stroke-width="1" opacity="0.6"/>
      <path d="M388 108 Q392 101 396 108" fill="none" stroke="#1D9E75" stroke-width="1" opacity="0.6"/>
      <text x="340" y="310" font-size="13" letter-spacing="3" font-style="italic" opacity="0.85" font-family="'Georgia','Times New Roman',serif" text-anchor="middle" fill="#0F6E56">chashanliu.top</text>
      <line x1="200" y1="310" x2="285" y2="310" stroke="#1D9E75" stroke-width="0.5" opacity="0.5"/>
      <line x1="395" y1="310" x2="480" y2="310" stroke="#1D9E75" stroke-width="0.5" opacity="0.5"/>
      <line x1="430" y1="97" x2="430" y2="110" stroke="#1D9E75" stroke-width="0.5" stroke-dasharray="2,2" opacity="0.3"/>
      <line x1="440" y1="92" x2="440" y2="106" stroke="#1D9E75" stroke-width="0.5" stroke-dasharray="2,2" opacity="0.3"/>
      <line x1="450" y1="88" x2="450" y2="100" stroke="#1D9E75" stroke-width="0.5" stroke-dasharray="2,2" opacity="0.3"/>
      <line x1="460" y1="91" x2="460" y2="104" stroke="#1D9E75" stroke-width="0.5" stroke-dasharray="2,2" opacity="0.3"/>
      <line x1="470" y1="87" x2="470" y2="100" stroke="#1D9E75" stroke-width="0.5" stroke-dasharray="2,2" opacity="0.3"/>
    </svg>
  </div>

  <p class="header-sub">校园生活记录 · Wuhan, China</p>
</header>

<!-- ══ NAV ══ -->
<nav aria-label="主导航">
  <ul>
    <li><a href="#topics">校园生活</a></li>
    <li><a href="#spots">地标打卡</a></li>
    <li><a href="#about">关于茶山刘</a></li>
    <li><a href="https://chashanliu.top" target="_blank" rel="noopener">访问主站</a></li>
  </ul>
</nav>

<!-- ══ HERO ══ -->
<section class="hero">
  <p class="hero-eyebrow">Welcome to Chashan Hill</p>
  <h1>记录茶山刘上的每一天</h1>
  <p>茶山刘，一座承载着无数故事的地名。我们记录校园里的日常，分享学习、生活与成长的点滴。</p>
  <div class="hero-divider"><span>✦</span></div>
</section>

<!-- ══ TOPICS ══ -->
<section class="section" id="topics">
  <h2 class="section-title">校园生活</h2>
  <div class="card-grid">
    <div class="card">
      <span class="card-icon">📚</span>
      <h3>学习与考研</h3>
      <p>图书馆占座攻略、考研备考经验、课程资源分享，陪你走过每一个奋斗的夜晚。</p>
    </div>
<a href="https://chashanliu.top/food.html" class="card-link" style="text-decoration: none; color: inherit;">
  <div class="card">
    <span class="card-icon">🍜</span>
    <h3>食堂与美食</h3>
    <p>各大食堂测评、校外周边美食探店，填饱肚子才能更好地追梦。</p>
  </div>
</a>
<div class="card">
      <span class="card-icon">🎉</span>
      <h3>社团与活动</h3>
      <p>各类社团招新、校园文化节、体育赛事资讯，让大学生活精彩纷呈。</p>
    </div>
    <div class="card">
      <span class="card-icon">🏠</span>
      <h3>住宿与生活</h3>
      <p>宿舍装扮、生活小技巧、快递与跑腿信息，让茶山刘的日子更加舒心。</p>
    </div>
    <div class="card">
      <span class="card-icon">💼</span>
      <h3>实习与就业</h3>
      <p>校招信息、简历投递经验、求职故事分享，助你从茶山刘出发，走向更大的世界。</p>
    </div>
    <div class="card">
      <span class="card-icon">🌿</span>
      <h3>校园风光</h3>
      <p>四季茶山的绿意、晨雾中的图书馆、樱花道的浪漫，用镜头留住这里最美的光阴。</p>
    </div>
  </div>
</section>

<!-- ══ SPOTS ══ -->
<section class="section" id="spots">
  <h2 class="section-title">地标打卡</h2>
  <div class="card-grid">
    <div class="card">
      <span class="card-icon">🏛️</span>
      <h3>文治楼</h3>
      <p>校园的标志性建筑，每逢毕业季都是最热门的拍照打卡地，承载着一届又一届学生的记忆。</p>
    </div>
    <div class="card">
      <span class="card-icon">📖</span>
      <h3>图书馆</h3>
      <p>茶山刘上最安静的角落，无数个深夜与清晨，都有人在这里与书相伴。</p>
    </div>
    <div class="card">
      <span class="card-icon">⛰️</span>
      <h3>茶山刘山顶</h3>
      <p>爬上山顶，俯瞰整个校园，武汉的天际线尽收眼底，是放松心情的绝佳去处。</p>
    </div>
  </div>
</section>

<!-- ══ ABOUT ══ -->
<div class="about-strip" id="about">
  <h2>关于茶山刘</h2>
  <p>茶山刘没有山，这里是590的终点站，终点站旁是中南政法学院。这片土地见证了一代代学子的成长，也孕育了无数关于青春与理想的故事。本站致力于记录和传递这里真实、温暖的校园生活。</p>
  <p style="font-size:0.82rem; opacity:0.5; margin-top:1rem;">本站与任何高校官方无关。</p>
</div>

<!-- ══ FOOTER ══ -->
<footer>
  <p>© 2026 <a href="https://chashanliu.top">chashanliu.top</a> · 茶山刘 · 校园生活</p>
  <p class="footer-disclaimer">本站与任何高校官方无关，内容仅代表个人观点。· Wuhan, China</p>
</footer>

</body>
</html>
