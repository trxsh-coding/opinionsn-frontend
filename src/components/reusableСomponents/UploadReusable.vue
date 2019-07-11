<template>
    <div class="upload-block v-center relative" :style="blockStyle">
        <label>
            <slot name="icon">

            </slot>
            <input type="file" @change="handlePicturePreview(arguments[0].target.files)">
            <!--<img :src="imgUrl" alt="" width="100px" height="100px">-->
        </label>


    </div>
</template>

<script>
    export default {
        name: "UploadReusable",
        model: {
            event: 'change',
        },
        props: {
            width: {
                type: [String, Number]
            },
            height: {
                type: [String, Number]
            }
        },
        data() {
            return {
                imgUrl: null
            }
        },
        methods: {

            handlePicturePreview(file) {
                this.imgUrl = URL.createObjectURL(file[0]);
                this.$emit('upload', {file: file[0], url: this.imgUrl});
            },
            handleCssValue(value) {

                switch (true) {
                    case `${value}`.slice(-1) === '%':
                        return value;
                    case !isNaN(value):
                        return value + 'px';
                    default:
                        return value;
                }

            },
        },
        computed: {
            blockStyle() {
                let { width, height, handleCssValue } = this;
                width = width ? {width: handleCssValue(width)} : {};
                height = height ? {height: handleCssValue(height)} : {};

                return { ...width, ...height };
            }
        },
    }
</script>

<style lang="scss">

    .upload-block {
        input[type='file'] {
            display: none !important;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
        }

        img {
            background-size: cover;
        }
    }
</style>
