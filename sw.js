const cacheVersion = "cache1";
const cacheFiles = [
	'/',
	'/css/styles.css',
	'/data/restaurants.json',
	'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
	'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
	'/img/1.jpg',
	'/img/2.jpg',
	'/img/3.jpg',
	'/img/4.jpg',
	'/img/5.jpg',
	'/img/6.jpg',
	'/img/7.jpg',
	'/img/8.jpg',
	'/img/9.jpg',
	'/img/10.jpg',
	'/index.html',
	'/js/dbhelper.js',
	'/js/main.js',
	'/js/restaurant_info.js',
	'/restaurant.html'
];

self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(cacheVersion).then(function (cache) {
			return cache.addAll(cacheFiles);
		})
	);
});

self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request).then(function (response) {
			if (response) {
				return response;
			} else {
				return fetch(event.request)
					.then(function (response) {
						const clonedResponse = response.clone();
						caches.open(cacheVersion).then(function (cache) {
							cache.put(event.request, clonedResponse);
						})
						return response;
					})
					.catch(function (error) {
						console.error(error);
					});
			}
		})
	);
	});