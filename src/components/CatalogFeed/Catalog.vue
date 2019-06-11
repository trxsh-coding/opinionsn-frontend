<template lang="html">


    <div id="poll-wrapper">
        <div class="category-wrapper">

            <div class="search-panel flex-align-center category-search" v-if="mobile">
                <el-input
					class="br-12"
					:placeholder="lstr('search')"
					v-model="keyword"
					@change="searchCategory"
					keyup.enter.native="searchCategory">
					<template slot="append" >
						<i  @click="clearSearchField">
                            <icon-base
                                    class="icon-close"
                                    fill="none"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 10 20"
                                    icon-name="close">
                                <icon-close />
                            </icon-base>
                        </i>
					</template>
				</el-input>
<!--				<div class="search-btn v-center pointer">-->
<!--					<icon-base-->
<!--						fill="none"-->
<!--						width="15"-->
<!--						height="15"-->
<!--						viewBox="0 0 15 15"-->
<!--						icon-name="close">-->
<!--						<icon-close />-->
<!--					</icon-base>-->
<!--				</div>-->
            </div>

            <div class="category-section mt-15">
                <div class="category-block pointer" @click="categoryLink(category.id)" v-for="category in filteredCategories || categories">
                    <div class="category-image relative"  :style="{ 'background-image': 'url(' + publicPath + category.path_to_image + ')' } " >
                        <div class="category-subject">
                            <h1><span>{{ cropCategoryName(lstr(category.name)) }}</span></h1>
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
    import IconBase from "../icons/IconBase";
    import IconClose from "../icons/IconZoomIn";
    import { localString } from "../../utils/localString";
    import imageMixin from "../mixins/imageMixin";
	export default {
		data() {
			return {
				keyword: "",
				filteredCategories: null,
                mobile: this.$root.mobile,
				publicPath: process.env.VUE_APP_MAIN_API
			};
		},
        mixins:[imageMixin],
		computed: {
			...mapState("catalogList", {
				state: s => s,
				items: s => s.items
			}),
			...mapState("globalStore", {
				categories: ({ categories }) => categories
			}),

			...mapState("lang", {
				lang: ({ locale }) => locale
			}),

			/* HERE COME THE GETTERS */

			// category: function() {},
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
            clearForm(){

                this.keyword = ''
                this.filteredCategories = this.categories

            },
			searchCategory() {
				let { categories, keyword, lang } = this;

				// Фильтрация юзеров через регекс
				if (keyword === "") {
					this.filteredCategories = categories;
				} else {
					// Отфильтрованные пары ключ+значение из this.lang
					let langFilteredEntries = Object.entries(lang).filter(
						arr => arr[1].search(new RegExp(keyword, "i")) >= 0
					);

					// Получаем ключевое слово || слова для поиска в this.categories
					let keyName = "";
					langFilteredEntries.forEach((arr, index) => {
						let { length } = langFilteredEntries;

						switch (length) {
							case 1:
							case index + 1:
								keyName += arr[0];
								break;
						
							default:
								keyName += arr[0] + "|";
								break;
						}
					});

					this.filteredCategories = Object.values(categories).filter(
						({ name }) =>
							name.search(new RegExp(`^(${keyName})$`, "im")) >= 0
					);
				}
			},

			clearSearchField() {
				this.keyword = '';
				this.searchCategory();
			},

			cropCategoryName(name) {
				return name === "Технологии и наука" ? "Технологии" : name;
			}
		},

		mounted() {
			this.$store.dispatch(`catalogList/list`);
		},

		components: {
			langMixin,
			langString,
            IconBase,
            IconClose
		}
	};
</script>
<style lang="scss">
	.category-wrapper {
        .icon-close {
            transform: rotate(45deg);
        }
		.category-search {
			position: relative;
			width: calc(100% - 17px);
			margin: 0 auto;
			margin-bottom: 15px;
			input {
				width: 100%;
				background: #FFFFFF;
				border: 1px solid #C4CCD0;
				border-radius: 24px 0 0 24px;
				padding-right: 42px;
				border-right: none;
			}

			.el-input-group__append {
				border-radius: 0 24px 24px 0;
				border: 1px solid #C4CCD0;
				border-left: none;
				background-color: #FFFFFF;
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

				bottom: 30px;

                // FOR Safari ≥ 9
                @supports (-webkit-appearance:none) {
                    font-variant-caps: normal;

                    h1 span {
                        font-size: 13px !important;
                    }
                }

				h1 {
					margin: 0 !important;

					span {
						font-family: Roboto;
						font-style: normal;
						font-weight: 500;
						font-size: 20px;
						line-height: normal;
						text-align: center;
						color: #152D3A;
						text-transform: uppercase;
					}
				}

			}

            .icon-close {

                transform: rotate(45deg);

            }

			.overlay {
				width: 100%;
				height: 100%;
				/*background: #000;*/
				opacity: 0.3;
				border-radius: 12px;
			}

			.category-block {
				margin: 0 0px 6px 0;
				margin-right: 6px !important;
				width: 161px;
				height: 112px;
			}

			.category-image {
				width: 161px;
				height: 112px;
				background-color: #ffffff;
				border-radius: 12px;
				background-size: 22%;
				background-repeat: no-repeat;
				background-position: 50% 32%;
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
		@media only screen and (max-width: 700px) {
			.category-section {
				justify-content: center !important;
				.category-block, .category-image {

					width: 174px !important;
					height: 121px !important;

					@media (max-width: 360px) {
						width: 146px !important;
					}

				}
				.category-block:nth-child(2n){

					margin-right: 0 !important;

				}
				.search-panel {

					margin-bottom: 12px;

				}
			}
		}
	}


</style>
