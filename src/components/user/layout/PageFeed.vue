<template>
    <div class="user-page-feed">

		<div class="pl-60 feed-switchers flex-column">

			<lang-string class="title" :title="'user_feed'" />

			<ul class="switcher-list mt-9 flex">
				<li class="switcher switcher-2 pointer" @click="setFeedType(2)">
					<lang-string :class="{active: feed_type === 2}" :title="'opinions'" />
				</li>
				<li class="switcher switcher-1 pointer ml-18" @click="setFeedType(1)">
					<lang-string :class="{active: feed_type === 1}" :title="'publications'" />
				</li>
				<li class="switcher switcher-3 pointer ml-18 display__hidden" @click="setFeedType(3)">
					<lang-string :class="{active: feed_type === 3}" :title="'bookmarked'" />
				</li>
				<li class="switcher switcher-4 pointer ml-18 display__hidden" @click="setFeedType(4)">
					<lang-string :class="{active: feed_type === 4}" :title="'all'" />
				</li>
			</ul>

		</div>

		<user-feed class="mt-14" :feed_type="feed_type"></user-feed>

	</div>
</template>

<script>
	import langString from "../../langString";
	import UserFeed from "../Feed";

	export default {
        name: "PageFeed",
		components: {
			langString,
			UserFeed
		},
		data() {
			return {
				feed_type: 2
			}
		},
		computed: {
			name() {
				return this.data;
			}
		},
		methods: {
			setFeedType(number) {
				this.feed_type = number;
			}
		},
    }
</script>

<style lang="scss">

	.user-page-feed {

		* {
			font-family: Roboto;
			font-style: normal;
		}

		.feed-switchers {

			.title {
				font-weight: 500;
				font-size: 14px;
				color: #1A1E22;
			}

			.switcher-list {

				.switcher {

					span {
						font-weight: normal;
						font-size: 13px;
						color: #1A1E22;

						padding-bottom: 3px;
						border-bottom: 2px solid transparent;

						user-select: none;

						&.active {
							color: #4B97B4;
							border-bottom: 2px solid #4B97B4;
						}
					}

				}

			}

		}

	}

</style>