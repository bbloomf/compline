// Phase 2: the psalter (TRANSLATIONS_PLAN.md §2, §3 and §7c).  For each of the app's psalm
// sections, the translation's lines by verse key, checked against the app's own Latin, with
// the Gloria Patri and Sicut erat as the last two verses.
'use strict';
var text = require('./text');
var appLatin = require('./app-latin');
var texts = require('./texts');

// The verses the app shows from DO's Latin before they count as different, from 0 to 1 (§3).
var THRESHOLD = 0.9;

// Psalms the app has that aren't in Psalmi minor [Completorium]: the Nunc dimittis, All Souls'
// psalms, and the Miserere of the Triduum under Divino Afflatu, whole.  On All Souls' Day every
// psalm ends with Requiem æternam and Et lux perpétua in place of the Gloria, so its Nunc
// dimittis is a section of its own; the Miserere has no ending (ending null).
var EXTRA_SECTIONS = [
  {key: 'nunc-dimittis', psalm: 233},
  {key: 'nunc-dimittis-asd', psalm: 233, ending: 'Requiem'},
  {key: '122', psalm: 122, ending: 'Requiem'},
  {key: '141', psalm: 141, ending: 'Requiem'},
  {key: '142', psalm: 142, ending: 'Requiem'},
  {key: '50', psalm: 50, ending: null}
];

// The app's sections from Psalmi minor [Completorium]: "4,90,133", "6,7(2-10),7(11-18)", …
// A psalm said in parts gets .I, .II, … in order, as the app's labels "Psalm 7. I." do.
var sectionsFromDO = function(doDir) {
  var minor = text.sections(text.read(doDir, 'Latin', 'Psalterium/Psalmi/Psalmi minor.txt'));
  var lines = minor.Completorium;
  if(!lines) throw new Error('Psalmi minor.txt has no [Completorium]');
  var sections = [];
  var parts = {};
  lines.filter(function(line) { return /^[\d(),\-\s]+$/.test(line); }).forEach(function(line) {
    line.split(',').forEach(function(item) {
      var match = item.trim().match(/^(\d+)(?:\((\d+)-(\d+)\))?$/);
      if(!match) throw new Error('Psalmi minor: "' + item + '"');
      var section = {psalm: parseInt(match[1])};
      if(match[2]) {
        section.from = parseInt(match[2]);
        section.to = parseInt(match[3]);
        parts[section.psalm] = (parts[section.psalm] || 0) + 1;
        section.key = section.psalm + '.' + ['I', 'II', 'III', 'IV'][parts[section.psalm] - 1];
      } else {
        section.key = String(section.psalm);
      }
      sections.push(section);
    });
  });
  return sections.concat(EXTRA_SECTIONS);
};

// A psalm file's verse lines, [{key: '4:2a', verse: 2, text}], and how many other lines it has
// (titles such as "(Canticum Simeonis * Luc. 2:29-32)").
// own: the language's own lines for the file, from extra/<lang>/texts.txt, each of which takes
// the place of DO's line with the same key (the n-th of a repeated key, the n-th); unused lists
// any that DO hasn't, and unparsed any that aren't "N:v text".
var psalmLines = function(doDir, folder, psalm, own) {
  var source = text.read(doDir, folder, 'Psalterium/Psalmorum/Psalm' + psalm + '.txt');
  if(source === null) return null;
  var parse = function(source) {
    var lines = [], other = [];
    source.forEach(function(line) {
      if(!line.trim()) return;
      var match = line.match(/^(\d+):(\d+)([a-z]?)\s+(.*)$/);
      // A verse that starts partway through a line has its number inline: "* (4a) réspice".
      if(match) lines.push({key: match[1] + ':' + match[2] + match[3], verse: parseInt(match[2]),
        text: match[4].replace(/\s*\(\d+[a-z]?\)\s*/g, ' ').trim()});
      else other.push(line);
    });
    return {lines: lines, other: other};
  };
  // Each line's key, with the n-th of a repeated key told apart: '4:2a#1'.
  var ids = function(lines) {
    var seen = {};
    return lines.map(function(l) {
      seen[l.key] = (seen[l.key] || 0) + 1;
      return l.key + '#' + seen[l.key];
    });
  };
  var result = parse(source.split('\n'));
  result.unused = [];
  result.unparsed = [];
  if(own) {
    var at = {};
    ids(result.lines).forEach(function(id, i) { at[id] = i; });
    var mine = parse(own);
    ids(mine.lines).forEach(function(id, i) {
      if(id in at) result.lines[at[id]] = mine.lines[i];
      else result.unused.push(mine.lines[i].key);
    });
    result.unparsed = mine.other;
  }
  return result;
};

