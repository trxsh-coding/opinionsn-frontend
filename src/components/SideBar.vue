<template lang="html">
  <aside class="aside-menu">
    <ul>
      <li  class="hidden-xs-only main-li pointer"  @click="resetFilter('pollFeed')">
        <icon-base
             class="hidden-xs-only"
             :class="{primary : $route.path==='/pollFeed'} "
             width="20"
             height="20"
             viewBox="0 0 20 20"
             icon-name="main"><icon-main/>
       </icon-base>
          <a :class="{primary : $route.path==='/pollFeed'}"><lang-string :title="'feed'"/></a>
        </li>

      <li  class="hidden-xs-only pointer" @click="resetFilter('voteFeed')" >

           <icon-base

               :class="{primary : $route.path==='/voteFeed'} "
                class="opinion "
                fill="none"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                icon-name="opinion"><icon-opinion/>
          </icon-base>
        <a :class="{primary : $route.path==='/voteFeed'}"><lang-string :title="'opinions_feed'"/></a>
      </li>
        <router-link class-active="active" class="hidden-xs-only main-li pointer" tag="li" to="/notifications" >
            <icon-base
                    :class="{secondary_path_only : $route.name==='notifications'} "
                    fill="none"
                    width="16"
                    height="21"
                    viewBox="0 0 17 21"
                    icon-name="bell"><icon-bell/>
            </icon-base>
            <a><lang-string :title="'notifications'"/></a>
        </router-link>

      <router-link class-active="active" class="hidden-xs-only main-li pointer" tag="li" to="/bookmarkFeed">
            <icon-base
                    class="bookmark"
                    :class="{secondary : $route.path==='/bookmarkFeed'} "
                    width="15"
                    height="17"
                    viewBox="0 0 15 19"
                    icon-name="bookmark"><icon-bookmark/>
            </icon-base>
            <a><lang-string :title="'bookmarked'"/></a>
      </router-link>
    </ul>
  </aside>
</template>

<script>
import IconBase from './icons/IconBase.vue'
import IconSettings from './icons/IconSettings.vue'
import IconMain from './icons/IconMain.vue'
import IconOpinion from './icons/IconOpinion.vue'
import IconBookmark from './icons/IconBookmarkMenu.vue'
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

    methods: {

        resetFilter(name){
            this.$router.push({path:`/${name}`})
            this.$store.commit(`${name}/clearFilter`)
            this.$store.dispatch(`${name}/list`);

        }

    },

    mounted() {


    }
}
</script>

<style lang="scss">
  .aside-menu {

    background-color: #ffffff;
    padding: 0 9px;
    border-radius: 12px;
    g {
      fill:#ffffff;
    }
    svg {
        top: 5px;
        position: absolute;
        left: 3px;

    }

    .main-li {

       padding: 13.5px 0;
       svg {
           position: absolute;
           top: 10px !important;

       }

    }
    .primary {

            color: #4B97B4;

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

    .secondary_path_only {
        path {

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

            stroke: #4B97B4 !important;
            fill: none;
        }

    }
    .bookmark {
        top: 12px;
        left: 4px;
        path {

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
          padding: 10.5px 0;
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
      font-size: 14px;
      line-height: 12px;
      margin-left: 33px;
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
