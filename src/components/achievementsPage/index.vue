<template>
	<div v-if="achievements" class="achievements-page py-21">
		<div class="feed flex-column">
			<AchievementInstance v-for="a in achievements" :key="'achievement_id_' + a.id" v-bind="a" />
		</div>
	</div>
</template>

<script>
	import {mapState} from "vuex";
	import AchievementInstance from "@/components/achievementsPage/AchievementInstance";

	export default {
		name: "index",
		components: {AchievementInstance},
		computed: {
			...mapState('globalStore', {
				achievements: s => s.achievements
			})
		},
	}
</script>

<style lang="scss">
	.achievements-page {
		background: #ffffff;
	}
</style>