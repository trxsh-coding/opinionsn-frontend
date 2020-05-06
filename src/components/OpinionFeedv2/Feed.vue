<template>
        <div >
            <div class="opinion-feed relative" v-scroll="onScrollEvent"  :class="{'mobile-padding':mobile}"  >
                <mobile-header header-type="primary" v-if="mobile">
                    <FollowersList  />
                </mobile-header>
                <FollowersList v-else />
                <invite-bar />
                <div class="tip-overlay"></div>
                <Annotation v-for="(item, index) in items" :index="index" :item="item" @onOverflowed="decrementFilterCounter" />
                <div class=" flex-align-center" v-if="loading && !is_finished">
                    <Loader class="mx-auto " />
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
    export default {
        name: "OpinionFeed",
        components: {InviteBar, Loader, Annotation, FollowersList, mobileHeader},
        data() {
            return {
                hidden: false
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
            onScrollEvent(e){
            },
            decrementFilterCounter(id, key){
                this.$store.commit('Followings/decrementFilterCounter', {id, key})
            },
            load() {
                this.$store.dispatch('OpinionStore/loadNextPage');
            },
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
    .mobile-padding {
        padding-top: 180px !important;
    }
    .opinion-feed {
        background: #F8F8F8;

    }
</style>
