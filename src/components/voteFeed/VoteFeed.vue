<template lang="html">

<!-- TODO: доделать voteFeed	-->
    <section class="vote-feed">
		<swiper :options="swiperOption" class="followers-swiper">
			<swiper-slide class="avatar-wrapper" v-for="{avatar, username, user_id} in followersData">
				<router-link :to="{ name: 'user', params: { id: user_id }}">
					<picture-reusable
						pic-class="mb-9 p-2"
						:size="66"
						:img="avatar"
						text-layout="bottom"
						bor-color="#BCBEC3"
						rounded>
						<template #title>
							{{username}}
						</template>
					</picture-reusable>
				</router-link>
			</swiper-slide>
		</swiper>

		<hr class="mt-15 mb-12">


    </section>

</template>



<script>
	import { mapState } from "vuex";
	import PictureReusable from "../reusableСomponents/PictureReusable";


	export default {
		data() {
			return {
				publicPath: process.env.VUE_APP_MAIN_API,
				swiperOption: {
					slidesPerView: 4,
					spaceBetween: 7
				},
			};
		},
		components: {
			PictureReusable

		},
		mounted() {
			this.$store.dispatch('followsPage/getMyFollowings');
			this.$store.dispatch('voteFeed/list');
		},
		computed: {

			...mapState("followsPage", {
				followings: s => s.items
			}),

			...mapState("globalStore", {
				users: s => s.users
			}),

			followersData() {
				let { followings, users } = this;
				let data = [];
				followings.forEach(({ id }, index) => {
					data[index] = {
						avatar: this.publicPath + users[id].path_to_avatar,
						username: users[id].username,
						user_id: id
					}
				});

				return data;

			}

		},
	};
</script>

<style lang="scss">
	.vote-feed {
		position: relative;
		box-sizing: border-box;
		width: 100%;

		* {
			box-sizing: inherit;
		}

		hr {
			border: none;
			height: 1px;
			background-color: #BCBEC3;
			opacity: 0.7;
			box-shadow: 0px 0px 15px rgba(56, 56, 56, 0.05);
			border-radius: 2px;
		}

	}
</style>
