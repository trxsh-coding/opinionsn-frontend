<template lang="html">

	<div class="sign-section">
		<div class="navbar-brand">
			<div class="navbar__item navbar__item-1">
				<icon-base
						fill="none"
						class="icon"
						width="75"
						height="64"
						viewBox="0 0 23 24"
						icon-name="logo">
					<icon-logo/>
				</icon-base>
			</div>
			<div class="navbar__item navbar__item-2 v-center">
				<icon-base
						fill="none"
						class="icon-text"
						width="66"
						height="15"
						viewBox="0 0 64 15"
						icon-name="text-logo">
					<icon-text-logo/>
				</icon-base>
			</div>
		</div>
		<div class="form-block mt-58" @keyup.enter.exact="submit(resetForm)">

			<popup-error-reusable :errors="{ }" span-class="mt-3">
				<re-input :preset="2" placeholder="email" class="mx-auto" input-class="pb-5"
				          :params="{flex: 1, fontSize: 16, label: { width: 271 }}"
				          :value="resetForm.email" @input="handleInputChange"/>
			</popup-error-reusable>

<!--			<popup-error-reusable :errors="{ }" class="mt-30" span-class="mt-3">-->
<!--				<re-input :preset="2" type="email" placeholder="confirm_email" class="mx-auto" input-class="pb-5"-->
<!--				          :params="{flex: 1, fontSize: 16, label: { width: 271 }}"-->
<!--				          :value="resetForm.email_confirm" @input="handleInputChange"/>-->
<!--			</popup-error-reusable>-->

		</div>

		<div class="buttons-block">

			<button-reusable
					@click.native="submit(resetForm)"
					class="v-center auth-btn mt-23 py-13"
					description="send"
					font-size="16"
					bor-rad="6"
					bg-color="#4B97B4"
					color="#ffffff"/>

		</div>
	</div>

</template>

<script>
	import langMixin from '../mixins/langMixin'
	import IconBase from '../icons/IconBase.vue'
	import IconLogo from '../icons/IconLogo.vue'
	import IconTextLogo from '../icons/IconTextLogo.vue'
	import langString from '../langString.vue'
	import {localString} from '../../utils/localString'
	import {mapState} from 'vuex'
	import axios from 'axios'
	import ButtonReusable from "../reusableСomponents/ButtonReusable";
	import InputReusable from "../reusableСomponents/InputReusable";
	import PopupErrorReusable from "../reusableСomponents/PopupErrorReusable";
	import ReInput from "@/components/reusableСomponents/ReInput";

	export default {
		data() {
			return {
				resetForm: {
					email: null,
					email_confirm: null
				},

				errors: {
					field_email: "Ошибка"
				}
			}
		},


		methods: {

			handleInputChange(value) {
				this.updateField(value, 'email')
				this.updateField(value, 'email_confirm')
			},

			updateField(val, key) {
				this.resetForm[key] = val;
			},

			submit(form) {
				let loginFormData = new FormData();
				loginFormData.append('email', form.email);
				loginFormData.append('emailConfirm', form.email_confirm);
				axios.post(`${process.env.VUE_APP_MAIN_API}/auth/password/reset/code`, loginFormData)
					.then(({status}) => {
						if (status === 200) {
							this.$popup.insert('messages', [{message: 'Ссылка для изменения пароля отправлена вам на почту!', type: 'success'}]);
							this.$router.push({name: 'login'})
						}
					})

					.catch((error) => {
						this.$popup.insert('messages', [{message: 'Ошибка отправки', type: 'error'}]);
						this.errors = error.response.data.errorCode;
						this.$forceUpdate();
					});


			}


		},

		computed: {},
		watch: {

			errorFields() {
				let fields = [['field_login', ''], ['field_password', ''], ['passConfirm', ''], ['email', '']];

				let map = this.errors;
				for (let [i, v] of fields) {
					map[i] = v;
				}
				return map;
			}

		},
		mixins: [langMixin],
		components: {
			ReInput,
			PopupErrorReusable,
			InputReusable,
			ButtonReusable,
			IconBase,
			IconLogo,
			IconTextLogo,
			langString
		},
	}
</script>

<style lang="scss">

</style>
