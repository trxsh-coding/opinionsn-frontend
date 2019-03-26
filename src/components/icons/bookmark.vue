<template>
    <div class="bookmark-block pointer relative" >
        <div class="ok" @click="addToBookmark(poll.id, poll.type_of_poll, poll.bookmark_id)">

            <div class="bookmark-icon">
                <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="!bookmarked">
                    <g filter="url(#filter0_d)">
                        <rect x="12" y="12" width="25" height="24" rx="12" fill="#C4CCD0"/>
                    </g>
                    <path d="M24.8386 28.07L24.5 27.7585L24.1614 28.07L20.5954 31.3513C20.3458 31.5292 20.0867 31.5328 19.8744 31.4219C19.6504 31.305 19.5 31.059 19.5 30.7862V17.9431C19.5 17.7344 19.5417 17.6534 19.56 17.6272C19.5731 17.6083 19.6004 17.5781 19.6962 17.5505C19.8026 17.5198 19.9534 17.5042 20.1712 17.5008C20.2998 17.4988 20.4207 17.5007 20.5535 17.5027C20.6599 17.5044 20.7739 17.5062 20.9056 17.5062H28.0944C28.2261 17.5062 28.3401 17.5044 28.4465 17.5027C28.5793 17.5007 28.7002 17.4988 28.8288 17.5008C29.0466 17.5042 29.1974 17.5198 29.3038 17.5505C29.3996 17.5781 29.4269 17.6083 29.44 17.6272C29.4583 17.6534 29.5 17.7344 29.5 17.9431V30.7862C29.5 31.0644 29.352 31.3029 29.1273 31.421C29.0225 31.4744 28.9149 31.5 28.8148 31.5C28.6874 31.5 28.5502 31.4584 28.4222 31.3675L24.8386 28.07Z" stroke="white"/>
                    <defs>
                        <filter id="filter0_d" x="0" y="0" width="49" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                            <feOffset/>
                            <feGaussianBlur stdDeviation="6"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                        </filter>
                    </defs>
                </svg>

            </div>

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
            IconBookmarked,

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
