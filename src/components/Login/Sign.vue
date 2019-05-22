<template lang="html">
    <div id="sign" class="sign">
        <div class="sign-section">
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

                <el-form :model="signForm" ref="signForm">

                    <el-form-item :label="lstr('username')">

                        <el-input v-model="signForm.email" autocomplete="on" @keyup.enter.native="submitSign(signForm)"/>
                        <lang-string class="error" :title="errors.field_email"/>
                    </el-form-item>
                    <el-form-item :label="lstr('password')">

                        <el-input type="password" v-model="signForm.password" @keyup.enter.native="submitSign(signForm)"/>
                        <lang-string class="error" :title="errors.field_password"/>
                    </el-form-item>
					<div class="form-caption">
						<el-checkbox v-model="signForm.checked">Не запоминать меня</el-checkbox>
						<router-link :to="'restore'"><lang-string :title="'forgot_your_password?'" /></router-link>
					</div>
                </el-form>

            </div>
            <div class="buttons-block">
                <el-button class="secondary-btn"  @click="submitSign(signForm)">
                    <lang-string  :title="'sign'"/>
                </el-button>
                <div class="footer-items">
                    <div class="registration__item">

                        <lang-string :title="'dont_have_account'" /> <router-link :to="getPath('registration')"> <lang-string :title="'registration'" /></router-link>

                    </div>
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
	import { mapState } from "vuex";
	import axios from "axios";

	export default {
		data() {
			return {
				signForm: {
					email: null,
					password: null,
					checked: false
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
			langString
		}
	};
</script>

<style lang="scss">
	html {
		background: #ffffff;
	}

	#sign {
		justify-content: center;
		height: 100%;
		display: flex;
		align-items: center;
		background: #ffffff;
		flex-direction: column;

		input {
			outline: none;
		}

		.sign-section {
			text-align: center;
			width: 359px;
			display: flex;
			flex-direction: column;
			.form-block {
				width: 100%;
				input {
					border-radius: 12px !important;
				}

				.form-caption {
					margin-top: 15px;
					width: 329px;
					display: flex;
					justify-content: space-between;
				}

				.form-caption * {
					font-family: Roboto;
					font-style: normal;
					font-weight: normal;
					font-size: 12px;
					line-height: 14px;
					color: #69777f;
				}
			}

			.logo-caption {
				visibility: hidden;
				margin-top: 6px;

				font-family: Roboto;
				font-style: normal;
				font-weight: normal;
				font-size: 13px;
				line-height: 18px; /* identical to box height, or 138% */

				color: rgba(21, 43, 58, 0.8);
			}

			.buttons-block {
				margin-top: 35.65px;
				.registration__item {
					text-align: center !important;
					margin-top: 28px;
					@extend .el-form-item__label;
					a {
						color: #8a9499;
					}
				}
				.reset__item {
					@extend .registration__item;
					margin-top: 0px;
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
			height: min-content !important;
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
			.sign-section {
				// height: 100%;
				height: max-content;
			}

			.navbar-brand {
				margin-top: 60px;
			}

			.buttons-block {
				margin-top: 0 !important;
				height: 50%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				.registration__item {
					padding-left: 0px !important;
					padding-bottom: 10px;
				}
				.el-button {
					font-family: Roboto;
					font-style: normal;
					font-weight: normal;
					font-size: 16px;
					color: #ffffff;
					text-transform: uppercase;
				}
			}
			.form-block {
				.el-form {
					padding: 28px 15px 24px !important;
					text-align: center;
					display: flex;
					justify-content: center;
					flex-direction: column;
					align-items: center;

					.el-input__inner {
						width: 329px;
						border: 1px solid #c4ccd0 !important;
						box-sizing: border-box;
						border-radius: 18px !important;
					}
				}
			}
		}
	}
</style>
