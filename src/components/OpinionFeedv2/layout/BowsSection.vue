<template>
    <div class="bows-section mt-10">
        <div class="bows-block flex-align-center" @click="onOpen">
            <RePicture v-for="(bow, index) in filtredSubsBows"
                       v-if="index < 4"
                       size="28" rounded
                       :url="bow.path_to_avatar | addAssetsPath"
                       :class="{'bow_item': index >= 1}"
                       class="mr-9 pointer"
            />
            <span class="bow-amount-caption  font-13 lowercase weight-300 pointer" :class="{'font-12' : mobile, 'font-13': !mobile}">+ {{translateKeyword('more')}} {{ totalAmountVotes - bows.length  + ' ' + opinionWordAmount}} </span>
        </div>
        <ReModal v-if="showModal" :width="mobile ? '100%' : '500px'"
                 :br="mobile ? 0 : '10px'"
                 :height="mobile ? '100%' : '500px'"
                 overflow @onCloseModal="onClose"
                 @onScrolledBottom="onScrolled"
        >
            <div class="loading-block height-100 flex-align-center" v-if="!items.length && loading  ">
                <Loader class="mx-auto height-100" />
            </div>
            <div class="bows-section " v-else-if="items.length || bows.length">
                <bow-annotation section-name="subscribers" :data="bows" :poll-id="id"   :voted="voted"/>
                <bows-feed :id="id" v-show="items.length" :voted="voted" />
            </div>
        </ReModal>
    </div>
</template>

<script>
    import RePicture from "../../reusableСomponents/RePicture";
    import ReModal from "../../reusableСomponents/ReModal";
    import BowsFeed from "../../BowsFeed/BowsFeed";
    import BowAnnotation from "../../BowsFeed/layout/BowAnnotation";
    import Loader from "../../reusableСomponents/Loader";
    import {mapState} from "vuex";
    import StringMixins from "../../mixins/StringMixins";
    import translateKeywordMixin from "../../mixins/translateKeywordMixin";
    export default {
        name: "BowsSection",
        components: {Loader, BowAnnotation, BowsFeed, ReModal, RePicture},
        mixins:[StringMixins, translateKeywordMixin],
        props: {
            bows:Array,
            id:Number,
            authorId:Number,
            totalAmountVotes:Number,
            voted:Boolean,
        },
        data(){
            return {
                showModal:false
            }
        },
        computed: {
            ...mapState("BowStore", {
                loading: ({ loading }) => loading,
                pollId: ({ pollId }) => pollId,
                items: ({ items }) => items,
                page: ({ page }) => page,
                is_finished: ({is_finished}) => is_finished

            }),
            mobile() {
                return this.$root.mobile;
            },
            opinionWordAmount(){

                let captionText = null;
                let counter, keyword, wordEnding;
                let {totalAmountVotes, bows} = this;
                if (totalAmountVotes > bows.length ) {

                    counter = totalAmountVotes - bows.length;
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
            filtredSubsBows(){
                const {bows, authorId} = this;
                let array = [];
                let array2 = [];
                Object.values(bows).map( el => {
                    if(el.id === authorId) array.push(el)
                    else array2.push(el)
                });
                const filtredArray = [...array, ...array2];

                return filtredArray;
            }
        },
        methods: {

            onClose(){
                this.showModal = false;
                this.$store.commit('BowStore/clearState')
            },
            onScrolled(){
                if(!this.is_finished || !this.loading){
                    this.$store.dispatch('BowStore/loadNextPage', {customUrl: `${process.env.VUE_APP_MAIN_API}/rest/v2/poll/${this.id}/bows/${this.page + 1}`});
                }
            },
            onOpen(){
                this.showModal = true;
            }
        }
    }
</script>

<style lang="scss">
    .bow_item {
        margin-left: -15px;
    }
    .bows-section {
        .bow-amount-caption {
            color: #8E8E93;
        }
    }
</style>
