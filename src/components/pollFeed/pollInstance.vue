<template>
    <div id="main-feed-layout">
        <post-header :author="author" :poll="poll"/>
        <headline-body :poll="poll" :item="item"/>
        <options-section
            v-for="option in combinedOptions"
            :option="option"
            :id="option.id"
            :percentage="option.voted_percentage"
            :type_of_poll="poll.type_of_poll"
            :poll_id="poll.id"
            :selected="item.selectedOption === option.id"
            :correct="poll.correct_option === option.id"
            :picture="publicPath + option.picture"
        >
            {{option.description}}
        </options-section>
        <explain-section
                v-for="explain in combinedVotes"
                :explain="explain"
                :poll_id="poll.id"
                :author_picture="publicPath + author.path_to_avatar"
                :comments="comments"
                :options="options"
                :users="users"/>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import postHeader from './layout/header'
    import headlineBody from './layout/headlineBody'
    import explainSection from "../reusableСomponents/ExplanationReusable";
    import OptionsSection from "../reusableСomponents/OptionReusable";

    export default {
        name: "layout",
        props:['item'],
        data () {
            return {

                publicPath: process.env.VUE_APP_MAIN_API

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

            combinedOptions: function () {

                let {poll, options} = this;

                let options_id = poll.options_id;

                    return options_id.map(option_id => {

                        return options[option_id]

                });

            },



            // VOTE GETTER

            combinedVotes: function () {

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
            OptionsSection,
            explainSection,
            postHeader,
            headlineBody
        }
    }
</script>

<style lang="scss">

</style>
