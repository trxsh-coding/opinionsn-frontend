<template>
    <div class="scroll-swiper-reusable" :style="swiperStyle">
		<slot></slot>
		<span class="stub-block">{{stubContent}}</span>
	</div>
	
	
</template>

<script>
    export default {
        name: "ScrollSwiperReusable",
		props: {
        	height: {
        		type: [String, Number]
			},
			width: {
        		type: [String, Number]
			},
			stubLength: {
        		type: Number,
				default: function() {
					return 0;
				}
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
		computed: {
			swiperStyle() {
				let { height, width, handleCssValue } = this;

				height = !!height ? {height: handleCssValue(height)} : {};
				width = !!width ? {width: handleCssValue(width)} : {};


				return {
					...width,
					...height
				};

			},
			stubContent() {
				return '='.repeat(this.stubLength);
			}
		},
    }
</script>

<style lang="scss">

	.scroll-swiper-reusable {
		position: relative;
		display: flex;
		align-items: center;
		width: 100%;
		overflow-y: hidden;
		overflow-x: scroll;

		scrollbar-width: none;

		&::-webkit-scrollbar {
			display: none !important;
			-webkit-appearance: none !important;
			width: 0 !important;
			height: 0 !important;
		}

		.stub-block {

			visibility: hidden;

		}
	}

</style>