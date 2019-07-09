<template>
    <div class="picture-reusable" :style="wrapperStyle" @click="profilePush">
		<div class="picture-wrapper" :class="picClass" :style="pictureWrapperStyle">
			<div class="picture" :style="pictureStyle">
				<div v-if="counter" class="counter">
					<span>
						+{{handledCounter}}
					</span>
				</div>
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
        	img: {
				type: String,
				required: true
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
					return 'auto';
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
			handlePrecentValue(value) {

				if (value === undefined) return false;

				return `${value}`.slice(-1) === '%' ? value : value + 'px';

			}
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
				let { borColor, borRad, rounded, handlePrecentValue } = this;
				borRad = handlePrecentValue(borRad);
				if (rounded) borRad = "50%";

				if (borColor) {
					return {
						border: `2px solid ${borColor}`,
						borderRadius: `${borRad}`
					}
				}
				return '';
			},
			pictureStyle() {
				let { size, borRad, img, width, height, rounded, handlePrecentValue } = this;
				borRad = handlePrecentValue(borRad);
				width = handlePrecentValue(width);
				height = handlePrecentValue(height);
				size = handlePrecentValue(size);
				if (rounded) borRad = "50%";


				return {
					width: `${width || size}`,
					height: `${height || size}`,
					borderRadius: `${borRad}`,
					backgroundImage: `url('${img}')`
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
