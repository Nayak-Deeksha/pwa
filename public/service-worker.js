var CACHE_NAME = "my-pwa-cache-v1";

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      // Get the assets manifest so we can see what our js file is named
      // This is because webpack hashes it
      fetch("asset-manifest.json")
        .then((response) => {
          response.json();
        })
        .then(() => {
          const urlsToCache = ["/App.css", "/App.js"];
          cache.addAll(urlsToCache);
        });
    })
  );
});

// Delete old caches that are not our current one!
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (!cacheWhitelist.includes(key)) {
            console.log("Deleting cache: " + key);
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// When the webpage goes to fetch files, we intercept that request and serve up the matching files
// if we have them
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request.url).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
