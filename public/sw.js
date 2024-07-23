// Define the name of the cache
const CACHE_NAME = 'my-module-cache-v1';

// List of URLs to cache
const urlsToCache = [
	"https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0",
  "https://fonts.gstatic.com/s/materialsymbolsoutlined/v199/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1v-p_4MrImHCIJIZrDCvHOej.woff2",
	"https://www.googletagmanager.com/gtag/js",
	'/assets/js/longvars.js',
	'/assets/js/tarok.min.js',
	'/assets/js/module.js',
	'/assets/js/firebase.min.js',
	'/assets/css/theme.min.css',
	'/assets/css/tarok.min.css',
  'https://stevec-taroka.si/',
	"https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js",
	"https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js"

];

// Install event: cache the module files
self.addEventListener('install', event => {
	console.log("cached");
  if(navigator.onLine){
    caches.keys().then(function(names) {
      for (let name of names)
          caches.delete(name);
  });
  }

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: serve module files from the cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // If the module is in the cache, serve it from the cache
        if (response) {
          return response;
        }

        return fetch(event.request);
      })
  );
});