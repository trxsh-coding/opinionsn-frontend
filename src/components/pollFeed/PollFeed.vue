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
    <!--<div >-->
      <!--<p align="center" style="font-size:10px;margin-top: 5px;color: darkgray">Нет событий</p>-->
    <!--</div>-->

    <div class="loading"  v-loading.fullscreen.lock="state.loading"  v-if="state.loading">

    </div>

    <!-- Всё ок -->
    <div  class="feed relative" v-else>


        <swiper :options="swiperOption" class="category-section" >
          <swiper-slide class="category-block " v-for="category in categories">

            <filter-component :filtered="filtered" :category="category"  />

          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      <div v-for="item in items" >
        <event :item="item" :feed="feed"/>
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
        page: 1,
        filtered: false,
        mobile: this.$root.mobile,
        swiperOption: {
          slidesPerView: 5,
          spaceBetween: 90,
          freeMode: true,
          loop:true,
          breakpoints: {
            768: {
              slidesPerView: 3,
              spaceBetween: 50
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 80
            },
            320: {
              slidesPerView: 1,
              spaceBetween: 10
            }
          }

        },

      }
    },
    props:['feed'],
    computed: {
      ...mapState('pollFeed', {
        state: s => s,
        items: s => s.items,
        loading: s => s.is_finished
      }),

      ...mapState('globalStore', {
        categories: ({categories}) =>categories,
      }),

      slidesPerView:function(){

        if(this.mobile) {

          this.swiperOption.slidesPerView = 5;
          this.swiperOption.spaceBetween = 12;


        } else {

          this.swiperOption.slidesPerView = 8;
          this.swiperOption.spaceBetween = 90;

        }

      },


      beforeRouteLeave (to, from, next) {

        let {page} = this;

        page = 0;

        this.$store.commit('pollFeed/resetFeedPage', page).then(() => {

          next();

        })


      },


    },
    methods: {

      load(){


            this.$store.dispatch(`pollFeed/loadNextPage`);


      },



    },

    watch: {



    },

    created(){


    },


    mounted(){




      this.$store.dispatch(`catalogList/list`);

      this.$store.dispatch(`pollFeed/list`);


    },



    components: {
      event,
      filterComponent,
      MugenScroll
    }
  }
</script>

<style lang="scss">

  .ps__thumb-x {

    background: #4B97B4 !important;

  }

  .category-section::-webkit-scrollbar {
    display: none;
  }
  .category-block span::selection {
    background: transparent;
  }

    #poll-wrapper {

        .category-section {
          overflow-x: auto;
          display: flex;
          .category-block {

            text-align: center;
            margin-right: 10px;
          }
        }

        .feed {
            height: 100%;
            overflow:hidden;
            .swiper-slide {
              width: 93px !important;
              margin-right: 12px !important;

            }
        }


    }
  .loading {

    span {

      color:#f4f4f4f4;

    }

  }

</style>
