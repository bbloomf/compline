# Compline under the rubrics of Divino Afflatu (pre-1955): plan

For [issue #13](https://github.com/bbloomf/compline/issues/13). Status: Phase 1 done (2026-10-28); Phase 2 done (2026-10-29).

The office as it stood from Pius X's reform (Divino Afflatu, 1911) until the simplification of 1955 (*Cum nostra hac aetate*). Divinum Officium (DO), the source of the translations, has this as its "Divino Afflatu - 1954" version, which can serve as the reference throughout.

## Phase 1: the choice, and what doesn't depend on the day (done)

- `#selectRubrics`, next to the date: "1960 rubrics" (`1960`) or "Divino Afflatu (pre-1955)" (`DA`), kept in `localStorage.rubrics`. `calendar.setRubrics` keeps the choice, and `include='divinoAfflatu'` (or `exclude=`) shows a part of `index.html` only under one or the other.
- After *Adjutorium nostrum*: the *Pater noster* said silently throughout (`pater-silent`), where 1960 has the examination of conscience (`examen`). DO's `Ordinarium/Completorium.txt` shows `$rubrica examen` only for 1960.
- After *Divinum auxilium*: the *Pater noster*, *Ave Maria* and *Credo*, said silently, and the rubric for when Matins follows (`pater-ave-credo`, `pater-ave-credo-matins`). DO drops these for 1955 and 1960. The texts come from DO's `Prayers.txt` (`index:pater-noster`, `index:ave-maria`, `index:credo` in `tools/do-import/manifest.json`). The rubrics are drafted in each language's `extra/<lang>/rubrics.txt` for the native readers to check.
- A note under the date says what doesn't follow the Divino Afflatu calendar yet (since Phase 2: the hymn's tone, the antiphon and the preces).

## Phase 2: the calendar (done)

Rather than rebuild DO's occurrence, transfers, octaves and concurrence in JavaScript, the app takes them from DO's own engine. The result is a table, so the app still works offline.

- `tools/do-import/da-calendar/compline-office.pl` loads DO's Perl (`horascommon.pl` and the rest, with `cgi-stub/` standing in for `CGI.pm`). For each day it calls DO's `precedence` with the hour set to Compline, so concurrence is applied. It prints the office that Compline follows: DO's file, the Latin and English titles, the rank, `duplex`, whether these are the office's First or Second Vespers, and the psalms (`psalmi_minor`).
- A year's calendar depends only on its Easter and on whether it's a leap year. That gives 70 kinds of year, and 69 of them occur between 1583 and 4099. `tools/do-import/da-calendar/build.js` (`npm run build-da-calendar`) runs the script over one year of each kind and writes `js/calendar-da.js`, about 115 KB (16 KB gzipped). The file holds:
  - 519 offices, each with its key, English title, *ol* for Our Lady, and Sunday's psalms on another day;
  - 19 ranks, each with its English name, `duplex`, a 1960-style class for the existing date tokens, and *sunday*;
  - three characters a day for each kind of year.
  The build translates the titles of the temporal cycle, which DO's English files leave in Latin, into English in `calendar.js`'s style. It also translates the rank names ("Double of the I Class", "Lesser Sunday").
- `calendar.js` loads the table only when Divino Afflatu is chosen (`setRubrics(r, callback)`). `getFeastForDate` then returns the office that Compline follows, with `rankName`, `duplex`, `first` (First Vespers) and `psalms`. The feast line shows, for example, "All Saints (Double of the I Class, First Vespers)" on 31 October.
  - `rank` maps the office to 1960's classes, so the existing tokens (`firstClassFeast`, `feria` and the rest) still work: I and II class are 1 and 2, the other feasts and octave days 3, simples 4, ferias 10.
  - Under DA, `allSouls` is the evening before All Souls, as in DO: its Compline follows the First Vespers of the Dead.
- **The psalms** come from DO too: Sunday's where DO says them, as on doubles of the I and II class and in the octaves of Easter, the Ascension, Pentecost and Corpus Christi; elsewhere the weekday's. On Saturday evening before a Sunday they're Saturday's.
- **Checked:** for 1950, 2025, 2027, 2028 and 2100, none of which built the table, the app's lookup in node matches DO day by day: 1,826 days, with no differences in the office, its First or Second Vespers, or `duplex`. That includes 2025, when All Souls is moved off a Sunday.
- **Regional calendars:** only the universal calendar for now, and under DA the app ignores the region choice and its alternates. Looked into on 2026-10-29; left for later:
  - **No source:** DO's diocesan calendars (`dioecesis`) are Rome's, a few German and Dutch dioceses' and Brasília's, none of the app's regions'. restorethe54's ordo is universal only. No machine-readable pre-1955 national proper turned up for the US, Canada, England, Wales, Scotland or Australia and New Zealand, so one would have to be transcribed from a printed Ordo of the time.
  - **calendar.js's regional lists can't be reused:** they're 1960's, and some of their feasts came later: St. Elizabeth Ann Seton and St. Oliver Plunkett (canonized 1975), St. John Ogilvie (1976), the US's 22 January. Their ranks are 1960's classes, not doubles.
  - **More than a title:** under DA a proper feast changes the occurrence, the transfers and the concurrence around it, and so which Compline is said. It would go through DO's engine: a kalendarium of the region, and a stub office with each feast's rank, giving a table of its own for each region.

## Phase 3: what follows from the day

- **The psalms:** they now follow DO (Phase 2). The label "Sunday at Compline (First or Second Class Feast)" still needs to match under DA.
- **Holy Saturday:** under DA, DO says Compline after the First Vespers of Easter, with Sunday's psalms. The app still shows the Triduum's Compline (`isTriduum`, `easter-1`).
- **The antiphon:** on a day that isn't a double, only its opening words are said before the psalms, and it's said in full after them. On doubles it's said in full both times, as now. The office's `duplex` (`calendar.js`) says which: 3 is a double. Each day's `psalms/<day>/ant.gabc` needs its intonation, as a file of its own or cut from it.
- **The preces** (DO's `specials/preces.pl`), after the canticle's antiphon. `compline-office.pl` can print DO's decision as a column of its own:
  - *Dominicales*: on semidoubles, simples and ferias, but not within an octave, nor when a double or an octave is commemorated.
  - *Feriales*: on the ferias of Advent, Lent and Passiontide, on Ember days, and on the vigils outside Epiphany and Paschal time. The texts are DO's `Psalterium/Special/Minor Special.txt`, `[Preces Dominicales]`.
- **The hymn:** the tones and doxologies under DA. The `te-lucis` `select-date` rules use 1960's ranks.
- **The Marian antiphon's seasons:** check for any change, e.g. *Alma* from First Vespers of Advent.

## Phase 4: checking

Compare a whole year, day by day, with DO's Divino Afflatu output: the office of the day and the psalms, as Phase 2 has done, plus whether the antiphon is doubled and the preces. Check the All Souls psalms too: DO's are 122, 141 and 142, and `psalms/asd/` labels only 141 and 142. Then remove the note under the date.
