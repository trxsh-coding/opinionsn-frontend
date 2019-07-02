<template>
    <div id="opinion-feed-layout">
        <post-header :author="author" :poll="poll" />
        <div class="options-scroll-block" >
            <option-item class="mr-9" v-for="{option, isSelected} in sortedOptions" :selected="isSelected" :option="option" :width="180"   :height="44"/>
        </div>
        <vote-annotation :poll="poll" />
        <bows-panel class="mt-9" :users="poll.bows"  />
    </div>
</template>

<script>
    import PostHeader from "../pollFeed/layout/header";
    import storeMixin from "../mixins/storeMixin";
    import optionItem from "./layout/optionItem";
    import voteAnnotation from "../reusableСomponents/ShortPollReusable";
    import bowsPanel from "../pollFeed/layout/involvedUsersPanel";
    export default {
        name: "voteInstance",
        components: {bowsPanel, voteAnnotation, optionItem, PostHeader},
        props: ['item'],
        mixins:[storeMixin],
        computed: {


        },
        mounted() {
            console.log(this.poll)
        }
    }
</script>

<style lang="scss">
    #opinion-feed-layout {
        margin-left: 21px;
        overflow-x: hidden;
        .options-scroll-block {
            display: inline-flex;
            width: 95%;
            overflow-x: scroll;
        }
        .short-poll-reusable {
            margin-top: 21px;
        }
    }

</style>
