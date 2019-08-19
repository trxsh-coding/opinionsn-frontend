<template>
    <div class="modal-reusable">
        <div @click="onModalClick">
            <slot >

            </slot>
        </div>
            <icon-base
                    v-if="hideModal"
                    @click.native="onCloseAction"
                    class="icon-close pointer"
                    fill="none"
                    width="40"
                    height="40"
                    viewBox="0 0 30 30"
                    icon-name="close">
                <icon-close/>
            </icon-base>
        <div class="modal-wrapper" v-if="hideModal">
            <div class="modal-window">
                <div class="picture-description" v-if="description">
                    <span>{{description}}</span>
                </div>
                <img :src="publicPath + imageUtil(picture, 'L')" />
            </div>
        </div>
    </div>
</template>

<script>
    import PictureReusable from "./PictureReusable";
    import IconBase from "../icons/IconBase";
    import IconClose from "../icons/modal/IconClose";
    import ImageMixin from "../mixins/imageMixin"

    export default {
        name: "reusableModal",
        components: {IconBase, PictureReusable, IconClose},
        mixins:[ImageMixin],
        props: {
            picture: [Object, String],
            hideModal: Boolean,
            pictures: Array,
            description:String
        },
        data() {
            return {
                publicPath: process.env.VUE_APP_MAIN_API,
            }
        },
        methods: {
            onModalClick(){
                this.$emit('show')
            },
            onCloseAction(){
                this.$emit('close');
                this.hideModal = false
            }
        }
    }
</script>

<style lang="scss">
    .modal-reusable {
        .modal-wrapper {
            position: fixed;
            z-index: 9999999;
            top: 0;
            right:0;
            left: 0;
            bottom: 0;
            background: #000;
        }
        .icon-close {
            position: fixed;
            top:10%;
            right: 3%;
            z-index: 999999999999999;
            svg {
                fill: aqua;
            }
        }
        .picture-description {
            padding: 15px;
            span {
                font-family: Roboto;
                font-style: normal;
                font-weight: normal;
                font-size: 13px;
                color: #FFFFFF;
            }


        }
        .modal-window {
            img {
                width: 100%;
            }
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: fit-content;
        }
    }
</style>