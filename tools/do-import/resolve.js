// Phase 3: reading a DO section the way DO itself does (TRANSLATIONS_PLAN.md §2, "Format quirks"),
// for the 1960 Roman office at Compline.  It follows web/cgi-bin/DivinumOfficium/SetupString.pl:
// a section or line conditioned "(rubrica …)" is kept or dropped as DO would for the version
// 'Rubrics 1960 - 1960', and @file:section:subs, $Name and &macro lines are replaced by what they
// name.  Each section is resolved in its own language; nothing is borrowed from another, except
// a section that Latin has only as references (DO's prefer_latin_inclusion), which is resolved
// in the language, and the folder a language names as its fallback.
'use strict';
var text = require('./text');

var VERSION = 'Rubrics 1960 - 1960';

// The subjects a condition can test, as SetupString.pl's %subjects, for Compline in 1960.
// Those that depend on the day (tempore, die, …) are empty: the manifest picks the seasonal
// texts itself.
var SUBJECTS = {
  rubricis: VERSION, rubrica: VERSION, tempore: '', missa: '', communi: VERSION, hora: 'Completorium',
  die: '', feria: '', commune: '', votiva: '', officio: '', ad: 'Completorium', mense: '', anno: '',
  dioecesis: '', lectione: '', lectio: '', toni: '', tonus: ''
};
var PREDICATES = {
  tridentina: function(s) { return /Trident/.test(s); },
  monastica: function(s) { return /Monastic/.test(s); },
  innovata: function(s) { return /2020 USA|NewCal/i.test(s); },
  innovatis: function(s) { return /2020 USA|NewCal/i.test(s); },
  'summorum pontificum': function(s) { return /194[2-9]|195[45]|196/.test(s); }
};

// Whether a condition holds: "rubrica 196 aut rubrica 1955", "rubrica monastica nisi …".
// SetupString.pl's vero().
var vero = function(condition, version) {
  condition = condition.trim();
  if(!condition) return true;
  var subjects = Object.assign({}, SUBJECTS, version ? {rubrica: version, rubricis: version, communi: version} : {});
  return condition.split(/\baut\b/).some(function(alternative) {
    var negation = false;
    return alternative.split(/\b(et|nisi)\b/).every(function(part) {
      if(part === 'nisi') negation = true;
      if(part === 'et' || part === 'nisi') return true;
      part = part.trim().replace(/\s+/g, ' ');
      if(!part) return true;
      var words = part.split(' ');
      var subject = words[0], predicate = words.slice(1).join(' ');
      if(!predicate) {
        predicate = subject;
        subject = '';
      }
      if(subject && !(subject.toLowerCase() in subjects)) {
        predicate = subject + ' ' + predicate;
        subject = '';
      }
      var value = subjects[(subject || 'tempore').toLowerCase()];
      if(value === undefined) return false;
      var test = PREDICATES[predicate.toLowerCase()];
      var result;
      if(test) {
        result = test(value);
      } else {
        try {
          result = new RegExp(predicate, 'i').test(value);
        } catch(e) {
          result = value.toLowerCase().indexOf(predicate.toLowerCase()) >= 0;
        }
      }
      return result !== negation;
    });
  });
};

// The conditional directives inside a section, as SetupString.pl's process_conditional_lines.
var STOPWORDS = {sed: 1, vero: 1, atque: 2, attamen: 3, si: 0, deinde: 1};
var BACKSCOPED = {sed: true, vero: true, atque: true, attamen: true};
var SCOPE_NULL = 0, SCOPE_LINE = 1, SCOPE_CHUNK = 2, SCOPE_NEST = 3;
var SCOPE = '(?:\\bloco\\s+(?:hu[ij]us\\s+versus|horum\\s+versuum)\\b)?\\s*(?:\\b(?:(?:dicitur|dicuntur)(?:\\s+semper)?|' +
  '(?:hic\\s+versus\\s+)?omittitur|(?:hoc\\s+versus\\s+)?omittitur|(?:hæc\\s+versus\\s+)?omittuntur|' +
  '(?:hi\\s+versus\\s+)?omittuntur|(?:haec\\s+versus\\s+)?omittuntur)\\b)?';
var CONDITIONAL = '\\(\\s*((?:(?:sed|vero|atque|attamen|si|deinde)\\b\\s*)*)(.*?)(' + SCOPE + ')?\\s*\\)';
var CONDITIONAL_LINE = new RegExp('^\\s*' + CONDITIONAL + '\\s*(.*)$', 'i');
var BLANK = /^\s*_?\s*$/;

