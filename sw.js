const CACHE_NAME = 'phantom-onocha-v5';
const ASSETS = [
  './','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./apple-touch-icon.png','./logo.png','./icons/aero.png','./icons/agt.png','./icons/avatar.png','./icons/baba.png','./icons/btc.png','./icons/cash.png','./icons/cost.png','./icons/crwv.png','./icons/dacity.png','./icons/eth.png','./icons/float.png','./icons/hype.png','./icons/kgen.png','./icons/kioxia.png','./icons/max.png','./icons/meta.png','./icons/mihao.png','./icons/msftx.png','./icons/mstrx.png','./icons/nbis.png','./icons/nvda.png','./icons/opg.png','./icons/prl.png','./icons/skhy.png','./icons/sndk.png','./icons/sol.png','./icons/spcxc.png','./icons/spcxx.png','./icons/splash-ghost.png','./icons/stonk.png','./icons/ttwo.png','./icons/xrp.png'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request)
      .then((networkRes) => {
        const clone = networkRes.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
        return networkRes;
      })
      .catch(() => caches.match(e.request))
  );
});
