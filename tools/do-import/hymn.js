// Phase 7: the hymn, Te lucis, as a literal translation, a metrical one, or the metrical one sung to
// the chant (TRANSLATIONS_PLAN.md §4b and §7i).  Each language's module gets
//   hymn: {
//     literal:  {stanzas: [stanza 1, stanza 2], doxologies: {Ferial: stanza 3, Christmas: …, …}},
//     metrical: {…},
//     sung:     {…}   // hyphenated, and only the doxologies whose tone the whole hymn fits
//   }
// where each doxology is keyed by its tone (te-lucis/<tone>.gabc) and ends with the Amen, and a kind
// the language hasn't is left out.  js/text-mode.js puts the hymn together from them.
//
// The DO hymn (texts.js, from manifest.json) is the language's literal or metrical text, as LANGUAGES
// in import.js says (§4b's table).  extra/<lang>/ may add:
//   hymn-literal.txt  a literal translation, where DO's is metrical (English: Britt, 1922)
//   hymn-sung.txt     the metrical text hyphenated by hand for singing, which is checked against
//                     DO's, or texts DO doesn't have, which take the place of DO's metrical text too
// Each is sections: [hymn] has the first two stanzas, separated by a blank line, and every other
// section is the third stanza, the doxology with its Amen, for the tones it names ([Christmas
// Our-Lady Seven-Dolors]).  A line that starts with # is a comment.  In hymn-sung.txt a - divides a
// word's syllables, and ‿ joins two words' vowels sung on one note (a synalepha); a section that
// isn't DO's text is marked "new" after its name ([Easter] new).
'use strict';
var fs = require('fs');
var path = require('path');

var TONES_DIR = 'te-lucis';

// Characters GABC can't take in a lyric (§7a), as texts.js's UNSAFE, and *.
var UNSAFE = /[()[\]{}<>_^%|\\#$@~*]/g;

// A GABC line's syllables that carry notes: those with words and a neume with a pitch in it.  A
// syllable whose neume is empty, () , is elided, as "Pa(g')tr<i>e</i>() et(f)", and a bar, (,) , has
// no words.
var NOTE = /[a-mA-M]/;
var noteSyllables = function(line) {
  var result = [];
  var syllable = /([^()]*)\(([^)]*)\)/g;
  var m;
  while((m = syllable.exec(line))) {
    var words = m[1].replace(/^\s*\d+\.\s+/, '').trim();
    if(words && NOTE.test(m[2])) result.push(words);
  }
  return result;
};

// Each tone's note-bearing syllables per line, per paragraph: {Ferial: [[8, 8, 8, 8], [8, 8, 8, 8],
// [8, 8, 8, 8, 2]], …}.  A paragraph is a stanza, and the last has the Amen.
exports.tones = function(root) {
  var tones = {};
  fs.readdirSync(path.join(root, TONES_DIR)).filter(function(f) { return /\.gabc$/.test(f); }).sort().forEach(function(f) {
    var gabc = fs.readFileSync(path.join(root, TONES_DIR, f), 'utf8').replace(/^﻿/, '').replace(/\r\n?/g, '\n');
    var body = gabc.split(/\n%%\n/)[1] || '';
    tones[f.replace(/\.gabc$/, '')] = body.trim().split(/\n\s*\n/).map(function(paragraph) {
      return paragraph.split('\n').map(function(line) { return noteSyllables(line).length; }).filter(Boolean);
    });
  });
  return tones;
};

