<template lang="html">
    <div id="left-aside">
      <profile-card class="hidden-xs-only" />
        <side-bar />
        <user-statistic  v-if="user" :id="main_user.id" :limit="1" class="hidden-xs-only"/>
        <language-change  class="hidden-xs-only" />
        <!--<guest-locale  class="hidden-xs-only" />-->
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ProfileCard from './LeftSideProfile.vue'
import SideBar from './SideBar.vue'
import Statistic from './Statistic.vue'
import languageChange from './languageChange.vue'
import guestLocale from './guestLocale.vue'
import langString from './langString.vue'
import userStatistic from './user/Event/modules/userStatistic'

export default {
  props:['id'],
  data () {
    return {

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


      loop:function() {

        return "v-for='(item, key) in items.slice(0,2)'"

      },

      main_user:function () {

          let {state,userMap} = this;

          return userMap[state.main_user_id]

      },
  },
  components: {
    SideBar,
    ProfileCard,
    Statistic,
    languageChange,
    langString,
    userStatistic,
    guestLocale

  }
}

</script>

<style lang="scss">

  #left-aside {
      width: 240px !important;
      position: fixed;

      .user-statistic {

          justify-content: center;
          .circle-chart {

          padding: 12px 30px;

          }

      }


      .el-aside {
          overflow-x: hidden;
      }
      .circle {
          display: inline-block;
      }

  }
</style>
