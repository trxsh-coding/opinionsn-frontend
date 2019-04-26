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

            }
        },
        props:['feed'],
        computed: {
            ...mapState('singlePoll', {
                state: s => s,
                items: s => s.items
            }),

            id:function () {

                return this.$route.params.id

            }

        },
        methods: {




        },

        beforeRouteUpdate(to, from, next) {
            this.$store.dispatch(`singlePoll/list`, {customUrl: `/api/rest/quiz/getOne/${this.id}`});
            next()
        },

        mounted(){
            this.$store.dispatch(`singlePoll/list`, {customUrl: `/api/rest/quiz/getOne/${this.id}`});
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
