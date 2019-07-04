<template>
	<div class="user-page-statistics">
		<div class="section-name">
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

		.section-name {

			.title {



			}

			.description {



			}

		}

	}

</style>