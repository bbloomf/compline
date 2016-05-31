$(function(){
  // the following function is based on one taken from http://www.irt.org/articles/js052/index.htm
  // Y is the year to calculate easter for, e.g., 2017
  function EasterDates(Y) {
    var C = Math.floor(Y/100);
    var N = Y - 19*Math.floor(Y/19);
    var K = Math.floor((C - 17)/25);
    var I = C - Math.floor(C/4) - Math.floor((C - K)/3) + 19*N + 15;
    I = I - 30*Math.floor((I/30));
    I = I - Math.floor(I/28)*(1 - Math.floor(I/28)*Math.floor(29/(I + 1))*Math.floor((21 - N)/11));
    var J = Y + Math.floor(Y/4) + I + 2 - C + Math.floor(C/4);
    J = J - 7*Math.floor(J/7);
    var L = I - J;
    var M = 3 + Math.floor((L + 40)/44);
    var D = L + 28 - 31*Math.floor(M/4);

    var easter = new Date(Y,M-1,D);
    var septuagesima = new Date(easter);
    var pentecost = new Date(easter);
    septuagesima.setDate(easter.getDate() -(7 * 9));
    pentecost.setDate(easter.getDate() + (7 * 7));
    return {
      easter: easter,
      septuagesima: septuagesima,
      pentecost: pentecost
    }
  }
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
  var days = 1000*60*60*24; //number of milliseconds in a day;
  var date = new Date();
  var dates = EasterDates(date.getFullYear());
  dates.pentecostSaturday = new Date(dates.pentecost);
  dates.pentecostSaturday.setDate(dates.pentecost.getDate() + 6)
  dates.christmas = new Date(date.getFullYear(),11,25);
  dates.advent1 = new Date(dates.christmas.getTime() - ((dates.christmas.getDay() || 7) + 7*3)*days);
  var isPaschalTime = (date >= dates.easter && date < dates.pentecostSaturday);
  var isAdvent = (date >= (dates.advent1 - 1*days)) && (date <= (dates.christmas - 1*days));
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
    };
    $.get('psalms/'+day+'/psalm-verses'+pt+'.html',gotData).error(function(){
      $.get('psalms/'+day+'/psalm-verses.html',gotData);
    });
  }
  setPsalms(day,isPaschalTime);
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
  if(isPaschalTime) {
    $('.radio-pt').prop('checked',true).change();
  }
  if(isAdvent) {
    $('.radio-advent').prop('checked',true).change();
  }
  if(date < new Date(date.getFullYear(), 1, 2)) {
    $('.radio-till-feb2').prop('checked',true).change();
  } else if(date < dates.easter - 3*days) {
    $('.radio-feb2-till-spy-wed').prop('checked',true).change();
  }
  if((day == 0 || day == 6) && $('#te-lucis-Ferial').prop('checked')) {
    $('#te-lucis-Ordinary').prop('checked',true).change();
  }
});