<template>
	<div class="category-block">
		<ReSwiper :type="mobile ? 'scroll' : 'usual'"
		          :params="{height: 'fit-content', width: '100%'}"
		          :usual-swiper-options="{slidesPerView: 'auto', spaceBetween: 10, breakpoints: false}">
			<template #usual>
				<swiper-slide
						class="w-fit"
						v-for="(category, index) in createCategories">
					<catalog-item
							:item="category"
							:is-current-string="isCurrentString"
							:current="current"
							@click.native="onCategorySelect(category.id, category.name)"/>
				</swiper-slide>
			</template>
			<template #scroll>
				<catalog-item
						v-for="(category, i) in createCategories"
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

			...mapState('CatalogStore', {

				data: ({data}) => data,

			}),
			mobile() {
				return this.$root.mobile;
			},

			createCategories(){
				return this.data.filter((el, index) => index > 2)
			},

			combinedCategories: function () {

				let categoriesArray = Object.values(this.categories);
				if (!this.popularCategory) delete categoriesArray[19]  // Remove POPULAR category by id
				const localCategory = Object.values(this.localCategory)
				const ordered = [...Object.values(localCategory).reverse(), categoriesArray[19],...categoriesArray];

				return (this.$route.name === 'pollFeed') ? ordered : this.categories;
			},
		},

		async mounted() {
			await this.$store.dispatch(`catalogList/list`);
			await this.$store.dispatch(`CatalogStore/GET_LIST`);
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
