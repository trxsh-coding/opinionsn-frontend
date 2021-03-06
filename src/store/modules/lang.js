import axios from 'axios';
import {vueApp} from "../../main";
import moment from 'moment';

export default {
	namespaced: true,
	state: {
		locale: {}
	},
	getters: {},
	mutations: {
		
		guestLocale(state, payload) {
		
		
		},
		setLocale(state, payload) {
			let {_lang: lang} = payload;
			moment.locale(lang);
			state.locale = payload;
			vueApp.$i18n.locale = state.locale.lang
		},
	},
	actions: {
		getLocaleString({dispatch, commit}, payload) {
			axios.get(`${process.env.VUE_APP_MAIN_API}/locale`)
				.then(function (response) {
					commit('setLocale', response.data)
				}.bind(this))
		},
		
		getGuestsLocaleString({dispatch, commit}, payload) {
			axios.get(`${process.env.VUE_APP_MAIN_API}/locale`)
				.then(function (response) {
					commit('setLocale', response.data)
				}.bind(this))
		}
	}
}
