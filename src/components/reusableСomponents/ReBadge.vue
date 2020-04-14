<template>
    <div class="re-badge" :style="c_params">
		<span v-if="counter">
			{{handledCounter}}
		</span>
		<slot v-else>

		</slot>
	</div>
</template>

<script>
    export default {
        name: "ReBadge",
		props: {
        	counter: {
        		type: Number
			},
			value: {
				type: Boolean
			},
			size: {
        		type: Number
			},
			params: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		computed: {
			handledCounter() {
				let { counter } = this;
				if (counter) {
					return counter > 9 ? '+9' : counter;
				}
			},

			c_params() {
				return {
					fontFamily: 'Roboto',
					fontStyle: 'normal',
					fontWeight: 'normal',
					width: '21px',
					height: '21px',
					background: '#C4C4C4',
					fontSize: '10px',
					color: '#ffffff',
					...this.params,
					...this.cSize
				}
			},

			cSize() {
				return this.size ? {width: `${this.size}px`, height: `${this.size}px`} : {};
			}
		},
    }
</script>

<style lang="scss">
	.re-badge {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		cursor: pointer;

		span {
			font-family: inherit;
			font-style: inherit;
			font-weight: inherit;
			font-size: inherit;
			color: inherit;
		}
	}
</style>
