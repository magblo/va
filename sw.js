// Sparar appen i telefonen så att den fungerar även utan täckning efter första besöket.
const V='vandra-aland-v7';
const CORE=["./", "index.html", "manifest.webmanifest", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "tumme/2122015.jpg", "tumme/2122021.jpg", "tumme/2122033.jpg", "tumme/2122058.jpg", "tumme/2122060.jpg", "tumme/2122106.jpg", "tumme/2122110.jpg", "tumme/2122121.jpg", "tumme/2122130.jpg", "tumme/2122133.jpg", "tumme/2122135.jpg", "tumme/2122160.jpg", "tumme/2122164.jpg", "tumme/2122169.jpg", "tumme/2122170.jpg", "tumme/2122173.jpg", "tumme/2122176.jpg", "tumme/2122207.jpg", "tumme/2122212.jpg", "tumme/2122221.jpg", "tumme/2122224.jpg", "tumme/2122233.jpg", "tumme/2122237.jpg", "tumme/2122248.jpg", "tumme/2122265.jpg", "tumme/2122277.jpg", "tumme/2122300.jpg", "tumme/2122301.jpg", "tumme/2122328.jpg", "tumme/2122361.jpg", "tumme/2122384.jpg", "tumme/2122388.jpg", "tumme/2122404.jpg", "tumme/2122405.jpg", "tumme/2122409.jpg", "tumme/2444773.jpg", "tumme/2444886.jpg", "tumme/2654027.jpg", "tumme/2654030.jpg", "foto/2122015.jpg", "foto/2122021.jpg", "foto/2122033.jpg", "foto/2122058.jpg", "foto/2122060.jpg", "foto/2122106.jpg", "foto/2122110.jpg", "foto/2122121.jpg", "foto/2122130.jpg", "foto/2122133.jpg", "foto/2122135.jpg", "foto/2122160.jpg", "foto/2122164.jpg", "foto/2122169.jpg", "foto/2122170.jpg", "foto/2122173.jpg", "foto/2122176.jpg", "foto/2122207.jpg", "foto/2122212.jpg", "foto/2122221.jpg", "foto/2122224.jpg", "foto/2122233.jpg", "foto/2122237.jpg", "foto/2122248.jpg", "foto/2122265.jpg", "foto/2122277.jpg", "foto/2122300.jpg", "foto/2122301.jpg", "foto/2122328.jpg", "foto/2122361.jpg", "foto/2122384.jpg", "foto/2122388.jpg", "foto/2122404.jpg", "foto/2122405.jpg", "foto/2122409.jpg", "foto/2444773.jpg", "foto/2444886.jpg", "foto/2654027.jpg", "foto/2654030.jpg"];
const EXT=['https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.allSettled([...CORE,...EXT].map(u=>c.add(u)))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET')return;
  const u=new URL(r.url);
  const cacheable=u.origin===location.origin||u.hostname==='cdnjs.cloudflare.com'||u.hostname.endsWith('gstatic.com')||u.hostname==='fonts.googleapis.com';
  if(!cacheable)return;
  if(r.mode==='navigate'){
    e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put('index.html',cp));return res}).catch(()=>caches.match('index.html')));
    return;
  }
  e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{if(res.ok||res.type==='opaque'){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res})));
});
