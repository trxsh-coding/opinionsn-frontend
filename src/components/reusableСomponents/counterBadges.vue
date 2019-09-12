<template>

	<div class="counter-badges flex">

		<div class="explains-block flex-align-center mr-9">
			<icon-base
				fill="BEC0C5"
				width="13"
				height="10"
				viewBox="0 0 13 10"
				icon-name="check">
				<icon-check></icon-check>
			</icon-base>

			<span class="ml-6">{{poll.total_amount_of_votes}}</span>
		</div>

		<div v-if="!short" class="comments-block flex-align-center mr-9">
			<icon-base
				fill="BEC0C5"
				width="13"
				height="13"
				viewBox="0 0 13 13"
				icon-name="baloon">
				<icon-baloon></icon-baloon>
			</icon-base>

			<span class="ml-6">{{poll.total_amount_of_comments}}</span>
		</div>

		<div v-if="poll.type_of_poll === 1 || poll.type_of_poll === 2" class="comments-block flex-align-center mr-9">
			<icon-base
				fill="BEC0C5"
				width="13"
				height="13"
				viewBox="0 0 13 13"
				icon-name="clocks">
				<icon-clocks></icon-clocks>
			</icon-base>
			<span class="ml-6">
				<time-trans prediction-time :time="poll.end_date"></time-trans>
			</span>

		</div>

		<div v-if="!short && poll.type_of_poll === 2" class="comments-block flex-align-center">
			<icon-base
				fill="BEC0C5"
				width="13"
				height="15"
				viewBox="0 0 13 15"
				icon-name="bag">
				<icon-bag></icon-bag>
			</icon-base>

			<span class="ml-6">{{poll.fund}}</span>
		</div>

	</div>

</template>

<script>
	import IconBase from "../icons/IconBase";
	import IconCheck from "../icons/IconCheck";
	import IconBaloon from "../icons/IconBaloon";
	import IconClocks from "../icons/IconClocks";
	import IconBag from "../icons/IconBag";
	import TimeTrans from "../timeTrans";
	import {mapState} from 'vuex'
	import moment from 'moment'
	import langMixin from "@/components/mixins/langMixin";

	const pad = (num, len=2, char='0') => {
		let init = `${num}`;

		while (init.length < (len*char.length)){
			init = `${char}${init}`
		}

		return init;
	};


    export default {
        name: "counterBadges",
	    mixins: [langMixin],
		props: {
        	poll: {
        		type: Object,
				required: true
			},
			short: {
        		type: Boolean,
				default: function () {
					return false;
				}
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

				_lang : state => {return state.locale.langSelector},
				lang : state => state.locale

			}),

			relativeEndDate(){
				let {poll, _lang} = this;
				let {end_date} = poll;
				moment.locale(_lang);
				var end = moment.utc(end_date);
				return end;
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
		components: {
			TimeTrans,
			IconBase,
			IconCheck,
			IconBaloon,
			IconClocks,
			IconBag
		}
    }
</script>

<style lang="scss">

</style>