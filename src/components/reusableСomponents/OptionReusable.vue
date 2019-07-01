<template>
	<div class="option-reusable">

		<div v-if="bows" class="bows" :class="{'invisible': !voted}" :style="{...optionStyle, backgroundColor: 'unset !important'}">
			<slot v-if="Object.keys(bows).length > 2" name="badge"></slot>
			<router-link v-for="(value, name) in filteredBows" :to="'/user/' + name">
				<div class="bow" :style="{backgroundImage: `url('${publicPath + value}')`}"></div>
			</router-link>
		</div>

		<div class="option-wrapper" @click="selectOption(id)">
			<div v-if="picture && picture.slice(-4) !== 'null'" class="picture" :style="pictureStyle"></div>

			<div class="option" :style="optionStyle">

			<span class="text">
				<slot></slot>
			</span>

			<span v-if="percentage" class="percentage-block">
				{{percentage}}%
			</span>

				<div class="progress-bar" :style="progressBarStyle"></div>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: "OptionReusable",
		data() {
			return {
				publicPath: process.env.VUE_APP_MAIN_API
			}
		},
		props: {
			accessCheck: Boolean,
			voted: Boolean,
			selected: Boolean,
			correct: Boolean,
			prediction: Boolean,
			percentage: Number,
			picture: String,
			pictureSize: {
				type: Number,
				default: function () {
					return 90;
				}
			},
			id: {
				type: Number,
				required: true
			},
			poll_id: {
				type: Number,
				required: true
			},
			type_of_poll: {
				type: Number,
				required: true
			},
			bows: {
				type: Object
			}
		},
		methods: {
			selectOption(selected_variable) {

				if (this.accessCheck) {
					let {poll_id, type_of_poll} = this;
					console.log(poll_id)
					console.log(poll_id)
					this.$store.dispatch(`${this.$route.name}/createVote`, {data: {selected_variable, poll_id,  type_of_poll}})

				}

			}
		},
		computed: {


			filteredBows() {

				let { bows } = this;

				if (bows) {
					if (Object.keys(bows).length > 2) {
						let singleBow = {};
						singleBow[Object.entries(bows)[0][0]] = Object.entries(bows)[0][1];
						return singleBow;
					} else {
						return bows;
					}
				}
			},
			optionStyle() {
				let { selected, correct, prediction, picture } = this;

				let opacity = prediction ? { opacity: '0.3' } : {};
				let withPicture = picture ? { borderTopLeftRadius: '0', borderBottomLeftRadius: '0' } : {};

				switch (true) {
					case correct && selected:
						return {
							backgroundColor: '#4BB48E',
							color: '#fff',
							...withPicture
						};
					case selected:
						return {
							backgroundColor: '#4B97B4',
							color: '#fff',
							...withPicture
						};
					case correct:
						return {
							backgroundColor: '#4BB48E',
							color: '#fff',
							...opacity,
							...withPicture
						};
					default:
						return {
							...opacity,
							...withPicture
						};
				}
			},
			progressBarStyle() {
				let { selected, correct, percentage } = this;

				let width = percentage ? { width: `calc(${percentage}% - 21px)` } : { width: '0' };

				switch (true) {
					case selected:
						return {
							backgroundColor: '#023F52',
							...width
						};
					case correct:
						return {
							backgroundColor: '#2E6F57',
							...width
						};
					default:
						return width;
				}
			},
			pictureStyle() {
				let { picture, pictureSize } = this;

				return {
					backgroundImage: `url('${picture}')`,
					width: `${pictureSize}px`,
					height: `${pictureSize}px`
				}
			}
		},
	}
</script>

<style lang="scss">
	.option-reusable {
		position: relative;
		display: flex;
		align-items: stretch;

		width: 100%;

		.bows {
			box-sizing: border-box;
			padding: 12px 4px 12px 1px;
			flex: 0 0 54px;
			border: 0.5px solid #BCBEC3;
			border-left: none;
			border-radius: 0 6px 6px 0;

			display: flex;
			justify-content: flex-end;
			align-items: center;
			margin-right: 6px;

			a {
				.bow {
					width: 21px;
					height: 21px;
					background-repeat: no-repeat;
					background-size: cover;
					border-radius: 50%;


				}

				&:last-child {
					margin: 0 3px;
				}
			}
		}

		.option-wrapper {
			flex: 1;
			display: flex;
			cursor: pointer;

			.picture {
				background-repeat: no-repeat;
				background-size: cover;
				background-position: center;
				border: 0.5px solid #BCBEC3;
				border-radius: 6px 0 0 6px;

			}

			.option {
				flex: 1;

				position: relative;
				padding: 14.5px 9px 14.5px 12px;
				border: 0.5px solid #BCBEC3;
				border-radius: 6px;

				display: flex;
				align-items: center;
				justify-content: space-between;

				.text {
					font-family: Roboto;
					font-style: normal;
					font-weight: normal;
					font-size: 13px;
					color: inherit;

					flex: 1;
					/*white-space: nowrap;*/
					/*overflow: hidden;*/
					/*text-overflow: ellipsis;*/
				}

				.percentage-block {
					font-family: Roboto;
					font-style: normal;
					font-weight: 500;
					font-size: 13px;
					color: inherit;

					margin-left: 12px;
				}

				.progress-bar {
					position: absolute;
					bottom: 0;
					height: 4px;
					background-color: #BCBEC3;
				}
			}

		}


	}
</style>
