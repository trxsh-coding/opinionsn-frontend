<template>
    <div class="user-header">
        <div class="main-content mb-10">

            <div class="pictures-block">
                <div class="background-block" :style="{ 'background-image': 'url(' + user.background_image + ')' }">
                    <div class="uploader-wrapper" v-if="user.id === main_user_id">
                        <background-uploader  />
                    </div>
                    <div class="followers-block" @click="followsLink(user.id)">
                        <div class="followings">
                            <span class="number-span">{{user.amount_of_followers}}</span>
                            <lang-string class="bottom-span" :title="'followers'"/>
                        </div>
                        <div class="followers">
                            <span class="number-span">{{user.amount_of_leaders}}</span>
                            <lang-string class="bottom-span" :title="'followings'"/>
                        </div>
                    </div>
                </div>
                <!--<div class="avatar-block">-->

                    <!--<mobile-avatar :user="user" />-->


                <!--</div>-->
                <div class="avatar-block" :style="{ 'background-image': 'url(' + user.path_to_avatar + ')' } ">
                    <icon-base
                            v-if="user.id === main_user_id"
                            class="icon-photo"
                            fill="#152D3A"
                            width="20"
                            height="16"
                            viewBox="0 0 20 16"
                            icon-name="icon-photo"><icon-photo/>
                    </icon-base>
                    <div class="uploader-wrapper" v-if="user.id === main_user_id">
                        <avatar-uploader   />
                    </div>
                </div>
            </div>
            <div class="info-block">
                <el-button size="small" v-if="!hide_edit && user.id === main_user_id"class="edit" @click="editInfo" >
                    <lang-string :title="'edit'"/>
                </el-button>
                <el-button size="small" v-if="!hide_edit && !user.leader  && user.id != main_user_id"class="edit"  @click="follow(user.id)" >
                    <lang-string :title="'follow'"/>
                </el-button>
                <el-button size="small" v-if="!hide_edit && user.leader && user.id != main_user_id"class="edit"  @click="unfollow(user.id)" >
                    <lang-string :title="'unfollow'"/>
                </el-button>
                <el-button size="small" v-if="hide_edit" class="edit-cancel" @click="hide_edit = false" >
                    <lang-string :title="'cancel'"/>
                </el-button>
                <el-button size="small" v-if="hide_edit" class="edit-save" @click="updateUserInfo" >
                    <lang-string :title="'save'"/>
                </el-button>
                <div class="name-block mb-3">

                    <div class="firstname-block" v-if="user.first_name != null ">
                        <span class="p">{{user.first_name + ' ' + user.last_name}}</span>
                    </div>
                </div>
                <div class="nickname-block mb-3">
                    <span  class="username">{{user.username}}</span>
                </div>
                <div class="location-block mb-3" >
                    <span class="location">{{user.location}}</span>
                </div>
                <div class="description-block mb-3">
                    <span>{{user.aboutMe}}</span>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import {localString} from './../../../utils/localString'
    import avatarUploader from './modules/avatarUploader.vue'
    import mobileAvatar from './modules/mobileAvatar.vue'
    import backgroundUploader from './modules/backgroundUploader.vue'
    import langString from './../../langString.vue'
    import {mapState} from 'vuex'
    import IconBase from '../../icons/IconBase'
    import IconPhoto from '../../icons/IconPhoto'
    import IconLocation from '../../icons/IconLocation'
    export default {
        name: "userHeader",
        props:['user', 'hide_form'],
        data(){
            return {
                mobile: this.$root.mobile,
                hide_form:false,
                avatarDialog:false,
                location:null,
                aboutMe:null,
                username:null,
                last_name:null,
                first_name:null
            }
        },
        computed: {
            ...mapState('userPage', {
                state: s => s,
                items: s => s.items,
                main_user_id: s => s.main_user_id,

            }),

            ...mapState('globalStore', {

                userMap: ({users}) => users,
                mainUser: ({mainUser}) => mainUser

            }),


            route:  function () {

                console.log(this)

                return this.$route.params

            }

            //Main user getter

            // main_user:function () {
            //
            //     let {state,userMap} = this;
            //
            //     return userMap[state.main_user_id]
            //
            // },


        },
        methods: {

            followsLink(userId) {

                this.$router.push({name:'follows', params:{id:userId}})

            },



            updateUsername(username) {


                this.$store.commit('userPage/updateUsername', {username, id})

            },

            follow(id){


               this.$store.dispatch(`userPage/followUser`, id);


            },

            unfollow(id) {

                this.$store.dispatch(`userPage/unFollowUser`, id);


            },

            editInfo(){


                this.$emit('hide', !this.hide_form);


            }

        },

        created(){


        },
        components:{

            langString,
            avatarUploader,
            backgroundUploader,
            IconBase,
            IconLocation,
            mobileAvatar,
            IconPhoto

        }
    }
</script>

