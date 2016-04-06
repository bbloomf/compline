// client side support
var ChantVisualElementPrototype = Object.create(HTMLElement.prototype);

ChantVisualElementPrototype.createdCallback = function() {
  var ctxt = new exsurge.ChantContext();
  var _element = this;
  var $elem = $(this);
  
  ctxt.lyricTextFont = "'Sorts Mill Goudy', serif";
  ctxt.lyricTextSize *= 1.2;
  ctxt.dropCapTextFont = ctxt.lyricTextFont;
  ctxt.annotationTextFont = ctxt.lyricTextFont;

  var useDropCap = true;
  var useDropCapAttr = this.getAttribute("use-drop-cap");
  if (useDropCapAttr === 'false')
    useDropCap = false;

  var mappings, score;
  $elem.data('setSrc', function(src){
    width = 0;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() { 
      if (request.readyState === 4 && request.status === 200) {
        var gabc = request.responseText;
        gabc = gabc.replace(/<v>\\([VRA])bar<\/v>/g,function(match,barType) {
          return barType + '/.';
        }).replace(/<\/?sc>/g,'%')
        .replace(/<\/?b>/g,'*')
        .replace(/<\/?i>/g,'_')
        .replace(/<sp>'ae<\/sp>/g,'ǽ')
        .replace(/<v>\\greheightstar<\/v>/g,'*');
        var gabcHeader = '';
        var headerEndIndex = gabc.indexOf('\n%%\n');
        if(headerEndIndex >= 0) {
          gabcHeader = gabc.slice(0,headerEndIndex).split(/\r?\n/);
          gabc = gabc.slice(headerEndIndex + 4);
        }
        mappings = exsurge.Gabc.parseSource(ctxt, gabc);
        if(gabcHeader) {
          gabcHeader = gabcHeader.reduce(function(result,line){
            var match = line.match(/^([\w-_]+):\s*([^;\r\n]*)(?:;|$)/i);
            if(match) result[match[1]] = match[2];
            return result;
          }, {});
          if('initial-style' in gabcHeader) {
            useDropCap = gabcHeader['initial-style'] === '1';
          }
        }
        score = new exsurge.ChantScore(ctxt, mappings, useDropCap);
        if(gabcHeader && gabcHeader.annotation) {
          score.annotation = new exsurge.Annotation(ctxt, gabcHeader.annotation);
        }
        init();
      }
    }
    request.open("GET", src, true); // true for asynchronous 
    request.send(null);
  });
  var srcAttr = this.getAttribute("src");
  if(srcAttr) {
    $elem.data('setSrc')(srcAttr);
  } else {
    mappings = exsurge.Gabc.parseSource(ctxt, this.innerText);
    score = new exsurge.ChantScore(ctxt, mappings, useDropCap);

    var annotationAttr = this.getAttribute("annotation");
    if (annotationAttr) {
      // add an annotation
      score.annotation = new exsurge.Annotation(ctxt, annotationAttr);
    }
    init();
  }

  var width = 0;
  var doLayout = function() {
    var newWidth = _element.parentElement.clientWidth;
    if(width === newWidth) return;
    width = newWidth;
    // perform layout on the chant
    score.performLayoutAsync(ctxt, function() {
      score.layoutChantLines(ctxt, width, function() {
        // render the score to svg code
        _element.innerHTML = score.createDrawable(ctxt);
      });
    });
  }
  var attached = false;
  var init = function() {
    doLayout();
    if(!attached) {
      if (window.addEventListener)
        window.addEventListener('resize',doLayout,false);
      else if (window.attachEvent)
        window.attachEvent('onresize',doLayout);
    }
  }
}

ChantVisualElementPrototype.attachedCallback = function() {
  
}

document.registerElement = document.registerElement || function() {};
// register the custom element
var ChantVisualElement = document.registerElement('chant-gabc', {
  prototype: ChantVisualElementPrototype
});