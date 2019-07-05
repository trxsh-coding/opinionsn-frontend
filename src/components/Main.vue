<template lang="html">
	<section >
		<desktop-header :user="user"/>

		<section class="main-layout container">

			<aside>
				<aside-desktop />
			</aside>
			<mobile-header :user="user" v-if="(routeName === 'pollFeed' || routeName === 'voteFeed') && mobile" />
			<router-view class="sub-container margin-auto"/>

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

				user: ({mainUser}) => mainUser

			}),

			routeName: function(){

				return this.$route.name

			},
			iosNotificationCloseCheck: function () {

				return window.localStorage.getItem('iosNotificationPwa' !== 'False');
			}

		},
		methods: {

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
			mobileFooter
		}
	};
</script>

<style lang="scss">
	body {
		background: #F8F8F8;
		margin: 0;
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
