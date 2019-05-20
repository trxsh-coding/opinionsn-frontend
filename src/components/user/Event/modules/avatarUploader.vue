<template>
<div class="avatar-uploader" @click="openDialog" >
    <el-dialog
            class="avatar-dialog"
            title="Размер и позиция фотографии"
            :visible.sync="avatarDialog"
            :close-on-click-modal="false"
            width="280px"
            border-radius="12px"
            :append-to-body="true"
            :modal-append-to-body="false"
            :before-close="closeDialog"	>
        <div class="cropp-wrapper">
            <croppa v-model="croppa"
                    id="cropp-avatar"
                    class="cropp-component"
                    :disable-click-choose="true"
                    @file-choose="handleImage(args)"
                    placeholder=" "
                    :placeholder-font-size="14"
                    :prevent-white-space="true"
                    :width="mobile ? 350 : 120"
                    :height="mobile ? 350 : 120"
                    :zoom-speed="10"
                    initial-size="natural"
                    :show-remove-button="false"
                    :quality="20">
            </croppa>
          <div class="icons-block" v-if="!mobile">
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
              <div class="remove" @click="croppa.remove()">
                  <icon-base
                          fill="none"
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          icon-name="icon-zoom-in">
                      <icon-zoom-in />
                  </icon-base>
              </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
                    <el-button class="cancel-button" @click="closeDialog">Отменить</el-button>
                    <el-button class="save-button"  v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="uploadAvatar">Сохранить</el-button>
                  </span>
    </el-dialog>
</div>
</template>

<script>
    import {mapState} from 'vuex'
    import IconBase from '../../../icons/IconBase'
    import IconZoomIn from '../../../icons/IconZoomIn'
    import IconZoomOut from '../../../icons/IconZoomOut'
    import langMixin from '../../../mixins/langMixin'
    export default {
        mixins:[langMixin],
        name: "avatarUploader",
        data(){
            return {
                avatarDialog:false,
                croppa:{},
                mobile:this.$root.mobile
            }
        },
        computed: {


        },
        methods: {

            closeDialog(){

                this.avatarDialog = false;
            },

            openDialog() {

                this.avatarDialog = true;

            },
            handleImage(args){

                console.log(args)

            },

            uploadAvatar(){
                if (!this.croppa.hasImage()) {
                    this.$message({
                        showClose: true,
                        message: this.lstr('image_not_uploaded'),
                        type: 'warning'
                    });
                    return
                }
                this.croppa.generateBlob((blob) => {

                    var fd = new FormData()
                    fd.append('file', blob, 'filename.png');
                    this.$store.dispatch(`userPage/uploadAvatar`, {data: fd});
                    this.avatarDialog = false;
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

<style lang="scss" >

    .el-dialog {

        border-radius: 12px;

    }


    .avatar-dialog {
        .croppa-container {

            border-radius: 100px;

        }

        .croppa--has-target {

            border-radius: 100px;

            canvas {

                border-radius: 100px;

            }
        }

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
            .remove {
                padding: 5px;
                svg {

                    transform: rotate(45deg);

                }

            }
            display: flex;
            .icons-block {

                display: flex;
                flex-direction: column;
                justify-content: center;

                .zoom-out, .zoom-in {

                    padding: 5px;

                }
            }
        }

    }
    .avatar-uploader {

        width: 100%;
        height: 100%;




    }

    @media only screen and (max-device-width : 700px) {

        .el-dialog {

            width: 100% !important;

        }

        .el-dialog__body {

            padding: 0 !important;
            display: flex;
            justify-content: center;

        }

        #cropp-avatar {

            border-radius: 1000px !important;

        }
        .avatar-dialog .croppa--has-target canvas{

            border-radius: 1000px !important;

        }

    }
</style>
