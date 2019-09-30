<template>
	<div v-if="payload && payload.length" class="achievements-page py-21">
		<div class="feed flex-column">
			<AchievementInstance v-for="a in payload" :key="'achievement_id_' + a.id" v-bind="a" />
		</div>
	</div>
</template>

<script>
	import {mapState} from "vuex";
	import AchievementInstance from "@/components/achievementsPage/AchievementInstance";

	export default {
		name: "AchievementsPage",
		components: {AchievementInstance},
		computed: {
			...mapState('achievementsPage', {
				payload: s => s.items
			})
		},
		mounted() {
			this.$store.dispatch(`achievementsPage/list`);
		}
	}
</script>

<style lang="scss">
	.achievements-page {
		background: #ffffff;
	}
</style>