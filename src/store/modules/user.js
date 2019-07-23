import {vueApp} from './../../main'
import {store} from './../../store/store'
import axios from 'axios'
import Vue from 'vue'

let getUser = [
  ['backgroundImg', ''],
  ['birthday', ''],
  ['email', ''],
  ['gender', ''],
  ['id', ''],
  ['location', ''],
  ['pathToAvatar', ''],
  ['phoneNumber', ''],
  ['status', ''],
  ['username', '']];
export const user  =  {
  namespaced: true,
  state: {
    setUser: (()=>{
      let map = {};
      for (let info of getUser){
        map = info;
      }
      return map;
    })(),
    User:[],
    Leaders:'',
    Followers:''
  },
  mutations: {

    reactiveUser(state, e) {
      Vue.set(state.setUser, 'isLeader', e.data.isLeader)
    },
    updateUser(state, e) {
      Vue.set(state, 'setUser', e)
      Vue.set(state, 'User', e)
    },
    updateUsername(state, e) {
      Vue.set(state.user.setUser, 'username', e)
    },
    updateAboutMe(state, e) {
      Vue.set(state.user.setUser, 'aboutMe', e)
    },
    updateLocation(state, e) {
      Vue.set(state.user.setUser, 'location', e)
    },
    setCurrentUser(e, s) {
      Vue.set(store.state.user, 'setUser', s)
      Vue.set(store.state.user, 'User', s)
    },
    setLeaders(state, e){
      Vue.set(store.state.user, 'Leaders', e)
    },
    setFollowers(state, e){
      Vue.set(store.state.user, 'Followers', e)
    },
    changeLocale(state, payload) {
        // if(payload === 1) {
        //     vueApp.$i18n.locale = 'en'
        // } else {
        //     vueApp.$i18n.locale = 'ru'
        // }
        Vue.set(store.state.user.User, 'locale_id', payload)
      }
    },

  actions: {

    getUserByID({ dispatch, commit}, e) {
        axios.get(`${process.env.VUE_APP_MAIN_API}/rest/v1/user/` + e)
            .then(function(response){
              if (response.status === 200) {
                store.state.user.setUser = response.data;
                console.log(response)
                commit("reactiveUser", response.data)
              }
          }.bind(this))
    },
    getCurrentUser({dispatch, commit}, e) {
      axios.get(`${process.env.VUE_APP_MAIN_API}/rest/v1/user`)
        .then(function (response) {
          if (response.status === 200) {
            commit('setCurrentUser', response.data)
          }
        })
    },
    getUserLocale({dispatch, commit}, payload){
     return axios.post(`${process.env.VUE_APP_MAIN_API}/rest/locale/change/` + payload, payload)
          .then(function(response, store){
              if (response.status === 200) {
                commit('changeLocale', payload)

          }
      })
    },
    updateUser({dispatch, commit}, e) {
      axios.post(`${process.env.VUE_APP_MAIN_API}/rest/updateUser`, e)
          .then(function(response, store){
              if (response.status === 200) {
                commit('updateUser', response.data)
          }
      })
      .catch((error) => {
        vueApp.$message.warning(error.response.data);
      });
    },
    follow({dispatch, commit}, e) {
      axios.post(`${process.env.VUE_APP_MAIN_API}/rest/v1/user/subscribe/` + e, e)
          .then(function(response, store){
              if (response.status === 200) {
                commit('reactiveUser', response)
          }
      }.bind(this))
    },
    trashFollow({dispatch, commit}, e) {
      axios.post(`${process.env.VUE_APP_MAIN_API}/rest/v1/user/subscribe/` + e, e)
          .then(function(response, store){
              if (response.status === 200) {
                dispatch('getFollowers')
                dispatch('getLeaders')
          }
      }.bind(this))
    },
    trashUnFollow({dispatch, commit}, e) {
      axios.delete(`${process.env.VUE_APP_MAIN_API}/rest/v1/user/subscribe/` + e, e)
          .then(function(response, store){
              if (response.status === 200) {
                dispatch('getFollowers')
                dispatch('getLeaders')
          }
      }.bind(this))
    },
    unFollow({dispatch, commit}, e) {
      axios.delete(`${process.env.VUE_APP_MAIN_API}/rest/v1/user/subscribe/` + e, e)
          .then(function(response, store){
              if (response.status === 200) {
                commit('reactiveUser', response)
          }
      }.bind(this))
    },
    getLeaders({dispatch, commit}) {
      axios.get(`${process.env.VUE_APP_MAIN_API}/rest/getFollowing`)
        .then(function (response) {
          if (response.status === 200) {
            commit('setLeaders', response.data)
          }
        })
    },
    getFollowers({dispatch, commit}) {
      axios.get(`${process.env.VUE_APP_MAIN_API}/rest/getMyFollowers`)
        .then(function (response) {
          if (response.status === 200) {
            commit('setFollowers', response.data)
          }
        })
    }
  },
}
