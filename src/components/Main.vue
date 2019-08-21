<template lang="html">
	<section>
		<desktop-header
				v-if="!mobile"
				:user="user"/>

		<section class="main-layout container pb-62" :style="(routeName === 'pollFeed' || routeName === 'voteFeed' || routeName === 'singlePoll') && mobile ? {paddingTop: '52px'} : {}">

			<aside v-if="!mobile">
				<aside-desktop />
			</aside>
			
			<mobile-header :user="user" v-if="mobile"  />
			<keep-alive>
				<router-view class="sub-container "/>

			</keep-alive>

			<div
					v-if="routeName === 'pollFeed' || 'singlePoll'"
					id="undo-panel"
					class="pointer"
					:class="{'active': !!$root.timer_id, 'desktop': !mobile}"
					@click="clearTimer">

				<lang-string class="description" title="undo_choice" />

				<span class="timer" v-show="timer !== null">{{timer}}</span>

				<div
						class="undo-bar"
						:class="{'active': !!$root.timer_id}"
						:style="{transition: `${$root.timer_duration}ms`}"></div>
				
			</div>
			
			<footer v-if="!Object.keys(user).length && auth_bar">
				<div class="auth-block">
					<div class="logo-block">
						<div class="icon logo picture-25x25 mr-6"
						     :style="{ 'background-image': 'url(' + require('./assets/icons/icon-logo.png') + ')' } "/>
						<icon-base
								fill="none"
								class="text-logo"
								width="66"
								height="15"
								viewBox="0 0 66 15"
								icon-name="text-logo">
							<icon-text-logo/>
						</icon-base>
					</div>
					<div class="buttons-block mr-10">
					<span class="icon-exit pointer" @click="auth_bar = !auth_bar">
						<icon-base
								fill="none"
								class="icon-close"
								width="17"
								height="17"
								viewBox="0 0 17 17"
								icon-name="close"><icon-close/>
						</icon-base>
					</span>
						<router-link :to="{ path: 'login' }">
							<button-reusable
									font-size="13"
									class="v-center py-5 mb-10"
									bor-rad="50"
									bg-color="#4b97b4"
									color="#ffffff"
									active-color="#4B97B4"
									description="login"
									@click.native="setTypeOfSearch('USER')"
							/>
						</router-link>
						
						<router-link :to="{ path: 'registration' }">
							<lang-string class="registration-span pointer" :title="'registration'"/>
						</router-link>
					</div>
				</div>
			</footer>

			<mobile-footer  v-if="mobile && !!Object.keys(user).length"/>
		</section>
	</section>
</template>

