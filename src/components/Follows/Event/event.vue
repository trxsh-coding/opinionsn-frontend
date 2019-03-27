<template>

   <div>


       <div  class="subscribers-template">
           <el-button type="primary" class="follows-button" size="small" round @click="followersLink(id)" v-bind:class="{backgroundNone : isFollowing}">
               <lang-string :title="'followers'"/>
           </el-button>
           <el-button size="small" class="follows-button" round @click="followingsLink(id)" v-bind:class="{backgroundNone : !isFollowing}">
               <lang-string :title="'followings'"/>
           </el-button>
           <div class="subs-section mt-10" v-if="items.length">

               <div class="subs-wrapper pb-10 pt-10" v-for="user in users">
                   <div class="left-block flex-align-center">
                       <div class="avatar-block avatar-42x42" @click="userLink(user.id)" :style="{ 'background-image': 'url(' + user.path_to_avatar + ')' }"></div>
                       <span>{{user.username}}</span>
                   </div>
                   <div class="right-block">
                       <el-button class="unfollow-button" v-if="user.leader && user.id != main_user_id" @click="userLink(user.id)">
                           <span class="uppercase subscribition">подписки</span>
                       </el-button>
                       <el-button  class="follow-button subscribition" v-if="!user.leader && user.id != main_user_id" @click="follow(user.id)">
                           <span class=" uppercase">подписаться</span>
                       </el-button>
                   </div>
               </div>
           </div>

       </div>
   </div>

</template>

<script>
    import {globalStoreMixin} from "../../../store/modules/globalStore";
    import {mapState} from 'vuex'
    import langString from '../../langString'
    import axios from 'axios'
    export default {
        name: "event",
        props:['id', 'isFollowing'],
        mixins:[globalStoreMixin()],
        components:{langString},
        data(){
            return {

                items:[]

            }
        },
        computed:{

            ...mapState('userPage', {
                state: s => s,
                items: s => s.items,
                main_user_id: s => s.main_user_id
            }),


            user_ids:function () {

                return this.items.map(item => {
                    return item.id
                });


            }

        },

        methods: {

            followersLink(userId){

                this.$router.push({name:'followers',params:{id:userId}})

            },

            followingsLink(userId){

                this.$router.push({name:'followings',params:{id:userId}})

            },

            userLink(userId){

                this.$router.push({name:'user',params:{id:userId}})

            },

            follow(id){

                axios.post(`api/rest/follow/${id}`)
                    .then((response) => {
                        if (response.status === 200) {
                            this.$store.commit('globalStore/updateStores', response.data, {root: true});

                    }

                })

            },

        },

        mounted(){

            let urlPart = this.isFollowing ? 'getFollowing' : 'getFollowers'

            axios.get(`/api/rest/${urlPart}/${this.id}`)
                .then((response) => {
                    if (response.status === 200) {
                        this.$store.commit('globalStore/updateStores', response.data, {root: true});
                        this.items = response.data.payload;

                    }

                })

        }
    }
</script>

<style lang="scss">

    .subscribers-template {

        .follows-button {
            padding: 4px 12px;
            background: #B9C0C4;
            color: #152D3A;
            border: none;
        }

        .backgroundNone {


            background: none;
            border:none;
            color: #69777F;

        }

        .subs-section {


            background: #ffffff;
            border-radius: 12px;
            padding: 0px 12px 0px 12px;

        }

        .subs-wrapper:last-of-type {

            border:none;

        }

        .subs-wrapper {
            display: flex;
            justify-content: space-between;
            border-bottom-color: #B9C0C4 ;
            border-bottom-width: 0.5px;
            border-bottom-style: solid;
            align-items: center;
            .left-block {

                span {

                    font-family: Roboto;
                    font-style: normal;
                    font-weight: 500;
                    font-size: 15px;
                    line-height: 18px;
                    color: #152D3A;

                }

            }
            .unfollow-button {

                padding: 5px 22px;
                background: #B9C0C4;
                border-radius: 15px;
                width: 107px;
                color: #ffffff;
                display: flex;
                justify-content: center;


            }



            .follow-button {

                @extend .unfollow-button;
                background: #4B97B4 ;

            }
        }

    }

</style>
