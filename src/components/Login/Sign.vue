<template lang="html">
	<div class="sign-section">
		<div class="navbar-brand">
			<div class="navbar__item navbar__item-1">
				<icon-base
						fill="none"
						class="icon"
						width="75"
						height="64"
						viewBox="0 0 23 24"
						icon-name="logo">
					<icon-logo/>
				</icon-base>
			</div>
			<div class="navbar__item navbar__item-2 v-center">
				<icon-base
						fill="none"
						class="icon-text"
						width="66"
						height="15"
						viewBox="0 0 64 15"
						icon-name="text-logo">
					<icon-text-logo/>
				</icon-base>
			</div>
		</div>

		<div class="form-block mt-58" @keyup.enter.exact="submit(signForm)">

			<popup-error-reusable :errors="{field_email: lstr(errors.field_email)}" span-class="mt-3">
				<re-input :preset="2" placeholder="login" class="mx-auto" input-class="pb-5"
				          :params="{flex: 1, fontSize: 16, label: { width: 271 }}"
				          :value="signForm.email" @input="updateField(arguments[0], 'email')"/>
			</popup-error-reusable>


			<popup-error-reusable :errors="{field_password: lstr(errors.field_password)}" span-class="mt-3">
				<re-input class="mt-30 mx-auto" input-class="pb-5"
				          :params="{flex: 1, fontSize: 16, label: { width: 271 }}"
				          :preset="2" placeholder="password" type="password"
				          :value="signForm.password" @input="updateField(arguments[0], 'password')"/>
			</popup-error-reusable>

		</div>

		<div class="buttons-block flex-column-center mt-20">

			<router-link class="ml-auto pointer restore-btn" to="/restore">
				<lang-string :title="'forgot_your_password?'"/>
			</router-link>

			<button-reusable
					@click.native="submit(signForm)"
					class="v-center auth-btn mt-20 py-13"
					description="sign_in"
					font-size="16"
					bor-rad="6"
					bg-color="#ffffff"
					color="#4B97B4"/>

			<button-reusable
					@click.native="$router.push({name: 'registration'})"
					class="v-center auth-btn mt-9 py-13"
					description="registration"
					font-size="16"
					bor-rad="6"
					bg-color="#4B97B4"
					color="#ffffff"/>

						<div class="oAuth-btns mt-47 flex-column-center">
							<lang-string class="title" title="sign_in_with_social_networks" />

							<div class="btns flex-align-center mt-10">

								<a :href="`https://opinionsn.com/api/oauth2/vk${queryList}`">
									<button-reusable
											class="v-center soc-btn vk-btn py-12"
											font-size="16"
											bor-rad="6"
											bg-color="#4C6C91"
											color="#4B97B4">
										<icon-base
												class="logo"
												width="32"
												height="18"
												viewBox="0 0 32 18"
												fill="none"
												icon-name="google-logo">
											<icon-vk/>
										</icon-base>
									</button-reusable>
								</a>

<!--								<a :href="`https://opinionsn.com/api/oauth2/facebook${queryList}`">-->
<!--									<button-reusable-->
<!--											class="v-center soc-btn facebook-btn py-8 ml-11"-->
<!--											font-size="16"-->
<!--											bor-rad="6"-->
<!--											bg-color="#3b5998"-->
<!--											color="#4B97B4">-->
<!--										<IconFacebook />-->
<!--									</button-reusable>-->
<!--								</a>-->

<!--								<a @click="authWithFB">-->
<!--									<button-reusable-->
<!--											class="v-center soc-btn facebook-btn py-8 ml-11"-->
<!--											font-size="16"-->
<!--											bor-rad="6"-->
<!--											bg-color="#3b5998"-->
<!--											color="#4B97B4">-->
<!--										<IconFacebook />-->
<!--									</button-reusable>-->
<!--								</a>-->

								<a :href="`https://opinionsn.com/api/oauth2/google${queryList}`">
									<button-reusable
											class="v-center soc-btn google-btn py-8 ml-11"
											font-size="16"
											bor-rad="6"
											bg-color="#ffffff"
											color="#4B97B4">
										<icon-base
												class="logo"
												width="26"
												height="26"
												viewBox="0 0 366 372"
												fill="none"
												icon-name="google-logo">
											<icon-google/>
										</icon-base>
									</button-reusable>
								</a>

							</div>
						</div>

		</div>
	</div>

