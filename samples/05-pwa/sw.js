let dataCacheName = 'devfest-v1';
let cacheName = 'devfest-1';
let filesToCache = [
  '/',
  '/index.html',
  '/webassembly.js',
  '/webassembly.wasm'
];

self.addEventListener('install', (e) => {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', (e) => {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );

  return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  console.log('[Service Worker] Fetch', e.request.url);

  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});