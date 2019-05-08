<template>
    <div id="options-block" v-loading="loading_option">
        <div class="option-container relative pointer" v-bind:class="{ opacity  : poll.votingOver, rightAnswer : correct_option, cursor : option.voted }" @click="vote(option.id, option.poll_id, poll.type_of_poll)" >
            <div class="option-id">
                <span class="span-id">{{option_index + 1}}</span> <span v-if="option.id === correctOption"></span>
            </div>
            <div class="description-right-section relative">
                <div class="option-description" >
                    <span > {{option.description}} </span>
                </div>
                <div class="progress-bar" v-if="item.voted || poll.votingOver">
                    <el-progress :stroke-width="3" :percentage="option.voted_percentage" color="#152D3A" v-bind:class="{selected:  selected_option, correct: correct_option }"></el-progress>
                </div>
            </div>
        </div>
        <div class="option-bows "  v-bind:class="{ opacity  : poll.votingOver, rightAnswer : correct_option, cursor : item.voted }" >
            <poll-option-heads :limit="3" :option="option"/>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import langString from '../../../../langString.vue'
    import PollOptionHeads from '../../../../PollOptionHeads.vue'
    import i18n from '../../../../i18n.vue';
    export default {
        data(){
            return {
                radio: '1',
                mobile:this.$root.mobile

            }

        },


        name: "optionsSection",
        props: ['option', 'item','option_index', 'correctOption', 'poll', 'feed', 'expanded'],
        computed: {
            /**
             * Defines whether poll can expand (or even needs to)
             */

            ...mapState('user',{
                user : state => state.User
            }),

            ...mapState('globalStore', {

                mainUser: ({mainUser}) => mainUser

            }),

            selected_option: function () {

                let {item, option} = this;

                let selected_option;


                if (item.selectedOption == option.id) {


                    return selected_option = true;

                }


            },



            loading_option:function (){

                return this.option.loading

            },


            correct_option: function () {

                let {correctOption, option} = this;

                let correct_option;


                if (option.id === correctOption) {


                    return correct_option = true;

                }


            }



        },

        methods: {

            onExpandAction(){

                this.expanded = !this.expanded

            },


           vote(selected_variable, poll_id, type_of_poll){
                if(this.expanded){

                    if (!this.item.voted && !this.poll.votingOver && this.mainUser && this.mainUser.id ) {

                        this.$store.dispatch(`${this.$route.name}/createVote`, {data: {selected_variable, poll_id,  type_of_poll}})


                    }

                }

                this.$emit('expand', this.expanded = true);

           },

        },


        mounted(){

            console.log(this.$route.name)

        },

        components: {
            langString,
            PollOptionHeads,
            i18n,
        },

    }

</script>

<style lang="scss">

    #options-block {
        display: flex;
        flex-wrap: wrap;
		width: 100%;

        .opacity {

            opacity: 0.4;
            box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.06) !important;

        }

        .cursor {

            cursor: auto;

        }

        .selected {

            .el-progress-bar__inner {

                background-color: #4B97B4 !important;


            }

            .el-progress__text {

                color: #4B97B4;

            }
        }

        .correct {

            .el-progress-bar__inner {

                background-color: #9CD68E !important;

            }
            .el-progress__text {

                color:#9CD68E !important;

            }

        }

        .option-bows {
            background: #FFFFFF;
            box-shadow: 0px 0px 7px rgba(21, 45, 58, 0.24);
            border-radius: 6px;
            margin-left: 3px;
            width: 96px;
            height: 48px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
        .rightAnswer {

            box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.12) !important;
            opacity: 1;

        }

        .option-container {
            display: flex;
            width: 375px;
            border-radius: 6px;
            height: 48px;
            background: #FFFFFF;
            border-radius: 6px;
            box-shadow: 0px 0px 7px rgba(21, 45, 58, 0.24);


            .option-id {
                position: relative;
                width: 25px;
                height: 48px;
                display: flex;
                justify-content: center;
                align-items: center;
                background: #FFFFFF;
                box-shadow: 3px 0px 12px rgba(56, 56, 56, 0.06);
                border-radius: 6px 0px 0px 6px;
                z-index: 10;

            }

            .description-right-section {
                width: 93%;
                .option-description {
                    background: #FFFFFF;
                    word-break: break-word;
                    display: flex;
                    align-items: center;
                    height: 100%;
                    padding-left: 7px;
                    border-radius: 0 6px 6px 0;
                    span {
                        font-family: Roboto;
                        font-style: normal;
                        font-weight: normal;
                        line-height: 14px;
                        font-size: 12px;
                        letter-spacing: -0.1px;
                        color: #152D3A;
                        padding-right: 55px;
                    }
                }

                .progress-bar {
                    margin-left: 7px;
                }

                .el-progress {
                    position: absolute;
                    width: 110%;
                    bottom: 0px;

                    .el-progress__text {
                        position: absolute;
                        bottom: 12px;
                        right: 51px;
                        margin-bottom: 5px;
                    }
                }
            }

        }
        @media only screen and (max-device-width : 700px)  {

            .option-container {

                // width: 249px;
				flex: 1;

            }

            .option-bows {

                // width: 75px !important;
				flex: 0 0 70px;

            }


        }
    }




</style>
