/* offline-minimi */
const CACHE_NAME = "crossfire-v3";
const FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon192.png",
  "./pirates_crossfire_pulmasetti.json",
  "./navy_ship.svg",
  "./navy_ship_sinking.svg",
  "./pirate_ship.svg",
  "./pirate_ship_sinking.svg"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => (k === CACHE_NAME ? null : caches.delete(k))))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(()=>cached))
  );
});
