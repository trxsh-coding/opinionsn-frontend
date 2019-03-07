<template lang="html">
    <div id="sign">
        <el-main>
            <div class="login-box">

              <transition name="fade" mode="out-in">
                <el-row>
                    <div class="navbar-brand">
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
                    </div>
                      <el-form :model="Login">
                        <div class="login">
                            <el-form-item prop="input_login">
                              <el-input placeholder="E-mail / Username" @keyup.enter.native="userLogin" :value="Login.input_mail"  @input="inputUpdate_input_mail"></el-input>
                                <span class="error"><lang-string :title="errors.field_login"/></span>
                            </el-form-item>
                            <el-form-item prop="input_password">
                              <el-input :placeholder="lstr('Password')" type="password" @keyup.enter.native="userLogin" :value="Login.input_password" @input="inputUpdate_input_password"></el-input>
                                <span class="error"><lang-string :title="errors.field_password"/></span>
                            </el-form-item>
                            <el-button class="primary" @click="userLogin('Login')"><lang-string :title="'enter'"/></el-button>
                            <router-link to="registration">
                                <el-button class="primary"><lang-string :title="'register'"/></el-button>
                                <langString />
                            </router-link>
                        </div>
                      </el-form>
                </el-row>
              </transition>

            </div>

        </el-main>
    </div>

</template>

<script>
    import IconBase from '../icons/IconBase.vue'
    import IconLogo from '../icons/IconLogo.vue'
    import IconTextLogo from '../icons/IconTextLogo.vue'
    import langString from '../langString.vue'
    import {localString} from '../../utils/localString'
    import { mapState } from 'vuex'
    import { mapActions } from 'vuex';
    import { mapMutations } from 'vuex';
    import {UserModel} from '../../store/modules/Login'
    export default {
        data() {
            return {

            }
        },
        computed: {
          ...mapState('Login',{
            Login : state => state.account
          }),
            ...mapState('Login',{
                errors : state => state.errors
            }),

            lstr(){
                return (str)=>localString(this.lang, str);
            },

        },

        methods: {

          ...mapMutations('Login',[
            //'onFormChange'
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
        },
        components: {
          IconBase,
          IconLogo,
          IconTextLogo,
          langString
        },
    }
</script>

<style lang="scss">
    .el-main {

    }

    .login-box {
        .el-button, h3 {
            color: #4B97B4;
        }
    }

    html {
        background: #ffffff;
    }



    #sign {
        display: flex;
        align-items: center;
        background: #ffffff;
        .login-box {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .errorFields {
            border-width: 0.9px;
            border-color: #ff000d;
            border-style: solid;
            border-radius: 5px;
        }
        .login, .registration {
            width: 366px;
            margin: 10px;
        }
        .el-form-item {
            margin-bottom: 0px !important;
            padding-bottom: 10px;
        }
        .el-form-item__content {
            line-height: 28px;
        }
        .error {
            color: #f50217;
            font-size: 12px;
            line-height: 1;
        }
        .navbar-brand {
            display: flex;
            justify-content: center;
            align-items: center;
            align-content: center;
            margin-top: 9px;
            margin-bottom: 20px;
            .navbar-item {
                text-decoration: none;
                display: flex;
                align-items: center;
                align-content: center;
                flex-direction: row;
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
