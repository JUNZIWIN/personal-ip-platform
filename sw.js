const CACHE_NAME = 'bizatom-v1';
const STATIC_ASSETS = [
  '/',
  '/bizatom.html',
  '/bizatom-kb.js',
  '/manifest.json',
  '/bizatom-icon-192.png',
  '/bizatom-icon-512.png',
  '/bizatom-icon-180.png'
];

// Install: cache core static assets for offline use
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: stale-while-revalidate strategy
// Serve from cache instantly, then update cache in background
self.addEventListener('fetch', (event) => {
  // Skip API calls - always go to network
  if (event.request.url.includes('/api/')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetchPromise = fetch(event.request).then((response) => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
          });
        }
        return response;
      }).catch(() => cached);

      // Return cached immediately, fallback to network
      return cached || fetchPromise;
    })
  );
});
