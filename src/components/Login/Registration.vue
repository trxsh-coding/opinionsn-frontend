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
<!--		<span class="logo-caption">Социальная сеть слоган</span>-->
		<div class="form-block">

			<el-form :model="registrationForm" ref="registrationForm">

				<el-form-item :label="lstr('username')" >

					<el-input v-model="registrationForm.username" autocomplete="on"  @keyup.enter.native="submitRegistration(registrationForm)"/>

					<lang-string class="error" :title="errors.login"/>

				</el-form-item>

				<el-form-item :label="lstr('email')" :class="{padding : error }">

					<el-input v-model="registrationForm.email"   @keyup.enter.native="submitRegistration(registrationForm)"/>

					<lang-string class="error" :title="errors.email"/>

				</el-form-item>

				<el-form-item :label="lstr('password')" :class="{padding : error }">

					<el-input  type="password" v-model="registrationForm.password"  @keyup.enter.native="submitRegistration(registrationForm)"/>

					<lang-string class="error" :title="errors.pass"/>

					<lang-string class="error" :title="errors.passConfirm"/>


				</el-form-item>

				<el-form-item :label="lstr('confirm_password')" :class="{padding : error }">

					<el-input type="password" v-model="registrationForm.conf_pass"  @keyup.enter.native="submitRegistration(registrationForm)"/>

					<lang-string class="error" :title="errors.passConfirm"/>

				</el-form-item>
			</el-form>

		</div>
		<div class="buttons-block">
			<el-button class="primary-btn" @click="submitRegistration(registrationForm)">
				<lang-string  :title="'registration'"/>
			</el-button>
			<div class="registration__item">

				<lang-string :title="'already_registered?'" /> <router-link class="underline" to="/sign"><lang-string :title="'sign'" /></router-link>

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
	export default {
		data() {
			return {
				error: false,
				registrationForm: {
					username: null,
					email: null,
					password: null,
					conf_pass: null
				},

				errors: {}
			};
		},

		methods: {
			submitRegistration(form) {
				let registerFormData = new FormData();
				registerFormData.append("login", form.username);
				registerFormData.append("email", form.email);
				registerFormData.append("pass", form.password);
				registerFormData.append("passConfirm", form.conf_pass);
				axios
					.post(`${process.env.VUE_APP_MAIN_API}/auth/register`, registerFormData)
					.then(response => {
						if (response.status === 200) {
							this.$router.push({
								name: "sign",
								query: this.$route.query
							});
						}
					})

					.catch(error => {
						this.error = true;
						let er = this.errors;
						for (let { field: f, errorCode: v } of error.response
							.data) {
							er[f] = v;
						}
						this.$forceUpdate();
					});
			}
		},

		computed: {
			errorFields() {
				let fields = [
					["field_login", ""],
					["field_password", ""],
					["passConfirm", ""],
					["email", ""],
					["login", ""]
				];

				let map = this.errors;
				for (let [i, v] of fields) {
					map[i] = v;
				}
				return map;
			}
		},
		watch: {},
		mixins: [langMixin],
		components: {
			IconBase,
			IconLogo,
			IconTextLogo,
			langString
		}
	};
</script>

<style lang="scss">

</style>
