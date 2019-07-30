<template>
    <div class="category-block">
        <scroll-swiper-reusable  :height="38" width="100%" >
            <catalog-item v-for="item in categories" :item="item" @click.native="onCategorySelect(item.id, item.name)"/>
        </scroll-swiper-reusable>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import langMixin from '../mixins/langMixin'
    import CatalogItem from "../CatalogFeed/catalogItem";
    import ScrollSwiperReusable from "./ScrollSwiperReusable";
    export default {
        name: "categorySelect",
        components: {ScrollSwiperReusable, CatalogItem},
        mixins:[langMixin],
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
                this.$emit('on-select', id, name)
            },
        }
    }
</script>

<style lang="scss">

</style>
