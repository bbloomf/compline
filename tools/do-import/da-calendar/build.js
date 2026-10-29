#!/usr/bin/env node
// Generates js/calendar-da.js, the calendar under the rubrics of Divino Afflatu (DIVINO_AFFLATU_PLAN.md, Phase 2):
// for each day, the office that Compline follows, as Divinum Officium's own engine decides it
// (compline-office.pl, with DO's "Divino Afflatu - 1954").  So the occurrence, the octaves, the transfers and
// the concurrence are DO's.
//
//   node tools/do-import/da-calendar/build.js [--do <dir>] [--raw <dir>]
//
// A year's calendar depends only on its Easter and on whether it's a leap year, so it runs DO over one year of
// each of the 70 kinds, and the app looks a date's year up by its kind.  --raw keeps DO's output for each year
// in <dir> (as <year>.tsv), and uses what's there instead of running DO again.  It needs perl; DO's own CGI.pm is
// stood in for by cgi-stub/.
'use strict';
var fs = require('fs');
var os = require('os');
var path = require('path');
var childProcess = require('child_process');

var here = __dirname;
var root = path.resolve(here, '../../..');

var args = process.argv.slice(2);
var options = {doDir: null, raw: null};
for(var i = 0; i < args.length; ++i) {
  if(args[i] === '--do' && args[i + 1]) options.doDir = path.resolve(args[++i]);
  else if(args[i] === '--raw' && args[i + 1]) options.raw = path.resolve(args[++i]);
  else {
    console.error('Usage: node tools/do-import/da-calendar/build.js [--do <dir>] [--raw <dir>]');
    process.exit(1);
  }
}

// The DO checkout, as import.js finds it: --do, else divinum-officium/ next to this checkout or the main one.
var findDO = function() {
  if(options.doDir) return options.doDir;
  var candidates = [path.join(root, '../divinum-officium')];
  try {
    var common = childProcess.execSync('git rev-parse --path-format=absolute --git-common-dir', {cwd: root}).toString().trim();
    candidates.push(path.join(path.dirname(common), '../divinum-officium'));
  } catch(e) {}
  return candidates.filter(function(dir) { return fs.existsSync(path.join(dir, 'web/cgi-bin/horas/horascommon.pl')); })[0];
};
var doDir = findDO();
if(!doDir) {
  console.error('No DO checkout with its code and tables: run tools/do-import/fetch-do.sh, or give its directory with --do.');
  process.exit(1);
}
var doCommit = fs.readFileSync(path.join(here, '../DO_COMMIT'), 'utf8').trim();
var head = childProcess.execSync('git rev-parse HEAD', {cwd: doDir}).toString().trim();
if(head !== doCommit) {
  console.error('The DO checkout in ' + doDir + ' is at ' + head + ', not DO_COMMIT ' + doCommit + '. Run fetch-do.sh.');
  process.exit(1);
}

// Easter (the Gregorian computus) as [month, day]
var easter = function(Y) {
  var a = Y % 19, b = Math.floor(Y / 100), c = Y % 100, d = Math.floor(b / 4), e = b % 4;
  var f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  var i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  var month = Math.floor((h + l - 7 * m + 114) / 31), day = ((h + l - 7 * m + 114) % 31) + 1;
  return [month, day];
};
var isLeap = function(Y) { return (Y % 4 === 0 && Y % 100 !== 0) || Y % 400 === 0; };
var pad = function(n) { return (n < 10 ? '0' : '') + n; };
// A kind of year: Easter's MMDD, and L for a leap year (calendar.js's yearKind).
var kindOf = function(Y) {
  var e = easter(Y);
  return pad(e[0]) + pad(e[1]) + (isLeap(Y) ? 'L' : '');
};
// One year of each kind: the first from 2000, else the first from 1583, the first Gregorian year that DO takes.
var years = {};
var year;
for(year = 2000; year < 4100; ++year) if(!(kindOf(year) in years)) years[kindOf(year)] = year;
for(year = 1583; year < 2000; ++year) if(!(kindOf(year) in years)) years[kindOf(year)] = year;
var kinds = Object.keys(years).sort();

