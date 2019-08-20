<template>
    <div class="timestamp-block">
        <span v-if="transformedTime">{{transformed_time}}</span>
        <span v-if="shortTime">{{short_time}}</span>
        <span v-if="predictionTime">{{currentTime}}</span>

    </div>
</template>

<script>
    import {localString} from "../utils/localString";
    import moment from 'moment'
    import langMixin from './mixins/langMixin'
    import {mapState} from 'vuex'
    const pad = (num, len=2, char='0') => {
        let init = `${num}`;

        while (init.length < (len*char.length)){
            init = `${char}${init}`
        }

        return init;
    };
    export default {
        name: "timeTrans",
        mixins:[langMixin],
        props: {
			time: {
				required: true
			},
            shortTime: {
			    type:Boolean
            },
            predictionTime: {
			    type:Boolean
            },
            transformedTime: {
                type:Boolean
            },
		},
        data() {
            return {
                currentTime:null,
                procid:null,
            }
        },
        computed: {
            ...mapState('lang',{

                _lang : state => {return state.locale._lang},
                lang : state => state.locale

            }),
            lstr(){
                return (str)=>localString(this.lang, str);
            },
            relativeEndDate(){
                moment.locale(this._lang);
                return moment.utc(this.time);
            },
            short_time:function () {

                let transformed_time = this.time;
                let mTime = moment(transformed_time);

                let now = moment(new Date());

                let isToday = now.format("YYYYMMDD") === mTime.format("YYYYMMDD");

                const daysDiff = now.diff(mTime, 'days');
                const secondsDiff = now.diff(mTime, 'seconds');

                const relTime = mTime.fromNow('mm');
                const relTimeParts = relTime.split(' ');
                let text;


                if (secondsDiff < 30) return this.lstr('now');

                /**
                 * Возвращает сокращенный вариант времени с учётом минут и месяцев
                 * @param title
                 * @param count
                 * @returns {string|string}
                 */
                const getText = (title,count) => {
                  const titles = {
                      'minute': x=>`${x}min`,
                      'минут' : x=>`${x}мин`,
                      'now': x=>`now`,
                      'сейчас': x=>`щас`
                  };

                  for (const [src, target] of Object.entries(titles)){

                      if (title.toLowerCase().indexOf(src) !== -1){
                          return target(count);
                      }

                  }

                  return `${count}${title.substring(0,1)}`;

                };

                if (relTimeParts.length > 1){
                    const [count, title] = relTime.split(' ');


                    text = getText(title, isNaN(Number(count)) ? '1' : count);
                }

                else {

                    text = getText(relTime, 1);
                    //text = `${relTime.substr(0, 1).toUpperCase()}${relTime.substr(1, relTime.length)}`;
                }




                let parsedTime = daysDiff > 365 ? mTime.fromNow('d') : text;

				return parsedTime;

            },

            transformed_time:function () {

                let transformed_time = this.time;

                let now = moment(new Date());

                let isToday = now.format("YYYYMMDD") === moment(transformed_time).format("YYYYMMDD");

                let parsedTime = isToday ? moment(transformed_time).format('HH:mm') : moment(transformed_time).fromNow('D');

                return parsedTime;

            }

        },
        methods: {
            getTime(){

                let end = this.relativeEndDate;
                let now = moment(new Date())
                let duration = moment.duration(end.diff(now));

                if (duration.asDays() > 1){
                    let output = `${Math.floor(duration.asDays())} ${this.lstr('days')}`;
                    this.currentTime = output;
                } else if (duration > 1 && duration.asHours()<24  ){
                    let output = `${pad(duration.hours())}:${pad(duration.minutes())}:${pad(duration.seconds())}`
                    this.currentTime = output;

                } else {

                    this.currentTime = this.lstr('end')
                }

                return this.currentTime;
            }
        },
        mounted(){
            this.getTime();
            this.procid = setInterval(() => {this.getTime()}, 1 * 1000);
        },
        beforeDestroy(){
            clearInterval(this.procid);
        },
    }
</script>

<style scoped>

</style>
