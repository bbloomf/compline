#!/usr/bin/env node
// Generates the translations in js/i18n/<lang>.js from Divinum Officium (TRANSLATIONS_PLAN.md §3).
//
//   node tools/do-import/import.js [--do <dir>] [--verbose] [lang …]
//
// It always prints the report for every language below.  It writes only the languages named,
// for example `node tools/do-import/import.js en`, so a language goes into js/i18n/ only once
// someone has checked it.  The DO checkout is the one fetch-do.sh makes: by default
// divinum-officium/ next to this repository (or, in a git worktree, next to the main checkout).
//
// It generates the psalter (Phase 2, psalter.js) and the texts (Phase 3, texts.js, from
// manifest.json), then respells the words in extra/<lang>/spelling.txt (§7f), and puts the hymn
// together from DO's and extra/<lang>/hymn-*.txt (Phase 7, hymn.js), and the rubrics from
// extra/<lang>/rubrics.txt (Phase 8, rubrics.js).  Any other part of a module already in the file
// is kept.
'use strict';
var fs = require('fs');
var path = require('path');
var childProcess = require('child_process');
var psalter = require('./psalter');
var texts = require('./texts');
var hymns = require('./hymn');
var rubrics = require('./rubrics');

// Every language the plan names (§2).  keys renames a translation's verse keys where DO has a
// typo; groups pairs runs of verses as a whole where a translation divides them differently;
// fallback is the folder whose prayers a language borrows where it has none, as DO does; texts
// false leaves out the texts, as Latin-Bea's are the Vulgate's (§2b).  align pairs the psalms'
// lines by content in groups, as Latin-Bea's keys are its own (psalter.js); latin leaves out
// (null) what is the Latin's word for word, and the module's meta says latin: true, so the
// display shows the Latin there as the text, not as a missing translation (§2b).  hymn is the kind
// of translation DO's Te lucis is, 'metrical' or 'literal' (§4b, hymn.js).
var LANGUAGES = [
  {code: 'en', folder: 'English', name: 'English', hymn: 'metrical'},
  {code: 'fr', folder: 'Francais', name: 'Français', hymn: 'literal'},
  {code: 'es', folder: 'Espanol', name: 'Español', groups: [['102:17', '102:18']], hymn: 'metrical'},
  {code: 'it', folder: 'Italiano', name: 'Italiano', keys: {'11:6': '11:6b'}, hymn: 'literal'},
  {code: 'pt', folder: 'Portugues', name: 'Português', hymn: 'literal'},
  {code: 'pl', folder: 'Polski', name: 'Polski', keys: {'11:6': '11:6b'}, hymn: 'literal'},
  {code: 'la-bea', folder: 'Latin-Bea', name: 'Latin (Pius XII psalter)', fallback: 'Latin', texts: false,
    align: true, latin: true, htmlLang: 'la-x-bea'},
  // not offered yet (§2)
  {code: 'de', folder: 'Deutsch', name: 'Deutsch', hymn: 'metrical'},
  {code: 'nl', folder: 'Nederlands', name: 'Nederlands', hymn: 'metrical'},
  {code: 'hu', folder: 'Magyar', name: 'Magyar', hymn: 'metrical'},
  {code: 'da', folder: 'Dansk', name: 'Dansk', hymn: 'metrical'},
  {code: 'vi', folder: 'Vietnamice', name: 'Tiếng Việt', hymn: 'metrical'}
];

var root = path.resolve(__dirname, '../..');
var here = __dirname;

var args = process.argv.slice(2);
var options = {verbose: false, doDir: null, write: []};
var usage = function() {
  console.error('Usage: node tools/do-import/import.js [--do <dir>] [--verbose] [lang …]');
  process.exit(1);
};
for(var i = 0; i < args.length; i++) {
  if(args[i] === '--do') {
    if(!args[i + 1]) usage();
    options.doDir = path.resolve(args[++i]);
  } else if(args[i] === '--verbose' || args[i] === '-v') options.verbose = true;
  else if(/^-/.test(args[i])) usage();
  else options.write.push(args[i]);
}
options.write.forEach(function(code) {
  if(!LANGUAGES.some(function(l) { return l.code === code; })) {
    console.error('No language "' + code + '". The languages: ' + LANGUAGES.map(function(l) { return l.code; }).join(' '));
    process.exit(1);
  }
});

