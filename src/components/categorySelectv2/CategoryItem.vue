<template>
    <div class="category-item">
        <div class="category-block flex-align-center"
             @click="$emit('onPress', id)"
             :class="{'active-category' : active,'inactive-category': !active}">
<!--            <RePicture :url="image | addAssetsPath" height="18px" width="auto" class="flex"  v-if="image" />-->

            <span >{{translateKeyword(title)}}</span>
        </div>
    </div>
</template>

<script>
    import translateKeywordMixin from "../mixins/translateKeywordMixin";
    import RePicture from "../reusableСomponents/RePicture";

    export default {
        name: "CategoryItem",
        components: {RePicture},
        mixins:[translateKeywordMixin],
        props: {
            id:Number,
            title:Object,
            image:String,
            active:Boolean
        }
    }
</script>

<style lang="scss">
    .category-item {
        .active-category, .inactive-category {
            padding: 5.5px 19px 6px 20px;
            border-radius: 5px;
            border: 1px solid #4B96B3;
            span {
                font-size: 13px;
                text-align: center;
            }
        }
        .active-category {
            background: #4B96B3;
            span {
                color:#ffffff;
            }
        }
        .inactive-category {
            background: #ffffff;
            span {
                color:#4B96B3;
            }
        }
    }
</style>
