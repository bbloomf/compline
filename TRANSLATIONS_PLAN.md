# Translations for Compline: plan (rev. 2, multi-language from Divinum Officium)

Status: plan only, nothing implemented. Rev. 3 (2026-10-24) records the answers to the open questions, the full coverage check, the notation levels with six menus (§4c) and the Spanish doxologies. Written against `master` @ 28f86f6, with Divinum Officium (DO) `master` @ b9064d7 (2026-10-23) checked out sparsely for the research below.

**What changed from rev. 1:** every translation now comes from the [Divinum Officium](https://github.com/DivinumOfficium/divinum-officium) data files (MIT licence), not hand-collected sources. That means the app can offer **every language DO has**, and Latin-Bea, instead of English only.

Goal: one setting for **what to show** (Latin / Latin + translation / translation only) and one for **which translation**. At launch that's the six languages that have every text the app uses: English, Français, Español, Italiano, Português and Polski, plus Latin (Bea) for comparison (§2). A third setting chooses, per section, **plain text, pointed or fully notated** (§4c). Latin-Bea is **for comparison only**. The chant and the sung psalter stay Vulgate.

---

## 1. How text gets on the page today

The Latin comes from three places. Each needs its own way of adding the translation.

| Source | What it holds | How it renders |
|---|---|---|
| **Static HTML in `index.html`** | Confiteor (two forms), Misereatur (three forms), Indulgentiam, the versicles, the pointed chapter (`.pointed-chapter`), the pointed collect and Marian prayers (`.pointed-prayer`), the Marian V/R pairs, *Benedicat*, *Divinum auxilium*, the Triduum and All Souls texts. Rubrics are in English (`.red`). | Plain HTML, shown and hidden by `[include]`/`[exclude]` (date rules in `setDate`), `.officiant.*`, `.marian-antiphon.*` and the `fullNotation*` toggles. |
| **GABC files** (root, `te-lucis/`, `in-manus-tuas/`, `marian-antiphon/`, `psalms/`) | Every chanted text. The Latin exists **only** in the GABC lyrics. A file can hold several scores (split by `regexGabcHeader`), and stanzas or V/R parts are often blank-line paragraphs. | `<chant-gabc src=…>` → `ChantVisualElement.setGabc()` → exsurge → SVG. The `user-notes` and `commentary` headers become red labels (for example `user-notes: Psalm 4.`). |
| **Pointed psalm and canticle HTML** (`psalms/<day>/psalm-verses[-PT\|-triduum].html`, `canticle-psalm[-po\|-asd].html`) | Verses 2…n as `<div class="verses"><p><span class="verse-number">N.&nbsp;</span>…</p>`, with `<i class='red'>Psalm 90</i>` headings between psalms. | Fetched with `$.get` in `setPsalms`/`setCanticle`. Verse 1 is the chanted `psalm.gabc`. With `fullNotation` on, everything comes from `psalm_full.gabc` (one line per verse, `N. ` prefix, one score per psalm). |

Facts that still apply:

- **The same psalm text is repeated across files.** The normal, `-PT` and `-triduum` files differ only in pointing (or in leaving out the Gloria). So key translations by **psalm and verse**, not by file.
- **Psalm parts restart their numbering** (`Psalm 7. I.`/`II.`). The Gloria Patri and Sicut erat are the last two numbered verses of each psalm, and the Triduum leaves them out. In total there are about 307 chanted verse lines, about 260 of them unique.
- **Regional and seasonal variants only choose files.** `calendar.js` chooses which variant file to use and has no per-region texts. Feast titles in `calendar.js` are in English.
- **The bundled exsurge supports Gregorio translation lines.** The minified `js/exsurge.js` has `TranslationText` and the lyric syntax `/\[(alt:)?(.*?)\]/`, so `syl[translation](notes)` and `[/]` spans work. This is untested; see Phase 0.
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
- I compared each language's verse keys against Latin for the 20 Compline psalm files (19 psalms plus Nunc dimittis). Number of files that don't match:

| Language | Mismatches (of 20) | Note |
|---|---|---|
| English, Español, Italiano, Polski, Magyar-Kaldi | 1 | |
| Deutsch | 2 | |
| Français, Português, Nederlands, Magyar, Dansk, Vietnamice | 0 | |
| Hebrew | 13 | Masoretic text, not a translation of the Vulgate, and right-to-left |
| Bohemice, Polski-Newer | most | Psalms missing (no Nunc dimittis, and so on) |
| Latin-Bea | n/a | Different verse division, see §2b |

  The importer should match by **key**, and report anything that doesn't match, rather than relying on line counts.

  The one-file mismatches are **typos in DO's verse keys**, not missing text: English `122:2y` for `122:2a`, and Italiano and Polski `11:6` for `11:6b`. The importer maps them with an override. Deutsch is different: its Ps 60 has **no verse 9**. Its verse 8 is a rhymed couplet that covers the content of both 8 and 9, so it can't be split.

### Coverage of every text the app uses (decided: launch only languages at 100%)

Checked section by section against the DO checkout: the 20 psalm files by verse key; from `Minor Special.txt` the hymn, lesson, chapter, responsory, versicle and *Salva nos*; from `Prayers.txt` the Confiteor, Misereatur, Indulgentiam, *Converte nos*, *Deus in adjutorium*, *Adjutorium nostrum*, *Jube domne*, the blessing, *Visita*, *Divinum auxilium*, Gloria, Alleluia, *Benedicamus*, *Dominus vobiscum* and *Tu autem*; the five Marian antiphon sections; the six seasonal doxologies; the feast doxologies for the Transfiguration (`Sancti/08-06`), Christ the King (`Sancti/10-DU`) and the Holy Family (`Tempora/Epi1-0`); and the Triduum *Christus factus est* (`Tempora/Quad6-4`, `Quad6-5`). A section counts as missing if it's absent or still in English or Latin.

| Language | Result | What's missing |
|---|---|---|
| **English, Français, Español, Italiano, Português, Polski** | **100%** | Nothing. (English, Italiano and Polski need the verse-key override above.) |
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
  import.js          # node script: reads a pinned DO checkout, writes js/i18n/<lang>.js
  manifest.json      # app text key -> DO file/section (+ transforms)
  DO_COMMIT          # pinned DO commit hash
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

Modes are set as body classes: `text-la` | `text-both` | `text-tr`. Every text node gets a correct `lang` attribute. All the included languages are left-to-right.

### Latin + translation (`both`)

| Content | Display |
|---|---|
| HTML prayers and versicles | Wider than about 768 px: CSS grid with **Latin on the left, translation on the right**, rows aligned. Narrow screens: **stacked**, with the translation under each Latin paragraph in a quieter style, distinct from the red rubrics. |
| Pointed psalms | After the fragment loads, add a translated `<p>` after each Latin `<p>`, matched on `.verse-number`, so verse pairs fall into the same grid or stack. Verse 1, the chanted intonation, gets its translation under the `<chant-gabc>`. |
| Pointed chapter and prayers | The translation block follows the pointed Latin, as plain text without pointing. |
| Short chants, antiphons, responsories, hymn | **Decided:** a translation block after each **unit**. `chant-element` splits the source into scores or blank-line paragraphs (copying the clef onto each later one), renders each, and adds the unit's translation underneath. The hymn becomes stanza, translation, stanza, translation. |
| Fully notated psalms | The same, at **verse** level (decided): split each psalm score at `^\d+\. ` lines. The Phase 0 spike checks layout time on a phone; the fallback is one block per psalm. |
| Later, optional: interlinear | Exsurge's translation line under the staff, for short chants, if the spike shows the spacing holds. |

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
Rubrics, menu labels and feast titles (`calendar.js`, 344 entries) **stay in English** (decided). The translation setting only affects liturgical text. Localising the interface is a separate, optional phase. DO has feast titles per language in its `Sancti/` files, but mapping them to `calendar.js` is real work. In translation-only mode, rubrics that quote Latin cue words ("Tu autem…nobis", "Dómine", "Orémus") can get a gloss.

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

---

## 5. Settings

Follow the existing pattern (localStorage strings plus controls in `#options-menu`). These are multi-valued, so use `<select>` like `#selectRegion`. They don't fit the boolean `input[toggle]` map.

| Key | Values | Default | Control |
|---|---|---|---|
| `textMode` | `'la'` \| `'both'` \| `'tr'` | `'la'` | "Text: Latin / Latin & translation / Translation" |
| `trLang` | `'en'`, `'fr'`, `'es'`, `'it'`, `'pt'`, `'pl'`, `'la-bea'` at launch (the languages at 100%, §2) | **not stored** until the user picks one. Until then it is worked out each time from the browser: the first entry in `navigator.languages` whose main part (`de-AT` → `de`) is an offered language, else `'en'`. Latin-Bea is never picked automatically. | "Translation: …", disabled while `textMode == 'la'`. When the user switches Text away from Latin, it already shows the browser-language choice. Bea is listed as "Latin (Pius XII psalter)". |
| `hymnMode` | `'literal'` \| `'metrical'` \| `'sung'` | `'literal'` | `<select>` "Hymn: Literal / Metrical / Sung with chant", next to the Te lucis tone selector. Hidden while `textMode == 'la'`. Choices the language can't provide are disabled; fallbacks are in §4b. |
| `notationPsalms` | `'text'` \| `'pointed'` \| `'full'` | `'pointed'` | "Psalms: Plain text / Pointed / Fully notated" (§4c). Replaces the `fullNotation` checkbox. |
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
| **0. Decisions and spikes** | Answer §9. Pin a DO commit (decided: re-import by hand; the data should rarely change). Spike (a) exsurge `[translation]` lines and (b) splitting scores into units (layout time on a long full psalm on a phone). | ½–1 day |
| **1a. Notation levels** (§4c) | The six `notation*` selects and their migration, body classes, CSS that switches off the pointing, and the GABC plain-text renderer in `chant-element`. Independent of translations; can ship on its own first. | S–M: about 150 lines |
| **1. Display infrastructure** | `js/text-mode.js` (settings, body classes, query parameters, lazy `require` of `i18n/<lang>`), the menu `<select>`s, `[lang]`/grid/stack/print CSS, the notated-toggle refactor, `chant-element` unit splitting with translation blocks plus the translation-only text render, the psalm-verse interleaver, `data-tr` filling for `index.html`, and the missing-text fallback. Test against a hand-written `en.js` stub. | M: about 400 lines, 1–2 days |
| **2. DO importer: psalter** | Section ranges from `Psalmi minor`, key-matched extraction, fuzzy alignment against the app's Latin, Gloria split, marker handling, mismatch report. | M: about 1 day |
| **3. DO importer: everything else** | `manifest.json` for about 60 keys (index HTML prayers, about 40 chant files, 17 Te lucis files built from the hymn plus a doxology, Marian antiphons and collects), the `@`/`$`/`&`/`s///` resolver, the 1960 variant choice, generated Paschal alleluia forms, splitting into units. | M–L: 1–2 days, mostly mapping |
| **4. English end to end** | Generate `en.js`, check every part of the office in all three modes (Sunday, weekdays, PT, Easter octave, Triduum, All Souls, each Marian season, each Te lucis tone). Fix the manifest. | M |
| **5. More languages** | Run the importer for fr, es, it, pt, pl and la-bea, confirm 100% in the coverage report, add font subsets, spot-check each language (ideally with a reader of that language). | S–M, mostly QA |
| **6. Latin-Bea as a comparison text** | Verse-group pairing with a block fallback. Suppress the "translation" where Bea is identical to Latin. | S |
| **7. Hymn: literal and sung** | Literal: the extra-text merge in the importer, plus the English literal hymn and doxologies (content). Sung: hyphenation drafts, the hand-reviewed `hymn-sung.txt` per metrical language, the validator (note count, stanzas, each doxology against each of the 17 tones), lyric swapping in `chant-element`, the `hymnMode` select with its fallbacks and disabled choices, merging the `extra/` overrides (Britt's literal English, the new English and Spanish Easter doxologies). Check every tone in en and es. | M code (about 150 lines) + S per language to review hyphenation. Entering Britt's English and checking his doxology coverage: S. Entering the Spanish doxologies: S. |
| **8. Release** | **Typo pass** over every generated language file and the `extra/` texts (spell-check per language, plus reading the new hymn texts aloud, and a native speaker's check of the Spanish doxologies); fix in `extra/` overrides and report upstream to DO. Wide-screen layout polish, print, accessibility, credits/licence in the app ("Translations: Divinum Officium, MIT", plus the source of the literal hymn), gh-pages publish, Cordova merge, rebuild and store submission. | M |
| *9. Optional* | Localise the interface (rubrics, menu, feast titles), exsurge interlinear lines. Out of scope: singing anything in the vernacular other than the hymn, and singing the Bea psalter. | M–XL each |

Phases 2–3 can run in parallel with Phase 1 once the module format (`psalter`/`texts`/`meta`) is agreed.

---

## 8. Unrelated things noticed (not fixed)

Nothing outstanding. Fixed since this list was first written:

- The `setPsalms` early-return guard, which never matched. It now compares against what is on screen.
- The "consciense" typo in `index.html`.
- The stale `sw.js` cache list, which also had 8 entries for files that no longer exist, so the service worker couldn't have installed. Registration is still commented out.
- On All Souls Day, `setCanticle('-asd')` asked for `canticle-ant-asd.gabc`, which never existed. There is no Nunc dimittis antiphon that day, so it is now left out.
- The gulp `copy` task now excludes `platforms/` and `.claude/`, so a local Cordova build or Claude worktree no longer puts extra copies of the chant files into `dist/`.

---

## 9. Open questions

None at the moment.

Resolved:
- Latin-Bea is for comparison only and is never sung (§2b).
- Hebrew, Bohemice and Polski-Newer are left out, and so is Cesky-Schaller, which has only 3 psalms (§3).
- New users default to Latin only. When they turn translations on, the language defaults to the browser language (§5).
- The literal English hymn comes from Britt (1922), once his doxology coverage and public-domain status are confirmed (§4b).
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
