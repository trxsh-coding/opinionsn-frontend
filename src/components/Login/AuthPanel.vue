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

		* {
			font-family: Roboto;
			font-style: normal;
		}

		.section {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 271px;
			position: relative;

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
				position: relative;
				width: 271px;
			}

			.buttons-block {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 100%;

				.auth-btn {
					width:100%;
					border: 1px solid #4B97B4;
				}

				.restore-btn {
					font-weight: normal;
					font-size: 12px;
					text-decoration-line: underline;
					color: #8A9499;
				}

				.oAuth-btns {
					width: 100%;

					.title {
						font-weight: normal;
						font-size: 15px;
						display: flex;
						align-items: center;
						color: #8A9499;
					}

					.btns {
						width: 100%;

						.vk-btn {
							border: none;
						}

						.soc-btn {
							border: 1px solid #4B97B4;
							width: 130px;
						}
					}
				}

				.registration__item {
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