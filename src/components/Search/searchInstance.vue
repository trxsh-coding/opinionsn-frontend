<template>
    <div class="search-instance">
        <ShortPoll :poll="poll"  v-if="type === 'POLL'"/>
        <ShortUser :user="user" v-if="type === 'USER'"/>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import ShortPoll from "../reusableСomponents/ShortPoll";
    import ShortUser from "../reusableСomponents/ShortUser";
    export default {
        name: "searchInstance",
        components: {ShortUser, ShortPoll},
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
