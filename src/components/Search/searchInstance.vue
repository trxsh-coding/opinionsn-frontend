<template>
    <div class="search-instance">
        <short-poll-reusable :poll="poll"  v-if="type === 'POLL'"/>
        <short-user-reusable :user="user" v-if="type === 'USER'"/>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import ShortPollReusable from "../reusableСomponents/ShortPollReusable";
    import ShortUserReusable from "../reusableСomponents/ShortUserReusable";
    export default {
        name: "searchInstance",
        components: {ShortUserReusable, ShortPollReusable},
        props:['item', 'type'],
        computed: {
            ...mapState('globalStore', {

                polls: ({polls}) => polls,
                users: ({users}) => users

            }),

            poll(){
             let {polls, item} = this;
             return polls[item.id]
            },
            user(){
                let {users, item} = this;
                return users[item.id]
            }
        }
    }
</script>

<style lang="scss">

</style>
