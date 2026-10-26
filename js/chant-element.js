define(['jquery','exsurge','document-register-element'], function($,exsurge) {
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
  // The whole of a GABC file as HTML.  Blank lines separate paragraphs, and a paragraph whose
  // lines all start with a number is a psalm, laid out like the pointed verses.  Only the
  // first textLines lines are kept, if it's given: the rest of a psalm's intonation file
  // shows how to sing the flex and later verses.
  var gabcToHtml = function(gabc, annotationAttr, useDropCapAttr, textLines) {
    var lineCount = 0;
    return splitGabc(gabc).map(function(score) {
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
      if(prefix) body = prefix + ' ' + body;
      return html + body.trim().split(/\r?\n\s*\r?\n/).map(function(paragraph) {
        var lines = paragraph.split(/\r?\n/).map(gabcLineToHtml).filter(function(line) {
          return line && !(textLines && ++lineCount > textLines);
        });
        if(lines.length === 0) return '';
        var verse = /^(\d+\.) /;
        if(lines.every(function(line) { return verse.test(line); })) {
          return '<div class="verses">' + lines.map(function(line) {
            return line.replace(verse, '<p><span class="verse-number">$1&nbsp;</span>') + '</p>';
          }).join('') + '</div>';
        }
        return '<p>' + lines.join('<br>').replace(verse, "<span class='red'>$1</span> ") + '</p>';
      }).join('');
    }).join('');
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
    return svg.replace(/^(<svg[^>]*?) width="([0-9.]+)" height="[0-9.]+"/, function(match, start, width) {
      return start + ' width="' + (100 * width / layoutWidth) + '%"';
    });
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
      var innerHTML = '';
      for(var i = 0; i < score.length; ++i) {
        if(score[i].userNotes) {
          innerHTML += '<i class="red">'+score[i].userNotes + '</i>';
        }
        if(score[i].commentary) {
          innerHTML += '<i class="red" style="float:right">'+score[i].commentary + '</i>';
        }
        score[i].performLayout(ctxt);
        score[i].layoutChantLines(ctxt, width);
        // render the score to svg code
        if(sync) {
          innerHTML += score[i].createSvgForEachLine(ctxt);
        } else {
          innerHTML += makeSvgScalable(score[i].createSvg(ctxt), width);
        }
      }
      this.innerHTML = innerHTML;
    }

    isPlainText() {
      return this.hasAttribute('plain-text');
    }

    setGabc(gabc, annotationAttr, useDropCapAttr) {
      if(/^\s*$/.test(gabc)) return;
      this._gabc = gabc;
      this._annotationAttr = annotationAttr;
      this._useDropCapAttr = useDropCapAttr;
      this._width = 0;
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
        this.innerHTML = gabcToHtml(gabc, annotationAttr, useDropCapAttr, parseInt(this.getAttribute('text-lines')));
        return;
      }
      var mappings = this._mappings = [];
      var score = this._score = [];
      var ctxt = this._ctxt;
      gabc = normalizeGabc(gabc.replace(/(<b>[^<]+)<sp>'(?:oe|œ)<\/sp>/g,'$1œ</b>\u0301<b>') // character doesn't work in the bold version of this font.
        .replace(/<b><\/b>/g,''));
      var scores = splitGabc(gabc);
      for(var i=0; i<scores.length; ++i) {
        var gabcHeader = scores[i].header;
        gabc = scores[i].body
          .replace(/([^c])u([aeiouáéíóú])/g,'$1u{$2}')
          .replace(/<\/?sc>/g,'%')
          .replace(/<\/?b>/g,'*')
          .replace(/<\/?i>/g,'_')
          .replace(/(\s)_([^\s*]+)_(\(\))?(\s)/g,"$1^_$2_^$3$4")
          .replace(/(\([cf][1-4]\)|\s)(\d+\.)(\s\S)/g,"$1^$2^$3");
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
        } else if(annotationAttr) {
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