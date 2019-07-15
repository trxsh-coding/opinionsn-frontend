<template lang="html">

    <section class="vote-feed" :class="{'pt-16': !mobile}">
		<scroll-swiper-reusable
				v-if="mobile"
				class="followers-swiper mb-15 pl-30"
				:stub-length="2">

			<picture-reusable
				v-for="{avatar, username, user_id} in followersData"
				@click.native="filterFeed(user_id)"
				class="mr-7 pointer"
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

		</scroll-swiper-reusable>

		<swiper
				v-else
				:options="swiperOption"
				class="followers-swiper mb-15">
			<swiper-slide
					class="avatar-wrapper"
					v-for="{avatar, username, user_id} in followersData">
				<picture-reusable
						@click.native="filterFeed(user_id)"
						class="mr-7 pointer"
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
			</swiper-slide>
		</swiper>


		<div v-for="(item, index) in items" class="vote-instance-wrapper" :class="{'bg-white': !mobile}">
			<vote-instance :item="item" class="py-12" />
			<hr class="m-0 mt-13" v-show="index !== items.length - 1">
		</div>
		<mugen-scroll :handler="load" :should-handle="!postsEnded || !loading">
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
				mobile: this.$root.mobile,
				swiperOption: {
					slidesPerView: 6,
					spaceBetween: 3.5
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
			},
			filterFeed(id) {
				this.$store.commit('voteFeed/setFilterId', id);
				this.$store.dispatch('voteFeed/list');
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
			this.$store.commit('voteFeed/clearFilter');
			this.$store.dispatch('voteFeed/list');
		},
		beforeDestroy() {
			this.$store.commit('voteFeed/clearFilter');
		}
	};
</script>

<style lang="scss">
	.vote-feed {
		position: relative;
		box-sizing: border-box;
		width: 100%;
		border-radius: 6px;

		.vote-instance-wrapper {
			border-radius: 6px;
		}

		* {
			box-sizing: inherit;
			background: transparent;
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
