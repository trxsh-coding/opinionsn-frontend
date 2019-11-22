<template>
	<div id="poll-header">
		<div class="subject flex-align-stretch" :class="subjectClass">

			<div class="w-60 v-center">
				<dropdown-list-reusable v-if="authorities === 'ADMIN'" class="h-fit info-block"
				                        list-class="post-settings-list p-9" click-close>
					<template>
						<div class="h-26 w-26 ml-6">
							<icon-base
									class=""
									width="13"
									height="4"
									viewBox="0 0 13 4"
									icon-name="icon-more">
								<icon-more/>
							</icon-base>
						</div>
					</template>
					<template #items>
						<span class="dropdown-actions ws-no-warp pointer py-5 px-10 br-6"
						      @click="handlePollDelete(poll.id)">Удалить опрос</span>
<!--						<div class="hr px-5"></div>-->
<!--						<span class="dropdown-actions ws-no-warp pointer"-->
<!--						      @click="linkShare(poll.id)">Поделиться в фейсбуке</span>-->

					</template>
				</dropdown-list-reusable>
			</div>

			<div class="headline flex">
				<router-link class="flex pointer" :to="{name: 'user', params: { id: author.id }}">
					<RePicture :url="author.path_to_avatar | addAssetsPath" size="36" rounded/>
				</router-link>

				<div class="caption flex-column ml-9">
					<span class="title">
						<router-link class="username pointer" :to="{name:'user', params: {id: author.id}}">{{author.username}}</router-link>
						<lang-string v-if="has_event_type" class="event__item" :title="user_caption"/>
					</span>

					<span class="description mt-4 flex">
						<span v-if="has_location" v-show="author.location" class="pr-9">{{author.location}}</span>
						<time-trans transformedTime v-show="description_timestamp" :time="description_timestamp"/>
					</span>
				</div>
			</div>

			<Bookmark class="bookmark ml-auto" shifted :poll="poll"/>

		</div>

	</div>
</template>

<script>
	import langString from '../../langString'
	import imageMixin from "../../mixins/imageMixin";
	import pollAnnotation from "./pollAnnotation"
	import timeTrans from "../../timeTrans"
	import langMixin from "../../mixins/langMixin";
	import IconBase from "../../icons/IconBase";
	import IconMore from "../../icons/IconMore";
	import DropdownListReusable from "../../reusableСomponents/DropdownListReusable";
	import {mapActions, mapMutations, mapState} from "vuex";
	import RePicture from "@/components/reusableСomponents/RePicture";
	import Bookmark from "@/components/icons/bookmark";

	const pad = (num, len = 2, char = '0') => {
		let init = `${num}`;

		while (init.length < (len * char.length)) {
			init = `${char}${init}`
		}

		return init;
	};

	export default {
		name: "postHeader",
		props: ['author', 'poll', 'payloadTimeStamp', 'eventType', 'subjectClass'],
		mixins: [imageMixin, langMixin],
		components: {
			Bookmark,
			RePicture,
			DropdownListReusable,
			IconBase,
			langString,
			pollAnnotation,
			timeTrans,
			IconMore
		},
		computed: {

			...mapState("globalStore", {
				mainUser: ({mainUser}) => mainUser,
				authorities: ({mainUser}) => Object.keys(mainUser).length && mainUser.authorities
			}),

			has_location() {
				switch (this.$route.name) {
					case 'pollFeed':
					case 'singlePoll':
					case 'voteFeed':
						return false;
					default:
						return true;
				}
			},

			has_event_type() {
				switch (this.$route.name) {
					case 'pollFeed':
					case 'singlePoll':
						return false;
					default:
						return true;
				}
			},

			user_caption() {
				let {eventType} = this,
					{type_of_poll} = this.poll;

				switch (eventType) {
					case 'VOTED_AND_EXPLAINED':
						return "voted_and_commented";
					case 'VOTED':
						return "voted";
					default:
						return ""
				}
			},

			description_timestamp() {
				return this.payloadTimeStamp ? this.payloadTimeStamp : this.poll.date;
			}
		},
		methods: {
			...mapActions('pollFeed', [
				'deletePoll'
			]),

			...mapMutations('pollFeed', [
				'deleteItemFromPayload'
			]),

			async handlePollDelete(id) {

				try {

					let { status } = await this.deletePoll(id);
					if (status === 200) {

						this.$popup.insert('messages', [{message: 'Успешное удаление!', type: 'success'}]);
						// this.$parent.deleted = true;
						this.deleteItemFromPayload(id);

						if (this.$route.name !== 'pollFeed') this.$router.push({name: 'pollFeed'});

					} else {

						this.$popup.insert('messages', [{message: 'При удалении произошла ошибка!', type: 'error'}]);

					}

				} catch (e) {

					console.error(e);

				}

			},

			linkShare(poll_id) {
				window.location.href = `https://www.facebook.com/sharer.php?u=https://opinionsn.com/singlePoll/${poll_id}`
			}
		}
	}
</script>

<style lang="scss">
	#poll-header {

		.hr {
			display: block;
			border-bottom: 1px solid #CECFD3;
		}

		.subject {
			/*overflow: hidden;*/

			.post-settings-list {
				right: unset;
				left: 90px;

				span {
					font-family: Roboto;
					font-style: normal;
					font-weight: normal;
					font-size: 13px;
					color: #1A1E22;

					&:hover {
						background: #ebecef;
					}
				}
			}

			.bookmark {
				position: relative;
				top: -13px;
			}

			.headline {
				.caption {
					.description {
						font-size: 10px;
						font-family: Roboto;
						font-style: normal;
						font-weight: normal;
						color: #ADAFB3;
					}
				}
			}

		}

		.event__item {

			font-family: Roboto;
			font-style: normal;
			font-weight: normal;
			font-size: 13px;
			color: #1A1E22;
			text-transform: lowercase;

		}
	}
</style>
