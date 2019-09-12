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
					icon-name="logo"><icon-logo />
				</icon-base>
			</div>
			<div class="navbar__item navbar__item-2 v-center">
				<icon-base
					fill="none"
					class="icon-text"
					width="66"
					height="15"
					viewBox="0 0 64 15"
					icon-name="text-logo"><icon-text-logo />
				</icon-base>
			</div>
		</div>

		<div class="form-block mt-58" @keyup.enter.exact="submit(passwordForm)">

			<popup-error-reusable :errors="{ }" span-class="mt-3">
				<re-input :preset="2" type="password" placeholder="password" class="mx-auto" input-class="pb-5"
				          :params="{flex: 1, fontSize: 16, label: { width: 271 }}"
				          :value="passwordForm.password" @input="updateField(arguments[0], 'password')"/>
			</popup-error-reusable>

			<popup-error-reusable :errors="{ }" class="mt-30" span-class="mt-3">
				<re-input :preset="2" type="password" placeholder="confirm_password" class="mx-auto" input-class="pb-5"
				          :params="{flex: 1, fontSize: 16, label: { width: 271 }}"
				          :value="passwordForm.password_confirm" @input="updateField(arguments[0], 'password_confirm')"/>
			</popup-error-reusable>

		</div>

		<div class="buttons-block">

			<button-reusable
					@click.native="submit(passwordForm)"
					class="v-center auth-btn mt-23 py-13"
					description="reset"
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
    import PopupErrorReusable from "../reusableСomponents/PopupErrorReusable";
    import ReInput from "@/components/reusableСomponents/ReInput";

    export default {
        data() {
            return {
                passwordForm: {

                    password: '',
                    password_confirm: '',
                    code:this.$route.query.code

                },

                errors:{}

            }
        },


        methods: {

	        updateField(val, key) {
		        this.passwordForm[key] = val;
	        },

            submit(form){
                let resetFormData = new FormData();
                resetFormData.append('code', form.code);
                resetFormData.append('password', form.password);
                resetFormData.append('passwordConfirm', form.password_confirm);
                axios.post(`${process.env.VUE_APP_MAIN_API}/auth/password/reset/`, resetFormData)
                    .then(({status}) => {
                        if (status === 200) {
	                        this.$popup.insert('messages', [{message: 'Пароль успешно изменен!', type: 'success'}]);
                            this.$router.push({ name: 'login'})
                        }
                    })

                    .catch((error) => {
	                    this.$popup.insert('messages', [{message: 'При попытке изменить пароль произошла ошибка!', type: 'error'}]);
                        let er = this.errors;
                        for (let {field: f, errorCode: v} of error.response.data){
                            er[f] = v
                        }
                        this.$forceUpdate();
                    });


            }


        },

        computed: {





        },
        watch: {



            errorFields(){

                let fields = [['field_login', ''],['field_password', ''],['passConfirm', ''],['email', '']];

                let map = this.errors;
                for (let [i,v] of fields){
                    map[i] = v;
                }
                return map ;


            }


        },
        mixins:[langMixin],
        components: {
	        ReInput,
	        PopupErrorReusable,
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
