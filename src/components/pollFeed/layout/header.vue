<template>
	<div id="poll-header">
		<div class="subject flex-align-stretch pt-12" :class="subjectClass">
			
			<div class="w-60 v-center">
				<dropdown-list-reusable v-if="mainUser.authorities === 'ADMIN'" class="h-fit info-block"
				                        list-class="post-settings-list">
					<template>
						<icon-base
								class="ml-6"
								width="13"
								height="4"
								viewBox="0 0 13 4"
								icon-name="icon-more">
							<icon-more/>
						</icon-base>
					
					</template>
					<template #items>
						<span class="dropdown-actions ws-no-warp pointer" @click="deletePoll(poll.id)">Удалить опрос</span>
						<br>
						<span class="dropdown-actions ws-no-warp pointer"
						      @click="linkShare(poll.id)">Поделиться в фейсбуке</span>

					</template>
				</dropdown-list-reusable>
			</div>
			
			<div class="headline flex">
				<router-link class="flex pointer" :to="{name: 'user', params: { id: author.id }}">
					<RePicture :url="publicPath + imageUtil(author.path_to_avatar, 'S')" size="36" rounded />
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
			
			<Bookmark class="bookmark ml-auto" shifted :poll="poll" />
		
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
	import {mapState} from "vuex";
	import RePicture from "@/components/reusableСomponents/RePicture";
	import Bookmark from "@/components/icons/bookmark";
	
	const pad = (num, len=2, char='0') => {
		let init = `${num}`;
		
		while (init.length < (len*char.length)){
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
		data() {
			return {
				publicPath: process.env.VUE_APP_ASSETS,
			}
		},
		computed: {
			
			...mapState("globalStore", {
				mainUser: ({mainUser}) => mainUser
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
			deletePoll(poll_id) {
				
				this.$store.dispatch(`pollFeed/deletePoll`, poll_id);
				
			},
			linkShare(poll_id) {
				window.location.href = `https://www.facebook.com/sharer.php?u=https://opinionsn.com/singlePoll/${poll_id}`
			}
		}
	}
</script>

<style lang="scss">
	#poll-header {
		.subject {
			/*overflow: hidden;*/
			
			.post-settings-list {
				right: unset;
				left: 90px;
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
