<template>
    <div class="input-section flex-between  mt-15" v-if="hide">
        <el-input   size="small" v-model="comment_description" @keyup.enter.native="saveComment(item.id, vote.id)" >
            <el-button slot="append" >

                <span class="emoji-span" @click="toogleDialogEmoji">
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

                <span class="span__item" @click="saveComment(item.id, vote.id)">Пояснить</span>
          </el-button>
        </el-input>

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
        data: () => ({
            dialogHidden: true,
            comment_description:'',
        }),
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
        .emoji-icon {

        }

        #EmojiPicker {


        }

        .emoji-block {
            z-index: 100000000;
            position: absolute;
            top: 31px;
            right: -229px;
        }

    }
</style>
