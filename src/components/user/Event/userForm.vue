<template>
 <div class="user-form">

     <el-form :rules="rules" v-model="user" ref="user">

         <el-form-item class="info_label" :label="lstr('user_firstname')">
             <el-input :value="user.first_name" @input="updateInfo(arguments[0], 'first_name')" />
         </el-form-item>

         <el-form-item class="info_label" :label="lstr('user_lastname')">
             <el-input :value="user.last_name" @input="updateInfo(arguments[0], 'last_name')" />
         </el-form-item>

         <el-form-item class="info_label" :label="lstr('username')">
             <el-input :value="user.username" @input="updateInfo(arguments[0], 'username')" />
         </el-form-item>

         <el-form-item class="info_label" :label="lstr('about_me')">
             <el-input :value="user.aboutMe" @input="updateInfo(arguments[0], 'aboutMe')" />

         </el-form-item>

         <el-form-item class="info_label" :label="lstr('location')">
             <el-input class="location" :value="user.location" @input="updateInfo(arguments[0], 'location')" />
         </el-form-item>


         <el-form-item class="info_label" :label="lstr('phone_number')">
             <el-input :value="user.phone_number" @input="updateInfo(arguments[0], 'phone_number')" />
         </el-form-item>

         <el-form-item class="info_label" :label="lstr('Пол')">

             <!--<el-select v-model="gender" placeholder="шмонь" >-->
                 <!--<el-option label="Мужской"  value="1"></el-option>-->
                 <!--<el-option label="Женский" value="0"></el-option>-->
             <!--</el-select>-->


             <el-radio-group v-model="gender">
                 <el-radio :label="1">Мужской</el-radio>
                 <el-radio :label="2">Женский</el-radio>
             </el-radio-group>


         </el-form-item>


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
        data() {

            return {


            }

        },
        computed: {


            ...mapState('globalStore', {

                user: ({mainUser}) => mainUser

            }),

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

            }

        },
        name: "userForm",
        mixins:[langMixin],
        components:{langString, iconBase, iconLocation}

    }
</script>

<style lang="scss">
    .user-form {
        border-radius: 12px;
        background: #FFFFFF;
        padding: 12px 9px;
        margin-bottom: 9px;
        .el-form-item {
            margin-bottom: 7px;
        }
        .el-form-item__label {

            line-height: 14px;

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
    }
</style>
