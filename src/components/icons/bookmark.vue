<template>
    <div class="bookmark-block pointer" >
        <div class="ok" @click="addToBookmark(poll.id, poll.type_of_poll, poll.bookmark_id)">
            <icon-base
                    v-bind:class="{ primary : bookmarked}"
                    class="bookmark"
                    fill="none"
                    width="14"
                    height="18"
                    viewBox="0 0 14 18"
                    icon-name="bookmark"><icon-bookmark />
            </icon-base>
            <icon-base
                    v-bind:class="{ primary : !bookmarked}"
                    class="bookmarked"
                    fill="none"
                    width="14"
                    height="18"
                    viewBox="0 0 14 18"
                    icon-name="bookmark"><icon-bookmarked />
            </icon-base>
        </div>
    </div>
</template>

<script>
    import IconBookmark from './IconBookmark'
    import IconBookmarked from './IconBookmarked'
    import IconBase from './IconBase'

    export default {
        name: "bookmark",
        props:['poll', 'item'],
        data(){
            return {

            }
        },
        computed: {

            bookmarked: function () {

                let {poll} = this;

                let bookmarked;

                if(poll.bookmark_id == 0) {

                    bookmarked = false;

                } else {

                    bookmarked = true;

                }
                    return bookmarked;
            }

        },

        methods: {

            addToBookmark(poll_id, type_of_poll, bookmark_id){

                if(this.poll.bookmark_id == 0){

                    this.$store.dispatch(`pollFeed/addToBookmark`, {poll_id, type_of_poll});

                } else {

                    this.$store.dispatch(`pollFeed/deleteBookmark`, bookmark_id);

                }

            },


        },

        components: {

            IconBase,
            IconBookmark,
            IconBookmarked

        },

    }
</script>

<style lang="scss">

    .bookmark-block{

        .primary {

                display: none;

        }

    }

</style>
