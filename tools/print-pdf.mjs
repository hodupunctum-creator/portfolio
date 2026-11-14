// 포트폴리오 인쇄용 PDF (A4 가로) 생성기
// 사용법: NODE_PATH=$(npm root -g) node tools/print-pdf.mjs <저장소 경로> <출력 폴더>  (Playwright 필요, 같은 폴더에 qr.svg)
// 사이트 저장소의 데이터·글꼴·사진을 그대로 써서 한 장 한 장 레이아웃을 짠 뒤 Playwright로 PDF를 뽑습니다.
import { writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);
const REPO = process.argv[2] || '/home/claude/portfolio';
const OUT_DIR = process.argv[3] || '/home/claude/scratch/pdf';
const { orderedWorks, categories, groups } = await import(path.join(REPO, 'src/data/works.js'));
const { site } = await import(path.join(REPO, 'src/data/site.js'));

const PUB = path.join(REPO, 'public');
const SITE_URL = 'https://portfolio-blush-beta-xfi288olfi.vercel.app/';
// 사이트로 연결되는 QR (tools/qr.svg, reportlab로 생성)
import { readFileSync } from 'node:fs';
const QR_SVG = readFileSync(path.join(path.dirname(new URL(import.meta.url).pathname), 'qr.svg'), 'utf8')
  .replace(/^[\s\S]*?<svg/, '<svg')
  .replace(/width="[^"]*" height="[^"]*"/, 'width="100%" height="100%"')
  .replace(/<title>[\s\S]*?<\/title>/, '');
const fileUrl = p => 'file://' + path.join(PUB, p);
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const pad = n => String(n).padStart(2, '0');
// <작품명>이 줄 끝에서 갈라지지 않게 묶음 (이스케이프 후 적용)
const keepTitles = html => html.replace(/(&lt;[^&]{1,40}?&gt;)/g, '<span class="nowrap">$1</span>');
const text = s => keepTitles(esc(s));

// 페이지 번호: 1 표지, 2 About, 3 목차, 4~ 작업
const FIRST_WORK_PAGE = 4;
const pageOf = i => FIRST_WORK_PAGE + i;
const TOTAL = FIRST_WORK_PAGE - 1 + orderedWorks.length;

const footer = n => `<footer class="pfoot"><span>NOT GOOD ENOUGH, BUT STILL WRITING</span><span>${pad(n)} / ${pad(TOTAL)}</span></footer>`;

// ---------- 표지 ----------
const cover = `
<section class="page cover">
  <div class="orb" style="--x:66%;--y:40%;--w:118mm;background:radial-gradient(circle at 36% 64%, #e5283f 0%, #ec4a5c 36%, rgba(240,112,128,.72) 54%, rgba(246,168,178,.3) 62%, rgba(248,190,198,0) 71%)"></div>
  <div class="orb" style="--x:24%;--y:26%;--w:68mm;background:radial-gradient(circle at 36% 64%, #6d9fe6 0%, #88b2ec 36%, rgba(160,196,242,.55) 54%, rgba(175,205,244,.25) 62%, rgba(190,214,246,0) 71%)"></div>
  <div class="orb" style="--x:89%;--y:16%;--w:50mm;background:radial-gradient(circle at 36% 64%, #f2bd1d 0%, #f6cc45 36%, rgba(249,220,118,.6) 54%, rgba(250,226,140,.25) 62%, rgba(251,232,166,0) 71%)"></div>
  <div class="orb" style="--x:93%;--y:52%;--w:30mm;background:radial-gradient(circle at 36% 64%, #6fbf8c 0%, #8ccda3 36%, rgba(170,220,186,.55) 54%, rgba(184,226,196,.25) 62%, rgba(196,230,206,0) 71%)"></div>
  <div class="orb" style="--x:45%;--y:11%;--w:24mm;background:radial-gradient(circle at 36% 64%, #8c84dc 0%, #a59de6 36%, rgba(188,182,240,.5) 54%, rgba(200,194,243,.2) 62%, rgba(210,206,246,0) 71%)"></div>
  <div class="orb" style="--x:10%;--y:60%;--w:13mm;background:radial-gradient(circle at 36% 64%, #e5283f 0%, #ec4a5c 36%, rgba(240,112,128,.5) 54%, rgba(244,140,154,.2) 62%, rgba(246,168,178,0) 71%)"></div>
  <div class="cover-intro"><span class="label">intro</span><p>${esc(site.bio)}</p></div>
  <h1 class="cover-title"><span>Not good enough,</span><span>but still writing</span></h1>
  <div class="cover-foot"><span>송다혜 · 이다유 포트폴리오</span></div>
  <div class="cover-qr"><div class="qr-text"><span class="label">site</span><p>QR을 찍으면<br>포트폴리오 사이트로 이동합니다</p><p class="url">${esc(SITE_URL.replace(/^https:\/\//, '').replace(/\/$/, ''))}</p><p class="url">${esc(site.email)}</p></div><div class="qr">${QR_SVG}</div></div>
</section>`;

