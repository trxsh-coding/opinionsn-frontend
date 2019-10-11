/* eslint-disable no-console */

import {register} from 'register-service-worker'


register(`${process.env.BASE_URL}service-worker.js`, {
	registrationOptions: {
		scope: './'
	},

	ready(registration) {
		console.log(
			'App is being served from cache by a service worker.\n' +
			'For more details, visit https://goo.gl/AFskqB'
		)

	},

	registered(registration) {

		self.addEventListener('activate', function(event) {
			event.waitUntil(
				caches.keys().then(function(cacheNames) {
					return Promise.all(
						cacheNames.filter(function(cacheName) {
							// Return true if you want to remove this cache,
							// but remember that caches are shared across
							// the whole origin
						}).map(function(cacheName) {
							return caches.delete(cacheName);
						})
					);
				})
			);
		});

	},
	cached() {
	},
	updatefound() {
	},
	updated() {
	},
	offline() {
	},
	error(error) {
	}
});

