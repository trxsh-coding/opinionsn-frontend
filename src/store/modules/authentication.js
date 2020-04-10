import Vue from "vue";
import axios from "axios";
import router from "../../router/index"
import {VK_APP_ID} from "../../../constants";
import {vkontakteRedirectParser} from "../../utils/vkontakteRedirectParser";

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
		async oAuth2GoogleSignIn({commit}, queryList) {

			const vm = new Vue();

			try {
				const oAuthRes = await vm.$gAuth.signIn();
				console.log(oAuthRes)
				await axios({
					method: 'GET',
					url: `${process.env.VUE_APP_MAIN_API}/oauth2/google/mobile${queryList ? queryList + "&" : "?"}token=${oAuthRes.tc.access_token}`,
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

		async oAuth2VkontakteSignIn(_, queryList) {

			window.sessionStorage.setItem('queryList', queryList);

			const vm = new Vue();

			function urlWithQueryParams(url, queryParams) {

				let result = url;

				if (typeof queryParams === 'object') {
					Object.keys(queryParams).forEach((item, index) => {
						if (index === 0) {
							result += `?${item}=${queryParams[item]}`
						} else {
							result += `&${item}=${queryParams[item]}`
						}
					})
				}

				return result;
			}

			const VKONTAKTE_AUTH_URL = urlWithQueryParams("https://oauth.vk.com/authorize", {
				client_id: VK_APP_ID,
				redirect_uri: "https:%2F%2Fopinionsn.com%2Fsign",
				display: "popup",
				scope: "email,offline",
				response_type: "token"
			});

			try {

				// console.log(VKONTAKTE_AUTH_URL);
				window.location.replace(VKONTAKTE_AUTH_URL);

			} catch (e) {
				vm.$popup.insert('messages', [
					{message: 'При попытке авторизации произошла ошибка!', type: 'error'}
				]);
				console.log(e);
			}

		},

		async handleVkontakteAuthRedirect({commit}) {
			const vm = new Vue();
			const data = vkontakteRedirectParser(window.location.href);
			const {access_token, user_id, email} = data;

			const queryList = window.sessionStorage.getItem('queryList');

			if (data) {

				try {
					await axios({
						method: 'GET',
						url: `${process.env.VUE_APP_MAIN_API}/oauth2/vk/mobile${queryList ? queryList + "&" : "?"}user_id=${user_id}&token=${access_token}&email=${email}`,
					});
					window.sessionStorage.removeItem('queryList');
					commit("setAuthenticated", true);
					router.push({path: "/"});
				} catch (e) {
					vm.$popup.insert('messages', [
						{message: 'При попытке авторизации произошла ошибка!', type: 'error'}
					]);
					console.log(e);
				}

			}
		}
	}
};
