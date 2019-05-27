<template>
    <div class="polls-section">
        <div class="poll-block mt-5" v-for="poll in polls">

            <poll-block  :poll="poll" :item="item" >
                <div slot="subject_header">
                </div>
            </poll-block>

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


        },
    }
</script>

<style lang="scss">

</style>
