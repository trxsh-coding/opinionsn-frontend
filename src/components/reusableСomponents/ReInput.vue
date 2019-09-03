<template>
	<label class="re-input" :class="[c_preset, {'active': is_active}]" :style="[preset === 2 && {cursor: 'text'}, label_params]">
		<span v-if="preset === 2" v-show="!is_active" class="placeholder">{{lstr(placeholder)}}</span>
		
		<input v-if="!textarea" :placeholder="preset !== 2 && lstr(placeholder)"
		       :value="value" :type="type" :class="inputClass" :style="input_params"
		       @input="$emit('input', $event.target.value)" @focus="has_focus = true" @blur="has_focus = false">
		
		<textarea v-else rows="1" ref="textarea" :placeholder="preset !== 2 && lstr(placeholder)"
		          :value="value" @input="$emit('input', $event.target.value)" :class="inputClass" :style="input_params"
		          @focus="has_focus = true" @blur="has_focus = false"></textarea>
		
		<slot></slot>
	</label>
</template>

<script>
	import langMixin from "@/components/mixins/langMixin";
	
	export default {
		name: "ReInput",
		mixins: [langMixin],
		props: {
			value: String,
			placeholder: String,
			type: {
				type: String,
				default() {
					return 'text'
				}
			},
			inputClass: String,
			textarea: Boolean,
			preset: {
				type: Number,
				default() {
					return null
				}
			},
			params: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		data() {
			return {
				has_focus: false
			}
		},
		watch: {
			value() {
				if (this.textarea) {
					function calcHeight(el) {
						el.style.height = 'auto';
						let calculated = el.offsetHeight + el.scrollHeight - el.clientHeight;
						el.style.height = calculated + 'px';
					}
					calcHeight(this.$refs.textarea);
				}
			}
		},
		computed: {
			c_preset() {
				return Number.isInteger(this.preset) ? `preset-${this.preset}` : '';
			},
			
			input_params() {
				if (Object.keys(this.params).length) {
					let o = {};
					Object.keys(this.params).forEach(key => {
						if (key !== 'label') o[key] = this.handleCssValue(this.params[key])
					});
					return o;
				}
			},
			
			label_params() {
				if (this.params.label && Object.keys(this.params.label).length) {
					let o = {};
					Object.keys(this.params.label).forEach(key => o[key] = this.handleCssValue(this.params.label[key]));
					return o;
				}
			},
			
			is_active() {
				return this.value || this.has_focus
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
	}
</script>

<style lang="scss">
	.re-input {
		position: relative;
		display: flex;
		/*align-items: center;*/
		z-index: 200;
		
		input, textarea {
			cursor: text;
			background: transparent;
			
			font-family: Roboto;
			font-style: normal;
			font-weight: normal;
			font-size: 13px;
			color: #1A1E22;
			
			&::placeholder {
				font-family: Roboto;
				font-style: normal;
				font-weight: normal;
				font-size: 12px;
				color: #747474;
				opacity: 0.6;
			}
		}
		
		input {
			all: unset;
		}
		
		textarea {
			outline: none;
			border: none;
			resize: none;
			height: auto;
			min-height: 20px;
			overflow-x: hidden;
			
			&::-webkit-scrollbar {
				display: none;
			}
		}
		
		&.preset-1 {
			input, textarea{
				border-bottom: 0.5px solid #BCBEC3;
			}
			
			&.active {
				input, textarea {
					border-color: #4B97B4;
				}
			}
		}
		
		&.preset-2 {

			.placeholder {
				position: absolute;
				z-index: 100;
				font-family: Roboto;
				font-style: normal;
				font-weight: normal;
				font-size: 12px;
				user-select: none;
				color: #747474 !important;
			}

			input, textarea {
				border-bottom: 0.5px solid #BCBEC3;
			}
			
			&.active {
				input, textarea {
					border-color: #4B97B4;
				}
			}
		}
		
		&.preset-3 {
			input, textarea {
				padding: 0 15px;
				border: 0.5px solid #CECFD3;
				border-radius: 6px;
			}
		}
	}
</style>