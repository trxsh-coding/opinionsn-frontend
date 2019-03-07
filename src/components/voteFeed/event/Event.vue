<template lang="html">

    <div :key="item.votes_id" class="opninonFeed">


        <div class="header-block">
            <author-header :author="user" :type="type" :poll="poll" :item="item" />
        </div>
        <div class="box">
            <poll-preview :poll="poll" :options="sanitizedOptions" :item="item" :vote="vote" :type="type">
            </poll-preview>
        </div>
        <!-- If there is an explanation, print one -->
        <!-- Render Poll Preview -->

    </div>


</template>

<script>


    import AuthorHeader from './AuthorHeader.vue';
    import PollPreview from './PollPreview.vue';
    import {globalStoreMixin} from "../../../store/modules/globalStore";

    let mixin = globalStoreMixin();
    export default {
        name: "event",
        props: ['item'],

        mixins: [mixin],
        computed: {

            // vote -> vote_id, votesMap
            vote_id: function(){
                let {item} = this;
                let {isPollEvent} = item;
                return isPollEvent ? 0 : item.id;
            },

            isPollEvent(){
                let {item} = this;
                let {isPollEvent} = item;
                if (isPollEvent === undefined) isPollEvent = item.eventType === 'POLL_CREATED';


                return isPollEvent;
            },




            user_id: function(){
                let {vote, poll, item, isPollEvent} = this;

                if (isPollEvent === undefined) isPollEvent = item.eventType === 'POLL_CREATED';
                console.log({isPollEvent, item, vote});

                let author_id;
                if (isPollEvent){
                    author_id = poll.author_id;
                } else {
                    author_id = vote.author_id;
                }

                return author_id;
            },

            poll_id: function(){
                let {vote, item, isPollEvent} = this;

                return isPollEvent ? item.id : vote.poll_id;

            },

            sanitizedOptions: function(){
                let {options_id: option_ids, options_list_id} = this.poll;
                let {selectedOption} = this.item;

                if (!option_ids) option_ids = options_list_id || [];

                return option_ids.map(option_id => {
                   let option = this.optionsMap[option_id];
                   return {option, isSelected: option_id === selectedOption};
                });

            },

            // Сокращение для типа
            type: function() { return this.item.eventType},


        },

        components: {
            AuthorHeader,
            PollPreview
        }

    }
</script>

<style lang="scss">

    /* That's what I call CSS master*/
    .opninonFeed {
        border-radius: 10px;
        padding: 15px 9px 12px 9px;
        background: #FFFFFF;
        margin-bottom: 10px;

        .middle-block {
              margin-top: 10px;
              background: #FFFFFF;
              box-shadow: 0px 6px 24px rgba(0, 0, 0, 0.1);
              border-radius: 6px;
        }
    }


    .opninonFeed.clickable:hover {
        cursor: pointer;


    }
</style>
