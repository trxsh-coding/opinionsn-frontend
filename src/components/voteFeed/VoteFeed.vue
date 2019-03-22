<template lang="html">


    <div>
        <!-- Ошибка -->
        <!--<div v-if="state.error">-->
            <!--Что-то сломалось:-->
            <!--{{state.error}}-->
        <!--</div>-->

        <!--&lt;!&ndash; Загрузка &ndash;&gt;-->
        <!--<div v-else-if="state.loading">-->
            <!--<p align="center" style="font-size:10px;margin-top: 5px;color: darkgray">Загружаю ленту мнений...</p>-->
        <!--</div>-->

        <!--&lt;!&ndash; Нет данных &ndash;&gt;-->
        <!--<div v-else-if="!items.length">-->
            <!--<p align="center" style="font-size:10px;margin-top: 5px;color: darkgray">Нет событий</p>-->
        <!--</div>-->


        <!-- Всё ок -->
        <div class="feed relative">
            <div class="filter-section flex mb-10">
                <div class="followings-block " v-for="following in followings">

                    <filter-component  :following="following"  />

                </div>
            </div>
            <div v-for="item in items">
                <event :item="item"/>
            </div>
            <mugen-scroll :handler="load" :should-handle="!loading">
                <div class="loading" v-if="!loading"><span>Loading</span></div>
            </mugen-scroll>

        </div>
    </div>




</template>



<script>
    import MugenScroll from 'vue-mugen-scroll'
    import event from './event/Event.vue'
    import filterComponent from './event/filterComponent.vue'

    import { mapState } from 'vuex';
    export default {

        computed: {

            ...mapState('voteFeed', {
                state: s => s,
                items: s => s.items,
                loading: s => s.is_finished,

            }),

            ...mapState('followsPage', {

                followings: s => s.items,

            }),


        },

        methods: {

            load(){


                this.$store.dispatch(`voteFeed/loadNextPage`);


            },

        },

        mounted(){
            this.$store.dispatch(`followsPage/getMyFollowings`);
            this.$store.dispatch(`voteFeed/list`);
        },

        components: {
            event,
            MugenScroll,
            filterComponent
        }
    }
</script>
