<template>
    <div class="grouped-notification pl-21 flex" @click="showGrouped(true)">
        <picture-reusable
                avatar
                class="mr-18 p-0 pointer"
                pic-class="mb-5"
                :img="publicPath + author.path_to_avatar"
                :size="36"
                rounded
                text-layout="bottom">
            <template #title>
                <span class="pl-18"> {{author.username}} <lang-string :title="'participated_in '" /> {{items.length}} <lang-string :title="'events'" /></span>
            </template>
            <template #description>
                <time-trans class=" pl-18 date mt-4" transformed-time :time="items[0].date"/>
            </template>
        </picture-reusable>
        <div class="notification-group"
        v-if="hide"
        >
            <notification-instance v-for="notification in items"  :notification="notification"/>
        </div>

    </div>
</template>

<script>
    import NotificationInstance from "./notificationInstance";
    import PictureReusable from "../../reusableСomponents/PictureReusable";
    import TimeTrans from "../../timeTrans";
    import {mapState} from 'vuex';
    import LangString from "../../langString";
    export default {
        name: "groupedNotification",
        components: {LangString, TimeTrans, PictureReusable, NotificationInstance},
        props: {
            items: Array
        },
        data() {
            return {
                publicPath: process.env.VUE_APP_MAIN_API,
                hide:false
            }
        },
        computed: {
            ...mapState("notificationStore", {
                users: ({ users }) => users,
                polls: ({ polls }) => polls
            }),

            author(){
                return this.users[this.items[0].initiatorId]
            }

        },
        methods: {
            showGrouped(payload){
                this.hide = true
            }
        }
    }
</script>

<style lang="scss">
 .grouped-notification {
     flex-direction: column;
     * {
         transition: 300ms;

     }
     .picture-reusable {
         flex-direction: row !important;
         .text {
         }
         .picture-wrapper {

         }
     }
 }
</style>