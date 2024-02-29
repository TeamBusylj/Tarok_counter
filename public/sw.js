// Define the name of the cache
const CACHE_NAME = 'my-module-cache-v1';

// List of URLs to cache
const urlsToCache = [
	"https://fonts.gstatic.com/s/materialsymbolsoutlined/v164/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1v-p_4MrImHCIJIZrDCvHOej.woff2",
	"https://www.googletagmanager.com/gtag/js",
	 "@material/web/icon/icon.js",
	"@material/web/menu/menu-item.js",
	"@material/web/menu/menu.js",
	 "@material/web/fab/fab.js",
	"@material/web/dialog/dialog.js",
	 "@material/web/progress/circular-progress.js",
	 "@material/web/button/filled-tonal-button.js",
	 "@material/web/button/filled-button.js",
	 "@material/web/iconbutton/icon-button.js",
	"@material/web/labs/segmentedbuttonset/outlined-segmented-button-set.js",
	
	"@material/web/labs/segmentedbutton/outlined-segmented-button.js",
	"@material/web/labs/card/filled-card.js",
	"@material/web/button/outlined-button.js",
	"@material/web/switch/switch.js",
	"@material/web/iconbutton/filled-tonal-icon-button.js",
	"@material/web/slider/slider.js",
	"@material/web/list/list-item.js",
	"@material/web/list/list.js",
	"@material/web/button/text-button.js",
	"@material/web/textfield/outlined-text-field.js",
	"@material/web/textfield/filled-text-field.js",
	"@material/web/field/outlined-field.js",
    "@material/material-color-utilities/index.js",
	'/assets/js/longvars.js',
	"https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js",
	"https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js"

];

// Install event: cache the module files
self.addEventListener('install', event => {
	console.log("cached");
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
        // Otherwise, fetch the module from the network
        return fetch(event.request);
      })
  );
});