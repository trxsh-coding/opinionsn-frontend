<template lang="html">
  <aside class="aside-menu">
    <ul>
      <router-link class-active="active" tag="li" to="/pollFeed">
        <icon-base
             :class="{primary : $route.path==='/pollFeed'} "
             width="20"
             height="20"
             viewBox="0 0 20 20"
             icon-name="main"><icon-main/>
       </icon-base>
          <a><lang-string :title="'feed'"/></a>
        </router-link>

      <router-link class-active="active" tag="li" to="/voteFeed">
           <icon-base
               :class="{primary : $route.path==='/voteFeed'} "
                class="opinion"
                fill="none"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                icon-name="opinion"><icon-opinion/>
          </icon-base>
        <a><lang-string :title="'opinions_feed'"/></a>
      </router-link>
      <router-link class-active="active" tag="li" to="/bookmarkFeed">
              <icon-base
              :class="{secondary : $route.path==='/bookmarkFeed'} "
              class="bookmark"
              fill="#152D3A"
              width="16"
              height="18"
              viewBox="0 0 14 19"
              icon-name="bookmark"><icon-bookmark/>
            </icon-base>
          <a><lang-string :title="'bookmarked'"/></a>
      </router-link>
      <li>
        <icon-base
          fill="none"
          width="18"
          height="19"
          viewBox="0 0 18 19"
          icon-name="settings"><icon-settings/>
        </icon-base>
        <a><lang-string :title="'settings'"/></a>
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
import langString from './langString.vue'

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
    langString

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
    img {
      margin-left: 5px;
      position: absolute;
      top: 12px;

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

    span {
      line-height: 18px;
      position: absolute;
      top:9px;
      left: 28px;
    }
  }
</style>