<style lang="scss">
    .user-header {

        .main-content {

            .pictures-block {
                position: relative;
                .avatarDialog {
                    width: 145px;
                    height: 146px;
                    background: cover;
                    border-radius: 5px;
                    object-fit: cover;
                    background-position: center;
                }
                .background-block {
                    min-height: 200px;
                    background-repeat: no-repeat;
                    background-size: cover !important;
                    background-position: center;
                    border-radius: 6px 6px 0 0;
                    position: relative;
                    .followers-block {
                        display: flex;
                        flex-direction: column;
                        width: 83px;
                        height: 98px;
                        background: #fff;
                        float: right;
                        margin-right: 15px;
                        justify-content: space-evenly;
                        border-radius: 0px 0px 6px 6px;

                        .followings, .followers {
                            display: flex;
                            align-items: center;
                            flex-direction: column;
                            margin: 0px 27px;
                            padding: 5px;
                            span {

                            }
                        }
                        .followers {
                            border-top-color: #828D92 ;
                            border-top-width: 0.5px;
                            border-top-style: solid;

                        }
                        .bottom-span {
                            font-family: Roboto;
                            font-style: normal;
                            font-weight: 300;
                            line-height: 11px;
                            font-size: 11px;
                            letter-spacing: -0.2px;
                            color: #828D92;
                        }
                        .number-span {
                            font-family: Roboto;
                            font-style: normal;
                            font-weight: 500;
                            font-size: 15px;
                            letter-spacing: -0.1px;
                            color: #152D3A;
                            padding-bottom: 3px;
                        }

                    }
                }
                .description-block, .nickname-block, .location-block {
                    margin-bottom: 4px;
                }
                .avatar-block {
                    z-index: 10;
                    height: 90px;
                    width: 90px;
                    background-repeat: no-repeat;
                    background-size: cover !important;
                    background-position: center;
                    background-size: 50% 50%;
                    border-radius: 100px;
                    position: absolute;
                    bottom: -25px;
                    left: 12px;
                    border-radius: 45px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .avatar {
                    width: 178px;
                    height: 178px;

                }
            }

            .name-block {

                display: flex;
                flex-direction: row;
                min-height: 18px;
                .el-input__inner {

                    width: 230px !important;
                    margin-right: 10px;

                }

            }
            .info-block {
                background: #ffffff;
                height: 83px;
                border-radius: 0 0 6px 6px;
                position: relative;
                justify-content: space-evenly;
                flex-direction: column;
                display: flex;
                padding: 36px 19px 15px 12px;
                %input-styles {
                    height: 18px;
                    border-radius: 30px;
                    width: 100%;
                }
                .edit {
                    background: #A1ABB0;

                    text-transform: lowercase;
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 15px;
                    line-height: 13px;
                    letter-spacing: -0.1px;

                    color: #FFFFFF;

                    border-radius: 0px 6px 0px 0px !important;
                    position: absolute;
                    left: 94px;
                    top: -33px;
                    border-color: #A1ABB0;
                    span {
                        font-family: Roboto;
                        font-style: normal;
                        font-weight: normal;
                        line-height: 13px;
                        font-size: 13px;
                        letter-spacing: -0.1px;
                        font-variant: small-caps;
                        color: #FFFFFF;
                    }
                }
                // .edit {
                //   position: absolute;
                //   right: 10px;
                //   border-radius: 30px;
                //   top: 15px;
                //   background: #E4E7E9;
                //   text-transform: uppercase;
                // }
                .edit-cancel  {
                    background: #4B97B4;
                    border-radius: 6px 6px 0px 0px;
                    text-transform: uppercase;
                    position: absolute;
                    right: 129px;
                    top: -34px;
                    border-color: #4B97B4;
                    span {
                        color: #ffffff;
                    }
                }
                .edit-save  {
                    background: #4B97B4;
                    border-radius: 6px 6px 0px 0px;
                    text-transform: uppercase;
                    position: absolute;
                    right: 9px;
                    top: -34px;
                    border-color: #4B97B4;
                    span {
                        color: #ffffff;
                    }
                }

                .edit-username {
                    .el-input__inner {
                        @extend %input-styles;
                    }
                }
                .edit-aboutMe {
                    .el-input__inner {
                        @extend %input-styles;
                    }
                }
                .edit-location {

                    .el-input__inner {
                        @extend %input-styles;
                    }
                }
                .nickname-block {

                }

                .description-block {
                    span {
                        font-family: Roboto;
                        font-style: normal;
                        font-weight: normal;
                        line-height: 16px;
                        font-size: 13px;
                        letter-spacing: -0.1px;
                        color: #152D3A;
                    }
                }
                .location-block {
                    span {
                        font-family: Roboto;
                        font-style: normal;
                        font-weight: 300;
                        line-height: 11px;
                        font-size: 12px;
                        letter-spacing: -0.2px;
                        color: #828D92;
                    }
                }
            }
        }

    }

</style>
