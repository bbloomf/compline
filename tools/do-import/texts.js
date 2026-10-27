// Phase 3: everything other than the psalter (TRANSLATIONS_PLAN.md §3 and §7e).  manifest.json
// says where each of the app's texts is in DO; this builds each language's units from it (§7c:
// a chant's paragraphs, or an index.html block), and checks DO's Latin, built the same way,
// against the app's own Latin.
//
// A text in the manifest is a list of units.  A unit is a piece, or a list of pieces whose lines
// it joins.  A piece is a DO line ("@file:section:subs", "$Prayers section", or text), with
// the manifest's file names (Prayers, Minor, …) allowed in @ references, or an object:
//   ref       the DO line
//   paschal   'single': each V./R. line (or else the last line) ends with one alleluia, as DO's
//             ensure_single_alleluia; 'responsory': the short responsory's Paschal form, as DO's
//             postprocess_short_resp
//   part      of a Mariaant.txt section: 'antiphon', 'versicle' or 'prayer'
//   start     only the lines after the first that is this, before they're cleaned up
//             ('&psalm(233)': what follows the Nunc dimittis)
//   lines     '2' or '1-3', of the piece's lines once cleaned up; tail: the last n
//   after     a DO line whose first line this piece's first line continues: only the rest is kept
//             ("…usque ad mortem, mortem autem crucis." after "…usque ad mortem." is "Mortem autem
//             crucis.")
//   abbrev    the line up to its *, or its first two words, then "…", as the app's "In manus..."
//   prefix    in place of the line's V./R. ("" for none)
//   inline    joins the piece's first line onto the line before, with this between
//   amen      the last line's Amen becomes a line "R. Amen." of its own (added if it has none)
//   generate  'alleluia-antiphon': "Alleluia, * alleluia, alleluia.", as DO's alleluia_ant
// A text can instead be {units, version}: version is the DO version its conditions are read for.
// A hymn is {hymn, doxology}: the doxology takes the place of the hymn's stanza from its * on, and
// the units are the stanzas.  A text DO doesn't have is {extra: why}: it comes only from
// extra/<lang>/texts.txt, and a language without it there has the text missing.  Its Latin, in
// extra/la/texts.txt, is checked against the app's in place of DO's.
//
// extra/<lang>/texts.txt is texts written by hand, which take the place of DO's (§7, "Texts that
// don't come from DO"): each [key] is followed by its units, separated by blank lines, and a line
// that starts with # is a comment.
'use strict';
var fs = require('fs');
var path = require('path');
var text = require('./text');
var resolve = require('./resolve');
var appLatin = require('./app-latin');

// The units of DO's Latin that the app's are compared against, as in the psalter (§3).
var THRESHOLD = 0.9;

var manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'manifest.json'), 'utf8'));

