<template lang="html">
  <div class="answer-feed" >
    <div v-for="(item, index) in quizFeed"  :key="index" :value="false">
      <div class="quiz-container">
        <div class="icon-more">
          <icon-base
          fill="none"
          width="14"
          height="4"
          viewBox="0 0 14 4"
          icon-name="more">
          <icon-more /></icon-base>
        </div>
        <div class="tape-header">
          <div class="date">
            <el-tooltip class="item" effect="dark" :content="moment(item.date).format('LL')" placement="top">
              <span class="time date-time">{{moment(item.date).format('HH:mm')}}</span>
            </el-tooltip>
          </div>
          <div class="header-main">
            <div  class="middle-content">
              <div class="profile-avatar" @click="userLink(item.author.id)" :style="{ 'background-image': 'url(' + item.author.path_to_avatar + ')' } "> </div>
              <div class="quiz-request">
                <span class="nicknameId"> </span>{{item.author.username}}
                <lang-string class="some-text" :title="'created_a_poll'"/>

              </div>
            </div>
            <div class="bottom-content">
              <icon-base
              fill="none"
              width="9"
              height="13"
              viewBox="0 0 9 13"
              icon-name="location">
              <icon-location /></icon-base>
                <span class="tape-location">{{item.author.location}}</span>

            </div>
          </div>
        </div>
        <div class="sub-frame">
          <span class="subject-header">{{item.subject_header}}</span>
        </div>
        <div class="answer-middle">
          <div class="text-body">
            <div class="picture-block" v-if=" !item.picture.length == 0 " :style="{ 'background-image': 'url(' + item.picture + ')' }">

            </div>
            <div class="text-block ">
              <div  class="main-section">
                <span class="tags">
                  {{item.tags}}
                </span>
              </div>
              <div  class="text-section">
                <div class="subject-text">
                  <span class="quiz-question wb">
                    {{item.subject}}
                  </span>
                </div>
                <div class="quiz-helper ">
                  <span  class="helper-text wb">
                    {{item.description}}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="options" >
            <div class="answer-blocks" v-for= "(answer, answer_index) in item.options" :key='answer_index' >
              <div class="quiz-section" @click.once="acceptVote(answer.id, item.id, index)" v-bind:class="{ withPicture: answer.picture, noCursor: item.variable_voted}">
                <div class="optionPicture" v-if=" answer.picture " :class="{noCursor: item.variable_voted}"  :style="{ 'background-image': 'url(' + answer.picture + ')' } "></div>
                <!-- <div class="quiz-picture" :style="{ 'background-image': 'url(' + background + ')' }"> </div> -->
                <div class="quiz-main-section" :class="{noCursor: item.variable_voted}">
                  <div  class="quiz-number" :class="{noCursor: item.variable_voted}" ><span class="nubmer">{{answer_index+1}}</span></div>
                  <div  class="quiz-answer":class="{noCursor: item.variable_voted}" >
                    <span class="question">{{answer.option}}</span>
                  </div>
                  <div class="option-bows" :class="{noCursor: item.variable_voted}" v-if="answer.picture">
                    <poll-option-heads :limit="3" :option="answer"/>
                  </div>
                </div>
                <el-progress class="percentage" v-bind:class="{ picturePercentage: answer.picture, selected:  answer.voted }" v-if="item.variable_voted" :percentage="answer.voted_percentage" color="#828D92" :width="182" ></el-progress>
              </div>
              <div class="answered-users-section" v-bind:class="{ hideBlock: answer.picture }">
                <poll-option-heads :limit="5" :option="answer"/>
              </div>
            </div>
          </div>
        </div>
        <div class="answers-bottom">
            <div class="bottom-section">
              <icon-base
              fill="none"
              width="15"
              height="18"
              viewBox="0 0 17 18"
              icon-name="time">
              <icon-time /></icon-base>
              <span>00:00</span>
              <!-- <icon-base
                fill="none"
                width="17"
                height="17"
                viewBox="0 0 17 17"
                icon-name="money"><icon-money />
            </icon-base>
            <span>50</span> -->
              <icon-base
                fill="none"
                width="17"
                height="17"
                viewBox="0 0 17 17"
                icon-name="accept"><icon-accept />
            </icon-base>
            <span>{{item.voted_amount}}</span>
            <el-tooltip class="item" effect="dark" content="Комментарии" placement="top">
              <icon-base
                fill="none"
                width="16"
                height="17"
                viewBox="0 0 18 18"
                icon-name="comments"><icon-comments />
            </icon-base>
            </el-tooltip>
          <span>{{item.total_amount_of_comments}}</span>
            </div>
            <hr>
        </div>
        <div class="comments">
            <div class="profile-picture" @click="userLink(item.event_author.id)" :style="{ 'background-image': 'url(' + user.path_to_avatar + ')' } " >
          </div>
            <el-input :disabled="!item.variable_voted "  @keyup.enter.native="insertExplains(index, item)" size="small" class="comInput" :placeholder="(!item.variable_voted) ? lstr('you_can_leave_opinion_after_voting') : lstr('you_can_comment_your_vote')" :value="item.explanation"  @input="updateExplains(index, arguments[0])">
              <el-button :disabled="!item.variable_voted " slot="append" size="small"  @click="insertExplains(index, item)" >
                <lang-string :title="'comment_your_vote'"/>
              </el-button>
            </el-input>
        </div>
        <div class="answered-comments" v-for="(com, index_explain) in item.explainLeaders" >
          <div class="comment-text">
            <el-tooltip class="item" effect="dark" :content="moment(com.create_time).format('LL')" placement="top">
              <span class="time" v-if="com.create_time != null">{{moment(com.create_time).format('HH:mm')}}</span>
            </el-tooltip>
            <div class="explainPicture">
              <div class="profile-picture" @click="userLink(com.author.id)" :style="{ 'background-image': 'url(' + com.author.path_to_avatar + ')' } ">
              </div>
            </div>
            <div class="explain-block">
              <div class="text-block">
                <span class="answer">  <span class="nickname">{{com.author.username}}</span>{{com.description}}</span>
              </div>
              <div class="comment-info">
                <div class="accept">
                  <icon-base
                          fill="none"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          icon-name="answer"><icon-answer />
                  </icon-base>
                  <span class="answered">{{com.answer_text}}</span>
                </div>
                <div class="answer-pointer " @click="selectExplain(indexExplain, index, com)" >
                  <lang-string class="answer-pointer" :title="'reply'"/>
                </div>
              </div>
            </div>
          </div>

          <div class="answered-comments replies" v-for="(reply, indexComments) in com.comments" >
            <div class="comment-text">
              <el-tooltip class="item" effect="dark" :content="moment(reply.create_time).format('LL')" placement="top">
                <span class="time">{{moment(reply.create_time).format('HH:mm')}}</span>
              </el-tooltip>
              <div class="explainPicture">
                <div class="profile-picture" @click="userLink(reply.author.id)" :style="{ 'background-image': 'url(' + reply.author.path_to_avatar + ')' } "></div>
              </div>
              <div class="explain-block">
                <div class="text-block">
                  <span class="answer">  <span class="nickname">{{reply.author.username}}</span>{{ reply.description || '' }}</span>
                </div>
                <div class="comment-info">
                  <div class="accept">
                    <icon-base
                            fill="none"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            icon-name="answer"><icon-answer />
                    </icon-base>
                    <span class="answered">{{reply.answer_text}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span v-if="com.comments.length" class="load-more-comments" @click="showMoreComments(com.id, index, indexExplain)"></span>
          <div class="comments second-level-comments" >
            <div class="exception" >
              <div class="explainPicture">
                <div class="profile-picture" :style="{ 'background-image': 'url(' + user.path_to_avatar + ')' } " >
                </div>
              </div>
              <el-input   size="small"  :placeholder="lstr('you_can_comment')" :value="com.comment" @keyup.enter.native="insertComments(com.id, item.explain[indexExplain].comment, index, indexExplain)" @input="updateComments( index,  indexExplain,arguments[0])">
                <el-button slot="append" size="small" @click="insertComments(com.id, item.explain[indexExplain].comment, index, indexExplain)" v-if='item.variable_voted' >
                  <lang-string :title="'send'"/>
                </el-button>
              </el-input>
            </div>
          </div>
        </div>
        <div class="answered-comments" v-for="(com, index_explain) in item.explain" >
          <div class="comment-text">
            <el-tooltip class="item" effect="dark" :content="moment(com.create_time).format('LL')" placement="top">
              <span class="time" v-if="com.create_time != null">{{moment(com.create_time).format('HH:mm')}}</span>
            </el-tooltip>
            <div class="explainPicture">
              <div class="profile-picture" @click="userLink(com.author.id)" :style="{ 'background-image': 'url(' + com.author.path_to_avatar + ')' } ">
            </div>
            </div>
            <div class="explain-block">
              <div class="text-block">
                <span class="answer">  <span class="nickname">{{com.author.username}}</span>{{com.description}}</span>
              </div>
              <div class="comment-info">
                <div class="accept">
                  <icon-base
                      fill="none"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      icon-name="answer"><icon-answer />
                  </icon-base>
                  <span class="answered">{{com.answer_text}}</span>
                </div>
              <div class="answer-pointer " @click="selectExplain(index_explain, index, com)" >
                <lang-string class="answer-pointer" :title="'reply'"/>
              </div>
              </div>
            </div>
          </div>

          <div class="answered-comments replies" v-for="(reply, indexComments) in com.comments" >
            <div class="comment-text">
              <el-tooltip class="item" effect="dark" :content="moment(reply.create_time).format('LL')" placement="top">
                <span class="time">{{moment(reply.create_time).format('HH:mm')}}</span>
              </el-tooltip>
              <div class="explainPicture">
                <div class="profile-picture" @click="userLink(reply.author.id)" :style="{ 'background-image': 'url(' + reply.author.path_to_avatar + ')' } "></div>
              </div>
              <div class="explain-block">
                <div class="text-block">
                  <span class="answer">  <span class="nickname">{{reply.author.username}}</span>{{ reply.description || '' }}</span>
                </div>
                <div class="comment-info">
                <div class="accept">
                  <icon-base
                      fill="none"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      icon-name="answer"><icon-answer />
                  </icon-base>
                  <span class="answered">{{reply.answer_text}}</span>
                </div>
                </div>
              </div>
            </div>
          </div>
          <span  class="load-more-comments" @click="showMoreComments(com.id, index, index_explain)"><lang-string :title="'load_other_comments'"/></span>
          <div class="comments second-level-comments" >
            <div class="exception">
              <div class="explainPicture">
                <div class="profile-picture" :style="{ 'background-image': 'url(' + user.path_to_avatar + ')' } " >
              </div>
              </div>
                <el-input size="small" :placeholder="lstr('you_can_comment')" :value="com.comment" @keyup.enter.native="insertComments(com.id, item.explain[index_explain].comment, index, index_explain)" @input="updateComments( index,  index_explain,arguments[0])">
                  <el-button slot="append" size="small" @click="insertComments(com.id, item.explain[index_explain].comment, index, index_explain)" v-if='item.variable_voted' >
                    <lang-string :title="'send'"/>
                  </el-button>
                </el-input>
              </div>
            </div>
          </div>
        <span class="load-more-comments" @click="showMoreExplains(item.id, index)"><lang-string  :title="'load_other_explains'"/></span>
      </div>
    </div>
    <infinite-loading @infinite="infiniteHandler"
                        spinner="spiral">
    <span slot="no-more">Лента мнений закончена</span>

    </infinite-loading>
  </div>
</template>
<script>
import IconBase from '../icons/IconBase.vue'
import Vue from 'vue'
import IconTime from '../icons/IconTime.vue'
import IconPrice from '../icons/IconPrice.vue'
import IconCalendar from '../icons/IconCalendar.vue'
import IconAccept from '../icons/IconAccept.vue'
import IconComments from '../icons/IconComments.vue'
import IconLocation from '../icons/IconLocation.vue'
import IconTimeComment from '../icons/IconTimeComment.vue'
import IconRepost from '../icons/IconRepost.vue'
import IconQuizBookmark from '../icons/IconQuizBookmark.vue'
import IconAnswer from '../icons/IconAnswer.vue'
import IconInfo from '../icons/IconInfo.vue'
import IconMoney from '../icons/IconMoney.vue'
import IconMore from '../icons/IconMore.vue'
import PollOptionHeads from '../PollOptionHeads.vue'
import langString from '../langString.vue'
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import {localString} from '../../localString'

export default {
      data(){
          return {
            limitationList:3,
            page: 1
          }
        },
      computed: {
        ...mapState('quizFeed',{
          quizFeed : state => state.quiz,
          limit : state => state.limit,
          loading : state => state.loading,
          handlingInfinite : state => state.handlingInfinite,
          ihs: ({ihs})=>ihs,

        }),
        ...mapState('lang',{
          lang : state => state.locale
        }),
        ...mapState('user',{
          user : state => state.User
        }),
        lstr(){
          return (str)=>localString(this.lang, str);
        },
      },
      methods: {
        showMore(index){

          console.log(this.quizFeed[index].explain.length)
        },
        showMoreExplains(quizID, index){
          this.$store.dispatch('quizFeed/showExplains', {quizID, index})
        },
        showMoreComments(explainID, quizID, index_explain){
          this.$store.dispatch('quizFeed/showComments', {explainID, quizID, indexExplain})
        },
        infiniteHandler($state){
          if (this.limit || this.ihs){

          } else {

            this.$store.dispatch('quizFeed/getAllQuiz', $state).then(() => {
              this.page += 1;
            });
          }
        },
        userLink(userId) {
          this.$router.push({name:'mypage',params:{id:userId}})
        },
        updateLimitation(limitationList, e){
          if (this.limitationList == e) {
            this.limitationList = e
          }else{
            this.limitationList = e
          }
        },
        acceptVote(optionID, quizID, index){
          if (this.quizFeed[index].variable_voted == false) {
            this.$store.dispatch('quizFeed/userVote', {optionID, quizID, index})
          }
        },
        insertExplains(index, item){
          this.$store.dispatch('quizFeed/pushExplains', {index, item})
        },
        selectExplain(index_explain, index, item){
          this.$store.dispatch('quizFeed/selectExplain', {item, indexExplain, index})
        },
        insertComments(explainID, description, index, index_explain){
          this.$store.dispatch('quizFeed/pushComments', {explainID, quizIndex: index, explainIndex: indexExplain, description}).then(() => {
            this.$store.commit('quizFeed/refreshComments', { index, indexExplain})
          });
        },
        updateExplains (index, updatedValue){
          this.$store.commit('quizFeed/updateExplains', {index, updatedValue})
        },
        updateComments (index,  index_explain, updatedValue  ){
          this.$store.commit('quizFeed/updateComments', {index, indexExplain, updatedValue })
        },
        ...mapActions('comments',[
          'pushComments'
        ]),
        ...mapActions('quizFeed',[
          'userVote',
          'updateFeed'
        ]),
      },
      beforeCreate() {
        this.$store.commit('quizFeed/reset');
        this.$store.dispatch('quizFeed/getAllQuiz').then(() => {
          this.$store.commit('quizFeed/setPage', 1);
        });
      },
      created: {
      },
      updated: function(){

        let {ihs, loading} = this;
        if ( (!loading) && ihs){
          if (this.limit) {
            this.ihs.complete();
            this.$store.commit(`quizFeed/setLoading`, {ihs: null});
          }
          else {
            this.ihs.loaded();
            this.$store.commit(`quizFeed/setLoading`, {ihs: null});
          }
        }
      },
      components: {
        IconBase,
        IconTime,
        IconCalendar,
        IconPrice,
        IconAccept,
        IconComments,
        IconLocation,
        IconTimeComment,
        IconRepost,
        IconQuizBookmark,
        IconAnswer,
        IconInfo,
        IconMoney,
        PollOptionHeads,
        IconMore,
        langString
      },
    }

</script>

<style lang="scss">


</style>
