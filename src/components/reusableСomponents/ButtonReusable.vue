<template>

	<div
			class="button-reusable"
			:class="{'active': active}"
			:style="buttonStyle">
		<div
				class="btn flex-align-center"
				:class="{'active': active}"
				v-if="button_type === 'default'">
			<lang-string :title="description"/>
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
			borRad: {
				type: [String, Number],
				default: function () {
					return '0';
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
				let {bgColor, borRad, rounded} = this;

				bgColor = {backgroundColor: `${bgColor}`};

				if (rounded) {
					borRad = {borderRadius: '50%'}
				} else {
					borRad = (`${borRad}`.slice(-1) === '%') ? {borderRadius: `${borRad}`} : {borderRadius: `${borRad}px`};
				}

				return {
					...bgColor,
					...borRad
				}
			},
			underline_btn() {
				let { color, activeColor, active } = this;

				let current_color = active ? activeColor : color;

				return {
					span: {
						color: current_color
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
			/*padding: 0 9px;*/
			font-size: 13px;
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
			font-size: inherit;
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
