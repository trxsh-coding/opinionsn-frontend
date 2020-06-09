<template>
    <div class="question-annotation">
        <question-header
                :author="author"
                :date="creationTime"
                :main-user="mainUser"
                :pollId="poll.id"
                :typeofquestion="poll.type_of_poll"
                :bookmarkId="poll.bookmark_id"
                :question-subject="poll.subject"
        />
        <div class="subject-section mt-16 flex-align-center flex-between">
            <question-subject
                    :category-name="categoryName"
                    :question-type="questionType"
                    :category-id="poll.categories"
            />
            <question-icons
                :votes="poll.total_amount_of_votes"
                :comments="poll.total_amount_of_comments"
                :end-date="poll.end_date"
            />
        </div>
        <question-content
                class="mt-14"
                :subject="poll.subject"
                :description="poll.description"
                :tags="poll.tags"
                :poll-id="poll.id"
        />

        <question-bows class="mt-14"
                       :bows="Object.values(poll.bows)"
                       v-if="!item.voted"
                       :total="item.amountOfVoted"
                       :voted="item.voted"
                       :poll-id="poll.id"

        />
        <question-media :content="poll.content" :picture="poll.picture" :pictures="poll.urlPhotos"/>
        <question-options
                :options="optionsArray"
                :poll-id="poll.id"
                :type-of-poll="poll.type_of_poll"
                :voted="item.voted"
                :user="mainUser"
                :selected-variable="item.selectedOption"
                :correctOption="poll.correct_option"
                :isPrediction="poll.type_of_poll !== 0"
        />
        <slot name="recommends">

        </slot>
        <question-bows class="mt-14" :bows="Object.values(poll.bows)" :main-bow="item.mainUserBow"  v-if="item.voted" :voted="item.voted" :poll-id="poll.id" :total="item.amountOfVoted"/>
        <question-comments class="mt-18"
                           :explains="explainsArray"
                           :voted="item.voted"
                           v-if="item.voted"
                           :explained="item.haveExplain"
                           :poll-id="poll.id"
        />
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import QuestionHeader from "./questionHeader";
    import QuestionSubject from "./questionSubject";
    import {questionTypes} from "../../../constants";
    import QuestionIcons from "./questionIcons";
    import QuestionContent from "./questionContent";
    import QuestionBows from "./questionBows";
    import QuestionMedia from "./questionMedia";
    import QuestionOptions from "./questionOptions";
    import QuestionComments from "./questionComments";
    export default {
        name: "questionAnnotation",
        components: {
            QuestionComments,
            QuestionOptions,
            QuestionMedia, QuestionBows, QuestionContent, QuestionIcons, QuestionSubject, QuestionHeader},
        props: {
            item:Object
        },
        computed: {
            ...mapState("globalStore", {
                users: ({users}) => users,
                polls: ({polls}) => polls,
                options: ({options}) => options,
                votes: ({votes}) => votes,
                comments: ({comments}) => comments,
                mainUser: ({mainUser}) => mainUser

            }),
            ...mapState('CatalogStore', {
                listById: ({listById}) => listById,
            }),
            author(){
                const {poll, users} = this;
                const user = users[poll.author_id];
                return {
                    id: user.id,
                    username: user.username,
                    url: user.path_to_avatar,
                    leader:user.isLeader
                }

            },

            optionsArray(){
              return this.poll.options_id.map(el => this.options[el])
            },

            explainsArray(){
                const {users, votes, options, comments} = this;
                return this.poll.explains_id.map(el => {
                    const explain = votes[el];
                    const author = users[explain.author_id];
                    const option = options[explain.selected_variable];
                    const commentsArray = this.commentsMap(explain.id);

                    return {
                        author:{
                            username: author.username,
                            avatar:author.path_to_avatar
                        },
                        id:explain.id,
                        date:explain.create_time,
                        description: explain.explain_description,
                        optionDescription:option.description,
                        comments: commentsArray
                    }
                })
            },
            categoryName(){
              return this.listById[this.poll.categories].name
            },
            questionType(){
              return questionTypes[this.poll.type_of_poll]
            },
            creationTime(){
                return this.poll.date;
            },
            poll(){
                const {item, polls} = this;
                return polls[item.id]
            }
        },
        methods: {
            commentsMap(id){
                const {comments, votes, users} = this;
                return this.votes[id].comments_id.map( el => {
                    const comment = comments[el]
                    const author = users[comment.author_id];
                    return {
                        author: {
                            username:author.username,
                            avatar:author.path_to_avatar,
                            id:author.id,
                        },
                        id:comment.id,
                        date:comment.create_time,
                        description: comment.description
                    }
                })
            },
        }
    }
</script>

<style lang="scss">
    .question-annotation {
        border-radius: 8px;
        background-color: #ffffff;
        margin-top:10px;
        padding-bottom: 14px;
        .subject-section {
            padding: 0 16px;
        }
    }
    @media only screen and (min-width: 300px) and (max-width: 765px) {
        .question-annotation:first-of-type {
            margin-top: 121px;


        }
        .question-annotation {
            border-radius: 0 !important;

        }
    }

</style>
