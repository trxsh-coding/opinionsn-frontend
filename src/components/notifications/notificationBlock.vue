<template>
    <div class="notification-block">
        <div class="notification">
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import axios from 'axios'
    export default {
        name: "notificationBlock",
        props:['notification'],
        data(){
            return {
                type_of_notification:''
            }
        },
        computed: {
            ...mapState('globalStore', {

                userMap: ({users}) => users

            }),

            author:function () {

                let {notification, userMap} = this;

                let userID = notification.initiatorId;

                if(userMap[userID] === undefined){

                    this.$store.dispatch('notificationPage/getNotificationInitiator', userID)

                }

                let author = userMap[userID]

                return author;


            }

        },

        methods: {

            userLink(id){

                this.$router.push({name:'user',params:{id:id}})

            },

        }
    }
</script>

<style lang="scss">

    .notification-block {


        background: #FFFFFF;
        box-shadow: 0px 0px 20px rgba(21, 45, 58, 0.3);
        border-radius: 12px;
        padding: 10px;
        position: fixed;
        width: 200px;
        height: 100px;
        z-index: 10000;
        margin-bottom: 10px;

        .notification-header {

            p {
                margin: 0px;
            }

        }

    }

</style>
