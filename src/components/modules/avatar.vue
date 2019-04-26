<template>
    <div class="notification-avatar" slot="avatar">
        <div
                class="avatar avatar-30x30 pointer"
                :style="{ 'background-image': 'url(' + author.path_to_avatar + ')' } "
                @click="userLink">
        </div>
    </div>
</template>

<script>
    export default {
        name: "avatar",
        props:['author'],
        methods: {

            userLink() {
                this.$router.push({ name: "user", params: { id: this.author.id } });
            },

        }
    }
</script>

<style lang="scss">

</style>
