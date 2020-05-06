<template>
    <div class="invitation-block flex-column-center">
        <span class="font-14">{{translateKeyword('invite_your_friends_to_opinion_and_get_their_opinions_on_the_most_relevant_topics')}}</span>
        <button-reusable class="flex-center mt-14" bor-rad="4" @click.native="onModalOpen" >
                <span>{{translateKeyword('invite_a_friend')}}</span>
        </button-reusable>

        <ReModal v-if="showModal" :width="mobile ? '300px' : '500px'"
                 :br="mobile ? 0 : '10px'"
                 :height="mobile ? '130px   ': '200px'"
                 @onCloseModal="showModal = false"
        >

        <div class="flex-column-center flex-align-center">
            <div class="share-block mb-10">
                <span>{{translateKeyword('share')}}</span>
            </div>

            <div class="share-content flex-align-center flex-between" @click="copyInviteLink($refs.shareLink)">
              <span class="font-14">
                 {{translateKeyword('copied')}}
              </span>  <Copy class="ml-14" />
            </div>
            <input ref="shareLink" type="text"
                   :value="`https://opinionsn.com/registration?inviter_id=${mainUser.id}`"
                   class="link flex">
        </div>
        </ReModal>
    </div>

</template>

<script>
    import translateKeywordMixin from "../../mixins/translateKeywordMixin";
    import ButtonReusable from "../../reusableСomponents/ButtonReusable";
    import ReModal from "../../reusableСomponents/ReModal";
    import Copy from "../../iconsV2/Copy";
    import ReInput from "../../reusableСomponents/ReInput";
    import {mapState} from "vuex";

    export default {
        name: "inviteBar",
        components: {ReInput, Copy, ReModal, ButtonReusable},
        mixins:[translateKeywordMixin],
        data(){
            return {
                showModal:false,
            }
        },
        computed: {
            ...mapState("globalStore", {
                mainUser: state => state.mainUser
            }),
            mobile(){
                return this.$root.mobile
            }
        },

        methods: {

            copyInviteLink(elem) {
                if (elem) {
                    elem.select();
                    try {
                        document.execCommand('copy');
                        this.$popup.insert('messages', [{
                            message: this.translateKeyword('link_copied_to_clipboard'),
                            type: 'success'
                        }]);
                    } catch (err) {
                        this.$popup.insert('messages', [{message: this.translateKeyword('unable_to_copy'), type: 'error'}]);
                    }
                    window.getSelection().removeAllRanges();
                }
            },
            onModalOpen(){
                this.showModal = true;
                setTimeout(() => this.copyInviteLink(this.$refs.shareLink), 1000)
            },
        },

    }
</script>

<style lang="scss">
    .invitation-block {
        padding: 14px 16px 11px 16px;
        text-align: center;
        margin-bottom: 11px;
        background-color: #FFFFFF;
        input {
            display: block;
            width: 1px;
            color:#FFFFFF !important;
        }
        .share-content {
            z-index: 1;
        }
        .link {
            flex: 1;
            width: 120px;
            border: none;
            outline: none;
            font-weight: normal;
            font-size: 14px;
            color: #BCBEC3;
        }
        .button-reusable {
            padding: 7px 0;
            width: 135px;
            span {
                color:#FFFFFF;
            }
        }
    }
</style>
