// Translations (TRANSLATIONS_PLAN.md §3–§5).  What to show is localStorage.textMode: 'la' (Latin
// only), 'both' (Latin and a translation) or 'tr' (the translation only).  The translation is
// localStorage.trLang, which isn't stored until the user picks one, so until then it follows the
// browser's language.  ?text=both&lang=en overrides both for one page view, without saving.
//
// Each language is a module js/i18n/<lang>.js, loaded only when it's needed:
//   define({
//     meta: {name: 'English', dir: 'ltr', doCommit: '…'},
//     // (Latin-Bea's meta also has latin: true, as where it has nothing of its own its text is the
//     // Latin's, and lang: 'la-x-bea', its lang attribute)
//     // each psalm section's verses, from verse 1, with the Gloria Patri and Sicut erat last
//     // ('' for a verse whose translation is part of the verse before's)
//     psalter: {'4': ['When I called upon him…', …], '7.I': […], 'nunc-dimittis': […]},
//     // each text's units, in order: the paragraphs of a GABC file, keyed by its src, or the
//     // blocks of index.html, keyed by their data-tr attribute
//     texts: {'index:confiteor': […], …},
//     // the hymn, Te lucis (§4b): its first two stanzas and each tone's doxology (keyed as
//     // te-lucis/<tone>.gabc), in each kind the language has; sung is hyphenated, with only the
//     // tones the whole hymn fits
//     hymn: {literal: {stanzas: […], doxologies: {Ferial: '…', …}}, metrical: {…}, sung: {…}}
//   });
// A unit is plain text.  Its lines are split by \n, and a line that starts "V. " or "R. " starts
// with ℣ or ℟.  * and † are shown in red, as in the Latin.  How to show the hymn as text is
// localStorage.hymnMode: 'literal' (the default) or 'metrical'; the hymn's notation menu sings it
// ('Fully notated translation', compline.js setHymnSung) (§4b, §5).
define(['jquery'], function($) {
  'use strict';
  // The app's settings, which compline.js uses too: an object in their place where storage throws.
  var localStorage = window.localStorage;
  try {
    var mod = '__storage test__';
    localStorage.setItem(mod, mod);
    localStorage.removeItem(mod);
  } catch(e) {
    localStorage = {};
  }
  if(!('textMode' in localStorage)) localStorage.textMode = 'la';
  var modes = ['la', 'both', 'tr'];
  // The languages offered in the menu, each with a module in js/i18n/ (TRANSLATIONS_PLAN.md §2),
  // added once it has been checked end to end (English in Phase 4, the others in Phase 5, Latin
  // with the Pius XII psalter, for comparison, in Phase 6).
  // compline.js hides the Text and Translation menus while there are none.  rubrics: the language
  // its rubrics are in, where it hasn't its own.  sung: its module has the hymn to sing (hymn.sung),
  // which the hymn's notation menu offers before the module is loaded.
  var languages = [
    {code: 'en', name: 'English', sung: true},
    {code: 'fr', name: 'Français'},
    {code: 'es', name: 'Español', sung: true},
    {code: 'it', name: 'Italiano'},
    {code: 'pt', name: 'Português'},
    {code: 'pl', name: 'Polski'},
    {code: 'la-bea', name: 'Latin (Pius XII psalter)', rubrics: 'en'}
  ];
  var isLanguage = function(code) {
    return languages.some(function(l) { return l.code === code; });
  };
  // The page's query parameters, which compline.js uses too.
  var query = {};
  window.location.search.substr(1).split('&').forEach(function(param) {
    var p = param.split('=');
    if(p.length === 2) query[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '));
  });
  // Once the user chooses in the menu, a ?text= or ?lang= override goes, from the address too, so
  // reloading the page doesn't bring it back.
  var dropQuery = function(key) {
    delete query[key];
    if(!window.history || !window.history.replaceState) return;
    var search = window.location.search.substr(1).split('&').filter(function(param) {
      return param && param.split('=')[0] !== key;
    }).join('&');
    window.history.replaceState(window.history.state, '',
      window.location.pathname + (search ? '?' + search : '') + window.location.hash);
  };

  var mode = function() {
    if(modes.indexOf(query.text) >= 0) return query.text;
    return modes.indexOf(localStorage.textMode) >= 0 ? localStorage.textMode : 'la';
  };
  // The first of the browser's languages that has a translation (de-AT counts as de), else English.
  // Latin (Pius XII) is never chosen this way.
  var browserLang = function() {
    var preferred = navigator.languages || [navigator.language || navigator.userLanguage || ''];
    for(var i = 0; i < preferred.length; ++i) {
      var code = (preferred[i] || '').toLowerCase().split('-')[0];
      if(code !== 'la' && isLanguage(code)) return code;
    }
    return 'en';
  };
  var lang = function() {
    if(isLanguage(query.lang)) return query.lang;
    return isLanguage(localStorage.trLang) ? localStorage.trLang : browserLang();
  };
  // The sections whose notation menu says 'Translation only' (compline.js), which show the
  // translation only whatever the Text menu says.  Each block of text shows as its section's mode
  // says (modeOf), and has the class text-<mode>, which style.css reads.
  var trSections = {};
  var setTrSections = function(sections) {
    trSections = {};
    sections.forEach(function(section) { trSections[section] = true; });
  };
  var sectionMode = function(section) {
    var m = mode();
    return section && trSections[section] ? 'tr' : m;
  };
  // A block's section: a <chant-gabc>'s notation, the pointed chapter and prayers, or the
  // data-section of the part of index.html it's in (the psalms' and the canticle's verses and
  // antiphons, in #placeholder and #canticle, and the versicles of the collect).  Any other chant is
  // 'chants', and anything else follows the Text menu.
  var sectionOf = function(el) {
    var $el = $(el);
    if($el.is('chant-gabc[notation]')) return $el.attr('notation');
    if($el.closest('.pointed-chapter').length) return 'chapter';
    if($el.closest('.pointed-prayer').length) return 'prayers';
    return $el.closest('[data-section]').attr('data-section') || ($el.is('chant-gabc') ? 'chants' : null);
  };
  var modeOf = function(el) {
    return sectionMode(sectionOf(el));
  };
  // Whether any translation is shown.
  var translated = function() {
    return mode() !== 'la' || Object.keys(trSections).length > 0;
  };
  // The language of the rubrics: the translation's, which with the Latin only the menu calls the
  // Rubrics' (compline.js).  English is the page's own.
  var rubricsLang = function(l) {
    var language = languages.filter(function(each) { return each.code === l; })[0];
    return (language && language.rubrics) || l;
  };
  // Whether the language's module is wanted: for its translation, or for its rubrics.
  var wanted = function() {
    return translated() || rubricsLang(lang()) !== 'en';
  };
  // The class of a block that shows as m.
  var markMode = function(el, m) {
    $(el).removeClass('text-la text-both text-tr').addClass('text-' + m);
  };
  var setMode = function(m) {
    dropQuery('text');
    localStorage.textMode = m;
  };
  var setLang = function(l) {
    dropQuery('lang');
    localStorage.trLang = l;
  };
  var hymnModes = ['literal', 'metrical'];
  var hymnMode = function() {
    return hymnModes.indexOf(localStorage.hymnMode) >= 0 ? localStorage.hymnMode : 'literal';
  };
  var setHymnMode = function(m) {
    localStorage.hymnMode = m;
  };
  // Whether the hymn is sung in the translation: its notation menu says 'Fully notated translation'
  // (compline.js), which it offers where the language can sing it.
  var hymnSung = false;
  var setHymnSung = function(sung) {
    hymnSung = sung;
  };
  var canSing = function() {
    return languages.some(function(l) { return l.code === lang() && l.sung; });
  };

  var modules = {};
  // Calls back once the current language is loaded.  A language that fails to load has no texts.
  var load = function(callback) {
    var l = lang();
    if(!wanted() || modules[l]) {
      callback();
      return;
    }
    require(['i18n/' + l], function(module) {
      modules[l] = module;
      if(!(module.hymn && module.hymn.sung) !== !canSing()) console.warn('languages[].sung is wrong for ' + l);
      callback();
    }, function(err) {
      console.warn('No translation for ' + l, err);
      modules[l] = {};
      callback();
    });
  };
  var data = function() {
    return translated() ? modules[lang()] || null : null;
  };
  // What a chant (whose src is key, shown as m) was drawn for, so it's drawn again only when this
  // changes.  notes: whether it has a heading (user-notes or commentary) for the rubrics to translate.
  var renderKey = function(key, m, notes) {
    return (m === 'la' ? m : m + ':' + lang() + (modules[lang()] ? '' : ':loading') + (hymnTone(key) ? ':' + (hymnSung ? 'sung' : hymnMode()) : '')) +
      (notes && rubrics() ? ':rubrics-' + lang() : '');
  };

  // The rubrics (§4d), in the translation's language, or with the Latin only the Rubrics menu's,
  // where its module has them: English's are the page's own, and Latin-Bea has none.  Each rubric of index.html has
  // a data-rubric key, and rubrics[key] is its text: {…} is Latin (lang=la), and \n a line break.
  // rubrics['note:<English>'] translates the start of a heading: a chant's user-notes or commentary
  // ("Psalm 7. I." → "Salmo 7. I."), and the pointed psalms' own.
  var rubrics = function() {
    var d = wanted() ? modules[lang()] : null;
    return (d && d.rubrics) || null;
  };
  var rubric = function(key) {
    var r = rubrics();
    return r && typeof r[key] === 'string' ? r[key] : null;
  };
  // A heading (as HTML) translated, or null where the rubrics don't translate it (Polish's "Psalm"
  // is translated, though it's the same word).
  var rubricNote = function(html) {
    var r = rubrics();
    if(!r || !html) return null;
    for(var key in r) {
      var en = key.replace(/^note:/, '');
      if(en !== key && html.indexOf(en) === 0 && /^[ .]?$/.test(html.charAt(en.length))) return rubricHtml(r[key]) + html.slice(en.length);
    }
    return null;
  };
  // A heading, as chant-element.js draws it: red italics, in the rubrics' language once translated.
  var noteHtml = function(text, style) {
    var note = rubricNote(text);
    return '<i class="red"' + (note === null ? '' : ' lang="' + langAttr() + '"') + (style ? ' style="' + style + '"' : '') + '>' +
      (note === null ? text : note) + '</i>';
  };
  // A rubric's text as HTML.  {…} is a Latin text the rubric names, shown black and upright (style.css
  // .cited).  wrap is the tags its words go in, where its English has its words in <i> around Latin
  // that isn't ("the Hymn </i>Te lucis<i> which…").
  var rubricHtml = function(text, wrap) {
    return text.split(/(\{[^}]*\})/).map(function(part, i) {
      if(i % 2) return "<span class='cited' lang='la'>" + escapeHtml(part.slice(1, -1)) + '</span>';
      if(!part) return '';
      var html = escapeHtml(part).replace(/\n/g, '<br/>');
      return wrap ? wrap[0] + html + wrap[1] : html;
    }).join('');
  };
  var translateRubrics = function($root) {
    $root.find('[data-rubric]').addBack('[data-rubric]').each(function() {
      var $el = $(this);
      // what was last shown, as hyphenate.js changes the HTML
      if(!('_rubricHtml' in this)) {
        this._rubricHtml = this._rubricShown = this.innerHTML;
        this._rubricWrap = $el.is('i') || !$el.children('i').length ? null :
          $el.hasClass('red') ? ['<i>', '</i>'] : ["<i class='red'>", '</i>'];
      }
      var text = rubric($el.attr('data-rubric'));
      var html = text === null ? this._rubricHtml : rubricHtml(text, this._rubricWrap);
      if(this._rubricShown !== html) this.innerHTML = this._rubricShown = html;
      if(text === null) $el.removeAttr('lang');
      else $el.attr('lang', langAttr());
    });
    // the pointed psalms' headings ("Psalm 90"), in the psalms' and the canticle's HTML, and the
    // Miserere's (#miserere); a chant's are drawn by chant-element.js
    var headed = '#placeholder, #canticle, #miserere';
    $root.find(headed).addBack(headed).find('i.red').not('chant-gabc i').each(function() {
      if(!('_rubricText' in this)) this._rubricText = this._rubricShown = this.innerHTML;
      var note = rubricNote(this._rubricText);
      var shown = note === null ? this._rubricText : note;
      if(this._rubricShown !== shown) this.innerHTML = this._rubricShown = shown;
      if(note === null) $(this).removeAttr('lang');
      else $(this).attr('lang', langAttr());
    });
  };

  // The hymn (§4b).  The tone of a te-lucis/<tone>.gabc key, or null for any other.
  var hymnTone = function(key) {
    var match = /^te-lucis\/(.+)\.gabc$/.exec(key || '');
    return match && match[1];
  };
  // Which kinds of the hymn the language has, {literal, metrical, sung}, or null if it has none.
  var hymnKinds = function() {
    var h = (data() || {}).hymn;
    return h ? {literal: !!h.literal, metrical: !!h.metrical, sung: !!h.sung} : null;
  };
  // The hymn of a te-lucis/ key as the user chose to show it: {kind, units, unsung}, or null where
  // the translation has no hymn.  notated: whether it can be drawn as notes, which singing needs.
  // A kind the language hasn't for this tone falls back as §4b says: sung to metrical (unsung is
  // then true where the language sings, but not this tone's doxology), literal to metrical, and
  // metrical to literal.
  var hymn = function(key, notated) {
    var tone = hymnTone(key);
    var h = tone && (data() || {}).hymn;
    if(!h) return null;
    var units = function(kind) {
      var k = h[kind];
      return k && typeof k.doxologies[tone] === 'string' ? k.stanzas.concat(k.doxologies[tone]) : null;
    };
    var wanted = hymnSung ? 'sung' : hymnMode();
    var unsung = false;
    if(wanted === 'sung') {
      if(notated && units('sung')) return {kind: 'sung', units: units('sung'), unsung: false};
      unsung = !!(notated && h.sung);
      wanted = 'metrical';
    }
    var kinds = wanted === 'literal' ? ['literal', 'metrical'] : ['metrical', 'literal'];
    for(var i = 0; i < kinds.length; ++i) {
      if(units(kinds[i])) return {kind: kinds[i], units: units(kinds[i]), unsung: unsung};
    }
    return null;
  };

  // A text's units, or null if the translation doesn't have it.  The hymn's are as hymnMode chooses
  // them, as text.
  var texts = function(key) {
    if(hymnTone(key)) {
      var h = hymn(key, false);
      return h ? h.units : null;
    }
    var d = data();
    var units = d && d.texts && d.texts[key];
    return units === undefined || units === null ? null : [].concat(units);
  };
  // A psalm score's section, from its GABC header: "user-notes: Psalm 7. I.;" → '7.I', and the
  // Nunc dimittis is 'nunc-dimittis'.  A psalm-section header says it outright, where the label
  // isn't enough: All Souls' Nunc dimittis ends with Requiem æternam, so it's 'nunc-dimittis-asd'.
  var psalmSection = function(header) {
    if(header['psalm-section']) return header['psalm-section'];
    var label = header['user-notes'];
    if(!label) return null;
    if(/Simeon|Nunc dimittis/i.test(label)) return 'nunc-dimittis';
    var match = label.match(/Psalm\s+(\d+)(?:\.\s*([IV]+))?/);
    return match && (match[2] ? match[1] + '.' + match[2] : match[1]);
  };
  var psalm = function(section) {
    var d = data();
    return (section && d && d.psalter && d.psalter[section]) || null;
  };
  var hasPsalm = function(section) {
    return !!psalm(section);
  };
  // A verse's translation, null if there isn't one, or '' if it's part of the verse before's
  // (where the translation divides the verses differently).
  var psalmVerse = function(section, verse) {
    var verses = psalm(section);
    var text = verses && verses[verse - 1];
    return typeof text === 'string' ? text : null;
  };
  var escapeHtml = function(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };
  // Whether a Latin block (as HTML) runs its last ℟ on from the words before it, as "… ad vitam
  // ætérnam. ℟ Amen." does, rather than starting a line with it.
  var runsOnResponse = function(latinHtml) {
    var marks = latinHtml.split(/<span class=["']versiculum["']>r<\/span>/);
    // the words between the last line break (or block) before it and it
    var before = marks.length > 1 && marks[marks.length - 2].replace(/^[^]*(<br\s*\/?>|<\/?(p|div)\b[^>]*>)/, '');
    return !!before && /\S/.test(before.replace(/<[^>]*>|&nbsp;/g, ''));
  };
  // A unit as HTML, marked up like the Latin.  With slashes, its lines are run together with a red
  // slash between them, as under a notated hymn's verse.  With runOn, a last line that is a ℟ (an
  // Amen) runs on from the line before, where the Latin's does (runsOnResponse).
  var unitHtml = function(text, slashes, runOn) {
    var lines = text.split('\n').map(function(line) {
      return escapeHtml(line.trim())
        .replace(/^V\. /, "<span class='versiculum'>v</span>&nbsp;")
        .replace(/^R\. /, "<span class='versiculum'>r</span>&nbsp;")
        .replace(/ (\*|†)(?= |$)/g, "&nbsp;<span class='red'>$1</span>");
    });
    if(runOn && lines.length > 1 && /^<span class='versiculum'>r<\/span>/.test(lines[lines.length - 1])) {
      lines.splice(-2, 2, lines[lines.length - 2] + ' ' + lines[lines.length - 1]);
    }
    return lines.join(slashes ? "&nbsp;<span class='red'>/</span> " : '<br>');
  };
  // The Latin's last ℟ is in the last unit.
  var unitsHtml = function(units, slashes, runOn) {
    return units.map(function(unit, i) { return unitHtml(unit, slashes, runOn && i === units.length - 1); }).join('<br>');
  };
  // The name of the translation's language, from its module.
  var langName = function() {
    return ((data() || {}).meta || {}).name || lang();
  };
  // The translation's lang attribute.
  var langAttr = function() {
    return ((data() || {}).meta || {}).lang || lang();
  };
  // The attributes of the translation that follows a Latin element.
  var trAttributes = function() {
    var meta = (data() || {}).meta || {};
    return " class='tr' lang='" + langAttr() + "'" + (meta.dir === 'rtl' ? " dir='rtl'" : '');
  };
  // Classes for a Latin element: in 'tr' mode it hides when it has a translation, and is shown
  // in a subtle style when it doesn't (style.css).  A Latin translation (meta.latin, Latin-Bea)
  // has nothing where it's the same as the Latin, so there the Latin is its text: tr-same, shown
  // as it is.
  var latinClass = function(hasTranslation, m) {
    if((m || mode()) === 'la') return '';
    if(hasTranslation) return 'has-tr';
    return ((data() || {}).meta || {}).latin ? 'tr-same' : 'tr-missing';
  };
  // The translation of a psalm verse as a <p>, laid out like the Latin; '' if the verse before's
  // covers it, and null if there isn't one.  m is the mode it's shown in.
  var verseTranslationHtml = function(section, n, m) {
    var verse = (m || mode()) === 'la' ? null : psalmVerse(section, n);
    return verse ? '<p' + trAttributes() + "><span class='verse-number'>" + n + '.&nbsp;</span>' + unitHtml(verse) + '</p>' : verse;
  };
  // A psalm verse: its Latin <p> (whose inner HTML is latinHtml), then the translation's.
  var verseHtml = function(section, n, latinHtml, m) {
    var translation = verseTranslationHtml(section, n, m);
    return "<p lang='la' class='" + latinClass(translation !== null, m) + "'><span class='verse-number'>" + n + '.&nbsp;</span>' +
      latinHtml + '</p>' + (translation || '');
  };
  // A Latin block and its translation (units), side by side or one under the other (style.css).
  // tag is the element for each, 'p' or 'div'.  trPrefix is HTML that starts the translation, as
  // an antiphon's red Ant. does.
  var pairHtml = function(latinHtml, units, tag, m, trPrefix) {
    tag = tag || 'p';
    return "<div class='tr-pair'><" + tag + " lang='la' class='" + latinClass(!!units, m) + "'>" + latinHtml + '</' + tag + '>' +
      (units ? '<' + tag + trAttributes() + '>' + (trPrefix || '') + unitsHtml(units, false, runsOnResponse(latinHtml)) + '</' + tag + '>' : '') + '</div>';
  };

  // Adds the translations to the page, or takes them away in 'la' mode: each .tr-pair[data-tr]
  // block of index.html, and each verse of the pointed psalms (.verses[data-psalm]), each in its
  // section's mode.
  var translate = function(root) {
    var $root = $(root);
    translateRubrics($root);
    $root.find('.tr-pair[data-tr]').each(function() {
      var $pair = $(this);
      $pair.children('.tr').remove();
      var $latin = $pair.children('[lang=la]');
      if($latin.length !== 1) {
        console.warn('A .tr-pair needs one Latin child (lang=la)', this);
        return;
      }
      var m = modeOf(this);
      markMode(this, m);
      var units = m === 'la' ? null : texts($pair.attr('data-tr'));
      $latin.removeClass('has-tr tr-missing tr-same').addClass(latinClass(!!units, m));
      if(units) {
        var tag = $latin.prop('tagName').toLowerCase();
        $latin.after('<' + tag + trAttributes() + '>' + unitsHtml(units, false, runsOnResponse($latin.html())) + '</' + tag + '>');
      }
    });
    $root.find('.verses[data-psalm]').each(function() {
      var section = $(this).attr('data-psalm');
      var m = modeOf(this);
      markMode(this, m);
      $(this).children('p.tr').remove();
      $(this).children('p').each(function() {
        var $p = $(this);
        var translation = verseTranslationHtml(section, parseInt($p.children('.verse-number').text()), m);
        $p.attr('lang', 'la').removeClass('has-tr tr-missing tr-same').addClass(latinClass(translation !== null, m));
        if(translation) $p.after(translation);
      });
    });
  };
  var updateBodyClasses = function() {
    var m = mode();
    $.each(modes, function(i, each) {
      $(document.body).toggleClass('page-text-' + each, each === m);
    });
  };

  return {
    storage: localStorage,
    query: query,
    languages: languages,
    mode: mode,
    setTrSections: setTrSections,
    sectionMode: sectionMode,
    modeOf: modeOf,
    markMode: markMode,
    translated: translated,
    rubricsLang: rubricsLang,
    lang: lang,
    setMode: setMode,
    setLang: setLang,
    hymnMode: hymnMode,
    setHymnMode: setHymnMode,
    setHymnSung: setHymnSung,
    canSing: canSing,
    hymnKinds: hymnKinds,
    hymn: hymn,
    load: load,
    renderKey: renderKey,
    texts: texts,
    rubric: rubric,
    rubricHtml: rubricHtml,
    noteHtml: noteHtml,
    psalmSection: psalmSection,
    hasPsalm: hasPsalm,
    psalmVerse: psalmVerse,
    runsOnResponse: runsOnResponse,
    unitsHtml: unitsHtml,
    langName: langName,
    langAttr: langAttr,
    trAttributes: trAttributes,
    verseTranslationHtml: verseTranslationHtml,
    verseHtml: verseHtml,
    pairHtml: pairHtml,
    translate: translate,
    updateBodyClasses: updateBodyClasses
  };
});
