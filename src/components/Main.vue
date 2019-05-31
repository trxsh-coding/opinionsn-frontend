<template lang="html">
	<div id="app">
		<el-header id="mobile-header" class="mobile-nav hidden-sm-and-up"   :class="{ 'navbar--hidden': !showNavbar }">
			<mobile-nav :user="main_user"/>
		</el-header>
		<el-header class="nav-header hidden-xs-only" style=" height:48px ">
			<el-container class="nav">
				<el-row>
					<nav class="navbar" >
							<el-col :span="11">
								<div class="grid-content" >
									<div class="navbar-brand" >
										<a class="navbar-item pointer" @click="goMain">
											<div class="icon logo picture-25x25 mr-6" :style="{ 'background-image': 'url(' + require('./assets/icons/icon-logo.png') + ')' } " />
											<icon-base
												fill="none"
												class="icon"
												width="66"
												height="15"
												viewBox="0 0 66 15"
												icon-name="text-logo"><icon-text-logo />
											</icon-base>
										</a>
											<el-autocomplete
															popper-class="my-autocomplete"
															v-model="keywords"
															:fetch-suggestions="querySearchAsync"
															:placeholder="lstr('search')"
															:trigger-on-focus="false"
															autocomplete="off"
															:debounce="500"
															@select="handleSelect">
													<template slot-scope="{ item }">
															<div class="value">{{ item.username}}</div>
													</template>
											</el-autocomplete>
									</div>

							</div>

							</el-col>
							<el-col :span="14">
								<nav-bar-menu :user="main_user"></nav-bar-menu>
							</el-col>
							<div class="btn-block" v-if="!main_user_id">
									<router-link :to="getPathWithPoll('sign')">
											<el-button class="login-btn">
													<lang-string :title="'login'"/>
											</el-button>
									</router-link>
							</div>
						</nav>
					</el-row>
			</el-container>
		</el-header>
		<el-container class="main-container">
			<el-main>
				<el-row>
						<el-aside width="240px" v-if="!mobile ">
								<left-bar-side :id="main_user_id"></left-bar-side>
						</el-aside>
					<el-col class="quiz-section" :span="16" >
						<router-view></router-view>
						<div class="auth-block" v-if="!main_user_id && !hide">
								<div class="logo-block">
										<icon-base
														fill="none"
														class="icon logo"
														width="30"
														height="30"
														viewBox="0 0 30 30"
														icon-name="logo"><icon-logo />
										</icon-base>
										<icon-base
														fill="none"
														class="text-logo"
														width="66"
														height="15"
														viewBox="0 0 66 15"
														icon-name="text-logo"><icon-text-logo />
										</icon-base>
								</div>
								<div class="buttons-block">
										<span class="icon-exit" @click="hide = !hide">
										<icon-base
														fill="none"
														class="icon-close"
														width="17"
														height="17"
														viewBox="0 0 17 17"
														icon-name="close"><icon-close/>
										</icon-base>
										</span>
										<router-link :to="getPathWithPoll('sign')">
												<el-button class="login-btn">
														<lang-string :title="'login'"/>
												</el-button>
										</router-link>

										<router-link :to="getPathWithPoll('registration')">
												<lang-string class="registration-span" :title="'registration'"/>
										</router-link>
								</div>
						</div>
					</el-col>
						<!--<el-col class="quiz-section hidden-sm-and-down" :span="16">-->
								<!--<router-view></router-view>-->
						<!--</el-col>-->

				</el-row>
			</el-main>
		</el-container>


			<notification-side-feed v-if="!mobile"/>

			<!-- <div class="notification-container flex-column">
				<notification-block :notification="notification"  v-for="notification in notifications" />
			</div> -->

			<footer v-if="!main_user_id && !hide">

			</footer>
	</div>
</template>

