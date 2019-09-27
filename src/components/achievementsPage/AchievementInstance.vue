<template>
	<div class="achievement flex-align-center p-12">
		<IconPollFeed v-if="is_gained" fill="limegreen"/>
		<div v-else class="not-gained-icon"></div>
		<span class="name ml-7">{{name}}</span>
	</div>
</template>

<script>
	import IconPollFeed from "@/components/icons/navigation/IconPollFeed";

	export default {
		name: "AchievementInstance",
		components: {IconPollFeed},
		props: {
			id: Number,
			user_id: Number,
			name: String,
			is_gained: Boolean,
			is_checked: Boolean
		}
	}
</script>

<style lang="scss">

	.achievement {
		border: 1px solid #BCBEC3;

		.name {
			font-family: Roboto;
			font-style: normal;
			font-weight: 500;
			font-size: 15px;
			color: #1A1E22;
		}

		.not-gained-icon {
			width: 18px;
			height: 18px;
			border: 1.5px solid #d6cf00;
			border-radius: 50%;
		}
	}

</style>