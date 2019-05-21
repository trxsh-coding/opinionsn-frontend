<template>
    <div class="notificationWrapper">
        <div class="notification-section" v-if="messages.length">
            <feed-block :notification="notification"
                        v-for="(notification, index) in messages"
                        :key="index"/>


        </div>
        <div class="nope" v-else-if="messages.length == 0">
            <span>Уведомлений нет</span>
        </div>
        <mugen-scroll :handler="load" :should-handle="!loaded" :handleOnMount="false" >
            <div class="loading"  v-loading="loading"  ></div>
        </mugen-scroll>
    </div>
</template>

<script>
    import feedBlock from './feedBlock'
    import {mapState} from  'vuex'
    import MugenScroll from 'vue-mugen-scroll'
    import axios from 'axios'
    export default {
        name: "notificationPage",
        components:{feedBlock, MugenScroll},
        computed: {
            ...mapState("notificationStore", {
                messages: s => s.messages
            }),
            ...mapState('notificationPage',{
                counter : state => state.counter,
                page : state => state.page,
                loaded : state => state.loaded,
                loading: state => state.loading

            }),
        },
        methods: {

            load(){
                if(this.page) {

                    this.$store.dispatch('notificationPage/list', {customUrl : `/messages/notification/${this.page}`});


                }
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
