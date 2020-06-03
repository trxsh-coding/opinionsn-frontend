<template>
    <div class="question-options">
        <div class="question-options-block">
            <Option v-for="option in options" class="mt-19"
                    :description="option.description"
                    :percentages="option.voted_percentage"
                    :bows="option.bows"
                    :voted="voted"
                    :poll-id="pollId"
                    :picture="option.picture"
                    :mainUser="user"
                    :selected-option="option.id === selectedVariable"
                    @onAction="createVote(option.id, pollId, typeOfPoll)"
                    :is-closed="correctOption !== -1"
                    :is-prediction="typeOfPoll !== 0"
                    :selected-variable="selectedVariable"
            />

            <div class="answer-annotation-block flex-align-center" v-if="!voted">
                <RePicture :url="user.path_to_avatar | addAssetsPath" class="flex" rounded size="24" />
                <div class="answer-text-block">
                    <span class="font-13">{{translateKeyword('answer_and_find_out_whats_think_others')}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Option from "./Option";
    import RePicture from "../../reusableСomponents/RePicture";
    import translateKeywordMixin from "../../mixins/translateKeywordMixin";
    export default {
        name: "questionOptions",
        components: {RePicture, Option},
        mixins:[translateKeywordMixin],
        props: {
            options:Array,
            pollId:Number,
            typeOfPoll:Number,
            voted:Boolean,
            user:Object,
            selectedVariable:Number,
            correctOption:Number
        },
        computed: {

            actionsStoreName(){
                switch (this.$route.name) {
                    case 'questionsFeed':
                        return 'pollFeed';
                    case 'singlePoll':
                        return 'singlePoll';
                    default :
                        return 'pollFeed';

                }
            }

        },
        isClosed() {
            return this.poll.correct_option !== -1;
        },
        methods: {
             async createVote(selected_variable, poll_id, type_of_poll){

                try {
                    if (this.user.id) {
                        if(!this.voted){
                            this.$root.timer_duration = 3000;

                            this.$root.timer_id = setTimeout(async () => {
                                try {
                                    await this.$store.dispatch(`${this.actionsStoreName}/createVote`, {
                                        data: {
                                            selected_variable,
                                            poll_id,
                                            type_of_poll
                                        }
                                    });
                                    if(this.actionsStoreName === 'pollFeed'){
                                        await this.$store.dispatch(`questionRecommendations/GET_LIST`, {
                                            id:poll_id,
                                            full:true
                                        });
                                    }
                                    this.$root.timer_id = null;
                                    this.$root.timer_duration = 0;
                                }catch (e) {
                                    console.trace(e)
                                }
                            },  this.$root.timer_duration)

                        }

                    } else {

                        this.$router.push({name: 'sign'})
                        this.$popup.insert('messages', {
                            message: 'Для выполнения действий необходимо авторизоваться!',
                            type: 'warning',
                            timeless: true
                        });

                    }



                } catch (e) {
                    console.trace(e)
                } finally {

                }
            }
        }
    }
</script>

<style lang="scss">
    .question-options {
        padding: 0 16px;
        .answer-annotation-block {
            border: 0.5px solid #D2D2D2;
            border-radius: 4px;
            padding:7px;
            margin-top: 14px;
            margin-bottom: 14px;
            .answer-text-block {
                justify-content: center;
                display: flex;
                flex:1;
                span {
                    color:#8E8E93;
                }
            }
        }
    }
</style>

