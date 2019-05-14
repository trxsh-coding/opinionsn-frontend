<template lang="html">


    <div class="vote-feed">
        <!-- Ошибка -->

		<div class="loading-spinner" v-loading="true" v-if="loading"/>

		<div class="have-no-subscribers mt-10" v-else-if="!items.length && !loading">
			<span>Лента мнений будет доступна после появления подписок</span>
		</div>
        <!--<div v-if="state.error">-->
            <!--Что-то сломалось:-->
            <!--{{state.error}}-->
        <!--</div>-->

        <!--&lt;!&ndash; Загрузка &ndash;&gt;-->


        <!--&lt;!&ndash; Нет данных &ndash;&gt;-->
        <!--<div v-else-if="!items.length">-->
            <!--<p align="center" style="font-size:10px;margin-top: 5px;color: darkgray">Нет событий</p>-->
        <!--</div>-->


        <!-- Всё ок -->
        <div class="feed relative">
            <div class="filter-section flex mb-10" v-if="items.length">
                <swiper :options="swiperOption" class="category-section">
                    <swiper-slide class="followings-block " v-for="following in followings">

                        <filter-component  :following="following"  />

                    </swiper-slide>
                </swiper>
            </div>
            <div v-for="item in items">
                <event :item="item"/>
            </div>
            <mugen-scroll :handler="load" :should-handle="!postsEnded">
        		<div class="loading-spinner" v-loading="true" v-show="loading"/>
            </mugen-scroll>

        </div>
    </div>




</template>



<script>
	import MugenScroll from "vue-mugen-scroll";
	import event from "./event/Event.vue";
	import filterComponent from "./event/filterComponent.vue";

	import { mapState } from "vuex";
	export default {
		data() {
			return {
				swiperOption: {
					slidesPerView: 4,
					spaceBetween: 30,
					pagination: {
						el: ".swiper-pagination",
						clickable: true
					}
				}
			};
		},

		computed: {
			...mapState("voteFeed", {
				state: s => s,
				items: s => s.items,
				postsEnded: ({ is_finished }) => is_finished,
				loading: ({ loading }) => loading
			}),

			...mapState("followsPage", {
				followings: s => s.items
			})
		},

		methods: {
			load() {
				this.$store.dispatch(voteFeed / loadNextPage);
			}
		},

		mounted() {
			this.$store.dispatch(followsPage / getMyFollowings);
			this.$store.dispatch(voteFeed / list);
		},

		components: {
			event,
			MugenScroll,
			filterComponent
		}
	};
</script>

<style lang="scss">
	.vote-feed {
		height: 100%;

		.loading-spinner {
			width: 100%;
			height: 80px;

			* {
				background-color: transparent;
			}
		}

		.swiper-container {
			margin-left: 0px;
		}
		.have-no-subscribers {
			text-align: center;
			span {
				color: #69777f;
				font-family: Roboto;
				font-style: normal;
			}
		}
		.followings-block {
			width: 75px !important;
			margin-right: 12px !important;

			.filter-wrapper {
				span {
					font-family: Roboto;
					font-style: normal;
					font-weight: normal;
					font-size: 12px;
					line-height: 18px;
					text-align: center;
					color: #152d3a;
				}
			}
		}
	}
</style>