<template>
	<div
			class="input-reusable"
			:style="inputStyle">

		<lang-string
				v-show="!hide"
				class="input-placeholder"
				:title="inputPlaceholder"
		/>
		<input type="text"
			   v-if="!textarea"
		       v-model="value"
		       @focus="focusInput(true)"
		       :class="[{ focusedInput : active && withUnderline, validationStyle : validationError}, inputClass]"
		>
		<textarea
				ref="customTextarea"
			   v-if="textarea"
			   v-model="value"
			   @focus="focusInput(true)"
			   :class="[{ focusedInput : active && withUnderline, validationStyle : validationError}, inputClass]"
				:style="textareaHeight"
		>
		</textarea>
		<div class="action-btns" v-if="withActionButtons">
			<icon-base
					@click.native="clearInput"
					class="pointer"
					fill="none"
					width="17"
					height="18"
					viewBox="0 0 17 18"
					icon-name="close-btn">
				<icon-close />
			</icon-base>
			<lang-string
					@click.native="clearInput"
					class="cancel-btn pointer"
					title="cancel"
			/>
		</div>
	</div>
</template>

<script>
	import langMixin from "../mixins/langMixin";
	import langString from "../langString";
	import IconBase from "../icons/IconBase";
	import IconClose from "../icons/IconClose";

	export default {
		name: "inputReusable",
		mixins: [langMixin],
		components: {
			langString,
			IconBase,
			IconClose
		},
		model: {
			prop: 'value',
			event: 'change'
		},
		props: {
			inputClass: String,
			withActionButtons: {
				type: Boolean,
				default() {
					return false
				}
			},
			withUnderline: {
				type: Boolean,
				default() {
					return false
				}
			},
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
			scrollHeight: {
				type: [Number, String],
				default() {
					return this.height;
				}
			},
			textarea: {
				type:Boolean,
				default() {
					return false;
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
				hide: false,
				newHeight: null

			}
		},

		watch: {
			value(old) {
				old.length > 0 ? this.hide = true : this.hide = false;
				this.$emit('change', this.value);
			},

			parent_value(old) {
				//NOTE:  Не знаю как вписать в watch this.$attrs.value, поэтому сделал пока так
				if (old !== undefined && old.length === 0) this.clearInput();
			}
		},

		computed: {
			inputStyle() {
				let {width, height, handleCssValue} = this;
				width = handleCssValue(width);
				height = handleCssValue(height);
				return {
					width: `${width}`,
					height: `${height}`,

				};
			},

			parent_value() {
				return this.$attrs.value;
			}
		},
		methods: {



			focusInput(payload) {
				this.hide = true;
				this.active = payload;
			},

			clearInput() {
				this.value = '';
			},

			// inputValue(payload) {
			// 	this.$emit('change', payload);
			// },

			inputValidation(payload) {
				this.active = payload;
				if (this.value.length === 0) {
					this.validationError = true
				}
			},

			// eventOnBlur() {
			// 	this.hide = false;
			// 	this.value = '';
			// 	this.$emit('blur');
			// },

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

		mounted(){
			console.log(this.calculateHeight(), '===TEST===')
			console.log(this.height)
		},
	}
</script>

<style lang="scss">
	.input-reusable {
		position: relative;

		.action-btns {
			position: absolute;
			z-index: 200;
			display: flex;
			top: 0;
			right: 20px;
			.cancel-btn {
				margin-left: 19px;
				color: #1A1E22;
			}
		}

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
			width: 100%;
			position: relative;
			resize: none;
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
		textarea {
			overflow: auto;
			height: auto;
		}
	}
</style>
