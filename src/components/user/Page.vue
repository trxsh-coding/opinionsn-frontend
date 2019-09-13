<template>
	<div id="mypage" class="user-page flex-column" :class="{'bg-white': !mobile}">
		
		<template v-if="!is_loading">
			<page-header v-bind="{user, mainUser: main_user}"/>
			
			<page-info class="mt-9" :user="user"/>
			
			<page-statistics class="mt-18"/>
			
			<page-feed class="mt-24"/>
		</template>
		
		<Loader v-show="is_loading" class="mx-auto" />
	
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	import PageHeader from "./layout/PageHeader";
	import PageInfo from "./layout/PageInfo";
	import PageStatistics from "./layout/PageStatistics";
	import PageFeed from "./layout/PageFeed";
	import Loader from "@/components/reusableСomponents/Loader";
	
	export default {
		name: "userPage",
		data() {
			return {
				is_loading: true
			}
		},
		computed: {
			...mapState('userPage', {
				userPage: s => s,
			}),
			
			...mapState('globalStore', {
				users: ({users}) => users
			}),
			
			mobile() {
				return this.$root.mobile;
			},

			user_id() {
				return this.$route.params.id
			},
			
			user() {
				return this.users[this.user_id];
			},
			
			main_user() {
				let {main_user_id} = this.userPage;
				return this.users[main_user_id];
			}
		},
		watch: {
			user_id(oldUserId, newUserId) {
				if (oldUserId !== newUserId) this.getUserPage();
			}
		},
		methods: {
			async getUserPage() {
				try {
					return await this.$store.dispatch(`userPage/list`, {customUrl: `${process.env.VUE_APP_MAIN_API}/rest/v1/user/${this.user_id}`});
				} catch (e) {
					throw new Error(`"userPage/list" action failed, error: ${e.message}`)
				} finally {
					this.is_loading = false;
				}
			}
		},
		components: {
			Loader,
			PageFeed,
			PageStatistics,
			PageInfo,
			PageHeader,
		},
		async mounted() {
			await this.getUserPage();
		}
	}

</script>

<style lang="scss">
	#mypage {
		position: relative;
		width: 100%;
	}
	
	.user-page {
		position: relative;
		width: 100%;
		border-radius: 6px;
	}
</style>
