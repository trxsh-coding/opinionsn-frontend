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
		
		<div class="form-block mt-58">
			
			<input-reusable class="mx-auto"
			                :value="signForm.email"
			                @change="updateField(arguments[0], 'email')"
			                inputPlaceholder="username"
			                width="271"
			                input
			                with-underline/>
			
			<input-reusable class="mx-auto mt-30"
			                input-type="password"
			                :value="signForm.password"
			                @change="updateField(arguments[0], 'password')"
			                inputPlaceholder="password"
			                width="271"
			                input
			                with-underline/>
		
		</div>
		
		<div class="buttons-block mt-20">
			
			<router-link class="ml-auto restore-btn" to="/restore">
				<lang-string :title="'forgot_your_password?'"/>
			</router-link>
			
			<button-reusable
					@click.native="submitSign(signForm)"
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
			
			<div class="oAuth-btns flex-column">
				<lang-string title="sign_in_with_social_networks" />
				
			</div>
			
			<a class="google-btn" href="https://opinionsn.com/api/oauth2/google">
				<icon-base
						class="logo"
						fill="none"
						icon-name="google-logo">
					<icon-google/>
				</icon-base>
				<span class="google-button__text">Sign in with Google</span>
			</a>
			
			<div class="registration__item">
				
				<div>
					<lang-string :title="'forgot_your_password?'"/>
					<router-link to="/restore">
						<lang-string :title="'restore'"/>
					</router-link>
				</div>
				<div class="mt-10">
					<lang-string :title="'dont_have_account'"/>
					<router-link :to="getPath('registration')">
						<lang-string :title="'registration'"/>
					</router-link>
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
	import IconTextLogo from "../icons/IconTextLogo.vue";
	import langString from "../langString.vue";
	import {localString} from "../../utils/localString";
	import {mapState} from "vuex";
	import axios from "axios";
	import InputReusable from "@/components/reusableСomponents/InputReusable";
	import ButtonReusable from "@/components/reusableСomponents/ButtonReusable";
	
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
		
		methods: {
			pollNotify() {
				this.$message(
					"Чтобы поучаствовать в опросе, необходимо зарегистрироваться"
				);
			},
			
			updateField(val, key) {
				this.signForm[key] = val;
			},
			
			getPath(name) {
				return {name, query: this.$route.query};
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
									params: {id: this.$route.query.redirectToPoll}
								});
							} else {
								this.$router.push({path: "/"});
							}
						}
					})
					
					.catch(error => {
						let er = this.errors;
						for (let {field: f, errorCode: v} of error.response
							.data) {
							er[f] = v;
						}
						this.$forceUpdate();
					});
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
			if (this.$route.query.redirectToPoll) {
				this.pollNotify();
			}
		},
		
		mixins: [langMixin],
		components: {
			ButtonReusable,
			InputReusable,
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
		
	}
</style>
