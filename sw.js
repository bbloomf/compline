var CACHE_NAME = 'compline-cache-v1';
var urlsToCache = [
'./',
'./adjutorium-nostrum.gabc',
'./benedicamus-domino.gabc',
'./blessing.gabc',
'./calendar.js',
'./canticle-ant-po.gabc',
'./canticle-ant-pt.gabc',
'./canticle-ant.gabc',
'./canticle-psalm-asd.gabc',
'./canticle-psalm-asd.html',
'./canticle-psalm-po.gabc',
'./canticle-psalm-po.html',
'./canticle-psalm.gabc',
'./canticle-psalm.html',
'./chant-element.js',
'./compline.js',
'./converte-nos.gabc',
'./custodi-nos-advent.gabc',
'./custodi-nos-pt.gabc',
'./custodi-nos.gabc',
'./deus-in-adjutorium_alleluia.gabc',
'./deus-in-adjutorium_laus-tibi.gabc',
'./deus-in-adjutorium.gabc',
'./haec-dies.gabc',
'./jube-domine.gabc',
'./jube-domne.gabc',
'./lesson.gabc',
'./style.css',
'./fallback/document-register-element.js',
'./fallback/exsurge.js',
'./fallback/jquery.min.js',
'./fallback/moment.min.js',
'./in-manus-tuas/advent_full.gabc',
'./in-manus-tuas/advent.gabc',
'./in-manus-tuas/ordinary_full.gabc',
'./in-manus-tuas/ordinary.gabc',
'./in-manus-tuas/passiontide_full.gabc',
'./in-manus-tuas/passiontide.gabc',
'./in-manus-tuas/pt_full.gabc',
'./in-manus-tuas/pt.gabc',
'./marian-antiphon/alma-redemptoris-mater-solemn.gabc',
'./marian-antiphon/alma-redemptoris-mater.gabc',
'./marian-antiphon/ave-regina-caelorum-solemn.gabc',
'./marian-antiphon/ave-regina-caelorum.gabc',
'./marian-antiphon/regina-caeli-solemn.gabc',
'./marian-antiphon/regina-caeli.gabc',
'./marian-antiphon/salve-regina-solemn.gabc',
'./marian-antiphon/salve-regina.gabc',
'./psalms/ant-PT.gabc',
'./psalms/0/ant.gabc',
'./psalms/0/psalm-PT.gabc',
'./psalms/0/psalm-PT_full.gabc',
'./psalms/0/psalm-verses-PT.html',
'./psalms/0/psalm-verses-triduum.html',
'./psalms/0/psalm-verses.html',
'./psalms/0/psalm.gabc',
'./psalms/0/psalm_full.gabc',
'./psalms/1/ant.gabc',
'./psalms/1/psalm-PT.gabc',
'./psalms/1/psalm-PT_full.gabc',
'./psalms/1/psalm-verses-PT.html',
'./psalms/1/psalm-verses.html',
'./psalms/1/psalm.gabc',
'./psalms/1/psalm_full.gabc',
'./psalms/2/ant.gabc',
'./psalms/2/psalm-PT.gabc',
'./psalms/2/psalm-PT_full.gabc',
'./psalms/2/psalm-verses-PT.html',
'./psalms/2/psalm-verses.html',
'./psalms/2/psalm.gabc',
'./psalms/2/psalm_full.gabc',
'./psalms/3/ant.gabc',
'./psalms/3/psalm-PT.gabc',
'./psalms/3/psalm-PT_full.gabc',
'./psalms/3/psalm-verses-PT.html',
'./psalms/3/psalm-verses.html',
'./psalms/3/psalm.gabc',
'./psalms/3/psalm_full.gabc',
'./psalms/4/ant.gabc',
'./psalms/4/psalm-PT.gabc',
'./psalms/4/psalm-PT_full.gabc',
'./psalms/4/psalm-verses-PT.html',
'./psalms/4/psalm-verses.html',
'./psalms/4/psalm.gabc',
'./psalms/4/psalm_full.gabc',
'./psalms/5/ant.gabc',
'./psalms/5/psalm-PT.gabc',
'./psalms/5/psalm-PT_full.gabc',
'./psalms/5/psalm-verses-PT.html',
'./psalms/5/psalm-verses.html',
'./psalms/5/psalm.gabc',
'./psalms/5/psalm_full.gabc',
'./psalms/6/ant.gabc',
'./psalms/6/psalm-PT.gabc',
'./psalms/6/psalm-PT_full.gabc',
'./psalms/6/psalm-verses-PT.html',
'./psalms/6/psalm-verses.html',
'./psalms/6/psalm.gabc',
'./psalms/6/psalm_full.gabc',
'./psalms/asd/psalm-verses.html',
'./psalms/asd/psalm.gabc',
'./te-lucis/Advent.gabc',
'./te-lucis/Ascension.gabc',
'./te-lucis/Christ-the-King.gabc',
'./te-lucis/Christmas.gabc',
'./te-lucis/Easter-solesmes.gabc',
'./te-lucis/Easter.gabc',
'./te-lucis/Epiphany.gabc',
'./te-lucis/Ferial.gabc',
'./te-lucis/Holy-Family.gabc',
'./te-lucis/Lent.gabc',
'./te-lucis/Ordinary.gabc',
'./te-lucis/Our-Lady.gabc',
'./te-lucis/Passiontide.gabc',
'./te-lucis/Pentecost.gabc',
'./te-lucis/Sacred-Heart.gabc',
'./te-lucis/Seven-Dolors.gabc',
'./te-lucis/Solemn.gabc',
'./te-lucis/Transfiguration.gabc'
];

// Set the callback for the install step
self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
  caches.open(CACHE_NAME)
    .then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});