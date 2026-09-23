/* Service worker YouthSpeak Case
   VERSION a incrementer a chaque livraison.
   Strategie : pages/CSS/JS/manifeste = reseau d'abord ; images = cache d'abord ;
   jamais la video ni l'audio ; jamais mettre en cache une reponse en erreur ;
   page hors ligne dediee (jamais un repli sur l'accueil en cache). */
const VERSION = 'ysc-v1';
const OFFLINE_URL = '/offline.html';
const PRECACHE = [OFFLINE_URL, '/icons/icon-192.png'];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    await cache.addAll(PRECACHE);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

// Ne met en cache qu'une reponse reelle et reussie (jamais une erreur ni un opaque).
async function putIfOk(request, response) {
  if (response && response.ok && response.status === 200 && response.type === 'basic') {
    const cache = await caches.open(VERSION);
    cache.put(request, response.clone());
  }
  return response;
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;           // on laisse passer le cross-origin
  if (req.destination === 'video' || req.destination === 'audio') return; // jamais video/audio

  // Pages et navigations : reseau d'abord, repli cache, puis page hors ligne dediee.
  if (req.mode === 'navigate' || req.destination === 'document') {
    event.respondWith((async () => {
      try {
        return await putIfOk(req, await fetch(req));
      } catch (e) {
        return (await caches.match(req)) || (await caches.match(OFFLINE_URL)) || Response.error();
      }
    })());
    return;
  }

  // Images : cache d'abord, puis reseau.
  if (req.destination === 'image') {
    event.respondWith((async () => {
      const cached = await caches.match(req);
      if (cached) return cached;
      try { return await putIfOk(req, await fetch(req)); }
      catch (e) { return cached || Response.error(); }
    })());
    return;
  }

  // CSS, JS, manifeste et le reste : reseau d'abord, repli cache.
  event.respondWith((async () => {
    try { return await putIfOk(req, await fetch(req)); }
    catch (e) { return (await caches.match(req)) || Response.error(); }
  })());
});
