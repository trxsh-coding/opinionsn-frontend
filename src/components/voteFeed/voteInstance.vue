<template>
    <div id="opinion-feed-layout">
        <post-header :author="author" :poll="poll" />
        <options-scroll-block v-for="option in combinedOptions" :option="option" />
    </div>
</template>

<script>
    import PostHeader from "../pollFeed/layout/header";
    import storeMixin from "../mixins/storeMixin";
    import OptionsScrollBlock from "./layout/optionsScrollBlock";
    export default {
        name: "voteInstance",
        components: {OptionsScrollBlock, PostHeader},
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

</style>
