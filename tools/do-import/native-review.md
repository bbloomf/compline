# Native-reader checklist (TRANSLATIONS_PLAN.md §7j)

These are the texts a reader of each language should check before the release, or soon after the
website goes out (§6: website first, then the app). The Phase 8 typo pass fixed the clear slips;
what is left here is either written for the app or a question of wording.

How to use it:
- Give each reader the section for their language.
- Each item is a box to tick, or a note of what should change.
- A change goes into `tools/do-import/extra/<lang>/`, never into `js/i18n/`. Then run
  `npm run import-do -- <lang>` (§7d).
- Many items are only questions. "Leave it as it is" is a fine answer.

For the wording questions, the module paths (`psalter.4[2]`, `texts.lesson.gabc[0]`) are where to
find the text in `js/i18n/<lang>.js`. Each language's full review, with the reasons, is in the
Phase 8 notes. The questions are summed up here.

---

## Español

### Written for the app: the hymn sung to the chant (`extra/es/hymn-sung.txt`)

Read each text aloud, then sing it to the Ferial tone. Each line has 8 sung syllables; `‿` joins
two vowels on one note.

- [ ] **The hymn, stanzas 1–2:** DO's text with one line rewritten. "y las nocturnas imágenes" had
  9 sung syllables; it is now "y visiones fantasmales".
- [ ] **Ferial doxology** (Ferial, Ordinary, Solemn, Advent, Lent, Passiontide): DO's, with two
  lines rewritten to 8 syllables:
  > Hazlo así, Padre amoroso, / Hijo al Padre semejante, / con el Espíritu reinas, / por siglos
  > interminables. / Amén.

  The reviewer noted the comma splice before "con el Espíritu reinas".
- [ ] **Easter and Pentecost:**
  > Gloria al Padre, gloria al Hijo, / que de la muerte hoy renace, / y al Paráclito divino, / por
  > siglos interminables. / Amén.

  Is "renace" right for *surréxit*? "divino" is added for the meter.
- [ ] **Christmas, Our Lady, Seven Sorrows:** Gloria a ti, Jesús bendito, / nacido de Virgen Madre, …
- [ ] **Epiphany:** … / que a las gentes te mostraste, …
- [ ] **Ascension:** … / que al cielo vuelves triunfante, …
- [ ] **Sacred Heart:**
  > Gloria a ti, Jesús bendito: / tu Corazón gracia esparce. / Con el Padre y el Espíritu, …

  The last two lines have no verb.
- [ ] **Christ the King:** … / del mundo Rey gobernante, …
- [ ] **Transfiguration:** … / que a los pequeñuelos te abres, …

  Are "pequeñuelos" and "te abres" natural here?
- [ ] **Holy Family:**
  > Jesús, que humilde quisiste / a tus padres sujetarte, / con el Padre y el Espíritu / siempre
  > gloria se te cante. / Amén.
- [ ] **Line 3 of the seasonal doxologies**, "con el Pa-dre‿y‿el Es-pí-ri-tu":
  - Can "dre‿y‿el" be sung on one note?
  - Read as verse rather than sung, does the line scan?

### Written for the app: the other texts (`extra/es/texts.txt`)

- [ ] **The priest's Confiteor:** "…a todos los santos y a vos, Padre…", with "roguéis".
- [ ] **The priest's Misereatur:** *vos* for one person, *vosotros* for the people.
- [ ] **Jube domne:** "Dígnate, Padre, dar tu bendición."
  - It addresses the priest as *tú* ("Dígnate", "tu"), but the Confiteor and Misereatur use *vos*.
  - Should it be "Dignaos, Padre, dar vuestra bendición"?
- [ ] **All Souls' collect** (DO has another prayer):
  > Sé propicio, Señor, te rogamos, a las almas de todos tus siervos y siervas, por las cuales
  > imploramos humildemente tu majestad: para que, por estos oficios de piadosa súplica, merezcan
  > llegar al descanso eterno.
- [ ] **Psalm 4:5** (DO has "…" for half the verse):
  > Temblad y no pequéis, † lo que decís en vuestros corazones, * reflexionadlo en el silencio de
  > vuestro lecho;

