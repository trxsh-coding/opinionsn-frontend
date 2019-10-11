<template>
	<div class="achievement flex-align-center p-12" :class="{'gained': _checked}">
		<IconPollFeed v-if="_checked" fill="limegreen"/>
		<div v-else-if="!_checked" class="not-gained-icon"></div>
		<span class="name ml-12">{{name}}</span>
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
			_gained: Boolean,
			_checked: Boolean
		}
	}
</script>

<style lang="scss">

	.achievement {
		border: 1px solid #BCBEC3;

		&.gained {
			.name {
				color: #1A1E22;
			}
		}

		.name {
			font-family: Roboto;
			font-style: normal;
			font-weight: 500;
			font-size: 15px;
			color: #ADAFB3;
		}

		.not-gained-icon {
			width: 18px;
			height: 18px;
			border: 1.5px solid #BCBEC3;
			border-radius: 50%;
		}
	}

</style>