<template>
    <div class="category-wrapper">
        <ReSwiper
                  :params="{height: 'fit-content', width: '100%'}"
                  :usual-swiper-options="{slidesPerView: 'auto', spaceBetween: 10, breakpoints: false}">
            <template #usual>
                <swiper-slide

                        v-for="category in data"
                        class="w-fit">
                    <div class="item-wrapper">
                        <CategoryItem class="pointer"  :title="category.name"  :image="category.path_to_image" :active="current === category.id" :id="category.id" @onPress="setCategory"/>
                    </div>

                </swiper-slide>
            </template>
            <template #scroll>
                <div class="item-wrapper"   v-for="(category, i) in data"  >
                    <CategoryItem class="pointer" :ref="'category_item_' + category.id"   :title="category.name" :active="current === category.id" :id="category.id" @onPress="setCategory"/>

                </div>
            </template>
        </ReSwiper>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import ReSwiper from "../reusableСomponents/ReSwiper";
    import CategoryItem from './CategoryItem'
    export default {
        name: "CategorySelect",
        components: {ReSwiper, CategoryItem},
        props: {
          current:Boolean
        },
        watch:{
            filter_id(val, oldVal){
                if(val !== oldVal){
                    this.scrollToItem()
                }
            }
        },
        computed: {
            mobile() {
                return this.$root.mobile;
            },
            ...mapState('CatalogStore', {

                data: ({data}) => data,

            }),
            ...mapState("pollFeed", {
                filter_id: state => state.filter_id,
            }),
        },
        methods: {
          scrollToItem(){
              console.log(this.$refs)
              this.$refs[`category-item${this.filter_id}`].scrollIntoView({behavior: "smooth", alignToTop:true})
          },
          setCategory(id){
              this.$emit('setCategory', id)
          }
        },
        async mounted() {
            await this.$store.dispatch(`CatalogStore/GET_LIST`);
        },
    }

</script>

<style lang="scss">
    .category-wrapper {
        padding: 15px;
    }
</style>
