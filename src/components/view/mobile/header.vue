<template>
	<div id="mobile-header"
	     class="flex-between flex-align-center py-10 px-20"
	     :class="{'hidden': hidden}"
	     v-show="header_type !== 'hidden'">
		
		<template v-if="logged_in">
			
			<router-link v-show="header_type === 'primary'" class="flex" :to="{name: 'createPoll'}">
				<IconAddPoll class="add-poll" fill="#4B97B4" />
			</router-link>
			
			<icon-base
					v-show="header_type === 'secondary'"
					@click.native="goBack"
					class="arrow-icon pointer"
					fill="#4B97B4"
					width="23"
					height="26"
					viewBox="0 0 23 16"
					icon-name="arrow">
				<icon-arrow-left/>
			</icon-base>
			
		</template>
		
		<router-link class="main-logo-icon-block h-25 pointer" :class="{'mx-auto': !logged_in}"
		              v-if="header_type === 'primary'" :to="{name: 'pollFeed'}">
			<icon-base
					fill="none"
					class="icon"
					width="25"
					height="25"
					viewBox="0 0 25 25"
					icon-name="logo">
				<icon-logo/>
			</icon-base>
			
			<icon-base
					class="ml-6 mb-1"
					fill="none"
					width="66"
					height="15"
					viewBox="0 0 66 15"
					icon-name="text-logo">
				<icon-text-logo/>
			</icon-base>
		</router-link>
		
		<lang-string
				v-if="header_type === 'secondary'"
				class="route-title"
				:title="$route.name.toLowerCase()"/>
		
		<router-link v-if="logged_in" class="pointer flex"
		             :to="{ name: 'user', params: { id: user.id } }">
			<RePicture :url="user.path_to_avatar | addAssetsPath" size="27" rounded />
		</router-link>
	
	</div>
</template>

<script>
	import IconBase from '../../icons/IconBase'
	import IconLogo from '../../icons/IconLogo'
	import IconTextLogo from '../../icons/IconTextLogo'
	import imageMixin from "../../mixins/imageMixin";
	import IconArrowLeft from "../../icons/IconArrowLeft";
	import langString from "../../langString";
	import ButtonReusable from "../../reusableСomponents/ButtonReusable";
	import RePicture from "@/components/reusableСomponents/RePicture";
	import IconAddPoll from "@/components/icons/IconAddPoll";

	export default {
		name: "header",
		components: {
			IconAddPoll,
			RePicture,
			ButtonReusable,
			IconBase,
			IconLogo,
			IconTextLogo,
			IconArrowLeft,
			langString
		},
		mixins: [imageMixin],
		props: {
			user: {
				type: Object
			},
		},
		
		data() {
			return {
				hidden: false
			}
		},
		
		watch: {
			scroll_top(val, oldVal) {
				if (oldVal > 48) {
					if (val > oldVal) this.hidden = true;
					if (val < oldVal) this.hidden = false;
				} else {
					this.hidden = false;
				}
			}
		},
		
		computed: {
			
			scroll_top() {
				return this.$root.scroll_top
			},
			
			header_type() {
				let {name: route_name} = this.$route;
				
				switch (route_name) {
					case 'pollFeed':
					case 'voteFeed':
					case 'singlePoll':
						return 'primary';
					
					case 'catalogList':
					case 'catalogFeed':
					case 'statistic':
					case 'rating':
					case 'bookmarkFeed':
					case 'search':
						return 'secondary';
					
					default:
						return 'hidden';
				}
			},
			
			logged_in() {
				return !!Object.keys(this.user).length;
			}
		},
		
		methods: {

			goBack() {
				if (window.history.length <= 2) {
					this.$router.push({name: 'pollFeed'})
				} else {
					this.$router.go(-1)
				}
			}
		}
		
	}
</script>

<style lang="scss">
	#mobile-header {
		width: 100%;
		position: fixed;
		top: 0;
		background: #f8f8f8;
		border-bottom: 1px solid #BEC0C5;
		z-index: 999999;
		transition: 300ms;
		
		&.hidden {
			transform: translateY(-100%);
		}
		
		.route-title {
			font-family: Roboto;
			font-style: normal;
			font-weight: bold;
			font-size: 26px;
			color: #4B96B3;
		}
	}
</style>