// The lines of a section's range.  A key repeated without a/b (Latin 69:4, 102:17, …) is told
// apart by its occurrence: id '102:17#2'.
var sectionLines = function(lines, section) {
  var seen = {};
  return lines.filter(function(line) {
    return !section.from || (line.verse >= section.from && line.verse <= section.to);
  }).map(function(line) {
    seen[line.key] = (seen[line.key] || 0) + 1;
    return {key: line.key, id: line.key + '#' + seen[line.key], text: line.text};
  });
};

// The two verses that end a psalm, from Prayers.txt: [Gloria] (Gloria Patri, Sicut erat) or
// [Requiem] (Requiem æternam, Et lux perpétua), or null.  own: the language's own sections, from
// extra/<lang>/texts.txt, read in place of DO's.
var ending = function(doDir, folder, name, own) {
  var lines = (own || {})['Psalterium/Common/Prayers:' + name] ||
    text.sections(text.read(doDir, folder, 'Psalterium/Common/Prayers.txt'))[name];
  if(!lines || lines.length !== 2) return null;
  return lines.map(function(line) { return line.replace(/^[VR]\.\s*/, ''); });
};

// The app's Latin, one text per verse, from the plain pointed files (not -PT or -triduum)
// where they have it.  Any file whose verse differs from it is reported.
var canonicalLatin = function(verses, report) {
  var result = {};
  Object.keys(verses).forEach(function(n) {
    var sources = verses[n];
    var best = sources.filter(function(s) { return /psalm-verses\.html$|canticle-psalm\.html$/.test(s.file); })[0] ||
      sources.filter(function(s) { return /\.html$/.test(s.file); })[0] || sources[0];
    result[n] = best;
    sources.forEach(function(s) {
      if(text.normalize(s.text) !== text.normalize(best.text)) {
        report.push('verse ' + n + ': ' + s.file + ' differs from ' + best.file + ': ' +
          text.wordDiff(text.normalize(best.text), text.normalize(s.text)));
      }
    });
  });
  return result;
};

// Puts a translated verse's markers where the app's Latin has them: '*' for the mediant and '†'
// for the flex (DO also writes the flex '‡'), each with a space on either side, as the display
// (unitHtml in js/text-mode.js) expects.  DO's '+' (a sign of the cross) goes, and so does a
// marker at the very end of a verse.  Returns the text; problems, where the mediant doesn't
// match the Latin; and flex, where the flex doesn't: 'added' where only the app's Latin has one
// (its pointing adds a flex to some long verses, which the translation can't follow), 'dropped'
// where only DO has one.  most: how many mediants the verse may have, where it stands for that
// many of the Latin's (a group, below); 1 if not given.  least: how few, 0 for a line that shares
// a Latin verse with others, whose mediant may be in another of them; 1 if not given.
var markers = function(translation, latin, most, least) {
  var problems = [];
  var flex = null;
  var t = translation
    .replace(/(^|\s)\+(?=\s|$)/g, ' ')
    .replace(/‡/g, '†')
    .replace(/[\s*†]+$/, '');
  var latinFlex = /†/.test(latin);
  if(latinFlex && !/†/.test(t)) flex = 'added';
  if(!latinFlex && /†/.test(t)) {
    flex = 'dropped';
    t = t.replace(/†/g, ' ');
  }
  var stars = (t.match(/\*/g) || []).length;
  if(/\*/.test(latin) && (stars < (least === undefined ? 1 : least) || stars > (most || 1))) problems.push(stars ? stars + ' mediants (*)' : 'no mediant (*)');
  t = t.replace(/\s*([*†])\s*/g, ' $1 ').replace(/\s+/g, ' ').trim();
  return {text: t, problems: problems, flex: flex};
};

