<template>
  <div class="poll-preview">

      <div class="main-block">


          <div  class="options-block" v-if="!mobile">
            <div class="options" v-for="{option, isSelected} in sanitizedOptions[0].option.picture != null ? sanitizedOptions.slice(0, 2) : sanitizedOptions">

              <div class="option" >
                  <div class="picture-with-options" :class="{'is-voted' : isSelected}" :style="{ 'background-image': 'url(' + option.picture + ')' } " v-if="option.picture">
                  </div>
                  <div class="text-block flex-align-center" :class="{'picture-option' : option.picture, 'main-option' : isSelected} " >
                      <div class="span-block">

                          <div class="icon-accept" :class="{'display' : isSelected} ">
                              <icon-base
                                      fill="#ffffff"
                                      width="15"
                                      height="15"
                                      viewBox="0 0 17 17"
                                      icon-name="accept">
                                  <icon-accept />
                              </icon-base>
                          </div>
                          <span :class="{'is-voted' : isSelected} ">{{option.description}}</span>

                      </div>
                  </div>
              </div>
            </div>

            <!---->

            <div class="extra" v-if="canExpand"  :class="{'extra-long' : sanitizedOptions[0].option.picture} " >
              <span>

              +{{extraOptionsCount}}
              </span>
            </div>
          </div>

          <div  class="options-block">
              <div class="options" v-for="{option, isSelected} in unsanitizedOptions" v-if="mobile">

                  <div class="option" >
                      <div class="picture-with-options" :class="{'is-voted' : isSelected}" :style="{ 'background-image': 'url(' + option.picture + ')' } " v-if="option.picture">
                      </div>
                      <div class="text-block flex-align-center" :class="{'picture-option' : option.picture, 'main-option' : isSelected} " >
                          <div class="span-block">

                              <div class="icon-accept" :class="{'display' : isSelected} ">
                                  <icon-base
                                          fill="#ffffff"
                                          width="15"
                                          height="15"
                                          viewBox="0 0 17 17"
                                          icon-name="accept">
                                      <icon-accept />
                                  </icon-base>
                              </div>
                              <span :class="{'is-voted' : isSelected} ">{{option.description}}</span>

                          </div>
                      </div>
                  </div>
              </div>

              <!---->
          </div>

          <div class="description-section" v-if="type.indexOf('EXPLAINED') > -1">
            <explanation :vote="vote" />
          </div>
          <poll-block :author="author" :poll="poll" :item="item"/>
      </div>

    </div>



</template>

<script>
import moment from 'moment';
import { mapState } from 'vuex';
import IconBase from '../../icons/IconBase.vue'
import Explanation from './Explanation.vue'
import IconAccept from './../../icons/IconAccept.vue'
import IconMoney from './../../icons/IconMoney.vue'
import IconTime from './../../icons/IconTime.vue'
import IconReplied from './../../icons/IconReplied.vue'
import langString from './../../langString.vue'
import PollBlock from './PollBlock'
import {globalStoreMixin} from "../../../store/modules/globalStore";
const optionsLimit = 2;
    export default {
        data(){

            return {

                expanded: false,
                mobile:this.$root.mobile

            }

        },
        mixins: [globalStoreMixin({'poll': true, 'vote': true, 'option': true})],
        name: "PollPreview",
        props: ['vote', 'poll', 'options', 'item', 'type'],
        computed: {

          ...mapState('globalStore', {
            users: ({users}) =>users,
          }),

          ...mapState('lang',{
            _lang : state => {return state.locale.langSelector}
          }),

          /**
             * Defines whether poll can expand (or even needs to)
             */
            canExpand: function(){
                return this.options.length > optionsLimit;
            },
            user_id: function(){

              let {poll} = this;

              let author_id;

              author_id = poll.author_id;

              return author_id

            },

          relativeEndDate(){
            //console.log('Getter is called');
            let {poll, _lang} = this;
            let {end_date} = poll;
            moment.locale(_lang);

            let relTime = moment(end_date).fromNow();

            return relTime;
          },
          author: function () {

              let {user_id, users} = this;

              let author;

              author =  users[user_id];

              return author;

          },

            /**
             * This will return expanded or nonexpanded list of options
             * Where the first one will be "selected" one
             */
            sanitizedOptions: function(){
              let {options, expanded} = this;
              let sanOptions = [...options];
                // Sort them by selected (in future it will allow to use multiple-selection)
                sanOptions.sort(({isSelected: a}, {isSelected: b})=>b-a);
                // Limit them either by 3 or the length of the whole things
                sanOptions.splice(expanded ? options.length : optionsLimit, options.length);
                return sanOptions;
            },

            unsanitizedOptions: function(){
                let {options, expanded} = this;
                let sanOptions = [...options];
                // Sort them by selected (in future it will allow to use multiple-selection)
                sanOptions.sort(({isSelected: a}, {isSelected: b})=>b-a);
                // Limit them either by 3 or the length of the whole things
                return sanOptions;
            },

            extraOptionsCount: function(){
                return this.options.length - optionsLimit;
            }
        },
        components: {
              IconBase,
              IconTime,
              IconMoney,
              IconAccept,
              IconReplied,
              langString,
              Explanation,
              PollBlock

        },
        methods: {
            onExpandButtonClick(){
                this.expanded = !this.expanded;
            },
          pollLink(id){
            this.$router.push({name:'Poll',params:{id:id}})

          },
            quizLink(quizId) {
              this.$router.push({name:'singleQuiz',params:{id:quizId}})
            },
            userLink(userId) {
              this.$router.push({name:'mypage',params:{id:userId}})
            },
        }
    }

