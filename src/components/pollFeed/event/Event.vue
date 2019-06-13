<template lang="html">
    <div class="poll-feed relative">
        <block-chain-animation class="absolute " v-if="poll.type_of_poll >= 2"/>
        <div class="header-block">
            <author-header :author="author" :user="user" :poll="poll" :item="item"> </author-header>

        </div>
        <poll-section :feed="feed" :item="item" :user="user" :poll="poll" :options="sanitizedOptions" ></poll-section>
        <div class="vote-section mb-12" v-for="(vote_id, index) in poll.explains_id">
            <vote :explains="votes" :vote_id="vote_id" :item="item" :options="sanitizedOptions" :user="user" :poll="poll"></vote>
        </div>
        <div class="load-explains" v-if="!poll.loaded && poll.explains_id.length > 4" @click="loadExplains(item.id)">
            <lang-string class="load-span uppercase" :title="'load_more'"/>
        </div>

    </div>
</template>

<script>

    import { mapState } from 'vuex';
    import blockChainAnimation from './modules/blockChainAnimation'
    import AuthorHeader from './poll/AuthorHeader';
    import PollSection from './poll/pollSection';
    import vote from './votes/Vote';
    import langString from '../../langString.vue'





    export default {
        data(){
            return {
                explain_page:1,
            }
        },
        name: "event",

        props: ['item', 'feed'],

        computed: {

            /* Замапим вещи из глобального стора*/
            ...mapState('globalStore', {
                voteMap: ({votes}) =>votes,
                polls: ({polls}) =>polls,
                users: ({users}) =>users,
                options: ({options})=>options,
                comments: ({comments}) => comments,
            }),

            ...mapState('userPage', {

                main_user_id: s => s.main_user_id,

            }),

            ...mapState('lang',{
                lang : state => state.locale
            }),

            lstr(){
                return (str)=>localString(this.lang, str);
            },

            /* Составление геттеров */

            author: function(){
                let {poll, users} = this;

                let author_id;

                author_id = poll.author_id;

                return users[author_id];

            },

            poll: function () {

                let {polls, item} = this;

                let poll;

                poll = polls[item.id]

                return poll;


            },

            votes: function() {
                let {voteMap, poll} = this;

                let {explains_id: explain_ids} = poll;

                if (!explain_ids) explain_ids = polls || [];

                return explain_ids.map(explain_id => {
                    let votes = voteMap[explain_id];
                    return votes
                });
            },


            user:function () {

                let {users, main_user_id} = this;

                let user_id;

                user_id = main_user_id;

                return users[user_id]

            },

            sanitizedOptions: function () {

                let {options_id: option_ids} = this.poll;

                if (!option_ids) option_ids = options_list_id || [];

                return option_ids.map(option_id => {
                    let option = this.options[option_id];
                    return option
                });
            },


        },

        methods: {

            load(){

                this.$store.dispatch(`pollFeed/loadNextPage`);

            },

            loadExplains(poll_id){

                let explain_page = this.explain_page;

                this.$store.dispatch(`pollFeed/loadExplains`, {poll_id, explain_page});

                this.explain_page += 1;
            },

        },
        components: {
            PollSection,
            AuthorHeader,
            vote,
            langString,
            blockChainAnimation
        }

    }
</script>

<style lang="scss">

    /* That's what I call CSS master*/
    .poll-feed {
        border-radius: 10px;
        padding: 15px 15px 12px 15px;
        background: #FFFFFF;
        margin-bottom: 10px;

        overflow: hidden;

        .header-block {
            padding-top: 7px;
        }




    }


    .poll-feed.clickable:hover {
        cursor: pointer;


    }

</style>
