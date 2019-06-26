<template>
    <button class="button-reusable" :style="buttonStyle">
		<slot>

		</slot>
	</button>
</template>

<script>
    export default {
        name: "ButtonReusable",
		props: {
        	color: {
        		type: String,
				default: function () {
					return '#4B97B4';
				}
			},
			borRad: {
				type: [String, Number],
				default: function () {
					return '0';
				}
			},
			rounded: Boolean
		},
		computed: {
			buttonStyle() {
				let { color, borRad, rounded } = this;

				color = {backgroundColor: `${color}`};

				if (rounded) {
					borRad = {borderRadius: '50%'}
				} else {
					borRad = (borRad.slice(-1) === '%') ? {borderRadius: `${borRad}`} : {borderRadius: `${borRad}px`};
				}

				return {
					...color,
					...borRad
				}
			}
		},
    }
</script>

<style lang="scss" scoped>
	.button-reusable {
		cursor: pointer;
		outline: none;
		border: none;
		padding: 0;

		&:active {
			filter: hue-rotate(-10deg);
		}
	}
</style>