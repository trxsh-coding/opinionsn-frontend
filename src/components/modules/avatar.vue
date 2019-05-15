<template>
    <div class="notification-avatar" slot="avatar">
        <div
                class="avatar avatar-30x30 pointer"
                :style="{ 'background-image': 'url(' + publicPath + author.path_to_avatar + ')' } "
                @click="userLink">
        </div>
    </div>
</template>

<script>
    export default {
        name: "avatar",
        props:['author'],
        data(){

            return {

                publicPath: process.env.VUE_APP_MAIN_API

            }

        },
        methods: {

            userLink() {
                this.$router.push({ name: "user", params: { id: this.author.id } });
            },

        }
    }
</script>

<style lang="scss">

</style>
