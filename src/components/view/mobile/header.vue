<template>
    <div class="mobile-header flex-between flex-align-center">
        <div class="create-poll-icon-block">
            <icon-base
                    class="add-poll"
                    fill="#152D3A"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    icon-name="add-poll"><icon-add-poll/>
            </icon-base>
        </div>
        <div class="main-logo-icon-block">
            <icon-base
                    fill="none"
                    class="icon"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    icon-name="logo"><icon-logo />
            </icon-base>
            <icon-base  class="ml-6" fill="none" width="66" height="15" viewBox="0 0 66 15" icon-name="text-logo">
                <icon-text-logo/>
            </icon-base>
        </div>
        <div class="user-avatar-block">
            <avatar :img="publicPath + imageUtil(user.path_to_avatar, 'S')" :size="27" textLayout="right" bor-rad="50%"/>
        </div>
    </div>
</template>

<script>
    import IconBase from '../../icons/IconBase'
    import IconAddPoll from '../../icons/IconAddPoll'
    import IconLogo from '../../icons/IconLogo'
    import IconTextLogo from '../../icons/IconTextLogo'
    import avatar from '../../reusableСomponents/PictureReusable'
    import imageMixin from "../../mixins/imageMixin";
    export default {
        name: "header",
        props:["user"],
        mixins:[imageMixin],
        data(){

            return {

                publicPath: process.env.VUE_APP_MAIN_API

            }

        },
        components:{IconBase, IconAddPoll,IconLogo, IconTextLogo, avatar},

    }
</script>

<style lang="scss" >
    .mobile-header {

        width: 100%;
        position: fixed;
        top: 0;
        background: #ffffff;
        z-index: 999999;
        padding: 8px 20px 13px 20px ;

    }
</style>
