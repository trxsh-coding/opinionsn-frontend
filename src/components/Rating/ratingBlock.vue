<template>
    <div class="user-rating-block pl-20 flex-align-center  pr-20" >
       <div class="left-column flex" >
           <div class="rang-block pr-23">
               <span>{{index + 1}}</span>
           </div>

       </div>
        <div class="right-column flex-between pt-13 pb-12">
            <div class="user-block">
                <picture-reusable :size="36" :img="publicPath + user.path_to_avatar" @click.native="userLink(user.id)" rounded>
                    <template #title>
                        <span class="pl-9">{{user.username}}</span>
                    </template>
                    <template #description>

                    </template>
                </picture-reusable>
            </div>
            <div class="statistic-block">
                <div class="percentage__item">
                    <span class="statistic-percentage">{{rating.percentageOfCorrect}}%</span>
                </div>
                <div class="amount__item">
                   <span class="correct_span">
                    {{rating.totalAmountOfCorrectlyAnswered}}
                    </span>
                    <span class="amount__span">
                    /{{rating.totalAmountOfVoted}}
                    </span>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import PictureReusable from "../reusableСomponents/PictureReusable";
    export default {
        name: "ratingBlock",
        components: {PictureReusable},
        props: {
            rating: {
               type: Object,
               required:true
            },
            index: {
                type:Number
            }
        },
        data() {
            return {
                publicPath: process.env.VUE_APP_ASSETS,
                avatar:require('../assets/images/ava.jpeg')
            }
        },
        computed: {
            ...mapState('globalStore', {

                mainUser: ({mainUser}) => mainUser,
                users: ({users}) => users

            }),

            user(){
                let {users, rating} = this;
                return users[rating.userId]
            },
            mobile(){
             return this.$root.mobile
            }
        },
        methods: {
            userLink(user_id){

                this.$router.push({name: 'user', params: {id: user_id}})

            },
        }

    }
</script>

<style lang="scss">
    .user-rating-block {
        .rang-block {
            span {
                font-family: Roboto;
                font-style: normal;
                font-weight: normal;
                font-size: 13px;
                color: #1A1E22;
            }
        }
        .right-column {
            .user-block {
                .picture-reusable {
                    align-items: end;
                }
            }
            width: 100%;
            border-bottom: 0.5px solid #BCBEC3;
            opacity: 0.7;
            box-shadow: 0px 0px 15px rgba(56, 56, 56, 0.05);
            &:last-of-type {
                border-bottom: none;
            }
        }
        .statistic-block {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            .percentage__item {
                font-family: Roboto;
                font-style: normal;
                font-weight: bold;
                font-size: 14px;
                color: #4B96B3;
            }
            .correct_span {
                font-family: Roboto;
                font-style: normal;
                font-weight: bold;
                font-size: 12px;
                color: #1A1E22;
            }
            .amount__span {
                font-family: Roboto;
                font-style: normal;
                font-weight: normal;
                font-size: 10px;
                color: #1A1E22;
            }
        }
    }
</style>