<template>

    <div class="input-explain-section "  v-if="!item.haveExplain">
        <el-input :disabled="!item.voted"
                  :placeholder="item.voted ? lstr('you_can_comment_your_vote') : lstr('you_can_leave_opinion_after_voting') "
                  size="small"
                  v-model="explain_description"
                  @keyup.enter.native="saveExplain(item.id)">
        </el-input>

        <div class="emoji-wrapper relative" >
            <div class="emoji-block" @click="toogleDialogEmoji">
                <icon-base
                        class="emoji-icon"
                        fill="none"
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        icon-name="emoji"><icon-emoji v-if="item.voted"/>
                </icon-base>
            </div>
            <div class="emoji-block" :hidden="dialogHidden">
                <VEmojiPicker :pack="emojisNative" @select="onSelectEmoji" :labelSearch="hide" />
            </div>
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
            explain_description:' ',
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

        .emoji-icon {
            position: absolute;
            right: 10px;
            top: 8px;
        }
        .emoji-block {
            position: absolute;
            z-index: 100000000;
        }

    }
</style>
