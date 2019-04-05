<template>
    <div class="category-list-wrapper ">
        <poll-block :poll="poll"  :item="item" :author="author" >

            <div slot="subject_header">

            </div>
        </poll-block>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import pollBlock from '../../voteFeed/event/PollBlock'
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

            poll: function () {

                let {polls, item} = this;

                let poll;

                poll = polls[item.id]

                return poll;


            },

            author: function(){
                let {poll, users} = this;

                let author_id;

                author_id = poll.author_id;

                return users[author_id];

            },

            category: function () {

                let {poll, categories} = this;

                let category;

                category = categories[poll.categories];

                return category;


            }


        },



        components:{
            pollBlock
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
