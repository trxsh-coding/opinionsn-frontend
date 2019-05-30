<template lang="html">
  <div id="navbar-profile-menu">

      <router-link to="/add" v-if="mainUser.authorities === 'ADMIN'">
        <icon-base
          class="main-icon"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          icon-name="plus"><icon-plus />
        </icon-base>
      </router-link>
    <notification-feed class="main-icon notification_feed" />
    <div class="flex-align-center mr-10 ">

      <el-popover
			placement="top-start"
			title="Balance:"
			width="50"
			trigger="hover"
			:content="user.balance">
          <icon-base
                  slot="reference"
                  class="main-icon pointer"
                  width="22"
                  height="36"
                  viewBox="0 0 22 8"
                  icon-name="pocket"><icon-pocket />
          </icon-base>
      </el-popover>

    </div>

        <!--<div class="pocket-money">-->
          <!--<icon-base-->
            <!--fill="#162D3A"-->
            <!--width="8"-->
            <!--height="10"-->
            <!--viewBox="0 0 8 10"-->
            <!--icon-name="union"><icon-union />-->
          <!--</icon-base>-->
          <!--<span v-if="user.balance == 0" >0 000 000</span>-->
          <!--<span v-if="user.balance > 0">{{user.balance}}</span>-->
          <!--<icon-base-->
            <!--class="icon-eye"-->
            <!--fill="#162D3A"-->
            <!--width="14"-->
            <!--height="10"-->
            <!--viewBox="0 0 14 8"-->
            <!--icon-name="eye"><icon-eye />-->
          <!--</icon-base>-->
        <!--</div>-->

      <div class="profileAvatar pointer" @click="userLink(user.id)" :style="{ 'background-image': 'url('+ publicPath +user.path_to_avatar + ')' }"> </div>
     <el-dropdown trigger="click">
       <span class="el-dropdown-link pointer">
         <icon-base
                 class="dropdown-icon"
                 fill="none"
                 width="8"
                 height="6"
                 viewBox="0 0 8 6"
                 icon-dropdown="icon-dropdown"><icon-dropdown />
          </icon-base>
       </span>
       <el-dropdown-menu slot="dropdown" :hide-timeout="1000">
         <el-dropdown-item class="clearfix">
           <a >
             <div class="link" @click="followersLink(user.id)" >
               <lang-string class="link-span" :title="'followings'"/>
             </div>
           </a>
         </el-dropdown-item>
         <el-dropdown-item class="clearfix">
           <a>

             <div class="link" @click="catalogLink">
               <lang-string class="link-span" :title="'topics'"/>
             </div>

           </a>
         </el-dropdown-item>
         <el-dropdown-item class="link">
              <div  @click="userLogout">
                <lang-string class="link-span" :title="'exit'"/>
              </div>
         </el-dropdown-item>
       </el-dropdown-menu>
     </el-dropdown>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { mapState } from 'vuex';
import axios from 'axios';
import IconBase from './icons/IconBase.vue'
import IconPlus from './icons/IconPlus.vue'
import IconBell from './icons/IconBell.vue'
import IconPocket from './icons/IconPocket.vue'
import IconUnion from './icons/IconUnion.vue'
import IconEye from './icons/IconEye.vue'
import IconTextLogo from './icons/IconTextLogo.vue'
import langString from './langString.vue'
import IconDropdown from './icons/IconDropdown.vue'
import notificationFeed from './notifications/feed'
export default {
  props:['user'],
  data(){
    return {

        publicPath: process.env.VUE_APP_MAIN_API

    }
  },
  computed: {

    ...mapState('userPage',{
      main_user_id : state => state.main_user_id
    }),
      ...mapState('globalStore', {

          mainUser: ({mainUser}) => mainUser

      }),

      ...mapState('notificationPage',{
      counter : state => state.counter
    }),
  },
  methods: {
    userLogout() {

      axios.get(`${process.env.VUE_APP_MAIN_API}/auth/logout`)
              .then(function(response){
                this.$store.commit("authentication/setAuthenticated", false)
                this.$store.commit("userPage/removeUser");
                this.$store.commit("pollFeed/clearFeed");
                this.$store.commit("globalStore/clearStores");
                this.$store.commit("notificationStore/clearStores");
                this.$store.commit("notificationPage/setDefaultPage");

                  //TODO доделать логаут
              })

          .catch((error) => {
              this.$store.commit("authentication/setAuthenticated", false)
              this.$store.commit("userPage/removeUser");
              this.$store.commit("pollFeed/clearFeed");
              this.$store.commit("globalStore/clearStores");
              this.$store.commit("notificationStore/clearStores");
              this.$store.commit("notificationPage/setDefaultPage");
          });
      this.$router.push('/login');

    },

    userLink(userId) {
      this.$router.push({name:'user',params:{id:userId}})
    },

    followersLink(userId){

      this.$router.push({name:'follows',params:{id:userId}})

    },

    catalogLink(){

      this.$router.push({name:'catalogList'})


    }

  },
  components: {

    IconUnion,
    IconBase,
    IconPlus,
    IconBell,
    IconPocket,
    IconEye,
    IconTextLogo,
    langString,
    IconDropdown,
    notificationFeed

  }
}

