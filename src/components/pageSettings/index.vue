<template>
    <div class="settings-page" :class="{'bg-white': !mobile}">

        <page-navigation class="px-20 py-12" />
        <page-header class="pl-60" />
        <page-main class="mt-14 pl-30 pr-20" />

    </div>
</template>

<script>
    import langString from "../langString";
    import pageHeader from "./layout/pageHeader";
    import pageMain from "./layout/pageMain";
    import PageNavigation from "./layout/pageNavigation";
    import {mapState} from "vuex";

    export default {
        name: "Settings",
        components: {
            PageNavigation,
            pageHeader,
            langString,
            pageMain
        },

        watch: {
            mainUser(old) {
                if (!!Object.keys(old).length) {
                    this.$store.commit('formManagment/SET_INITIAL_FORM', {form: 'edit_form', value: {...old}} );
                }
            }
        },

        computed: {
            ...mapState('globalStore', {
                mainUser: s => s.mainUser
            })
        },

    }
</script>

<style lang="scss">

    .settings-page {
        position: relative;
        width: 100%;
        border-radius: 6px;

        * {
            font-family: Roboto, sans-serif;
            font-style: normal;
        }

    }

</style>