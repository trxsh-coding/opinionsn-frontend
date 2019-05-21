<template>
    <div class="comment-component" v-if="comment.description">
        <div class="comment-block">
            <div class="avatar-30x30 comment-avatar pointer" :style="{ 'background-image': 'url(' + author.path_to_avatar + ')' } " @click="userLink(author.id)"></div>
            <div class="text-block wb">
                <div class="message">
                    <span class="nickname">{{author.username}}</span>
                    <span class="comment-description">{{comment.description}}</span>
                </div>
                <div class="descripiton__items">


                    <div class="info-block">
                        <icon-base
                                v-if="comment.option_id"
                                fill="#4B97B4"
                                width="15"
                                height="15"
                                viewBox="0 0 17 17"
                                icon-name="accept">
                            <icon-accept />
                        </icon-base>
                        <div class="span__item">
                            <span class="selected-option" v-if="comment.option_id">{{option.description}}</span>
                        </div>
                    </div>

                </div>
            </div>
            <div class="comment-time">
                    <span class="time pl-9"><time-trans :time="comment.create_time"/></span>
                <i class="el-icon-delete" @click="deleteComment(comment.id)" v-if="user.authorities === 'ADMIN' && user.length "></i>
            </div>
        </div>
    </div>
</template>

<script>
    import timeTrans from '../../../timeTrans'
    import {mapState} from 'vuex'
    import IconBase from '../../../icons/IconBase.vue'
    import IconPrice from '../../../icons/IconPrice.vue'
    import IconAccept from '../../../icons/IconAccept.vue'
    import IconMoney from '../../../icons/IconMoney.vue'
    import IconTime from '../../../icons/IconTime.vue'
    import IconComments from '../../../icons/IconComments.vue'
    import IconReplied from '../../../icons/IconReplied.vue'
    import moment from 'moment'
    import langMixin from '../../../mixins/langMixin'
    export default {
        data() {
            return {


            }
        },

        name: "comments",
        props: ['comment_id', 'vote', 'user'],
        computed: {

            ...mapState('globalStore', {

                commentMap: ({comments}) => comments,
                authorMap: ({users}) => users,
                optionMap: ({options}) => options


            }),

            option: function () {

                let {comment, optionMap} = this;
                let {option_id} = comment;
                let option = optionMap[option_id];

                return option;

            },


            comment: function () {

               let {comment_id, commentMap} = this;

               let comment = commentMap[comment_id] || []

               return comment

            },

            author: function () {

                let {authorMap, comment} = this;

                let author = authorMap[comment.author_id] || []

                return author

            },

            comment_selected_option: function () {

                let {optionMap, comment} = this;

                let comment_selected_option = optionMap[comment.selected_variable] || []

                return comment_selected_option

            }

        },

        methods: {

            moment: function () {

                return moment();

            },

            userLink(user_id) {
                this.$router.push({name:'user',params:{id:user_id}})
            },

            deleteComment(comment_id){

                this.$store.dispatch(`pollFeed/deleteComment`, comment_id );

            }

        },

        components: {
            IconBase,
            IconTime,
            IconMoney,
            IconAccept,
            IconPrice,
            IconComments,
            IconReplied,
            timeTrans
        },

    }

</script>



<style lang="scss">

    .comment-block {
        align-items: end;
        display: flex;
        margin-bottom: 6px;
        .comment-avatar {
            margin-top: 5px;
        }

        .info-block {
            padding-top: 5px;
            display: flex;
            align-items: center;
            svg {

                flex-shrink: 0;

            }
            .span__item {

                max-width: 330px;
                padding-left: 6px;
                word-break: normal;
                text-overflow: ellipsis;
                overflow-x: hidden;

            }
            path {
                fill: #4B97B4;
            }
            .selected-option {
                font-family: Roboto;
                font-style: normal;
                font-weight: normal;
                line-height: 14px;
                font-size: 12px;
                letter-spacing: -0.1px;
                color: #4B97B4;
				text-overflow: ellipsis;
    			white-space: nowrap;
            }
        }
        .text-block {
            width: 76%;
        }
        .comment-time {
            text-align: right;
            width: 21%;
            i {
                color: #69777F;
            }

        }

        @media only screen and (max-device-width : 380px) {

                .comment-block {

                    margin-bottom: 0px !important;

                }

                .text-block {

                    width: 70%;

                }

                .comment-time {

                    width: 35%;

                }

        }

    }
</style>
