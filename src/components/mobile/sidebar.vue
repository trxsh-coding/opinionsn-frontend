<template lang="html">
    <div class="sidebar">
        <profile v-if="hide"/>
        <routebar/>
        <language-change/>
    </div>
</template>

<script>
    import routebar from './routebar'
    import profile from './profile'
    import languageChange from '../languageChange'

    export default {
        data(){
            return {
                hide:this.$root.mobile
            }
        },
        components: {
            profile,
            routebar,
            languageChange

        },

        mounted() {


        }
    }
</script>

<style lang="scss">

</style>
