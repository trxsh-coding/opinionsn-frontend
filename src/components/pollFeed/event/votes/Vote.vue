<template>
    <div class="explain-section" >
        <div class="explain-block relative">
            <div class="avatar-30x30" id="explain-avatar" :style="{ 'background-image': 'url(' + author.path_to_avatar + ')' } " @click="userLink(author.id)"></div>
            <div class="text-block">
                <span class="nickname">{{author.username}}</span>
                <span class="explain-description wb">{{vote.explain_description}}</span>
                <div class="info-block">
                        <icon-base
                                fill="#4B97B4"
                                width="15"
                                height="15"
                                viewBox="0 0 17 17"
                                icon-name="accept">
                            <icon-accept />
                        </icon-base>
                        <div class="selected-description">
                            <span class="selected-option">{{selected_option.description}}</span>
                        </div>
                    <div class="hide" @click="hideReply">
                        <lang-string :title="'reply'" class="reply" />
                      </div>
                </div>
            </div>
            <div class="explain-time">
                <el-tooltip class="item" effect="dark" :content="moment(item.timestamp).format('LL')" placement="top">
                    <span class="time pl-9">{{moment(item.timestamp).format('HH:mm')}}</span>
                </el-tooltip>
            </div>
        </div>
        <div class="comments" v-for="comment_id in vote.comments_id">
            <comment  :comment_id="comment_id" :vote="vote" :user="user" :options="options"></comment>
        </div>
        <span class="load-span uppercase" v-if="!vote.loaded && vote.comments_id.length > 4" @click="loadComments(vote.id)"><lang-string :title="'load_more'"/></span>
        <input-comment :hide="hide" :vote="vote" :item="item"></input-comment>
    </div>
</template>

<script>

    import {mapState} from 'vuex'
    import avatar from '../../../user/Event/modules/mainUserAvatar'
    import Comment from '../comment/Comment'
    import IconBase from '../../../icons/IconBase.vue'
    import IconPrice from '../../../icons/IconPrice.vue'
    import IconAccept from '../../../icons/IconAccept.vue'
    import IconMoney from '../../../icons/IconMoney.vue'
    import IconTime from '../../../icons/IconTime.vue'
    import IconComments from '../../../icons/IconComments.vue'
    import IconReplied from '../../../icons/IconReplied.vue'
    import langString from '../../../langString.vue'
    import {localString} from './../../../../utils/localString.js'
    import inputComment from '../modules/inputComment'
    import moment from 'moment'

    export default {
        data() {
            return {
                comment_page:1,
                explain_description:null,
                comment_description:null,
                no_more_comments: false,
                show_form:false,
                hide:false
            }
        },

        name: "voteSection",
        props: ['explains', 'item', 'vote_id', 'options', 'user'],
        computed: {

            ...mapState('globalStore', {

                votesMap: ({votes}) => votes,
                authorMap: ({users}) => users,
                optionMap: ({options}) => options


            }),

            lstr(){
                return (str)=>localString(this.lang, str);
            },

            vote: function () {

               let {vote_id, votesMap} = this;

               let vote =  votesMap[vote_id] || [];

               return  vote;

            },

            author: function () {

                let {authorMap, vote} = this;


                let author = authorMap[vote.author_id] || [];


                return author

            },

            selected_option: function () {

                let {optionMap, vote} = this;

                let selected_option = optionMap[vote.selected_variable] || [];

                return selected_option

            },




        },


        methods: {

            moment: function () {

                return moment();

            },

            hideReply(){

                this.hide = !this.hide

            },





            loadComments(explain_id){

                let comment_page = this.comment_page;

                this.$store.dispatch(`pollFeed/loadComments`,  {vm: this, explain_id, comment_page});

                this.comment_page += 1;
            },

            userLink(author_id){

                this.$router.push({name:'user',params:{id:author_id}})


            },

        },

        components: {

            Comment,
            IconBase,
            IconTime,
            IconMoney,
            IconAccept,
            IconPrice,
            IconComments,
            IconReplied,
            langString,
            inputComment

        },

    }

</script>

<style lang="scss">
    .explain-section {
        #explain-avatar {

            margin-top: 6px;

        }

        .explain-block {
            align-items: end;
            display: flex;
            margin-bottom: 12px;
            .text-block {
                width: 84%;
                overflow-x: hidden;
            }
            .info-block {
                padding-top: 5px;
                display: flex;
                align-items: center;
                justify-content: end;
                .info__item {


                }
                .selected-description {
                    max-width: 318px;
                    overflow-x: hidden;
                    text-overflow: ellipsis;
                    padding-left: 6px;

                }
                .hide {

                    display: inline-block;

                }
                .reply {
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: normal;
                    line-height: 14px;
                    font-size: 12px;
                    letter-spacing: -0.1px;
                    color: #69777F;
                    padding-left: 10px;
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
                }
            }
        }
        .comments {
            margin-left: 42px;
        }

        @media only screen and (max-device-width : 380px) {


            .explain-block {

                .text-block {

                    width: 81% !important;

                }


            }

        }

    }
</style>
