<template lang="html">
	<div class="links-section">
		<ul>
			<li class="relative pointer">
				<router-link class="link pl-5" :to="{name: 'createPoll'}">
					<IconAddPoll />
					<lang-string :title="'add_poll'" />
				</router-link>
			</li>
			
			<li class="link relative pointer">
				<icon-base
						fill="none"
						width="25"
						height="25"
						viewBox="3 0 25 25"
						icon-name="pocket">
					<icon-pocket/>
				</icon-base>
				<lang-string :title="'pocket'" />
			</li>
			
			<li class="relative pointer">
				<router-link class="link" :to="{name: 'bookmarkFeed'}">
					<IconBookmark width="18" height="24" />
					<lang-string :title="'bookmarks'" />
				</router-link>
			</li>
			
			<li class="link relative pointer">
				<icon-base
						fill="none"
						width="14"
						height="22"
						viewBox="0 0 14 22"
						icon-name="add">
					<icon-judgement/>
				</icon-base>
				<lang-string :title="'judgement'" />
			</li>
			
			<li class="relative pointer">
				<router-link class="link" :to="{name: 'catalogList'}">
					<icon-base
							fill="none"
							width="21"
							height="22"
							viewBox="3 0 21 22"
							icon-name="catalog">
						<icon-catalog/>
					</icon-base>
					<lang-string :title="'topics'" />
				</router-link>
			</li>
			
			<li v-if="mainUser.referCode" class="relative pointer">
				<router-link class="link" :to="{name: 'ReferralsPage'}">
					<icon-user width="22" height="22" fill="#1a1e22" :style="{position: 'relative', left: '-3px'}"/>
					<lang-string :title="'referrals_page'" />
				</router-link>
			</li>
			
			<li class="relative pointer">
				<router-link class="link" :to="{name: 'settings'}">
					<icon-base
							fill="none"
							width="21"
							height="21"
							viewBox="3 0 21 21"
							icon-name="add">
						<icon-settings/>
					</icon-base>
					<lang-string :title="'settings'" />
				</router-link>
			</li>
			
			<li class="relative pointer">
				<router-link class="link" :to="{name: 'feedback'}">
					<icon-base
							fill="none"
							width="21"
							height="21"
							viewBox="4 0 21 21"
							icon-name="feedback">
						<icon-feedback/>
					</icon-base>
					<lang-string :title="'feedback'" />
				</router-link>
			</li>
			
			<li class="link relative pointer" @click="userLogout">
				<icon-base
						fill="none"
						width="21"
						height="22"
						viewBox="0 0 21 22"
						icon-name="exit">
					<icon-exit/>
				</icon-base>
				<lang-string :title="'exit'"/>
			</li>
		</ul>
	</div>
</template>

<script>
	import axios from 'axios'
	import langMixin from '../mixins/langMixin'
	import {mapState} from 'vuex'
	import IconBase from '../icons/IconBase'
	import IconPocket from '../icons/IconPocket'
	import IconCatalog from '../icons/menu/IconCatalog'
	import IconExit from '../icons/menu/IconExit'
	import IconFeedback from '../icons/menu/IconFeedback'
	import IconJudgement from '../icons/menu/IconJudgement'
	import IconSettings from '../icons/menu/IconSettings'
	import langString from '../langString'
	import CookieMixin from "@/components/mixins/CookieMixin";
	import IconUser from "@/components/icons/IconUser";
	import IconBookmark from "@/components/icons/IconBookmark";
	import IconAddPoll from "@/components/icons/IconAddPoll";
	
	export default {
		data() {
			return {
				publicPath: process.env.VUE_APP_ASSETS,
			}
		},
		
		components: {
			IconAddPoll,
			IconBookmark,
			IconUser,
			IconBase,
			IconCatalog,
			IconExit,
			IconFeedback,
			IconJudgement,
			IconSettings,
			langString,
			IconPocket
		},
		
		mixins: [langMixin, CookieMixin],
		
		computed: {
			
			...mapState('globalStore', {
				
				mainUser: s => s.mainUser
				
			}),
			
		},
		
		methods: {
			
			routerPush(name, additionalOptions) {
				this.$router.push({name, ...additionalOptions})
			},
			
			userLogout() {
				
				this.deleteCookie('Auth-Token');
				this.$store.commit("authentication/setAuthenticated", false);
				this.$store.commit("userPage/removeUser");
				this.$store.commit("pollFeed/clearFeed");
				this.$store.commit("globalStore/clearStores");
				this.$store.commit("notificationStore/clearStores");
				this.$store.commit("notificationPage/setDefaultPage");
				this.$router.push({name: 'sign'});
				
			},
			
		},
		
		
		mounted() {
		
		
		}
	}
</script>

<style lang="scss">
	.links-section {
		
		ul {
			
			.link {
				height: 45px;
				display: flex;
				padding: 11px 0 11px 7px;
				align-items: center;
				border-bottom-color: #BCBEC3;
				border-bottom-width: 0.5px;
				border-bottom-style: solid;
				
				span {
					position: absolute;
					left: 45px;
					top: 16.5px;
					font-family: Roboto;
					font-style: normal;
					font-weight: normal;
					font-size: 14px;
					line-height: 16px;
					color: #1A1E22;
					
				}
			}
			
		}
		
	}
</style>
