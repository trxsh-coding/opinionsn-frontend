<template>
    <div class="circle-progress-bar-reusable" :style="wrapperStyle" @click="percent ++">

		<div class="bar bar-1" :style="bar_1_style"></div>
		<div class="bar bar-2" :style="bar_2_style"></div>
		<div class="bar bar-3" :style="bar_3_style"></div>
		<div class="bar bar-4" :style="bar_4_style"></div>

		<div class="circle v-center" :style="circleStyle">
			<slot>
				<span>{{percent}}%</span>
			</slot>
		</div>

	</div>
</template>

<script>
    export default {
        name: "CircleProgressBarReusable",
		props: {
        	percent: {
        		type: Number,
				default: function () {
					return 0;
				}
			},
			barSize: {
        		type: [String, Number],
				default: function () {
					return 5;
				}
			},
			barColor: {
        		type: String,
				default: function () {
					return '#4B97B4';
				}
			},
			size: {
        		type: [String, Number],
				default: function () {
					return 100;
				}
			}
		},
		computed: {
        	wrapperStyle() {
				let { size } = this;

				return {
					width: `calc(100% - ${size}px)`,
					height: `calc(100% - ${size}px)`
				}
			},
			circleStyle() {
				let { barSize } = this;

				return {
					width: `calc(100% - ${barSize}px)`,
					height: `calc(100% - ${barSize}px)`
				}
			},
			bar_1_style() {
				let { percent, barColor } = this;

				let DEGREE = Math.trunc(3.6 * percent);
				let color = (percent >= 0) ? {backgroundColor: barColor} : {};

				if (DEGREE >= 90) DEGREE = 90;

				return {
					transform: `rotate(${DEGREE}deg)`,
					...color
				};
			},
			bar_2_style() {
				let { percent, barColor } = this;

				let DEGREE = Math.trunc(3.6 * percent);
				let color = (percent >= 25) ? {backgroundColor: barColor} : {};

				if (percent >= 50) DEGREE = 180;

				return {
					transform: `rotate(${DEGREE}deg)`,
					...color
				};
			},
			bar_3_style() {
				let { percent, barColor } = this;

				let DEGREE = Math.trunc(3.6 * percent);
				let color = (percent >= 50) ? {backgroundColor: barColor} : {};

				if (percent >= 75) DEGREE = 270;

				return {
					transform: `rotate(${DEGREE}deg)`,
					...color
				};
			},
			bar_4_style() {
				let { percent, barColor } = this;

				let DEGREE = Math.trunc(3.6 * percent);
				let color = (percent >= 75) ? {backgroundColor: barColor} : {};

				if (percent >= 100) {
					DEGREE = 360
				} else if (percent <= 74) {
					DEGREE = 0
				}

				return {
					transform: `rotate(${DEGREE}deg)`,
					...color
				};
			},
		},
    }
</script>

<style lang="scss">

	.circle-progress-bar-reusable {
		position: relative;
		overflow: hidden;
		width: 300px;
		height: 300px;
		background-color: #fff;

		border-radius: 50%;

		.circle {
			position: absolute;
			background-color: #fff;
			border-radius: 50%;

			z-index: 5000;

			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

			span {
				user-select: none;
			}
		}

		.bar {
			position: absolute;
			width: 150%;
			height: 150%;

			// transform: rotate(-45deg);

			bottom: 50%;
			right: 50%;
			transform-origin: right bottom;
			background-color: #ffffff;
		}

		.bar-1 {
			z-index: 3000;
		}

		.bar-2 {
			z-index: 2000;
		}

		.bar-3 {
			z-index: 1000;
		}

		.bar-4 {
			z-index: 4000;
		}


	}

</style>