var parseConditional = function(stopwords, condition, scope, version) {
  var strength = 0, implicit = false;
  stopwords.toLowerCase().split(/\s+/).filter(Boolean).forEach(function(word) {
    strength += STOPWORDS[word] || 0;
    if(BACKSCOPED[word]) implicit = true;
  });
  var backscope = /versuum|omittuntur/i.test(scope) ? SCOPE_NEST :
    /versus|omittitur/i.test(scope) ? SCOPE_CHUNK :
    !/semper/i.test(scope) && implicit ? SCOPE_LINE : SCOPE_NULL;
  var forwardscope;
  if(/omittitur|omittuntur/i.test(scope)) forwardscope = SCOPE_NULL;
  else if(/dicuntur/i.test(scope)) forwardscope = backscope === SCOPE_CHUNK ? SCOPE_CHUNK : SCOPE_NEST;
  else forwardscope = backscope === SCOPE_CHUNK || backscope === SCOPE_NEST ? SCOPE_CHUNK : SCOPE_LINE;
  return {strength: strength, result: vero(condition, version), backscope: backscope, forwardscope: forwardscope};
};

var processConditionals = function(lines, version) {
  var AFFIRMATIVE = 1, NOT_YET = 0, DUMMY = 2;
  var output = [];
  var stack = [[AFFIRMATIVE, SCOPE_NEST]];
  var offsets = [-1];
  var top = function() { return stack[stack.length - 1]; };
  lines.forEach(function(line) {
    var match = line.match(CONDITIONAL_LINE);
    if(match) {
      var c = parseConditional(match[1] || '', match[2], match[3] || '', version);
      var strength = c.strength, result = c.result, forwardscope = c.forwardscope;
      line = match[4];
      var maxOffset = offsets.length - 1;
      if(top()[0] === AFFIRMATIVE || strength >= maxOffset) {
        if(strength >= maxOffset) stack = [];
        else if(strength >= maxOffset - (stack.length - 1)) stack.length = maxOffset - strength;
        if(result) {
          var fence = maxOffset >= strength ? offsets[strength] : -1;
          if(c.backscope === SCOPE_LINE) {
            if(output.length - 1 > fence) output.pop();
          } else if(c.backscope === SCOPE_CHUNK) {
            while(output.length - 1 > fence && !BLANK.test(output[output.length - 1])) output.pop();
            while(output.length - 1 > fence && BLANK.test(output[output.length - 1])) output.pop();
          } else if(c.backscope === SCOPE_NEST) {
            output.length = fence + 1;
          }
        }
        if(forwardscope === SCOPE_NULL) {
          forwardscope = SCOPE_NEST;
          result = true;
        }
        if(result) {
          for(var i = 0; i <= strength; i++) offsets[i] = output.length - 1;
        }
        while(strength < (offsets.length - 1) - (stack.length - 1) - 1) stack.push([DUMMY, forwardscope]);
        stack.push([result ? AFFIRMATIVE : NOT_YET, forwardscope]);
      }
      if(!line) return;
    }
    line = line.replace(/^~/, '');
    if(top()[0] === AFFIRMATIVE) output.push(line);
    while(top()[1] === SCOPE_LINE || (top()[1] === SCOPE_CHUNK && BLANK.test(line))) {
      do {
        stack.pop();
      } while(stack.length && top()[0] === DUMMY);
      if(!stack.length) stack.push([AFFIRMATIVE, SCOPE_NEST]);
    }
  });
  return output;
};

// A DO file's sections for the version, {name: [line, …]}, as setupstring_parse_file: a section
// whose header has a condition that doesn't hold is left out, and a later section of the same
// name replaces an earlier one.  @ lines get their file and section filled in.
var parsed = {};
var parse = function(doDir, folder, file, version) {
  version = version || VERSION;
  var id = [folder, file, version].join('|');
  if(id in parsed) return parsed[id];
  var source = text.read(doDir, folder, file + '.txt');
  if(source === null) return (parsed[id] = null);
  var sections = {};
  var key = null, use = false;
  source.split('\n').forEach(function(line) {
    var header = line.match(new RegExp('^\\s*\\[([\\p{L}\\p{N}_ #,:-]+)\\](?:\\s*' + CONDITIONAL + ')?', 'iu'));
    if(line[0] === '[' && header) {
      var condition = header[3];
      use = !condition || vero(condition, version);
      if(use) {
        key = header[1];
        sections[key] = [];
      }
      return;
    }
    if(!use || key === null) return;
    line = line.replace(/\s+$/, '');
    if(line[0] === '@') {
      var inc = line.match(/^\s*@([^\n:]+)?(?::([^\n:]+?))?[^\S\n\r]*(?::(.*))?$/);
      if(inc) line = '@' + (inc[1] || file) + ':' + (inc[2] || key) + (inc[3] ? ':' + inc[3] : '');
    }
    sections[key].push(line);
  });
  Object.keys(sections).forEach(function(name) {
    sections[name] = processConditionals(sections[name], version);
  });
  return (parsed[id] = sections);
};

