<template lang="html">


    <div>
        <!-- Ошибка -->
        <div v-if="state.error">
            Что-то сломалось:
            {{state.error}}
        </div>

        <!-- Загрузка -->
        <div v-else-if="state.loading">
            <p align="center" style="font-size:10px;margin-top: 5px;color: darkgray">Загружаю ленту мнений...</p>
        </div>

        <!-- Нет данных -->
        <div v-else-if="!feedItems.length">
            <p align="center" style="font-size:10px;margin-top: 5px;color: darkgray">Нет событий</p>
        </div>


        <!-- Всё ок -->
        <div v-else v-for="item in feedItems">
            <event :item="item"/>
        </div>
    </div>




</template>



<script>
    import event from './event/Event.vue'
    import { mapState } from 'vuex';
    export default {

        computed: {
            ...mapState('voteFeed', {
                state: s => s,
                feedItems: s => s.feedItems,
            })
        },

        beforeCreate(){
            this.$store.dispatch(`voteFeed/list`);
        },

        components: {
            event,
        }
    }
</script>
