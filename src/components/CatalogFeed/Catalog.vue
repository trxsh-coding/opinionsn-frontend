<template lang="html">

    <ul id="category-list" class="pb-26 pl-60 pr-21" :class="{'bg-white pt-21': !mobile, 'pt-58': mobile}">

        <div class="category-block flex-column flex-center pointer p-15" v-for="{path_to_image, name, id} in categories"  @click="categoryLink(id)">
            <RePicture class="icon mr-auto" type="background" size="30" :url="publicPath + path_to_image" clip="contain" />
            <span class="caption mt-9">{{cropCategoryName(name)}}</span>
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
    import RePicture from "@/components/reusableСomponents/RePicture";
	export default {
		data() {
			return {
                publicPath: process.env.VUE_APP_ASSETS,
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
            
            mobile() {
                return this.$root.mobile;
            },

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
            RePicture,
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
        grid-row-gap: 12px;
        grid-column-gap: 24px;
        grid-auto-rows: 90px;
        grid-template-columns: repeat(auto-fit, 141px);
        justify-content: center;

        @media only screen and (max-width: 400px) {
            padding-right: 20px !important;
            grid-row-gap: 12px;
            grid-column-gap: 13px;
        }
    
        @media only screen and (max-width: 374px) {
            grid-template-columns: repeat(auto-fit, 111px);
            padding-right: 20px !important;
            grid-row-gap: 12px;
            grid-column-gap: 13px;
        }

        * {
            font-family: Roboto;
            font-style: normal;
        }

        .category-block {
            background-color: #fff;
            border-radius: 6px;
            border: 0.5px solid #BCBEC3;

            .caption {
                font-weight: normal;
                font-size: 15px;
                color: #747474;
            }

            &:hover {
                background-color: #4B96B3;
                border: none;

                .icon {
                    filter: brightness(40);
                }

                .caption {
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
