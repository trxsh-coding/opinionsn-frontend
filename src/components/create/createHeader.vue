<template>
    <div class="create-header flex-between">
        <lang-string :title="'cancel'" />
        <lang-string class="primary-color" :title="'publish'" />

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
    .create-header {
        padding: 15px 0 38px 20px;
        span {

            font-family: Roboto;
            font-style: normal;
            font-weight: normal;
            font-size: 13px;


        }
    }
</style>
