<template>
    <div class="notificationWrapper">
        <div class="notification-headline flex-center">
            <h1><lang-string :title="'notifications'"/></h1>
        </div>
        <div class="notification-section" v-if="messages.length">
            <notification-instance
                    :notification="notification"
                    v-for="(notification, index) in messages"
                    :key="index"
            />

        </div>
        <div class="nope" v-else-if="messages.length == 0">
            <span>Уведомлений нет</span>
        </div>
        <mugen-scroll :handler="load" :should-handle="!loaded"  >
            <div class="loading"  v-loading="spinner" ></div>
        </mugen-scroll>
    </div>
</template>

<script>
    import feedBlock from './feedBlock'
    import {mapState} from  'vuex'
    import MugenScroll from 'vue-mugen-scroll'
    import langString from '../langString'
    import NotificationInstance from "./layout/notificationInstance";
    export default {
        name: "notificationPage",
        components:{NotificationInstance, feedBlock, MugenScroll, langString},
        computed: {
            ...mapState("notificationStore", {
                messages: s => s.messages
            }),
            ...mapState('notificationPage',{
                counter : state => state.counter,
                page : state => state.page,
                loaded : state => state.loaded,
                loading: state => state.loading,
                spinner: state => state.spinner


            }),
        },
        methods: {

            load(){
                    this.$store.dispatch('notificationPage/list', {customUrl : `${process.env.VUE_APP_NOTIFICATION_API}/notification/${this.page}`});


            },

        },

        mounted(){
            this.$store.dispatch('notificationPage/readInitialNotifications')

        }

    }
</script>

<style lang="scss">
    .notification-section {

        padding: 12px 12px 0px 12px;
        background: #FFFFFF;
        border-radius: 12px;
        .notification-headline {

        }
    }
    .nope {

        text-align: center;
        span {

            color: #69777F;
            font-family: Roboto;
            font-style: normal;

        }
    }
</style>
