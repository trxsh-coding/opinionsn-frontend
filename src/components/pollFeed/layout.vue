<template>
    <div id="main-feed-layout">
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "layout",
        props:['item'],
        data:{
            return: {

            }
        },
        computed: {

            ...mapState('globalStore', {
                votes: ({votes}) =>votes,
                polls: ({polls}) =>polls,
                users: ({users}) =>users,
                options: ({options})=>options,
                comments: ({comments}) => comments,
            }),

            poll: function () {
                let {item, polls} = this;

                return polls[item.id];

            },
            author: function () {

                let {poll, users} = this;

                return users[poll.author_id];
            },

            option: function () {

                let {poll, options} = this;

                let options_id = poll.options_id;

                    return options_id.map(option_id => {

                        return options[option_id]

                });

            },


            vote: function () {

                let {poll, votes} = this;

                let votes_id = poll.explains_id;

                return votes_id.map(vote_id => {

                    return votes[vote_id]

                });

            },


        },
        methods : {


        }
    }
</script>

<style lang="scss">

</style>
