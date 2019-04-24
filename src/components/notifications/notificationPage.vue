<template>
    <div>
        <div class="notification-section">
            <feed-block :notification="notification"
                        v-for="(notification, index) in messages"
                        :key="index"/>

        </div>
        <mugen-scroll :handler="load" :should-handle="!loaded">
            <div class="loading" ><span>Loading</span></div>
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
                loaded : state => state.loaded

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
</style>
