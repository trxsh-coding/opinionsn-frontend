<template lang="html">
	<div class="auth-panel">
		<login class="section" v-if="$route.path === '/login'"/>
		<registration class="section" v-if="$route.path === '/registration'"/>
		<sign class="section" v-if="$route.path === '/sign'"/>
		<restore class="section" v-if="$route.path === '/restore'"/>
		<token class="section" v-if="$route.path === '/token'"/>
	</div>
</template>

<script>
	import Login from './Login';
	import Registration from './Registration';
	import Restore from './Restore';
	import Sign from './Sign';
	import Token from './Token';
	
    export default {
        name: "AuthPanel",
		components: {
			Login,
			Registration,
			Restore,
			Sign,
			Token
		}
    }
</script>

<style lang="scss">
	.auth-panel {
		background: #ffffff !important;
		width: 100%;
		display: flex;
		height: 100%;
		justify-content: center;
		align-items: center;

		.section {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			font-family: Roboto;
			font-style: normal;

			.navbar-brand {
				.navbar__item-2 {
					margin-top: 13px;
				}
			}

			.logo-caption {
				margin-top: 6px;

				font-weight: 300;
				font-size: 13px;
			}

			.form-block {
				margin-top: 26px;
				width: 329px;

				.el-form-item {
					padding: 0 !important;
					margin: 0 !important;

					.el-form-item__content {
						line-height: 1;

						&:nth-child(2) {
							margin-bottom: 6px;
						}

						.lang-string {
							margin-left: 12px;
							font-style: normal;
							font-weight: 300;
							font-size: 11px;
							color: #FF5454;

							line-height: 1;
						}
					}

					.el-form-item__label {
						margin-left: 12px;

						font-weight: normal;
						font-size: 12px;
						color: #8A9499;

						line-height: 1;
						margin-bottom: 6px;
					}

					.el-input {
						height: 36px;
						margin-bottom: 6px;

						input {
							border: 0.7px solid #8A9499;
							border-radius: 12px;
						}
					}
				}

			}

			.buttons-block {
				margin-top: 29px;

				display: flex;
				flex-direction: column;
				align-items: center;

				.el-button {
					margin: 0;
					width: 271px;
					height: 42px;

					.lang-string {
						font-style: normal;
						font-weight: normal;
						font-size: 17px;
						font-variant: small-caps;
						color: #FFFFFF;
					}
				}

				.registration__item {
					margin-top: 28px;
					display: inline-block;

					* {
						font-size: 12px;
						font-weight: normal;

						color: rgba(21, 43, 58, 0.6);
					}

					a {
						text-decoration: underline;
					}
				}

			}
		}

		@media only screen
			and (max-width: 375px) {
				.section {
					.form-block {
						width: 300px;
					}
				}
		}
	}
</style>