// The DO checkout: --do, else divinum-officium/ next to this checkout or the main one.
var findDO = function() {
  if(options.doDir) return options.doDir;
  var candidates = [path.join(root, '../divinum-officium')];
  try {
    var common = childProcess.execSync('git rev-parse --path-format=absolute --git-common-dir', {cwd: root}).toString().trim();
    candidates.push(path.join(path.dirname(common), '../divinum-officium'));
  } catch(e) {}
  return candidates.filter(function(dir) { return fs.existsSync(path.join(dir, 'web/www/horas')); })[0];
};
var doDir = findDO();
if(!doDir) {
  console.error('No DO checkout: run tools/do-import/fetch-do.sh, or give its directory with --do.');
  process.exit(1);
}
var doCommit = fs.readFileSync(path.join(here, 'DO_COMMIT'), 'utf8').trim();
try {
  var head = childProcess.execSync('git rev-parse HEAD', {cwd: doDir}).toString().trim();
  if(head !== doCommit) {
    console.error('The DO checkout in ' + doDir + ' is at ' + head + ', not DO_COMMIT ' + doCommit + '. Run fetch-do.sh.');
    process.exit(1);
  }
} catch(e) {
  console.warn('Warning: can\'t tell which commit ' + doDir + ' is at.');
}

// The report.
var report = psalter.build(doDir, root, LANGUAGES);
var textReport = texts.build(doDir, root, LANGUAGES);

// Each language's extra/<lang>/spelling.txt (texts.spelling), applied to its psalter and texts.
var spellings = {};
var spellingFix = {};
LANGUAGES.forEach(function(lang) {
  var spelling = texts.spelling(lang.code);
  if(!spelling) return;
  [report.languages[lang.code].psalter, textReport.languages[lang.code].texts].forEach(function(sections) {
    Object.keys(sections || {}).forEach(function(key) {
      sections[key] = sections[key].map(spelling.fix);
    });
  });
  spellings[lang.code] = spelling.words;
  spellingFix[lang.code] = spelling.fix;
});

// The hymn (hymn.js): DO's Te lucis, as texts.js built it for each tone and respelled, with
// extra/<lang>/hymn-*.txt.  It takes the place of the te-lucis/ texts in the module.
var tones = hymns.tones(root);
var hymnReport = {};
LANGUAGES.forEach(function(lang) {
  var t = textReport.languages[lang.code].texts;
  if(!t) return;
  var doHymn = {};
  Object.keys(tones).forEach(function(tone) {
    var key = 'te-lucis/' + tone + '.gabc';
    if(t[key]) doHymn[tone] = t[key];
  });
  hymnReport[lang.code] = hymns.build(lang, doHymn, tones, spellingFix[lang.code]);
});

// The rubrics (rubrics.js), for the languages that have them.
var rubricReport = {};
LANGUAGES.forEach(function(lang) {
  var r = rubrics.build(root, lang.code);
  if(r) rubricReport[lang.code] = r;
});

var list = function(title, lines) {
  if(!lines.length) return;
  console.log('  ' + title + ':');
  var shown = options.verbose ? lines : lines.slice(0, 12);
  shown.forEach(function(line) { console.log('    ' + line); });
  if(shown.length < lines.length) console.log('    … and ' + (lines.length - shown.length) + ' more (--verbose lists them)');
};
console.log('Divinum Officium ' + doCommit.slice(0, 7) + ' in ' + doDir + '\n');
console.log('The app\'s Latin psalms against DO\'s Latin (!! = below ' + psalter.THRESHOLD + '):');
var flagged = report.latin.filter(function(line) { return /^!!|verses \+ /.test(line); });
var latinLines = options.verbose ? report.latin : flagged;
if(!latinLines.length) console.log('  every verse matches' + (report.latin.length ? ' above the threshold (' + report.latin.length + ' small differences; --verbose lists them)' : ''));
latinLines.forEach(function(line) { console.log('  ' + line); });
if(!options.verbose && flagged.length && report.latin.length > flagged.length) {
  console.log('  (and ' + (report.latin.length - flagged.length) + ' small differences; --verbose lists them)');
}
if(report.app.length) {
  console.log('\nThe app\'s own files:');
  report.app.forEach(function(line) { console.log('  ' + line); });
}
console.log('\nPsalter coverage:');
console.log('  language   sections   verses        missing  extra  mediant  flex+  flex-  unsafe');
LANGUAGES.forEach(function(lang) {
  var r = report.languages[lang.code];
  var pad = function(s, n) { s = String(s); return s + new Array(Math.max(0, n - s.length) + 1).join(' '); };
  console.log('  ' + pad(lang.code, 10) + ' ' + pad(r.ok + '/' + r.sections, 10) + ' ' + pad(r.translated + '/' + r.verses, 13) + ' ' +
    pad(r.missing.length, 8) + ' ' + pad(r.extra.length, 6) + ' ' + pad(r.markers.length, 8) + ' ' +
    pad(r.flex.added.length, 6) + ' ' + pad(r.flex.dropped.length, 6) + ' ' + r.unsafe.length);
});
console.log('  (sections: with every verse, by key; mediant: verses whose * doesn\'t match the Latin; flex+: verses\n' +
  '  where the app\'s pointing adds a † that DO hasn\'t; flex-: where DO has a † the app hasn\'t, which goes;\n' +
  '  unsafe: verses with characters GABC can\'t take, §7a)');
