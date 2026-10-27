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
    // Each score's section from its own header, as psalmSection in js/text-mode.js decides it:
    // psalm-section, else user-notes, else none.
    var header = {}, inBody = false, section = null;
    fs.readFileSync(path.join(root, file), 'utf8').replace(/^﻿/, '').split(/\r?\n/).forEach(function(line) {
      var field = line.match(/^([\w-]+):\s*(.*?);\s*$/);
      if(field) {
        if(inBody) {
          header = {};
          inBody = false;
        }
        header[field[1]] = field[2];
        return;
      }
      if(/^%%/.test(line)) {
        inBody = true;
        section = header['psalm-section'] || (header['user-notes'] ? psalmSection(header['user-notes']) : null);
        return;
      }
      if(!inBody) return;
      var verse = line.match(/^(?:\(c\d\))?\s*(\d+)\.\s/);
      // The intonation files also show how verses 2 and 3 start ("Quia...", "Quod parásti * etc.").
      if(verse && section && !/\.\.\.|\betc\./.test(line)) add(section, parseInt(verse[1]), file, gabcText(line));
    });
  });
  return {sections: sections, order: order};
};

// The scores of a GABC file, [{header, body}], split as splitGabc in js/chant-element.js does.
var regexGabcHeader = /((?:[\w-_]+:\s*[^;\r\n]*;?\r?\n)+)%%\r?\n/;
var scores = function(gabc) {
  var parts = gabc.split(regexGabcHeader);
  if(parts.length === 1) parts.splice(0, 0, '', '');
  var result = [];
  for(var i = 1; i < parts.length; i += 2) {
    var header = {};
    parts[i].split(/\r?\n/).forEach(function(line) {
      var match = line.match(/^%?([\w-_]+):\s*([^;\r\n]*)(?:;|$)/i);
      if(match && !(match[1] in header)) header[match[1]] = match[2];
    });
    result.push({header: header, body: parts[i + 1]});
  }
  return result;
};

// A GABC lyric line as a unit's line (§7c): ℣ and ℟ as "V. " and "R. ", no neumes or tags.
var gabcUnitLine = function(line) {
  return gabcText(line.replace(/<v>\\([VR])bar<\/v>/g, '$1/.').replace(/<sp>([VR])\/<\/sp>/g, '$1/.'))
    .replace(/^([VR])\/\.\s*/, '$1. ').replace(/\s([VR])\/\.\s*/g, '\n$1. ');
};

// The paragraphs of a score that isn't a psalm, as unitParagraphs in js/chant-element.js: a
// paragraph with no words belongs to the one before (or, first, to the one after).
var unitParagraphs = function(body) {
  var paragraphs = [];
  var wordless = '';
  body.split(/\r?\n\s*\r?\n/).forEach(function(paragraph) {
    if(!/\S/.test(paragraph)) return;
    if(paragraph.split(/\r?\n/).some(function(line) { return !!gabcText(line); })) {
      paragraphs.push(wordless + paragraph);
      wordless = '';
    } else if(paragraphs.length) {
      paragraphs[paragraphs.length - 1] += '\n\n' + paragraph;
    } else {
      wordless += paragraph + '\n\n';
    }
  });
  if(wordless) paragraphs.push(wordless);
  return paragraphs;
};

// The units of a chant that isn't a psalm (§7c), as text: one per paragraph of its scores that
// aren't psalms.  The first gets the score's V/. or R/. annotation.
var gabcUnits = function(gabc) {
  var units = [];
  scores(gabc).forEach(function(score) {
    var header = score.header;
    if(header['psalm-section'] || (header['user-notes'] && psalmSection(header['user-notes']))) return;
    unitParagraphs(score.body).forEach(function(paragraph, i) {
      var lines = paragraph.split(/\r?\n/).map(gabcUnitLine).filter(Boolean);
      var annotation = (header.annotation || '').match(/^(?:([VR])\/\.|<v>\\([VR])bar<\/v>)$/);
      if(i === 0 && annotation) lines[0] = (annotation[1] || annotation[2]) + '. ' + lines[0];
      units.push(lines.join('\n').replace(/^([VR])\. ([VR])\. /, '$1. '));
    });
  });
  return units;
};

// An index.html block's Latin as a unit: ℣ and ℟ as "V. " and "R. ", a line per <br>.
var blockUnit = function(html) {
  return decode(html
    // "(℣ Dóminus vobíscum." is "℣ (Dóminus vobíscum."
    .replace(/\((<span class='versiculum'>[vr]<\/span>(?:&nbsp;|\s)*)/g, '$1(')
    .replace(/<span class='versiculum'>([vr])<\/span>(?:&nbsp;|\s)*/g, function(m, vr) { return '\u0001' + vr.toUpperCase() + '. '; })
    .replace(/<br\s*\/?>/g, '\n').replace(/<[^>]+>/g, ''))
    .split(/\n|(?=\u0001)/).map(function(line) { return line.replace(/\u0001/g, '').replace(/\s+/g, ' ').trim(); })
    .filter(Boolean).join('\n');
};

// The texts that have translations (§7c), {key: [unit, …]}: every chant that isn't a psalm,
// keyed by its src, and the blocks of index.html with a data-tr key of their own (index:…),
// one unit each.  A chant's pointed twin in index.html (chapter.gabc, …) uses the chant's units.
// A key used by blocks whose Latin differs is listed in problems, as they share a translation.
exports.texts = function(root, problems) {
  var result = {};
  var dirs = ['.', 'te-lucis', 'in-manus-tuas', 'marian-antiphon', 'psalms'].concat(
    fs.readdirSync(path.join(root, 'psalms')).filter(function(d) {
      return fs.statSync(path.join(root, 'psalms', d)).isDirectory();
    }).map(function(d) { return 'psalms/' + d; }));
  dirs.forEach(function(dir) {
    files(root, dir, /\.gabc$/).forEach(function(file) {
      var key = file.replace(/^\.\//, '');
      var units = gabcUnits(fs.readFileSync(path.join(root, file), 'utf8').replace(/^﻿/, ''));
      if(units.length) result[key] = units;
    });
  });
  var index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  var pairs = /<(div|span) [^>]*class='tr-pair' data-tr='(index:[^']+)'>\s*<(p|div|span) lang='la'>([\s\S]*?)<\/\3><\/\1>/g, m;
  while((m = pairs.exec(index))) {
    var unit = blockUnit(m[4]);
    if(!result[m[2]]) result[m[2]] = [unit];
    else if(result[m[2]][0] !== unit && problems) problems.push('index.html has two ' + m[2] + ' blocks whose Latin differs.');
  }
  return result;
};
