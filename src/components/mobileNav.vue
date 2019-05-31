<template>
	<div class="mobile-nav">
		<div class="section-wrapper" :class="{ swiped: secondNavCaption}">
			<ul class="nav-section nav-section-1">
				<li class="nav__item nav__item-1" v-if="mainUser.authorities === 'ADMIN'">
					<router-link to="/add">
						<icon-base fill="none" width="24" height="24" viewBox="0 0 24 24" icon-name="plus">
							<icon-add-poll/>
						</icon-base>
					</router-link>
				</li>
				<li class="nav__item nav__item-2">
					<div v-if="!hide_form">редактировать профиль</div>
					<div v-else-if="$route.name === 'user'">{{firstNavCaption}}</div>
					<router-link to="/pollFeed" v-else>
						<icon-base
							class="mr-6"
							fill="none"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							icon-name="logo"
						>
							<icon-logo/>
						</icon-base>
						<icon-base fill="none" width="66" height="15" viewBox="0 0 66 15" icon-name="text-logo">
							<icon-text-logo/>
						</icon-base>
					</router-link>
				</li>
				<li class="nav__item nav__item-3">
					<el-popover
                        v-if="mainUser.id !== undefined"
						class="popover"
						placement="top-start"
						title="Balance:"
						width="50"
						trigger="click"
						:content="mainUser.balance"
					>

						<icon-base slot="reference" width="23" height="23" viewBox="0 0 23 23" icon-name="pocket">
							<icon-pocket/>
						</icon-base>
					</el-popover>
				</li>
			</ul>
			<ul class="nav-section nav-section-2">
				<li class="nav__item nav__item-1" @click="$router.go(-1)">
					<icon-base

						fill="none"
						width="8"
						height="18"
						viewBox="0 0 8 18"
						icon-name="plus"><icon-arrow-left/>
					</icon-base>
				</li>
				<li class="nav__item nav__item-2">{{secondNavCaption}}</li>
			</ul>
		</div>
		<hr>
		<ul class="nav-section nav-section-3">
			<li class="nav__item" @click="resetFilter('pollFeed')">
				<icon-base
					class="main-icon"
					:class="{primary : $route.path==='/pollFeed'} "
					width="27"
					height="27"
					viewBox="0 0 18 22"
					icon-name="main"
				>
					<icon-main/>
				</icon-base>
			</li>
			<li class="nav__item" @click="resetFilter('voteFeed')">
				<icon-base
					:class="{primary : $route.path==='/voteFeed'} "
					class="main-icon"
					width="27"
					height="27"
					viewBox="0 0 18 22"
					icon-name="opinion"
				>
					<icon-opinion/>
				</icon-base>
			</li>
			<li class="nav__item" @click="link('search')">
				<icon-base
					:class="{search : $route.path==='/search'} "
					width="21"
					height="21"
					viewBox="0 0 21 21"
					icon-name="search"
				>
					<icon-search/>
				</icon-base>
			</li>
			<li class="nav__item" @click="link('notifications')">
				<el-badge :value="counter" :hidden="hidden_badge">
					<icon-base
						:class="{secondary_path_only : $route.name==='notifications'} "
						width="17"
						height="22"
						viewBox="0 0 17 23"
						icon-name="bell"
					>
						<icon-bell/>
					</icon-base>
				</el-badge>
			</li>
			<li class="nav__item">
				<avatar class="avatar-25x25"></avatar>
			</li>
			<li class="nav__item" @click="link('menu')">
				<icon-base width="25" height="22" viewBox="0 0 25 22" icon-name="menu">
					<icon-menu/>
				</icon-base>
			</li>
		</ul>
	</div>
</template>