</template>

<script>
	import langMixin from "../mixins/langMixin";
	import IconBase from "../icons/IconBase.vue";
	import IconLogo from "../icons/IconLogo.vue";
	import IconGoogle from "../icons/IconGoogle.vue";
	import IconVk from "../icons/IconVk.vue";
	import IconFacebook from "../icons/IconFacebook";
	import IconTextLogo from "../icons/IconTextLogo.vue";
	import langString from "../langString.vue";
	import {localString} from "../../utils/localString";
	import axios from "axios";
	import InputReusable from "@/components/reusableСomponents/InputReusable";
	import ButtonReusable from "@/components/reusableСomponents/ButtonReusable";
	import PopupErrorReusable from "../reusableСomponents/PopupErrorReusable";
	import {mapState} from "vuex";
	import ReInput from "@/components/reusableСomponents/ReInput";

	export default {
		data() {
			return {
				signForm: {
					email: '',
					password: '',
					// checked: false
				},

				errors: {}
			};
		},

		computed: {
			...mapState('lang', {
				lang: state => state.locale
			}),

			queryList() {
				let {refer, categoryId, redirectToPoll} = this.$route.query;

				let query = {refer, categoryId, redirectToPoll};
				Object.keys(query).forEach(key => {
					if (!query[key]) delete query[key]
				});

				let string = '';
				Object.keys(query).forEach((key, i) => {
					let symbol = i ? '&' : '?';

					string += symbol + key + '=' + query[key];
				});

				return string
			},

			// refer() {
			// 	return (!!this.$route.query.refer) ? `?refer=${this.$route.query.refer}` : ''
			// }
		},

		methods: {

			authWithFB(){

				window.sessionStorage.setItem('queryList', this.queryList);
				if (window.FB){

					window.FB.login(function({authResponse: response}) {
						let queryList = window.sessionStorage.getItem('queryList');
						window.location = `/api/oauth2/fbv2${queryList ? queryList + "&" : "?" }token=${encodeURI(response.accessToken)}&userID=${encodeURI(response.userID)}`;
					}, {scope: 'public_profile,email'});

				}
			},

			updateField(val, key) {
				this.signForm[key] = val;
			},

			async submit(form) {

				try {
					let loginFormData = new FormData();
					loginFormData.append("field_email", form.email);
					loginFormData.append("field_password", form.password);

					let res = await axios.post(`${process.env.VUE_APP_MAIN_API}/auth/login`, loginFormData);
					if (res.status === 200) {
						this.$store.commit(
							"authentication/setAuthenticated",
							true
						);
						if (this.$route.query.redirectToPoll) {
							this.$router.push({
								name: "singlePoll",
								params: {id: this.$route.query.redirectToPoll}
							});
						} else {
							this.$router.push({path: "/"});
						}
					}
				} catch (e) {
					console.error('Error sending sign form: ', e);

					this.errors = {};
					let {data} = e.response;

					if (data) {
						data.forEach(({field: f, msg: m}) => {
							this.$set(this.errors, f, m);
						})
					}

					this.$forceUpdate();
				}


			}
		},

		watch: {
			errorFields() {
				let fields = [
					["field_login", ""],
					["field_password", ""],
					["passConfirm", ""],
					["email", ""]
				];

				let map = this.errors;
				for (let [i, v] of fields) {
					map[i] = v;
				}
				return map;
			}
		},

		mounted() {
			// if (this.$route.query.redirectToPoll) {
			// 	this.$popup.insert('messages', {message: 'Для выполнения действий необходимо авторизоваться!', type: 'warning'})
			// }
		},

		mixins: [langMixin],
		components: {
			ReInput,
			PopupErrorReusable,
			ButtonReusable,
			InputReusable,
			IconBase,
			IconLogo,
			IconTextLogo,
			IconGoogle,
			IconVk,
			langString,
			IconFacebook,
		}
	};
</script>
