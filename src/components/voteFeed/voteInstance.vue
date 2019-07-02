<template>
    <div id="opinion-feed-layout">
        <post-header :author="author" :poll="poll" />
        <div class="options-scroll-block" >
            <option-item class="mr-9" v-for="option in combinedOptions":option="option.option" />
        </div>
    </div>
</template>

<script>
    import PostHeader from "../pollFeed/layout/header";
    import storeMixin from "../mixins/storeMixin";
    import optionItem from "./layout/optionItem";
    export default {
        name: "voteInstance",
        components: {optionItem, PostHeader},
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
    .options-scroll-block {
        display: flex;
        overflow: scroll;
    }
</style>
