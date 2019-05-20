<template>
        <div
                class="avatar pointer"
                :style="{ 'background-image': 'url(' + imageUtil(author.path_to_avatar, size) + ')' } "
                @click="userLink">
        </div>
</template>

<script>
    import imageMixin from "../mixins/imageMixin";

    export default {
        name: "smallAvatar",
        props:['author', 'size'],
        mixins:[imageMixin],
        methods: {

            userLink() {
                this.$router.push({ name: "user", params: { id: this.author.id } });
            },

        }
    }
</script>

<style lang="scss">

</style>
