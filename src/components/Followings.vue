<template lang="html">
  <div id="followings">
    <div class="top-content">
      <el-button size="small"  type="text" round @click="goFollowers" >
        <lang-string :title="'followings'"/>
      </el-button>
      <el-button size="small" type="info" round >
        <lang-string :title="'followers'"/>
      </el-button>
    </div>
    <div class="search-panel">
      <el-input v-model="keywords" :placeholder="lstr('search_user')">
      </el-input>
    </div>
      <!-- <div class="main-content" v-for="(item, index) in links" :key="index"> -->
      <div class="main-content" v-if="phantom.length != 0" v-for="(item, index) in phantom">
        <div class="avatar-block" @click="userLink(item.id)" :style="{ 'background-image': 'url(' + publicPath +item.path_to_avatar + ')' }">
        </div>
        <div class="user-info">
          <div class="nickname-block">
            <span>{{item.username}}</span>
          </div>
        </div>
        <div class="add-block">
           <el-button size="small" @click="unFollow(item.id)" v-if="" >
             <lang-string :title="'unfollow'"/>
           </el-button>
        </div>
      </div>
    <div class="main-content" v-for="(item, index) in Followings" :key="index" v-if="phantom.length === 0">
      <div class="avatar-block" @click="userLink(item.id)" :style="{ 'background-image': 'url(' + publicPath + item.path_to_avatar + ')' }">
      </div>
        <el-button size="small" rounded @click="unFollow(item.id)" v-if="item.leader" >
          <lang-string :title="'subscriptions'"/>
        </el-button>
        <el-button size="small" class="follow" rounded @click="Follow(item.id)" v-if="!item.leader" >
          <lang-string :title="'follow'"/>
        </el-button>
      <div class="user-info">
        <div class="nickname-block">
          <span>{{item.username}}</span>
        </div>
        <div class="statistic-info">
        </div>
      </div>
      <div class="add-block">
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import langString from './langString.vue'
import {localString} from './../localString'
export default {
  data(){
    return {
    links: [],
    keywords:'',
    timeout:  null,
    phantom:[],
    publicPath: process.env.VUE_APP_MAIN_API

    }
  },
  created() {
    // this.phantom = Object.assign({}, this.Followings)
  },
  watch: {
    keywords(after, before) {
          this.fetch();
       }
  },

  computed: {
    ...mapState('user',{
      user : state => state.User[0],
      Followings: state => state.Followers
    }),
    ...mapState('lang',{
      lang : state => state.locale
    }),
    lstr(){
      return (str)=>localString(this.lang, str);
    },
  },
  methods: {
    fetch() {
        this.phantom = this.Followings.filter((follower) => {
        return follower.username.toLowerCase().includes(this.keywords.toLowerCase());
      })
    },
    unFollow(e) {
      this.$store.dispatch('user/trashUnFollow', e)
    },
    Follow(e) {
      this.$store.dispatch('user/trashFollow', e)
    },
    userLink(userId) {
      this.$router.push({name:'mypage',params:{id:userId}})
    },
    goFollowers() {
      this.$router.push({'path': '/followers'})
    },
  },
  components: {
    langString
  },
}
</script>

<style  lang="scss">
  #followings {

    .el-button {

      width: 116px;

      text-transform: uppercase;

      padding: 4px 11px 5px 10px;;

      span {


      }
    }

    .my-autocomplete {
        li {
          line-height: normal;
          padding: 7px;

          .value {
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .link {
            font-size: 12px;
            color: #b4b4b4;
          }
        }
      }
    .follow {
      background: #4B97B4 !important;
    }
    .top-content {
      .el-button--info {
        padding: 5px 14px;
        background: #E4E7E9;
        color: #152D3A;
        border-color: #E4E7E9;
      }
      .el-button--text {
        color: #828D92;
        padding: 5px 14px;
      }
    }
    .search-panel {
      margin-top: 10px;
      .el-autocomplete {
        width: 100%;

      }

      .el-input {
        .el-input__inner {
          border-radius: 6px;
          border-color: #D0D5D9;
          border-width: 0.5px;
          color: #828D92;
          height: 33px !important;
        }
      }
    }
    .main-content {
      background: #ffffff;
      padding: 12px;
      display: flex;
      position: relative;
      align-items: center;
      .el-button {
        position: absolute;
        right: 16px;
        padding: 5px 11px;
        border-radius: 20px;
        background: #B9C0C4;
        span {
          color: #ffffff;
        }
      }
    }

    .main-content:first-of-type {

      border-radius: 6px 6px 0px 0px !important;

    }


    .nickname-block {
      span {
        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        line-height: 18px;
        font-size: 14px;
        color: #152D3A;
      }
    }
    .statistic-info {
      span {
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        line-height: 16px;
        font-size: 12px;
        letter-spacing: -0.1px;
        color: #828D92;
        }
      }
    .avatar-block {
      border-radius: 1000px;
      background-size: 50% 50%;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      height: 42px;
      width: 42px;
      margin-right: 10px;
    }
  }
</style>
