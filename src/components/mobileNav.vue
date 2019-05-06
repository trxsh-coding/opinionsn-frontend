<template>
	<div class="mobile-nav">
		<ul class="nav-section nav-section-1">
			<li class="nav__item nav__item-1">
				<router-link to="/add">
					<icon-base 
						fill="none" 
						width="24" 
						height="24" 
						viewBox="0 0 24 24" 
						icon-name="plus"><icon-add-poll/>
					</icon-base>
				</router-link>
			</li>
			<li class="nav__item nav__item-2">
				<router-link to="/pollFeed">
					<icon-base 
						class="mr-6" 
						fill="none" 
						width="24" 
						height="24" 
						viewBox="0 0 24 24" 
						icon-name="logo"><icon-logo/>
					</icon-base>
					<icon-base 
						fill="none" 
						width="66" 
						height="15" 
						viewBox="0 0 66 15" 
						icon-name="text-logo"><icon-text-logo/>
					</icon-base>
				</router-link>
			</li>
			<li class="nav__item nav__item-3">
				<el-popover
					class="popover"
					placement="top-start"
					title="Balance:"
					width="50"
					trigger="click"
					:content="user.balance">
					<icon-base 
						slot="reference"
						width="23" 
						height="23" 
						viewBox="0 0 23 23" 
						icon-name="pocket"><icon-pocket/>
					</icon-base>
				</el-popover>
			</li>
		</ul>
		<hr>
		<ul class="nav-section nav-section-2">
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

			hidden_badge: function() {
				if (this.counter == 0) {
					return (this.hidden = true);
				}
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
			}
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
			avatar,
			IconMenu,
			notificationFeed
		}
	};
</script>

<style lang="scss">
	.mobile-nav {
		.nav-section {
			padding: 0;
			margin: 0;
			// display: inline-flex;
			list-style: none;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 12px 22px 10px;

			li {
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
			}

			.nav__item-3 {
				margin-left: auto;

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
