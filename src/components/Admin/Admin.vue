<template>
	<div class="admin-page">
		
		<ul class="menu p-12 flex-column">
			<li @click="$router.push({ name: 'addTranslations' })" class="title px-10">Добавить переводы</li>
			<li @click="$router.push({ name: 'catalog' })" class="title mt-5 px-10">Добавить каталог</li>
			<li class="flex-column mt-5 p-0">
				<div
						class="title flex py-10 px-10"
						@click="predictions = !predictions">
					<span>Прогнозы</span><span class="ml-auto">⇳</span>
				</div>
				<ul v-show="predictions" class="ml-30">
					<li class="title mt-5 px-10">Все</li>
					<li class="title mt-5 px-10">Открытые</li>
					<li class="title mt-5 px-10">Закрытые</li>
					<li class="title mt-5 px-10" v-for="{name, id} in categories"><lang-string :title="name" /></li>
				</ul>
			</li>
		</ul>
		
		<router-view/>
	
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
		
		display: flex;
		
		.menu {
			background: #fff;
			border-radius: 0 6px 6px 6px;
			flex: 0 0 230px;
			
			li {
				padding: 10px 0;
				border-bottom: 0.5px solid #CECFD3;
				cursor: pointer;
				user-select: none;
				
				/*&:last-of-type {*/
				/*	border-bottom: 0;*/
				/*}*/
				
				
			}
			
			.title {
				border-radius: 6px;
				transition: 150ms;
				&:hover {
					color: #fff;
					background: #57b4d8;
				}
			}
		}
	}
</style>
