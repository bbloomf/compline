require(['jquery','moment','calendar','text-mode','hyphenate'], function($,moment,calendar,textMode,hyphenate) {
  'use strict';
  // soft hyphens in the Latin and the translations, from now on (js/hyphenate.js)
  hyphenate.watch();
  $('select').val('');
  // shared with js/text-mode.js, which tests that storage works
  var localStorage = textMode.storage;
  if(!('region' in localStorage)) localStorage.region = '';
  // The notation levels replace the fullNotation checkboxes, so carry those over.
  if(!('notationPsalms' in localStorage)) localStorage.notationPsalms = localStorage.fullNotation === '1' ? 'full' : 'pointed';
  if(!('notationChapter' in localStorage)) localStorage.notationChapter = localStorage.fullNotationChapter === '0' ? 'pointed' : 'full';
  if(!('notationPrayers' in localStorage)) localStorage.notationPrayers = localStorage.fullNotationPrayers === '1' ? 'full' : 'pointed';
  if(!('notationHymn' in localStorage)) localStorage.notationHymn = 'full';
  if(!('notationMarian' in localStorage)) localStorage.notationMarian = 'full';
  if(!('notationChants' in localStorage)) localStorage.notationChants = 'full';
  delete localStorage.fullNotation;
  delete localStorage.fullNotationChapter;
  delete localStorage.fullNotationPrayers;
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
      if(!$target.is('a,input,select,label,button')) $optionsMenu.toggleClass('showing');
    } else {
      $optionsMenu.removeClass('showing');  
    }
  });
  // How much notation each section shows (TRANSLATIONS_PLAN.md §4c).  Each has a
  // <select notation='section'>, and the body class notation-<section>-<level>, which
  // style.css reads.  Its <chant-gabc notation='section'> elements (no attribute means
  // 'chants') get the attribute plain-text when they should show their words.  'tr' is the
  // translation only, as plain text, whatever the Text menu says (text-mode.js sectionMode).
  var notationSections = {
    psalms:  {key: 'notationPsalms',  levels: ['text', 'pointed', 'full', 'tr'], defaultLevel: 'pointed'},
    chapter: {key: 'notationChapter', levels: ['text', 'pointed', 'full', 'tr'], defaultLevel: 'full'},
    prayers: {key: 'notationPrayers', levels: ['text', 'pointed', 'full', 'tr'], defaultLevel: 'pointed'},
    hymn:    {key: 'notationHymn',    levels: ['text', 'full', 'tr'], defaultLevel: 'full'},
    marian:  {key: 'notationMarian',  levels: ['text', 'full', 'tr'], defaultLevel: 'full'},
    chants:  {key: 'notationChants',  levels: ['text', 'full', 'tr'], defaultLevel: 'full'}
  };
  var storedNotation = function(section) {
    var s = notationSections[section];
    var level = localStorage[s.key];
    return s.levels.indexOf(level) >= 0 ? level : s.defaultLevel;
  };
  var trSections = function() {
    return Object.keys(notationSections).filter(function(section) {
      return storedNotation(section) === 'tr';
    });
  };
  textMode.setTrSections(trSections());
  // With the translation only, everything is plain text (TRANSLATIONS_PLAN.md §4).
  var notation = function(section) {
    return textMode.sectionMode(section) === 'tr'? 'text' : storedNotation(section);
  };
  var fullyNotatedPsalms = function() {
    return notation('psalms') === 'full';
  };
  // The notated chapter and prayers are hidden below 'full', so they skip exsurge layout too.
  var markPlainText = function(section) {
    var level = notation(section);
    var plainText = section === 'psalms'? level === 'text' : level !== 'full';
    $(section === 'chants'? 'chant-gabc:not([notation])' : 'chant-gabc[notation=' + section + ']')
      .attr('plain-text', plainText? '' : null);
  };
  // for chants added to the page after updateNotation
  var markAllPlainText = function() {
    $.each(notationSections, markPlainText);
  };
  var updateNotation = function(section) {
    var level = notation(section);
    $.each(notationSections[section].levels, function(i, l) {
      $(document.body).toggleClass('notation-' + section + '-' + l, l === level);
    });
    $('select[notation=' + section + ']').val(storedNotation(section));
    markPlainText(section);
  };
  $.each(notationSections, updateNotation);
  $('select[notation]').change(function(e){
    var section = $(this).attr('notation');
    var wasTr = storedNotation(section) === 'tr';
    localStorage[notationSections[section].key] = $(this).val();
    // to or from the translation only: the translation may need loading, and the section's text
    // is translated again
    if(wasTr !== (storedNotation(section) === 'tr')) {
      textMode.setTrSections(trSections());
      updateTextMode();
      return;
    }
    updateNotation(section);
    if(section === 'hymn') showHymnMode();
    if(section === 'psalms') {
      setPsalms();
      setCanticle();
    }
  });
  // "Other chants" in the options menu sets the hymn, the Marian antiphon and every
  // chant without a section of its own at once, and reads "Mixed" when they differ.
  // Its button shows each of them.
  var $otherChants = $('#notation-other-chants');
  var $otherChantsList = $('#notation-other-chants-list');
  var updateOtherChants = function() {
    var levels = $otherChantsList.find('select[notation]').map(function(){
      return storedNotation($(this).attr('notation'));
    }).get();
    var mixed = levels.some(function(l){ return l !== levels[0]; });
    $otherChants.val(mixed ? 'mixed' : levels[0]);
    return mixed;
  };
  $otherChants.change(function(e){
    // each in turn, as a change to or from the translation only sets every menu again
    var level = $(this).val();
    $otherChantsList.find('select[notation]').each(function(){
      $(this).val(level).change();
    });
  });
  $('select[notation]').change(updateOtherChants);
  var $otherChantsButton = $('#options-menu button[aria-controls=notation-other-chants-list]');
  var showOtherChants = function(show) {
    $otherChantsButton.attr('aria-expanded', show);
    $otherChantsList.prop('hidden', !show);
  };
  $otherChantsButton.click(function(e){
    showOtherChants($otherChantsList.prop('hidden'));
  });
  // Start open when they differ, so "Mixed" is explained
  showOtherChants(updateOtherChants());
  // The hymn's and the Marian antiphon's own notation menus show while their section is
  // hovered, or on a touch screen once its title is tapped (style.css).
  $('.notation-section-title').click(function(e){
    $(this).closest('.notation-section').toggleClass('show-notation');
  });
  // What text to show: Latin, Latin and a translation, or the translation only; and which
  // translation (TRANSLATIONS_PLAN.md §5).  js/text-mode.js keeps both, and the body class
  // text-<mode>, which style.css reads.
  var $textMode = $('#selectTextMode');
  var $trLang = $('#selectTrLang');
  $trLang.append(textMode.languages.map(function(l){
    return '<option value="' + l.code + '">' + l.name + '</option>';
  }).join(''));
  // no menus until a translation is offered (?text= still works, for testing)
  $textMode.add($trLang).closest('li').toggle(textMode.languages.length > 0);
  var showTextMode = function() {
    textMode.updateBodyClasses();
    $textMode.val(textMode.mode());
    $trLang.val(textMode.lang()).prop('disabled', !textMode.translated());
  };
  showTextMode();
  // How to show the hymn in the translation (TRANSLATIONS_PLAN.md §4b and §5): literal, metrical or
  // sung to the chant.  A choice the language hasn't is disabled, and so is singing while the hymn
  // is plain text (the translation only is plain text otherwise, but there it can still be sung).
  // text-mode.js falls back from a choice the language or the season hasn't.
  var $hymnMode = $('#selectHymnMode');
  var showHymnMode = function() {
    var hymnMode = textMode.sectionMode('hymn');
    var kinds = hymnMode !== 'la' && textMode.hymnKinds();
    $hymnMode.closest('.hymn-mode-choice').prop('hidden', !kinds);
    if(!kinds) return;
    $hymnMode.children('[value=literal]').prop('disabled', !kinds.literal);
    $hymnMode.children('[value=metrical]').prop('disabled', !kinds.metrical);
    $hymnMode.children('[value=sung]').prop('disabled', !kinds.sung || (hymnMode !== 'tr' && storedNotation('hymn') === 'text'));
    // a choice that's disabled here shows what is shown in its place, and is kept for a language
    // that has it
    var fallbacks = {literal: ['literal', 'metrical'], metrical: ['metrical', 'literal'], sung: ['sung', 'metrical', 'literal']};
    $hymnMode.val(fallbacks[textMode.hymnMode()].filter(function(kind) {
      return !$hymnMode.children('[value=' + kind + ']').prop('disabled');
    })[0]);
  };
  $hymnMode.change(function(e){
    textMode.setHymnMode($(this).val());
    $('chant-gabc[notation=hymn]').each(function(){
      if(this.updateText) this.updateText();
    });
  });
  // Where the translations come from, at the foot of the page while one is shown: Divinum
  // Officium, whose MIT license (js/i18n/LICENSE-divinum-officium.txt) opens under it, and what
  // was written for this app in the language shown.
  var $credits = $('#credits');
  var showCredits = function() {
    $credits.prop('hidden', !textMode.translated());
    $credits.children('[data-credit-lang]').each(function(){
      $(this).prop('hidden', $(this).attr('data-credit-lang').split(' ').indexOf(textMode.lang()) < 0);
    });
  };
  $credits.children('details').on('toggle', function(){
    var $license = $(this).children('pre');
    if(this.open && !$license.text()) {
      $.get('js/i18n/LICENSE-divinum-officium.txt', function(text) {
        // its paragraphs, each wrapped to the page rather than at 80 characters
        $license.text(text.trim().replace(/([^\n])\n(?!\n)/g, '$1 '));
      }, 'text').fail(function() {
        $license.html("The license couldn&rsquo;t be loaded. It is at <a href='https://github.com/DivinumOfficium/divinum-officium/blob/master/LICENSE'>github.com/DivinumOfficium/divinum-officium</a>.");
      });
    }
  });
  // Adds the translation to the page, or takes it away, and redraws the chants that it changes.
  var translatePage = function() {
    showCredits();
    showHymnMode();
    textMode.translate(document.body);
    $('chant-gabc').each(function(){
      if(this.updateText) this.updateText();
    });
  };
  var updateTextMode = function() {
    showTextMode();
    textMode.load(function() {
      // the translation only makes its sections plain text
      $.each(notationSections, updateNotation);
      setPsalms();
      setCanticle();
      translatePage();
    });
  };
  $textMode.change(function(e){
    textMode.setMode($(this).val());
    updateTextMode();
  });
  $trLang.change(function(e){
    textMode.setLang($(this).val());
    updateTextMode();
  });
  var toggles = {};
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
  // js/theme.js stores the choice in localStorage.theme and applies it
  $('#selectTheme').val(window.complineTheme.getTheme()).change(function(e){
    window.complineTheme.setTheme($(this).val());
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
    }
  }
  $.each(toggles, function(toggle){
    updateToggle(toggle);
  });
  // IANA time zones (with their legacy aliases) in each region; a name ending in '/' matches every zone under it.
  // England, Scotland and Wales all use Europe/London, so 'GB' isn't a region itself.
  var timeZoneRegions = {
    'US': ['US/', 'Navajo', 'Pacific/Honolulu', 'Pacific/Johnston', 'America/Indiana/', 'America/Kentucky/', 'America/North_Dakota/',
      'America/Adak', 'America/Anchorage', 'America/Atka', 'America/Boise', 'America/Chicago', 'America/Denver', 'America/Detroit',
      'America/Fort_Wayne', 'America/Indianapolis', 'America/Juneau', 'America/Knox_IN', 'America/Los_Angeles', 'America/Louisville',
      'America/Menominee', 'America/Metlakatla', 'America/New_York', 'America/Nome', 'America/Phoenix', 'America/Shiprock',
      'America/Sitka', 'America/Yakutat'],
    'CA': ['Canada/', 'America/Atikokan', 'America/Blanc-Sablon', 'America/Cambridge_Bay', 'America/Creston', 'America/Dawson',
      'America/Dawson_Creek', 'America/Edmonton', 'America/Fort_Nelson', 'America/Glace_Bay', 'America/Goose_Bay', 'America/Halifax',
      'America/Inuvik', 'America/Iqaluit', 'America/Moncton', 'America/Montreal', 'America/Nipigon', 'America/Pangnirtung',
      'America/Rainy_River', 'America/Rankin_Inlet', 'America/Regina', 'America/Resolute', 'America/St_Johns', 'America/Swift_Current',
      'America/Thunder_Bay', 'America/Toronto', 'America/Vancouver', 'America/Whitehorse', 'America/Winnipeg', 'America/Yellowknife'],
    // #selectRegion has one option, 'AU', for Australia and New Zealand
    'AU': ['Australia/', 'NZ', 'NZ-CHAT', 'Pacific/Auckland', 'Pacific/Chatham'],
    'GB': ['GB', 'GB-Eire', 'Europe/London']
  };
  function regionFromTimeZone(timeZone) {
    var region = '';
    $.each(timeZoneRegions, function(code, zones) {
      $.each(zones, function(i, zone) {
        if(zone.slice(-1) === '/'? timeZone.indexOf(zone) === 0 : timeZone === zone) {
          region = code;
          return false;
        }
      });
      if(region) return false;
    });
    return region;
  }
  function doAutoSelectRegion() {
    var timeZone;
    try {
      timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch(e) {}
    if(!timeZone) return;
    var region = regionFromTimeZone(timeZone);
    if(region === 'GB') {
      // Keep England, Scotland or Wales if the user already chose one, and let them choose while auto select is on.
      if(!/^GB-/.test(localStorage.region)) selectRegion('');
      $('#selectRegion').prop('disabled', false);
    } else {
      selectRegion(region);
    }
    console.info('Time zone: ' + timeZone + '\n' + 'Region: ' + region);
  }
  if(parseInt(localStorage.autoSelectRegion)) {
    doAutoSelectRegion();
  }
  // parsed by js/text-mode.js
  $.QueryString = textMode.query;
  if ($.QueryString.successMsg) showAlert(false, $.QueryString.successMsg);
  if ($.QueryString.failMsg) showAlert(true, $.QueryString.failMsg);
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
  $(document).on('click', function(e) {
    $('.btn-group.open').removeClass('open');
  }).on('click', '[data-toggle="dropdown"]', function(e) {
    var $openBtns = $('.btn-group.open');
    $(this).parent('.btn-group').toggleClass('open');
    $openBtns.removeClass('open');
    e.stopPropagation();
  }).on('keypress', function(e){
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
  // In plain text, a psalm's intonation file shows only verse 1; its other lines show how to sing
  // the flex and later verses.  The rest of the psalm comes from the pointed HTML.
  var textLines = function() {
    return fullyNotatedPsalms()? '' : " text-lines='1'";
  };
  // type should be '-po' for paschal octave, '-pt' for paschal time, or '-asd' for all souls' day, or '' for regular
  var currentCanticle = '';
  var setCanticle = function(type) {
    type = (typeof type == 'undefined')? currentCanticle.replace(/_full$/,'') : type;
    var antType = type;
    if(fullyNotatedPsalms()) type += '_full';
    if(type === currentCanticle) return;
    currentCanticle = type;
    var canticle = type;
    // There is no Nunc dimittis antiphon on All Souls' Day.
    var ant = antType === '-asd'? '' : "<chant-gabc src='canticle-ant"+antType+".gabc'></chant-gabc>";
    if(antType==='-pt') {
      antType = '';
      type = type.slice(3);
    }
    var psalm = "<chant-gabc notation='psalms'"+textLines()+" src='canticle-psalm"+type+".gabc'></chant-gabc>";
    var gotData = function(data){
      // a later call has changed the canticle since this one asked for its verses
      if(currentCanticle !== canticle) return;
      var html = ant + psalm + data;
      if(antType === '-po') {
        html += "<chant-gabc src='haec-dies.gabc'></chant-gabc>";
      } else {
        html += ant;
      }
      $('#canticle').empty().append(html);
      markAllPlainText();
      textMode.translate('#canticle');
    };
    $('#canticle').empty();
    if(fullyNotatedPsalms()) {
      gotData('');
    } else {
      $.get('canticle-psalm'+type+'.html',gotData);
    }
  };
  var currentPsalms = {};
  var renderedPsalms = {};
  var setPsalms = function(day,paschalTime) {
    if(typeof(day) === 'undefined') {
      day = currentPsalms.day;
      paschalTime = paschalTime || currentPsalms.paschalTime;
    } else {
      currentPsalms.day = day;
      currentPsalms.paschalTime = paschalTime;
    }
    if(typeof day == 'undefined' && typeof paschalTime == 'undefined') return;
    // Only process if things have changed since the last time this function was called.
    if(renderedPsalms.day === day && renderedPsalms.paschalTime === paschalTime && renderedPsalms.full === fullyNotatedPsalms()) return;
    renderedPsalms = {day: day, paschalTime: paschalTime, full: fullyNotatedPsalms()};
    var rendered = renderedPsalms;
    var ant = '',
        psalm = '',
        pt = '',
        full = fullyNotatedPsalms()? '_full' : '';
    if(day === 'triduum') {
      day = 0;
      pt = '-triduum';
      full = '';
    } else if(day === 'asd') {
      pt = '';
      psalm = "<chant-gabc notation='psalms'"+textLines()+" src='psalms/"+day+"/psalm"+pt+full+".gabc'></chant-gabc>";
    } else {
      pt = paschalTime?'-PT':'';
      ant = paschalTime?
        "<chant-gabc src='psalms/ant-PT.gabc'></chant-gabc>" :
        "<chant-gabc src='psalms/"+day+"/ant.gabc'></chant-gabc>";
      if(paschalTime === 'no-antiphon') ant = '';
      psalm = "<chant-gabc notation='psalms'"+textLines()+" src='psalms/"+day+"/psalm"+pt+full+".gabc'></chant-gabc>";
      dayName = days[day];
    }
    var gotData = function(data){
      // a later call has changed the psalms since this one asked for their verses
      if(renderedPsalms !== rendered) return;
      var html = ant + psalm + data + ant;
      $('#placeholder').empty().append(html);
      markAllPlainText();
      textMode.translate('#placeholder');
    };
    if(full) {
      gotData('');
    } else if(typeof(day) !== 'undefined') {
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
    $('.dropdown-menu a[select-date]').each(function(){
      var $this = $(this);
      var matches = dateMatchesSelectDate($this);
      if(matches) {
        $this.trigger('click',true);
      } else {
        var otherInputs = $this.parent().siblings().find('a[value]');
        if(otherInputs.length==1 && !otherInputs.is('[select-date]')) {
          otherInputs.trigger('click',true);
        }
      }
    });
    $('option[select-date]').each(function(){
      var $this = $(this);
      var matches = dateMatchesSelectDate($this);
      var $parent;
      if(matches) {
        $parent = $this.parent();
        if($parent.val() != $this.val()) {
          $parent.val($this.val()).trigger('change');
        }
      } else {
        var otherInputs = $this.siblings('option');
        if(otherInputs.length==1 && !otherInputs.is('[select-date]')) {
          $parent = $this.parent();
          if($parent.val() != $this.val()) {
            $parent.val(otherInputs.val()).trigger('change');
          }
        }
      }
    });
    var isPT = dates.isPaschalTime(date);
    var showChooseDay = (date.day() !== 0);
    var rbWeekday = $('#rbWeekday').attr('value',date.day());
    if(isPT && dates.isPaschalWeek(date)) {
      showChooseDay = false;
      setPsalms(0,'no-antiphon');
      setCanticle('-po');
      $('.weekday-lbl').text('Easter ' + days[date.day()]);
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
      $('.weekday-lbl').text(name);
    } else if(calendar.dateMatches(date,'allSouls')) {
      showChooseDay = false;
      $('.weekday-lbl').text('All Souls Day');
      setPsalms('asd');
      setCanticle('-asd');
    } else {
      var psalmDay = date.day();
      if(showChooseDay && d && d.rank <= 2) {
        $('#rbSunday').trigger('click',true);
        psalmDay = 0;
      } else {
        rbWeekday.trigger('click',true);
      }
      $('.weekday-lbl').text(days[date.day()]);
      setPsalms(psalmDay, choices.season == 'paschal');
      setCanticle(isPT?'-pt':'');
    }
    $(document.body).toggleClass('hide-choose-day',!showChooseDay);
    if(d.alternates) {
      var selectFeast = $('#selectFeastDay');
      selectFeast.empty().append(d.alternates.map(function(alt,i){
        return '<option value="' + (alt.region && alt.region[0] || '') + '">'+
  alt.title+(alt.rank < 5?(' (' + formattedRank(alt.rank) + ')'): '') + (alt.region?(' ['+alt.region.join(', ')+']'):'')+
'</option>';
      }).join(''));
      var _currentRegion = "";
      var alt = d.alternates.filter(function(alt){
        return alt.region && alt.region.indexOf(region)>=0;
      });
      if(alt.length) _currentRegion = alt[0].region[0];
      selectFeast.val(_currentRegion);
    } else {
      $('#feastDay').text(d.title + (d.rank < 5?(' (' + formattedRank(d.rank) + ')'): ''));
    }
    $('#feastDay').toggle(!d.alternates);
    $('#selectFeastDay').toggle(!!d.alternates);
  };
  var setChantSrc = function($elem,src){
    if(!$elem || $elem.length === 0) return;
    $elem.attr('src',src);
    // until chant-element has loaded, the src attribute is enough
    if($elem.get(0).setSrc) $elem.get(0).setSrc(src);
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
  $('.btn-group .dropdown-menu>li>a[value]').click(function(e, isProgrammaticTrigger){
    e.preventDefault();
    var $this = $(this),
        $li = $this.parent(),
        $parent = $this.parents('.btn-group').first(),
        $label = $parent.find('.btn>.lbl'),
        val = $this.attr('value');
    if(isProgrammaticTrigger && $li.hasClass('selected')) return;
    $parent.removeClass('open');
    $li.parent().children().removeClass('selected');
    $li.addClass('selected');
    $label.html($this.contents().clone());
    var chant = $parent.attr('name');
    if(chant === 'weekday') {
      if(!isProgrammaticTrigger) setPsalms(parseInt(val), choices.season == 'paschal');
    } else {
      choices[chant] = val;
      if(chant=='season') {
        if(!isProgrammaticTrigger) setPsalms(undefined, val == 'paschal');
      } else {
        loadChant(chant,val,this.id);
      }
    }
  });
  $('#marian-antiphon-choices select[name=marian-antiphon],#marian-antiphon-solemn').change(function(){
    var $select = $('#marian-antiphon-choices select[name=marian-antiphon]');
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
    // localStorage.region is a code ('US'); the calendar's regions are names ('United States')
    if(this.value) setDate(moment(this.value), calendar.roman.regionCodeMap[localStorage.region] || '');
  }).change();
  $('#selectFeastDay').change(function(){
    setDate(moment($date.val()), this.value);
  });
  // Loaded last, so that every <chant-gabc> already has its plain-text attribute when it is first
  // drawn, and none is laid out as chant only to be redrawn as text.  (The dist build bundles it.)
  // The chants don't wait for the translation: those drawn before it loads are drawn again.
  require(['chant-element']);
  textMode.load(translatePage);
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
