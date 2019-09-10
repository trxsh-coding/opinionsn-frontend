<template>
    <div class="followers-swiper">
        <follower-picture  :img=""/>
    </div>
</template>

<script>
    import followerPicture from "../../reusableСomponents/PictureReusable";
    export default {
        props: ['followers'],
        name: "followersSwiper",
        components: {followerPicture},
        data() {
            return {
                publicPath: process.env.VUE_APP_ASSETS,

            }
        },
    }
</script>

<style lang="scss">
    .followers-swiper {

    }
</style>
