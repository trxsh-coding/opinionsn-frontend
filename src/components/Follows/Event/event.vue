<template>

   <div
	   class="subscribers-template flex-column"
	   :class="{followers: !isFollowing, followings: isFollowing}"
   >

	   <div class="switch-btns flex-align-center ml-60">

		   <div
			   class="follows-button pointer pb-2"
			   :class="{active: isFollowing}"
			   :title="'followers'"
			   @click="followingsLink(id)"
		   >
			   <lang-string class="text" :title="'followers'" />
			   <span class="counter"> ({{current_user.amount_of_followers}})</span>
		   </div>

		   <div
			   class="followers-button ml-27 pointer pb-2"
			   :class="{active: !isFollowing}"
			   @click="followersLink(id)"
		   >
			   <lang-string class="text" :title="'followings'" />
			   <span class="counter"> ({{current_user.amount_of_leaders}})</span>
		   </div>


	   </div>

	   <ul class="subs-list mt-6 flex-column">

		   <short-user-reusable class="mt-12 mx-20" :user="user" v-for="(user, index) in users_from_payload" :key="index" />

		   <loader-reusable v-show="!is_finished" class="mx-auto my-9" />

		   <lang-string
				   class="mx-auto my-9 empty-payload"
				   v-show="is_empty"
				   :title="isFollowing ? 'you_have_no_followers_yet' : 'you_have_no_active_subscriptions'" />

	   </ul>

   </div>

</template>

<script>
    import {mapState} from 'vuex'
    import langString from '../../langString'
    import IconBase from '../../icons/IconBase'
    import IconClose from '../../icons/IconZoomIn'
    import axios from 'axios'
    import langMixin from "../../mixins/langMixin";
    import ShortUserReusable from "../../reusableСomponents/ShortUserReusable";
    import LoaderReusable from "../../reusableСomponents/LoaderReusable";



    export default {
        name: "event",
        props:['id', 'isFollowing'],
        mixins:[langMixin],
        components:{
	        LoaderReusable,
			langString,
			IconBase,
			IconClose,
	        ShortUserReusable
		},
        data(){
            return {

				items:[],
	            is_finished: false,
	            is_empty: false,
				keyword: "",
				filteredUsers: null,
				publicPath: process.env.VUE_APP_MAIN_API

            }
        },
        computed:{

            ...mapState('userPage', {
                main_user_id: ({main_user_id}) => main_user_id
            }),

			...mapState('globalStore', {
				users: ({ users }) => users,
				mainUser: ({ mainUser }) => mainUser
			}),

			current_user() {
            	if (!this.users) return false;
				return this.users[this.id];
			},

			users_from_payload() {
				let { users, items } = this;

				return items.map(({id}) => users[id]);
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

                axios.post(`${process.env.VUE_APP_MAIN_API}/rest/v1/user/subscribe/${id}`)
                    .then((response) => {
                        if (response.status === 200) {
                            this.$store.commit('globalStore/updateStores', response.data, {root: true});

                    }

                })

			},

			subscribeActions(id, is_leader) {

				if (!is_leader) {
					this.$store.dispatch(`userPage/followUser`, id);
				} else {
					this.$store.dispatch(`userPage/unFollowUser`, id);
				}

			},

        },

        mounted(){
            let urlPart = this.isFollowing ? 'subscribers' : 'subscription';

            axios.get(`${process.env.VUE_APP_MAIN_API}/rest/v1/user/${urlPart}/${this.id}`)
                .then((response) => {
                    if (response.status === 200) {
                        this.$store.commit('globalStore/updateStores', response.data, {root: true});
                        this.items = response.data.payload;
                        if (!this.items.length) this.is_empty = true;
                        this.is_finished = true;

                    }

                })

        },
    }
</script>

<style lang="scss">

    .subscribers-template {
		position: relative;
		width: 100%;

		.switch-btns {

			.follows-button,
			.followers-button {
				font-family: Roboto;
				font-style: normal;
				font-weight: normal;
				font-size: 13px;
				color: #BCBEC3;
				border-bottom: 2px solid transparent;

				&.active {
					font-weight: 500;
					font-size: 15px;
					color: #4B97B4;
					border-bottom: 2px solid #4B97B4;
				}
			}

		}

		.subs-list {

			* {
				font-family: Roboto;
				font-style: normal;

				hr {
					margin: 0;
					border: none;
					height: 1px;
					background-color: #BCBEC3;
					opacity: 0.7;
					box-shadow: 0 0 15px rgba(56, 56, 56, 0.05);
					border-radius: 2px;
				}
			}

			.empty-payload {
				font-family: Roboto, sans-serif;
				font-size: 12px;
				color: darkgray;
			}

			.list-item {

				.avatar-wrapper {
					flex: 0 0 54px;
				}

				.text {
					flex: 1;
					word-break: break-word;

					.username {
						font-weight: 500;
						font-size: 14px;
						color: #1A1E22;
					}

					.status {
						font-weight: normal;
						font-size: 12px;
						line-height: 14px;
						color: #1A1E22;
						opacity: 0.6;
					}

				}

				.button-reusable {
					font-weight: normal;
					font-size: 11px;
					color: #FFFFFF;
				}

			}

		}


    }

</style>
