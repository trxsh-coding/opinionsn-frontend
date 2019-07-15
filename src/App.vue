<template>
	<div id="app" ref="app" @scroll="setScrollDifference($refs.app, 0, null, true)">
		<router-view/>
	</div>
</template>

<script>
	import ElementScrollHandler from "./components/mixins/ElementScrollHandler";

	export default {
		mixins: [ElementScrollHandler],
	}

</script>

<style lang="scss">

	.el-popover {
		z-index: 999999 !important;
	}

</style>
