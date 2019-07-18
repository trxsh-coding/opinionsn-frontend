<template>
	<div class="user-page-statistics pl-60 pr-20">

		<div class="section-head flex-between">
			<lang-string class="title" :title="'statistics'" />
			<lang-string class="description" :title="'detailed_statistics'" />
		</div>
		<div class="statistic-cards mt-5">
			<div
				class="card flex-column flex-align-center mt-13"
				v-for="(item, index) in itemsSorted"
				v-show="!hidden || ((mobile && index < 3) ||  (!mobile && index < 4))"
			>
				<lang-string class="title px-9 py-2 my-auto" :title="item[0]" />
				<div class="flex-column flex-align-center pt-13">
					<circle-progress-bar-reusable :percent="item[1]" :size="78" bar-size="4"/>
					<span class="description mt-9"><span>{{item[2]}}</span>/{{item[3]}}</span>

				</div>
			</div>

		</div>

		<span class="toggle-btn mt-12 pointer" v-show="!!itemsSorted && itemsSorted.length > 3" @click="hidden = !hidden">
				<span v-show="hidden">+{{itemsSorted.length - 3}} категорий</span>
				<span v-show="!hidden">свернуть</span>
		</span>

	</div>
</template>

<script>
	import langString from "../../langString";
	import axios from 'axios'
	import CircleProgressBarReusable from "../../reusableСomponents/CircleProgressBarReusable";

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

        	id:function () {

        		return this.$route.params.id

			},
			itemsSorted() {

        		if (!this.items) return [];

        		let items = [];
				Object.entries(this.items).forEach((value, i) => {
					let item = value.flat(1);
					if (!!item[1]) items[i] = item;
				});

				items = items.sort((a, b) => {

					if (a[1] < b[1]) {
						return 1;
					}

					if (a[1] > b[1]) {
						return -1;
					}

					return 0;
				});


        		return items;
			}

		},
		mounted(){

			axios.get(`${process.env.VUE_APP_MAIN_API}/rest/getStatisticsOnCategories/${this.id}`)
					.then((response) => {
						if (response.status === 200) {
							this.$store.commit('globalStore/updateStores', response.data, {root: true});
							console.log((response.data))
							this.items = response.data


						}

					})

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
