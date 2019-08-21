<template>
    <div class="modal-reusable" v-if="pictures.length">
        <div @click="onModalClick">
            <slot>

            </slot>
        </div>
        <icon-base
                @click.native="clearPictures"
                class="icon-close pointer"
                fill="none"
                width="40"
                height="40"
                viewBox="0 0 30 30"
                icon-name="close">
            <icon-close/>
        </icon-base>
        <div class="modal-overlay">

        </div>
        <div class="modal-wrapper" v-if="pictures.length">
            <div class="modal-window">
                <div class="picture-description" v-if="description">
                    <span>{{description}}</span>
                </div>
                <img class="main-picture" :src="(sorted_pictures && sorted_pictures[0]) || pictures[0]"/>
                <div v-if="pictures.length >= 2" class="pictures-section flex ">
                    <img v-for="(picture, index) in sorted_pictures || pictures"  :key="index" :src="picture" :class="{borderedPicture : picture === pictures[0]}" @click="sortPicturesArray(index)"/>

                </div>
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
        mixins: [ImageMixin],
        data() {
            return {
                publicPath: process.env.VUE_APP_MAIN_API,
                sorted_pictures: null
            }
        },
        computed: {

            pictures() {
                return this.$popup.pictures.map(pic => this.publicPath + this.imageUtil(pic, 'L'));
            }

        },
        methods: {
            sortPicturesArray(index) {
                let arr = [...this.pictures];
                this.sorted_pictures = [...arr.splice(index, 1), ...arr];
            },
            clearPictures() {
                this.sorted_pictures = null;
                this.$popup.clear('pictures');
            },
            onModalClick() {
                this.$emit('show')
            },

            onCloseAction() {
                this.$emit('close');
                this.hideModal = false
            }
        }
    }
</script>

<style lang="scss">
    .white {
        color: white;
    }

    .modal-reusable {
        position: relative;

        .modal-wrapper {
            position: fixed;
            z-index: 9999999;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            background: #000;
            width: 100%;
            height: 100%;
        }

        .icon-close {
            position: fixed;
            top: 10%;
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
            display: flex;
            flex-direction: column;
            align-items: center;

            .borderedPicture {
                border: 1px solid #FFFFFF;
            }

            .main-picture {
                width: 50%;
            }

            .pictures-section {
                img {
                    width: 250px;
                }
            }

            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: fit-content;
        }
    }
</style>