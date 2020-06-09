<template>
    <div class="comments-feed">
        <div class="explain-author-block" v-for="(explain, index) in explains" :ref="'explain_' + explain.id" v-show="explain.description || explain.comments.length || redirectVoteId === explain.id">
            <div class="author-annotation flex-align-start mr-9">
                <RePicture :url="explain.author.avatar| addAssetsPath" size="36" rounded />
            </div>
            <div class="author-selected-variable flex-column">
                <div class="time-block flex-between">
                    <span class=" bold-caption-13 mt-5">{{explain.author.username}}</span>
                    <time-trans class="comment-time" transformed-time :time="explain.date"/>
                </div>
                <div class="option-description-block">
                    <icon-base width="13" height="13" view-box="0 0 20 20" icon-color="white">
                        <Amount class="icons-color " />
                    </icon-base>
                    <span class="font-13 ml-5 mt-5 mb-5">{{explain.optionDescription}}</span>
                </div>
                <span class="font-13 mt-5">{{explain.description}}</span>
                <span class="reply-span pointer mt-8" @click="setActiveInput(explain.id)" v-if="activeInput !== explain.id">{{translateKeyword('reply')}}</span>
                <ReusableExplainInput
                        v-else-if="activeInput === explain.id"
                        input-type="textarea"
                        v-model="commentValue">
                    <Send @click.native="saveComment(explain.id)"/>
                </ReusableExplainInput>
                <div class="comment-author-block" v-for="comment in explain.comments">
                    <div class="author-annotation flex-align-start  mt-16">
                        <div class="comment-author-info mr-9">
                            <RePicture :url="comment.author.avatar| addAssetsPath" size="36" rounded />
                        </div>
                        <div class="comment-annotation flex-column">
                            <span class="font-13 mt-5">{{comment.author.username}}</span>
                            <span class="font-13 mt-5">{{comment.description}}</span>
                            <span class="reply-span pointer mt-8" @click="setActiveInput(comment.id)" v-if="activeInput !== comment.id">{{translateKeyword('reply')}}</span>
                            <ReusableExplainInput
                                    v-else-if="activeInput === comment.id"
                                    input-type="textarea"
                                    class="mt-5"
                                    @keyup.enter.native.prevent.exact="saveComment(explain.id)"
                                    v-model="commentValue">
                                <Send @click.native="saveComment(explain.id)"/>
                            </ReusableExplainInput>
                        </div>
                        <time-trans class="comment-time" transformed-time :time="comment.date"/>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import RePicture from "../../reusableСomponents/RePicture";
    import translateKeywordMixin from "../../mixins/translateKeywordMixin";
    import ReusableExplainInput from "../../reusableСomponents/ReusableExplainInput";
    import Send from "../../iconsV2/Send";
    import Amount from "../../iconsV2/Amount";
    import IconBase from "../../icons/IconBase";
    import TimeTrans from "../../timeTrans";
    import {actionsStoreName} from "../../../constants";

    export default {
        name: "commentsFeed",
        components: {TimeTrans, IconBase, Amount, Send, ReusableExplainInput, RePicture},
        mixins:[translateKeywordMixin],
        data(){
            return {
                commentValue:'',
                activeInput:null
            }
        },
        props:{
            explains:Array,
            pollId:Number,
        },
        computed: {
            ...mapState('globalStore', {
                votes: ({votes}) => votes,
                comments: ({comments}) => comments,
            }),
            explainAuthor(){

            },
            redirectVoteId(){
                return this.$route.query.voteId || '';
            }
        },
        methods: {
            handleRedirectFromBows(){
                const {voteId, withScroll} = this.$route.query;
                this.activeInput = voteId;
                this.$refs[`explain_${voteId}`][0].scrollIntoView({behavior: "smooth", alignToTop:true})
            },
            clearInput(){
                this.activeInput = null;
                this.commentValue = '';
            },
            saveComment(explain_id){
                this.$store.dispatch(`${actionsStoreName(this.$route.name)}/saveComment`, {data: {explain_id, description: this.commentValue, poll_id: this.pollId}});
                this.clearInput();
            },
            setActiveInput(id){
            this.activeInput = id;
            }
        },
        mounted() {
            if(this.$route.query.withScroll) setTimeout(() => this.handleRedirectFromBows(), 1000);

        }

    }
</script>

<style lang="scss">
    .comments-feed {
        .explain-author-block:first-of-type {
            border-top: 0.5px solid #D2D2D2;

        }
        .explain-author-block:last-of-type {
            border-bottom: none;

        }
        .comment-time {
            color: #8E8E93;
            font-size: 11px;
        }
        .explain-author-block {
            border-bottom: 0.5px solid #D2D2D2;
            padding: 14px 16px;
            display: flex;
            .reply-span {
                color: #8E8E93;
                font-size: 11px;
            }
            .author-selected-variable {
                flex:1;
            }
            .comment-annotation {
                flex:1;
            }
        }
    }
</style>
