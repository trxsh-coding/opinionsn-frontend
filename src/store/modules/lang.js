import axios from 'axios';
import {vueApp} from "../../main";
import moment from 'moment';
export default  {
  namespaced:true,
  state: {
    locale: {}
  },
  getters: {

  },
  mutations: {

    guestLocale(state, payload){

        console.log(payload)

    },
    setLocale(state, payload){
      let {langSelector: lang} = payload;
      // console.log(`Moment's lang (before): ${moment.locale()}`);
      // console.log(`Selecting lang: ${lang}`)
      moment.locale(lang);
      //
      // console.log(`Moment's lang (after): ${moment.locale()}`);

      state.locale = payload
      vueApp.$i18n.locale = state.locale.langSelector
    },
  },
    actions: {
      getLocaleString({dispatch, commit}, payload){
        axios.get('/api/locale/get')
          .then(function(response){
            commit('setLocale', response.data)
        }.bind(this))
      },

      getGuestsLocaleString({dispatch, commit}, payload){
        axios.get('/api/locale/get')
            .then(function(response){
              commit('setLocale', response.data)
            }.bind(this))
      }
    }
  }
