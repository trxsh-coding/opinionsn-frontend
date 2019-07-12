<template>
	<div class="input-reusable">
		<lang-string
				v-show="!hide"
				class="input-placeholder"
				:title="inputPlaceholder"
		/>
		<input type="text"
		       v-model="value"
		       :style="inputStyle"
		       @change="inputValue(arguments[0].target.value)"
		       @focus="focusInput(true)"
		       @blur="eventOnBlur"
		       :class="{ focusedInput : active, validationStyle : validationError}"
		>
	</div>
</template>

<script>
	import langMixin from "../mixins/langMixin";
	import langString from "../langString";

	export default {
		name: "inputReusable",
		mixins: [langMixin],
		components: {langString},
		model: {
			prop: 'value',
			event: 'change'
		},
		props: {
			width: {
				type: [Number, String],
				default() {
					return '100%';
				}
			},
			height: {
				type: [Number, String],
				default() {
					return 'auto';
				}
			},
			inputPlaceholder: {
				type: String,
				default() {
					return 'Input'
				}
			},
			validationError: {
				type: Boolean,
				default() {
					return false;
				}
			}


		},
		data() {
			return {
				value: '',
				active: false,
				hide: false
			}
		},

		watch: {
			value(old) {
				old.length > 0 ? this.hide = true : this.hide = false;
			}
		},

		computed: {
			inputStyle() {
				let {width, height, handlePercentValue} = this;
				width = handlePercentValue(width);
				height = handlePercentValue(height);
				return {
					width: `${width}`,
					height: `${height}`,

				};
			}
		},
		methods: {
			focusInput(payload) {
				this.hide = true;
				this.active = payload;

			},
			inputValue(payload) {
				this.$emit('change', payload);
			},
			inputValidation(payload) {

				this.active = payload;
				if (this.value.length === 0) {
					this.validationError = true
				}

			},
			eventOnBlur() {
				this.hide = false;
				this.value = '';
				this.$emit('blur');
			},
			handlePercentValue(value) {

				if (value === undefined) return false;

				return `${value}`.slice(-1) === '%' ? value : value + 'px';

			},
		}
	}
</script>

<style lang="scss">
	.input-reusable {
		position: relative;

		.focusedInput {
			border-bottom-color: #4B97B4 !important;
		}

		.validationStyle {
			border-bottom-color: red !important;

		}

		.input-placeholder {

			position: absolute;
			/*<!--transform: translateY(-50%);-->*/
			/*<!--top: 50%;-->*/
			z-index: 100;

			font-family: Roboto, serif;
			font-style: normal;
			font-weight: normal;
			font-size: inherit;
			color: #747474;
		}

		input {
			position: relative;
			z-index: 200;
			background-color: transparent;
			font-size: inherit;
			outline: none;
			border-bottom-style: solid;
			border-bottom-color: #BCBEC3;
			border-bottom-width: 0.5px;
			border-top: none;
			border-right: none;
			border-left: 0;
			margin-bottom: 1px;
			padding-bottom: 4px;
		}
	}
</style>
