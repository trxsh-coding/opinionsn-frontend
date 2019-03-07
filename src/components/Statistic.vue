<template lang="html">
  <div id="statistic">
    <div class="main-block">
      <div class="header-content" v-on:click="showStatistic = ! showStatistic">
        <span v-on:click="showStatistic = ! showStatistic" class="header-text"> <lang-string :title="'statistics'"/></span>

        <icon-base
          class="dropdown-icon"
          fill="none"
          width="14"
          height="17"
          viewBox="0 0 13 5"
          icon-name="dropdown"><icon-dropdown/>
        </icon-base>
      </div>
    </div>
  </div>
</template>
<script>
import Raiting from './Raiting.vue'
import IconOpen from './icons/IconOpen.vue'
import IconDropdown from './icons/IconDropdown.vue'
import IconBase from './icons/IconBase.vue'
import langString from './langString.vue'
import {mapState} from 'vuex'
import userStatistic from './user/Event/modules/userStatistic'
import axios from 'axios'
export default {
  props:['id'],
  data () {
    return {
      showStatistic:true
    }
  },

  computed: {

    ...mapState('globalStore', {

      userMap: ({users}) => users

    }),

    ...mapState('userPage', {
      state: s => s,
      main_user_id: s => s.main_user_id
    }),


    main_user:function () {

      let {state,userMap} = this;

      return userMap[state.main_user_id]

    },



  },

  methods: {



  },

  created(){




  },
  components: {
    Raiting,
    IconBase,
    IconOpen,
    langString,
    IconDropdown,
    userStatistic

  }
}
</script>

<style lang="scss">
#statistic {
  margin-bottom: 7px;
  .main-block {
    margin-top: 6px;
    background-color: #ffffff;
    padding: 0 10px;
    height: auto;
    border-radius: 12px;
  }


  .header-content {
    padding: 12px 0px;
    border-radius: 6px 6px 0px 0px;
    display: inline-flex;
    justify-content: space-between;
    width: 100%;
    align-items: flex-end;

    img {
      margin-right: 12px;
    }
    .header-text {
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      line-height: 12px;
      font-size: 12px;
      text-transform: uppercase;
      color: #383838;
    }
  }
  .slideDown-enter-active {
    transition: all .3s ease;
  }
  .slideDown-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slideDown-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active до версии 2.1.8 */ {
    transform: translateX(20px);
    opacity: 0;
  }
}

</style>
