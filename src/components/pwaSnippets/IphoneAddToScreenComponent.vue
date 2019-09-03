<template>
	<div class="add-home-snippet flex mx-8" v-if="available" :style="cStyle">
		
		<icon-base
				class="plus-block"
				width="20"
				height="20"
				viewBox="0 0 15 15"
				icon-name="plus">
			<icon-plus />
		</icon-base>
		
		<div class="text-block relative">
			
			<icon-base
					@click.native="closeAdvice"
					fill="none"
					class="icon-close"
					width="17"
					height="17"
					viewBox="0 0 17 17"
					icon-name="close"><icon-close />
			</icon-base>
			
			<span>
				<lang-string :title="'install_this_webapp_on_your_iphone:_tap'"/>
				<icon-base
						class="ml-5"
						fill="none"
						width="20"
						height="20"
						viewBox="0 0 150 150"
						icon-name="icon-add">
					<icon-add/>
				</icon-base>
				<lang-string :title="'and_then_«add_to_homescreen»'"/>
            </span>
		
		</div>
	</div>
</template>

<script>
	import IconBase from "./../icons/IconBase.vue";
	import IconAdd from "./../icons/IconAddToScreen.vue";
	import langString from "../langString.vue";
	import Bowser from "bowser"
	import {mapState} from "vuex";
	import IconClose from "@/components/icons/IconClose";
	import IconPlus from "@/components/icons/IconPlus";
	
	export default {
		name: "IphoneAddToScreenComponent",
		components: {IconPlus, IconClose, IconAdd, IconBase, langString},
		data() {
			return {
				available: false
			}
		},
		methods: {
			
			closeAdvice() {
				this.available = false;
				window.localStorage.setItem('iOSPwaAdviceHidden', 'true');
			},
			
			isAvailable() {
				this.available = ((window.localStorage.getItem('iOSPwaAdviceHidden') === null)
					&& /Safari/.test(Bowser.getParser(window.navigator.userAgent).getBrowserName())
					&& this.$root.is_mobile_device);
			},
			
		},
		computed: {
			...mapState("globalStore", {
				mainUser: s => s.mainUser
			}),
			
			cStyle() {
				return (!Object.keys(this.mainUser).length) ? {bottom: '98px'} : {};
			}
		},
		mounted() {
			this.isAvailable();
		}
	}

</script>

<style lang="scss">
	.add-home-snippet {
		z-index: 999999;
		background: #4B97B4;
		border-radius: 10px;
		padding: 20px;
		right: 0;
		bottom: 52px;
		position: fixed;
		
		.icon-close {
			position: absolute;
			right: -15px;
			top: -15px;
			border-radius: 100px;
		}
		
		.plus-block {
			margin: auto 10px auto 0;
			padding: 5px;
			height: 31px;
			max-height: 41px;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #ffffff;
		}
		
		.text-block {
			
			svg {
				
				g {
					
					fill: #3d577b
					
				}
				
			}
			
		}
		
		span {
			font-family: Roboto;
			font-style: normal;
			font-weight: normal;
			font-size: 13px;
			line-height: 16px;
			letter-spacing: -0.1px;
			color: #ffffff;
			
		}
		
	}
</style>
