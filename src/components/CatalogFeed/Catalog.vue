<template lang="html">


    <div id="poll-wrapper">
        <!-- Ошибка -->
        <div v-if="state.error">
            Что-то сломалось:
            {{state.error}}
        </div>
        <div v-else class="category-wrapper">
            <h1 class="catalog-header">Каталог тем</h1>
            <div class="category-section">
                <div class="category-block " @click="categoryLink(category.id)" v-for="category in categories">
                    <div class="category-image"  :style="{ 'background-image': 'url(' + category.path_to_image + ')' } " >
                        <div class="category-subject">
                            <span>{{category.name}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>



<script>
    import { mapState } from 'vuex';

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

            .category-block {

                margin: 0 6px 6px 0;

            }

            .category-image {

                width: 142px;
                height: 102px;
                border-radius: 12px;
                background-size: 50% 50%;
                background-repeat: no-repeat;
                background-size: cover;
                display: flex;
                align-items: flex-end;
                padding: 0 0 10px 15px;
                span {

                    font-family: Roboto;
                    font-style: normal;
                    font-weight: 500;
                    line-height: 16px;
                    font-size: 15px;
                    color: #FFFFFF;

                }
            }

        }

    }
</style>