</script>

<style lang="scss">

  .notification-dropdown {

    width: 488px;

  }

 #navbar-profile-menu {
   display: flex;
   justify-content: flex-end;
   align-items: center;



  .link-span {

    color: #152D3A !important;

  }

    .notification_feed {

      margin-right: 21px;
      margin-bottom: 6px;

    }

   .icon-eye {

     margin-left: 10px;

   }
   .pocket-money {
     display: flex;
     align-items: center;
     background: #FFFFFF;
     font-family: Roboto;
     font-style: normal;
     font-weight: 300;
     line-height: 11px;
     font-size: 11px;
     letter-spacing: -0.2px;
     color: #383838;
     border: 0.5px solid #D0D5D9;
     border-radius: 30px;
     margin-right: 12px;
     padding-left: 10px;
     height: 18px;
     width: 91px;
     span {
       padding-left: 5px;
     }
     svg {
       margin-bottom: 0px;
     }

     .icon-eye {
       margin-left: auto;
       margin-right: 9px;
     }
   }

   .exit-button {
     border: none;
     span {
       color:#000000;
     }
   }

   .dropdown-icon {

     g {
       fill:none;
     }

   }

   #navbar-profile-menu {
     display: flex;
     justify-content: center;
     align-items: center;
     margin-left: 140px;

     .profile-menu {
       display: flex;
       align-items: center;
     }
     .el-button:hover {
       background-color: #ffffff !important;
     }
     .plus {
       margin-right: 22px;
     }
     a {
       text-decoration: none;
     }
   }

   .el-dropdown-menu {

     color: #000 !important;

   }
   .add-quiz {
     font-family: Roboto;
     font-style: normal;
     font-weight: normal;
     line-height: 18px;
     font-size: 13px;
     font-variant: small-caps;
     color: #152D3A;
     padding-right: 21px;
     text-transform: uppercase;
   }
   .profileAvatar {
     width: 30px;
     height: 30px;
     border-radius: 1000px;
     vertical-align: middle;
     display: inline-flex;
     background-repeat: no-repeat;
     background-size: cover;
     margin-left: 5px;
     margin-right: 5px;
     background-position: top;
   }
   li, a {

     list-style: none;
     margin-right: 22px;
     margin-bottom: 5px;

   }
   li:last-of-type {

     margin-right: 12px !important;

   }
   .el-badge{
     display: inline-flex;
     .is-fixed {

       top: 5px;
       right: 7px;

     }
     .el-badge__content {
       background-color: #FF5454;
       border-radius: 10px;
       display: inline-block;
       font-size: 8px;
       height: 13px;
       line-height: 15px;
       padding: 0px 4px;
       text-align: center;
       white-space: nowrap;
       border: 1px solid #fff;

     }
     img {
       width: 15px;
       height: 15px;
       margin-left: 12px;
     }
   }
   .el-icon--right {
     margin: 0;
   }

 }
</style>
