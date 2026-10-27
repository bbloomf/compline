// Helpers the importer's parts share: reading DO's files, and comparing texts.
'use strict';
var fs = require('fs');
var path = require('path');

// A DO file of one language, e.g. read(doDir, 'English', 'Psalterium/Psalmorum/Psalm4.txt'),
// or null if the language doesn't have it.  Each file is read once.
var cache = {};
exports.read = function(doDir, folder, file) {
  var p = path.join(doDir, 'web/www/horas', folder, file);
  if(!(p in cache)) {
    cache[p] = fs.existsSync(p) ? fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n') : null;
  }
  return cache[p];
};

// The [Section]s of a DO file, as {name: [line, …]}, without blank lines at either end.  A
// section for one rubric, "[Requiem] (rubrica cisterciensis)", is named with its condition.
exports.sections = function(text) {
  var result = {};
  var current = null;
  (text || '').split('\n').forEach(function(line) {
    var match = line.match(/^\[([^\]]+)\]\s*(.*?)\s*$/);
    if(match) {
      current = result[match[1] + (match[2] ? ' ' + match[2] : '')] = [];
    } else if(current) {
      current.push(line.replace(/\s+$/, ''));
    }
  });
  Object.keys(result).forEach(function(name) {
    var lines = result[name];
    while(lines.length && !lines[0]) lines.shift();
    while(lines.length && !lines[lines.length - 1]) lines.pop();
  });
  return result;
};

// Latin (or any text) reduced to lower-case letters and single spaces, for comparing: no
// accents, ligatures written out, and no punctuation or * † ‡ + markers.
exports.normalize = function(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/æ/g, 'ae').replace(/œ/g, 'oe')
    .replace(/[^a-z]+/g, ' ').trim();
};

// How alike two strings are, from 0 to 1: 1 - (Levenshtein distance / the longer length).
exports.similarity = function(a, b) {
  if(a === b) return 1;
  var n = a.length, m = b.length;
  if(!n || !m) return 0;
  var prev = new Array(m + 1), cur = new Array(m + 1);
  for(var j = 0; j <= m; j++) prev[j] = j;
  for(var i = 1; i <= n; i++) {
    cur[0] = i;
    for(j = 1; j <= m; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    var t = prev; prev = cur; cur = t;
  }
  return 1 - prev[m] / Math.max(n, m);
};

// The words that differ between two normalized texts, for the report: "-old +new".
exports.wordDiff = function(a, b) {
  var x = a.split(' '), y = b.split(' ');
  // longest common subsequence of words
  var table = [];
  var i, j;
  for(i = 0; i <= x.length; i++) {
    table.push(new Array(y.length + 1).fill(0));
  }
  for(i = x.length - 1; i >= 0; i--) {
    for(j = y.length - 1; j >= 0; j--) {
      table[i][j] = x[i] === y[j] ? table[i + 1][j + 1] + 1 : Math.max(table[i + 1][j], table[i][j + 1]);
    }
  }
  var out = [];
  i = 0; j = 0;
  while(i < x.length || j < y.length) {
    if(i < x.length && j < y.length && x[i] === y[j]) { i++; j++; }
    else if(j >= y.length || (i < x.length && table[i + 1][j] >= table[i][j + 1])) out.push('-' + x[i++]);
    else out.push('+' + y[j++]);
  }
  return out.join(' ');
};
