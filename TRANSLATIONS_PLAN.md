# Translations for Compline: plan (rev. 2, multi-language from Divinum Officium)

Status: Phase 0 done (2026-10-26, results in §7a). Phase 1a, the notation levels, done (2026-10-26, notes in §7b). Phase 1, the display, done against a hand-written English stub (2026-10-26, notes and the module format in §7c). Phase 2, the psalter importer, done (2026-10-27, notes and every language's coverage in §7d): Phase 3, the importer for everything else, done (2026-10-27, notes and every language's coverage in §7e): `js/i18n/en.js` is now wholly generated from DO, psalter and texts. Phase 4, English end to end, done (2026-10-27, notes in §7f): English is offered in the menu. Phase 5, more languages, done (2026-10-27, notes in §7g): Français, Español, Italiano, Português and Polski are offered too, with font subsets for their letters; the hand-written texts in each are kept as drafted until a reader of the language checks them in Phase 8 (§7g). Phase 6, Latin-Bea, done (2026-10-27, notes in §7h): the Pius XII psalter is offered last in the menu, as a comparison text, its psalms paired with the Vulgate's by content. Phase 7, the hymn, done (2026-10-27, notes in §7i): *Te lucis* can be shown as a literal or a metrical translation, or sung in English or Spanish to any of the 17 tones. Phase 8, the release, is ready to publish (2026-10-27, notes in §7j). The typo pass, credits, accessibility and build are done. Publishing to gh-pages, the reports to DO and the Cordova release wait for the user's go-ahead, and the native readers' checklist (`tools/do-import/native-review.md`) is still to be done. Rev. 3 (2026-10-24) records the answers to the open questions, the full coverage check, the notation levels with six menus (§4c) and the Spanish doxologies. Written against `master` @ 28f86f6, with Divinum Officium (DO) `master` @ b9064d7 (2026-10-23) checked out sparsely for the research below. DO is now pinned at `ad87836` (2026-10-26); §7a lists what that changed.

**What changed from rev. 1:** every translation now comes from the [Divinum Officium](https://github.com/DivinumOfficium/divinum-officium) data files (MIT licence), not hand-collected sources. That means the app can offer **every language DO has**, and Latin-Bea, instead of English only.

Goal: one setting for **what to show** (Latin / Latin + translation / translation only) and one for **which translation**. At launch that's the six languages that have every text the app uses: English, Français, Español, Italiano, Português and Polski, plus Latin (Bea) for comparison (§2). A third setting chooses, per section, **plain text, pointed or fully notated** (§4c). Latin-Bea is **for comparison only**. The chant and the sung psalter stay Vulgate.

---

## 1. How text gets on the page today

The Latin comes from three places. Each needs its own way of adding the translation.

| Source | What it holds | How it renders |
|---|---|---|
| **Static HTML in `index.html`** | Confiteor (two forms), Misereatur (three forms), Indulgentiam, the versicles, the pointed chapter (`.pointed-chapter`), the pointed collect and Marian prayers (`.pointed-prayer`), the Marian V/R pairs, *Benedicat*, *Divinum auxilium*, the Triduum and All Souls texts. Rubrics are in English (`.red`). | Plain HTML, shown and hidden by `[include]`/`[exclude]` (date rules in `setDate`), `.officiant.*`, `.marian-antiphon.*` and the notation levels (body classes, §4c). |
| **GABC files** (root, `te-lucis/`, `in-manus-tuas/`, `marian-antiphon/`, `psalms/`) | Every chanted text. The Latin exists **only** in the GABC lyrics. A file can hold several scores (split by `regexGabcHeader`), and stanzas or V/R parts are often blank-line paragraphs. | `<chant-gabc src=…>` → `ChantVisualElement.setGabc()` → exsurge → SVG. The `user-notes` and `commentary` headers become red labels (for example `user-notes: Psalm 4.`). |
| **Pointed psalm and canticle HTML** (`psalms/<day>/psalm-verses[-PT\|-triduum].html`, `canticle-psalm[-po\|-asd].html`) | Verses 2…n as `<div class="verses"><p><span class="verse-number">N.&nbsp;</span>…</p>`, with `<i class='red'>Psalm 90</i>` headings between psalms. | Fetched with `$.get` in `setPsalms`/`setCanticle`. Verse 1 is the chanted `psalm.gabc`. With the psalms fully notated (`notationPsalms`), everything comes from `psalm_full.gabc` (one line per verse, `N. ` prefix, one score per psalm). |

Facts that still apply:

- **The same psalm text is repeated across files.** The normal, `-PT` and `-triduum` files differ only in pointing (or in leaving out the Gloria). So key translations by **psalm and verse**, not by file.
- **Psalm parts restart their numbering** (`Psalm 7. I.`/`II.`). The Gloria Patri and Sicut erat are the last two numbered verses of each psalm, and the Triduum leaves them out. In total there are about 307 chanted verse lines, about 260 of them unique.
- **Regional and seasonal variants only choose files.** `calendar.js` chooses which variant file to use and has no per-region texts. Feast titles in `calendar.js` are in English.
- **The bundled exsurge supports Gregorio translation lines.** The minified `js/exsurge.js` has `TranslationText` and the lyric syntax `/\[(alt:)?(.*?)\]/`, so `syl[translation](notes)` and `[/]` spans work. Phase 0 tested them: they render, but the spacing doesn't hold (§7a).
- **`setGabc` rewrites the lyrics before parsing.** For example, `([^c])u([aeiou…])` becomes `u{…}`, and `<i>`/`<b>` become `_`/`*`. Any translation inserted into GABC has to go in **after** those replacements.

---

## 2. Divinum Officium as the source: what's there

### Licence
- The repo is **MIT** ("Copyright (c) 2026 Divinum Officium"). MIT requires the copyright and permission notice to be **included with copies**, so ship it with the generated files (see §6).
- DO doesn't document where each language's text comes from. The English psalter is Douay-Rheims (Challoner): "When I called upon him, the God of my justice heard me…", and the English *Te lucis* is a metrical translation ("Before the ending of the day…"). The MIT grant is only as good as what contributors had the right to give, but that is DO's representation to make. **Decided:** rely on DO's MIT licence.

### Layout (`web/www/horas/<Language>/…`)

| What the app needs | DO file and section |
|---|---|
| Order of Compline | `Ordinarium/Completorium.txt`: `$Name` and `&macro` references, `(rubrica …)` conditionals |
| Psalms and Nunc dimittis | `Psalterium/Psalmorum/Psalm<N>.txt` (Nunc dimittis = `Psalm233.txt`) |
| Which psalms and antiphons on which day | `Psalterium/Psalmi/Psalmi minor.txt` `[Completorium]`: `Dominica = Miserére * mihi…` / `4,90,133`, `Feria II … 6,7(2-10),7(11-18)`, … |
| Hymn, lesson, chapter, responsory, *Custodi nos*, *Salva nos* | `Psalterium/Special/Minor Special.txt`: `[Hymnus Completorium]`, `[Lectio Completorium]`, `[Completorium_]`, `[Responsory Completorium]`, `[Versum 4]`, `[Ant 4]` |
| Seasonal hymn doxologies | `Psalterium/Doxologies.txt`: `[Nat]`, `[Epi]`, `[Pasch]`, `[Asc]`, `[Pent]`, `[Corp]`, `[Heart]`. The Holy Family, Christ the King, Transfiguration and Seven Sorrows doxologies live in feast files under `Sancti/`/`Tempore/` (not checked out yet). |
| Marian antiphons, with their V/R and collects | `Psalterium/Mariaant.txt`: `[Advent]`, `[Nativiti]`, `[Quadragesimae]`, `[Paschalis]`, `[Postpentecost]` |
| Ordinary prayers | `Psalterium/Common/Prayers.txt`: `[Confiteor_]`, `[Misereatur]`, `[Indulgentiam]`, `[Converte nos]`, `[Deus in adjutorium]`, `[Adjutorium nostrum]`, `[Jube domne]`, `[Benedictio Completorium_]`, `[Benedictio Completorium2]`, `[Oratio Visita_]`, `[Divinum auxilium]`, `[Aportainferi]`, `[Requiescant]`, `[Gloria]`, `[Alleluia]`, …; short phrases in `Common/Translate.txt` |

**Format quirks the importer has to handle:**
- `@file:section:s/x/y/` cross-references with substitutions;
- `$Name`/`&macro` includes;
- choosing among `(rubrica 196)`/`(rubrica Monastica)`/`(rubrica Ordo Praedicatorum)` variants (we want the **1960 Roman** forms);
- `v.`/`V.`/`R.`/`R.br.` prefixes;
- `_` stanza breaks;
- `*` † ‡ `+` markers;
- `!Ref` citation lines;
- section names that differ by language (`[benedictio Completorium]` in Latin vs `[Benedictio Completorium_]` in English).

### The psalms line up across languages

Each psalm file has **one line per breviary verse**, keyed by Vulgate reference, with `a`/`b` where the breviary splits a verse: `4:2a Cum invocárem…`, `4:2b Miserére mei…`. The *same keys* are used in every translation. So:

- The DO psalter is already in **breviary verse division**. That removes rev. 1's biggest manual job (lining up Douay-Rheims numbering by hand).
- App verse *i* of a section is line *i* of the matching DO range. Spot-checked: Ps 4 has 10 lines and the app has 10 verses before the Gloria; Ps 90 has 16 and 16. Parts follow `Psalmi minor` ranges, so `Psalm 7. I.` = `7(2-10)`.
- I compared each language's verse keys against Latin for the 20 Compline psalm files (19 psalms plus Nunc dimittis). Number of files that don't match, re-checked at the pinned commit (§7a):

| Language | Mismatches (of 20) | Note |
|---|---|---|
| Español | 1 | Ps 102:17–18 divided differently (below) |
| Italiano, Polski, Magyar-Kaldi | 1 | `11:6` for `11:6b` |
| Deutsch | 2 | Ps 60 and Ps 69 |
| English, Français, Português, Nederlands, Magyar, Dansk, Vietnamice | 0 | English had 1 (`122:2y`) until DO fixed it upstream |
| Hebrew | 13 | Masoretic text, not a translation of the Vulgate, and right-to-left |
| Bohemice, Polski-Newer | most | Psalms missing (no Nunc dimittis, and so on) |
| Latin-Bea | n/a | Different verse division, see §2b |

  The importer should match by **key**, and report anything that doesn't match, rather than relying on line counts.

  The Italiano and Polski mismatch is a **typo in DO's verse keys**, not missing text: `11:6` for `11:6b`. The importer maps it with an override. (English had the same kind of typo, `122:2y` for `122:2a`, which DO has since fixed.) **Español is different:** its Ps 102 has the text, but divided into lines differently. Latin has three lines keyed `102:17`, `102:17`, `102:18`; Spanish has two, where Spanish 17 is Latin 17a plus the first half of 17b, and Spanish 18 is the rest of 17b plus 18. That is in Saturday's second psalm, so the importer pairs Latin 17–18 (three app verses) with Spanish 17–18 as one group, the way §2b pairs Bea, unless `extra/es/` supplies a three-line division. Deutsch is different again: its Ps 60 has **no verse 9**. Its verse 8 is a rhymed couplet that covers the content of both 8 and 9, so it can't be split.

  **Latin repeats some keys** where it splits a verse without `a`/`b`: 69:4, 69:6, 70:3, 70:18, 76:18, 87:9, 102:17, 141:4, 141:5 and 141:7. Every language repeats them the same way, so "match by key" means "match the *n*-th line with that key".

### Coverage of every text the app uses (decided: launch only languages at 100%)

Checked section by section against the DO checkout: the 20 psalm files by verse key; from `Minor Special.txt` the hymn, lesson, chapter, responsory, versicle and *Salva nos*; from `Prayers.txt` the Confiteor, Misereatur, Indulgentiam, *Converte nos*, *Deus in adjutorium*, *Adjutorium nostrum*, *Jube domne*, the blessing, *Visita*, *Divinum auxilium*, Gloria, Alleluia, *Benedicamus*, *Dominus vobiscum* and *Tu autem*; the five Marian antiphon sections; the six seasonal doxologies; the feast doxologies for the Transfiguration (`Sancti/08-06`), Christ the King (`Sancti/10-DU`) and the Holy Family (`Tempora/Epi1-0`); and the Triduum *Christus factus est* (`Tempora/Quad6-4`, `Quad6-5`). A section counts as missing if it's absent or still in English or Latin.

| Language | Result | What's missing |
|---|---|---|
| **English, Français, Español, Italiano, Português, Polski** | **100%** | Nothing. (Italiano and Polski need the verse-key override above, and Español the Ps 102 grouping.) |
| Magyar | not offered | Christ the King and Holy Family doxologies |
| Deutsch | not offered | Transfiguration and Christ the King doxologies; Ps 60:9 |
| Vietnamice | not offered | All three feast doxologies; no Triduum files |
| Nederlands | not offered | Five seasonal doxologies are untranslated English (`Epi`, `Pasch`, `Asc`, `Pent`, `Heart`) |
| Dansk | not offered | *Divinum auxilium*, four of five Marian antiphon sections, every doxology |
| Magyar-Kaldi | not offered | Psalms only |
| **Latin-Bea** | offered, comparison only | Has only psalms and canticles by design; everything else is the Vulgate Latin (§2b) |

Rev. 2 said Español, Magyar and Dansk had no Confiteor. That was wrong: all three have `[Confiteor_]`.

A language that isn't offered can be added later by writing its missing pieces into `tools/do-import/extra/<lang>/` (for Magyar that's two doxologies), or by fixing them upstream in DO. The importer's coverage report (§3) re-checks this on every import. It also has to confirm the small items this check didn't reach: the Easter-octave *Hæc dies*, the Septuagesima *Laus tibi* and the generated Paschal "alleluia" forms. DO **generates** the alleluia forms in Perl, so the importer builds them too (§3).

### 2b. Latin-Bea (comparison only)

DO's `Latin-Bea` is the Pius XII (Bea) psalter: **only the psalms and canticles change**. Its verse division doesn't match the Vulgate's:
- Ps 4 has 8 verses instead of 10: `4:2a+2b` → `4:2`, and Bea `4:9` covers Vulgate 4:9–10.
- It has `(Laudes nocturnæ in templo)` title lines, which the importer should strip or show as a subtitle.
- Even the Nunc dimittis changes ("salútem tuam", "Quam parásti").

**Decision: Bea is a comparison text only.** It sits in the translation slot, next to the Vulgate chant, and is never sung. That means:
- **No changes** to the GABC files, the pointed HTML or the pointing.
- **Psalm pairing:** psalms are matched **by verse-number group**. For example, Bea `4:2` sits next to Vulgate `4:2a` + `4:2b`. Where Bea merges verses across a number boundary (Bea 4:9 = Vulgate 4:9–10), that group is widened. If a psalm can't be paired cleanly, it falls back to one Bea block per psalm. The importer works out the groups and reports them.
- **Non-psalm texts:** Bea is identical to Latin, so in "Latin + translation" mode nothing extra is shown. In "translation only" mode the Latin is shown.
- Size: **S** once the pipeline exists.

---

## 3. How to store and generate translations

The data is **generated from DO by a dev-time importer**, and the output is committed.

```
tools/do-import/
  import.js          # node script: reads a pinned DO checkout, writes js/i18n/<lang>.js (Phase 2: done)
  psalter.js         # the psalter, checked against app-latin.js (Phase 2: done)
  app-latin.js       # the app's own Latin psalms, from the pointed HTML and the GABC (Phase 2: done)
  text.js            # reading DO's files, normalizing and comparing texts (Phase 2: done)
  texts.js           # everything else, from manifest.json, checked against the app's Latin (Phase 3: done)
  resolve.js         # DO's conditionals and @/$/& references, for the 1960 Roman office (Phase 3: done)
  manifest.json      # app text key -> DO file/section (+ transforms) (Phase 3: done)
  hymn.js            # the hymn: literal, metrical and sung, and the validator against the 17 tones (Phase 7: done)
  extra/<lang>/      # written by hand: texts.txt, texts DO doesn't have or that replace DO's, or DO sections in DO's syntax (Phase 3: the priest's forms, with their Latin; Phase 4: three English fixes; Phase 5: each new language's priest's forms and fixes, psalm lines among them), spelling.txt (Phase 4: English), and hymn-literal.txt and hymn-sung.txt (Phase 7: English and Español)
  DO_COMMIT          # pinned DO commit hash (Phase 0: done)
  fetch-do.sh        # sparse checkout of DO at DO_COMMIT (Phase 0: done)
js/i18n/
  en.js  de.js  fr.js  es.js  it.js  pt.js  pl.js  nl.js  hu.js  vi.js  la-bea.js  ...
  LICENSE-divinum-officium.txt
```

