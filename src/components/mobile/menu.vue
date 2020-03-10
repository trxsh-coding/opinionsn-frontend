<template lang="html">
    <div class="mobile-menu pt-15 pl-60 pr-20" :class="{'bg-white': !mobile}">
        <profile v-if="mobile"/>

        <routebar/>

        <div class="flex-align-center">
            <div class="flex-align-center mt-13">
                <a class="flex pointer"
                   target="_blank"
                   rel="noreferrer noopener"
                   href="https://apps.apple.com/ru/app/opinion-%D0%BC%D0%B3%D0%BD%D0%BE%D0%B2%D0%B5%D0%BD%D0%BD%D1%8B%D0%B5-%D0%BC%D0%BD%D0%B5%D0%BD%D0%B8%D1%8F/id1490090282"
                >
                    <DownloadOnTheAppStoreBadge :size-scale="0.9"/>
                </a>
            </div>

            <div class="flex-align-center mt-13 ml-15">
                <a class="flex pointer"
                   target="_blank"
                   rel="noreferrer noopener"
                   href="https://play.google.com/store/apps/details?id=com.opinion"
                >
                    <DownloadOnThePlayMarketBadge :size-scale="0.9"/>
                </a>
            </div>
        </div>

        <div class="caption mt-13">
            <span class="copyright my-auto mr-auto">Opinion © 2018 - 2020</span>
            <span @click="changeLanguage(2)" class="switch" :class="{'active': lang === 'ru'}">RUS</span>
            <span @click="changeLanguage(1)" class="switch ml-18" :class="{'active': lang === 'en'}">ENG</span>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import routebar from "./routebar";
    import profile from "./profile";
    import DropdownListReusable from "../reusableСomponents/DropdownListReusable";
    import IconBase from "@/components/icons/IconBase";
    import IconFlag from "@/components/icons/IconFlag";
    import LangString from "@/components/langString";
    import {mapState} from "vuex";
    import DownloadOnTheAppStoreBadge from "../icons/DownloadOnTheAppStoreBadge";
    import DownloadOnThePlayMarketBadge from "../icons/DownloadOnThePlayMarketBadge";

    export default {
        components: {
            DownloadOnThePlayMarketBadge,
            DownloadOnTheAppStoreBadge,
            LangString,
            IconFlag,
            IconBase,
            profile,
            routebar,
            DropdownListReusable
        },

        computed: {

            ...mapState('lang', {
                lang: s => s.locale._lang
            }),

            mobile() {
                return this.$root.mobile;
            },
        },

        methods: {
            changeLanguage(param) {
                axios.post(`${process.env.VUE_APP_MAIN_API}/rest/v1/user/locale/${param}`).then(() => {
                    this.$store.dispatch('lang/getLocaleString')
                });
            }
        },
    };
</script>

<style lang="scss">
    .mobile-menu {

        .lang-switch {
            width: 100% !important;

            .trigger {
                width: 100% !important;
                justify-content: flex-start;
                font-family: Roboto;
                font-style: normal;
                font-weight: normal;
                font-size: 14px;
                line-height: 16px;
                color: #1A1E22;

                .icon-wrapper {
                    margin-left: auto !important;
                }
            }

            .list {
                li:hover {
                    background: #add0dd;
                }
            }
        }

        .caption {
            display: flex;
            justify-content: flex-end;
            // padding: 0 10px;
            .copyright {
                font-family: Roboto;
                font-style: normal;
                font-weight: normal;
                font-size: 11px;
                letter-spacing: -0.3px;
                color: rgba(56, 56, 56, 0.7);
            }

            .switch {
                position: relative;
                top: 2px;

                font-weight: normal;
                font-size: 13px;
                color: #1A1E22;

                padding-bottom: 3px;
                border-bottom: 2px solid transparent;

                user-select: none;

                &.active {
                    color: #4B97B4;
                    border-bottom: 2px solid #4B97B4;
                }
            }
        }
    }

</style>
