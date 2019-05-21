<template>
    <div class="user-links-wrapper" v-if="mainUser.id != user.id">

        <div class="left-side flex-align-center" >
            <avatar :author="user" class="avatar-42x42 pointer" size="S"/>
            <div class="info-block">
                <div class="username__item">
                    <span class="user-name">{{user.username}}</span>
                </div>
                <div class="location__item">
                    <span class="location">{{user.location}}</span>
                </div>
            </div>
        </div>
        <div class="button-block">
            <div class="follow-btn pointer" @click="follow(user.id)" v-if="!user.leader">
                <lang-string :title="'follow'"/>
            </div>
            <div class="unfollow-btn pointer" v-if="user.leader" @click="followersLink(user.id)" >
                <lang-string :title="'followings'"/>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import langString from '../../langString'
    import Avatar from "../../modules/adaptiveAvatar";
    export default {
        name: "users",
        props:['item'],
        components:{Avatar, langString},
        computed: {

            ...mapState('globalStore', {

                userMap: ({users}) => users,


            }),

            ...mapState('globalStore', {

                mainUser: ({mainUser}) => mainUser

            }),

            user:function () {

                let {item, userMap} = this;

                let user = userMap[item.id];

                return user;


            }


        },
        methods: {

            follow(id){


                this.$store.dispatch(`searchUser/followUser`, id);


            },

            followersLink(userId) {

                this.$router.push({name:'user',params:{id:userId}})

            }

        }
    }
</script>

<style lang="scss">

    .user-links-wrapper {
        justify-content: space-between;
        background: #FFFFFF;
        border-radius: 12px;
        padding: 9px;
        margin-top: 9px;
        display: flex;
        align-items: center;
        .info-block {

            .username__item {

                font-family: Roboto;
                font-style: normal;
                font-weight: 500;
                font-size: 14px;
                line-height: 18px;
                color: #152D3A;


            }

            .location__item {

                font-family: Roboto;
                font-style: normal;
                font-weight: 300;
                font-size: 12px;
                line-height: 11px;
                letter-spacing: -0.2px;
                color: #6D7D85;

            }
        }
        .button-block {

            .follow-btn {

                background: #4B97B4;
                border-radius: 15px;
                padding: 3px 0px;
                min-width: 100px;
                text-align: center;
                span {
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 11px;
                    line-height: 13px;
                    text-align: center;
                    letter-spacing: -0.1px;
                    color: #FFFFFF;
                    text-transform: uppercase;
                }

            }
            .unfollow-btn {

                @extend .follow-btn;

                background: #D0D5D8;

            }

        }

    }

</style>
