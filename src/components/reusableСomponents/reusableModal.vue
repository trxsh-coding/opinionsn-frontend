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
                <img class="main-picture pointer" :src="pictures[current_index]" @click="setNextPicture"/>

                <swiper-reusable
                        class="pictures-section  flex"
                        v-if="pictures.length >= 2"
                        :height="150"
                        width="100%"
                        :amount-of-slides="'auto'"
                        :spaceBetween="15"
                        :swiper-type="mobile ? 'scroll' : 'usual'">
                    <template #usual>
                        <swiper-slide
                                class="w-fit "
                                v-for="(picture, index) in pictures">


                            <picture-reusable
                                    :key="index"
                                    :src="picture"
                                    :class="{borderedPicture : picture === pictures[current_index]}"
                                    @click.native="setCurrentIndex(index)"
                                    class="mr-12 p-0 pointer"
                                    pic-class="mb-5"
                                    :img=" picture"
                                    :height="150"
                                    :width="200"
                                    text-layout="bottom">
                            </picture-reusable>

                        </swiper-slide>
                    </template>
                    <template #scroll>

                    </template>
                </swiper-reusable>

            </div>

        </div>
    </div>
</template>

<script>
    import PictureReusable from "./PictureReusable";
    import IconBase from "../icons/IconBase";
    import IconClose from "../icons/modal/IconClose";
    import ImageMixin from "../mixins/imageMixin"
    import SwiperReusable from "./swiperReusable";

    export default {
        name: "reusableModal",
        components: {SwiperReusable, IconBase, PictureReusable, IconClose},
        mixins: [ImageMixin],
        data() {
            return {
                publicPath: process.env.VUE_APP_MAIN_API,
                sorted_pictures: null,
                current_index: 0
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
                this.current_index = 0;
                this.$popup.clear('pictures');
            },
            onModalClick() {
                this.$emit('show')
            },

            setNextPicture(){
              this.current_index += 1;

              if (this.current_index >= this.pictures.length) this.clearPictures();

            },
            setCurrentIndex(index){

                this.current_index = index;

                // let {sorted_pictures, pictures} = this;
                // if(sorted_pictures == null) {
                //     pictures.push(pictures[0]);
                //     pictures.splice(0, 1)
                // } else {
                //     sorted_pictures.push(sorted_pictures[0]);
                //     sorted_pictures.splice(0, 1)
                // }
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
            display: flex;
            align-items: center;
            flex-direction: row;
            justify-content: center;
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
            height: 100%;
            justify-content: center;
            .borderedPicture {
                border: 1.3px solid #FFFFFF;
                opacity: 0.7;
            }

            .main-picture {
                width: 100%;
            }

            .pictures-section {
                position: fixed;
                bottom: 0;

            }

            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: fit-content;
        }

        @media only screen and (max-width: 400px) {

           .preview-picture {
               width: 100px !important;
           }

        }

    }
</style>