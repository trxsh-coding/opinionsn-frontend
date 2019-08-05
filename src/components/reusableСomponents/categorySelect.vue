<template>
    <div class="category-block">
        <swiper-reusable
                :height="38"
                width="100%"
                :amount-of-slides="'auto'"
                :spaceBetween="15"
                :swiper-type="mobile ? 'scroll' : 'usual'">
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
        </swiper-reusable>
        
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import langMixin from '../mixins/langMixin'
    import CatalogItem from "../CatalogFeed/catalogItem";
    import swiperReusable from "./swiperReusable";
    
    export default {
        name: "categorySelect",
        components: {swiperReusable, CatalogItem},
        mixins:[langMixin],
        props:['current', 'isCurrentString'],
        data() {
            return {
                mobile: this.$root.mobile,
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

</style>
