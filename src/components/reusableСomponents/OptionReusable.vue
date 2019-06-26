<template>
	<div class="option-reusable">

		<div v-if="bows" class="bows" :style="{...optionStyle, backgroundColor: 'unset !important'}">
			<slot v-if="bows.length > 2" name="badge"></slot>
			<router-link v-for="bow in filteredBows" :to="bow.url">
				<div class="bow" :style="{backgroundImage: `url('${bow.img}')`}"></div>
			</router-link>
		</div>

		<div class="option-wrapper" @click="selectOption()">
			<div v-if="picture" class="picture" :style="pictureStyle"></div>

			<div class="option" :style="optionStyle">

			<span class="text">
				<slot></slot>
			</span>

			<span v-if="percentage" class="percentage-block">
				{{percentage}}%
			</span>

				<div class="progress-bar" :style="progressBarStyle"></div>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: "OptionReusable",
		props: {
			selected: Boolean,
			correct: Boolean,
			prediction: Boolean,
			percentage: Number,
			picture: String,
			pictureSize: {
				type: Number,
				default: function () {
					return 90;
				}
			},
			id: {
				type: Number,
				required: true
			},
			bows: {
				type: Array,
				validator: function (value) {
					// Значение в массиве должно соответствовать типу
					value.forEach((item) => { if (typeof item !== "string") return false });
					return true;
				}
			}
		},
		methods: {
			selectOption() {
				this.$emit('selectOption', this.id);
			}
		},
		computed: {
			filteredBows() {

				let { bows } = this;
				if (bows) return Object.keys(bows).length > 2 ? [bows[0]] : bows;
				return '';

			},
			optionStyle() {
				let { selected, correct, prediction, picture } = this;

				let opacity = prediction ? { opacity: '0.3' } : {};
				let withPicture = picture ? { borderTopLeftRadius: '0', borderBottomLeftRadius: '0' } : {};

				switch (true) {
					case correct && selected:
						return {
							backgroundColor: '#4BB48E',
							color: '#fff',
							...withPicture
						};
					case selected:
						return {
							backgroundColor: '#4B97B4',
							color: '#fff',
							...withPicture
						};
					case correct:
						return {
							backgroundColor: '#4BB48E',
							color: '#fff',
							...opacity,
							...withPicture
						};
					default:
						return {
							...opacity,
							...withPicture
						};
				}
			},
			progressBarStyle() {
				let { selected, correct, percentage } = this;

				let width = percentage ? { width: `calc(${percentage}% - 21px)` } : { width: '0' };

				switch (true) {
					case selected:
						return {
							backgroundColor: '#023F52',
							...width
						};
					case correct:
						return {
							backgroundColor: '#2E6F57',
							...width
						};
					default:
						return width;
				}
			},
			pictureStyle() {
				let { picture, pictureSize } = this;

				return {
					backgroundImage: `url('${picture}')`,
					width: `${pictureSize}px`,
					height: `${pictureSize}px`
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.option-reusable {
		position: relative;
		display: flex;
		align-items: stretch;

		width: 100%;

		.bows {
			padding: 12px 6px 12px 3px;
			width: 54px;
			border: 0.5px solid #BCBEC3;
			border-left: none;
			border-radius: 0 6px 6px 0;

			display: flex;
			justify-content: flex-end;
			align-items: center;
			margin-right: 6px;

			a {
				.bow {
					width: 21px;
					height: 21px;
					background-repeat: no-repeat;
					background-size: cover;
					border-radius: 50%;


				}

				&:last-child {
					margin: 0 3px;
				}
			}
		}

		.option-wrapper {
			flex: 1;
			display: flex;
			cursor: pointer;

			.picture {
				background-repeat: no-repeat;
				background-size: cover;
			}

			.option {
				flex: 1;

				position: relative;
				padding: 14.5px 9px 14.5px 12px;
				border: 0.5px solid #BCBEC3;
				border-radius: 6px;

				display: flex;
				align-items: center;
				justify-content: space-between;

				.text {
					font-family: Roboto;
					font-style: normal;
					font-weight: normal;
					font-size: 13px;
					color: inherit;

					flex: 1;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.percentage-block {
					font-family: Roboto;
					font-style: normal;
					font-weight: 500;
					font-size: 13px;
					color: inherit;

					margin-left: 12px;
				}

				.progress-bar {
					position: absolute;
					bottom: 0;
					height: 4px;
					background-color: #BCBEC3;
				}
			}

		}


	}
</style>