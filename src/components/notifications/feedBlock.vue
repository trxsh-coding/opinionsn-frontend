<template>
  <div class="notification-block flex-wrap flex-align-center">
    <div class="notification-header">
      <div
        class="avatar avatar-30x30 pointer"
        :style="{ 'background-image': 'url(' + author.path_to_avatar + ')' } "
        @click="userLink"
      />
    </div>
    <div class="notification-body font-13 flex-wrap flex-align-center">
      <span class="username pointer" @click="userLink">{{ author.username }}</span>
      <span class="message">{{ notification.message }}</span>
      <!-- <span class="poll" @click="notificationLink" v-if="pollName">{{ pollName }}</span> -->
			<span class="timestamp"><time-trans :time="notification.date"/></span>
    </div>
		<hr/>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { log } from "util";
import timeTrans from "../timeTrans"
export default {
  name: "feedBlock",
	props: ["notification"],
	components: {
		timeTrans,
	},
  computed: {
    ...mapState("globalStore", {
			userMap: ({ users }) => users,
			pollMap: ({ polls }) => polls
    }),

    author: function() {
      let { notification, userMap } = this;

      let userID = notification.initiatorId;

      let author = userMap[userID];

      return author;
		},
		pollName() {
			let { targetId: ID } = this.notification;
			let poll_name = this.pollMap[ID].subject;

			return poll_name;
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
    userLink() {
      this.$router.push({ name: "user", params: { id: author.id } });
    },
    notificationLink() {
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
  },
  mounted(){

    let userID = this.notification.initiatorId;

    if (this.userMap[userID] === undefined) {

      this.$store.dispatch(
              "userPage/getNotificationInitiator",
              userID
      );

    }

  }
};
</script>

<style lang="scss" scoped>
.notification-block {
	background: #ffffff;
	width: 100%;

  .notification-header {
    .avatar {
			background-color: gray;
    }
  }

  .notification-body {

		.username,
		.poll {
			font-weight: bold;
		}

		.timestamp {
			color: #152D3A;
		}

	}

	hr {
		margin: 6px 0;
		flex: 0 0 100%
	}
}
</style>
