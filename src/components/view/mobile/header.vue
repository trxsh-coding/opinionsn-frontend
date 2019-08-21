<template>
	<div id="mobile-header"
	     class="flex-between flex-align-center"
	     :class="{'hidden': hidden}"
	     v-show="header_type !== 'hidden'">
		<div
				v-if="logged_in"
				class="icon-wrapper">
			<icon-base
					@click.native="pushToCreatePoll"
					v-if="header_type === 'primary'"
					class="add-poll"
					fill="#152D3A"
					width="24"
					height="25"
					viewBox="0 0 24 25"
					icon-name="add-poll">
				<icon-add-poll/>
			</icon-base>
			
			<icon-base
					v-if="header_type === 'secondary'"
					@click.native="back"
					class="arrow-icon pointer"
					fill="#4B97B4"
					width="23"
					height="26"
					viewBox="0 0 23 16"
					icon-name="arrow">
				<icon-arrow-left/>
			</icon-base>
		</div>
		
		<div
				@click="$router.push({ name: 'pollFeed' })"
				v-if="header_type === 'primary'"
				class="main-logo-icon-block pointer">
    
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
		</div>
		
		<lang-string
				v-if="header_type === 'secondary'"
				class="route-title"
				:title="$route.name.toLowerCase()"/>
		
		<avatar
				v-if="logged_in"
				@click.native="$router.push({ name: 'user', params: { id: user.id } })"
				class="pointer"
				:img="publicPath + imageUtil(user.path_to_avatar, 'S')"
				:size="27"
				without-text
				rounded/>
	
	</div>
</template>

<script>
	import IconBase from '../../icons/IconBase'
	import IconAddPoll from '../../icons/IconAddPoll'
	import IconLogo from '../../icons/IconLogo'
	import IconTextLogo from '../../icons/IconTextLogo'
	import avatar from '../../reusableСomponents/PictureReusable'
	import imageMixin from "../../mixins/imageMixin";
	import IconArrowLeft from "../../icons/IconArrowLeft";
	import langString from "../../langString";
	import ButtonReusable from "../../reusableСomponents/ButtonReusable";
	
	export default {
		name: "header",
		components: {
			ButtonReusable,
			IconBase,
			IconAddPoll,
			IconLogo,
			IconTextLogo,
			avatar,
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
				publicPath: process.env.VUE_APP_MAIN_API,
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
			pushToCreatePoll() {
				this.$router.push({name: 'createPoll'})
				
			},
			back() {
				if (window.history.length <= 2) {
					this.$router.push({ name: 'pollFeed' })
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
		background: #ffffff;
		z-index: 999999;
		padding: 8px 20px 13px 20px;
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
