import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

const search = () => import('../components/Search/search');
const Main = () => import('../components/Main');
const AuthPanel = () => import('../components/Login/AuthPanel');
const createPoll = () => import('../components/create/CreatePoll');
const followers = () => import('../components/Follows/Event/Followers');
const followings = () => import('../components/Follows/Event/Followings');
const follows = () => import('../components/Follows/Follows');
const VoteFeed = () => import('../components/voteFeed/VoteFeed');
const Poll = () => import('../components/singlePoll/feed');
const Admin = () => import('../components/Admin/Admin');
const Catalog = () => import('../components/Admin/Catalog');
const addTranslations = () => import('../components/Admin/addTranslations');
const CatalogList = () => import('../components/CatalogFeed/Catalog');
const bookmarkFeed = () => import('../components/bookmarkFeed/Feed');
const CatalogFeed = () => import('../components/CatalogFeed/Feed');
const feedBack = () => import('../components/feedback/feedbackForm');
const user = () => import('../components/user/Page');
const sidebar = () => import('../components/mobile/menu');
const PollTable = () => import('../components/Admin/PollTable');
const testPlayground = () => import("../components/testPlayground");
const Settings = () => import("../components/pageSettings/index.vue");
const Statistic = () => import("../components/Statistic/statisticInstance");
const Rating = () => import("../components/Rating/ratingInstance");
const ReferralsPage = () => import("../components/ReferralsPage");
const achievementsPage = () => import("../components/achievementsPage/index");
const Notifications = () => import("../components/notificationsV2/Feed");
const OpinionFeed = () => import("../components/OpinionFeedv2/Feed");
const PollFeed = () => import("../components/PollFeedv2/Feed");
const QuestionsFeed = () => import("../components/PollFeedv2/Feed");
const Question = () => import("../components/questionV2/Page");

import {nprogress} from '../main.js';
import {searchUser} from "@/store/modules/searchUser";

const scrollBehavior = (to, from, savedPosition) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (savedPosition) {
				resolve(savedPosition)
			} else {
				resolve({x: 0, y: 0})
			}
		}, 500)
	})
};

Vue.use(Router);

export const router = new Router({
	mode: 'history',
	base: '/',
	scrollBehavior,
	routes: [

		{
			path: '/mailing',
			component: () => import('../Mailing'),
			name: 'mailing',
		},
		{
			path: '/login',
			component: AuthPanel,
			name: 'login',
		},
		{
			path: '/registration',
			name: 'registration',
			component: AuthPanel,
		},
		{
			path: '/sign',
			name: 'sign',
			component: AuthPanel,
		},
		{
			path: '/restore',
			name: 'restore',
			component: AuthPanel,
		},
		{
			path: '/token',
			name: 'token',
			component: AuthPanel,
		},
		{
			path: '/admin',
			name: 'admin',
			component: Admin,
			children: [
				{
					path: 'catalog',
					name: 'catalog',
					component: Catalog
				},
				{
					path: 'add_translations',
					name: 'addTranslations',
					component: addTranslations
				},
				{
					path: 'predictionsTable/:prediction_type',
					name: 'predictionsTable',
					component: PollTable,
					props: true
				},
				{
					path: 'test_playground',
					name: 'testPlayground',
					component: testPlayground
				},
			]
		},
		{
			path: '/',
			name: 'opinion',
			component: Main,
			redirect:
				{
					name: 'QuestionsFeed'
				},
			children: [

				{
					path: 'ReferralsPage',
					name: 'ReferralsPage',
					component: ReferralsPage
				},
				{
					path: 'achievementsPage',
					name: 'achievementsPage',
					component: achievementsPage
				},
				{
					path: 'user/:id',
					name: 'user',
					component: user,
					props: true
				},
				{
					path: 'statistic/:id',
					name: 'statistic',
					component: Statistic,
					props: true
				},
				{
					path: 'rating',
					name: 'rating',
					component: Rating,
					props: true
				},
				{
					path: 'notifications',
					name: 'notifications',
					component: Notifications
				},
				{
					path: 'createPoll',
					name: 'createPoll',
					component: createPoll,
				},
				{
					path: 'settings',
					name: 'settings',
					component: Settings,
				},
				{
					path: 'voteFeed',
					name: 'voteFeed',
					component: VoteFeed,
				},
				{
					path: 'QuestionsFeed',
					name: 'QuestionsFeed',
					component: QuestionsFeed,
				},
				{
					path: 'feedback',
					name: 'feedback',
					component: feedBack,
				},
				{
					path: 'search',
					name: 'search',
					component: search,
				},
				{
					path: 'menu',
					name: 'menu',
					component: sidebar,
				},
				{
					path: 'follows',
					name: 'follows',
					component: follows,
					redirect:
						{
							name: 'followers'
						},
					children: [
						{
							path: 'followings/:id',
							name: 'followings',
							component: followings,
							props: {isFollowing: true}
						},
						{
							path: 'followers/:id',
							name: 'followers',
							component: followers,
							props: {isFollowing: false}
						},

					]
				},
				{
					path: 'pollFeed',
					name: 'pollFeed',
					component: PollFeed,
					props: {feed: true}

				},
				{
					path: 'opinionFeed',
					name: 'opinionFeed',
					component: OpinionFeed,
					props: {feed: true}

				},
				{
					path: 'catalogList',
					name: 'catalogList',
					component: CatalogList,
				},
				{
					path: 'bookmarkFeed',
					name: 'bookmarkFeed',
					component: bookmarkFeed,
				},
				{
					path: 'catalogFeed/:id',
					name: 'catalogFeed',
					component: CatalogFeed,
				},
				{
					path: 'singlePoll/:id',
					name: 'singlePoll',
					component: Question,
					props: (route) => ({
						query: route.query.q,
						feed:false
					})
				},
			]
		},
	]
})


