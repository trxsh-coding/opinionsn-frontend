<template>
    <div class="notification-block pt-9 pb-9 " v-if="author">
            <picture-reusable
                    pic-class=" pointer"
                    avatar
                    :id="author.id"
                    :img="publicPath + imageUtil(author.path_to_avatar, 'S')"
                    size="36"
                    textLayout="right"
                    rounded>
                <template #title>
                <span class="author-name pointer " @click="$router.push({ name: 'user', params: { id: author.id } })">
                    {{author.username}}
                </span>
                    <span class="event__item">
                         <lang-string v-if="eventCaption" class="event-span lowercase " :title="eventCaption"/>
                        <span
                                class="poll-name pointer"
                                v-if="notification.targetId"
                                @click="$router.push({ name: 'singlePoll', params: { id: notification.targetId } })">

                                " <text-trim :text="pollName" :amount-of-letter="mobile? 50 : 100"/>"

                        </span>
                     </span>
                    <time-trans class="date mt-4" transformed-time :time="notification.date"/>
                </template>
            </picture-reusable>
        <div class="rounded-border ml-49 "></div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import PictureReusable from "../../reusableСomponents/PictureReusable";
    import imageMixin from "../../mixins/imageMixin";
    import langString from "../../langString"
    import TimeTrans from "../../timeTrans";
    import ButtonReusable from "../../reusableСomponents/ButtonReusable";
    import IconBase from "../../icons/IconBase";
    import IconArrow from '../../icons/create/IconArrow';
    import TextTrim from "../../reusableСomponents/textTrim";

    export default {
        name: "notificationInstance",
        components: {TextTrim, IconBase, ButtonReusable, TimeTrans, PictureReusable, langString, IconArrow},
        props: ['notification'],
        mixins: [imageMixin],
        data() {
            return {
                publicPath: process.env.VUE_APP_ASSETS,
            }
        },
        computed: {
            ...mapState('notificationStore', {

                users: ({users}) => users,
                polls: ({polls}) => polls

            }),

            mobile(){
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
