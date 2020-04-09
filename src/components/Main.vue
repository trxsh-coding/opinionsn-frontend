<template lang="html">
    <section>
        <desktop-header
                v-if="!mobile"
                :user="user"/>

        <section class="main-layout container pb-62" :class="{'is_mobile_device': mobile}"
                 :style="(routeName === 'pollFeed' || routeName === 'voteFeed' || routeName === 'singlePoll') && mobile ? {paddingTop: '52px'} : {}">

            <aside v-if="!mobile">
                <aside-desktop/>
            </aside>

            <mobile-header :user="user" v-if="mobile"/>

            <keep-alive include="PollFeed">
                <router-view class="sub-container" :class="{is_mobile_device: mobile}"/>
            </keep-alive>

            <div
                    v-if="routeName === 'pollFeed' || 'singlePoll'"
                    id="undo-panel"
                    class="pointer"
                    :class="{'active': !!$root.timer_id, 'desktop': !mobile}"
                    @click="clearTimer">

                <lang-string class="description" title="undo_choice"/>

                <span class="timer" v-show="timer !== null">{{timer}}</span>

                <div
                        class="undo-bar"
                        :class="{'active': !!$root.timer_id}"
                        :style="{transition: `${$root.timer_duration}ms`}"></div>

            </div>

            <footer v-if="!Object.keys(user).length">
                <div class="auth-block" :class="{'is_mobile_device': mobile}">

                    <div class="flex-align-center" v-if="!$root.mobile">
                        <a class="flex pointer ml-10"
                           target="_blank"
                           rel="noreferrer noopener"
                           href="https://apps.apple.com/ru/app/opinion-%D0%BC%D0%B3%D0%BD%D0%BE%D0%B2%D0%B5%D0%BD%D0%BD%D1%8B%D0%B5-%D0%BC%D0%BD%D0%B5%D0%BD%D0%B8%D1%8F/id1490090282"
                        >
                            <DownloadOnTheAppStoreBadge :size-scale="1"/>
                        </a>

                        <a class="flex pointer ml-20"
                           target="_blank"
                           rel="noreferrer noopener"
                           href="https://play.google.com/store/apps/details?id=com.opinion"
                        >
                            <DownloadOnThePlayMarketBadge :size-scale="1"/>
                        </a>
                    </div>

                    <div class="flex-column flex-align-center" v-if="$root.mobile">
                        <a class="flex pointer"
                           target="_blank"
                           rel="noreferrer noopener"
                           href="https://apps.apple.com/ru/app/opinion-%D0%BC%D0%B3%D0%BD%D0%BE%D0%B2%D0%B5%D0%BD%D0%BD%D1%8B%D0%B5-%D0%BC%D0%BD%D0%B5%D0%BD%D0%B8%D1%8F/id1490090282"
                        >
                            <DownloadOnTheAppStoreBadge :size-scale="0.9"/>
                        </a>

                        <a class="flex pointer mt-10"
                           target="_blank"
                           rel="noreferrer noopener"
                           href="https://play.google.com/store/apps/details?id=com.opinion"
                        >
                            <DownloadOnThePlayMarketBadge :size-scale="0.8"/>
                        </a>
                    </div>

                    <div class="buttons-block mr-10">
                        <router-link :to="getPathWithPoll('sign')">
                            <button-reusable
                                    font-size="13"
                                    class="v-center py-5 mb-10"
                                    bor-rad="50"
                                    bg-color="#4b97b4"
                                    color="#ffffff"
                                    active-color="#4B97B4"
                                    description="sign"
                                    @click.native="setTypeOfSearch('USER')"
                            />
                        </router-link>

                        <router-link :to="getPathWithPoll('registration')">
                            <lang-string class="registration-span pointer" :title="'registration'"/>
                        </router-link>
                    </div>

                </div>
            </footer>
            <authed-footer v-if="Object.keys(user).length"/>
            <IphoneAddToScreenComponent/>

            <mobile-footer v-if="mobile && !!Object.keys(user).length"/>
        </section>
    </section>
