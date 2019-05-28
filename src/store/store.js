import Vue from 'vue'
import Vuex from 'vuex'
import Login from './modules/Login'
import lang from './modules/lang'
import {authentication} from './modules/authentication'
import axios from 'axios'
import {voteFeed} from "./modules/voteFeed";
import {userFeed} from "./modules/userFeed";
import {pollFeed} from "./modules/pollFeed";
import {singlePoll} from "./modules/singlePoll";
import {bookmarkFeed} from "./modules/bookmarkFeed";
import {catalogList} from "./modules/catalogList";
import {searchUser} from "./modules/searchUser";
import {userPage} from "./modules/userPage";
import {followsPage} from "./modules/Follows"
import {globalStore} from "./modules/globalStore";
import {notificationPage} from "./modules/notifications";
import {notificationStore} from "./modules/notificationStore"
import { admin } from "./modules/adminPage";

Vue.use(Vuex)
Vue.use(axios)

  export const store = new Vuex.Store ({
    strict:false,
    modules: {
    Login,
    authentication,
    voteFeed,
    userFeed,
    pollFeed,
    searchUser,
    globalStore,
    lang,
    singlePoll,
    catalogList,
    bookmarkFeed,
    userPage,
    followsPage,
    notificationPage,
    notificationStore,
	admin
  },
  state: {
  },
  getters: {

  }  ,
  actions: {
  },
})

export default store;