// ---------- About ----------
const about = `
<section class="page about">
  <header class="phead"><span class="kicker">About</span></header>
  <div class="about-grid">
    <figure class="about-photo"><img src="${fileUrl('/about-sign.jpg')}" alt=""></figure>
    <div class="about-text">
      <h2 class="about-name">${esc(site.aboutName)}</h2>
      ${site.about.map(p => `<p>${text(p)}</p>`).join('')}
      <p>${text(site.aboutPhotoNote)}</p>
      <dl class="contact"><dt>Contact</dt><dd>${esc(site.email)}</dd></dl>
    </div>
  </div>
  ${footer(2)}
</section>`;

// ---------- 목차 ----------
const indexCols = groups
  .map(group => {
    const cats = categories.filter(c => c.group === group.id);
    const body = cats
      .map(cat => {
        const items = orderedWorks
          .map((w, i) => ({ w, i }))
          .filter(({ w }) => w.category === cat.id)
          .map(
            ({ w, i }) =>
              `<li><span class="n">${pad(w.number)}.</span><span class="t">${text(w.title)}</span><span class="dots"></span><span class="pg">${pageOf(i)}</span></li>`
          )
          .join('');
        return `<section class="idx-cat"><h3><span>${esc(cat.label)}</span></h3><ol>${items}</ol></section>`;
      })
      .join('');
    return `<div class="idx-col"><h2 class="idx-group">${esc(group.label)}</h2>${body}</div>`;
  })
  .join('');
const index = `
<section class="page index">
  <header class="phead"><span class="kicker">목차</span></header>
  <div class="idx">${indexCols}</div>
  ${footer(3)}
</section>`;

// ---------- 작업 페이지 ----------
const EXCERPT_MARK = '[[excerpt]]';
const renderDesc = w => {
  const blocks = w.description.split(/\n{2,}/);
  const excerpt = w.excerpt
    ? `<figure class="excerpt"><h4>${text(w.excerpt.title)}</h4>${w.excerpt.text.map(l => `<p>${text(l)}</p>`).join('')}</figure>`
    : '';
  const inline = blocks.some(b => b.trim() === EXCERPT_MARK);
  const html = blocks
    .map(b => {
      const t = b.trim();
      if (t === '---') return '<hr class="rule">';
      if (t === EXCERPT_MARK) return excerpt;
      return `<p>${t.split('\n').map(text).join('<br>')}</p>`;
    })
    .join('');
  return html + (inline ? '' : excerpt);
};

const photoGroups = w => {
  // 사이트 상세 페이지와 같은 순서: 대표 사진 → images (중복 제거). heading은 묶음 제목.
  const groupsOut = [{ heading: '', srcs: [] }];
  const seen = new Set();
  const add = src => {
    if (!src || seen.has(src)) return;
    seen.add(src);
    groupsOut[groupsOut.length - 1].srcs.push(src);
  };
  add(w.cover);
  for (const item of w.images || []) {
    if (typeof item === 'string') add(item);
    else if (item.heading) groupsOut.push({ heading: item.heading, srcs: [] });
    else add(item.src);
  }
  return groupsOut.filter(g => g.srcs.length);
};

