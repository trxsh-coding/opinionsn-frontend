<template>
    <div class="picture-reusable" :style="wrapperStyle">
		<div class="picture-wrapper" :class="picClass" :style="pictureWrapperStyle">
			<div class="picture" :style="pictureStyle">
				<div v-if="counter" class="counter">
				<span>
					+{{handledCounter}}
				</span>
				</div>
			</div>
		</div>
		<div class="text">
			<span class="title">
				<slot name="title"></slot>
			</span>

			<span class="description">
				<slot name="description"></slot>
			</span>
		</div>
	</div>
</template>

<script>
    export default {
        name: "PictureReusable",
		props: {
        	picClass: String,
        	img: {
				type: String,
				required: true
			},
        	size: {
        		type: Number
			},
			width: {
				type: Number
			},
			height: {
				type: Number
			},
			borRad: {
        		type: [String, Number],
				default: function () {
					return 'auto';
				}
			},
			borColor: {
				type: String
			},
			textLayout: {
				validator: function (value) {
					// Значение должно соответствовать одной из этих строк
					return ['top', 'right', 'left', 'bottom'].indexOf(value) !== -1
				}
			},
			counter: Number
		},
		computed: {
			wrapperStyle() {
				let { textLayout } = this;

				switch (textLayout) {
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
			pictureWrapperStyle() {
				let { borColor, borRad } = this;
				if (borColor) {
					return {
						border: `2px solid ${borColor}`,
						borderRadius: `${borRad}`
					}
				}
				return '';
			},
			pictureStyle() {
				let { size, borRad, img, borColor, width, height } = this;
				borRad = (borRad.slice(-1) === '%') ? borRad : borRad + 'px';

				return {
					width: `${size || width}px`,
					height: `${size || height}px`,
					borderRadius: `${borRad}`,
					backgroundImage: `url('${img}')`
				};
			},
			handledCounter() {
				let { counter } = this;
				if (counter) {
					return counter > 9 ? 9 : counter;
				};
				return '';
			}
		}
	}
</script>

<style scoped lang="scss">
	.picture-reusable {
		display: flex;
		justify-content: center;
		align-items: center;
		width: fit-content;

		* {
			box-sizing: border-box;
		}

		.picture-wrapper {
			.picture {
				position: relative;
				background-repeat: no-repeat;
				background-size: cover;
				background-position: center;
				.counter {
					width: 21px;
					height: 21px;
					background-color: #4B97B4;
					border-radius: 50%;
					display: flex;

					position: absolute;
					top: 0;
					right: -5px;

					span {
						margin: auto;
						font-family: Roboto;
						font-style: normal;
						font-weight: normal;
						font-size: 10px;
						color: #FFFFFF;
					}
				}
			}

		}

		.text {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
			width: fit-content;

			.title,
			.description {
				font-family: Roboto;
				font-style: normal;
				font-weight: normal;
				color: #1A1E22;
			}

			.title {
				font-family: Roboto;
				font-style: normal;
				font-weight: 500;
				font-size: 14px;
				line-height: 16px;
				color: #1A1E22;
				padding-bottom: 5px;

			}

			.description {
				font-size: 12px;
				font-family: Roboto;
				font-style: normal;
				font-weight: normal;
				line-height: 9px;
				color: #ADAFB3;


			}

		}

	}
</style>
