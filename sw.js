/* Service worker YouthSpeak Case
   VERSION a incrementer a chaque livraison.
   Strategie : pages/CSS/JS/manifeste = reseau d'abord ; images = cache d'abord ;
   jamais la video ni l'audio ; jamais mettre en cache une reponse en erreur ;
   page hors ligne dediee (jamais un repli sur l'accueil en cache pour une autre URL). */
const VERSION = 'ysc-v4';
const OFFLINE_URL = '/offline.html';

async function precache() {
  const cache = await caches.open(VERSION);
  // Icone (pas de redirection)
  try {
    const r = await fetch('/icons/icon-192.png');
    if (r && r.ok) await cache.put('/icons/icon-192.png', r.clone());
  } catch (e) {}
  // Page hors ligne : suivre la redirection 308 (Pages retire le .html) puis RECOPIER
  // la reponse dans une reponse neuve. Sinon une reponse "redirected" est interdite
  // comme repli d'une navigation et casse le mode hors ligne.
  try {
    const res = await fetch(OFFLINE_URL, { redirect: 'follow' });
    const body = await res.blob();
    const clean = new Response(body, {
      status: 200, statusText: 'OK',
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
    await cache.put(OFFLINE_URL, clean);
  } catch (e) {}
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => { await precache(); await self.skipWaiting(); })());
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
  if (url.origin !== self.location.origin) return;               // laisse passer le cross-origin
  if (req.destination === 'video' || req.destination === 'audio') return; // jamais video/audio

  // Pages et navigations : reseau d'abord.
  // Hors ligne : la racine sert la racine en cache, toute autre URL sert la page hors ligne dediee.
  // On ne met en cache QUE la racine, pour ne jamais cacher un repli monopage sous une fausse URL.
  if (req.mode === 'navigate' || req.destination === 'document') {
    event.respondWith((async () => {
      try {
        const net = await fetch(req);
        if (net && net.ok && net.type === 'basic' && url.pathname === '/') {
          const cache = await caches.open(VERSION);
          cache.put('/', net.clone());
        }
        return net;
      } catch (e) {
        if (url.pathname === '/') {
          const home = await caches.match('/');
          if (home) return home;
        }
        return (await caches.match(OFFLINE_URL)) || Response.error();
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
