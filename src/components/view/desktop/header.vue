<template>
	<div class="desktop-header mb-17">
		<div class="nav-container container flex-align-center" :class="{'is_mobile_device': mobile}">
			<div class="search-block flex-align-center" >
				<router-link class="pointer" :to="{name: 'pollFeed'}">
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
							class="ml-6 mb-1"
							fill="none"
							width="63"
							height="15"
							viewBox="0 0 63 15"
							icon-name="text">
						<icon-text-logo/>
					</icon-base>
				</router-link>
				
				<input
						v-if="logged_in"
						class="ml-27"
						type="text"
						placeholder="Поиск"
						v-model="$root.search_keyword"
						@keypress.enter="routerPush('search')"
						@input="setSearchKeyword($event.target.value)">
			</div>
			<div class="profile-annotation-block flex-align-center" v-if="logged_in">

				<dropdown-list-reusable
						class="notifications-dropdown mr-22"
						@scrollDifference="setListScrollDifference"
						@visibile="visible => { if (visible) clearCounter() }"
						list-class="notification-list p-0"
						:icon="false"
						height="583"
						width="376">
					<div class="icon-wrapper">
						<icon-base
								fill="none"
								width="22"
								height="22"
								viewBox="0 0 22 22"
								icon-name="notifications">
							<icon-notifications/>
						</icon-base>
						
						<re-badge class="counter" v-show="counter" :size="12"
						          :params="{background: '#FF5454'}"/>
						
					</div>
					<template #items>
						<notification-page
								v-if="!mobile && $route.name !== 'notifications'"
								:scrollDifference="listScrollDifference"/>
					</template>
				</dropdown-list-reusable>

				<router-link class="pointer flex mr-5" :to="{name: 'user', params: { id: user.id }}">
					<RePicture :url="publicPath + user.path_to_avatar" size="27" rounded />
				</router-link>
				
				<dropdown-list-reusable
						click-close
						:icon="false"
						list-class="nav-menu p-0 py-10">
					<template>
						<icon-base
								fill="none"
								width="7"
								height="4"
								viewBox="0 0 7 4"
								icon-name="pocket">
							<icon-dropdown/>
						</icon-base>
					</template>

					<template #items>
						<div class="nav-menu-items flex-column">
							
							<router-link class="menu-item py-10 px-20 pointer" :to="{name: 'followings', params: {id: user.id}}">
								<lang-string title="followings" />
							</router-link>
							
							<router-link class="menu-item py-10 px-20 pointer" :to="{name: 'catalogList'}">
								<lang-string title="topics" />
							</router-link>
							
							<router-link class="menu-item py-10 px-20 pointer" v-if="mainUser.referCode" :to="{name: 'ReferralsPage'}">
								<lang-string title="referrals_page" />
							</router-link>
							
							<router-link class="menu-item py-10 px-20 pointer" v-if="is_admin" :to="{name: 'admin'}">
								<lang-string title="admin_panel" />
							</router-link>
							
							<lang-string class="menu-item py-10 px-20 pointer" @click.native="userLogout" title="exit" />
							
						</div>
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
	import DropdownListReusable from "../../reusableСomponents/DropdownListReusable";
	import NotificationPage from "../../notifications/notificationPage";
	import langString from "../../langString";
	import {mapState} from "vuex";
	import CookieMixin from "@/components/mixins/CookieMixin";
	import ReBadge from "@/components/reusableСomponents/ReBadge";
	import RePicture from "@/components/reusableСomponents/RePicture";

	export default {
		name: "desktopHeader",
		mixins: [CookieMixin],
		props: ['user'],
		data() {
			return {
				publicPath: process.env.VUE_APP_ASSETS,
				listScrollDifference: null
			}
		},
		
		computed: {
			
			...mapState("notificationPage", {
				counter: s => s.counter,
			}),
			
			...mapState("globalStore", {
				mainUser: s => s.mainUser,
				is_admin: s => s.mainUser.authorities === 'ADMIN'
			}),
			
			logged_in() {
				return !!Object.keys(this.user).length;
			},
			
			mobile() {
				return this.$root.mobile;
			}
		},
		
		methods: {
			
			clearCounter() {
				this.$store.dispatch('notificationPage/readInitialNotifications');
			},
			
			userLogout() {
				
				this.deleteCookie('Auth-Token');
				this.$store.commit("authentication/setAuthenticated", false);
				this.$store.commit("userPage/removeUser");
				this.$store.commit("pollFeed/clearFeed");
				this.$store.commit("globalStore/clearStores");
				this.$store.commit("notificationStore/clearStores");
				this.$store.commit("notificationPage/setDefaultPage");
				this.$router.push({name: 'sign', query: {logout: 'true'}});
				
			},

			setSearchKeyword(keyword){

				this.$root.search_keyword = keyword;

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
			RePicture,
			ReBadge,
			NotificationPage,
			DropdownListReusable,
			IconBase,
			IconTextLogo,
			IconLogo,
			IconNotifications,
			IconPocket,
			IconDropdown,
			langString
		}
	}
</script>

<style lang="scss">
	.desktop-header {
		z-index: 9999;
		margin-bottom: 78px;
		position: fixed;
		background: #FFFFFF;
		width: 100%;
		height: 60px;
		border-bottom: 1px solid #BCBEC3;

		.nav-menu {
			left: -30px;
			top: 40px;

			.nav-menu-items {
				.menu-item {
					white-space: nowrap;
					font-size: 14px;

					&:hover {
						background-color: #edf5f8;
					}
				}
			}
		}

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
				width: 239px;

				&::placeholder {
					font-family: Roboto;
					font-style: normal;
					font-weight: normal;
					font-size: 12px;
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
			
			.notifications-dropdown {
				.notification-list {
					overflow-y: scroll;
					scrollbar-width: thin;
					left: -130px;
				}
				
				.icon-wrapper {
					.counter {
						position: absolute;
						top: -3px;
						right: -4px;
					}
				}
			}
			
			
		}
	}
	@media only screen
	and (min-width: 300px)
	and (max-width: 765px){
		.desktop-header {
			margin-bottom: 0px !important;
		}
	}
</style>