**The importer:**
1. **Psalter.** For each app psalm section (from `Psalmi minor` ranges, plus Nunc dimittis and the All Souls psalms 122, 141 and 142), it takes DO lines by key. It **checks** each line against the app's own Latin: it normalises the app's verse text (removes pointing tags, accents and punctuation) and fuzzy-matches it to DO Latin line *i*, flagging anything below a threshold. It splits `[Gloria]` into the two Gloria verses. It strips the `*` † ‡ `+` markers, or keeps `*` as a mediant marker that the display can show or hide.
2. **Everything else** goes through `manifest.json`, which maps each app key to a DO source, for example:
   ```json
   { "blessing.gabc":         { "file": "Psalterium/Common/Prayers.txt", "section": "Benedictio Completorium_" },
     "custodi-nos-pt.gabc":   { "from": "custodi-nos.gabc", "appendEach": "Alleluia" },
     "te-lucis/Christmas.gabc": { "hymn": "Hymnus Completorium", "doxology": "Doxologies.txt:Nat" },
     "index:confiteor":       { "file": "Psalterium/Common/Prayers.txt", "section": "Confiteor_" } }
   ```
   It resolves `@`/`$`/`&` references and `s///` substitutions, picks the non-monastic, non-OP, 1960 variant, and splits into **units** (V/R parts, stanzas) that match the app's chant paragraphs.
2. **Output.** It writes one AMD module per language, `define({ psalter: {...}, texts: {...}, meta: {name, dir, doCommit} })`, each with an MIT header. A language that has no entry for a text simply leaves it out; the fallback rule is in §4.
3. **Coverage report.** It prints a table of which keys are missing or mismatched per language. Only languages at **100%** appear in the menu (decided); see the table in §2. **Hebrew, Bohemice and Polski-Newer are left out** (decided), and so is Cesky-Schaller, which has only 3 psalms. The importer skips all four.

**Why generate and commit** rather than read DO at runtime: the app is static, works offline and in Cordova, and needs aligned units, not DO's raw format. Pinning a commit keeps it reproducible, and re-running the importer picks up DO fixes.

**Index HTML.** With 10+ languages, translations can't be inlined next to the Latin (rev. 1 suggested that). Instead, each Latin block gets a key, for example `<p lang="la" data-tr="index:confiteor">`. JS adds a sibling `<p lang="xx" class="tr">` from the loaded module. The pointed chapter and collects reuse the key of their GABC twin (`data-tr="chapter.gabc"`), so there's one copy of each text.

**Loading.** The active language module is loaded on demand with `require(['i18n/' + lang])`. Because the module name is dynamic, r.js does **not** bundle it, so only the chosen language is downloaded (about 40–50 KB unminified each). Loading through a script tag avoids any `file://` XHR issues in Cordova.

---

## 4. How each mode displays

Modes are set as classes, `text-la` | `text-both` | `text-tr`, on each block of text (a `.tr-pair`, a psalm's `.verses` and each `<chant-gabc>`), as its section shows: the Text menu's mode, or `tr` where the section's notation menu says "Translation only" (§4c). The Text menu's mode is also on `<body>`, as `page-text-<mode>`, for the menus. Every text node gets a correct `lang` attribute. All the included languages are left-to-right.

### Latin + translation (`both`)

| Content | Display |
|---|---|
| HTML prayers and versicles | Wider than about 768 px: CSS grid with **Latin on the left, translation on the right**, rows aligned. Narrow screens: **stacked**, with the translation under each Latin paragraph in a quieter style, distinct from the red rubrics. |
| Pointed psalms | After the fragment loads, add a translated `<p>` after each Latin `<p>`, matched on `.verse-number`, so verse pairs fall into the same grid or stack. Verse 1, the chanted intonation, gets its translation under the `<chant-gabc>`. |
| Pointed chapter and prayers | The translation block follows the pointed Latin, as plain text without pointing. |
| Short chants, antiphons, responsories, hymn | **Decided:** a translation block after each **unit**. `chant-element` splits the source into scores or blank-line paragraphs (copying the clef onto each later one), renders each, and adds the unit's translation underneath. The hymn becomes stanza, translation, stanza, translation. All the units stay in **one** `<chant-gabc>`, which writes each unit's SVG and then its translation into its own `innerHTML` (Phase 0: one element per unit doubles the layout time, §7a). |
| Fully notated psalms | The same, at **verse** level (decided): split each psalm score at `^\d+\. ` lines. Phase 0 measured it: inside one element it costs about the same as today, so the fallback (one block per psalm) isn't needed (§7a). |
| Later, optional: interlinear | Exsurge's translation line under the staff. Phase 0: not usable as it is, because exsurge doesn't make room for the translation and won't break a line inside one (§7a). |

### Latin only (`la`)
What the app does today. Translation nodes are hidden, and `chant-element` skips splitting.

### Translation only (`tr`)

**Decided:** hide the notation and show the translation as plain text, with V./R. marks, verse numbers and the red labels. Exsurge layout isn't run at all. This is the same as every section's notation set to plain text (§4c), with the translation in place of the Latin.
- Hide the controls that only matter for chant: the notation selects (§4c) and "Solemn Tone". Keep the Te lucis, In manus tuas and season selectors, because they also choose the text.
- Show only one of each pointed/notated pair.
- **Fallback when a translation is missing (decided):** show the Latin, marked with `lang="la"` and a subtle style, so the office never has gaps. In `both` mode, a missing translation shows nothing.
- When the comparison language is **Latin-Bea**, "translation only" means Bea psalms and Vulgate-identical text for everything else. That's coherent, but in effect it's a "read with the Bea psalter" mode.
- Rejected: keeping the Latin chant (the same as `both`). Singing in the vernacular is out of scope (it needs adapted pointing and melodies per language), **except for the hymn** (§4b).

### Rubrics and app labels
Menu labels and feast titles (`calendar.js`, 344 entries) **stay in English** (decided). The rubrics did too, until Phase 8: they are now in the translation's language, except in English and Latin-Bea (§4d). Localising the interface is a separate, optional phase. DO has feast titles per language in its `Sancti/` files, but mapping them to `calendar.js` is real work. In translation-only mode, rubrics that quote Latin cue words ("Tu autem…nobis", "Dómine", "Orémus") can get a gloss.

### Fonts
`fonts/generator_config.txt` shows the Crimson Text webfonts are **subset** to basic Latin plus the Latin liturgical accents: á é í ó ú ý, ä ë ï ö ü ÿ, æ ǽ œ. French (à è ç ê), Spanish (ñ ¿ ¡), German (ß), Polish, Hungarian (ő ű) and Vietnamese would all fall back to another font partway through words. Fix: add **separate `@font-face` subsets with `unicode-range`** (latin-ext, vietnamese) so browsers only download them when those characters appear, generated from the full Crimson Text. The undertie `‿` (U+203F) isn't in the current subset either. Add it if Crimson Text has the glyph; if not, draw it in CSS or SVG under the joined syllables so it doesn't come from a fallback font.

### 4b. The hymn (Te lucis): literal, metrical, or sung translation

*Te lucis* is in long metre: 3 stanzas of 4 lines, each line 8 syllables, then *Amen*. A translation in the same metre can be **sung to the same melody** by placing its syllables under the Latin neumes one for one. A **literal** translation is better for reading next to the Latin. So each language can have up to three ways to show the hymn: **literal**, **metrical** (as text) and **sung** (the metrical text set under the chant). The user chooses which (§5).

**Which DO doxology sections to use.** `Doxologies.txt` has pairs like `[Pasch]`/`[PaschT]`. The plain section matches the app's Roman text: Latin `[Pasch]` = "Deo Patri sit glória, Et Fílio, qui a mórtuis…", exactly as in `te-lucis/Easter.gabc`. The `…T` section is a different, older text ("Glória tibi Dómine, Qui surrexísti a mórtuis…"). **Use the plain sections.**

**What DO provides.** Each language has just one hymn text, and it is one kind or the other:

| Kind | Languages | Doxology problems found |
|---|---|---|
| Metrical, 8.8.8.8 | English (Neale-style "Before the ending of the day"), Deutsch, Nederlands, Magyar, Dansk; Español in octosyllabic Spanish verse | **English:** only `[Pasch]` fails (7.7.7.7, "Hymns of glory, songs of praise"); it is replaced by a new text below. `[Pent]` is **correct**: see the note under the table. **Español:** the main hymn is metrical, but **every** doxology (`Nat`, `Epi`, `Pasch`, `Asc`, `Pent`, `Heart`) is prose, so it could be sung only with the Ferial-group doxology "Hazlo así, Padre piísimo…". New metrical doxologies for every season are drafted below, so Spanish can be sung all year. **Nederlands:** `Epi`, `Pasch`, `Asc`, `Pent` and `Heart` are still the untranslated English (only `Nat` is Dutch). Decided: Dutch stays unsung in those seasons. **Dansk:** no `Doxologies.txt`. **Magyar:** probably fine, but for example `[Epi]` line 2 "Ki megjelentél Nemzeteknek" looks like 9 syllables. The validator has to check every line. **Deutsch:** all doxologies look like 8.8.8.8. |
| Literal or prose | Français, Italiano, Português, Polski | Shown as literal; can't be sung. |
| Other | Vietnamese (*lục bát*, a 6/8 Vietnamese verse form) | Shown as metrical text; can't be sung to this melody. |

**At launch only English and Español are both metrical and at 100% coverage (§2), so "Sung" is offered for those two.** Deutsch, Nederlands, Magyar and Dansk are recorded here for when they're added.

> **The English Pentecost doxology is fine.** I flagged it last time, but I was wrong. The Roman Pentecost doxology is the same Latin as Easter's ("Deo Patri sit glória, Et Fílio, qui a mórtuis Surréxit, ac Paráclito"); only the last line differs, "In sæculórum sǽcula" instead of "In sempitérna sǽcula". The app's `Easter.gabc` and `Pentecost.gabc` confirm this. DO's English `[Pent]` ("All praise be thine, O risen Lord, From death to endless life restored; Whom with the Father we adore, And Holy Ghost, for evermore") is a sound 8.8.8.8 rendering of it. Pentecost keeps it. Easter gets the new text below.

**Where literal translations come from (decided):**
- **English: Britt**, *The Hymns of the Breviary and Missal* (1922). It prints a prose translation with each hymn. Before relying on it, confirm that it covers every seasonal doxology the app uses (Christmas, Epiphany, Easter/Pentecost, Ascension, Sacred Heart, Our Lady, Holy Family, Christ the King, Transfiguration, Seven Sorrows), and that each is the Roman form. Public domain: published in the US in 1922, so public domain there. Elsewhere it depends on Britt's death date, reportedly 1955, which would put it out of copyright by 2026 in life+70 countries. Check before shipping in app stores.
- **fr/it/pt/pl:** the DO hymn.
- **de/nl/hu/da/es/vi:** no literal version. "Literal" falls back to the metrical text.

**New metrical Easter doxologies.** These go into `tools/do-import/extra/<lang>/hymn-sung.txt` as hand-maintained overrides, already hyphenated, and replace DO's `[Pasch]` for singing **and** as the metrical text. An undertie `‿` (U+203F) joins the syllables of a synalepha (Spanish *sinalefa*): two vowels sung on one note. It was `_` in earlier drafts, but `setGabc` already uses `_` for italics, so `‿` avoids the clash.

*English* (**chosen**). It follows the Latin line by line. Latin: *Deo Patri sit glória, / Et Fílio, qui a mórtuis / Surréxit, ac Paráclito, / In sempitérna sǽcula.*
```
All glo-ry to the Fa-ther be,          (8)
And to the Son, who from the grave     (8)
A-rose; and to the Par-a-clete         (8)
Be glo-ry through e-ter-ni-ty.         (8)
A-men.
```
This is for Easter only. Pentecost keeps DO's English `[Pent]` text.

*Español* (**chosen**: octosyllabic, every line ending stressed on the next-to-last syllable so each line gets exactly 8 sung syllables, and the hymn's own assonance *á–e* in lines 2 and 4). Latin as above. It's used for both Easter and Pentecost (the Latin differs only in the last line).
```
Glo-ria‿al Pa-dre, glo-ria‿al Hi-jo    (8)
que de la muer-te‿hoy re-na-ce,         (8)
y‿al Pa-rá-cli-to di-vi-no,             (8)
por si-glos in-ter-mi-na-bles.          (8)
A-mén.
```
The user approved lines 1 and 3 earlier (2026-10-24), then chose this *á–e* version so the doxology matches the hymn (*renace / interminables*, like *semejante / interminables*). It replaces the earlier *i–o* draft ("que de la muerte ha surgido … por los siglos de los siglos"). "divino" is added for the metre; Latin has only *Paráclito*. The four synalephas (*gloria‿al* twice, *muerte‿hoy*, *y‿al*) each sit under one note, with the undertie printed in the score lyric, as Spanish hymnals do. In the plain metrical text (not sung) the underties are left out.

**The other Spanish doxologies (approved for now, 2026-10-26).** The app's 17 tone files use nine doxologies: Ferial (DO's own "Hazlo así, Padre piísimo…", already metrical), Easter/Pentecost (above), and the seven below. `Nat` serves Christmas, Our Lady and the Seven Sorrows tone files.

DO's main Spanish stanzas have **assonance *á–e*** in the even lines (*acabe / guarde*, *imágenes / manche*, *semejante / interminables*), so these drafts keep it, as the Easter text does. Lines 3 and 4 are shared: line 4 is the hymn's own last line, "por siglos interminables", and line 3 is "con el Padre y el Espíritu", which puts the stress on the 6th syllable, as the Latin "Cum Patre et almo Spíritu" does. "almo" (kindly) is dropped. Line 3 needs a **triple synalepha**, *Pa-dre‿y‿el*, which is normal in Spanish verse. Every line has 8 sung syllables (checked by script, counting `‿` groups as one).

| Doxology | Latin, line 2 | Spanish, line 2 |
|---|---|---|
| `Nat` | Qui natus es de Vírgine | na-ci-do de Vir-gen Ma-dre, |
| `Epi` | Qui apparuísti géntibus | que‿a las gen-tes te mos-tras-te, |
| `Asc` | Qui victor in cælum redis | que‿al cie-lo vuel-ves triun-fan-te, |
| `Heart` | Qui Corde fundis grátiam | tu Co-ra-zón gra-cia‿es-par-ce. |
| Christ the King | Qui sceptra mundi témperas | del mun-do Rey go-ber-nan-te, |
| Transfiguration | Qui te revélas párvulis | que‿a los pe-que-ñue-los te‿a-bres, |

Each of those is:
```
Glo-ria‿a ti, Je-sús ben-di-to,          (8)   Jesu, tibi sit glória,
<line 2 from the table>                  (8)
con el Pa-dre‿y‿el Es-pí-ri-tu,          (8)   Cum Patre et almo Spíritu,
por si-glos in-ter-mi-na-bles.           (8)   In sempitérna sǽcula.
A-mén.
```
For `Heart` the punctuation of line 1 is a colon and line 2 ends with a full stop, so line 3 starts with a capital: "Con el Padre…". *Pequeñuelos* is the word for "little ones" in Spanish Bibles at Mt 11:25, which is what *párvulis* echoes.

The Holy Family doxology has a different Latin shape, so it gets its own text:
```
Je-sús, que‿hu-mil-de qui-sis-te         (8)   Jesu, tuis obédiens
a tus pa-dres su-je-tar-te,              (8)   Qui factus es paréntibus,
con el Pa-dre‿y‿el Es-pí-ri-tu           (8)   Cum Patre summo ac Spíritu
siem-pre glo-ria se te can-te.           (8)   Semper tibi sit glória.
A-mén.
```
"summo" (most high) is dropped. *Sujetarte* follows Lk 2:51, "les estaba sujeto".

**Data, per language module:**
```js
hymn: {
  literal:  { stanzas: [...], doxologies: { Ferial: ..., Christmas: ..., ... } },  // optional
  metrical: { stanzas: [...], doxologies: {...} },                                 // optional
  sung:     { stanzas: [["To God the Fa-ther glo-ry be,", ...], ...],
              doxologies: {...} }   // hyphenated; only stanzas and doxologies that passed validation
}
```
Texts that don't come from DO (Britt's literal English, the new doxologies) live in app-maintained files under `tools/do-import/extra/<lang>/`, and the importer merges them in, overriding DO where both exist.

