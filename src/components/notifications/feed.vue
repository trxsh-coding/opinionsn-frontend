<template>
  <el-dropdown trigger="click" @click.native="clearCounter" >
    <el-badge :value=" counter > 9 ? '9+': counter " :hidden="hidden_badge" class="item pointer" >
      <icon-base class="" width="17" height="22" viewBox="0 0 17 22" icon-name="bell" >
        <icon-bell/>
      </icon-base>
    </el-badge>
    <el-dropdown-menu class="notification-dropdown flex-column" slot="dropdown" v-if="messages" v-loading="!loading">
    <!-- <el-dropdown-menu class="notification-dropdown flex-column" slot="dropdown" v-if="false"> -->
      <feed-block
        :notification="notification"
        v-for="(notification, index) in messages"
        :key="index"
      />
    </el-dropdown-menu>
    <el-dropdown-menu class="notification-dropdown flex-column noMessages" slot="dropdown"  v-else>
      <div class="notification-feed-placeholder v-center">
        <span>
          Новые уведомления отсуствуют
        </span>
      </div>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import feedBlock from "./feedBlock";
import IconBase from "../icons/IconBase.vue";
import IconBell from "../icons/IconBell.vue";
import { mapState } from "vuex";
import axios from 'axios'
export default {
  name: "feed",
  components: {
    feedBlock,
    IconBase,
    IconBell
  },
  data() {
    return {

      hidden:false

    };
  },
  methods: {

    clearCounter(){
      this.$store.dispatch('notificationPage/readInitialNotifications')

    }

  },
  computed: {
    ...mapState("notificationStore", {
      messages: s => s.messages
    }),

    ...mapState("notificationPage", {
      counter: s => s.counter,
      loading: s => s.loading

    }),

    hidden_badge:function () {

      if(this.counter == 0) {

        return this.hidden = true;

      }

    }

  },
  created(){
    axios.get(`${process.env.VUE_APP_NOTIFICATION_API}/notification/unReadCount`)
            .then(response => {
                this.$store.commit('notificationPage/setNotificationsCount', response.data)

            })


  }
};
</script>

<style lang="scss" scoped>
.hidden {
  display: none;
}

.notification-feed-block:nth-last-child {

  border: none !important;

}

.notification-dropdown {
  @media only screen and (max-device-width : 700px) {
    width: 90%;
  }
  width: 488px;
  padding: 12px;
  border-radius: 12px;
	max-height: 505px;
	margin-bottom: 0;
  &::-webkit-scrollbar {
    display: none;
  }

  &.noMessages {
    // border-color: #e2e2e2;
    // background-color: #f3f3f3;
    color: #69777F;
    font-family: Roboto;
    font-style: normal;
  }

  .notification-feed-placeholder {
    width: 100%;
    background-color: transparent;
  }
}


</style>
