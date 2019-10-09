<template>
    <div class="circle-progress-bar-reusable" :style="wrapperStyle">

		<div class="bar bar-1" :style="bar_1_style"></div>
		<div class="bar bar-2" :style="bar_2_style"></div>
		<div class="bar bar-3" :style="bar_3_style"></div>
		<div class="bar bar-4" :style="bar_4_style"></div>

		<div class="circle v-center" :style="circleStyle">
			<slot>
				<span class="default-slot">{{percent | normalizePercent}}%</span>
			</slot>
		</div>

	</div>
</template>

<script>
    export default {
        name: "CircleProgressBar",
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
	    filters: {
		    /**
		     * @description Cut percent to fixed range
		     * @param {number|float} value percent
		     * @returns {number|float}
		     */
		    normalizePercent(value) {
			    return Number.isInteger(value) ? value : Number((value).toFixed(1));
		    }
	    },
		computed: {
        	wrapperStyle() {
				let { size } = this;

				return {
					width: `${size}px`,
					height: `${size}px`
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
				return this.calculateBarStyle(1);
			},
			bar_2_style() {
				return this.calculateBarStyle(2);
			},
			bar_3_style() {
				return this.calculateBarStyle(3);
			},
			bar_4_style() {
				return this.calculateBarStyle(4);
			},
			calculateBarStyle() {
				return (step) => {
					let { percent, barColor } = this;

					if (percent > 100) percent = 100;

					let DEGREE = Math.trunc(3.6 * percent);
					let color = (percent >= 25 * (step - 1)) ? {backgroundColor: `${barColor}`} : {};

					if (percent >= 25 * step) DEGREE = 90 * step;

					if (step === 4) {
						if (percent <= 74) {
							DEGREE = 0
						}
					}

					return {
						transform: `rotate(${DEGREE}deg)`,
						...color
					};
				}
			}
		},
		methods: {
			// calculateBarStyle(step) {
			// 	let { percent, barColor } = this;
			//
			// 	if (percent > 100) percent = 100;
			//
			// 	let DEGREE = Math.trunc(3.6 * percent);
			// 	let color = (percent >= 25 * step - 1) ? {backgroundColor: barColor} : {};
			//
			// 	if (percent >= 25 * step) DEGREE = 90 * step;
			//
			// 	if (step === 4) {
			// 		if (percent <= 74) {
			// 			DEGREE = 0
			// 		}
			// 	}
			//
			// 	return {
			// 		transform: `rotate(${DEGREE}deg)`,
			// 		...color
			// 	};
			// }
		},
    }
</script>

<style lang="scss">

	.circle-progress-bar-reusable {
		position: relative;
		overflow: hidden;
		width: 300px;
		height: 300px;
		background-color: #BCBEC3;

		border-radius: 50%;

		.circle {
			position: absolute;
			background-color: #fff;
			border-radius: 50%;

			z-index: 5000;

			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

			.default-slot {
				font-family: Roboto;
				font-style: normal;
				font-weight: 500;
				font-size: 21px;
				color: #4B97B4;
				user-select: none;
			}
		}

		.bar {
			position: absolute;
			width: 100%;
			height: 100%;

			bottom: 50%;
			right: 50%;
			transform-origin: right bottom;
			background-color: #BCBEC3;
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