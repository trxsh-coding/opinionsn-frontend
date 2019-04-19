<template lang="html">


    <div id="poll-wrapper">

        <div v-for="item in items">
            <event :item="item" :feed="feed"/>
        </div>
    </div>




</template>



<script>
    import event from './../pollFeed/event/Event.vue'
    import { mapState } from 'vuex';
    export default {
        data(){
            return {
                id: this.$route.params.id
            }
        },
        props:['feed'],
        computed: {
            ...mapState('offChainPoll', {
                state: s => s,
                items: s => s.items
            }),


        },
        methods: {




        },


        mounted(){

            this.$store.dispatch(`offChainPoll/list`, {customUrl: `/api/rest/quiz/getOne/${this.id}`});

        },




        components: {
            event,
        }
    }
</script>

<style lang="scss">
    #poll-wrapper {

        .el-aside {

            margin-right: 12px ;

        }

    }
</style>
