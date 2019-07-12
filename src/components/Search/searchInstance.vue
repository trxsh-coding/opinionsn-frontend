<template>
    <div class="search-instance">
        <short-poll-reusable :poll="poll" />
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import ShortPollReusable from "../reusableСomponents/ShortPollReusable";
    export default {
        name: "searchInstance",
        components: {ShortPollReusable},
        props:['item'],
        computed: {
            ...mapState('globalStore', {

                polls: ({polls}) => polls

            }),

            poll(){
             let {polls, item} = this;
             return polls[item.id]
            }
        }
    }
</script>

<style lang="scss">

</style>
