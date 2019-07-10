<template>
    <div class="upload-block relative" >
        <label for="input">
            <slot name="icon">

            </slot>
            <input type="file" id="input" @change="handlePicturePreview(arguments[0].target.files)">
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
        data() {
            return {
                imgUrl: null
            }
        },
        methods: {

            handlePicturePreview(file){
                this.$emit('change', file[0]);
                // this.imgUrl = URL.createObjectURL(file[0])
            }
        }
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
