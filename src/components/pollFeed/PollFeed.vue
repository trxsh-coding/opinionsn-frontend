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
    <!--<div >-->
      <!--<p align="center" style="font-size:10px;margin-top: 5px;color: darkgray">Нет событий</p>-->
    <!--</div>-->


    <!-- Всё ок -->
    <div v-else v-for="item in items" v-else-if="items.length">
      <event :item="item" :feed="feed"/>
    </div>
    <mugen-scroll :handler="load" :should-handle="!loading">
      <div class="loading" v-if="!loading"><span>Loading</span></div>
    </mugen-scroll>
  </div>




</template>



<script>
  import MugenScroll from 'vue-mugen-scroll'
  import event from './event/Event.vue'
  import { mapState } from 'vuex';
  export default {
    data(){
      return {
        page: 1
      }
    },
    props:['feed'],
    computed: {
      ...mapState('pollFeed', {
        state: s => s,
        items: s => s.items,
        loading: s => s.is_finished
      }),


    },
    methods: {

      load(){

        this.$store.dispatch(`pollFeed/loadNextPage`);

      },



    },





    beforeCreate(){
      this.$store.dispatch(`pollFeed/list`);
    },

    components: {
      event,
      MugenScroll
    }
  }
</script>

<style lang="scss">

  .loading {

    span {

      color:#f4f4f4f4;

    }

  }

</style>
