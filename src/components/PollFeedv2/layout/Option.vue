<template>
    <div class="question-option-wrapper">
        <div class="question-option-border pointer" @click="action">
            <div class="option-block relative" :style="backgroundStyle">
                <div class="content-block  flex-between"  >
                    <div class="left-row flex-align-center">
                        <RePicture :url="picture | addAssetsPath" height="38px" width="38px" class="option-image" v-if="picture" />
                        <div class="description-block pl-10">
                            <span v-if="!voted" :class="{'font-13' : mobile, 'font-14' : !mobile}" > {{description}}</span>
                            <question-bows class="flex" :poll-id="pollId" :bows="bows" v-else/>
                        </div>
                    </div>
                    <div class="right-row">

                    </div>
                    <div class="percentage-block flex-align-center mr-8" v-if="voted">
                        <RePicture :url="mainUser.path_to_avatar | addAssetsPath" size="28" class="option-image mr-8" rounded v-if="selectedOption"/>
                        <span :class="{'font-13' : mobile, 'font-14' : !mobile}">{{percentages}}%</span>
                    </div>
                </div>
                <div class="percentage-overlay" :style="percentageOverlayStyles"></div>
            </div>
        </div>
        <span v-if="voted" class="font-13" >{{description}}</span>
        <button @click="setRightOption"
                v-if="mainUser.authorities === 'ADMIN'  && !isClosed && isPrediction">✓
        </button>
    </div>
</template>

<script>
    import OptionBows from "./optionBows";
    import QuestionBows from "./questionBows";
    import RePicture from "../../reusableСomponents/RePicture";
    import {mapState} from "vuex";
    export default {
        name: "Option",
        components: {RePicture, QuestionBows, OptionBows},
        props: {
            description:String,
            percentages:Number,
            voted:Boolean,
            bows:Object,
            picture:String,
            pollId:Number,
            selectedOption:Boolean,
            isClosed:Boolean,
            isPrediction: Boolean,
            selectedVariable:Number
        },
        computed: {
            ...mapState('globalStore', {
                mainUser: s => s.mainUser
            }),
            backgroundStyle(){
              return {
                  backgroundColor: this.voted ? '#E4F1F3' : '#FFFFFF'
              }
            },
            percentageOverlayStyles(){
                return {
                    width:this.voted?this.percentages + '%' : 0,
                    height:'100%',
                }
            }
        },
        methods: {
            setRightOption(){
                this.$store.dispatch('pollFeed/setRightOption', {data: {selected_variable : this.selectedVariable, poll_id:this.pollId}})
                    .then(({status}) => {
                        if (status === 200) {
                            this.$popup.insert('messages', [{
                                message: 'Вариант выбран успешно!',
                                type: 'success'
                            }]);
                        } else {
                            this.$popup.insert('messages', [{
                                message: 'При выборе опции произошла ошибка!',
                                type: 'error'
                            }]);
                        }
                    });
            },
            action(){
                this.$emit('onAction')
            }
        }
    }
</script>

<style lang="scss">
    .question-option-border {
        border: 1px solid #D2D2D2;
        border-radius: 4px;
        z-index: 100;
        .option-image {
            display: flex;
            z-index: 10;
            image {
                z-index: 10;
            }
        }
        .unvoted-padding {
            padding: 10px;
        }
        .left-row {
        }
        .option-block {
            border-radius: 4px;
            .question-bows {
                padding: 0;
            }
            .content-block {
                height: 38px;
                z-index: 10;
            }

            .percentage-overlay {
                background-color: #9CE2EA;
                position: absolute;
                z-index: 0;
                top:0;
                left:0;
            }
        }
    }

</style>
