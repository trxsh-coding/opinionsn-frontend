<template>
    <div class="category-block">
        <scroll-swiper-reusable  :height="38" width="100%" >
            <catalog-item v-for="item in categories" :item="item" @click.native="onCategorySelect(item.id)"/>
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
            onCategorySelect(id){
                this.$emit('select', id)
            },
        }
    }
</script>

<style lang="scss">

</style>
