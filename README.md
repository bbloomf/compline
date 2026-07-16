compline
========

The Traditional office of Compline in HTML and GABC

This is still a work in progress, but you can see it in its current form [here](http://bbloomf.github.io/compline/).

I mostly just need to clean up the code, and make the calendar code more re-usable.

## Printable reference booklet

`scripts/build-booklet.js` generates `compline-booklet.pdf`: a printable
booklet with the complete office of Compline for each day of the week
(Sunday–Saturday, in the ordinary/default form used through most of the
year), plus an appendix of the alternate hymns, responsories, and antiphons
used in other seasons and on feast days (the tones of *Te Lucis Ante
Terminum*, the forms of *In Manus Tuas*, the four seasonal antiphons of Our
Lady, the Paschal-time canticle, and full alternate forms of Compline for
the Sacred Triduum and All Souls' Day).

It works by driving the actual web app in headless Chromium (via
[Playwright](https://playwright.dev/)) for a representative set of dates, so
that the site's own calendar and chant-rendering logic (`js/calendar.js`,
`js/chant-element.js`, `exsurge.js`) decides what belongs on each day and
lays out the GABC chant into notation, exactly as it does in a browser.
The rendered output is then reassembled into one static, paginated document
and printed to PDF.

To (re)generate the booklet:

```
npm install
npm run build:booklet
```

This requires Playwright's Chromium browser to be available (`npx
playwright install chromium` if it isn't already). The build spins up a
temporary local static server, so no separate server needs to be running.