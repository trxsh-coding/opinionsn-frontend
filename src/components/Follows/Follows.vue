<template lang="html">


    <div id="poll-wrapper">
        <!-- Ошибка -->
        <!--<div v-if="state.error">-->
            <!--Что-то сломалось:-->
            <!--{{state.error}}-->
        <!--</div>-->

        <!-- Загрузка -->
        <!--<div v-else-if="state.loading">-->
        <!--<p align="center" style="font-size:10px;margin-top: 5px;color: darkgray">Загружаю ленту мнений...</p>-->
        <!--</div>-->

        <!-- Нет данных -->
        <!--<div v-else-if="!items.length">-->
        <!--<p align="center" style="font-size:10px;margin-top: 5px;color: darkgray">Нет событий</p>-->
        <!--</div>-->


        <!-- Всё ок -->
        <div class="routes-path-wrapper">
            <div class="follows-section" >
                <router-view :id="id"></router-view>

            </div>
        </div>
    </div>




</template>



<script>
    import event from './Event/event.vue'
    export default {
        data(){
            return {

            }
        },
        computed: {

            id:function(){

                let id = this.$route.params.id

                return id

            }



        },
        methods: {



        },

        mounted(){

            // this.$store.dispatch(`followsPage/list`, {customUrl: `/api/rest/getFollowers/${this.id}`});

        },


        components: {
            event,
        }
    }
</script>

<style lang="scss">

</style>
