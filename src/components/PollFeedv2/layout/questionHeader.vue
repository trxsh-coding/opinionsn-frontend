<template>
    <div class="question-header-block flex-align-center">
        <div class="flex-align-center">
            <RePicture :url="author.url | addAssetsPath" class="pointer" rounded size="33" @click.native="RedirectToAuthor(author.id)"/>
            <div class="user-info-block flex-column ml-6">
            <div class="block-with-sub flex-align-center">
            <span class="header-username">
                {{author.username}}
            </span>
            <div class="line-block flex">
                <svg width="1" height="8" viewBox="0 0 1 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.5" d="M0.5 0.5V7.5" stroke="#8E8E93" stroke-width="0.5" stroke-linecap="square"/>
                </svg>
            </div>
            <subscribe-button :leader="author.leader" :id="author.id" v-if="mainUser.id !== userId"/>
            </div>
                <span class="header-time">
                <time-trans :time="date" transformedTime class="time-caption mt-4"/>
            </span>
            </div>
        </div>
        <div class="action-sheet-block ">
            <input ref="shareLink" type="text"
                   :value="`https://opinionsn.com/singlePoll/${pollId}`"
                   class="share-link flex">
            <Share @click.native="copyInviteLink($refs.shareLink)" class="mr-16 share-icon"/>

            <More @click.native="onOpenActionSheet" />
        </div>
        <ReModal v-if="showModal && !showPrompt" :width="mobile ? '70%' : '500px'"
                 :br="mobile ? 0 : '10px'"
                 :height="mobile ? '37%' : '500px'"
                 overflow @onCloseModal="onCloseActionSheet"
                 :is-opened="showModal"
        >
            <div class="actions flex-column">
                <span class="pointer" @click="addToBookmark">{{bookmarkId === 0 ? translateKeyword('add_to_bookmarks') : translateKeyword('delete_from_bookmarks')}}</span>
                <span  class="pointer" @click="copyInviteLink($refs.shareLink)">{{translateKeyword('share')}}</span>
                <span class="pointer" @click="blockQuestion">{{translateKeyword('hide')}}</span>
                <span class="pointer" @click="showPrompt = true " >{{translateKeyword('report')}}</span>
                <span class="pointer" @click="deleteQuestion(pollId)" v-if="mainUser.authorities === 'ADMIN'">{{translateKeyword('delete')}}</span>
                <span  class="pointer" @click="showModal = false">{{translateKeyword('cancel')}}</span>
                <input ref="shareLink" type="text"
                       :value="`https://opinionsn.com/singlePoll/${pollId}`"
                       class="share-link flex">
            </div>

        </ReModal>
        <RePrompt :title="translateKeyword('report')" :visible="showPrompt"  @onConfirm="onConfirmAction"  >
            <span class="font-14"> Вы уверенны, что хотите пожаловаться на вопрос : </span> <span class="bold-caption-14">{{questionSubject}}</span>
        </RePrompt>
    </div>
</template>

