<template>
    <div class="user-section">
        <user-header :user="user"/>
        <user-statistic :id="id"  :limit="circlesLimit"/>
        <!--<user-statistic :id="id" class="hidden-sm-and-up"  :limit="2"/>-->
        <user-feed :userId='user.id'/>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import userHeader from './userHeader'
    import userStatistic from './modules/userStatistic'
    import userFeed from '../Feed.vue'

    export default {
        name: "userSection",
        props:['item'],
        data(){
            return {
                limit:3
            }
        },
        computed:{

            ...mapState('globalStore', {

                userMap: ({users}) => users

            }),

            circlesLimit: function() {

                if (this.$root.mobile) this.limit = 2;

                return this.limit


            },


            id:function () {

                return this.$route.params.id

            },

            user:function () {

                let {userMap} = this;

                let user_id;

                user_id = this.$route.params.id;

                return userMap[user_id]

            }

        },

        methods: {

        },

        components: {

            userHeader,
            userStatistic,
            userFeed


        },

        created(){


        }


    }
</script>

<style lang="scss">

</style>