// Pairing by content, for a translation whose verse keys are its own (Latin-Bea, §2b): DO numbers
// some of Bea's psalms from the title, so its 87:1 is the Latin's 87:2, and Bea divides verses
// its own way, so its 4:2 is the Latin's 4:2a and 4:2b.  Both are Latin, so the lines pair by the
// words they share: a group is one or more Latin lines and one or more of the translation's, in
// order, and the groups chosen are the ones that pair the most words, where a group of more than
// one line on each side costs GROUP_COST for each line over one each, and a group whose first
// lines have the same verse number gains SAME_VERSE.  So the lines pair one to one wherever the
// two have as many, and otherwise the groups are as few and as small as they can be, and follow
// the verse numbers where the words don't decide.  Each line of a group shares a word with the
// other side, and a line that pairs with nothing (a title only one of them has) is a group of its
// own, which costs UNPAIRED.  A group never crosses the start or end of a section.
var GROUP_COST = 0.6;
var SAME_VERSE = 0.3;
var UNPAIRED = 0.4;
var SHAPES = [[1, 1], [2, 1], [1, 2], [3, 1], [1, 3], [3, 2], [2, 3], [4, 3], [3, 4], [1, 0], [0, 1]];
// A psalm whose groups share fewer words than this, on average, is shown as one block per section.
var BLOCK_BELOW = 0.3;
// A text's words, cut to their first four letters, as a rough stem: clamávi and clamo are 'clam'.
var stems = function(t) {
  return text.normalize(t).split(' ').filter(function(w) { return w.length >= 3; }).map(function(w) { return w.slice(0, 4); });
};
// How many words two lists of stems share, from 0 to 1 (Dice's coefficient).
var shared = function(a, b) {
  if(!a.length || !b.length) return 0;
  var count = {};
  a.forEach(function(w) { count[w] = (count[w] || 0) + 1; });
  var n = 0;
  b.forEach(function(w) {
    if(count[w] > 0) {
      count[w]--;
      n++;
    }
  });
  return 2 * n / (a.length + b.length);
};
// latin and lines: a psalm's lines, [{key, verse, text}]; cuts: the indexes in latin where a
// section starts or ends.  Returns [{latin: [from, to), lines: [from, to), score}], where a line
// that pairs with nothing has an empty range on the other side, or null if they can't be paired.
var alignLines = function(latin, lines, cuts) {
  var a = latin.map(function(l) { return stems(l.text); });
  var b = lines.map(function(l) { return stems(l.text); });
  // the stems of lines [from, to) of a or b, each worked out once
  var joined = function(list, cache, from, to) {
    var key = from + '-' + to;
    if(!cache[key]) cache[key] = [].concat.apply([], list.slice(from, to));
    return cache[key];
  };
  var aJoined = {}, bJoined = {};
  // part[i]: how many cuts are at or before latin line i, so a group crosses a cut where it changes
  var part = latin.map(function(l, i) { return cuts.filter(function(c) { return c <= i; }).length; });
  var best = [], back = [];
  for(var i = 0; i <= latin.length; i++) {
    best.push(new Array(lines.length + 1).fill(-Infinity));
    back.push([]);
  }
  best[0][0] = 0;
  for(i = 0; i <= latin.length; i++) {
    for(var j = 0; j <= lines.length; j++) {
      if(best[i][j] === -Infinity) continue;
      SHAPES.forEach(function(shape) {
        var x = i + shape[0], y = j + shape[1];
        if(x > latin.length || y > lines.length) return;
        if(x > i + 1 && part[x - 1] !== part[i]) return;
        if(!shape[0] || !shape[1]) {
          if(best[i][j] - UNPAIRED > best[x][y]) {
            best[x][y] = best[i][j] - UNPAIRED;
            back[x][y] = {i: i, j: j, score: 0};
          }
          return;
        }
        var aj = joined(a, aJoined, i, x), bj = joined(b, bJoined, j, y);
        // every line of a group shares a word with the other side, or it pairs with nothing
        if(shape[0] > 1 && a.slice(i, x).some(function(l) { return !shared(l, bj); })) return;
        if(shape[1] > 1 && b.slice(j, y).some(function(l) { return !shared(l, aj); })) return;
        var score = shared(aj, bj);
        var total = best[i][j] + score * (shape[0] + shape[1]) - GROUP_COST * (shape[0] + shape[1] - 2) +
          (latin[i].verse === lines[j].verse ? SAME_VERSE : 0);
        if(total > best[x][y]) {
          best[x][y] = total;
          back[x][y] = {i: i, j: j, score: score};
        }
      });
    }
  }
  if(best[latin.length][lines.length] === -Infinity) return null;
  var groups = [];
  for(i = latin.length, j = lines.length; i > 0 || j > 0; ) {
    var step = back[i][j];
    groups.unshift({latin: [step.i, i], lines: [step.j, j], score: step.score});
    i = step.i;
    j = step.j;
  }
  return groups;
};