// DO's output for a year: one line a day (compline-office.pl's columns).
var runDO = function(Y, callback) {
  var file = options.raw && path.join(options.raw, Y + '.tsv');
  if(file && fs.existsSync(file)) return callback(null, fs.readFileSync(file, 'utf8'));
  childProcess.execFile('perl', [path.join(here, 'compline-office.pl'), doDir, '01-01-' + Y, '12-31-' + Y],
      {maxBuffer: 1 << 26}, function(err, stdout, stderr) {
    if(err) return callback(err);
    if(file) fs.writeFileSync(file, stdout);
    callback(null, stdout);
  });
};
var output = {};
var next = 0, running = 0;
var parallel = Math.max(1, os.cpus().length - 1);
if(options.raw) fs.mkdirSync(options.raw, {recursive: true});
var run = function(kind) {
  ++running;
  runDO(years[kind], function(err, stdout) {
    if(err) {
      console.error('DO failed for ' + years[kind] + ': ' + err.message);
      process.exit(1);
    }
    output[kind] = stdout;
    process.stdout.write('.');
    --running;
    if(Object.keys(output).length === kinds.length) finish();
    else start();
  });
};
var start = function() {
  while(running < parallel && next < kinds.length) run(kinds[next++]);
};

// The English for DO's rank names, which stay Latin in its English files, and the class of 1960 that calendar.js's
// date tokens (firstClassFeast and the rest) take each for: 1 or 2 for the I or II class, 3 for the other feasts
// and the octave days, 4 for a simple and 10 for a feria, as calendar.js's own Feria is.
var RANKS = {
  'Duplex I. classis': ['Double of the I Class', 1],
  'Duplex II. classis': ['Double of the II Class', 2],
  'Duplex majus': ['Greater Double', 3],
  'Duplex': ['Double', 3],
  'Semiduplex': ['Semidouble', 3],
  'Simplex': ['Simple', 4],
  'Feria': ['Feria', 10],
  'Feria major': ['Greater Feria', 10],
  'Feria privilegiata': ['Privileged Feria', 10],
  'Semiduplex Dominica I. classis': ['Sunday of the I Class', 1],
  'Semiduplex Dominica II. classis': ['Sunday of the II Class', 2],
  'Semiduplex Dominica minor': ['Lesser Sunday', 2],
  'Semiduplex Dominica anticipata': ['Anticipated Sunday', 2],
  'Semiduplex II. ordinis': ['Semidouble of the II Order', 3],
  'Semiduplex III. ordinis': ['Semidouble of the III Order', 3],
  'Duplex majus II. ordinis': ['Greater Double of the II Order', 3],
  'Duplex majus III. ordinis': ['Greater Double of the III Order', 3],
  'Semiduplex Vigilia I. classis': ['Vigil of the I Class', 3],
  'Semiduplex Vigilia II. classis': ['Vigil of the II Class', 3]
};
var unknown = {};
var englishRank = function(r, duplex) {
  if(!(r in RANKS)) unknown['rank: ' + r] = true;
  var rank = {rank: RANKS[r] ? RANKS[r][0] : r, duplex: duplex, cls: RANKS[r] ? RANKS[r][1] : 3};
  if(/Sunday/.test(rank.rank)) rank.sunday = 1;
  return rank;
};

// A feast of Our Lady (calendar.js's feastOfOurLady), but not the Seven Sorrows, as in calendar.js, nor a
// saint's ("St. Joseph, Spouse of the Blessed Virgin Mary")
var ourLady = function(title) {
  return /Blessed Virgin|Our Lady/.test(title) && !/^(St\.|Ss\.|Seven)|St\. Joseph/.test(title) && !/Seven Sorrows/.test(title);
};