// A sung line's syllables, in order, each {text, wordStart}: words split at spaces, and syllables at
// a - between letters.  A word with no letters (a dash) goes with the syllable before it.  swapLyrics
// in js/chant-element.js splits them the same way, and has to.
var syllables = exports.syllables = function(line) {
  var result = [];
  line.trim().split(/\s+/).forEach(function(word) {
    if(!/\p{L}/u.test(word) && result.length) {
      result[result.length - 1].text += ' ' + word;
      return;
    }
    word.split(/(?<=[\p{L}\p{M}’'‿.,;:!?¡¿])-(?=[\p{L}¡¿])/u).forEach(function(text, i) {
      result.push({text: text, wordStart: i === 0});
    });
  });
  return result;
};

// A sung text as text: no hyphens, and a space for each ‿.
var plain = exports.plain = function(text) {
  return text.split('\n').map(function(line) {
    return syllables(line).map(function(s) {
      return (s.wordStart ? ' ' : '') + s.text;
    }).join('').replace(/‿/g, ' ').trim();
  }).join('\n');
};
// For comparing a sung text with DO's: no hyphens at all (DO's "Virgin-Born" is sung Vir-gin-Born).
var unhyphenated = function(text) {
  return text.replace(/-/g, '').replace(/‿/g, ' ').replace(/[ \t]+/g, ' ').trim();
};

// extra/<code>/<name> as [{names, isNew, units}], or null if there is none.  A malformed file stops
// the import.
var readSections = exports.readSections = function(code, name, tones) {
  var file = path.join(__dirname, 'extra', code, name);
  if(!fs.existsSync(file)) return null;
  var where = 'extra/' + code + '/' + name;
  var sections = [];
  var current = null;
  fs.readFileSync(file, 'utf8').replace(/^﻿/, '').replace(/\r\n?/g, '\n').split('\n').forEach(function(line, i) {
    if(/^\s*#/.test(line)) return;
    var header = line.match(/^\[([^\]]+)\]\s*(\S*)\s*$/);
    if(header) {
      if(header[2] && header[2] !== 'new') throw new Error(where + ':' + (i + 1) + ': after the [names], only "new": ' + line);
      var names = header[1].trim().split(/\s+/);
      names.forEach(function(n) {
        if(n !== 'hymn' && !(n in tones)) throw new Error(where + ':' + (i + 1) + ': no tone te-lucis/' + n + '.gabc');
        sections.forEach(function(s) {
          if(s.names.indexOf(n) >= 0) throw new Error(where + ':' + (i + 1) + ': ' + n + ' twice');
        });
      });
      if(names.indexOf('hymn') >= 0 && names.length > 1) throw new Error(where + ':' + (i + 1) + ': [hymn] names no tones');
      current = {names: names, isNew: header[2] === 'new', lines: [], line: i + 1};
      sections.push(current);
    } else if(current) {
      current.lines.push(line.trim());
    } else if(/\S/.test(line)) {
      throw new Error(where + ':' + (i + 1) + ': text before the first [section]');
    }
  });
  sections.forEach(function(s) {
    s.units = s.lines.join('\n').split(/\n{2,}/).map(function(u) { return u.trim(); }).filter(Boolean);
    var want = s.names[0] === 'hymn' ? 2 : 1;
    if(s.units.length !== want) {
      throw new Error(where + ':' + s.line + ': [' + s.names.join(' ') + '] has ' + s.units.length + ' stanzas, not ' + want);
    }
    delete s.lines;
  });
  return sections;
};

// One kind of the hymn, {stanzas, doxologies}, from DO's units for each tone ({tone: [3 units]}).
var fromDO = function(doHymn, tones) {
  var result = {stanzas: null, doxologies: {}};
  Object.keys(tones).forEach(function(tone) {
    var units = doHymn[tone];
    if(!units || units.length !== 3) return;
    if(!result.stanzas) result.stanzas = units.slice(0, 2);
    result.doxologies[tone] = units[2];
  });
  return result.stanzas ? result : null;
};

// The hymn of one language, and its report.  lang: import.js's entry (lang.hymn is the kind DO's
// text is); doHymn: {tone: units} from DO, as texts.js built it and import.js respelled it;
// tones: exports.tones(); fix: the language's respelling, or null.
exports.build = function(lang, doHymn, tones, fix) {
  fix = fix || function(s) { return s; };
  var report = {kinds: [], literal: [], sung: [], errors: []};
  var hymn = {};
  var toneNames = Object.keys(tones);
  var doText = doHymn && fromDO(doHymn, tones);
  if(doText) {
    // DO's first two stanzas are the same for every tone
    toneNames.forEach(function(tone) {
      var units = doHymn[tone];
      if(units && units.slice(0, 2).join('\n\n') !== doText.stanzas.join('\n\n')) report.errors.push(tone + ': DO\'s first two stanzas differ from the other tones\'');
    });
  }
  if(doText && lang.hymn) hymn[lang.hymn] = doText;

  // extra/<lang>/hymn-literal.txt
  var literal = readSections(lang.code, 'hymn-literal.txt', tones);
  if(literal) {
    var own = {stanzas: null, doxologies: {}};
    literal.forEach(function(s) {
      if(s.names[0] === 'hymn') own.stanzas = s.units.map(fix);
      else s.names.forEach(function(tone) { own.doxologies[tone] = fix(s.units[0]); });
    });
    if(!own.stanzas) report.errors.push('extra/' + lang.code + '/hymn-literal.txt has no [hymn]');
    else hymn.literal = own;
  }

  // extra/<lang>/hymn-sung.txt: DO's metrical text hyphenated, or new texts
  var sung = readSections(lang.code, 'hymn-sung.txt', tones);
  if(sung) {
    var metrical = hymn.metrical;
    var text = {stanzas: null, doxologies: {}};
    sung.forEach(function(s) {
      var label = '[' + s.names.join(' ') + ']';
      s.units.forEach(function(u) {
        var unsafe = u.match(UNSAFE);
        if(unsafe) report.errors.push(label + ' has characters GABC can\'t take: ' + unsafe.join(' '));
      });
      var units = s.units.map(plain);
      if(!s.isNew) {
        // has to be DO's metrical text
        var mismatch = s.names.filter(function(n) {
          var theirs = !metrical ? null : n === 'hymn' ? metrical.stanzas.join('\n\n') : metrical.doxologies[n];
          return !theirs || unhyphenated(theirs) !== unhyphenated(s.units.join('\n\n'));
        });
        if(mismatch.length) {
          report.errors.push(label + ' isn\'t DO\'s metrical text for ' + mismatch.join(' ') + ' (mark it "new" if it takes its place)');
          return;
        }
      } else if(metrical) {
        // takes the place of DO's metrical text
        if(s.names[0] === 'hymn') metrical.stanzas = units;
        else s.names.forEach(function(tone) { metrical.doxologies[tone] = units[0]; });
        report.sung.push(label + ': new, in place of DO\'s');
      }
      if(s.names[0] === 'hymn') text.stanzas = s.units;
      else s.names.forEach(function(tone) { text.doxologies[tone] = s.units[0]; });
    });
    // the validator: the whole hymn, stanza by stanza and line by line, against each tone's notes
    var passed = {stanzas: text.stanzas, doxologies: {}};
    toneNames.forEach(function(tone) {
      if(!text.stanzas) return;
      if(!text.doxologies[tone]) {
        report.sung.push(tone + ': no sung doxology');
        return;
      }
      var units = text.stanzas.concat(text.doxologies[tone]);
      var chant = tones[tone];
      var problems = [];
      if(units.length !== chant.length) problems.push(units.length + ' stanzas for the chant\'s ' + chant.length);
      units.forEach(function(u, i) {
        if(!chant[i]) return;
        var lines = u.split('\n');
        if(lines.length !== chant[i].length) problems.push('stanza ' + (i + 1) + ' has ' + lines.length + ' lines for the chant\'s ' + chant[i].length);
        lines.forEach(function(line, j) {
          var n = syllables(line).length;
          if(j < chant[i].length && n !== chant[i][j]) {
            problems.push('stanza ' + (i + 1) + ' line ' + (j + 1) + ' has ' + n + ' syllables for ' + chant[i][j] + ' notes: ' + line);
          }
        });
      });
      if(problems.length) report.sung.push('!! ' + tone + ': not sung: ' + problems.join('; '));
      else passed.doxologies[tone] = text.doxologies[tone];
    });
    if(!text.stanzas) report.errors.push('extra/' + lang.code + '/hymn-sung.txt has no [hymn]');
    else if(Object.keys(passed.doxologies).length) hymn.sung = passed;
  }

  ['literal', 'metrical', 'sung'].forEach(function(kind) {
    if(!hymn[kind]) return;
    var have = toneNames.filter(function(t) { return hymn[kind].doxologies[t]; });
    var source = kind === 'sung' ? 'hymn-sung.txt' : kind === lang.hymn ? 'DO' + (kind === 'metrical' && sung ? ' and hymn-sung.txt' : '') : 'hymn-' + kind + '.txt';
    report.kinds.push(kind + ' ' + have.length + '/' + toneNames.length + ' (' + source + ')' +
      (have.length < toneNames.length ? ', not ' + toneNames.filter(function(t) { return have.indexOf(t) < 0; }).join(' ') : ''));
    // the doxologies in tone order, so the module doesn't change with the files' order
    var ordered = {};
    have.forEach(function(t) { ordered[t] = hymn[kind].doxologies[t]; });
    hymn[kind] = {stanzas: hymn[kind].stanzas, doxologies: ordered};
  });
  return {hymn: Object.keys(hymn).length ? hymn : null, report: report};
};