<script>
	import IconBase from "./icons/IconBase";
	import IconMain from "./icons/IconMain";
	import IconOpinion from "./icons/IconOpinion";
	import IconLogo from "./icons/IconLogo";
	import IconTextLogo from "./icons/IconTextLogo";
	import IconSearch from "./icons/IconSearch";
	import IconBell from "./icons/IconBell";
	import IconMenu from "./icons/IconMenu";
	import IconPocket from "./icons/IconPocket";
	import IconAddPoll from "./icons/IconAddPoll";
	import IconArrowLeft from "./icons/IconArrowLeft";
	import avatar from "./user/Event/modules/mainUserAvatar";
	import notificationFeed from "./notifications/feed";
	import { mapState } from "vuex";
	export default {
		name: "mobileNav",
		props: ["mobile_hide", "user"],
		data() {
			return {
				hidden: false
			};
		},
		computed: {
			...mapState("notificationPage", {
				counter: s => s.counter
			}),

			...mapState("globalStore", {
				userMap: ({ users }) => users,
				categories: ({ categories }) => categories,
				polls: ({ polls }) => polls,
				mainUser: ({ mainUser }) => mainUser
			}),

			...mapState("userPage", {
				hide_form: s => s.hide_form
			}),

			hidden_badge: function() {
				if (this.counter == 0) {
					return (this.hidden = true);
				}
			},

			routeId: function(){

				return this.$route.params.id;

			},
            routeName: function(){

			    return this.$route.name

            },
			category: function() {
				return this.categories[this.routeId].name;
			},
            firstNavCaption() {
                return this.userMap[this.routeId].username;
            },
            userBalance: function() {

			    return this.mainUser.balance;

            },


            secondNavCaption() {
                switch (this.routeName) {
                    case "followers":
                        return "подписчики";

                    case "followings":
                        return "подписки";

                    case "add":
                        return "добавить опрос";

                    case "bookmarkFeed":
                        return "сохраненное";

                    case "catalogList":
                        return "каталог";

                    case "singlePoll":
                        return this.pollName;

					case "catalogFeed":
                        return this.category;


                    default:
                        return null;
                }
            },

			pollName: function() {
				if (this.polls[this.routeId] !== undefined) {
					let {subject: pollName} = this.polls[this.routeId];
					// Если название опроса больше 28 символов, тогда обрезаем его.
					return pollName.length > 28 ? pollName.slice(0, 28).trim() + "..." : pollName
				}
				return "";
			}
		},
		methods: {
			resetFilter(name) {
				this.$router.push({ path: `/${name}` });
				this.$store.commit(`${name}/clearFilter`);
				this.$store.dispatch(`${name}/list`);
			},

			link(pathName) {
				this.$router.push({ name: pathName });
			},



		},
        mounted(){

            this.secondNavCaption()
        },
		components: {
			IconBase,
			IconMain,
			IconOpinion,
			IconSearch,
			IconBell,
			IconLogo,
			IconTextLogo,
			IconPocket,
			IconAddPoll,
			IconArrowLeft,
			avatar,
			IconMenu,
			notificationFeed
		}
	};
</script>

<style lang="scss">
	.mobile-nav {
		.section-wrapper {
			position: relative;
			display: flex;
			width: 100%;
			transition: 0.3s;

			&.swiped {
				transform: translateX(-100%);
			}
		}

		.nav-section {
			box-sizing: border-box;
			flex: 0 0 100%;
			padding: 0;
			margin: 0;
			list-style: none;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 12px 22px 10px;

			.nav__item {
				font-family: Roboto;
				font-style: normal;
				font-weight: 500;
				font-size: 18px;
				line-height: 18px;
				font-variant: small-caps;
				color: #152d3a;
			}

			g {
				fill: #ffffff;
			}
		}

		hr {
			margin: 0;
			padding: 0;
			border: none;
			border-bottom: 1px solid #c4ccd0;
		}

		.nav-section-1 {
			padding: 10px 11px 11px;
			justify-content: flex-start;

			.nav__item-1 {
				margin-right: 22px;
				width: 24px;
			}

			.nav__item-3 {
				margin-left: auto;
			}
		}

		.nav-section-2 {
			padding: 13px 12px;
			display: flex;
			justify-content: flex-start;

			.nav__item-1 {
				margin-right: 11px;
			}
		}

		.secondary_path_only {
			path {
				fill: #4b97b4;
			}
		}

		.main-icon {
			.question {
				fill: #000000;
				stroke: none;
			}
			rect {
				stroke: #000000;
			}

			path {
				// stroke: #000000;
			}
		}

		.search {
			path {
				fill: #4b97b4;
			}
		}
		.primary {
			.question {
				fill: #4b97b4;
				stroke: none;
			}
			rect {
				stroke: #4b97b4;
			}

			path {
				stroke: #4b97b4;
			}
		}
		.el-badge {
			margin: 0px !important;

			.el-badge__content {
				background-color: #ff5454;
				border-radius: 30px;
				color: #fff;
				display: inline-block;
				font-size: 8px;
				height: 12px;
				line-height: 12px;
				padding: 0px 4px;
				text-align: center;
				white-space: nowrap;
				border: 1px solid #fff;
			}

			.el-badge__content {
				position: absolute;
				top: 3px !important;
				right: 7px;
			}
		}
	}
</style>