// DO's English files keep the Latin titles of most of the temporal cycle, so these give them in English, in
// calendar.js's style ("2. Sunday after Epiphany").
var ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI',
  'XVII', 'XVIII', 'XIX', 'XX', 'XXI', 'XXII', 'XXIII', 'XXIV'];
var number = function(roman) { return ROMAN.indexOf(roman); };
var nth = function(n) {
  var s = ['th', 'st', 'nd', 'rd'], v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};
var WEEKDAY = {Secunda: 'Monday', II: 'Monday', Tertia: 'Tuesday', III: 'Tuesday', Quarta: 'Wednesday', IV: 'Wednesday',
  Quinta: 'Thursday', V: 'Thursday', Sexta: 'Friday', VI: 'Friday'};
var DAY = {II: 'Second', III: 'Third', IV: 'Fourth', V: 'Fifth', VI: 'Sixth', VII: 'Seventh'};
var OCTAVE = {'paschæ': 'Easter', 'pentecostes': 'Pentecost', 'ascensionis': 'the Ascension', 'corporis christi': 'Corpus Christi',
  'sanctissimi corporis christi': 'Corpus Christi', 'ssmi cordis jesu': 'the Sacred Heart',
  'ssmi cordis d.n.j.c': 'the Sacred Heart', 'epiphaniæ': 'the Epiphany', 'nativitatis': 'the Nativity', 's. joseph': 'St. Joseph'};
// a Sunday's season, after "Dominica N"
var SUNDAYS = {'adventus': 'of Advent', 'post epiphaniam': 'after Epiphany', 'in quadragesima': 'of Lent',
  'quadragesimæ': 'of Lent', 'post pascha': 'after Easter', 'post pentecosten': 'after Pentecost'};
