// The app's own Latin psalms, verse by verse, from every file that has them: the pointed HTML
// (psalms/<day>/psalm-verses*.html, canticle-psalm*.html), which has verse 2 on (or verse 1 on,
// where no verse is chanted), and the GABC (psalm*.gabc, canticle-psalm*.gabc), which has the
// chanted verse 1 or, fully notated, every verse.
'use strict';
var fs = require('fs');
var path = require('path');

// "Psalm 7. I." → '7.I'; the Nunc dimittis is 'nunc-dimittis' (as psalmSection in js/text-mode.js,
// where a psalm-section header overrides it).
var psalmSection = exports.psalmSection = function(label) {
  if(/Simeon|Nunc dimittis/i.test(label)) return 'nunc-dimittis';
  var match = label.match(/Psalm\s+(\d+)(?:\.\s*([IV]+))?/);
  return match && (match[2] ? match[1] + '.' + match[2] : match[1]);
};

var decode = function(html) {
  return html.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
};

// A pointed verse's text: no tags, and single spaces.  The * and † stay.
var htmlText = function(html) {
  return decode(html.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
};

// A GABC lyric line's text: no neumes, tags or verse number.
var gabcText = function(line) {
  return line
    .replace(/<sp>'?(?:ae|æ)<\/sp>/g, 'ǽ').replace(/<sp>'?(?:oe|œ)<\/sp>/g, 'œ́')
    .replace(/\([^)]*\)/g, '').replace(/<[^>]+>/g, '').replace(/[{}]/g, '')
    .replace(/^\s*\d+\.\s*/, '').replace(/\s+/g, ' ').trim();
};

var files = function(root, dir, pattern) {
  return fs.readdirSync(path.join(root, dir)).filter(function(f) { return pattern.test(f); })
    .map(function(f) { return path.join(dir, f); });
};

// {section: {verse: [{file, text}, …]}, …}, and the sections in the order the app has them.
exports.read = function(root) {
  var sections = {};
  var order = [];
  var add = function(section, n, file, text) {
    if(!sections[section]) {
      sections[section] = {};
      order.push(section);
    }
    (sections[section][n] = sections[section][n] || []).push({file: file, text: text});
  };
  var days = fs.readdirSync(path.join(root, 'psalms')).filter(function(d) {
    return fs.statSync(path.join(root, 'psalms', d)).isDirectory();
  }).sort();
  var html = [], gabc = [];
  days.forEach(function(day) {
    var dir = path.join('psalms', day);
    html = html.concat(files(root, dir, /^psalm-verses.*\.html$/));
    gabc = gabc.concat(files(root, dir, /^psalm.*\.gabc$/));
  });
  html = html.concat(files(root, '.', /^canticle-psalm.*\.html$/));
  gabc = gabc.concat(files(root, '.', /^canticle-psalm.*\.gabc$/));

  html.forEach(function(file) {
    var source = fs.readFileSync(path.join(root, file), 'utf8');
    var divs = /<div class="verses" data-psalm='([^']+)'>([\s\S]*?)<\/div>/g, div;
    while((div = divs.exec(source))) {
      var ps = /<p>([\s\S]*?)<\/p>/g, p;
      while((p = ps.exec(div[2]))) {
        var number = p[1].match(/<span class="verse-number">(\d+)\.&nbsp;<\/span>/);
        if(!number) throw new Error(file + ': a verse with no number in ' + div[1]);
        add(div[1], parseInt(number[1]), file, htmlText(p[1].replace(number[0], '')));
      }
    }
  });
  gabc.forEach(function(file) {
    var section = null;
    fs.readFileSync(path.join(root, file), 'utf8').split(/\r?\n/).forEach(function(line) {
      var notes = line.match(/^user-notes:\s*(.*);/);
      if(notes) section = psalmSection(notes[1]);
      var named = line.match(/^psalm-section:\s*(.*);/);
      if(named) section = named[1];
      var verse = line.match(/^(?:\(c\d\))?\s*(\d+)\.\s/);
      // The intonation files also show how verses 2 and 3 start ("Quia...", "Quod parásti * etc.").
      if(verse && section && !/\.\.\.|\betc\./.test(line)) add(section, parseInt(verse[1]), file, gabcText(line));
    });
  });
  return {sections: sections, order: order};
};
