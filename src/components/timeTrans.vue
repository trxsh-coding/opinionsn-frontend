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

	const pad = (num, len = 2, char = '0') => {
		let init = `${num}`;

		while (init.length < (len * char.length)) {
			init = `${char}${init}`
		}

		return init;
	};
	export default {
		name: "timeTrans",
		mixins: [langMixin],
		props: {
			time: {
				required: true
			},
			shortTime: {
				type: Boolean
			},
			predictionTime: {
				type: Boolean
			},
			transformedTime: {
				type: Boolean
			},
		},
		data() {
			return {
				currentTime: null,
				procid: null,
			}
		},

		computed: {
			...mapState('lang', {
				_lang: s => s.locale._lang,
				lang: s => s.locale
			}),

			lstr() {
				return (str) => localString(this.lang, str);
			},

			relativeEndDate() {
				// moment.locale(this._lang);
				return moment.utc(this.time);
			},

			short_time: function () {

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
				const getText = (title, count) => {
					const titles = {
						'minute': x => `${x}min`,
						'минут': x => `${x}мин`,
						'now': x => `now`,
						'сейчас': x => `щас`
					};

					for (const [src, target] of Object.entries(titles)) {

						if (title.toLowerCase().indexOf(src) !== -1) {
							return target(count);
						}

					}

					return `${count}${title.substring(0, 1)}`;

				};

				if (relTimeParts.length > 1) {
					const [count, title] = relTime.split(' ');


					text = getText(title, isNaN(Number(count)) ? '1' : count);
				} else {

					text = getText(relTime, 1);
					//text = `${relTime.substr(0, 1).toUpperCase()}${relTime.substr(1, relTime.length)}`;
				}


				let parsedTime = daysDiff > 365 ? mTime.fromNow('d') : text;

				return parsedTime;

			},

			transformed_time() {

				let {time} = this;

				let today = parseInt(moment(new Date()).format('DDDD'), 10),
					current = parseInt(moment(time).format('DDDD'), 10),
					difference = today - current;

				return this.treatedTime(difference, time);

			}

		},
		methods: {
			getTime() {

				let end = this.relativeEndDate;
				let now = moment(new Date())
				let duration = moment.duration(end.diff(now));

				if (duration.asDays() > 1) {
					let output = `${Math.floor(duration.asDays())} ${this.lstr('days')}`;
					this.currentTime = output;
				} else if (duration > 1 && duration.asHours() < 24) {
					let output = `${pad(duration.hours())}:${pad(duration.minutes())}:${pad(duration.seconds())}`
					this.currentTime = output;

				} else {

					this.currentTime = this.lstr('end')
				}

				return this.currentTime;
			},

			treatedTime(diff, date) {
				moment.locale(this._lang);
				switch (true) {
					case diff === 0:
						return moment(date).calendar().replace(/(, в)/, '');
					case diff === 1:
						return moment(date).calendar().replace(/(, в)/, '');
					case diff > 1 && diff <= 30:
						return moment(date).fromNow();
					default:
						if (!parseInt(moment(date).fromNow(), 10)) {
							return '1 ' + moment(date).fromNow()
						} else {
							return moment(date).fromNow();
						}
				}
			}
		},

		mounted() {
			this.getTime();
			this.procid = setInterval(() => {
				this.getTime()
			}, 1000);
		},

		beforeDestroy() {
			clearInterval(this.procid);
		},
	}
</script>

