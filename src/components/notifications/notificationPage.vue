<template>
    <div class="notification-section">
        <feed-block :notification="notification"
                    v-for="(notification, index) in messages"
                    :key="index"/>
    </div>
</template>

<script>
    import feedBlock from './feedBlock'
    import {mapState} from  'vuex'
    export default {
        name: "notificationPage",
        components:{feedBlock},
        computed: {
            ...mapState("notificationStore", {
                messages: s => s.messages
            }),
            ...mapState('notificationPage',{
                counter : state => state.counter
            }),
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
