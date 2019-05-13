<template lang="html">


    <div id="poll-wrapper">
        <!-- Ошибка -->
        <!--<div v-if="state.error">-->
            <!--Что-то сломалось:-->
            <!--{{state.error}}-->
        <!--</div>-->

        <!-- Загрузка -->
        <!--<div v-else-if="state.loading">-->
        <!--<p align="center" style="font-size:10px;margin-top: 5px;color: darkgray">Загружаю ленту мнений...</p>-->
        <!--</div>-->

        <!-- Нет данных -->
        <!--<div v-else-if="!items.length">-->
            <!--<p align="center" style="font-size:10px;margin-top: 5px;color: darkgray">Нет событий</p>-->
        <!--</div>-->


        <!-- Всё ок -->

        <div class="catalog-main-wrapper">
            <div class="category-background mb-10" :style="{ 'background-image': 'url(' + category.path_to_image + ')' } ">

                <div class="category-subject">
                    <span><lang-string :title="category.name"/></span>
                </div>

            </div>

            <!-- <div class="category-subject category-mobile mb-15">
                <span @click="backLink">
                    <icon-base
                            class="icon-back"
                            fill="#152D3A"
                            width="12"
                            height="20"
                            viewBox="0 0 12 20"
                            icon-name="add-poll"><icon-back/>
                </icon-base>
                </span>
                <span><lang-string class="catalog__name" :title="category.name"/></span>
            </div> -->

            <div v-for="item in items" class="mb-6" v-if="items.length">
                <event :item="item"/>
            </div>

        </div>

    </div>




</template>



<script>
    import { mapState } from 'vuex';
    import event from './Event/Event'
    import langMixin from '../mixins/langMixin'
    import langString from '../langString'
    import IconBase from '../icons/IconBase'
    import IconBack from '../icons/IconBack'
    export default {
        mixins:[langMixin],
        data(){
            return {
                id: this.$route.params.id
            }
        },
        computed: {
            ...mapState('catalogList', {
                state: s => s,
                items: s => s.items
            }),

            ...mapState('globalStore', {
                polls: ({polls}) =>polls,
                users: ({users}) =>users,
                categories: ({categories}) => categories,

            }),

            poll: function () {

                let {polls, id} = this;

                let poll;

                poll = polls[id]

                return poll;


            },

            category: function () {

                let {id, categories} = this;

                let category;

                category = categories[id];

                return category;


            }

        },
        methods: {


            backLink(){

                this.$router.push({path: '/catalogList'})

            }


        },


        mounted(){
            this.$store.dispatch(`catalogList/list`, {customUrl: `${process.env.VUE_APP_MAIN_API}/rest/categories/${this.id}`});

        },





        components: {
            event,
            langString,
            IconBase,
            IconBack
        }
    }
</script>

<style lang="scss">

    .catalog__name {


        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        font-size: 22px;
        line-height: 18px;
        text-align: center;
        color: #152D3A;
        font-variant-caps: all-small-caps;



    }
    .icon-back {
        float: left;
        g {

            fill:none;

        }

    }

        .category-mobile {
            margin-top: 6px;
            text-align: center;

        }
        .category-background {

            display: none;

        }


</style>
