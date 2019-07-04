<template>
    <div class="badge-reusable" :style="badgeStyle">
		<span v-if="counter">
			+{{handledCounter}}
		</span>
		<slot v-else>

		</slot>
	</div>
</template>

<script>
    export default {
        name: "BadgeReusable",
		props: {
        	counter: {
        		type: Number
			},
			size: {
        		type: Number,
				required: true
			},
			color: {
        		type: String,
				default: function () {
					return '#C4C4C4';
				}
			},
			fontColor: {
        		type: String,
				default: function () {
					return '#ffffff';
				}
			},
			fontSize: {
        		type: Number,
				default: function () {
					return 10;
				}
			},
		},
		computed: {
			handledCounter() {
				let { counter } = this;
				if (counter) {
					return counter > 9 ? 9 : counter;
				}
			},
			badgeStyle() {
				let { size, color, fontColor, fontSize } = this;
				return {
					width: `${size}px`,
					height: `${size}px`,
					backgroundColor: `${color}`,
					fontSize: `${fontSize}px`,
					color: `${fontColor}`
				};
			}
		},
    }
</script>

<style lang="scss">
	.badge-reusable {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		cursor: pointer;

		span {
			font-family: Roboto;
			font-style: normal;
			font-weight: normal;
			font-size: inherit;
			color: inherit;
		}
	}
</style>