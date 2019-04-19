<template>
  <transition-group name="feed" tag="div" class="notification-feed">
    <!-- <notification-block
      :notification="notification"
      v-for="notification in items"
      :key="notification.initiatorId"
    />-->
    <!-- <div class="notification-block">
      <div class="notification-header">
        <div
          class="avatar avatar-30x30 pointer"
          :style="{ 'background-image': 'url(' + author.path_to_avatar + ')' } "
          @click="userLink(author.id)"
        />
      </div>
      <div class="notification-body">
        <span class="username">{{ author.username }}</span>
        <span class="notification-type">{{ notificationType }}</span>
        <span class="message">{{ notification.message }}</span>
      </div>
    </div> -->
  </transition-group>
</template>

<script>
import notificationBlock from "./notificationBlock";
import { mapState } from "vuex";

export default {
  name: "feed",
  components: {
    notificationBlock
  },
  computed: {
    ...mapState("notificationPage", {
      items: s => s.items
    })
  }
};
</script>

<style lang="scss">
.notification-feed {
  width: 100%;
}

.feed-enter-active,
.feed-leave-active {
  transition: all 0.5s;
}

.feed-enter,
.feed-leave-to {
  opacity: 0;
  transform: translateY(-50%);
}

.feed-move {
  transition: transform 0.5s;
}
</style>
