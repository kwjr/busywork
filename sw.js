// ─────────────────────────────────────────────
//  Fieldwork Service Worker
//  Cache strategy:
//    Same-origin assets → Cache-first, populate on miss
//    Cross-origin (fonts) → Network-first, cache fallback
// ─────────────────────────────────────────────

const CACHE   = 'fieldwork-v1';
const OFFLINE = './index.html';

const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon.svg'
];

// ── Install: pre-cache core assets ──────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

// ── Activate: purge old caches ──────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ── Fetch ────────────────────────────────────
self.addEventListener('fetch', event => {
  // Ignore non-GET and browser-extension requests
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith('http')) return;

  const url = new URL(event.request.url);
  const isSameOrigin = url.origin === self.location.origin;

  if (isSameOrigin) {
    // Cache-first for same-origin assets
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request)
          .then(response => {
            if (response.ok) {
              const clone = response.clone();
              caches.open(CACHE).then(c => c.put(event.request, clone));
            }
            return response;
          })
          .catch(() => caches.match(OFFLINE));
      })
    );
  } else {
    // Network-first for cross-origin (Google Fonts, etc.)
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE).then(c => c.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
  }
});

// ── Notification click — focus or open the app ────────
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(list => {
        const existing = list.find(c => c.url.includes('fieldwork') || c.url.endsWith('/'));
        if (existing) return existing.focus();
        return clients.openWindow('./');
      })
  );
});
