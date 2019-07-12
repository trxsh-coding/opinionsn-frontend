<template lang="html">

    <ul id="category-list" class="pt-21 pb-26 pl-60 pr-21" :class="{'bg-white': !mobile, 'mt-58': mobile}">

        <div class="category-block flex-column flex-center pointer p-15" v-for="{path_to_image, name, id} in categories"  @click="categoryLink(id)">
            <picture-reusable
                    pic-class="mb-9 mr-auto"
                    text-layout="bottom"
                    :img="publicPath + path_to_image"
                    size="30">
                <template #title>{{cropCategoryName(name)}}</template>
            </picture-reusable>
        </div>

    </ul>

</template>



<script>
	import { mapState } from "vuex";
	import langMixin from "../mixins/langMixin";
	import langString from "../langString";
    import IconBase from "../icons/IconBase";
    import IconClose from "../icons/IconZoomIn";
    import { localString } from "../../utils/localString";
    import imageMixin from "../mixins/imageMixin";
    import PictureReusable from "../reusableСomponents/PictureReusable";
	export default {
		data() {
			return {
                mobile: this.$root.mobile,
				publicPath: process.env.VUE_APP_MAIN_API
			};
		},
        mixins:[imageMixin],
		computed: {
			...mapState("catalogList", {
				items: ({ items }) => items
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

			cropCategoryName(name) {
			    let { lstr } = this;
				return lstr(name).split(' ')[0];
			}
		},

		mounted() {
			this.$store.dispatch(`catalogList/list`);
		},

		components: {
            PictureReusable,
			langMixin,
			langString,
            IconBase,
            IconClose
		}
	};
</script>
<style lang="scss">
    #category-list {
        position: relative;
        width: 100%;
        border-radius: 6px;
        display: grid;
        grid-auto-rows: 90px;
        grid-template-columns: repeat(auto-fit, 141px);
        grid-gap: 12px;
        justify-content: center;

        @media only screen and (max-width: 374px) {
            padding-left: 0;
        }

        * {
            font-family: Roboto;
            font-style: normal;
        }

        .category-block {
            background-color: #fff;
            border-radius: 6px;

            .title {
                font-weight: normal;
                font-size: 15px;
                color: #747474;
            }

            &:hover {
                background-color: #4B96B3;

                .picture {
                    filter: brightness(40);
                }
                
                .title {
                    color: #fff;
                }
            }

        }
    }

    /*@media only screen and (max-width: 700px) {*/
    /*    justify-content: center !important;*/
    /*    .category-block, .category-image {*/

    /*        width: 174px !important;*/
    /*        height: 121px !important;*/

    /*        @media (max-width: 360px) {*/
    /*            width: 146px !important;*/
    /*        }*/

    /*    }*/
    /*    .category-block:nth-child(2n){*/

    /*        margin-right: 0 !important;*/

    /*    }*/
    /*    .search-panel {*/

    /*        margin-bottom: 12px;*/

    /*    }*/
    /*}*/

</style>
