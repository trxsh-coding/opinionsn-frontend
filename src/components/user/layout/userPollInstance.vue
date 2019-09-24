<template>
    <div class="user-poll-feed">
        <post-header :author="author" :poll="poll" :eventType="item.eventType" class="mr-12" />
        <headline-body class="mt-7 mr-12" :poll="poll" :item="item" />
        <OptionInstance
                class="mt-12 mr-12"
                v-for="(option, index) in combined_options"
                v-bind="{payload: item, poll, option}"
                v-show="options_visible || index < 5"
                :disabled="combined_options.length > 5 && !options_visible"
                @click.native="options_visible = true"
                @onPictureClick="!$root.timer_id && pushToPopup(index)"
        >
            <template #default>
                {{option.description}}
            </template>

        </OptionInstance>
        <div class="show-comment-block flex-align-center">
            <span class="options-load-btn pointer mt-12 mx-auto uppercase"
                  v-if="!showComments " @click="showComments = true">
            <IconBottomArrow class="mr-4" />
            Показать комментарии
        </span>
        </div>
        <Comments v-bind="{isVoted, haveExplain, mainUser, explainsWithComments, pollId: item.id}" />
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import PostHeader from "../../pollFeed/layout/header";
    import HeadlineBody from "../../pollFeed/layout/headlineBody";
    import OptionInstance from "../../reusableСomponents/OptionInstance";
    import Comments from "../../pollFeed/layout/Comments";
    import IconBottomArrow from "../../icons/IconBottomArrow";
    export default {
        name: "userPollFeed",
        components: {IconBottomArrow, Comments, OptionInstance, HeadlineBody, PostHeader},
        props:['item'],
        data() {
            return {
                showComments: false
            }
        },
        computed: {
            ...mapState('globalStore', {
                globalStore: state => state,
                votes: ({votes}) =>votes,
                polls: ({polls}) =>polls,
                users: ({users}) =>users,
                options: ({options})=>options,
                comments: ({comments}) => comments,
                mainUser: ({mainUser}) => mainUser,
            }),

            author(){
                return this.users[this.$route.params.id ]
            },
            poll(){
                return this.polls[this.item.id]
            },
            combined_options() {
                return this.poll.options_id.map(option_id => {
                    return this.options[option_id]
                });
            },
            isVoted() {
                return this.item.voted;
            },
            haveExplain() {
                return this.item.haveExplain;
            },
            explainsWithComments() {
                return this.poll.votes_id.map(vote_id => {
                    // Get explain
                    let explain = {...this.votes[vote_id]};

                    // Get comments list
                    explain.comments = explain.comments_id.map(id => {

                        // Get comment
                        let comment = {...this.comments[id]};

                        // Set comment author
                        comment.author = {
                            id: comment.author_id,
                            avatar: this.users[comment.author_id].path_to_avatar,
                            username: this.users[comment.author_id].username
                        };

                        // Set option name
                        comment.option = this.options[comment.option_id].description;

                        // Delete unused keys
                        delete comment.author_id;
                        delete comment.answer_text;
                        delete comment.explain_id;
                        delete comment.loaded;
                        delete comment.option_id;

                        return comment;
                    });
                    // Set author
                    explain.author = {
                        id: explain.author_id,
                        avatar: this.users[explain.author_id].path_to_avatar,
                        username: this.users[explain.author_id].username
                    };

                    // Set flags for filter
                    explain.isMine = explain.author_id === this.mainUser.id;
                    explain.isFriend = this.users[explain.author_id].isLeader;

                    // Get option name
                    explain.option = this.options[explain.selected_variable].description;

                    // Delete unused keys
                    delete explain.poll_id;
                    delete explain.author_id;
                    delete explain.loaded;
                    delete explain.comments_id;
                    delete explain.selected_variable;

                    return explain
                });
            },
            postHeaderProps() {
                let {id, path_to_avatar, username} = this.author,
                    {eventType, timestamp} = this.item;
                return {
                    id,
                    path_to_avatar,
                    username,
                    eventType,
                    timestamp
                }
            },
        }
    }
</script>

<style lang="scss">
    .user-poll-feed {
        .options-load-btn {
            font-family: Roboto;
            font-style: normal;
            font-weight: normal;
            font-size: 11px;
            color: #1A1E22;
        }
    }
</style>
