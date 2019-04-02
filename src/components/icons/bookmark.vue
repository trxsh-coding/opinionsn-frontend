<template>
    <div class="bookmark-block pointer relative" >
        <div class="ok" @click="addToBookmark(poll.id, poll.type_of_poll, poll.bookmark_id)">

            <div class="icon-bookmark" v-if="!bookmarked">
                <icon-base
                        class="bookmarked"
                        fill="none"
                        width="11"
                        height="15"
                        viewBox="0 0 11 15"
                        icon-name="bookmark"><icon-bookmark />
                </icon-base>
            </div>
            <div class="icon-bookmarked" v-if="bookmarked">
                <icon-base
                        fill="none"
                        width="11"
                        height="15"
                        viewBox="0 0 11 15"
                        icon-name="bookmark"><icon-bookmark-active />
                </icon-base>
            </div>
        </div>
    </div>
</template>

<script>
    import IconBookmark from './IconBookmark'
    import IconBookmarkActive from './IconBookmarkActive'
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
            IconBookmarked,
            IconBookmarkActive

        },

    }
</script>

<style lang="scss">

    .icon-bookmark {
        justify-content: center;
        align-items: center;
        display: flex;
        background: #C4CCD0;
        border-radius: 50px;
        height: 25px;
        width: 25px;

        path {

            fill:#C4CCD0 ;

        }

    }

    .icon-bookmarked {

        justify-content: center;
        align-items: center;
        display: flex;
        background: #C4CCD0;
        border-radius: 50px;
        height: 25px;
        width: 25px;

    }

    .bookmark-block{


        .primary {

                display: none;

        }

    }

</style>
