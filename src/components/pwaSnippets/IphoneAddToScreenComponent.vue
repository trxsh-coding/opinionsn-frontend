<template>
    <div class="add-home-snippet flex">

        <div class="plus-block">
            <i class="el-icon-plus"></i>
        </div>
        <div class="text-block relative">
            <div class="icon-close" @click="closeAdvice">
                <i class="el-icon-close"></i>
            </div>
            <span>
                Install this webapp on your iPhone: tap
                            <icon-base
                                    class="ml-5"
                                    fill="none"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 150 150"
                                    icon-name="icon-add">
                <icon-add/>
            </icon-base>
                and then Add to homescreen
            </span>

        </div>
    </div>
</template>

<script>
    import IconBase from "./../icons/IconBase.vue";
    import IconAdd from "./../icons/IconAddToScreen.vue";
    export default {
        name: "IphoneAddToScreenComponent",
        components: {IconAdd, IconBase},
        props:['showInstallMessage'],
        methods: {
            closeAdvice(){
                this.$emit('closeInstall', (this.showInstallMessage = false));

            }
        }
    }
</script>

<style lang="scss">
    .add-home-snippet {
        z-index: 999999;
        background: #4B97B4;
        border-radius: 10px;
        padding: 20px;
        right: 0;
        bottom: 120px;
        position: fixed;
        .icon-close {
            position: absolute;
            right: -15px;
            top: -15px;
            border-radius: 100px;
        }
        .plus-block {
            padding: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #ffffff;
            margin-right: 10px;
        }
        .text-block {

            svg {

                g {

                    fill:#3d577b

                }

            }

        }
        span {
            font-family: Roboto;
            font-style: normal;
            font-weight: normal;
            font-size: 13px;
            line-height: 16px;
            letter-spacing: -0.1px;
            color: #ffffff;

        }

    }
</style>
