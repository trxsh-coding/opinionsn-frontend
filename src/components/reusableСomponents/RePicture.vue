<template>
	<img class="re-picture img" v-if="type === 'img'" :src="url" :style="[cSize, cBorRad, cClip, styles]">
	<div class="re-picture background" v-else-if="type === 'background'"
	     :style="[cSize, cBorRad, cClip, styles, {backgroundImage: `url('${url}')`}]">
		<slot />
	</div>
</template>

<script>
	export default {
		name: "RePicture",
		props: {
			type: {
				type: String,
				validator(value) {
					return value === 'img' || value === 'background'
				},
				default() {
					return 'img'
				}
			},
			url: {
				type: String,
				required: true
			},
			size: [Number, String],
			width: [Number, String],
			height: [Number, String],
			borRad: [Number, String],
			clip: {
				type: String,
				default() {
					return 'cover';
				}
			},
			styles: Object,
			rounded: Boolean
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
			cSize() {
				let {size, width, height} = this;
				size = this.handleCssValue(size);
				width = this.handleCssValue(width);
				height = this.handleCssValue(height);
				return {
					width: width || size,
					height: height || size,
					minWidth: width || size,
					minHeight: height || size
				}
			},
			cBorRad() {
				let {borRad, rounded} = this;
				if (rounded) return {borderRadius: '50%'};
				if (!borRad) return {};
				borRad = this.handleCssValue(borRad);
				return {
					borderRadius: borRad
				}
			},
			cClip() {
				return this.type === 'img' ? {objectFit: this.clip} : {backgroundSize: this.clip}
			}
		},
	}
</script>

<style lang="scss">
	.re-picture {
		&.img {
			object-fit: cover;
			object-position: center;
		}
		
		&.background {
			background-repeat: no-repeat;
			background-size: cover;
			background-position: center;
		}
	}
</style>