<template>
   <div class="poll-wrapper">
        <mobile-header header-type="primary" v-if="mobile">
            <CategorySelect :current="filter_id" @setCategory="setCategory" />
        </mobile-header>
       <CategorySelect v-else :current="filter_id" @setCategory="setCategory" />

       <div class="poll-feed mt-7 relative flex-column pb-12" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
           <div class="reload-indicator-wrapper v-center" ref="reload_indicator" v-if="items.length"
                :style="difference && {height: difference + 'px'}">
               <Loader />
           </div>
           <question-annotation v-for="item in items" :item="item">
               <template v-slot:recommends>
                   <div class="recommends-slider" v-if="recommends[item.id]">
                       <span class="mb-10 ">{{translateKeyword('recommend')}}</span>
                       <div v-for="u in recommends[item.id].recommended_users">
                           <div class="users-wrapper pr-16">
                               <users-annotation :item="u"/>
                           </div>
                       </div>
                       <ReSwiper :type="mobile ? 'scroll' : 'usual'"    class="mt-10"
                                 :params="{stubLength: 2, width: '100%'}" :usual-swiper-options="{slidesPerView: 2, spaceBetween: 0}" >
                           <template #usual>
                               <swiper-slide class="avatar-wrapper"
                                             v-for="r in recommends[item.id].recommended_polls">
                                   <recommendation-annotation  :item="r"/>
                               </swiper-slide>
                           </template>
                           <template #scroll>
                               <recommendation-annotation  v-for="r in recommends[item.id].recommended_polls" :item="r"/>
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
    import PullTo from 'vue-pull-to'
    import CategorySelect from "../categorySelectv2/CategorySelect"
    import QuestionAnnotation from "./layout/questionAnnotation";
    import ReSwiper from "../reusableСomponents/ReSwiper";
    import RecommendationAnnotation from "./recommendations/questionAnnotation";
    import translateKeywordMixin from "../mixins/translateKeywordMixin";
    import UsersAnnotation from "./recommendations/usersAnnotation";

    export default {
        name: "PollFeed",
        mixins:[translateKeywordMixin],
        components: {
            UsersAnnotation,
            RecommendationAnnotation,
            ReSwiper, QuestionAnnotation, CategorySelect, Loader, mobileHeader, PullTo},
        data() {
            return {
                init_coord: 0,
                difference: 0,
                is_loader_active: false,
            }
        },
        watch: {
            scrolled_to_bottom(old) {
                if (old) {
                    this.load();
                }
            }
        },
        computed: {
            ...mapState("pollFeed", {
                state: s => s,
                items: s => s.items,
                loading: s => s.loading,
                is_finished: s => s.is_finished,
                filter_id: state => state.filter_id,
            }),

            load() {
                this.$store.dispatch(`pollFeed/loadNextPage`);
            },
            ...mapState("questionRecommendations", {
                recommends: s => s.listById,
            }),
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
        methods: {
            handleTouchStart({touches}) {
                this.init_coord = touches[0].screenY;
                if (this.$root.scroll_top === 0) this.is_loader_active = true;
            },
            handleTouchMove({touches}) {
                let difference = touches[0].screenY - this.init_coord;
                if (this.$root.scroll_top === 0 && difference > 0 && this.is_loader_active) {
                    document.body.style.cssText = 'overflow-y: hidden;';
                    this.difference = difference;
                }
            },

            handleTouchEnd() {
                if (this.$refs.reload_indicator.offsetHeight === 70) {
                    this.$store.dispatch('pollFeed/list');
                }
                document.body.style.cssText = '';
                this.is_loader_active = false;
                this.init_coord = 0;
                this.difference = 0;
            },
            setCategory(id) {
                console.log(id)
                this.$store.commit('pollFeed/setFilterId', id);
                this.$store.dispatch('pollFeed/list');
            },
        },
        mounted() {
            this.setCategory(-1);

        }

    }
</script>

<style lang="scss">
    .poll-wrapper {
        background-color: #F8F8F8;
        .recommends-slider {
            border-top: 0.5px solid #d4d4d4;
            padding: 5px 0px 5px 16px;
            margin: 10px 0;
        }
        .category-wrapper {
            background-color: #ffffff;
            border-radius: 8px;
        }
        .reload-indicator-wrapper {
            height: 0;
            min-height: 0;
            max-height: 70px;
            overflow: hidden;
        }
        @media only screen and (min-width: 300px) and (max-width: 765px) {
            .poll-feed {
                margin-top: 30% !important;
            }
            .category-wrapper {
                background-color: #ffffff;
                border-radius: 0;

            }
        }
    }
</style>
