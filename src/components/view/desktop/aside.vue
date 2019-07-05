<template>
    <div class="aside-layout">
        <profile />
        <aside-navigation />
   </div>
</template>

<script>
    import profile from './aside/profile'
    import asideNavigation from './aside/menu'

    export default {
        name: "aside",
        components: { profile, asideNavigation}
    }
</script>

<style lang="scss">

</style>
