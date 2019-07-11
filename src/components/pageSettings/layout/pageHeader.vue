<template>
    <div class="header">

        <div class="background">

            <picture-reusable
                    class="avatar absolute"
                    size="72"
                    rounded
                    without-text/>
        </div>

    </div>
</template>

<script>
    import PictureReusable from "../../reusableСomponents/PictureReusable";

    export default {
        name: "pageHeader",
        components: {
            PictureReusable
        }
    }
</script>

<style lang="scss">

    .settings-page {

        .header {
            height: 156px;

            .background {
                position: relative;
                height: 132px;
                background-color: #ADAFB3;
                background-size: contain;
                background-repeat: no-repeat;

                .avatar {
                    bottom: -24px;
                    left: -10px;
                }
            }

        }
    }


</style>