<script>
import NavBarMenu from "./NavBarMenu.vue";
import LeftBarSide from "./LeftBarSide.vue";
import IconBase from "./icons/IconBase.vue";
import IconLogo from "./icons/IconLogo.vue";
import IconClose from "./icons/IconClose.vue";
import IconPrice from "./icons/IconPrice.vue";
import IconTextLogo from "./icons/IconTextLogo.vue";
import IconDropdown from "./icons/IconDropdown.vue";
import { mapState } from "vuex";
import langString from "./langString.vue";
import { localString } from "../utils/localString.js";
import axios from "axios";
import mobileNav from "./mobileNav";
import Search from "./Search/search";
import notificationSideFeed from "./notifications/notificationSideFeed";
import { log } from "util";
export default {
  data() {
    return {
      links: [],
      keywords: "",
      timeout: null,
      mobile_hide: false,
      mobile: this.$root.mobile,
      hide: false,
      showNavbar: true,
      lastScrollPosition: 0
    };
  },
  watch: {
    keywords(after, before) {
      this.fetch();
    }
  },
  computed: {
    lstr() {
      return str => localString(this.lang, str);
    },
    // ...mapState('user',{
    //   user : state => state.User[0]
    // }),

    ...mapState("globalStore", {
      mainUser: ({ mainUser }) => mainUser
    }),

    ...mapState("lang", {
      lang: state => state.locale
    }),
    ...mapState("userPage", {
      state: s => s,
      items: s => s.items,
      main_user_id: s => s.main_user_id
    }),

    ...mapState("authentication", {
      isAuthenticated: s => s.isAuthenticated
    }),

      ...mapState("notificationPage", {
          page: s => s.page
      }),

    ...mapState("globalStore", {
      userMap: ({ users }) => users
    }),
    //Main user getter

    main_user: function() {
      let { state, userMap } = this;

      return userMap[state.main_user_id];
    }
  },
  methods: {
    // notification(response) {
    //   this.$notify({
    //     title: "Уведомление",
    //     message: response[0].message,
    //     position: "bottom-right",
    //     duration: 0
    //   });
    // },
  getPathWithPoll(name){

      let [,pageName,pollId] = this.$route.path.split('/');

      if (pageName === 'singlePoll'){
          return {name, query: {redirectToPoll: pollId}}
      } else {
          return {name}
      }

  },


    getNotifications() {
      this.$store.dispatch("notificationPage/list", {customUrl : `${process.env.VUE_APP_NOTIFICATION_API}/notification/${this.page}`});
    },
    onScroll() {
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollPosition < 0) {
        return;
      }
      // Stop executing this function if the difference between
      // current scroll position and last scroll position is less than some offset
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
        return;
      }
      this.showNavbar = currentScrollPosition < this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
    },
    onHide(value) {
      return (this.mobile_hide = value);
      console.log(this.mobile_hide);
    },

    goMain() {
      this.$router.push({ path: "/pollFeed" });
    },
    fetch() {
      axios
        .get(`${process.env.VUE_APP_MAIN_API}/rest/findAllContaining/${this.keywords}`)
        .then(
          function(response) {
            if (response.status === 200) {
              this.links = Object.values(response.data.users);
              console.log(this.links);
            }
          }.bind(this)
        )
        .catch(error => {});
    },

    querySearchAsync(queryString, cb) {
      console.log(this.links);
      var links = this.links;
      var results = queryString
        ? links.filter(this.createFilter(queryString))
        : links;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 500);
    },
    createFilter(queryString) {
      return link => {
        return (
          link.username.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(userId) {
      this.$router.push({ name: "user", params: { id: userId.id } });
    }
  },

		created() {
			this.$store.dispatch("userPage/getMainUser");
			this.$store.dispatch("lang/getLocaleString");

		},
		mounted() {
			this.getNotifications();
			window.addEventListener("scroll", this.onScroll);

		},

  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },



  beforeCreate() {},
  components: {
    Search,
    NavBarMenu,
    LeftBarSide,
    IconBase,
    IconPrice,
    IconLogo,
    IconTextLogo,
    langString,
    IconDropdown,
    mobileNav,
    IconClose,
    notificationSideFeed
  }
};
</script>

