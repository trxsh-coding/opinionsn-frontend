<template lang="html">
<div id="profile-card" class="mb-10">
        <div class="profile-background " :style="{ 'background-image': 'url(' + user.background_image + ')' }" > </div>
      <div  class="profile-content">
        <div class="profile-avatar pointer" :style="{ 'background-image': 'url(' + user.path_to_avatar + ')' }  " @click="userLink(user.id)"> </div>
        <div class="main-content">
          <span class="nickname-id">
            {{user.username}}
          </span>
        </div>
        <div class="description-block">
          <span class="description" >
            {{user.about_me}}
          </span>
        </div>
        <div class="bottom-content">
          <icon-base
          fill="none"
          width="9"
          height="13"
          viewBox="0 0 9 13"
          icon-name="location">
          <icon-location /></icon-base>
          <span class="location">{{user.location}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import IconBase from './icons/IconBase.vue'
import IconLocation from './icons/IconLocation.vue'

import { mapState } from 'vuex';
import { mapActions } from 'vuex';
export default {
  data () {
    return {

    }
  },
  methods: {
    pageReload(file, fileList){
      this.$store.dispatch('user/getCurrentUser')
      this.$refs.upload.clearFiles();
    },

      userLink(userId){

          this.$router.push({name:'user',params:{id:userId}})

      },
  },
  computed: {
    ...mapState('userPage', {
      state: s => s,
      items: s => s.items,
    }),

    ...mapState('globalStore', {

      userMap: ({users}) => users

    }),
    //Main user getter

    user:function () {

      let {state,userMap} = this;

      console.log(state)

      return userMap[state.main_user_id]

    }
  },
  components: {
        IconBase,
        IconLocation
  },
}
</script>

<style lang="scss">
#profile-card {
  min-width: 240px;
  min-height: 115px;
  .el-upload {
    display: block;
  }
  .description-block {
    text-align: center;
    .description {
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      line-height: 15px;
      font-size: 12px;
      text-align: center;
      letter-spacing: -0.1px;
      color: #152D3A;
    }
  }
  .profile-background {
    width: 100%;
    height: 60px;
    background-repeat: no-repeat;
    background-size: cover !important;
    background-position: center;
    background-size: 50% 50%;
    border-radius: 12px 12px 0 0;
  }
  .profile-content {
    margin: 0px !important;
    display: flex;
    position: relative;
    width: 100%;
    height: 21px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #ffffff;
    margin-right: 0px;
    border-radius: 0 0 12px 12px;
    height: 60px;
    .profile-avatar {
      position: absolute;
      top: -25px;
      left: 44%;
      width: 42px;
      height: 42px;
      border-radius: 1000px;
      background-size: 50% 50%;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }

    .main-content {

        margin-top: 16px;

    }

    .nickname-header {
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      line-height: 15px;
      font-size: 14px;
      letter-spacing: -0.3px;
      color: #383838;
    }
    .nickname-id {
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      line-height: 18px;
      font-size: 15px;
      text-align: center;
      letter-spacing: -0.1px;
      color: #152B3A;
    }
    .bottom-content {
      .location {
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        line-height: 11px;
        font-size: 11px;
        letter-spacing: -0.3px;
        color: rgba(56, 56, 56, 0.7);
      }
      img {
        width: 8px;
        height: 11px;
        margin-right: 5px;
      }
    }
  }
}
</style>
