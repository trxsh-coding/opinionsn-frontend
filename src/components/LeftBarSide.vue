<template lang="html">
    <div id="left-aside">
    	<profile-card class="hidden-xs-only" />
    	<side-bar class="mb-10"/>
		<router-link class-active="active" class="hidden-xs-only feedback-link pointer" tag="div" to="/feedback">
			<icon-base
				class="megaphone mr-8"
				width="20"
				height="18"
				viewBox="0 0 30 28"
				icon-name="megaphone">
				<icon-megaphone/>
			</icon-base>
			<a>
				<lang-string :title="'feedback'"/>
			</a>
		</router-link>
		<user-statistic  v-if="user" :id="main_user.id" :limit="1" class="hidden-xs-only"/>
    	<language-change  class="hidden-xs-only mt-10" />
        <div class="copyright flex-space-center mt-13 hidden-xs-only">
            <span>© 2019 OPINION</span>
			<router-link class="feedback-link display__hidden pointer" tag="span" to="/feedback"><lang-string :title="'feedback'"/></router-link>
        </div>
      	<!--<guest-locale  class="hidden-xs-only" />-->
    </div>
</template>

<script>
	import { mapState } from "vuex";
	import ProfileCard from "./LeftSideProfile.vue";
	import SideBar from "./SideBar.vue";
	import Statistic from "./Statistic.vue";
	import languageChange from "./languageChange.vue";
	import guestLocale from "./guestLocale.vue";
	import langString from "./langString.vue";
	import userStatistic from "./user/Event/modules/userStatistic";
	import IconMegaphone from './icons/IconMegaphone';
	import IconBase from './icons/IconBase.vue';


	export default {
		props: ["id"],
		data() {
			return {};
		},
		computed: {
			...mapState("globalStore", {
				userMap: ({ users }) => users
			}),

			...mapState("userPage", {
				state: s => s,
				main_user_id: s => s.main_user_id
			}),

			loop: function() {
				return "v-for='(item, key) in items.slice(0,2)'";
			},

			main_user: function() {
				let { state, userMap } = this;

				return userMap[state.main_user_id];
			}
		},
		components: {
			SideBar,
			ProfileCard,
			Statistic,
			languageChange,
			langString,
			userStatistic,
			guestLocale,
			IconMegaphone,
			IconBase
		}
	};
</script>

<style lang="scss">
	#left-aside {
		width: 240px !important;
		position: fixed;

		.feedback-link {
			padding: 9.5px 11px;
			border-radius: 12px;
			background-color: #fff;

			font-family: Roboto;
			font-style: normal;
			font-weight: normal;
			font-size: 14px;
			color: #152D3A;
		}

		.user-statistic {
			justify-content: center;
			.circle-chart {
				padding: 12px 30px;
			}
		}

		.el-aside {
			overflow-x: hidden;
		}
		.circle {
			display: inline-block;
		}

		.copyright {
			padding: 0 10px;
			span {
				font-family: Roboto;
				font-style: normal;
				font-weight: normal;
				font-size: 11px;
				letter-spacing: -0.3px;
				color: rgba(56, 56, 56, 0.7);
			}

			@media only screen and (max-width: 700px) {
				.feedback-link {
					display: block !important;
				}
			}
		}
	}
</style>
