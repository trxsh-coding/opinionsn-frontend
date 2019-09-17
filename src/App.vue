<template>
	<div id="app">
		<popup-notifications id="popup-notifications" />
		<ModalWindow />
		<router-view />
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
	}

	.el-popover {
		z-index: 999999 !important;
	}
</style>