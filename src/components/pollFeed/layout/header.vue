<template>
	<div id="poll-header" class="mb-4">
		<div class="top-section mb-12">
			<author-headline
					pic-class="mr-9"
					class="pointer"
					:class="topSectionClass"
					avatar
					:id="author.id"
					:img="publicPath + imageUtil(author.path_to_avatar, 'S')"
					:size="36"
					border="1px"
					bor-color="#bcbec3"
					textLayout="right"
					rounded>
				<template #title>
                <router-link :to="{name:'user', params: {id: author.id}}" class="username">
                    {{author.username}}
                </router-link>
				<lang-string v-if="has_event_type" class="event__item" :title="user_caption"/>
					<slot>
					
					</slot>
				
				</template>
				<template #description>
					<div class="mt-4 flex">
	                    <span v-if="has_location" v-show="author.location" class="pr-9">
	                        {{author.location}}
	                    </span>
						<time-trans transformedTime v-show="description_timestamp" :time="description_timestamp"/>
					</div>
				</template>
			</author-headline>
			
			<dropdown-list-reusable v-if="mainUser.authorities === 'ADMIN'" class="h-fit py-6 mr-2 info-block"
			                        list-class="post-settings-list">
				<template #icon>
					<icon-base
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
		<slot name="annotation"></slot>
	
	</div>
</template>

<script>
	import authorHeadline from '../../reusableСomponents/PictureReusable'
	import langString from '../../langString'
	import imageMixin from "../../mixins/imageMixin";
	import pollAnnotation from "./pollAnnotation"
	import timeTrans from "../../timeTrans"
	import langMixin from "../../mixins/langMixin";
	import IconBase from "../../icons/IconBase";
	import IconMore from "../../icons/IconMore";
	import DropdownListReusable from "../../reusableСomponents/DropdownListReusable";
	import {mapState} from "vuex";
	
	export default {
		name: "postHeader",
		props: ['author', 'poll', 'payloadTimeStamp', 'eventType', 'topSectionClass'],
		mixins: [imageMixin, langMixin],
		components: {
			DropdownListReusable,
			IconBase,
			authorHeadline,
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
		.top-section {
			display: flex;
			justify-content: space-between;
			
			.info-block {
				.post-settings-list {
					left: unset;
					transform: unset;
					right: -5px;
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
