<template>
	<div class="profile-block" v-if="appearanceConditions">
		<RePicture class="profile-background" type="background"
		           :url="publicPath + user.background_image" width="288" height="90"/>
		
		<div class="profile-annotation flex-column">
			
			<router-link class="user-avatar pointer flex" :to="{name: 'user', params: { id: user.id }}">
				<RePicture :url="publicPath + user.path_to_avatar" alt="avatar" size="42" rounded/>
			</router-link>
			
			<span class="profile-username mt-16">
                {{user.username}}
            </span>
			<span class="profile-location mt-2">
                {{user.location}}
            </span>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import RePicture from "@/components/reusableСomponents/RePicture";
	
	export default {
		name: "profile",
		data() {
			return {
				publicPath: process.env.VUE_APP_ASSETS,
			}
		},
		computed: {
			
			...mapState('globalStore', {
				
				user: ({mainUser}) => mainUser
				
			}),
			
			appearanceConditions() {
				let {user} = this;
				return (Object.keys(user).length) ? !(this.$route.name === 'user' && this.$route.params.id === user.id) : false;
			}
			
			
		},
		components: {RePicture},
	}
</script>

<style lang="scss">
	.profile-block {
		height: 150px;
		background: #FFFFFF;
		border-radius: 6px;
		
		* {
			font-family: Roboto;
			font-style: normal;
		}
		
		.profile-background {
			border-radius: 6px 6px 0 0;
		}
		
		.profile-annotation {
			position: relative;
			align-items: center;
			
			.user-avatar {
				position: absolute;
				top: -31px;
			}
			
			.profile-username {
				font-weight: 500;
				font-size: 15px;
				color: #1A1E22;
			}
			
			.profile-location {
				font-weight: normal;
				font-size: 11px;
				color: #ADAFB3;
				
			}
		}
	}
</style>
