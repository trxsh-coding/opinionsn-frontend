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
      this.$store.dispatch('user/getUserLocale', selected).then(() => {
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
    margin-top: -9px;
    .el-select {
      width: 100%;
      overflow: hidden;
    }
    .el-select:hover, .el-select,  .el-input__inner {

      border-color: #fff;

      border-radius: 12px;

    }
  }
</style>