// what follows "Feria N", "Sabbato" or "Die N", with the day it names
var WEEKS = [
  [/^infra Hebdomadam (\w+) (Adventus|post Epiphaniam|in Quadragesima|Quadragesimæ)$/i, function(m, day) {
    return day + ' of the ' + nth(number(m[1])) + ' week ' + SUNDAYS[m[2].toLowerCase()];
  }],
  [/^infra Hebdomadam (\w+) post Octavam (Paschæ|Pentecostes)$/i, function(m, day) {
    return day + ' of the ' + nth(number(m[1])) + ' week after the Octave of ' + OCTAVE[m[2].toLowerCase()];
  }],
  [/^infra Hebdomadam (Septuagesimæ|Sexagesimæ|Quinquagesimæ)$/, function(m, day) {
    return day + ' after ' + m[1].replace(/æ$/, 'a') + ' Sunday';
  }],
  [/^infra Hebdomadam Passionis$/, function(m, day) { return day + ' in Passion Week'; }],
  [/^Majoris Hebdomadæ$/, function(m, day) { return day + ' in Holy Week'; }],
  [/^(?:post Cineres|Cinerum)$/, function(m, day) { return day === 'Wednesday' ? 'Ash Wednesday' : day + ' after Ash Wednesday'; }],
  [/^Quattuor Temporum (in Adventu|Quadragesimæ|Pentecostes|Septembris)$/, function(m, day) {
    return 'Ember ' + day + ' ' + {'in Adventu': 'of Advent', 'Quadragesimæ': 'of Lent', 'Pentecostes': 'of Pentecost',
      'Septembris': 'of September'}[m[1]];
  }],
  [/^in Rogationibus$/, function(m, day) { return 'Rogation ' + day; }],
  [/^infra Octavam (.+)$/i, function(m, day) {
    var octave = OCTAVE[m[1].toLowerCase()];
    return octave && day + ' within the Octave of ' + octave;
  }],
  [/^post Octavam Ascensionis$/, function(m, day) { return day + ' after the Octave of the Ascension'; }],
  [/^in Octava (.+)$/i, function(m, day) {
    var octave = OCTAVE[m[1].toLowerCase()];
    return octave && 'The Octave Day of ' + octave;
  }]
];
var EXACT = {
  'Dominica in Septuagesima': 'Septuagesima Sunday',
  'Dominica in Sexagesima': 'Sexagesima Sunday',
  'Dominica in Quinquagesima': 'Quinquagesima Sunday',
  'Dominica de Passione': 'Passion Sunday',
  'Dominica in Palmis': 'Palm Sunday',
  'Dominica Resurrectionis': 'Easter Sunday',
  'Dominica in Albis in Octava Paschæ': 'Low Sunday',
  'Dominica Pentecostes': 'Pentecost Sunday',
  'Dominica Sanctissimæ Trinitatis': 'Trinity Sunday',
  'Feria Quinta in Cœna Domini': 'Maundy Thursday',
  'Feria Quinta in Cena Domini': 'Maundy Thursday',
  'Feria Sexta in Parasceve': 'Good Friday',
  'Sabbato Sancto': 'Holy Saturday',
  'Sanctæ Mariæ Sabbato': 'Saturday of Our Lady',
  'In Ascensione Domini': 'The Ascension of Our Lord',
  'Festum Sanctissimi Corporis Christi': 'Corpus Christi',
  'Sacratissimi Cordis Domini Nostri Jesu Christi': 'The Most Sacred Heart of Jesus',
  'Sanctæ Familiæ Jesu Mariæ Joseph': 'The Holy Family of Jesus, Mary, Joseph',
  'Septem Dolorum Beatæ Mariæ Virginis': 'The Seven Sorrows of the Blessed Virgin Mary',
  'In Conceptione Immaculata Beatæ Mariæ Virginis': 'The Immaculate Conception of the Blessed Virgin Mary',
  'Maternitatis Beatæ Mariæ Virginis': 'The Maternity of the Blessed Virgin Mary',
  'In Dedicatione Basilicarum Ss. Apostolorum Petri et Pauli': 'The Dedication of the Basilicas of Ss. Peter and Paul, Apostles',
  'Patrocinii St. Joseph Confessoris Sponsi B.M.V. Confessoris': 'The Solemnity of St. Joseph, Spouse of the Blessed Virgin Mary, Confessor'
};
var temporaTitle = function(latin) {
  if(latin in EXACT) return EXACT[latin];
  var m = /^Dominica (\w+)\.?( et Ultima)? (.+?)(?:,? infra Octavam (.+))?$/i.exec(latin);
  if(m && number(m[1]) > 0 && SUNDAYS[m[3].toLowerCase()] && (!m[4] || OCTAVE[m[4].toLowerCase()])) {
    return number(m[1]) + '.' + (m[2] ? ' and Last' : '') + ' Sunday ' + SUNDAYS[m[3].toLowerCase()] +
        (m[4] ? ', within the Octave of ' + OCTAVE[m[4].toLowerCase()] : '');
  }
  m = /^(?:Die Octav(?:æ|ae|a)|Octava) (.+)$/i.exec(latin);
  if(m && OCTAVE[m[1].toLowerCase()]) return 'The Octave Day of ' + OCTAVE[m[1].toLowerCase()];
  m = /^Dominica infra Octavam (.+)$/i.exec(latin);
  if(m && OCTAVE[m[1].toLowerCase()]) return 'Sunday within the Octave of ' + OCTAVE[m[1].toLowerCase()];
  m = /^(?:Feria (\w+)|(Sabbato)|Die (\w+)) (.+)$/.exec(latin);
  var day = m && (m[1] ? WEEKDAY[m[1][0].toUpperCase() + m[1].slice(1)] : m[2] ? 'Saturday' : DAY[m[3]] && DAY[m[3]] + ' Day');
  if(day) {
    for(var i = 0; i < WEEKS.length; ++i) {
      var w = WEEKS[i][0].exec(m[4]);
      var t = w && WEEKS[i][1](w, day);
      if(t) return t;
    }
  }
};
// The title from these, else from DO's English file where it isn't the Latin's.
var englishTitle = function(latin, en) {
  var clean = function(s) { return s.replace(/æ/g, 'ae').replace(/œ/g, 'oe').toLowerCase(); };
  var t = temporaTitle(latin) || (en && temporaTitle(en)) || (en && clean(en) !== clean(latin) && en);
  // "S. Agnes", as some of DO's English files have it
  if(t) return t.replace(/\bS\. (?=[A-Z])/g, 'St. ');
  unknown['title: ' + latin] = true;
  return latin;
};

