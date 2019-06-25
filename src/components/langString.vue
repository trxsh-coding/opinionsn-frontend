<template lang="html">
  <span class="lang-string">
    {{lang[title] || transformedKey}}<slot name="text"></slot>
  </span>
</template>
<script>
import { mapState } from 'vuex';
import {localString} from "../utils/localString";

export default {
  data(){
    return {
    }
  },
  props: {
    title: String
  },
  computed: {
    ...mapState('lang',{
      lang : state => state.locale
    }),

    transformedKey: function(){
      let noUnderscoreString = this.title.replace(new RegExp('_', 'g'), ' ');
      return noUnderscoreString.charAt(0).toUpperCase() + noUnderscoreString.slice(1);
    },

    lstr(){
      return (str)=>localString(this.lang, str);
    },

  },
  methods: {
    langStr() {

    }
  },
  mounted(){

  },

  props:['registration', 'login', 'title']
}
</script>

<style lang="scss">

</style>
