<template>
    <div class="question-bows flex-align-center " >
        <RePicture v-for="(bow, index) in Object.values(bows)"
                   v-if="index < visibleAmount"
                   @click.native="onOpen"
                   size="28" rounded
                   :url="bow.path_to_avatar | addAssetsPath"
                   :class="{'bow_item': index >= 1}"
                   class="mr-9 pointer q-bows-picture flex"
        />
        <span class="bow-amount-caption  font-13 lowercase weight-300 pointer" v-if="total - bows.length > 0"
              @click="onOpen"
              :class="{'font-12' : mobile, 'font-13': !mobile}">+ {{translateKeyword('more')}} {{ total - bows.length  + ' ' + opinionWordAmount}}
        </span>

        <ReModal v-if="showModal" :width="mobile ? '100%' : '500px'"
                 :br="mobile ? 0 : '10px'"
                 :height="mobile ? '100%' : '500px'"
                 overflow @onCloseModal="closeModal"
                 @onScrolledBottom="onScrolled"
                 :is-opened="showModal"
        >
            <bow-annotation section-name="mine"
                            :data="[mainBow]"
                            :poll-id="pollId"
                            :voted="voted"
            />
            <bow-annotation section-name="subscribers"
                            v-show="Object.values(bows).length"
                            :data="Object.values(bows)"
                            :poll-id="pollId"
                            :voted="voted"
            />
            <bows-feed :id="pollId"  :voted="voted" />
        </ReModal>
    </div>
</template>

<script>
    import RePicture from "../../reusableСomponents/RePicture";
    import ReModal from "../../reusableСomponents/ReModal";
    import BowAnnotation from "../../BowsFeed/layout/BowAnnotation";
    import BowsFeed from "../../BowsFeed/BowsFeed";
    import {mapState} from "vuex";
    import translateKeywordMixin from "../../mixins/translateKeywordMixin";
    import StringMixins from "../../mixins/StringMixins";
    export default {
        name: "questionBows",
        components: {BowsFeed, BowAnnotation, ReModal, RePicture},
        mixins:[translateKeywordMixin, StringMixins],
        props: {
            bows:Object,
            voted:Boolean,
            pollId:Number,
            total:Number,
            mainBow:Object,
            withCaption:{
                type:Boolean,
                default: false
            },
            visibleAmount: {
                type:Number,
                default:4
            }
        },
        data(){
          return {
              showModal:false
          }
        },
        computed: {
            ...mapState("BowStore", {
                loading: ({ loading }) => loading,
                items: ({ items }) => items,
                page: ({ page }) => page,
                is_finished: ({is_finished}) => is_finished

            }),
            opinionWordAmount(){

                let captionText = null;
                let counter, keyword, wordEnding;
                let {total, bows} = this;
                if (total > bows.length ) {

                    counter = total - bows.length;
                    keyword = this.setWordEnding({
                        word: 'мнени',
                        count: counter,
                        singleLetterEnding: 'е',
                        singleEnding: 'я',
                        pluralEnding: 'й',
                    });
                    wordEnding = keyword.substring(keyword.length - 1);
                }
                return this.translateKeyword('opinions', wordEnding);
            },
            mobile() {
                return this.$root.mobile;
            },
        },
        methods: {

            closeModal(){
                this.showModal = false;
                this.$store.commit('BowStore/clearState')
            },
            onOpen(){
                this.showModal = true;
            },
            onScrolled(){
                if(!this.is_finished || !this.loading){
                    this.$store.dispatch('BowStore/loadNextPage', {customUrl: `${process.env.VUE_APP_MAIN_API}/rest/v2/poll/${this.pollId}/bows/${this.page + 1}`});
                }
            },
        }
    }
</script>

<style lang="scss">
    .question-bows {
        padding: 0 16px;
        .q-bows-picture {
            z-index: 10;
        }
        .bow_item {
            margin-left: -15px;
        }
    }
</style>
