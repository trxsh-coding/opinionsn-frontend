<template>
    <div class="poll-block pb-10">
        <div class="middle-block">
            <div class="subject-header-block flex-between">
                <div class="subject__item pointer wb" @click="categoryLink(poll.categories)">
                    <span>{{poll.subject_header}}</span>
                </div>
                <div class="subject__icon">
                    <bookmark :poll="poll" :item="item" />
                </div>
            </div>
            <div class="tags-block wb">
                <span class="tags">{{poll.tags}}</span>
            </div>

            <div class="subject-block wb">
                <span class="poll-subject">{{poll.subject}}</span>
            </div>

            <div class="description-block wb">
                <span class="poll-description">{{poll.description}}</span>
            </div>
            <div class="picture-block" v-if="poll.picture" :style="{ 'background-image': 'url(' + poll.picture + ')' } "></div>
        </div>
        <div class="options">

            <div class="options-section" v-for="(option, option_index) in options" :key="option_index">

                <el-button v-if="user.authorities === 'ADMIN' "  @click="setRightOption(option.id, item.id)">✔</el-button>

                <options-section v-if="!option.picture" :item="item" :feed="feed" :option="option" :option_index="option_index" :correctOption="correctOption" :poll="poll" />

                <options-with-pictures v-if="option.picture" :feed="feed" :item="item" :option="option" :option_index="option_index" :correctOption="correctOption" :poll="poll"/>

            </div>

        </div>
        <icon-block :poll="poll" :item="item" >
            <div slot="bookmark">
            </div>
        </icon-block>
        <div class="border mt-13"></div>
        <input-explain :item="item" :feed="feed" />

    </div>
</template>

<script>
    import optionsSection from './options/optionsSection'
    import optionsWithPictures from './options/optionsWithPictures'
    import { mapState } from 'vuex'
    import I18n from "../../../i18n"
    import moment from 'moment'
    import IconBlock from "../../../icons/IconBlock"
    import bookmark from "../../../icons/bookmark"
    import inputExplain from '../modules/inputExplain'

    export default {
        data: () => ({


        }),

        name: "PollPreview",
        props: ['poll', 'options', 'item', 'user', 'feed'],
        computed: {
            /**
             * Defines whether poll can expand (or even needs to)
             */

            ...mapState('globalStore', {

                optionMap: ({options}) => options,
                userMap: ({users}) => users

            }),

            ...mapState('userPage', {

                main_user_id: s => s.main_user_id,

            }),

            ...mapState('lang',{
                lang : state => state.locale
            }),


            locale(){
                return moment.locale()
            },

            correctOption(){
                let {poll, optionMap}  = this;

                let {correct_option} = poll;

                let correctOption = correct_option

                return correctOption

            },





            // author: function(){
            //     return this.poll.author;
            // },


        },

        methods: {

            categoryLink(category_id){

                this.$router.push({name:'catalogFeed',params:{id:category_id}})

            },


            setRightOption(option_id, poll_id){
                this.$store.dispatch(`pollFeed/setRightOption`, {data: {option_id, poll_id }});
            },






            vote(selected_variable, poll_id){

                if (!this.item.voted) {
                    if(this.$route.name === 'pollFeed') {

                        this.$store.dispatch(`pollFeed/createVote`, {data: {selected_variable, poll_id}});

                    } else {

                        this.$store.dispatch(`singlePoll/createVote`, {data: {selected_variable, poll_id}});


                    }
                }
            },

            mounted(){


            }


        },

        components: {
            IconBlock,
            I18n,
            optionsSection,
            optionsWithPictures,
            bookmark,
            inputExplain
        },

    }

</script>

<style lang="scss">
    .poll-block {


        .options {

            position: relative;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-top: 3px;
            margin-bottom: 12px;

            .options-section  {
                position: relative;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: space-between;
                margin-top: 6px;

                .el-button {

                    position: absolute;
                    z-index: 10;
                    right: 10px;
                    top: 9px;

                }

            }

        }

        .middle-block {

            .picture-block {
                height: 265px;
                width: 100%;
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;
                margin-right: 10px;
                border-radius: 12px;
                margin-top: 13px;
            }
            .subject-header-block {
                border-radius: 9px;
                padding-top: 15px;
                padding-bottom: 7px;
                span {
                    padding: 2px 9px;
                    background: #B9C0C4;
                    border-radius: 9px;
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: normal;
                    line-height: 14px;
                    font-size: 13px;
                    letter-spacing: -0.1px;
                    color: #FFFFFF;
                }
            }
            .tags-block {
                margin-bottom: 5px;
            }
            .subject-block {
                margin-bottom: 9px;
            }
        }
        .input-explain-section {

            display: flex;
            margin-top: 12px;

            .el-input.is-disabled .el-input__inner {

                background: #ffffff;
                border-right-color: #fff;
                border-radius: 12px;
            }

            .el-input-group {

                width: 93%;

            }
            .el-input__inner:hover {

                border-right-color: #ffffff;

            }

            .el-input__inner, .el-input__inner:hover, .el-input__inner:active {
                border-right-color: #D0D5D9 !important;
                border-radius: 12px;
                border-left-color:#D0D5D9;
                border-top-color: #D0D5D9;
                border-bottom-color: #D0D5D9;
                border-right-color: #ffffff;
                height: 30px !important;

            }
            .el-input-group__append {

                background: #ffffff;
                border-left-color:#ffffff;
                border-top-color: #D0D5D9;
                border-bottom-color: #D0D5D9;
                border-right-color: #D0D5D9;
                span {
                    color: #4B97B4;
                }
            }
        }

    }
</style>
