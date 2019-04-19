<template>
  <div class="notification-block flex-align-center">
    <div class="notification-header">
      <div
        class="avatar avatar-30x30 pointer"
        :style="{ 'background-image': 'url(' + author.path_to_avatar + ')' } "
        @click="userLink(author.id)"
      />
    </div>
    <div class="notification-body font-13">
      <span class="username">{{ author.username }}</span>
      <span class="notification-type">{{ notificationType }}</span>
      <span class="message">{{ notification.message }}</span>
      <span class="timestamp">{{ timestamp }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import axios from "axios";
import { log } from "util";
// import func from '../../../vue-temp/vue-editor-bridge';
export default {
  name: "feedBlock",
  props: ["notification"],
  data: function() {
    return {};
  },
  computed: {
    ...mapState("globalStore", {
      userMap: ({ users }) => users
    }),

    author: function() {
      let { notification, userMap } = this;

      let userID = notification.initiatorId;

      if (userMap[userID] === undefined) {
        this.$store.dispatch(
          "notificationPage/getNotificationInitiator",
          userID
        );
      }

      let author = userMap[userID];

      return author;
    }
  },

  methods: {
    dismissNotification() {
      console.log("dismissNotification() FIRED");

      // let { initiatorId } = this.notification;

      // this.$store.dispatch(
      //     "",
      //     initiatorId
      //   );
    },
    userLink(id) {
      this.$router.push({ name: "user", params: { id } });
    },
    notificationLink(id) {
      let { eventType: type_of_poll } = this.notification;
      let { author, userLink, dismissNotification } = this;

      dismissNotification();

      switch (type_of_poll) {
        case "SUBSCRIBE":
          userLink(author.id);
          break;

        case "UNSUBSCRIBE":
          userLink(author.id);
          break;

        case "CREATE_BLOCKCHAIN_PREDICTION":
          this.$router.push({ name: "poll", params: { id } });
          break;

        case "APPOINTMENT_OF_JUDGES":
          this.$router.push({ name: "poll", params: { id } });
          break;

        case "BLOCKCHAIN_PREDICTION_FINISHED":
          this.$router.push({ name: "poll", params: { id } });
          break;

        case "BLOCKCHAIN_PREDICTION_WINNER":
          this.$router.push({ name: "poll", params: { id } });
          break;

        default:
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.notification-block {
	background: #ffffff;
	margin-top: 6px;
	width: 464px;

  .notification-header {
    .avatar {
			background-color: gray;
    }
  }

  .notification-body {
		// <span class="username">{{ author.username }}</span>
    // <span class="notification-type">{{ notificationType }}</span>
		// <span class="message">{{ notification.message }}</span>
		.username {
			font-weight: bold;
		}
  }
}
</style>
