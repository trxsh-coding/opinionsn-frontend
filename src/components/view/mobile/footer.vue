<template>
	<div class="mobile-footer">
		<ul>
			<li class="footer-icon">
				<router-link class="btn" active-class="active" :to="{name: 'pollFeed'}">
					<icon-base
							width="24"
							height="25"
							viewBox="0 0 24 25"
							icon-name="icon-main">
						<icon-main/>
					</icon-base>
					<lang-string :title="'main'"/>
				</router-link>
			</li>
			
			<li class="footer-icon">
				<router-link class="btn" active-class="active" :to="{name: 'voteFeed'}">
					<icon-base
							width="24"
							height="25"
							viewBox="0 0 24 25"
							icon-name="icon-opinion">
						<icon-opinion/>
					</icon-base>
					<lang-string :title="'opinion'"/>
				</router-link>
			</li>
			
			<li class="footer-icon">
				<router-link class="btn" active-class="active" :to="{name: 'search'}">
					<icon-base
							width="20"
							height="21"
							viewBox="0 0 20 21"
							icon-name="icon-search">
						<icon-search/>
					</icon-base>
					<lang-string :title="'search'"/>
				</router-link>
			</li>
			
			<li class="footer-icon notification-btn">
				<router-link class="btn" active-class="active" :to="{name: 'notifications'}">
					<icon-base
							width="21"
							height="21"
							viewBox="0 0 21 21"
							icon-name="icon-notifications">
						<icon-notifications/>
					</icon-base>
					<lang-string :title="'notifications'"/>
				</router-link>
				
				<re-badge class="counter" v-show="counter" :size="12"
				          :params="{background: '#FF5454'}"/>
			</li>
			
			<li class="footer-icon">
				<div class="btn" :class="{active : routeName === 'menu'}" @click="(routeName === 'menu') ? $router.go(-1) : $router.push('menu')">
					<icon-base
							width="24"
							height="24"
							viewBox="0 0 24 24"
							icon-name="icon-main">
						<icon-menu/>
					</icon-base>
					<lang-string title="menu"/>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import IconBase from '../../icons/IconBase'
	import IconMain from '../../icons/footer/IconMain'
	import IconMenu from '../../icons/footer/IconMenu'
	import IconOpinion from '../../icons/footer/IconOpinion'
	import IconNotifications from '../../icons/footer/IconNotifications'
	import IconSearch from '../../icons/footer/IconSearch'
	import langMixin from '../../mixins/langMixin'
	import langString from '../../langString'
	import {mapState} from 'vuex';
	import ReBadge from "@/components/reusableСomponents/ReBadge";
	
	export default {
		name: "footer",
		mixins: [langMixin],
		components: {
			ReBadge, IconBase, IconMain, IconMenu, IconNotifications, IconSearch, IconOpinion, langString
		},
		computed: {
			
			...mapState("notificationPage", {
				counter: s => s.counter,
			}),
			
			routeName() {
				
				return this.$route.name
				
			}
			
		},
		methods: {
			routerPush(linkName) {
				
				this.$router.push({name: `${linkName}`})
				
			}
		},
	}
</script>


<style lang="scss" scoped>
	.mobile-footer {
		box-sizing: border-box;
		border-top: 1px solid #BEC0C5;
		width: 100%;
		background: #F8F8F8;
		position: fixed;
		z-index: 9000;
		bottom: 0;
		padding: 5px 24px 4px 24px;
		
		.active {
			opacity: 1 !important;
		}
		
		svg {
			
			margin-bottom: 4px;
			
		}
		
		ul {
			width: 100%;
			display: inline-flex;
			justify-content: space-between;
			
			li {
				position: relative;
				justify-content: space-between;
				display: flex;
				flex-direction: column;
				align-items: center;
				
				.btn {
					all: inherit;
					opacity: 0.3;
				}
				
				span {
					font-family: Helvetica Neue;
					font-size: 10px;
					line-height: 10px;
					color: #1A1E22;
				}
				
				
			}
			
			.notification-btn {
				
				.counter {
					position: absolute;
					top: -2px;
					right: 16px;
				}
			}
		}
		
		
	}
</style>
