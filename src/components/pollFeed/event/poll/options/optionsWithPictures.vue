<template>
	<div
		class="options-block"
		@click="vote(option.id, option.poll_id, poll.type_of_poll)"
		:class="{cursor : item.voted, opacity  : poll.votingOver, rightAnswer : correct_option}"
		v-loading="loading_option"
	>
		<div class="option-picture" :style="{ 'background-image': 'url(' + publicPath + option.picture + ')' }">
			<div class="percentage-block" v-if="item.voted || poll.votingOver">
				<span
					v-bind:class="{ selected: selected_option, correct: correct_option }"
				>{{option.voted_percentage}}%</span>
			</div>
		</div>
		<div class="option-container relative">
			<div class="option-id">
				<span class="span-id">{{option_index + 1}}</span>
			</div>
			<div class="description-right-section">
				<div class="option-description">
					<span>{{option.description}}</span>
				</div>
				<div class="progress-bar">
					<el-progress
						v-if="item.voted"
						:stroke-width="3"
						:percentage="option.voted_percentage"
						color="#152D3A"
						v-bind:class="{ selected: selected_option, correct: correct_option }"
					></el-progress>
				</div>
			</div>
		</div>
		<div class="option-bows-pictures">
			<poll-option-heads :limit="3" :option="option" v-if="item.voted"/>
		</div>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import langString from "../../../../langString.vue";
	import PollOptionHeads from "../../../../PollOptionHeads.vue";

	export default {
		data() {
			return {
				mobile: this.$root.mobile,
				publicPath: process.env.VUE_APP_MAIN_API

			};
		},

		name: "optionsWithPictures",
		props: [
			"option",
			"item",
			"option_index",
			"poll",
			"correctOption",
			"expanded"
		],
		computed: {
			/**
			 * Defines whether poll can expand (or even needs to)
			 */

			...mapState("user", {
				user: state => state.User
			}),

			...mapState("globalStore", {
				mainUser: ({ mainUser }) => mainUser
			}),
			// author: function(){
			//     return this.poll.author;
			// },

			selected_option: function() {
				let { item, option } = this;

				let selected_option;

				if (item.selectedOption == option.id) {
					return (selected_option = true);
				}
			},

			loading_option: function() {
				return this.option.loading;
			},
			correct_option: function() {
				let { correctOption, option } = this;

				let correct_option;

				if (option.id === correctOption) {
					return (correct_option = true);
				}
			}
		},

		methods: {
			onExpandAction() {
				this.expanded = !this.expanded;
			},

			vote(selected_variable, poll_id, type_of_poll) {
				if (this.expanded) {
					if (
						!this.item.voted &&
						!this.poll.votingOver &&
						this.mainUser &&
						this.mainUser.id
					) {
						this.$store.dispatch(`${this.$route.name}/createVote`, {
							data: { selected_variable, poll_id, type_of_poll }
						});
					}
				}

				this.$emit("expand", (this.expanded = true));
			}
		},

		created() {
			let mobile = this.$root.mobile;
		},

		components: {
			langString,
			PollOptionHeads
		}
	};
</script>

<style lang="scss">
	.options-section {
		flex: 0 0 100%;
		&.withPicture {
			flex: 0 0 49% !important;
		}
	}

	.options-block {
		cursor: pointer;
		.display {
			display: none;
		}
		.cursor {
			cursor: auto;
		}

		.selected {
			color: #4b97b4 !important;

			.el-progress-bar__inner {
				background-color: #4b97b4 !important;
			}
			.el-progress__text {
				color: #4b97b4;
			}
		}

		.rightAnswer {
			opacity: 1;
			box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.12);
		}

		.correct {
			.el-progress-bar__inner {
				background-color: #4fac40 !important;
			}
			.el-progress__text {
				color: #4fac40 !important;
			}
		}

		.option-bows-pictures {
			position: absolute;
			top: -2px;
			right: 8px;
		}

		.poll-option-head {
			margin-top: 9px;
		}
		.option-picture {
			height: 168px;
			width: 232px;
			background-repeat: no-repeat;
			background-size: cover;
			background-position: center;
			border-radius: 6px 6px 0px 0px;
			display: flex;
			justify-content: flex-end;
			align-items: flex-end;
			.percentage-block {
				text-align: center;
				line-height: 27px;
				margin-right: 9px;
				width: 41px;
				height: 27px;
				background: #ffffff;
				border-radius: 6px 6px 0 0;

				span {
					font-family: Roboto;
					font-style: normal;
					font-weight: 500;
					line-height: 13px;
					font-size: 13px;
					text-align: center;
					letter-spacing: -0.2px;
					color: #152d3a;
					border-radius: 6px;
				}
			}
		}

		.option-container {
			background: #ffffff;
			box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.05);
			border-radius: 0 0 6px 6px;
			display: flex;
			height: 48px;
			width: 232px;

			.option-description {
				padding-top: 11px;
				word-break: break-word;
				height: 25px;
				display: flex;
				align-items: center;
				padding-right: 7px;
				span {
					font-family: Roboto;
					font-style: normal;
					font-weight: normal;
					line-height: 14px;
					font-size: 12px;
					letter-spacing: -0.1px;
					color: #152d3a;
				}
			}

			.option-id {
				display: flex;
				align-items: center;
				background: #ffffff;
				box-shadow: 3px 0px 12px rgba(56, 56, 56, 0.06);
				border-radius: 6px 0px 0px 6px;
			}

			.description-right-section {
				width: 100%;
				.el-progress-bar {
					width: 120%;
				}
				.el-progress__text {
					display: none;
				}
				.progress-bar {
					position: absolute;
					width: 198px;
					bottom: -2px;
				}
			}

			.option-id,
			.description-right-section {
				padding: 0 8.5px;
				line-height: 14px;
			}
		}
	}

	@media only screen and (max-device-width: 700px) {
		/*.options-section {*/
		/*	flex: 0 0 100%;*/
		/*	&.withPicture {*/
		/*		flex: 0 0 49% !important;*/
		/*	}*/
		/*}*/

		.options-block {
			cursor: pointer;
			width: 100%;

			.options-block {
				cursor: pointer;
				width: 100%;
			}

			.option-id {
				padding: 9px !important;
			}

			.option-picture {
				width: 100% !important;
				height: 116px;
				display: flex;
				justify-content: flex-end;
				align-items: flex-end;
			}

			.option-description {
				margin-right: 0px !important;
			}

			.option-container {
				width: 100%;
			}

			.progress-bar {
				width: 135px !important;
			}

			.el-progress__text {
				display: none;
			}

			.option-bows {
			}
		}
	}
</style>
