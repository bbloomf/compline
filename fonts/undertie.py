#!/usr/bin/env python3
# Makes fonts/crimson-undertie.woff2 and .woff (TRANSLATIONS_PLAN.md §4 "Fonts" and §7i): the undertie
# ‿ (U+203F), which joins two words' vowels sung on one note in the hymn sung in Spanish, and which
# Crimson hasn't.  The glyph is drawn here, a thin arc under the gap between the two words, reaching
# a little under the letters either side, in a font with the vertical metrics of the app's roman
# subset, crimson-roman-webfont.  style.css gives it the unicode-range U+203F, so a browser downloads
# it only for a page that has one.
#
#   python3 fonts/undertie.py
#
# Needs fonttools and brotli (pip install fonttools brotli).
import os
from fontTools.fontBuilder import FontBuilder
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.ttLib import TTFont

HERE = os.path.dirname(os.path.abspath(__file__))
base = TTFont(os.path.join(HERE, 'crimson-roman-webfont.woff'))
upm = base['head'].unitsPerEm
em = lambda x: round(x * upm)

# The arc: its ends at the baseline's depth, its middle lower, thicker in the middle than at the ends.
ADVANCE = 0.22
LEFT, RIGHT = -0.07, ADVANCE + 0.07
TOP, BOTTOM = -0.07, -0.17
THICK = 0.035

pen = TTGlyphPen(None)
mid = (LEFT + RIGHT) / 2
pen.moveTo((em(LEFT), em(TOP)))
pen.qCurveTo((em(mid), em(2 * BOTTOM - TOP - THICK)), (em(RIGHT), em(TOP)))
pen.lineTo((em(RIGHT - 0.012), em(TOP + 0.004)))
pen.qCurveTo((em(mid), em(2 * BOTTOM - TOP + THICK)), (em(LEFT + 0.012), em(TOP + 0.004)))
pen.closePath()
undertie = pen.glyph()
empty = TTGlyphPen(None).glyph()

fb = FontBuilder(upm, isTTF=True)
fb.setupGlyphOrder(['.notdef', 'uni203F'])
fb.setupCharacterMap({0x203F: 'uni203F'})
fb.setupGlyf({'.notdef': empty, 'uni203F': undertie})
fb.setupHorizontalMetrics({'.notdef': (0, 0), 'uni203F': (em(ADVANCE), em(LEFT))})
hhea = base['hhea']
fb.setupHorizontalHeader(ascent=hhea.ascent, descent=hhea.descent)
os2 = base['OS/2']
fb.setupOS2(sTypoAscender=os2.sTypoAscender, sTypoDescender=os2.sTypoDescender, sTypoLineGap=os2.sTypoLineGap,
            usWinAscent=os2.usWinAscent, usWinDescent=os2.usWinDescent)
fb.setupNameTable({'familyName': 'Crimson Text', 'styleName': 'Regular'})
fb.setupPost()
for flavor in ('woff2', 'woff'):
    fb.font.flavor = flavor
    out = os.path.join(HERE, 'crimson-undertie.' + flavor)
    fb.font.save(out)
    print(out, os.path.getsize(out), 'bytes')
