<template>
    <div class="main-user-avatar" :style="{ 'background-image': 'url('+ publicPath + user.path_to_avatar + ')' }" @click="userLink(user.id)"></div>

</template>

<script>
    import { mapState } from 'vuex';
    export default {
        name: "mainUserAvatar",
        data(){

            return {
                publicPath: process.env.VUE_APP_MAIN_API
            }
        },
        computed: {

            ...mapState('userPage', {

                state: s => s,

            }),

            ...mapState('globalStore', {

                userMap: ({users}) => users

            }),
            user:function () {

                let {state,userMap} = this;

                return userMap[state.main_user_id]

            }

        },
        methods: {

            userLink(userId) {
                this.$router.push({name:'user',params:{id:userId}})
            },

        }
    }
</script>

<style scoped>

</style>
