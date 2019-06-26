<template>
    <div class="dropdown-list-reusable">

		<button class="toggle-btn" @click="show = !show">
			<slot></slot>
			<span class="icon-wrapper" :style="iconStyle">
				<slot name="icon"></slot>
			</span>
		</button>

		<ul class="dropdown-list" :style="listVisibility">
			<slot name="items"></slot>
		</ul>
	</div>
</template>

<script>

	export default {
        name: "DropdownListReusable",
		data() {
			return {
				show: false
			}
		},
		watch: {
        	show() {
				this.handleDropdownList();
			}
		},
		computed: {
			listVisibility() {
				return this.show ? { visibility: 'visible', opacity: '1' } : { visibility: 'hidden', opacity: '0' };
			},
			iconStyle() {
				return this.show ? {transform: "rotateX(180deg)", top: '2px'} : {};
			}
		},
		methods: {
			handleDropdownList() {
				this.$emit('handleDropdownList', this.show);
			}
		},
    }
</script>

<style lang="scss" scoped>

	.dropdown-list-reusable {
		position: relative;
		width: fit-content;

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