router.beforeResolve((to, from, next) => {
	if (to.path) {
		nprogress.start()
	}
	next();
});

router.afterEach((to, from) => {
	nprogress.done();
	let appPlaceholder = document.getElementById('app-placeholder');
	if (appPlaceholder) {
		document.body.style.overflow = null;
		appPlaceholder.parentNode.removeChild(appPlaceholder);
	}

});

// Мапа из динамически-подгружаемых модулей
const dynamicModules = new Map([
	['searchUser', () => import('../store/modules/searchUser')],
	['bookmarkFeed', () => import('../store/modules/bookmarkFeed')],
	['followsPage', () => import('../store/modules/Follows')],
	['adminPage', () => import('../store/modules/adminPage')],
	['formManagment', () => import('../store/modules/formManagment')],
	['userFeed', () => import('../store/modules/userFeed')],
	['voteFeed', () => import('../store/modules/voteFeed')],
	['Notifications', () => import('../store/modules/NotificationStore')],

]);

router.beforeEach((to, from, next) => {

	if (document.title !== 'Opinion social network') {
		document.title = 'Opinion social network';
	}

	switch (to.name) {
		case 'singlePoll':
		case 'user':
		case 'search':
			break;
		default:
			// Очистка поисковой строки везде, кроме совпадающих роутов
			router.app.$root.search_keyword = '';
	}

	axios.get(`${process.env.VUE_APP_MAIN_API}/rest/v1/user/status`)

		.then(({status}) => {
			if (status === 200) {
				let dynamicModulesKeys = [...dynamicModules.keys()],
					storeModulesKeys = Object.keys(router.app.$store.state);

				if (dynamicModulesKeys.every(val => storeModulesKeys.includes(val))) {
					next();
				} else {
					Promise.all(dynamicModulesKeys.map((key) =>
						dynamicModules.get(key)().then(m => {
							router.app.$store.registerModule(key, m[key]);
						})
					)).then(() => {
						next();
					})
				}
			}
		})
		.catch(() => {
			switch (to.name) {
				case 'sign':
				case 'registration':
				case 'login':
				case 'restore':
				case 'token':
				case 'QuestionsFeed':
				case 'singlePoll':
				case 'feedback':
				case 'notifications':

					next();
					break;
				default:
					router.app.$popup.insert('messages', {
						message: 'Для выполнения действий необходимо авторизоваться!',
						type: 'warning'
					});
					next({name: 'sign'});
			}
		})

});

// Сохранение query между роутами
router.beforeEach((to, from, next) => {

	function transitQueryParams(key) {
		if (from.query[key] && !to.query[key] && !to.query.logout) {
			next({path: to.path, query: {...to.query, [key]: from.query[key]}});
		} else {
			next();
		}
	}

	transitQueryParams('refer');

});

// Редирект
router.beforeEach((to, from, next) => {
	function getUserAuthorities() {
		let {mainUser} = router.app.$store.state.globalStore;
		return (Object.keys(mainUser).length) ? mainUser.authorities : null;
	}

	switch (to.name) {
		case 'achievementsPage':
		case 'admin':

			if (getUserAuthorities() !== 'ADMIN') {
				next({name: 'opinion'})
			} else {
				next();
			}

			break;
		default:
			next();
			return

	}

});

export default router
