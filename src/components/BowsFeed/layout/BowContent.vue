<template>
    <div class="bow-block flex-between flex-align-start pb-14">
        <div class="flex-basis-93 flex-align-start">
            <RePicture :url="url | addAssetsPath" size="28" rounded class="mr-13 pointer" @click.native="RedirectToAuthor(userId)"/>
            <div class="flex-column flex-basis-93">
                <div class="bow-top-section flex-between">
                    <div class="bow-subject flex-column">
                        <span class="bold-caption-13 pointer" @click="RedirectToAuthor(userId)">{{username}}</span>
                    </div>
                    <div class="bow-timestamp flex-align-center">
                        <subscribe-button :leader="leader" :id="userId" />
                        <time-trans :time="time"  :leader="leader" transformedTime class="content-time"/>
                    </div>
                </div>
                <span v-if="bowSubject" class="font-13 mt-5">{{bowSubject}}</span>
                <span v-if="voted" class="comment-btn mt-5" @click="RedirectToPollWithQuery">{{translateKeyword('comment')}}</span>
            </div>
        </div>


    </div>
</template>

<script>
    import RePicture from "../../reusableСomponents/RePicture";
    import TimeTrans from "../../timeTrans";
    import {mapState} from "vuex";
    import SubscribeButton from "./SubscribeButton";
    import RedirectMixin from "../../mixins/RedirectMixin";
    import translateKeywordMixin from "../../mixins/translateKeywordMixin";
    export default {
        name: "BowContent",
        components: {SubscribeButton, TimeTrans, RePicture},
        mixins:[RedirectMixin, translateKeywordMixin],
        props: {
            url:String,
            username:String,
            time:String,
            userId:Number,
            optionId:Number,
            voted:Boolean,
            leader:String,
            pollId:Number,
            voteId:Number
        },
        computed: {
            ...mapState("globalStore", {
                options: ({ options }) => options
            }),

            bowSubject(){
                return this.voted ? this.options[this.optionId].description : ''
            }
        },
        methods: {
            RedirectToPollWithQuery(){
                this.$router.push({name: 'singlePoll', params: {id: this.pollId},
                    query:{
                        withScroll:true,
                        voteId:this.voteId
                    }
                })
            },
        }
    }
</script>

<style lang="scss">
    .bow-block {
        width: 100%;
        z-index: 100;
        margin:14px;
        border-bottom: 0.5px solid #E2E2E2;
        .flex-basis-93 {
            flex-basis: 93%;
        }
        .bow-subject span {
            display: inline-block;
        }
        .bow-top-section {
            flex: 1;
        }
        .content-time {
            color:#8E8E93;
            font-size: 11px;
        }
        .comment-btn {
            color:#4B97B4;
            font-size: 11px;
        }

    }
</style>
