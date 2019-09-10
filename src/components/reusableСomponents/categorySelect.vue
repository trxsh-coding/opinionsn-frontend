<template>
    <div class="category-block">
        <ReSwiper :type="mobile ? 'scroll' : 'usual'"
                  :params="{height: 38, width: '100%', amountOfSlides: 4, spaceBetween: 10}">
            <template #usual>
                <swiper-slide
                        class="w-fit"
                        v-for="category in combinedCategories">
                    <catalog-item
                            :item="category"
                            :is-current-string="isCurrentString"
                            :current="current"
                            @click.native="onCategorySelect(category.id, category.name)" />
                </swiper-slide>
            </template>
            <template #scroll>
                <catalog-item
                        v-for="category in combinedCategories"
                        :item="category"
                        :is-current-string="isCurrentString"
                        :current="current"
                        @click.native="onCategorySelect(category.id, category.name)" />
            </template>
        </ReSwiper>
        
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import langMixin from '../mixins/langMixin'
    import CatalogItem from "../CatalogFeed/catalogItem";
    import ReSwiper from "./ReSwiper";
    
    export default {
        name: "categorySelect",
        components: {ReSwiper, CatalogItem},
        mixins:[langMixin],
        props:['current', 'isCurrentString'],
        data() {
            return {
                localCategory: {
                    "18": {
                        id:-2,
                        name:'new',
                        path_to_image:require('../../assets/new.svg'),
                        local: true},
                    "20":{
                        name:'all',
                        id:-1,
                        path_to_image:require('../../assets/all.svg'),
                        local: true
                    },
                },
            }
        },
        computed: {

            ...mapState('globalStore', {

                categories: ({categories}) =>categories,

            }),
    
            mobile() {
                return this.$root.mobile;
            },
            
            combinedCategories: function(){
                let {localCategory, categories} = this;
                const unordered ={...localCategory, ...categories}
                const array = Object.values(unordered)
                const ordered = array.reverse();
                if(this.$route.name === 'pollFeed') {
                    return ordered;

                } else {
                    return categories;
                }
            },
        },
        mounted(){
            this.$store.dispatch(`catalogList/list`);

        },
        methods: {
            onCategorySelect(id, name){
                this.$emit('on-select', { id, name })
            },
        }
    }
</script>

<style lang="scss">
    .category-block {
        .swiper-container {
            height: 38px;
        }
    }
</style>
