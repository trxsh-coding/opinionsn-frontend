<template>
    <div id="options-block">
        <div class="option-container relative pointer" v-bind:class="{ opacity  : poll.votingOver, normalOpacity : correct_option, cursor : item.voted }" @click="vote(option.id, option.poll_id)" >
            <div class="option-id">
                <span class="span-id">{{option_index + 1}}</span> <span v-if="option.id === correctOption"></span>
            </div>
            <div class="description-right-section relative">
                <div class="option-description" >
                    <span >{{option.description}} </span>
                </div>
                <div class="progress-bar" v-if="item.voted">
                    <el-progress :stroke-width="3" :percentage="option.voted_percentage" color="#152D3A" v-bind:class="{selected:  selected_option, correct: correct_option }"></el-progress>
                </div>
            </div>
        </div>
        <div class="option-bows" >
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
        props: ['option', 'item','option_index', 'correctOption', 'poll', 'feed'],
        computed: {
            /**
             * Defines whether poll can expand (or even needs to)
             */

            ...mapState('user',{
                user : state => state.User
            }),

            selected_option: function () {

                let {item, option} = this;

                let selected_option;


                if (item.selectedOption == option.id) {


                    return selected_option = true;

                }


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

            vote(selected_variable, poll_id){

                if (!this.item.voted && !this.poll.votingOver) {

                        if(this.$route.name === 'pollFeed') {

                            this.$store.dispatch(`pollFeed/createVote`, {data: {selected_variable, poll_id}});


                        } else if(this.$route.name === 'bookmarkFeed') {

                            this.$store.dispatch(`bookmarkFeed/createVote`, {data: {selected_variable, poll_id}});


                        } else {

                            this.$store.dispatch(`singlePoll/createVote`, {data: {selected_variable, poll_id}});


                        }


                }
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

        .opacity {

            opacity: 0.4;

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

                background-color: #4FAC40 !important;

            }
            .el-progress__text {

                color:#4FAC40 !important;

            }

        }

        .option-bows {
            background: #FFFFFF;
            box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.05);
            border-radius: 6px;
            margin-left: 3px;
            width: 96px;
            height: 48px;
        }

        .option-container {
            display: flex;
            width: 370px;
            margin-bottom: 6px;
            box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.05);
            border-radius: 6px;
            height: 48px;
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
                    margin-right: 45px;
                    word-break: break-word;
                    display: flex;
                    align-items: center;
                    height: 100%;
                    padding-left: 7px;
                    span {
                        font-family: Roboto;
                        font-style: normal;
                        font-weight: normal;
                        line-height: 14px;
                        font-size: 12px;
                        letter-spacing: -0.1px;
                        color: #152D3A;
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

                width: 249px;

            }

            .option-bows {

                width: 75px !important;

            }


        }
    }




</style>
