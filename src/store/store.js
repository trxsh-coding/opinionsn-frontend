import Vue from 'vue'
import Vuex from 'vuex'
import lang from './modules/lang'
import Login from './modules/Login'
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
    followsPage
  },
  state: {
  },
  getters: {

  }  ,
  actions: {
  },
})

export default store;
