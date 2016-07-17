$(function($) {
  'use strict';
  var regexGabcHeader = /((?:[\w-_]+:\s*[^;\r\n]*;?\r?\n)+)%%\r?\n/;
  var _width = window.document.body.clientWidth;
  var doLayout = function() {
    _width = window.document.body.clientWidth;
    $('chant-gabc').each(function(){
      this.doLayout(_width);
    });
  };
  if (window.addEventListener) window.addEventListener('resize',doLayout,false);
  else if (window.attachEvent) window.attachEvent('onresize',doLayout);
  // client side support
  var ChantVisualElementPrototype = Object.create(HTMLElement.prototype);
  ChantVisualElementPrototype.setSrc = function(src) {
    var elem = this;
    var $this = $(this);
    src = src || $this.attr('src');
    if(!src) return;
    this._width = 0;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200 && $this.attr('src') === src) {
        elem.setGabc(request.responseText);
      }
    };
    request.open("GET", src, true); // true for asynchronous 
    request.send(null);
  };
  ChantVisualElementPrototype.doLayout = function(newWidth) {
    var score = this._score;
    var ctxt = this._ctxt;
    newWidth = newWidth || (this.parentElement && this.parentElement.clientWidth) || window.document.body.clientWidth;
    if(newWidth === 0 || this._width === newWidth) return;
    var width = this._width = newWidth;
    // perform layout on the chant
    var innerHTML = '';
    for(var i = 0; i < score.length; ++i) {
      if(score[i].userNotes || score[i].commentary) {
        innerHTML += '<br>';
      }
      if(score[i].userNotes) {
        innerHTML += '<i>'+score[i].userNotes + '</i>';
      }
      if(score[i].commentary) {
        innerHTML += '<i style="float:right">'+score[i].commentary + '</i>';
      }
      score[i].performLayout(ctxt);
      score[i].layoutChantLines(ctxt, width);
      // render the score to svg code
      innerHTML += score[i].createSvg(ctxt);
    }
    this.innerHTML = innerHTML;
  };
  ChantVisualElementPrototype.setGabc = function(gabc, annotationAttr) {
    var useDropCap = [];
    var useDropCapAttr = this.getAttribute("use-drop-cap");
    if (useDropCapAttr === 'false') {
      useDropCapAttr = false;
    } else {
      useDropCapAttr = true;
    }

    var mappings = this._mappings = [];
    var score = this._score = [];
    var ctxt = this._ctxt;
    gabc = gabc.replace(/<v>\\([VRA])bar<\/v>/g,function(match,barType) {
      return barType + '/.';
    }).replace(/(<b>[^<]+)<sp>'(?:oe|œ)<\/sp>/g,'$1œ</b>\u0301<b>') // character doesn't work in the bold version of this font.
      .replace(/<b><\/b>/g,'')
      .replace(/<sp>'(?:ae|æ)<\/sp>/g,'ǽ')
      .replace(/<sp>'(?:oe|œ)<\/sp>/g,'œ́')
      .replace(/<v>\\greheightstar<\/v>/g,'*');
    var gabcs = gabc.split(regexGabcHeader);
    if(gabcs.length===1) gabcs.splice(0,'','');
    var limit = (gabcs.length - 1) / 2;
    for(var i=0; i<limit; ++i) {
      var gabcHeader = gabcs[2*i+1].split(/\r?\n/);
      gabc = gabcs[2*i+2]
        .replace(/([^c])u([aeiouáéíóú])/g,'$1u{$2}')
        .replace(/<\/?sc>/g,'%')
        .replace(/<\/?b>/g,'*')
        .replace(/<\/?i>/g,'_')
        .replace(/(\s)_([^\s*]+)_(\(\))?(\s)/g,"$1^_$2_^$3$4")
        .replace(/(\([cf][1-4]\)|\s)(\d+\.)(\s\S)/g,"$1^$2^$3");
      mappings[i] = exsurge.Gabc.createMappingsFromSource(ctxt, gabc);
      if(gabcHeader) {
        gabcHeader = gabcHeader.reduce(function(result,line){
          var match = line.match(/^%?([\w-_]+):\s*([^;\r\n]*)(?:;|$)/i);
          if(match) result[match[1]] = match[2];
          return result;
        }, {});
        if('initial-style' in gabcHeader) {
          useDropCap[i] = gabcHeader['initial-style'] === '1';
        }
      }
      if(!(i in useDropCap)) useDropCap[i] = useDropCapAttr;
      score[i] = new exsurge.ChantScore(ctxt, mappings[i], useDropCap[i]);
      if(gabcHeader && gabcHeader.annotation && useDropCap[i]) {
        score[i].annotation = new exsurge.Annotation(ctxt, gabcHeader.annotation);
      } else if(annotationAttr) {
        score[i].annotation = new exsurge.Annotation(ctxt, annotationAttr);
      }
      if(gabcHeader && gabcHeader['user-notes']) {
        score[i].userNotes = gabcHeader['user-notes'];
      }
      if(gabcHeader && gabcHeader.commentary) {
        score[i].commentary = gabcHeader.commentary;
      }
    }
    this.doLayout(_width);
  };
  ChantVisualElementPrototype.createdCallback = function() {
    var ctxt = new exsurge.ChantContext();

    ctxt.lyricTextFont = "'Crimson Text', serif";
    ctxt.lyricTextSize *= 1.2;
    ctxt.dropCapTextFont = ctxt.lyricTextFont;
    ctxt.annotationTextFont = ctxt.lyricTextFont;

    this._ctxt = ctxt;

    var srcAttr = this.getAttribute("src");
    if(srcAttr) {
      this.setSrc(srcAttr);
    } else {
      setGabc(this.innerText,this.getAttribute("annotation"));
    }

    this._width = 0;

    this._attached = false;
  };

  ChantVisualElementPrototype.attachedCallback = function() {
    this._attached = true;
  };

  // register the custom element
  var ChantVisualElement = document.registerElement('chant-gabc', {
    prototype: ChantVisualElementPrototype
  });
});