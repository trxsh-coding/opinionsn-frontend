<template lang="html">
  <div class="lang-field">
    <el-select :value="value" @input="update" :placeholder="lstr('choose_language')">
      <el-option :value="1">English</el-option>
      <el-option :value="2">Русский</el-option>
    </el-select>
    <!-- <lang-string :title="lang['login']" /> -->
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import {localString} from './../utils/localString'
import langString from './langString.vue'

export default {
  data(){
    return {
    }
  },
  methods : {
    update(selected) {
      axios.post(`/api/rest/locale/change/${selected}`).then(() => {
        this.$store.dispatch('lang/getLocaleString')
      });
    }
  },
  props: {
  },
  computed: {
    ...mapState('lang',{
      lang : state => state.locale
    }),
    lstr(){
      return (str)=>localString(this.lang, str);

    }
  },
}
</script>

<style lang="scss">
  .lang-field {
    margin-top: 9px;
    height: 36px;

    .el-select i {
        font-size: 11px;
        color: #828D92;
    }
    .el-input__inner {
      height: 36px;
      border-color: #FFFFFF !important;
      font-family: Roboto;
      font-style: normal;
      font-weight: 300;
      font-size: 11px;
      line-height: 11px;
      color: #152D3A !important;
      padding-left: 12px;
    }

    .el-input__inner::placeholder {

      font-size: 11px;
      line-height: 14px;
      color: #828D92;
    }
    .el-select {
      width: 100%;
      overflow: hidden;
      .el-input__inner {


      }
    }
    .el-select:hover, .el-select,  .el-input__inner {

      border-color: #fff;

      border-radius: 12px;

    }
  }
</style>
