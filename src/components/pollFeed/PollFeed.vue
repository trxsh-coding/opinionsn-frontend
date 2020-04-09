<template lang="html">

	<div id="poll-wrapper">

		<category-select @on-select="setCategory" :current="filter_id" :slides-per-view="4.3"
		                 :class="{'mt-7 px-10': mobile, 'pb-13' : !mobile}"/>

		<div v-if="filter_id === 24" class="resultTournamentBlock">
			<span style="font-size: 15px">
				Турнир прогнозистов Opinion «Оскар 2020» завершен! <br>
				Мы благодарим всех участников за активность и поздравляем победителей! <br>
				<br>
				Следите за новостями — скоро мы снова приготовим для вас что-то любопытное.
				<br>
			</span>
			<table border="0" width="100%">
				<thead>
					<tr align="left">
						<th v-for="{title} in tournamentColumns">
							{{title}}
						</th>
					</tr>
				</thead>
				<tbody>
				<tr v-for="{place, result, accuracy, username, id} in tournamentInfo" align="left">
					<td>
						{{place}}
					</td>
					<td>
						<router-link class="mr-auto pointer" :to="{name: 'user', params: {id: id} }">
							{{username}}
						</router-link>
					</td>
					<td>
						{{accuracy}}
					</td>
					<td>
						{{result}}
					</td>
				</tr>
				</tbody>
			</table>
		</div>

		<div class="feed mt-7 relative flex-column pb-12"
		     @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">

			<div class="reload-indicator-wrapper v-center" ref="reload_indicator"
			     :style="difference && {height: difference + 'px'}">
				<Loader />
			</div>

			<div v-for="item in items" class="poll-item mb-9">
				<poll-instance :item="item"/>
			</div>

			<Loader class="mx-auto my-10" v-show="!is_finished && loading"/>

			<lang-string class="finish-warning mx-auto my-10" v-show="is_finished || !items.length" title="no_more_posts!"/>

		</div>

	</div>


</template>


<script>
	import pollInstance from "./pollInstance.vue";
	import {mapState} from "vuex";
	import Loader from "../reusableСomponents/Loader";
	import CategorySelect from "../reusableСomponents/categorySelect";
	import CatalogItem from "@/components/CatalogFeed/catalogItem";
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
				},
				tournamentColumns: [
					{
						title: 'Место',
						field: 'place'
					},
					{
						field: 'username',
						title: 'Пользователь'
					},
 					{
						field: 'accuracy',
						title: 'Точность'
					},
					{
						field: 'result',
						title: 'Результат '
					},

				],
				tournamentInfo: [
					{place:'1', id:51, username:'Nazila', accuracy:55, result:15},
					{place:'2', id:1864, accuracy:51, result:15, username:'Mashinizd',},
					{place:'3-5', id:2381, accuracy:48, result:14, username:'Sporta4o',},
					{place:'3-5', id:9, accuracy:48, result:13, username:'alexey_s',},
					{place:'3-5', id:2378, accuracy:48, result:14, username:'Igromancer',},
					{place:'6', id:4, accuracy:44, result:13, username:'anton',},
					{place:'7-10', id:2729, accuracy:41, result:12, username:'fanrodman',},
					{place:'7-10', id:1939, accuracy:41, result:12, username:'almameter'},
					{place:'7-10', id:2377, accuracy:51, result:15, username:'Politotosha',},
					{place:'11', id:2376, accuracy:37, result:11, username:'Elealirina',},
					{place:'12', id:7, accuracy:34, result:10, username:'Oloir',},
					{place:'13', id:4605, accuracy:31, result:9, username:'Asidie',},
					{place:'13', id:6235, accuracy:31, result:9, username:'EgoEco',},
					{place:'14-17', id:6225, accuracy:27, result:8, username:'Kot',},
					{place:'14-17', id:11, accuracy:27, result:8, username:'Roman',},
					{place:'14-17', id:2913, accuracy:27, result:8, username:'Antilla',},
					{place:'14-17', id:2921, accuracy:27, result:8, username:'Hlamina',},
					{place:'18-20', id:2380, accuracy:20, result:6, username:'CarreraVerim',},
					{place:'18-20', id:12, accuracy:20, result:6, username:'Y.S.',},
					{place:'18-20', id:6261, accuracy:20, result:6, username:'Gopognom',},
					{place:'21-20', id:6263, accuracy:17, result:5, username:'DesignerDoc',},
					{place:'22', id:2740, accuracy:13, result:4, username:'Mononokia',},

				]
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
			CatalogItem,
			CategorySelect,
			Loader,
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
	.resultTournamentBlock {
		border-radius: 6px;
		background-color: #ffffff;
		padding: 15px;
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

	}

	.poll-item:nth-last-child(-n+2) {
		border-bottom: none;
	}

	#poll-wrapper {
		overflow: hidden;
		border-radius: 6px;
		height: 100%;
		background: #F8F8F8;

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
