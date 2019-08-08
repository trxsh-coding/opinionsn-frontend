<template>
	<label
			class="input-reusable"
			:style="inputStyle">
		
		<lang-string
				v-show="!hide && !!inputPlaceholder"
				class="input-placeholder"
				:title="inputPlaceholder"
		/>
		
		<input :type="inputType"
		       class="input"
		       v-if="input"
		       v-model="value"
		       @change="inputValue(arguments[0].target.value)"
		       @focus="focusInput(true)"
		       @blur="!withoutBlur && focusInput(false)"
		       :class="[{ focusedInput : active && withUnderline, validationStyle : validationError}, inputClass]"
		>
		
		<textarea
				ref="textareaRef"
				v-if="textarea"
				v-model="value"
				rows="1"
				@focus="focusInput(true)"
				@blur="!withoutBlur && onBlurAction(index)"
				class="primary-font textarea"
				:class="[{ focusedInput : active && withUnderline, validationStyle : validationError}, inputClass]"
		>
		</textarea>
		
		<date-pick
				class="date-pick"
				v-if="datePicker"
				v-model="value"
				@change="inputValue(arguments[0].target.value)"
				:format="'YYYY-MM-DD HH:mm'"
				:pickTime="true">
		
		</date-pick>
		<div class="action-btns" v-if="withActionButtons">
			<icon-base
					@click.native="clearInput"
					class="pointer"
					fill="none"
					width="17"
					height="18"
					viewBox="0 0 17 18"
					icon-name="close-btn">
				<icon-close/>
			</icon-base>
			<lang-string
					@click.native="clearInput"
					class="cancel-btn pointer"
					title="cancel"
			/>
		</div>
	</label>
</template>

<script>
	import langMixin from "../mixins/langMixin";
	import langString from "../langString";
	import IconBase from "../icons/IconBase";
	import IconClose from "../icons/IconClose";
	import DatePick from 'vue-date-pick';
	import 'vue-date-pick/dist/vueDatePick.css';
	import moment from 'moment'
	
	export default {
		name: "inputReusable",
		mixins: [langMixin],
		components: {
			langString,
			IconBase,
			IconClose,
			DatePick,
			moment
		},
		model: {
			prop: 'value',
			event: 'change'
		},
		props: {
			inputClass: String,
			withoutBlur: Boolean,
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
				type: Boolean,
				default() {
					return false;
				}
			},
			input: {
				type: Boolean,
				default() {
					return false;
				}
			},
			inputType: {
				type: String,
				default() {
					return 'text';
				}
			},
			datePicker: {
				type: Boolean,
				default: false
			},
			inputPlaceholder: {
				type: [String, Boolean]
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
				if (this.textarea || this.input) {
					old.length > 0 ? this.hide = true : this.hide = false;
					
				if (this.textarea) this.calcHeight(this.$refs.textareaRef);
				this.$emit('change', this.value);

				} else {
					this.$emit('date-pick', moment(this.value).toISOString());

				}
			},
			parent_value(old) {
				//NOTE:  Не знаю как вписать в watch this.$attrs.value, поэтому сделал пока так
				if (old !== undefined && old.length === 0) this.clearInput();
			}
		},
		
		computed: {
			cMoment(){
				return this.moment
			},
			inputStyle() {
				let {width, height, handleCssValue} = this;
				width = handleCssValue(width);
				height = handleCssValue(height);
				return {
					width: `${width}`,
					height: `${height}`
				};
			},
			
			parent_value() {
				return this.$attrs.value || '';
			}
		},
		methods: {
			
			
			calcHeight(el) {
				el.style.height = 'auto';
				let calculated = el.offsetHeight + el.scrollHeight - el.clientHeight;
				el.style.height = calculated + 'px';
			},
			
			focusInput(payload) {

				if (this.parent_value.length > 0) payload = true;
				
				this.hide = payload;
				this.active = payload;
			},
			
			clearInput() {
				this.value = '';
			},
			


			onBlurAction(payload) {
				this.$emit('blur', payload);
				this.focusInput(false);
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
		
	}
</script>

<style lang="scss">
	.input-reusable {
		position: relative;
		display: flex;
		justify-content: space-between;
		cursor: text;
		
		.action-btns {
			position: absolute;
			z-index: 200;
			display: flex;
			transform: translateY(-50%);
			top: calc(50% - 4px);
			right: 20px;
			
			.cancel-btn {
				margin-left: 19px;
				color: #1A1E22;
			}
		}
		
		.vdpInnerWrap {
			z-index: 200;
		}

		.focusedInput {
			border-bottom-color: #4B97B4 !important;
		}
		
		.validationStyle {
			border-bottom-color: red !important;
			
		}
		
		.vdpOuterWrap {
			z-index: 1000;
		}
		
		.vdpComponent {
			display: flex;
			
		}
		
		.vdpComponent {
			width: 100%;
		}
		
		.input-placeholder {
			
			position: absolute;
			z-index: 100;
			font-family: Roboto;
			font-style: normal;
			font-weight: normal;
			font-size: 12px;
			color: #747474 !important;
		}
		
		.input, .textarea, .date-pick input {
			background-color: transparent;
			outline: none;
			border-bottom-style: solid;
			border-bottom-color: #BCBEC3;
			border-bottom-width: 0.5px;
			border-top: none;
			border-right: none;
			border-left: 0;
		}
		
		.input {
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
		
		.date-pick input {
			width: 100%;
		}
		
		textarea {
			outline: none;
			border-bottom-style: solid;
			border-bottom-color: #BCBEC3;
			border-bottom-width: 0.5px;
			border-top: none;
			border-right: none;
			border-left: 0;
			height: auto;
			min-height: 20px;
			resize: none;
			width: 100%;
			margin-top: 24px;
			
			&::-webkit-scrollbar {
				display: none;
			}
		}
	}
</style>
