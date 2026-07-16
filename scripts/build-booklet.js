#!/usr/bin/env node
'use strict';
/*
 * Builds compline-booklet.pdf: a printable reference booklet containing the
 * office of Compline for each day of the week, plus an appendix of the
 * alternate hymns, antiphons, and responsories used in other seasons and on
 * feast days.
 *
 * This drives the actual web app (index.html) in headless Chromium so that
 * the existing calendar/rubric logic decides what belongs on each day, and
 * exsurge.js renders the GABC chant into print-ready SVG exactly as it does
 * in the browser. We then harvest the rendered DOM (stripping only the
 * interactive controls, via the site's own `.hidden-print` convention) and
 * assemble it into one static document that gets printed to PDF.
 *
 * Requires Playwright (not a project dependency; see package.json note).
 * Run with: NODE_PATH=/opt/node22/lib/node_modules node scripts/build-booklet.js
 */

const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const { chromium } = require('playwright');

const ROOT = path.join(__dirname, '..');
const BUILD_DIR = path.join(ROOT, 'build');
const PORT = 8973;
const PDF_PATH = path.join(ROOT, 'compline-booklet.pdf');
const VIEWPORT = { width: 700, height: 1400 };
const YEAR = new Date().getFullYear();

const WEEKDAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function startServer() {
  return new Promise((resolve, reject) => {
    const proc = spawn('python3', ['-m', 'http.server', String(PORT)], {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let settled = false;
    const done = () => {
      if (!settled) {
        settled = true;
        resolve(proc);
      }
    };
    proc.stdout.on('data', done);
    proc.stderr.on('data', done);
    proc.on('error', reject);
    setTimeout(done, 1500);
  });
}

async function setDate(page, dateStr) {
  await page.evaluate((d) => {
    const el = document.querySelector('#date');
    el.value = d;
    el.dispatchEvent(new Event('change'));
  }, dateStr);
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.waitForTimeout(350);
}

async function forcePrintLayout(page) {
  await page.emulateMedia({ media: 'print' });
  await page.waitForTimeout(200);
}

async function clickControl(page, selector) {
  await page.$eval(selector, (el) => el.click());
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.waitForTimeout(200);
}

async function setSelect(page, selector, value) {
  await page.$eval(
    selector,
    (el, v) => {
      el.value = v;
      el.dispatchEvent(new Event('change'));
    },
    value
  );
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.waitForTimeout(200);
}

async function setCheckbox(page, selector, checked) {
  await page.$eval(
    selector,
    (el, c) => {
      el.checked = c;
      el.dispatchEvent(new Event('change'));
    },
    checked
  );
  await page.waitForTimeout(150);
}

// Clones the matched, currently-visible elements for the given selectors into
// a detached container, strips interactive/hidden cruft the same way the
// site's own print stylesheet would, and returns the resulting innerHTML.
async function extractCombined(page, selectors) {
  await forcePrintLayout(page);
  return page.evaluate((selectors) => {
    const container = document.createElement('div');
    const isHidden = (el) => {
      const s = el.getAttribute('style') || '';
      return /display\s*:\s*none/i.test(s) || /visibility\s*:\s*hidden/i.test(s);
    };
    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        if (isHidden(el)) return;
        container.appendChild(el.cloneNode(true));
      });
    });
    const KILL = '.hidden-print, .lyric-font, script, select, input, button, #options-menu';
    container.querySelectorAll(KILL).forEach((el) => el.remove());
    container.querySelectorAll('[style]').forEach((el) => {
      if (isHidden(el)) el.remove();
    });
    container.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
    return container.innerHTML;
  }, selectors);
}

async function textOf(page, selector) {
  return page.$eval(selector, (el) => el.textContent.trim()).catch(() => '');
}

