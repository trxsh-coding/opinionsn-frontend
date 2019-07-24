<template>
    <div class="create-header flex-between">
        <lang-string class="pointer" :title="'cancel'" @click="router.go(-1)"/>
        <lang-string class="primary-color pointer" :title="'publish'" @click.native="onFormSubmit"/>

    </div>
</template>

<script>
    import langString from '../langString'
    export default {
        name: "createHeader",
        components: {langString},
        methods: {
            onFormSubmit(){

                this.$emit('submit')

            }
        }
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
