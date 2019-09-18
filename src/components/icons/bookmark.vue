<template>
    <IconBookmark v-if="bookmarked" class="pointer" @click.native="addToBookmark()" />
    <IconBookmarkActive v-else class="pointer" @click.native="addToBookmark()" />
</template>

<script>
    import IconBookmark from './IconBookmark'
    import IconBookmarkActive from './IconBookmarkActive'
    import IconBookmarked from './IconBookmarked'

    export default {
        name: "bookmark",
        props: {
            poll: {
                type: Object,
                required: true
            }
        },

        computed: {
            bookmarked() {
                return this.poll.bookmark_id == 0
            }
        },

        methods: {
            addToBookmark(){
                let {bookmark_id, id: poll_id, type_of_poll} = this.poll;
                (bookmark_id == 0)
                    ? this.$store.dispatch(`pollFeed/addToBookmark`, {poll_id, type_of_poll})
                    : this.$store.dispatch(`pollFeed/deleteBookmark`, this.poll.bookmark_id);
            },
        },

        components: {IconBookmark, IconBookmarked, IconBookmarkActive},

    }
</script>

<style lang="scss">

</style>
