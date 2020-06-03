<template>
    <div class="question-comments">
       <div class="explain-block flex-align-center" v-if="!explained" >
           <RePicture :url="mainUser.path_to_avatar | addAssetsPath"
                      size="28" class="caption-avatar pointer mr-9"
                      rounded @click.native="RedirectToAuthor(mainUser.id)"/>
           <ReusableExplainInput

                   input-type="textarea"
                   v-model="explain_value"
                   @keyup.enter.native.prevent.exact="saveExplain"
                   :placeholder="translateKeyword('explain_your_opinion')">
               <Send @click.native="saveExplain" />
           </ReusableExplainInput>
       </div>
        <comments-feed :explains="filtredExplain" v-if="voted" :poll-id="pollId"/>
    </div>
</template>

<script>
    import ReusableExplainInput from "../../reusableСomponents/ReusableExplainInput";
    import Send from "../../iconsV2/Send";
    import translateKeywordMixin from "../../mixins/translateKeywordMixin";
    import {mapState} from "vuex";
    import RePicture from "../../reusableСomponents/RePicture";
    import RedirectMixin from "../../mixins/RedirectMixin";
    import CommentsFeed from "./commentsFeed";
    import {actionsStoreName} from "../../../constants";
    export default {
        name: "questionComments",
        mixins:[translateKeywordMixin, RedirectMixin],
        components: {CommentsFeed, RePicture, Send, ReusableExplainInput},
        props:{
          pollId:Number,
          explains:Array,
          voted:Boolean,
          explained:Boolean
        },
        data(){
            return {
                explain_value:''
            }
        },
        computed: {
            ...mapState('globalStore', {
                mainUser: ({mainUser}) => mainUser,
            }),
            filtredExplain(){
                let filteredArray = this.explains.filter( el => el.description);
                if(this.$route.name === 'QuestionsFeed'){
                    return filteredArray.reverse().slice(0, 3)
                } else {
                    return this.explains
                }
            }
        },
        methods: {
            async saveExplain(){
                try {
                    await this.$store.dispatch(`${actionsStoreName(this.$route.name)}/saveExplain`, {
                        data: {
                            pollId: this.pollId,
                            description: this.explain_value
                        }
                    });
                    this.clearInput();
                }catch (e) {
                    console.trace(e)
                }
            },
            clearInput(){
                this.explain_value = ''
            },

        }
    }
</script>

<style lang="scss">

    .explain-block {
        padding: 11px 15px 14px;
        border-top: 0.5px solid #D2D2D2;
        border-bottom: 0.5px solid #D2D2D2;
    }
</style>
