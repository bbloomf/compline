// Translations (TRANSLATIONS_PLAN.md §3–§5).  What to show is localStorage.textMode: 'la' (Latin
// only), 'both' (Latin and a translation) or 'tr' (the translation only).  The translation is
// localStorage.trLang, which isn't stored until the user picks one, so until then it follows the
// browser's language.  ?text=both&lang=en overrides both for one page view, without saving.
//
// Each language is a module js/i18n/<lang>.js, loaded only when it's needed:
//   define({
//     meta: {name: 'English', dir: 'ltr', doCommit: '…'},
//     // each psalm section's verses, from verse 1, with the Gloria Patri and Sicut erat last
//     // ('' for a verse whose translation is part of the verse before's)
//     psalter: {'4': ['When I called upon him…', …], '7.I': […], 'nunc-dimittis': […]},
//     // each text's units, in order: the paragraphs of a GABC file, keyed by its src, or the
//     // blocks of index.html, keyed by their data-tr attribute
//     texts: {'te-lucis/Ferial.gabc': ['Before the ending of the day,\n…', …], 'index:confiteor': […]}
//   });
// A unit is plain text.  Its lines are split by \n, and a line that starts "V. " or "R. " starts
// with ℣ or ℟.  * and † are shown in red, as in the Latin.
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
  // added once it has been checked end to end (English in Phase 4, the others in Phase 5).
  // compline.js hides the Text and Translation menus while there are none.
  var languages = [
    {code: 'en', name: 'English'}
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
  var setMode = function(m) {
    dropQuery('text');
    localStorage.textMode = m;
  };
  var setLang = function(l) {
    dropQuery('lang');
    localStorage.trLang = l;
  };

  var modules = {};
  // Calls back once the current language is loaded.  A language that fails to load has no texts.
  var load = function(callback) {
    var l = lang();
    if(mode() === 'la' || modules[l]) {
      callback();
      return;
    }
    require(['i18n/' + l], function(module) {
      modules[l] = module;
      callback();
    }, function(err) {
      console.warn('No translation for ' + l, err);
      modules[l] = {};
      callback();
    });
  };
  var data = function() {
    return mode() === 'la' ? null : modules[lang()] || null;
  };
  // What a chant was drawn for, so it's drawn again only when this changes.
  var renderKey = function() {
    var m = mode();
    return m === 'la' ? m : m + ':' + lang() + (modules[lang()] ? '' : ':loading');
  };
  // A text's units, or null if the translation doesn't have it.
  var texts = function(key) {
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
  // A unit as HTML, marked up like the Latin.  With slashes, its lines are run together with a red
  // slash between them, as under a notated hymn's verse.
  var unitHtml = function(text, slashes) {
    return text.split('\n').map(function(line) {
      return escapeHtml(line.trim())
        .replace(/^V\. /, "<span class='versiculum'>v</span>&nbsp;")
        .replace(/^R\. /, "<span class='versiculum'>r</span>&nbsp;")
        .replace(/ (\*|†)(?= |$)/g, "&nbsp;<span class='red'>$1</span>");
    }).join(slashes ? "&nbsp;<span class='red'>/</span> " : '<br>');
  };
  var unitsHtml = function(units, slashes) {
    return units.map(function(unit) { return unitHtml(unit, slashes); }).join('<br>');
  };
  // The attributes of the translation that follows a Latin element.
  var trAttributes = function() {
    var meta = data().meta || {};
    return " class='tr' lang='" + lang() + "'" + (meta.dir === 'rtl' ? " dir='rtl'" : '');
  };
  // Classes for a Latin element: in 'tr' mode it hides when it has a translation, and is shown
  // in a subtle style when it doesn't (style.css).
  var latinClass = function(hasTranslation) {
    return mode() === 'la' ? '' : hasTranslation ? 'has-tr' : 'tr-missing';
  };
  // The translation of a psalm verse as a <p>, laid out like the Latin; '' if the verse before's
  // covers it, and null if there isn't one.
  var verseTranslationHtml = function(section, n) {
    var verse = mode() === 'la' ? null : psalmVerse(section, n);
    return verse ? '<p' + trAttributes() + "><span class='verse-number'>" + n + '.&nbsp;</span>' + unitHtml(verse) + '</p>' : verse;
  };
  // A psalm verse: its Latin <p> (whose inner HTML is latinHtml), then the translation's.
  var verseHtml = function(section, n, latinHtml) {
    var translation = verseTranslationHtml(section, n);
    return "<p lang='la' class='" + latinClass(translation !== null) + "'><span class='verse-number'>" + n + '.&nbsp;</span>' +
      latinHtml + '</p>' + (translation || '');
  };
  // A Latin block and its translation (units), side by side or one under the other (style.css).
  // tag is the element for each, 'p' or 'div'.
  var pairHtml = function(latinHtml, units, tag) {
    tag = tag || 'p';
    return "<div class='tr-pair'><" + tag + " lang='la' class='" + latinClass(!!units) + "'>" + latinHtml + '</' + tag + '>' +
      (units ? '<' + tag + trAttributes() + '>' + unitsHtml(units) + '</' + tag + '>' : '') + '</div>';
  };

  // Adds the translations to the page, or takes them away in 'la' mode: each .tr-pair[data-tr]
  // block of index.html, and each verse of the pointed psalms (.verses[data-psalm]).
  var translate = function(root) {
    var $root = $(root);
    $root.find('.tr-pair[data-tr]').each(function() {
      var $pair = $(this);
      $pair.children('.tr').remove();
      var $latin = $pair.children('[lang=la]');
      if($latin.length !== 1) {
        console.warn('A .tr-pair needs one Latin child (lang=la)', this);
        return;
      }
      var units = mode() === 'la' ? null : texts($pair.attr('data-tr'));
      $latin.removeClass('has-tr tr-missing').addClass(latinClass(!!units));
      if(units) {
        var tag = $latin.prop('tagName').toLowerCase();
        $latin.after('<' + tag + trAttributes() + '>' + unitsHtml(units) + '</' + tag + '>');
      }
    });
    $root.find('.verses[data-psalm]').each(function() {
      var section = $(this).attr('data-psalm');
      $(this).children('p.tr').remove();
      $(this).children('p').each(function() {
        var $p = $(this);
        var translation = verseTranslationHtml(section, parseInt($p.children('.verse-number').text()));
        $p.attr('lang', 'la').removeClass('has-tr tr-missing').addClass(latinClass(translation !== null));
        if(translation) $p.after(translation);
      });
    });
  };
  var updateBodyClasses = function() {
    var m = mode();
    $.each(modes, function(i, each) {
      $(document.body).toggleClass('text-' + each, each === m);
    });
  };

  return {
    storage: localStorage,
    query: query,
    languages: languages,
    mode: mode,
    lang: lang,
    setMode: setMode,
    setLang: setLang,
    load: load,
    renderKey: renderKey,
    texts: texts,
    psalmSection: psalmSection,
    hasPsalm: hasPsalm,
    psalmVerse: psalmVerse,
    unitsHtml: unitsHtml,
    trAttributes: trAttributes,
    verseTranslationHtml: verseTranslationHtml,
    verseHtml: verseHtml,
    pairHtml: pairHtml,
    translate: translate,
    updateBodyClasses: updateBodyClasses
  };
});
