<template lang="html">
  <div id="login">
      <div class="login-section">
          <div class="logo-block">
              <div class="logo">
                  <icon-base
                          fill="none"
                          class="icon"
                          width="90"
                          height="90"
                          viewBox="0 0 25 24"
                          icon-name="logo"><icon-logo />
                  </icon-base>
              </div>

              <icon-base
                      fill="none"
                      class="icon-text"
                      width="90"
                      height="21"
                      viewBox="0 0 65 15"
                      icon-name="text-logo"><icon-text-logo />
              </icon-base>


          </div>
		  <span class="logo-caption">Социальная сеть слоган</span>
          <div class="buttons-block flex-column-center">

              <el-button class="primary-btn uppercase" @click="routeFn('sign')">
                  <lang-string class="lowercase" :title="'sign'" />
              </el-button>

              <el-button class="secondary-btn" @click="routeFn('registration')">
                  <lang-string class="lowercase" :title="'registration'" />
              </el-button>

          </div>
      </div>
  </div>
</template>

<script>
	import langMixin from "../mixins/langMixin";
	import Sign from "./Sign.vue";
	import Registration from "./Registration.vue";
	import IconBase from "../icons/IconBase";
	import IconLogo from "../icons/IconLogo";
	import IconTextLogo from "../icons/IconTextLogo";
	import langString from "../langString";
	import { mapState } from "vuex";
	export default {
		mixins: [langMixin],
		data() {
			return {};
		},
		methods: {
			routeFn(pathName) {
				this.$router.push({
					name: pathName,
					query: { ...this.$route.query }
				});
			}
		},
		components: {
			Sign,
			Registration,
			IconBase,
			IconLogo,
			IconTextLogo,
			langString
		}
	};
</script>

<style scoped lang="scss">
	body {
		margin: 0;
	}

	#login {
		background: #ffffff !important;
		width: 100%;
		display: flex;
		height: 100%;
		justify-content: center;
		align-items: center;

		.login-section {
			height: 50%;
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: center;
			.icon-text {
				margin-top: 18.31px;
			}

			.logo-caption {
				visibility: hidden;
				margin-top: 7px;
				margin-bottom: 131px;

				font-family: Roboto;
				font-style: normal;
				font-weight: normal;
				font-size: 13px;
				line-height: 18px; /* identical to box height, or 138% */

				color: rgba(21, 43, 58, 0.8);
			}

			.buttons-block {
				text-align: center;

				.el-button {
					margin: 0px;
					margin-bottom: 9px;
					width: 271px;
					font-family: Roboto;
					font-style: normal;
					font-weight: normal;
					font-size: 17px;
					line-height: 16px;
					font-variant: small-caps;
					color: #ffffff;
				}

				.el-button:hover {
					background: #4b97b4;
					color: #ffffff;
				}
			}
		}
	}
</style>
