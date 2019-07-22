<template>
	<div class="short-user-reusable">

		<div class="flex">
			<div class="avatar-wrapper flex">

				<picture-reusable
						class="mr-auto pointer"
						pic-class="mb-auto"
						:img="publicPath + user.path_to_avatar"
						size="36"
						rounded
						without-text
						@click.native="$router.push({name: 'user', params: {id: user.id} })"
				/>

			</div>

			<div class="text flex-column">

				<span class="username">{{user.username}}</span>

				<span class="status mt-3">{{user.aboutMe === 'About me' ? '' : user.aboutMe}}</span>

				<!--					   NOTE: ждем от Артура статистику в каждом экземпляре юзера -->
				<!--					   <div class="statistics mt-7 flex"></div>-->


			</div>

			<button-reusable
					class="ml-6 p-9 w-fit h-fit pointer"
					:font-size="11"
					bor-rad="6"
					:bg-color="user.isLeader ? '#BCBEC3' : '#4B97B4'"
					@click.native="subscribeActions(user.id, user.isLeader)"
					:description="!user.isLeader ? 'follow' : 'unfollow'"
			/>

		</div>

		<hr class="mt-12">

	</div>
</template>

<script>
    import PictureReusable from "./PictureReusable";
    import ButtonReusable from "./ButtonReusable";


    export default {
        name: "ShortUserReusable",
        components: {
            PictureReusable,
            ButtonReusable
        },
        props: {
            user: Object,
            required: true
        },
        data() {
            return {
                publicPath: process.env.VUE_APP_MAIN_API
            }
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
