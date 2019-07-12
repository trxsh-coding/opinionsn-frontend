<template xmlns:lang-string="http://www.w3.org/1999/xlink">
    <button class="button-reusable flex-align-center " :style="buttonStyle">
		<lang-string :title="description"/>
		<slot />
	</button>
</template>

<script>
	import langString from '../langString'
    export default {
        name: "ButtonReusable",
		components: {langString},
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
			description: {
        		type:String
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
					borRad = (`${borRad}`.slice(-1) === '%') ? {borderRadius: `${borRad}`} : {borderRadius: `${borRad}px`};
				}

				return {
					...color,
					...borRad
				}
			}
		},
    }
</script>

<style lang="scss">
	.button-reusable {
		cursor: pointer;
		outline: none;
		border: none;
		padding: 0;
		width: fit-content;
		height: fit-content;
		padding: 0 9px;
		span {

			text-transform: uppercase;
			font-family: Roboto;
			font-style: normal;
			font-weight: normal;
			font-size: 11px;
			color: #FFFFFF;


		}
		&:active {
			filter: hue-rotate(-10deg);
		}
	}
</style>
