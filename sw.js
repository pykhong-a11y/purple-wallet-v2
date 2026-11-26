const C = 'pywallet-v319';
const ASSETS = ['./','./index.html','./manifest.json','./icon.png','./logos/shopee.png','./logos/grab.png','./logos/public.png','./logos/cimb.png','./logos/tng.png','./logos/hlb.png'];
const scope = self.registration.scope;
self.addEventListener('install', e => e.waitUntil((async () => {
  const cache = await caches.open(C);
  await cache.addAll(ASSETS.map(path => new Request(new URL(path, scope), {cache:'reload'})));
  await self.skipWaiting();
})()));
self.addEventListener('activate', e => e.waitUntil((async () => {
  for (const name of await caches.keys()) {
    if (name !== C && /^pywallet-v\d+$/.test(name)) {
      const old = await caches.open(name);
      const keys = await old.keys();
      // Remove only entries belonging to this installation's URL scope.
      for (const request of keys) if (request.url.startsWith(scope)) await old.delete(request);
      if (!(await old.keys()).length) await caches.delete(name);
    }
  }
  await self.clients.claim();
})()));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || !e.request.url.startsWith(scope)) return;
  e.respondWith((async () => {
    const cache = await caches.open(C);
    try {
      const response = await fetch(e.request);
      if (response.ok && ASSETS.some(path => new URL(path, scope).href === e.request.url)) {
        try { await cache.put(e.request, response.clone()); } catch (_) {}
      }
      return response;
    } catch (_) {
      return await cache.match(e.request) || (e.request.mode === 'navigate' ? await cache.match(new URL('./index.html', scope).href) : undefined) || Response.error();
    }
  })());
});
