<template>
    <div class="user-section">
        <user-header :user="user"  />

        <transition name="fade">
            <user-form   v-if="!hide_form"/>
        </transition>
        <transition name="fade">
        <user-statistic :id="id"  :limit="circlesLimit" v-if="hide_form"/>
        </transition>

        <!--<user-statistic :id="id" class="hidden-sm-and-up"  :limit="2"/>-->


        <user-feed :userId='user.id' v-if="hide_form"/>

    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import userHeader from './userHeader'
    import userStatistic from './modules/userStatistic'
    import userFeed from '../Feed.vue'
    import userForm from './userForm'
    export default {
        name: "userSection",
        props:['item'],
        data(){
            return {
                limit:3,
            }
        },


        computed:{

            ...mapState('userPage', {

                hide_form: s => s.hide_form,

            }),


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
            userFeed,
            userForm


        },


        created(){


        }


    }
</script>

<style lang="scss">
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
        opacity: 0;
    }

    .user-section {

        .user-statistic {
            justify-content: center;

            .progress-border {

                padding: 0 33px ;

            }
        }

    }

    @media only screen and (max-device-width : 500px) {

        .user-statistic {
            justify-content: space-evenly !important;
            .progress-border {

                padding: 0 24px !important;

            }

            .el-progress-circle {

                width: 75px !important;
                height: 75px !important;

            }
            .statistic-wrapper {



            }

        }

    }
</style>
