<template>
	<div class="flex-column">
		<slot></slot>
		<transition name="error">
			<div
					v-if="has_error"
					class="popup-error flex-column"
					:class="spanClass"
					:style="[computed_width]">
				<span v-for="error in errors" v-show="typeof error === 'string'">{{error}}</span>
			</div>
		</transition>
	</div>
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
			errors: {
				type: [Object, Boolean],
				default() {
					return {};
				}
			},
			spanClass: {
				type: String,
				default() {
					return ''
				}
			}
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
			},
			
			has_error() {
				return Object.values(this.errors).some(error => error)
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