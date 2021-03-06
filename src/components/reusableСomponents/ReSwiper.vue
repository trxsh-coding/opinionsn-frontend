<template>

	<div
			v-if="type === 'scroll'"
			class="swiper-reusable scroll"
			:class="[swiperClass, {'flex-reverse': c_params.reverse}]"
			:style="scroll_swiper_style">
		<slot name="scroll"></slot>
		<span class="stub-block" :style="c_params.reverse && {order: '-1'}">{{stub_content}}</span>
	</div>

	<swiper
			v-else-if="type === 'usual'"
			class="swiper-reusable usual"
			:class="swiperClass"
			:style="scroll_swiper_style"
			:options="usual_swiper_options">
		<slot name="usual"></slot>
		<div class="swiper-pagination" slot="pagination"></div>
	</swiper>

</template>

<script>

	export default {
		name: "ReSwiper",
		props: {
			params: Object,
			type: {
				type: String,
				validator(value) {
					// Значение должно соответствовать одной из этих строк
					return ['usual', 'scroll'].indexOf(value) !== -1;
				},
				default() {
					return 'usual'
				}
			},
			swiperClass: String,
			usualSwiperOptions: {
				type: Object,
				default() {
					return {}
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
			c_params() {
				return {
					height: 'auto',
					width: 'auto',
					stubLength: 0,
					reverse: false,
					...this.params
				}
			},

			scroll_swiper_style() {

				return {
					width: this.handleCssValue(this.c_params.width),
					height: this.handleCssValue(this.c_params.height)
				};

			},

			usual_swiper_options() {

				let init = {
					slidesPerView: 1,
					spaceBetween: 0,
				};

				let {usualSwiperOptions: o} = this;

				let breakpoints = o.breakpoints ? {
					breakpoints: {
						1024: {
							slidesPerView: 1,
							spaceBetween: 100
						},
						768: {
							slidesPerView: 1,
							spaceBetween: 50
						},
						640: {
							slidesPerView: 1,
							spaceBetween: 100
						},
						320: {
							slidesPerView: 1,
							spaceBetween: 10
						}
					}
				} : {};

				let pagination = o.pagination ? {
					pagination: {
						el: '.swiper-pagination'
					}
				} : {};

				return {
					...init,
					...o,
					...breakpoints,
					...pagination
				};
			},

			stub_content() {
				return '='.repeat(this.c_params.stubLength);
			}
		},
	}
</script>

<style lang="scss">

	.swiper-reusable {

		.swiper-pagination-bullet-active {
			background: #4B96B3 !important;
		}

		&.scroll {
			position: relative;
			display: flex;
			width: 100%;
			overflow-y: hidden;
			overflow-x: scroll;

			scrollbar-width: none;

			&::-webkit-scrollbar {
				display: none !important;
			}

			.stub-block {

				visibility: hidden;

			}
		}

	}

</style>
