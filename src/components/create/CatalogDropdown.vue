<template>
    <div class="catalog-dropdown">
        <reusable-select
                custom-placeholder="select_a_category"
                :items="categories"
                @change="selectOption"
                v-model="selected"
        />
    </div>
</template>

<script>

    import { mapState } from 'vuex'
    import langMixin from '../mixins/langMixin'
    import ReusableSelect from "../reusableСomponents/reusableSelect";
    export default {
        components: {ReusableSelect},
        mixins:[langMixin],
        name: "catalogDropdown",
        model: {
          prop: 'selected',
          event: 'change'
        },
        props:['model', 'field'],
        data() {
            return {
                selected: null
            }
        },

        computed: {

            ...mapState('globalStore', {

                categories: ({categories}) =>categories,

            }),
        },

        methods: {

            selectOption(){

                this.$store.commit('Create')

            }

        },

        mounted(){

            this.$store.dispatch(`catalogList/list`);

        },

    }
</script>

<style lang="scss">

</style>
