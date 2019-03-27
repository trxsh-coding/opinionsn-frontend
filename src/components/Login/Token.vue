<template lang="html">
    <div id="sign" class="sign">
        <div class="sign-section">
            <div class="navbar-brand">
                <div class="navbar__item">
                    <icon-base
                            fill="none"
                            class="icon"
                            width="75"
                            height="64"
                            viewBox="0 0 23 24"
                            icon-name="logo"><icon-logo />
                    </icon-base>
                </div>
                <div class="navbar__item">
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

                <el-form :model="passwordForm" ref="signForm">

                    <el-form-item :label="lstr('password')">

                        <el-input v-model="passwordForm.password" autocomplete="on" />
                        <lang-string class="error" :title="errors.field_email"/>
                    </el-form-item>
                    <el-form-item :label="lstr('confirm_password')">

                        <el-input  v-model="passwordForm.password_confirm" />

                    </el-form-item>
                </el-form>

            </div>
            <div class="buttons-block">
                <el-button class="secondary-btn" @click="submitSign(passwordForm)">
                    <lang-string class="lowercase" :title="'reset'"/>
                </el-button>
                <!--<div class="registration__item">-->

                <!--<lang-string :title="'dont_have_account?'" /> <router-link to="/registration"> <lang-string :title="'registration'" /></router-link>-->

                <!--</div>-->
                <!--<div class="reset__item">-->

                <!--<lang-string :title="'forgot_your_password?'" /> <router-link to="/restore"> <lang-string :title="'login_reset'" /></router-link>-->

                <!--</div>-->
            </div>
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
                passwordForm: {

                    password:null,
                    password_confirm:null,
                    code:this.$route.query.token

                },

                errors:{}

            }
        },


        methods: {

            submitSign(form){
                console.log(this.$route.query)
                let resetFormData = new FormData();
                console.log(form)
                resetFormData.append('code', form.code);
                resetFormData.append('password', form.password);
                resetFormData.append('passwordConfirm', form.password_confirm);
                axios.post(`/api/auth/resetPassword/`, resetFormData)
                    .then(response => {
                        if (response.status === 200) {
                            this.$router.push({ name: 'login'})
                        }

                    })

                    .catch((error) => {


                        console.log(error.response.data);

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
        mounted(){

            console.log(this.$route)

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

    html {
        background: #ffffff;
    }



    #sign {



        justify-content: center;
        height: 100%;
        display: flex;
        align-items: center;
        background: #ffffff;
        flex-direction: column;

        input {
            outline: none;

        }

        .sign-section {
            text-align: center;
            width: 359px;
            display: flex;
            flex-direction: column;
            .form-block {
                width: 100%;
                input {

                    border-radius: 12px !important;

                }

            }

            .buttons-block {
                margin-top: 35.65px;
                .registration__item {
                    text-align: center !important;
                    margin-top: 28px;
                    @extend  .el-form-item__label;
                    a {

                        color: #8A9499;

                    }
                }
                .reset__item {
                    @extend .registration__item;
                    margin-top: 0px;

                }
                .el-button {

                    width: 271px;
                    background: #4B97B4;
                    color: #FFFFFF;

                }

            }

        }




        .navbar-brand {

            .icon-text {

                margin-top: 12.64px;

            }

        }
        .el-main {

            background: #FFFFFF;

        }


        .login-box {
            width: 359px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            height: 50%;
        }
        .errorFields {
            border-width: 0.9px;
            border-color: #ff000d;
            border-style: solid;
            border-radius: 5px;
        }


        .el-form-item__label {
            font-family: Roboto;
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: 12px;
            text-align: justify;
            letter-spacing: -0.2px;
            color: #8A9499;
            line-height: 30px !important;
            padding-left: 15px;
        }

        .el-form-item {
            margin-bottom: 0px !important;
            padding-bottom: 10px;
            text-align: left;
        }
        .el-form-item__content {
            line-height: 28px;
        }
        .error {
            font-family: Roboto;
            font-style: normal;
            font-weight: 300;
            font-size: 11px;
            line-height: 12px;
            text-align: justify;
            letter-spacing: -0.2px;
            color: #FF5454;
            padding-left: 15px;


        }
        @media only screen and (max-device-width : 700px) {

            .sign-section {

                height: 100%;

            }

            .navbar-brand {

                margin-top: 60px;

            }

            .buttons-block{

                margin-top: 18px !important;

                height: 50%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                .registration__item {

                    padding-left: 0px !important;
                    padding-bottom: 10px;
                }



            }
            .form-block {
                .el-form {
                    background: #FFFFFF;
                    box-shadow: 0px 0px 18px rgba(0, 0, 0, 0.1);
                    border-radius: 12px;
                    padding: 18px 15px;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    align-items: center;

                    .el-input {

                        width: 329px;

                    }

                }





            }


        }
    }
</style>
