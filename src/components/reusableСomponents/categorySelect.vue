<template>
	<div class="category-block">
		<ReSwiper :type="mobile ? 'scroll' : 'usual'"
		          :params="{height: 'fit-content', width: '100%'}"
		          :usual-swiper-options="{slidesPerView: 'auto', spaceBetween: 10, breakpoints: false}">
			<template #usual>
				<swiper-slide
						class="w-fit"
						v-for="category in combinedCategories">
					<catalog-item
							:item="category"
							:is-current-string="isCurrentString"
							:current="current"
							@click.native="onCategorySelect(category.id, category.name)"/>
				</swiper-slide>
			</template>
			<template #scroll>
				<catalog-item
						v-for="(category, i) in combinedCategories"
						:class="{'ml-10': i}"
						:item="category"
						:is-current-string="isCurrentString"
						:current="current"
						@click.native="onCategorySelect(category.id, category.name)"/>
			</template>
		</ReSwiper>

	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import langMixin from '../mixins/langMixin'
	import CatalogItem from "../CatalogFeed/catalogItem";
	import ReSwiper from "./ReSwiper";

	export default {
		name: "categorySelect",
		components: {ReSwiper, CatalogItem},
		mixins: [langMixin],
		props: {

			current: {
				type: Number,
				required: true
			},

			isCurrentString: Boolean,

			popularCategory: {
				type: Boolean,
				default() {
					return true;
				}
			},

			slidesPerView: Number
		},
		data() {
			return {
				localCategory: {
					"998": {
						id: -2,
						name: 'new',
						path_to_image: require('../../assets/new.svg'),
						local: true
					},
					"999": {
						name: 'recommended',
						id: -1,
						path_to_image: require('../../assets/all.svg'),
						local: true
					},
				},
			}
		},
		computed: {

			...mapState('globalStore', {

				categories: ({categories}) => categories,

			}),

			mobile() {
				return this.$root.mobile;
			},

			combinedCategories: function () {

				let categories = Object.values(this.categories);
				if (!this.popularCategory) delete categories[19]  // Remove POPULAR category by id
				const localCategory = Object.values(this.localCategory)
				const ordered = [...Object.values(localCategory).reverse(), categories[19],...categories];
				console.log(ordered)

				return (this.$route.name === 'pollFeed') ? ordered : this.categories;
			},
		},

		mounted() {
			this.$store.dispatch(`catalogList/list`);
		},

		methods: {
			onCategorySelect(id, name) {
				this.$emit('on-select', {id, name})
			},
		}
	}
</script>

<style lang="scss">
	.category-block {
		/*.swiper-container {*/
		/*	height: 38px;*/
		/*}*/
	}
</style>
