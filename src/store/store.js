import Vue from 'vue'
import Vuex from 'vuex'
import Login from './modules/Login'
import lang from './modules/lang'
import serviceWorker from './modules/serviceWorker'
import {authentication} from './modules/authentication'
import axios from 'axios'
import {pollFeed} from "./modules/pollFeed";
import {singlePoll} from "./modules/singlePoll";
import {catalogList} from "./modules/catalogList";
import {userPage} from "./modules/userPage";
import {globalStore} from "./modules/globalStore";
import {achievementsPage} from "./modules/achievementsPage";
import {OpinionStore} from "./modules/OpinionStoreV2";
import {BowStore} from "./modules/BowStore";
import {Followings} from "./modules/FollowingsStore";


Vue.use(Vuex)
Vue.use(axios)

export const store = new Vuex.Store({
	strict: false,
	modules: {
		Login,
		authentication,
		pollFeed,
		globalStore,
		lang,
		singlePoll,
		catalogList,
		userPage,
		achievementsPage,
		serviceWorker,
		OpinionStore,
		BowStore,
		Followings
	},
	state: {},
	getters: {},
	actions: {},
})

export default store;