**Making the sung version:**
1. **Hyphenate (importer, at build time).** Draft the hyphenation of each metrical line with TeX hyphenation patterns for that language (for example the `hyphen` npm package). Hyphenation isn't the same as syllable division, so the drafts are **saved as reviewable text** (`tools/do-import/extra/<lang>/hymn-sung.txt`) and corrected by hand once. `‿` joins the syllables of a synalepha, which count as one. Re-imports keep the hand fixes.
2. **Validate.** Each line must have exactly as many syllables as the Latin line has **notes**. Count only syllables that carry neumes: the Latin GABC uses empty `()` neumes for elisions, for example `Pa(g')tr<i>e</i>() et(f)` in Christmas.gabc, and 11 of the 17 tone files have them. The stanza count must match (3 plus Amen), for every doxology mapped to each of the 17 tone files. A doxology that fails is **not offered for singing in that season**; see the fallbacks below.
3. **Render (`chant-element`, at runtime).** Swap the lyrics: walk the Latin GABC's note-bearing syllables in order and give syllable *i* the *i*-th vernacular syllable, keeping all the neumes, bars and the clef. Put the vernacular punctuation in place, and leave elided `()` syllables out of the result. The drop cap becomes the first vernacular letter. This happens **after** the `setGabc` text rewrites, so `u{…}`, `_` and `*` don't damage vernacular text. A `‿` syllable is placed as one lyric and printed with its undertie. It works with any of the 17 tones, because they all set the same 8.8.8.8 structure.
4. **Stress:** the melodies are mostly syllabic, and iambic vernacular verse fits them acceptably. Accents won't always line up, as is normal for hymns sung in translation.

**Display** (`hymnMode`, see §5):

| Text mode | `hymnMode` | Score words | Shown next to it, per stanza |
|---|---|---|---|
| `la` | (hidden) | Latin | none |
| `both` | `literal` (default) | Latin | literal translation |
| `both` | `metrical` | Latin | metrical translation |
| `both` | `sung` | **metrical translation** | Latin text |
| `tr` | `literal` (default) | no score | literal translation |
| `tr` | `metrical` | no score | metrical translation |
| `tr` | `sung` | **metrical translation**. This is the only notation shown in translation-only mode. | none |

**Fallbacks**, checked per language and per season, so the hymn is never empty:
- `literal` missing → metrical.
- `metrical` missing (fr/it/pt/pl) → literal.
- `sung` not validated for this season's doxology → behave like `metrical`, with a small note: "Not available to sing in this language for this season".

The menu shows all three choices for every language. A choice the current language can't provide at all is shown disabled, for example "Sung" for French.

### 4c. Notation level per section (decided: plain text / pointed / fully notated)

Today there are three checkboxes, "Fully Notated Psalms / Chapter / Prayers", and everything else is always sung from a score. They become one `<select>` per section, and every section can also drop the music entirely.

| Section | Choices | Default | Plain text comes from |
|---|---|---|---|
| Psalms and Nunc dimittis | plain text / pointed / fully notated | pointed | The pointed HTML, with the pointing switched off by CSS (the bold and italic accent marks shown as ordinary text). Verse 1, which is chanted today, comes from the GABC as text. The red `*` and `†` stay, because they mark the pauses when the psalm is recited. |
| Chapter | plain text / pointed / fully notated | fully notated | The pointed HTML, with the pointing switched off. |
| Prayers (collects) | plain text / pointed / fully notated | pointed | The same. |
| Hymn (*Te lucis*) | plain text / fully notated | fully notated | The GABC lyrics (below). No pointed form. |
| Marian antiphon | plain text / fully notated | fully notated | The same. Its collect is under Prayers. |
| Other chants: *Jube domne* and the blessings, the lesson, *Adjutorium*, *Converte nos*, *Deus in adjutorium*, the psalm antiphon, *In manus tuas*, *Custodi nos*, *Salva nos*, *Benedicamus* | plain text / fully notated | fully notated | The same. These have no pointed form. |

**Why the hymn and Marian antiphon have their own menus (decided):** a common way to pray Compline is to recite it and sing only the hymn and the Marian antiphon, the melodies people already know. Separate menus allow that. The hymn menu also sits naturally with `hymnMode` ("Sung" needs the music), and "Solemn Tone" sits with the Marian antiphon menu. That makes six menus instead of four.

**Plain text from GABC.** A new text renderer in `chant-element`: strip the header and the neume groups `(…)`, join the syllables into words, turn `<sp>V/</sp>` and `<sp>R/</sp>` into ℣ and ℟, keep `<i>` rubrics and the `*`, make blank-line paragraphs into paragraphs, and print the first letter normally instead of as a drop cap. The lines of a `_full.gabc` psalm become numbered verses. Exsurge layout isn't run for those elements, so pages with a lot of plain text also load faster.

**How it fits with the other settings:**
- `textMode == 'tr'` shows everything as plain text, so the six notation selects are hidden.
- In `both` mode, a plain-text section puts the Latin and the translation side by side (or stacked), with no score.
- Hymn set to plain text: `hymnMode` "Sung" is disabled and falls back to metrical.
- Marian antiphon set to plain text: hide the "Solemn Tone" checkbox. The Te lucis tone selector stays, because it also picks the doxology.
- This doesn't depend on translations at all, so it can ship first (Phase 1a, §7).

