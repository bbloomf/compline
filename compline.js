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
  var Dates = function(Y) {
    if(Y in dateCache) return dateCache[Y];
    this.year = Y;
    this.easter = EasterDate(Y);
    this.septuagesima = moment(this.easter).subtract(7*9,'days');
    this.lent1 = moment(this.septuagesima).add(7*3,'days');
    this.ascension = moment(this.easter).add(39,'days');
    this.pentecost = moment(this.easter).add(49,'days');
    this.christmas = moment([Y,11,25]);
    this.advent1 = moment(this.christmas).subtract((this.christmas.day() || 7) + 7*3,'days');
    this.allSouls = moment([Y,10,2]);
    if(this.allSouls.day() == 0) this.allSouls.add(1,'day');
    this.corpusChristi = moment(this.pentecost).add(11,'days');
    this.sacredHeart = moment(this.pentecost).add(19,'days');
    this.christTheKing = moment([Y,9,31]);
    this.christTheKing.subtract(this.christTheKing.day(),'days');
    this.sevenDolors = moment([Y,8,15]);
    this.epiphany = moment([Y,0,6]);
    // The Feast of the Holy Family is on the Sunday following Epiphany, unless Epiphany falls on a Sunday,
    // in which case The Holy Family will be on the Saturday following.
    this.holyFamily = moment(this.epiphany).add(7 - (this.epiphany.day()||1), 'days');
    this.transfiguration = moment([Y,7,6]);
    dateCache[Y] = this;
  }
  function getSunday(date) {
    var dates = datesForYear(date.year());
    for(var i = 0; i < CalendarSundays.length; ++i) {
      var test = CalendarSundays[i];
      if(test.on) {
        if(date.isSame(momentFromString(test.on,date))) {
          return SundayFeast(test,date,dates);
        }
      } else if(test.before) {
        if(date.isBefore(momentFromString(test.before,date))) {
          return SundayFeast(test,date,dates);
        }
      } else if(test.after) {
        if(date.isAfter(momentFromString(test.after,date))) {
          return SundayFeast(test,date,dates);
        }
      }
    }
  }
  function getFromCalendar(date) {
    if(date.day() === 0) {
      return getSunday(date);
    }
    if(dateMatches(date,'corpusChristi')) return {title:'Corpus Christi', rank:1};
    if(dateMatches(date,'sacredHeart')) return {title:'The Most Sacred Heart of Jesus', rank:1};
    if(dateMatches(date,'easter-3')) return {title:'Maundy Thursday', rank:1};
    if(dateMatches(date,'easter-2')) return {title:'Good Friday', rank:1};
    if(dateMatches(date,'easter-1')) return {title:'Holy Saturday', rank:1};
    if(dateMatches(date,'lent1-4')) return {title:'Ash Wednesday', rank:5}
    if(romanCalendar) {
      if(date.day()==0) return null;
      var month = date.month();
      var day = date.date();
      var d = romanCalendar[month][day];
      if(!d && day > 1) {
        d = romanCalendar[month][day-1];
        if(!d || !d.plus) return null;
        else if(d.plus === 'ifLeapYear' && !date.isLeapYear()) return null;
        else if(d.plus === 'ifSunday' && !date.day()===1) return null;
      }
      return d;
    }
    return null;
  }
  Dates.prototype.firstClassFeast = function(date) {
    d = getFromCalendar(date);
    return !!(d && d.rank === 1);
  }
  Dates.prototype.feastOfOurLady = function(date) {
    d = getFromCalendar(date);
    return !!(d && d.ol);
  }
  Dates.prototype.minorFeast = function(date) {
    d = getFromCalendar(date);
    return (d && d.rank > 1 && d.rank < 5);
  }
  Dates.prototype.feria = function(date) {
    d = getFromCalendar(date);
    if(date.day() === 0) return false;
    return !d || d.rank >= 5;
  }
  Dates.prototype.sunday = function(date) {
    return date.day() === 0;
  }
  function datesForYear(Y) {
    return new Dates(Y);
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
  function momentFromRegex(date,matches,dates) {
    if(matches[1]) {
      return moment([date.year(), parseInt(matches[2]) - 1, parseInt(matches[3])]);
    } else if(matches[5] in dates) {
      var d = dates[matches[5]]||[0];
      if(typeof d === 'function') return dates[matches[5]](date);
      var m = moment(d);
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
  function momentFromString(str,date) {
    var dates = datesForYear(date.year());
    //                    xxx1222222113333331x45555544466666677777444xxxxx89a
    var regexDateRange = /(?:((\d\d)\/(\d\d))|((\w+)(?:([+-])(\d+))?))(?::(((\d\d)\/(\d\d))|((\w+)(?:([+-])(\d+))?)))?/g;
    var matches = regexDateRange.exec(str);
    return momentFromRegex(date,matches,dates);
  }
  window.momentFromString = momentFromString;
  function dateMatches(date,dateRange) {
    var dates = datesForYear(date.year());
    //                    xxx1222222113333331x45555544466666677777444xxxxx89a
    var regexDateRange = /(?:((\d\d)\/(\d\d))|((\w+)(?:([+-])(\d+))?))(?::(((\d\d)\/(\d\d))|((\w+)(?:([+-])(\d+))?)))?/g;
    var matches;
    while(matches = regexDateRange.exec(dateRange)) {
      var range = [momentFromRegex(date,matches,dates)];
      if(matches[8]) {
        range.push(momentFromRegex(date,matches.slice(8),dates))
        if (date.isBetween(range[0],range[1],'day','[]')) return true;
      } else {
        if (typeof range[0]==='boolean') {
          if(range[0]) return true;
        } else if(date.isSame(range[0],'day')) return true;
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
  var changeDateBy = function(days) {
    return function(i,current) {
      var m = moment(current);
      if(!m.isValid()) {
        m = moment();
      } else {
        m.add(days,'days');
      }
      return m.format("YYYY-MM-DD");
    }
  };
  var nextDay = function(week) {
    $('#date').val(changeDateBy(week? 7 : 1)).change();
  };
  var prevDay = function(week) {
    $('#date').val(changeDateBy(week? -7 : -1)).change();
  };
  $(document).on('keypress', function(e){
    switch(e.which) {
      case 106: // j
      case 74:
        prevDay(e.shiftKey);
        break;
      case 107: // k
      case 75:
        nextDay(e.shiftKey);
        break;
    }
  })
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
  var formattedRank = function(rank) {
    switch(rank) {
      case 1:
        return 'I Class';
      case 2:
        return 'II Class';
      case 3:
        return 'III Class';
      case 5:
        return 'Commemoration';
      default:
        return 'Feria';
    }
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
        selectDay = dateMatches(date, selectDay);
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
    var d = getFromCalendar(date);
    var rbWeekday = $('#rbWeekday').prop('value',date.day());
    if(!d) d = {title:'Feria', rank: 10};
    $('#feastDay').text(d.title + (d.rank < 5?(' (' + formattedRank(d.rank) + ')'): ''));
    if(d && d.rank <= 2) {
      $('#rbSunday').prop('checked',true);
    } else {
      rbWeekday.prop('checked',true);
    }
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