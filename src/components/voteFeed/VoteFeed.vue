<template lang="html">

    <section class="vote-feed" :class="{'pt-16': !mobile}">
		<scroll-swiper-reusable
				v-if="mobile"
				class="followers-swiper mb-15 pl-30"
				:stub-length="2">

			<picture-reusable
				v-for="{avatar, username, user_id} in followersData"
				@click.native="filterFeed(user_id)"
				class="user-bow mr-7 pointer"
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
						class="user-bow mr-7 pointer"
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

		<div
				class="vote-instance-wrapper flex-column pb-12"
				:class="{'desktop bg-white': !mobile}">
			<div
					class="flex-column"
					v-for="(item, index) in items">
				<vote-instance
						:item="item"
						class="py-12" />
				<hr class="m-0 mt-13" v-show="index !== items.length - 1">
			</div>
			<loader-reusable class="m-auto" v-show="!loaded && loading" />
		</div>

    </section>

</template>



<script>
	import { mapState } from "vuex";
	import PictureReusable from "../reusableСomponents/PictureReusable";
	import VoteInstance from "./voteInstance";
	import loadingSpinner from "../reusableСomponents/loadingSpinner"
	import ScrollSwiperReusable from "../reusableСomponents/ScrollSwiperReusable";
	import LoaderReusable from "../reusableСomponents/LoaderReusable";
	
	export default {
		data() {
			return {
				publicPath: process.env.VUE_APP_MAIN_API,
				swiperOption: {
					slidesPerView: 6,
					spaceBetween: 3.5
				},
			};
		},

		watch: {
			scrolled_to_bottom(old) {
				if (old) {
					this.load();
				}
			}
		},

		computed: {
			
			...mapState("voteFeed", {
				state: s => s,
				items: ({ items }) => items,
				postsEnded: ({ is_finished }) => is_finished,
				loading: ({ loading }) => loading,
				loaded: ({ loaded }) => loaded,
			}),
			
			...mapState("followsPage", {
				followings: s => s.items
			}),

			...mapState("globalStore", {
				users: s => s.users
			}),
			
			mobile() {
				return this.$root.mobile;
			},

			scrolled_to_bottom() {
				return this.$root.scrolled_to_bottom;
			},

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
			LoaderReusable,
			ScrollSwiperReusable,
			VoteInstance,
			PictureReusable,
			loadingSpinner
		},
		created() {
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

			&.desktop {
				min-height: 619px;
			}
		}
		
		.user-bow {
			.text {
				.title {
					width: 70px;
					text-align: center;
					
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
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
