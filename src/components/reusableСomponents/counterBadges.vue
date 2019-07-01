<template>

	<div class="counter-badges flex">

		<div class="explains-block flex-align-center mr-9">
			<icon-base
				fill="BEC0C5"
				width="13"
				height="10"
				viewBox="0 0 13 10"
				icon-name="check">
				<icon-check></icon-check>
			</icon-base>

			<span class="ml-6">{{poll.total_amount_of_votes}}</span>
		</div>

		<div v-if="!short" class="comments-block flex-align-center mr-9">
			<icon-base
				fill="BEC0C5"
				width="13"
				height="13"
				viewBox="0 0 13 13"
				icon-name="baloon">
				<icon-baloon></icon-baloon>
			</icon-base>

			<span class="ml-6">{{poll.total_amount_of_comments}}</span>
		</div>

		<div v-if="poll.type_of_poll === 1 || poll.type_of_poll === 2" class="comments-block flex-align-center mr-9">
			<icon-base
				fill="BEC0C5"
				width="13"
				height="13"
				viewBox="0 0 13 13"
				icon-name="clocks">
				<icon-clocks></icon-clocks>
			</icon-base>

			<span class="ml-6">
				<time-trans :time="poll.end_date"></time-trans>
			</span>
		</div>

		<div v-if="!short && poll.type_of_poll === 2" class="comments-block flex-align-center">
			<icon-base
				fill="BEC0C5"
				width="13"
				height="15"
				viewBox="0 0 13 15"
				icon-name="bag">
				<icon-bag></icon-bag>
			</icon-base>

			<span class="ml-6">{{poll.fund}}</span>
		</div>

	</div>

</template>

<script>
	import IconBase from "../icons/IconBase";
	import IconCheck from "../icons/IconCheck";
	import IconBaloon from "../icons/IconBaloon";
	import IconClocks from "../icons/IconClocks";
	import IconBag from "../icons/IconBag";
	import TimeTrans from "../timeTrans";

    export default {
        name: "counterBadges",
		props: {
        	poll: {
        		type: Object,
				required: true
			},
			short: {
        		type: Boolean,
				default: function () {
					return false;
				}
			}
		},
		components: {
			TimeTrans,
			IconBase,
			IconCheck,
			IconBaloon,
			IconClocks,
			IconBag
		}
    }
</script>

<style lang="scss">

</style>