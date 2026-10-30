define(['jquery','exsurge'], function($,exsurge) {
  'use strict';
  // Playback of a chant, as in jgabc: tapping a chant's large initial, or its first syllable, opens a
  // menu to play it and to choose its starting pitch, and while it plays, a bar at the bottom of the
  // page controls it.  jgabc plays through Tone.js; this uses the Web Audio API directly.
  var localStorage = window.localStorage;
  try {
    var mod = '__storage test__';
    localStorage.setItem(mod, mod);
    localStorage.removeItem(mod);
  } catch(e) {
    localStorage = {};
  }

  // Audio
  var AudioContext = window.AudioContext || window.webkitAudioContext;
  var audio, wave, output;
  // A reverberant space, as chant is heard in a church: the impulse is noise that dies away over 2.5s.
  var makeReverb = function() {
    var length = Math.floor(2.5 * audio.sampleRate);
    var impulse = audio.createBuffer(2, length, audio.sampleRate);
    for(var channel = 0; channel < 2; ++channel) {
      var data = impulse.getChannelData(channel);
      for(var i = 0; i < length; ++i) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 4);
      }
    }
    var reverb = audio.createConvolver();
    reverb.buffer = impulse;
    return reverb;
  };
  // Browsers only let audio start from a tap or click, so the tap on the initial that opens the
  // menu makes the context, or wakes it.
  var getAudio = function() {
    if(!audio) {
      audio = new AudioContext();
      // a pure tone between a flute pipe of an organ and a clarinet: mostly the fundamental, with a
      // little of the odd harmonics that give a clarinet its hollow sound, and hardly any of the even ones
      wave = audio.createPeriodicWave(new Float32Array([0, 1, 0.06, 0.25, 0.03, 0.1, 0.01, 0.04]), new Float32Array(8));
      output = audio.createGain();
      output.gain.value = 0.6;
      var filter = audio.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 2000;
      filter.Q.value = 0.5;
      var reverb = makeReverb();
      var wet = audio.createGain();
      wet.gain.value = 0.3;
      output.connect(filter);
      filter.connect(audio.destination);
      filter.connect(reverb);
      reverb.connect(wet);
      wet.connect(audio.destination);
      // iOS keeps Web Audio silent while the ring/silent switch is on silent, unless the page asks for playback.
      if(navigator.audioSession) navigator.audioSession.type = 'playback';
    }
    if(audio.state === 'suspended') audio.resume();
    return audio;
  };
  // exsurge numbers pitches in semitones from C0, so A4 (440 Hz) is 57.
  var frequency = function(pitch) {
    return 440 * Math.pow(2, (pitch - 57) / 12);
  };
  var startVoice = function(pitch, time) {
    var osc = audio.createOscillator();
    var gain = audio.createGain();
    osc.setPeriodicWave(wave);
    osc.frequency.value = frequency(pitch);
    gain.gain.setValueAtTime(0, time);
    osc.connect(gain);
    gain.connect(output);
    osc.onended = function() {
      gain.disconnect();
    };
    osc.start(time);
    return {
      gain: gain.gain,
      stop: function(time) {
        osc.stop(time);
      }
    };
  };
  // A note of the chant: like an organ pipe, it speaks over 0.06s and holds steady, and as it ends
  // it dies away into the reverberation.
  var playNote = function(pitch, time, length) {
    var voice = startVoice(pitch, time);
    voice.gain.linearRampToValueAtTime(0.8, time + 0.06);
    voice.gain.setTargetAtTime(0, time + length, 0.08);
    voice.stop(time + length + 0.8);
    return voice;
  };
  // One note at a time, so a note fades out as the next one swells in.
  var cutVoice = function(voice, time) {
    if(voice.gain.cancelAndHoldAtTime) {
      voice.gain.cancelAndHoldAtTime(time);
    } else {
      voice.gain.cancelScheduledValues(time);
    }
    voice.gain.setTargetAtTime(0, time, 0.02);
  };
  // The starting pitch sounds for as long as its button is held, as with jgabc's tones.js.
  var stopHeldTone;
  var holdTone = function(pitch) {
    var voice = startVoice(pitch, audio.currentTime);
    voice.gain.setTargetAtTime(0.8, audio.currentTime, 0.03);
    stopHeldTone = function() {
      voice.gain.setTargetAtTime(0, audio.currentTime, 0.1);
      voice.stop(audio.currentTime + 0.8);
      stopHeldTone = null;
    };
  };
  var releaseHeldTone = function() {
    if(stopHeldTone) stopHeldTone();
  };

  // Note lengths, from jgabc
  var tempo = 165;
  var beat = function() {
    return 60 / tempo;
  };
  var getIsUsingSolesmesLengths = function() {
    return localStorage.isUsingSolesmesLengths !== 'false';
  };
  var arePitchesEqual = function(pitches) {
    return pitches.every(function(pitch) {
      return pitch.toInt() === pitches[0].toInt();
    });
  };
  var isLastNoteInNeume = function(note) {
    return note === note.neume.notes[note.neume.notes.length - 1];
  };
  var isFirstNoteInNeume = function(note) {
    return note === note.neume.notes[0];
  };
  // the note at index i, if it is a note and not a bar or the like
  var noteAt = function(notes, i) {
    var note = notes[i];
    return (note && note.constructor === exsurge.Note)? note : null;
  };
  var isSalicus = function(notes, noteId) {
    var note = notes[noteId],
        nextNote = noteAt(notes, noteId + 1),
        prevNote = noteAt(notes, noteId - 1);
    if(!note.ictus || !prevNote || !nextNote) return false;
    if(note.pitch.toInt() - prevNote.pitch.toInt() === 7 && nextNote.pitch.toInt() - note.pitch.toInt() === 1) return true;
    return getIsUsingSolesmesLengths() &&
      note.ictus.glyphCode === 'VerticalEpisemaBelow' &&
      (note.glyphVisualizer.glyphCode === 'PodatusLower' || note.glyphVisualizer.glyphCode === 'BeginningAscLiquescent') &&
      note.pitch.toInt() > prevNote.pitch.toInt() &&
      nextNote.pitch.toInt() > note.pitch.toInt();
  };
  // in beats
  var noteDuration = function(notes, noteId) {
    var note = notes[noteId],
        nextNote = noteAt(notes, noteId + 1),
        prevNote = noteAt(notes, noteId - 1);
    if(note.morae.length) return 2;
    if(nextNote && (nextNote.morae.length > 1 || nextNote.shape === exsurge.NoteShape.Quilisma || isSalicus(notes, noteId))) return 1.8;
    if(note.episemata.length) {
      var episemataCount = 1;
      if(prevNote && prevNote.episemata.length) ++episemataCount;
      if(nextNote && nextNote.episemata.length) ++episemataCount;
      return 1 + 0.9 / episemataCount;
    }
    return 1;
  };
  // repeated notes in one neume (bistropha, tristropha) sound as one long note
  var isApostropha = function(note) {
    var neume = note.neume;
    return neume.isNeume && neume.notes.length > 1 && arePitchesEqual(neume.notes.map(function(n) { return n.pitch; }));
  };
  // so do two neumes that meet on the same pitch
  var getPressus = function(notes, noteId) {
    var note = notes[noteId],
        nextNote = noteAt(notes, noteId + 1),
        prevNote = noteAt(notes, noteId - 1),
        noteBeforePrev = noteAt(notes, noteId - 2);
    if(nextNote && nextNote.morae.length === 0 && note.morae.length === 0 &&
        isLastNoteInNeume(note) && isFirstNoteInNeume(nextNote) &&
        arePitchesEqual([note.pitch, nextNote.pitch]) &&
        (!prevNote || !getPressus(notes, noteId - 1)) &&
        !isApostropha(note) && !isApostropha(nextNote) &&
        nextNote.neume.lyrics.length === 0) {
      return [note, nextNote];
    }
    if(prevNote && prevNote.morae.length === 0 && note.morae.length === 0 &&
        isLastNoteInNeume(prevNote) && isFirstNoteInNeume(note) &&
        arePitchesEqual([prevNote.pitch, note.pitch]) &&
        (!noteBeforePrev || !getPressus(notes, noteId - 2)) &&
        !isApostropha(prevNote) && !isApostropha(note) &&
        note.neume.lyrics.length === 0) {
      return [prevNote, note];
    }
  };

  // Playing
  // Each note is scheduled this many seconds before it sounds.
  var lookAhead = 0.1;
  var playback = null;
  var setHighlight = function(name, elem) {
    var old = playback[name];
    if(old === elem) return;
    if(old) old.classList.remove('active', 'porrectus-left', 'porrectus-right');
    playback[name] = elem;
    if(elem) elem.classList.add('active');
  };
  var playScore = function(score) {
    stopScore();
    var notes = [].concat.apply([], score.notations.map(function(notation) {
      return notation.notes || notation;
    })).filter(function(notation) {
      return !notation.isAccidental;
    });
    var firstNote = notes.filter(function(note) {
      return note.constructor === exsurge.Note;
    })[0];
    if(!firstNote) return;
    playback = {
      score: score,
      svg: score.svg,
      notes: notes,
      noteId: 0,
      transpose: score.playbackPitch.transpose
    };
    setHighlight('dropCap', $(score.svg).find('text.dropCap')[0]);
    showMediaControls();
    playNextNote(getAudio().currentTime + lookAhead);
  };
  // Sounds the next note at time, and unless step is set, schedules the one after it.
  var playNextNote = function(time, step) {
    var p = playback;
    if(!p) return;
    clearTimeout(p.timer);
    p.timer = null;
    time = Math.max(time, audio.currentTime);
    var notes = p.notes,
        note = notes[p.noteId],
        duration = 1;
    setHighlight('noteElem', null);
    // stop at the end, or if the chant has been drawn again
    if(!note || p.score.svg !== p.svg || !document.body.contains(p.svg)) {
      stopScore();
      return;
    }
    if(note.constructor !== exsurge.Note) {
      // a quarter bar takes no time
      while(note.constructor !== exsurge.Note && (!note.isDivider || note.constructor === exsurge.QuarterBar)) {
        note = notes[++p.noteId];
        if(!note) {
          stopScore();
          return;
        }
      }
      if(note.isDivider) {
        setHighlight('syllable', null);
        setHighlight('dropCap', null);
        if(note.constructor === exsurge.FullBar || note.constructor === exsurge.DoubleBar) duration = 2;
      }
    }
    var elem = note.svgNode;
    if(elem) {
      // the two notes of a porrectus are one glyph, so each lights up half of it
      var href = elem.href.baseVal;
      if(href === '#None') {
        elem = elem.previousSibling;
        setHighlight('noteElem', elem);
        elem.classList.add('porrectus-right');
      } else {
        setHighlight('noteElem', elem);
        if(/^#Porrectus/.test(href)) elem.classList.add('porrectus-left');
      }
      var syllable = $(elem).parent().parent().find('text')[0];
      if(syllable && syllable !== p.syllable) {
        if(p.syllable) setHighlight('dropCap', null);
        setHighlight('syllable', syllable);
      }
    }
    if(note.constructor === exsurge.Note) {
      duration = noteDuration(notes, p.noteId);
      var length = duration;
      var pressus = getPressus(notes, p.noteId);
      if(isApostropha(note) || pressus) {
        length = 0;
        if(isApostropha(note) && isFirstNoteInNeume(note)) {
          note.neume.notes.forEach(function(n) {
            length += noteDuration(notes, notes.indexOf(n));
          });
        } else if(pressus && pressus[0] === note) {
          length = noteDuration(notes, p.noteId) + noteDuration(notes, p.noteId + 1);
        }
      }
      if(length) {
        if(p.voice) cutVoice(p.voice, time);
        p.voice = playNote(note.pitch.toInt() + p.transpose, time, length * beat());
      }
    }
    ++p.noteId;
    if(step) return;
    var nextTime = time + duration * beat();
    p.timer = setTimeout(function() {
      playNextNote(nextTime);
    }, (nextTime - lookAhead - audio.currentTime) * 1000);
  };
  var isPaused = function() {
    return !playback.timer;
  };
  var pauseScore = function() {
    clearTimeout(playback.timer);
    playback.timer = null;
  };
  var stopScore = function() {
    if(!playback) return;
    clearTimeout(playback.timer);
    if(playback.voice) cutVoice(playback.voice, audio.currentTime);
    setHighlight('noteElem', null);
    setHighlight('syllable', null);
    setHighlight('dropCap', null);
    playback = null;
    $('#mediaControls').addClass('offscreen');
  };

  // Icons, since the page doesn't have Bootstrap's glyphicon font
  var icon = function(d) {
    return '<svg class="icon" viewBox="0 0 16 16"><path fill-rule="evenodd" d="' + d + '"/></svg>';
  };
  var icons = {
    play: icon('M4 2.5v11l9-5.5z'),
    pause: icon('M3.5 2.5h3v11h-3zM9.5 2.5h3v11h-3z'),
    stepForward: icon('M3 2.5v11l7-5.5zM10.5 2.5h2.5v11h-2.5z'),
    stop: icon('M3 3h10v10H3z'),
    minus: icon('M3 7h10v2H3z'),
    plus: icon('M7 3h2v4h4v2H9v4H7V9H3V7h4z'),
    up: icon('M8 1.5L2.5 8H6v6.5h4V8h3.5z'),
    down: icon('M8 14.5L13.5 8H10V1.5H6V8H2.5z'),
    checked: icon('M2 2h12v12H2zM3.5 3.5v9h9v-9zM4.2 7.6l1.1-1.1 1.9 1.9 3.6-3.6 1.1 1.1-4.7 4.7z'),
    unchecked: icon('M2 2h12v12H2zM3.5 3.5v9h9v-9z')
  };
  // a salicus, as on jgabc's toggle for the Solesmes length of the salicus
  var salicus = '<svg class="salicus" viewBox="0 0 12.5 20.4">' +
    '<path transform="translate(3.125,16.486) scale(0.0625)" d="m 0,-60.906 c 33.333,0 50,9.635 50,28.906 V 62.53 C 39.062,51.595 22.396,46.126 0,46.126 c -22.396,0 -39.063,5.47 -50,16.406 V -32 c 0,-19.27 16.667,-28.906 50,-28.906 z"/>' +
    '<path transform="translate(9.375,10.236) scale(0.0625)" d="m -4.688,-30.28 c 22.396,0 34.636,-0.262 36.72,-0.782 5.728,-1.563 8.593,-5.21 8.593,-10.938 H 50 v 97.656 c 0,2.604 -1.302,4.167 -3.906,4.688 -5.21,0.52 -21.355,0.78 -48.438,0.78 -23.958,0 -38.54,-0.26 -43.75,-0.78 -2.604,0 -3.906,-1.302 -3.906,-3.906 v -82.032 c 0,-3.646 1.302,-5.468 3.906,-5.468 h 2.344 c 2.604,0.52 15.625,0.78 39.063,0.78 z"/>' +
    '<path transform="translate(12.5,3.986) scale(0.0625)" d="m -46.094,-63.78 c 13.542,0 24.61,2.473 33.203,7.42 C -4.298,-51.41 0,-43.99 0,-34.093 V 62 h -9.375 c 0,-10.938 -2.604,-19.14 -7.812,-24.61 -5.21,-5.468 -14.844,-8.203 -28.907,-8.202 -18.23,0 -33.333,4.166 -45.312,12.5 v -75.782 c 0,-19.79 15.104,-29.687 45.312,-29.687 z"/>' +
    '<path transform="translate(9.375,15.236) scale(0.0625)" d="m -8,56 c 2,3 6,4 8,4 2,0 6,-1 8,-4 V 4 C 6,1 2,0 0,0 -2,0 -6,1 -8,4 Z"/>' +
    '</svg>';

  // The bar at the bottom of the page while a chant plays
  var showMediaControls = function() {
    var $controls = $('#mediaControls');
    if($controls.length === 0) {
      $controls = $("<div id='mediaControls' class='hidden-print offscreen'><div>" +
          "<button title='Use Solesmes length for salicus' class='btn btn-sm btn-info use-solesmes-lengths'></button>" +
          "<div class='btn-group'>" +
            "<button class='btn btn-sm btn-primary play-pause'></button>" +
            "<button class='btn btn-sm btn-primary step-forward'>" + icons.stepForward + "</button>" +
            "<button class='btn btn-sm btn-default tempo-minus'>" + icons.minus + "</button>" +
            "<span class='btn btn-sm btn-default tempo'><span class='tempo-number'></span> BPM</span>" +
            "<button class='btn btn-sm btn-default tempo-plus'>" + icons.plus + "</button>" +
            "<button class='btn btn-sm btn-danger stop'>" + icons.stop + "</button>" +
          "</div>" +
        "</div></div>").appendTo(document.body);
      var showSolesmesLengths = function() {
        $controls.find('.use-solesmes-lengths').html((getIsUsingSolesmesLengths()? icons.checked : icons.unchecked) + ' ' + salicus);
      };
      showSolesmesLengths();
      $controls.on('click', function(e) {
        e.stopPropagation();
      }).on('click', '.use-solesmes-lengths', function() {
        localStorage.isUsingSolesmesLengths = !getIsUsingSolesmesLengths();
        showSolesmesLengths();
      }).on('click', '.play-pause', function() {
        if(!playback) return;
        if(isPaused()) {
          playNextNote(audio.currentTime);
        } else {
          pauseScore();
        }
        $(this).html(isPaused()? icons.play : icons.pause);
      }).on('click', '.step-forward', function() {
        if(!playback) return;
        pauseScore();
        playNextNote(audio.currentTime, true);
        $controls.find('.play-pause').html(icons.play);
      }).on('click', '.tempo-minus, .tempo-plus', function() {
        tempo = Math.round(Math.max(0, tempo + ($(this).hasClass('tempo-plus')? 5 : -5))) || 165;
        $controls.find('.tempo-number').text(tempo);
      }).on('click', '.stop', stopScore);
    }
    $controls.find('.play-pause').html(icons.pause);
    $controls.find('.tempo-number').text(tempo);
    // after it has been drawn offscreen, so that it slides in
    setTimeout(function() {
      if(playback) $controls.removeClass('offscreen');
    });
  };

  // The menu on a chant's initial
  var noteNames = ['C', 'C♯ / D♭', 'D', 'D♯ / E♭', 'E', 'F', 'F♯ / G♭', 'G', 'G♯ / A♭', 'A', 'A♯ / B♭', 'B'];
  var solfegeNames = ['Do', 'Di', 'Re', 'Me', 'Mi', 'Fa', 'Fi', 'Sol', 'Si', 'La', 'Te', 'Ti'];
  var pitchIntervals = ['P1', 'm2', 'M2', 'm3', 'M3', 'P4', 'A4', 'P5', 'm6', 'M6', 'm7', 'M7'];
  var pitchClass = function(pitch) {
    return ((pitch % 12) + 12) % 12;
  };
  var withOctave = function(name, pitch) {
    return name + '<sub>' + Math.floor(pitch / 12) + '</sub>';
  };
  var getPitchRange = function(semitones) {
    var octaves = Math.floor(semitones / 12);
    var result = pitchIntervals[semitones % 12];
    if(!octaves) return result;
    return result[0] + (parseInt(result[1]) + 7 * octaves);
  };
  var removeMenus = function() {
    $('.chant-context').remove();
  };
  // A score's notes, in order, in exsurge's pitch numbers
  var getPitches = function(score) {
    var pitches = [];
    score.notations.forEach(function(notation) {
      if(notation.notes) notation.notes.forEach(function(note) {
        pitches.push(note.pitch.toInt());
      });
    });
    return pitches;
  };
  // The scores sung at one pitch with this one: the rest of its chant, and within data-pitch-group (the
  // psalms, the canticle), the antiphons and the psalm tone around it too.  They share one transposition
  // (score.playbackPitch), set at first from the range of all of them, so raising or lowering any of
  // them raises or lowers them all.
  var getPitchGroup = function(score) {
    var $chant = $(score.svg).closest('chant-gabc'),
        $group = $chant.closest('[data-pitch-group]');
    // jQuery's map flattens each chant's array of scores
    var scores = ($group.length? $group.find('chant-gabc') : $chant).map(function() {
      return this._score || [];
    }).get();
    if(scores.indexOf(score) < 0) scores = [score];
    var lowPitch = Infinity, highPitch = -Infinity;
    scores.forEach(function(s) {
      getPitches(s).forEach(function(pitch) {
        lowPitch = Math.min(lowPitch, pitch);
        highPitch = Math.max(highPitch, pitch);
      });
    });
    // as the group was last played, if any of it still has the pitch it was given;
    // otherwise the middle of the range at the G above middle C, until it is changed
    var pitch = scores.map(function(s) {
      return s.playbackPitch;
    }).filter(Boolean)[0] || {transpose: 55 - Math.floor((lowPitch + highPitch) / 2)};
    scores.forEach(function(s) {
      s.playbackPitch = pitch;
    });
    return {pitch: pitch, lowPitch: lowPitch, highPitch: highPitch};
  };
  // over the initial, or over the first syllable
  var showMenu = function(anchor) {
    removeMenus();
    var score = $(anchor).closest('svg').prop('source');
    if(!score || !AudioContext) return;
    getAudio();
    var startPitch = getPitches(score)[0];
    if(startPitch === undefined) return;
    var group = getPitchGroup(score),
        lowPitch = group.lowPitch,
        highPitch = group.highPitch;

    var $menu = $("<div class='chant-context btn-group-vertical hidden-print'>" +
        "<button class='btn btn-primary play'>" + icons.play + " Play</button>" +
        "<div class='btn btn-default info'>Range: " + withOctave(solfegeNames[pitchClass(lowPitch)].slice(0, 2), lowPitch) +
          " to " + withOctave(solfegeNames[pitchClass(highPitch)].slice(0, 2), highPitch) + " (" + getPitchRange(highPitch - lowPitch) + ")</div>" +
        "<div class='btn-group'>" +
          "<button class='btn btn-success pitch-up'>" + icons.up + "</button>" +
          "<button class='btn btn-info hold-pitch'><div>Starting Pitch: <span class='this-pitch'></span></div>" +
            "<div>Range: <span class='lowest-pitch'></span> to <span class='highest-pitch'></span></div></button>" +
          "<button class='btn btn-success pitch-down'>" + icons.down + "</button>" +
        "</div>" +
        "<div class='btn btn-default info'>Do = <span class='do-pitch'></span></div>" +
      "</div>");
    // Raising the pitch names it as a sharp, and lowering it as a flat.
    var changePitch = function(offset) {
      var transpose = group.pitch.transpose += offset,
          pitch = startPitch + transpose,
          lowest = lowPitch + transpose,
          highest = highPitch + transpose,
          name = noteNames[pitchClass(pitch)];
      if(offset === 1) name = name.slice(0, 2);
      else if(offset === -1) name = name.slice(-2);
      $menu.find('.this-pitch').html(withOctave(name, pitch));
      $menu.find('.lowest-pitch').html(withOctave(noteNames[pitchClass(lowest)].slice(0, 2), lowest));
      $menu.find('.highest-pitch').html(withOctave(noteNames[pitchClass(highest)].slice(0, 2), highest));
      $menu.find('.do-pitch').text(noteNames[pitchClass(transpose)]);
    };
    var hasPointerEvents = !!window.PointerEvent;
    $menu.on('click', function(e) {
      e.stopPropagation();
      releaseHeldTone();
    }).on('click', '.play', function() {
      removeMenus();
      playScore(score);
    }).on('click', '.pitch-up', function() {
      changePitch(1);
    }).on('click', '.pitch-down', function() {
      changePitch(-1);
    }).find('.hold-pitch').on(hasPointerEvents? 'pointerdown' : 'mousedown touchstart', function() {
      if(!stopHeldTone) holdTone(startPitch + group.pitch.transpose);
    }).on(hasPointerEvents? 'pointerup pointercancel pointerleave' : 'mouseup touchcancel touchend', releaseHeldTone)
    .on('contextmenu', function(e) {
      e.preventDefault();
    });
    changePitch(0);

    // centered over the initial or syllable, above the first line of the chant, or below it if there isn't room
    $menu.appendTo(document.body);
    var capRect = anchor.getBoundingClientRect(),
        lineRect = anchor.parentNode.getBoundingClientRect(),
        width = $menu.outerWidth(),
        height = $menu.outerHeight(),
        left = capRect.left + (capRect.width - width) / 2,
        top = lineRect.top - height;
    left = Math.max(8, Math.min(left, document.documentElement.clientWidth - 8 - width));
    if(top < 0) top = lineRect.bottom;
    $menu.css({
      left: left + window.pageXOffset,
      top: top + window.pageYOffset
    });
  };

  // The glow and the halves of a porrectus while a note plays (style.css)
  $(document.body).append("<svg class='playback-defs' aria-hidden='true'><defs>" +
      "<filter id='text-glow' x='-100%' y='-100%' width='300%' height='300%'>" +
        "<feGaussianBlur in='SourceAlpha' stdDeviation='5 5' result='glow'/>" +
        "<feFlood class='playback-flood' result='color'/>" +
        "<feComposite in='color' in2='glow' operator='in' result='glow-color'/>" +
        "<feMerge><feMergeNode in='glow-color'/><feMergeNode in='SourceGraphic'/></feMerge>" +
      "</filter>" +
      "<filter id='note-glow' x='-150%' y='-150%' width='400%' height='400%'>" +
        "<feGaussianBlur in='SourceAlpha' stdDeviation='5 5' result='glow'/>" +
        "<feFlood class='playback-flood' result='color'/>" +
        "<feComposite in='color' in2='glow' operator='in' result='glow-color'/>" +
        "<feMerge><feMergeNode in='glow-color'/><feMergeNode in='glow-color'/><feMergeNode in='SourceGraphic'/></feMerge>" +
      "</filter>" +
      "<linearGradient id='porrectus-left' x1='0%' y1='0%' x2='100%' y2='0%'>" +
        "<stop offset='0%' class='playback-stop'/><stop offset='150%' class='playback-stop-faded'/>" +
      "</linearGradient>" +
      "<linearGradient id='porrectus-right' x1='0%' y1='0%' x2='100%' y2='0%'>" +
        "<stop offset='-50%' class='playback-stop-faded'/><stop offset='100%' class='playback-stop'/>" +
      "</linearGradient>" +
    "</defs></svg>");

  // The first syllable of a chant, with its notes, opens the menu too, so that a chant without a large
  // initial can be played.  A punctum is small to tap, so the space within a note's width of them counts.
  var getStart = function(svg, x, y) {
    var score = svg.source;
    if(!score) return null;
    var notation = score.notations.filter(function(notation) {
      return notation.notes && notation.notes.length;
    })[0];
    var noteElem = notation && notation.notes[0].svgNode;
    if(!noteElem || !svg.contains(noteElem)) return null;
    var syllable = noteElem.parentNode.parentNode,
        rect = syllable.getBoundingClientRect(),
        margin = noteElem.getBoundingClientRect().width;
    if(x < rect.left - margin || x > rect.right + margin || y < rect.top - margin || y > rect.bottom + margin) return null;
    return syllable;
  };

  $(document).on('click', function() {
    removeMenus();
    releaseHeldTone();
  }).on('click', 'chant-gabc text.dropCap', function(e) {
    e.stopPropagation();
    releaseHeldTone();
    showMenu(this);
  }).on('click', 'chant-gabc svg', function(e) {
    var start = getStart(this, e.clientX, e.clientY);
    if(!start) return;
    e.stopPropagation();
    releaseHeldTone();
    showMenu(start);
  }).on('mousemove', 'chant-gabc svg', function(e) {
    this.classList.toggle('at-start', !!getStart(this, e.clientX, e.clientY));
  });
});
