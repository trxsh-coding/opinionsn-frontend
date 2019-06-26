<template>
    <div id="main-feed-layout">
        <post-header :author="author" :poll="poll"/>
        <headline-body :poll="poll" :item="item"/>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import postHeader from './layout/header'
    import headlineBody from './layout/headlineBody'

    export default {
        name: "layout",
        props:['item'],
        computed: {

            ...mapState('globalStore', {
                votes: ({votes}) =>votes,
                polls: ({polls}) =>polls,
                users: ({users}) =>users,
                options: ({options})=>options,
                comments: ({comments}) => comments,
            }),


            // POLL GETTER

            poll: function () {
                let {item, polls} = this;

                return polls[item.id];

            },
            // USER GETTER

            author: function () {

                let {poll, users} = this;

                return users[poll.author_id];
            },
            // OPTION GETTER

            option: function () {

                let {poll, options} = this;

                let options_id = poll.options_id;

                    return options_id.map(option_id => {

                        return options[option_id]

                });

            },

            // VOTE GETTER

            vote: function () {

                let {poll, votes} = this;

                let votes_id = poll.explains_id;

                return votes_id.map(vote_id => {

                    return votes[vote_id]

                });

            },


        },
        methods : {


        },
        components: {
            postHeader,
            headlineBody
        }
    }
</script>

<style lang="scss">

</style>
