<template>
	<div class="upload-block v-center relative" :style="blockStyle">
		<label :style="wrapperStyle" class="relative label" :class="[{'w-fit h-fit': fit}, labelClass]">

			<div
					:class="{'w-fit h-fit': fit}"
					v-if="iconPhoto">
				<slot name="icon">
					<icon-base
							class="pointer absolute-center"
							v-show="!withCloseBtn | is_input_empty"
							width="24"
							height="21"
							viewBox="0 0 20 17"
							icon-name="upload">
						<icon-upload-photo/>
					</icon-base>
				</slot>
			</div>

			<div
					:class="{'w-fit h-fit': fit}"
					@click.prevent="handlePictureRemove">
				<slot name="clearIcon">
					<icon-base
							v-if="withCloseBtn && imgUrl"
							class="pointer absolute-center"
							fill="white"
							width="22"
							height="22"
							viewBox="0 0 19 19"
							icon-name="close">
						<icon-cross/>
					</icon-base>
				</slot>
			</div>

			<input ref="input_ref" type="file" @change="handlePicturePreview(arguments[0].target.files)">

			<div
					class="image-preview flex-center flex-align-center pointer"
					v-if="imagePreview"
					:style="previewStyle">
				<icon-base
						class="absolute-center"
						v-if="!imgUrl"
						fill="none"
						width="21"
						height="25"
						viewBox="0 0 21 25"
						icon-name="upload">
					<icon-upload/>
				</icon-base>
			</div>
		</label>

	</div>
</template>

<script>
	import IconBase from '../icons/IconBase'
	import IconUpload from '../icons/create/IconUpload'
	import IconUploadPhoto from "../icons/create/IconUploadPhoto";
	import IconCross from "../icons/IconCross";

	import langString from '../langString'

	export default {
		name: "UploadReusable",
		components: {
			IconBase,
			IconUpload,
			IconUploadPhoto,
			IconCross,
			langString
		},
		model: {
			event: 'change',
		},
		props: {
			labelClass: {
				type: String,
				default: ''
			},
			width: {
				type: [String, Number]
			},
			height: {
				type: [String, Number]
			},
			imagePreview: {
				type: Boolean
			},
			withCloseBtn: {
				type: Boolean,
				default() {
					return false;
				}
			},
			description: {
				type: Boolean,
				default() {
					return false;
				}
			},
			iconPhoto: {
				type: Boolean,
				default() {
					return false;
				}
			},
			preWidth: {
				type: [String, Number]
			},
			preHeight: {
				type: [String, Number]
			},
			fit: Boolean,
			imageLayout: {
				validator: function (value) {
					return ['top', 'right', 'left', 'bottom'].indexOf(value) !== -1
				}
			}
		},
		data() {
			return {
				imgUrl: null,
				is_input_empty: true
			}
		},
		methods: {

			handlePicturePreview(file) {
				this.imgUrl = URL.createObjectURL(file[0]);
				this.$emit('upload', {file: file[0], url: `${this.imgUrl}`});
				this.is_input_empty = false;
			},

			handlePictureRemove() {
				this.$emit('remove', {file: '', url: ''});
				this.is_input_empty = true;
				this.imgUrl = '';
				this.$refs.input_ref.value = '';
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

			},
		},
		computed: {

			previewStyle() {
				let {preWidth, preHeight, handleCssValue} = this;
				preWidth = preWidth ? {width: handleCssValue(preWidth)} : {};
				preHeight = preHeight ? {height: handleCssValue(preHeight)} : {};
				let backgroundImage = {backgroundImage: `url('${this.imgUrl}')`};
				return {...preWidth, ...preHeight, ...backgroundImage};
			},

			wrapperStyle() {
				let {imageLayout} = this;

				switch (imageLayout) {
					case 'top':
						return {
							flexDirection: 'column-reverse',
						};
					case 'bottom':
						return {
							flexDirection: 'column',
						};
					case 'left':
						return {
							flexDirection: 'row-reverse',
						};
					case 'right':
						return {
							flexDirection: 'row',
						};
					default:
						return '';
				}
			},

			blockStyle() {
				let {width, height, handleCssValue} = this;
				width = width ? {width: handleCssValue(width)} : {};
				height = height ? {height: handleCssValue(height)} : {};

				return {...width, ...height};
			}

		},
	}
</script>

<style lang="scss">

	.upload-block {
		input[type='file'] {
			display: none !important;
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
		}

		.label {
			width: 100%;
			height: 100%;
			flex-direction: column;
		}

		.image-preview {

			background-size: cover;
			background-color: rgba(21, 41, 58, 0.1);
			border-radius: 6px;
			background-position: center;
		}

	}
</style>
