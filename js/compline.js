require(['jquery','moment','calendar','chant-element'], function($,moment,calendar) {
  'use strict';
  var localStorage = window.localStorage;
  try {
    var mod = '__storage test__';
    localStorage.setItem(mod, mod);
    localStorage.removeItem(mod);
  } catch(e) {
    localStorage = {};
  }
  if(!('region' in localStorage)) localStorage.region = '';
  if(!('fullNotation' in localStorage)) localStorage.fullNotation = '0';
  if(!('fullNotationChapter' in localStorage)) localStorage.fullNotationChapter = '1';
  if(!('fullNotationPrayers' in localStorage)) localStorage.fullNotationPrayers = '0';
  if(!('showOptions' in localStorage)) localStorage.showOptions = '0';
  if(!('autoSelectRegion' in localStorage)) localStorage.autoSelectRegion = '1';
  var usedRegions = {};
  $('#selectRegion').append('<option value="">None</option>'+Object.keys(calendar.roman.regionCodeMap).map(function(code){
    var name = calendar.roman.regionCodeMap[code];
    if(name in usedRegions) return '';
    usedRegions[name] = '';
    return '<option value="'+code+'"">'+name+'</option>';
  }).join('')).val(localStorage.region);
  var $optionsMenu = $('#options-menu');
  $(document.body).click(function(e){
    var $target = $(e.target);
    if($target.parents().is($optionsMenu)) {
      if(!$target.is('a,input,select,label')) $optionsMenu.toggleClass('showing');
    } else {
      $optionsMenu.removeClass('showing');  
    }
  });
  var toggles = {};
  var fullNotation = toggles.fullNotation = function(newVal) {
    if(typeof newVal === 'undefined') return !!parseInt(localStorage.fullNotation);
    updateToggle('fullNotation',!!newVal);
    localStorage.fullNotation = newVal? 1 : 0;
    setPsalms();
    setCanticle();
  };
  var fullNotationChapter = toggles.fullNotationChapter = function(newVal) {
    if(typeof newVal === 'undefined') return !!parseInt(localStorage.fullNotationChapter);
    updateToggle('fullNotationChapter',!!newVal);
    localStorage.fullNotationChapter = newVal? 1 : 0;
  };
  var fullNotationPrayers = toggles.fullNotationPrayers = function(newVal) {
    if(typeof newVal === 'undefined') return !!parseInt(localStorage.fullNotationPrayers);
    updateToggle('fullNotationPrayers',!!newVal);
    localStorage.fullNotationPrayers = newVal? 1 : 0;
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
    localStorage.region = $('#selectRegion').val();
  };
  $('input[toggle]').change(function(e){
    var $this = $(this);
    var toggle = toggles[$this.attr('toggle')];
    toggle(this.checked);
  });
  $('#selectRegion').change(function(e){
    selectRegion($(this).val());
  });
  function updateToggle(toggle,val) {
    if(typeof val === 'undefined') {
      var $toggle = $('input[toggle='+toggle+']');
      val = toggles[toggle]();
      $toggle.prop('checked',val);
    }
    switch(toggle) {
      case 'autoSelectRegion':
        $('#selectRegion').prop('disabled', val);
        break;
      case 'fullNotationPrayers':
        $('.notated-prayer').toggle(val);
        $('.pointed-prayer').toggle(!val);
        break;
      case 'fullNotationChapter':
        $('.notated-chapter').toggle(val);
        $('.pointed-chapter').toggle(!val);
        break;
    }
  }
  $.each(toggles, function(toggle){
    updateToggle(toggle);
  });
  function doAutoSelectRegion() {
    $.getJSON("https://freegeoip.net/json/", function(result){
      if(result.country_code in calendar.roman.regionCodeMap) {
        selectRegion(result.country_code);
      } else {
        var test = result.country_code + '-' + result.region_code;
        if(test in calendar.roman.regionCodeMap) {
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
    type = (typeof type == 'undefined')? currentCanticle.replace(/_full$/,'') : type;
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
  var setPsalms = function(day,paschalTime) {
    if(typeof(day) === 'undefined') {
      day = currentPsalms.day;
      paschalTime = currentPsalms.paschalTime;
    } else {
      currentPsalms.day = day;
      currentPsalms.paschalTime = paschalTime;
    }
    if(typeof day == 'undefined' && typeof paschalTime == 'undefined') return;
    // Only process if things have changed since the last time this function was called.
    if(currentPsalms.day == day && currentPsalms.paschalTime == paschalTime && currentPsalms.full == fullNotation()) return;
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
    var dates = calendar.datesForMoment(date);
    var d = calendar.getFeastForDate(date,region);
    //show and hide [include] and [exclude] elements based on the date
    $('[exclude]').each(function(){
      var $this = $(this);
      $this.toggle(!calendar.dateMatches(date, $this.attr('exclude')));
    });
    $('[include]').each(function(){
      var $this = $(this);
      $this.toggle(calendar.dateMatches(date, $this.attr('include')));
    });
    var dateMatchesSelectDate = function($elem) {
      var selectDay = $elem.attr('select-day');
      if(selectDay) {
        selectDay = calendar.dateMatches(date, selectDay);
      } else {
        selectDay = true;
      }
      var matches = calendar.dateMatches(date, $elem.attr('select-date'));
      return matches && selectDay;
    };
    //select inputs based on date
    $('button[select-date]').each(function(){
      var $this = $(this);
      var matches = dateMatchesSelectDate($this);
      if(matches) {
        $this.click();
      } else {
        var otherInputs = $this.siblings('button[type=radio]');
        if(otherInputs.length==1 && !otherInputs.is('[select-date]')) {
          otherInputs.click();
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
    var rbWeekday = $('#rbWeekday').prop('value',date.day());
    if(isPT && dates.isPaschalWeek(date)) {
      showChooseDay = false;
      setPsalms(0,'no-antiphon');
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
    } else if(calendar.dateMatches(date,'allSouls')) {
      showChooseDay = false;
      $('#weekday').text('All Souls Day');
      setPsalms('asd');
      setCanticle('-asd');
    } else {
      if(showChooseDay && d && d.rank <= 2) {
        $('#rbSunday').click();
      } else {
        rbWeekday.click();
      }
      $('#weekday').text(days[date.day()]);
      setCanticle(isPT?'-pt':'');
    }
    $('.chooseDay').toggle(showChooseDay);
    if(d.alternates) {
      var selectFeast = $('#selectFeastDay');
      selectFeast.empty().append(d.alternates.map(function(alt,i){
        return '<option value="' + (alt.region && alt.region[0] || '') + '">'+
  alt.title+(alt.rank < 5?(' (' + formattedRank(alt.rank) + ')'): '') + (alt.region?(' ['+alt.region.join(', ')+']'):'')+
'</option>';
      }).join(''));
      var _currentRegion = '';
      var alt = d.alternates.filter(function(alt){
        return alt.region && alt.region.indexOf(localStorage.region)>=0;
      });
      if(alt.length) _currentRegion = alt[0].region[0];
      selectFeast.val(_currentRegion);
    } else {
      $('#feastDay').text(d.title + (d.rank < 5?(' (' + formattedRank(d.rank) + ')'): ''));
    }
    $('#feastDay').toggle(!d.alternates);
    $('#selectFeastDay').toggle(!!d.alternates);
    showHideOptions();
  };
  var setChantSrc = function($elem,src){
    if(!$elem || $elem.length === 0) return;
    $elem.attr('src',src);
    $elem.get(0).setSrc(src);
  };
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
  $('.btn-group-vertical button[type=radio]').click(function(){
    var $this = $(this);
    var $parent = $this.parent();
    $parent.children().removeClass('active');
    $this.addClass('active');
    var chant = $parent.attr('name');
    if(chant === 'weekday') {
      setPsalms(parseInt(this.value), choices.season == 'paschal');
    } else {
      choices[chant] = this.value;
      if(chant=='season') return;
      loadChant(chant,this.value,this.id);
    }
  });
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
    if(this.value) setDate(moment(this.value), localStorage.region);
  }).change();
  $('#selectFeastDay').change(function(){
    setDate(moment($date.val()), this.value);
  });
  function showHideOptions() {
    var show = showOptions();
    $(document.body).toggleClass('hide-most-options',!show);
    $('#marian-antiphon-choices>select').toggle(show);
    $('.marian-antiphon-name').toggle(!show);
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
