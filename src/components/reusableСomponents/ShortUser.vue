<template>
	<div class="short-user-reusable">

		<div class="flex">
			<div class="avatar-wrapper flex">
				
				<router-link class="mr-auto pointer" :to="{name: 'user', params: {id: user.id} }">
					<RePicture :url="user.path_to_avatar | addAssetsPath" size="36" rounded />
				</router-link>

			</div>

			<div class="text flex-column">

				<span class="username">{{user.username}}</span>

				<span v-if="user.aboutMe" class="status mt-3">{{user.aboutMe === 'About me' ? '' : user.aboutMe}}</span>

				<!--					   NOTE: ждем от Артура статистику в каждом экземпляре юзера -->
				<!--					   <div class="statistics mt-7 flex"></div>-->


			</div>

			<button-reusable
					v-if="!isMainUser"
					class="ml-6 p-9 w-fit h-fit pointer"
					:active="user.isLeader"
					:font-size="11"
					bor-rad="6"
					color="#ffffff"
					bg-color="#4B97B4"
					active-color="#000000"
					active-bg-color="#BCBEC3"
					@click.native="subscribeActions(user.id, user.isLeader)"
					:description="!user.isLeader ? 'follow' : 'unfollow'"
			/>
			

		</div>

		<hr class="mt-12">

	</div>
</template>

<script>
    import ButtonReusable from "./ButtonReusable";
    import imageMixin from "@/components/mixins/imageMixin";
    import RePicture from "@/components/reusableСomponents/RePicture";

    export default {
        name: "ShortUser",
        components: {
	        RePicture,
            ButtonReusable
        },
	    mixins: [imageMixin],
        props: {
            user: Object,
	        isMainUser: Boolean
        },
	    methods: {
		    subscribeActions(id, isLeader) {
			    if (!isLeader) {
				    this.$store.dispatch('followsPage/followUser', id);
			    } else {
			    	this.$store.dispatch('followsPage/unFollowUser', id);
			    }
		    }
	    },
    }
</script>

<style lang="scss">
	.short-user-reusable {

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
</style>
