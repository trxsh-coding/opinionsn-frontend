<template>
    <div class="navigation-aside-menu flex-column">

        <router-link class="create-poll-link br-6 px-12 pl-14 py-10 pointer flex-align-center"
                     active-class="isActive" :to="{name: 'createPoll'}">
            <IconAddPoll height="18" width="18"/>
            <lang-string class="ml-14" title="create_poll"/>
        </router-link>

        <div class="nav-menu mt-9 br-6">
            <router-link class="links py-12 px-12 pl-13 pointer"
                         active-class="isActive" :to="{name: 'QuestionsFeed'}">
                <IconPollFeed fill="#1A1E22"/>
                <lang-string class="ml-15" title="main"/>
            </router-link>

            <div class="hr mx-13"></div>

            <router-link class="links py-12 px-12 pl-13 pointer"
                         active-class="isActive" :to="{name: 'opinionFeed'}">
                <IconOpinion/>
                <lang-string class="ml-14" title="opinion"/>
            </router-link>

            <div class="hr mx-13"></div>

            <router-link class="links py-11 pl-15 pr-12 pointer"
                         active-class="isActive" :to="{name: 'bookmarkFeed'}">
                <IconBookmark class="bookmark-icon" stroke-width="2" width="13" height="18"/>
                <lang-string class="ml-18" title="bookmark"/>
            </router-link>

        </div>

        <router-link class="feedback-link br-6 mt-9 pl-14 py-10 pointer flex-align-center"
                     active-class="isActive" :to="{name: 'feedback'}">
            <IconSpeaker class="mr-14"/>
            <lang-string title="feedback"/>
        </router-link>

        <dropdown-list-reusable
                v-if="isAuthorized"
                class="lang-switch br-6 flex-align-center mt-9"
                list-class="drop-list"
                width="100%"
                click-close
                with-arrow>
            <template v-if="lang">
                <CountryFlagsList class="flag-icon" :country="lang.toUpperCase()"/>
                <lang-string class="ml-11" title="choose_language"/>
            </template>

            <template #items>
                <ul class="flex-column">
                    <li @click="changeLanguage(1)" class="option px-10 h-36 pointer flex-align-center">
                        <CountryFlagsList class="flag-icon" country="EN"/>
                        <span class="ml-12">English</span>
                    </li>
                    <li class="hr mx-9"></li>
                    <li @click="changeLanguage(2)" class="option px-10 h-36 pointer flex-align-center">
                        <CountryFlagsList class="flag-icon" country="RU"/>
                        <span class="ml-12">Русский</span>
                    </li>
                </ul>
            </template>
        </dropdown-list-reusable>

        <div class="menu-caption flex-column mt-9">

            <div class="flex-align-center flex-center">
                <a class="flex pointer"
                   target="_blank"
                   rel="noreferrer noopener"
                   href="https://apps.apple.com/ru/app/opinion-%D0%BC%D0%B3%D0%BD%D0%BE%D0%B2%D0%B5%D0%BD%D0%BD%D1%8B%D0%B5-%D0%BC%D0%BD%D0%B5%D0%BD%D0%B8%D1%8F/id1490090282"
                >
                    <DownloadOnTheAppStoreBadge/>
                </a>

                <a class="flex pointer ml-15"
                   target="_blank"
                   rel="noreferrer noopener"
                   href="https://play.google.com/store/apps/details?id=com.opinion"
                >
                    <DownloadOnThePlayMarketBadge/>
                </a>
            </div>

            <span class="mt-9 ml-10 mr-auto">Opinion © 2018 - 2020</span>
        </div>

    </div>
</template>

<script>
    import IconBase from "../../../icons/IconBase";
    import IconSpeaker from "../../../icons/IconSpeaker";
    import langString from "../../../langString"
    import DropdownListReusable from "@/components/reusableСomponents/DropdownListReusable";
    import axios from "axios";
    import IconFlag from "@/components/icons/IconFlag";
    import IconBookmark from "@/components/icons/IconBookmark";
    import IconAddPoll from "@/components/icons/IconAddPoll";
    import IconPollFeed from "@/components/icons/navigation/IconPollFeed";
    import IconOpinion from "@/components/icons/footer/IconOpinion";
    import CountryFlagsList from "@/components/icons/CountryFlagsList";
    import {mapState} from "vuex";
    import DownloadOnTheAppStoreBadge from "../../../icons/DownloadOnTheAppStoreBadge";
    import DownloadOnThePlayMarketBadge from "../../../icons/DownloadOnThePlayMarketBadge";


    export default {
        name: "menu",
        computed: {
            ...mapState('lang', {
                lang: s => s.locale._lang
            }),

            ...mapState('globalStore', {
                isAuthorized: ({mainUser}) => !!Object.keys(mainUser).length
            }),

            routeName() {
                return this.$route.name
            }
        },
        methods: {
            routerPush(linkName) {

                this.$router.push({name: `${linkName}`})

            },

            async changeLanguage(param) {
               try {
                   await axios.post(`${process.env.VUE_APP_MAIN_API}/rest/v1/user/locale/${param}`).then(() => {
                       this.$store.dispatch('lang/getLocaleString')
                   });
                   location.reload();
               }catch (e) {
                   console.trace(e)
               }
            }
        },
        components: {
            DownloadOnThePlayMarketBadge,
            DownloadOnTheAppStoreBadge,
            CountryFlagsList,
            IconOpinion,
            IconPollFeed,
            IconAddPoll,
            IconBookmark,
            IconFlag,
            DropdownListReusable,
            IconBase, langString, IconSpeaker
        }
    }
</script>

<style lang="scss">
    .navigation-aside-menu {

        span {
            font-family: Roboto, sans-serif;
            font-size: 13px;
            color: #1A1E22;
            font-weight: normal;
        }

        .menu-caption {
            background: transparent;

            & > * {
                font-family: Roboto;
                font-style: normal;
                font-weight: normal;
                font-size: 11px;
                color: #1A1E22;
            }
        }

        .hr {
            display: block;
            border-bottom: 1px solid #CECFD3;
        }

        & > * {
            background: #ffffff;
        }

        .isActive {
            background: #4B97B4;

            svg {
                fill: white;
            }

            .bookmark-icon {
                stroke: white;
                fill: transparent;
            }

            span {
                color: white;
            }
        }

        .lang-switch {
            position: relative;
            width: 100%;
            height: 36px;

            .flag-icon {
                outline: 1px solid #CECFD3;
            }

            .drop-list {
                border: 1px solid #CECFD3;
                padding: 0 !important;

                .option:hover {
                    background: #ebecef;
                }
            }

            .toggle-btn {
                border: 1px solid #CECFD3;
                border-radius: 6px;
                width: inherit;
                height: inherit;
                padding: 0 10px;
                justify-content: flex-start;

                .icon-wrapper {
                    margin-left: auto !important;
                }

            }

        }

        .nav-menu {
            overflow: hidden;

            a {
                display: flex;
                align-items: center;

                &:last-of-type {
                    border-bottom: none;
                }
            }

        }
    }

</style>
