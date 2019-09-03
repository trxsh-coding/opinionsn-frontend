<template>
	<label class="re-switcher">
		<span class="re-caption" :class="captionClass">{{caption}}</span>
		<span class="label-switcher" :style="switcher_style">
			<span class="indicator" :style="[indicator_style, trigger]"></span>
		</span>
		<input
				v-show="false"
				type="checkbox"
				:checked="value"
				@input="$emit('input', $event.target.checked)">
	</label>
</template>

<script>
	export default {
		name: "ReSwitcher",
		props: {
			value: Boolean,
			caption: {
				type: [String, Number]
			},
			captionClass: {
				type: String,
				default: ''
			},
			params: {
				type: Object,
				default() {
					return {}
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
				
			},
		},
		computed: {
			
			c_params() {
				return {
					width: 30,
					height: 15,
					color: '#4A76A8',
					...this.params
				}
			},
			
			trigger() {
				return this.value
					? {
						right: '1px !important',
						background: this.c_params.active_color || this.c_params.color,
						transition: '300ms'
					}
					: { transition: '300ms' }
			},
			
			switcher_style() {
				let {width, height, padding = "0", border = 'none'} = this.c_params;
				width = this.handleCssValue(width);
				height = this.handleCssValue(height);
				return {width, height, padding, border};
			},
			
			indicator_style() {
				let {width, height, color} = this.c_params;
				height = this.handleCssValue(height - 2);
				width = this.handleCssValue(Math.round(width / 2) - 2);
				return {
					width,
					height,
					background: color,
					right: `calc(100% - ${width})`
				};
			}
		}
	}
</script>

<style lang="scss">
	.re-switcher {
		display: flex;
		width: fit-content;
		align-items: center;
		cursor: pointer;
		
		.re-caption {
			font-family: Roboto, sans-serif;
			font-style: normal;
			font-weight: 300;
			font-size: 16px;
			color: #333333;
			height: fit-content;
			user-select: none;
		}
		
		.label-switcher {
			position: relative;
			background: #F2F2F2;
			box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.1);
			border-radius: 10px;
			
			.indicator {
				position: absolute;
				top: 50%;
				right: calc(100% - 14px);
				transform: translateY(-50%);
				border-radius: 50%;
				/**/
				transition: 300ms;
			}
		}
	}
</style>