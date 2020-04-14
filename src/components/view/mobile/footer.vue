<template>
	<div class="mobile-footer">
		<ul class="flex-align-stretch h-48 pt-5 pb-4 px-24">
			<li class="footer-icon">
				<router-link class="btn" active-class="active" :to="{name: 'pollFeed'}">
					<icon-base
							width="24"
							height="25"
							viewBox="0 0 24 25"
							icon-name="icon-main">
						<icon-main/>
					</icon-base>
					<lang-string title="main"/>
				</router-link>
			</li>

			<li class="footer-icon">
				<router-link class="btn" active-class="active" :to="{name: 'voteFeed'}">
					<IconOpinion width="25" height="26"/>
					<lang-string title="opinion"/>
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
				<router-link class="btn pt-2" active-class="active" :to="{name: 'notifications'}">
					<icon-base
							width="21"
							height="21"
							viewBox="0 0 21 21"
							icon-name="icon-notifications">
						<icon-notifications/>
					</icon-base>
					<lang-string title="notifications"/>
				</router-link>
				<re-badge class="counter" v-show="unread" :size="12"
				          :params="{background: '#FF5454'}"/>
			</li>

			<li class="footer-icon">
				<div class="btn" :class="{active : routeName === 'menu'}"
				     @click="(routeName === 'menu') ? $router.go(-1) : $router.push({name: 'menu'})">
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
	import IconNotifications from '../../icons/footer/IconNotifications'
	import IconSearch from '../../icons/footer/IconSearch'
	import langMixin from '../../mixins/langMixin'
	import langString from '../../langString'
	import {mapState} from 'vuex';
	import ReBadge from '../../reusableСomponents/ReBadge'
	import IconOpinion from "@/components/icons/footer/IconOpinion";

	export default {
		name: "footer",
		mixins: [langMixin],
		components: {
			IconOpinion,
			ReBadge, IconBase, IconMain, IconMenu, IconNotifications, IconSearch, langString
		},
		computed: {

			...mapState("Notifications", {
				unread: ({unread}) => unread,
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


<style lang="scss">
	.mobile-footer {
		box-sizing: border-box;
		border-top: 1px solid #BEC0C5;
		width: 100%;
		background: #F8F8F8;
		position: fixed;
		z-index: 9000;
		bottom: 0;

		.active {
			opacity: 1 !important;
		}

		ul {
			width: 100%;
			justify-content: space-between;

			li {
				position: relative;
				display: flex;
				align-items: stretch;

				.btn {
					all: inherit;
					opacity: 0.3;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-between;
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
