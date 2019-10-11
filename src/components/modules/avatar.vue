<template>
    <div class="notification-avatar" slot="avatar" >
        <router-link class="flex pointer" :to="{ name: 'user', params: { id: this.author.id } }">
            <RePicture :url="author.path_to_avatar | assetsPath" rounded size="25" />
        </router-link>
    </div>
</template>

<script>
    import imageMixin from "../mixins/imageMixin";
    import RePicture from "@/components/reusableСomponents/RePicture";
    import assetsPathMixin from "@/components/mixins/assetsPathMixin";

    export default {
        name: "avatar",
        components: {RePicture},
        props:['author'],
        mixins:[imageMixin, assetsPathMixin],
    }
</script>

<style lang="scss">
.notification-avatar {
	margin-bottom: auto;
}
</style>