// Characters that would break a GABC lyric or translation if the text were ever set under the
// chant (§7a), apart from * and †, which are the markers.
var UNSAFE = /[()[\]{}<>_^%|\\#$@~]/g;

// Builds the psalter of every language, and a report.  languages: [{code, folder, keys, groups,
// align, latin}], where keys renames a translation's keys ({'11:6': '11:6b'}) and groups lists
// runs of keys that pair as a whole ([['102:17', '102:18']]): the translation of the run goes on
// its first verse, and the others get '' (covered by the verse before).  align pairs the lines by
// content instead of by key, in groups the same way (alignLines).  latin is a Latin text: a verse
// that is the Latin's word for word is null, as the display shows the Latin there (§2b).
exports.build = function(doDir, root, languages) {
  var app = appLatin.read(root);
  var sections = sectionsFromDO(doDir);
  var report = {latin: [], app: [], languages: {}};

  // The app's sections and DO's must be the same.
  var keys = sections.map(function(s) { return s.key; });
  app.order.forEach(function(key) {
    if(keys.indexOf(key) < 0) report.app.push('The app has a section ' + key + ' that DO has no range for.');
  });
  keys.forEach(function(key) {
    if(!app.sections[key]) report.app.push('DO has a section ' + key + ' that the app doesn\'t have.');
  });

  // Check DO's Latin against the app's, verse by verse.
  var latinEnding = function(section) {
    if(section.ending === null) return [];
    var name = section.ending || 'Gloria';
    var lines = ending(doDir, 'Latin', name);
    if(!lines) throw new Error('Latin Prayers.txt has no [' + name + '] of two lines, for section ' + section.key);
    return lines;
  };
  var plan = {};
  sections.forEach(function(section) {
    if(!app.sections[section.key]) return;
    var appReport = [];
    var verses = canonicalLatin(app.sections[section.key], appReport);
    appReport.forEach(function(line) { report.app.push(section.key + ' ' + line); });
    var count = Math.max.apply(null, Object.keys(verses).map(Number));
    for(var n = 1; n <= count; n++) {
      if(!verses[n]) report.app.push(section.key + ': the app has no verse ' + n);
    }
    var latin = sectionLines(psalmLines(doDir, 'Latin', section.psalm).lines, section);
    var doVerses = latin.map(function(l) { return l.text; }).concat(latinEnding(section));
    if(doVerses.length !== count) {
      report.latin.push(section.key + ': DO has ' + latin.length + ' verses + ' + (section.ending || 'Gloria') + ', the app ' + count);
    }
    var scores = [];
    for(n = 1; n <= Math.min(count, doVerses.length); n++) {
      if(!verses[n]) continue;
      var a = text.normalize(verses[n].text), b = text.normalize(doVerses[n - 1]);
      var score = text.similarity(a, b);
      scores.push(score);
      if(score < 1) {
        report.latin.push((score < THRESHOLD ? '!! ' : '   ') + section.key + ':' + n + ' (' +
          (latin[n - 1] ? latin[n - 1].key : section.ending || 'Gloria') + ') ' + score.toFixed(3) + '  ' + text.wordDiff(a, b));
      }
    }
    plan[section.key] = {section: section, latin: latin, verses: verses, count: count, doVerses: doVerses};
  });

  // Each language, by key.
  languages.forEach(function(lang) {
    var r = report.languages[lang.code] = {sections: 0, ok: 0, verses: 0, translated: 0, missing: [], extra: [],
      markers: [], flex: {added: [], dropped: []}, unsafe: [], notes: [], groups: [], same: [], psalter: {}};
    // A language's ending, or null.  Only a language with a fallback (as DO falls back for it)
    // borrows another's; otherwise the ending is missing, not the Latin.
    var own = texts.extra(lang.code);
    var endings = {};
    var langEnding = function(section) {
      if(section.ending === null) return [];
      var name = section.ending || 'Gloria';
      if(!(name in endings)) {
        var mine = own.sections['Psalterium/Common/Prayers:' + name];
        if(mine && mine.length !== 2) {
          throw new Error('extra/' + lang.code + '/texts.txt [@Prayers:' + name + '] isn\'t two lines, V. and R.: ' + mine.join(' / '));
        }
        endings[name] = ending(doDir, lang.folder, name, own.sections);
        if(!endings[name] && lang.fallback) {
          endings[name] = ending(doDir, lang.fallback, name);
          r.notes.push('no Prayers.txt [' + name + ']: the ' + lang.fallback + ' is used');
        }
      }
      return endings[name];
    };
    var rename = lang.keys || {};
    var groups = lang.groups || [];
    if(lang.align && (lang.keys || lang.groups)) {
      throw new Error(lang.code + ': keys and groups pair by key, and align by content, so they can\'t go together');
    }
    // Where the lines pair by content (lang.align), each psalm's groups, worked out once for all
    // its sections: {latin, groups, block}, where block is true if they're shown one block per
    // section instead (BLOCK_BELOW).
    var aligned = {};
    var alignPsalm = function(psalm, file) {
      if(aligned[psalm]) return aligned[psalm];
      var latin = psalmLines(doDir, 'Latin', psalm).lines;
      var ranges = sections.filter(function(s) { return s.psalm === psalm; });
      var cuts = [];
      ranges.filter(function(s) { return s.from; }).forEach(function(s) {
        cuts.push(latin.findIndex(function(l) { return l.verse >= s.from; }), latin.findIndex(function(l) { return l.verse > s.to; }));
      });
      var found = alignLines(latin, file.lines, cuts.filter(function(c) { return c > 0; }));
      var score = found && found.reduce(function(sum, g) { return sum + g.score; }, 0) / found.length;
      aligned[psalm] = {latin: latin, groups: found, block: !found || score < BLOCK_BELOW};
      if(aligned[psalm].block) {
        r.groups.push('Psalm ' + psalm + ': one block per section' + (found ? ', as its groups share only ' +
          score.toFixed(2) + ' of their words' : ', as its lines can\'t be paired'));
      } else {
        // A group outside every section (a title's) is left out; it's reported if it has any of
        // the translation's lines but isn't one line with one, as they may be a section's.
        found.forEach(function(g) {
          // (a line after the psalm's last pairs with nothing at its end, in its last section)
          var l = latin[Math.min(g.latin[0], latin.length - 1)];
          var inside = l && ranges.some(function(s) { return !s.from || (l.verse >= s.from && l.verse <= s.to); });
          if(inside || g.lines[0] === g.lines[1] || (g.latin[1] - g.latin[0] === 1 && g.lines[1] - g.lines[0] === 1)) return;
          file.lines.slice(g.lines[0], g.lines[1]).forEach(function(t) {
            r.extra.push('Psalm ' + psalm + ': ' + t.key + ' "' + t.text.slice(0, 50) + '…", outside every section');
          });
        });
      }
      return aligned[psalm];
    };
    // A section's verses where the lines pair by content: each group's lines go on its first
    // Latin verse, and its other verses are '' (as groups, above).  The groups are reported, and
    // so are lines that pair one to one with keys that aren't the Latin's (a run of them at once),
    // and lines that pair with nothing.  Returns how many problems there are.
    var alignSection = function(section, p, file, out, grouped) {
      var problems = 0;
      var a = alignPsalm(section.psalm, file);
      var start = a.latin.findIndex(function(l) { return !section.from || l.verse >= section.from; });
      var end = start + p.latin.length;
      var runs;
      if(!a.block) {
        runs = a.groups.filter(function(g) {
          return g.latin[0] >= start && (g.latin[0] < end || (g.latin[0] === end && end === a.latin.length));
        }).map(function(g) {
          return {latin: g.latin[1] - g.latin[0], lines: file.lines.slice(g.lines[0], g.lines[1])};
        });
      } else {
        runs = [{latin: p.latin.length, lines: a.groups ? file.lines.filter(function(l, i) {
          return a.groups.some(function(g) { return g.latin[0] >= start && g.latin[0] < end && i >= g.lines[0] && i < g.lines[1]; });
        }) : sectionLines(file.lines, section)}];
      }
      var shifted = [];
      var flush = function() {
        if(!shifted.length) return;
        var last = shifted[shifted.length - 1];
        r.groups.push(section.key + ': ' + shifted[0].latin + (shifted.length > 1 ? '–' + last.latin : '') + ' ↔ ' +
          shifted[0].line + (shifted.length > 1 ? '–' + last.line + ', line by line' : ''));
        shifted = [];
      };
      runs.forEach(function(run) {
        var first = out.length + 1;
        var latinKeys = p.latin.slice(first - 1, first - 1 + run.latin).map(function(l) { return l.key; });
        if(!run.latin || !run.lines.length) {
          flush();
          problems++;
          if(run.latin) {
            r.missing.push(section.key + ':' + first + ' (' + latinKeys.join('+') + ', pairs with nothing)');
            for(var k = 0; k < run.latin; k++) out.push(null);
          } else {
            r.extra.push(section.key + ': ' + run.lines[0].key + ' "' + run.lines[0].text.slice(0, 50) + '…", pairs with nothing');
          }
          return;
        }
        // Where there are more of the translation's lines than Latin verses, the mediant may be in
        // any of a verse's lines, so it's checked over them all.
        var shares = run.lines.length > run.latin;
        var texts = run.lines.map(function(t, k) {
          var n = first + Math.min(k, run.latin - 1);
          var m = markers(t.text, (p.verses[n] || {text: ''}).text, Math.max(1, run.latin - run.lines.length + 1), shares ? 0 : 1);
          if(m.problems.length) r.markers.push(section.key + ':' + n + ' ' + m.problems.join(', ') + ': ' + m.text);
          if(m.flex) r.flex[m.flex].push(section.key + ':' + n);
          return m.text;
        });
        if(shares && /\*/.test((p.verses[first] || {text: ''}).text) && !/\*/.test(texts.join(' '))) {
          r.markers.push(section.key + ':' + first + ' no mediant (*): ' + texts.join(' / '));
        }
        if(run.latin === 1 && run.lines.length === 1) {
          if(latinKeys[0] !== run.lines[0].key) shifted.push({latin: latinKeys[0], line: run.lines[0].key});
          else flush();
        } else {
          flush();
          r.groups.push(section.key + ': ' + latinKeys.join('+') + ' ↔ ' + run.lines.map(function(t) { return t.key; }).join('+'));
        }
        grouped[out.length] = true;
        out.push(texts.join('\n'));
        for(var k = 1; k < run.latin; k++) out.push('');
      });
      flush();
      return problems;
    };
    sections.forEach(function(section) {
      var p = plan[section.key];
      if(!p) return;
      r.sections++;
      var file = psalmLines(doDir, lang.folder, section.psalm, own.psalms[section.psalm]);
      if(!file) {
        r.missing.push(section.key + ': no Psalm' + section.psalm + '.txt');
        r.verses += p.count;
        return;
      }
      if(file.unparsed.length) {
        throw new Error('extra/' + lang.code + '/texts.txt [@Psalterium/Psalmorum/Psalm' + section.psalm +
          '] has a line that isn\'t "N:v text": ' + file.unparsed[0]);
      }
      file.unused.forEach(function(key) {
        var note = 'extra/' + lang.code + '/texts.txt has Psalm' + section.psalm + ' ' + key + ', which DO hasn\'t';
        if(r.notes.indexOf(note) < 0) r.notes.push(note);
      });
      var grouped = {};
      var out = [];
      var problems = 0;
      if(lang.align) {
        problems += alignSection(section, p, file, out, grouped);
      } else {
        var lines = sectionLines(file.lines.map(function(l) {
          return rename[l.key] ? {key: rename[l.key], verse: parseInt(rename[l.key].split(':')[1]), text: l.text} : l;
        }), section);
        var byId = {};
        lines.forEach(function(l) { byId[l.id] = l; });
        var used = {};
        for(var i = 0; i < p.latin.length; i++) {
          var l = p.latin[i];
          var group = groups.filter(function(g) { return g.indexOf(l.key) >= 0; })[0];
          if(group) {
            // The whole run: every Latin line in it, and every translation line.
            var run = [];
            while(i < p.latin.length && group.indexOf(p.latin[i].key) >= 0) run.push(p.latin[i++]);
            i--;
            var tr = lines.filter(function(t) { return group.indexOf(t.key) >= 0; });
            tr.forEach(function(t) { used[t.id] = true; });
            if(!tr.length) {
              r.missing.push(section.key + ': ' + group.join('–'));
              problems++;
              run.forEach(function() { out.push(null); });
              continue;
            }
            var first = out.length + 1;
            var texts = tr.map(function(t, k) {
              // the markers of the Latin verse with the line's key (the last, where the Latin
              // repeats it), else the one in the same place
              var j = -1;
              run.forEach(function(l, x) { if(l.key === t.key) j = x; });
              var n = first + (j < 0 ? Math.min(k, run.length - 1) : j);
              var m = markers(t.text, (p.verses[n] || {text: ''}).text);
              if(m.problems.length) r.markers.push(section.key + ':' + n + ' ' + m.problems.join(', ') + ': ' + m.text);
              if(m.flex) r.flex[m.flex].push(section.key + ':' + n);
              return m.text;
            });
            r.notes.push(section.key + ': ' + tr.length + ' lines (' + tr.map(function(t) { return t.key; }).join(', ') +
              ') pair as one group with the ' + run.length + ' Latin verses ' + run.map(function(t) { return t.key; }).join(', '));
            grouped[out.length] = true;
            out.push(texts.join('\n'));
            run.slice(1).forEach(function() { out.push(''); });
            continue;
          }
          var t = byId[l.id];
          if(!t) {
            r.missing.push(section.key + ':' + (out.length + 1) + ' (' + l.key + (l.id.slice(-2) === '#1' ? '' : ', ' + l.id.split('#')[1] + '.') + ')');
            problems++;
            out.push(null);
            continue;
          }
          used[t.id] = true;
          out.push(t.text);
        }
        lines.forEach(function(t) {
          if(!used[t.id]) {
            r.extra.push(section.key + ': ' + t.key + ' "' + t.text.slice(0, 50) + '…"');
            problems++;
          }
        });
      }
      var end = langEnding(section);
      if(!end) {
        r.missing.push(section.key + ': no Prayers.txt [' + (section.ending || 'Gloria') + ']');
        problems++;
        end = [null, null];
      }
      out = out.concat(end);
      // Markers, against the app's Latin verse by verse.
      out = out.map(function(verse, k) {
        if(!verse) return verse;
        var latinVerse = p.verses[k + 1];
        if(!latinVerse) return verse;
        // A group's lines were done above.
        var m = grouped[k] ? {text: verse, problems: [], flex: null} : markers(verse, latinVerse.text);
        if(m.problems.length) r.markers.push(section.key + ':' + (k + 1) + ' ' + m.problems.join(', ') + ': ' + m.text);
        if(m.flex) r.flex[m.flex].push(section.key + ':' + (k + 1));
        var unsafe = m.text.match(UNSAFE);
        if(unsafe) r.unsafe.push(section.key + ':' + (k + 1) + ' ' + unsafe.join(' ') + ': ' + m.text);
        return m.text;
      });
      if(out.length !== p.count) {
        r.notes.push(section.key + ': ' + out.length + ' verses for the app\'s ' + p.count);
        problems++;
      }
      // A Latin text's verses that are the Latin's word for word (DO's, or the app's).
      var same = 0;
      if(lang.latin) {
        out = out.map(function(verse, k) {
          if(!verse) return verse;
          var words = text.normalize(verse);
          // DO's verse is the app's only where DO has as many (above)
          var doVerse = p.doVerses.length === p.count ? p.doVerses[k] : '';
          if(words !== text.normalize(doVerse) && !(p.verses[k + 1] && words === text.normalize(p.verses[k + 1].text))) {
            return verse;
          }
          r.same.push(section.key + ':' + (k + 1));
          same++;
          return null;
        });
      }
      r.verses += p.count;
      r.translated += out.filter(function(v) { return v !== null; }).length + same;
      if(!problems) r.ok++;
      r.psalter[section.key] = out;
    });
  });
  return report;
};

exports.THRESHOLD = THRESHOLD;