// A language's extra/<lang>/texts.txt, as {key: units}; {} if it has none.
var extraTexts = function(code) {
  var file = path.join(__dirname, 'extra', code, 'texts.txt');
  if(!fs.existsSync(file)) return {};
  var sections = text.sections(fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n'));
  Object.keys(sections).forEach(function(key) {
    sections[key] = sections[key].filter(function(line) { return !/^\s*#/.test(line); })
      .map(function(line) { return line.trim(); }).join('\n').split(/\n{2,}/).filter(Boolean);
  });
  return sections;
};

// Characters GABC can't take (§7a), apart from * and †, as in the psalter.
var UNSAFE = /[()[\]{}<>_^%|\\#$@~]/g;

var splitPrefix = function(line) {
  var m = line.match(/^([VR]\. )?(.*)$/);
  return {prefix: m[1] || '', text: m[2]};
};

// A DO line as written in the manifest, with its file name spelled out.
var expand = function(line) {
  var m = line.match(/^@([^:]*):(.*)$/);
  if(m && manifest.files[m[1]]) return '@' + manifest.files[m[1]] + ':' + m[2];
  return line;
};

// DO's markup taken out of resolved lines, leaving the lines of a unit (§7c).
var clean = function(lines) {
  var out = [];
  lines.forEach(function(line) {
    if(out.length && /~$/.test(out[out.length - 1])) {
      out[out.length - 1] = out[out.length - 1].replace(/~$/, ' ') + line;
      return;
    }
    out.push(line);
  });
  return out.filter(function(line) {
    return /\S/.test(line) && !/^\s*(_|!|#|&|\$rubrica\b)/.test(line);
  }).map(function(line) {
    return line
      .replace(/\/:.*?:\//g, ' ')
      .replace(/\{:.*?:\}/g, '')
      .replace(/^\s*R\.br\.\s*/, '')
      .replace(/^\s*[vr]\.\s+/, '')
      .replace(/^\s*([VR])\.\s*/, '$1. ')
      .replace(/^\s*(?:Ant|Benedictio)\.\s*/, '')
      .replace(/(^|\s)\++(?=\s|$)/g, ' ')
      .replace(/‡/g, '†')
      .replace(/(\p{L})\[(\p{L}+)\]/gu, '$1$2')
      .replace(/~$/, '')
      .replace(/\s+/g, ' ')
      .replace(/^([VR]\.) ?/, '$1 ')
      .trim();
  });
};

// The language's short words: Amen, Alleluia and the double alleluia, from its Prayers.txt.
var words = function(r) {
  var last = function(lines) {
    lines = clean(lines).filter(function(l) { return l[0] !== '⟨'; });
    return lines.length ? splitPrefix(lines[lines.length - 1]).text : null;
  };
  var amen = last(r.reference(resolve.PRAYERS, 'Per Dominum'));
  var alleluiaLine = r.reference(resolve.PRAYERS, 'Alleluia')[0] || '';
  var alleluia = /^⟨/.test(alleluiaLine) ? null : alleluiaLine.replace(/^v\. (.*?)\..*/, '$1');
  var duplex = last(r.reference(resolve.PRAYERS, 'Alleluia Duplex')) ||
    (alleluia ? alleluia + ', ' + alleluia.toLowerCase() + '.' : null);
  var gloria = clean(r.reference(resolve.PRAYERS, 'Gloria1'))[0];
  return {amen: amen, alleluia: alleluia, duplex: duplex, gloria: gloria};
};

// DO's Paschal forms (LanguageTextTools.pm).
var alleluiaPattern = function(w) {
  return '(?:' + (w.alleluia ? w.alleluia.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '|' : '') + 'allel[uú][ij]a)';
};
var ensureSingle = function(line, w) {
  if(new RegExp(alleluiaPattern(w) + '\\p{P}?\\)?\\s*$', 'iu').test(line)) return line;
  return line.replace(/\p{P}?\s*$/u, ', ' + w.alleluia.toLowerCase() + '.');
};
var ensureDouble = function(line, w) {
  var a = alleluiaPattern(w);
  if(new RegExp(a + '[,.] ' + a + '\\p{P}?\\s*$', 'iu').test(line)) return line;
  return line.replace(/\s*\*\s*(.)/, function(m, c) { return ' ' + c.toLowerCase(); })
    .replace(/\p{P}?\s*$/u, ', * ' + w.alleluia + ', ' + w.alleluia.toLowerCase() + '.');
};
// The short responsory (R.br. … the third R.): the R. after a V. is the double alleluia, and the
// other R.s end with it.  The Gloria (&Gloria1, w.gloria here) isn't a V. for this, as in DO,
// where postprocess_short_resp sees it unexpanded.
var paschalResponsory = function(lines, w) {
  var afterV = false;
  return lines.map(function(line) {
    if(/^V\./.test(line)) {
      afterV = clean([line])[0] !== w.gloria;
      return line;
    }
    if(/^R\.br\./.test(line)) return ensureDouble(line, w);
    if(/^R\./.test(line)) {
      var result = afterV ? 'R. ' + w.duplex : ensureDouble(line, w);
      afterV = false;
      return result;
    }
    return line;
  });
};

// The parts of a Mariaant.txt section, split at its _ lines: the antiphon (every part before
// the versicle), the versicle, and the prayer after it.
var mariaantPart = function(lines, part) {
  var parts = [[]];
  lines.forEach(function(line) {
    if(/^\s*_\s*$/.test(line)) parts.push([]);
    else parts[parts.length - 1].push(line);
  });
  var v = -1;
  parts.forEach(function(p, i) {
    if(v < 0 && p.some(function(l) { return /^\s*V\./.test(l); })) v = i;
  });
  if(v < 0) return ['⟨no versicle in the Mariaant section⟩'];
  if(part === 'antiphon') return [].concat.apply([], parts.slice(0, v));
  if(part === 'versicle') return parts[v];
  return [].concat.apply([], parts.slice(v + 1));
};

var pickLines = function(lines, spec) {
  var m = String(spec).match(/^(\d+)(?:-(\d+))?$/);
  if(!m) throw new Error('lines: "' + spec + '"');
  var from = parseInt(m[1]), to = m[2] ? parseInt(m[2]) : from;
  if(lines.length < to) return ['⟨only ' + lines.length + ' lines, not ' + spec + '⟩'];
  return lines.slice(from - 1, to);
};

// One piece's lines.  ctx: {r, w}.
var piece = function(p, ctx) {
  if(typeof p === 'string') p = {ref: p};
  var lines;
  if(p.generate === 'alleluia-antiphon') {
    if(!ctx.w.alleluia) return ['⟨no Prayers.txt [Alleluia]⟩'];
    var a = ctx.w.alleluia;
    return [a + ', * ' + a.toLowerCase() + ', ' + a.toLowerCase() + '.'];
  }
  if(p.paschal && !ctx.w.alleluia) return ['⟨no Prayers.txt [Alleluia]⟩'];
  var ref = expand(p.ref);
  var m = ref.match(/^@([^:]*):([^:]*)(?::(.*))?$/) || ref.match(/^\$()(.+)$/);
  if(m) lines = ctx.r.reference(m[1] || resolve.PRAYERS, m[2], m[3] || '');
  else lines = [ref];
  if(p.paschal === 'responsory') lines = paschalResponsory(lines, ctx.w);
  if(p.part) lines = mariaantPart(lines, p.part);
  if(p.start) {
    var at = lines.map(function(l) { return l.trim(); }).indexOf(p.start);
    lines = at < 0 ? ['⟨no ' + p.start + ' in ' + p.ref + '⟩'] : lines.slice(at + 1);
  }
  lines = clean(lines);
  if(p.lines) lines = pickLines(lines, p.lines);
  if(p.tail) lines = lines.slice(-p.tail);
  if(p.paschal === 'single') {
    var vr = lines.some(function(l) { return /^[VR]\. /.test(l); });
    lines = lines.map(function(l, i) {
      return (vr ? /^[VR]\. /.test(l) : i === lines.length - 1) ? ensureSingle(l, ctx.w) : l;
    });
  }
  if(p.after) {
    var before = splitPrefix(piece({ref: p.after, start: p.start, lines: 1}, ctx)[0]).text.split(' ');
    var own = lines[0].split(' ');
    var k = 0;
    while(k < before.length && k < own.length && text.normalize(before[k]) === text.normalize(own[k])) k++;
    var rest = own.slice(k).join(' ').replace(/^[\s\p{P}]+/u, '');
    lines[0] = rest.charAt(0).toUpperCase() + rest.slice(1);
  }
  if(p.abbrev) {
    lines = lines.map(function(l) {
      var s = splitPrefix(l);
      var short = /\*/.test(s.text) ? s.text.split('*')[0] : s.text.split(' ').slice(0, 2).join(' ');
      return s.prefix + short.replace(/[\s\p{P}]+$/u, '') + '…';
    });
  }
  if('prefix' in p) lines = lines.map(function(l) { return p.prefix + splitPrefix(l).text; });
  if(p.amen) {
    var last = lines[lines.length - 1];
    var amen = ctx.w.amen;
    if(!amen) return lines.concat('⟨no Amen⟩');
    var stem = amen.replace(/\p{P}+$/u, '');
    var at = last.search(new RegExp('\\s' + stem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\p{P}*$', 'iu'));
    if(at >= 0) lines[lines.length - 1] = last.slice(0, at);
    lines.push('R. ' + amen);
  }
  return lines;
};

// A unit's text: its pieces' lines, one under the other, or joined where a piece is inline.
var unit = function(u, ctx) {
  var lines = [];
  [].concat(u).forEach(function(p) {
    var own = piece(p, ctx);
    if(p.inline && lines.length && own.length) {
      lines[lines.length - 1] = lines[lines.length - 1].replace(/\s+$/, '') + p.inline + splitPrefix(own[0]).text;
      own = own.slice(1);
    }
    lines = lines.concat(own);
  });
  return lines.join('\n');
};

// A hymn's stanzas, with the doxology in place of the stanza from the hymn's * on (hymni.pl).
// Where the doxology has no Amen, the hymn's is kept.
var hymn = function(spec, ctx) {
  var lines = ctx.r.reference.apply(null, refParts(spec.hymn));
  if(/⟨/.test(lines.join('\n'))) return {units: [lines.join('\n')], notes: []};
  if(spec.doxology) {
    var star = -1;
    lines.forEach(function(l, i) { if(star < 0 && /^\s*\*/.test(l)) star = i; });
    if(star < 0) return {units: ['⟨no * in the hymn⟩'], notes: []};
    var doxology = ctx.r.reference.apply(null, refParts(spec.doxology));
    while(doxology.length && !doxology[doxology.length - 1].trim()) doxology.pop();
    if(/⟨/.test(doxology.join('\n'))) return {units: stanzas(lines.slice(0, star).concat(doxology)), notes: []};
    var amen = lines[lines.length - 1];
    var notes = [];
    if(doxology.length && doxology[doxology.length - 1].trim() !== amen.trim() && /^\s*\S+\s*$/.test(amen)) {
      doxology = doxology.concat(amen);
      notes.push(spec.doxology + ' has no "' + amen.trim() + '": the hymn\'s is added');
    }
    lines = lines.slice(0, star).concat(doxology);
    return {units: stanzas(lines), notes: notes};
  }
  return {units: stanzas(lines), notes: []};
};
var stanzas = function(lines) {
  var result = [[]];
  lines.forEach(function(l) {
    if(/^\s*_\s*$/.test(l)) result.push([]);
    else result[result.length - 1].push(l);
  });
  return result.map(function(s) { return clean(s).join('\n'); });
};
var refParts = function(ref) {
  var m = expand(ref).match(/^@([^:]*):([^:]*)(?::(.*))?$/);
  if(!m) throw new Error('Not a DO reference: ' + ref);
  return [m[1], m[2], m[3] || ''];
};

// The units of one text in one language, {units, notes}; a unit that is missing something has
// a ⟨…⟩ in it.  extra: the language's extra/<lang>/texts.txt.
var build = function(key, spec, lang, doDir, w0, extra) {
  if(extra && extra[key]) return {units: extra[key], notes: []};
  if(Array.isArray(spec)) spec = {units: spec};
  if(spec.extra) return {units: ['⟨not in extra/' + lang.code + '/texts.txt⟩'], notes: []};
  var r = resolve.resolver(doDir, lang, spec.version);
  var ctx = {r: r, w: w0 || words(r)};
  return spec.hymn ? hymn(spec, ctx) : {units: spec.units.map(function(u) { return unit(u, ctx); }), notes: []};
};

// The * and † a unit keeps: only those the app's Latin unit has too.
var markers = function(unitText, latin) {
  var t = unitText;
  if(!/\*/.test(latin || '')) t = t.replace(/\s*\*\s*/g, ' ');
  if(!/†/.test(latin || '')) t = t.replace(/\s*†\s*/g, ' ');
  return t.split('\n').map(function(l) {
    return l.replace(/\s*([*†])\s*/g, ' $1 ').replace(/^ ([*†]) /, '$1 ').replace(/\s+/g, ' ').trim();
  }).join('\n');
};

// For comparing with the app's Latin: no V. or R., and j written i (DO's allelúja, the app's
// allelúia).
var comparable = function(u) {
  return text.normalize(u.replace(/(^|\n)[VR]\. /g, '$1')).replace(/j/g, 'i');
};
// DO's unit cut to the app's abbreviations: where the app's line is "In manus...", DO's
// "In manus tuas, Dómine…" is compared as its first as many words.
var abbreviated = function(doUnit, appUnit) {
  var a = appUnit.split('\n'), d = doUnit.split('\n');
  if(a.length !== d.length) return doUnit;
  return d.map(function(line, i) {
    if(!/(\.\.\.|…)$/.test(a[i]) || !/…$/.test(line)) return line;
    var n = a[i].replace(/^([VR]\. |\* )/, '').split(' ').length;
    var s = line.match(/^([VR]\. |\* )?(.*)$/);
    return (s[1] || '') + s[2].split(' ').slice(0, n).join(' ');
  }).join('\n');
};

// Builds every language's texts, and a report.  languages: [{code, folder, fallback, texts}].
exports.build = function(doDir, root, languages) {
  var report = {latin: [], app: [], languages: {}};
  var app = appLatin.texts(root, report.app);
  var keys = Object.keys(manifest.texts);
  Object.keys(app).forEach(function(key) {
    if(!manifest.texts[key]) report.app.push('The app has ' + key + ', which manifest.json doesn\'t map.');
  });
  keys.forEach(function(key) {
    if(!app[key]) report.app.push('manifest.json maps ' + key + ', which the app doesn\'t have.');
  });

  // DO's Latin against the app's, unit by unit.
  var latin = {code: 'la', folder: 'Latin'};
  var latinWords = words(resolve.resolver(doDir, latin));
  var latinExtra = extraTexts('la');
  keys.forEach(function(key) {
    var spec = manifest.texts[key];
    var built = build(key, spec, latin, doDir, latinWords, latinExtra);
    var appUnits = app[key] || [];
    if(built.units.length !== appUnits.length) {
      report.latin.push('!! ' + key + ': DO has ' + built.units.length + ' units, the app ' + appUnits.length);
    }
    built.units.forEach(function(u, i) {
      if(i >= appUnits.length) return;
      if(/⟨/.test(u)) {
        report.latin.push('!! ' + key + ':' + (i + 1) + ' ' + u.match(/⟨[^⟩]*⟩/)[0]);
        return;
      }
      var a = comparable(appUnits[i]), b = comparable(abbreviated(u, appUnits[i]));
      var score = text.similarity(a, b);
      if(score < 1) {
        report.latin.push((score < THRESHOLD ? '!! ' : '   ') + key + ':' + (i + 1) + ' ' + score.toFixed(3) + '  ' +
          text.wordDiff(a, b));
      }
    });
  });

  languages.forEach(function(lang) {
    var r = report.languages[lang.code] = {keys: keys.length, ok: 0, units: 0, translated: 0, missing: [], counts: [],
      unsafe: [], notes: [], texts: null};
    if(lang.texts === false) return;
    r.texts = {};
    var w = words(resolve.resolver(doDir, lang));
    var extra = extraTexts(lang.code);
    Object.keys(extra).forEach(function(key) {
      if(!manifest.texts[key]) r.notes.push('extra/' + lang.code + '/texts.txt has ' + key + ', which manifest.json doesn\'t map');
    });
    keys.forEach(function(key) {
      var appUnits = app[key] || [];
      r.units += appUnits.length;
      var built = build(key, manifest.texts[key], lang, doDir, w, extra);
      built.notes.forEach(function(n) { r.notes.push(key + ': ' + n); });
      var missing = built.units.map(function(u) { return (u.match(/⟨[^⟩]*⟩/) || [])[0]; }).filter(Boolean);
      if(missing.length) {
        r.missing.push(key + ': ' + missing.filter(function(m, i) { return missing.indexOf(m) === i; }).join(', ').replace(/[⟨⟩]/g, ''));
        return;
      }
      var units = built.units.map(function(u, i) { return markers(u, appUnits[i]); });
      if(units.length !== appUnits.length) r.counts.push(key + ': ' + units.length + ' units for the app\'s ' + appUnits.length);
      else r.ok++;
      // Only a chant's translation could ever be set under it (§7a, Phase 9).
      if(/\.gabc$/.test(key)) units.forEach(function(u, i) {
        var unsafe = u.match(UNSAFE);
        if(unsafe) r.unsafe.push(key + ':' + (i + 1) + ' ' + unsafe.join(' ') + ': ' + u.replace(/\n/g, ' / '));
      });
      r.translated += Math.min(units.length, appUnits.length);
      r.texts[key] = units;
    });
  });
  return report;
};

exports.THRESHOLD = THRESHOLD;
