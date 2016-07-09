$(function($){
  'use strict';
  var _currentRegion = '',
      localStorage = window.localStorage;
  try {
    var mod = '__storage test__';
    localStorage.setItem(mod, mod);
    localStorage.removeItem(mod);
  } catch(e) {
    localStorage = {};
  }
  if(!('region' in localStorage)) localStorage.region = '';
  if(!('fullNotation' in localStorage)) localStorage.fullNotation = '0';
  if(!('showOptions' in localStorage)) localStorage.showOptions = '0';
  if(!('autoSelectRegion' in localStorage)) localStorage.autoSelectRegion = '1';
  var usedRegions = {};
  $('#selectRegion').append('<option value="">None</option>'+Object.keys(romanCalendar.regionCodeMap).map(function(code){
    var name = romanCalendar.regionCodeMap[code];
    if(name in usedRegions) return '';
    usedRegions[name] = '';
    return '<option value="'+code+'"">'+name+'</option>';
  }).join('')).val(localStorage.region);
  var toggles = {};
  var fullNotation = toggles.fullNotation = function(newVal) {
    if(typeof newVal === 'undefined') return !!parseInt(localStorage.fullNotation);
    updateToggle('fullNotation',!!newVal);
    localStorage.fullNotation = newVal? 1 : 0;
    setPsalms();
    setCanticle();
  };
  var showOptions = toggles.showOptions = function(newVal) {
    if(typeof newVal === 'undefined') return !!parseInt(localStorage.showOptions);
    updateToggle('showOptions',!!newVal);
    localStorage.showOptions = newVal? 1 : 0;
    showHideOptions();
  };
  var autoSelectRegion = toggles.autoSelectRegion = function(newVal) {
    if(typeof newVal === 'undefined') return !!parseInt(localStorage.autoSelectRegion);
    updateToggle('autoSelectRegion',!!newVal);
    localStorage.autoSelectRegion = newVal? 1 : 0;
    if(newVal) doAutoSelectRegion();
  };
  var selectRegion = function(newVal) {
    if(typeof newVal === 'undefined') return !!parseInt(localStorage.autoSelectRegion);
    $('#selectRegion').val(newVal);
    _currentRegion = '';
    localStorage.region = $('#selectRegion').val();
  };
  $('a[href][toggle]').click(function(e){
    e.preventDefault();
    var $this = $(this);
    var toggle = toggles[$this.attr('toggle')];
    toggle(!toggle());
  });
  $('#selectRegion').change(function(e){
    selectRegion($(this).val());
  });
  function updateToggle(toggle,val) {
    var $toggle = $('a[toggle='+toggle+']');
    if(typeof val == 'undefined') val = toggles[toggle]();
    $toggle.text($toggle.attr("toggle-"+val.toString()));
    if(toggle == 'autoSelectRegion') $('#selectRegion').prop('disabled', val);
  }
  $.each(toggles, function(toggle){
    updateToggle(toggle);
  });
  function doAutoSelectRegion() {
    $.getJSON("https://freegeoip.net/json/", function(result){
      if(result.country_code in romanCalendar.regionCodeMap) {
        selectRegion(result.country_code);
      } else {
        var test = result.country_code + '-' + result.region_code;
        if(test in romanCalendar.regionCodeMap) {
          selectRegion(test);
        } else {
          console.info('Unknown Region:', result);
        }
      }
      console.info('Country: ' + result.country_name + '\n' + 'Code: ' + result.country_code);
      window.ipGeo = ipGeo = result;
    });
  }
  var ipGeo;
  if(parseInt(localStorage.autoSelectRegion)) {
    doAutoSelectRegion();
  }
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
    if(this.allSouls.day() === 0) this.allSouls.add(1,'day');
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
  };
  function getSunday(date) {
    var dates = datesForMoment(date);
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
  function FeriaWithAlternates(alternates,selectedAlternate) {
    if(alternates && !alternates.length) alternates = undefined;
    var feria = {title:'Feria', rank: 10};
    var result = feria;
    if(alternates && alternates.length) {
      alternates.unshift(feria);
      if(selectedAlternate) {
        result = selectedAlternate;
        _currentRegion = result.region[0];
      } else {
        _currentRegion = '';
      }
      result.alternates = alternates;
    }
    return result;
  }
  function getFromCalendar(date) {
    if('liturgical' in date) return date.liturgical;
    if(date.day() === 0) {
      return (date.liturgical = getSunday(date));
    }
    if(dateMatches(date,'corpusChristi')) return (date.liturgical = {title:'Corpus Christi', rank:1});
    if(dateMatches(date,'sacredHeart')) return (date.liturgical = {title:'The Most Sacred Heart of Jesus', rank:1});
    if(dateMatches(date,'ascension')) return (date.liturgical = {title:'The Ascension of Our Lord', rank:1});
    if(dateMatches(date,'easter-3')) return (date.liturgical = {title:'Maundy Thursday', rank:1});
    if(dateMatches(date,'easter-2')) return (date.liturgical = {title:'Good Friday', rank:1});
    if(dateMatches(date,'easter-1')) return (date.liturgical = {title:'Holy Saturday', rank:1});
    if(dateMatches(date,'lent1-4')) return (date.liturgical = {title:'Ash Wednesday', rank:5});
    var options = [];
    var selectedOption;
    if(regionalCalendars) {
      var key = date.format('MM/DD'),
          altKey = moment(date).subtract(1,'day').format('MM/DD');
      $.each(regionalCalendars, function(region, calendar){
        var option;
        if(key in calendar) {
          option = calendar[key];
        } else if(altKey in calendar) {
          var d = calendar[altKey];
          if(d.plusOne === 'ifSunday' && date.day()===1) option = d;
        }
        if(option) {
          var selectThisOption = (region === _currentRegion || romanCalendar.regionCodeMap[localStorage.region] === region);
          option.region = [region];
          var sameFeast = $.grep(options, function(o,i){
            return o.title == option.title && o.rank === option.rank;
          });
          if(sameFeast.length) {
            sameFeast[0].region.push(region);
            if(selectThisOption) selectedOption = sameFeast[0];
          } else {
            options.push(option);
            if(selectThisOption) selectedOption = option;
          }
        }
      });
    }
    if(romanCalendar) {
      var month = date.month();
      var day = date.date();
      var d = romanCalendar[month][day];
      if(!d && day > 1) {
        d = romanCalendar[month][day-1];
        if(!d || !d.plus) return (date.liturgical = FeriaWithAlternates(options,selectedOption));
        else if(d.plusOne === 'ifLeapYear' && !date.isLeapYear()) return (date.liturgical = FeriaWithAlternates(options,selectedOption));
        else if(d.plusOne === 'ifSunday' && date.day()!==1) return (date.liturgical = FeriaWithAlternates(options,selectedOption));
      }
      if(options.length) {
        options.unshift(d);
        if(selectedOption) {
          d = selectedOption;
          _currentRegion = d.region[0];
        } else {
          _currentRegion = '';
        }
        d.alternates = options;
      }
      if(d) return (date.liturgical = d);
    }
    return (date.liturgical = FeriaWithAlternates(options,selectedOption));
  }
  Dates.prototype.firstClassFeast = function(date) {
    var d = getFromCalendar(date);
    return !!(d && d.rank === 1);
  };
  Dates.prototype.firstOrSecondClassFeast = function(date) {
    var d = getFromCalendar(date);
    return !!(d && (d.rank === 1 || d.rank === 2));
  };
  Dates.prototype.feastOfOurLady = function(date) {
    var d = getFromCalendar(date);
    return !!(d && d.ol);
  };
  Dates.prototype.minorFeast = function(date) {
    var d = getFromCalendar(date);
    return (d && d.rank > 1 && d.rank < 5);
  };
  Dates.prototype.feria = function(date) {
    var d = getFromCalendar(date);
    if(date.day() === 0) return false;
    return !d || d.rank >= 5;
  };
  Dates.prototype.sunday = function(date) {
    return date.day() === 0;
  };
  function datesForMoment(moment) {
    return moment.Dates || (moment.Dates = new Dates(moment.year()));
  }
  Dates.prototype.isTriduum = function(date) {
    var maundyThursday = moment(this.easter).subtract(3,'days');
    return date.isSameOrAfter(maundyThursday) && date.isBefore(this.easter);
  };
  Dates.prototype.isPaschalWeek = function(date) {
    var easterSaturday = moment(this.easter).add(6,'days');
    return date.isSameOrAfter(this.easter) && date.isBefore(easterSaturday);
  };
  Dates.prototype.isPaschalTime = function(date) {
    var pentecostSaturday = moment(this.easter).add(55,'days');
    return date.isSameOrAfter(this.easter) && date.isBefore(pentecostSaturday);
  };
  Dates.prototype.isAdvent = function(date) {
    return date.isSameOrAfter(moment(this.advent1).subtract(1,'day')) && date.isSameOrBefore(moment(this.christmas).subtract(1,'day'));
  };
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
    var dates = datesForMoment(date);
    //                    xxx1222222113333331x45555544466666677777444xxxxx89a
    var regexDateRange = /(?:((\d\d)\/(\d\d))|((\w+)(?:([+-])(\d+))?))(?::(((\d\d)\/(\d\d))|((\w+)(?:([+-])(\d+))?)))?/g;
    var matches = regexDateRange.exec(str);
    return momentFromRegex(date,matches,dates);
  }
  window.momentFromString = momentFromString;
  function dateMatches(date,dateRange) {
    var dates = datesForMoment(date);
    //                    111xxxx2333333224444442x56666655577777788888555xxxxx9ab
    var regexDateRange = /(!)?(?:((\d\d)\/(\d\d))|((\w+)(?:([+-])(\d+))?))(?::(((\d\d)\/(\d\d))|((\w+)(?:([+-])(\d+))?)))?/g;
    var matches;
    var test;
    while((matches = regexDateRange.exec(dateRange))) {
      var opposite = matches[1];
      var range = [momentFromRegex(date,matches.slice(1),dates)];
      if(matches[9]) {
        range.push(momentFromRegex(date,matches.slice(9),dates));
        test = date.isBetween(range[0],range[1],'day','[]');
        if(opposite) test = !test;
        if(test) return true;
      } else {
        if (typeof range[0]==='boolean') {
          if(opposite) range[0] = !range[0];
          if(range[0]) return true;
        } else {
          test = date.isSame(range[0],'day');
          if(opposite) test = !test;
          if(test) return true;
        }
      }
    }
    return false;
  }
  $.QueryString = (function (a) {
      if (a === "") return {};
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
    };
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
  });
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
  // type should be '-po' for paschal octave, '-pt' for paschal time, or '-asd' for all souls' day, or '' for regular
  var currentCanticle = '';
  var setCanticle = function(type) {
    type = type || currentCanticle.replace(/_full$/,'');
    var antType = type;
    if(fullNotation()) type += '_full';
    if(type === currentCanticle) return;
    currentCanticle = type;
    var ant = "<chant-gabc src='canticle-ant"+antType+".gabc'></chant-gabc>";
    if(antType==='-pt') {
      antType = '';
      type = type.slice(3);
    }
    var psalm = "<chant-gabc src='canticle-psalm"+type+".gabc'></chant-gabc>";
    var gotData = function(data){
      var html = ant + psalm + data;
      if(antType === '-po') {
        html += "<chant-gabc src='haec-dies.gabc'></chant-gabc>";
      } else {
        html += ant;
      }
      $('#canticle').empty().append(html);
    };
    $('#canticle').empty();
    if(fullNotation()) {
      gotData('');
    } else {
      $.get('canticle-psalm'+type+'.html',gotData);
    }
  };
  var currentPsalms = {};
  var setPsalms = function(day,paschalTime,isSunday) {
    if(typeof(day) === 'undefined') {
      day = currentPsalms.day;
      paschalTime = currentPsalms.paschalTime;
      isSunday = currentPsalms.isSunday;
    } else {
      currentPsalms.day = day;
      currentPsalms.paschalTime = paschalTime;
      currentPsalms.isSunday = isSunday;
    }
    if(typeof day == 'undefined' && typeof paschalTime == 'undefined' && typeof isSunday == 'undefined') return;
    // Only process if things have changed since the last time this function was called.
    if(currentPsalms.day == day && currentPsalms.paschalTime == paschalTime && currentPsalms.isSunday == isSunday && currentPsalms.full == fullNotation()) return;
    currentPsalms.fullNotation = fullNotation();
    var ant = '',
        psalm = '',
        pt = '',
        full = fullNotation()? '_full' : '';
    if(day === 'triduum') {
      day = 0;
      pt = '-triduum';
      full = '';
    } else if(day === 'asd') {
      pt = '';
      psalm = "<chant-gabc src='psalms/"+day+"/psalm"+pt+full+".gabc'></chant-gabc>";
    } else {
      pt = paschalTime?'-PT':'';
      ant = paschalTime?
        "<chant-gabc src='psalms/ant-PT.gabc'></chant-gabc>" :
        "<chant-gabc src='psalms/"+day+"/ant.gabc'></chant-gabc>";
      if(paschalTime === 'no-antiphon') ant = '';
      psalm = "<chant-gabc src='psalms/"+day+"/psalm"+pt+full+".gabc'></chant-gabc>";
      dayName = days[day];
      if(!isSunday) $('#weekday').text(dayName);
    }
    var gotData = function(data){
      var html = ant + psalm + data + ant;
      $('#placeholder').empty().append(html);
    };
    if(full) {
      gotData('');
    } else {
      $.get('psalms/'+day+'/psalm-verses'+pt+'.html',gotData).fail(function(){
        $.get('psalms/'+day+'/psalm-verses.html',gotData);
      });
    }
  };
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
  };
  var setDate = function(date,region) {
    var dates = datesForMoment(date);
    var d = getFromCalendar(date,region);
    //show and hide [include] and [exclude] elements based on the date
    $('[exclude]').each(function(){
      var $this = $(this);
      $this.toggle(!dateMatches(date, $this.attr('exclude')));
    });
    $('[include]').each(function(){
      var $this = $(this);
      $this.toggle(dateMatches(date, $this.attr('include')));
    });
    var dateMatchesSelectDate = function($elem) {
      var selectDay = $elem.attr('select-day');
      if(selectDay) {
        selectDay = dateMatches(date, selectDay);
      } else {
        selectDay = true;
      }
      var matches = dateMatches(date, $elem.attr('select-date'));
      return matches && selectDay;
    };
    //select inputs based on date
    $('input[select-date]').each(function(){
      var $this = $(this);
      var matches = dateMatchesSelectDate($this);
      if(matches) {
        $this.prop('checked', true).change();
      } else {
        var otherInputs = $this.siblings('input[name=' + $this.attr('name') + ']');
        if(otherInputs.length==1 && !otherInputs.is('[select-date]')) {
          otherInputs.prop('checked',true).change();
        }
      }
    });
    $('option[select-date]').each(function(){
      var $this = $(this);
      var matches = dateMatchesSelectDate($this);
      if(matches) {
        $this.parent().val($this.val()).change();
      } else {
        var otherInputs = $this.siblings('option');
        if(otherInputs.length==1 && !otherInputs.is('[select-date]')) {
          $this.parent().val(otherInputs.val()).change();
        }
      }
    });
    var isPT = dates.isPaschalTime(date);
    var showChooseDay = (date.day() !== 0);
    if(isPT && dates.isPaschalWeek(date)) {
      showChooseDay = false;
      setPsalms(0,'no-antiphon',true);
      setCanticle('-po');
      $('#weekday').text('Easter ' + days[date.day()]);
    } else if(dates.isTriduum(date)) {
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
      setCanticle(isPT?'-pt':'');
    }
    $('.chooseDay').toggle(showChooseDay);
    var rbWeekday = $('#rbWeekday').prop('value',date.day());
    if(d.alternates) {
      var selectFeast = $('#selectFeastDay');
      selectFeast.empty().append(d.alternates.map(function(alt,i){
        return '<option value="' + (alt.region && alt.region[0] || '') + '">'+
  alt.title+(alt.rank < 5?(' (' + formattedRank(alt.rank) + ')'): '') + (alt.region?(' ['+alt.region.join(', ')+']'):'')+
'</option>';
      }).join(''));
      selectFeast.val(_currentRegion);
    } else {
      $('#feastDay').text(d.title + (d.rank < 5?(' (' + formattedRank(d.rank) + ')'): ''));
    }
    $('#feastDay').toggle(!d.alternates);
    $('#selectFeastDay').toggle(!!d.alternates);
    if(d && d.rank <= 2) {
      $('#rbSunday').prop('checked',true);
    } else {
      rbWeekday.prop('checked',true);
    }
    showHideOptions();
  };
  var setChantSrc = function($elem,src){
    if(!$elem || $elem.length === 0) return;
    $elem.attr('src',src);
    $elem.data('setSrc')(src);
  };
  $('input[name=weekday]').change(function(){
    if(this.checked) {
      setPsalms(parseInt(this.value), choices.season == 'paschal', true);
    }
  });
  var loadChant = function(chant,value,id) {
    var src = chant + '/' + value + '.gabc';
    setChantSrc($('#'+chant),src);
    var $div = $('chant-gabc[' + id + ']');
    if($div.length > 0) {
      setChantSrc($div,$div.attr(id));
    }
    $('div.' + chant).hide();
    $('div.' + chant + '.' + value).show();
  };
  var choices = {};
  $('[id$=-choices] input[type=radio]').change(function(){
    var chant = this.name;
    choices[chant] = this.value;
    if(chant=='season') {
      return;
    }
    loadChant(chant,this.value,this.id);
  });
  $('#marian-antiphon-choices select,#marian-antiphon-solemn').change(function(){
    var $select = $('#marian-antiphon-choices select');
    var solemn = $('#marian-antiphon-solemn').prop('checked');
    var chant = 'marian-antiphon';
    var val = $select.val();
    var id = $select.find('option[value='+val+']').prop('id');
    if(solemn) {
      val += '-solemn';
      id += '-solemn';
    }
    choices[chant] = val;
    loadChant(chant, val, id);
  });
  var $date = $('#date');
  $date.change(function(){
    if(this.value) setDate(moment(this.value));
  }).change();
  $('#selectFeastDay').change(function(){
    _currentRegion = this.value;
    setDate(moment($date.val()));
  });
  function showHideOptions() {
    var show = showOptions();
    $('input:radio:not(.not-hideable)').parent().toggle(show);
    $('#marian-antiphon-choices>select').toggle(show);
    $('.marian-antiphon-name').toggle(!show);
    if(!show) {
      $('input:radio:checked').parent().show();
    }
  }
  // if ('serviceWorker' in navigator) {
  //   navigator.serviceWorker.register('./sw.js').then(function(registration) {
  //     // Registration was successful
  //     // console.log('ServiceWorker registration successful with scope: ', registration.scope);
  //   }).catch(function(err) {
  //     // registration failed :(
  //     console.log('ServiceWorker registration failed: ', err);
  //   });
  // }
});