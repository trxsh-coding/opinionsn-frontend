<template>
	<div class="filter-component">
		<div class="flex-column filter-category" @click="setFilter(category.id)"	>

			<div class="category-picture "
				 :class="{active : activeFilter}"
				 :style="{ 'background-image': 'url('+ publicPath + category.path_to_image + ')' }"></div>

			<lang-string class="lowercase name" :title="category.name"/>


		</div>
	</div>
</template>

<script>
	import langString from '../../langString'

	export default {

		name: "filterComponent",
		props: ["category", "filtered", "id"],
		components: {langString},
		data() {

			return {

				publicPath: process.env.VUE_APP_MAIN_API

			}

		},

		methods: {

			setFilter(id) {


				this.$store.commit('pollFeed/setFilterId', id)

				this.$store.dispatch('pollFeed/list')

				// this.$emit('getFeed', [id, !this.filtered]);

			}

		},
		computed: {
			activeFilter(){

				let {category, id} = this;

				if (category.id == id) {

					return true

				} else {

					return false

				}


			},

		}
	}
</script>

<style lang="scss">
	.filter-component {

		.active {

			background-color: #4B97B4 !important;

		}
	}
	.filter-category::selection {
		background: transparent;

	}

	.filter-category {
		align-items: center;

		.name {
			font-family: Roboto;
			font-style: normal;
			font-weight: 500;
			font-size: 12px;
			line-height: normal;
			text-align: center;
			font-variant: small-caps;
			color: #152D3A;
			word-break: keep-all;

			// FOR Safari ≥ 9
			@supports (-webkit-appearance:none) {
				font-variant: normal;
				font-size: 8px;
				text-transform: uppercase;
			}


		}

		@-moz-document url-prefix() {
			.name {
				font-size: 10px;
			}
		}

		.category-picture {
			background: #FFFFFF;
			border-radius: 12px;
			width: 90px;
			height: 36px !important;
			background-repeat: no-repeat;
			background-position: center;
			background-size: 30%;
			margin-bottom: 6px;
			margin-right: 18.5px;

		}

	}
	@media only screen
	and (min-width: 300px)
	and (max-width: 765px){
		.category-picture {
			margin-right: 10px;
		}
	}
</style>
