<template>
  <el-dropdown trigger="click">
    <el-badge :value="0" class="item pointer">
      <icon-base class="" width="17" height="22" viewBox="0 0 17 22" icon-name="bell">
        <icon-bell/>
      </icon-base>
    </el-badge>
    <el-dropdown-menu class="notification-dropdown flex-column" slot="dropdown">
      <feed-block
        :notification="notification"
        v-for="(notification, index) in messages"
        :key="index"
      />
      <!-- <feed-block :notification="notification"/> -->
      <!-- <feed-block :notification="notification"/> -->
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
      notification: {
        date: "2019-04-19T11:17:12.478+0000",
        eventType: "UNSUBSCRIBE",
        id: 0,
        initiatorId: 3,
        message: "От вас отписался",
        read: false,
        received: false,
        targetId: 0,
        userId: 2
      }
    };
  },
  computed: {
    ...mapState("notificationStore", {
      messages: s => s.messages
    })
  }
};
</script>

<style lang="scss" scoped>
.hidden {
  display: none;
}

.notification-dropdown {
  width: 488px;
  padding: 12px;
	max-height: 505px;
	margin-bottom: 0;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
