<template>
    <div class='author-header'>
      <div class="avatar">

        <div class="avatar-42x42 pointer" :style="{ 'background-image': 'url(' + author.path_to_avatar+ ')' } " @click="userLink(author.id)"></div>

      </div>
      <div class="icon-more">
        <icon-base
        fill="none"
        width="14"
        height="4"
        viewBox="0 0 14 4"
        icon-name="more">
        <icon-more /></icon-base>
      </div>
      <div class="information-block">
        <div class="user-block">
          <span class="username">{{author.username}}</span>
          <span class="subject">{{header}} </span>
          <div class="location-block">
            <span> <slot name="author_loc">{{author.location}}</slot></span>

          </div>
        </div>

        <div class="time-block">
          <span class="time"><time-trans :time="item.timestamp"/></span>
        </div>
      </div>

    </div>
</template>

<script>
import { mapState } from 'vuex';
import timeTrans from '../../timeTrans'
import IconBase from '../../icons/IconBase.vue'
import IconLocation from './../../icons/IconLocation.vue'
import IconMore from './../../icons/IconMore.vue'
import langString from './../../langString.vue'
import {localString, ezLocalString} from './../../../utils/localString'
import moment from 'moment'
    const eventTypes = {

        'POLL_CREATED': {
            userMessage: "created_a_poll",
            noPostfix: true,
        },

        'VOTED_AND_EXPLAINED': {
            userMessage: 'voted_and_commented',
        },
        'VOTED': {
            userMessage: 'voted',
        },
        'EXPLAINED': {
            userMessage: 'explained',
        },
    };

    export default {
        name: "AuthorHeader",
        computed:{
          ...mapState('lang',{
            lang : state => state.locale
          }),
            header: function(){
                let {type} = this;
                return localString(this.lang, eventTypes[type].userMessage);
            },
            lstr(){
              return (str)=>ezLocalString(str);
            },

            showPostfix: function(){
                let {type} = this;
                return !eventTypes[type].noPostfix;
            }

        },
        methods: {

          moment: function () {

            return moment();

          },
          userLink(userId) {
            this.$router.push({name:'user',params:{id:userId}})
          },
        },
        components: {
              IconBase,
              IconLocation,
              IconMore,
              langString,
              timeTrans
        },
        props: ['author', 'type', 'poll', 'item']
    }

</script>

<style lang="scss">
  .author-header {
      display: flex;
      position: relative;
     align-items: flex-start;
      .time {
        padding-left: 5px;
        font-family: Roboto;
        font-style: normal;
        font-weight: 300;
        line-height: 12px;
        font-size: 13px;
        text-align: right;
        letter-spacing: -0.2px;
        color: #828D92;
      }
      .icon-more {
        position: absolute;
        right: 4px;
        top: -10px;
      }
      .author-avatar {
        width: 42px;
        height: 42px;
        border-radius: 1000px;
        background-size: 50% 50%;
        background-repeat: no-repeat;
        background-size: cover;
      }
      .information-block {
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: flex-end;
        .location-block {
          font-family: Roboto;
          font-style: normal;
          font-weight: 300;
          line-height: 11px;
          font-size: 13px;
          letter-spacing: -0.2px;
          color: #828D92;
          margin-top: 6px;
        }
        .username {
          font-family: Roboto;
          font-style: normal;
          font-weight: 500;
          line-height: 18px;
          font-size: 14px;
          color: #152D3A;
        }
        .time-block {
          display: flex;
          margin-top: 6px;

        }
        .subject {
          font-family: Roboto;
          font-style: normal;
          font-weight: normal;
          line-height: 11px;
          font-size: 13px;
          letter-spacing: -0.2px;
          color: #828D92;
          padding-left: 6px;
          b {
            font-family: Roboto;
            font-style: normal;
            font-weight: 500;
            line-height: 11px;
            font-size: 13px;
            letter-spacing: -0.2px;
            color: #152D3A;
          }
        }
      }
  }
</style>
