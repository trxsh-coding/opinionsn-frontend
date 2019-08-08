<template>
	<div class="option-reusable" :style="[transform_shift, optionWrapper]">

		<div v-if="bows && mobile"
		     class="bows"
		     ref="bowsRef"
		     :class="{'invisible': !voted}"
		     :style="{...optionStyle, backgroundColor: 'unset !important'}"
		     @touchstart="trackTouchStart"
		     @touchmove="trackTouchMove"
		     @touchend="trackTouchEnd">
				
			<slot v-if="Object.keys(bows).length > 2" name="badge"></slot>
			<router-link v-for="(value, name) in bows" :to="'/user/' + name">
				<div class="bow mx-2 h-21 w-21" :style="{backgroundImage: `url('${publicPath + value}')`}"></div>
			</router-link>
		</div>

		<div class="option-wrapper" @click="selectOption(id)">
			<button @click="setRightOption(id, poll_id)" v-if="mainUser.authorities === 'ADMIN' ">✓</button>
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

		<div class="desktop-bows" v-if="!mobile">
			<involved-users-panel :users="bows" v-if="Object.keys(bows).length > 0">
				<template #description >
					<div class="none">

					</div>
				</template>
			</involved-users-panel>
		</div>

	</div>
</template>

<script>
	import InvolvedUsersPanel from "../pollFeed/layout/involvedUsersPanel";
	import {mapState} from "vuex";
	import {userVote, judgevote} from "../../EOSIO/eosio_impl";
	import {mainUser} from "../../store/modules/mainUser";
	export default {
		name: "OptionReusable",
		components: {InvolvedUsersPanel},
		data() {
			return {
				publicPath: process.env.VUE_APP_MAIN_API,
				mobile: this.$root.mobile,
				initialCoord: 0,
				block_width: null,
				difference: 0,
				transform_px: 0,
				test: 0
			}
		},
		props: {
			optionsVisible: Boolean,
			accessCheck: Boolean,
			voted: Boolean,
			selected: Boolean,
			correct: Boolean,
			prediction: Boolean,
			loading: Boolean,
			percentage: [Number, Boolean],
			picture: String,
			expired:Boolean,
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

		beforeDestroy() {
			this.$root.temp_selected_option = null;
		},

		methods: {
			selectOption(selected_variable) {
				
				if (this.voted || !this.logged_in || this.expired || this.optionsVisible === false) return;

				if (!this.$root.timer_duration && !this.$root.timer_id) {

					const runTimeout = () => {

						if (this.accessCheck) {
							let {poll_id, type_of_poll, mainUser} = this;
							this.$root.timer_duration = 5000;

							this.$root.timer_id = setTimeout(() => {

								userVote(poll_id, selected_variable, mainUser.id)
										.then(() =>this.$store.dispatch(`${this.$route.name}/createVote`, {
											data: {
												selected_variable,
												poll_id,
												type_of_poll
											}
										}))
										.then(() => {
									this.$root.timer_id = null;
									this.$root.timer_duration = 0;
								});

							}, 5000);

							this.$root.temp_selected_option = selected_variable;

						}

					};
					runTimeout();

				}
			},

			setRightOption(option_id, poll_id){
				let {mainUser} = this
				judgevote(poll_id, mainUser.id, option_id)
						.then(() => this
								.$store
								.dispatch(
										`pollFeed/setRightOption`,
										{
											data:
													{
														option_id, poll_id
													}
										})
						)
						.catch(() => console.log("Judgevote on EOSIO exception"));
			},
			trackTouchStart(e) {
				let { clientX } = e.touches[0];
				
				if (clientX < 0) clientX = 0;
				if (clientX > this.block_width) clientX = this.block_width;
				
				this.block_width = this.$refs.bowsRef.offsetWidth;
				if (this.initialCoord === 0) this.initialCoord = clientX;
				this.difference = clientX - this.initialCoord;
			},

			trackTouchMove(e) {
				let { initialCoord, block_width } = this;
				let { clientX } = e.touches[0];
				
				console.log(clientX);
				
				if (clientX < Math.trunc(block_width * 0.1)) clientX = Math.trunc(block_width * 0.1);
				if (clientX > block_width) clientX = block_width;
				
				let difference = clientX - initialCoord;

				switch (true) {
					case this.transform_px > (block_width - 54):
						this.transform_px = block_width - 54;
						break;
					case this.transform_px < 0:
						this.transform_px = 0;
						break;
					default:
						this.transform_px += difference - this.difference;
				}

				this.difference = difference;
			},

			trackTouchEnd(e) {
				if (this.transform_px < 0) this.transform_px = 0;
				if (this.transform_px > (this.block_width - 54)) this.transform_px = this.block_width - 54;
			}

		},
		computed: {
			
			...mapState("globalStore", {
				mainUser: state => state.mainUser
			}),
			
			logged_in() {
				return !!Object.keys(this.mainUser).length;
			},
			
			temp_selected() {
				return this.$root.temp_selected_option === this.id;
			},

			transform_shift() {
				return {
					// transform: `translateX(${this.$refs.bowsRef.offsetWidth + 54}px)`
					transform: `translateX(${this.transform_px}px)`
				}
			},
			optionWrapper() {
					let {expired, correct, selected, type_of_poll} = this;

					switch(type_of_poll == 1 && expired){
						case selected && correct:
							return {
								opacity: 1
							};
						case selected:
							return {
								opacity: 1
							};
						default:
							return {
								opacity : 0.4
							}
					}



			},
			filteredBows() {

				let { bows, enough_difference } = this;

				if (bows) {

					if (enough_difference) return bows;

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
				let { selected, temp_selected, correct, prediction, picture } = this;

				let opacity = prediction ? { opacity: '0.3' } : {};
				let withPicture = picture ? { borderTopLeftRadius: '0', borderBottomLeftRadius: '0' } : {};

				switch (true) {
					case correct && (temp_selected || selected):
						return {
							backgroundColor: '#4BB48E',
							color: '#fff',
							...withPicture
						};
					case temp_selected || selected:
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
				let { selected, temp_selected, correct, percentage } = this;

				let width = percentage ? { width: `calc(${percentage}% - 21px)` } : { width: '0' };

				switch (true) {
					case temp_selected || selected:
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
	.lowOpacity {
		opacity: 0.4;
	}
	.highOpacity {
		opacity: 1;
	}
	.option-reusable {
		position: relative;
		right: 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		align-items: stretch;
		transition: 100ms;

		width: 100%;

		.desktop-bows {
			flex: 0 0 calc(100% - 60px);
		}

		.bows {
			box-sizing: border-box;
			padding: 12px 4px 12px 1px;
			border: 0.5px solid #BCBEC3;
			border-radius: 6px;

			position: absolute;
			right: calc(100% - 54px);
			height: 100%;
			min-width: 60px;

			display: flex;
			justify-content: flex-end;
			align-items: center;
			flex-wrap: nowrap;

			a {
				.bow {
					width: 21px;
					height: 21px;
					background-repeat: no-repeat;
					background-size: cover;
					border-radius: 50%;


				}

				/*&:last-child {*/
				/*	margin: 0 3px;*/
				/*}*/
			}
		}

		.option-wrapper {
			width: calc(100% - 60px);
			display: flex;
			cursor: pointer;
			/*flex-direction: column;*/
			.picture {
				background-repeat: no-repeat;
				background-size: cover;
				background-position: center;
				border: 0.5px solid #BCBEC3;
				border-radius: 6px 0 0 6px;

			}

			.option {
				width: 100%;
				word-break: break-all;

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
