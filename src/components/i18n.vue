<template>
    <div>
        {{f ? f() : null}}
        <slot></slot>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    export default {
        name: "i18n",
        props: ['f'],
        computed: {
            ...mapState("lang", {
                lang: state=>state.locale.langSelector
            })
        }
    }
</script>

<style scoped>

</style>
