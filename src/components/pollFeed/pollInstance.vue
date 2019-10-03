<template>
	<div v-if="poll" id="main-feed-layout" class="flex-column pb-9" :class="{'pr-20': mobile, 'pr-12': !mobile}">

		<post-header class="pt-12" :author="author" :poll="poll" :eventType="item.eventType"/>

		<poll-anotation class="mt-9" :poll="poll"/>

		<headline-body class="mt-7" :poll="poll" :item="item"/>

		<div class="options-container" :class="{active: commentsAnimation}">
			<OptionInstance class="mt-12" v-for="(option, index) in combined_options"
			                v-bind="{payload: item, poll, option}" v-show="options_visible || index < 5"
			                :disabled="combined_options.length > 5 && !options_visible"
			                @click.native="options_visible = true"
			                @onPictureClick="!$root.timer_id && pushToPopup(index)">

				<template #default>
					{{option.description}}
				</template>

				<template #badge>
					<re-badge :counter="Object.keys(option.bows).length - 1" :size="21"></re-badge>
				</template>

			</OptionInstance>
		</div>

		<span class="options-load-btn pointer mt-12 mx-auto uppercase"
		      v-if="!options_visible && combined_options.length > 5" @click="options_visible = true">
            <IconBottomArrow class="mr-4"/>
            Все варианты ответов
        </span>

		<Comments v-bind="{isAuthorized, isVoted, haveExplain, mainUser, explainsWithComments, pollId: item.id}"
		          @InputPanelClicked="f => f.bind(this)('commentsAnimation')"/>

	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import postHeader from './layout/header'
	import headlineBody from './layout/headlineBody'
	import OptionInstance from "../reusableСomponents/OptionInstance";
	import IconBase from "../icons/IconBase";
	import IconBag from "../icons/IconBag";
	import TimeTrans from "../timeTrans";
	import PollAnotation from "./layout/pollAnnotation";
	import moment from 'moment'
	import {localString} from '../../utils/localString'
	import {finishEvent} from "../../EOSIO/eosio_impl";
	import {addCourt, addjudge} from "../../EOSIO/eosio_impl";
	import ReBadge from "@/components/reusableСomponents/ReBadge";
	import langString from "@/components/langString";
	import IconBottomArrow from "@/components/icons/IconBottomArrow";
	import IconTopArrow from "@/components/icons/IconTopArrow";
	import RePicture from "@/components/reusableСomponents/RePicture";
	import Comments from "@/components/pollFeed/layout/Comments";

	const pad = (num, len = 2, char = '0') => {
		let init = `${num}`;

		while (init.length < (len * char.length)) {
			init = `${char}${init}`
		}

		return init;
	};

	export default {
		name: "layout",
		props: ['item'],
		mixins: [langString],
		components: {
			Comments,
			RePicture,
			IconTopArrow,
			IconBottomArrow,
			ReBadge,
			PollAnotation,
			TimeTrans,
			OptionInstance,
			postHeader,
			headlineBody,
			IconBase,
			IconBag
		},
		data() {
			return {
				publicPath: process.env.VUE_APP_ASSETS,
				options_visible: false,
				explain_page: 1,
				EXPLAINS_LIMIT: 5,
				explains_quantity: 5,
				no_more_explains: false,
				currentTime: null,
				procid: null,
				showModal: false,
				currentPicture: null,
				currentDescription: null,
	            commentsAnimation: false
			}
		},
		computed: {

			...mapState('globalStore', {
				votes: ({votes}) => votes,
				polls: ({polls}) => polls,
				users: ({users}) => users,
				options: ({options}) => options,
				comments: ({comments}) => comments,
				mainUser: ({mainUser}) => mainUser,
				isAuthorized: ({mainUser}) => !!Object.keys(mainUser).length,
			}),

			...mapState('pollFeed', {
				loading: ({loading}) => loading
			}),

			...mapState('lang', {

				_lang: state => {
					return state.locale._lang
				},
				lang: state => state.locale

			}),

			mobile() {
				return this.$root.mobile;
			},

			lstr() {
				return (str) => localString(this.lang, str);
			},

			relativeEndDate() {
				let {poll, _lang} = this;
				let {end_date} = poll;
				moment.locale(_lang);
				return moment.utc(end_date);
			},

			poll() {
				let {item, polls} = this;

				return polls[item.id];

			},

			author() {

				let {poll, users} = this;

				return users[poll.author_id];
			},

			combined_options() {
				return this.poll.options_id.map(option_id => {
					return this.options[option_id]
				});
			},

			// options_pictures_with(){
			//    return this.combined_options.map(({picture}) => picture)
			// },


			// Collect array of explains with comments from store
			explainsWithComments() {
				return this.poll.explains_id.map(vote_id => {
					// Get explain
					let explain = {...this.votes[vote_id]};

					// Get comments list
					explain.comments = explain.comments_id.map(id => {

						// Get comment
						let comment = {...this.comments[id]};

						// Set comment author
						comment.author = {
							id: comment.author_id,
							avatar: this.users[comment.author_id].path_to_avatar,
							username: this.users[comment.author_id].username
						};

						// Set option name
						comment.option = this.options[comment.option_id].description;

						// Delete unused keys
						delete comment.author_id;
						delete comment.answer_text;
						delete comment.explain_id;
						delete comment.loaded;
						delete comment.option_id;

						return comment;
					});

					// Set author
					explain.author = {
						id: explain.author_id,
						avatar: this.users[explain.author_id].path_to_avatar,
						username: this.users[explain.author_id].username
					};

					// Set flags for filter
					explain.isMine = explain.author_id === this.mainUser.id;
					explain.isFriend = this.users[explain.author_id].isLeader;

					// Get option name
					explain.option = this.options[explain.selected_variable].description;

					// Delete unused keys
					delete explain.poll_id;
					delete explain.author_id;
					delete explain.loaded;
					delete explain.comments_id;
					delete explain.selected_variable;

					return explain
				});
			},

			isVoted() {
				return this.item.voted;
			},

			haveExplain() {
				return this.item.haveExplain;
			}

		},
		methods: {

			pushToPopup(index = 0) {
				let pics = this.combined_options.map(({picture, description}) => ({picture, description}));
				pics = [...pics.splice(index, 1), ...pics];
				this.$popup.insert('pictures', pics);
			},

			openModal(payload) {
				this.showModal = payload;
			},

			loadMoreExplains() {

				let {
					explain_page,
					EXPLAINS_LIMIT,
					poll,
					no_more_explains,
					explains_quantity
				} = this;

				if (!no_more_explains) {

					this.$store.dispatch(`pollFeed/loadExplains`, {poll_id: poll.id, explain_page})
						.then(() => {
							this.explain_page += 1;
							if (explains_quantity > this.poll.total_amount_of_votes) {
								this.no_more_explains = true;
							} else {
								this.explains_quantity += EXPLAINS_LIMIT;
							}
						});

				}

			}

		},

	}
</script>

<style lang="scss">

	#main-feed-layout {
		background: #FFFFFF;
		border-radius: 6px 6px 0 0;
		position: relative;
		width: 100%;
		overflow: hidden;

		.option-reusable, #headline-body, .poll-header {
			/*padding-left: 10%;*/
		}

		hr {
			margin: 0;
			border: none;
			height: 1px;
			background-color: #BCBEC3;
			opacity: 0.7;
			box-shadow: 0px 0px 15px rgba(56, 56, 56, 0.05);
			border-radius: 2px;
		}

		.explains-load-btn {
			font-family: Helvetica Neue, Roboto;
			font-size: 10px;
			color: #BEC0C5;
			margin: 0 auto;
		}

		.options-container {

			.option {
				transition: border 500ms;
			}

			&.active {
				.option {
					border: 1px solid #000000;
				}
			}

		}

		.options-load-btn {
			font-family: Roboto;
			font-style: normal;
			font-weight: normal;
			font-size: 11px;
			color: #1A1E22;
		}


	}

</style>
