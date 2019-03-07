<!--<template lang="html">-->
<!--<div id="raiting">-->
  <!--{{id}}-->
  <!--<div v-for="item in statisticFirst.slice(0, 2)" class="center-content">-->
    <!--<div class="category-name flex-center"> <span class="statistic-category">{{item.objectName}}</span></div>-->
    <!--<div  class="statistic-box flex-center">-->
      <!--<el-progress class="circle-chart" type="circle" :percentage="item.circlePercentage" color="#4B97B4" :width="60" :stroke-width="3"></el-progress>-->
    <!--</div>-->
    <!--<div class="statistic-block flex-center">-->
      <!--<span class="statistic-raiting">  <span class="max">{{item.isTopRating}}</span> из {{item.isMaximumRating}}k</span>-->
    <!--</div>-->
  <!--</div>-->
  <!--<div v-for="item in items" class="center-content">-->
    <!--<div class="category-name flex-center"> <span class="statistic-category"></span></div>-->
    <!--<div  class="statistic-box flex-center">-->
      <!--<el-progress class="circle-chart" type="circle" percentage="100" color="#4B97B4" :width="60" :stroke-width="3"></el-progress>-->
    <!--</div>-->
    <!--<div class="statistic-block flex-center">-->
      <!--<span class="statistic-raiting">  <span class="max">{{item.isTopRating}}</span> из {{item.isMaximumRating}}k</span>-->
    <!--</div>-->
  <!--</div>-->
<!--</div>-->
<!--</template>-->

<!--<script>-->
<!--import {mapState} from 'vuex'-->
<!--import axios from 'axios'-->
<!--export default {-->
  <!--props:['id'],-->
  <!--data () {-->
    <!--return {-->

       <!--items:[],-->

    <!--}-->
  <!--},-->
  <!--computed: {-->

    <!--...mapState('userPage', {-->
      <!--state: s => s,-->
    <!--}),-->



  <!--},-->

  <!--methods: {-->


  <!--},-->


  <!--mounted() {-->

    <!--let id = this.id-->





  <!--}-->

<!--}-->
<!--</script>-->

<!--<style lang="scss">-->
<!--#raiting {-->

  <!--display: flex;-->
  <!--justify-content: space-between;-->
  <!--/*padding: 12px 15px 15px 15px;*/-->
<!--}-->
<!--</style>-->
