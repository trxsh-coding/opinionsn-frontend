<template lang="html">
	<section>
		<desktop-header
				v-if="!mobile"
				:user="user"/>

		<section class="main-layout container pb-62" :style="(routeName === 'pollFeed' || routeName === 'voteFeed' || routeName === 'singlePoll') && mobile ? {paddingTop: '48px'} : {}">

			<aside v-if="!mobile">
				<aside-desktop />
			</aside>
			<mobile-header :user="user" v-if="mobile" />
			<router-view class="sub-container "/>

			<div
					:class="{'active': !!$root.timer_id, 'desktop': !mobile}"
					@click="clearTimer"
					class="undo-panel pointer">

				<lang-string class="description" title="cancel" />

				<div
						:class="{'active': !!$root.timer_id}"
						:style="{transition: `${$root.timer_duration}ms`}"
						class="undo-bar"></div>
			</div>

			<mobile-footer  v-if="mobile"/>
		</section>
	</section>
</template>

<script>

	import {mapState} from "vuex";
	import {localString} from "../utils/localString.js";
	import mobileHeader from "./view/mobile/header"
	import mobileFooter from "./view/mobile/footer"
	import IphoneAddToScreenComponent from "./pwaSnippets/IphoneAddToScreenComponent"
	import Bowser from "bowser"
	import DesktopHeader from "./view/desktop/header";
	import asideDesktop from "./view/desktop/aside";
	import langString from "./langString";

	export default {

		data() {
			return {
				mobile: this.$root.mobile,
			};
		},
		watch: {

		},
		computed: {

			...mapState('globalStore', {

				user: ({ mainUser }) => mainUser

			}),

			routeName: function(){

				return this.$route.name

			},
			iosNotificationCloseCheck: function () {

				return window.localStorage.getItem('iosNotificationPwa' !== 'False');
			}

		},
		methods: {

			clearTimer() {
				clearTimeout(this.$root.timer_id);
				this.$root.timer_id = null;
				this.$root.timer_duration = 0;
			},

			closeInstall(){

				this.showInstallMessage = false
				window.localStorage.setItem('iosNotificationPwa', 'False')

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
			asideDesktop,
			DesktopHeader,
			IphoneAddToScreenComponent,
			mobileHeader,
			mobileFooter,
			langString
		}
	};
</script>

<style lang="scss">
	body {
		background: #F8F8F8;
		margin: 0;
	}

	.undo-panel {
		position: fixed;
		bottom: 49px;
		left: 0;
		width: 100%;
		height: 40px;
		background-color: crimson;
		display: flex;
		align-items: stretch;
		visibility: hidden;

		&.desktop {
			bottom: 0;
		}

		.description {
			position: absolute;
			transform: translate(-50%, -50%);
			top: 50%;
			left: 50%;
		}

		&.active {
			visibility: visible;
		}

		.undo-bar {
			background-color: aquamarine;
			width: 0;

			&.active {
				transition-timing-function: linear;
				width: 100%;
			}
		}
	}

	.main-layout {
		display: flex;
		section {

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