async function computeCalendarDates(page) {
  return page.evaluate((year) => {
    return new Promise((resolve) => {
      window.require(['calendar', 'moment'], function (calendar, moment) {
        const anchor = moment([year, 0, 15]);
        const d = calendar.datesForMoment(anchor);
        const fmt = (m) => m.format('YYYY-MM-DD');

        // Find a run of 7 consecutive days (Sunday-Saturday), safely inside
        // "time after Pentecost", where every weekday is a plain feria (so
        // the booklet's 7 offices show the ordinary/default content, with
        // seasonal substitutions left to the appendix).
        let weekStart = null;
        const cursor = moment(d.pentecost).add(21, 'days');
        cursor.add((7 - cursor.day()) % 7, 'days'); // align to Sunday
        const limit = moment(d.advent1).subtract(10, 'days');
        while (cursor.isBefore(limit)) {
          let ok = true;
          for (let i = 1; i <= 6; i++) {
            const day = moment(cursor).add(i, 'days');
            const feast = calendar.getFeastForDate(day);
            if (feast && feast.rank && feast.rank < 3) {
              ok = false;
              break;
            }
          }
          if (ok) {
            weekStart = moment(cursor);
            break;
          }
          cursor.add(7, 'days');
        }

        resolve({
          weekStart: weekStart ? fmt(weekStart) : null,
          maundyThursday: fmt(moment(d.easter).subtract(3, 'days')),
          goodFriday: fmt(moment(d.easter).subtract(2, 'days')),
          holySaturday: fmt(moment(d.easter).subtract(1, 'days')),
          allSouls: fmt(d.allSouls),
          paschalOctaveSample: fmt(moment(d.easter).add(2, 'days')),
          paschalTimeSample: fmt(moment(d.easter).add(10, 'days')),
        });
      });
    });
  }, YEAR);
}

function escapeHtml(s) {
  return String(s || '').replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}

async function renderFullOffice(page, id, heading) {
  const feastLabel = await textOf(page, '#feastDay');
  const weekdayLabel = await textOf(page, '.weekday-lbl');
  const body = await extractCombined(page, ['body > *']);
  const subtitle = feastLabel && feastLabel !== weekdayLabel ? feastLabel : '';
  return `<section class="office" id="${id}">
    <h2>${escapeHtml(heading)}${subtitle ? `<span class="feast-label">${escapeHtml(subtitle)}</span>` : ''}</h2>
    ${body}
  </section>`;
}

