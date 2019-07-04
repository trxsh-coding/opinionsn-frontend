<template>
    <div class="popover-reusable" :style="popoverStyle">
		<slot></slot>
	</div>
</template>

<script>
    export default {
        name: "PopoverReusable",
		props: {
			attachPoint: {
				type: String,
				validator: function (value) {
					// Значение должно соответствовать одной из этих строк
					return [
						"top-left",
						"top-right",
						"top",
						"right-top",
						"right-bottom",
						"right",
						"bottom-left",
						"bottom-right",
						"bottom",
						"left-top",
						"left-bottom",
						"left"
					].indexOf(value) !== -1
				}
			},
			width: [String, Number],
			margin: [Number, String]
		},
		computed: {
			popoverStyle() {

				let { attachPoint, width, margin } = this;

				const AXIS_X_CENTER = {
					transform: 'translateX(-50%)',
					left: '50%'
				};

				const AXIS_Y_CENTER = {
					bottom: '50%',
					transform: 'translateY(50%)'
				};

				let style = {};

				switch (true) {
					case attachPoint === "top-left":
						style = {
							bottom: `calc(100% + ${margin || 10}px)`,
							right: `calc(100% + ${margin || 10}px)`
						};
						break;
					case attachPoint === "top-right":
						style = {
							bottom: `calc(100% + ${margin || 10}px)`,
							left: `calc(100% + ${margin || 10}px)`
						};
						break;
					case attachPoint === "top":
						style = {
							bottom: `calc(100% + ${margin || 10}px)`,
							...AXIS_X_CENTER
						};
						break;
					case attachPoint === "right-top":
						style = {
							top: '0',
							left: `calc(100% + ${margin || 10}px)`
						};
						break;
					case attachPoint === "right-bottom":
						style = {
							bottom: '0',
							left: `calc(100% + ${margin || 10}px)`
						};
						break;
					case attachPoint === "right":
						style = {
							left: `calc(100% + ${margin || 10}px)`,
							...AXIS_Y_CENTER
						};
						break;
					case attachPoint === "bottom-left":
						style = {
							top: `calc(100% + ${margin || 10}px)`,
							right: `calc(100% + ${margin || 10}px)`
						};
						break;
					case attachPoint === "bottom-right":
						style = {
							top: `calc(100% + ${margin || 10}px)`,
							left: `calc(100% + ${margin || 10}px)`
						};
						break;
					case attachPoint === "bottom":
						style = {
							top: `calc(100% + ${margin || 10}px)`,
							...AXIS_X_CENTER
						};
						break;
					case attachPoint === "left-top":
						style = {
							top: '0',
							right: `calc(100% + ${margin || 10}px)`
						};
						break;
					case attachPoint === "left-bottom":
						style = {
							bottom: '0',
							right: `calc(100% + ${margin || 10}px)`
						};
						break;
					case attachPoint === "left":
						style = {
							right: `calc(100% + ${margin || 10}px)`,
							...AXIS_Y_CENTER
						};
						break;

					default:
						style = {
							top: '0',
							left: `calc(100% + ${margin || 10}px)`
						};
						break;
				};

				if (width) {

					typeof width === "number"
						? style = {...style, width: `${width}px`}
						: style = {...style, width: `${width}`};

				}

				return style;

			}
		},
    }
</script>

<style lang="scss">
	.popover-reusable {
		position: absolute;
		padding: 9px;
		width: fit-content;
		word-break: break-word;

		display: flex;
		justify-content: center;
		align-items: center;

		z-index: 999999;

		background: #FFFFFF;
		border: 0.3px solid #D8D9DC;
		box-shadow: 0 0 30px rgba(41, 46, 62, 0.2);
		border-radius: 6px;
	}
</style>