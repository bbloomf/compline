$(function(){
  // the following function is based on one taken from http://www.irt.org/articles/js052/index.htm
  // Y is the year to calculate easter for, e.g., 2017
  function EasterDate(Y) {
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

    return moment([Y,M-1,D]);
  }
  var dateCache = {};
  function datesForYear(Y) {
    if(Y in dateCache) return dateCache[Y];
    var dates = {}
    dates.easter = EasterDate(Y);
    dates.septuagesima = moment(dates.easter).subtract(7*9,'days');
    dates.lent1 = moment(dates.septuagesima).add(7*4,'days');
    dates.pentecost = moment(dates.easter).add(49,'days');
    dates.christmas = moment([Y,11,25]);
    dates.advent1 = moment(dates.christmas).subtract((dates.christmas.day() || 7) + 7*3,'days');
    dates.allSouls = moment([Y,10,2]);
    if(dates.allSouls.day() == 0) dates.allSouls.add(1,'day');
    dates.sacredHeart = moment(dates.pentecost).add(19,'days');
    dates.christTheKing = moment([Y,9,31]);
    dates.christTheKing.subtract(dates.christTheKing.day(),'days');
    dates.sevenDolors = moment([Y,8,15]);
    dates.epiphany = moment([Y,0,6]);
    // The Feast of the Holy Family is on the Sunday following Epiphany, unless Epiphany falls on a Sunday,
    // in which case The Holy Family will be on the Saturday following.
    dates.holyFamily = moment(dates.epiphany).add(7 - (dates.epiphany.day()||1), 'days');
    dates.transfiguration = moment([Y,7,6]);
    return dateCache[Y] = dates;
  }
  function isTriduum(date) {
    var easter = EasterDate(date.year());
    var maundyThursday = moment(easter).subtract(3,'days');
    return date.isSameOrAfter(maundyThursday) && date.isBefore(easter);
  }
  function isPaschalWeek(date) {
    var easter = EasterDate(date.year());
    var easterSaturday = moment(easter).add(6,'days');
    return date.isSameOrAfter(easter) && date.isBefore(easterSaturday);
  }
  function isPaschalTime(date) {
    var easter = EasterDate(date.year());
    var pentecostSaturday = moment(easter).add(55,'days');
    return date.isSameOrAfter(easter) && date.isBefore(pentecostSaturday);
  }
  function isAdvent(date) {
    var christmas = moment([date.year(),11,25]);
    var advent1 = moment(christmas).subtract((christmas.day() || 7) + 7*3,'days');
    return date.isSameOrAfter(moment(advent1).subtract(1,'day')) && date.isSameOrBefore(moment(christmas).subtract(1,'day'));
  }
  //                    xxx1222222113333331x45555544466666677777444xxxxx89a
  var regexDateRange = /(?:((\d\d)\/(\d\d))|((\w+)(?:([+-])(\d+))?))(?::(((\d\d)\/(\d\d))|((\w+)(?:([+-])(\d+))?)))?/g;
  function momentFromRegex(date,matches,dates) {
    if(matches[1]) {
      return moment([date.year(), parseInt(matches[2]) - 1, parseInt(matches[3])]);
    } else if(matches[5] in dates) {
      var m = moment(dates[matches[5]]||[0]);
      if(matches[7]) {
        var days = parseInt(matches[7]) || 0;
        if(matches[6] == '-') {
          days *= -1;
        }
        m.add(days, 'days');
      }
      return m;
    } else {
      console.info('date not found: ' + matches[5]);
      return moment('');
    }
  }
  function dateMatches(date,dateRange) {
    var dates = datesForYear(date.year());
    var matches = regexDateRange.exec('');
    while(matches = regexDateRange.exec(dateRange)) {
      var range = [momentFromRegex(date,matches,dates)];
      if(matches[8]) {
        range.push(momentFromRegex(date,matches.slice(8),dates))
        if (date.isBetween(range[0],range[1],'day','[]')) return true;
      } else {
        if (date.isSame(range[0],'day')) return true;
      }
    }
    return false;
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
  var date = moment();
  
  $('#date').val(date.format("YYYY-MM-DD"));
  var day = date.day();
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
  // type should be '-po' for paschal octave, or '-asd' for all souls' day, or '' for regular
  var currentCanticle = '';
  var setCanticle = function(type) {
    if(type == currentCanticle) return;
    currentCanticle = type;
    var ant = "<chant-gabc src='canticle-ant"+type+".gabc'></chant-gabc>";
    var psalm = "<chant-gabc src='canticle-psalm"+type+".gabc'></chant-gabc>";
    var gotData = function(data){
      var html = ant + psalm + data;
      if(type === '-po') {
        html += "<chant-gabc src='haec-dies.gabc'></chant-gabc>";
      } else {
        html += ant;
      }
      $('#canticle').empty().append(html);
    };
    $('#canticle').empty();
    $.get('canticle-psalm'+type+'.html',gotData);
  }
  var setPsalms = function(day,paschalTime,isSunday) {
    var ant = '',
        psalm = '';
    if(day === 'triduum') {
      day = 0;
      pt = '-triduum';
    } else if(day === 'asd') {
      pt = '';
      psalm = "Psalm 122<br/><chant-gabc src='psalms/"+day+"/psalm"+pt+".gabc'></chant-gabc>";
    } else {
      pt = paschalTime?'-PT':'';
      ant = paschalTime?
        "<chant-gabc src='psalms/ant-PT.gabc'></chant-gabc>" :
        "<chant-gabc src='psalms/"+day+"/ant.gabc'></chant-gabc>";
      if(paschalTime === 'no-antiphon') ant = '';
      psalm = "<chant-gabc src='psalms/"+day+"/psalm"+pt+".gabc'></chant-gabc>";
      dayName = days[day];
      if(!isSunday) $('#weekday').text(dayName);
    }
    var gotData = function(data){
      var html = ant + psalm + data + ant;
      $('#placeholder').empty().append(html);
    };
    $.get('psalms/'+day+'/psalm-verses'+pt+'.html',gotData).error(function(){
      $.get('psalms/'+day+'/psalm-verses.html',gotData);
    });
  }
  var setDate = function(date) {
    //show and hide [include] and [exclude] elements based on the date
    $('[exclude]').each(function(){
      var $this = $(this);
      $this.toggle(!dateMatches(date, $this.attr('exclude')));
    });
    $('[include]').each(function(){
      var $this = $(this);
      $this.toggle(dateMatches(date, $this.attr('include')));
    });
    //select inputs based on date
    $('input[select-date]').each(function(){
      var $this = $(this);
      var selectDay = $this.attr('select-day');
      if(selectDay) {
        selectDay = new RegExp(selectDay).exec(date.day());
      } else {
        selectDay = true;
      }
      var matches = dateMatches(date, $this.attr('select-date'));
      if(matches && selectDay) {
        $this.prop('checked', true).change();
      } else {
        var otherInputs = $('input[name=' + $this.attr('name') + ']');
        if(otherInputs.length==1 && !otherInputs.is('[select-date]')) {
          otherInputs.prop('checked',true).change();
        }
      }
    });
    var isPT = isPaschalTime(date);
    var showChooseDay = (date.day() != 0);
    if(isPT && isPaschalWeek(date)) {
      showChooseDay = false;
      setPsalms(0,'no-antiphon',true);
      setCanticle('-po');
      $('#weekday').text('Easter ' + days[date.day()]);
    } else if(isTriduum(date)) {
      showChooseDay = false;
      var day = date.day();
      setPsalms('triduum');
      var name;
      switch(day) {
        case 4:
          name = 'Maundy Thursday';
          break;
        case 5:
          name = 'Good Friday';
          break;
        case 6:
          name = 'Holy Saturday';
          break;
      }
      $('#weekday').text(name);
    } else if(dateMatches(date,'allSouls')) {
      showChooseDay = false;
      $('#weekday').text('All Souls Day');
      setPsalms('asd');
      setCanticle('-asd');
    } else {
      setPsalms(date.day(),isPT);
      setCanticle('');
    }
    $('.chooseDay').toggle(showChooseDay);
    //TODO: if this is a first or second class feast, it should check #rbSunday instead:
    $('#rbWeekday').prop('value',date.day()).prop('checked',true);
    $('input[value="per-annum"]').prop('checked',!isPT).change();
    if(isAdvent(date)) {
      $('.radio-advent').prop('checked',true).change();
    }
    if(date.isBefore(moment([date.year(), 1, 2]))) {
      $('.radio-till-feb2').prop('checked',true).change();
    } else if(date.isBefore(moment(EasterDate(date.year())).subtract(3,'days'))) {
      $('.radio-feb2-till-spy-wed').prop('checked',true).change();
    }
    if((day == 0 || day == 6) && $('#te-lucis-Ferial').prop('checked')) {
      $('#te-lucis-Ordinary').prop('checked',true).change();
    }
  }
  $('#date').change(function(){
    if(this.value) setDate(moment(this.value));
  }).change();
  var setChantSrc = function($elem,src){
    if(!$elem || $elem.length == 0) return;
    $elem.attr('src',src);
    $elem.data('setSrc')(src);
  };
  $('input[name=weekday]').change(function(){
    if(this.checked) {
      setPsalms(parseInt(this.value), choices.season == 'paschal', true);
    }
  });
  var choices = {};
  $('[id$=-choices] input').change(function(){
    var chant = this.name;
    choices[chant] = this.value;
    if(chant=='season') {
      return;
    }
    var src = chant + '/' + this.value + '.gabc';
    setChantSrc($('#'+chant),src);
    var $div = $('chant-gabc[' + this.id + ']');
    if($div.length > 0) {
      setChantSrc($div,$div.attr(this.id));
    }
    $('div.' + chant).hide();
    $('div.' + chant + '.' + this.value).show();
  });
});