async function main() {
  fs.mkdirSync(BUILD_DIR, { recursive: true });
  console.log('Starting static server...');
  const server = await startServer();
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: VIEWPORT });
    await page.goto(`http://localhost:${PORT}/index.html`);
    await page.waitForSelector('#date');
    await page.waitForLoadState('networkidle');

    console.log('Computing calendar dates for', YEAR, '...');
    const cal = await computeCalendarDates(page);
    if (!cal.weekStart) throw new Error('Could not find a safe ordinary-time week');
    console.log('Calendar dates:', cal);

    // ---- 7 weekday offices ----
    const officeSections = [];
    for (let i = 0; i < 7; i++) {
      const d = await page.evaluate(
        ({ weekStart, i }) =>
          new Promise((resolve) => {
            window.require(['moment'], (moment) => {
              resolve(moment(weekStart).add(i, 'days').format('YYYY-MM-DD'));
            });
          }),
        { weekStart: cal.weekStart, i }
      );
      console.log('Rendering', WEEKDAY_NAMES[i], d);
      await setDate(page, d);
      officeSections.push(await renderFullOffice(page, WEEKDAY_NAMES[i].toLowerCase(), `${WEEKDAY_NAMES[i]} at Compline`));
    }

    // ---- Appendix E special days (captured now, while we still loop dates) ----
    const specialDayDefs = [
      { id: 'maundy-thursday', label: 'Compline on Maundy Thursday', date: cal.maundyThursday },
      { id: 'good-friday', label: 'Compline on Good Friday', date: cal.goodFriday },
      { id: 'holy-saturday', label: 'Compline on Holy Saturday', date: cal.holySaturday },
      { id: 'all-souls', label: "Compline on All Souls' Day", date: cal.allSouls },
    ];
    const specialDaySections = [];
    for (const def of specialDayDefs) {
      console.log('Rendering special day', def.label, def.date);
      await setDate(page, def.date);
      specialDaySections.push(await renderFullOffice(page, def.id, def.label));
    }

    // ---- Appendix D: canticle + psalm variants for Paschal Octave / Paschal Time / All Souls ----
    console.log('Capturing Paschal Octave sample', cal.paschalOctaveSample);
    await setDate(page, cal.paschalOctaveSample);
    const paschalOctavePsalms = await extractCombined(page, ['#placeholder']);
    const paschalOctaveCanticle = await extractCombined(page, ['#canticle']);

    console.log('Capturing Paschal Time sample', cal.paschalTimeSample);
    await setDate(page, cal.paschalTimeSample);
    const paschalTimePsalms = await extractCombined(page, ['#placeholder']);
    const paschalTimeCanticle = await extractCombined(page, ['#canticle']);

    console.log('Capturing All Souls canticle/psalm', cal.allSouls);
    await setDate(page, cal.allSouls);
    const allSoulsPsalms = await extractCombined(page, ['#placeholder']);
    const allSoulsCanticle = await extractCombined(page, ['#canticle']);

    // ---- Appendix A: Te Lucis tones ----
    // Use the middle of our safe ordinary week as a neutral date for manual
    // control selection (date itself no longer matters past this point).
    const neutralDate = await page.evaluate(
      ({ weekStart }) =>
        new Promise((resolve) => {
          window.require(['moment'], (moment) => {
            resolve(moment(weekStart).add(3, 'days').format('YYYY-MM-DD'));
          });
        }),
      { weekStart: cal.weekStart }
    );
    await setDate(page, neutralDate);

    const teLucisOptions = [
      'Ordinary',
      'Solemn',
      'Advent',
      'Lent',
      'Passiontide',
      'Easter',
      'Our-Lady',
      'Christmas',
      'Epiphany',
      'Holy-Family',
      'Seven-Dolors',
      'Ascension',
      'Transfiguration',
      'Pentecost',
      'Christ-the-King',
      'Sacred-Heart',
    ];
    const teLucisItems = [];
    for (const opt of teLucisOptions) {
      const selector = `#te-lucis-${opt}`;
      const label = await page.$eval(selector, (el) => {
        const clone = el.cloneNode(true);
        const italic = clone.querySelector('i');
        const rubric = italic ? italic.textContent.trim() : '';
        if (italic) italic.remove();
        return { name: clone.textContent.trim(), rubric };
      });
      console.log('Rendering Te Lucis tone:', opt);
      await clickControl(page, selector);
      const chant = await extractCombined(page, ['#te-lucis']);
      teLucisItems.push({ name: label.name, rubric: label.rubric, chant });
    }

    // ---- Appendix B: In Manus Tuas / Custodi Nos ----
    const inManusOptions = [
      { id: 'in-manus-tuas-advent', name: 'Advent' },
      { id: 'in-manus-tuas-passiontide', name: 'Passiontide' },
      { id: 'in-manus-tuas-pt', name: 'Eastertide' },
    ];
    const inManusItems = [];
    for (const opt of inManusOptions) {
      const selector = `#${opt.id}`;
      const rubric = await page.$eval(selector, (el) => el.textContent.trim());
      console.log('Rendering In Manus Tuas variant:', opt.name);
      await clickControl(page, selector);
      const chant = await extractCombined(page, ['#in-manus-tuas', '.in-manus-tuas']);
      inManusItems.push({ name: opt.name, rubric, chant });
    }

    // ---- Appendix C: Marian antiphons ----
    const marianOptions = [
      { value: 'alma-redemptoris-mater', name: 'Alma Redemptoris Mater' },
      { value: 'ave-regina-caelorum', name: 'Ave Regina Cælorum' },
      { value: 'regina-caeli', name: 'Regina Cæli' },
      { value: 'salve-regina', name: 'Salve Regina' },
    ];
    const marianItems = [];
    for (const opt of marianOptions) {
      console.log('Rendering Marian antiphon:', opt.name);
      await setCheckbox(page, '#marian-antiphon-solemn', false);
      await setSelect(page, '#marian-antiphon-choices select', opt.value);
      const block = await extractCombined(page, ['#marian-antiphon', '.marian-antiphon']);
      await setCheckbox(page, '#marian-antiphon-solemn', true);
      await forcePrintLayout(page);
      const solemnChant = await extractCombined(page, ['#marian-antiphon']);
      marianItems.push({ name: opt.name, block, solemnChant });
    }
    await setCheckbox(page, '#marian-antiphon-solemn', false);

    // ---- Appendix F: officiant is a priest/deacon; Laus tibi versicle ----
    await clickControl(page, '#officiant-priest');
    const priestBlock = await extractCombined(page, ['.officiant']);
    await clickControl(page, '#officiant-no-priest');

    await page.evaluate(() => {
      const el = document.querySelector('chant-gabc[src="deus-in-adjutorium_alleluia.gabc"]');
      if (el) el.setAttribute('src', 'deus-in-adjutorium_laus-tibi.gabc');
    });
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(200);
    const lausTibiChant = await extractCombined(page, ['chant-gabc[src="deus-in-adjutorium_laus-tibi.gabc"]']);

    const collected = {
      officeSections,
      specialDaySections,
      paschalOctavePsalms,
      paschalOctaveCanticle,
      paschalTimePsalms,
      paschalTimeCanticle,
      allSoulsPsalms,
      allSoulsCanticle,
      teLucisItems,
      inManusItems,
      marianItems,
      priestBlock,
      lausTibiChant,
    };
    fs.writeFileSync(path.join(BUILD_DIR, 'collected.json'), JSON.stringify(collected, null, 2));
    console.log('Saved intermediate content to build/collected.json');

    const html = buildBookletHtml(collected);
    const bookletPath = path.join(BUILD_DIR, 'booklet.html');
    fs.writeFileSync(bookletPath, html);
    console.log('Wrote', bookletPath);

    console.log('Rendering PDF...');
    const pdfPage = await browser.newPage({ viewport: VIEWPORT });
    await pdfPage.goto(`http://localhost:${PORT}/build/booklet.html`);
    await pdfPage.waitForLoadState('networkidle');
    await pdfPage.emulateMedia({ media: 'print' });
    await pdfPage.waitForTimeout(300);
    await pdfPage.pdf({
      path: PDF_PATH,
      format: 'Letter',
      printBackground: true,
      margin: { top: '0.55in', bottom: '0.6in', left: '0.65in', right: '0.65in' },
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate:
        '<div style="font-size:8px; width:100%; text-align:center; color:#888; font-family: Georgia, serif;">' +
        'Compline &mdash; A Reference Booklet &nbsp;&middot;&nbsp; <span class="pageNumber"></span> / <span class="totalPages"></span></div>',
    });
    console.log('Wrote', PDF_PATH);

    await browser.close();
    server.kill();

    return collected;
  } catch (err) {
    await browser.close();
    server.kill();
    throw err;
  }
}

