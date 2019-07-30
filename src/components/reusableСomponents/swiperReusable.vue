<template>
	
	<div>
		<div
				v-if="swiperType === 'scroll'"
				class="swiper-reusable scroll"
				:class="swiperClass"
				:style="swiperStyle">
			<slot name="scroll"></slot>
			<span class="stub-block">{{stubContent}}</span>
		</div>
		
		<swiper
				v-if="swiperType === 'usual'"
				class="swiper-reusable usual"
				:class="swiperClass"
				:options="swiperOption">
			<slot name="usual"></slot>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
	</div>
	
</template>

<script>
	
	export default {
		name: "swiperReusable",
		props: {
			height: {
				type: [String, Number]
			},
			width: {
				type: [String, Number]
			},
			amountOfSlides: {
				type: [Number, String]
			},
			spaceBetween: {
				type: Number
			},
			withoutBreakpoints: {
				type: Boolean,
				default() {
					return false;
				}
			},
			stubLength: {
				type: Number,
				default() {
					return 0;
				}
			},
			swiperType: {
				type: String,
				validator(value) {
					// Значение должно соответствовать одной из этих строк
					return ['usual', 'scroll'].indexOf(value) !== -1;
				},
				default() {
					return 'usual'
				}
			},
			swiperClass: {
				type: String,
				default() {
					return ''
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
			
			swiperOption() {
				
				let breakpoints = this.withoutBreakpoints ? {} : {
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
				};
				
				return {
					slidesPerView: this.amountOfSlides,
					spaceBetween: this.spaceBetween,
					...breakpoints
				};
			},
			
			stubContent() {
				return '='.repeat(this.stubLength);
			}
		},
	}
</script>

<style lang="scss">
	
	.swiper-reusable {
		
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