const workPage = (w, i) => {
  const cat = categories.find(c => c.id === w.category);
  const group = groups.find(g => g.id === cat.group);
  const facts = [
    ['구분', `${group.label} · ${cat.label}`],
    ['역할', w.role],
    ['성과', w.outcome],
    ['링크', (w.links || []).map(l => `${l.label} — ${l.url.replace(/^https?:\/\//, '')}`)]
  ].filter(([, v]) => v && v.length);
  const factsHtml = facts
    .map(([k, v]) => `<dt>${k}</dt><dd>${Array.isArray(v) ? v.map(x => `<span>${text(x)}</span>`).join('') : text(v)}</dd>`)
    .join('');
  const photos = photoGroups(w)
    .map(
      g =>
        `<div class="pgroup" data-heading="${esc(g.heading)}">${g.heading ? `<h5>${esc(g.heading)}</h5>` : ''}<div class="prow-src">${g.srcs
          .map(s => `<img src="${fileUrl(s)}" alt="">`)
          .join('')}</div></div>`
    )
    .join('');
  return `
<section class="page work">
  <header class="phead"><span class="kicker">Works · ${esc(cat.label)} <span class="en">${esc(cat.labelEn)}</span></span><span class="count">${pad(w.number)} / ${pad(w.categoryTotal)}</span></header>
  <div class="work-body">
    <div class="wtext">
      <h2 class="wtitle">${text(w.title)}</h2>
      <dl class="facts">${factsHtml}</dl>
      <div class="desc">${renderDesc(w)}</div>
    </div>
    <div class="wphotos">${photos}</div>
  </div>
  ${footer(pageOf(i))}
</section>`;
};

