<template>
	<div class="user-page-statistics pl-60 pr-20">

		<div class="section-head flex-between">
			<lang-string class="title" :title="'statistics'" />
			<lang-string @click.native="statisticRoutePush(id)" class="description pointer" :title="'detailed_statistics'" />
		</div>
		<div class="statistic-cards mt-5">
<!--			<div-->
<!--				class="card flex-column flex-align-center mt-13"-->
<!--				v-for="(item, index) in itemsSorted"-->
<!--				v-show="!hidden || ((mobile && index < 3) ||  (!mobile && index < 4))"-->
<!--			>-->
			<div class="card flex-column flex-align-center mt-13"
			     v-for="(item, index) in itemsSorted"
			     v-show="((mobile && index < 3) ||  (!mobile && index < 4))">
				
				<lang-string class="title px-9 py-2 my-auto" :title="item.title" />
				<div class="flex-column flex-align-center pt-13">
					<circle-progress-bar-reusable :percent="item.percent" :size="78" bar-size="4"/>
					<span class="description mt-9"><span>{{item.correct_answers}}</span>/{{item.total_amount_of_answers}}</span>

				</div>
			</div>

		</div>

<!--		<span class="toggle-btn mt-12 pointer" v-show="!!itemsSorted && itemsSorted.length > 3" @click="hidden = !hidden">-->
<!--				<span v-show="hidden">+{{itemsSorted.length - 3}} категорий</span>-->
<!--				<span v-show="!hidden">свернуть</span>-->
<!--		</span>-->

	</div>
</template>

<script>
	import langString from "../../langString";
	import axios from 'axios'
	import CircleProgressBarReusable from "../../reusableСomponents/CircleProgressBarReusable";
	import {mapState} from "vuex";

	export default {
        name: "PageStatistics",
		components: {
        	CircleProgressBarReusable,
			langString
		},
		data() {
			return {
				items: null,
				hidden: true,
				mobile: this.$root.mobile
			}
		},
		computed: {
			
			...mapState("globalStore", {
				categories: ({ categories }) => categories
			}),

        	id() {
        		return this.$route.params.id
			},
			
			itemsSorted() {
				let items = [];
				
				switch (true) {
					case !this.items:
					case !this.categories:
					case !Object.keys(this.items).length:
					case !Object.keys(this.categories).length:
						return items;
				}
				
				
				Object.values(this.items.predictionStatisticGeneral).forEach(({categoryId, percentageOfCorrectAnswers, amountOfCorrectAnswers, totalAmountOfVoted}) => {
					
					if (categoryId === 0) return;
					
					items.push({
						title: this.categories[categoryId].name,
						percent: percentageOfCorrectAnswers,
						correct_answers: amountOfCorrectAnswers,
						total_amount_of_answers: totalAmountOfVoted
					});

				});
				
				items = items.sort(({correct_answers: a}, {correct_answers: b}) => {
					return b - a;
				});
				
				return items;
				
			},
			
		},
		methods: {
			statisticRoutePush(id){
				this.$router.push({name:'statistic',params:{id}})
			}
		},
		mounted(){
			
			this.$store.dispatch(`catalogList/list`).then(() => {
				axios.get(`${process.env.VUE_APP_MAIN_API}/rest/v1/user/statistic/${this.id}`)
					.then(res => {
						if (res.status === 200) {
							this.$store.commit('globalStore/updateStores', res.data, {root: true});
							this.items = res.data;
						}
						
					})
			});

		}
    }
</script>

<style lang="scss">

	.user-page-statistics {

		display: flex;
		flex-direction: column;

		* {
			font-family: Roboto;
			font-style: normal;
		}

		.section-head {

			.title {
				font-weight: 500;
				font-size: 14px;
				color: #1A1E22;
			}

			.description {
				font-family: Helvetica Neue, Roboto;
				font-size: 10px;
				color: #BEC0C5;
			}

		}

		.statistic-cards {

			display: flex;
			justify-content: space-around;

			flex-wrap: wrap;
			margin: 0 -15px;

			.card {
				justify-content: space-between;
				margin: 0 10px;

				.title {
					background: #BCBEC3;
					border-radius: 15px;
					width: max-content;

					font-weight: normal;
					font-size: 10px;
					text-transform: uppercase;
					color: #FFFFFF;
					text-align: center;
					word-break: keep-all;
				}

				.description {
					font-style: normal;
					font-weight: normal;
					font-size: 13px;
					color: #BEC0C5;

					span {
						font-weight: bold;
						color: #1A1E22;
					}
				}

			}

		}

		.toggle-btn {
			font-family: Helvetica Neue, Roboto;
			font-size: 10px;
			color: #BEC0C5;
			width: fit-content;
		}

	}

</style>
