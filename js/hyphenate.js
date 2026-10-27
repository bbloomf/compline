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
  var SHY = /\u00AD/g;
  // Latin's patterns break after a single letter, as they divide syllables under the notes; in a line
  // of text, a word keeps at least two letters on each side of the hyphen.
  var minimums = {la: {leftmin: 2, rightmin: 2}};
  // Words shorter than this aren't hyphenated (as in Hypher's hyphenateText).
  var minLength = 5;
  // A word: the letters (and combining accents, as in œ́) of the Latin alphabet, accented or not.
  var regexWord = /[A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F\u0300-\u036F]+/g;
  // Elements that a word may run through, as the pointed psalms' <b> and <i> do.
  var regexInline = /^(B|I|EM|STRONG|SPAN|U|SMALL|SUB|SUP|A)$/;
  var regexSkip = /^(SCRIPT|STYLE|TEXTAREA|INPUT|SELECT|OPTION|BUTTON)$/;
  var htmlNamespace = 'http://www.w3.org/1999/xhtml';

  // The patterns a lang attribute uses, or null: the language without its region or variant.  The
  // languages are those tools/hyphenation/build.js generates; for any other, load() finds no module.
  var patternsFor = function(lang) {
    var code = (lang || '').toLowerCase().split('-')[0];
    return /^[a-z]{2,3}$/.test(code) ? code : null;
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

  // The language of an element's own text, if it says: its lang; none for a rubric (in English, as
  // a chant's labels are); or for a <chant-gabc>, Latin as plain text or none as chant (but the
  // translations under the notes have their own lang).
  var ownLang = function(el) {
    if(el.hasAttribute('lang')) return el.getAttribute('lang');
    if(el.classList.contains('red')) return '';
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
    // each block once, and only while it's on the page
    waiting[code] = (waiting[code] || []).filter(function(other) {
      return other !== block && document.body.contains(other);
    }).concat([block]);
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
          result += value.slice(last - start, breaks[b] - start) + '\u00AD';
          last = breaks[b];
        }
        result += value.slice(last - start);
        if(node.nodeValue !== result) node.nodeValue = result;
        start = end;
      });
    });
  };

  // The element whose text a change to node affects: the nearest that isn't inline, but never all of
  // <body> (then node itself).  null in an SVG.
  var blockOf = function(node) {
    var el = node.nodeType === 1 ? node : node.parentNode;
    while(el && el.nodeType === 1 && el !== document.body && el.namespaceURI === htmlNamespace && regexInline.test(el.tagName)) {
      el = el.parentNode;
    }
    if(el === document.body) el = node;
    if(!el || el.nodeType !== 1 || el.namespaceURI !== htmlNamespace || el.closest('svg')) return null;
    return el;
  };
  // What's added to the page, an element whose lang changes, and a <chant-gabc> whose class does
  // (between chant and plain text).
  var hyphenateChanged = function(records) {
    var blocks = [];
    records.forEach(function(record) {
      var nodes = record.type !== 'attributes' ? record.addedNodes :
        record.attributeName === 'lang' || record.target.tagName === 'CHANT-GABC' ? [record.target] : [];
      for(var i = 0; i < nodes.length; ++i) {
        var block = blockOf(nodes[i]);
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
  // hyphens too, so the copy is made here, without them, of what's shown.  The HTML keeps what the
  // browser's would have written into it from the stylesheet: the rubrics' color, and ℣ and ℟'s font.
  var copyStyles = {red: ['color'], versiculum: ['font-family', 'color']};
  // A TreeWalker filter for the elements of a range, which adds each one's mark for the copy.
  var copyFilter = function(range, marks) {
    return {acceptNode: function(el) {
      if(el.namespaceURI !== htmlNamespace || !range.intersectsNode(el)) return NodeFilter.FILTER_REJECT;
      if(el.getClientRects().length === 0) {
        marks.push([el, 'data-copy-hidden', '']);
        return NodeFilter.FILTER_REJECT;
      }
      var style = [];
      Object.keys(copyStyles).forEach(function(name) {
        if(!el.classList.contains(name)) return;
        copyStyles[name].forEach(function(property) {
          style.push(property + ':' + window.getComputedStyle(el).getPropertyValue(property));
        });
      });
      if(style.length) marks.push([el, 'data-copy-style', style.join(';')]);
      return NodeFilter.FILTER_SKIP;
    }};
  };
  var copyWithoutSoftHyphens = function(e) {
    var selection = window.getSelection();
    if(!e.clipboardData || !selection || !selection.rangeCount) return;
    var text = selection.toString();
    if(text.indexOf('\u00AD') < 0) return;
    var html = document.createElement('div');
    for(var i = 0; i < selection.rangeCount; ++i) {
      var range = selection.getRangeAt(i);
      // Each selected element is marked in the copy: what's hidden (the Latin in 'translation only'
      // mode), so it can go, and what has a style to keep.  A score's SVG, what isn't selected and
      // what's hidden are passed over whole, and the marks go on only after all are read, so the
      // page is laid out once.
      var marks = [];
      var root = range.commonAncestorContainer;
      if(root.nodeType !== 1) root = root.parentNode;
      var walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, copyFilter(range, marks));
      while(walker.nextNode()) {}
      marks.forEach(function(mark) { mark[0].setAttribute(mark[1], mark[2]); });
      html.appendChild(range.cloneContents());
      marks.forEach(function(mark) { mark[0].removeAttribute(mark[1]); });
    }
    [].slice.call(html.querySelectorAll('[data-copy-hidden]')).forEach(function(el) {
      if(el.parentNode) el.parentNode.removeChild(el);
    });
    [].slice.call(html.querySelectorAll('[data-copy-style]')).forEach(function(el) {
      el.setAttribute('style', el.getAttribute('data-copy-style'));
      el.removeAttribute('data-copy-style');
    });
    e.clipboardData.setData('text/plain', text.replace(SHY, ''));
    e.clipboardData.setData('text/html', html.innerHTML.replace(SHY, ''));
    e.preventDefault();
  };

  var watch = function() {
    hyphenateBlock(document.body);
    new MutationObserver(hyphenateChanged).observe(document.body,
      {childList: true, subtree: true, attributes: true, attributeFilter: ['lang', 'class']});
    document.addEventListener('copy', copyWithoutSoftHyphens);
  };

  return {
    watch: watch
  };
});
