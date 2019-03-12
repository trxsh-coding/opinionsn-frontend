<template>

    <div class="input-explain-section relative"  v-if="!item.haveExplain">
        <el-input :disabled="!item.voted"
                  type="textarea" autosize
                  :placeholder="item.voted ? lstr('you_can_comment_your_vote') : lstr('you_can_leave_opinion_after_voting') "
                  size="small"
                  v-model="explain_description"
                  @keyup.enter.native="saveExplain(item.id)">
        </el-input>
        <span class="send__button" @click="saveExplain(item.id)">отправить</span>
                <span class="emoji-span" @click="toogleDialogEmoji">
                    <icon-base
                            class="emoji-icon"
                            fill="none"
                            width="13"
                            height="13"
                            viewBox="0 0 15 15"
                            icon-name="emoji"><icon-emoji v-if="item.voted"/>
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
    import avatar from '../../../user/Event/modules/mainUserAvatar'
    import IconBase from '../../../icons/IconBase.vue'
    import IconEmoji from '../../../icons/IconEmoji.vue'
    export default {
        name: "inputExplain",
        props: ['item', 'feed'],
        components: {
            VEmojiPicker,
            langString,
            avatar,
            IconEmoji,
            IconBase
        },
        data: () => ({
            dialogHidden: true,
            explain_description:' '
        }),
        methods: {
            toogleDialogEmoji() {
                this.dialogHidden = !this.dialogHidden;
            },
            onSelectEmoji(dataEmoji) {
                this.explain_description += dataEmoji.emoji;
            },


            saveExplain(poll_id){

                let description = this.explain_description;

                if (this.$route.name === 'pollFeed') {

                    this.$store.dispatch(`pollFeed/saveExplain`, {data: {poll_id, description} });

                } else if (this.$route.name === 'bookmarkFeed'){

                    this.$store.dispatch(`bookmarkFeed/saveExplain`, {data: {poll_id, description} });


                } else {

                    this.$store.dispatch(`singlePoll/saveExplain`, {data: {poll_id, description} });

                }

                this.explain_description = '';
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
    .input-explain-section {

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