</script>

<style lang="scss">
  .poll-preview {
    .main-block {

      .content-block {
        background: #FFFFFF;
        border-radius: 12px;
        display: flex;
        .topic {
          margin-bottom: 12px;
          span {
            background: #B9C0C4;
            border-radius: 15px;
            padding: 2px 9px;
            color: #ffffff;
            font-size: 13px;
          }
        }

        .text-block {
          display: flex;
          flex-direction: column;
          justify-content: space-between;

        }

        .picture-block {
          height: 143px;
          width: 143px;
          background-repeat: no-repeat;
          background-size: cover !important;
          background-position: center;
          background-size: 50% 50%;
          margin-right: 10px;
          border-radius: 6px 0px 0 6px;
        }

        .icon-block {
          display: flex;
          svg {
            margin-right: 5px;
          }
          span {
            padding-right: 15px;
            font-family: Roboto;
            font-style: normal;
            font-weight: normal;
            line-height: 20px;
            font-size: 12px;
            letter-spacing: -0.2px;
            color: #6D7D85;
          }
        }

      }
      .author-avatar {
        width: 21px;
        height: 21px;
        border-radius: 1000px;
        background-size: 50% 50%;
        background-repeat: no-repeat;
        background-size: cover;
        margin-right: 7px;
      }
      .author-block {
        display: flex;
        align-items: center;
        margin-bottom: 7px;
        span {
          font-family: Roboto;
          font-style: normal;
          font-weight: 500;
          line-height: 14px;
          font-size: 14px;
          color: #152D3A;
        }
      }
      .tags-block {
        margin: 7px 0  4px 0;
        margin-bottom: 5px;
        span {
          font-family: Roboto;
          font-style: normal;
          font-weight: 300;
          line-height: 12px;
          font-size: 12px;
          letter-spacing: -0.2px;
          color: #2861CD;
        }
      }
      .description-block {
        margin-bottom: 12px;
        span {
          font-family: Roboto;
          font-style: normal;
          font-weight: 500;
          line-height: 19px;
          font-size: 16px;
          letter-spacing: -0.1px;
          color: #152D3A;
        }
      }

      .display {
        display: inline !important;
        margin-right: 5px;
      }
      .icon-accept {
        display: none;
        span {
          font-family: Roboto;
          font-style: normal;
          font-weight: normal;
          line-height: 12px;
          font-size: 12px;
          letter-spacing: -0.2px;
          color: #828D92;
          padding: 0 14px 0 6px;
        }
      }

      .options-block {
        padding: 12px 46px 9px 12px;
        border-radius: 0 0 6px 6px;
        display: flex;
        align-items: flex-end;

        .main-option {
          background:#4B97B4 !important ;
        }

        .options {
          margin: 0;
        }


        .extra {
          background: #D0D5D9;
            height: 18px;
            padding: 6px 13px;
            line-height: 20px;
          display: flex;
          align-items: center;
          border-radius: 6px;
        }
        .extra-long {
            height: 30px;
            margin-left: 0px;
        }
        .option {

          min-height: 30px;
          display: flex;
          border-radius: 6px;
          margin-right: 6px;
          color: #D0D5D9 !important;
          list-style: none;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 200px;
          path {
            fill: #ffffff;
          }
          .text-block {
            background: #C4CCD0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding: 0 9px;
            border-radius: 0 6px 6px 0;
              .span-block {
                  padding-right: 5px;
                  overflow-x: hidden;
                  text-overflow: ellipsis;

              }


          }

        }
        .picture-with-options {
            padding: 0px 21px;
            height: 42px;
            border-radius: 6px 0 0 6px;
            background-repeat: no-repeat;
            background-size: cover;
        }
        .picture-option {

        }
        span {
          font-family: Roboto;
          font-style: normal;
          font-weight: normal;
          line-height: 15px;
          font-size: 14px;
          letter-spacing: -0.1px;
          color: #ffffff;
        }
        .is-voted {
          font-family: Roboto;
          font-style: normal;
          font-weight: 500;
          line-height: 18px;
          font-size: 14px;
          letter-spacing: -0.1px;
          color: #ffffff;
          filter: none;
        }
      }
    }
      @media only screen and (max-device-width : 700px) {

          .options-block {

              overflow: auto;

          }

          .options-block::-webkit-scrollbar {
              width: 0;
          }

      }
  }
</style>
