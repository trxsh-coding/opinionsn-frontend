<template>
	<div class="user-statistic" :class="{'bg-white pt-18': !mobile, 'pt-51': mobile}">
		<div class="header-block pl-60">
			<picture-reusable
					class="pointer"
					:size="72"
					avatar
					:id="user.id"
					:img="publicPath + user.path_to_avatar"
					text-layout="right"
					rounded>
				<template #title>
                  <span class="avatar-username pl-15">
                       {{user.username}}
                  </span>
				</template>
			</picture-reusable>
		</div>

		<category-select @on-select="setCategoryId" class="pl-60 pr-4" :class="{'mt-14': !mobile, 'mt-15': mobile}"
		                 :current="categoryId"/>

		<div class="select-block pl-69" :class="{'mt-15': !mobile, 'mt-18': mobile}">
			<dropdown-list-reusable with-arrow class="mr-22" click-close>
				<template>
					<lang-string :title="periods[periodId].value"/>
				</template>


				<template #items>
					<li class="w-max ws-no-warp pointer" v-for="({value}, index) in periods" @click="setRange(index)" :key="index">
						<lang-string :title="value"/>
					</li>
				</template>
			</dropdown-list-reusable>
			<dropdown-list-reusable with-arrow click-close>
				<template>
					<lang-string :title="types[typeId].value"/>
				</template>


				<template #items>
					<li class="w-max ws-no-warp pointer" v-for="({value}, index) in types" @click="setType(index)">
						<lang-string :title="value"/>
					</li>
				</template>
			</dropdown-list-reusable>
		</div>
		<div class="amount-voted-block pl-69 mt-12 flex-between">
			<div class="amount__item">
				<lang-string :title="'you_voted_in'" /> <span> {{statistic.totalAmountVoted}}</span>  <lang-string :title="'polls'" />
			</div>
			<div class="leader-list pr-20">
				<lang-string @click.native="$router.push({name: 'rating'})" :title="'leader_list'" />
			</div>
		</div>
		<div class="statistic-section">
			<apexchart type="bar" :options="chartOptions" :series="series"/>
		</div>
	</div>

</template>

