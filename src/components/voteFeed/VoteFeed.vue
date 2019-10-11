<template lang="html">
	
	<section class="vote-feed flex-column" :class="{'pt-16': !mobile}">
		
		<template v-if="data_received">
			<ReSwiper :type="mobile ? 'scroll' : 'usual'" class="mb-15" :swiper-class="mobile ? 'pl-30' : ''"
			          :params="{stubLength: 2, width: '100%'}" :usual-swiper-options="{slidesPerView: 6, spaceBetween: 3.5}">
				<template #usual>
					<swiper-slide class="avatar-wrapper"
					              v-for="{avatar, username, user_id} in followersData">
						<div class="slide flex-column flex-align-center pointer" @click="filterFeed(user_id)">
							<RePicture :url="avatar | assetsPath" size="66" rounded />
							<span class="caption text-center mt-10">{{username}}</span>
						</div>
					</swiper-slide>
				</template>
				
				<template #scroll>
					<div v-for="{avatar, username, user_id} in followersData"
					     class="slide mr-7 w-fit flex-column flex-align-center pointer" @click="filterFeed(user_id)">
						<RePicture :url="avatar | assetsPath" size="66" rounded />
						<span class="caption text-center mt-10">{{username}}</span>
					</div>
				</template>
			</ReSwiper>

			<div class="vote-instance-wrapper flex-column pb-12" :class="{'desktop': !mobile}">

				<vote-instance v-for="(item, i) in items" :item="item"
				               class="pt-12 br-6 pb-10 bg-white" :class="{'mt-9': i}"/>

				<Loader class="m-auto" v-show="!loaded && loading"/>

			</div>
		</template>
		
		<Loader class="m-auto" v-show="!data_received"/>
	
	</section>

</template>


<script>
	import {mapState} from "vuex";
	import VoteInstance from "./voteInstance";
	import Loader from "../reusableСomponents/Loader";
	import ReSwiper from "@/components/reusableСomponents/ReSwiper";
	import RePicture from "@/components/reusableСomponents/RePicture";
	import assetsPathMixin from "@/components/mixins/assetsPathMixin";
	
	export default {
		name: 'VoteFeed',
		data() {
			return {
				swiperOption: {
					slidesPerView: 6,
					spaceBetween: 3.5
				},
				data_received: false
			};
		},

		mixins: [assetsPathMixin],
		
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
				items: ({items}) => items,
				postsEnded: ({is_finished}) => is_finished,
				loading: ({loading}) => loading,
				loaded: ({loaded}) => loaded,
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
				return this.followings.map(({id}, index) => ({
					avatar: this.users[id].path_to_avatar,
					username: this.users[id].username,
					user_id: id
				}));
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
			RePicture,
			ReSwiper,
			Loader,
			VoteInstance,
		},
		async mounted() {
			try {
				this.$store.commit('voteFeed/clearFilter');
				await Promise.all([
					this.$store.dispatch('followsPage/getMyFollowings'),
					this.$store.dispatch('voteFeed/list')
				])
			} catch (e) {
				throw new Error(`Failed to received data in VoteFeed, error msg: ${e.message}`);
			} finally {
				this.data_received = true;
			}
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
		background: #f8f8f8;
		
		.vote-instance-wrapper {
			border-radius: 6px;
			
			&.desktop {
				min-height: 619px;
			}
		}
		
		.slide {
			.caption {
				width: 70px;
				text-align: center;
				
				font-family: Roboto;
				font-style: normal;
				font-weight: 500;
				font-size: 14px;
				color: #1a1e22;
				
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
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
