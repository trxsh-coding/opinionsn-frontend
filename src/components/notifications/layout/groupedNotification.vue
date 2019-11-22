<template>
	<div class="grouped-notification pl-21 flex pointer" @click="hide = !hide" :class="{todayColor : today}"
	     v-if="author">
		<div class="notification__item flex-between flex-align-center">
			
			<div class="item flex">
				<router-link class="flex avatar pointer" :to="{name: 'user', params: { id: author.id }}">
					<RePicture :url="author.path_to_avatar | addAssetsPath" size="36" rounded/>
				</router-link>
				
				<div class="caption flex-column ml-18">
					<span class="flex-align-baseline">
						<router-link class="flex username pointer" :to="{name: 'user', params: { id: author.id }}">
							{{author.username}}
						</router-link>
						
						<lang-string class="event-span lowercase mx-3" :title="'participated_in'"/>
						
						<span class="counter">{{items.length}}</span>
						
						<lang-string class="lowercase event-span ml-3" title="events"/>
					</span>
					
					<time-trans class="timestamp mt-4" transformed-time :time="items[0].date"/>
				</div>
			
			</div>
			
			<icon-base
					:class="{translate : hide}"
					fill="none"
					width="10"
					height="6"
					viewBox="0 3 10 6"
					icon-name="add">
				<icon-arrow/>
			</icon-base>
		</div>
		<div class="notification-group"
		     v-if="hide"
		>
			<notification-instance v-for="notification in items" :notification="notification"/>
		</div>
		
		<div v-show="!hide" class="rounded-border ml-49 "></div>
	</div>
</template>

<script>
	import NotificationInstance from "./notificationInstance";
	import TimeTrans from "../../timeTrans";
	import {mapState} from 'vuex';
	import LangString from "../../langString";
	import IconBase from "../../icons/IconBase";
	import IconArrow from '../../icons/create/IconArrow';
	import RePicture from "@/components/reusableСomponents/RePicture";
	
	export default {
		name: "groupedNotification",
		components: {RePicture, LangString, TimeTrans, NotificationInstance, IconArrow, IconBase},
		props: {
			items: Array,
			today: Boolean
		},
		data() {
			return {
				hide: false
			}
		},
		computed: {
			...mapState("notificationStore", {
				users: ({users}) => users,
				polls: ({polls}) => polls
			}),
			
			author() {
				return this.users[this.items[0].initiatorId]
			}
		}
	}
</script>

<style lang="scss">
	
	
	.grouped-notification {
		flex-direction: column;
		transform-origin: center center;
		
		.translate {
			transform: rotateX(180deg);
		}
		
		* {
			transition: 300ms;
			
		}
		
		.notification__item {
			min-height: 48px;
			
			.item {
				.caption {
					font-family: Roboto;
					font-style: normal;
					
					.username, .counter {
						font-weight: 500;
						font-size: 14px;
						color: #1a1e22;
					}
					
					.timestamp {
						font-size: 12px;
						font-weight: 400;
						color: #adafb3;
					}
					
					.event-span {
						font-family: Roboto;
						font-style: normal;
						font-weight: normal;
						font-size: 13px;
						color: #76787A;
					}
				}
			}
		}
		
	}
</style>