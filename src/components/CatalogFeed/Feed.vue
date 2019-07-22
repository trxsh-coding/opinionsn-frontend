<template lang="html">

	<div id="catalog-feed" class="flex-column" :class="{'pt-58': mobile}">
		<div class="category-swiper pb-20">
			<scroll-swiper-reusable :stub-length="1">
				<button-reusable
						v-for="catalog in catalogs"
						class="w-fit category-btn mx-9 pointer"
						bg-color="transparent"
						button_type="underline"
						color="#1A1E22"
						active-color="#4B97B4"
						:description="catalog.name"
						@click.native="routerPush(catalog.id)"
						:active="catalog.id == id"
				/>
			</scroll-swiper-reusable>
		</div>

		<div v-for="item in items" class="mb-12 pl-21 pr-20" v-if="items.length">
			<event :item="item"/>
		</div>

		<loader-reusable class="mx-auto my-9" v-show="loading"/>

	</div>

</template>


<script>
	import axios from 'axios'
	import {mapState} from 'vuex';
	import event from './Event/Event'
	import langMixin from '../mixins/langMixin'
	import langString from '../langString'
	import IconBase from '../icons/IconBase'
	import IconBack from '../icons/IconBack'
	import LoaderReusable from "../reusableСomponents/LoaderReusable";
	import ScrollSwiperReusable from "../reusableСomponents/ScrollSwiperReusable";
	import ButtonReusable from "../reusableСomponents/ButtonReusable";

	export default {
		mixins: [langMixin],
		data() {
			return {
				mobile: this.$root.mobile,
				publicPath: process.env.VUE_APP_MAIN_API,
				catalogs: null
			}
		},
		computed: {
			...mapState('catalogList', {
				state: s => s,
				items: s => s.items,
				loading: s => s.loading
			}),

			...mapState('globalStore', {
				polls: ({polls}) => polls,
				users: ({users}) => users,
				categories: ({categories}) => categories,

			}),

			poll: function () {

				let {polls, id} = this;

				let poll;

				poll = polls[id]

				return poll;


			},

			category: function () {

				let {id, categories} = this;

				let category;

				category = categories[id];

				return category;


			},

			id() {
				return this.$route.params.id;
			}

		},
		methods: {

			getCategoriesState() {
				axios.get(`${process.env.VUE_APP_MAIN_API}/rest/categories`)
					.then((response) => {
						if (response.status === 200) {

							this.catalogs = response.data.categories

						}

					})
			},

			routerPush(id){

				this.$router.push({name:'catalogFeed',params:{ id }})
				this.$store.dispatch(`catalogList/list`, {customUrl: `${process.env.VUE_APP_MAIN_API}/rest/categories/${id}`});

			},

			backLink() {

				this.$router.push({path: '/catalogList'})

			}


		},


		mounted() {
			this.getCategoriesState();
			this.$store.dispatch(`catalogList/list`, {customUrl: `${process.env.VUE_APP_MAIN_API}/rest/categories/${this.id}`});
		},


		components: {
			ButtonReusable,
			ScrollSwiperReusable,
			LoaderReusable,
			event,
			langString,
			IconBase,
			IconBack
		}
	}
</script>

<style lang="scss">

	.catalog__name {


		font-family: Roboto;
		font-style: normal;
		font-weight: 500;
		font-size: 22px;
		line-height: 18px;
		text-align: center;
		color: #152D3A;
		font-variant-caps: all-small-caps;


	}

	.category-swiper {
		.category-btn {
			span {
				white-space: nowrap;
				font-family: Roboto;
				font-style: normal;
				font-weight: 500;
				font-size: 15px;
				line-height: 18px;


			}
		}
	}

	.icon-back {
		float: left;

		g {

			fill: none;

		}

	}

	.category-mobile {
		margin-top: 6px;
		text-align: center;

	}

	.category-background {

		display: none;

	}


</style>
