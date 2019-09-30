<template>
    <div class="header">
        
        <RePicture type="background" height="132" :url="background_image">
            <ReUpload
                    icon-photo
                    fit
                    height="100%"
                    @upload="({file}) => { UPLOAD_IMAGE(file, 'background') }" >
            </ReUpload>
    
            <RePicture type="background" class="avatar absolute" :url="avatar" size="72" rounded>
                <ReUpload
                        icon-photo
                        fit
                        height="100%"
                        @upload="({file}) => { UPLOAD_IMAGE(file, 'avatar') }" >
                </ReUpload>
            </RePicture>
            
        </RePicture>
        
    </div>
</template>

<script>
    import ReUpload from "../../reusableСomponents/ReUpload";
    import {mapState} from "vuex";
    import IconBase from "../../icons/IconBase";
    import IconCross from "../../icons/IconCross";
    import RePicture from "@/components/reusableСomponents/RePicture";

    export default {
        name: "pageHeader",
        components: {
            RePicture,
            ReUpload,
            IconBase,
            IconCross
        },

        data() {
            return {
                publicPath: process.env.VUE_APP_ASSETS,
            }
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

            & > .background {
                position: relative;
                background-color: #ADAFB3;

                .avatar {
                    bottom: -24px;
                    left: -10px;
                    position: absolute !important;
                }
            }

        }
    }


</style>
