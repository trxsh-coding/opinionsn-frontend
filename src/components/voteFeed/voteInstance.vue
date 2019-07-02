<template>
    <div id="opinion-feed-layout">
        <post-header :author="author" :poll="poll" />
        <div class="options-scroll-block" >
            <option-item class="mr-9" v-for="{option, isSelected} in sortedOptions" :selected="isSelected" :option="option" :width="180"   :height="44"/>
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
    #opinion-feed-layout {
        margin-left: 21px;
        overflow-x: hidden;
        .options-scroll-block {
            display: inline-flex;
            width: 95%;
            overflow-x: scroll;
        }
    }

</style>
