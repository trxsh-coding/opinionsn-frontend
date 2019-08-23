<template>
	<div class="notification-feed-block flex-between">
		<div class="notification-body">
			<blockchain-prediction-finished
				class="flex-align-center"
				:pollName="pollName"
				v-if="notification.eventType == 'BLOCKCHAIN_PREDICTION_FINISHED'"
			/>
			<blockchain-prediction-winner
				class="flex-align-center"
				:pollName="pollName"
				v-if="notification.eventType == 'BLOCKCHAIN_PREDICTION_WINNER'"
			/>
			<create-blockhain-prediction
				class="flex-align-center"
				:pollName="pollName"
				v-if="notification.eventType == 'BLOCKCHAIN_PREDICTION_FINISHED'"/>
			<new-blockchain-prediction
				class="flex-align-center"
				:pollName="pollName"
				:author="author"
				v-if="notification.eventType == 'CREATE_BLOCKCHAIN_PREDICTION'"
			/>
			<appointment-of-judges
				class="flex-align-center"
				:targetId="notification.targetId"
				:pollName="pollName"
				v-if="notification.eventType == 'APPOINTMENT_OF_JUDGES'"
			/>
			<subscribe
				:author="author"
				class="flex-align-center"
				v-if="notification.eventType == 'SUBSCRIBE'"
			/>
			<unsubscribe
				:author="author"
				class="flex-align-center"
				v-if="notification.eventType == 'UNSUBSCRIBE'"
			/>
			<explain-created
				:pollName="pollName"
				:message="notification.message"
				:author="author"
				:targetId="notification.targetId"
				class="flex-align-center"
				v-if="notification.eventType == 'EXPLAIN_CREATED'"
			/>
			<new-poll
				:pollName="pollName"
				class="flex-align-center"
				:targetId="notification.targetId"
				:author="author"
				v-if="notification.eventType == 'NEW_POLL'"
			/>
			<new-user class="flex-align-center" v-if="notification.eventType == 'NEW_USER'"/>
			<new-comment
				class="flex-align-center"
				:message="notification.message"
				:pollName="pollName"
				:author="author"
				v-if="notification.eventType == 'NEW_COMMENT'"
			/>
			<new-prediction
				class="flex-align-center"
				:targetId="notification.targetId"
				:pollName="pollName"
				:author="author"
				v-if="notification.eventType == 'NEW_PREDICTION'"
			/>
		</div>
		<div class="event-time">
			<time-trans class="timestamp" :time="notification.date"/>
		</div>
	</div>
</template>

<script>
	import BlockchainPredictionFinished from "./typeOfEvent/BLOCKCHAIN_PREDICTION_FINISHED.vue";
	import BlockchainPredictionWinner from "./typeOfEvent/BLOCKCHAIN_PREDICTION_WINNER.vue";
	import CreateBlockhainPrediction from "./typeOfEvent/CREATE_BLOCKCHAIN_PREDICTION.vue";
	import AppointmentOfJudges from "./typeOfEvent/APPOINTMENT_OF_JUDGES.vue";
	import Subscribe from "./typeOfEvent/SUBSCRIBE.vue";
	import Unsubscribe from "./typeOfEvent/UNSUBSCRIBE.vue";
	import ExplainCreated from "./typeOfEvent/EXPLAIN_CREATED.vue";
	import NewBlockchainPrediction from "./typeOfEvent/NEW_BLOCKCHAIN_PREDICTION.vue";
	import NewPoll from "./typeOfEvent/NEW_POLL.vue";
	import NewUser from "./typeOfEvent/NEW_USER.vue";
	import NewComment from "./typeOfEvent/NEW_COMMENT.vue";
	import NewPrediction from "./typeOfEvent/NEW_PREDICTION.vue";
	import { mapState } from "vuex";
	import MugenScroll from "vue-mugen-scroll";
	import timeTrans from "../timeTrans";

	export default {
		name: "feedBlock",
		props: ["notification"],
		components: {
			timeTrans,
			MugenScroll,
			BlockchainPredictionFinished,
			BlockchainPredictionWinner,
			CreateBlockhainPrediction,
			AppointmentOfJudges,
			Subscribe,
			Unsubscribe,
			ExplainCreated,
			NewBlockchainPrediction,
			NewPoll,
			NewUser,
			NewComment,
			NewPrediction
		},
		computed: {
			...mapState("notificationStore", {
				userMap: ({ users }) => users,
				pollMap: ({ polls }) => polls
			}),

			...mapState("globalStore", {
				mainUser: ({ mainUser }) => mainUser
			}),
			author: function() {
				let { notification, userMap } = this;

				let userID = notification.initiatorId;

				let author = userMap[userID] || {};

				return author;
			},
			pollName: function() {
				let { targetId, eventType } = this.notification;
				let poll = this.pollMap[targetId] || {};
				let poll_name = poll.subject || [];
				if (poll_name.length > 30) {
					return `«${poll_name.slice(0, 22)}...»`;
				} else {
					return `«${poll_name}»`;
				}
			}
		},

		methods: {
			dismissNotification() {},
			userLink() {
				this.$router.push({ name: "user", params: { id: this.author.id } });
			}
		},
		mounted() {
			let userID = this.notification.initiatorId;
		}
	};
</script>

<style lang="scss">
	.notification-dropdown {
	}
	.notification-feed-block:last-of-type {
		border-bottom: none !important;
	}
	.notification-feed-block {
		background: #ffffff;
		width: 100%;
		flex: 0;
		align-items: center;
		padding: 6px 0;
		border-bottom-style: solid;
		border-bottom-width: 0.5px;
		border-bottom-color: #d0d5d9;
		.timestamp {
			display: inline-block;
			font-family: Roboto;
			font-weight: 300;
			letter-spacing: -0.2px;
			font-style: normal;
			line-height: 16px;
			font-size: 13px;
			color: #152d3a;

			opacity: 0.6;
		}
		.notification-header {
			.judjment {
				svg {
					flex-shrink: 0;
					padding: 5px;
					background: #dbdbdb;
					border-radius: 50px;
				}
			}

			.avatar {
				flex-shrink: 0;
				background-color: gray;
			}
		}

		.username,
		.poll {
			font-weight: 700;
			color: #152d3a;
			padding-right: 6px;
		}
		.poll {
			font-family: Roboto;
			font-style: normal;
			font-weight: 500;
			font-size: 13px;
			line-height: 15px;
			color: #152d3a;
		}

		.notification-body {
			margin: auto 0;
			.message {
				font-family: Roboto;
				font-style: normal;
				font-weight: 300;
				font-size: 13px;
				color: #152d3a;
				padding-right: 6px;
			}
		}

		.event-time {
			white-space: nowrap;
			margin-bottom: auto;
			margin-top: 5px;
		}

		hr {
			margin: 6px 0;
			border: 0.5px solid #d0d5d9;
			flex: 0 0 100%;
		}
	}
</style>
