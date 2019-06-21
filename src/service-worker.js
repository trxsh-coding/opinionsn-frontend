import axios from "axios";

workbox.core.setCacheNameDetails({prefix: "frontend-opinionsn"});

// Перенапраление роутинга для SPA
workbox.routing.registerNavigationRoute('/index.html');

// Ловим нужные нам api реквесты и возвращаем свою ошибку
// self.addEventListener('fetch', (event) => {
// 	const POLL_FEED_API_PATTERN = '(.*\/api\/rest\/feed\/\d*)',
// 		  VOTE_FEED_API_PATTERN = '(.*\/api\/rest\/vote\/feed\/\d*)',
// 		  USER_POLL_FEED_API_PATTERN = '(.*\/api\/rest\/getUserPollFeed\/\d*\?id=\d*)',
// 		  USER_VOTE_FEED_API_PATTERN = '(.*\/api\/rest\/getUserVoteFeed\/\d*\?id=\d*)';
// 		  // NOTIFICATIONS_API_PATTERN = '(.*\/messages\/notification)';
//
// 	let patternGroup = [
// 		POLL_FEED_API_PATTERN,
// 		VOTE_FEED_API_PATTERN,
// 		USER_POLL_FEED_API_PATTERN,
// 		USER_VOTE_FEED_API_PATTERN
// 	];
//
// 	function getGeneralPattern(patterns) {
// 		return patterns.join('|');
// 	}
//
// 	let generalPattern = new RegExp(getGeneralPattern(patternGroup));
// 	let { url } = event.request;
//
// 	if (generalPattern.test(url)) {
// 		let init = { "status" : 400, "statusText" : "SERVER_CONNECTION_NOT_ESTABLISHED" };
// 		let SW_response = new Response(null, init);
//
// 		fetch(event.request)
// 			.then(response => { event.respondWith(response) })
// 			.catch(error => {
// 				console.error(error);
// 				event.respondWith(SW_response);
// 			});
//
// 	}
// });

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
