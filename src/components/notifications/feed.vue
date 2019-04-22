<template>
  <el-dropdown trigger="click" @click="clearCounter">
    <el-badge :value="0" class="item pointer">
      <icon-base class="" width="17" height="22" viewBox="0 0 17 22" icon-name="bell">
        <icon-bell/>
      </icon-base>
    </el-badge>
    <el-dropdown-menu class="notification-dropdown flex-column" slot="dropdown" v-if="messages.length > 0">
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

export default {
  name: "feed",
  components: {
    feedBlock,
    IconBase,
    IconBell
  },
  data() {
    return {
      // notification: {
      //   date: "2019-04-19T11:17:12.478+0000",
      //   eventType: "UNSUBSCRIBE",
      //   id: 0,
      //   initiatorId: 3,
      //   message: "От вас отписался",
      //   read: false,
      //   received: false,
      //   targetId: 0,
      //   userId: 2
      // }
    };
  },
  methods: {

    clearCounter(){

      this.$store.commit('notificationPage/clearCounter')

    }

  },
  computed: {
    ...mapState("notificationStore", {
      messages: s => s.messages
    }),
    ...mapState('notificationPage',{
      counter : state => state.counter
    }),
  }
};
</script>

<style lang="scss" scoped>
.hidden {
  display: none;
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
    border-color: #e2e2e2;
    background-color: #f3f3f3;
  }

  .notification-feed-placeholder {
    width: 100%;
    background-color: transparent;
  }
}


</style>
