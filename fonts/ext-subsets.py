#!/usr/bin/env python3
# Makes fonts/crimson-<style>-ext.woff2 and .woff (TRANSLATIONS_PLAN.md §4 "Fonts"): the Latin
# letters and punctuation that the full Crimson has and the app's subsets (crimson-<style>-webfont,
# basic Latin plus the Latin accents, generator_config.txt) haven't, for the translations: à ç ê ñ
# ¿ ł ő ș and so on.  And fonts/crimson-<style>-vi.woff2 and .woff: the letters only Vietnamese
# uses (Latin Extended Additional and the combining marks).  style.css gives each a unicode-range
# of exactly what it holds, so a browser downloads one only for a page that uses one of its
# characters.
#
#   python3 fonts/ext-subsets.py <dir>
#
# <dir> holds the full fonts, Crimson-Roman.otf, Crimson-Italic.otf, Crimson-Bold.otf and
# Crimson-Semibold.otf (Sebastian Kosch's Crimson 0.8, SIL Open Font License).  Needs fonttools and
# brotli (pip install fonttools brotli).  It prints the unicode-range of each for style.css.
import os
import sys
from fontTools import subset
from fontTools.ttLib import TTFont

STYLES = [('roman', 'Roman'), ('italic', 'Italic'), ('bold', 'Bold'), ('semibold', 'Semibold')]

# The scripts the translations need: Latin and its punctuation, not Greek or Cyrillic, which the
# full fonts also have; Vietnamese apart.
SUBSETS = [
    ('ext', [(0x0020, 0x02FF), (0x2000, 0x206F), (0x20A0, 0x20CF), (0x2100, 0x214F)]),
    ('vi', [(0x0300, 0x036F), (0x1E00, 0x1EFF)])
]


def ranges(codes):
    """U+E0-E5,U+E7: codes as CSS unicode-range."""
    out = []
    codes = sorted(codes)
    start = prev = codes[0]
    for c in codes[1:] + [None]:
        if c is not None and c == prev + 1:
            prev = c
            continue
        out.append('U+%X' % start if start == prev else 'U+%X-%X' % (start, prev))
        if c is not None:
            start = prev = c
    return ','.join(out)


def main(full_dir):
    here = os.path.dirname(os.path.abspath(__file__))
    for name, full_name in STYLES:
        base = TTFont(os.path.join(here, 'crimson-%s-webfont.woff2' % name))
        full_path = os.path.join(full_dir, 'Crimson-%s.otf' % full_name)
        has = set(base.getBestCmap())
        full = TTFont(full_path).getBestCmap()
        for suffix, blocks in SUBSETS:
            codes = [c for c in full if c not in has and any(a <= c <= b for a, b in blocks)]
            make(full_path, base, codes, os.path.join(here, 'crimson-%s-%s' % (name, suffix)))
            print('crimson-%s-%s: %d characters, %d bytes\n  unicode-range: %s;' % (
                name, suffix, len(codes), os.path.getsize(os.path.join(here, 'crimson-%s-%s.woff2' % (name, suffix))),
                ranges(codes)))


def make(full_path, base, codes, out):
    """out.woff2 and out.woff: codes from the full font, with base's vertical metrics."""
    for flavor in ('woff2', 'woff'):
        options = subset.Options()
        options.flavor = flavor
        # no kerning, as the app's subsets have none (generator_config.txt)
        options.layout_features = [f for f in options.layout_features if f != 'kern']
        options.drop_tables += ['kern']
        options.name_IDs = ['*']
        options.notdef_outline = True
        font = subset.load_font(full_path, options)
        subsetter = subset.Subsetter(options)
        subsetter.populate(unicodes=codes)
        subsetter.subset(font)
        # The subsets' vertical metrics (Font Squirrel's "fix_vertical_metrics"), so a line
        # with these letters is no taller than one without.
        scale = font['head'].unitsPerEm / base['head'].unitsPerEm
        for table, fields in (('hhea', ('ascent', 'descent', 'lineGap')),
                              ('OS/2', ('sTypoAscender', 'sTypoDescender', 'sTypoLineGap',
                                        'usWinAscent', 'usWinDescent'))):
            for field in fields:
                setattr(font[table], field, round(getattr(base[table], field) * scale))
        subset.save_font(font, out + '.' + flavor, options)


if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit('Usage: python3 fonts/ext-subsets.py <dir with the full Crimson .otf files>')
    main(sys.argv[1])
