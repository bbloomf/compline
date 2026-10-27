// Hyphenation of the text that isn't drawn as chant: the Latin and each translation get soft
// hyphens, with Hypher and the patterns of their lang (js/hyphenation/, which
// tools/hyphenation/build.js generates), as in jgabc's propers tool, so long words break at the end
// of a narrow column.  Latin's patterns are jgabc's, and la-x-bea (the Pius XII psalter) is Latin.
// The plain text of a <chant-gabc> is Latin, and nothing in a score's SVG is touched.
//
// watch() hyphenates the page and then whatever is added to it, so the text is hyphenated each time
// it's drawn again (text-mode.js translate(), a <chant-gabc>'s plain text or the translations under
// its notes).  A language's patterns load the first time its text is on the page, except Latin's,
// which come with this module.  Copying leaves the soft hyphens out.
define(['hypher', 'hyphenation/la'], function(Hypher, latin) {
  'use strict';
  var SHY = /­/g;
  var languages = ['la', 'en', 'fr', 'es', 'it', 'pt', 'pl'];
  // Latin's patterns break after a single letter, as they divide syllables under the notes; in a line
  // of text, a word keeps at least two letters on each side of the hyphen.
  var minimums = {la: {leftmin: 2, rightmin: 2}};
  // Words shorter than this aren't hyphenated (as in Hypher's hyphenateText).
  var minLength = 5;
  // A word: the letters (and combining accents, as in œ́) of the Latin alphabet, accented or not.
  var regexWord = /[A-Za-zÀ-ÖØ-öø-ɏ̀-ͯ]+/g;
  // Elements that a word may run through, as the pointed psalms' <b> and <i> do.
  var regexInline = /^(B|I|EM|STRONG|SPAN|U|SMALL|SUB|SUP|A)$/;
  var regexSkip = /^(SCRIPT|STYLE|TEXTAREA|INPUT|SELECT|OPTION|BUTTON)$/;
  var htmlNamespace = 'http://www.w3.org/1999/xhtml';

  // The patterns a lang attribute uses, or null: the language without its region or variant.
  var patternsFor = function(lang) {
    var code = (lang || '').toLowerCase().split('-')[0];
    return languages.indexOf(code) >= 0 ? code : null;
  };
  // Each language's Hypher, null while its patterns load, or false if they couldn't.
  var hyphenators = {};
  var cache = {};
  var makeHyphenator = function(code, language) {
    var settings = {};
    for(var key in language) settings[key] = language[key];
    for(key in minimums[code]) settings[key] = minimums[code][key];
    hyphenators[code] = new Hypher(settings);
    cache[code] = {};
  };
  makeHyphenator('la', latin);
  // A word's pieces, between which it may break.
  var pieces = function(code, word) {
    var words = cache[code];
    if(!words.hasOwnProperty(word)) words[word] = hyphenators[code].hyphenate(word);
    return words[word];
  };

  // The language of an element's own text, if it says: its lang, or for a <chant-gabc>, Latin as
  // plain text or none as chant (but the translations under the notes have their own lang).
  var ownLang = function(el) {
    if(el.hasAttribute('lang')) return el.getAttribute('lang');
    if(el.tagName === 'CHANT-GABC') return el.classList.contains('plain-text') ? 'la' : '';
    return undefined;
  };
  var contextLang = function(el) {
    for(; el && el.nodeType === 1; el = el.parentNode) {
      var lang = ownLang(el);
      if(lang !== undefined) return lang;
    }
    return '';
  };

  // Blocks waiting for each language's patterns.
  var waiting = {};
  var load = function(code, block) {
    (waiting[code] = waiting[code] || []).push(block);
    if(code in hyphenators) return;
    hyphenators[code] = null;
    require(['hyphenation/' + code], function(language) {
      makeHyphenator(code, language);
      var blocks = waiting[code];
      delete waiting[code];
      blocks.forEach(function(block) {
        if(document.body.contains(block)) hyphenateBlock(block);
      });
    }, function(err) {
      console.warn('No hyphenation for ' + code, err);
      hyphenators[code] = false;
      delete waiting[code];
    });
  };

  // Hyphenates the text in an element.  The text between two block elements is a run, hyphenated as
  // one string, so that a word split by <b> or <i> is hyphenated as a whole.  The soft hyphens that
  // are there already go first, so text can be hyphenated again.
  var hyphenateBlock = function(block) {
    var runs = [];
    var run = null;
    var walk = function(node, lang) {
      for(var child = node.firstChild; child; child = child.nextSibling) {
        if(child.nodeType === 3) {
          if(!run) runs.push(run = {lang: lang, nodes: []});
          run.nodes.push(child);
        } else if(child.nodeType === 1) {
          // a score's SVG, and form controls
          if(child.namespaceURI !== htmlNamespace || regexSkip.test(child.tagName)) {
            run = null;
            continue;
          }
          var own = ownLang(child);
          var boundary = own !== undefined || !regexInline.test(child.tagName) || child.classList.contains('versiculum');
          if(boundary) run = null;
          walk(child, own === undefined ? lang : own);
          if(boundary) run = null;
        }
      }
    };
    walk(block, contextLang(block));
    runs.forEach(function(run) {
      var code = patternsFor(run.lang);
      if(!code) return;
      if(!hyphenators[code]) {
        if(hyphenators[code] !== false) load(code, block);
        return;
      }
      var values = run.nodes.map(function(node) { return node.nodeValue.replace(SHY, ''); });
      var text = values.join('');
      // where the soft hyphens go, as offsets into text
      var breaks = [];
      text.replace(regexWord, function(word, offset) {
        if(word.length < minLength) return word;
        pieces(code, word).slice(0, -1).forEach(function(piece) {
          offset += piece.length;
          breaks.push(offset);
        });
        return word;
      });
      // A break at the end of one text node goes there, rather than at the start of the next.
      var start = 0;
      var b = 0;
      run.nodes.forEach(function(node, i) {
        var value = values[i];
        var end = start + value.length;
        var result = '';
        var last = start;
        for(; b < breaks.length && breaks[b] <= end; ++b) {
          if(breaks[b] <= start) continue;
          result += value.slice(last - start, breaks[b] - start) + '­';
          last = breaks[b];
        }
        result += value.slice(last - start);
        if(node.nodeValue !== result) node.nodeValue = result;
        start = end;
      });
    });
  };

  // The element whose text a change to node affects: the nearest that isn't inline.  null in an SVG.
  var blockOf = function(node) {
    var el = node.nodeType === 1 ? node : node.parentNode;
    while(el && el.nodeType === 1 && el !== document.body && el.namespaceURI === htmlNamespace && regexInline.test(el.tagName)) {
      el = el.parentNode;
    }
    if(!el || el.nodeType !== 1 || el.namespaceURI !== htmlNamespace || el.closest('svg')) return null;
    return el;
  };
  var hyphenateAdded = function(records) {
    var blocks = [];
    records.forEach(function(record) {
      for(var i = 0; i < record.addedNodes.length; ++i) {
        var block = blockOf(record.addedNodes[i]);
        if(block && blocks.indexOf(block) < 0) blocks.push(block);
      }
    });
    blocks.filter(function(block) {
      // each only once, as part of the outermost changed
      return document.body.contains(block) && !blocks.some(function(other) {
        return other !== block && other.contains(block);
      });
    }).forEach(hyphenateBlock);
  };

  // Copied text keeps the hyphens only where they're written.  The browser would copy the soft
  // hyphens too, so the copy is made here, without them, of what's shown.
  var copyWithoutSoftHyphens = function(e) {
    var selection = window.getSelection();
    if(!e.clipboardData || !selection || !selection.rangeCount) return;
    var text = selection.toString();
    if(text.indexOf('\u00AD') < 0) return;
    var html = document.createElement('div');
    for(var i = 0; i < selection.rangeCount; ++i) {
      var range = selection.getRangeAt(i);
      // what's hidden (the Latin in 'translation only' mode) is marked, so it can go from the copy
      var hidden = [];
      var root = range.commonAncestorContainer;
      if(root.nodeType !== 1) root = root.parentNode;
      var walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
      for(var el = walker.currentNode; el; el = walker.nextNode()) {
        if(el !== root && range.intersectsNode(el) && el.getClientRects().length === 0) {
          el.setAttribute('data-copy-hidden', '');
          hidden.push(el);
        }
      }
      html.appendChild(range.cloneContents());
      hidden.forEach(function(el) { el.removeAttribute('data-copy-hidden'); });
    }
    [].slice.call(html.querySelectorAll('[data-copy-hidden]')).forEach(function(el) {
      if(el.parentNode) el.parentNode.removeChild(el);
    });
    e.clipboardData.setData('text/plain', text.replace(SHY, ''));
    e.clipboardData.setData('text/html', html.innerHTML.replace(SHY, ''));
    e.preventDefault();
  };

  var watch = function() {
    hyphenateBlock(document.body);
    new MutationObserver(hyphenateAdded).observe(document.body, {childList: true, subtree: true});
    document.addEventListener('copy', copyWithoutSoftHyphens);
  };

  return {
    watch: watch,
    hyphenate: hyphenateBlock
  };
});