LANGUAGES.forEach(function(lang) {
  var r = report.languages[lang.code];
  if(!r.missing.length && !r.extra.length && !r.notes.length && !r.unsafe.length && !r.markers.length && !r.groups.length) return;
  console.log('\n' + lang.code + ' (' + lang.folder + '):');
  list('missing', r.missing);
  list('extra lines', r.extra);
  list('notes', r.notes);
  list('groups, by content (Latin ↔ ' + lang.folder + ')', r.groups);
  if(r.same.length) list('the Latin\'s word for word, so left out (null)', [r.same.join(' ')]);
  list('characters GABC can\'t take', r.unsafe);
  list('mediants', r.markers);
  if(options.verbose) {
    list('flex added by the app\'s pointing', [r.flex.added.join(' ')].filter(Boolean));
    list('flex dropped', [r.flex.dropped.join(' ')].filter(Boolean));
  }
});

console.log('\nThe app\'s Latin texts against DO\'s, unit by unit (!! = below ' + texts.THRESHOLD + '):');
var textFlagged = textReport.latin.filter(function(line) { return /^!!/.test(line); });
(options.verbose ? textReport.latin : textFlagged).forEach(function(line) { console.log('  ' + line); });
if(!textFlagged.length) console.log('  every unit matches');
if(!options.verbose && textReport.latin.length > textFlagged.length) {
  console.log('  (and ' + (textReport.latin.length - textFlagged.length) + ' small differences; --verbose lists them)');
}
if(textReport.app.length) {
  console.log('\nThe app\'s texts and manifest.json:');
  textReport.app.forEach(function(line) { console.log('  ' + line); });
}
console.log('\nText coverage:');
console.log('  language   texts      units        missing  counts  unsafe');
LANGUAGES.forEach(function(lang) {
  var r = textReport.languages[lang.code];
  var pad = function(s, n) { s = String(s); return s + new Array(Math.max(0, n - s.length) + 1).join(' '); };
  if(!r.texts) {
    console.log('  ' + pad(lang.code, 10) + ' none: the Latin\'s (§2b)');
    return;
  }
  console.log('  ' + pad(lang.code, 10) + ' ' + pad(r.ok + '/' + r.keys, 10) + ' ' + pad(r.translated + '/' + r.units, 12) + ' ' +
    pad(r.missing.length, 8) + ' ' + pad(r.counts.length, 7) + ' ' + r.unsafe.length);
});
console.log('  (texts: with every unit; counts: texts whose units don\'t match the Latin\'s paragraphs;\n' +
  '  unsafe: chants with characters GABC can\'t take, §7a)');
LANGUAGES.forEach(function(lang) {
  var r = textReport.languages[lang.code];
  if(!r.missing.length && !r.counts.length && !r.notes.length && !r.unsafe.length) return;
  console.log('\n' + lang.code + ' (' + lang.folder + ') texts:');
  list('missing', r.missing);
  list('unit counts', r.counts);
  list('notes', r.notes);
  list('characters GABC can\'t take', r.unsafe);
});
console.log('\nThe hymn (extra/<lang>/hymn-*.txt; sung: the whole hymn against each of the ' + Object.keys(tones).length + ' tones\' notes, !! = not sung):');
LANGUAGES.forEach(function(lang) {
  var h = hymnReport[lang.code];
  if(!h) return;
  console.log('  ' + lang.code + ': ' + (h.report.kinds.join('; ') || 'none'));
  h.report.errors.forEach(function(line) { console.log('    !! ' + line); });
  var sung = h.report.sung;
  (options.verbose ? sung : sung.filter(function(line) { return /^!!/.test(line); })).forEach(function(line) { console.log('    ' + line); });
  if(!options.verbose && sung.some(function(line) { return !/^!!/.test(line); })) {
    console.log('    (and ' + sung.filter(function(line) { return !/^!!/.test(line); }).length + ' notes; --verbose lists them)');
  }
});
console.log('\nThe rubrics (extra/<lang>/rubrics.txt; the others are in English):');
Object.keys(rubricReport).forEach(function(code) {
  var r = rubricReport[code].report;
  console.log('  ' + code + ': ' + Object.keys(rubricReport[code].rubrics).length + ' rubrics' +
    (r.missing.length ? ', missing ' + r.missing.join(' ') : '') +
    (r.unknown.length ? ', not on the page (remove them?) ' + r.unknown.join(' ') : ''));
  r.errors.forEach(function(line) { console.log('    !! ' + line); });
});
Object.keys(spellings).forEach(function(code) {
  console.log('\n' + code + ' spelling (extra/' + code + '/spelling.txt):');
  console.log('  ' + spellings[code].map(function(w) {
    return w.from + ' → ' + w.to + ' ' + (w.count ? '×' + w.count : '(not found: remove it?)');
  }).join(', '));
});

