// The rubrics in the translation's language (TRANSLATIONS_PLAN.md §4d), from
// extra/<lang>/rubrics.txt, written by hand: DO has only a few of them, in other words
// (Psalterium/Common/Rubricae.txt), and none of the app's directions to the Officiant, Lector and
// Cantor or its seasons' dates.
//
// Each [key] is a data-rubric of index.html, and its lines are the text: {…} is Latin, kept as
// it is (lang=la), and each line after the first starts a new line, as <br/> does in the English.
// [note:<English>] translates the start of a chant's heading, its user-notes or commentary
// ("Psalm" in "Psalm 7. I."), and [hymn-unsung] is chant-element.js's note on a hymn that can't be
// sung in the language in that season.
'use strict';
var fs = require('fs');
var path = require('path');
var text = require('./text');

// The keys every language has: index.html's, in order, then the headings' and the note's.
var NOTES = ['note:Psalm', 'note:Canticle of Simeon', 'note:Short Lesson', 'note:Luke', 'note:1. Peter', 'hymn-unsung'];
var keys = function(root) {
  var html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  var result = [];
  html.replace(/data-rubric='([^']+)'/g, function(match, key) {
    if(result.indexOf(key) < 0) result.push(key);
    return match;
  });
  return result.concat(NOTES);
};

// A language's rubrics, {rubrics, report: {missing, unknown, errors}}, or null if it has no
// extra/<lang>/rubrics.txt.
exports.build = function(root, code) {
  var file = path.join(__dirname, 'extra', code, 'rubrics.txt');
  if(!fs.existsSync(file)) return null;
  var sections = text.sections(fs.readFileSync(file, 'utf8').replace(/^﻿/, '').replace(/\r\n?/g, '\n'));
  var wanted = keys(root);
  var report = {missing: [], unknown: [], errors: []};
  var rubrics = {};
  wanted.forEach(function(key) {
    if(!(key in sections)) {
      report.missing.push(key);
      return;
    }
    var value = sections[key].filter(function(line) { return !/^\s*#/.test(line); })
      .map(function(line) { return line.trim(); }).filter(Boolean).join('\n');
    if(!value) report.errors.push(key + ': empty');
    if(/\{[^}]*(\{|$)|^[^{]*\}|\}[^{]*\}/.test(value)) report.errors.push(key + ': unbalanced { }');
    if(/[<>]/.test(value)) report.errors.push(key + ': < or >, which would be shown as they are');
    rubrics[key] = value;
  });
  Object.keys(sections).forEach(function(key) {
    if(wanted.indexOf(key) < 0) report.unknown.push(key);
  });
  return {rubrics: rubrics, report: report};
};
