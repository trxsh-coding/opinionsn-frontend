<template lang="html">

	<div id="poll-wrapper">
		
		<category-select @on-select="setCategory" :current="filter_id" :class="{'pl-60 pr-10': mobile, 'pb-13' : !mobile}"/>
		
<!--		<div class="filter-bar flex-reverse" :class="{'pl-60': mobile}">-->
<!--			-->
<!--			<button-reusable v-for="({name, id}) in localCategory"-->
<!--			                 :active="id === filter_id"-->
<!--			                 font-size="13"-->
<!--			                 class="v-center py-3 px-9"-->
<!--			                 bor-rad="6"-->
<!--			                 active-color="#ffffff"-->
<!--			                 bg-color="transparent"-->
<!--			                 activeBgColor="#4B97B4"-->
<!--			                 @click.native="setCategory({id})"-->
<!--			                 :description="name"/>-->

<!--		</div>-->
		
		<div class="feed relative flex-column pb-12" :class="{'bg-white': !mobile}">

			<div v-for="item in items" class="poll-item">
				<poll-instance :item="item"/>
			</div>

			<loader-reusable class="m-auto" v-show="!is_finished && loading" />

		</div>

	</div>


</template>


<script>
	import pollInstance from "./pollInstance.vue";
	import filterComponent from "./layout/filterComponent.vue";
	import {mapState} from "vuex";
	import SwiperCarousel from "../reusableСomponents/swiperCarousel";
	import LoaderReusable from "../reusableСomponents/LoaderReusable";
	import CategorySelect from "../reusableСomponents/categorySelect";
	import CatalogItem from "@/components/CatalogFeed/catalogItem";
	import SwiperReusable from "@/components/reusableСomponents/swiperReusable";
	import ButtonReusable from "@/components/reusableСomponents/ButtonReusable";

	export default {
		data() {
			return {
				page: 1,
				filtered: false,
				mobile: this.$root.mobile,
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
			combinedCategories: function(){
				let {localCategory, categories} = this;
				const unordered ={...localCategory, ...categories}
				const array = Object.values(unordered)
				const ordered = array.reverse();
				return ordered;
			},
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
			},
			
			setCategory({id}){
				this.$store.commit('pollFeed/setFilterId', id);
				this.$store.dispatch('pollFeed/list');
			}

		},

		created() {
		},

		mounted() {
			this.$store.dispatch(`catalogList/list`);
			this.$store.dispatch(`pollFeed/list`);
			this.setCategory({id: -1});
		},

		components: {
			ButtonReusable,
			SwiperReusable,
			CatalogItem,
			CategorySelect,
			LoaderReusable,
			SwiperCarousel,
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
