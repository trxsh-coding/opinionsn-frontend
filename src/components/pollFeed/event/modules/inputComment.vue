<template>
    <div class="input-section flex-between  mt-15 relative" v-if="hide">
        <el-input  type="textarea" autosize  size="small" v-model="comment_description" @keyup.enter.native="saveComment(item.id, vote.id)" >

        </el-input>
        <span class="send__button pointer lowercase" @click="saveComment(item.id, vote.id)"><lang-string :title="'send'" /></span>

        <span class="emoji-span" @click="toogleDialogEmoji" v-if="!mobile">
                    <icon-base

                            class="emoji-icon"
                            fill="none"
                            width="13"
                            height="13"
                            viewBox="0 0 15 15"
                            icon-name="emoji"><icon-emoji />
                        </icon-base>
        </span>
        <div class="emoji-block" :hidden="dialogHidden">
            <VEmojiPicker :pack="emojisNative" @select="onSelectEmoji" :labelSearch="hide" />
        </div>

    </div>

</template>

<script>
    import VEmojiPicker from "v-emoji-picker";
    import packData from "v-emoji-picker/data/emojis.json";
    import {localString} from './../../../../utils/localString.js'
    import langString from '../../../langString.vue'
    import IconBase from '../../../icons/IconBase.vue'
    import IconEmoji from '../../../icons/IconEmoji.vue'
    import avatar from '../../../user/Event/modules/mainUserAvatar'
    export default {
        name: "inputExplain",
        props: ['item', 'hide', 'vote'],
        components: {
            VEmojiPicker,
            langString,
            avatar,
            IconEmoji,
            IconBase
        },
        data(){

            return {

                dialogHidden: true,
                comment_description:'',
                mobile:this.$root.mobile

            }

        },
        methods: {
            toogleDialogEmoji() {
                this.dialogHidden = !this.dialogHidden;
            },
            onSelectEmoji(dataEmoji) {
                this.comment_description += dataEmoji.emoji;
            },

            saveComment(poll_id, explain_id){

                let description = this.comment_description;

                this.$store.dispatch(`pollFeed/saveComment`, {data: {poll_id, explain_id, description} });

                this.comment_description = ''
            },

        },
        computed: {
            emojisNative() {
                return packData;
            },

            lstr(){
                return (str)=>localString(this.lang, str);
            },
        },
    };
</script>

<style lang="scss">
    .input-section {

        .container-search {

            display: none;

        }
        .el-input.is-disabled .el-input__inner {

            background: #ffffff;
            border-right-color: #fff;
            border-radius: 12px 0 0 12px
        }

        .el-input-group {

            width: 100%;
        }

        .el-input-group__append {

            background: #FFFFFF;
            border-radius: 0 12px 12px 0;
            border-color: #D0D5D9;

            .emoji-span {

                position: absolute;

            }

            .el-button {

                padding: 10px 12px;
                span {

                    vertical-align: initial;

                }

                .span__item {

                    font-family: Roboto;
                    font-style: normal;
                    font-weight: normal;
                    line-height: 12px;
                    font-size: 11px;
                    text-align: right;
                    text-transform: uppercase;
                    letter-spacing: 0px;
                    font-variant: small-caps;
                    color: #B9C0C4;

                }

            }
        }

        .el-input__inner, .el-input__inner:hover, .el-input__inner:active {
            border-right-color: #D0D5D9!important;
            border-radius: 12px ;
            border-left-color:#D0D5D9;
            border-top-color: #D0D5D9;
            border-bottom-color: #D0D5D9;
            padding-right: 30px;
            height: 30px !important;
            input {
                margin-right: 0px !important;

            }
        }

        .send__button {

            position: absolute;
            right: 10px;
            bottom: 10px;

            font-family: Roboto;
            font-style: normal;
            font-weight: normal;
            line-height: 14px;
            font-size: 15px;
            text-align: right;
            letter-spacing: -0.2px;
            font-variant: small-caps;
            color: #B9C0C4;


        }

        .el-textarea__inner{

            overflow-y: hidden;
            resize: none;
            border-radius: 12px;
            padding-right: 100px;
            font-family: Roboto;
        }

        .emoji-icon {
            position: absolute;
            right: 80px;
            bottom: 12px;
        }
        .emoji-block {
            position: absolute;
            z-index: 100000000;
        }
        @media only screen and (max-device-width : 380px) {



        }


    }
</style>
