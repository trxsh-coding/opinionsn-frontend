<template lang="html">
  <aside class="aside-menu">
    <ul>
      <router-link class-active="active" class="hidden-xs-only" tag="li" to="/pollFeed">
        <icon-base
             class="hidden-xs-only"
             :class="{primary : $route.path==='/pollFeed'} "
             width="20"
             height="20"
             viewBox="0 0 20 20"
             icon-name="main"><icon-main/>
       </icon-base>
          <a><lang-string :title="'feed'"/></a>
        </router-link>

      <router-link class-active="active" class="hidden-xs-only" tag="li" to="/voteFeed">
           <icon-base

               :class="{primary : $route.path==='/voteFeed'} "
                class="opinion "
                fill="none"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                icon-name="opinion"><icon-opinion/>
          </icon-base>
        <a><lang-string :title="'opinions_feed'"/></a>
      </router-link>
      <router-link class-active="active" class="hidden-xs-only" tag="li" to="/bookmarkFeed">
            <icon-base
                    :class="{secondary : $route.path==='/bookmarkFeed'} "
                    class="bookmark"
                    fill="#152D3A"
                    width="18"
                    height="24"
                    viewBox="0 0 18 24"
                    icon-name="bookmark"><icon-bookmark/>
            </icon-base>
            <a><lang-string :title="'bookmarked'"/></a>
      </router-link>
        <li class="hidden-xs-only">
            <icon-base
                    fill="none"
                    width="16"
                    height="21"
                    viewBox="0 0 17 21"
                    icon-name="bell"><icon-bell/>
            </icon-base>
            <a><lang-string :title="'notifications'"/></a>
        </li>
        <router-link class-active="active" class="hidden-sm-and-up mobile" tag="li" to="/add">
            <icon-base
                    :class="{secondary : $route.path==='/add'} "
                    class="add-poll"
                    fill="#152D3A"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    icon-name="add-poll"><icon-add-poll/>
            </icon-base>
            <a><lang-string :title="'add_poll'"/></a>
        </router-link>
        <router-link class-active="active" class="hidden-sm-and-up" tag="li" to="/bookmarkFeed">
            <icon-base
                    :class="{secondary : $route.path==='/bookmarkFeed'} "
                    class="bookmark"
                    fill="#152D3A"
                    width="24"
                    height="24"
                    viewBox="0 0 14 20"
                    icon-name="bookmark"><icon-bookmark/>
            </icon-base>
            <a><lang-string :title="'bookmarked'"/></a>
        </router-link>
      <li class="hidden-sm-and-up">
          <el-badge :value="0"  class="item">
              <icon-base
                      fill="none"
                      width="24"
                      height="22"
                      viewBox="0 0 24 20"
                      icon-name="pocket"><icon-pocket/>
              </icon-base>
          </el-badge>
          <a><lang-string :title="'pocket'"/></a>
      </li>
      <li class="hidden-sm-and-up">
        <icon-base
          fill="none"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          icon-name="settings"><icon-settings/>
        </icon-base>
        <a><lang-string :title="'settings'"/></a>
      </li>
        <li class="hidden-sm-and-up">
            <icon-base
                    fill="none"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    icon-name="settings"><icon-exit/>
            </icon-base>
            <a><lang-string :title="'exit'"/></a>
        </li>
    </ul>
  </aside>
</template>

<script>
import IconBase from './icons/IconBase.vue'
import IconSettings from './icons/IconSettings.vue'
import IconMain from './icons/IconMain.vue'
import IconOpinion from './icons/IconOpinion.vue'
import IconBookmark from './icons/IconBookmark.vue'
import IconExit from './icons/IconExit.vue'
import IconAddPoll from './icons/IconAddPoll.vue'
import langString from './langString.vue'
import IconBell from './icons/IconBell.vue'
import IconPocket from './icons/IconPocket.vue'

export default {
  data(){
    return {

    }
  },
  components: {
    IconBase,
    IconSettings,
    IconMain,
    IconOpinion,
    IconBookmark,
    langString,
    IconExit,
    IconAddPoll,
    IconBell,
    IconPocket

  },

    mounted() {


    }
}
</script>

<style lang="scss">
  .aside-menu {

    background-color: #ffffff;
    padding-left: 15px;
    padding-right: 16px;
    border-radius: 12px;
    g {
      fill:#ffffff;
    }
    svg {

    }

    .primary {



            rect {

                stroke: #4B97B4;

            }

            path {

                stroke: #4B97B4;


            }

            .question {

                stroke: none;
                fill: #4B97B4;

            }
    }
    .is-fixed {

        top:4px !important;
        right: 9px !important;
    }

    .el-badge__content {

        border-radius: 30px;
        color: #FFF;
        display: inline-block;
        font-size: 8px;
        height: 11px;
        line-height: 10px;
        padding: 0px 3px;
        text-align: center;
        white-space: nowrap;
        border: 1px solid #FFF;

    }


    .secondary {

        path {

            fill: #4B97B4 !important;

        }

    }
    .bookmark {

        path {

            fill:#152D3A;

        }

    }
    .router-link-exact-active {
      a {
        color:#4B97B4;
      }
    }
    ul {
      padding-left: 0;
      margin-top: 0px;
      li {
        border-bottom-width: 0.5px;
        border-bottom-color: #DADADA;
        border-bottom-style: solid;
        padding-bottom: 9px;
        padding-top: 6px;
        position: relative;
        list-style: none;
        display: flex;
        align-items: center;
      }
    }


    li:last-of-type {
      border-bottom: none;
    }

    a {
      color: #383838;
      font-size: 12px;
      line-height: 12px;
      margin-left: 10px;
      text-decoration: none;
      padding-top: 3px;
    }
    figure {
      display: inline-block !important;
      width: 21px;
      height: 21px;
      vertical-align:middle;
    }

    .hidden-sm-and-up {

        padding: 10px 0 11px 0;


    }

    .mobile {


    }

  }
</style>
