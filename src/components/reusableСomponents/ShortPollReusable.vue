<template>
    <div class="short-poll-reusable" :class="{'column-layout': !rowLayout }" :style="pollWrapperStyle">
		<div class="poll">

			<bookmark class="bookmark-btn pointer" :poll="poll"></bookmark>

			<div v-if="rowLayout" class="img-wrapper pointer" @click="pollLink(pollData.id)">

				<picture-reusable
					:img="pollData.picture"
					:size="66"
					bor-rad="6"
					without-text
				/>

			</div>

			<div class="text flex-column">

				<span class="poll-timestamp mb-3">
					<time-trans :time="pollData.date" />
				</span>

				<span class="poll-name pointer"  @click="pollLink(pollData.id)">{{pollData.name}}</span>

				<span v-if="withDesc && rowLayout" class="poll-desc mt-3 pointer"  @click="pollLink(pollData.id)">{{pollData.description}}</span>

				<div v-else-if="!rowLayout" class="main-img-wrapper pointer mt-3" @click="pollLink(pollData.id)">

					<picture-reusable
						:img="pollData.picture"
						width="100%"
						:height="90"
						bor-rad="6"
						without-text
					/>

				</div>

				<div class="poll-info-bar flex-between mt-4">
					<span @click="userLink(pollData.author_id)">
						<picture-reusable
							class="user-block pointer"
							pic-class="mr-5"
							:img="pollData.author_avatar"
							:size="15"
							rounded
							text-layout="right"
						>
							<template #title>
								{{pollData.author_username}}
							</template>
						</picture-reusable>
					</span>

					<counter-badges short :poll="poll"></counter-badges>

				</div>

			</div>

		</div>
	</div>
</template>

<script>

	import {mapState} from 'vuex'
    import PictureReusable from "./PictureReusable";
	import TimeTrans from "../timeTrans";
	import CounterBadges from "./counterBadges";
	import IconBase from "../icons/IconBase";
	import IconBookmark from "../icons/IconBookmark";
	import Bookmark from "../icons/bookmark";



	export default {
        name: "ShortPollReusable",
		components: {
			Bookmark,
        	CounterBadges,
			TimeTrans,
			PictureReusable,
			IconBase,
			IconBookmark
		},
		props: {
			poll: {
				type: Object,
				required: true
			},
			width: {
				type: String,
				default: function () {
					// return "100%";
					return "325";
				}
			},
			withDesc: {
				type: Boolean,
				default: function () {
					return false;
				}
			},
			typeOfLayout: {
				type: Number,
				default: function () {
					return 'row';
				},
				validator: function (value) {
					// Значение должно соответствовать одной из этих строк
					return ['row', 'column'].indexOf(value) !== -1
				}
			}
		},
		data() {
			return {
				publicPath: process.env.VUE_APP_MAIN_API
			}
		},
		methods: {

			userLink(user_id){

				this.$router.push({name: 'user', params: {id: user_id}})

			},

			pollLink(poll_id){

				this.$router.push({name: 'singlePoll', params: {id: poll_id}})

			},

		},
		computed: {

			...mapState('globalStore', {
				users: ({users}) => users,
			}),

			rowLayout() {
				return this.typeOfLayout === 'row';
			},


			pollWrapperStyle() {
				let { width } = this;
				width = (width.slice(-1) === '%') ? {width: `${width}`} : {width: `${width}px`};


				return {
					...width
				}
			},

			pollData() {

				let { poll, users, publicPath } = this;

				let {
					id,
					author_id,
					picture,
					subject,
					description,
					date,
					total_amount_of_comments,
					total_amount_of_votes,
					type_of_poll,
					end_date,
					fund
				} = poll;

				let author_avatar = publicPath + users[author_id].path_to_avatar;
				let author_username = users[author_id].username;
				picture = publicPath + picture;

				return {
					id,
					author_id,
					picture,
					author_avatar,
					author_username,
					name: subject,
					description,
					date,
					total_amount_of_comments,
					total_amount_of_votes,
					type_of_poll,
					end_date,
					fund
				}
			}
		},
    }
</script>

<style lang="scss">

	.short-poll-reusable.column-layout {


		.poll {
			margin: 0;
			padding: 6px 9px 9px;

			.text {
				margin: 0;
			}


			.main-img-wrapper {
				.picture-reusable {
					width: 100%;
					.picture-wrapper {
						width: 100%;
					}
				}
			}

		}

	}

	.short-poll-reusable {

		* {
			font-family: Roboto;
			font-style: normal;
		}

		.poll {
			position: relative;
			margin-left: 9px;
			min-height: 84px;
			background: #FFFFFF;
			border: 0.5px solid #BCBEC3;
			border-radius: 6px;

			padding: 9px 0 10px 0;

			display: flex;

			.bookmark-btn {
				position: absolute;
				top: 0;
				right: 6px;
			}

			.img-wrapper {
				flex-basis: 66px;

				.picture-reusable {
					position: relative;
					left: -9px;

				}
			}

			.text {
				flex-grow: 1;
				margin-right: 28px;
				height: 100%;

				.poll-timestamp {
					font-family: Helvetica Neue, Roboto;
					font-size: 10px;
					color: #BEC0C5;
				}

				.poll-name {
					font-weight: 500;
					font-size: 13px;
					color: #1A1E22;
				}

				.poll-desc {
					font-weight: normal;
					font-size: 11px;
					color: #1A1E22;
					opacity: 0.7;
				}

				.poll-info-bar {
					.picture-reusable {
						.text {
							.title {
								font-weight: normal;
								font-size: 11px;
								color: #BEC0C5;
								text-transform: uppercase;
							}

							.description {
								display: none;
							}
						}
					}
				}
			}

			.poll-info-bar {

				.user-block {}

				.counter-badges {

					flex-direction: row-reverse;

					* {
						font-weight: normal;
						font-size: 11px;
						text-transform: capitalize;
						color: #BEC0C5;
					}

				}

			}
		}



	}

</style>