### Written for the app: the rubrics (`extra/es/rubrics.txt`)

Claude drafted all 48, from the English. Divinum Officium has only a few rubrics, and none of
these. Each entry has its English above it. Read them on the page in "Latin & translation".

- [ ] **Each rubric reads naturally** and uses the words a Spanish book of the old office would use.
- [ ] **Words chosen:** *Oficiante*, *Lector*, *Cantor*, *santiguarse*, *la oración* for the
  collect (DO's *Oración*), *la denudación de los altares*.

### Questions of wording in DO's Spanish

- [ ] "Ti" or "ti" for God: "en Ti" (Ps 90:2), and "A Ti, Creador" in the hymn.
- [ ] The In manus versicle "Tú, el Dios leal, nos librarás" is future tense; the Latin
  *Redemísti* is past.
- [ ] The *Visita* collect leaves out "et benedíctio tua sit super nos semper".
- [ ] Ps 102:17–18: DO has two lines where the Latin has three, so verses 5–6 of 102.II have
  nothing beside them. It also leaves out "super timéntes eum".

---

## English

The new texts were approved in Phase 7. What is left is to hear them.

- [ ] **The hymn sung:** sing the metrical text to two or three tones, Ferial and Easter at least.
  Easter's doxology was written for the app: "All glory to the Father be, / And to the Son, who
  from the grave / Arose; and to the Paraclete / Be glory through eternity."
- [ ] **The literal doxologies written for the app**, in Britt's manner: Christmas, the Epiphany,
  Easter, Pentecost, the Ascension, the Sacred Heart, the Holy Family and Christ the King
  (`extra/en/hymn-literal.txt`).
  - Christ the King has "who rulest the scepters of the world". "swayest" or "wieldest" would keep
    the image of *sceptra témperas*.
  - Britt's own Transfiguration doxology has "the Holy Spirit" where the app's have "the gracious
    Spirit".

### Questions of wording in DO's English

- [ ] **Holy Spirit / Holy Ghost:** "Holy Spirit" is in the *Benedicat*, the Advent Marian
  versicle and the Salve's collect; everything else says "Holy Ghost".
- [ ] **The Wednesday antiphon** (`psalms/5/ant`) mistranslates the Latin.
  - It reads "I have cried to the Lord with my voice, do not forget to show mercy, O God."
  - *neque obliviscétur miseréri Deus* means "and God will not forget to show mercy".
- [ ] **The Per Dominum:** "Through Jesus Christ, thy Son our Lord, Who liveth and reigneth with
  thee, in the unity…". Change it to the usual "Through our Lord Jesus Christ, thy Son, who
  liveth…"?
- [ ] **The Regina cæli collect:** "O God, who gave joy to the world" leaves out *dignátus es* and
  isn't in the *thee/didst* register.
- [ ] **The Advent Marian collect:** "by his Cross and passion". The Latin order is "passion and
  cross".
- [ ] **The blessing:** "May almighty God grant us…". The Latin is *Dóminus omnípotens*.
- [ ] **Small points:**
  - "Brothers" or "Brethren" in the lesson;
  - "Angel" in Ps 33 but "angel" in its antiphon;
  - "Mother of Mercy";
  - "Allow me to praise thee" in the Ave versicle;
  - "The Regina cæli": "rejoice! alleluia".
- [ ] **The Pentecost metrical doxology** ("All praise be thine, O risen Lord") doesn't follow the
  Latin, as Easter's didn't before it was replaced. Replace it too, or keep it?
- [ ] **The capital after the In manus `*`.** It stays, because the app's Latin chant does the
  same: "In manus tuas, Dómine, * Commendo spíritum meum" (and "Dómine, Commendo" where the score
  has no `*`). The English follows it: "…O Lord, * I commend my spirit". The same holds in every
  language.

---

## Français

### Written for the app (`extra/fr/texts.txt`)

- [ ] **The priest's Confiteor:** "…à tous les Saints, et à vous, mon Père…", and "et vous, mon
  Père, de prier pour moi…".
  - Should *saint(s)* be capitalized as here?
- [ ] **Both Misereatur:** "Que le Dieu tout-puissant ait pitié de vous…" (*vous* for both).
- [ ] **Jube domne:** "Veuillez, Père, bénir."
- [ ] **All Souls' collect:** DO's text, without its inline "Par Notre-Seigneur.".
- [ ] **The Sicut erat** has a `*` added, and so does **Nunc dimittis v. 4** ("…et gloire
  d’Israël Votre peuple"). Should there be a comma after "d’Israël"?

### Written for the app: the rubrics (`extra/fr/rubrics.txt`)

Claude drafted all 48, from the English. Divinum Officium has only a few rubrics, and none of
these. Each entry has its English above it. Read them on the page in "Latin & translation".

- [ ] **Each rubric reads naturally** and uses the words a French book of the old office would use.
- [ ] **Words chosen:** *l’Officiant*, *le Lecteur*, *le Chantre*, *le Capitule*, *l’oraison*,
  *l’hymne* (feminine), and a no-break space before : ; ? ! and inside « »?

### Questions of wording in DO's French

- [ ] **Hæc dies:** "réjouissons-nous en Lui". The Latin *in ea* is the day, not God.
- [ ] **The Friday antiphon:** "et que Dieu n’oublie point" turns the Latin future into a wish.
- [ ] **The Wednesday antiphon:** "s’intéressera à" is weak, and doesn't match its own psalm.
- [ ] **The Per Dominum** leaves out *in unitáte*, and writes "Notre Seigneur", not
  "Notre-Seigneur".
- [ ] **Vous or vous for God:** the capital isn't used consistently across the office.
- [ ] **The Salve's prayer** shows the abbreviations "J.-C. N.-S.". The other Marian collects
  say "Christ notre Seigneur".
- [ ] **The Salve Regina** has "Vers vous, nous crions" with a comma, but "Vers vous nous
  soupirons" without one. Which?
- [ ] **Capitals for God made consistent in Phase 8.** The typo pass did this within single texts:
  - "Levez-Vous" in Ps 7;
  - "Ses saints" in Ps 33;
  - "Vous laisserez Votre serviteur" in the Nunc dimittis;
  - "à Vous" in the Sacred Heart and Transfiguration doxologies.

  Whether the office as a whole uses *Vous* or *vous* is still open (above).

---

## Italiano

### Written for the app (`extra/it/texts.txt`)

- [ ] **The priest's Confiteor:** "…a tutti i Santi e a te, padre…". Should it be lower-case
  "padre", as in DO's own Jube?
- [ ] **Misereatur:** *te* for one person, *voi* for the people.
- [ ] **Psalm verses where DO's square brackets were taken out:**
  - "Adiratevi pure";
  - "bagnerò di pianto";
  - "riandatele", where DO also offers "respingetele";
  - "iattanza", where DO also offers "tracotanza";
  - and five more (`extra/it/texts.txt`, the psalm sections from Phase 5).

### Written for the app: the rubrics (`extra/it/rubrics.txt`)

Claude drafted all 48, from the English. Divinum Officium has only a few rubrics, and none of
these. Each entry has its English above it. Read them on the page in "Latin & translation".

- [ ] **Each rubric reads naturally** and uses the words a Italian book of the old office would use.
- [ ] **Words chosen:** *l’Officiante*, *il Lettore*, *il Cantore*, *Compieta* without an
  article, *l’orazione*.

### Questions of wording in DO's Italian

- [ ] **Two mistranslations:**
  - Nunc dimittis "del suo popolo" should be "del tuo popolo" (*plebis tuæ*);
  - Ps 87:19 "Hanno allontanato" should be "Hai allontanato" (*Elongásti*).
- [ ] **The Wednesday antiphon** says "scenderà attorno", but Ps 33 has "si accamperà attorno".
- [ ] **"fa" or "fa'"** (the imperative), six times.
- [ ] **Capitals after a colon mid-verse:** Ps 12, 7, 87, 141 and 142.
- [ ] **Older forms:** "benefizi", "atrii", "Io aveva", "collo", "hai data la eredità". Keep or
  modernize, as one decision.
- [ ] **"nel cospetto di Dio"** or "al cospetto", as elsewhere in the psalter.
- [ ] **"feconda Verginità"** (the Christmas Marian collect): is the capital meant? DO's other
  uses are lower case.
- [ ] **Commas** between subject and verb, and before a relative clause, in older style. One
  example is "a quelli, che lo temono" in the Ps 33 antiphon. Keep them or modernize?

---

## Português

### Written for the app (`extra/pt/texts.txt`)

- [ ] **The priest's Confiteor:** "…a todos os Santos, e a vós, Padre, que pequei…". The missals
  have "porque pequei"; should it say that too?
- [ ] **The comma** in "a Deus, todo-poderoso".
- [ ] **Misereatur:** *vós* for one person and for the people alike, so the two forms are the
  same.
- [ ] **"Padre" (the app's) beside "padre" (DO's Jube).**

### Written for the app: the rubrics (`extra/pt/rubrics.txt`)

Claude drafted all 48, from the English. Divinum Officium has only a few rubrics, and none of
these. Each entry has its English above it. Read them on the page in "Latin & translation".

- [ ] **Each rubric reads naturally** and uses the words a Portuguese book of the old office would use.
- [ ] **Words chosen:** *o Oficiante*, *o Leitor*, *o Cantor*, *a oração*, and European
  Portuguese spelling (*ação*, *diretamente*), as in DO's texts?

### Questions of wording in DO's Portuguese

- [ ] **Renderings:**
  - "nos deuses" (Ps 85:8);
  - "orto" (Ps 70);
  - "em mercê dos mortos" (Ps 87);
  - "fizeram-se soar" (Ps 76);
  - "temer … da seta" (Ps 90:5).
- [ ] **"todos meus" without the article**, throughout the psalter (14 verses).
- [ ] **The Confiteor's "rogueis"** has no "vós" to agree with.
- [ ] **"Céu" and "Anjos"** are capitalized in some texts and not in others. "cousas" and
  "coisas" are both used.

---

## Polski

### Written for the app (`extra/pl/texts.txt`)

- [ ] **The priest's Confiteor:** "…wszystkim Świętym i tobie, ojcze…" (from the pre-1965 missal).
- [ ] **Misereatur:** *tobą* for one person, *wami* for the people.
- [ ] **Jube without a priest:** "Pobłogosław, Panie." (DO has "ojcze" for both).
- [ ] **All Souls' collect** (no Polish DO file has it):
  > Bądź miłościw, prosimy, Panie, duszom wszystkich sług i służebnic Twoich, za które pokornie
  > błagamy majestat Twój: aby przez te pobożne błagania i modły zasłużyły dostąpić wiecznego
  > odpoczynku.

  The reviewer's points:
  - DO always says "prosimy Cię, Panie";
  - "zasłużyły dostąpić" is stiff, and DO says "zasłużyli na…";
  - "błagamy" and "błagania" are close together.

### Written for the app: the rubrics (`extra/pl/rubrics.txt`)

Claude drafted all 48, from the English. Divinum Officium has only a few rubrics, and none of
these. Each entry has its English above it. Read them on the page in "Latin & translation".

- [ ] **Each rubric reads naturally** and uses the words a Polish book of the old office would use.
- [ ] **Words chosen:** *przewodniczący* for the Officiant, *lektor*, *kantor*, *kolekta*, and
  the Bible abbreviations *Łk 2* and *1 P 5* in the headings.
- [ ] **Quotation marks:** „…”, where DO's Polish rubrics have «…».

### Possible slips that need a Polish reader

The psalter is the Wujek Bible's old spelling, which stays.
- [ ] **"powienie":** should it be "powionie"? DO's Ps 147 has "wionie wiatr".
- [ ] **"szędziwości":** a cross of "szedziwości" and "sędziwości"?
- [ ] **"obrócą wstydać się":** "wstydając się"?
- [ ] **The doxologies' opening vocative comma.** Doxologies.txt leaves it out everywhere except
  the Sacred Heart. Add it everywhere, or leave it?