<script>
	import VueApexCharts from 'vue-apexcharts'
	import langString from "../langString";
	import PictureReusable from "../reusableСomponents/PictureReusable";
	import {mapState} from 'vuex'
	import CategorySelect from "../reusableСomponents/categorySelect";
	import DropdownListReusable from "../reusableСomponents/DropdownListReusable";
    import localString from "../../utils/localString";
    import axios from 'axios';

	export default {
		name: "statisticInstance",
		components: {DropdownListReusable, CategorySelect, PictureReusable, langString, apexchart: VueApexCharts},
		data() {
			return {
				publicPath: process.env.VUE_APP_MAIN_API,
				periods: [
					{
						value: 'week'
					},
					{
						value: 'month'
					},
					{
						value: '3_months'
					},
				],
				types: [
					{
						value: 'poll'
					},
					{
						value: 'prediction'
					},
				],
				periodId: 0,
				categoryId: 1,
				typeId: 0,
				statistic: [],

				chartOptions: {
					chart: {
						toolbar: {
							show: false,
							tools: {
								download: false
							}
						},
					},
					plotOptions: {
						bar: {
							horizontal: false,
							columnWidth: '15%',
							endingShape: 'rounded'
						},
					},
					dataLabels: {
						enabled: false
					},
					stroke: {
						show: true,
						width: 5,
						colors: ['transparent']
					},

					xaxis: {
						categories: [],
					},
					yaxis: {
						min: 0,
						max: 10,
						decimalsInFloat: 1,
						floating: false,
					},
					fill: {
						opacity: 1

					},
					colors:['#4B97B4', '#FF5454'],
					tooltip: {
						y: {
							formatter: function (val) {
								return val
							}
						}
					}
				}
			}
		},
		watch: {

			cXaxis(current, newOne) {
				this.chartOptions = {
					...this.chartOptions,
					xaxis: current
				};
			},
			typeId(current, newOne) {
				if (current !== newOne) this.getUserStatistic()
			},
			periodId(current, newOne) {
				console.log(current)
				if (current !== newOne) this.getUserStatistic()
			},
			categoryId(current, newOne) {
				console.log(current)
				if (current !== newOne) this.getUserStatistic()
			}

		},
		computed: {
			...mapState('globalStore', {
				users: ({users}) => users,
			}),

            ...mapState('lang',{
                lang : state => state.locale
            }),


			mobile() {
				return this.$root.mobile;
			},

			user_id() {
				return this.$route.params.id
			},

			user() {
				let {users, user_id} = this;
				return users[user_id];
			},

			series() {
				let {pillarsPollDTO = {}} = this.statistic;
				let {types, typeId} = this;
				let series = [
					{
						data: null,
						name: null
					}
				];
				if (typeId === 1) {

					let correctAnswers = Object.values(pillarsPollDTO).map(({totalAmountCorrectAnswers: n}) => (n === 0) ? null : n);
					let inCorrectAnswers = Object.values(pillarsPollDTO).map(({totalAmountIncorrectAnswers: n}) => (n === 0) ? null : n);

					series[0] = {
						data: correctAnswers,
						name: 'correct answers'
					};
					series[1] = {
						data: inCorrectAnswers,
						name: 'incorrect answers'
					};

				} else {
					let pollAnsweredAmount = Object.values(pillarsPollDTO).map(({totalAmountVoted: n}) => (n === 0) ? null : n);
					series[0] = {
						data: pollAnsweredAmount,
						name: 'Voted'
					};

				}

				return series;


			},

			cXaxis() {
				if(this.periodId > 1) {
					return {

						categories: this.calculatedRangeMonths()

					}
				} else {
					return {
						categories: this.rangeInstance.reverse(),
					}


				}


			},

            lstr(str) {
                return localString(this.lang, str);
            },

			rangeInstance() {
				let {pillarsPollDTO = {}} = this.statistic;
				return Object.values(pillarsPollDTO).map(({day}) => day.toString());
			},
		},

		methods: {

			calculatedRangeMonths(){

				let {pillarsPollDTO = {}} = this.statistic;

				let monthArray =  Object.values(pillarsPollDTO).map(({month}) => month);

				return Array.from(new Set(monthArray)).map( m => this.parseMonth(m))
			},

			parseMonth(num = '') {

			    let m = num;

				switch (num) {
                    case 1:
                        m = 'january';
                        break;
                    case 2:
                        m = 'february';
                        break;
                    case 3:
                        m = 'march';
                        break;
                    case 4:
                        m = 'april';
                        break;
                    case 5:
                        m = 'may';
                        break;
                    case 6:
                        m = 'june';
                        break;
                    case 7:
                        m = 'july';
                        break;
                    case 8:
                        m = 'august';
                        break;
                    case 9:
                        m = 'september';
                        break;
                    case 10:
                        m = 'october';
                        break;
                    case 11:
                        m = 'november';
                        break;
                    case 12:
                        m = 'december';
                        break;
                    default:
                        return '';
                }

                // return this.lstr(m);
                return m;
			},

			setRange(index) {
				this.periodId = index;
			},

			setType(index) {
				this.typeId = index;
			},

			setCategoryId({id}) {
				this.categoryId = id;
			},

			getUserStatistic() {
				let {typeId, categoryId, periodId, types, user_id} = this;
				axios.get(`${process.env.VUE_APP_MAIN_API}/rest/v1/user/statistic/detail/${types[typeId].value}/${user_id}`, {
					params: {
						category: categoryId,
						period: periodId
					}
				})
					.then(response => {
						if (response.status === 200) {
							this.statistic = response.data;

						}
					})
			}
		},
		mounted() {
			this.getUserStatistic()
		}

	}
</script>

<style lang="scss">
	.user-statistic {
		border-radius: 6px;
		.amount-voted-block {
			font-family: Helvetica Neue;
			font-size: 11px;
			color: #BEC0C5;


		}
		.avatar-username {
			font-family: Roboto;
			font-style: normal;
			font-weight: 500;
			font-size: 14px;
			color: #1A1E22;
		}

		@media only screen and (max-width: 400px) {
			.amount-voted-block {
				span {
					font-size: 10px;
				}
			}
		}

	}
</style>