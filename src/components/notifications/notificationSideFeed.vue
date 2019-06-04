<template>
	<transition-group name="list" tag="div" class="notification-container flex-column">
		<div v-for="(notification, notification_index) in items.slice(0, 3)" :key="notification_index">
			<div class="close-all-btn v-center mb-6" @click="closeAllNotifications" v-show="notification_index == 0">
				<lang-string class="pointer" :title="'close_all_notifications'" />
			</div>

			<notification-block
				:notification="notification"
			/>
		</div>
	</transition-group>
</template>

<script>
	import notificationBlock from "./notificationBlock";
	import { mapState } from "vuex";
	import langString from "../langString";


	export default {
		name: "notificationSideFeed",
		components: {
			notificationBlock,
			langString
		},
		computed: {
			...mapState("notificationPage", {
				items: s => s.items
			})
		},
		methods: {
			closeAllNotifications() {
				this.$store.commit('notificationPage/closeAllNotifications');
			}
		},
	};
</script>

<style lang="scss">
	.notification-container {
		position: fixed;
		bottom: 5%;
		right: 2%;
		justify-content: flex-end;
		z-index: 20000;
		max-height: 90%;
		width: 220px;

		.close-all-btn {
			span {
				font-family: Roboto;
				font-style: normal;
				font-weight: normal;
				font-size: 11px;
				color: rgba(56, 56, 56, 0.9);
				word-break: keep-all;
			}
		}
	}

	.list-enter-active,
	.list-leave-active {
		transition: all 0.5s;
	}

	.list-enter,
	.list-leave-to {
		opacity: 0;
		transform: translateX(-100%);
	}

	.list-move {
		transition: transform 0.5s;
	}
</style>
