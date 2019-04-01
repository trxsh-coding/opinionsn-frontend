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




        },


        mounted(){
            this.$store.dispatch(`catalogList/list`, {customUrl: `/api/rest/categories/${this.id}`});

        },





        components: {
            event,
            langString
        }
    }
</script>