const css = `
@font-face{font-family:Eulyoo;src:url(${fileUrl('/fonts/Eulyoo1945-Regular.woff')})}
@font-face{font-family:Eulyoo;font-weight:600;src:url(${fileUrl('/fonts/Eulyoo1945-SemiBold.woff')})}
@page{size:297mm 210mm;margin:0}
*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{font-family:Eulyoo,'Noto Serif KR',serif;color:#1f1f1f;-webkit-print-color-adjust:exact;print-color-adjust:exact;word-break:keep-all;}
.nowrap{white-space:nowrap}
.page{position:relative;width:297mm;height:210mm;overflow:hidden;background:#f4efe4;page-break-after:always;break-after:page;padding:13mm 15mm 0}
.page:last-child{page-break-after:auto;break-after:auto}
.phead{display:flex;justify-content:space-between;align-items:baseline;padding-bottom:3mm;border-bottom:.3mm solid rgba(31,31,31,.35);font-size:9.5pt;color:#6d6b66;letter-spacing:.02em}
.phead .kicker{color:#1f1f1f}
.phead .en,.en{color:#6d6b66;font-size:.9em;margin-left:.4em}
.pfoot{position:absolute;left:15mm;right:15mm;bottom:7mm;display:flex;justify-content:space-between;font-size:7.5pt;color:#6d6b66;letter-spacing:.06em}
.label{display:block;font-size:9pt;color:#1f1f1f}
.label::before{content:'';display:block;width:6mm;height:.4mm;background:currentColor;margin-bottom:2.5mm}

/* 표지 */
.cover{padding:0}
.orb{position:absolute;left:var(--x);top:var(--y);width:var(--w);aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;mix-blend-mode:multiply;opacity:.88}
.cover-intro{position:absolute;left:15mm;top:24mm;display:grid;grid-template-columns:30mm auto;gap:6mm;align-items:start;z-index:2}
.cover-intro p{margin:0;font-size:13pt}
.cover-title{position:absolute;left:14mm;bottom:30mm;margin:0;z-index:2;font-family:'Inter Tight','Inter',sans-serif;font-weight:800;font-size:23mm;line-height:.88;letter-spacing:-.045em;text-transform:uppercase;color:#33322d}
.cover-title span{display:block}
.cover-foot{position:absolute;left:15mm;right:15mm;bottom:10mm;display:flex;justify-content:space-between;font-size:9.5pt;z-index:2}
.cover-qr{position:absolute;right:15mm;bottom:10mm;z-index:2;display:flex;align-items:flex-end;gap:5mm}
.qr-text{text-align:right;font-size:8.5pt;line-height:1.5}
.qr-text .label::before{margin-left:auto}
.qr-text p{margin:0 0 1.2mm}
.qr-text .url{color:#6d6b66;font-size:7.5pt;margin:0}
.qr{width:27mm;height:27mm;padding:2.2mm;background:#fbf8f1;border-radius:1.5mm}

/* About */
.about-grid{display:grid;grid-template-columns:78mm 1fr;gap:14mm;margin-top:9mm;height:160mm}
.about-photo{margin:0;height:100%;display:flex;align-items:flex-start;justify-content:center}
.about-photo img{max-width:100%;max-height:100%;display:block}
.about-name{margin:0 0 5mm;font-size:13pt;font-weight:600}
.about-text p{margin:0 0 3.6mm;font-size:10.2pt;line-height:1.75}
.contact{margin:6mm 0 0;display:grid;grid-template-columns:22mm auto;font-size:9.5pt}
.contact dt{color:#6d6b66}.contact dd{margin:0}

/* 목차 */
.idx{display:grid;grid-template-columns:1fr 1fr;gap:16mm;margin-top:8mm}
.idx-group{margin:0 0 5mm;font-size:14pt;font-weight:600}
.idx-cat{margin-bottom:4.5mm}
.idx-cat h3{display:flex;justify-content:space-between;margin:0 0 1.6mm;padding-top:1.6mm;border-top:.25mm solid rgba(31,31,31,.35);font-size:9pt;font-weight:400;color:#6d6b66}
.idx-cat ol{list-style:none;margin:0;padding:0}
.idx-cat li{display:grid;grid-template-columns:7mm auto 1fr auto;align-items:baseline;font-size:10pt;line-height:1.62}
.idx-cat .n{color:#6d6b66}
.idx-cat .dots{border-bottom:.25mm dotted rgba(31,31,31,.4);margin:0 2mm;transform:translateY(-1mm)}
.idx-cat .pg{font-variant-numeric:tabular-nums;color:#6d6b66}

/* 작업 */
.work-body{position:absolute;left:15mm;right:15mm;top:26mm;bottom:15mm;display:flex;gap:9mm}
.wtext{flex:0 0 var(--tw,38%);display:flex;flex-direction:column;min-width:0;overflow:hidden;font-size:var(--fs,10pt)}
.wtitle{margin:0 0 3.5mm;font-size:1.75em;font-weight:600;line-height:1.2;letter-spacing:-.02em}
.facts{display:grid;grid-template-columns:4.2em 1fr;gap:.9mm 3mm;margin:0 0 4mm;padding-bottom:3.5mm;border-bottom:.25mm solid rgba(31,31,31,.2);font-size:.86em;line-height:1.5}
.facts dt{color:#6d6b66}.facts dd{margin:0;display:flex;flex-direction:column;overflow-wrap:anywhere}
.desc p{margin:0 0 .75em;line-height:1.72}
.desc .rule{border:0;border-top:.25mm solid rgba(31,31,31,.3);margin:.9em 0}
.excerpt{margin:.4em 0 .9em;padding-top:.7em;border-top:.25mm dashed rgba(31,31,31,.45);font-size:.88em}
.excerpt h4{margin:0 0 .5em;font-weight:600;font-size:1em}
.excerpt p{margin:0;line-height:1.62}
.wphotos{flex:1 1 auto;min-width:0;position:relative}
.pgroup h5{margin:0 0 1.4mm;font-size:8pt;font-weight:400;color:#6d6b66}
.prow-src{display:none}
.prow{display:flex;gap:2.2mm;margin-bottom:2.2mm;justify-content:center}
.prow img{display:block;height:100%;width:auto}
.excerpt--side{position:absolute;left:0;right:0;bottom:0;margin:0;font-size:8.6pt;columns:2;column-gap:6mm}
.excerpt--side h4{column-span:all}
`;