**Translation only, per section (added in Phase 8, at the user's request).** Each of the menus also has "Translation only". That section shows the translation as plain text, as if the Text menu said "Translation only", whatever the Text menu says. With the Text menu on Latin, the translation is then loaded for that section alone, and the Translation menu is enabled so that a language can be chosen. For example, the chant can be sung in Latin with the psalms read in English. A hymn in "Translation only" can still be sung in the translation, as with the Text menu on "Translation only". The psalms' antiphons (an "Other chants" menu sets their notation) and the versicles of the collect show as their sections do (`data-section` in `index.html`). The non-chant texts of `index.html` that aren't in a section (the Confiteor, the Misereatur and so on) follow the Text menu.

### 4d. Rubrics in the translation's language (added in Phase 8, at the user's request)

While a translation is shown, the rubrics are in its language: in "Latin & translation", in "Translation only", and in "Latin" while a section is on "Translation only". In English and Latin-Bea they stay as `index.html` has them, and so does the whole page in "Latin". The menus, their labels (the hymn tones' seasons, In manus tuas) and the feast titles stay in English.

- **What is translated:**
  - each red rubric of `index.html`, which has a `data-rubric` key;
  - the headings of the chants (their `user-notes` and `commentary`: "Psalm 7. I.", "Luke 2.") and of the pointed psalms ("Psalm 90");
  - `chant-element.js`'s note on a hymn that can't be sung in that season.
- **Where they come from:** `extra/<lang>/rubrics.txt`, written by hand. DO has only a few rubrics (`Psalterium/Common/Rubricae.txt`), worded otherwise, and none of the app's directions to the Officiant, Lector and Cantor or its seasons' dates. The importer's `rubrics.js` checks each file against `index.html`'s keys and puts them in the module as `rubrics`.
- **Latin cue words** ("{Te lucis}", "{Pater noster}", "«{Dómine}»") are marked `{…}` and shown as `lang=la`; where the English has them outside its italics, so does the translation. Each rubric has its language's `lang`, so it is hyphenated in that language.
- English's rubrics aren't in its module: the page's are English's.

---

## 5. Settings

Follow the existing pattern (localStorage strings plus controls in `#options-menu`). These are multi-valued, so use `<select>` like `#selectRegion`. They don't fit the boolean `input[toggle]` map.

| Key | Values | Default | Control |
|---|---|---|---|
| `textMode` | `'la'` \| `'both'` \| `'tr'` | `'la'` | "Text: Latin / Latin & translation / Translation" |
| `trLang` | `'en'`, `'fr'`, `'es'`, `'it'`, `'pt'`, `'pl'`, `'la-bea'` at launch (the languages at 100%, §2) | **not stored** until the user picks one. Until then it is worked out each time from the browser: the first entry in `navigator.languages` whose main part (`de-AT` → `de`) is an offered language, else `'en'`. Latin-Bea is never picked automatically. | "Translation: …", disabled while `textMode == 'la'` and no section is in "Translation only" (§4c). When the user switches Text away from Latin, it already shows the browser-language choice. Bea is listed as "Latin (Pius XII psalter)". |
| `hymnMode` | `'literal'` \| `'metrical'` \| `'sung'` | `'literal'` | `<select>` "Hymn: Literal / Metrical / Sung with chant", next to the Te lucis tone selector. Hidden while the hymn is shown in Latin only. Choices the language can't provide are disabled; fallbacks are in §4b. |
| `notationPsalms` | `'text'` \| `'pointed'` \| `'full'` \| `'tr'` | `'pointed'` | "Psalms: Plain text / Pointed / Fully notated / Translation only" (§4c). Replaces the `fullNotation` checkbox. Each `notation*` key below can also be `'tr'`. |
| `notationChapter` | `'text'` \| `'pointed'` \| `'full'` | `'full'` | "Chapter: …". Replaces `fullNotationChapter`. |
| `notationPrayers` | `'text'` \| `'pointed'` \| `'full'` | `'pointed'` | "Prayers: …". Replaces `fullNotationPrayers`. |
| `notationHymn` | `'text'` \| `'full'` | `'full'` | "Hymn: Plain text / Fully notated". New. Placed next to `hymnMode` and the Te lucis tone selector. |
| `notationMarian` | `'text'` \| `'full'` | `'full'` | "Marian antiphon: …". New. "Solemn Tone" moves next to it. |
| `notationChants` | `'text'` \| `'full'` | `'full'` | "Other chants: Plain text / Fully notated". New. |

- **Migration:** add `if(!('textMode' in localStorage)) localStorage.textMode = 'la';` next to the defaults in `compline.js` lines 12–16, and treat unknown values as the default. **New and existing users both default to Latin only** (decided), so the app can't tell them apart and no check for returning users is needed. Don't write a default for `trLang`; only save it when the user chooses one, so it keeps following the browser language until then.
- **Query parameters** `?text=both&lang=de` override for that page view without saving (for testing and shareable links).
- **On change:** update the body class, `require` the language module if it isn't loaded, re-render every `chant-gabc`, and re-run the psalm and HTML translation insertion.
- **Notation migration:** carry each old checkbox over, then remove the old key:
  ```js
  if(!('notationPsalms' in localStorage)) localStorage.notationPsalms = localStorage.fullNotation === '1' ? 'full' : 'pointed';
  if(!('notationChapter' in localStorage)) localStorage.notationChapter = localStorage.fullNotationChapter === '0' ? 'pointed' : 'full';
  if(!('notationPrayers' in localStorage)) localStorage.notationPrayers = localStorage.fullNotationPrayers === '1' ? 'full' : 'pointed';
  if(!('notationHymn' in localStorage)) localStorage.notationHymn = 'full';
  if(!('notationMarian' in localStorage)) localStorage.notationMarian = 'full';
  if(!('notationChants' in localStorage)) localStorage.notationChants = 'full';
  ```
  The `toggles.fullNotation*` functions and the `fullNotation*` cases in `updateToggle` are replaced by the selects. `setPsalms`/`setCanticle` check `notationPsalms === 'full'`. The `.toggle()` inline styles become body classes (`notation-psalms-text`, `notation-chapter-full`, …), so mode CSS can win cleanly.
- **⚠️ Possible conflict with the other session:** another session is editing `doAutoSelectRegion` (`compline.js` lines 93–112). Put the new code in `js/text-mode.js`, touch only the defaults block and `updateToggle`, and rebase onto that work before merging.

---

## 6. Build, gh-pages and Cordova

- **gulp `scripts`:** language modules are loaded dynamically, so r.js leaves them out of `dist/js/compline.js`. Main bundle size is unchanged.
- **gulp `copy`:** add `'js/i18n/*.js'` and `'js/i18n/LICENSE-divinum-officium.txt'`, and optionally minify them in a small task. Don't add a broad `**/*.json`/`**/*.js` glob.
- **gulp `html`:** no change; `data-tr` attributes survive htmlmin.
- **New dev dependency:** none for the browser build. The importer is a plain node script run by hand (`npm run import-do`) against a DO checkout, either a sibling clone or a `git clone --filter=blob:none --sparse` of the `horas/*/Psalterium` and `Ordinarium` folders, as I did for this research.
- **Fonts:** add the new `unicode-range` subsets to `fonts/`; they are covered by the existing `fonts/*.woff[2]` copy globs.
- **gh-pages:** the same publishing flow; `dist/js/i18n/` is new.
- **`sw.js`:** stale and disabled. If offline support comes back, cache the selected language module.
- **Rollout (decided):** website first, then the Cordova release once the web version needs no more text fixes.
- **Cordova:** `www/` comes from gh-pages, so it picks this up through the usual merge. Script-tag loading works with cordova-ios 8's app scheme and on Android. Bump the version and rebuild; the committed `compline.apk` on `master` will be out of date.
- **Print:** check `doLayout(true)` with translation blocks in every mode.

---

## 7. Phased implementation

| Phase | Work | Rough size |
|---|---|---|
| **0. Decisions and spikes** ✅ | Answer §9. Pin a DO commit (decided: re-import by hand; the data should rarely change). Spike (a) exsurge `[translation]` lines and (b) splitting scores into units (layout time on a long full psalm on a phone). **Done 2026-10-26; results in §7a.** | ½–1 day |
| **1a. Notation levels** (§4c) ✅ | The six `notation*` selects and their migration, body classes, CSS that switches off the pointing, and the GABC plain-text renderer in `chant-element`. Independent of translations; can ship on its own first. **Done 2026-10-26; notes in §7b.** | S–M: about 150 lines |
| **1. Display infrastructure** ✅ | `js/text-mode.js` (settings, body classes, query parameters, lazy `require` of `i18n/<lang>`), the menu `<select>`s, `[lang]`/grid/stack/print CSS, the notated-toggle refactor, `chant-element` unit splitting with translation blocks plus the translation-only text render, the psalm-verse interleaver, `data-tr` filling for `index.html`, and the missing-text fallback. Test against a hand-written `en.js` stub. **Done 2026-10-26; notes in §7c.** | M: about 400 lines, 1–2 days |
| **2. DO importer: psalter** ✅ | Section ranges from `Psalmi minor`, key-matched extraction, fuzzy alignment against the app's Latin, Gloria split, marker handling, mismatch report. **Done 2026-10-27; notes in §7d.** | M: about 1 day |
| **3. DO importer: everything else** ✅ | `manifest.json` for about 60 keys (index HTML prayers, about 40 chant files, 17 Te lucis files built from the hymn plus a doxology, Marian antiphons and collects), the `@`/`$`/`&`/`s///` resolver, the 1960 variant choice, generated Paschal alleluia forms, splitting into units. **Done 2026-10-27; notes in §7e.** | M–L: 1–2 days, mostly mapping |
| **4. English end to end** ✅ | Generate `en.js`, check every part of the office in all three modes (Sunday, weekdays, PT, Easter octave, Triduum, All Souls, each Marian season, each Te lucis tone). Fix the manifest. **Done 2026-10-27; notes in §7f.** | M |
| **5. More languages** ✅ | Run the importer for fr, es, it, pt, pl and la-bea, confirm 100% in the coverage report, add font subsets, spot-check each language (ideally with a reader of that language). **Done 2026-10-27 for fr, es, it, pt and pl; notes in §7g. Latin-Bea moved to Phase 6.** | S–M, mostly QA |
| **6. Latin-Bea as a comparison text** ✅ | Verse-group pairing with a block fallback. Suppress the "translation" where Bea is identical to Latin. **Done 2026-10-27; notes in §7h.** | S |
| **7. Hymn: literal and sung** ✅ | Literal: the extra-text merge in the importer, plus the English literal hymn and doxologies (content). Sung: hyphenation drafts, the hand-reviewed `hymn-sung.txt` per metrical language, the validator (note count, stanzas, each doxology against each of the 17 tones), lyric swapping in `chant-element`, the `hymnMode` select with its fallbacks and disabled choices, merging the `extra/` overrides (Britt's literal English, the new English and Spanish Easter doxologies). Check every tone in en and es. **Done 2026-10-27; notes in §7i.** | M code (about 150 lines) + S per language to review hyphenation. Entering Britt's English and checking his doxology coverage: S. Entering the Spanish doxologies: S. |
| **8. Release** ⏳ | **Typo pass** over every generated language file and the `extra/` texts (spell-check per language, plus reading the new hymn texts aloud, and a native speaker's check of the Spanish doxologies); fix in `extra/` overrides and report upstream to DO. Wide-screen layout polish, print, accessibility, credits/licence in the app ("Translations: Divinum Officium, MIT", plus the source of the literal hymn), gh-pages publish, Cordova merge, rebuild and store submission. **Everything but the publishing done 2026-10-27; notes in §7j. Publishing, DO reports and Cordova wait for the user; native readers' checklist open.** | M |
| *9. Optional* | Localise the interface (menu, feast titles; the rubrics are done, §4d), exsurge interlinear lines. Out of scope: singing anything in the vernacular other than the hymn, and singing the Bea psalter. | M–XL each |

Phases 2–3 can run in parallel with Phase 1 once the module format (`psalter`/`texts`/`meta`) is agreed.

### 7a. Phase 0 results (2026-10-26)

**DO is pinned at `ad87836`** (`master` on 2026-10-26), not at `b9064d7`, which the research used. In those three days DO merged about 950 files of typo fixes. For Compline they fix English `122:2y` (now `122:2a`, so English needs no override), restore the end of English Ps 70:22 ("thou holy one of Israel"), and correct words in nine of the Portuguese Compline psalms. The other changes to files the importer reads (the English *Sacrosanctæ* prayer, Matins readings for Christ the King and the Transfiguration) don't touch any text the app uses. `tools/do-import/DO_COMMIT` holds the hash. `tools/do-import/fetch-do.sh [dir]` makes a sparse checkout of only the files the importer reads, at that commit (default `../divinum-officium`; about 33 MB of files plus 64 MB of git data; a fresh run takes about 15 s). The verse keys were re-checked at this commit; §2 has the results, including the Spanish Ps 102 grouping and Latin's repeated keys.

The spikes are in `tools/spikes/phase0.html`. Serve the repository root (for example `python3 -m http.server 8000`) and open `/tools/spikes/phase0.html`. It also works on a phone on the same network.

**Spike (a): exsurge `[translation]` lines.**
- The syntax works with the bundled exsurge 2.2.1. `syl[text]` starts a translation under a syllable, `syl[/]` ends it, and the text is centred across the span, in italics at 0.75 of the lyric size.
- **The spacing doesn't hold.** Exsurge doesn't spread the notes to make room. At 624 px, hymn lines whose English is longer than the Latin run into the next translation ("…favor thouWouldst be…").
- **Line breaks make it worse on a phone.** Exsurge won't break a line inside a translation span. So each hymn line gets a line of its own, with the Latin spread across the width. On a psalm tone, a half-verse that doesn't fit on one line leaves its first syllable alone on a line ("1. Cum"), with the rest of the half-verse on the next.
- A translation has to go in **after** `setGabc`'s lyric rewrites: inserted before them, "guard" comes out as "gu{a}rd". The place for it is just before `createMappingsFromSource`, which is also where Phase 7 swaps the hymn's lyrics. The text also has to lose GABC syntax: `( )` and `[ ]` end the lyric or the translation, and `* _ ^ %` are exsurge markup, so DO's `*` mediant has to go.
- **Result:** interlinear stays optional (Phase 9). It needs exsurge changes first: room for translation spans, and line breaks inside them. Build the block-per-unit display (§4).

**Spike (b): one score per unit.**
- Splitting works: blank-line paragraphs for hymn stanzas, `^\d+\. ` lines for psalm verses. Each later unit needs the clef again and an explicit `initial-style: 0;` (without one, `setGabc` gives the unit a drop cap), and no annotation or user notes.
- **The cost depends on where the units render.** Each `<chant-gabc>` has its own `ChantContext`, and that per-element cost is what dominates, not the number of scores. Timings for one day's `psalm_full.gabc` (3 psalms, 32–47 verses), 359 px wide (a 375 px phone), median of 5 runs, through `<chant-gabc>` as the app renders it. The throttled rows are headless Chrome with DevTools CPU throttling, as a stand-in for a phone:

| CPU | One score per psalm (today) | One score per verse, one element | One element per verse |
|---|---|---|---|
| This Mac | 40–52 ms | 43–56 ms | 71–99 ms |
| 4× slower | 197–261 ms | 203–318 ms | 426–633 ms |
| 6× slower | 303–386 ms | 309–422 ms | 645–906 ms |

  So **render all of a section's units in one `<chant-gabc>`**. `doLayout` already joins the SVGs of a multi-score file; it writes each unit's translation block after its SVG. That costs 1.0–1.2× what the app costs today. One element per unit costs about 2.2×.
- **Page height:** one score per verse makes the psalms about 21% taller at 359 px and about 35% taller at 624 px, before any translation text, because every verse starts a new line with its own clef. A verse that only just overflows ends with a line of one or two syllables ("am.", "um?"), which the whole-psalm score fills with the start of the next verse. This only applies in `both` mode; `la` keeps one score per psalm.
- When joining scores into one GABC string, put a blank line between them. `regexGabcHeader` isn't anchored to the start of a line, so a header straight after a lyric line that contains `word:` takes that line into the header, and the line disappears.
- **Still to do:** run the timings on a real phone ("Run timings" on the spike page). The throttled numbers are an estimate.

### 7b. Phase 1a notes (2026-10-26)

Built as §4c and §5 describe. Where the code made a detail come out differently:

- **Where the menus are.** Psalms, Chapter, Prayers and Other chants are in the options menu, in place of the three checkboxes. The hymn and Marian antiphon menus are in the page: the hymn one under the Te lucis tone selector, and the Marian one under the antiphon chooser, with "Solemn Tone" beside it. CSS hides "Solemn Tone" while the Marian antiphon is plain text.
- **Which section a chant belongs to** is its `notation` attribute (`psalms`, `chapter`, `prayers`, `hymn`, `marian`; none means `chants`). `compline.js` gives a `<chant-gabc>` the attribute `plain-text` when its section is plain text, and the element redraws itself when that attribute comes or goes. Phase 1 can set the same attribute for `textMode`. Below "Fully notated", the hidden notated chapter and prayers get `plain-text` too, so they skip exsurge layout. `compline.js` loads `chant-element` only after it has set the attributes, so no chant is first laid out as notation and then redrawn as text. The notation code is in `compline.js`, not in `js/text-mode.js`, because `setPsalms` and `setCanticle` need it.
- **℣ and ℟.** The GABC files write them as `<v>\Vbar</v>` and `<v>\Rbar</v>` (and `V/.` in annotations), not `<sp>V/</sp>`. The renderer handles all three. It draws them like the page's own ℣ and ℟: `<span class='versiculum'>v</span>`.
- **Annotations.** A ℣, ℟ or "Ant." annotation becomes part of the text, because *In manus tuas* and *Deus in adjutorium* get their first ℣ only from the annotation. Mode annotations ("8. G") are left out.
- **Drop caps.** The capitals after the first letter ("TE lucis", "SAlve", "HÆC") are made lower case.
- **Psalm intonation files.** After verse 1, `psalm.gabc` shows how to sing the flex, and `canticle-psalm*.gabc` shows the starts of verses 2 and 3 ("Quia...", "Quod parásti * ..."). In plain text those lines are left out: `setPsalms`/`setCanticle` add `text-lines='1'` when the psalms aren't fully notated.
- **Spacing.** Plain-text chants get an empty table before and after (as Bootstrap's `.clearfix` does; `display: flow-root` isn't in older WebViews), so verse 1 is as far from verse 2 (from the pointed HTML) as the verses are from each other.
- **One special case:** the solemn *Regina cæli* splits "alle- * ** luia" over a long melisma. Plain text keeps it as written, with `*` and `**` in red, because they mark where the choir takes over.
- In passing: `doLayout` no longer fails on an element that hasn't loaded yet, and a GABC file with no header no longer breaks `setGabc`. (Every file has a header, so neither changed anything visible.)

### 7c. Phase 1 notes (2026-10-26)

Built as §3–§5 describe, tested with `js/i18n/en.js`, a stub with Sunday's psalms, the Nunc dimittis and the chants and prayers of an ordinary Sunday with no priest (mostly DO's English). Phase 4 replaces it with the generated file. Until then no language is offered: `languages` in `js/text-mode.js` is empty, so the Text and Translation menus are hidden, and the stub is reached only with `?text=both` or `?text=tr`. Phase 4 adds English to `languages`, and Phase 5 each other language.

**The module format, which the importer (Phases 2–3) has to write:**
```js
define({
  meta: {name: 'English', dir: 'ltr', doCommit: 'ad87836'},
  psalter: {'4': [verse 1, verse 2, …, Gloria Patri, Sicut erat], '7.I': […], '33.II': […], 'nunc-dimittis': […]},
  texts: {'te-lucis/Ferial.gabc': [unit, unit, unit], 'index:confiteor': [unit], …}
});
```
- **Psalter keys** are the app's psalm sections: the number, then `.I`/`.II` for a part (from the labels "Psalm 7. I."), and `nunc-dimittis`. Index *i* is verse *i* + 1 in the app's numbering, so the Gloria Patri and Sicut erat are the last two (the Triduum, which leaves them out, just doesn't ask for them). Each pointed fragment's `<div class="verses">` now has `data-psalm='<key>'`. A chanted psalm's key comes from its `user-notes` header. (Phase 2 added `nunc-dimittis-asd`, a `psalm-section` header that overrides `user-notes`, and `''` for a verse whose translation is part of the verse before's: §7d.)
- **Text keys** are a chant's `src` (`te-lucis/Ferial.gabc`, `marian-antiphon/salve-prayer.gabc`, …), or an `index:` key for the blocks of `index.html` that have no GABC twin. The pointed chapter and prayers use their GABC file's key. The `index:` keys: `confiteor`, `confiteor-priest`, `misereatur-nostri`, `misereatur-tui`, `misereatur-vestri`, `indulgentiam`, `christus-factus-est`, `mortem-autem-crucis`, `dominus-vobiscum`, `domine-exaudi`, `visita-silent`, `per-dominum-silent` (the Triduum collect, said and then concluded silently), `benedicat`, `marian-<alma-advent|alma-christmas|salve|ave|regina>-versicle`, `divinum-auxilium`, `asd-preces` (*Et ne nos* to *Et cum spíritu tuo*), `asd-collect` (*Orémus. Propitiáre…*) and `asd-requiem`.
- **A unit** is plain text, one per paragraph of the chant (blank-line paragraphs, across all its scores, in order). A paragraph with no words (only neumes or bars) belongs to the paragraph before it, or to the next if it comes first; `unitParagraphs` in `chant-element.js` is the one place that decides this, for both the words and the chant. Lines are split by `\n`. A line starting `V. ` or `R. ` gets ℣ or ℟. `*` and `†` show in red. No other markup, and no HTML.
- **If a text's units don't match the chant's paragraphs**, the display doesn't fail: all the units follow the whole chant (after its red labels), and the console says so. The importer's report should catch these first.

**Display, as built:**
- **Options menu:** "Text" (Latin / Latin & translation / Translation) and "Translation" (disabled while the text is Latin). `?text=` and `?lang=` override them without saving; choosing in a menu removes its override from the address too. Both are hidden while no language is offered (above). `js/text-mode.js` also owns the storage test and the query parsing, which `compline.js` uses. `textMode` defaults to `'la'`; `trLang` is stored only when chosen.
- **Loading:** `chant-element` doesn't wait for `i18n/<lang>`: chants drawn before it arrives are drawn again when it does (`updateText`), so a slow or failed load never leaves the page without chant. r.js leaves the language modules out of the bundle (checked); gulp `copy` copies `js/i18n/`. A language that fails to load has no texts, so it shows as Latin.
- **Translation only** makes every section plain text without changing the stored notation choices, and hides the notation menus, the hymn and Marian antiphon menus and "Solemn Tone".
- **Chants in "Latin & translation":** a notated chant with a translation is split into one score per unit inside its `<chant-gabc>` (§7a), each followed by its translation. A chant with no translation isn't split. A psalm's intonation (`text-lines`) stays whole, followed by verse 1. A fully notated psalm is split per verse. Print uses the same units. Only the first unit has a large initial; the playback session reports that a score's first syllable also opens the play menu, so each unit can still be played.
- **`index.html`:** each Latin block is now `<div class='tr-pair' data-tr='key'><p|div lang='la'>…</p|div></div>`, and the translation is added after the Latin as the same kind of element, with class `tr`. Where the pointed chapter or a prayer is the block, the pair sits inside the `.pointed-chapter`/`.pointed-prayer` element, so the notation levels still hide it. Three blocks continued a line in Latin (*Christus factus est* … *Mortem autem crucis*, and *Et ne nos* after "Pater noster is said in silence until"). They are `<span class='tr-pair'><span lang='la'>`, inline in Latin only and blocks once there's a translation, so the minified build keeps the spaces between them. In Latin only, the page's layout matches master to the pixel on an ordinary Sunday, All Souls, Holy Thursday and Good Friday.
- **Layout:** side by side (a two-column grid, rows aligned) at 768 px and wider and in print; stacked below that. Beside the Latin the translation is grey (`--tr-color` in `theme.css`, with a dark-mode value). In translation only, a text with no translation shows its Latin in that grey.
- **Still to do in later phases:** the hymn's literal, metrical or sung choice (Phase 7: the stub's hymn is just `texts['te-lucis/Ferial.gabc']`), Latin-Bea pairing (Phase 6), font subsets for accented letters (Phase 5), and a check of the per-unit split's timing on a real phone (§7a).

### 7d. Phase 2 notes (2026-10-27)

Built as §2 and §3 describe. `npm run import-do` (or `node tools/do-import/import.js`) prints the report for every language. It writes only the languages named, for example `npm run import-do -- en`, so a language reaches `js/i18n/` only once someone has checked it. It finds the DO checkout next to the repository, or, from a git worktree, next to the main checkout (`--do <dir>` to say where), and stops if the checkout isn't at `DO_COMMIT`. Running it twice gives the same file.

**What it does:**
- **Sections:** the 21 from `Psalmi minor` `[Completorium]`, where a psalm said in parts gets `.I`, `.II` in order, plus `nunc-dimittis` (`Psalm233.txt`), `nunc-dimittis-asd`, and All Souls' 122, 141 and 142, whole: 26 sections, 313 verses. The app's sections (every `data-psalm` and every psalm score) and DO's have to be the same, and are.
- **Lines by key,** with the *n*-th of a repeated key paired with the *n*-th, the overrides of §2 (Italiano and Polski `11:6` → `11:6b`), and Español's Ps 102:17–18 as one group (below). Lines without a key (titles such as "(Canticum Simeonis * Luc. 2:29-32)") are skipped. A verse that starts partway through a line has its number inline, "* (4a) réspice", and that goes.
- **The Latin check** reads every file the app has the Latin in: the pointed HTML (`psalm-verses*.html`, `canticle-psalm*.html`) and the GABC (`psalm*.gabc`, `canticle-psalm*.gabc`, including `_full`). The files have to agree with each other, and DO's Latin line *i* has to match the app's verse *i*: normalized (no tags, accents or punctuation, æ/œ written out) and compared by Levenshtein similarity, with 0.9 as the threshold. **Every verse matches.** The lowest score is 0.983. The 7 verses below 1 are all spelling, where DO follows the Clementine and the app the older forms: *adjicies/adicies*, *projicias/proicias*, *adjiciam/adiciam*, *brachium/bracchium*, *projiciet/proiciet*, *brachio/bracchio*, *foenum/faenum*. `--verbose` lists them.
- **The ending:** Prayers.txt `[Gloria]`, split at `V.`/`R.` into the Gloria Patri and Sicut erat. A language without it has the two verses missing (reported), unless its `fallback` in import.js names a folder to borrow from, as DO itself does. Only Latin-Bea lacks it (it has no `Prayers.txt`), and it falls back to the Latin.
- **Markers:** the `*` and `†` are kept, because the display shows them in red (§7c), and they follow the app's Latin. DO's `‡` is a flex too (Latin 4:5 "peccáre: ‡ quæ dícitis" is "peccáre: † quæ dícitis" in the app), so it becomes `†`. A flex stays only where the app's verse has one. That drops none: every flex in DO is in the app too. But the app's pointing adds a flex to about 20 long verses that DO hasn't, and the translations of those have none (the report's "flex+": 22 verses in English, 19–25 in the others). DO's `+` (a sign of the cross, in the Nunc dimittis) goes, and so does a marker at the very end of a verse (French 90:14 ends with `*`). Each marker gets a space on either side, as the display expects.
- **Characters GABC can't take (§7a).** The psalter keeps them, because a psalm's translation is only ever shown as HTML, after the Latin, never put into the GABC. §7a's rule applies to text set *under the chant* (the interlinear line, Phase 9), which would have to clean it up there. The report lists them. English has none; Italiano has editorial insertions in square brackets in 9 verses ("Adiratevi [pure], …"), and Deutsch has parentheses in 2.

**Changes to the app it needed:**
- **All Souls' Day** ends every psalm with *Requiem æternam* and *Et lux perpétua* in place of the Gloria (verified against `psalms/asd/` and `canticle-psalm-asd*`). Psalms 122, 141 and 142 are said only that day, so their sections just end that way (Prayers.txt `[Requiem]`). The Nunc dimittis is said every day, so All Souls' has a section of its own, **`nunc-dimittis-asd`**: `canticle-psalm-asd.html` has `data-psalm='nunc-dimittis-asd'`, and `canticle-psalm-asd.gabc` and `canticle-psalm-asd_full.gabc` have a new header, `psalm-section: nunc-dimittis-asd;`. `psalmSection` in `js/text-mode.js` now takes the score's header, and a `psalm-section` header overrides `user-notes`.
- **`psalms/5/psalm-PT_full.gabc`** labelled its first psalm "Psalm 76. II." instead of "Psalm 76. I.", so the fully notated Friday psalms in Paschaltide showed the wrong label, and would have taken 76.II's translation. Fixed.
- **Grouped verses.** Where a translation divides verses differently, the group's translation goes on its first verse, one line for each of its lines, and each other verse of the group is `''`. The display shows nothing beside those verses, and in translation only hides their Latin (`psalmVerse` returns `''`, not `null`). Only Español uses it so far: its two lines `102:17` and `102:18` go with Latin 102:17, 102:17, 102:18 (102.II verses 4–6). Phase 6 can use the same for Latin-Bea.

**Coverage at `ad87836`** ("sections" counts the sections with every verse paired by key; "mediant" the verses whose `*` doesn't match the Latin):

| Language | Sections | Verses | Mediant | Still to do, in its phase |
|---|---|---|---|---|
| English | 26/26 | 313/313 | 0 | **Written to `js/i18n/en.js`.** |
| Français | 26/26 | 313/313 | 24 | The Sicut erat has no `*` ("…maintenant et toujours, et dans les siècles…"), nor does Nunc dimittis verse 4. Phase 5: put one in with an `extra/fr/` override, or show it without. |
| Español | 26/26 | 313/313 | 2 | 15:9 has two `*`, and 102:7 (102.I verse 7) none; the Ps 102 group above. |
| Italiano | 26/26 | 313/313 | 0 | The square brackets above. |
| Português | 26/26 | 313/313 | 0 | — |
| Polski | 26/26 | 313/313 | 0 | — |
| Latin-Bea | 10/26 | 285/313 | 2 | As expected: Bea divides verses differently (§2b). Phase 6's grouping, now 26/26 (§7h). |
| Deutsch (not offered) | 24/26 | 310/313 | 44 | Ps 60:9 (§2), and Ps 69 is divided differently too (an extra 69:1, and no second 69:4 or 69:6). No `*` in the Gloria. |
| Nederlands, Dansk (not offered) | 26/26 | 313/313 | 0 | — |
| Magyar (not offered) | 26/26 | 313/313 | 15 | Some verses have no `*`, and three have two. |
| Vietnamice (not offered) | 26/26 | 313/313 | 1 | 76:17 has no `*`. |

**Written:** only English, whose `texts` (and `meta.stub`) were kept from the Phase 1 stub until Phase 3 replaced them (§7e); the generated psalms Sunday's stub had are word for word the same. The other languages' modules wait for Phases 5 and 6, when they're checked. Nothing was added to `languages` in `js/text-mode.js`.

**Checked in the browser** (`?text=both&lang=en` and `?text=tr&lang=en`): every pointed verse is followed by its translation with the same number, and every chanted verse 1 has its translation, on each day of the week, each day of Paschaltide, in the Easter octave, on Holy Thursday and Good Friday, and on All Souls' Day (where 122, 141, 142 and the Nunc dimittis end "Eternal rest… And let perpetual light…"). The same with the psalms fully notated: one translation per verse, in order, on All Souls, an ordinary Friday and a Friday in Paschaltide. Read side by side on Saturday's 102.II, with its repeated 102:17. The grouped verses were checked with a Spanish file that isn't committed: in both modes, and in translation only, where the Latin of 102.II verses 5 and 6 is hidden.

The DO checkout used is `~/src/divinum-officium`, next to the main checkout (`fetch-do.sh ~/src/divinum-officium`).

### 7e. Phase 3 notes (2026-10-27)

Built as §3 describes. `import.js` now also prints, for every language, which texts it has and which it lacks, and checks DO's Latin, built from the same manifest, against the app's own Latin unit by unit. `node tools/do-import/import.js en` wrote `js/i18n/en.js`: its `texts` are generated, `meta.stub` is gone, and the psalter is unchanged.

**The pieces:**
- **`manifest.json`** maps all **87** of the app's texts: 65 chant files (every one that isn't a psalm, `deus-in-adjutorium.gabc` included though no page uses it yet) and the 22 `index:` blocks. The chapter, the collects and the Marian prayers also fill their pointed twins in `index.html`, under the chant's key (§7c). The importer lists any chant or `index:` key in the app that the manifest doesn't map, and any key it maps that the app doesn't have; there are none. Each text is a list of units, and each unit is DO lines: `@file:section:subs` in DO's own syntax (with short names such as `Prayers` and `Minor` for the files), or `$Name` for a Prayers.txt section. A few options cover what DO's syntax can't: a Mariaant.txt section's `part` (`antiphon`, `versicle`, `prayer`), `lines`, `abbrev` (the app's "In manus..."), `inline` (the lesson's *Tu autem* on the lesson's own line), `amen` (a trailing "Amen." becomes "R. Amen.", in the language's own word, from its `[Per Dominum]`), `after` (*Mortem autem crucis* is what Good Friday's line adds to Holy Thursday's), and `paschal`. The comment at the top of `texts.js` documents them.
- **`resolve.js`** reads a DO file as DO's `SetupString.pl` does. It ports `vero()` and `process_conditional_lines` for the version `Rubrics 1960 - 1960` at Compline, so `(sed rubrica 1960 dicitur)`, `(rubrica cisterciensis) …` and conditioned section headers come out as DO shows them in 1960; a later section of the same name replaces an earlier one. `@` references, `$` Prayers lines and the few `&` macros the texts use (`&Gloria1`, …) are replaced by what they name, and `s///` and line selections are done in order, as `do_inclusion_substitutions` does. *Jube domne* is read for `Divino Afflatu - 1954` (the manifest's `version`), since 1960 says *Jube, Dómine*.
- **Languages don't borrow** (as §7d decided): a section a language lacks is missing, with one exception from DO itself (`prefer_latin_inclusion`): where Latin has the section only as references, they're resolved in the language. English's `[Completorium]` and `[Confiteor]` are like this. A missing reference becomes a `⟨missing file:section⟩` marker, so the report says exactly what a text lacks.
- **Units** (§7c): a chant's units are its paragraphs with words, counted as `unitParagraphs` in `chant-element.js` counts them (`app-latin.js` now reads the app's chants and `index.html` blocks the same way); an `index:` block is one unit. A `*` or `†` stays only where the app's Latin unit has one, so the Gloria in *Deus in adjutorium* loses DO's `*` and the In manus keeps its own. Then, as the psalter does, DO's markup goes: `v.`/`r.`/`R.br.`, "Benedictio.", `!` and `#` lines, `/:…:/` rubrics, `{:…:}`, the `+` crosses, and Latin's `Patr[e]` elision brackets.
- **Paschal forms** are generated as DO generates them (`LanguageTextTools.pm`, `horas.pl`): `ensure_single_alleluia` for the *Salva nos* antiphon and the *Custodi nos* versicle; `postprocess_short_resp` for the In manus (the response after the V. becomes "Alleluia, alleluia", the others end ", * Alleluia, alleluia" with the `*` moved, and the Gloria, which DO sees unexpanded as `&Gloria1`, isn't a V. for this); and `alleluia_ant` for the psalm antiphon "Alleluia, * alleluia, alleluia". The app's abbreviated responses ("In manus...") are DO's response up to the `*`, plus "…", from the ordinary (not the Paschal) form.
- **Te lucis:** the doxology replaces the hymn from its `*` on, as `hymni.pl` does (DO doesn't do this in 1960 at all, but the app does). The plain doxology sections, as §4b decided: `Nat` for Christmas, Our Lady and the Seven Sorrows, `Epi`, `Pasch`, `Asc`, `Pent`, `Heart`, and the feast files' `[Doxology]` for the Holy Family (`Tempora/Epi1-0`), the Transfiguration (`Sancti/08-06`) and Christ the King (`Sancti/10-DU`). A doxology without an Amen keeps the hymn's, which the report notes: English Holy Family, every Spanish doxology, and Italian Transfiguration.

**Decisions:**
- **Texts DO doesn't have.** DO has no priest's forms: the *Confiteor* "et tibi pater", the *Misereatur tui* and *Misereatur vestri*. The manifest marks the three `{"extra": …}`, and their texts are written out in full in `tools/do-import/extra/<lang>/texts.txt`, where all hand-written text goes (§4b, as the user chose over per-language `s///` in the manifest). The file has a `[key]` per text and its units separated by blank lines; a text in it takes the place of DO's for that language, so it can also fix one of DO's. English is written (DO's *Confiteor* and *Misereatur* with "and to thee, Father", "on thee" and "on you"); every other language reports the three as missing until Phase 5 writes its own (each needs someone who reads the language). DO has no Latin for them, so `extra/la/texts.txt` holds the Latin the translations were written against, and the Latin check compares it with the app's in place of DO's: a change to the app's Latin shows which translations to change too.
- **The Triduum** lines come from each day's `[Special Completorium]`, the text DO shows at Compline, not `[Oratio]` (Portuguese has no `[Oratio]` on Holy Thursday; French's differs).
- **All Souls:** the collect is `Sancti/11-02` `[Oratio mortuorum1]`; the preces are built in the app's order from `[Pater noster Et]`, `[Aportainferi]`, `[Requiescant]` and `[Dominus]`, with the *Dominus vobiscum* in parentheses as in the app. DO's collect ends with the whole *Per Dominum*, where the app had only "Per Dóminum nostrum."; the app's Latin now has the whole conclusion too (as the user chose), in the words and marks of the Triduum's silent *Per Dominum*, so the translations' long ending sits beside a long Latin one.
- **Line breaks** are kept as DO writes them, so the English Salve Regina and Marian antiphons are lines, not one paragraph.
- **`fetch-do.sh`** now also checks out `Sancti/11-02.txt`, `Commune/C9.txt` and `Tempora/Pasc0-0.txt` (*Hæc dies* and the Easter-octave antiphon are its `[Ant 43]`). Run it again on an existing checkout.
- **Latin-Bea** gets no `texts` (`texts: false` in `import.js`): its texts are the Vulgate's, so in "Latin & translation" nothing extra shows and in "translation only" the Latin does, as §2b wants.

**The Latin check:** every unit of DO's Latin matches the app's above 0.9. The small differences (`--verbose`) are spelling: *eúmdem/eúndem*, *Génetrix/Génitrix*, *fecúnda/fœcúnda*, *Eja/Eia*; the solemn *Regina cæli*'s "alle- * ** luia"; and "Or:" in the unused `deus-in-adjutorium.gabc`. *j* counts as *i* (DO's allelúja). Every language's unit counts match the app's paragraphs.

**Coverage at `ad87836`** ("texts" counts the 87 keys with every unit):

| Language | Texts | Missing |
|---|---|---|
| English | 87/87 | — **Written to `js/i18n/en.js`.** |
| Français, Español, Italiano, Português | 84/87 | The three priest's forms (above). |
| Polski | 83/87 | The priest's forms, and the All Souls collect: Polski's `Sancti/11-02.txt` has no `[Oratio mortuorum1]`. §2 counted Polski at 100% without that collect; Phase 5 needs an `extra/pl/` text or a fix upstream. |
| Latin-Bea | none | By design (above). |
| Deutsch (not offered) | 81/87 | The priest's forms; the Transfiguration and Christ the King doxologies (§2); the All Souls collect. |
| Magyar (not offered) | 81/87 | The priest's forms; the Holy Family and Christ the King doxologies (§2); `[Aportainferi]`. |
| Nederlands (not offered) | 80/87 | The priest's forms; Holy Thursday; Easter's `[Ant 43]` (*Hæc dies* and its antiphon); the All Souls collect. The untranslated English doxologies (§2) count as present: the report can't tell English from Dutch. |
| Vietnamice (not offered) | 77/87 | The priest's forms; Holy Thursday; the three feast doxologies; Easter's `[Ant 43]`; the All Souls collect. |
| Dansk (not offered) | 45/87 | Most of it: no psalm antiphons, doxologies, Marian antiphon parts, … |

**A display fix:** in "translation only", the three inline pairs (`<span class='tr-pair'>`: *Christus factus est*, *Mortem autem crucis* and All Souls' preces) showed their Latin as well as the translation, because `.text-tr span.tr-pair > span { display: block }` outranked `.text-tr .has-tr { display: none }`. The stub had none of the three, so Phase 1 never saw it. Fixed in `style.css`.

**Checked in the browser** (`?text=both&lang=en` and `?text=tr&lang=en`): an ordinary Sunday and weekday, All Saints, All Souls, Holy Thursday, Good Friday, the Easter octave, Paschaltide, Ascensiontide, Advent, Christmastide and Lent. Every visible chant and `index.html` block has its translation, each chant's units pair with its paragraphs (no "units" warning in the console), and in "translation only" no Latin is left showing. All 17 Te lucis tones, the 8 In manus forms and the 8 Marian antiphons (simple and solemn) were swapped in on one page and each paired unit for unit; the priest's blocks have theirs too, now from `extra/en/texts.txt`. All Souls' collect shows the whole *Per Dominum* in both columns.

### 7f. Phase 4 notes (2026-10-27)

English is checked end to end and offered: `languages` in `js/text-mode.js` now has `{code: 'en', name: 'English'}`, so the Text and Translation menus show. `js/i18n/en.js` is still wholly generated (`node tools/do-import/import.js en`; running it twice gives the same file).

**What was checked,** in "Latin only", "Latin & translation" and "translation only", at 1100 px and at phone width:
- **Dates:** every day of an ordinary week (2026-11-08 to 11-14), All Saints, All Souls, Advent (Sunday, a weekday, the Immaculate Conception), Christmas Eve and Day, the Holy Innocents, the Epiphany, the Holy Family, the Purification and the day after (Alma to Ave), Ash Wednesday, a Lenten feria, Passion and Palm Sundays, Holy Thursday, Good Friday, Holy Saturday, Easter Sunday and Monday, Low Saturday and Sunday, Paschaltide weekdays, the Ascension and the Saturday after, Pentecost, the Saturday after (Regina cæli to Salve), Trinity Sunday, the Sacred Heart, the Transfiguration, the Seven Sorrows and Christ the King. A script set each date and checked that every visible chant, `index.html` block and psalm verse had its translation, that no chant's units mismatched its paragraphs, that "translation only" left no Latin and drew no score, and which Te lucis tone, In manus form, Marian antiphon and psalms the date chose. Every date passed.
- **All 17 Te lucis tones** (each with its doxology), **all 8 In manus forms** (the four the menu offers and the four short ones no page uses yet) and **all 8 Marian antiphons** (simple and solemn, each season's versicle and collect), swapped in on one page.
- **The priest's officiant mode,** in both modes: *Jube, domne*, the *Misereatur tui*, the *Confiteor* with "and to thee, Father", the *Misereatur vestri* and both *Dominus vobiscum*.
- **The notation levels:** every section plain text, and the psalms fully notated with the chapter pointed and the prayers fully notated, on a Sunday, a Friday, All Souls, Easter Monday, a Paschaltide weekday, Good Friday and Christmas. Each fully notated psalm verse is followed by its own translation.
- **Print,** with real print media (headless Chrome's `Page.printToPDF`, as the browser pane can't print): a Sunday in "Latin & translation" (11 pages, translations beside the prayers and verses, under each chant unit), the same Sunday in "translation only" (6 pages), All Souls with the psalms fully notated, and a Paschaltide weekday with everything plain text.
- **The menus,** from empty storage: Latin by default with Translation disabled; "Latin & translation" and "Translation" draw and remove the translations, show English, and survive a reload; choosing in the menu drops `?text=` from the address; "Translation" hides the notation menus and "Solemn Tone"; back to Latin, no translation is left and the scores return.
- **A close reading** of every English text and the psalms that differ by season.

**Fixes:**
- **Passiontide's short In manus** (`in-manus-tuas/passiontide.gabc`) had no ℣ or ℟ in its English second and third units, where the Latin's scores have them as annotations. `manifest.json` now keeps DO's `V.` and `R.` there. (The other forms' first line is "V." as Phase 3 had it, because every In manus score's annotation is ℣.)
- **`extra/<lang>/texts.txt`:** a blank line before a `#` comment left a newline at the end of the unit above it. `texts.js` trims each unit.
- **Decided by the user,** written in `extra/en/texts.txt`. Where only part of a text changes, the file now takes one of DO's sections, `[@file:section]` in DO's own syntax, which the language's resolver reads in DO's place (`resolve.js`), so the rest still comes from DO and its Latin check is DO's. A whole text replaced (*Jube, domne*) has its Latin in `extra/la/texts.txt`, which is checked as well as DO's Latin, not instead of it, for any text DO has:
  - **Easter's Te lucis** (`[@Doxologies:Pasch]`) has the doxology chosen in §4b, "All glory to the Father be, / And to the Son, who from the grave / Arose; and to the Paraclete / Be glory through eternity.", in place of DO's 7.7.7.7 "Hymns of glory, songs of praise". Phase 7 moves it to `hymn-sung.txt`.
  - **_Jube, domne_** (the priest's form) is "Pray, Father, a blessing." DO had "Grant, Lord, a blessing." for both forms; the form without a priest keeps it.
  - **All Souls' collect** (`[@Sancti/11-02:Oratio mortuorum1]`, whose `$Oremus` and `$Per Dominum` are still DO's) is in *thee* and *thy*, like its conclusion and the rest of the office: "We beseech thee, O Lord, be merciful to the souls of all thy servants and handmaids for whom we humbly entreat thy majesty, …". DO has *you* and *your*.
  - **American spelling.** DO's English is mostly American ("favor"), but has seven British words. `extra/en/spelling.txt` lists them (favourable, honour, labour, laboured, labours, neighbour, saviour), and `import.js` replaces each as a whole word (with Unicode word boundaries, so accented words work), keeping its case, in the psalter and the texts (`spelling` in `texts.js`). A line that isn't two words stops the import with its line number. The report counts each and flags one that no longer matches anything. Another language can have its own `spelling.txt`.

**Left for later** (none of these stops English being offered):
- **Phase 7:** DO's Holy Family doxology is 7.6.7.6 with lower-case lines ("All praise to Thee, O Jesus, / who parents dost obey; …"), so it can't be sung to Te lucis; the sung validator will drop it.
- **Phase 8 typo pass**, DO's English as it stands: *Thee* capitalized in some doxologies and *thee* in others; "to-day" and a curly ’ in the Ascension doxology; the Alma Redemptoris Mater's punctuation ("hear thou thy people's cry / Star of the deep…", "from nothing made. / Sinking we strive…"); "Holy Spirit" in the *Benedicat*, the Advent Marian versicle and the Salve Regina's collect beside "Holy Ghost" everywhere else; the Easter-octave antiphon's capitals ("Alleluia, Alleluia, Alleluia, Alleluia."); and the *Per Dominum* as DO renders it ("Through Jesus Christ, thy Son our Lord, Who liveth…").
- **Rubrics that quote Latin** (§4: "can get a gloss") aren't glossed in "translation only": "the Lector says “Dómine”", "at the words “Tu autem...nobis”", "the threefold “Mea culpa”", "without *Orémus*". A gloss has to be in the translation's language, so it needs a key per cue in each module.
- **On a phone** the chant is laid out 624 px wide and scaled down, so in "Latin & translation" its Latin lyrics are about 60% of the size of the translation under them. In "Latin only" the same chant sits beside full-size rubrics, as it always has. Worth a look when the layout is polished (Phase 8).
- **The Latin's plain text** of the unused `in-manus-tuas/advent.gabc` shows "*Commendo" without a space, because its GABC has none.

### 7g. Phase 5 notes (2026-10-27)

Français, Español, Italiano, Português and Polski are generated (`node tools/do-import/import.js fr es it pt pl`), checked as English was in §7f, and offered: `languages` in `js/text-mode.js` lists them after English. Each is at **26/26** psalter sections (313/313 verses, no mediant or unsafe-character problems left) and **87/87** texts (147/147 units). Latin-Bea isn't written yet: it is Phase 6.

**The importer** (`texts.js`, `psalter.js`):
- **The psalter reads `extra/<lang>/texts.txt` too.** `[@Prayers:Gloria]` and `[@Prayers:Requiem]` take the place of DO's endings, as they already did for the texts. A psalm file has no sections, so `[@Psalterium/Psalmorum/Psalm233]` holds only the verse lines that change, keyed as DO keys them (`2:32 …`; the *n*-th of a repeated key replaces the *n*-th). The report notes a key DO hasn't; a line that isn't `N:v text`, or an ending that isn't two lines, stops the import.
- **`amen`** also takes the Latin "Amen." where the language's word is another (French ends four Marian collects "… Amen." and its word is "Ainsi soit-il."), and an Amen on a line of its own (Portuguese *Misereatur* and *Indulgentiam*). Both had doubled the Amen.
- **Te lucis:** a doxology's own Amen counts whatever its punctuation ("Amén." where the hymn has "Amén") or wherever it is (Italiano's Transfiguration ends "… per i secoli eterni. Amen.", now split onto its own line). Every Spanish doxology and the Italian Transfiguration had shown it twice. §7e's note that they lack an Amen was wrong: only English Holy Family does.
- **Markup:** the blessing's label goes in the language's own word, read from DO's `[Benedictio Completorium_]` (Español's "Bendición."), as "Benedictio." does; and a rubric `/:…:/` followed by punctuation no longer leaves a space before it ("obra , por").
- English is unchanged (re-imported: the same file).

**Written by hand** in `extra/<lang>/texts.txt` (the Latin of the two whole-text replacements is in `extra/la/texts.txt`). **Kept as drafted (the user's choice, 2026-10-27); a native reader of each language checks them before release, in Phase 8:**
- **The priest's three forms**, in every language, from DO's own *Confiteor* and *Misereatur* with the priest put in: French "et à vous, mon Père" and *vous* for both *Misereatur*s (as the French missals; French has no *thee*); Spanish DO's own "a vos, Padre", with *vos* for *tui* and *vosotros* for *vestri*; Italian "e a te, padre", *te*/*voi*; Portuguese "e a vós, Padre", *vós* for both; Polish "i tobie, ojcze", *tobą*/*wami*. "padre" and "ojcze" are lower case as in DO's own *Jube domne*. "Świętym"/"Świętych" and "Santos" are capitalized both times, where DO's *Confiteor* has one of each.
- **All Souls' collect** in Polski (DO has the *Propitiáre* in no Polish file) and in Español (DO's `[Oratio mortuorum1]` is another prayer, "…te ofrecemos con humildad este sacrificio de alabanza…"): both translate the Latin. The Polish follows the words of DO's other Polish collects for the dead (`Commune/C9`).
- **_Jube_:** Español's priest's form "Dígnate, Padre, dar tu bendición." (DO has "Señor" for both, as English had "Lord"); Polski's form without a priest "Pobłogosław, Panie." (DO has "ojcze", father, for both).
- **Español Ps 4:5:** DO has "…" for "quæ dícitis in córdibus vestris"; it now reads "lo que decís en vuestros corazones, * reflexionadlo en el silencio de vuestro lecho".

**Fixes to DO's text with no new wording**, also in `extra/`:
- Français: the `*` in the Sicut erat (`[@Prayers:Gloria]` and `[@Prayers:Deus in adjutorium]`, which has its own copy, "toujours, * et dans les siècles") and in Nunc dimittis verse 4 (`2:32`); All Souls' collect without its inline "Par Notre-Seigneur.", which the whole `$Per Dominum` followed.
- Español: one `*` in 15:9 where DO has two, and one in 102:7 where it has none; the *Confiteor* without a priest loses DO's "(y a vosotros hermanos o a vos, Padre)".
- Italiano: DO's editorial square brackets in 9 verses. The words DO supplies stay, without the brackets ("Adiratevi pure", "bagnerò di pianto", …); its two alternative renderings go ("riandatele [respingetele]" → "riandatele", "iattanza [tracotanza]" → "iattanza").
- Português and Polski needed nothing else.

**Fonts** (§4 "Fonts"): `fonts/ext-subsets.py` cuts two more subsets of each of the four faces from the full Crimson 0.8 (Kosch's OTFs, OFL): `crimson-<style>-ext` (every Latin letter and punctuation mark the app's subsets lack: à ç ê ñ ¿ « » ł ś ő ș …, about 21–25 KB as woff2) and `crimson-<style>-vi` (Vietnamese, 4–19 KB). Each takes the vertical metrics of the app's subset, has no kerning (as the app's subsets haven't), and is in `style.css` with a `unicode-range` of exactly its characters, so a page downloads one only when it uses one of them: a French page loads the roman `-ext` and nothing else. Every letter of the five languages now comes from Crimson in roman, italic, bold and semibold (checked in the browser against a fallback). The undertie `‿` isn't in Crimson; Phase 7 has to draw it.

**What was checked,** at 1100 px and at phone width, in "Latin & translation" and "translation only", for each language:
- **40 dates**, as §7f's list (an ordinary week, All Saints, All Souls, Advent, Christmastide, the Epiphany, the Holy Family, the Purification, Lent, Passiontide, the Triduum, Easter and its octave, Paschaltide, the Ascension, Pentecost and the Saturday after, Trinity, the Sacred Heart, the Transfiguration, the Seven Sorrows and Christ the King) with `check.js`: every visible chant, `index.html` block and psalm verse has its translation, no unit-count warnings, and in "translation only" no Latin left and no score drawn. All 400 runs passed.
- **All 17 Te lucis tones, all 8 In manus forms, all 13 Marian files** (antiphons simple and solemn, and the collects) and the *Jube*, blessing, lesson, *Hæc dies*, Easter antiphon, Paschal *Custodi nos* and *Deus in adjutorium*, swapped in on one page: one translation block per unit, in both modes.
- **The priest's mode:** *Jube, domne*, the *Confiteor*, both *Misereatur*s and both *Dominus vobiscum*, in both modes.
- **The menus:** from empty storage, Latin with Translation disabled; "Latin & translation" enables it; choosing Polski draws Polish and is saved. **The browser's language** picks the default: pt-BR → Português, fr-CA → Français, de-AT then es-MX → Español, la then it → Italiano (Latin is skipped), de then nl → English.
- **Print** with real print media (`print.mjs`), a Sunday in each language in "Latin & translation", and in "translation only".
- **A reading** of every text in every language, which found the problems above.

**Left for later** (none stops a language being offered):
- **Phase 8 typo pass**, DO as it stands: French "Veuillez, père, bénir" (lower case) and its Holy Family doxology lacking a full stop; Italian "Allelúja" (the Latin's accent) in the Easter antiphon and "Signore :" in *Hæc dies*; Spanish "Descansed en paz" (*Requiescant*, which should be "Descansen") and "R. Amén" without a full stop in the All Souls preces, and the Ferial doxology's "Amén" without one; Polish "Ducha Świętego Bóg" without a comma in the *Per Dominum*, and the Salve's versicle without a full stop. In every language DO capitalizes the word after an In manus `*` ("Panie, * Powierzam"), so the fully notated form, which drops the `*`, reads "Panie, Powierzam".
- The hand-written texts above, for a native reader of each language (Phase 8).

### 7h. Phase 6 notes (2026-10-27)

Latin-Bea is generated (`node tools/do-import/import.js la-bea`, `js/i18n/la-bea.js`, psalter only) and offered: `{code: 'la-bea', name: 'Latin (Pius XII psalter)'}` is last in `languages` in `js/text-mode.js`. `browserLang` never picks it (checked: `la`, `la,la-bea` and `de,la` give English; `la-bea,it` gives Italiano; `la-VA,fr-CA` gives Français). The report has it at **26/26** sections, 313/313 verses: 247 verses of Bea, 4 `''` in groups, and 62 left out as the Vulgate's word for word (below). Every psalm is paired; none needed the block fallback. English, Français, Español, Italiano, Português and Polski re-import unchanged.

**Pairing by content, not by key** (`alignLines` in `psalter.js`, `align: true` in `import.js`). §2b planned to pair by verse number, but DO's Bea keys can't be trusted for that: in Ps 12, 33, 60, 69, 70, 76, 85, 87, 102 and 141 they run one apart from the Vulgate's for a stretch (Bea numbers some psalms from the title, so its `87:1` is the Vulgate's `87:2`, and where the Vulgate repeats a key, as `87:9` twice, Bea numbers on). Pairing by key paired Ps 87:2–9 with the wrong lines. Both texts are Latin, so the importer pairs lines by the words they share instead:
- A **group** is one or more Vulgate lines with one or more of Bea's, in order. Of all the ways to cut a psalm into groups, the importer takes the one whose groups share the most words (each word cut to its first four letters, so *clamávi* and *clamo* match; Dice's coefficient, weighted by the group's size). A group bigger than one line on each side costs 0.6 for each line over that, and a group whose first lines have the same verse number gains 0.3. So the lines pair one to one wherever the two have as many lines, groups are as few and as small as they can be, and the verse numbers decide where the words don't. Every line of a group shares a word with the other side; a line that would share none (a title only one text has) pairs with nothing, for a cost of 0.4, and the report lists it. None does. A group never crosses the start or end of a section (7.I/7.II, 33, 70, 76, 102), and a group outside every section (a title's) that takes any of Bea's lines but isn't one line with one is reported.
- **The groups** (the report lists them, and each run of lines that pair one to one under different keys): Ps 4: `4:2a+4:2b ↔ 4:2` and `4:9+4:10 ↔ 4:9`, as §2b expected; Ps 7: `7:7a+7:7b ↔ 7:7`; Ps 11: `11:6a+11:6b ↔ 11:6`. Everything else pairs line by line, among them Ps 90's `90:4–6 ↔ 90:4a, 4b, 5b` and the shifted runs above. Bea's line goes on the group's first Vulgate verse, and the others are `''`, as Español's Ps 102 group (§7d).
- The weights were set by reading every psalm's pairing against the texts. With smaller costs, Ps 70:3–4 (where the Vulgate repeats `70:3`) got a crossed 2:1 and 1:2, and Ps 4:6–10 one 4:3 group; with no verse-number bonus, Ps 7 grouped 7:8b+7:9b instead of 7:7a+7:7b. Ps 7:7–9 is in fact a cross (the Vulgate's 7:7b ends with 8a, its 8b with 9a), and the verse-number groups are the closest fit.
- **The block fallback** (one Bea block per section, on its first verse) is there for a psalm whose lines can't be paired or whose groups share fewer than 0.3 of their words on average. None comes near it: the lowest averages are Ps 60's (0.45) and Ps 76's and 141's (0.46).
- **Mediants:** a Bea line that stands for several Vulgate verses may have that many `*` (Bea 4:9 has two). The report's one mediant is Bea 76:4 (76.I verse 3), a tristich with two `*`, as DO has it. 30 verses have a flex in the app's pointing that Bea hasn't ("flex+"), as in the other languages.

**What's the same as the Latin** (`latin: true` in `import.js`): a verse that is the Vulgate's word for word (DO's Latin or the app's, compared as §7d normalizes) is `null`, and the report lists them. That is every Gloria Patri, Sicut erat, Requiem and Et lux, which Bea borrows from the Latin as it has no `Prayers.txt` (§7d), and 10 psalm verses: 6:2, 7:4, 33:12, 70:2, 70:11, 102:1, and the Nunc dimittis' first and last verses (in both its sections). The module's `meta` says `latin: true`, and `latinClass` in `js/text-mode.js` gives a Latin block with nothing beside it the class `tr-same` instead of `tr-missing`. So in "Latin & translation" nothing is shown beside it, and in "translation only" its Latin shows as the text, in the ordinary style, not the quieter one of a missing translation. Bea has no texts (`texts: false`), so every text but the psalms is `tr-same` too: "translation only" is "read the office with the Bea psalter", as §4 said. The Bea text's `lang` attribute is `la-x-bea` (`meta.lang`), so it is Latin to the browser and `[lang=la]` in `style.css` still means only the Vulgate.

**What was checked,** with the Phase 5 tools and Bea's own checks (`__checkBea`: nothing `tr-missing`; every Latin verse `has-tr` or `tr-same`; every text `tr-same`; no translation block outside the psalms; every whole psalm with some Bea; in "translation only" no Latin hidden but `has-tr` and no score drawn):
- **The 40 dates** of §7f, in both modes, at 1100 px and at 390 px: all 160 runs pass. The counts match the module (Tuesday: 8 + 6 + 11 + 2 = 27 Bea verses).
- **Fully notated psalms**, pointed and "translation only", on All Souls, an ordinary week and the week after the second Sunday after Easter (Paschaltide, with 76.I and 76.II on the Friday): the same counts of Bea verses in each; under a notated psalm, Bea 4:2 follows verse 1 and nothing follows verse 2.
- **All Souls** (122, 141, 142 and the Nunc dimittis with Requiem): 31 Bea verses, nothing beside the Requiem.
- **Every Te lucis, In manus and Marian file**, and the other chants of `units.js`, in both modes: no translation block, nothing missing, no warnings.
- **The menu**: from empty storage, choosing "Latin & translation" and then "Latin (Pius XII psalter)" draws Bea and is saved. **Print** (`print.mjs`) in both modes, and **phone width** (stacked, no sideways scroll). `gulp` (Node 22) copies `la-bea.js` into `dist/`.

**Left for later:**
- In "translation only", a group's later Vulgate verses are hidden with their `''`, so the verse numbers skip (Ps 11: 5, then 7), as for Español's Ps 102 group. Bea's own verse numbers would be its keys, which aren't reliable (above), so they aren't shown.
- DO's Bea keys could be fixed upstream (Phase 8's report to DO); the pairing doesn't depend on them.

