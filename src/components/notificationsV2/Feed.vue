<template>
    <div class="height-100" >
        <div id="notifications" :class="{'vh-100' : mobile}">
            <div class="flex-center flex-align-center" :class="{'is-empty' : !mobile, 'mobile-empty' : mobile}" v-if="!list.length && loading">
                <Loader class="mx-auto " />
            </div>
            <div class="is-empty flex-center flex-align-center" v-else-if="!list.length">
                <span>{{translateKeyword('notifications_empty')}}</span>
            </div>
            <div class="notification-view" :class="{'mobile-view' : mobile}" v-else>
                <notification-annotation v-for="notification in list" :data="notification"/>
                <div class="loading-block flex-align-center" v-if="loading && !loaded">
                    <Loader class="mx-auto " />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import NotificationAnnotation from "./layout/Annotation";
    import Loader from "../reusableСomponents/Loader";
    import translateKeywordMixin from "../mixins/translateKeywordMixin";

    export default {
        name: "NotificationFeed",
        components: {Loader, NotificationAnnotation},
        mixins:[translateKeywordMixin],
        props:{
            scrollDifference: Boolean
        },
        watch:{
            scrolled_to_bottom(old) {
                if (old) {
                    this.initializeData(false)
                }
            },
            scrollDifference(old) {
                if (this.route_name !== 'Notifications') {
                    if (old === true) {
                        this.initializeData(false)
                    }
                }
            }
        },
        computed: {
            ...mapState('Notifications', {
                list: ({list}) => list,
                page: ({page}) => page,
                loaded: ({loaded}) => loaded,
                loading: ({loading}) => loading


            }),
            scrolled_to_bottom() {
                return this.$root.scrolled_to_bottom;
            },

            mobile() {
                return this.$root.mobile;
            },

        },
        methods: {
          initializeData(payload){
              this.$store.dispatch('Notifications/init', {force:payload})
          },
          readData(){
              this.$store.dispatch('Notifications/ReadNotifications')

          },

        },
        created(){
        },
        mounted() {
            if(!this.list.length && this.$route.name === 'notifications'){
                this.initializeData(true);
                setTimeout(() => this.readData(), 5000)
            }
        }
    }
</script>

<style lang="scss">
    .vh-100 {
        height: 100vh !important;
    }
    #notifications {
        height: 100%;
        .is-empty {
            height: 100%;
            width: 100%;

            span {
                color:#8E8E93
            }
        }

        .mobile-empty {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .mobile-view {
            margin-top: 58px;
            padding-bottom: 120px;
        }
        .notification-view {
            background-color: #ffffff;
        }
    }

</style>
