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