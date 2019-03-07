<template>
    <div class="icons-block">
       <div class="main-block">
           <slot name="icon-time">
               <icon-base
                       fill="none"
                       width="17"
                       height="19"
                       viewBox="0 0 17 16"
                       icon-name="time">
                   <icon-time /></icon-base>
               <span v-if="poll.end_date || poll.votingOver"> {{currentTime}}</span> <lang-string v-if="!poll.end_date" :title="'no_time_limit'"/>
           </slot>
           <slot name="icon-money">
               <icon-base
                       fill="none"
                       width="15"
                       height="18"
                       viewBox="0 0 15 18"
                       icon-name="money">
                   <icon-money /></icon-base>
               <span>0</span>
           </slot>

           <slot name="icon-accept">
               <icon-base
                       fill="none"
                       width="17"
                       height="17"
                       viewBox="0 0 17 17"
                       icon-name="accept">
                   <icon-accept /></icon-base>
               <span>{{item.amountOfVoted}}</span>
           </slot>

           <slot name="icon-comments">
               <icon-base
                       fill="none"
                       width="19"
                       height="17"
                       viewBox="0 0 19 17"
                       icon-name="comments">
                   <icon-comments /></icon-base>
               <span>{{item.amount_of_comments}}</span>
           </slot>
       </div>
        <slot name="bookmark">
            <bookmark :poll="poll" :item="item"></bookmark>
        </slot>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import IconBase from './IconBase.vue'
    import IconPrice from './IconPrice.vue'
    import IconAccept from './IconAccept.vue'
    import IconMoney from './IconMoney.vue'
    import IconTime from './IconTime.vue'
    import IconComments from './IconComments.vue'
    import IconReplied from './IconReplied.vue'
    import bookmark from './bookmark.vue'
    import IconEmoji from './IconEmoji.vue'
    import I18n from "./../i18n";
    import langString from '../langString.vue'
    import {localString} from '../../utils/localString.js'
    import moment from 'moment'
    export default {
        name: "IconBlock",
        props:['item', 'poll'],
        data(){
            return{
                currentTime:null,
                procid:null
            }
        },
        computed:{


            ...mapState('lang',{

                _lang : state => {return state.locale.langSelector},
                lang : state => state.locale

            }),

            lstr(){
                return (str)=>localString(this.lang, str);
            },

            relativeEndDate(){
                //console.log('Getter is called');
                let {poll, _lang} = this;
                let {end_date} = poll;
                moment.locale(_lang);

                // let relTime = moment(end_date).fromNow();
                // var now = moment(new Date());
                console.log(end_date)
                var end = moment.utc(end_date);
                // var duration = end.diff(now);

                return end;
            },
        },

        methods:{



            getTime(){

                let end = this.relativeEndDate;
                let now = moment(new Date())
                let duration = moment.duration(end.diff(now));

                if (duration.asDays() > 1){
                    let output = `${Math.floor(duration.asDays())} ${this.lstr('days')}`;
                    this.currentTime = output;
                } else if (duration > 1 && duration.asHours()<24  ){
                    let output = `${duration.hours()}:${duration.minutes()}:${duration.seconds()}`
                    this.currentTime = output;

                } else {

                    this.currentTime = this.lstr('prediction_is_over')


                }

                return this.currentTime;
            }

        },

        mounted() {

            // let output = moment(this.relativeEndDate).format("hh:mm:ss");
            //
            this.getTime();
            this.procid = setInterval(() => {this.getTime()}, 1 * 1000);
            //
        },

        beforeDestroy(){
          clearInterval(this.procid);
        },

        components:{
            IconBase,
            IconTime,
            IconMoney,
            IconAccept,
            IconPrice,
            IconComments,
            IconReplied,
            I18n,
            langString,
            bookmark,
            IconEmoji
        }
    }
</script>

<style lang="scss">

    .icons-block {
        display: flex;
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        line-height: 12px;
        font-size: 12px;
        letter-spacing: -0.2px;
        color: #6D7D85;
        align-items: baseline;
        justify-content: space-between;
        svg {
            margin-right: 6px;
            margin-left: 16px;
        }

        svg:first-of-type {

            margin-left: 0 !important;

        }

        .main-block {
            display: flex;
            align-items: flex-end;
        }
    }

</style>