### 7i. Phase 7 notes (2026-10-27)

Built as §4b and §5 describe. *Te lucis* can be shown as a literal or a metrical translation, or sung in the translation to the chant. All the modules are regenerated (`node tools/do-import/import.js en fr es it pt pl la-bea`). Apart from the hymn, each is unchanged.

**The data** (`tools/do-import/hymn.js`, called by `import.js`). Each module's `hymn` takes the place of its 17 `te-lucis/` texts:
```js
hymn: {literal: {stanzas: [stanza 1, stanza 2], doxologies: {Advent: stanza 3, …}}, metrical: {…}, sung: {…}}
```
- **Keys:** a doxology is keyed by its tone (`te-lucis/<tone>.gabc`) and ends with its Amen. `sung` is hyphenated and has only the tones the whole hymn fits.
- **Which kinds:** DO's hymn is a language's literal or metrical text, as `hymn` in `import.js`'s `LANGUAGES` says (§4b's table).
  - English has all three kinds.
  - Español has metrical and sung. §4b decided it has no literal, so DO's prose doxologies are no longer shown.
  - Français, Italiano, Português and Polski have the literal one.
  - Latin-Bea has none.
- **The report** has a section for the hymn: each kind's coverage, each `new` text, and every tone that can't be sung, with the reason.

