<template>
    <div
            v-show="!!pollName"
            class="notification-section pt-9 pr-13">
        <picture-reusable
                pic-class="mr-18 pointer"
                avatar
                :id="author.id"
                :img="publicPath + imageUtil(author.path_to_avatar, 'S')"
                size="36"
                textLayout="right"
                rounded>
            <template #title>
                <span class="author-name pointer" @click="$router.push({ name: 'user', params: { id: author.id } })">
                    {{author.username}}
                </span>
                <span class="event__item">
                    <lang-string class="event-span lowercase" :title="eventCaption" />
                    <span
                            class="poll-name pointer"
                            v-if="notification.targetId"
                            @click="$router.push({ name: 'singlePoll', params: { id: notification.targetId } })"> "{{pollName}}"</span>
                </span>
                <time-trans class="date mt-4" :time="notification.date" />
                <div class="notification-border mt-9" />
            </template>
        </picture-reusable>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import PictureReusable from "../../reusableСomponents/PictureReusable";
    import imageMixin from "../../mixins/imageMixin";
    import langString from "../../langString"
    import TimeTrans from "../../timeTrans";
    import ButtonReusable from "../../reusableСomponents/ButtonReusable";

    export default {
        name: "notificationInstance",
        components: {ButtonReusable, TimeTrans, PictureReusable, langString},
        props:['notification', 'index'],
        mixins:[imageMixin],
        data() {
            return {
                publicPath: process.env.VUE_APP_MAIN_API
            }
        },
        computed: {
            ...mapState('notificationStore', {

                users: ({users}) => users,
                polls: ({polls}) => polls

            }),


            author(){
                let {users, notification} = this;

                return users[notification.initiatorId]
            },
            pollName(){
                let {polls, notification} = this;
                if (!polls[notification.targetId]) return false;
                return  polls[notification.targetId].subject;
            },
            pollType(){
                let {notification, polls} = this;
                if (!polls[notification.targetId]) return '';

                switch (polls[notification.targetId].type_of_poll) {
                    case 1 :
                        return 'prediction' ;
                    case 0 :
                        return 'poll';
                    default :
                        return 'poll' ;
                }

            },
            eventCaption(){
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
    .notification-section {
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
            width: 100%;

            .text {
                width: 100%;
                margin-right: 0;
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
            border-bottom: 1px solid #BCBEC3;
            padding-left: 60px;
            width: 100%;
        }
    }
</style>
