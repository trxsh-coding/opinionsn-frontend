<template>
    <div class="profile-block" v-if="appearanceConditions">
        <div class="profile-background-block">
            <picture-reusable :img="publicPath + user.background_image" :width="288" :height="90" bor-rad="auto"/>
        </div>
        <div class="profile-annotation flex-column ">
            <picture-reusable
                    @click.native="$router.push( {name:'user', params:{ id: user.id} } )"
                    class="user-avatar pointer"
                    :img="publicPath + user.path_to_avatar"
                    :size="42"
                    bor-rad="50%"/>

            <span class="profile-username">
                {{user.username}}
            </span>
            <span class="profile-location">
                {{user.location}}
            </span>
        </div>
    </div>
</template>

<script>
    import PictureReusable from "../../../reusableСomponents/PictureReusable";
    import {mapState} from 'vuex'
    export default {
        name: "profile",
        data() {
            return {
                publicPath: process.env.VUE_APP_MAIN_API
            }
        },
        computed: {

            ...mapState('globalStore', {

                user: ({mainUser}) => mainUser

            }),
            
            appearanceConditions() {
                let { user } = this;
                return (Object.keys(user).length) ? !(this.$route.name === 'user' && this.$route.params.id === user.id) : false;
            }
            
            
        },
        components: {PictureReusable},
    }
</script>

<style lang="scss">
    .profile-block {
        height: 150px;
        background: #FFFFFF;
        border-radius: 6px;

        .profile-background-block {
            width: 288px;
            height: 90px;
            .picture {
                border-radius: 6px 6px 0 0;
            }
        }
        .profile-annotation {
            align-items: center;
            .profile-username {
                font-family: Roboto;
                font-style: normal;
                font-weight: 500;
                font-size: 15px;
                color: #1A1E22;
            }
            .profile-location {
                font-family: Roboto;
                font-style: normal;
                font-weight: normal;
                font-size: 11px;
                color: #ADAFB3;

            }
            .user-avatar {
                margin-top: -31px;
            }
        }
    }
</style>