<script>

	import {mapState} from "vuex";
	import IconBase from "./icons/IconBase";
	import IconClose from "./icons/IconClose";
	import IconTextLogo from "./icons/IconTextLogo";
	import {localString} from "../utils/localString.js";
	import mobileHeader from "./view/mobile/header"
	import mobileFooter from "./view/mobile/footer"
	import IphoneAddToScreenComponent from "./pwaSnippets/IphoneAddToScreenComponent"
	import Bowser from "bowser"
	import asideDesktop from "./view/desktop/aside";
	import DesktopHeader from "./view/desktop/header";
	import langString from "./langString";
	import ButtonReusable from "./reusableСomponents/ButtonReusable";

	export default {

		data() {
			return {
				timer: 0,
				temp_timer_id: null,
				auth_bar: true
			};
		},
		watch: {

			timer_id(old) {
				if (old !== null) {
					this.reverseTimeout();
				}
			},

			user(old) {
				if (!!Object.keys(old).length) {
					this.$store.commit('formManagment/SET_INITIAL_FORM', {form: 'edit_form', value: {...old, errors: {}} });
				}
			}

		},
		computed: {
			
			mobile() {
				return this.$root.mobile;
			},

			...mapState('globalStore', {

				user: ({ mainUser }) => mainUser

			}),
			
			test() {
				return this.$root.timer_id
			},

			routeName: function(){

				return this.$route.name

			},

			iosNotificationCloseCheck: function () {

				return window.localStorage.getItem('iosNotificationPwa' !== 'False');
			},

			timer_id() {
				return this.$root.timer_id;
			}

		},
		methods: {

			reverseTimeout() {

				if (!!this.$root.timer_duration) {
					clearTimeout(this.temp_timer_id);

					this.timer = this.$root.timer_duration / 1000;
					let reverseTimer = () => {

						let run = () => {
							this.timer -= 1;
							if (this.timer === 0) {
								this.timer = 0;
								clearTimeout(this.temp_timer_id);
							} else {
								this.temp_timer_id = setTimeout(run, 1000);
							}
						};

						this.temp_timer_id = setTimeout(run, 1000);

					};
					reverseTimer();

				}

			},

			clearTimer() {
				clearTimeout(this.$root.timer_id);
				clearTimeout(this.temp_timer_id);
				this.$root.timer_id = null;
				this.$root.timer_duration = 0;
				this.$root.temp_selected_option = null;
			},

			closeInstall(){

				this.showInstallMessage = false;
				window.localStorage.setItem('iosNotificationPwa', 'False');

			},
			getPathWithPoll(name) {

				let [, pageName, pollId] = this.$route.path.split('/');

				if (pageName === 'singlePoll') {
					return {name, query: {redirectToPoll: pollId}}
				} else {
					return {name}
				}

			},



			createSubscription() {

				this.$store.dispatch('serviceWorker/CREATE_SUBSCRIPTION')

			},

			toggleSubscription() {

				this.$store.dispatch('serviceWorker/TOGGLE_SUBSCRIPTION')

			},

			showNotification() {
				this.$store.dispatch('serviceWorker/SHOW_NOTIFICATION')
			},
			getNotifications() {
				this.$store.dispatch("notificationPage/list", {customUrl: `${process.env.VUE_APP_NOTIFICATION_API}/notification/${this.page}`});
			},


			goMain() {
				this.$router.push({path: "/pollFeed"});
			},

			iosAddToHomeScreenSnippet(){

				const isIos = () => {
					const browser = Bowser.getParser(window.navigator.userAgent).getBrowserName();
					return /Safari/.test(browser);
				}
				// Detects if device is in standalone mode
				const isInStandaloneMode = () => (window.matchMedia('(display-mode: standalone)').matches);
				console.log(isInStandaloneMode())

				// Checks if should display install popup notification:
				if (isIos() && !isInStandaloneMode()) {
					this.showInstallMessage = true
				}

			},

		},

		created() {
			this.$store.dispatch("userPage/getMainUser");
			this.$store.dispatch("lang/getLocaleString");
            this.$store.dispatch("serviceWorker/CREATE_SUBSCRIPTION")

        },
		mounted() {
			this.iosAddToHomeScreenSnippet();
			this.getNotifications();
			window.addEventListener("scroll", this.onScroll);
			this.$store.commit("serviceWorker/SET_NOTIFICATION_SUPPORT")

		},

		beforeDestroy() {
			window.removeEventListener("scroll", this.onScroll);
		},


		beforeCreate() {



		},
		components: {
			ButtonReusable,
			asideDesktop,
			DesktopHeader,
			IphoneAddToScreenComponent,
			mobileHeader,
			mobileFooter,
			langString,
			IconBase,
			IconClose,
			IconTextLogo
		}
	};
</script>

<style lang="scss">
	body {
		background: #F8F8F8;
		margin: 0;
	}

	#undo-panel {
		position: fixed;
		z-index: 6000;
		bottom: 49px;
		left: 0;
		width: 100%;
		height: 40px;
		background-color: #B6B6B6;
		display: flex;
		align-items: stretch;
		visibility: hidden;

		* {
			font-family: Roboto, sans-serif;
			font-style: normal;
			font-weight: normal;
			font-size: 14px;
			color: #FFFFFF;
		}

		&.desktop {
			bottom: 0;
		}

		.timer {
			position: absolute;
			transform: translateY(-50%);
			top: 50%;
			right: 20px;
			z-index: 100;
		}

		.description {
			position: absolute;
			transform: translate(-50%, -50%);
			top: 50%;
			left: 50%;
			z-index: 100;
		}

		&.active {
			visibility: visible;
		}

		.undo-bar {
			background-color: #4B97B4;
			opacity: 0.75;
			width: 0;
			transition-timing-function: linear;
			
			&.active {
				width: 100%;
			}
		}
	}

	.main-layout {
		display: flex;
		section {

		}
		
		footer {
			width: 100%;
			height: 92px;
			background: rgba(21, 45, 58, 0.9);
			box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.06);
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 20;
		}
		
		.auth-block {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 92px;
			width: 760px;
			margin: auto;
			padding-left: 260px;
			
			@media only screen and (min-width: 300px) and (max-width: 765px) {
				box-sizing: border-box;
				width: 100%;
				padding-left: 10px;
				padding-right: 34px !important;
			}
			
			.buttons-block {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				position: relative;
				
				a {
					text-decoration: none;
				}
				
				.icon-exit {
					position: absolute;
					right: -36px;
					top: -14px;
				}
				
				a {
					text-align: center;
				}
				
				a:active {
					text-decoration: none;
				}
				
				.registration-span {
					font-family: Roboto;
					font-style: normal;
					font-weight: 500;
					font-size: 13px;
					line-height: 17px;
					text-align: center;
					text-transform: capitalize;
					
					color: #d6dadd;
				}
			}
			
			.logo-block {
				display: flex;
				align-items: center;
				
				/*margin-left: 25%;*/
				
				.text-logo {
					path {
						fill: #ffffff;
					}
				}
			}
		}
	}

	@media only screen
	and (min-width: 300px)
	and (max-width: 765px){
		body {
			margin: 0;
			background: #ffffff;
		}
	}

</style>
