<template lang="html">


    <div id="poll-wrapper">
        <div class="category-wrapper">
            <h1 class="catalog-header"><lang-string :title="'topics'"/></h1>
            <div class="category-section">
                <div class="category-block pointer" @click="categoryLink(category.id)" v-for="category in categories">
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
    import { mapState } from 'vuex';
    import langMixin from '../mixins/langMixin'
    import langString from '../langString'
    export default {
        data(){
            return {

            }
        },
        computed: {
            ...mapState('catalogList', {
                state: s => s,
                items: s => s.items
            }),
            ...mapState('globalStore', {
                categories: ({categories}) =>categories,
            }),

            /* HERE COME THE GETTERS */

            category: function () {



            }


        },
        methods: {

            categoryLink(catalogId) {
                this.$router.push({name:'catalogFeed',params:{id:catalogId}})
            },

        },


        mounted(){

            this.$store.dispatch(`catalogList/list`);

        },


        components: {
            langMixin,
            langString
        }
    }
</script>
<style lang="scss">
    .category-wrapper {

        .category-section {
            display: flex;
            flex-wrap: wrap;
            .catalog-header {

                font-family: Roboto;
                font-style: normal;
                font-weight: 500;
                line-height: 32px;
                font-size: 32px;
                color: #152D3A;
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
                    color: #FFFFFF;
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
                width: 160px;
                height: 112px;
            }

            .category-image {
                width: 160px;
                height: 112px;
                background-color: #FFFFFF;
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
                    z-index: 1000 ;
                    letter-spacing: 0.01em;
                    color: #FFFFFF;
                    margin-bottom: 22px;
                }
            }

        }

    }

    @media only screen and (max-device-width : 700px) {

        .category-section {

            justify-content: center;

        }

    }
</style>
