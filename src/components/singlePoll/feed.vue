<template lang="html">


    <div id="poll-wrapper">

        <div v-for="item in items">
            <pollInstance :item="item" />
        </div>
    </div>




</template>



<script>
    import event from './../pollFeed/event/Event.vue'
    import { mapState } from 'vuex';
    import pollInstance from "../pollFeed/pollInstance";
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


        mounted(){
            this.$store.dispatch(`singlePoll/list`, {customUrl: `${process.env.VUE_APP_MAIN_API}/rest/quiz/getOne/${this.id}`});
        },


        components: {
            pollInstance,
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
