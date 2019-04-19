<template>
  <el-dropdown trigger="click">
    <el-badge :value="0" class="item">
      <icon-base class="pointer" width="17" height="22" viewBox="0 0 17 22" icon-name="bell">
        <icon-bell/>
      </icon-base>
    </el-badge>
    <!-- <el-dropdown-menu slot="dropdown">
			<feed-block :notification="notification" v-for="(notification, index) in messages" :key="index + 'qweqweqwe'"/>
    </el-dropdown-menu> -->
    <!-- <el-dropdown-menu class="notification-dropdown flex-column" slot="dropdown" :class="{ hidden: messages.length <= 0 }">
			<feed-block :notification="notification" v-for="(notification, index) in messages" :key="index + 'qweqweqwe'"/>
    </el-dropdown-menu> -->
    <el-dropdown-menu class="notification-dropdown flex-column" slot="dropdown">
			<feed-block :notification="notification" v-for="(notification, index) in messages" :key="index + 'qweqweqwe'"/>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import feedBlock from "./feedBlock";
import IconBase from '../icons/IconBase.vue'
import IconBell from '../icons/IconBell.vue'
import { mapState } from "vuex";

export default {
	name: "feed",
  components: {
		feedBlock,
		IconBase,
    IconBell,
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
	overflow: hidden;
}
</style>
