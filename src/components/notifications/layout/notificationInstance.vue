<template>
	<div class="notification-block flex pt-9 pb-9 " v-if="author">
  
		<router-link class="pointer flex" :to="{name: 'user', params: {id: author.id}}">
			<RePicture :url="author.path_to_avatar | assetsPath" size="36" rounded/>
		</router-link>
		
		<div class="caption flex-column fx-1 pl-18 pr-13">
            <div>
                <router-link class="pointer bold-caption-13" :to="{name: 'user', params: {id: author.id}}">
                    {{author.username}}
                </router-link>
                
                <lang-string v-if="eventCaption" class="event-span lowercase " :title="eventCaption" />
                
                <span class="poll-name pointer" v-if="notification.targetId"
                      @click="$router.push({ name: 'singlePoll', params: { id: notification.targetId } })">
                        " <text-trim :text="pollName" :amount-of-letter="mobile? 50 : 100"/>"
                </span>
            </div>
            
            <time-trans class="date mt-4" transformed-time :time="notification.date"/>
            
            <div class="rounded-border mt-4"></div>
		</div>
		
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import imageMixin from "../../mixins/imageMixin";
	import langString from "../../langString"
	import TimeTrans from "../../timeTrans";
	import ButtonReusable from "../../reusableСomponents/ButtonReusable";
	import IconBase from "../../icons/IconBase";
	import IconArrow from '../../icons/create/IconArrow';
	import TextTrim from "../../reusableСomponents/textTrim";
	import RePicture from "@/components/reusableСomponents/RePicture";
	import assetsPathMixin from "@/components/mixins/assetsPathMixin";
	
	export default {
		name: "notificationInstance",
		components: {RePicture, TextTrim, IconBase, ButtonReusable, TimeTrans, langString, IconArrow},
		props: ['notification'],
		mixins: [imageMixin, assetsPathMixin],
		computed: {
			...mapState('notificationStore', {
				
				users: ({users}) => users,
				polls: ({polls}) => polls
				
			}),
			
			mobile() {
				return this.$root.mobile
			},
			
			author() {
				let {users, notification} = this;
				
				return users[notification.initiatorId]
			},
			pollName() {
				let {polls, notification} = this;
				
				if (!polls[notification.targetId]) return false;
				
				return polls[notification.targetId].subject;
			},
			pollType() {
				let {notification, polls} = this;
				
				if (!polls[notification.targetId]) return '';
				
				switch (polls[notification.targetId].type_of_poll) {
					case 1 :
						return 'prediction';
					case 0 :
						return 'poll';
					default :
						return 'poll';
				}
				
			},
			eventCaption() {
				let {notification, polls} = this;
				
				switch (notification.eventType) {
					case "NEW_POLL":
						return "created_new_poll";
					
					case "NEW_PREDICTION":
						return "created_new_prediction";
					
					case "EXPLAIN_CREATED":
						return "explained";
					
					case "NEW_COMMENT":
						return "commented";
					
					case "SUBSCRIBE":
						return "has_subscribed";
					
					case "UNSUBSCRIBE":
						return "has_unsubscribed";
					
					case "VOTED":
						return `voted_in_${this.pollType}`;
					
					
					default:
						return null;
				}
			}
		}
	}
</script>

<style lang="scss">
	.notification-block {
        
        .caption {
            line-height: 15px;
        }
        
		.author-name {
			font-family: Roboto;
			font-style: normal;
			font-weight: 500;
			font-size: 13px;
			color: #1A1E22;
		}
		
		.event-span {
			font-family: Roboto;
			font-style: normal;
			font-weight: normal;
			font-size: 13px;
			color: #76787A;
		}
		
		.picture-reusable {
			justify-content: flex-start;
			align-items: end;
			
			.text {
				padding-left: 18px;
				padding-right: 13px;
			}
			
			.title {
				width: 100% !important;
			}
		}
		
		.poll-name {
			
			font-family: Roboto;
			font-style: normal;
			font-weight: 500;
			font-size: 13px;
			color: #1A1E22;
			
			
		}
		
		.date {
			font-family: Roboto;
			font-style: normal;
			font-weight: normal;
			font-size: 10px;
			color: #ADAFB3;
			
		}
		
		.notification-border {
			border-bottom: 0.5px solid #BCBEC3;
			padding-left: 60px;
			width: 100%;
		}
	}
</style>
