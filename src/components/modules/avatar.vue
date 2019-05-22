<template>
    <div class="notification-avatar" slot="avatar" >
        <div
                class="avatar pointer avatar-25x25"
                :style="{ 'background-image': 'url(' + imageUtil(author.path_to_avatar, 'S') + ')' } "
                @click="userLink">
        </div>
    </div>
</template>

<script>
    import imageMixin from "../mixins/imageMixin";

    export default {
        name: "avatar",
        props:['author'],
        mixins:[imageMixin],
        methods: {

            userLink() {
                this.$router.push({ name: "user", params: { id: this.author.id } });
            },

        }
    }
</script>

<style lang="scss">
.notification-avatar {
	margin-bottom: auto;
}
</style>
