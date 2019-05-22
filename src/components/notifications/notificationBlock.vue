<template>
  <div class="notification-block flex-column">
    <div class="notification-header flex-align-center mb-6">
      <div class="notification-new-user flex-align-center"  v-if="notification.eventType === 'NEW_USER'">
        <icon-base
                fill="none"
                class="icon logo"
                width="35"
                height="35"
                viewBox="0 0 40 30"
                icon-name="logo"><icon-logo />
        </icon-base>
        <span class="username">Opiniosn</span>
      </div>
      <div class="notification-new-user flex-align-center"  v-if="notification.eventType === 'APPOINTMENT_OF_JUDGES' || notification.eventType === 'BLOCKCHAIN_PREDICTION_FINISHED' || notification.eventType === 'BLOCKCHAIN_PREDICTION_WINNER'">
        <icon-base
                class="mr-10"
                width="24"
                height="24"
                viewBox="0 0 48 48"
                icon-name="etherium"><icon-etherium/>
        </icon-base>
      </div>
      <div
              v-if="notification.eventType === 'NEW_COMMENT' || notification.eventType === 'NEW_POLL' || notification.eventType === 'NEW_PREDICTION' || notification.eventType === 'SUBSCRIBE' || notification.eventType === 'UNSUBSCRIBE' || notification.eventType === 'EXPLAIN_CREATED' || notification.eventType === 'NEW_BLOCKCHAIN_PREDICTION'"
        class="avatar avatar-30x30 pointer"
        :style="{ 'background-image': 'url('+ publicPath + author.path_to_avatar + ')' } "
        @click="userLink"
      >
      </div>
      <span class="username pointer" v-if="notification.eventType === 'NEW_COMMENT' || notification.eventType === 'NEW_POLL' || notification.eventType === 'NEW_PREDICTION' || notification.eventType === 'SUBSCRIBE' || notification.eventType === 'UNSUBSCRIBE' || notification.eventType === 'EXPLAIN_CREATED' || notification.eventType === 'NEW_BLOCKCHAIN_PREDICTION'" >
        {{ author.username }}
      </span>
      <span class="username pointer" v-if="notification.eventType === 'APPOINTMENT_OF_JUDGES' || notification.eventType === 'BLOCKCHAIN_PREDICTION_FINISHED' || notification.eventType === 'BLOCKCHAIN_PREDICTION_WINNER'">
        Blockchain
      </span>
      <el-button
        class="close-btn"
        @click="dismissNotification"
        icon="el-icon-close"
        type="info"
        circle
        plain
      />
    </div>

    <div class="notification-body v-center pointer" >
      <div class="flex-align-center"  v-if="notification.eventType === 'BLOCKCHAIN_PREDICTION_FINISHED'">
        <span class="message" @click="pollLink(notification.targetId)">
          Блокчейн прогноз завершен
        </span>
      </div>
      <div class="flex-align-center"  v-if="notification.eventType === 'BLOCKCHAIN_PREDICTION_WINNER'">
          <span class="message" @click="pollLink(notification.targetId)">
            Вы победили в блокчейн прогнозе
          </span>
      </div>
      <div  class="flex-align-center"   v-if="notification.eventType === 'CREATE_BLOCKCHAIN_PREDICTION'">
        <span class="message" @click="pollLink(notification.targetId)"> Создал блокчейн прогноз</span>
      </div>
      <div class="flex-align-center"  v-if="notification.eventType === 'APPOINTMENT_OF_JUDGES'">
        <span class="message" @click="pollLink(notification.targetId)"> Вы назначены судьёй</span>
      </div>
      <div  class="flex-align-center" v-if="notification.eventType === 'SUBSCRIBE'">
        <span class="message" >
          Подписался на вас
        </span>
      </div>
      <div  class="flex-align-center"  v-if="notification.eventType ==='NEW_COMMENT'">
            <span class="message" @click="pollLink(notification.targetId)">
              Ответил под Вашим пояснением
            </span>
      </div>
      <div  class="flex-align-center" v-if="notification.eventType === 'UNSUBSCRIBE'">
        <span class="message" >
        Отписался от вас
        </span>
      </div>
      <div    class="flex-align-center"  v-if="notification.eventType === 'EXPLAIN_CREATED'">
        <span class="message" @click="pollLink(notification.targetId)">
          Пояснил в вашем опросе
        </span>
      </div>
      <div class="flex-align-center"  v-if="notification.eventType === 'NEW_PREDICTION'">
            <span class="message" @click="pollLink(notification.targetId)">
              Создал новый прогноз
            </span>
      </div>
      <div class="flex-align-center"   v-if="notification.eventType === 'NEW_POLL'">
        <span class="message" @click="pollLink(notification.targetId)">
          Создал новый опрос
        </span>
      </div>
          <div class="flex-align-center" v-if="notification.eventType === 'NEW_USER'">
            <span class="message" >
              Добро пожаловать в Opinion!
            </span>
          </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import IconBase from '../icons/IconBase'
import IconLogo from '../icons/IconLogo'
import IconEtherium from '../icons/IconEtherium'

export default {
  name: "notificationBlock",
  props: ["notification"],
  components: {
  IconBase,
  IconLogo,
  IconEtherium
  },
  data: function() {
    return {

      publicPath: process.env.VUE_APP_MAIN_API

    };
  },
  computed: {
    ...mapState("globalStore", {
      userMap: ({ users }) => users,
      pollMap: ({ polls }) => polls

    }),


    author: function() {
      let { notification, userMap } = this;

      let userID = notification.initiatorId;

      let author = userMap[userID] || {};

      return author;
    },

    pollName: function() {
      let { targetId } = this.notification;
      let poll =  this.pollMap[targetId] || {};
      let poll_name = poll.subject || {};
      if(poll_name.length < 30) {
        return `«${poll_name}»`
      } else {
        return `«${poll_name.slice(0, 30)}...»`

      }

    }
  },

  methods: {

    dismissNotification() {
      this.$store.commit('notificationPage/closeNotification', this.$vnode.key)
    },
    userLink() {
      this.$router.push({name: "user", params: {id: this.author.id}});
    },

    pollLink(targetId) {
      this.$router.push({name: 'singlePoll', params: {id: targetId}})
    }


  }
}
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
    overflow: hidden;
    span {

      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      line-height: 20px;
      font-size: 15px;
      color: #152D3A;

    }
  }
}
</style>
