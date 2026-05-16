// ========================================
// CACHE NAME
// ========================================
const CACHE_NAME = "tcm-accounting-cache-v20";


// ========================================
// FILES TO CACHE
// ========================================
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",

   "./assets/tcm192.png",
  "./assets/tcm512.png"
];


// ========================================
// INSTALL SERVICE WORKER
// ========================================
self.addEventListener("install", (event) => {

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();

});


// ========================================
// ACTIVATE SERVICE WORKER
// ========================================
self.addEventListener("activate", (event) => {

  event.waitUntil(

    caches.keys().then((cacheNames) => {

      return Promise.all(

        cacheNames.map((cache) => {

          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }

        })

      );

    })

  );

  self.clients.claim();

});


// ========================================
// FETCH CACHE
// ========================================
self.addEventListener("fetch", (event) => {

  event.respondWith(

    caches.match(event.request).then((response) => {

      return response || fetch(event.request);

    })

  );

});
