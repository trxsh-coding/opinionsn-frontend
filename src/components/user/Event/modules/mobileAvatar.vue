<template>
    <div class="mobile-uploader avatar-90x90" :style="{ 'background-image': 'url(' + user.path_to_avatar + ')' } " @click="dialogVisible = true">
        <el-dialog
                title="Tips"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose"
                :append-to-body="true"
                :modal-append-to-body="false">
            <span>This is a message</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>

          </span>
            <croppa v-model="croppa"
                    class="cropp-component"
                    :disable-click-choose="true"
                    @file-choose="handleImage(args)"
                    placeholder=" "
                    :placeholder-font-size="14"
                    :prevent-white-space="true"
                    :width="357"
                    :height="357"
                    :zoom-speed="10"
                    :show-remove-button="false"
                    :quality="2">
            </croppa>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "mobileAvatar",
        props:['user'],
        data() {

            return {
                dialogVisible:false,
                croppa:{}

            }

        },
        methods:{


        }
    }
</script>

<style lang="scss">
    .mobile-uploader {

        width: 100%;
        height: 100%;
        border-radius: 100px;



    }

    @media only screen and (max-device-width : 700px) {

        .el-dialog {

            width: 100% !important;

        }

    }
</style>
