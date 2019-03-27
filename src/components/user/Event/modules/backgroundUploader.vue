<template>
    <div class="background-uploader" @click="openDialog" >
        <el-dialog
                class="background-dialog"
                title="Размер и позиция фона"
                :visible.sync="backgroundUploader"
                :close-on-click-modal="false"
                width="272px"
                :append-to-body="true"
                :modal-append-to-body="false"
                accept=".jpeg,.png"
                :before-close="closeDialog"	>
            <div class="cropp-wrapper">
                <croppa v-model="croppa"
                        :show-remove-button="false"
                        :disable-click-choose="true"
                        @file-choose="handleImage(args)"
                        initial-image-loaded
                        placeholder=" "
                        :placeholder-font-size="14"
                        :zoom-speed="10"
                        :quality="9"
                        width="150"
                        height="90"
                        initial-size="contain">
                </croppa>
                <div class="zoom-block">
                    <div class="zoom-in" @click="croppa.zoomIn()">
                        <icon-base
                                fill="none"
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                icon-name="icon-zoom-in">
                            <icon-zoom-in />
                        </icon-base>
                    </div>
                    <div class="zoom-out" @click="croppa.zoomOut()">
                        <icon-base
                                fill="none"
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                icon-name="icon-zoom-out">
                            <icon-zoom-out />
                        </icon-base>
                    </div>
                </div>
            </div>

            <span slot="footer" class="dialog-footer">
                    <el-button class="cancel-button" @click="closeDialog">Отменить</el-button>
                    <el-button class="save-button"  type="primary" @click="uploadAvatar">Сохранить</el-button>
                  </span>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios'
    import IconBase from '../../../icons/IconBase'
    import IconZoomIn from '../../../icons/IconZoomIn'
    import IconZoomOut from '../../../icons/IconZoomOut'

    export default {
        name: "backgroundUploader",
        props:[ 'user'],
        data(){
            return {
                backgroundUploader:false,
                croppa:{}
            }
        },
        methods: {

            closeDialog(){

                this.backgroundUploader = false;
            },

            openDialog() {

                this.backgroundUploader = true;

            },
            handleImage(args){

                console.log(args)

            },

            uploadAvatar(){
                if (!this.croppa.hasImage()) {
                    alert('no image to upload')
                    return
                }
                this.croppa.generateBlob((blob) => {

                    var fd = new FormData()
                    fd.append('file', blob, 'filename.png');
                    this.$store.dispatch(`userPage/uploadBackground`, {data: fd});
                    this.backgroundUploader = false;

                })


            },

        },

        components: {

            IconBase,
            IconZoomIn,
            IconZoomOut

        }
    }
</script>

<style lang="scss">

    .uploader-wrapper {
        position: absolute;
        width: 80%;
        height: 100%;

    }

    .el-dialog {

        border-radius: 12px;

    }


    .background-dialog {


        .cancel-button {

            padding: 10px 20px;
            border-radius: 100px;
            background: #4b97b4;
            color: #ffffff;

        }
        .save-button {

            padding: 10px 20px;
            border-radius: 100px;
            background: #4b97b4;
            color: #ffffff;

        }
        .cropp-wrapper {

            display: flex;
            .zoom-block {

                display: flex;
                flex-direction: column;
                justify-content: center;

                .zoom-out, .zoom-in {

                    padding: 5px;

                }
            }
        }

    }
    .background-uploader {

        width: 85%;
        height: 100%;
        position: absolute;


    }
</style>