**The `extra/` files.** The format:
- `[hymn]` holds the first two stanzas.
- Every other section is the doxology, with its Amen, for the tones it names (`[Christmas Our-Lady Seven-Dolors]`).

The files:
- **`extra/en/hymn-literal.txt`:** the literal English (below).
- **`extra/<lang>/hymn-sung.txt`:** the metrical text, hyphenated by hand.
  - `-` divides syllables, one to a note; `‿` joins two words' vowels on one note.
  - A section has to be DO's text once the hyphens are taken out (so DO's "Virgin-Born" can be sung Vir-gin-Born), or the import stops.
  - A section marked `new` (`[Easter] new`) is a text DO hasn't. It also takes the place of DO's as the metrical text, with spaces for the `‿`.
- **The English Easter doxology** (§4b) has moved there from `extra/en/texts.txt`'s `[@Doxologies:Pasch]`, as `[Easter] new`. The English metrical text is word for word what Phase 4 showed.

**The English literal text: Britt.**
- **What was found:** the first edition (1922; the 1924 revision is the same here, and both are on archive.org) opens each stanza's note with a literal prose rendering. It has renderings of:
  - *Te lucis*' first two stanzas (p. 39, notes 1 and 2);
  - the *Præsta, Pater* doxology, under the Terce hymn *Nunc Sancte nobis Spiritus*, which ends with it (p. 36, note 3);
  - the Transfiguration doxology (p. 284, note 5).
