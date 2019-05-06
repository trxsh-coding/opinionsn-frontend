<template lang="html">
    <div id="register">
        <div class="register-section">
            <div class="navbar-brand">
                <div class="navbar__item">
                    <icon-base
                            fill="none"
                            class="icon"
                            width="75"
                            height="64"
                            viewBox="0 0 23 24"
                            icon-name="logo"><icon-logo />
                    </icon-base>
                </div>
                <div class="navbar__item">
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
			<span class="logo-caption">Социальная сеть слоган</span>
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
                <el-button class="secondary-btn" @click="submitRegistration(registrationForm)">
                    <lang-string  :title="'registration'"/>
                </el-button>
                <div class="registration__item">

                    <lang-string :title="'already_registered?'" /> <router-link class="underline" to="/sign"><lang-string :title="'sign'" /></router-link>

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
					.post("/api/auth/register", registerFormData)
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
	html {
		background: #ffffff;
	}

	#register {
		justify-content: center;
		height: 100%;
		display: flex;
		align-items: center;
		background: #ffffff;
		flex-direction: column;

		input {
			outline: none;
		}

		.padding {
			padding: 0px !important;
		}

		.register-section {
			text-align: center;
			width: 329px;
			display: flex;
			flex-direction: column;
			.form-block {
				width: 100%;
				input {
					border-radius: 12px;
				}
			}

			.logo-caption {
				margin-top: 7px;

				font-family: Roboto;
				font-style: normal;
				font-weight: normal;
				font-size: 13px;
				line-height: 18px; /* identical to box height, or 138% */

				color: rgba(21, 43, 58, 0.8);
			}

			.buttons-block {
				.registration__item {
					text-align: center !important;
					margin-top: 20px;
					@extend .el-form-item__label;
					a {
						color: #8a9499;
					}
				}
				.el-button {
					width: 271px;
					background: #4b97b4;
					color: #ffffff;
				}
			}
		}

		.navbar-brand {
			.icon-text {
				margin-top: 12.64px;
			}
		}
		.el-main {
			background: #ffffff;
		}

		.login-box {
			width: 359px;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			height: 50%;
		}
		.errorFields {
			border-width: 0.9px;
			border-color: #ff000d;
			border-style: solid;
			border-radius: 5px;
		}

		.el-form-item__label {
			font-family: Roboto;
			font-style: normal;
			font-weight: normal;
			font-size: 12px;
			line-height: 12px;
			text-align: justify;
			letter-spacing: -0.2px;
			color: #8a9499;
			line-height: 30px !important;
			padding-left: 15px;
		}

		.el-form-item {
			margin-bottom: 0px !important;
			padding-bottom: 10px;
			text-align: left;
		}
		.el-form-item__content {
			line-height: 28px;
		}
		.error {
			font-family: Roboto;
			font-style: normal;
			font-weight: 300;
			font-size: 11px;
			line-height: 12px;
			text-align: justify;
			letter-spacing: -0.2px;
			color: #ff5454;
			padding-left: 15px;
		}
		@media only screen and (max-device-width: 700px) {
			.register-section {
				width: 359px !important;
				height: 100%;

				.buttons-block {
					display: flex;
					justify-content: space-between;
					flex-direction: column;
					align-items: center;
					.el-button {
						font-family: Roboto;
						font-style: normal;
						font-weight: normal;
						font-size: 16px;
						color: #ffffff;
						text-transform: uppercase;
					}
				}

				.navbar-brand {
					margin-top: 60px;
				}

				.form-block {
					.el-form {
						padding: 28px 15px 38px;
						text-align: center;
						display: flex;
						justify-content: center;
						flex-direction: column;
						align-items: center;

						.el-input__inner {
							width: 329px;
							border: 1px solid #c4ccd0;
							box-sizing: border-box;
							border-radius: 18px;
						}
					}
				}
			}
		}
	}
</style>
