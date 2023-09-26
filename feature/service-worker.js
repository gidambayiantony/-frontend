//  service-worker.js code for caching assets
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('my-cache').then(function (cache) {
      return cache.addAll([
        '/index.html',
        '/_next/static/chunks/main.js',
        '/_next/static/chunks/pages/index.js',
        '/_next/static/chunks/framework.js',
        '/_next/static/chunks/webpack.js',
        '/_next/static/chunks/commons.js',
        '/_next/static/chunks/styles.js',
        '/_next/static/css/styles.css',
        '/images/logo.png',
      ]);
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});

