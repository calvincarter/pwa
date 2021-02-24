// install event handler
self.addEventListener('install', event => {
  console.log('Install');

  // pre cache all static assets
  const cacheResources = async () => {
    const cache = await caches.open('static');
    return cache.addAll([
      './',
      './index.html',
      './assets/css/style.css',
      './assets/images/brandenburg.jpg',
      './assets/images/reichstag.jpg',
      './assets/images/map.jpg',
    ]);
  }

  event.waitUntil(cacheResources());

  self.skipWaiting();
});

// retrieve assets from cache
self.addEventListener('fetch', event => {

  const handleResourceRequest = async (event) => {
    const matchedCache = await caches.match(event.request);
    return matchedCache ||  await fetch(event.request);
  }

  event.respondWith(handleResourceRequest(event));
});
