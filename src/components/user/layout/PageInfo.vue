<template>
	<div class="user-page-info">

		<div class="tag-section flex-column">
			<span
				v-show="user.isLeader"
				class="tag px-8 py-2">
				<lang-string :title="'leader'"></lang-string>
			</span>
		</div>

		<div class="text-section">

			<span class="username-section flex flex-align-center">

				<span class="username">{{user.username}}</span>

				<badge-reusable
					v-show="user.isLeader"
					class="v-center ml-5"
					:size="13"
					color="#4B97B4"
					font-color="#ffffff"
					:fontSize="7">
					<span>✔</span>
				</badge-reusable>
			</span>

			<span class="location mt-9">{{user.location}}</span>

			<span class="status mt-9">{{user.status}}</span>

<!--			TODO: жду ссылку на персональную страницу юзера от Артура -->
<!--			<a-->
<!--				class="personal-page-link mt-6" -->
<!--				href="" -->
<!--				rel="noopener noreferrer" -->
<!--				target="_blank"></a>-->

			<div class="follows-section flex mt-9">

				<div class="subscribers flex-column flex-align-center">
					<span class="count">{{user.amount_of_followers}}</span>
					<lang-string class="caption" :title="'subscribers'"></lang-string>
				</div>

				<div class="subscriptions flex-column flex-align-center ml-29">
					<span class="count">{{user.amount_of_leaders}}</span>
					<lang-string class="caption" :title="'subscriptions'"></lang-string>
				</div>

			</div>

		</div>

	</div>
</template>

<script>
    import BadgeReusable from "../../reusableСomponents/BadgeReusable";
	import langString from "../../langString";



	export default {
        name: "PageInfo",
		components: {
        	BadgeReusable,
			langString
		},
		props: {
			user: {
				type: Object,
				required: true
			}
		},
    }
</script>

<style lang="scss">

	.user-page-info {
		display: flex;

		* {
			font-family: Roboto;
			font-style: normal;
		}

		.tag-section {
			flex: 0 0 60px;

			.tag {
				background: #4B97B4;
				border-radius: 0 15px 15px 0;
				width: fit-content;

				font-weight: normal;
				font-size: 10px;
				color: #FEFEFE;
			}

		}

		.text-section {
			flex: 1;
			display: flex;
			flex-direction: column;

			.username-section {

				.username {
					font-weight: 500;
					font-size: 14px;
					line-height: 16px;
					color: #1A1E22;
				}

			}

			.location {
				font-weight: normal;
				font-size: 10px;
				color: #ADAFB3;
			}

			.status {
				font-weight: normal;
				font-size: 13px;
				color: #1A1E22;
			}

			.personal-page-link {
				font-weight: normal;
				font-size: 13px;
				color: #4B97B4;
			}

			.follows-section {

				.subscribers,
				.subscriptions {

					.count {
						font-weight: bold;
						font-size: 14px;
						color: #1A1E22;
					}

					.caption {
						font-weight: normal;
						font-size: 11px;
						color: #ADAFB3;
						text-transform: lowercase;
					}

				}

			}

		}
	}

</style>