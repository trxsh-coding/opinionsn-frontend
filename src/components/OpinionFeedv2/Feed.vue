<template>
        <div >
                <div class="opinion-feed relative "

                     v-scroll="onScrollEvent"  :class="{'mobile-padding':mobile && items.length, 'empty-padding' : !items.length && !loading && mobile}"  >
                    <mobile-header header-type="primary" v-if="mobile">
                        <FollowersList  />
                    </mobile-header>
                    <FollowersList v-else />
                    <div class="feed mt-7 relative flex-column pb-12" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
                        <invite-bar />
                        <div class="reload-indicator-wrapper v-center" ref="reload_indicator" v-if="items.length"
                             :style="difference && {height: difference + 'px'}">
                            <Loader />
                        </div>
                        <Annotation v-for="(item, index) in items" :index="index" :item="item" @onOverflowed="decrementFilterCounter" v-if="items.length"/>
                        <div class="empty-block height-100" v-show="!items.length && !loading">
                            <span class="empty-title flex-center">{{translateKeyword('invite_your_friends_to_opinion_and_get_their_opinions_on_the_most_relevant_topics')}}</span>
                        </div>
                        <div class=" flex-align-center " v-if="loading && !is_finished ">
                            <Loader class="mx-auto " />
                        </div>
                    </div>

                </div>
        </div>
</template>

<script>
    import FollowersList from "./FollowersList";
    import Annotation from "./layout/annotation";
    import {mapState} from "vuex";
    import mobileHeader from "./../headerV2/header"
    import Loader from "../reusableСomponents/Loader";
    import InviteBar from "./layout/inviteBar";
    import PullTo from 'vue-pull-to'
    import translateKeywordMixin from "../mixins/translateKeywordMixin";

    export default {
        name: "OpinionFeed",
        components: {InviteBar, Loader, Annotation, FollowersList, mobileHeader, PullTo},
        mixins:[translateKeywordMixin],
        data() {
            return {
                hidden: false,
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
            ...mapState('OpinionStore', {
                items: ({items}) => items,
                loading: ({loading}) => loading,
                is_finished: ({is_finished}) => is_finished
            }),
            ...mapState("globalStore", {
                mainUser: ({mainUser}) => mainUser,
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
          async refresh(loaded) {
                try {
                    await this.$store.dispatch('OpinionStore/list')
                }catch (e) {
                    console.trace(e)
                }
            },
            onScrollEvent(e){
            },
            decrementFilterCounter(id, key){
                this.$store.commit('Followings/decrementFilterCounter', {id, key})
            },
            load() {
                this.$store.dispatch('OpinionStore/loadNextPage');
            },

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
                    this.$store.dispatch('Followings/initData');
                    this.$store.dispatch('OpinionStore/list')
                    this.$store.commit('Followings/setCounterState')
                }

                document.body.style.cssText = '';
                this.is_loader_active = false;
                this.init_coord = 0;
                this.difference = 0;
            }
        },
        mounted() {
                if(!this.items.length){
                    this.$store.dispatch('OpinionStore/list')
                }
        },
        beforeDestroy() {
            this.$store.dispatch('Followings/ReadFilterNotifications')
        }
    }
</script>

<style lang="scss">
    .empty-block {
        height: 70vh;
    }
    .mobile-padding {
        padding-top: 180px !important;
    }
    .empty-padding {
        padding-top: 140px !important;
    }
    .opinion-feed {
        background: #F8F8F8;
        .empty-title {
            font-size: 13px;
            text-align: center;
            color:#8E8E93;
        }
        .reload-indicator-wrapper {
            height: 0;
            min-height: 0;
            max-height: 70px;
            overflow: hidden;
        }

    }
</style>
