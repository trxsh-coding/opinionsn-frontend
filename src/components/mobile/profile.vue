<template lang="html">
    <div id="profile-section" class="mb-10">
        <div class="profile-background " :style="{ 'background-image': 'url(' + publicPath + user.background_image + ')' }" > </div>
        <div  class="profile-content">
            <avatar :author="user" size="S" class="profile-avatar"/>
            <div class="main-content">
                <div class="description-block">
                    {{ user.first_name }} {{ user.last_name }}
                </div>
          <span class="nickname-id">
            {{user.username}}
          </span>
            </div>

            <div class="bottom-content">
                <span class="location">{{ user.location }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import IconBase from '../icons/IconBase.vue'
    import IconLocation from '../icons/IconLocation.vue'
    import avatar from '../modules/adaptiveAvatar'
    import { mapState } from 'vuex';
    export default {
        data () {
            return {
                publicPath: process.env.VUE_APP_MAIN_API

            }
        },
        methods: {
            pageReload(file, fileList){
                this.$store.dispatch('user/getCurrentUser')
                this.$refs.upload.clearFiles();
            },

            userLink(userId){

                this.$router.push({name:'user',params:{id:userId}})

            },
        },
        computed: {
            ...mapState('userPage', {
                state: s => s,
                items: s => s.items,
            }),

            ...mapState('globalStore', {

                userMap: ({users}) => users

            }),
            //Main user getter

            user:function () {

                let {state,userMap} = this;


                return userMap[state.main_user_id]

            }
        },
        components: {
            IconBase,
            IconLocation,
            avatar
        },
    }
</script>

<style lang="scss">
    #profile-section {
        min-width: 240px;
        min-height: 115px;
        text-align: center;
        .el-upload {
            display: block;
        }
        .description-block {
            text-align: center;
            .description {
                font-family: Roboto;
                font-style: normal;
                font-weight: normal;
                line-height: 15px;
                font-size: 12px;
                text-align: center;
                letter-spacing: -0.1px;
                color: #152D3A;
            }
        }
        .profile-background {
            width: 100%;
            height: 90px;
            background-repeat: no-repeat;
            background-size: cover !important;
            background-position: center;
            background-size: 50% 50%;
            border-radius: 12px 12px 0 0;
        }
        .profile-content {
            margin: 0px !important;
            display: flex;
            position: relative;
            width: 100%;
            height: 90px !important;
            max-height: 300px;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            background-color: #ffffff;
            margin-right: 0px;
            border-radius: 0 0 12px 12px;
            height: 60px;
            .profile-avatar {
                position: absolute;
                top: -45px;
				left: 50%;
				transform: translateX(-50%);
                width: 63px;
                height: 63px;
                border-radius: 1000px;
                background-size: 50% 50%;
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;
            }

            .main-content {

                margin-top: 16px;

            }

            .nickname-header {
                font-family: Roboto;
                font-style: normal;
                font-weight: 500;
                line-height: 15px;
                font-size: 14px;
                letter-spacing: -0.3px;
                color: #383838;
            }
            .nickname-id {
                font-family: Roboto;
                font-style: normal;
                font-weight: 500;
                line-height: 18px;
                font-size: 15px;
                text-align: center;
                letter-spacing: -0.1px;
                color: #152B3A;
            }
            .bottom-content {
                .location {
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: normal;
                    line-height: 11px;
                    font-size: 11px;
                    letter-spacing: -0.3px;
                    color: rgba(56, 56, 56, 0.7);
                }
                img {
                    width: 8px;
                    height: 11px;
                    margin-right: 5px;
                }
            }
        }
    }
</style>
