<template>
    <div id="mypage">

        <!-- Загрузка -->
        <!--<div v-else-if="state.loading">-->
            <!--<p align="center" style="font-size:10px;margin-top: 5px;color: darkgray">Загружаю...</p>-->
        <!--</div>-->

        <!-- Выгрузка пользователя -->
        <div v-if="!items.length">
            <p align="center" style="font-size:10px;margin-top: 5px;color: darkgray">Нет событий</p>
        </div>

        <!-- Всё ок -->
        <div v-else v-for="item in items">
            <user-section :item="item"/>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import userSection from './Event/userSection'
    export default {
        name: "userPage",
        props:['user_id'],
        computed: {
            ...mapState('userPage', {
                state: s => s,
                items: s => s.items,
            }),





        },
        methods: {

            beforeRouteUpdate (to, from, next) {

                this.$store.dispatch(`userPage/list`, {customUrl: `/api/rest/getUserById/${this.$route.params.id}`}).then(next)


            },


        },

        components: {

            userSection

        },

        mounted(){

            this.$store.dispatch(`userPage/list`, {customUrl: `/api/rest/getUserById/${this.$route.params.id}`});

        }
    }

</script>

<style lang="scss">
    #mypage {
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
                    background-size: 50% 50%;
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
                                text-transform: uppercase;

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
                            line-height: 18px;
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
                    box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.24);
                    border-radius: 45px;
                }
                .avatar {
                    width: 178px;
                    height: 178px;
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
                padding: 33px 19px 20px 23px;
                %input-styles {
                    height: 27px;
                    border-radius: 30px;
                    width: 100%;
                    margin-bottom: 7px;
                }
                .edit {
                    background: #4b97b4;
                    border-radius: 6px 6px 0px 6px;
                    text-transform: uppercase;
                    border-color: #4b97b4;
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
                    top: -32px;
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
                    top: -32px;
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

                    span {
                        font-family: Roboto;
                        font-style: normal;
                        font-weight: 500;
                        line-height: 18px;
                        font-size: 15px;
                        letter-spacing: -0.1px;
                        color: #152D3A;
                    }

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
        #raiting {
            display: flex;
            justify-content: space-between;
        }
        .statistic-raiting {

        }
    }
</style>
