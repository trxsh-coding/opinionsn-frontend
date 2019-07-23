<template>
	<transition name="error">
		<div
				v-if="errorText"
				class="popup-error"
		        :style="[computed_width]">
			<span>{{errorText}}</span>
		</div>
	</transition>
</template>

<script>
	export default {
		name: "PopupErrorReusable",
		props: {
			width: {
				type: [String, Number],
				default() {
					return '100%';
				}
			},
			errorText: [String, Boolean]
		},
		methods: {
			handleCssValue(value) {
				switch (true) {
					case `${value}`.slice(-1) === '%':
						return value;
					case !isNaN(value):
						return value + 'px';
					default:
						return value;
				}
			}
		},
		computed: {
			computed_width() {
				return {
					width: `${this.handleCssValue(this.width)}`
				}
			}
		},
	}
</script>

<style lang="scss">
	.popup-error {
		display: flex;
		align-items: center;
		
		* {
			color: #f56c6c;
			font-size: 12px;
		}
	}
	
	.error-enter-active,
	.error-leave-active {
		transition: opacity 0.3s;
	}
	
	.error-enter,
	.error-leave-to {
		opacity: 0;
	}
	
</style>