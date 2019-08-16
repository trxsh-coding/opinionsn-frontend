<template>
    <div class="modal-reusable">
        <div @click="onModalClick">
            <slot >

            </slot>
        </div>

        <div class="modal-wrapper" v-if="hideModal">
            <div class="modal-window">
                <img :src="publicPath + picture" />

            </div>
        </div>
    </div>
</template>

<script>
    import PictureReusable from "./PictureReusable";
    export default {
        name: "reusableModal",
        components: {PictureReusable},
        props: {
            picture: Object,
            hideModal: Boolean
        },
        data() {
            return {
                publicPath: process.env.VUE_APP_MAIN_API,
            }
        },
        methods: {
            onModalClick(){
                this.$emit('show')
            }
        }
    }
</script>

<style lang="scss">
    .modal-reusable {
        box-shadow: 0 1px 3px rgba(0,0,0,.3);
        .modal-wrapper {
            position: fixed;
            z-index: 9999999;
            top: 0;
            right:0;
            left: 0;
            bottom: 0;
            background: #000;
        }
        .modal-window {
            img {
                width: 700px;
            }
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: fit-content;
        }
    }
</style>