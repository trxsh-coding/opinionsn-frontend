<template>
	<div class="timestamp-block">

		<span v-if="transformedTime">{{transformed_time}}</span>
		<span v-if="shortTime">{{short_time}}</span>
		<span v-if="predictionTime">{{currentTime}}</span>
		<span v-if="fromNow">{{currentTime}}</span>

	</div>
</template>

<script>
	import {localString} from "../utils/localString";
	import moment from 'moment'
	import langMixin from './mixins/langMixin'
	import {mapState} from 'vuex'
	import translateKeywordMixin from "./mixins/translateKeywordMixin";
	import {SHORT_TIME_TIMESTAMP_REGEX} from "../constants";

	const pad = (num, len = 2, char = '0') => {
		let init = `${num}`;

		while (init.length < (len * char.length)) {
			init = `${char}${init}`
		}

		return init;
	};
	export default {
		name: "timeTrans",
		mixins: [langMixin, translateKeywordMixin],
		props: {
			time: {
				required: true
			},
			shortTime: {
				type: Boolean
			},
			fromNow: Boolean,
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


			 getTimeFromNow(lang = this._lang, dateObject, type, onPredictionEnd) {
				const parsedTime = moment(dateObject);
				const daysDiff = moment(new Date()).diff(dateObject, 'days');
				const weeksDiff = moment(new Date()).diff(dateObject, 'weeks');
				const hoursDiff = moment(new Date()).diff(dateObject, 'hours');
				const minsDiff = moment(new Date()).diff(dateObject, 'minutes');
				const secDiff = moment(new Date()).diff(dateObject, 'seconds');
				const duration = moment.duration(moment(dateObject).diff(new Date()));

				const timeFromNow = parsedTime.fromNow();

				const matchedRegex = timeFromNow.match(SHORT_TIME_TIMESTAMP_REGEX);

				let result = '';

				if (type === 'short') {
					if (secDiff < 0 && secDiff > -90) {
						lang === 'ru' ? (result = 'через 1мин') : (result = 'in 1min');
					} else if (secDiff > 0 && secDiff < 90) {
						lang === 'ru' ? (result = '1мин') : (result = '1min');
					} else if (minsDiff < -40 && minsDiff >= -90) {
						lang === 'ru' ? (result = 'через 1ч') : (result = 'in 1h');
					} else if (minsDiff > 40 && minsDiff <= 90) {
						lang === 'ru' ? (result = '1ч') : (result = '1h');
					} else if (hoursDiff < -19 && hoursDiff >= -36) {
						lang === 'ru' ? (result = 'через 1д.') : (result = 'in 1d.');
					} else if (hoursDiff > 19 && hoursDiff <= 36) {
						lang === 'ru' ? (result = '1д.') : (result = '1d.');
					} else if (daysDiff > 7) {
						if (weeksDiff === 1) {
							if (lang === 'ru') {
								result = `${weeksDiff}нед.`;
							} else {
								result = `${weeksDiff}wk.`;
							}
						} else {
							if (lang === 'ru') {
								result = `${weeksDiff}нед.`;
							} else {
								result = `${weeksDiff}wks.`;
							}
						}
					} else if (matchedRegex) {
						switch (matchedRegex[1]) {
							case 'мин':
							case 'min':
								result =
										timeFromNow.slice(0, matchedRegex.index).trim() + matchedRegex[1];
								break;
							case 'дн':
							case 'day':
								result =
										timeFromNow.slice(0, matchedRegex.index).trim() +
										`${matchedRegex[1].slice(0, 1)}.`;
								break;
							case 'ден':
								result = timeFromNow.slice(0, matchedRegex.index).trim() + 'д.';
								break;
							default:
								result =
										timeFromNow.slice(0, matchedRegex.index).trim() +
										matchedRegex[1].slice(0, 1);
						}
					} else {
						result = timeFromNow;
					}
				} else {
					if (type === 'prediction' && duration < 0) {
						if (typeof onPredictionEnd === 'function') {
							onPredictionEnd();
						}
						return ('closed');
					}

					if (secDiff < 0 && secDiff > -90) {
						lang === 'ru' ? (result = 'через 1 мин') : (result = 'in 1 min');
					} else if (secDiff > 0 && secDiff < 90) {
						lang === 'ru' ? (result = '1 мин назад') : (result = '1 min ago');
					} else if (minsDiff < -40 && minsDiff >= -90) {
						lang === 'ru' ? (result = 'через 1ч') : (result = 'in 1h');
					} else if (minsDiff > 40 && minsDiff <= 90) {
						lang === 'ru' ? (result = '1 ч назад') : (result = '1 h ago');
					} else if (hoursDiff > 19 && hoursDiff <= 36) {
						lang === 'ru' ? (result = '1 д. назад') : (result = '1 d. ago');
					} else if (hoursDiff < 0 && hoursDiff >= -24) {
						const hours = Math.abs(hoursDiff);
						const minutes = Math.abs(minsDiff) % 60;

						if (lang === 'ru') {
							result = `через ${hours}ч ${minutes}мин`;
						} else {
							result = `in ${hours}h ${minutes}min`;
						}
					} else if (daysDiff > 7) {
						result = parsedTime.format('LL');
					} else if (matchedRegex) {
						switch (matchedRegex[1]) {
							case 'мин':
							case 'min':
								result = timeFromNow.replace(matchedRegex[0], matchedRegex[1]);
								break;
							case 'дн':
							case 'day':
								result = timeFromNow.replace(
										matchedRegex[0],
										`${matchedRegex[1].slice(0, 1)}.`,
								);
								break;
							case 'ден':
								result = timeFromNow.replace(matchedRegex[0], 'д.');
								break;
							default:
								result = timeFromNow.replace(
										matchedRegex[0],
										matchedRegex[1].slice(0, 1),
								);
						}
					} else {
						result = timeFromNow;
					}
				}

				return result;
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