const BOOKLET_STYLE = `
  body.booklet { font-size: 12pt; }
  .titlepage { text-align: center; page-break-after: always; padding-top: 22%; }
  .titlepage h1 { font-size: 30pt; margin-bottom: 0.1em; font-weight: 600; }
  .titlepage .subtitle { font-size: 13pt; color: #444; margin-bottom: 2.5em; }
  .titlepage .note { max-width: 5.2in; margin: 3em auto 0; font-size: 10.5pt; color: #555; text-align: left; line-height: 1.5; }
  .titlepage .note h3 { font-size: 11.5pt; color: #222; margin-bottom: 0.3em; }
  .toc { page-break-after: always; }
  .toc h2 { border-bottom: 1px solid #999; padding-bottom: 4px; }
  .toc .section-label { color: #d00; font-weight: 600; display: block; margin: 1.1em 0 0.3em; font-size: 10.5pt; text-transform: uppercase; letter-spacing: 0.04em; }
  .toc ul { list-style: none; padding: 0; margin: 0; }
  .toc li { margin: 0.35em 0; font-size: 12pt; }
  .toc a { text-decoration: none; color: #000; }
  .toc a .num { color: #d00; margin-right: 0.4em; }
  .office { page-break-before: always; }
  .office h2 { border-bottom: 1px solid #999; padding-bottom: 4px; margin-bottom: 0.6em; }
  .office .feast-label { display: block; font-size: 10.5pt; font-weight: normal; color: #666; margin-top: 0.15em; }
  .appendix-intro { page-break-before: always; }
  .appendix { page-break-before: always; }
  .appendix h2 { border-bottom: 1px solid #999; padding-bottom: 4px; }
  .appendix .intro { color: #333; margin-bottom: 1.2em; font-size: 11pt; }
  .appendix .variant { margin: 0 0 1.5em; page-break-inside: avoid; }
  .appendix .variant h3 { margin: 0 0 0.15em; font-size: 12.5pt; }
  .appendix .variant .rubric { color: #666; font-style: italic; font-size: 10pt; margin: 0 0 0.35em; }
  .appendix .variant .solemn-label { color: #666; font-size: 10pt; margin: 0.3em 0 0.1em; }
  .special-days-intro { margin-bottom: 1em; font-size: 11pt; color: #333; }
`;

