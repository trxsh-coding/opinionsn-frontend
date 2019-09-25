<template>
    <div class="category-item text-deselect flex-column pointer" :class="{isCurrent}">
        
        <div class="picture-wrapper v-center br-6 w-90 h-36">
            <RePicture type="background" :url="(item.local ? '' : assetsPath) + item.path_to_image"
                       class="picture" width="21" height="30" clip="contain" />
        </div>
        
        <lang-string class="text-center capitalize mt-8" :title="item.name | trim"/>
        
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import langString from '../langString'
    import imageMixin from "../mixins/imageMixin";
    import RePicture from "@/components/reusableСomponents/RePicture";
    export default {
        name: "catalogItem",
        components:{RePicture, langString},
        mixins:[imageMixin],
        props:{
            item: {
                type:Object
            },
            isCurrentString: {
                type: Boolean
            },
            current: {
                type: [Number, String],
            }
        },
        data() {
            return {
                assetsPath: process.env.VUE_APP_ASSETS
            }
        },
        filters: {
            trim(value) {
                return (value.length > 16) ? value.slice(0, 13) + '...' : value;
            }
        },
        computed: {
            isCurrent(){
                let {item, current, isCurrentString} = this;
                return isCurrentString ? current === item.name : current === this.item.id;
            }
        }
    }
</script>

<style lang="scss">
    
    .category-item {
        
        &.isCurrent {
            .picture-wrapper {
                background: #4B97B4;
                
                .picture {
                    filter: brightness(30);
                }
            }
        }
    
        .picture-wrapper {
            background: #ffffff;
        }
        
        span {
            font-family: Roboto;
            font-style: normal;
            font-weight: normal;
            font-size: 11px;
            color: #1A1E22;
        }
    }

</style>
