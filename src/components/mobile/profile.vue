<template lang="html">
	<div id="profile-section">
		<div class="user flex">
   
			<RePicture class="avatar" :url="publicPath + imageUtil(mainUser.path_to_avatar, 'S')" size="36" rounded/>
			<div class="flex-column ml-9 pt-2">
				<router-link class="username pointer my-auto" :to="{name: 'user', params: { id: mainUser.id }}">
					{{mainUser.username}}
				</router-link>
				
<!--				<lang-string title="balance" class="balance-text mt-4">-->
<!--					<template #text> : {{mainUser.balance}} OPI</template>-->
<!--				</lang-string>-->
			</div>
   
		</div>
	</div>
</template>

<script>
	import IconBase from '../icons/IconBase.vue'
	import IconLocation from '../icons/IconLocation.vue'
	import langString from '../langString'
	import {mapState} from 'vuex';
	import imageMixin from "../mixins/imageMixin";
	import RePicture from "@/components/reusableСomponents/RePicture";
	
	export default {
		mixins: [imageMixin],
		data() {
			return {
				publicPath: process.env.VUE_APP_ASSETS,
				
			}
		},
  
		computed: {
			...mapState('globalStore', {
				mainUser: ({mainUser}) => mainUser
			}),
		},
  
		components: {
			RePicture,
			IconBase,
			IconLocation,
			langString
		},
	}
</script>

<style lang="scss">
	#profile-section {
		margin-bottom: 27.5px;
		
        .user {
            opacity: 0.7;
    
            .balance-text {
                font-family: Helvetica Neue, serif;
                font-size: 10px;
                line-height: 10px;
                color: #BEC0C5;
            }
        }
        
	}
</style>
