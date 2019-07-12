<template>
    <div class="dropdown-list-reusable" ref="dropdownRef">

		<button class="toggle-btn" @click="show = !show">
			<slot></slot>
			<span class="icon-wrapper" :style="iconStyle">
				<slot name="icon"></slot>
			</span>
		</button>

		<div class="dropdown-list flex-column flex-align-center" :style="{...listVisibility, ...listWidth}">

			<slot name="items"></slot>
		</div>
	</div>
</template>

<script>

	export default {
        name: "DropdownListReusable",
		props: {
        	width: {
        		type: [String, Number]
			}
		},
		data() {
			return {
				show: false
			}
		},
		watch: {
        	show() {
				this.handleDropdownList();
			},

		},
		computed: {
			listVisibility() {
				return this.show ? { visibility: 'visible', opacity: '1' } : { visibility: 'hidden', opacity: '0' };
			},
			iconStyle() {
				return this.show ? {transform: "rotateX(180deg)", top: '2px'} : {};
			},
			listWidth() {
				let { width, handleCssValue } = this;
				if (!width) return {};

				width = handleCssValue(width);
				return { width };
			}
		},
		methods: {
			handleDropdownList() {
				this.$emit('handleDropdownList', this.show);
			},
			handleCssValue(value) {

				switch (true) {
					case `${value}`.slice(-1) === '%':
						return value;
					case !isNaN(value):
						return value + 'px';
					default:
						return value;
				}

			},
			test({target}) {
				let { dropdownRef } = this.$refs;
				if (!dropdownRef.contains(target)) this.show = false;
			}
		},
		mounted() {
        	let { test } = this;
			document.body.addEventListener('click', test, false);
		},
		beforeDestroy() {
			let { test } = this;
			document.body.removeEventListener('click', test, false);
		}
	}
</script>

<style lang="scss" scoped>

	.dropdown-list-reusable {
		position: relative;
		display: inline-block;

		.toggle-btn {
			display: flex;
			justify-content: center;
			align-items: center;

			cursor: pointer;
			padding: 1px 0;

			font-family: Roboto;
			font-style: normal;
			font-weight: 500;
			font-size: 14px;
			color: #1A1E22;

			background-color: transparent;
			outline: none;
			border: none;

			.icon-wrapper {
				position: relative;
				display: flex;
				align-items: center;
			}

		}

		.dropdown-list {
			position: absolute;
			z-index: 8000;
			top: calc(100% + 10px);
			left: 50%;
			transform: translateX(-50%);

			background: #FFFFFF;
			border: 0.3px solid #D8D9DC;
			box-shadow: 0 0 30px rgba(41, 46, 62, 0.2);
			border-radius: 6px;
			padding: 9px;

			transition: 300ms;

			& > * {
				margin-bottom: 5px;

				&:last-of-type {
					margin-bottom: 0;
				}
			}
		}

	}

</style>
