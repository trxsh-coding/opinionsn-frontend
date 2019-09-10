<template>
    <div class="category-list-wrapper ">
        <ShortPoll :poll="poll" />
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import ShortPoll from "../../reusableСomponents/ShortPoll";
    export default {
        name: "Event",
        props:['item'],
        computed:{

            ...mapState('globalStore', {
                polls: ({polls}) =>polls,
                users: ({users}) =>users,
                options: ({options})=>options,
                comments: ({comments}) => comments,
                categories: ({categories}) => categories,

            }),

            poll() {
                return this.polls[this.item.id];
            },

            author(){
                return this.users[this.poll.author_id];
            },

            category() {
                return this.categories[this.poll.categories];
            }

        },

        components: {
            ShortPoll
        }
    }
</script>

<style lang="scss">
    .category-list-wrapper {

        .content-block {

            border:none !important;

        }

        .picture-block {
           width: 102px;
            height: 102px;

        }

    }
    .category-background {

        width: 100%;
        height: 112px;
        border-radius: 12px;
        background-size: 50% 50%;
        background-repeat: no-repeat;
        background-size: cover;
        margin-right: 9px;
        display: flex;
        align-items: center;

        .category-subject {
            margin-left: 17.5px;

        }
        span {

            font-family: Roboto;
            font-style: normal;
            font-weight: 500;
            line-height: 32px;
            font-size: 32px;
            color: #FFFFFF;

        }

    }
</style>
