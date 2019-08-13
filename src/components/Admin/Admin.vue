<!--<template>-->
<!--	<div class="admin-wrapper relative height-100">-->
<!--		<el-container style="height: 100%; border: 1px solid #eee">-->
<!--			<el-aside width="250px" style="background-color: rgb(238, 241, 246)">-->
<!--				<el-menu>-->
<!--					<el-submenu index="1">-->
<!--						<template slot="title">-->
<!--							<i class="el-icon-message"></i>API-->
<!--						</template>-->
<!--						<router-link to="/admin/add_translations">-->
<!--							<el-menu-item index="1-1">Добавить переводы</el-menu-item>-->
<!--						</router-link>-->
<!--						<router-link to="/admin/catalog">-->
<!--							<el-menu-item index="1-2">Каталог</el-menu-item>-->
<!--						</router-link>-->
<!--					</el-submenu>-->
<!--					<el-submenu index="2">-->
<!--						<template slot="title">-->
<!--							<i class="el-icon-setting"></i>Прогнозы-->
<!--						</template>-->
<!--						<router-link to="/admin/polls/opened">-->
<!--							<el-menu-item index="2-1">Открытые</el-menu-item>-->
<!--						</router-link>-->
<!--						<router-link to="/admin/polls/closed">-->
<!--							<el-menu-item index="2-2">Закрытые</el-menu-item>-->
<!--						</router-link>-->
<!--						<router-link to="/admin/polls/all">-->
<!--							<el-menu-item index="2-3">Все</el-menu-item>-->
<!--						</router-link>-->
<!--					</el-submenu>-->
<!--				</el-menu>-->
<!--			</el-aside>-->

<!--			<el-container>-->
<!--				<el-header style="text-align: right; font-size: 12px">-->
<!--					<el-dropdown>-->
<!--						<i class="el-icon-setting" style="margin-right: 15px"></i>-->
<!--						<el-dropdown-menu slot="dropdown">-->
<!--							<el-dropdown-item>View</el-dropdown-item>-->
<!--							<el-dropdown-item>Add</el-dropdown-item>-->
<!--							<el-dropdown-item @click="userLogout">Выйти</el-dropdown-item>-->
<!--						</el-dropdown-menu>-->
<!--					</el-dropdown>-->
<!--					<span>{{ mainUser.username }}</span>-->
<!--				</el-header>-->

<!--				<el-main>-->
<!--					<router-view/>-->
<!--				</el-main>-->
<!--			</el-container>-->
<!--		</el-container>-->
<!--	</div>-->
<!--</template>-->

<template>
	<div class="admin-page">
		
		<ul class="menu p-12 flex-column">
			<li>Добавить переводы</li>
			<li>Добавить каталог</li>
			<li class="flex-column p-0">
				<span class="py-10" @click="predictions = !predictions">Прогнозы</span>
				<ul v-show="predictions" class="ml-20">
					<li>Все</li>
					<li>Открытые</li>
					<li>Закрытые</li>
					<li v-for="{name, id} in categories"><lang-string :title="name" /></li>
				</ul>
			</li>
		</ul>
	
	</div>
</template>

<script>
	import Catalog from "./Catalog.vue";
	import addTranslations from "./addTranslations.vue";
	import langString from "../langString";
	
	import {mapState} from "vuex";

	export default {
		name: "Admin",
		
		data() {
			return {
				predictions: false
			};
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
				mainUser: s => s.mainUser,
				categories: s => s.categories
			})
			
		},
		
		components: {
			Catalog,
			addTranslations,
			langString
		},
		
		created() {
			this.$store.dispatch("userPage/getMainUser");
			this.$store.dispatch("catalogList/list");
			this.$store.dispatch("lang/getLocaleString");
		}
	};
</script>

<style lang="scss">
	.admin-page {
		height: 100%;
		background: #d1d1d1;
		
		.menu {
			background: #fff;
			border-radius: 0 6px 6px 6px;
			width: 230px;
			
			li {
				padding: 10px 0;
				border-bottom: 0.5px solid #CECFD3;
				cursor: pointer;
				user-select: none;
				
				/*&:last-of-type {*/
				/*	border-bottom: 0;*/
				/*}*/
			}
		}
	}
</style>