function buildTocLi(id, label) {
  return `<li><a href="#${id}">${escapeHtml(label)}</a></li>`;
}

function buildOfficeSectionsHtml(collected) {
  return collected.officeSections.join('\n');
}

function buildAppendixA(items) {
  const variants = items
    .map(
      (i) => `<div class="variant">
        <h3>${escapeHtml(i.name)}</h3>
        <p class="rubric">${escapeHtml(i.rubric)}</p>
        ${i.chant}
      </div>`
    )
    .join('\n');
  return `<section class="appendix" id="appendix-a">
    <h2>Appendix A &mdash; The Hymn <i>Te Lucis Ante Terminum</i></h2>
    <p class="intro">The seven weekday offices above use the ordinary ferial tone. On the days and in the seasons below, a different tone of the hymn is sung instead.</p>
    ${variants}
  </section>`;
}

function buildAppendixB(items) {
  const variants = items
    .map(
      (i) => `<div class="variant">
        <h3>${escapeHtml(i.name)}</h3>
        <p class="rubric">${escapeHtml(i.rubric)}</p>
        ${i.chant}
      </div>`
    )
    .join('\n');
  return `<section class="appendix" id="appendix-b">
    <h2>Appendix B &mdash; The Short Responsory <i>In Manus Tuas</i></h2>
    <p class="intro">The seven weekday offices above use the responsory as said throughout the year. At the times below, the responsory itself, or its concluding verse <i>Custódi nos</i>, changes.</p>
    ${variants}
  </section>`;
}

function buildAppendixC(items) {
  const variants = items
    .map(
      (i) => `<div class="variant">
        <h3>${escapeHtml(i.name)}</h3>
        ${i.block}
        <div class="solemn-label">Solemn Tone:</div>
        ${i.solemnChant}
      </div>`
    )
    .join('\n');
  return `<section class="appendix" id="appendix-c">
    <h2>Appendix C &mdash; The Anthem of the Blessed Virgin Mary</h2>
    <p class="intro">The seven weekday offices above end with Salve Regina, the antiphon proper to most of the year. Compline always ends with one of these four seasonal antiphons to Our Lady, each given here with its versicle, collect, and solemn tone (sung on greater feasts of Our Lady, and elsewhere at local custom).</p>
    ${variants}
  </section>`;
}

function buildAppendixD(collected) {
  return `<section class="appendix" id="appendix-d">
    <h2>Appendix D &mdash; The Canticle of Simeon in Paschal Time</h2>
    <p class="intro">During the Paschal Octave and throughout Paschal Time, the antiphon before the psalms and canticle changes, as shown below with a representative day's psalms. The same substitution applies to whichever day's psalms are actually said.</p>
    <div class="variant">
      <h3>The Paschal Octave (Easter Sunday through the following Saturday)</h3>
      <p class="rubric">Sunday's psalms are said every day of the Octave, without antiphon, and <i>Hæc dies</i> is added after the canticle antiphon.</p>
      ${collected.paschalOctavePsalms}
      ${collected.paschalOctaveCanticle}
    </div>
    <div class="variant">
      <h3>Paschal Time (from the Octave of Easter until the Friday after Pentecost)</h3>
      <p class="rubric">Shown here with the psalms for Wednesday; each day keeps its own psalms, sung to this antiphon.</p>
      ${collected.paschalTimePsalms}
      ${collected.paschalTimeCanticle}
    </div>
    <div class="variant">
      <h3>All Souls' Day</h3>
      <p class="rubric">Psalm 122 replaces the usual psalmody, and the canticle antiphon is proper to the day.</p>
      ${collected.allSoulsPsalms}
      ${collected.allSoulsCanticle}
    </div>
  </section>`;
}

