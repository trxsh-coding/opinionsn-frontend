<template>
  <span class="notification-feed-block flex-wrap">
    <div class="notification-header">
      <div
        class="avatar avatar-30x30 pointer"
        :style="{ 'background-image': 'url(' + author.path_to_avatar + ')' } "
        @click="userLink"
      />
    </div>
    <div class="notification-body font-13">
      <span class="username pointer" @click="userLink"> {{ author.username }} </span>
      <span class="message"> {{ notification.message }} </span>
       <span class="poll pointer" @click="pollLink(notification.targetId)" v-if="notification.targetId != 0"> {{ pollName }} </span>
      <time-trans class="timestamp" :time="notification.date"/>
    </div>
    <hr/>
  </span>
</template>

<script>
import { mapState } from "vuex";
import { log } from "util";
import timeTrans from "../timeTrans";
export default {
  name: "feedBlock",
  props: ["notification"],
  components: {
    timeTrans
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
    pollName: function() {
      let { targetId } = this.notification;
      let poll_name = this.pollMap[targetId].subject;
      console.log(poll_name)
      return poll_name;
    }
  },

  methods: {
    dismissNotification() {
    },
    userLink() {
      this.$router.push({ name: "user", params: { id: this.author.id } });
    },
      pollLink(targetId) {
        this.$router.push({name: 'singlePoll', params: {id: targetId}})

    }
  },
  mounted() {
    let userID = this.notification.initiatorId;

    if (this.userMap[userID] === undefined) {
      this.$store.dispatch("userPage/getNotificationInitiator", userID);
    }

    let pollID = this.notification.targetId;

      if (!this.pollMap[pollID] && this.notification.targetId != 0) {
        this.$store.dispatch("singlePoll/getNotificationPoll", pollID);
      }

  }


};
</script>

<style lang="scss">
.notification-dropdown {

  .notification-feed-block:last-of-type {

    hr {
			display: none;
		}

	}

}

.notification-feed-block {
  background: #ffffff;
  width: 100%;
  flex: 0;

  .notification-header {
    .avatar {
      background-color: gray;
    }
  }

  .notification-body {
    flex: 0 0 427px;
    margin: auto 0;

    font-family: Roboto;
    font-style: normal;
    line-height: 16px;
    font-size: 13px;

    .username,
    .poll {
      font-weight: 700;
      color: #152d3a;
    }

    .timestamp {
      display: inline-block;

      font-family: Roboto;
      font-weight: 300;
      letter-spacing: -0.2px;

      color: #152d3a;

      opacity: 0.6;
    }
  }

  hr {
    margin: 6px 0;
    border: 0.5px solid #d0d5d9;
    flex: 0 0 100%;
  }
}
</style>
