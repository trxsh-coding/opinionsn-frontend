<template lang="html">


  <div id="poll-wrapper" class="mr-20">

    <div class="feed relative">

    	<div v-for="item in items" >
			<poll-instance :item="item"/>
    	</div>

    	<mugen-scroll :handler="load" :should-handle="!is_finished">
        	<div class="loading-spinner" v-loading="true" v-if="!is_finished"/>
    	</mugen-scroll>

	</div>

  </div>




</template>



<script>
	import MugenScroll from "vue-mugen-scroll";
	import pollInstance from "./pollInstance.vue";
	import filterComponent from "./event/filterComponent.vue";
	import { mapState } from "vuex";
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
		computed: {
			...mapState("pollFeed", {
				state: s => s,
				items: s => s.items,
				is_finished: s => s.is_finished,
				connectionUnstable: ({ connectionUnstable }) => connectionUnstable
			}),

			...mapState("globalStore", {
				categories: ({ categories }) => categories
			}),

			slidesPerView: function() {
				if (this.mobile) {
					this.swiperOption.slidesPerView = 5;
					this.swiperOption.spaceBetween = 12;
				} else {
					this.swiperOption.slidesPerView = 8;
					this.swiperOption.spaceBetween = 90;
				}
			},

			beforeRouteLeave(to, from, next) {
				let { page } = this;

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

		watch: {},

		created() {},

		mounted() {
			this.$store.dispatch(`catalogList/list`);

			this.$store.dispatch(`pollFeed/list`);
		},

		components: {
			event,
			filterComponent,
			MugenScroll,
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
		.category-section {
			overflow-x: auto;
			display: flex;
			scrollbar-width: none;
			.category-block {
				text-align: center;
				margin-right: 10px;
			}
		}

		.feed {
			height: 100%;
			overflow: hidden;

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

	@media only screen
		and (max-width: 420px) {
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