function buildAppendixE(collected) {
  return `<section class="appendix" id="appendix-e">
    <h2>Appendix E &mdash; Compline on Special Days</h2>
    <p class="special-days-intro">On the three days of the Sacred Triduum and on All Souls&rsquo; Day, the order of Compline itself is altered. Complete forms for each are given here.</p>
    ${collected.specialDaySections.join('\n')}
  </section>`;
}

function buildAppendixF(collected) {
  return `<section class="appendix" id="appendix-f">
    <h2>Appendix F &mdash; Other Variants</h2>
    <div class="variant">
      <h3>When a Priest or Deacon Presides</h3>
      <p class="rubric">The seven weekday offices above give the form used when no priest or deacon is present. When one presides, the Confiteor and the versicles before the collect are said as follows instead.</p>
      ${collected.priestBlock}
    </div>
    <div class="variant">
      <h3>Deus in Adjutórium: <i>Laus tibi, Dómine</i></h3>
      <p class="rubric">From Septuagesima Sunday until Easter, the response <i>Laus tibi, Dómine, Rex ætérnæ glóriæ</i> replaces the Alleluia.</p>
      ${collected.lausTibiChant}
    </div>
  </section>`;
}

function buildBookletHtml(collected) {
  const weekdayTocItems = WEEKDAY_NAMES.map((name) => buildTocLi(name.toLowerCase(), `${name} at Compline`)).join('\n');
  const appendixTocItems = [
    ['appendix-a', 'A. The Hymn <i>Te Lucis Ante Terminum</i>'],
    ['appendix-b', 'B. The Short Responsory <i>In Manus Tuas</i>'],
    ['appendix-c', 'C. The Anthem of the Blessed Virgin Mary'],
    ['appendix-d', 'D. The Canticle of Simeon in Paschal Time'],
    ['appendix-e', 'E. Compline on Special Days'],
    ['appendix-f', 'F. Other Variants'],
  ]
    .map(([id, label]) => `<li><a href="#${id}">${label}</a></li>`)
    .join('\n');

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Compline: A Reference Booklet</title>
<link rel="stylesheet" href="/style.css">
<style>${BOOKLET_STYLE}</style>
</head>
<body class="booklet">
  <section class="titlepage">
    <h1>Compline</h1>
    <div class="subtitle">A Printable Reference Booklet<br>Gregorian Chant, According to the Traditional Roman Rite</div>
    <div class="note">
      <h3>How to use this booklet</h3>
      <p>The office for each day of the week (Sunday&ndash;Saturday) is given complete, in the form it takes throughout most of the year: the ferial hymn tone, the responsory as said outside of the penitential and paschal seasons, and Salve Regina as the anthem of Our Lady.</p>
      <p>On Sundays and feasts of a special season, and on certain feast days, one or more parts of the office are replaced. The Appendix gives these alternate hymns, responsories, antiphons, and full alternate forms of Compline, organized by which part of the office they replace.</p>
    </div>
  </section>
  <nav class="toc">
    <h2>Contents</h2>
    <span class="section-label">The Office for Each Day</span>
    <ul>${weekdayTocItems}</ul>
    <span class="section-label">Appendix</span>
    <ul>${appendixTocItems}</ul>
  </nav>
  ${buildOfficeSectionsHtml(collected)}
  ${buildAppendixA(collected.teLucisItems)}
  ${buildAppendixB(collected.inManusItems)}
  ${buildAppendixC(collected.marianItems)}
  ${buildAppendixD(collected)}
  ${buildAppendixE(collected)}
  ${buildAppendixF(collected)}
</body>
</html>`;
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { main, startServer, PORT, ROOT, BUILD_DIR, PDF_PATH, VIEWPORT };
