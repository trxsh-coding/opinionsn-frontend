<template>
    <div class="scroll-swiper-reusable" :style="swiperStyle">
		<slot></slot>
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

			}
		},
    }
</script>

<style lang="scss">

	.scroll-swiper-reusable {
		/* TODO: разобраться с шириной свайпера */
		display: flex;
		width: 93%;
		overflow-y: hidden;
		overflow-x: scroll;

		&::-webkit-scrollbar {
			display: none;
		}
	}

</style>