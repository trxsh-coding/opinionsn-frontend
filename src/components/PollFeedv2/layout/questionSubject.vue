<template>
    <div class="question-subject-block flex-align-center">
        <category-item :title="questionType" active class="mr-7"/>
        <category-item :title="categoryName" class="pointer" @click.native="setCategory(categoryId)" />
    </div>

</template>

<script>
    import CategoryItem from "../../categorySelectv2/CategoryItem";
    export default {
        name: "questionSubject",
        components: {CategoryItem},
        props: {
            questionType:String,
            categoryName:String,
            categoryId:Number
        },
        methods: {
            setCategory(id) {
                console.log(id)
                this.$store.commit('pollFeed/setFilterId', id);
                this.$store.dispatch('pollFeed/list');
            },
        },
        mounted() {
        }
    }
</script>

<style lang="scss">
    .question-subject-block {

    }
</style>
