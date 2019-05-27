<template>
	<div class="admin-wrapper relative height-100">
		<el-container style="height: 100%; border: 1px solid #eee">
			<el-aside width="250px" style="background-color: rgb(238, 241, 246)">
				<el-menu>
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-message"></i>API
						</template>
						<router-link to="/admin/add_translations">
							<el-menu-item index="1-1">Добавить переводы</el-menu-item>
						</router-link>
						<router-link to="/admin/catalog">
							<el-menu-item index="1-2">Каталог</el-menu-item>
						</router-link>
					</el-submenu>
					<el-submenu index="2">
						<template slot="title">
							<i class="el-icon-setting"></i>Прогнозы
						</template>
						<router-link to="/admin/polls/opened">
							<el-menu-item index="2-1">Открытые</el-menu-item>
						</router-link>
						<router-link to="/admin/polls/closed">
							<el-menu-item index="2-2">Закрытые</el-menu-item>
						</router-link>
					</el-submenu>
				</el-menu>
			</el-aside>

			<el-container>
				<el-header style="text-align: right; font-size: 12px">
					<el-dropdown>
						<i class="el-icon-setting" style="margin-right: 15px"></i>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item>View</el-dropdown-item>
							<el-dropdown-item>Add</el-dropdown-item>
							<el-dropdown-item @click="userLogout">Выйти</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
					<span>{{ mainUser.username }}</span>
				</el-header>

				<el-main>
					<router-view/>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import Catalog from "./Catalog.vue";
	import addTranslations from "./addTranslations.vue";
	import {mapState} from "vuex";

	export default {
		name: "Admin",
		data() {
			return {};
		},
		methods: {
			userLogout() {
				axios
					.get(`${process.env.VUE_APP_MAIN_API}/auth/logout`)
					.then(function (response) {
						this.$store.commit(
							"authentication/setAuthenticated",
							false
						);
						this.$store.commit("userPage/removeUser");
						this.$store.commit("pollFeed/clearFeed");
						this.$store.commit("globalStore/clearStores");
						this.$store.commit("notificationStore/clearStores");
						this.$store.commit("notificationPage/setDefaultPage");

						//TODO доделать логаут
					})

					.catch(error => {
						this.$store.commit(
							"authentication/setAuthenticated",
							false
						);
						this.$store.commit("userPage/removeUser");
						this.$store.commit("pollFeed/clearFeed");
						this.$store.commit("globalStore/clearStores");
						this.$store.commit("notificationStore/clearStores");
						this.$store.commit("notificationPage/setDefaultPage");
					});
				this.$router.push("/login");
			}
		},
		computed: {
			...mapState("globalStore", {
				mainUser: state => state.mainUser
			})
		},
		components: {
			Catalog,
			addTranslations
		},
		created() {
			this.$store.dispatch("userPage/getMainUser");
		}
	};
</script>

<style lang="scss" scoped>
	// .el-button--primary {
	// 	background: #4b97b4;
	// 	border-color: inherit;
	// }
	// .el-button {
	// 	padding: 10px 20px;
	// }

	.el-header {
		background-color: #b3c0d1;
		color: #333;
		line-height: 60px;
	}

	.el-main {
		margin: 0 !important;
		padding: 10px 0 !important;
	}

	.el-aside {
		color: #333;
		margin-right: 0 !important;
	}

	a {
		text-decoration: none;
	}
</style>