<style lang="scss">
body {
	margin: 0;
}
#app {
	background: #f4f4f4;


	.navbar--hidden {
		box-shadow: none;
		transform: translate3d(0, -100%, 0);
		.el-main {
			margin-top: 45px !important;
		}
	}
	.login-btn {
		background: #4b97b4 !important;
		box-shadow: 0px 0px 7px rgba(21, 45, 58, 0.24);
		border-radius: 50px;
		border-color: #4b97b4;
		min-width: 127px;
		padding: 6px 0;
		margin-bottom: 10px;

		span {
			font-family: Roboto;
			font-style: normal;
			font-weight: 500;
			font-size: 13px;
			text-transform: capitalize;
			color: #ffffff;
		}
	}
	footer {
		width: 100%;
		height: 92px;
		background: rgba(21, 45, 58, 0.9);
		box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.06);
		position: fixed;
		bottom: 0;
		z-index: 20;
	}
	.auth-block {
		display: flex;
		align-items: center;
		width: 500px;
		position: fixed;
		bottom: 0;
		z-index: 50;
		height: 92px;
		justify-content: space-between;
		.buttons-block {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			position: relative;
			a {
				text-decoration: none;
			}
			.icon-exit {
				position: absolute;
				right: -36px;
				top: -14px;
			}
			a {
				text-align: center;
			}

			a:active {
				text-decoration: none;
			}
			.registration-span {
				font-family: Roboto;
				font-style: normal;
				font-weight: 500;
				font-size: 13px;
				line-height: 17px;
				text-align: center;
				text-transform: capitalize;

				color: #d6dadd;
			}
		}
		.logo-block {
			display: flex;
			align-items: center;
			.text-logo {
				path {
					fill: #ffffff;
				}
			}
		}
	}
	.icon {
		fill: none !important;
	}
	.el-col-3 {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.nav-header {
		background-color: #ffffff;
		line-height: 48px;
		margin-bottom: 12px;
		height: 54px !important;
		z-index: 100;
		position: fixed;
		width: 100%;
		margin: 0 auto;
		box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.06);
		.el-container {
			height: 100%;
			display: inherit;
		}
		.navbar {
			display: flex;
			height: 54px;
			align-items: center;
			justify-content: space-between;
		}
		.navbar-brand {
			display: flex;
			align-items: center;
			align-content: center;
			g {
				fill: none;
			}
			.navbar-item {
				text-decoration: none;
				display: flex;
				align-items: center;
				align-content: center;
				flex-direction: row;
				img {
					width: 41.67px;
					height: 30px;
				}
				span {
					font-family: ABeeZee;
					font-style: normal;
					font-weight: normal;
					line-height: 18px;
					font-size: 18px;
					letter-spacing: -0.3px;
					color: #4b97b4;
					margin-left: 6.33px;
				}
			}
		}

		.el-input {
			margin-left: 14px;
			.el-input__inner {
				height: 30px;
				width: 210px;
				border-radius: 1px;
				border: 0.5px solid rgba(56, 56, 56, 0.3);
				border-radius: 20px;
			}
			img {
				position: absolute;
			}
		}
	}
	.el-container {
	}
	.main-container {
		display: flex;
		justify-content: center;
	}
	.nav {
		width: 757px;
		height: 100%;
		margin: 0 auto;
	}

	.el-row::-webkit-scrollbar {
		width: 0;
	}
	.el-aside {
		overflow-x: hidden !important;
		overflow-y: hidden !important;
		margin-right: 12px;
	}

	.el-main {
		background: #f4f4f4;
		display: flex;
		justify-content: center;
		padding: 0;
		.el-row {
			display: flex;
			width: 756px;
			justify-content: center;
		}
	}
	.el-main:first-of-type {
		margin-top: 65px;
	}

	@media only screen and (min-device-width: 320px) and (max-device-width: 765px) {
		.el-header {
			position: fixed;
			z-index: 100000;
			width: 100%;
			height: auto !important;
			padding: 0;
			margin: 0;
			background: #ffffff;
			transition: 0.1s all ease-out;
			box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.06);
		}

		.auth-block {
			width: 88%;
		}

		.el-main {
			margin-top: 109px !important;

			.el-row {
				flex-direction: column;
				width: 100%;
				padding: 0 8px;
			}
		}

		.quiz-section {
			width: 100%;
		}

		.el-aside {
			width: 359px !important;
			margin-right: 0px !important;
		}
	}
}

</style>
