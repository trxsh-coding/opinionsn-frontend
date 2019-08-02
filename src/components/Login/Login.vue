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

	  <div class="buttons-block flex-column-center mt-25">

		  <button-reusable
				  @click.native="routeFn('sign')"
				  class="v-center auth-btn py-13"
				  description="sign_in"
				  font-size="16"
				  bor-rad="6"
				  bg-color="#ffffff"
				  color="#4B97B4"/>

		  <button-reusable
				  @click.native="routeFn('registration')"
				  class="v-center auth-btn mt-9 py-13"
				  description="registration"
				  font-size="16"
				  bor-rad="6"
				  bg-color="#4B97B4"
				  color="#ffffff"/>

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
	import ButtonReusable from "../reusableСomponents/ButtonReusable";

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
			ButtonReusable,
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

</style>
