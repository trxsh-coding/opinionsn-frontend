<template>
	<div
			class="notificationWrapper"
			:class="{'desktop': !mobile, 'pr-20': mobile}"
			ref="sectionRef">
		
		<div class="notification-section flex-column" v-if="Object.keys(messages).length">
			<button-reusable
					class="mt-13 mb-20"
					bg-color="#ffffff"
					button_type="underline"
					color="#1A1E22"
					active-color="#4B97B4"
					description="notifications"
					:active="true"
			/>
			<div class="today flex-column flex-center" v-if="filtered_messages.today.length">
				
				<div v-for="(notification, index) in filtered_messages.today">
					<grouped-notification
							today
							v-if="Array.isArray(notification)"
							:items="notification"
					/>
					<notification-instance
							class="notification-instance pl-21" :class="{'today' : !notification.read}"
							:notification="notification"
					/>
				</div>
			</div>
			
			<div class="yesterday flex-column" v-if="filtered_messages.yesterday.length">
				<lang-string class="title my-12 pl-60" title="yesterday"/>
				
				<div v-for="(notification, index) in filtered_messages.yesterday">
					
					<grouped-notification
							v-if="Array.isArray(notification)"
							:items="notification"
					/>
					<notification-instance
							v-if="!Array.isArray(notification)"
							class="notification-instance yesterday pl-21"
							:notification="notification"
							:key="index"
					/>
				</div>
			</div>
			
			<div class="week flex-column" v-if="!!filtered_messages.week.length">
				<lang-string class="title my-12 pl-60" title="week"/>
				
				<div v-for="(notification, index) in filtered_messages.week">
					
					<grouped-notification
							v-if="Array.isArray(notification)"
							:items="notification"
					/>
					<notification-instance
							v-if="!Array.isArray(notification)"
							class="notification-instance week pl-21"
							:notification="notification"
							:key="index"
					/>
				</div>
			</div>
			
			<div class="month flex-column" v-if="!!filtered_messages.month.length">
				<lang-string class="title my-12 pl-60" title="month"/>
				
				<div v-for="(notification, index) in filtered_messages.month">
					
					<grouped-notification
							v-if="Array.isArray(notification)"
							:items="notification"
					/>
					<notification-instance
							v-if="!Array.isArray(notification)"
							class="notification-instance month pl-21"
							:notification="notification"
							:key="index"
					/>
				</div>
			</div>
			
			<div class="later flex-column" v-if="!!filtered_messages.later.length">
				<lang-string class="title my-12 pl-60" title="later"/>
				
				<div v-for="(notification, index) in filtered_messages.later">
					
					<grouped-notification
							v-if="Array.isArray(notification)"
							:items="notification"
					/>
					<notification-instance
							v-if="!Array.isArray(notification)"
							class="notification-instance later pl-21"
							:notification="notification"
							:key="index"
					/>
				</div>
			</div>
			
			<Loader class="mx-auto mt-auto" v-show="loading"/>
		
		</div>
		
		<div class="nope" v-if="!Object.keys(messages).length && !loading">
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
	import ElementScrollHandler from "../mixins/ElementScrollHandler";
	import Loader from "../reusableСomponents/Loader";
	import ButtonReusable from "../reusableСomponents/ButtonReusable";
	import GroupedNotification from "./layout/groupedNotification";
	
	export default {
		name: "notificationPage",
		components: {
			GroupedNotification,
			ButtonReusable,
			Loader, NotificationInstance, feedBlock, langString
		},
		props: {
			scrollDifference: Boolean
		},
		watch: {
			scrolled_to_bottom(old) {
				
				if (this.route_name === 'notifications') {
					if (old === true && !this.loading) {
						this.load();
					}
				}
			},
			scrollDifference(old) {
				if (this.route_name !== 'notifications') {
					if (old === true) {
						this.load();
					}
				}
			}
		},

		data() {
			return {
				loading: false
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
				spinner: state => state.spinner
			}),
			
			mobile() {
				return this.$root.mobile;
			},
			
			scrolled_to_bottom() {
				return this.$root.scrolled_to_bottom;
			},
			
			route_name() {
				return this.$route.name;
			},
			//
			// grouped_messages(){
			// 	let {messages} = this;
			// 	messages.forEach( (item) => {
			// 		let {eventType, userId} = item;
			//
			// 		if(!combinedNotifies[eventType]) combinedNotifies[eventType] = [];
			//
			// 		combinedNotifies[eventType].push(item)
			//
			//
			// 	});
			//
			// 	return Object.values(combinedNotifies)
			//
			// },
			
			filtered_messages() {
				
				let msgs = {
					today: [],
					yesterday: [],
					week: [],
					month: [],
					later: []
				};
				
				if (!!Object.keys(this.messages).length) {
					
					
					function sortByDate(m) {
						let today = parseInt(moment(new Date()).format('DDDD'), 10),
							current = parseInt(moment(m.date).format('DDDD'), 10),
							difference = today - current;
						
						switch (true) {
							case difference === 0:
								msgs.today.push(m);
								break;
							case difference === 1:
								msgs.yesterday.push(m);
								break;
							case difference > 1 && difference <= 7:
								msgs.week.push(m);
								break;
							case difference > 7 && difference <= 31:
								msgs.month.push(m);
								break;
							default:
								msgs.later.push(m);
								break;
						}
					};
					
					this.messages.forEach(m => {
						sortByDate(m)
					});
					
					Object.keys(msgs).forEach(key => {
						
						let sorted_msgs = msgs[key].sort((a, b) => {
							if (a.initiatorId === b.initiatorId && a.eventType === b.eventType) {
								return -1;
							} else {
								return 1;
							}
						});
						
						let sorted_indexes = {};
						
						if (!!sorted_msgs.length) {
							sorted_msgs.reduce((a, b, index) => {
								
								if (a.initiatorId === b.initiatorId) {
									if (a.eventType === "VOTED" && b.eventType === "VOTED") {
										if (!sorted_indexes[a.initiatorId]) sorted_indexes[a.initiatorId] = new Set();
										sorted_indexes[a.initiatorId].add(index - 1);
										sorted_indexes[a.initiatorId].add(index);
									}
								}
								
								return b;
							});
							
							Object.values(sorted_indexes).reverse().forEach(set => {
								set = Array.from(set);
								// console.log("test", set);
								let grouped_msgs = set.map(n => sorted_msgs[n]);
								sorted_msgs.splice(set[0], set.length, grouped_msgs)
								sorted_msgs[set[0]] = grouped_msgs;
							});
							
							// sorted_indexes = Object.values(sorted_indexes).map(set => Array.from(set));
							//
							// sorted_indexes.forEach(set => {
							// 	sorted_msgs[set[0]] = set.map(n => sorted_msgs[n]);
							// });
							//
							// sorted_indexes.forEach(set => {
							// 	sorted_msgs.splice(set[1], set.length - 1)
							// })
							
						}
						
						msgs[key] = sorted_msgs;
						
					});
					
				}
				
				return msgs;
			}
		},
		methods: {
			
			async load() {
				this.loading = true;
				await this.$store.dispatch('notificationPage/list', {customUrl: `${process.env.VUE_APP_NOTIFICATION_API}/notification/${this.page}`});
				this.loading = false;
			},
			
		},
		
		mounted() {
			if (this.route_name === 'notifications') {

				this.load();

				setTimeout( () => {
					this.$store.dispatch('notificationPage/readInitialNotifications').then(() => {
						this.$store.commit('notificationStore/updateArrayChild',
								{
									mapName : 'messages',
									childName : 'read',
									payload : true
								})
					})
				}, 8000);

			} else if (!this.scrolled_to_bottom) this.load();

		}
		
	}
</script>

<style lang="scss">
	.notificationWrapper {
		width: 100%;
		
		&.desktop {
			min-height: 619px;
		}
		
		
		.notification-section {
			background: #FFFFFF;
			height: auto;
			
			.button-reusable {
				display: flex;
				justify-content: center;
				
				span {
					font-family: Roboto;
					font-style: normal;
					font-size: 15px;
					
					
				}
			}
			
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