// Compline's psalms (DO's Psalmi minor) for each day of the week, the app's psalms/<day>/
var PSALMS = ['4;90;133', '6;7(2-10);7(11-18)', '11;12;15', '33(2-11);33(12-23);60', '69;70(1-12);70(13-24)',
  '76(2-13);76(14-21);85', '87;102(1-12);102(13-22)'];

// The hymn's tone, Te lucis: DO's GABC file for it (compline-office.pl, from Latin-gabc's [Hymnus Completorium]),
// as the te-lucis/ file with its melody.  DO's Paschal tone (in_tempore_paschali--, with no source) isn't the
// app's (the Liber Usualis', in its 1932 edition too), which is kept.
var MELODIES = {
  'in_fer_et_fest_simpl--solesmes': 'Ferial', 'in_dominicis_per_annum--solesmes_1961.1': 'Ordinary',
  'in_major._festis_per_annum--solesmes': 'Solemn', 'in_adventu—solesmes_1961.1': 'Advent',
  'in_quadragesima--solesmes': 'Lent', 'passiontide--solesmes_1961.1': 'Passiontide',
  'in_nativ._domini--solesmes': 'Christmas', 'in_epiphania--solesmes': 'Epiphany', 'in_tempore_paschali--': 'Easter',
  'in_tempore_ascensionis--': 'Ascension', 'in_transfiguratione--': 'Ascension', 'in_pentecoste--solesmes': 'Pentecost',
  'in_festo_d._n._j._c._regis--solesmes': 'Pentecost', 'in_sacratis._cord._jesu--solesmes': 'Sacred-Heart',
  'in_festis_et_oct._b._m._v.--solesmes': 'Our-Lady', 'septem_dolorum--': 'Passiontide'
};
// Its doxology: DO's name for it (hymni.pl's doxology, or Special:<file> for the office's own), as the te-lucis/
// file it's sung with.  '' is the hymn's own, Praesta Pater.
var DOXOLOGIES = {
  '': 'Ferial', Nat: 'Christmas', Corp: 'Christmas', Epi: 'Epiphany', Pasch: 'Easter', Asc: 'Ascension',
  Pent: 'Pentecost', Heart: 'Sacred-Heart', 'Special:Sancti/08-06.txt': 'Transfiguration',
  'Special:Sancti/10-DU.txt': 'Christ-the-King', 'Special:Sancti/11-01.txt': 'Christ-the-King',
  'Special:Tempora/Epi1-0.txt': 'Holy-Family', 'Special:Tempora/Epi1-0g.txt': 'Holy-Family',
  'Special:Sancti/09-15.txt': 'Seven-Sorrows', 'Special:Tempora/Quad5-5.txt': 'Seven-Sorrows'
};
// Each te-lucis/ file's melody and doxology, as above.  <Melody>-<Doxology> is a melody with another's doxology,
// which only Divino Afflatu has (Our-Lady-Seven-Sorrows is Our Lady's melody with the Seven Sorrows' own doxology;
// Seven-Dolors is 1960's tone for the feast).
var HYMNS = {
  Ferial: ['Ferial', 'Ferial'], Ordinary: ['Ordinary', 'Ferial'], Solemn: ['Solemn', 'Ferial'],
  Advent: ['Advent', 'Ferial'], Lent: ['Lent', 'Ferial'], Passiontide: ['Passiontide', 'Ferial'],
  Christmas: ['Christmas', 'Christmas'], Epiphany: ['Epiphany', 'Epiphany'], 'Holy-Family': ['Epiphany', 'Holy-Family'],
  Easter: ['Easter', 'Easter'], Ascension: ['Ascension', 'Ascension'], Transfiguration: ['Ascension', 'Transfiguration'],
  Pentecost: ['Pentecost', 'Pentecost'], 'Christ-the-King': ['Pentecost', 'Christ-the-King'],
  'Sacred-Heart': ['Sacred-Heart', 'Sacred-Heart'], 'Our-Lady': ['Our-Lady', 'Christmas'],
  'Seven-Dolors': ['Passiontide', 'Christmas'],
  'Ordinary-Christmas': ['Ordinary', 'Christmas'], 'Advent-Christmas': ['Advent', 'Christmas'],
  'Solemn-Christmas': ['Solemn', 'Christmas'], 'Lent-Christmas': ['Lent', 'Christmas'],
  'Easter-Christmas': ['Easter', 'Christmas'], 'Sacred-Heart-Christmas': ['Sacred-Heart', 'Christmas'],
  'Christmas-Sacred-Heart': ['Christmas', 'Sacred-Heart'], 'Ascension-Easter': ['Ascension', 'Easter'],
  'Our-Lady-Ferial': ['Our-Lady', 'Ferial'], 'Sacred-Heart-Ferial': ['Sacred-Heart', 'Ferial'],
  'Christmas-Ferial': ['Christmas', 'Ferial'], 'Our-Lady-Seven-Sorrows': ['Our-Lady', 'Seven-Sorrows']
};
var hymnFile = function(tone, doxology) {
  var melody = MELODIES[tone], dox = DOXOLOGIES[doxology];
  if(!melody) unknown['tone: ' + tone] = true;
  if(dox === undefined) unknown['doxology: ' + doxology] = true;
  var name = Object.keys(HYMNS).filter(function(h) { return HYMNS[h][0] === melody && HYMNS[h][1] === dox; })[0];
  if(!name && melody) unknown['te-lucis/ file: ' + melody + ' with the doxology of ' + dox] = true;
  return name || melody || 'Ferial';
};

