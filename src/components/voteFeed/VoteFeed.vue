<template lang="html">


    <div class="vote-feed">
        <!-- Ошибка -->

        <div class="loading"  v-loading.fullscreen.lock="state.loading"  v-if="state.loading">

        </div>
        <div class="have-no-subscribers mt-10" v-else-if="!items.length">
            <span>Лента мнений будет доступна после появления подписок</span>
        </div>
        <!--<div v-if="state.error">-->
            <!--Что-то сломалось:-->
            <!--{{state.error}}-->
        <!--</div>-->

        <!--&lt;!&ndash; Загрузка &ndash;&gt;-->


        <!--&lt;!&ndash; Нет данных &ndash;&gt;-->
        <!--<div v-else-if="!items.length">-->
            <!--<p align="center" style="font-size:10px;margin-top: 5px;color: darkgray">Нет событий</p>-->
        <!--</div>-->


        <!-- Всё ок -->
        <div class="feed relative" v-else>
            <div class="filter-section flex mb-10" >
                <swiper :options="swiperOption" class="category-section">
                    <swiper-slide class="followings-block " v-for="following in followings">

                        <filter-component  :following="following"  />

                    </swiper-slide>
                </swiper>
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

        data(){

            return {

                swiperOption: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    }
                }

            }

        },

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

<style lang="scss">
    .vote-feed {
        height: 100%;
        .swiper-container {

            margin-left: 0px;

        }
        .have-no-subscribers {

            text-align: center;
            span {

                color: #69777F;
                font-family: Roboto;
                font-style: normal;

            }

        }
        .followings-block {

            width: 75px !important;
            margin-right: 12px !important;

            .filter-wrapper {

                span {

                    font-family: Roboto;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    color: #152D3A;


                }

            }

        }

    }
</style>