</template>

<script>

    import {mapState} from "vuex";
    import IconBase from "./icons/IconBase";
    import IconClose from "./icons/IconClose";
    import IconTextLogo from "./icons/IconTextLogo";
    import {localString} from "../utils/localString.js";
    import mobileHeader from "./view/mobile/header"
    import mobileFooter from "./view/mobile/footer"
    import IphoneAddToScreenComponent from "./pwaSnippets/IphoneAddToScreenComponent"
    import asideDesktop from "./view/desktop/aside";
    import DesktopHeader from "./view/desktop/header";
    import langString from "./langString";
    import ButtonReusable from "./reusableСomponents/ButtonReusable";
    import axios from 'axios';
    import DownloadOnTheAppStoreBadge from "./icons/DownloadOnTheAppStoreBadge";
    import DownloadOnThePlayMarketBadge from "./icons/DownloadOnThePlayMarketBadge";
    import AuthedFooter from "./view/desktop/authedFooter";

    export default {

        data() {
            return {
                timer: 0,
                temp_timer_id: null
            };
        },
        watch: {

            timer_id(old) {
                if (old !== null) {
                    this.reverseTimeout();
                }
            },

            user(old) {
                if (!!Object.keys(old).length) {
                    this.$store.commit('formManagment/SET_INITIAL_FORM', {
                        form: 'edit_form',
                        value: {...old, errors: {}}
                    });
                }
            }

        },
        computed: {

            mobile() {
                return this.$root.mobile;
            },

            ...mapState('globalStore', {

                user: ({mainUser}) => mainUser

            }),

            test() {
                return this.$root.timer_id
            },

            routeName: function () {

                return this.$route.name

            },

            timer_id() {
                return this.$root.timer_id;
            }

        },
        methods: {

            reverseTimeout() {

                if (!!this.$root.timer_duration) {
                    clearTimeout(this.temp_timer_id);

                    this.timer = this.$root.timer_duration / 1000;
                    let reverseTimer = () => {

                        let run = () => {
                            this.timer -= 1;
                            if (this.timer === 0) {
                                this.timer = 0;
                                clearTimeout(this.temp_timer_id);
                            } else {
                                this.temp_timer_id = setTimeout(run, 1000);
                            }
                        };

                        this.temp_timer_id = setTimeout(run, 1000);

                    };
                    reverseTimer();

                }

            },

            clearTimer() {
                clearTimeout(this.$root.timer_id);
                clearTimeout(this.temp_timer_id);
                this.$root.timer_id = null;
                this.$root.timer_duration = 0;
                this.$root.temp_selected_option = null;
            },

            getPathWithPoll(routeName) {

                let {name, params, query} = this.$route;

                if (name === 'singlePoll') {
                    let poll = this.$store.state.globalStore.polls[params.id];
                    let categoryId = poll && poll.categories;

                    return {
                        name: routeName, query: {
                            redirectToPoll: params.id,
                            categoryId
                        }
                    }
                } else if (query.categoryId == 24) {
                    return {name: routeName, query: {categoryId: 24}}
                } else {
                    return {name: routeName}
                }

            },

            createSubscription() {

                this.$store.dispatch('serviceWorker/CREATE_SUBSCRIPTION')

            },

            toggleSubscription() {

                this.$store.dispatch('serviceWorker/TOGGLE_SUBSCRIPTION')

            },

            showNotification() {
                this.$store.dispatch('serviceWorker/SHOW_NOTIFICATION')
            },
            getNotifications() {
                this.$store.dispatch("notificationPage/list", {customUrl: `${process.env.VUE_APP_NOTIFICATION_API}/notification/${this.page}`});
            },


            goMain() {
                this.$router.push({path: "/pollFeed"});
            },

        },

        created() {
            this.$store.dispatch("userPage/getMainUser");
            this.$store.dispatch("lang/getLocaleString");
            this.$store.dispatch("serviceWorker/CREATE_SUBSCRIPTION")
            axios.get(`${process.env.VUE_APP_NOTIFICATION_API}/notification/unReadCount`)
                .then(response => {
                    this.$store.commit('notificationPage/setNotificationsCount', response.data)

                })
        },
        mounted() {
            this.getNotifications();
            this.$store.commit("serviceWorker/SET_NOTIFICATION_SUPPORT")
        },

        beforeRouteUpdate(to, from, next) {
            switch (to.name) {
                case 'ReferralsPage':
                    if (this.user.referCode) {
                        next();
                    } else {
                        next(false);
                    }
                    break;
                default:
                    next();
            }
        },

        components: {
            AuthedFooter,
            DownloadOnThePlayMarketBadge,
            DownloadOnTheAppStoreBadge,
            ButtonReusable,
            asideDesktop,
            DesktopHeader,
            IphoneAddToScreenComponent,
            mobileHeader,
            mobileFooter,
            langString,
            IconBase,
            IconClose,
            IconTextLogo
        }
    };
