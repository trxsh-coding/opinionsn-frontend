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
			handlePrecentValue(value) {

				if (value === undefined) return false;

				return `${value}`.slice(-1) === '%' ? value : value + 'px';

			}
		},
		computed: {
			swiperStyle() {
				let { height, width, handlePrecentValue } = this;

				height = !!height ? {height: handlePrecentValue(height)} : {};
				width = !!width ? {width: handlePrecentValue(width)} : {};


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
		width: 100%;
		overflow-y: hidden;
		overflow-x: scroll;

		&::-webkit-scrollbar {
			display: none;
		}

		.stub-block {

			visibility: hidden;

		}
	}

</style>