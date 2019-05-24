ш<template lang="html">

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
		<div class="form-block">

			<el-form :model="resetForm" ref="signForm">

				<el-form-item :label="lstr('email')">

					<el-input v-model="resetForm.email" autocomplete="on" />
<!--					<lang-string class="error" :title="errors.field_email"/>-->
				</el-form-item>
				<el-form-item :label="lstr('confirm_email')">

					<el-input  v-model="resetForm.email_confirm" />

				</el-form-item>
			</el-form>

		</div>
		<div class="buttons-block">
			<el-button class="primary-btn" @click="submitSign(resetForm)">
				<lang-string class="lowercase" :title="'send'"/>
			</el-button>
			<!--<div class="registration__item">-->

			<!--<lang-string :title="'dont_have_account?'" /> <router-link to="/registration"> <lang-string :title="'registration'" /></router-link>-->

			<!--</div>-->
			<!--<div class="reset__item">-->

			<!--<lang-string :title="'forgot_your_password?'" /> <router-link to="/restore"> <lang-string :title="'login_reset'" /></router-link>-->

			<!--</div>-->
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

    export default {
        data() {
            return {
                resetForm: {

                    email:null,
                    email_confirm:null

                },

                errors:{

					field_email: "Ошибка"

				}

            }
        },


        methods: {

            submitSign(form){
                let loginFormData = new FormData();
                loginFormData.append('email', form.email);
                loginFormData.append('emailConfirm', form.email_confirm);
                axios.post(`${process.env.VUE_APP_MAIN_API}/auth/sendResetPasswordCode`, loginFormData)
                    .then(response => {
                        if (response.status === 200) {
                            this.$router.push({ name: 'login'})
                        }

                    })

                    .catch((error) => {



                         this.errors = error.response.data.errorCode

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
            IconBase,
            IconLogo,
            IconTextLogo,
            langString
        },
    }
</script>

<style lang="scss">

</style>
