<template lang="html">
	<div class="register-section">
		<div class="navbar-brand">
			<div class="navbar__item navbar__item-1">

				<icon-base
						fill="none"
						class="icon"
						width="75"
						height="64"
						viewBox="0 0 23 24"
						icon-name="logo"><icon-logo />
				</icon-base>
			</div>
			<div class="navbar__item navbar__item-2 v-center">
				<icon-base
						fill="none"
						class="icon-text"
						width="66"
						height="15"
						viewBox="0 0 64 15"
						icon-name="text-logo"><icon-text-logo />
				</icon-base>
			</div>
		</div>

		<div class="form-block mt-25" @keyup.enter.exact="submit(registrationForm)">

			<popup-error-reusable :errors="{ login: lstr(errors.login) }" span-class="mt-3">
				<input-reusable class="mx-auto"
				                :value="registrationForm.username"
				                @change="updateField(arguments[0], 'username')"
				                inputPlaceholder="username"
				                width="271"
				                input
				                with-underline/>
			</popup-error-reusable>


			<popup-error-reusable :errors="{email: lstr(errors.email) }" span-class="mt-3">
				<input-reusable class="mx-auto mt-16"
				                :value="registrationForm.email"
				                @change="updateField(arguments[0], 'email')"
				                inputPlaceholder="email"
				                width="271"
				                input
				                with-underline/>
			</popup-error-reusable>

			<popup-error-reusable :errors="{passConfirm: lstr(errors.passConfirm) }" span-class="mt-3">
				<input-reusable class="mx-auto mt-16"
				                input-type="password"
				                :value="registrationForm.password"
				                @change="updateField(arguments[0], 'password')"
				                inputPlaceholder="password"
				                width="271"
				                input
				                with-underline/>
			</popup-error-reusable>

			<popup-error-reusable :errors="{passConfirm: lstr(errors.passConfirm) }" span-class="mt-3">
				<input-reusable class="mx-auto mt-16"
				                input-type="password"
				                :value="registrationForm.conf_pass"
				                @change="updateField(arguments[0], 'conf_pass')"
				                inputPlaceholder="confirm_password"
				                width="271"
				                input
				                with-underline/>
			</popup-error-reusable>

		</div>
		
<!--		<popup-error-reusable :errors="{passConfirm: lstr(errors.passConfirm) }" span-class="mt-3">-->

<!--			<vue-recaptcha-->
<!--					class="recaptcha mt-20"-->
<!--					ref="recaptcha"-->
<!--					:sitekey="sitekey"-->
<!--					@verify="setCurrentTOken(arguments[0])"-->
<!--					@expired="onCaptchaExpired"-->
<!--					:loadRecaptchaScript="true"-->
<!--			/>-->
<!--		</popup-error-reusable>-->

		<div class="buttons-block mt-23">

			<button-reusable
					@click.native="submit(registrationForm)"
					class="v-center reg-btn py-13"
					description="registration"
					font-size="16"
					bor-rad="6"
					bg-color="#4B97B4"
					color="#ffffff"/>

			<div class="oAuth-btns mt-25 flex-column-center">


				<span class="title">
					<lang-string :title="'already_registered?'" /><router-link class="title underline ml-5" to="/sign"><lang-string :title="'sign'" /></router-link>
				</span>

				<lang-string class="title mt-26" title="sign_in_with_social_networks" />

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
	import IconTextLogo from "../icons/IconTextLogo.vue";
	import langString from "../langString.vue";
	import { localString } from "../../utils/localString";
	import axios from "axios";
	import { mapState } from "vuex";
	import InputReusable from "../reusableСomponents/InputReusable";
	import ButtonReusable from "../reusableСomponents/ButtonReusable";
	import IconVk from "../icons/IconVk";
	import IconGoogle from "../icons/IconGoogle";
	import PopupErrorReusable from "../reusableСomponents/PopupErrorReusable";
	import VueRecaptcha from 'vue-recaptcha'

	export default {
		data() {
			return {
				error: false,
				sitekey: '6Ld7BbcUAAAAAMRiV7C5mb0Co0KUpKKau6f3jky6',
				token:null,
				registrationForm: {
					username: '',
					email: '',
					password: '',
					conf_pass: ''
				},

				errors: {}
			};
		},

		computed: {
			...mapState('lang',{
				lang : state => state.locale
			}),

			queryList() {
				let {refer, categoryId} = this.$route.query;

				let query = {refer, categoryId};
				Object.keys(query).forEach(key => { if (!query[key]) delete query[key] });

				let string = '';
				Object.keys(query).forEach((key, i) => {
					let symbol = i ? '&' : '?';

					string += symbol + key + '=' + query[key];
				});

				return string
			},

		},

		methods: {

			onCaptchaExpired () {
				this.$refs.recaptcha.reset()
			},
			setCurrentTOken(recaptchaToken) {
				this.token = recaptchaToken;
			},
			lstr(str) {
				localString(this.lang, str);
			},

			updateField(val, key) {
				this.registrationForm[key] = val;
			},
			validate(){
				this.$refs.recaptcha.execute();
			},
			async submit(form) {
				
				try {
					let registerFormData = new FormData();
					registerFormData.append("login", form.username);
					registerFormData.append("email", form.email);
					registerFormData.append("pass", form.password);
					registerFormData.append("passConfirm", form.conf_pass);
					// registerFormData.append("recaptcha", this.token);
					
					let {status} = await axios.post(`${process.env.VUE_APP_MAIN_API}/auth/register${this.queryList}`, registerFormData);
					
					if (status === 200) {
						if (this.$route.query.refer) delete this.$route.query.refer;
						
						try {
							let loginFormData = new FormData();
							loginFormData.append("field_email", form.email);
							loginFormData.append("field_password", form.password);
							let {status} = await axios.post(`${process.env.VUE_APP_MAIN_API}/auth/login`, loginFormData);
							
							if (status === 200) {
								this.$store.commit("authentication/setAuthenticated", true);
								
								if (this.$route.query.redirectToPoll) {
									this.$router.push({name: "singlePoll", params: {id: this.$route.query.redirectToPoll}});
								} else {
									this.$router.push({path: "/"});
								}
							}
						} catch (e) {
							console.error('Error sending sign form: ', e);
						}
						
					}
				} catch (e) {
					console.error('Error sending registration form: ', e);
					
					this.error = true;
					let er = this.errors;
					for (let { field: f, errorCode: v } of error.response.data) {
						er[f] = v;
					}
					this.$forceUpdate();
				}
				
			}
		},
		mixins: [langMixin],
		components: {
			VueRecaptcha,
			PopupErrorReusable,
			ButtonReusable,
			InputReusable,
			IconBase,
			IconLogo,
			IconTextLogo,
			langString,
			IconVk,
			IconGoogle
		}
	};
</script>

<style lang="scss">
	.auth-panel {

		.buttons-block {

			.reg-btn {
				width: 100%;
			}
		}
	}
</style>
