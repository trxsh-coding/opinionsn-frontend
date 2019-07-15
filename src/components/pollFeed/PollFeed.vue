<template lang="html">

	<div id="poll-wrapper">
		<swiper-carousel :amount-of-slides="6" :spaceBetween="30">
			<template #swiperAnnotation>
				<swiper-slide v-for="category in categories">
					<filter-component :filtered="filtered" :id="filter_id" :category="category"/>
				</swiper-slide>
			</template>
		</swiper-carousel>
		<div class="feed relative flex-column pb-12">

			<div v-for="item in items">
				<poll-instance :item="item"/>
			</div>

			<loader-reusable class="m-auto" v-show="!is_finished" />

		</div>

	</div>


</template>


<script>
	import pollInstance from "./pollInstance.vue";
	import filterComponent from "./layout/filterComponent.vue";
	import {mapState} from "vuex";
	import SwiperCarousel from "../reusableСomponents/swiperCarousel";
	import LoaderReusable from "../reusableСomponents/LoaderReusable";

	export default {
		data() {
			return {
				page: 1,
				filtered: false,
				mobile: this.$root.mobile,
				swiperOption: {
					slidesPerView: 5,
					spaceBetween: 90,
					freeMode: true,
					loop: true,
					breakpoints: {
						768: {
							slidesPerView: 3,
							spaceBetween: 50
						},
						640: {
							slidesPerView: 4,
							spaceBetween: 80
						},
						320: {
							slidesPerView: 1,
							spaceBetween: 10
						}
					}
				}
			};
		},
		props: ["feed"],

		watch: {
			scrolled_to_bottom(old) {
				if (old) {
					this.load();
				}
			}
		},

		computed: {
			...mapState("pollFeed", {
				state: s => s,
				items: s => s.items,
				loading: s => s.loading,
				is_finished: s => s.is_finished,
				filter_id: state => state.filter_id,
				connectionUnstable: ({connectionUnstable}) => connectionUnstable
			}),

			...mapState("globalStore", {
				categories: ({categories}) => categories
			}),

			scrolled_to_bottom() {
				return this.$root.scrolled_to_bottom;
			},

			slidesPerView: function () {
				if (this.mobile) {
					this.swiperOption.slidesPerView = 5;
					this.swiperOption.spaceBetween = 12;
				} else {
					this.swiperOption.slidesPerView = 8;
					this.swiperOption.spaceBetween = 90;
				}
			},

			beforeRouteLeave(to, from, next) {
				let {page} = this;

				page = 0;

				this.$store.commit("pollFeed/resetFeedPage", page).then(() => {
					next();
				});
			}
		},
		methods: {
			load() {
				this.$store.dispatch(`pollFeed/loadNextPage`);
			}
		},

		created() {
		},

		mounted() {
			this.$store.dispatch(`catalogList/list`);

			this.$store.dispatch(`pollFeed/list`);
		},

		components: {
			LoaderReusable,
			SwiperCarousel,
			event,
			filterComponent,
			pollInstance
		}
	};
</script>

<style lang="scss">


	.ps__thumb-x {
		background: #4b97b4 !important;
	}

	.category-section::-webkit-scrollbar {
		display: none;
	}

	.category-block span::selection {
		background: transparent;
	}

	#poll-wrapper {
		overflow: hidden;
		border-radius: 6px;


		.feed {
			height: 99%;

			.loading-spinner {
				width: 100%;
				height: 80px;

				* {
					background-color: transparent;
				}
			}

			.category-block {
				width: 93px !important;
				margin-right: 12px !important;
			}
		}
	}

	.loading {
		span {
			color: #f4f4f4f4;
		}
	}

	@media only screen and (max-width: 420px) {
		#poll-wrapper {
			.category-section {
				justify-content: center !important;

				& > *:nth-child(even) {
					margin-right: 0 !important;

					@media (max-width: 350px) {
						margin-right: 6px !important;
					}
				}
			}
		}
	}
</style>
