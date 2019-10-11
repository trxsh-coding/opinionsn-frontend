<template>
    <div class="settings-page" :class="{'bg-white': !mobile}" :key="componentKey">

        <page-navigation @update="componentKey ++" class="px-20 py-12" />
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
        data() {
            return {
                // increase key to full rerender
                componentKey: 0
            }
        }

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