<template>
  <transition-group name="list" tag="div" class="notification-container flex-column">
    <notification-block
      :notification="notification"
      v-for="(notification, notification_index) in items.slice(0, 3)"
      :key="notification_index"
    />
  </transition-group>
</template>

<script>
import notificationBlock from "./notificationBlock";
import { mapState } from "vuex";


export default {
  name: "notificationSideFeed",
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
.notification-container {
  position: fixed;
  bottom: 5%;
  right: 2%;
  justify-content: flex-end;
  z-index: 20000;
  max-height: 90%;
  width: 220px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.list-move {
  transition: transform 0.5s;
}
</style>
