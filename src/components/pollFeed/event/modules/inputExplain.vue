<template>

    <div class="input-explain-section relative"  v-if="!item.haveExplain">
        <el-input :disabled="!item.voted"
                  type="textarea" autosize
                  :placeholder="item.voted ? lstr('explain_your_opinion') : lstr('available_after_voting') "
                  size="small"
                  v-model="explain_description"
                  @keyup.enter.native="saveExplain(item.id)">
            <i slot="suffix" class="el-input__icon el-icon-date">вфывфы</i>
        </el-input>
        <span class="send__button pointer lowercase" @click="saveExplain(item.id)"><lang-string :title="'send'"/></span>
                <span class="emoji-span" @click="toogleDialogEmoji" v-if="!mobile">
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
    import langString from '../../../langString.vue'
    import avatar from '../../../user/Event/modules/mainUserAvatar'
    import IconBase from '../../../icons/IconBase.vue'
    import IconEmoji from '../../../icons/IconEmoji.vue'
    import langMixin from '../../../mixins/langMixin'
    import {mapState} from 'vuex'
    export default {
        mixins:[langMixin],
        name: "inputExplain",
        props: ['item', 'feed'],
        components: {
            VEmojiPicker,
            langString,
            avatar,
            IconEmoji,
            IconBase
        },
        data (){

            return {

                dialogHidden: true,
                explain_description:'',
                mobile:this.$root.mobile

            }

        },
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


            ...mapState('pollFeed', {
                state: s => s,
                error: s => s.error
            }),
        },
    };
</script>

<style lang="scss">
    .input-explain-section {
        #Categories {

            background: #FFFFFF;

        }
        #EmojiPicker {

            background: #FFFFFF;

        }

        .container-search {

            display: none;

        }

        .send__button {

             position: absolute;
             right: 10px;
             bottom: 10px;

             font-family: Roboto;
             font-style: normal;
             font-weight: normal;
             line-height: 13px;
             font-size: 15px;
             text-align: right;
             letter-spacing: -0.2px;
             font-variant: small-caps;
             color: #B9C0C4;
            padding-right: 5px;



         }

        .el-textarea__inner{

            overflow-y: hidden;
            resize: none;
            border-radius: 12px;
            padding-right: 100px;

        }

        .el-textarea__inner::placeholder {

            font-family: Roboto;
            font-style: normal;
            font-weight: 300;
            font-size: 13px;
            color: #828D92 !important;

        }

        .emoji-icon {
            position: absolute;
            right: 84px;
            bottom: 12px;
        }
        .emoji-block {
            position: absolute;
            z-index: 100000000;
            bottom: 100%;
            right: 0px;
        }
        @media only screen and (max-device-width : 380px) {



        }

    }
</style>