</script>

<style lang="scss">
    body {
        background: #F8F8F8;
        margin: 0;
    }

    #undo-panel {
        position: fixed;
        z-index: 6000;
        bottom: 49px;
        left: 0;
        width: 100%;
        height: 40px;
        background-color: #B6B6B6;
        display: flex;
        align-items: stretch;
        visibility: hidden;

        * {
            font-family: Roboto, sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            color: #FFFFFF;
        }

        &.desktop {
            bottom: 0;
        }

        .timer {
            position: absolute;
            transform: translateY(-50%);
            top: 50%;
            right: 20px;
            z-index: 100;
        }

        .description {
            position: absolute;
            transform: translate(-50%, -50%);
            top: 50%;
            left: 50%;
            z-index: 100;
        }

        &.active {
            visibility: visible;
        }

        .undo-bar {
            background-color: #4B97B4;
            opacity: 0.75;
            width: 0;
            transition-timing-function: linear;

            &.active {
                width: 100%;
            }
        }
    }

    .main-layout {
        display: flex;

        section {

        }

        footer {
            width: 100%;
            height: 92px;
            background: rgba(21, 45, 58, 0.9);
            box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.06);
            position: fixed;
            left: 0;
            bottom: 0;
            z-index: 20;

            @media only screen and (min-width: 300px) and (max-width: 765px) {
                height: 102px;
            }
        }

        .auth-block {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 92px;
            width: 760px;
            margin: auto;
            padding-left: 260px;

            @media only screen and (min-width: 300px) and (max-width: 765px) {
                box-sizing: border-box;
                width: 100%;
                padding-left: 10px;
                height: 102px;
                padding-right: 34px !important;
            }

            &.is_mobile_device {
                box-sizing: border-box;
                width: 100%;
                padding-left: 20px;
                padding-right: 10px !important;
            }

            .buttons-block {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                position: relative;

                a {
                    text-decoration: none;
                }

                .icon-exit {
                    position: absolute;
                    right: -36px;
                    top: -14px;
                }

                a {
                    text-align: center;
                }

                a:active {
                    text-decoration: none;
                }

                .registration-span {
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: 500;
                    font-size: 13px;
                    line-height: 17px;
                    text-align: center;
                    text-transform: capitalize;

                    color: #d6dadd;
                }
            }

            .logo-block {
                display: flex;
                align-items: center;

                /*margin-left: 25%;*/

                .text-logo {
                    path {
                        fill: #ffffff;
                    }
                }
            }
        }
    }

    @media only screen and (min-width: 300px) and (max-width: 765px) {
        body {
            margin: 0;
            background: #ffffff;
        }
    }

    body.is_mobile_device {
        margin: 0;
    }

</style>