// 각 작업 페이지에서: (1) 글 칸 너비·글자 크기를 정해 글이 넘치지 않게, (2) 남은 칸에 사진을 비율 그대로 줄 맞춰 채움
const fitScript = `
<script>
(async () => {
  await document.fonts.ready;
  const imgsLoaded = Promise.all([...document.images].map(im => im.complete ? 0 : new Promise(r => { im.onload = im.onerror = r; })));
  await imgsLoaded;
  const MM = 96 / 25.4, GAP = 2.2 * MM;
  const report = [];
  for (const page of document.querySelectorAll('.page.work')) {
    const body = page.querySelector('.work-body');
    const wt = page.querySelector('.wtext');
    const ph = page.querySelector('.wphotos');
    const fits = () => wt.scrollHeight <= wt.clientHeight + 1;
    // 글 칸: 사진 수가 적으면 넓게 써도 됨. 글자 10pt에서 시작해 넘치면 칸을 넓히고, 그래도 넘치면 글자를 줄임
    let chosen = null;
    const nImgs = ph.querySelectorAll('img').length;
    const widths = nImgs <= 1 ? [44, 50] : [36, 40, 44, 48, 52];
    outer: for (const fs of [10, 9.6, 9.2, 8.8, 8.4, 8, 7.6, 7.2]) {
      for (const tw of widths) {
        wt.style.setProperty('--tw', tw + '%');
        wt.style.setProperty('--fs', fs + 'pt');
        if (fits()) { chosen = { tw, fs }; break outer; }
      }
    }
    // 글이 너무 작아질 만큼 길면(인용 전문이 있는 경우) 인용 전문을 사진 칸 아래로 옮기고 다시 맞춤
    const ex = wt.querySelector('.excerpt');
    if (ex && (!chosen || chosen.fs < 9)) {
      ph.appendChild(ex);
      ex.classList.add('excerpt--side');
      chosen = null;
      outer2: for (const fs of [10, 9.6, 9.2, 8.8, 8.4, 8]) {
        for (const tw of [40, 44, 48, 52]) {
          wt.style.setProperty('--tw', tw + '%');
          wt.style.setProperty('--fs', fs + 'pt');
          if (fits()) { chosen = { tw, fs }; break outer2; }
        }
      }
    }
    if (!chosen) report.push({ page: page.querySelector('.wtitle').textContent, problem: 'text overflow' });

    // 사진: 묶음별로 정당화 줄 배치. 줄 높이 t를 이분 탐색해 전체 높이가 칸에 들어가는 가장 큰 값을 찾음
    const side = ph.querySelector('.excerpt--side');
    const W = ph.clientWidth, H = ph.clientHeight - (side ? side.getBoundingClientRect().height + 4 * MM : 0);
    const groups = [...ph.querySelectorAll('.pgroup')].map(g => ({
      el: g, head: g.querySelector('h5'),
      imgs: [...g.querySelectorAll('img')].map(im => ({ im, ar: im.naturalWidth / im.naturalHeight }))
    }));
    const headH = g => g.head ? g.head.getBoundingClientRect().height + 1.4 * MM : 0;
    // 묶음마다 사진을 순서대로 여러 줄로 나누는 모든 방법을 따져 봄(각 줄은 칸 너비에 꽉 맞춤).
    // 전체를 같은 비율로 줄여 칸 높이에 맞췄을 때 사진 면적이 가장 큰 조합을 고름.
    const CAP = H * 0.62; // 한 줄이 너무 높아지지 않게(세로 사진 한 장만 있는 줄 등)
    const options = groups.map(g => {
      const ars = g.imgs.map(x => x.ar), n = ars.length, out = [];
      for (let mask = 0; mask < (1 << (n - 1)); mask++) {
        const rows = []; let cur = [0];
        for (let i = 1; i < n; i++) { if (mask & (1 << (i - 1))) { rows.push(cur); cur = [i]; } else cur.push(i); }
        rows.push(cur);
        let h = 0, area = 0, minA = Infinity;
        const rs = rows.map(r => {
          const sum = r.reduce((a, i) => a + ars[i], 0);
          const rh = Math.min((W - GAP * (r.length - 1)) / sum, CAP);
          h += rh;
          r.forEach(i => { const a = ars[i] * rh * rh; area += a; minA = Math.min(minA, a); });
          return { idx: r, h: rh };
        });
        out.push({ rows: rs, h, area, minA, gaps: rows.length * GAP });
      }
      return out;
    });
    // 조합 수가 너무 많으면 묶음마다 상위 후보만
    let product = options.reduce((a, o) => a * o.length, 1);
    if (product > 300000) options.forEach((o, i) => { o.sort((a, b) => b.minA / b.h - a.minA / a.h); options[i] = o.slice(0, 50); });
    let best = null;
    const combine = (gi, chosenOpts) => {
      if (gi === groups.length) {
        const fixed = groups.reduce((a, g) => a + headH(g), 0) + chosenOpts.reduce((a, o) => a + o.gaps, 0) - GAP;
        const rowsH = chosenOpts.reduce((a, o) => a + o.h, 0);
        const sc = Math.min(1, (H - fixed) / rowsH);
        const minA = Math.min(...chosenOpts.map(o => o.minA)) * sc * sc;
        const area = chosenOpts.reduce((a, o) => a + o.area, 0) * sc * sc;
        // 가장 작은 사진이 최대한 크게(모든 사진이 고르게 보이게), 같으면 전체 면적이 큰 쪽
        const score = minA * 1.0 + area * 0.04;
        if (!best || score > best.score) best = { score, sc, opts: [...chosenOpts], total: fixed + rowsH * sc };
        return;
      }
      for (const o of options[gi]) { chosenOpts.push(o); combine(gi + 1, chosenOpts); chosenOpts.pop(); }
    };
    combine(0, []);
    best.plan = best.opts.map((o, gi) => o.rows.map(r => ({ row: r.idx.map(i => groups[gi].imgs[i]), h: r.h * best.sc })));
    groups.forEach((g, gi) => {
      const src = g.el.querySelector('.prow-src');
      best.plan[gi].forEach(r => {
        const rowEl = document.createElement('div');
        rowEl.className = 'prow';
        rowEl.style.height = r.h + 'px';
        r.row.forEach(it => rowEl.appendChild(it.im));
        g.el.insertBefore(rowEl, src);
      });
    });
    // 세로 가운데 정렬보다 위쪽 정렬이 깔끔: 남는 공간은 아래로
    if (best.total > H + 1) report.push({ page: page.querySelector('.wtitle').textContent, problem: 'photo overflow' });
    report.push({ page: page.querySelector('.wtitle').textContent, ...chosen, photos: nImgs, used: Math.round(best.total) + '/' + Math.round(H) });
  }
  window.__report = report;
  document.body.dataset.ready = '1';
})();
</script>`;

const html = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>송다혜 포트폴리오</title><style>${css}</style></head><body>
${cover}${about}${index}${orderedWorks.map(workPage).join('')}
${fitScript}</body></html>`;

const htmlPath = path.join(OUT_DIR, 'portfolio.html');
writeFileSync(htmlPath, html);

const { chromium } = require('playwright');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1123, height: 794 } });
await page.emulateMedia({ media: 'print' });
await page.goto('file://' + htmlPath);
await page.waitForSelector('body[data-ready]', { timeout: 120000 });
const report = await page.evaluate(() => window.__report);
for (const r of report) console.log(JSON.stringify(r));
await page.pdf({ path: path.join(OUT_DIR, 'portfolio.pdf'), width: '297mm', height: '210mm', printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log('pages:', TOTAL);
