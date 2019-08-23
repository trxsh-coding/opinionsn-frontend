<template>
    <div class="aside-layout mr-19">
        <profile class="mb-7" v-if="$route.name !== 'user'"/>
        <aside-navigation class="mt-2" />
   </div>
</template>

<script>
    import profile from './aside/profile'
    import asideNavigation from './aside/menu'

    export default {
        name: "asideMenu",
        components: { profile, asideNavigation}
    }
</script>

<style lang="scss">
    .aside-layout {
        min-width: 288px;
        margin-top: 76px;
        position: fixed;
    }
</style>