- **What wasn't used:** every other doxology's rendering is only in the 1952 edition, whose renewal wasn't verified. Its Sacred Heart is also another doxology ("Gloria tibi, Domine, Qui Corde fundis").
- **Decided by the user:** the 1922 text where it exists. The doxologies it lacks are written for the app in Britt's manner, and the user approved them (2026-10-27): Christmas (with Our Lady and the Seven Sorrows), the Epiphany, Easter, Pentecost, the Ascension, the Sacred Heart, the Holy Family and Christ the King.
  - *almo Spíritu* is "the gracious Spirit".
  - *In sempitérna sǽcula* is "for everlasting ages", and *In sæculórum sǽcula* (Pentecost) "unto ages of ages".
- **The form of the text:** Britt's renderings are prose, a paragraph to a stanza, so under the notes they have no slashes. Britt (1872–1955, Library of Congress authority nr98043157) is public domain in the US.
- **Not in the app** (no tone uses it): Britt's 1922 Seven Sorrows doxology, *Qui passus es pro servulis*.

**Hyphenation.**
- **Drafting:** the drafts came from PR #42's Hypher patterns (English and Spanish, used locally, as that PR isn't merged). They divide words for line ends, not for singing ("al-l", "s-tars", "Crea-do-r"), so every line was set by hand from them.
- **English:** "Spir-it", "Par-a-clete", "ev-er-more"; "o’er" and "our" are one syllable each.
- **Spanish:** the synalephas are those of §4b, plus DO's own "re-pri-me‿a nues-tro‿ad-ver-sa-rio" and "Hi-jo‿al".

**The validator** counts each tone's note-bearing syllables per line, per stanza. A syllable with an empty `()` neume is elided and doesn't count. All 17 tones are 8.8.8.8 three times, then a two-syllable Amen. The sung text has to match line by line on each tone. Results:
- **English: 16 of 17 tones.** Holy Family, DO's 7.6.7.6 (§7f), doesn't fit, so in that season "Sung" shows the metrical text with a note.
- **Español: all 17**, once three of DO's lines were rewritten (below).

**Español.**
- **The problem:** three of DO's lines end with a word stressed on the third syllable from the end. Spanish verse counts them as eight, but they have nine sung syllables for eight notes:
  - "y las nocturnas imágenes" (stanza 2, which every tone has);
  - "Hazlo así, Padre piísimo" and "que reinas con el Espíritu" (the Ferial doxology).
- **The user's choice:** proper eight-syllable lines, with a repeated note only if none could be found.
- **The new lines:**
  - "y visiones fantasmales", which keeps the even lines' *á–e* assonance;
  - "Hazlo así, Padre amoroso";
  - "con el Espíritu reinas".
- **Where they're used:** they are `new` sections (`[hymn] new`, `[Ferial … Passiontide] new`), so they are also the metrical text, as the user chose (2026-10-27): what's read matches what's sung. A native speaker should check them in Phase 8, with the doxologies.

**The display.**
- **The menu:** "Hymn translation: Literal / Metrical / Sung with chant" (`#selectHymnMode`, `localStorage.hymnMode`, default literal). It sits under the tone menu and the hymn's notation menu.
  - It's hidden in "Latin only" and for a language with no hymn (Latin-Bea).
  - A choice the language hasn't is disabled, and so is "Sung" while the hymn is plain text. In "translation only" the notation menus don't apply, so there the hymn can be sung whatever the menu says.
  - A disabled choice is kept but not shown: the menu shows what is shown in its place.
- **Choosing the text:** `textMode.hymn(key, notated)` puts the hymn together for a `te-lucis/` key, with §4b's fallbacks:
  - sung falls back to metrical, with `unsung` set where the language sings but not this season;
  - literal falls back to metrical, and metrical to literal.
  - `textMode.texts()` gives the same for a `te-lucis/` key.
  - The hymn's render key includes `hymnMode`, so changing it redraws only the hymn.
- **Sung** (`swapLyrics` in `chant-element.js`): after `setGabc`'s rewrites, each syllable with notes gets the next translated syllable, a line for a line.
  - Elided syllables go. The clef, the bars and the stanza numbers stay.
  - The drop cap is the translation's first letter. At first the rest of the syllable wasn't put in capitals as the Latin's "TE" is, so it read "B efore". Phase 8 gives it the Latin's capitals (§7j).
  - In "Latin & translation" the Latin follows each stanza, with red slashes, in the translation's grey. In "translation only" the sung score is the only notation on the page, with nothing under it.
  - Where the season can't be sung, a red note under the tone menu says "Not available to sing in English for this season.", and the metrical text is shown.
- **The undertie:** Crimson has no ‿, so `fonts/undertie.py` draws one: a thin arc under the gap, reaching under the letters either side. It is a one-glyph font, `fonts/crimson-undertie.woff2` (340 bytes) and `.woff`, with the roman subset's metrics. `style.css` gives it `unicode-range: U+203F`, so only a page with a sung Spanish hymn downloads it. The copy globs already include it.

**Checked in the browser:**
- **The hymn, in English and Español:** all 17 tones, in "Latin & translation" and "translation only", with each `hymnMode` and the hymn fully notated or plain text (`.claude/hymn-check.js`). Each combination did what §4b's table says, with no warnings.
  - Under the chant, the doxologies with elisions (Christmas, the Epiphany with two, Easter) are set syllable for syllable.
  - The Spanish synalephas show their undertie.
- **The menu:**
  - Español shows "Metrical" when "Literal" is stored, Français "Literal" with the other two disabled, and English goes back to the stored choice.
  - Latin-Bea hides the menu.
  - Plain-text notation disables "Sung", except in "translation only".
- **The rest of the office** (Phase 4's `check.js`), on 17 dates covering every tone, in English and Español, in both modes, with the hymn literal and sung: all 272 runs pass. With the hymn sung in "translation only", `check.js` flags only the hymn itself: three scores and no translation block, as §4b means it. The exceptions are English Holy Family, which falls back to text, and All Souls, which has no hymn.
- **Print** with real print media (`print.mjs`): Spanish, Christmas tone, sung in "Latin & translation". The doxology is under the notes and the Latin follows each stanza.
- **Phone width:** Spanish sung in "Latin & translation", with no sideways scroll.

**Left for later:**
- **Phase 8:**
  - a native speaker's check of the three Spanish lines;
  - the Spanish and English hymn texts read aloud as sung.
- **English Holy Family:** an 8.8.8.8 text would let it be sung. DO's text stays as the metrical one.
- **Britt's 1952 renderings** could replace the drafts if their copyright is found to have lapsed.

### 7j. Phase 8 notes (2026-10-27)

What's done:
- the typo pass;
- the credits and license in the app;
- accessibility, layout and print;
- the build.

What waits for the user: publishing to gh-pages, the reports to DO, the Cordova release and the
store. These steps are drafted outside the repository, in the Phase 8 hand-over notes, with the
commands to run and the DO report.

**The typo pass.**
- **The spell check.** Every word of each module and each `extra/` text went through a spell
  checker in its own language:
  - macOS's dictionaries for en, fr, es, it and pt;
  - Hunspell's (nspell with dictionary-pl) for Polish, which macOS lacks.

  It flagged:
  - English's archaic forms (*-eth*, *shewn*);
  - Polish's Wujek spellings (*-éj*, *jeźli*);
  - a few real slips (*perchè*, *cheiíssima*, *Descansed*).

  A script then looked for double spaces, stray spaces before punctuation, doubled words, straight
  quotes and unbalanced brackets.
- **The reading.** A full reading of each language, against DO's files and the Latin, found what a
  spell checker can't:
  - real words in the wrong place (*Tú cólera*, *suplica*, *Cosi*, *nelle fede*);
  - missing or wrong punctuation;
  - capitals that contradict the text's own use.
- **The fixes.** Clear slips are fixed in `extra/<lang>/`, never in the modules:
  - as `[@file:section]` copies of DO's sections;
  - as psalm-line overrides;
  - as respellings in `spelling.txt`.

  Each has a comment saying what it fixes. Counts, as rows of the reviews; one override can fix a
  text in several places:

  | Language | Fixed | Skipped |
  |---|---|---|
  | English | 24 | 4: the In manus rows (below), and the Per Dominum, a question of wording |
  | Français | 20 | 4 |
  | Español | 18 | 4 |
  | Italiano | 25 | 15 |
  | Português | 7 | 0 |
  | Polski | 35 | 16 |

  Every one was checked in the module diff.
- **What changed in English.**
  - Ps 69 "’T is well" became "’Tis well". The Psalm 69 override gives both of the repeated `69:4`
    lines, because the *n*-th line replaces the *n*-th (§7g).
  - `spelling.txt` gained *gray* and *sepulcher(s)*, and *mercy’s* and *world’s* with a curly
    apostrophe like the rest of DO's English.
  - The Easter-octave antiphon's capitals.
  - All Souls' "Deliver their souls, O Lord." (DO's own `Commune/C9`).
  - The Alma Redemptoris Mater's punctuation, and "by that joy".
  - "our Lord" in the Christmas collect.
  - In the Regina cæli, "O Queen of heaven, rejoice!" and "For he whom".
  - In the Salve, "Hail, holy Queen", "in this valley of tears", "O holy Mother of God", and in
    its collect "who, by…" and "thy Son".
  - "thee" and "today" in the Ascension doxology.
  - The Holy Family doxology's capitals.
  - The Transfiguration doxology's "blest" and "ages’".
- **What was left alone in every language.**
  - **The capital after the In manus `*`** stays, also where the fully notated form drops the `*`
    (§7g). The app's own Latin chant does the same ("Dómine, * Commendo", and "Dómine, Commendo"
    in `_full`), so the translations mirror the chant.
  - **Questions of wording** went to the native readers' checklist, not into the modules. Among
    them:
    - English's "Holy Spirit" beside "Holy Ghost", the Wednesday antiphon (a mistranslation),
      and the Per Dominum's word order;
    - Italian's two mistranslations, "del suo popolo" and "Hanno allontanato", and "fa"/"fa'";
    - French's *Vous*/*vous* for God;
    - Spanish's *Ti*/*ti*.
- **Re-import.** `node tools/do-import/import.js en fr es it pt pl la-bea` gives the same files twice
  over. The coverage is unchanged: 26/26 sections and 87/87 texts in each language, every Latin unit
  matching, and Spanish sung on 17 of 17 tones and English on 16. Latin-Bea doesn't change.

**The native readers' checklist** is `tools/do-import/native-review.md`, one section per language.
It has each text written for the app, with its reason:
- the Spanish doxologies and the three rewritten lines;
- every language's priest's forms (§7g);
- the Polish and Spanish All Souls collects;
- the Jube forms;
- Spanish Ps 4:5;
- the Italian psalm verses without DO's brackets;
- the English and Spanish hymns, to be sung aloud.

It also has the questions of wording, and the possible slips only a native reader can settle
(Polish *powienie*, *szędziwości*). The full reviews, with a reason for each row, are in the Phase 8
hand-over notes.

**The report to DO** is drafted per language: file, section, line, the text, the fix. It has 111
items and two notes on verse keys:
- Italiano's and Polski's `11:6` for `11:6b` (§2);
- Latin-Bea's shifted keys (§7h).

It isn't filed. Once DO fixes a slip, the override can go at the next re-pin, and the importer
shows an override that no longer changes anything.

**Credits and license.** `index.html` has a `<footer id='credits'>` at the end of the page. It is
shown in "Latin & translation" and "translation only", hidden in Latin only, and printed.
- "Translations: Divinum Officium (divinumofficium.com), MIT license." is a `<details>`. Opening
  it loads `js/i18n/LICENSE-divinum-officium.txt` with `$.get`, which works in Cordova as the
  psalm fragments do. The license's paragraphs are rewrapped to the page.
- There are no links, so nothing navigates the Cordova app's web view away.
- Below it, a line for each language that has text written for the app, picked by
  `data-credit-lang` (`showCredits` in `js/compline.js`):
  - every language but Latin-Bea: the texts DO doesn't have, such as the priest's forms;
  - English: the literal hymn is Britt's (1922), and the doxologies he doesn't translate, with
    the metrical Easter doxology, were written for the app;
  - Español: the doxologies in eight-syllable verse were written for the app, and three of DO's
    lines rewritten.

