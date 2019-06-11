<template lang="html">
  <div class="login-section">
	  <div class="navbar-brand">
		  <div class="navbar__item navbar__item-1">
			  <icon-base
					  fill="none"
					  class="icon"
					  width="90"
					  height="90"
					  viewBox="0 0 25 24"
					  icon-name="logo"><icon-logo />
			  </icon-base>
		  </div>

		  <div class="navbar__item navbar__item-2 v-center">
			  <icon-base
				  fill="none"
				  class="icon-text"
				  width="90"
				  height="21"
				  viewBox="0 0 65 15"
				  icon-name="text-logo"><icon-text-logo />
			  </icon-base>
		  </div>

	  </div>
<!--	  <span class="logo-caption">Социальная сеть слоган</span>-->
	  <div class="buttons-block flex-column-center">

		  <el-button class="primary-btn uppercase" @click="routeFn('sign')">
			  <lang-string :title="'sign_in'" />
		  </el-button>

		  <a class="google-btn " href="https://opinionsn.com/api/oauth2/google">
			  <icon-base
				  class="logo"
				  fill="none"
				  icon-name="google-logo"><icon-google />
			  </icon-base>
			  <span class="google-button__text">Sign in with Google</span>
		  </a>

		  <el-button class="secondary-btn" @click="routeFn('registration')">
			  <lang-string :title="'registration'" />
		  </el-button>

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
	import IconGoogle from "../icons/IconGoogle.vue";

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
			langString,
			IconGoogle
		}
	};
</script>

<style lang="scss">
	.login-section {

		.buttons-block {

			.secondary-btn {
				margin-top: 9px !important;
			}
		}
	}

</style>
