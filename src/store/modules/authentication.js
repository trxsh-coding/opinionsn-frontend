import Vue from "vue";
import axios from "axios";
import router from "../../router/index"
import {VK_APP_ID} from "../../../constants";

export const authentication = {
	namespaced: true,


	state: {

		isAuthenticated: false,
		userLogged: false

	},


	getters: {

		isAuthenticated(state, getters, rootState, rootGetters) {
			return state.isAuthenticated

		},

		testGetter() {
			return "Ya"
		}
	},


	mutations: {

		setAuthenticated(state, e) {
			state.isAuthenticated = e
		}

	},


	actions: {
		async oAuth2GoogleSignIn({commit}) {

			const vm = new Vue();

			try {
				const oAuthRes = await vm.$gAuth.signIn();
				await axios({
					method: 'GET',
					url: `${process.env.VUE_APP_MAIN_API}/oauth2/google/mobile`,
					params: {
						token: oAuthRes.uc.access_token
					}
				});
				commit("setAuthenticated", true);
				router.push({path: "/"});
			} catch (e) {
				vm.$popup.insert('messages', [
					{message: 'При попытке авторизации произошла ошибка!', type: 'error'}
				]);
				console.log(e);
			}

		},

		async oAuth2VkontakteSignIn({commit}) {

			console.log("oAuth2VkontakteSignIn");

			const vm = new Vue();

			try {
				// const oAuthRes = await vm.$vkAuth.login();
				//
				// console.log(oAuthRes);

				const oAuthRes = await axios({
					method: "GET",
					url: "https://oauth.vk.com/authorize",
					headers: {
						'origin'        : null,
						'referer'       : null,
						'sec-fetch-dest': 'document',
						'sec-fetch-mode': 'navigate',
						'sec-fetch-site': 'none'
					},
					params: {
						client_id: VK_APP_ID,
						redirect_uri: "https://opinionsn.com/sign",
						display: "page",
						scope: "email",
						response_type: "token",
					}
				});

				// await axios({
				// 	method: 'GET',
				// 	url: `${process.env.VUE_APP_MAIN_API}/oauth2/vk/mobile`,
				// 	params: {
				// 		token: auth.access_token,
				// 		email: auth.email,
				// 		user_id: auth.user_id
				// 	}
				// });
				commit("setAuthenticated", true);
			} catch (e) {
				vm.$popup.insert('messages', [
					{message: 'При попытке авторизации произошла ошибка!', type: 'error'}
				]);
				console.log(e);
			}

		}
	}
};
