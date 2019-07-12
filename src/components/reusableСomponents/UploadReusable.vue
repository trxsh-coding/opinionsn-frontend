<template>
    <div class="upload-block v-center relative" :style="blockStyle">
        <label class="v-center" :style="wrapperStyle">
            <slot name="icon">

            </slot>
            <input ref="input_ref" type="file" @change="handlePicturePreview(arguments[0].target.files)">

            <div class="image-preview mt-15"
                 v-if="imagePreview"
                 :style="{ 'background-image': 'url(' + imgUrl + ')' }" >
            </div>
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
            },
            imagePreview: {
              type: Boolean
            },
            imageLayout: {
                validator: function (value) {
                    return ['top', 'right', 'left', 'bottom'].indexOf(value) !== -1
                }
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
                this.$emit('upload', {file: file[0], url: `${this.imgUrl}`});
                this.$refs.input_ref.value = '';
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
            wrapperStyle() {
                let { imageLayout } = this;

                switch (imageLayout) {
                    case 'top':
                        return {
                            flexDirection: 'column-reverse',
                        };
                    case 'bottom':
                        return {
                            flexDirection: 'column',
                        };
                    case 'left':
                        return {
                            flexDirection: 'row-reverse',
                        };
                    case 'right':
                        return {
                            flexDirection: 'row',
                        };
                    default:
                        return '';
                }
            },
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



        .image-preview {
            width: 120px;
            height: 120px;
            background-size: cover;
            background-color: rgba(21, 41, 58, 0.1);
            border-radius: 6px;
            background-position: center;
        }

    }
</style>
