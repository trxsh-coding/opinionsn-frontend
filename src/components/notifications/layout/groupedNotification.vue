<template>
	<div class="grouped-notification pl-21 flex pointer" @click="showGrouped(true)" :class="{todayColor : today}">
		<div class="notification__item flex-between flex-align-center">
			<picture-reusable
					avatar
					class=" p-0 pointer mr-3"
					pic-class="mb-5"
					:img="publicPath + author.path_to_avatar"
					:size="36"
					rounded
					text-layout="bottom">
				<template #title>
					<span> {{author.username}} <lang-string class="event-span lowercase" :title="'participated_in'"/> {{items.length}} <lang-string
							class=" lowercase event-span" :title="'events'"/></span>
				</template>
				<template #description>
					<time-trans class="  date mt-4" transformed-time :time="items[0].date"/>
				</template>
			
			</picture-reusable>
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
	import PictureReusable from "../../reusableСomponents/PictureReusable";
	import TimeTrans from "../../timeTrans";
	import {mapState} from 'vuex';
	import LangString from "../../langString";
	import IconBase from "../../icons/IconBase";
	import IconArrow from '../../icons/create/IconArrow';
	
	export default {
		name: "groupedNotification",
		components: {LangString, TimeTrans, PictureReusable, NotificationInstance, IconArrow, IconBase},
		props: {
			items: Array,
			today: Boolean
		},
		data() {
			return {
				publicPath: process.env.VUE_APP_MAIN_API,
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
			
		},
		methods: {
			showGrouped(payload) {
				this.hide = !this.hide
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
		
		.notification-block {
			padding-left:42px;
		}
		
		.text {
			width: 100%;
			padding-left: 18px;
			
		}
		.notification__item {
			min-height: 48px;
		}
		.event-span {
			font-family: Roboto;
			font-style: normal;
			font-weight: normal;
			font-size: 13px;
			color: #76787A;
		}
		
		.picture-reusable {
			flex-direction: row !important;
			width: auto;
			
			.text {
			
			}
			
			.picture-wrapper {
			
			}
		}
	}
</style>