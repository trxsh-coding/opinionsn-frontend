<template>
	<div v-if="isLoaded" class="achievements-page flex-column br-6 py-15 px-21">
		<span class="title mx-auto">{{lstr('achievements_page')}}</span>
		<div class="feed flex-column mt-12">
			<AchievementInstance v-for="(a, i) in achievements" class="br-6" :class="{'mt-7': i}"
			                     :key="'achievement_name_' + a.name" v-bind="a" />
		</div>
	</div>
</template>

<script>
	import {mapState} from "vuex";
	import AchievementInstance from "@/components/achievementsPage/AchievementInstance";
	import langMixin from "@/components/mixins/langMixin";

	export default {
		name: "AchievementsPage",
		components: {AchievementInstance},
		mixins: [langMixin],
		data() {
			return {
				achievements: [],
				isLoaded: false
			}
		},
		async mounted() {
			this.achievements = await this.$store.dispatch(`achievementsPage/getAchievementList`);
			this.isLoaded = true;
		}
	}
</script>

<style lang="scss">
	.achievements-page {
		background: #ffffff;
		font-family: Roboto;
		font-style: normal;

		& > {
			.title {
				font-weight: bold;
				font-size: 20px;
				color: #4B97B4;
			}
		}
	}
</style>