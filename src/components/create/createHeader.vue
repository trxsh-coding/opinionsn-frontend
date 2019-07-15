<template>
    <div class="create-header flex-between">
        <lang-string :title="'cancel'" />
        <lang-string :title="'publish'" />

    </div>
</template>

<script>
    import langString from '../langString'
    export default {
        name: "createHeader",
        components: {langString}
    }
</script>

<style lang="scss">

</style>