// Writing the modules.
var quote = function(s) {
  return '\'' + s.replace(/\\/g, '\\\\').replace(/'/g, '\\\'').replace(/\n/g, '\\n') + '\'';
};
var serialize = function(value, indent) {
  indent = indent || '';
  var inner = indent + '  ';
  if(value === null || value === undefined) return 'null';
  if(typeof value === 'string') return quote(value);
  if(typeof value !== 'object') return JSON.stringify(value);
  if(Array.isArray(value)) {
    if(!value.length) return '[]';
    return '[\n' + value.map(function(v) { return inner + serialize(v, inner); }).join(',\n') + '\n' + indent + ']';
  }
  var keys = Object.keys(value);
  if(!keys.length) return '{}';
  var key = function(k) { return /^[a-zA-Z_$][\w$]*$/.test(k) ? k : quote(k); };
  if(keys.every(function(k) { return typeof value[k] !== 'object' || value[k] === null; })) {
    return '{' + keys.map(function(k) { return key(k) + ': ' + serialize(value[k]); }).join(', ') + '}';
  }
  return '{\n' + keys.map(function(k) { return inner + key(k) + ': ' + serialize(value[k], inner); }).join(',\n') + '\n' + indent + '}';
};
// The module as it is now, or {}.
var readModule = function(file) {
  if(!fs.existsSync(file)) return {};
  var result = {};
  new Function('define', fs.readFileSync(file, 'utf8'))(function(m) { result = m; });
  return result;
};

options.write.forEach(function(code) {
  var lang = LANGUAGES.filter(function(l) { return l.code === code; })[0];
  var file = path.join(root, 'js/i18n', code + '.js');
  var old = readModule(file);
  var meta = Object.assign({}, old.meta || {}, {name: lang.name, dir: 'ltr', doCommit: doCommit.slice(0, 7)});
  delete meta.stub;
  if(lang.latin) meta.latin = true;
  if(lang.htmlLang) meta.lang = lang.htmlLang;
  var module = {meta: meta, psalter: report.languages[code].psalter};
  var moduleTexts = textReport.languages[code].texts;
  if(moduleTexts) {
    module.texts = {};
    Object.keys(moduleTexts).forEach(function(key) {
      if(!/^te-lucis\//.test(key)) module.texts[key] = moduleTexts[key];
    });
  }
  if(hymnReport[code] && hymnReport[code].hymn) module.hymn = hymnReport[code].hymn;
  if(rubricReport[code]) module.rubrics = rubricReport[code].rubrics;
  if(rubricReport[code] && rubricReport[code].report.errors.length) {
    console.error('\n' + code + '\'s rubrics have errors (above): not written.');
    process.exitCode = 1;
    return;
  }
  if(hymnReport[code] && hymnReport[code].report.errors.length) {
    console.error('\n' + code + '\'s hymn has errors (above): not written.');
    process.exitCode = 1;
    return;
  }
  Object.keys(old).forEach(function(k) {
    // the hymn and the rubrics are generated, so ones the language no longer has go
    if(!(k in module) && k !== 'hymn' && k !== 'rubrics') module[k] = old[k];
  });
  var header = [
    '// ' + lang.name + ', from Divinum Officium (https://github.com/DivinumOfficium/divinum-officium) at ' + doCommit.slice(0, 7) + ',',
    '// Copyright (c) 2026 Divinum Officium, MIT license (js/i18n/LICENSE-divinum-officium.txt).',
    '//',
    '// Generated by tools/do-import/import.js (TRANSLATIONS_PLAN.md §3): fix the importer, its',
    '// manifest.json, extra/ or DO, not this file.  Each psalter section\'s verses are in the app\'s',
    '// order, with the Gloria Patri and Sicut erat last; \'\' is a verse whose translation is part of',
    '// the verse before.  Each text\'s units are the paragraphs of its chant, or its index.html block',
    '// (§7c).  The hymn, Te lucis, is the first two stanzas and each tone\'s doxology, in each kind of',
    '// translation the language has (§4b; tools/do-import/hymn.js).'
  ];
  if(module.rubrics) {
    header[header.length - 1] += '  The rubrics are the page\'s, in';
    header.push('// the language, written for the app (§4d; tools/do-import/extra/' + code + '/rubrics.txt).');
  }
  fs.writeFileSync(file, header.join('\n') + '\ndefine(' + serialize(module) + ');\n');
  console.log('\nWrote ' + path.relative(root, file));
});
