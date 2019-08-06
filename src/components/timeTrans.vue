<template>
    <div class="timestamp-block">
        <span v-if="!shortTime">{{transformed_time}}</span>
        <span v-if="shortTime">{{short_time}}</span>
        <span v-if="predictionTime">{{currentTime}}</span>

    </div>
</template>

<script>
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
            }
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
                var end = moment.utc(this.time);
                return end;
            },
            short_time:function () {

                let transformed_time = this.time;
                let mTime = moment(transformed_time);

                let now = moment(new Date());

                let isToday = now.format("YYYYMMDD") === mTime.format("YYYYMMDD");

                const daysDiff = now.diff(mTime, 'days');

                const relTime = mTime.fromNow('mm');
                const relTimeParts = relTime.split(' ');
                let text;

                if (relTimeParts.length > 1){
                    const [count, title] = relTime.split(' ');
                    text = `${isNaN(Number(count)) ? '1' : count}${title.substring(0,1)}`;
                } else if (relTime.length < 1){
                    text = 'now'
                }
                else {
                    text = `${relTime.substr(0, 1).toUpperCase()}${relTime.substr(1, relTime.length)}`;
                }




                let parsedTime = daysDiff > 1 ? mTime.fromNow('d') : text;

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
