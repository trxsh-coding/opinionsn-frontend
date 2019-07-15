<template>
	<div class="desktop-header mb-17">
		<div class="nav-container container flex-align-center">
			<div class="search-block flex-align-center">
				<icon-base
						class="mr-5"
						fill="none"
						width="23"
						height="24"
						viewBox="0 0 23 24"
						icon-name="text">
					<icon-logo/>
				</icon-base>
				<icon-base
						class="mr-27"
						fill="none"
						width="63"
						height="15"
						viewBox="0 0 63 15"
						icon-name="text">
					<icon-text-logo/>
				</icon-base>
				<input type="text" placeholder="Поиск" v-model="keyword" @change="routeOnChange">
			</div>
			<div class="profile-annotation-block flex-align-center">

				<dropdown-list-reusable
						@scrollDifference="setListScrollDifference"
						list-class="notification-list p-0 pr-7"
						height="583"
						width="376">
					<icon-base
							fill="none"
							class="mr-22"
							width="22"
							height="22"
							viewBox="0 0 22 22"
							icon-name="notifications">
						<icon-notifications/>
					</icon-base>
					<template #items>
						<notification-page
								:scrollDifference="listScrollDifference"/>
					</template>
				</dropdown-list-reusable>
				<icon-base
						fill="none"
						class="mr-25"
						width="21"
						height="21"
						viewBox="0 0 21 21"
						icon-name="pocket">
					<icon-pocket/>
				</icon-base>
				<picture-reusable
						class="pointer"
						@click.native="userLink(user.id)"
						:img="publicPath + user.path_to_avatar"
						:size="27"
						rounded/>
				<dropdown-list-reusable>
					<template #icon>
						<icon-base
								fill="none"
								class="mr-25"
								width="7"
								height="4"
								viewBox="0 0 7 4"
								icon-name="pocket">
							<icon-dropdown/>
						</icon-base>
					</template>
				</dropdown-list-reusable>
			</div>
		</div>
	</div>
</template>

<script>
	import IconBase from "../../icons/IconBase";
	import IconTextLogo from "../../icons/IconTextLogo";
	import IconLogo from "../../icons/IconLogo";
	import IconNotifications from "../../icons/header/IconNotifications";
	import IconPocket from "../../icons/header/IconPocket";
	import IconDropdown from "../../icons/header/IconDropdown";
	import PictureReusable from "../../reusableСomponents/PictureReusable";
	import DropdownListReusable from "../../reusableСomponents/DropdownListReusable";
	import NotificationPage from "../../notifications/notificationPage";

	export default {
		name: "desktopHeader",
		props: ['user'],
		data() {
			return {
				publicPath: process.env.VUE_APP_MAIN_API,
				listScrollDifference: null,
				keyword: ''
			}
		},
		methods: {

			routeOnChange(){

				this.$router.push({name:'search', query: {keyword: this.keyword} })

			},

			setListScrollDifference(difference) {
				this.listScrollDifference = difference;
			},

			routerPush(linkName) {

				this.$router.push({name: `${linkName}`})

			},
			userLink(userId) {

				this.$router.push({name: 'user', params: {id: userId}})

			},
		},
		components: {
			NotificationPage,
			DropdownListReusable,
			PictureReusable,
			IconBase,
			IconTextLogo,
			IconLogo,
			IconNotifications,
			IconPocket,
			IconDropdown
		}
	}
</script>

<style lang="scss">
	.desktop-header {
		background: #FFFFFF;
		width: 100%;
		height: 60px;
		border-bottom: 1px solid #BCBEC3;

		.nav-container {
			height: 60px;
			display: flex;
			justify-content: space-between;
		}

		.search-block {
			input {
				padding-left: 15px;
				border: 0.5px solid #CECFD3;
				box-sizing: border-box;
				border-radius: 6px;
				height: 27px;

				&::placeholder {
					font-family: Roboto;
					font-style: normal;
					font-weight: normal;
					font-size: 12px;
					line-height: 14px;
					display: flex;
					align-items: center;
					color: #76787A;
					opacity: 0.6;

				}

				&:focus, active {
					outline: none;
				}
			}
		}

		.profile-annotation-block {
			.notification-list {
				overflow-y: scroll;
				scrollbar-width: thin;
			}
		}
	}
</style>
