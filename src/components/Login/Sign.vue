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
		<!--			<span class="logo-caption">Социальная сеть слоган</span>-->
		<div class="form-block">

			<el-form :model="signForm" ref="signForm">

				<el-form-item :label="lstr('username')">

					<el-input v-model="signForm.email" autocomplete="on" @keyup.enter.native="submitSign(signForm)"/>
					<lang-string class="error" :title="errors.field_email"/>
				</el-form-item>
				<el-form-item :label="lstr('password')">

					<el-input type="password" v-model="signForm.password" @keyup.enter.native="submitSign(signForm)"/>
					<lang-string class="error" :title="errors.field_password"/>
				</el-form-item>
<!--				<div class="form-caption">-->
<!--					<el-checkbox v-model="signForm.checked">Не запоминать меня</el-checkbox>-->
<!--					<router-link :to="'restore'"><lang-string :title="'forgot_your_password?'" /></router-link>-->
<!--				</div>-->
			</el-form>

		</div>
		<div class="buttons-block">
			<el-button class="primary-btn"  @click="submitSign(signForm)">
				<lang-string  :title="'sign'"/>
			</el-button>

			<a class="google-btn" href="https://opinionsn.com/oauth2/google">
				<icon-base
					class="logo"
					fill="none"
					icon-name="google-logo"><icon-google />
				</icon-base>
<!--				<lang-string class="google-button__text" :title="'sign_google'"/>-->
				<span class="google-button__text">Sign in with Google</span>
			</a>

			<div class="registration__item">

				<div><lang-string :title="'forgot_your_password?'" /> <router-link to="/restore"> <lang-string :title="'restore'" /></router-link></div>
				<div class="mt-10"><lang-string :title="'dont_have_account'" /> <router-link :to="getPath('registration')"> <lang-string :title="'registration'" /></router-link></div>

			</div>
		</div>
	</div>

</template>

<script>
	import langMixin from "../mixins/langMixin";
	import IconBase from "../icons/IconBase.vue";
	import IconLogo from "../icons/IconLogo.vue";
	import IconGoogle from "../icons/IconGoogle.vue";
	import IconTextLogo from "../icons/IconTextLogo.vue";
	import langString from "../langString.vue";
	import { localString } from "../../utils/localString";
	import { mapState } from "vuex";
	import axios from "axios";

	export default {
		data() {
			return {
				signForm: {
					email: null,
					password: null,
					// checked: false
				},

				errors: {}
			};
		},

		methods: {
			pollNotify() {
				this.$message(
					"Чтобы поучаствовать в опросе, необходимо зарегистрироваться"
				);
			},

			getPath(name) {
				return { name, query: this.$route.query };
			},

			submitSign(form) {
				let loginFormData = new FormData();
				loginFormData.append("field_email", form.email);
				loginFormData.append("field_password", form.password);
				axios
					.post(`${process.env.VUE_APP_MAIN_API}/auth/login`, loginFormData)
					.then(response => {
						if (response.status === 200) {
							this.$store.commit(
								"authentication/setAuthenticated",
								true
							);
							if (this.$route.query.redirectToPoll) {
								this.$router.push({
									name: "singlePoll",
									params: { id: this.$route.query.redirectToPoll }
								});
							} else {
								this.$router.push({ path: "/" });
							}
						}
					})

					.catch(error => {
						let er = this.errors;
						for (let { field: f, errorCode: v } of error.response
							.data) {
							er[f] = v;
						}
						this.$forceUpdate();
					});
			}
		},

		computed: {},
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
			if (this.$route.query.redirectToPoll) {
				this.pollNotify();
			}
		},
		mixins: [langMixin],
		components: {
			IconBase,
			IconLogo,
			IconTextLogo,
			IconGoogle,
			langString
		}
	};
</script>

<style lang="scss">
.sign-section {
	.form-block {

		.form-caption {
			display: flex;
			justify-content: space-between;
			align-items: center;

			* {
				font-style: normal;
				font-weight: normal;
				font-size: 12px;
				color: #8A9499;
			}
			
			a {
				text-decoration: underline;
			}

			.el-checkbox__inner {
				/*border-radius: 50%;*/
			}
		}
	}

	.buttons-block {

		.google-btn {
			width: 271px;
			margin-top: 9px;
			cursor: pointer;
			outline: none;

			display: flex;
			justify-content: center;
			align-items: center;

			height: 40px;
			border-radius: 21px;
			border: 1px solid rgba(0, 0, 0, 0.2);
			background: white;
			color: #737373;
			white-space: nowrap;
			box-shadow: 1px 1px 0px 1px rgba(0,0,0,0.05);
			transition-property: background-color, box-shadow;
			transition-duration: 150ms;
			transition-timing-function: ease-in-out;
			padding: 0;

			&:focus,
			&:hover {
				box-shadow: 1px 4px 5px 1px rgba(0,0,0,0.1);
			}

			&:active {
				background-color: #e5e5e5;
				box-shadow: none;
				transition-duration: 10ms;
			}

			.logo {
				margin-bottom: 2px;
			}

			.google-button__text {

				margin: auto 0;

				display: inline-block;
				padding: 0 24px;
				font-size: 14px;
				font-weight: bold;
				font-family: 'Roboto',arial,sans-serif;
			}

		}
	}

}
</style>
