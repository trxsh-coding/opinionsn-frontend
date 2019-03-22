<template>
    <div>
        <div class="flex-column filter-category" @click="setFilter(category.id)">

            <div class="category-picture "  :style="{ 'background-image': 'url('+ category.path_to_image + ')' }"> </div>

            <span>
                {{category.name}}
            </span>



        </div>
    </div>
</template>

<script>
    export default {

        name: "filterComponent",
        props: ["category", "filtered"],
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
        span {

            font-family: Roboto;
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: 14px;
            text-align: center;
            letter-spacing: 0.115547px;
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
