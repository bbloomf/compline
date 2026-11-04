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
  // The short lesson and the short responsory were among the other chants until they got menus of
  // their own.
  if(!('notationLesson' in localStorage)) localStorage.notationLesson = localStorage.notationChants;
  if(!('notationResponsory' in localStorage)) localStorage.notationResponsory = localStorage.notationChants;
  // and the rest of them shared that menu until each got its own
  ['notationJube', 'notationBlessing', 'notationAdjutorium', 'notationConverte', 'notationDeusInAdjutorium',
      'notationBenedicamus'].forEach(function(key) {
    if(!(key in localStorage)) localStorage[key] = localStorage.notationChants;
  });
  // The canticle had the psalms' menu until it got its own.
  if(!('notationCanticle' in localStorage)) localStorage.notationCanticle = localStorage.notationPsalms;
  // The hymn translation's "Sung with chant" is now the hymn's 'Fully notated translation', where it
  // was sung: with the translation only, or beside the notated Latin.
  if(localStorage.hymnMode === 'sung') {
    if(localStorage.notationHymn === 'tr' || localStorage.textMode === 'tr' ||
        (localStorage.textMode === 'both' && localStorage.notationHymn === 'full')) localStorage.notationHymn = 'sung';
    localStorage.hymnMode = 'metrical';
  }
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
  // How much notation each section shows (TRANSLATIONS_PLAN.md §4c).  Each has a
  // <select notation='section'>, and the body class notation-<section>-<level>, which
  // style.css reads.  Its <chant-gabc notation='section'> elements get the attribute plain-text
  // when they should show their words.  'tr' is the
  // translation only, as plain text, whatever the Text menu says (text-mode.js sectionMode).  The
  // hymn's 'sung' is the translation sung to the chant (§4b): beside the Latin as the Text menu
  // says, or alone with the Latin only.
  var notationSections = {
    lesson:   {key: 'notationLesson',   levels: ['text', 'pointed', 'full', 'tr'], defaultLevel: 'full'},
    psalms:   {key: 'notationPsalms',   levels: ['text', 'pointed', 'full', 'tr'], defaultLevel: 'pointed'},
    canticle: {key: 'notationCanticle', levels: ['text', 'pointed', 'full', 'tr'], defaultLevel: 'pointed'},
    chapter:  {key: 'notationChapter',  levels: ['text', 'pointed', 'full', 'tr'], defaultLevel: 'full'},
    responsory: {key: 'notationResponsory', levels: ['text', 'full', 'tr'], defaultLevel: 'full'},
    prayers:  {key: 'notationPrayers',  levels: ['text', 'pointed', 'full', 'tr'], defaultLevel: 'pointed'},
    hymn:     {key: 'notationHymn',     levels: ['text', 'full', 'sung', 'tr'], defaultLevel: 'full'},
    marian:   {key: 'notationMarian',   levels: ['text', 'full', 'tr'], defaultLevel: 'full'},
    jube:       {key: 'notationJube',       levels: ['text', 'full', 'tr'], defaultLevel: 'full'},
    blessing:   {key: 'notationBlessing',   levels: ['text', 'full', 'tr'], defaultLevel: 'full'},
    adjutorium: {key: 'notationAdjutorium', levels: ['text', 'full', 'tr'], defaultLevel: 'full'},
    converte:   {key: 'notationConverte',   levels: ['text', 'full', 'tr'], defaultLevel: 'full'},
    'deus-in-adjutorium': {key: 'notationDeusInAdjutorium', levels: ['text', 'full', 'tr'], defaultLevel: 'full'},
    benedicamus: {key: 'notationBenedicamus', levels: ['text', 'full', 'tr'], defaultLevel: 'full'}
  };
  // A sung hymn, where the language can't sing it, is the translation only, as the menu shows; it's
  // kept for a language that can.
  var storedNotation = function(section) {
    var s = notationSections[section];
    var level = localStorage[s.key];
    level = s.levels.indexOf(level) >= 0 ? level : s.defaultLevel;
    return level === 'sung' && !textMode.canSing() ? 'tr' : level;
  };
  var trSections = function() {
    return Object.keys(notationSections).filter(function(section) {
      var level = storedNotation(section);
      return level === 'tr' || (level === 'sung' && textMode.mode() === 'la');
    });
  };
  // Tells text-mode.js which sections show the translation only, and whether the hymn is sung in it.
  var syncSections = function() {
    textMode.setTrSections(trSections());
    textMode.setHymnSung(storedNotation('hymn') === 'sung');
  };
  syncSections();
  // With the translation only, everything is plain text (TRANSLATIONS_PLAN.md §4).
  var notation = function(section) {
    return textMode.sectionMode(section) === 'tr'? 'text' : storedNotation(section);
  };
  var fullyNotated = function(section) {
    return notation(section) === 'full';
  };
  // The notated lesson, chapter and prayers are hidden below 'full', so they skip exsurge layout too.
  // A chant shows in its own section's mode (text-mode.js modeOf).  The psalms' and the canticle's
  // antiphons (the chants without a notation of their own in #placeholder and #canticle) are plain
  // text with their psalm, and notated while it's pointed.
  var markPlainText = function(section) {
    var stored = storedNotation(section);
    var $chants = $('chant-gabc[notation=' + section + ']').add(section === 'psalms' || section === 'canticle'?
      '[data-section=' + section + '] chant-gabc:not([notation])' : null);
    $chants.each(function(){
      var level = textMode.modeOf(this) === 'tr'? 'text' : stored === 'tr'? notationSections[section].defaultLevel : stored === 'sung'? 'full' : stored;
      var plainText = section === 'psalms' || section === 'canticle'? level === 'text' : level !== 'full';
      $(this).attr('plain-text', plainText? '' : null);
    });
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
    if(section === 'hymn') showHymnNotation();
    markPlainText(section);
  };
  // The hymn's menu offers singing it where the language can, and with the Text menu's translation
  // only (which hides the other notation menus), nothing else: there it stays while the language can
  // sing it.
  var showHymnNotation = function() {
    var trOnly = textMode.mode() === 'tr';
    var $selects = $('select[notation=hymn]');
    $selects.children('[value=sung]').prop({disabled: !textMode.canSing(), hidden: !textMode.canSing()});
    $selects.children('[value=text],[value=full]').prop({disabled: trOnly, hidden: trOnly});
    if(trOnly) $selects.val(storedNotation('hymn') === 'sung'? 'sung' : 'tr');
    $('.hymn-notation-menu').prop('hidden', trOnly && !textMode.canSing());
  };
  $.each(notationSections, updateNotation);
  // Sets the sections' notation to level.
  var setNotation = function(sections, level) {
    var was = trSections().join() + (storedNotation('hymn') === 'sung');
    sections.forEach(function(section) {
      localStorage[notationSections[section].key] = level;
    });
    // to or from the translation only, or singing the hymn in it: the translation may need loading,
    // and the sections' text is translated again
    if(was !== trSections().join() + (storedNotation('hymn') === 'sung')) {
      updateTextMode();
      return;
    }
    sections.forEach(function(section) {
      updateNotation(section);
      if(section === 'hymn') showHymnMode();
      if(section === 'psalms') setPsalms();
      if(section === 'canticle') setCanticle();
    });
  };
  $('select[notation]').change(function(e){
    setNotation([$(this).attr('notation')], $(this).val());
  });
  // The side panel (index.html): the settings, then each section, whose link goes to it on the page,
  // where it's shown today, and whose menu is the section's notation.  The gear opens and closes it,
  // as does a swipe left or right on a touch screen, and Escape or a click outside it closes it.  The
  // section at the top of the window is marked while it's open.
  var $root = $(document.documentElement);
  var $panelToggle = $('#panel-toggle');
  var $panel = $('#side-panel');
  var $jumps = $panel.find('a.jump');
  // where the page makes room for the panel (style.css), rather than being covered by it
  var besidePage = window.matchMedia ? window.matchMedia('(min-width: 900px)') : {matches: true};
  var jumpTarget = function(link) {
    return $($(link).attr('data-jump')).filter(':visible')[0];
  };
  var markSections = function() {
    var current = null, currentTop = -Infinity;
    $jumps.each(function(){
      var target = jumpTarget(this);
      $(this).toggleClass('absent', !target).attr({
        'aria-disabled': target? null : 'true',
        title: target? null : 'Not said today'
      });
      // the last section that starts at the top of the window or above it, as one does that's gone
      // to (scroll-margin-top in style.css); some chants are only a few lines apart
      var top = target? target.getBoundingClientRect().top : Infinity;
      if(top < 48 && top > currentTop) {
        current = this;
        currentTop = top;
      }
    });
    $jumps.removeClass('current').closest('li').removeClass('current');
    $(current).addClass('current').closest('#sections-nav ol > li').addClass('current');
    placeMarker(current);
  };
  // What a section's menu sets: its chants and its other text (text-mode.js sectionOf), where
  // they're shown.
  var pointed = {lesson: '.pointed-lesson', chapter: '.pointed-chapter', prayers: '.pointed-prayer'};
  var sectionContent = function(section) {
    return $(['chant-gabc[notation="' + section + '"]', '[data-section="' + section + '"]'].concat(pointed[section] || []).join(', '))
      .filter(':visible');
  };
  // The bar beside the section that's marked (style.css), from its start to the end of what its menu
  // sets there, before the next section (the prayers' menu sets the Marian antiphon's prayer too).
  // It slides when the section changes, and keeps up with the page otherwise.
  var $marker = $('#section-marker');
  var markedTarget = null;
  var placeMarker = function(link) {
    var target = link && jumpTarget(link);
    $marker.toggleClass('shown', !!target);
    if(!target) return;
    var page = document.documentElement.getBoundingClientRect();
    var rect = target.getBoundingClientRect();
    var next = Infinity;
    $jumps.each(function(){
      var other = jumpTarget(this);
      var top = other && other.getBoundingClientRect().top;
      if(other && top > rect.top && top < next) next = top;
    });
    var bottom = rect.bottom;
    sectionContent($(link).closest('li').find('select[notation]').attr('notation')).each(function(){
      var r = this.getBoundingClientRect();
      // with what's in it: a chant is inline, but its plain text is in blocks
      var range = document.createRange();
      range.selectNodeContents(this);
      var inner = range.getBoundingClientRect();
      var end = inner.width || inner.height? Math.max(r.bottom, inner.bottom) : r.bottom;
      if(r.top >= rect.top - 1 && r.top < next) bottom = Math.max(bottom, end);
    });
    $marker.toggleClass('sliding', target !== markedTarget && markedTarget !== null).css({
      top: rect.top - page.top,
      height: Math.max(Math.min(bottom, next - 6) - rect.top, 0),
      left: document.body.getBoundingClientRect().left - page.left - 7
    });
    markedTarget = target;
  };
  var markPending = false;
  var scheduleMark = function(){
    if(markPending || !$root.hasClass('panel-open')) return;
    markPending = true;
    window.requestAnimationFrame(function(){
      markPending = false;
      markSections();
    });
  };
  $(window).on('scroll resize', scheduleMark);
  // and as the page changes size: making room for the panel, and a chant drawn or drawn again
  if(window.ResizeObserver) new ResizeObserver(scheduleMark).observe(document.body);
  // As the page narrows or widens beside the panel, the text or chant at the top of the window stays
  // there, the same point of it at the same place, until the page has finished moving (style.css), or
  // is scrolled some other way.
  var placeAtTop = function() {
    var body = document.body.getBoundingClientRect();
    for(var y = 10; y < window.innerHeight; y += 20) {
      var el = document.elementFromPoint(body.left + body.width / 2, y);
      if(!el || el === document.body || el === document.documentElement || !document.body.contains(el)) continue;
      // a line of chant, rather than a note in it
      var svg = el.closest && el.closest('svg');
      while(svg && svg.parentNode && svg.parentNode.closest && svg.parentNode.closest('svg')) svg = svg.parentNode.closest('svg');
      return svg || el;
    }
    return null;
  };
  var keepPlace = function() {
    var anchor = placeAtTop();
    if(!anchor) return;
    var start = anchor.getBoundingClientRect();
    var placed = window.pageYOffset, done = false;
    var place = function() {
      if(done) return;
      var page = document.documentElement;
      // (at the foot of the page, a shorter page scrolls up by itself)
      var atFoot = window.pageYOffset >= page.scrollHeight - window.innerHeight - 1;
      if(Math.abs(window.pageYOffset - placed) > 1 && !atFoot) return stop();
      var rect = anchor.getBoundingClientRect();
      var top = start.height? start.top * rect.height / start.height : start.top;
      window.scrollBy(0, rect.top - top);
      placed = window.pageYOffset;
    };
    var stop = function() {
      done = true;
      $root.css('overflow-anchor', '').off('transitionend', moved);
      clearTimeout(timeout);
    };
    var moved = function(e) {
      if(e.target !== document.documentElement || e.originalEvent.propertyName !== 'padding-right') return;
      place();
      stop();
    };
    var frame = function() {
      place();
      if(!done) window.requestAnimationFrame(frame);
    };
    $root.css('overflow-anchor', 'none').on('transitionend', moved);
    window.requestAnimationFrame(frame);
    // without the transition (prefers-reduced-motion), it has already moved
    var timeout = setTimeout(function() {
      place();
      stop();
    }, 1000);
  };
  var showPanel = function(show) {
    if(show === $root.hasClass('panel-open')) return;
    if(besidePage.matches) keepPlace();
    $root.toggleClass('panel-open', show);
    $panelToggle.attr({'aria-expanded': show, 'aria-label': show? 'Close settings' : 'Settings'});
    // (it appears where the section is, rather than sliding there from where it was last)
    markedTarget = null;
    if(show) markSections();
    else if($.contains($panel[0], document.activeElement)) $panelToggle.focus();
  };
  $panelToggle.click(function(){
    showPanel(!$root.hasClass('panel-open'));
  });
  $(document).on('keydown', function(e){
    if(e.key === 'Escape' && $root.hasClass('panel-open')) showPanel(false);
  });
  // A click or tap outside the panel closes it, and does only that: what's under it isn't pressed too
  // (so it's caught before the page's own handlers, some of which stop it from going further).  Not
  // a click from the keyboard, though, nor one that began in the panel, as in selecting its text.
  var downInPanel = false;
  document.addEventListener('mousedown', function(e) {
    downInPanel = $panel[0].contains(e.target);
  }, true);
  document.addEventListener('click', function(e) {
    if(!$root.hasClass('panel-open') || !e.detail || downInPanel) return;
    var target = e.target;
    if(!document.documentElement.contains(target) || $panel[0].contains(target) || $panelToggle[0].contains(target)) return;
    e.preventDefault();
    e.stopPropagation();
    showPanel(false);
  }, true);
  // On a touch screen, a swipe to the left anywhere opens the panel, and one to the right closes it.
  // It's a swipe once one finger has gone 50px across, and twice as far across as up or down; not
  // while the page is zoomed in (when a swipe moves the page) or text is being selected, nor on the
  // playback controls, which have their own.
  var swipe = null;
  document.addEventListener('touchstart', function(e) {
    var touch = e.touches[0];
    swipe = e.touches.length === 1 && !$(e.target).closest('.chant-context, #mediaControls').length?
      {x: touch.clientX, y: touch.clientY} : null;
  }, {passive: true});
  document.addEventListener('touchmove', function(e) {
    if(!swipe) return;
    var touch = e.touches[0];
    var dx = touch.clientX - swipe.x, dy = touch.clientY - swipe.y;
    // a second finger, or scrolling up or down
    if(e.touches.length !== 1 || (Math.abs(dy) > 30 && Math.abs(dy) > Math.abs(dx))) {
      swipe = null;
      return;
    }
    if(Math.abs(dx) < 50 || Math.abs(dx) < 2 * Math.abs(dy)) return;
    swipe = null;
    if(window.visualViewport && window.visualViewport.scale > 1.01) return;
    var selection = window.getSelection && window.getSelection();
    if(selection && !selection.isCollapsed) return;
    showPanel(dx < 0);
  }, {passive: true});
  document.addEventListener('touchcancel', function() {
    swipe = null;
  }, {passive: true});
  $jumps.click(function(e){
    e.preventDefault();
    var target = jumpTarget(this);
    if(target) target.scrollIntoView({behavior: 'smooth', block: 'start'});
  });
  // What text to show: Latin, Latin and a translation, or the translation only; and which
  // translation (TRANSLATIONS_PLAN.md §5).  js/text-mode.js keeps both, and the body class
  // text-<mode>, which style.css reads.
  var $textMode = $('#selectTextMode');
  var $trLang = $('#selectTrLang');
  var $trVerses = $('#selectTrVerses');
  $trLang.append(textMode.languages.map(function(l){
    return '<option value="' + l.code + '">' + l.name + '</option>';
  }).join(''));
  // no menus until a translation is offered (?text= still works, for testing)
  $textMode.add($trLang).closest('li').toggle(textMode.languages.length > 0);
  // With the Latin only, the Translation menu is the Rubrics', which offers only the languages with
  // rubrics of their own.
  var showTextMode = function() {
    textMode.updateBodyClasses();
    $textMode.val(textMode.mode());
    var rubricsOnly = !textMode.translated();
    $('#trLangLabel').text(rubricsOnly ? 'Rubrics' : 'Translation');
    $trLang.children().each(function() {
      var other = rubricsOnly && textMode.rubricsLang(this.value) !== this.value;
      $(this).prop({disabled: other, hidden: other});
    });
    $trLang.val(rubricsOnly ? textMode.rubricsLang(textMode.lang()) : textMode.lang());
    // only the Latin and the translation together have verses to group
    $trVerses.val(textMode.versesMode()).closest('li').toggle(textMode.mode() === 'both');
  };
  showTextMode();
  // How to show the hymn in the translation (TRANSLATIONS_PLAN.md §4b and §5): literal or metrical
  // as text, or fully notated where the language can sing it, which is the hymn's 'Fully notated
  // translation'.  A choice the language hasn't is disabled.  text-mode.js falls back from a choice
  // the language or the season hasn't.
  var $hymnMode = $('#selectHymnMode');
  var showHymnMode = function() {
    var kinds = textMode.sectionMode('hymn') !== 'la' && textMode.hymnKinds();
    $hymnMode.closest('.hymn-mode-choice').prop('hidden', !kinds);
    if(!kinds) return;
    $hymnMode.children('[value=literal]').prop('disabled', !kinds.literal);
    $hymnMode.children('[value=metrical]').prop('disabled', !kinds.metrical);
    $hymnMode.children('[value=sung]').prop({disabled: !textMode.canSing(), hidden: !textMode.canSing()});
    if(storedNotation('hymn') === 'sung') {
      $hymnMode.val('sung');
      return;
    }
    // a choice that's disabled here shows what is shown in its place, and is kept for a language
    // that has it
    var fallbacks = {literal: ['literal', 'metrical'], metrical: ['metrical', 'literal']};
    $hymnMode.val(fallbacks[textMode.hymnMode()].filter(function(kind) {
      return !$hymnMode.children('[value=' + kind + ']').prop('disabled');
    })[0]);
  };
  $hymnMode.change(function(e){
    var kind = $(this).val();
    // to or from singing it: as text, the Latin stays notated beside it, or it's alone
    if(kind === 'sung' || storedNotation('hymn') === 'sung') {
      if(kind !== 'sung') textMode.setHymnMode(kind);
      setNotation(['hymn'], kind === 'sung'? 'sung' : textMode.mode() === 'both'? 'full' : 'tr');
      return;
    }
    textMode.setHymnMode(kind);
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
    // the Text menu and the language decide where the hymn is sung
    syncSections();
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
  // Each psalm verse with its translation, or the Latin's verses together and the translation's
  // (text-mode.js versesMode).
  $trVerses.change(function(e){
    textMode.setVersesMode($(this).val());
    translatePage();
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
  var wakeLockRequest;
  $(document).on('scroll', function(e) {
    // Keep the screen awake while someone is reading along; the lock is released when the page is hidden.
    if (wakeLockRequest || !navigator.wakeLock) return;
    wakeLockRequest = navigator.wakeLock.request('screen');
    wakeLockRequest.then(function(wakeLock) {
      wakeLock.addEventListener('release', function() {
        // if the page is scrolled later on, we want to re-acquire a wake lock
        wakeLockRequest = undefined;
      });
    }, function(err) {
      console.warn(err);
      wakeLockRequest = undefined;
    });
  }).on('click', function(e) {
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
  var textLines = function(section) {
    return fullyNotated(section)? '' : " text-lines='1'";
  };
  // Under Divino Afflatu, only the opening words of the antiphon are said before the psalms and the Nunc dimittis
  // (<antiphon>-intonation.gabc), and the whole of it after them, as DO says it at Compline on every day, double or
  // not (its antetpsalm doubles the antiphons only at Matins, Lauds and Vespers).
  var intoned = function() {
    return calendar.getRubrics() === 'DA';
  };
  // type should be '-po' for paschal octave, '-pt' for paschal time, or '-asd' for all souls' day, '-hs' for Holy
  // Saturday under Divino Afflatu, or '' for regular
  var currentCanticle = '';
  // index.html's own canticle, not intoned
  var renderedCanticle = {intoned: false};
  var setCanticle = function(type) {
    type = (typeof type == 'undefined')? currentCanticle.replace(/_full$/,'') : type;
    var antType = type;
    if(fullyNotated('canticle')) type += '_full';
    if(type === currentCanticle && renderedCanticle.intoned === intoned()) return;
    currentCanticle = type;
    renderedCanticle = {intoned: intoned()};
    var rendered = renderedCanticle;
    // There is no Nunc dimittis antiphon on All Souls' Day.
    var ant = antType === '-asd'? '' : "<chant-gabc src='canticle-ant"+antType+".gabc'></chant-gabc>";
    // Salva nos is begun the same way in Paschal time; the Easter octave's alleluias are said in full.
    var before = ant;
    if(rendered.intoned && /^(|-pt|-hs)$/.test(antType)) {
      before = "<chant-gabc src='canticle-ant"+(antType === '-hs'? '-hs' : '')+"-intonation.gabc'></chant-gabc>";
    }
    if(antType==='-pt') {
      antType = '';
      type = type.slice(3);
    }
    var psalm = "<chant-gabc notation='canticle'"+textLines('canticle')+" src='canticle-psalm"+type+".gabc'></chant-gabc>";
    var gotData = function(data){
      // a later call has changed the canticle since this one asked for its verses
      if(renderedCanticle !== rendered) return;
      var html = before + psalm + data;
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
    if(fullyNotated('canticle')) {
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
    if(renderedPsalms.day === day && renderedPsalms.paschalTime === paschalTime && renderedPsalms.full === fullyNotated('psalms') &&
        renderedPsalms.intoned === intoned()) return;
    renderedPsalms = {day: day, paschalTime: paschalTime, full: fullyNotated('psalms'), intoned: intoned()};
    var rendered = renderedPsalms;
    var ant = '',
        before = '',
        psalm = '',
        pt = '',
        full = fullyNotated('psalms')? '_full' : '';
    if(day === 'triduum') {
      day = 0;
      pt = '-triduum';
      full = '';
    } else if(day === 'asd') {
      pt = '';
      psalm = "<chant-gabc notation='psalms'"+textLines('psalms')+" src='psalms/"+day+"/psalm"+pt+full+".gabc'></chant-gabc>";
    } else {
      pt = paschalTime?'-PT':'';
      var antFile = paschalTime? 'psalms/ant-PT' : 'psalms/'+day+'/ant';
      ant = "<chant-gabc src='"+antFile+".gabc'></chant-gabc>";
      before = rendered.intoned? "<chant-gabc src='"+antFile+"-intonation.gabc'></chant-gabc>" : ant;
      if(paschalTime === 'no-antiphon') ant = before = '';
      psalm = "<chant-gabc notation='psalms'"+textLines('psalms')+" src='psalms/"+day+"/psalm"+pt+full+".gabc'></chant-gabc>";
      dayName = days[day];
    }
    var gotData = function(data){
      // a later call has changed the psalms since this one asked for their verses
      if(renderedPsalms !== rendered) return;
      var html = before + psalm + data + ant;
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
  // The Miserere of the Triduum under Divino Afflatu (index.html #miserere), loaded the first time it's needed
  var miserereLoaded = false;
  var setMiserere = function() {
    if(miserereLoaded) return;
    miserereLoaded = true;
    $.get('psalms/0/psalm-verses-miserere.html', function(data) {
      $('#miserere').append(data);
      textMode.translate('#miserere');
    });
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
    // under Divino Afflatu, the hymn's tone is DO's, where the menu has it (below)
    var $hymn = d.hymn ? $('#te-lucis-' + d.hymn) : $();
    if(d.hymn && !$hymn.length) console.warn('No te-lucis tone', d.hymn);
    //select inputs based on date
    $('.dropdown-menu a[select-date]').each(function(){
      var $this = $(this);
      if($hymn.length && $this.closest('[name=te-lucis]').length) return;
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
    $hymn.trigger('click',true);
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
      setMiserere();
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
    } else if(calendar.dateMatches(date,'easter-1')) {
      // Under Divino Afflatu, Holy Saturday's Compline follows Easter's First Vespers (isTriduum): Sunday's psalms
      // without an antiphon, as in the Easter octave, and the Nunc dimittis with Vespere autem sabbati.
      showChooseDay = false;
      setPsalms(0,'no-antiphon');
      setCanticle('-hs');
      $('.weekday-lbl').text('Holy Saturday');
    } else if(calendar.dateMatches(date,'allSouls')) {
      showChooseDay = false;
      $('.weekday-lbl').text('All Souls Day');
      setPsalms('asd');
      setCanticle('-asd');
    } else {
      var psalmDay = date.day();
      // Sunday's psalms on a feast of the I or II class, or, under Divino Afflatu, where DO's calendar gives
      // them (d.psalms, calendar.js)
      var sundayPsalms = d && ('psalms' in d ? d.psalms === 0 : d.rank <= 2);
      if(showChooseDay && sundayPsalms) {
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
      // under Divino Afflatu, the rank as it was, and whether Compline follows the office's First Vespers
      $('#feastDay').text(d.title + (d.rankName ? ' (' + d.rankName + (d.first ? ', First Vespers' : '') + ')' :
          d.rank < 5 ? ' (' + formattedRank(d.rank) + ')' : ''));
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
  });
  // The rubrics the office follows: 1960's, or Divino Afflatu's, as before 1955 (calendar.js).  The date is
  // shown once their calendar is loaded.
  var $rubrics = $('#selectRubrics');
  if(!$rubrics.children('[value="' + localStorage.rubrics + '"]').length) localStorage.rubrics = '1960';
  var showDate = function() { $date.change(); };
  calendar.setRubrics(localStorage.rubrics, showDate);
  $rubrics.val(localStorage.rubrics).change(function(){
    localStorage.rubrics = $(this).val();
    calendar.setRubrics(localStorage.rubrics, showDate);
  });
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
