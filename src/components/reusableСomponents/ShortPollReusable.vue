<template>
    <div class="short-poll-reusable" :class="{'column-layout': !rowLayout }" :style="pollWrapperStyle">
		<div class="poll" :class="{'ml-9': poll.picture}">

			<bookmark class="bookmark-btn pointer" :poll="poll"></bookmark>

			<div v-if="rowLayout && !!poll.picture" class="img-wrapper pointer" @click="pollLink(poll.id)">

				<picture-reusable
					:img="publicPath + poll.picture"
					:size=" mobile ? 66 : 90"
					bor-rad="6"
					without-text
				/>

			</div>

			<div class="text flex-column" :class="{'ml-9': !poll.picture || true}">

				<span class="poll-timestamp mb-3" v-if="mobile">
					<time-trans :time="poll.date" />
				</span>

				<span class="poll-name pointer mb-3" @click="pollLink(poll.id)">{{poll.subject}}</span>

				<span v-if="withDesc && rowLayout" class="poll-desc mb-3 pointer"  @click="pollLink(poll.id)">{{poll.description}}</span>

				<div v-else-if="!rowLayout && !!poll.picture" class="main-img-wrapper pointer mb-3" @click="pollLink(poll.id)">

					<picture-reusable
						:img="publicPath + pollAuthor.path_to_avatar"
						width="100%"
						:height="90"
						bor-rad="6"
						without-text
					/>

				</div>

				<div class="poll-info-bar flex-between mt-auto">
					<span @click="userLink(poll.author_id)">
						<picture-reusable
							class="user-block pointer"
							pic-class="mr-5"
							:img="publicPath + pollAuthor.path_to_avatar"
							:size="15"
							rounded
							text-layout="right"
						>
							<template #title>
								{{pollAuthor.username}}
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
			vote: {
				type: Object
			},
			width: {
				type: String,
				default: function () {
					if(this.mobile) return "325";
					else return "100%";

					// return "325";
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
			
			mobile() {
				return this.$root.mobile;
			},

			rowLayout() {
				return this.typeOfLayout === 'row';
			},

			pollAuthor(){

				return this.users[this.poll.author_id];

			},

			pollWrapperStyle() {
				let { width } = this;
				width = (width.slice(-1) === '%') ? {width: `${width}`} : {width: `${width}px`};


				return {
					...width
				}
			},

			test() {
				return this.store_polls[this.vote.poll_id];
			},

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
				text-transform: lowercase !important;

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

		margin-left: auto;
		margin-right: auto;

		* {
			font-family: Roboto;
			font-style: normal;
		}

		.poll {
			position: relative;
			min-height: 84px;
			background: #FFFFFF;
			border: 0.5px solid #BCBEC3;
			border-radius: 6px;

			padding: 9px 0 10px 0;

			display: flex;
			align-items: stretch;

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

				.poll-timestamp {
					font-family: Helvetica Neue, Roboto;
					font-size: 10px;
					color: #BEC0C5;
				}

				.poll-name {
					font-weight: 500;
					font-size: 14px;
					color: #1A1E22;
					padding-right: 25px;
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
								font-size: 12px;
								color: #BEC0C5;
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
	@media only screen
	and (min-width: 300px)
	and (max-width: 765px){
		.poll-name {
			font-size: 13px !important;
			padding-right: 0;

		}
		.text {
			/*margin-right: 28px;*/

		}

		.title {
			font-size: 11px;
		}
	}
</style>
