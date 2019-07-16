<template>
	<div class="lds-ring" :style="size">
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
</template>

<script>
	export default {
		name: "LoaderReusable",
		// props: {
		// 	size: Number, String
		// },
		methods: {
			handleCssValue(value) {
				switch (true) {
					case `${value}`.slice(-1) === '%':
						return value;
					case !isNaN(value):
						return value + 'px';
					default:
						return value;
				}
			}
		},
		computed: {
			// size() {
			// 	let {size, handleCssValue} = this;
			// 	if (size) {
			// 		size = handleCssValue(size);
			// 		return {width: size, height: size}
			// 	} else {
			// 		return {};
			// 	}
			// }
		},
	}
</script>

<style lang="scss">
	.lds-ring {
		display: inline-block;
		position: relative;
		width: 64px;
		height: 64px;
		flex-shrink: 0;
	}

	.lds-ring div {
		box-sizing: border-box;
		display: block;
		position: absolute;
		width: 51px;
		height: 51px;
		margin: 6px;
		border: 6px solid #4B97B4;
		border-radius: 50%;
		animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		border-color: #4B97B4 transparent transparent transparent;
	}

	.lds-ring div:nth-child(1) {
		animation-delay: -0.45s;
	}

	.lds-ring div:nth-child(2) {
		animation-delay: -0.3s;
	}

	.lds-ring div:nth-child(3) {
		animation-delay: -0.15s;
	}

	@keyframes lds-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

</style>