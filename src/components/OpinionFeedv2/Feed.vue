<template>
        <div>
            <div class="opinion-feed relative"  :class="{'mobile-padding':mobile}">
                <mobile-header header-type="primary" v-if="mobile">
                    <FollowersList  />
                </mobile-header>
                <FollowersList v-else />

                <Annotation v-for="(item, index) in items" :index="index" :item="item" />
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
    export default {
        name: "OpinionFeed",
        components: {Loader, Annotation, FollowersList, mobileHeader},
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
            load() {
                this.$store.dispatch('OpinionStore/loadNextPage');
            },
        },
        mounted() {
                this.$store.dispatch('OpinionStore/list')
        }
    }
</script>

<style lang="scss">
    .mobile-padding {
        padding-top: 195px !important;
    }
    .opinion-feed {
        background: #F8F8F8;

    }
</style>
