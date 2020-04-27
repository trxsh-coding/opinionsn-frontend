<template>
        <div class="opinion-feed" :class="{'pt-162':mobile}">
            <div class="header-block" v-if="mobile">
                <mobile-header header-type="primary" :user="mainUser">
                    <FollowersList  />
                </mobile-header>

            </div>
            <FollowersList  v-else/>
            <Annotation v-for="(item, index) in items" :item="item"/>
            <div class=" flex-align-center" v-if="loading && !is_finished">
                <Loader class="mx-auto " />
            </div>
        </div>
</template>

<script>
    import FollowersList from "./FollowersList";
    import Annotation from "./layout/annotation";
    import {mapState} from "vuex";
    import mobileHeader from "./../view/mobile/header"
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
            scroll_top(val, oldVal) {
                console.log(val, oldVal)
                if (oldVal > 48) {
                    if (val > oldVal) this.hidden = true;
                    if (val < oldVal) this.hidden = false;
                } else {
                    this.hidden = false;
                }
            },
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
            if(!this.items.length){
                this.$store.dispatch('OpinionStore/list')
            }
        }
    }
</script>

<style lang="scss">
    .opinion-feed {
        background: #F8F8F8;
        .header-block {
            z-index: 10000;
            position: sticky;
            top:52px;
            left:0;
        }

    }
</style>