var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

function finish() {
  console.log();
  var offices = [], officeIndex = {}, ranks = [], rankIndex = {}, hymns = [], hymnIndex = {};
  var indexOf = function(list, index, item) {
    var id = JSON.stringify(item);
    if(!(id in index)) {
      index[id] = list.length;
      list.push(item);
    }
    return index[id];
  };
  var table = {};
  kinds.forEach(function(kind) {
    var codes = '';
    output[kind].split('\n').filter(Boolean).forEach(function(line) {
      var c = line.split('\t');
      // a --raw file from before compline-office.pl printed the preces and the hymn
      if(c.length < 13) throw new Error('Only ' + c.length + ' columns for ' + c[0] + ': run DO again');
      var mdy = c[0].split('-');
      var weekday = new Date(+mdy[2], mdy[0] - 1, +mdy[1]).getDay();
      var key = c[1].replace(/\.txt$/, ''), rank = c[4], duplex = +c[6], vespera = +c[7], psalms = PSALMS.indexOf(c[8]);
      var office = {key: key, title: englishTitle(c[2], c[3])};
      if(ourLady(office.title)) office.ol = 1;
      // Sunday's psalms on another day, as on the doubles of the I and II class
      if(psalms === 0 && weekday) office.psalms = 0;
      else if(psalms !== weekday) unknown['psalms: ' + c[8] + ' on ' + c[0] + ' (' + key + ')'] = true;
      var r = indexOf(ranks, rankIndex, englishRank(rank, duplex));
      // the office and the preces, DO's 0, 1 or 2
      var o = indexOf(offices, officeIndex, office) * 3 + +c[10];
      codes += ALPHABET[o >> 6] + ALPHABET[o & 63] + ALPHABET[r * 2 + (vespera === 1 ? 1 : 0)] +
          ALPHABET[indexOf(hymns, hymnIndex, hymnFile(c[11], c[12]))];
    });
    table[kind] = codes;
  });
  if(offices.length * 3 > 64 * 64 || ranks.length > 32 || hymns.length > 64) {
    throw new Error(offices.length + ' offices, ' + ranks.length + ' ranks and ' + hymns.length + ' hymns don\'t fit');
  }
  Object.keys(unknown).sort().forEach(function(u) { console.warn('Not translated: ' + u); });
  // each day's hymn has to be one of te-lucis/ and of index.html's menu (compline.js's setDate)
  var html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  hymns.forEach(function(h) {
    if(!fs.existsSync(path.join(root, 'te-lucis', h + '.gabc')) || html.indexOf("id='te-lucis-" + h + "'") < 0) {
      unknown['te-lucis/ file: ' + h + ' (or its menu item)'] = true;
    }
  });
  var hymnless = Object.keys(unknown).filter(function(u) { return /^(tone|doxology|te-lucis\/ file): /.test(u); });
  if(hymnless.length) throw new Error('No te-lucis/ file for some days: ' + hymnless.join('; '));
  var file = path.join(root, 'js/calendar-da.js');
  var header = [
    '// The calendar under the rubrics of Divino Afflatu, from Divinum Officium',
    '// (https://github.com/DivinumOfficium/divinum-officium) at ' + doCommit.slice(0, 7) + ', its "Divino Afflatu - 1954".',
    '// Copyright (c) 2026 Divinum Officium, MIT license (js/i18n/LICENSE-divinum-officium.txt).',
    '//',
    '// Generated by tools/do-import/da-calendar/build.js (DIVINO_AFFLATU_PLAN.md, Phase 2): fix it or DO, not this',
    '// file.  For each kind of year (its Easter as MMDD, with L for a leap year), years has four characters of',
    '// ALPHABET a day, from 1 January.  The first two are three times the index in offices of the office that',
    '// Compline follows (DO\'s file as key, its title, ol for a feast of Our Lady, and psalms: 0 if Sunday\'s psalms',
    '// are said on another day), plus the preces after the Nunc dimittis (0 none, 1 the Dominicales, 2 the',
    '// Dominicales said kneeling).  The third is twice the index in ranks (duplex: 1 for a simple or a feria, 2 a',
    '// semidouble, 3 a double; cls, the class of 1960 that calendar.js takes it for; sunday for a Sunday\'s), plus 1',
    '// if Compline follows the office\'s First Vespers.  The fourth is the index in hymns of the hymn\'s tone, its',
    '// te-lucis/ file.'
  ];
  var json = '{\n"ALPHABET": ' + JSON.stringify(ALPHABET) +
      ',\n"hymns": ' + JSON.stringify(hymns) +
      ',\n"ranks": [\n' + ranks.map(function(r) { return JSON.stringify(r); }).join(',\n') +
      '\n],\n"offices": [\n' + offices.map(function(o) { return JSON.stringify(o); }).join(',\n') +
      '\n],\n"years": {\n' + kinds.map(function(k) { return JSON.stringify(k) + ': ' + JSON.stringify(table[k]); }).join(',\n') +
      '\n}\n}';
  fs.writeFileSync(file, header.join('\n') + '\ndefine(' + json + ');\n');
  console.log('Wrote ' + path.relative(root, file) + ': ' + offices.length + ' offices, ' + ranks.length + ' ranks, ' +
      hymns.length + ' hymns, ' + kinds.length + ' kinds of year, ' + Math.round(fs.statSync(file).size / 1024) + ' KB');
}

console.log('Running DO over ' + kinds.length + ' years, ' + parallel + ' at a time');
start();
