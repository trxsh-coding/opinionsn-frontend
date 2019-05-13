import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'
import axios from 'axios'
import search from '../components/Search/search'
import Main from '../components/Main'
import Login from '../components/Login/Login'
import Sign from '../components/Login/Sign'
import Token from '../components/Login/Token'
import Password from '../components/Login/Password'
import Restore from '../components/Login/Restore'
import Registration from '../components/Login/Registration'
import CreateQuiz from '../components/CreateQuiz'
import PollCreate from '../components/PollCreate'
import CreatePoll from '../components/CreatePoll'
import followers from '../components/Follows/Event/Followers'
import followings from '../components/Follows/Event/Followings'
import follows from '../components/Follows/Follows'
import VoteFeed from '../components/voteFeed/VoteFeed';
import PollFeed from '../components/pollFeed/PollFeed';
import Poll from '../components/singlePoll/feed';
import Admin from '../components/Admin/Admin';
import addPoll from '../components/Admin/POLL_EDIT/AddPoll';
import Catalog from '../components/Admin/Catalog';
import addTranslations from '../components/Admin/addTranslations';
import CatalogList from '../components/CatalogFeed/Catalog';
import bookmarkFeed from '../components/bookmarkFeed/Feed';
import CatalogFeed from '../components/CatalogFeed/Feed';
import feedBack from '../components/feedback/feedbackForm';
import user from '../components/user/Page';
import sidebar from '../components/mobile/sidebar';
import { nprogress } from '../main.js'
import notificationPage from '../components/notifications/notificationPage'
Vue.use(Router);

export const index = new Router({
	base: '/',
	mode: 'history',
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return { x: 0, y: 0 }
		}
	},
	routes: [

		{
			path: '/login',
			component: Login,
			name: 'login',
		},
		{
			path: '/registration',
			name: 'registration',
			component: Registration,
		},
		{
			path: '/sign',
			name: 'sign',
			component: Sign,
		},
		{
			path: '/restore',
			name: 'restore',
			component: Restore,
		},
		{
			path: '/token',
			name: 'token',
			component: Token,
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
					path: 'add_poll',
					name: 'addPoll',
					component: addPoll
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
					path: '/user/:id',
					name: 'user',
					component: user,
					props: true
				},
				{
					path: 'add',
					name: 'add',
					component: CreateQuiz,
					children: [
						{
							path: 'poll',
							name: 'poll',
							component: PollCreate
						},
						{
							path: 'prediction',
							name: 'prediction',
							component: CreatePoll
						},

					]
				},

				{
					path: 'voteFeed',
					name: 'voteFeed',
					component: VoteFeed,
				},
				{
					path: 'feedBack',
					name: 'feedBack',
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
							props: { isFollowing: true }
						},
						{
							path: 'followers/:id',
							name: 'followers',
							component: followers,
							props: { isFollowing: false }
						},

					]
				},
				{
					path: 'pollFeed',
					name: 'pollFeed',
					component: PollFeed,
					props: { feed: true }

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
					props: { feed: false }
				},
			]
		},
	]
})


index.beforeResolve((to, from, next) => {
	if (to.path) {
		nprogress.start()
	}
	next()
});

index.afterEach(() => {
	nprogress.done()
});
index.beforeEach((to, from, next) => {
	const publicPages = ['/login'];
	next();
});

index.beforeEach((to, from, next) => {
	if (to.path === '/sign' || to.path === '/registration' || to.path === '/login' || to.path === '/restore' || to.name === `token` || to.path === '/pollFeed' || to.name === 'singlePoll' || to.name === 'feedBack') {
		next({
			query: { redirect: to.fullPath }
		});
	} else {
		axios.get('/api/rest/getUserStatus')

			.then(response => {

				if (response.status === 200) {


					next();

				}
			})
			.catch(error => {

				next('/login')

			})
	}
});

export default index
