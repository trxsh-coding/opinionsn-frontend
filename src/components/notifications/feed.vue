<template>
  <div class="notification-feed">
    
  </div>
</template>

<script>
import { mapState } from "vuex";
import notificationBlock from "./notificationBlock";
export default {
  name: "feed",
  mounted() {
    this.$store.dispatch("notificationPage/list");
  }
};
</script>

<style lang="scss">
.notification-feed {
  width: 100%;
}
</style>
