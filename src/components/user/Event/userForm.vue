<template>
 <div class="user-form">

     <el-form :model="user" ref="user">

         <el-form-item class="info_label" :label="lstr('user_firstname')">
             <el-input :value="user.first_name" @input="updateInfo(arguments[0], 'first_name')" />
         </el-form-item>

         <el-form-item class="info_label" :label="lstr('user_lastname')">
             <el-input :value="user.last_name" @input="updateInfo(arguments[0], 'last_name')" />
         </el-form-item>

         <el-form-item class="info_label"
                       :label="lstr('username')"
                       prop="username"
                       :rules="[ { required: true, message: 'Please input Activity name', trigger: 'blur' },
                        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }]" >
             <el-input :value="user.username" @input="updateInfo(arguments[0], 'username')" />
         </el-form-item>

         <el-form-item class="info_label" :label="lstr('about_me')">
             <el-input :value="user.aboutMe" @input="updateInfo(arguments[0], 'aboutMe')" />

         </el-form-item>

         <el-form-item class="info_label" :label="lstr('location')">
             <el-input class="location" :value="user.location" @input="updateInfo(arguments[0], 'location')" />
         </el-form-item>


         <el-form-item class="info_label phone" :label="lstr('phone_number')">

             <the-mask type="tel" :masked="false"  :mask="'#(###)###-##-##'" v-model="phone" />

         </el-form-item>

         <el-form-item class="info_label" :label="lstr('Пол')">

             <el-radio-group v-model="gender">
                 <el-radio :label="1">Мужской</el-radio>
                 <el-radio :label="2">Женский</el-radio>
             </el-radio-group>

         </el-form-item>

         <div class="buttons-section">
             <el-button class="edit-btn uppercase" @click="cancelEdit">
                 <lang-string :title="'cancel'"/>
             </el-button>
             <el-button class="edit-btn uppercase" @click="submitForm('user')">
                 <lang-string :title="'save'"/>
             </el-button>
         </div>
     </el-form>

 </div>
</template>

<script>

    import langMixin from '../../mixins/langMixin'
    import langString from '../../langString'
    import {mapState} from 'vuex'
    import iconBase from '../../icons/IconBase'
    import iconLocation from '../../icons/IconLocation'

    export default {
        props:['hide_form'],
        data() {

            return {


            }

        },
        computed: {


            ...mapState('globalStore', {

                user: ({mainUser}) => mainUser

            }),

            phone: {
                get () {
                    return this.$store.state.globalStore.mainUser.phone_number
                },
                set (value) {
                    console.log(value)
                    let item = 'phone_number';
                    this.$store.commit('globalStore/updateUserInfo',{value, item})
                }
            },

            gender: {
                get () {
                    return this.$store.state.globalStore.mainUser.gender
                },
                set (value) {
                    let item = 'gender';
                    this.$store.commit('globalStore/updateUserInfo',{value, item})
                }
            }

        },

        methods: {

            updateInfo(value, item){
                this.$store.commit('globalStore/updateUserInfo', {value, item})

            },

            cancelEdit(){

                this.$emit('hide', this.hide_form);

            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$store.dispatch(`userPage/updateUser`, {data: this.user});
                        this.$emit('hide', this.hide_form);
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            saveUser(){








            },

        },
        name: "userForm",
        mixins:[langMixin],
        components:{langString, iconBase, iconLocation}

    }
</script>

<style lang="scss">
    .user-form {
        border-radius: 12px;

        margin-bottom: 9px;

        .el-form {

            background: #FFFFFF;
            padding: 12px 9px;
            border-radius: 12px;

        }
        .el-form-item {
            margin-bottom: 7px;
        }
        .el-form-item__label {

            line-height: 14px;

        }

        .phone {
            .the-mask {

                border: none;

            }
            input {
                border: 1px solid #DCDFE6;
                width: 97%;
                height: 26px;
                border-radius: 12px;
                padding-left: 15px;
                outline: none;

            }

        }
        .location {

            .el-input__inner {

                padding-left: 25px;

            }

        }

        .info_label {

            font-family: Roboto;
            font-style: normal;
            font-weight: 300;
            font-size: 12px;
            line-height: 14px;
            letter-spacing: -0.1px;
            color: #445761;
            opacity: 0.8;
            .el-form-item__label {

                padding-left: 13px;
            }
        }
        .el-input__inner {

            height: 30px;
            border-radius: 12px;

        }
        .el-radio__inner {

            background: #A1ABB0;
        }
        .el-radio__inner::after {

            background: #FFFFFF ;

        }

        .el-radio__input.is-checked+.el-radio__label {


            font-family: Roboto;
            font-style: normal;
            font-weight: normal;
            font-size: 13px;
            line-height: 16px;
            letter-spacing: -0.1px;
            color: #152D3A;


        }
        .el-radio__input.is-checked .el-radio__inner {

            background:#A1ABB0 ;
            border-color: #A1ABB0;

        }

        .el-radio-group {
            padding-left:13px;
            width: 100%;

        }
        .buttons-section {
            padding-left: 9px;
            margin-top: 12px;
            .edit-btn {

                padding: 5px 10px;
                background: #A1ABB0;
                border-radius: 24px;
                color: #FFFFFF;
                span {


                    font-family: Roboto;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 13px;
                    letter-spacing: -0.1px;
                    font-variant: small-caps;
                    color: #FFFFFF;
                    border-radius: 6px;

                }
            }
        }
    }
</style>
