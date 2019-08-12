<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
	import ElementScrollHandler from "./components/mixins/ElementScrollHandler";
	
	export default {
		mixins: [ElementScrollHandler],
		methods: {
			scrollEventFunc() {
				this.setScrollDifference(document.documentElement, 0, null, true)
			}
		},
		mounted() {
			document.addEventListener('scroll', this.scrollEventFunc);
		},
		beforeDestroy() {
			document.removeEventListener('scroll', this.scrollEventFunc);
		}
	}

</script>

<style lang="scss">
	
	#app {
		
		
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