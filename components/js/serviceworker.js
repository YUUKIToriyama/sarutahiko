/* serviceworker.js */
const CACHE_NAME = "sarutahiko-geo-cache";
const urlsToCache = [
	"/index.html",
	"/manifest.json",
	"/components/css/common.css",
	"/components/js/serviceworker.js",
	"/components/js/mapDisplay.js"
];

self.addEventListener("install", event => {
	event.waitUntil(
		caches.open(CACHE_NAME).then(cache => {
			return cache.addAll(urlToCache);
		})
	);
});

self.addEventListener("fetch", event => {
	event.respondWith(
		caches.match(event.request).then(response => {
			return response ? response : fetch(event.request);
		})
	);
});
