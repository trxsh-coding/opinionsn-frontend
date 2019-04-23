<template>
  <div class="notification-feed-block  flex-between">
    <div class="notification-header flex-space-center">
      <div
        v-if="notification.initiatorId != mainUser.id"
        class="avatar avatar-30x30 pointer"
        :style="{ 'background-image': 'url(' + author.path_to_avatar + ')' } "
        @click="userLink">
      </div>
      <icon-base
              class="mr-10"
              v-if="notification.initiatorId == mainUser.id"
              fill="#152D3A"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              icon-name="judge"><icon-judge/>
      </icon-base>
      <span class="username pointer" @click="userLink"  v-if="notification.initiatorId != mainUser.id"> {{ author.username }} </span>
      <div class="notification-body font-13">
        <span class="message"> {{ notification.message }} </span>
        <span class="poll pointer" @click="pollLink(notification.targetId)" v-if="notification.targetId != 0"> {{ pollName }} </span>
      </div>
    </div>

    <div class="event-time">
      <time-trans class="timestamp" :time="notification.date"/>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MugenScroll from 'vue-mugen-scroll'
import { log } from "util";
import timeTrans from "../timeTrans";
import IconJudge from "../icons/IconJudge"
import IconBase from "../icons/IconBase"
import axios from 'axios'
export default {
  name: "feedBlock",
  props: ["notification"],
  components: {
    timeTrans,
    IconJudge,
    IconBase,
    MugenScroll
  },
  computed: {
    ...mapState("globalStore", {
      userMap: ({ users }) => users,
      pollMap: ({ polls }) => polls
    }),


    ...mapState('globalStore', {

      mainUser: ({mainUser}) => mainUser

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

    if (!this.userMap[userID]) {

      axios.get(`/api/rest/getUserById/${userID}`)
              .then(response => {
                if (response.status === 200) {
                  this.$store.commit('globalStore/updateStores', response.data)
                }
              })
    }

    let pollID = this.notification.targetId;

      if (!this.pollMap[pollID] && this.notification.targetId != 0) {
        axios.get(`/api/rest/quiz/getOne/${pollID}`)
                .then(response => {
                  if (response.status === 200) {
                    this.$store.commit('globalStore/updateStores', response.data)
                  }

                })
      }

  }


};
</script>

<style lang="scss">
.notification-dropdown {



}
.notification-feed-block:last-of-type {

  border-bottom: none;

}
.notification-feed-block {
  background: #ffffff;
  width: 100%;
  flex: 0;
  align-items: center;
  padding: 6px 0;
  border-bottom-style: solid;
  border-bottom-width: 0.5px;
  border-bottom-color: #D0D5D9 ;
  .timestamp {
    display: inline-block;
    font-family: Roboto;
    font-weight: 300;
    letter-spacing: -0.2px;
    font-style: normal;
    line-height: 16px;
    font-size: 13px;
    color: #152d3a;

    opacity: 0.6;
  }
  .notification-header {

    svg {
      flex-shrink: 0;
      padding: 5px;
      background: #dbdbdb;
      border-radius: 50px;

    }

    .avatar {
      flex-shrink: 0;
      background-color: gray;
    }
  }

  .username,
  .poll {
    font-weight: 700;
    color: #152d3a;
    padding-right: 6px;
  }

  .notification-body {
    margin: auto 0;
    .message {

      font-family: Roboto;
      font-style: normal;
      font-weight: 300;
      font-size: 13px;
      color: #152D3A;
      padding-right: 6px;

    }
  }

  hr {
    margin: 6px 0;
    border: 0.5px solid #d0d5d9;
    flex: 0 0 100%;
  }
}
</style>
