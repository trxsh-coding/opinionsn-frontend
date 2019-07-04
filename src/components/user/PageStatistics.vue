<template>
	<div class="user-page-statistics pl-60 pr-20 mt-18">

		<div class="section-name flex-between">
			<lang-string class="title" :title="'statistics'" />
			<lang-string class="description" :title="'detailed_statistics'" />
		</div>


	</div>
</template>

<script>
	import langString from "../langString";



	export default {
        name: "PageStatistics",
		components: {
			langString
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