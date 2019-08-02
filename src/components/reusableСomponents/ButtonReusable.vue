<template>

	<div
			class="button-reusable"
			:class="{'active': active}"
			:style="buttonStyle">
		<div
				class="btn flex-align-center"
				:class="{'active': active}"
				:style="{fontSize: `${fontSize}px`}"
				v-if="button_type === 'default'">
			<lang-string v-if="!!description" :title="description"/>
			<slot/>
		</div>

		<div
				class="btn flex-column flex-align-center"
				:class="{'active': active}"
				v-if="button_type === 'underline'">
			<lang-string

					:style="underline_btn.span"
					:title="description"/>
			<div
					:style="underline_btn.underline"
					class="underline" ></div>
		</div>
	</div>

</template>

<script>
	import langString from '../langString'

	export default {
		name: "ButtonReusable",
		components: {langString},
		props: {
			bgColor: {
				type: String,
				default: function () {
					return '#4B97B4';
				}
			},
			color: {
				type: String,
				default: function () {
					return '#000000';
				}
			},
			activeColor: {
				type: String,
				default: function () {
					return '#4B97B4';
				}
			},
			activeBgColor: {
				type: String,
				default: function () {
					return 'transparent';
				}
			},
			activeFontSize: {
				type: Number,
			},

			fontSize: {
				type: [Number, String],
			},
			borRad: {
				type: [String, Number],
				default: function () {
					return '0';
				}
			},
			textTransform: {
				type: String,
				default: function () {
					return 'capitalize';
				}
			},
			description: {
				type: String
			},
			rounded: Boolean,
			button_type: {
				type: String,
				default: function () {
					return 'default';
				}
			},
			active: Boolean
		},
		computed: {
			buttonStyle() {
				let {
					bgColor,
					borRad,
					rounded,
					color,
					active,
					activeColor,
					activeBgColor
				} = this;

				bgColor = !active ? {backgroundColor: bgColor} : {backgroundColor: activeBgColor};
				color = !active ? { color } : { color: activeColor };

				if (rounded) {
					borRad = {borderRadius: '50%'}
				} else {
					borRad = (`${borRad}`.slice(-1) === '%') ? {borderRadius: `${borRad}`} : {borderRadius: `${borRad}px`};
				}

				return {
					...bgColor,
					...borRad,
					...color
				}
			},

			underline_btn() {
				let {active, activeFontSize, fontSize, activeColor, color} = this;
				let current_color = active ? activeColor : color;
				let current_font_size = active ? activeFontSize : fontSize;
				let current_font_weight = active ? '500' : 'normal';
				let current_font_color = active ? activeColor : color;

				return {

					span: {
						color: current_color,
						fontSize:`${current_font_size}px`,
						fontWeight:`${current_font_weight}`,
						fontColor: `${current_font_color}`,
						textTransform: `${this.textTransform}`
					},
					underline: {
						backgroundColor: current_color
					}
				}
			},

		},
	}
</script>

<style lang="scss">
	.button-reusable {
		cursor: pointer;

		.btn {
			cursor: pointer;
			outline: none;
			border: none;
			width: fit-content;
			height: fit-content;
			color: inherit;
			/*padding: 0 9px;*/
			font-size: 11px;
		}

		.underline {
			visibility: hidden;
			height: 2px;
			width: 100%;
			background-color: #4B97B4;
			box-shadow: 0 0 15px rgba(56, 56, 56, 0.05);
			border-radius: 2px;
		}

		span {
			text-transform: uppercase;
			font-family: Roboto, serif;
			font-style: normal;
			font-weight: normal;
			color: inherit;
			/*color: #FFFFFF;*/
		}

		&:active {
			filter: hue-rotate(-10deg);
		}

		&.active {

			.underline {
				visibility: visible;
			}
		}

	}
</style>
