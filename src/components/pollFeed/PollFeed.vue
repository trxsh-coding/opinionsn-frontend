<template lang="html">
	
	<div id="poll-wrapper">
		
		<category-select @on-select="setCategory" :current="filter_id"
		                 :class="{'pl-60 pr-10': mobile, 'pb-13' : !mobile}"/>
		
		<div class="feed relative flex-column pb-12" :class="{'bg-white': !mobile}"
		     @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
			
			<div class="reload-indicator-wrapper v-center" ref="reload_indicator"
			     :style="difference && {height: difference + 'px'}">
				<Loader />
			</div>
			
			<div v-for="item in items" class="poll-item">
				<poll-instance :item="item"/>
			</div>
			
			<Loader class="mx-auto my-10" v-show="!is_finished && loading"/>
			
			<lang-string class="finish-warning mx-auto my-10" v-show="is_finished" title="no_more_posts!"/>
		
		</div>
	
	</div>


</template>


<script>
	import pollInstance from "./pollInstance.vue";
	import filterComponent from "./layout/filterComponent.vue";
	import {mapState} from "vuex";
	import SwiperCarousel from "../reusableСomponents/swiperCarousel";
	import Loader from "../reusableСomponents/Loader";
	import CategorySelect from "../reusableСomponents/categorySelect";
	import CatalogItem from "@/components/CatalogFeed/catalogItem";
	import SwiperReusable from "@/components/reusableСomponents/swiperReusable";
	import ButtonReusable from "@/components/reusableСomponents/ButtonReusable";
	import langString from "../langString";
	
	export default {
		name: 'PollFeed',
		data() {
			return {
				page: 1,
				filtered: false,
				init_coord: 0,
				difference: 0,
				is_loader_active: false,
				localCategory: {
					"20": {
						name: 'all',
						id: -1,
						path_to_image: null,
						local: true
					},
					"18": {
						id: -2,
						name: 'new',
						path_to_image: null,
						local: true
					}
				},
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
			
			mobile() {
				return this.$root.mobile;
			},
			
			combinedCategories: function () {
				let {localCategory, categories} = this;
				const unordered = {...localCategory, ...categories}
				const array = Object.values(unordered)
				const ordered = array.reverse();
				return ordered;
			},
			
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
			
			// beforeRouteLeave(to, from, next) {
			// 	let {page} = this;
			//
			// 	page = 0;
			//
			// 	this.$store.commit("pollFeed/resetFeedPage", page).then(() => {
			// 		next();
			// 	});
			// }
		},
		methods: {
			
			load() {
				this.$store.dispatch(`pollFeed/loadNextPage`);
			},
			
			setCategory({id}) {
				this.$store.commit('pollFeed/setFilterId', id);
				this.$store.dispatch('pollFeed/list');
			},
			
			handleTouchStart({touches}) {
				this.init_coord = touches[0].screenY;
				if (this.$root.scroll_top === 0) this.is_loader_active = true;
			},
			
			handleTouchMove({touches}) {
				let difference = touches[0].screenY - this.init_coord;
				if (this.$root.scroll_top === 0 && difference > 0 && this.is_loader_active) {
					document.body.style.cssText = 'overflow-y: hidden;';
					this.difference = difference;
				}
			},
			
			handleTouchEnd() {
				if (this.$refs.reload_indicator.offsetHeight === 70) {
					this.page = 1;
					this.$store.commit("pollFeed/resetFeedPage", 0);
					this.$store.dispatch(`pollFeed/list`);
				}
				
				document.body.style.cssText = '';
				this.is_loader_active = false;
				this.init_coord = 0;
				this.difference = 0;
			}
			
		},
		
		mounted() {
			this.$store.dispatch(`catalogList/list`);
			this.$store.dispatch(`pollFeed/list`);
			this.setCategory({id: -1});
			
		},
		
		beforeRouteEnter (to, from, next) {
			document.body.classList.add('is_active');
			next();
		},

		beforeRouteLeave (to, from, next) {
			document.body.classList.remove('is_active');
			next();
		},
		
		components: {
			ButtonReusable,
			SwiperReusable,
			CatalogItem,
			CategorySelect,
			Loader,
			SwiperCarousel,
			filterComponent,
			pollInstance,
			langString
		}
	};
</script>

<style lang="scss">
	
	body {
		&.is_active {
			overscroll-behavior: contain;
		}
	}
	
	.ps__thumb-x {
		background: #4b97b4 !important;
	}
	
	.category-section::-webkit-scrollbar {
		display: none;
	}
	
	.category-block span::selection {
		background: transparent;
	}
	
	.poll-item {
		border-bottom: 1px solid #BCBEC3;
		
	}
	
	.poll-item:nth-last-child(-n+2) {
		border-bottom: none;
	}
	
	#poll-wrapper {
		overflow: hidden;
		border-radius: 6px;
		height: 100%;
		
		.feed {
			height: 100%;
			
			.reload-indicator-wrapper {
				height: 0;
				min-height: 0;
				max-height: 70px;
				overflow: hidden;
			}
			
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
