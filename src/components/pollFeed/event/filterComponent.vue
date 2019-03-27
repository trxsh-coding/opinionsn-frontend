<template>
    <div>
        <div class="flex-column filter-category" @click="setFilter(category.id)">

            <div class="category-picture "  :style="{ 'background-image': 'url('+ category.path_to_image + ')' }"> </div>

            <lang-string class="lowercase name" :title="category.name" />



        </div>
    </div>
</template>

<script>
    import langString from '../../langString'
    export default {

        name: "filterComponent",
        props: ["category", "filtered"],
        components:{langString},
        data(){

            return {


            }

        },

        methods: {

            setFilter(id){


                this.$store.commit('pollFeed/setFilterId', id)

                this.$store.dispatch('pollFeed/list')

                // this.$emit('getFeed', [id, !this.filtered]);

            }

        }
    }
</script>

<style lang="scss">
    .filter-category::selection {
        background: transparent;

    }
    .filter-category {
        align-items: center;
        .name {

            font-family: Roboto;
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 18px;
            text-align: center;
            font-variant: small-caps;
            color: #152D3A;

        }
        .category-picture {
            border-radius: 12px;
            width: 93px;
            height: 60px;
            background-repeat: no-repeat;
            background-size: cover;

        }

    }
</style>
