<template lang="html">
  <span class="lang-string">
    {{lang[title] || transformedKey}}
  </span>
</template>
<script>
import axios from 'axios';
import { mapState } from 'vuex';


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
    }

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
