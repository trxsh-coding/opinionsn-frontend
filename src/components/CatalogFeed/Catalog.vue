<template lang="html">


    <div id="poll-wrapper">
        <div class="category-wrapper">
			<div class="category-search">
				<input :placeholder="'Поиск'" v-model="keyword" @change="searchCategory" @keyup.enter.native="searchCategory"/>
				<i class="el-icon-circle-close" @click="keyword = ''"></i>
			</div>
            <div class="category-section">
                <div class="category-block pointer" @click="categoryLink(category.id)" v-for="category in filteredCategories || categories">
                    <div class="category-image relative"  :style="{ 'background-image': 'url(' + category.path_to_image + ')' } " >
                        <div class="category-subject">
                            <h1><lang-string :title="category.name" /></h1>
                        </div>
                        <div class="overlay">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>



<script>
	import { mapState } from "vuex";
	import langMixin from "../mixins/langMixin";
	import langString from "../langString";
	import { localString } from "../../utils/localString";
	export default {
		data() {
			return {
				keyword: "",
				filteredCategories: null
			};
		},
		computed: {
			...mapState("catalogList", {
				state: s => s,
				items: s => s.items
			}),
			...mapState("globalStore", {
				categories: ({ categories }) => categories
			}),

			/* HERE COME THE GETTERS */

			category: function() {},
			lstr() {
				return str => localString(this.lang, str);
			}
		},
		methods: {
			categoryLink(catalogId) {
				this.$router.push({
					name: "catalogFeed",
					params: { id: catalogId }
				});
			},

			searchCategory() {
				let { categories, keyword } = this;

				// Фильтрация юзеров через регекс
				keyword === ""
					? (this.filteredCategories = categories)
					: (this.filteredCategories = Object.values(categories).filter(
							({ name }) => name.search(new RegExp(keyword)) >= 0
					  ));
			}
		},

		mounted() {
			this.$store.dispatch(`catalogList/list`);
		},

		components: {
			langMixin,
			langString
		}
	};
</script>
<style lang="scss">
	.category-wrapper {
		.category-search {
			position: relative;
			width: calc(100% - 17px);
			margin: 0 auto;
			margin-bottom: 15px;
			input {
				width: 100%;
				height: 23px;
				background-color: transparent;
				border: none;
				border-bottom: 1px solid #69777f;
				outline: none;
			}

			.el-icon-circle-close {
				position: absolute;
				top: 4px;
				right: 2px;
			}
		}

		.category-section {
			display: flex;
			flex-wrap: wrap;
			.catalog-header {
				font-family: Roboto;
				font-style: normal;
				font-weight: 500;
				line-height: 32px;
				font-size: 32px;
				color: #152d3a;
				margin: 0;
				margin-bottom: 15px;
			}

			.category-subject {
				padding: 3px;

				border-radius: 12px;
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				font-variant-caps: all-small-caps;

				span {
					font-family: Roboto;
					font-style: normal;
					font-weight: 500;
					font-size: 20px;
					line-height: normal;
					text-align: center;
					color: #ffffff;
					text-transform: uppercase;
				}
			}

			.overlay {
				width: 100%;
				height: 100%;
				background: #000;
				opacity: 0.3;
				border-radius: 12px;
			}

			.category-block {
				margin: 0 0px 6px 0;
				margin-right: 6px !important;
				width: 168px;
				height: 112px;
			}

			.category-image {
				width: 168px;
				height: 112px;
				background-color: #ffffff;
				border-radius: 12px;
				background-size: cover;
				background-repeat: no-repeat;
				background-position: center;
				display: flex;
				justify-content: center;
				align-items: center;
				h1 {
					font-family: Roboto;
					font-style: normal;
					font-weight: 500;
					font-size: 15px;
					line-height: 16px;
					z-index: 1000;
					letter-spacing: 0.01em;
					color: #ffffff;
					margin-bottom: 22px;
				}
			}
		}
	}

	@media only screen and (max-device-width: 700px) {
		.category-section {
			justify-content: center;
		}
	}
</style>
