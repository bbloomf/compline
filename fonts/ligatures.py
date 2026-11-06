#!/usr/bin/env python3
# Adds the f-ligatures ff, fi, fl, ffi and ffl to fonts/crimson-roman-webfont.woff2 and .woff, so
# "Afflatu" has its ffl.  The subset (generator_config.txt) kept only onum of the full font's
# features, and the full font, Crimson 0.8, has the ligatures' glyphs but no liga feature to use
# them; so this copies the glyphs from the full font into the subset, as TrueType outlines like
# the subset's own, and adds a liga feature.  Nothing else in the subset changes.  Crimson 0.8's
# italic, bold and semibold have no ligature glyphs, so their subsets stay as they are.
#
#   python3 fonts/ligatures.py <dir>
#
# <dir> holds the full Crimson-Roman.otf (Sebastian Kosch's Crimson 0.8, SIL Open Font License).
# Needs fonttools and brotli (pip install fonttools brotli).  Run it once: it stops if the subset
# already has the ligatures.
import os
import sys
from fontTools.feaLib.builder import addOpenTypeFeaturesFromString
from fontTools.pens.cu2quPen import Cu2QuPen
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.ttLib import TTFont

# glyph: the letters it stands for, the longest first, as liga tries them in order
LIGATURES = [('f_f_i', 'f f i'), ('f_f_l', 'f f l'), ('f_f', 'f f'), ('f_i', 'f i'), ('f_l', 'f l')]


def main(full_dir):
    here = os.path.dirname(os.path.abspath(__file__))
    base_path = os.path.join(here, 'crimson-roman-webfont')
    font = TTFont(base_path + '.woff2')
    full = TTFont(os.path.join(full_dir, 'Crimson-Roman.otf'))
    if 'GSUB' in font or any(name in font['glyf'] for name, _ in LIGATURES):
        sys.exit('crimson-roman-webfont already has its ligatures')
    if font['head'].unitsPerEm != full['head'].unitsPerEm:
        sys.exit('the subset and the full font have different units per em')

    full_glyphs = full.getGlyphSet()
    for name, _ in LIGATURES:
        pen = TTGlyphPen(None)
        # the subset's outlines are quadratic, as Font Squirrel converted them
        full_glyphs[name].draw(Cu2QuPen(pen, max_err=1, reverse_direction=True))
        glyph = pen.glyph()
        # which also puts it at the end of the glyph order
        font['glyf'][name] = glyph
        glyph.recalcBounds(font['glyf'])
        font['hmtx'][name] = (full['hmtx'][name][0], glyph.xMin)
    # Font Squirrel's GDEF classes every glyph; the new ones are ligatures
    gdef = font['GDEF']
    gdef.table.GlyphClassDef.classDefs.update({name: 2 for name, _ in LIGATURES})

    addOpenTypeFeaturesFromString(font, 'languagesystem DFLT dflt;\nlanguagesystem latn dflt;\n'
                                  'feature liga {\n%s} liga;\n' % ''.join(
                                      '  sub %s by %s;\n' % (letters, name) for name, letters in LIGATURES))
    # which drops a GDEF it didn't build
    font['GDEF'] = gdef

    for flavor in ('woff2', 'woff'):
        font.flavor = flavor
        font.save(base_path + '.' + flavor)
        print('crimson-roman-webfont.%s: %d bytes' % (flavor, os.path.getsize(base_path + '.' + flavor)))


if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit('Usage: python3 fonts/ligatures.py <dir with the full Crimson-Roman.otf>')
    main(sys.argv[1])
