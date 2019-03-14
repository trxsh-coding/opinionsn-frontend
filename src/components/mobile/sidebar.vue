<template lang="html">
    <div class="sidebar">
        <profile v-if="hide"/>
        <routebar/>
    </div>
</template>

<script>
    import routebar from './routebar'
    import profile from './profile'

    export default {
        data(){
            return {
                hide:this.$root.mobile
            }
        },
        components: {
            profile,
            routebar

        },

        mounted() {


        }
    }
</script>

<style lang="scss">

</style>
