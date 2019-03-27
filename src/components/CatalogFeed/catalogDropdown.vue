<template>
    <div class="catalog-list">
        <el-select
                class="max-width"
                :value="selected"
                :placeholder="lstr('choose_poll_topic')"
                @change="onSelect">
            <el-option

                    v-for="category in categories"
                    :key="category.id"
                    :label="lstr(category.name)"
                    :value="category.id">
            </el-option>
        </el-select>
    </div>
</template>

<script>

    import { mapState } from 'vuex'
    import langMixin from '../mixins/langMixin'
    export default {
        mixins:[langMixin],
        name: "catalogDropdown",
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

            onSelect(id) {
                let category = this.categories[id];
                this.selected = id;
                this.model[this.field] = category.name;
                this.$emit('change', id, category.name)
            }

        },

        mounted(){

            this.$store.dispatch(`catalogList/list`);

        },

    }
</script>

<style lang="scss">

</style>
