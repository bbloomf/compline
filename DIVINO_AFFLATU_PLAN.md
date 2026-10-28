# Compline under the rubrics of Divino Afflatu (pre-1955): plan

For [issue #13](https://github.com/bbloomf/compline/issues/13). Status: Phase 1 done (2026-10-28).

The office as it stood from Pius X's reform (Divino Afflatu, 1911) until the simplification of 1955 (*Cum nostra hac aetate*). Divinum Officium (DO), the source of the translations, has this as its "Divino Afflatu - 1954" version, which can serve as the reference throughout.

## Phase 1: the choice, and what doesn't depend on the day (done)

- `#selectRubrics`, next to the date: "1960 rubrics" (`1960`) or "Divino Afflatu (pre-1955)" (`DA`), kept in `localStorage.rubrics`. `calendar.setRubrics` keeps the choice, and `include='divinoAfflatu'` (or `exclude=`) shows a part of `index.html` only under one or the other.
- After *Adjutorium nostrum*: the *Pater noster* said silently throughout (`pater-silent`), where 1960 has the examination of conscience (`examen`). DO's `Ordinarium/Completorium.txt` shows `$rubrica examen` only for 1960.
- After *Divinum auxilium*: the *Pater noster*, *Ave Maria* and *Credo*, said silently, and the rubric for when Matins follows (`pater-ave-credo`, `pater-ave-credo-matins`). DO drops these for 1955 and 1960. The texts come from DO's `Prayers.txt` (`index:pater-noster`, `index:ave-maria`, `index:credo` in `tools/do-import/manifest.json`). The rubrics are drafted in each language's `extra/<lang>/rubrics.txt` for the native readers to check.
- Until Phase 2, a note under the date says that the calendar is still 1960's.

## Phase 2: the calendar

Everything that remains depends on the day's office under the old rubrics. Its rank is double, semidouble or simple, rather than a class.

- The sanctoral: DO's `Tabulae/Kalendaria/1939.txt`, with the changes in `1954.txt`, which are all that file holds. The ranks are DO's numbers: 1 is simple, 2 semidouble, 3 double, 4 greater double, 5 double of the II class and 6 double of the I class.
- The temporal cycle: the Sundays (semidouble, but greater and of the I or II class in the privileged seasons), the ferias, the vigils and the Ember days.
- The octaves (privileged of the 1st to 3rd order, common and simple) and the days within them, which also decide the preces.
- Occurrence and transfer, by the old tables. A feast impeded by a higher one is transferred or commemorated, and the rules differ from 1960's.
- Concurrence: Compline follows Vespers, so it belongs to tomorrow's office when tomorrow's First Vespers prevail. This happens much more often than in 1960, where only I class feasts and Sundays have First Vespers. The feast shown, and everything in Phase 3, should come from the office that Vespers were of.
- The regional calendars as they stood before 1955. **Question:** keep the regions, or only the universal calendar at first?
- **Recommendation:** build it from DO's tables, so that the app still works offline. The restorethe54.com ordo's JSON (from the issue's comments) is a good cross-check, but it would put the app online.

## Phase 3: what follows from the day

- **The psalms:** check DO's rules for which offices take the Sunday psalms at Compline under DA. Relabel "Sunday at Compline (First or Second Class Feast)" to match.
- **The antiphon:** on a day that isn't a double, only its opening words are said before the psalms, and it's said in full after them. On doubles it's said in full both times, as now. Each day's `psalms/<day>/ant.gabc` needs its intonation, as a file of its own or cut from it.
- **The preces** (DO's `specials/preces.pl`), after the canticle's antiphon:
  - *Dominicales*: on semidoubles, simples and ferias, but not within an octave, nor when a double or an octave is commemorated.
  - *Feriales*: on the ferias of Advent, Lent and Passiontide, on Ember days, and on the vigils outside Epiphany and Paschal time. The texts are DO's `Psalterium/Special/Minor Special.txt`, `[Preces Dominicales]`.
- **The hymn:** the tones and doxologies under DA. The `te-lucis` `select-date` rules use 1960's ranks.
- **The Marian antiphon's seasons:** check for any change, e.g. *Alma* from First Vespers of Advent.

## Phase 4: checking

Compare a whole year, day by day, with DO's Divino Afflatu output: the office of the day, the psalms, whether the antiphon is doubled, and the preces. Then remove the Phase 1 note.
