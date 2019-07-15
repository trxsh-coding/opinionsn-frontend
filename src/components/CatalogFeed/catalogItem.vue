<template>
    <div class="category-item flex-align-center" @click="setCategoryName(item.name)" :class="{current : isCurrent}">
        <div class="category-picture" :style="{ 'background-image': 'url(' + publicPath +  item.path_to_image +')' } ">

        </div>
        <div class="category-name">
            <lang-string :title="item.name" />
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import langString from '../langString'
    export default {
        name: "catalogItem",
        components:{langString},

        props:['item'],
        data() {
            return {
                publicPath: process.env.VUE_APP_MAIN_API
            }
        },
        methods: {

            setCategoryName(name){

                this.$store.commit('creationManagement/SET_CATEGORY_NAME', name )

            },

        },
        computed: {
            ...mapState('creationManagement', {

                current: s => s.form.subject_header,

            }),
            isCurrent(){
                if(this.current === this.item.name) return true
                else return false
            }
        }
    }
</script>

<style lang="scss">
    .current {
        background: #4B97B4 !important;
    }
    .category-item {
        padding: 8px 9px;
        width: 100%;
        height: 100%;
        margin-right: 10px;
        background: #BBBDC2;
        border-radius: 6px;

        span {

            font-family: Roboto;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            color: #FFFFFF;


        }
        .category-picture {
            min-height:22px;
            min-width: 22px;
            background-size: 100%;
            background-position: center;
            background-repeat: no-repeat;
            margin-right: 6px;
            filter: brightness(30);
        }
    }
</style>
