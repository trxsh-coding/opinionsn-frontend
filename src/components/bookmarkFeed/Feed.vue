<template lang="html">


    <div id="poll-wrapper">
        <!-- Ошибка -->
        <div v-if="state.error">
            Что-то сломалось:
            {{state.error}}
        </div>

        <!-- Загрузка -->
        <!--<div v-else-if="state.loading">-->
        <!--<p align="center" style="font-size:10px;margin-top: 5px;color: darkgray">Загружаю ленту мнений...</p>-->
        <!--</div>-->

        <!-- Нет данных -->
        <div v-else-if="!items.length">
            <p align="center" style="font-size:10px;margin-top: 5px;color: darkgray">Нет событий</p>
        </div>


        <!-- Всё ок -->
        <div v-else v-for="item in items">
            <event :item="item"/>
        </div>

    </div>




</template>



<script>
    import event from '../pollFeed/event/Event.vue'
    import { mapState } from 'vuex';
    export default {
        data(){
            return {
            }
        },
        computed: {
            ...mapState('bookmarkFeed', {
                state: s => s,
                items: s => s.items,
            }),


        },
        methods: {



        },


        mounted () {

            this.$store.dispatch(`bookmarkFeed/list`);

        },


        beforeCreate(){

        },

        components: {
            event,
        }
    }
</script>

<style lang="scss">

    .loading {
    }

</style>
