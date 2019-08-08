<template>
    <div class="picture-reusable" :style="wrapperStyle">
		<div class="picture-wrapper" :class="picClass" :style="pictureWrapperStyle">
			<div class="picture relative v-center"
			     @click="profilePush"
			     :style="pictureStyle">
				<div v-if="counter" class="counter">
					<span>
						+{{handledCounter}}
					</span>
				</div>
				<slot name="innerPicture"></slot>
			</div>
		</div>

		<div v-if="!withoutText" class="text">
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
			withoutText: {
        		type: Boolean,
				default: function () {
					return false;
				}
			},
			onlyPicture: Boolean,
        	img: {
				type: String
			},
        	size: {
        		type: [Number, String]
			},
			width: {
				type: [Number, String]
			},
			height: {
				type: [Number, String]
			},
			borRad: {
        		type: [String, Number],
				default: function () {
					return '0';
				}
			},
			avatar: {
        		type: Boolean
			},
			id: {
        		type:Number
			},
			rounded: Boolean,
			borColor: {
				type: String,
				default: 'transparent'
			},
			bgColor: {
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
		methods: {
        	profilePush(){
        		if(this.avatar){
					this.$router.push({name:'user',params:{id:this.id}})
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

			},
		},
		computed: {

			wrapperStyle() {
				let { textLayout, width, handleCssValue, onlyPicture } = this;
				width = (width && onlyPicture) ? {width: handleCssValue(width)} : {};

				switch (textLayout) {
					case 'top':
						return {
							flexDirection: 'column-reverse',
							...width
						};
					case 'bottom':
						return {
							flexDirection: 'column',
							...width
						};
					case 'left':
						return {
							flexDirection: 'row-reverse',
							...width
						};
					case 'right':
						return {
							flexDirection: 'row',
							...width
						};
					default:
						return width;
				}
			},
			pictureWrapperStyle() {
				let { borColor, borRad, rounded, handleCssValue, onlyPicture, width } = this;
				borRad = handleCssValue(borRad);
				width = handleCssValue(width);
				if (rounded) borRad = "50%";
				let border = borColor ? {border: `2px solid ${borColor}`} : {};

				let style = {};

				if (!onlyPicture) {
					style = {
						borderRadius: `${borRad}`,
						...border
					};
				} else {
					style = {
						borderRadius: `${borRad}`,
						width,
						...border
					};
				}

				return style;
			},
			pictureStyle() {
				let { size, borRad, img, width, height, rounded, handleCssValue, bgColor } = this;
				borRad = handleCssValue(borRad);
				width = handleCssValue(width);
				height = handleCssValue(height);
				size = handleCssValue(size);
				bgColor = bgColor ? {backgroundColor: bgColor} : {};
				img = img ? img : '';
				if (rounded) borRad = "50%";


				return {
					width: `${width || size}`,
					height: `${height || size}`,
					borderRadius: `${borRad}`,
					backgroundImage: `url('${img}')`,
					...bgColor
				};
			},
			handledCounter() {
				let { counter } = this;
				return '';
			}
		}
	}
</script>

<style lang="scss">
	.picture-reusable {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: fit-content;
		flex-shrink: 0;

		* {
			box-sizing: border-box;
		}

		.picture-wrapper {
			.picture {
				width: auto;
				position: relative;
				background-repeat: no-repeat;
				background-size: cover;
				background-position: center;
				/*background-color: #ADAFB3;*/
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
				color: #1A1E22;

			}

			.description {
				font-size: 12px;
				font-family: Roboto;
				font-style: normal;
				font-weight: normal;
				color: #ADAFB3;
				padding-top: 5px;

			}

		}

	}
</style>
