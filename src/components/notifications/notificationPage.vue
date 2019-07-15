<template>
	<div
			class="notificationWrapper"
			@scroll="handleSectionScroll"
			ref="sectionRef"
			:class="{ 'scroll': route_name === 'notifications' }">
		<div class="notification-section flex-column" v-if="messages.length && !closed">
			<div class="today flex-column flex-center" v-if="filtered_messages.today.length">
				<notification-instance
						class="notification-instance today pl-21"
						v-for="(notification, index) in filtered_messages.today"
						:notification="notification"
						:key="index"
				/>
			</div>

			<div class="yesterday flex-column" v-if="filtered_messages.yesterday.length">
				<lang-string class="title my-12 pl-60" title="yesterday"/>
				<notification-instance
						class="notification-instance yesterday pl-21"
						v-for="(notification, index) in filtered_messages.yesterday"
						:notification="notification"
						:key="index"
				/>
			</div>

			<div class="week flex-column" v-if="filtered_messages.week.length">
				<lang-string class="title my-12 pl-60" title="week"/>
				<notification-instance
						class="notification-instance week pl-21"
						v-for="(notification, index) in filtered_messages.week"
						:notification="notification"
						:key="index"
				/>
			</div>

			<div class="month flex-column" v-if="filtered_messages.month.length > 0">
				<lang-string class="title my-12 pl-60" title="month"/>
				<notification-instance
						class="notification-instance month pl-21"
						v-for="(notification, index) in filtered_messages.month"
						:notification="notification"
						:key="index"
				/>
			</div>
		</div>

		<div class="nope" v-else-if="messages.length == 0">
			<span>Уведомлений нет</span>
		</div>

	</div>
</template>

<script>
	import feedBlock from './feedBlock'
	import {mapState} from 'vuex'
	import MugenScroll from 'vue-mugen-scroll'
	import langString from '../langString'
	import NotificationInstance from "./layout/notificationInstance"
	import moment from "moment";

	export default {
		name: "notificationPage",
		components: {NotificationInstance, feedBlock, MugenScroll, langString },
		props: {
			scrollDifference: Number
		},
		watch: {
			scrollDifference(old) {
				if (old > -20) {
					this.load();
				}
			}
		},
		computed: {
			...mapState("notificationStore", {
				messages: s => s.messages
			}),
			...mapState('notificationPage', {
				counter: state => state.counter,
				page: state => state.page,
				loaded: state => state.loaded,
				loading: state => state.loading,
				spinner: state => state.spinner
			}),

			route_name() {
				return this.$route.name;
			},

			filtered_messages() {

				let msgs = {
					today: [],
					yesterday: [],
					week: [],
					month: []
				};

				this.messages.forEach( ({date}, i) => {
					let today = parseInt(moment(new Date()).format('DDDD'), 10),
						current = parseInt(moment(date).format('DDDD'), 10),
						difference = today - current;

					switch (true) {
						case difference = 0:
							msgs.today.push(this.messages[i]);
							break;
						case difference = 1:
							msgs.yesterday.push(this.messages[i]);
							break;
						case difference > 7 && difference <= 31:
							msgs.week.push(this.messages[i]);
							break;
						default:
							msgs.month.push(this.messages[i]);
							break;
					}
				} );

				return msgs;
			}
		},
		methods: {

			handleSectionScroll() {
				if (this.route_name === 'notifications') {
					let {sectionRef} = this.$refs;
					let scroll_difference = sectionRef.scrollTop + sectionRef.offsetHeight - sectionRef.scrollHeight;
					if (scroll_difference === 0) this.load();
				}
			},

			load() {
				this.$store.dispatch('notificationPage/list', {customUrl: `${process.env.VUE_APP_NOTIFICATION_API}/notification/${this.page}`});
			},

		},

		mounted() {
			this.$store.dispatch('notificationPage/readInitialNotifications');
			this.load();
		}

	}
</script>

<style lang="scss">
	.notificationWrapper {
		width: 100%;

		&.scroll {
			overflow-y: scroll;
			height: 100vh;
		}

		.notification-section {
			background: #FFFFFF;
			border-radius: 6px;

			.title {
				width: fit-content;
				margin-right: auto;

				font-family: Roboto;
				font-style: normal;
				font-weight: 500;
				font-size: 14px;
				color: #1A1E22;

			}

			.notification-instance {

				&.today {
					background-color: #e4f0f4;
				}

			}

		}

		.nope {

			text-align: center;

			span {

				color: #69777F;
				font-family: Roboto;
				font-style: normal;

			}
		}
	}
</style>
