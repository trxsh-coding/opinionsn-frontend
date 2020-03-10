<template>

    <img
            v-if="_lang === 'ru'"
            :style="imageStyle"
            src="../../assets/google-play-badge-ru.png"
            alt="Доступно в Google Play">

    <img
            v-else
            :style="imageStyle"
            src="../../assets/google-play-badge-en.png"
            alt="Get it on Google Play">


</template>

<script>
    import {mapState} from "vuex";

    const WIDTH = 135.421686747;
    const HEIGHT = 40;

    export default {
        name: "DownloadOnThePlayMarketBadge",

        data() {
            return {
                WIDTH,
                HEIGHT
            }
        },

        props: {
            sizeScale: {
                type: Number,
                default() {
                    return 1
                }
            },

            height: {
                type: Number
            },

            width: {
                type: Number
            }
        },

        computed: {

            imageStyle() {
                return {
                    padding: "-20px",
                    width: `${this.width || this.WIDTH * this.sizeScale}px`,
                    height: `${this.height || this.HEIGHT * this.sizeScale}px`
                }
            },

            ...mapState('lang', {
                _lang: s => s.locale._lang,
            }),
        },

    }
</script>
