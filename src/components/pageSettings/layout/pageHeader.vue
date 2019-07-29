<template>
    <div class="header">

        <div class="background" :style="{backgroundImage: `url('${background_image}')`}">

            <upload-reusable
                    icon-photo
                    fit
                    height="100%"
                    @upload="({file, url}) => { UPLOAD_IMAGE(file, 'background') }" >
            </upload-reusable>

            <picture-reusable
                    class="avatar absolute"
                    size="72"
                    :img="avatar"
                    bg-color="#ADAFB3"
                    rounded
                    without-text>
                <template #innerPicture>
                    <upload-reusable
                            icon-photo
                            fit
                            height="100%"
                            @upload="({file, url}) => { UPLOAD_IMAGE(file, 'avatar') }" >
                    </upload-reusable>
                </template>
            </picture-reusable>
        </div>

    </div>
</template>

<script>
    import PictureReusable from "../../reusableСomponents/PictureReusable";
    import UploadReusable from "../../reusableСomponents/UploadReusable";
    import {mapState} from "vuex";
    import axios from 'axios'
    import IconBase from "../../icons/IconBase";
    import IconUploadPhoto from "../../icons/create/IconUploadPhoto";
    import IconCross from "../../icons/IconCross";

    export default {
        name: "pageHeader",
        components: {
            UploadReusable,
            PictureReusable,
            IconBase,
            IconUploadPhoto,
            IconCross
        },

        data() {
            return {
                publicPath: process.env.VUE_APP_MAIN_API
            }
        },

        watch: {
            // mainUser({background_image, path_to_avatar}) {
            //     if (background_image && path_to_avatar) {
            //         this.background_image = this.publicPath + background_image;
            //         this.avatar = this.publicPath + path_to_avatar;
            //     }
            // },
            //
            // form({background_image, path_to_avatar}) {
            //     let {background_image: init_bg, path_to_avatar: init_avatar} = this.mainUser;
            //     if (background_image === init_bg && path_to_avatar === init_avatar) {
            //         this.background_image = this.publicPath + background_image;
            //         this.avatar = this.publicPath + path_to_avatar;
            //     }
            // }
        },

        computed: {

            ...mapState('globalStore', {
                mainUser: s => s.mainUser
            }),

            ...mapState('formManagment', {
                form: s => s.edit_form,
            }),
            
            background_image() {
                let { mainUser: usr, publicPath } = this;
                return publicPath + usr.background_image;
            },
            
            avatar() {
                let { mainUser: usr, publicPath } = this;
                return publicPath + usr.path_to_avatar;
            }
        },

        methods: {

            UPDATE_FIELD(value, key){
                this.$store.commit('formManagment/UPDATE_FIELD', { form: 'edit_form', key, value })
            },

            UPLOAD_IMAGE(file, type) {
                if (file) {
                    let fd = new FormData();
                    fd.append('file', file);
                    
                    switch (type) {
                        case 'avatar':
                            this.$store.dispatch('userPage/uploadAvatar', {data: fd});
                            break;
                        case 'background':
                            this.$store.dispatch('userPage/uploadBackground', {data: fd});
                            break;
                        default:
                            break;
                    }
                }
            }

        },
    }
</script>

<style lang="scss">

    .settings-page {

        .header {
            height: 156px;

            svg {
                * {
                    fill: #fff;
                }
            }

            .background {
                position: relative;
                height: 132px;
                background-color: #ADAFB3;
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center center;

                .avatar {
                    bottom: -24px;
                    left: -10px;
                }
            }

        }
    }


</style>
