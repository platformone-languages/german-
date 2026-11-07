/* Platform One service worker: works offline, keeps sound files once played, shows the daily reminder.
   Pages always come fresh from the site when online (so updates reach everyone); the saved copy is only for offline.
   Sound files are kept: a changed sound file always gets a new name, so a kept one is never out of date. */
const CACHE="p1-2026-11-07-1", AUDIO="p1-audio";
const SHELL=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL.map(u=>new Request(u,{cache:"reload"})))));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("p1-")&&k!==CACHE&&k!==AUDIO).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!=="GET"||u.origin!==location.origin)return;
  if(/\/audio\d*\//.test(u.pathname)){e.respondWith(caches.open(AUDIO).then(async c=>{const hit=await c.match(e.request);if(hit)return hit;const r=await fetch(e.request);if(r.ok)c.put(e.request,r.clone());return r}));return}
  if(/\/version\.json$/.test(u.pathname))return;                     // always straight from the site
  const nav=e.request.mode==="navigate";
  e.respondWith(fetch(u.href,{cache:"no-store",credentials:"same-origin"}).then(r=>{if(r.ok){const a=r.clone(),b2=r.clone();caches.open(CACHE).then(c=>nav?Promise.all([c.put("index.html",a),c.put("./",b2)]):c.put(e.request,a))}return r})
    .catch(()=>(nav?caches.match("index.html"):caches.match(e.request,{ignoreSearch:true})).then(r=>r||caches.match("index.html"))))});
self.addEventListener("periodicsync",e=>{if(e.tag==="daily-reminder")e.waitUntil(self.registration.showNotification("Time for German",{body:"About 20 minutes with Platform One. Today shows what to do.",icon:"icon-192.png",badge:"icon-192.png",tag:"daily"}))});
self.addEventListener("notificationclick",e=>{e.notification.close();e.waitUntil(self.clients.matchAll({type:"window"}).then(ws=>{for(const w of ws){if("focus" in w)return w.focus()}return self.clients.openWindow("./")}))});
