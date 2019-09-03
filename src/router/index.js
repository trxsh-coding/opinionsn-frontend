import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

const search = () => import('../components/Search/search');
const Main = () => import('../components/Main');
const AuthPanel = () => import('../components/Login/AuthPanel');
const Password = () => import('../components/Login/Password');
const createPoll = () => import('../components/create/CreatePoll');
const followers = () => import('../components/Follows/Event/Followers');
const followings = () => import('../components/Follows/Event/Followings');
const follows = () => import('../components/Follows/Follows');
const VoteFeed = () => import('../components/voteFeed/VoteFeed');
const PollFeed = () => import('../components/pollFeed/PollFeed');
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
const notificationPage = () => import('../components/notifications/notificationPage');
const PollTable = () => import('../components/Admin/PollTable');
const testPlayground = () => import("../components/testPlayground");
const Settings = () => import("../components/pageSettings/index.vue");
const Statistic = () => import("../components/Statistic/statisticInstance");
const Rating = () => import("../components/Rating/ratingInstance");
import {nprogress} from '../main.js';
import {searchUser} from "@/store/modules/searchUser";

const scrollBehavior = (to, from, savedPosition) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (savedPosition) {
				resolve(savedPosition)
			} else {
				reject({x: 0, y: 0})
			}
		}, 500)
	})
};

Vue.use(Router);

export const index = new Router({
	mode: 'history',
	base: '/',
	scrollBehavior,
	routes: [

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
			children: [
				{
					path: 'password',
					name: 'password',
					component: Password
				},
			]
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
					name: 'pollFeed'
				},
			children: [
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
					path: 'feedback',
					name: 'feedback',
					component: feedBack,
				},
				{
					path: 'notifications',
					name: 'notifications',
					component: notificationPage,
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
					component: Poll,
					props: {feed: false}
				},
			]
		},
	]
})


index.beforeResolve((to, from, next) => {
	if (to.path) {
		nprogress.start()
	}
	next();
});

index.afterEach(() => {
	nprogress.done();
	let appPlaceholder = document.getElementById('app-placeholder');
	if (appPlaceholder) appPlaceholder.parentNode.removeChild(appPlaceholder);
});

const dynamicModules = new Map([
	['searchUser', () => import('../store/modules/searchUser')],
	['bookmarkFeed', () => import('../store/modules/bookmarkFeed')],
	['followsPage', () => import('../store/modules/Follows')],
	['notificationStore', () => import('../store/modules/notificationStore')],
	['adminPage', () => import('../store/modules/adminPage')],
	['formManagment', () => import('../store/modules/formManagment')]
]);

index.beforeEach((to, from, next) => {
	
		axios.get(`${process.env.VUE_APP_MAIN_API}/rest/v1/user/status`)
			
			.then(({status}) => {
				if (status === 200) {
					let dynamicModulesKeys = [...dynamicModules.keys()],
						storeModulesKeys = Object.keys(index.app.$store.state);
					
					if (dynamicModulesKeys.every(val => storeModulesKeys.includes(val))) {
						next();
					} else {
						Promise.all(dynamicModulesKeys.map((key) =>
							dynamicModules.get(key)().then(m => {
								index.app.$store.registerModule(key, m[key]);
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
					case 'pollFeed':
					case 'singlePoll':
					case 'feedback':
						next();
						break;
					default:
						index.app.$popup.insert('messages', {
							message: 'Для выполнения действий необходимо авторизоваться!',
							type: 'warning'
						});
						next(false);
				}
			})
	
});

export default index
