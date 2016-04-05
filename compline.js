$(function(){
  $.QueryString = (function (a) {
      if (a == "") return {};
      var b = {};
      for (var i = 0; i < a.length; ++i) {
          var p = a[i].split('=');
          if (p.length != 2) continue;
          b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
      }
      if (b.successMsg) showAlert(false, b.successMsg);
      if (b.failMsg) showAlert(true, b.failMsg);
      return b;
  })(window.location.search.substr(1).split('&'));
  var date = new Date();
  var day = date.getDay();
  var dayName;
  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  if($.QueryString.day) {
    var test = $.QueryString.day;
    if(test in days) {
      day = test;
    } else {
      test = days.indexOf(test);
      if(test in days) {
        day = test;
      }
    }
  }
  var setPsalms = function(day,paschalTime) {
    pt = paschalTime?'-PT':'';
    var ant = paschalTime?
      "<chant-gabc src='psalms/ant-PT.gabc'></chant-gabc>" :
      "<chant-gabc src='psalms/"+day+"/ant.gabc'></chant-gabc>";
    var psalm = "<chant-gabc src='psalms/"+day+"/psalm"+pt+".gabc'></chant-gabc>";
    dayName = days[day];
    $('#weekday').text(dayName);
    var gotData = function(data){
      var html = ant + psalm + data + ant;
      $('#placeholder').empty().append(html);
      //TODO: fix to work with exsurge: updateGabc();
      $('#in-manus-tuas-' + (paschalTime?'pt':'ordinary')).prop('checked',true).change();
      if(day == 0 || day == 6) {
        $('#te-lucis-Ordinary').prop('checked',true).change();
      }
    };
    $.get('psalms/'+day+'/psalm-verses'+pt+'.html',gotData).error(function(){
      $.get('psalms/'+day+'/psalm-verses.html',gotData);
    });
  }
  var pt = $.QueryString.pt && $.QueryString.pt!='0' && $.QueryString.pt!='false';
  setPsalms(day,pt);
  if(pt) {
    $('#season-paschal').prop('checked',true);
  }
  var setChantSrc = function($elem,src){
    if(!$elem || $elem.length == 0) return;
    $elem.attr('src',src);
    $elem.data('setSrc')(src);
  };
  $('[id$=-choices] input').change(function(){
    var chant = this.name;
    if(chant=='season') {
      setPsalms(day,this.value=='paschal');
      return;
    }
    var src = chant + '/' + this.value + '.gabc';
    console.info(src);
    setChantSrc($('#'+chant),src);
    var $div = $('chant-gabc[' + this.id + ']');
    if($div.length > 0) {
      setChantSrc($div,$div.attr(this.id));
    }
    $('div.' + chant).hide();
    $('div.' + chant + '.' + this.value).show();
  });
});