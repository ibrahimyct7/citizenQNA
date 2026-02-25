const CACHE_NAME = 'civics-app-v1';
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './questions.js'
];

// Install the Service Worker and save the files to the device
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Load the app from the device if offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
