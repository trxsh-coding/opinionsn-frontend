<template lang="html">
    <div id="registration">
        <el-main>
            <div class="login-box">
                <el-row>
                    <div class="navbar-brand">
                        <a class="navbar-item" href="#">
                          <icon-base
                            fill="none"
                            class="icon"
                            width="44"
                            height="30"
                            viewBox="0 0 10 30"
                            icon-name="logo"><icon-logo />
                          </icon-base>
                          <icon-base
                            fill="none"
                            class="icon"
                            width="66"
                            height="15"
                            viewBox="0 0 66 15"
                            icon-name="text-logo"><icon-text-logo />
                          </icon-base>
                        </a>
                    </div>
                    <el-col :span="12">
                        <div class="registration">
                            <h3>Registration</h3>
                            <el-form :model="Login" :rules="mainState.rules" ref="Login">
                              <el-form-item prop="input_username">
                                  <el-input v-bind:class="{ errorFields: errors.login }" :placeholder="lstr('login')" :value="Login.input_username" @keyup.enter.native="userRegist('Login')" @input="inputUpdate_input_username"></el-input>
                                  <span class="error"><lang-string :title="errors.login"/></span>
                              </el-form-item>

                              <el-form-item prop="input_userpassword">
                                <el-input v-bind:class="{ errorFields: errors.pass }" :placeholder="lstr('password')" type="password" :value="Login.input_userpassword" @keyup.enter.native="userRegist('Login')" @input="inputUpdate_input_userpassword"></el-input>
                                <span class="error"><lang-string :title="errors.pass"/></span>
                              </el-form-item>
                              <el-form-item prop="input_passwordconf"    >
                                <el-input v-bind:class="{ errorFields: errors.pass }"  :placeholder="lstr('confrim_password')" type="password" :value="Login.input_passwordconf" @keyup.enter.native="userRegist('Login')"  @input="inputUpdate_input_passwordconf"></el-input>
                                  <span class="error"><lang-string :title="errors.pass"/></span>
                                  <span class="error"><lang-string :title="errors.passConfirm"/></span>
                              </el-form-item>
                              <el-form-item prop="input_mail">
                                <el-input v-bind:class="{ errorFields: errors.email }" :placeholder="lstr('email')" :value="Login.input_mail" @input="inputUpdate_input_mail" @keyup.enter.native="userRegist('Login')"></el-input>
                                  <span class="error"><lang-string :title="errors.email"/></span>
                              </el-form-item>
                              <el-button  class="primary" @click="userRegist('Login')"><lang-string :title="lstr('register')"/></el-button>
                              <el-button  class="primary" @click="back"><lang-string :title="lstr('back')"/></el-button>
                            </el-form>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-main>
    </div>
</template>

<script>
    import IconBase from '../icons/IconBase.vue'
    import IconLogo from '../icons/IconLogo.vue'
    import { mapState } from 'vuex'
    import { mapActions } from 'vuex';
    import { mapMutations } from 'vuex';
    import { mapGetters } from 'vuex';
    import {UserModel} from '../../store/modules/Login'
    import IconTextLogo from '../icons/IconTextLogo.vue'
    import langString from '../langString.vue'
    import {localString} from '../../utils/localString'

    export default {
        data() {
            return {

            }
        },
        components: {
          IconBase,
          IconLogo,
          IconTextLogo,
          langString
        },
        computed: {
          ...mapState('Login',{
            Login : state => state.account
          }),
          ...mapState('Login',{
            errors : state => state.errors
          }),
          ...mapState('Login',{
            account : state => state.account
          }),
          ...mapState('Login',{
            mainState : state => state
          }),
            lstr(){
                return (str)=>localString(this.lang, str);
            },
        },
        methods: {
          userLogin: function () {
            this.$store.dispatch('userLogin', this.Login.input_login).then(() => {
            this.$router.push({'path': '/pollFeed'})
           }).catch((err) => {
           })
          },
          back(){
            this.$router.push({'path': '/login/sign'})
          },
          updateLogin (e) {
            this.$store.commit('Login/updateLog', e)
          },
          userRegist (e) {
            this.$store.dispatch('Login/userRegistration')
            this.$store.commit('Login/clearValidation')
          },
          ...mapMutations('Login',[
          ]),
          ...mapActions('Login',[
            ...(()=>{
                        return Object.keys(UserModel).map(x=>{
                          return `inputUpdate_${x}`;
                        })
            })(),
            'userLogin',
            'userRegistration'
          ])
        }
    }
</script>

<style lang="scss">
    #registration {


        .el-main {
            margin: 0 !important;
        }

        .el-row {

            background: #FFFFFF;
            display: flex;
            flex-direction: column;
            align-items: center;

        }

        .login-box {
            .el-button, h3 {
                color: #4B97B4;
            }
        }

        .errorFields {
            border-width: 0.9px;
            border-color: #ff000d;
            border-style: solid;
            border-radius: 5px;
        }

        html {
            background: #ffffff;
        }

        #registration {
            .errors-block {
                padding-left: 25px;
            }

            .el-form-item {
                margin-bottom: 0px !important;
                padding-bottom: 10px;

                .el-form-item__content {
                    line-height: 25px;
                    position: relative;
                    font-size: 14px;
                }
            }

            .error {
                color: #f50217;
                font-size: 12px;
                line-height: 1;
            }

            display: flex;
            align-items: center;
            background: #ffffff;

            .login-box {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .login, .registration {
                width: 366px;
                margin: 10px;

            }
        }

        .navbar-brand {
            display: flex;
            justify-content: center;
            align-items: center;
            align-content: center;

            .navbar-item {
                text-decoration: none;
                display: flex;
                align-items: center;
                align-content: center;
                flex-direction: row;

                g {
                    fill: none;
                }

                img {
                    width: 41.67px;
                    height: 30px;
                }

                span {
                    font-family: ABeeZee;
                    font-style: normal;
                    font-weight: normal;
                    line-height: 18px;
                    font-size: 18px;
                    letter-spacing: -0.3px;
                    color: #4B97B4;
                    margin-left: 6.33px;
                }
            }
        }
    }
</style>
