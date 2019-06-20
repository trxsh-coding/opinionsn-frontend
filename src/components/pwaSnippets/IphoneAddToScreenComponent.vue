<template>
    <div class="add-home-snippet flex mx-8">

        <div class="plus-block">
            <i class="el-icon-plus"></i>
        </div>
        <div class="text-block relative">
            <div class="icon-close" @click="closeAdvice">
                <i class="el-icon-close"></i>
            </div>
            <span>
				<lang-string :title="'install_this_webapp_on_your_iphone:_tap'"/>
				<icon-base
						class="ml-5"
						fill="none"
						width="20"
						height="20"
						viewBox="0 0 150 150"
						icon-name="icon-add">
					<icon-add/>
				</icon-base>
				<lang-string :title="'and_then_«add_to_homescreen»'"/>
            </span>

        </div>
    </div>
</template>

<script>
    import IconBase from "./../icons/IconBase.vue";
    import IconAdd from "./../icons/IconAddToScreen.vue";
	import langString from "../langString.vue";

    export default {
        name: "IphoneAddToScreenComponent",
        components: {IconAdd, IconBase, langString},
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
        bottom: 8px;
        position: fixed;
        .icon-close {
            position: absolute;
            right: -15px;
            top: -15px;
            border-radius: 100px;
        }
        .plus-block {
			margin: auto 10px auto 0;

			padding: 5px;
			height: 31px;
			max-height: 41px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #ffffff;
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
