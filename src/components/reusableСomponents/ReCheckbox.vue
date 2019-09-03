<template>
	<label class="re-checkbox">
		<span class="caption" :class="captionClass">{{caption}}</span>
		<span class="label-checkbox" :style="checkbox_style">
			<slot v-if="value">
				<icon-base class="mb-1" width="10" height="8" viewBox="0 0 10 8"
				           fill="none" xmlns="http://www.w3.org/2000/svg">
					<icon-check-mark />
				</icon-base>
			</slot>
		</span>
		<input
				v-show="false"
				type="checkbox"
				:checked="value"
				@input="$emit('input', $event.target.checked)">
	</label>
</template>

<script>
	import IconBase from "@/components/icons/IconBase";
	import IconCheckMark from "@/components/icons/IconCheckMark";
	export default {
		name: "ReCheckbox",
		components: {IconCheckMark, IconBase},
		props: {
			value: Boolean,
			caption: {
				type: [String, Number]
			},
			captionClass: {
				type: String,
				default: ''
			},
			size: [Number, String],
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
					width: 20,
					height: 20,
					borderRadius: 4,
					border: '1px solid #000000',
					...this.params,
					...this.c_size
				}
			},
			
			c_size() {
				return {
					width: this.size,
					height: this.size
				}
			},
			
			checkbox_style() {
				let {width, height, border, borderRadius = 0} = this.c_params;
				width = this.handleCssValue(width);
				height = this.handleCssValue(height);
				borderRadius = this.handleCssValue(borderRadius);
				return {width, height, border, borderRadius};
			},

		}
	}
</script>

<style lang="scss">
	.re-checkbox {
		display: flex;
		width: fit-content;
		align-items: center;
		cursor: pointer;
		
		.caption {
			font-family: Roboto, sans-serif;
			font-style: normal;
			font-weight: 300;
			font-size: 16px;
			color: #333333;
			height: fit-content;
			user-select: none;
		}
		
		.label-checkbox {
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			background: #ffffff;
		}
	}
</style>