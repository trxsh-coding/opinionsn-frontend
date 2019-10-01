<template>
	<div id="app">
		<popup-notifications id="popup-notifications" />
		<ModalWindow />
		<router-view />
		<portal-target name="croppaModal" />
	</div>
</template>

<script>
	import ElementScrollHandler from "./components/mixins/ElementScrollHandler";
	import PopupNotifications from "@/components/PopupNotifications";
	import ModalWindow from "./components/reusableСomponents/ModalWindow";
	import {mapState} from "vuex";

	export default {
		components: { ModalWindow, PopupNotifications },
		mixins: [ElementScrollHandler],
		computed: {
			...mapState('globalStore', {
				referCode: s => s.mainUser.referCode
			}),
			
		},
		
		watch: {
			referCode(newValue) {
				if (typeof newValue === 'string') {
					this.$router.replace({query: {refer: newValue}})
				}
			}
		},
		
		methods: {
			scrollEventFunc() {
				this.setScrollDifference(document.documentElement, 0, null, true);
			}
		},
		
		mounted() {
			document.addEventListener("scroll", this.scrollEventFunc);
		},
		
		beforeDestroy() {
			document.removeEventListener("scroll", this.scrollEventFunc);
		}
	};
</script>

<style lang="scss">
	#app {
		position: relative;

		@media screen and (max-width: 500px) {
			&::-webkit-scrollbar {
				display: none !important;
				-webkit-appearance: none !important;
				width: 0 !important;
				height: 0 !important;
			}
		}

		#croppa-overlay {
			position: absolute;
			z-index: 999999999;
			background: rgba(0, 0, 0, 0.75);
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;

			button {
				all: unset;
				background: #4B97B4;

				font-family: Roboto;
				font-style: normal;
				font-weight: normal;
				font-size: 18px;
				color: #FFFFFF;
			}

			.close-btn {
				position: absolute;
				top: 20px;
				right: 20px;
			}

			.icon-placeholder, .reset-btn {
				position: absolute;
				transform: translate(-50%, -100%);
				top: 50%;
				left: 50%;
				z-index: 999;
				pointer-events: none;
			}

			.reset-btn {
				pointer-events: initial;
			}

			.rounded {
				canvas {
					border-radius: 50%;
				}
			}
		}
	}

	.el-popover {
		z-index: 999999 !important;
	}
</style>