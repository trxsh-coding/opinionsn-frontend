<template>
    <div class="polls-section">
        <div class="poll-block" v-for="poll in polls">

            <poll-block :author="author" :poll="poll" :item="item" />

        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import pollBlock from '../../voteFeed/event/PollBlock'
    export default {
        name: "polls",
        props:['item', 'polls'],
        components:{pollBlock},
        computed: {

            ...mapState('globalStore', {

                userMap: ({users}) => users,


            }),
            author_ids:function () {

                return this.polls.map(polls => {
                    return polls.author_id
                });


            },
            author:function () {


            }




        },
    }
</script>

<style lang="scss">

</style>