**Accessibility.**
- **The page's language.** `<html lang='en'>` is new: the page's own text (rubrics, menus) is
  English, and it had no `lang`.
  - `hyphenate.js` treats that root `lang` as "don't hyphenate", so no English text gained soft
    hyphens. Checked: none in the rubrics, labels or credits.
  - A chant's own words had no `lang` either, so they now inherited English. `markLang` in
    `chant-element.js` gives them one:
    - each SVG and plain-text block is `la`;
    - an SVG is the translation's `lang` (`textMode.langAttr()`) where the hymn is sung in it;
    - red labels get none;
    - a block that already holds `lang`ed parts (`.tr-pair`, `.chant-tr`, `.verses`) is skipped.

  Every translation block already had its `lang` (`la-x-bea` for Bea).
- **Labels.** Five controls had no accessible name: Region, Theme, the date, the feast menu and
  the Marian antiphon menu. They have an `aria-label` now, which changes nothing on screen.
  Every other control is inside its `<label>`.
- **Contrast** (WCAG), light and dark:
  - text 21:1;
  - translation and credits (`--tr-color`) 7.5:1 light, 10.9:1 dark;
  - rubrics 5.2:1 light, 7.3:1 dark;
  - links 4.6:1 light, 9.4:1 dark;
  - the dark menu 17.4:1.

  All pass AA.

**Layout and print.**
- At 1400 px in "Latin & translation", nothing is wider than the page.
- Print with real print media (`print.mjs`), on Sunday 2026-11-08:
  - Latin only: 7 pages, no credits;
  - English in "Latin & translation": 11 pages; in "translation only": 6 pages;
  - Polski: 10 pages;
  - Latin-Bea: 8 pages, with the DO line only;
  - Español with the hymn sung and the psalms fully notated: 13 pages.

  The translations are beside the Latin, the credits at the end, and the license closed to its
  summary.

**Checked in the browser** with Phase 4's `check.js`, after the fixes:
- **Dates:** an ordinary Sunday and Wednesday, All Souls, Holy Thursday, Good Friday, Easter
  Monday, Christmas and a Paschaltide Wednesday.
- **Languages and modes:** all six languages in "Latin & translation" and "translation only",
  and English and Español with the hymn sung.
- **Results:** every run passes, and the credits show the right lines for each language.
  - The sung hymn's SVGs have the translation's `lang`.
  - In Latin only, the credits are hidden.
  - Latin-Bea gives what §7h describes: `check.js` isn't Bea-aware, so it flags the
    `tr-same` texts, as expected.

**The build.** `gulp` (Node 22) copies everything §6 lists into `dist/`:
- the seven language modules and `LICENSE-divinum-officium.txt`, the same as `js/i18n/`;
- `js/hyphenation/` and its license;
- all 26 font files: the `-ext` and `-vi` subsets and `crimson-undertie`.

`dist/index.html` has the footer and `lang`, and `dist/js/compline.js` has the new code.

The built `dist/`, served on its own, was checked with `check.js`:
- Latin only, then each of the seven languages in both modes, on a Sunday and a Paschaltide
  Wednesday. Every run passes, with the right credits in each.
- Three runs in the first pass did fail: English and French in "Latin & translation", while each
  language loaded for the first time in a hidden browser pane. They pass on a re-run with 3 s for
  each date.
- The license opens.
- A French page loads `crimson-roman-ext.woff2`. There were no console errors.

**After the code review, at the user's request.**
- **The capitals after the sung hymn's drop cap** follow the rule the Latin GABC files already
  keep (`raiseDropCapCaps` in `chant-element.js`):
  - none where the first syllable is a single letter ("A-ve", Spanish "A Ti");
  - the whole word where it is one syllable of three letters ("HÆC");
  - otherwise the first two letters ("TE", "AL-ma", "SAl-ve", "FRa-tres", English "BE-fore").
  
  They are put in when the hymn is drawn, so `hymn-sung.txt` keeps the text as written.
- **"Translation only" for each section** (§4c). Each block of text now has its own mode class in
  place of the one on `<body>`. `text-mode.js` gives each block its section's mode (`modeOf`), and
  `style.css` reads the class on the block. The Text menu's mode stays on `<body>` as
  `page-text-<mode>`, for the menus. Checked:
  - Psalms in English with the rest in Latin;
  - in "Latin & translation", the chapter and the sung hymn in English only, the chapter one column
    wide;
  - "Other chants" to "Translation only" and back, which once left "Everything else" behind;
  - `check.js` in both modes, in each of the six languages, on eight dates.

**Rubrics in the translation's language** (§4d), at the user's request. Claude drafted the 48 rubrics of each of es, fr, it, pt and pl, which DO doesn't have (`extra/<lang>/rubrics.txt`), and they are on the native readers' checklist. Checked:
- each language and English and Latin-Bea, switched in the menu and back;
- "Latin" with the psalms on "Translation only";
- the headings, pointed and fully notated;
- the Triduum's and All Souls' rubrics around the Latin "Pater noster" and "Orémus";
- `check.js` in both modes, in each of the six languages, on eight dates, with a new check that no visible rubric is left in English.

The English hymn rubric said "All bow slightly for the first three stanzas of the third verse". It now says "the first three lines of the third stanza", where the doxology names the Trinity, as the drafts do.

**Left for later:**
- the native readers' checklist, and any fixes it brings;
- the publishing steps, each on the user's yes;
- the rubric glosses in "translation only" (§7f);
- a phone's 60% lyric size (§7f);
- the timings on a real phone (§7a).

---

## 8. Unrelated things noticed (not fixed)

- **`gulp` doesn't run under Node 26:** `buffer-equal-constant-time` (under `jwa`, which a gulp plugin pulls in) uses `SlowBuffer`, which Node 25 removed. It builds under Node 22. Found in Phase 4.

Fixed since this list was first written:

- The `setPsalms` early-return guard, which never matched. It now compares against what is on screen.
- The "consciense" typo in `index.html`.
- The stale `sw.js` cache list, which also had 8 entries for files that no longer exist, so the service worker couldn't have installed. Registration is still commented out.
- On All Souls Day, `setCanticle('-asd')` asked for `canticle-ant-asd.gabc`, which never existed. There is no Nunc dimittis antiphon that day, so it is now left out.
- The gulp `copy` task now excludes `platforms/` and `.claude/`, so a local Cordova build or Claude worktree no longer puts extra copies of the chant files into `dist/`.
- **A feast on a Sunday was lost** (found in Phase 4). `getFeastForDate` returned the Sunday without looking at the saints' days, so All Saints on Sunday 2026-11-01 and the Assumption on Sunday 2027-08-15 showed as Sundays after Pentecost. Sundays now follow the 1960 precedence (`outranksSunday` in `js/calendar.js`): a II class Sunday gives way to every I class feast and to the II class feasts of the Lord (marked `lord:1`: the Purification, the Transfiguration, the Exaltation of the Cross and the Lateran's dedication, as in DO's `Festum Domini` rule); a I class Sunday gives way only to the Immaculate Conception and the Vigil of Christmas. Regional feasts follow the same rule, and All Souls still moves to Monday. Trinity Sunday and Christ the King are now I class, so Trinity Sunday gets the Solemn tone. The Marian feasts were also missing the `ol:1` the Our Lady Te lucis rule reads, so the Assumption had the Solemn tone even on a weekday; they all have it now, except the Seven Sorrows, which has its own tone. Checked in the browser on those dates and on the Purification, Transfiguration, Exaltation and Lateran on Sundays, the Immaculate Conception on the 2nd Sunday of Advent, Christmas Eve on the 4th, Ss. Peter and Paul, St. John the Baptist, St. Joseph the Workman, St. George in England, and Sundays a II class feast doesn't displace (the Immaculate Heart, a vigil, the Sunday within the Christmas octave, Passion Sunday with St. Patrick in Australia).
- **The feast menu didn't preselect the user's region** (found with the Sunday precedence, like the five below). `localStorage.region` holds a code (`US`, `GB-ENG`), but `setDate` looked for it among the alternates' region names (`United States`, `England`), so the menu showed the universal entry while the office followed the regional feast. The date now passes the region's name (`regionCodeMap`). And choosing the universal entry passed `''`, which `getSanctoralFeast` ignored in favor of the stored region, so the menu changed nothing; it now keeps the region it's given. Checked: US on 2025-12-12 preselects Our Lady of Guadalupe with the Our Lady tone, and choosing the feria gives the Advent tone; England on Sunday 2023-04-23 preselects St. George (Solemn), and choosing the Sunday gives the Easter tone; Wales, where St. George is II class, keeps the Sunday; no region keeps the universal entry; the US Immaculate Conception on 2026-12-08.
- **The Lent and Passiontide Sundays and Low Sunday showed as "II Class".** They are I class now. To keep a I class Sunday from counting as a I class feast, `SundayFeast` marks a Sunday's office `sunday:1`, unless a feast takes its place (an `isFeast` callback: Trinity Sunday, Christ the King, the Holy Name, the Holy Family), and `firstClassFeast` leaves out what's marked. The precedence reads the Sunday's rank, so `firstClassSundays` is gone. Checked: the four Lent Sundays (Lent tone), Passion and Palm Sundays (Passiontide tone and *In manus*), Low Sunday (Easter tone), the Advent Sundays (Advent tone), Passion Sunday 2024-03-17 with St. Patrick in Australia (still the Sunday).
- **When Christmas is a Sunday, the Sunday within the Octave is now on 30 December,** as in DO's 1960 transfer table for dominical letter b (`12-30=Tempora/Nat1-0`). DO takes the letter from Easter, so in a leap year it is the letter after 29 February, and the rule is simply "Christmas is a Sunday". Checked: 2016 (a leap year), 2022 and 2033 show the Sunday on Friday the 30th with Sunday psalms, and the 29th and 31st are unchanged; Sundays 26 December 2021 and 2027 and 31 December 2028 are still the Sunday within the Octave, and the 30th in those years is the VI day.
- **The Sunday of the Holy Family was titled "1. Sunday after Epiphany".** It is now "The Most Holy Family of Jesus, Mary, Joseph (II Class)", and isn't marked as a Sunday. The Sundays' `key`s aren't read outside `js/calendar.js` (and `SundayFeast` fills `key` from the title anyway), so they are unchanged. Checked: 2026-01-11, 2029-01-07 (Epiphany on Saturday) and 2030-01-13 (Epiphany on Sunday); the 2nd Sunday after Epiphany is unchanged.
- **Some Te lucis rules started on the eve of a II class feast.** In 1960 a II class feast has I Vespers only if it is a feast of the Lord on a Sunday (`horascommon.pl`), so the Seven Sorrows has no eve, and on a Sunday it gives way to the Sunday (`select-date='sevenDolors' select-day='!sunday'`); the Transfiguration's eve counts only when it's a Saturday; the Holy Family, always a Sunday and marked `Festum Domini` in DO, keeps its eve, except when the eve is the Epiphany, whose II Vespers outrank it (`!epiphany`). Christ the King and the Sacred Heart are I class and keep their eves. Checked: Sunday 2025-09-14 (the Exaltation) now has the Ordinary tone, Monday the 15th the Seven Sorrows; Sunday 2024-09-15 has the Ordinary tone; Saturday 2028-08-05 has the Transfiguration tone, but 2026-08-05 and 2027-08-05 have Our Lady's (the Snows); 2029-01-06, the Epiphany on a Saturday, has the Epiphany tone, while Saturdays 2026-01-10 and 2030-01-12 have the Holy Family's; the eves of Christ the King (2026-10-24) and the Sacred Heart (2026-06-11) are unchanged.
- **The Advent, Lent and Easter Te lucis rules didn't except I class feasts,** though their notes say so. They now have `select-day='!firstClassFeast'`, which the I class Sundays pass (above). Checked: St. Joseph the Workman on Sunday 2022-05-01 and Monday 2023-05-01, St. Joseph on 2026-03-19 (Lent) and 2027-03-19, St. George in England, and St. Francis Xavier in Australia (2026-12-03, Advent) have the Solemn tone; the Immaculate Conception on the 2nd Sunday of Advent (2030-12-08) has Our Lady's; ferias in Advent, Lent, Passiontide and Paschaltide keep their tones.

The checks above were run in the browser on top of a re-check of the Sunday-precedence dates above (All Saints, the Assumption, the Immaculate Conception, the Advent and Lent Sundays, Trinity, Christ the King, the Purification, Transfiguration, Exaltation and Lateran on Sundays, Christmas Eve on the 4th Sunday of Advent, Ss. Peter and Paul, St. John the Baptist, the Immaculate Heart, an ordinary weekday and Sunday), with nothing changed but the tones listed above, and no console errors.

- **Setting a date threw when 19 March fell in Holy Week** (2008, 2035; found while fixing the six items above), for every user. St. Joseph was moved after Low Sunday, but Canada's St. Joseph stayed on 19 March, so `getSanctoralFeast` set `alternates` on the dropped universal entry (`null`), and with Canada chosen `setDate` read `null.region`. The review fix to the Sunday precedence made a moved St. Joseph's day a feria with its regional alternates, which stopped the error but still offered Canada's St. Joseph on 19 March. DO has no Canadian calendar; its 1960 transfer tables move the one `03-19` office, out of Holy Week and off a Sunday. So Canada's St. Joseph now goes with `dates.stJoseph`. Before, Canada's St. Joseph was never offered on the day St. Joseph was kept; now the menu offers it, as for the other regional feasts. Checked with no region and with Canada: 2008-03-19 and 2035-03-19 are ferias; St. Joseph, with Canada's as the alternate (preselected for Canada), is on 2008-03-31, 2035-04-02, 2027-03-19 and Monday 2028-03-20; Sunday 2028-03-19 is still the 3rd Sunday of Lent. No console errors.

---

## 9. Open questions

None at the moment.

Resolved:
- Latin-Bea is for comparison only and is never sung (§2b).
- Hebrew, Bohemice and Polski-Newer are left out, and so is Cesky-Schaller, which has only 3 psalms (§3).
- New users default to Latin only. When they turn translations on, the language defaults to the browser language (§5).
- The literal English hymn comes from Britt (1922) where his first edition has it, and the doxologies it lacks are written for the app in his manner and reviewed by the user (§7i).
- Spanish: DO's three lines of nine sung syllables are rewritten to eight, and the new lines are the metrical text too (§7i).
- When the hymn isn't sung, the user chooses literal or metrical with `hymnMode` (default literal) (§4b, §5).
- The English Pentecost doxology in DO is correct, and the earlier flag on it was withdrawn (§4b).
- English Easter doxology: the line-by-line text "All glory to the Father be…" (§4b).
- Spanish Easter doxology: the *á–e* version, "Gloria‿al Padre, gloria‿al Hijo / que de la muerte‿hoy renace…", matching the hymn's assonance, with underties marking each synalepha (§4b).
- Languages at launch: only those with 100% of the texts, which is English, Français, Español, Italiano, Português and Polski, plus Latin-Bea for comparison (§2). Magyar, Deutsch, Vietnamice, Nederlands, Dansk and Magyar-Kaldi wait until their gaps are filled.
- Translation only hides the notation and shows the text; a missing translation falls back to Latin (§4).
- Notation: every section can be plain text, pointed (where a pointed form exists) or fully notated (§4c).
- Notation menus: six of them. The hymn and the Marian antiphon each get their own, apart from "Other chants", so people can recite the office and sing just those two (§4c).
- Inline style: a translation block after each stanza or verse (§4).
- Fully notated psalms in `both` mode are split into one score per verse (§4).
- Rubrics and menus stay in English (§4).
- Spanish: metrical doxologies drafted for every season, so Spanish can be sung all year (§4b). The seven new texts are approved for now. They are set under the chant on a private review page (https://claude.ai/artifact/JUuq3qhk3AL2rtCKFgX3H3); a native speaker should check them before release (Phase 8).
- Dutch stays unsung in the five seasons whose DO doxologies are untranslated (§4b).
- DO provenance: rely on DO's MIT licence (§2).
- DO data: pin a commit and re-import by hand, with a typo pass before the first release (§7, Phases 0 and 8).
- Rollout: website first. It barely matters, but a fix to the website is live at once, while an app update waits for store review and for users to update, so a short web-only period catches the typos that slip through. Then the Cordova release (§6).
