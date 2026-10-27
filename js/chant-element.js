define(['jquery','exsurge','text-mode','document-register-element','chant-playback'], function($,exsurge,textMode) {
  'use strict';
  var printWidth = 672;
  // On screen, chant is laid out no wider than this, and on wider screens the
  // SVG is scaled up to fill the width (as in jgabc's propers page).  The body
  // text in style.css scales by the same ratio, so the two stay in proportion.
  var maxLayoutWidth = 624;
  var regexGabcHeader = /((?:[\w-_]+:\s*[^;\r\n]*;?\r?\n)+)%%\r?\n/;
  // Splits GABC into its scores, each with its header as an object.  A header line
  // that repeats (annotation) gives an array.
  var splitGabc = function(gabc) {
    var gabcs = gabc.split(regexGabcHeader);
    if(gabcs.length===1) gabcs.splice(0,0,'','');
    var scores = [];
    for(var i=1; i<gabcs.length; i+=2) {
      scores.push({
        header: gabcs[i].split(/\r?\n/).reduce(function(result,line){
          var match = line.match(/^%?([\w-_]+):\s*([^;\r\n]*)(?:;|$)/i);
          if(match) {
            if(match[1] in result) {
              if(typeof result[match[1]] === 'string') {
                result[match[1]] = [result[match[1]], match[2]];
              } else {
                result[match[1]].push(match[2]);
              }
            } else {
              result[match[1]] = match[2];
            }
          }
          return result;
        }, {}),
        body: gabcs[i+1]
      });
    }
    return scores;
  };
  // GABC markup that both the chant and the plain text turn into plain characters.
  var normalizeGabc = function(gabc) {
    return gabc.replace(/<v>\\([VRA])bar<\/v>/g, '$1/.')
      .replace(/<sp>'(?:ae|æ)<\/sp>/g,'ǽ')
      .replace(/<sp>'(?:oe|œ)<\/sp>/g,'œ́')
      .replace(/<v>\\greheightstar<\/v>/g,'*');
  };
  // Plain text (TRANSLATIONS_PLAN.md §4c).  A <chant-gabc> shows its words instead of the
  // chant while it has the attribute plain-text.
  // One line of GABC as HTML: the neumes go and the syllables join into words.
  var gabcLineToHtml = function(line) {
    return normalizeGabc(line).replace(/V\/\.|<sp>V\/<\/sp>/g, '℣')
      .replace(/R\/\.|<sp>R\/<\/sp>/g, '℟')
      // a whole word in italics is a rubric, as in setGabc (marked by \u0001…\u0002 until the tags go)
      .replace(/(^|\s)<i>([^<\s*]+)<\/i>(?:\(\))?(?=\s|$)/g, '$1\u0001$2\u0002')
      .replace(/\([^)]*\)/g, '')
      // what's left is pointing, which plain text doesn't show
      .replace(/<[^>]*>/g, '')
      .replace(/&/g, '&amp;')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/℣ ?/g, "<span class='versiculum'>v</span>&nbsp;")
      .replace(/℟ ?/g, "<span class='versiculum'>r</span>&nbsp;")
      // * and †, and the ** where the choir takes over in a long melisma ("alle- * ** luia")
      .replace(/ (\*+|†)(?= |$)/g, "&nbsp;<span class='red'>$1</span>")
      .replace(/\u0001/g, "<i class='red'>")
      .replace(/\u0002/g, '</i>');
  };
  // Annotations that belong to the text; the others give the mode.
  var annotationGabc = {
    'V/.': '<v>\\Vbar</v>',
    'R/.': '<v>\\Rbar</v>',
    '<v>\\Vbar</v>': '<v>\\Vbar</v>',
    '<v>\\Rbar</v>': '<v>\\Rbar</v>',
    'Ant.': '<i>Ant.</i>'
  };
  // The paragraphs of a score that isn't a psalm, each of which is a unit of its translation
  // (TRANSLATIONS_PLAN.md §4).  gabcToHtml and splitUnits both use this, so a translation pairs
  // the same way with the words as with the chant.  Blank lines separate paragraphs, and a
  // paragraph with no words (only neumes or bars) belongs to the one before it, or if it comes
  // first, to the one after.
  var unitParagraphs = function(body) {
    var paragraphs = [];
    var wordless = '';
    body.split(/\r?\n\s*\r?\n/).forEach(function(paragraph) {
      if(!/\S/.test(paragraph)) return;
      var hasWords = paragraph.split(/\r?\n/).some(function(line) { return !!gabcLineToHtml(line); });
      if(hasWords) {
        paragraphs.push(wordless + paragraph);
        wordless = '';
      } else if(paragraphs.length) {
        paragraphs[paragraphs.length - 1] += '\n\n' + paragraph;
      } else {
        wordless += paragraph + '\n\n';
      }
    });
    if(wordless) paragraphs.push(wordless);
    return paragraphs;
  };
  // The whole of a GABC file as HTML.  Blank lines separate paragraphs, and in a psalm, a
  // paragraph whose lines all start with a number is laid out like the pointed verses.  Only the
  // first textLines lines are kept, if it's given: the rest of a psalm's intonation file
  // shows how to sing the flex and later verses.
  // With a translation (see translation() below), each psalm verse is followed by its own,
  // and each other paragraph by its unit.  If the units don't match the paragraphs, they all
  // follow the whole chant.
  var gabcToHtml = function(gabc, annotationAttr, useDropCapAttr, textLines, translation) {
    var lineCount = 0;
    var verse = /^(\d+)\. /;
    var units = translation && translation.units;
    var paragraphs = [];
    splitGabc(gabc).forEach(function(score) {
      var header = score.header;
      var useDropCap = ('initial-style' in header)? header['initial-style'] === '1' : useDropCapAttr;
      var html = '';
      if(header['user-notes']) {
        html += '<i class="red">'+header['user-notes'] + '</i>';
      }
      if(header.commentary) {
        html += '<i class="red" style="float:right">'+header.commentary + '</i>';
      }
      var annotation = (header.annotation && useDropCap)? header.annotation : annotationAttr;
      var prefix = [].concat(annotation || []).map(function(annotation) {
        return annotationGabc[annotation] || '';
      }).join(' ');
      var body = score.body;
      if(useDropCap) {
        // The first letter isn't a drop cap, so the capitals after it (as in "TE lucis") are lower case.
        body = body.replace(/^((?:\s|\([^)]*\))*[^\s(<])([A-ZÀ-ÖØ-ÞŒ]+)/, function(match, start, caps) {
          return start + caps.toLowerCase();
        });
      }
      var section = textMode.psalmSection(header);
      (section? body.trim().split(/\r?\n\s*\r?\n/) : unitParagraphs(body)).forEach(function(paragraph, i) {
        if(i === 0 && prefix) paragraph = prefix + ' ' + paragraph;
        var lines = paragraph.split(/\r?\n/).map(gabcLineToHtml).filter(function(line) {
          return line && !(textLines && ++lineCount > textLines);
        });
        paragraphs.push({
          labels: i === 0? html : '',
          lines: lines,
          verses: !!section && lines.length > 0 && lines.every(function(line) { return verse.test(line); }),
          section: section
        });
      });
    });
    var unitCount = paragraphs.filter(function(p) { return p.lines.length && !p.section; }).length;
    var paired = units && units.length === unitCount;
    var unit = 0;
    paragraphs.forEach(function(p) {
      if(p.lines.length === 0) {
        p.html = '';
      } else if(p.verses) {
        p.html = '<div class="verses">' + p.lines.map(function(line) {
          var n = parseInt(line.match(verse)[1]);
          var latin = line.replace(verse, '');
          if(translation) return textMode.verseHtml(p.section, n, latin);
          return '<p><span class="verse-number">' + n + '.&nbsp;</span>' + latin + '</p>';
        }).join('') + '</div>';
      } else {
        var latin = p.lines.join('<br>').replace(verse, "<span class='red'>$1.</span> ");
        p.html = (translation && !p.section && (paired || !units))?
          textMode.pairHtml(latin, paired? [units[unit++]] : null) : '<p>' + latin + '</p>';
      }
    });
    if(units && !paired) {
      console.warn('The translation has ' + units.length + ' units, the chant ' + unitCount, translation.key);
      // the labels stay out of the Latin, which the translation only hides
      return paragraphs.map(function(p) { return p.labels; }).join('') +
        textMode.pairHtml(paragraphs.map(function(p) { return p.html; }).join(''), units, 'div');
    }
    return paragraphs.map(function(p) { return p.labels + p.html; }).join('');
  };
  // The first letter of a score is a drop cap, so the capitals after it (as in "TE lucis") are lower case.
  var regexDropCapCaps = /^((?:\s|\([^)]*\))*[^\s(<])([A-ZÀ-ÖØ-ÞŒ]+)/;
  // The hymn sung in the translation (TRANSLATIONS_PLAN.md §4b): one paragraph of GABC, after
  // setGabc's rewrites, with its words in place of the Latin's.  unit is the paragraph's hyphenated
  // text, a line for each line of the chant, whose syllables (split at spaces and at a - between
  // letters; ‿ joins two words sung on one note) go one to each syllable of the chant that has
  // notes.  An elided syllable, whose neume is empty, goes; the bars, the clef and a stanza's number
  // stay.  The first syllable stays as it's written, not in capitals as the Latin's ("TE lucis"), so
  // the drop cap reads "B efore", as hymnals print it.  Returns null if the syllables don't match the
  // notes, which tools/do-import/hymn.js checks.
  var swapLyrics = function(gabc, unit) {
    var words = unit.split('\n');
    var lines = gabc.split(/\r?\n/);
    var w = 0;
    var ok = true;
    var result = lines.map(function(line) {
      var regexSyllable = /([^()]*)\(([^)]*)\)/g;
      if(!/\(([^)]*[a-mA-M][^)]*)\)/.test(line.replace(/^\s*\([cf]b?[1-4]\)/, ''))) return line;
      var syllables = [];
      (words[w++] || '').trim().split(/\s+/).forEach(function(word) {
        // (no lookbehind, which older Safari can't parse)
        word.replace(/([\p{L}\p{M}’'‿.,;:!?¡¿])-(?=[\p{L}¡¿])/gu, '$1\u0000').split('\u0000').forEach(function(text, i) {
          if(text) syllables.push({text: text, wordStart: i === 0});
        });
      });
      var out = '';
      var m;
      while((m = regexSyllable.exec(line))) {
        var lead = /^\s/.test(m[1]) ? ' ' : '';
        var text = m[1].trim();
        // a stanza's number ("^2.^ Pro", once setGabc has made it red)
        var number = (text.match(/^\^?\d+\.\^?\s+/) || [''])[0];
        var latin = text.slice(number.length);
        if(latin && /[a-mA-M]/.test(m[2])) {
          var syllable = syllables.shift();
          if(!syllable) {
            ok = false;
            return line;
          }
          out += (syllable.wordStart && out ? ' ' : '') + number + syllable.text + '(' + m[2] + ')';
        } else if(!latin || /\S/.test(m[2])) {
          // a bar or the clef
          out += (out ? lead || (latin ? '' : ' ') : '') + text + '(' + m[2] + ')';
        }
        // else elided
      }
      if(syllables.length) ok = false;
      return out;
    });
    return ok && w === words.length ? result.join('\n') : null;
  };
  // Splits a chant into units for 'both' mode, each a score of its own with the translation that
  // follows it (TRANSLATIONS_PLAN.md §4): a psalm's verses (but a psalm's intonation stays whole,
  // followed by verse 1), or the paragraphs of anything else.  A later unit of a score gets the
  // clef again, and no drop cap, annotation or notes.  A chant with no translation isn't split,
  // and if the units don't match the paragraphs, they all follow the whole chant.
  var regexClef = /^\s*(\([cf]b?[1-4]\))/;
  var splitUnits = function(scores, translation) {
    var units = translation.units;
    var sung = translation.sung;
    var result = [];
    var unitCount = 0;
    scores.forEach(function(score) {
      var section = textMode.psalmSection(score.header);
      if(!(section? textMode.hasPsalm(section) : units || sung) || translation.intonation) {
        var verse = section && translation.intonation && textMode.verseTranslationHtml(section, 1);
        if(verse) score.translationHtml = '<div class="verses chant-tr">' + verse + '</div>';
        result.push(score);
        return;
      }
      var clef = (score.body.match(regexClef) || [])[1] || '(c4)';
      (section? score.body.split(/\r?\n(?=\s*\d+\.\s)/).filter(function(chunk) {
        return /\S/.test(chunk);
      }) : unitParagraphs(score.body)).forEach(function(chunk, i) {
        var unit = {
          header: i === 0? score.header : {'initial-style': '0'},
          body: (i === 0 || regexClef.test(chunk))? chunk : clef + chunk.replace(/^\s+/, ''),
          laterUnit: i > 0,
          paragraph: i === 0? chunk.replace(regexDropCapCaps, function(match, start, caps) { return start + caps.toLowerCase(); }) : chunk
        };
        if(section) {
          var html = textMode.verseTranslationHtml(section, parseInt(chunk.replace(regexClef, '')));
          if(html) unit.translationHtml = '<div class="verses chant-tr">' + html + '</div>';
        } else {
          unit.index = unitCount++;
        }
        result.push(unit);
      });
    });
    if(sung) {
      // the translation's words under the notes, and in 'both' mode the Latin's under each stanza
      if(sung.length !== unitCount) {
        console.warn('The sung translation has ' + sung.length + ' units, the chant ' + unitCount, translation.key);
        return scores;
      }
      result.forEach(function(unit) {
        if(!('index' in unit)) return;
        unit.sung = sung[unit.index];
        if(textMode.mode() !== 'both') return;
        var latin = unit.paragraph.split(/\r?\n/).map(gabcLineToHtml).filter(Boolean).map(function(line) {
          return line.replace(/^(\d+)\. /, "<span class='red'>$1.</span> ");
        });
        unit.translationHtml = "<div class='chant-tr'><p class='tr' lang='la'>" + latin.join("&nbsp;<span class='red'>/</span> ") + '</p></div>';
      });
      return result;
    }
    if(!units) return result;
    // Under the notes, a hymn's or a Marian antiphon's lines run together, with a red slash between them.
    var slashes = /^(te-lucis|marian-antiphon)\/(?!.*-prayer)/.test(translation.key);
    var unitHtml = function(units) {
      return '<div class="chant-tr"><p' + textMode.trAttributes() + '>' + textMode.unitsHtml(units, slashes) + '</p></div>';
    };
    if(units.length !== unitCount) {
      console.warn('The translation has ' + units.length + ' units, the chant ' + unitCount, translation.key);
      scores[scores.length - 1].translationHtml = unitHtml(units);
      return scores;
    }
    result.forEach(function(unit) {
      if('index' in unit) unit.translationHtml = unitHtml([units[unit.index]]);
    });
    return result;
  };
  var _width = window.document.body.clientWidth;
  var doLayout = function(sync) {
    _width = window.document.body.clientWidth;
    console.info(_width, sync);
    if(sync === true) _width = Math.min(_width,printWidth);
    $('chant-gabc').each(function(){
      this.doLayout(_width,sync === true);
    });
  };
  // Wait for the resize or rotation to finish before laying out again.
  var resizeTimeout;
  var doLayoutAfterResize = function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(doLayout, 100);
  };
  // Makes a fixed-size SVG scale to fill the width of its container.
  // exsurge already writes the viewBox, so this only swaps the fixed size for a percentage width.
  var makeSvgScalable = function(svg, layoutWidth) {
    svg.setAttribute('width', (100 * svg.getAttribute('width') / layoutWidth) + '%');
    svg.removeAttribute('height');
    return svg;
  };
  if (window.matchMedia) {
    var mediaQueryList = window.matchMedia('print');
    mediaQueryList.addListener(function(mql) {
      if (mql.matches) {
        console.info('calling before printing via media query');
        printWidth = window.document.body.clientWidth;
        console.info({printWidth:printWidth});
        doLayout(true);
      } else {
        // console.info('calling after printing via media query');
        // doLayout(true);
      }
    });
  }
  var layoutChantSync = function() {
      doLayout(true);
  }
  window.onbeforeprint = function() { doLayout(true) };
  window.onafterprint = function() { doLayout() };
  if (window.addEventListener) {
    window.addEventListener('resize',doLayoutAfterResize,false);
    window.addEventListener('orientationchange',doLayoutAfterResize,false);
  } else if (window.attachEvent) window.attachEvent('onresize',doLayoutAfterResize);
  // client side support
  class ChantVisualElement extends HTMLElement {
    constructor() {
      super();
      this.createdCallback();
    }

    setSrc(src) {
      var elem = this;
      var $this = $(this);
      src = src || $this.attr('src');
      if(!src) return;
      this._width = 0;
      var request = new XMLHttpRequest();
      request.onreadystatechange = function() {
        if (request.readyState === 4 && (request.status === 200 || request.status === 0) && $this.attr('src') === src) {
          elem.setGabc(request.responseText);
        }
      };
      request.open("GET", src, true); // true for asynchronous 
      request.send(null);
    }

    doLayout(newWidth, sync) {

      var score = this._score;
      var ctxt = this._ctxt;
      // not loaded yet, or plain text
      if(!score) return;
      newWidth = newWidth || (this.parentElement && this.parentElement.clientWidth) || window.document.body.clientWidth;
      if(newWidth === 0) return;
      sync = !!sync;
      // printing uses the full width, without scaling
      if(!sync) newWidth = Math.min(newWidth, maxLayoutWidth);
      if(this._width === newWidth && this._sync === sync) return;
      var width = this._width = newWidth;
      this._sync = sync;
      // perform layout on the chant
      this.innerHTML = this._noteHtml || '';
      for(var i = 0; i < score.length; ++i) {
        if(score[i].userNotes) {
          this.insertAdjacentHTML('beforeend', '<i class="red">'+score[i].userNotes + '</i>');
        }
        if(score[i].commentary) {
          this.insertAdjacentHTML('beforeend', '<i class="red" style="float:right">'+score[i].commentary + '</i>');
        }
        score[i].performLayout(ctxt);
        score[i].layoutChantLines(ctxt, width);
        // render the score to svg
        if(sync) {
          this.insertAdjacentHTML('beforeend', score[i].createSvgForEachLine(ctxt));
        } else {
          // as nodes, which playback lights up note by note (chant-playback.js)
          this.appendChild(makeSvgScalable(score[i].createSvgNode(ctxt), width));
        }
        if(score[i].translationHtml) {
          this.insertAdjacentHTML('beforeend', score[i].translationHtml);
        }
      }
    }

    isPlainText() {
      if(!this.hasAttribute('plain-text')) return false;
      // with the translation only, a hymn sung in the translation is still drawn as notes (§4b)
      var hymn = textMode.mode() === 'tr' && textMode.hymn(this.getAttribute('src'), true);
      return !(hymn && hymn.kind === 'sung');
    }

    // The translation of this chant (TRANSLATIONS_PLAN.md §4), or null in 'la' mode.  A psalm's
    // comes verse by verse from the psalter, and anything else's is a unit per paragraph, keyed
    // by its src.  A psalm's intonation (text-lines) has only verse 1.  The hymn's is as hymnMode
    // chooses (§4b): sung is the translation's words for the notes, and unsung says that this
    // tone's doxology can't be sung in the language, so it's shown as text.
    translation() {
      if(textMode.mode() === 'la') return null;
      var key = this.getAttribute('src');
      var psalm = this.getAttribute('notation') === 'psalms';
      var hymn = textMode.hymn(key, !this.hasAttribute('plain-text') || textMode.mode() === 'tr');
      var sung = hymn && hymn.kind === 'sung';
      return {
        key: key,
        units: psalm || sung? null : hymn? hymn.units : textMode.texts(key),
        sung: sung? hymn.units : null,
        unsung: !!(hymn && hymn.unsung),
        intonation: psalm && this.hasAttribute('text-lines')
      };
    }

    // Draws the chant again if the text mode or translation has changed since it was drawn.
    updateText() {
      if(this._gabc && this._textKey !== textMode.renderKey(this.getAttribute('src'))) {
        this.setGabc(this._gabc, this._annotationAttr, this._useDropCapAttr);
      }
    }

    setGabc(gabc, annotationAttr, useDropCapAttr) {
      if(/^\s*$/.test(gabc)) return;
      this._gabc = gabc;
      this._annotationAttr = annotationAttr;
      this._useDropCapAttr = useDropCapAttr;
      this._width = 0;
      this._textKey = textMode.renderKey(this.getAttribute('src'));
      var translation = this.translation();
      this._noteHtml = translation && translation.unsung?
        "<p class='red hymn-note'><i>Not available to sing in " + textMode.langName() + ' for this season.</i></p>' : '';
      var useDropCap = [];
      if (useDropCapAttr === 'false') {
        useDropCapAttr = false;
      } else {
        useDropCapAttr = true;
      }

      this._plainText = this.isPlainText();
      this.classList.toggle('plain-text', this._plainText);
      if(this._plainText) {
        // no exsurge layout at all
        this._score = null;
        this.innerHTML = this._noteHtml + gabcToHtml(gabc, annotationAttr, useDropCapAttr, parseInt(this.getAttribute('text-lines')), translation);
        return;
      }
      var mappings = this._mappings = [];
      var score = this._score = [];
      var ctxt = this._ctxt;
      gabc = normalizeGabc(gabc.replace(/(<b>[^<]+)<sp>'(?:oe|œ)<\/sp>/g,'$1œ</b>\u0301<b>') // character doesn't work in the bold version of this font.
        .replace(/<b><\/b>/g,''));
      var scores = splitGabc(gabc);
      if(translation) scores = splitUnits(scores, translation);
      for(var i=0; i<scores.length; ++i) {
        var gabcHeader = scores[i].header;
        gabc = scores[i].body
          .replace(/([^c])u([aeiouáéíóú])/g,'$1u{$2}')
          .replace(/<\/?sc>/g,'%')
          .replace(/<\/?b>/g,'*')
          .replace(/<\/?i>/g,'_')
          .replace(/(\s)_([^\s*]+)_(\(\))?(\s)/g,"$1^_$2_^$3$4")
          .replace(/(\([cf][1-4]\)|\s)(\d+\.)(\s\S)/g,"$1^$2^$3");
        // the hymn sung in the translation: its words go in after the rewrites above, which are for Latin
        if(scores[i].sung) {
          var swapped = swapLyrics(gabc, scores[i].sung);
          if(swapped) gabc = swapped;
          else console.warn('The sung translation doesn\'t fit the notes', this.getAttribute('src'), scores[i].sung);
        }
        mappings[i] = exsurge.Gabc.createMappingsFromSource(ctxt, gabc);
        if('initial-style' in gabcHeader) {
          useDropCap[i] = gabcHeader['initial-style'] === '1';
        }
        if(!(i in useDropCap)) useDropCap[i] = useDropCapAttr;
        score[i] = new exsurge.ChantScore(ctxt, mappings[i], useDropCap[i]);
        if(gabcHeader && gabcHeader.annotation && useDropCap[i]) {
          if(gabcHeader.annotation instanceof Array) {
            score[i].annotation = new exsurge.Annotations(ctxt, gabcHeader.annotation[0], gabcHeader.annotation[1]);
          } else {
            score[i].annotation = new exsurge.Annotation(ctxt, gabcHeader.annotation);
          }
        } else if(annotationAttr && !scores[i].laterUnit) {
          score[i].annotation = new exsurge.Annotation(ctxt, annotationAttr);
        } else if(gabcHeader && gabcHeader.mode) {
          score[i].annotation = new exsurge.Annotation(ctxt, gabcHeader.mode + '.');
        }
        if(gabcHeader && gabcHeader['user-notes']) {
          score[i].userNotes = gabcHeader['user-notes'];
        }
        if(gabcHeader && gabcHeader.commentary) {
          score[i].commentary = gabcHeader.commentary;
        }
        score[i].translationHtml = scores[i].translationHtml;
      }
      this.doLayout(_width);
    }

    createdCallback() {
      var ctxt = new exsurge.ChantContext(exsurge.TextMeasuringStrategy.Canvas);

      ctxt.setGlyphScaling(1/16);
      // Draw in the inherited CSS `color` (see theme.css) so the chant follows light/dark
      // mode without re-rendering.  setFont() gives every text style this color.
      ctxt.textColor = 'currentColor';
      ctxt.staffLineColor = ctxt.neumeLineColor = ctxt.dividerLineColor = 'currentColor';
      // The hollow of a punctum cavum has to match the background.  Glyphs are shared through <use>,
      // whose shadow tree stylesheet rules cannot reach, so the colour travels with the glyph as a fill
      // attribute whose variable resolves per theme (see theme.css).
      ctxt.negativeFillColor = 'var(--exsurge-negative-fill, #fff)';
      // lyrics are 0.9 of the font size: 19.2px
      ctxt.setFont("'Crimson Text', serif", 19.2 / 0.9);
      ctxt.textStyles.dropCap.size = 64;
      ctxt.textStyles.annotation.size = 13;
      ctxt.textStyles.annotation.color = 'var(--rubric-color, #d00)';
      ctxt.minLyricWordSpacing *= 0.7;
      ctxt.accidentalSpaceMultiplier = 1.5;
      // keep the vertical spacing that exsurge had before 2.0
      ctxt.minSpaceAboveStaff = 1;
      ctxt.spaceBetweenSystems = 0;
      // choose the line breaks of the whole score together, as Gregorio does, rather than filling
      // each line in turn; doLayout() lays out the screen and print renders the same way
      ctxt.lineBreaking = 'optimal';
      // and never leave a lone syllable such as the "men." of "℟. A-men." for the last line
      ctxt.minSyllablesLastLine = 2;
      ctxt.minNotesLastLine = 4;

      ctxt.specialCharProperties['font-family'] = "'Versiculum'";
      ctxt.specialCharProperties['font-variant'] = 'normal';
      ctxt.specialCharProperties['font-weight'] = '400';
      var defaultSpecialCharText = ctxt.specialCharText;
      ctxt.specialCharText = function(char) { return defaultSpecialCharText(char).toLowerCase(); };
      // Rubric red follows --rubric-color (theme.css)
      ctxt.setRubricColor('var(--rubric-color, #d00)');

      this._ctxt = ctxt;

      var srcAttr = this.getAttribute("src");
      if(srcAttr) {
        this.setSrc(srcAttr);
      } else {
        this.setGabc(this.innerText,this.getAttribute("annotation"),this.getAttribute("use-drop-cap"));
      }

      this._width = 0;
    }

    attributeChangedCallback(name, oldValue, newValue) {
      switch(name) {
        case "src":
          this.setSrc(newValue);
          return;
        // once drawn, innerText is the rendering, not the GABC
        case "annotation":
          this.setGabc(this._gabc || this.innerText,newValue,this.getAttribute("use-drop-cap"));
          return;
        case "use-drop-cap":
          this.setGabc(this._gabc || this.innerText,this.getAttribute("annotation"),newValue);
          return;
        case "plain-text":
          // redraw only if it has changed between the chant and the words
          if(this._gabc && this.isPlainText() !== this._plainText) {
            this.setGabc(this._gabc, this._annotationAttr, this._useDropCapAttr);
          }
          return;
      }
    }

    static get observedAttributes() { return ['src','annotation','use-drop-cap','plain-text']; }
  };
  // register the custom element
  if(window.customElements && window.customElements.define) {
    window.customElements.define('chant-gabc', ChantVisualElement);
  } else {
    document.registerElement('chant-gabc', {
      prototype: ChantVisualElement.prototype
    });
  }
});