<script>
    import RePicture from "../../reusableСomponents/RePicture";
    import RedirectMixin from "../../mixins/RedirectMixin";
    import TimeTrans from "../../timeTrans";
    import More from "../../iconsV2/More";
    import ReModal from "../../reusableСomponents/ReModal";
    import translateKeywordMixin from "../../mixins/translateKeywordMixin";
    import SubscribeButton from "../../BowsFeed/layout/SubscribeButton";
    import Line from "../../iconsV2/Line";
    import Share from "../../iconsV2/Share";
    import {actionsStoreName} from "../../../constants";
    import RePrompt from "../../reusableСomponents/RePrompt";
    export default {
        name: "questionHeader",
        components: {RePrompt, Share, Line, SubscribeButton, ReModal, More, TimeTrans, RePicture},
        mixins:[RedirectMixin, translateKeywordMixin],
        data(){
          return {
              showModal:false,
              showPrompt:false
          }
        },
        props: {
            author:Object,
            date:String,
            mainUser:Object,
            pollId:Number,
            typeofquestion:Number,
            bookmarkId:Number,
            questionSubject:String
        },
        computed: {
            mobile() {
                return this.$root.mobile;
            },
        },
        methods: {
           async deleteQuestion(id){
               try {

                   let {status} = await this.$store.dispatch(`${actionsStoreName(this.$route.name)}/deletePoll`, id);
                   if (status === 200) {

                       this.$popup.insert('messages', [{message: 'Успешное удаление!', type: 'success'}]);
                       // this.$parent.deleted = true;
                       this.$store.commit(`${actionsStoreName(this.$route.name)}/deleteItemFromPayload`, id);

                       if (this.$route.name !== 'QuestionsFeed') this.$router.push({name: 'QuestionsFeed'});

                   } else {

                       this.$popup.insert('messages', [{message: 'При удалении произошла ошибка!', type: 'error'}]);

                   }

               } catch (e) {

                   console.error(e);

               }
           },
           onConfirmAction(payload){
               this.showPrompt = false;
               this.showModal = false;
               if(payload) this.reportQuestion()
           },
           async blockQuestion(){
               let id = this.pollId;
              try {
                  let {status} = await this.$store.dispatch(`${actionsStoreName(this.$route.name)}/blockQuestion`, id);
                  if(status === 200) {
                      try {
                          if(this.$route.name === 'singlePoll'){
                            this.$router.push({name:'QuestionsFeed'})
                          }
                      } catch (e) {
                          console.trace(e)
                      }
                      this.$store.commit(`${actionsStoreName(this.$route.name)}/deleteItemFromPayload`, id);
                      this.$popup.insert('messages', [{message: 'Вопрос успешно скрыт', type: 'success'}]);

                  }
              }catch (e) {
                  this.$popup.insert('messages', [{message: 'При удалении произошла ошибка!', type: 'error'}]);

              }

            },
            addToBookmark(){
                if(this.bookmarkId === 0) {
                    this.$store.dispatch(`${actionsStoreName(this.$route.name)}/addToBookmark`, {poll_id : this.pollId, type_of_poll: this.typeofquestion})

                } else {
                    this.$store.dispatch(`${actionsStoreName(this.$route.name)}/deleteBookmark`, this.bookmarkId);
                }
            },
            async reportQuestion(){
                let id = this.pollId;
                try {
                    let {status} = await this.$store.dispatch(`${actionsStoreName(this.$route.name)}/reportQuestion`, id);
                    if(status === 200) {
                        this.$store.commit(`${actionsStoreName(this.$route.name)}/deleteItemFromPayload`, id);
                        this.$popup.insert('messages', [{message: 'Жалоба успешна отправлена', type: 'success'}]);
                    }
                }catch (e) {

                }

            },
            copyInviteLink(elem) {
                if (elem) {
                    elem.select();
                    try {
                        document.execCommand('copy');
                        this.$popup.insert('messages', [{
                            message: this.translateKeyword('link_copied_to_clipboard'),
                            type: 'success'
                        }]);
                    } catch (err) {
                        this.$popup.insert('messages', [{message: this.translateKeyword('unable_to_copy'), type: 'error'}]);
                    }
                    window.getSelection().removeAllRanges();
                }
            },
            onCloseActionSheet(){
                this.showModal = false;
            },
            onOpenActionSheet(){
                this.showModal = true;
            }
        }
    }
</script>

<style lang="scss">
    .question-header-block {
        padding: 16px 16px 0 16px;
        justify-content: space-between;
        .actions {
            z-index: 10;
            padding: 10px;
            span {
                z-index: 10;
                margin-bottom: 20px;
            }
        }
        .line-block {
            padding: 0 7.5px;
        }
        .share-icon {
            path {
                fill:#8E8E93;
            }
        }
        .share-link {
            position: absolute;
            left: -9999px;
        }
        .action-sheet-block {

        }
        .user-info-block {
            .header-username {
                font-style: normal;
                font-weight: bold;
                font-size: 13px;
            }
            .header-time {
                font-size: 9px;
                text-align: left;
                color: #8E8E93;

            }
        }
    }
</style>
