<template lang="html">
<div id="add-section">
<div class="header-section">
  <h5 class="create">
    <lang-string  class="create" :title="'create_poll'"/>
  </h5>
</div>
<div class="create-post">
    <lang-string   :title="'what_do_you_want_to_create_?'"/>
  <div class="buttons-section">
    <router-link to="/add/poll">
      <el-button type="primary" size="small" round>
        <lang-string   :title="'poll'"/>
      </el-button>
    </router-link>
     <router-link to="/add/prediction">
      <el-button size="small" round v-if="user.authorities === 'ADMIN'" >
        <lang-string   :title="'prediction'"/>
      </el-button>
     </router-link>
  </div>
</div>
<router-view></router-view>
</div>
</template>

<script>
import langString from './langString.vue'
import {mapState} from 'vuex'
export default {
  data() {
    return {

    }
  },
  components: {
    langString
  },
  computed: {


      ...mapState('userPage', {

          main_user_id: s => s.main_user_id,
          state: s => s,
          items: s => s.items,
      }),

      ...mapState('globalStore', {

          userMap: ({users}) => users

      }),
      //Main user getter

      user:function () {

          let {state,userMap} = this;

          return userMap[state.main_user_id]

      }
  }
}

</script>

<style lang="scss">
#add-section {
  border-radius: 6px 6px 0px 0px !important;
  max-width: 620px;

  .header-section {
    padding: 11px;
    background: #FFF;
    border-radius: 6px;
    margin-bottom: 5px;
    .lang-string {
      text-transform: uppercase;
    }
  }

  h5 {
    margin: 5px
  }
  .create-post {
    padding: 15px;
    background: #ffffff;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    line-height: 12px;
    font-size: 13px;
    letter-spacing: -0.2px;
    color: #383838;

  }
  .buttons-section {
    margin-top: 10px;
    .el-button--primary {
    background:#4B97B4;
    border-color: inherit;
      }
    .el-button {
    padding: 10px 20px;
    }
  }
  .create {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    line-height: 12px;
    font-size: 13px;
    font-variant: small-caps;
    color: #383838;
  }
}

</style>
