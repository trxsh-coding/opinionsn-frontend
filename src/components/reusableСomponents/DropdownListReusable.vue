<template>
	<div class="dropdown-list-reusable" :class="{'active': show}" ref="wrapperRef">

		<button :class="buttonClass" class="toggle-btn" @click="show = !show">
			<slot></slot>
			<span v-if="icon" class="icon-wrapper ml-14" :style="withArrow && iconStyle">
				<slot name="icon">
					<icon-base
							v-if="withArrow"
							class="mr-4"
							fill="#023F52"
							width="6"
							height="10"
							viewBox="0 0 6 10"
							icon-name="drop-arrow">
						<icon-drop-arrow />
					</icon-base>
				</slot>
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

	import ElementScrollHandler from "../mixins/ElementScrollHandler";
	import IconBase from "../icons/IconBase";
	import IconDropArrow from "../icons/IconDropArrow"
	export default {
		name: "DropdownListReusable",
		components: {
			IconDropArrow,
			IconBase
		},
		mixins: [ElementScrollHandler],
		props: {
			width: {
				type: [String, Number]
			},
			height: {
				type: [String, Number]
			},
			listClass: String,
			buttonClass: String,
			clickClose: Boolean,
			withArrow: Boolean,
			icon: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				show: false
			}
		},
		watch: {
			show() {
				this.handleVisibility();
				this.setScrollDifference(this.$refs.srollableBlockRef, 64, 'scrollDifference');
			},

		},
		computed: {
			listVisibility() {
				return this.show ? {display: 'block', opacity: '1'} : {display: 'none', opacity: '0'};
			},
			iconStyle() {
				return this.show ? {transform: "rotate(-180deg)"} : {};
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
				transition: 300ms;
			}

		}

		.dropdown-list {
			position: absolute;
			z-index: 9999999;
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
