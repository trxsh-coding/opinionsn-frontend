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
                        v-for="category in categories">
                    <catalog-item
                            :item="category"
                            :is-current-string="isCurrentString"
                            :current="current"
                            @click.native="onCategorySelect(category.id, category.name)" />
                </swiper-slide>
            </template>
            <template #scroll>
                <catalog-item
                        v-for="category in categories"
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
                mobile: this.$root.mobile
            }
        },
        computed: {

            ...mapState('globalStore', {

                categories: ({categories}) =>categories,

            }),
            
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
