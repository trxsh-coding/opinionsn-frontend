<template>
	<div class="feed flex-column">
		<!-- <vote-instance class="mt-12" v-for="(item, index) in items" :item="item" :key="index" /> -->
		<template v-for="(item, index) in items">
			<vote-instance class="mt-12" :item="item" :key="index" />
			<!-- <div :key="index + 'hr'" class="hr mt-12"></div> -->
		</template>
		<loader-reusable class="mx-auto my-9" v-show="!is_finished && loading" />
		<lang-string
			class="empty-payload pl-60 mx-auto"
			v-show="is_finished && !items.length"
			:title="(feed_type === 1) ? 'you_have_not_created_any_posts_yet' : 'you_have_not_yet_responded_to_any_publication'"
		/>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import MugenScroll from "vue-mugen-scroll";
	import ShortPollReusable from "../reusableСomponents/ShortPollReusable";
	import VoteInstance from "../voteFeed/voteInstance";
	import langString from "../langString";
	import LoaderReusable from "../reusableСomponents/LoaderReusable";

	export default {
		name: "userFeed",

		components: {
			LoaderReusable,
			VoteInstance,
			ShortPollReusable,
			MugenScroll,
			langString
		},

		props: {
			feed_type: {
				type: Number,
				required: true,
				default: function() {
					return 1;
				}
			}
		},

		computed: {
			...mapState("userFeed", {
				state: s => s,
				filteredFeed: ({ filteredFeed }) => filteredFeed,
				items: s => s.items,
				is_finished: s => s.is_finished,
				loading: s => s.loading
			}),

			...mapState("globalStore", {
				votes: ({ votes }) => votes,
				polls: ({ polls }) => polls
			}),

			userId() {
				return this.$route.params.id;
			},

			scrolled_to_bottom() {
				return this.$root.scrolled_to_bottom;
			}
		},

		methods: {
			load() {
				this.$store.dispatch(`userFeed/loadNextPage`, {
					params: { id: this.userId }
				});
			},

			changeTypeOfFeed() {
				let { feed_type } = this;
				let payload;

				switch (feed_type) {
					case 1:
						payload = true;
						break;
					case 2:
						payload = false;
						break;
					default:
						payload = false;
				}

				this.$store.commit(`userFeed/setFilteredFeed`, payload);
				this.$store.dispatch(`userFeed/list`, {
					params: { id: this.userId }
				});
				this.$forceUpdate();
			}
		},

		mounted() {
			this.changeTypeOfFeed();
		},

		watch: {
			userId(oldUserId, newUserId) {
				if (oldUserId !== newUserId) this.changeTypeOfFeed();
			},

			feed_type(old, current) {
				if (old !== current) this.changeTypeOfFeed();
			},

			scrolled_to_bottom(val) {
				if (val && !this.is_finished) this.load();
			}
		}
	};
</script>

<style lang="scss">
	.feed {
		.annotation {
			font-family: Roboto;
			font-style: normal;
			font-weight: normal;
			font-size: 12px;
			text-transform: lowercase;
			color: #1a1e22;
		}

		.empty-payload {
			font-family: Roboto, sans-serif;
			font-size: 12px;
			color: darkgray;
		}
	}
</style>
