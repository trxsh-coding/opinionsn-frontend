<template>
	<div class="user-page-statistics pl-60 pr-20 mt-18">

		<div class="section-name flex-between">
			<lang-string class="title" :title="'statistics'" />
			<lang-string class="description" :title="'detailed_statistics'" />
		</div>
		<div class="statistic-section">
			<!--<circle-progress-bar-reusable :percent="" size="70" bar-size="2"/>-->
		</div>

	</div>
</template>

<script>
	import langString from "../../langString";
	import axios from 'axios'
	import CircleProgressBarReusable from "../../reusableСomponents/CircleProgressBarReusable";


	export default {
        name: "PageStatistics",
		components: {CircleProgressBarReusable, langString},
		data() {
			return {
				items: null
			}
		},
		computed: {

        	id:function () {

        		return this.$route.params.id

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

		.section-name {

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

	}

</style>
