<template lang="html">

    <section class="vote-feed">
		<scroll-swiper-reusable class="followers-swiper pl-30" :stub-length="2">

			<router-link class="mr-7" v-for="{avatar, username, user_id} in followersData" :to="{ name: 'user', params: { id: user_id }}">
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

		</scroll-swiper-reusable>

		<hr class="mt-15 mb-12">
		<div v-for="item in items" >
			<vote-instance :item="item" />
			<hr class="mt-12">
		</div>
		<mugen-scroll :handler="load" :should-handle="!postsEnded || !loading">
			{{loading}}
		</mugen-scroll>
    </section>

</template>



<script>
	import { mapState } from "vuex";
	import PictureReusable from "../reusableСomponents/PictureReusable";
	import VoteInstance from "./voteInstance";
	import MugenScroll from "vue-mugen-scroll";
	import loadingSpinner from "../reusableСomponents/loadingSpinner"
	import ScrollSwiperReusable from "../reusableСomponents/ScrollSwiperReusable";

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

		computed: {
			...mapState("voteFeed", {
				state: s => s,
				items: ({ items }) => items,
				postsEnded: ({ is_finished }) => is_finished,
				loading: ({ loading }) => loading
			}),
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
		methods: {
			load() {
				this.$store.dispatch('voteFeed/loadNextPage');
			}
		},
		components: {
			ScrollSwiperReusable,
			VoteInstance,
			PictureReusable,
			MugenScroll,
			loadingSpinner

		},
		mounted() {
			this.$store.dispatch('followsPage/getMyFollowings');
			this.$store.dispatch('voteFeed/list');
		},
	};
</script>

<style lang="scss">
	.vote-feed {
		position: relative;
		box-sizing: border-box;
		width: 100%;
		background: #FFFFFF;
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