// A section that is nothing but @ references (DO's pure_inclusion).
var pureInclusion = function(lines) {
  var real = lines.filter(function(l) { return /\S/.test(l) && !/^\s*!/.test(l); });
  return real.length > 0 && real.every(function(l) { return /^\s*@/.test(l); });
};

// Line selection and substitutions after an @ reference: "2", "3-4", "!1", "s/x/y/g", in turn,
// as SetupString.pl's do_inclusion_substitutions.  The text is lines joined by \n.
var substitute = function(textIn, subs) {
  var t = textIn;
  var pattern = /(?:s\/([^\/]*)\/([^\/]*)\/([gism]*))|(?:(!?)(\d+)(-(\d+))?)/g, m;
  while((m = pattern.exec(subs || ''))) {
    if(m[5]) {
      var start = parseInt(m[5]) - 1;
      var length = m[7] ? parseInt(m[7]) - start : 1;
      var lines = t.split('\n');
      var picked = lines.splice(start, length);
      t = (m[4] ? lines : picked).join('\n');
    } else {
      // Perl's $ also matches before a final newline; there is none here.  A backslash in the
      // replacement escapes the next character.
      var replacement = m[2].replace(/\\n/g, '\n').replace(/\\(.)/g, '$1');
      var flags = m[3].replace(/[^gims]/g, '');
      t = t.replace(new RegExp(m[1], flags), replacement);
    }
  }
  return t;
};

// The macros (&name) DO's Compline texts use, as the Prayers.txt sections they print.
var MACROS = {
  Gloria: 'Gloria', Gloria1: 'Gloria1', Alleluia: 'Alleluia:1', Dominus_vobiscum: 'Dominus:1-2',
  Dominus_vobiscum1: 'Dominus:1-2', Dominus_vobiscum2: 'Dominus:1-2', Benedicamus_Domino: 'Benedicamus Domino'
};
var PRAYERS = 'Psalterium/Common/Prayers';

// Resolves sections of one language.  lang: {folder, fallback}.  Missing references come out as
// a line '⟨missing file:section⟩', so the caller can tell what a text lacks.
exports.resolver = function(doDir, lang, version) {
  // A section's own lines, from the language, else from Latin where Latin has only references
  // (resolved in the language), else from the fallback folder; null if there is none.
  var find = function(folder, file, section) {
    var own = parse(doDir, folder, file, version);
    if(own && own[section]) return {folder: folder, lines: own[section]};
    if(folder !== 'Latin') {
      var latin = parse(doDir, 'Latin', file, version);
      if(latin && latin[section] && pureInclusion(latin[section])) return {folder: folder, lines: latin[section]};
    }
    return null;
  };
  var lookup = function(file, section) {
    var found = find(lang.folder, file, section);
    if(!found && lang.fallback) found = find(lang.fallback, file, section);
    return found;
  };
  var resolveLines = function(folder, file, lines, depth) {
    if(depth > 20) throw new Error('DO references too deep in ' + file);
    var out = [];
    lines.forEach(function(line) {
      var m;
      if((m = line.match(/^\s*@([^:]*):([^:]*)(?::(.*))?$/))) {
        out = out.concat(reference(m[1], m[2], m[3], depth));
      } else if((m = line.match(/^\s*\$(.+?)\s*$/)) && !/^rubrica\b/i.test(m[1])) {
        out = out.concat(reference(PRAYERS, m[1], '', depth));
      } else if((m = line.match(/^\s*&(\w+)\s*$/))) {
        var parts = MACROS[m[1]] && MACROS[m[1]].split(':');
        out = out.concat(parts ? reference(PRAYERS, parts[0], parts[1] || '', depth) : ['⟨no macro &' + m[1] + '⟩']);
      } else {
        out.push(line);
      }
    });
    return out;
  };
  // A section, resolved, with substitutions; as lines.
  var reference = function(file, section, subs, depth) {
    var found = lookup(file, section);
    if(!found) return ['⟨missing ' + file + ':' + section + '⟩'];
    var lines = resolveLines(found.folder, file, found.lines, (depth || 0) + 1);
    while(lines.length && !lines[lines.length - 1].trim()) lines.pop();
    if(!subs) return lines;
    var result = substitute(lines.join('\n'), subs);
    return result.split('\n');
  };
  return {reference: reference};
};

exports.VERSION = VERSION;
exports.PRAYERS = PRAYERS;
