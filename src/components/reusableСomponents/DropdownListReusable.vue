<template>
	<div class="dropdown-list-reusable" ref="wrapperRef">

		<button class="toggle-btn" @click="show = !show">
			<slot></slot>
			<span class="icon-wrapper" :style="iconStyle">
				<slot name="icon"></slot>
			</span>
		</button>

		<div
				@click="() => { if (clickClose) closeOnClick()  }"
				ref="srollableBlockRef"
				@scroll="setScrollDifference($refs.srollableBlockRef, 64, 'scrollDifference')"
				class="dropdown-list flex-column flex-align-center"
				:class="listClass"
				:style="[listVisibility, listWidth, listHeight]">

			<slot name="items"></slot>
		</div>
	</div>
</template>

<script>

	import LoaderReusable from "./LoaderReusable";
	import ElementScrollHandler from "../mixins/ElementScrollHandler";

	export default {
		name: "DropdownListReusable",
		components: {LoaderReusable},
		mixins: [ElementScrollHandler],
		props: {
			width: {
				type: [String, Number]
			},
			height: {
				type: [String, Number]
			},
			listClass: String,
			clickClose: Boolean
		},
		data() {
			return {
				show: false
			}
		},
		watch: {
			show() {
				this.handleVisibility();
			},

		},
		computed: {
			listVisibility() {
				return this.show ? {display: 'block', opacity: '1'} : {display: 'none', opacity: '0'};
			},
			iconStyle() {
				return this.show ? {transform: "rotateX(180deg)", top: '2px'} : {};
			},
			listWidth() {
				let {width, handleCssValue} = this;
				if (!width) return {};

				width = handleCssValue(width);
				return {width};
			},
			listHeight() {
				let {height, handleCssValue} = this;
				if (!height) return {};

				height = handleCssValue(height);
				return {height};
			},
		},
		methods: {
			closeOnClick() {
				this.show = false;
			},

			handleVisibility() {
				this.$emit('visibile', this.show);
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

			handleOutsideClick({target}) {
				let {wrapperRef} = this.$refs;
				if (!wrapperRef.contains(target)) this.show = false;
			},

		},
		mounted() {
			let {handleOutsideClick} = this;
			document.body.addEventListener('click', handleOutsideClick, false);
		},
		beforeDestroy() {
			let {handleOutsideClick} = this;
			document.body.removeEventListener('click', handleOutsideClick, false);
		}
	}
</script>

<style lang="scss">

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
