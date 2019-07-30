<template>
    <div class="category-item flex-align-center pointer" :class="{current : isCurrent}" >
        <div class="category-picture" :style="{ 'background-image': 'url(' + publicPath +  imageUtil(item.path_to_image, 'W') +')' } ">

        </div>
        <div class="category-name">
            <lang-string :title="item.name" :class="{itemActive : hoverColor === 'B'}"/>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import langString from '../langString'
    import imageMixin from "../mixins/imageMixin";
    export default {
        name: "catalogItem",
        components:{langString},
        mixins:[imageMixin],
        props:['item'],
        data() {
            return {
                publicPath: process.env.VUE_APP_MAIN_API,
                hoverColor:'W'
            }
        },
        methods: {

            hoverItem(payload){
                this.hoverColor = payload;
            },
            setCategoryName(name){
                if(this.$route.name === 'pollFeed') {

                    this.$store.commit('pollFeed/setFilterId', this.item.id);

                    this.$store.dispatch('pollFeed/list');

                } else {

                    this.$store.commit('formManagment/SET_CATEGORY_NAME', name )


                }


            },

        },
        computed: {
            ...mapState('formManagment', {

                current: s => s.create_poll_form.subject_header,

            }),
            routeName(){

                return this.$route.name

            },

            isCurrent(){
                return this.current === this.item.name;
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
        white-space: nowrap;
    .itemActive {
        color: #4B97B4;
    }
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
        }
    }
</style>
