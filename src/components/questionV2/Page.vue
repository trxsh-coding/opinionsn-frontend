<template>
    <div class="question-wrapper">
        <mobile-header header-type="primary" v-if="mobile" />
        <div class="question-page" v-if="Object.values(items).length && Object.values(list).length">
            <question-annotation :item="items">
                <template v-slot:recommends>

                    <div class="recommends-slider pt-10">
                        <span class="mb-10">{{translateKeyword('interesting_questions')}}</span>
                        <ReSwiper :type="mobile ? 'scroll' : 'usual'"
                                  class="mt-10"
                                  :params="{stubLength: 2, width: '100%'}" :usual-swiper-options="{slidesPerView: 2, spaceBetween: 0}" v-if="Object.values(recommends).length">
                            <template #usual>
                                <swiper-slide class="avatar-wrapper"
                                              v-for="item in recommendations">
                                    <recommendation-annotation  :item="item"/>
                                </swiper-slide>
                            </template>
                            <template #scroll>
                                <recommendation-annotation  v-for="item in recommendations" :item="item"/>
                            </template>
                        </ReSwiper>
                    </div>
                </template>
            </question-annotation>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import mobileHeader from "./../headerV2/header"
    import Loader from "../reusableСomponents/Loader";
    import QuestionAnnotation from "../PollFeedv2/layout/questionAnnotation";
    import RecommendationAnnotation from "../PollFeedv2/recommendations/questionAnnotation";
    import ReSwiper from "../reusableСomponents/ReSwiper";
    import translateKeywordMixin from "../mixins/translateKeywordMixin";

    export default {
        name: "QuestionPage",
        components: {ReSwiper, RecommendationAnnotation, QuestionAnnotation, Loader, mobileHeader},
        mixins:[translateKeywordMixin],
        data() {
            return {

            }
        },

        computed: {
            ...mapState("singlePoll", {
                state: s => s,
                items: s => s.items[0],
                loading: s => s.loading,
                is_finished: s => s.is_finished,
            }),
            ...mapState("CatalogStore", {
                list: s => s.listById,
            }),
            ...mapState("questionRecommendations", {
                recommends: s => s.listById,
            }),
            id(){
              return this.$route.params.id
            },
            recommendations(){
               if(this.recommends){
                   return this.recommends[this.id].recommended_polls
               }
            },
            mobile() {
                return this.$root.mobile;
            },
            scrolled_to_bottom() {
                return this.$root.scrolled_to_bottom;
            },
            scroll_top() {
                return this.$root.scroll_top
            },
        },
        watch: {
            id(){
                this.initializeQuestion()
            }
        },
        methods: {
            initializeQuestion(){
                this.$store.dispatch('questionRecommendations/GET_LIST', {id:this.id});
                this.$store.dispatch('singlePoll/list', {
                    customUrl: `${process.env.VUE_APP_MAIN_API}/rest/v1/poll/${this.id}`
                });
            }
        },
        mounted() {
            this.initializeQuestion()
        }

    }
</script>

<style lang="scss">
    .question-page {
        margin-bottom: 25px;
        .question-annotation {
            margin-top: 0;
        }
        .recommends-slider {
            border-top: 0.5px solid #d4d4d4;
            padding: 5px 16px;
            margin: 10px 0;
        }
        .recommendations-wrapper {
            display: flex;
            width: 100%;
            overflow-x: scroll;
        }
    }
</style>
