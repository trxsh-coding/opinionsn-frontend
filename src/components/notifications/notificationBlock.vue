<template>
  <div class="notification-block flex-column" v-if="!isHidden">
    <div class="notification-header flex-align-center mb-6">
      <div
        class="avatar avatar-30x30 pointer"
        :style="{ 'background-image': 'url(' + author.path_to_avatar + ')' } "
        @click="userLink(author.id)"
      />
      <span class="username">{{ author.username }}</span>
      <el-button
        class="close-btn"
        @click="isHidden = !isHidden"
        icon="el-icon-close"
        type="info"
        circle
        plain
      />
    </div>

    <div class="notification-body v-center pointer" @click="notificationLink()">
			{{ notification.message }}
		</div>

  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import { log } from "util";
// import func from '../../../vue-temp/vue-editor-bridge';
export default {
  name: "notificationBlock",
  props: ["notification"],
  data: function() {
    return {
      isHidden: false
    };
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
			alert("dismissNotification() FIRED");
			
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
					this.$router.push({ name: "poll", params: { id } })
					break;
			
				case "APPOINTMENT_OF_JUDGES":
					this.$router.push({ name: "poll", params: { id } })
					break;
			
				case "BLOCKCHAIN_PREDICTION_FINISHED":
					this.$router.push({ name: "poll", params: { id } })
					break;
			
				case "BLOCKCHAIN_PREDICTION_WINNER":
					this.$router.push({ name: "poll", params: { id } })
					break;
			
				default:
					break;
			};

		}
  }
};
</script>

<style lang="scss">
.notification-block {
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(21, 45, 58, 0.3);
  border-radius: 12px;
  padding: 10px;
  width: 200px;
  min-height: 100px;
  height: 100px;
  z-index: 10000;
  margin-bottom: 10px;
  overflow: hidden;

  .notification-header {
    .avatar {
      background-color: gray;
    }

    .close-btn {
      margin-left: auto;
      transform: scale(0.8);
    }
  }

  .notification-body {
    flex: 0 0 54px;
    overflow: hidden;
  }
}
</style>
