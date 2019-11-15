<template>
	<div v-if="poll" class="option-instance" ref="containerRef" :style="[transform_shift, optionWrapper]">

		<div class="bows-bar text-deselect px-6" ref="bowsRef" :class="{'invisible': !voted, 'pl-8': swiped}"
		     :style="[optionStyle, bowsBarStyle, {backgroundColor: 'unset !important'}]"
		     @touchstart="trackInteractionStart" @touchmove="trackInteraction" @touchend="trackInteractionEnd"
		     @mouseover="trackInteraction" @mouseleave="trackInteractionEnd">

			<template v-if="bows_length">

				<router-link v-if="bows_length" v-show="!swiped" :event="swiped ? '' : 'click'"
				             class="flex pointer bow bow-1 mx-2" :to="getUserLink(Object.values(option.bows)[0].id)">
					<RePicture :url="Object.values(option.bows)[0].pathToAvatar | addAssetsPath" size="21" rounded/>
				</router-link>

				<router-link v-show="!swiped" v-if="bows_length === 2" class="flex pointer bow bow-2 mx-2"
				             :event="swiped ? '' : 'click'"
				             :to="getUserLink(Object.values(option.bows)[1].id)">
					<RePicture :url="Object.values(option.bows)[1].pathToAvatar | addAssetsPath" size="21"
					           rounded/>
				</router-link>

				<div v-if="bows_length > 2" v-show="!swiped">
					<slot name="badge"/>
				</div>

				<ReSwiper v-if="bows_length > 2" :type="mobile ? 'scroll' : 'usual'"
				          :class="{'pr-10': !mobile && swiped}"
				          :params="{height: 'fit-content', width: swiped ? '100%' : 'fit-content', stubLength: swiped && 1, reverse: true}"
				          :usual-swiper-options="{slidesPerView: 'auto'}">
					<template #scroll>
						<router-link v-for="({id, pathToAvatar}, index) in option.bows" :key="'scroll_bow_id-' + index"
						             v-show="swiped || index === 0" :to="getUserLink(id)" class="bow mx-2 flex pointer">
							<RePicture type="background" :url="pathToAvatar | addAssetsPath" size="21" rounded/>
						</router-link>
					</template>

					<template #usual>
						<swiper-slide v-for="({id, pathToAvatar}, index) in option.bows" class="fit mx-2"
						              v-show="swiped || index === 0" :key="'usual_bow_id-' + index">
							<router-link :to="getUserLink(id)" class="bow flex pointer">
								<RePicture :url="pathToAvatar | addAssetsPath" size="21" rounded/>
							</router-link>
						</swiper-slide>
					</template>
				</ReSwiper>

			</template>
		</div>

		<button @click="setRightOption"
		        v-if="mainUser.authorities === 'ADMIN'
		        && is_prediction
		        && !isClosed">✓
		</button>

		<div class="option-wrapper pointer text-deselect"
		     :class="{'with-button': mainUser.authorities === 'ADMIN' && is_prediction && !isClosed}">

			<div v-if="picture && picture.slice(-4) !== 'null'" @click="$emit('onPictureClick')"
			     class="picture" :style="pictureStyle"></div>

			<div class="option" :style="optionStyle" @click="selectOption">

				<span class="text">
					<slot></slot>
				</span>

				<span v-if="Number.isInteger(percentage)" class="percentage-block">
					{{percentage}}%
				</span>

				<div class="progress-bar flex">
					<div class="line" :style="progressBarStyle"></div>
				</div>
			</div>

		</div>

	</div>
</template>

<script>
	import InvolvedUsersPanel from "../pollFeed/layout/involvedUsersPanel";
	import {mapState} from "vuex";
	import {userVote, judgeVote} from "../../EOSIO/eosio_impl_light";
	import ReSwiper from "@/components/reusableСomponents/ReSwiper";
	import RePicture from "@/components/reusableСomponents/RePicture";

	export default {
		name: "OptionInstance",
		components: {RePicture, ReSwiper, InvolvedUsersPanel},
		data() {
			return {
				publicPath: process.env.VUE_APP_ASSETS,
				initialCoord: 0,
				block_width: null,
				difference: 0,
				transform_px: 0,
				transform_limit: undefined,
				swiped: false,
				swipe_in_progress: false,
				timerId: null
			}
		},
		props: {
			payload: Object,
			poll: Object,
			option: Object,
			disabled: Boolean,
			pictureSize: {
				type: Number,
				default() {
					return 90;
				}
			},
		},

		beforeDestroy() {
			this.$root.temp_selected_option = null;
		},

		methods: {

			getUserLink(id) {
				return {name: 'user', params: {id}}
			},

			selectOption() {

				switch (true) {
					case !this.logged_in:
						if (this.$route.name === 'singlePoll') {
							let categoryId = this.poll && this.poll.categories;
							this.$router.push({
								name: 'registration',
								query: {redirectToPoll: this.$route.params.id, categoryId}
							}, () => {
								this.$popup.insert('messages', {
									message: `Зарегестрируйтесь чтобы проголосовать в опросе: "${this.poll.subject}"`,
									type: 'warning',
									timeless: true
								});
							});
						} else {
							this.$router.push({name: 'sign'}, () => {
								this.$popup.insert('messages', {
									message: 'Для выполнения действий необходимо авторизоваться!',
									type: 'warning',
									timeless: true
								});
							});
						}
						return;
					case this.voted:
						this.resetBowsBar();
						return;
					case this.expired:
					case this.disabled:
						return;
				}

				if (!this.$root.timer_duration && !this.$root.timer_id) {

					let {id: poll_id, type_of_poll} = this.poll;
					let selected_variable = this.option.id;

					const runTimeout = () => {

						if (this.has_access) {
							this.$root.timer_duration = 3000;

							this.$root.timer_id = setTimeout(async () => {

								try {
									await this.$store.dispatch(`${this.$route.name === 'user' ? 'userFeed' : this.$route.name}/createVote`, {
										data: {
											selected_variable,
											poll_id,
											type_of_poll
										}
									});
									this.$root.timer_id = null;
									this.$root.timer_duration = 0;
								} catch (e) {
									console.error(e);
								}

							}, this.$root.timer_duration);
							this.$root.temp_selected_option = selected_variable;
						}
					};

					if (type_of_poll === 2) {
						userVote(poll_id, this.mainUser.id, this.option.description)
							.then(() => runTimeout())
							.catch(() => console.error("Error voting in EOSIO forecast"));
					} else {
						runTimeout();
					}
				}

			},

			setRightOption() {
				let selected_variable = this.option.id;
				let {id: poll_id, type_of_poll} = this.poll;

				switch (type_of_poll) {
					case 2:
						judgeVote(poll_id, this.mainUser.id, this.option.description)
							.then(() => {
								this.$store.dispatch('pollFeed/setRightOption', {data: {selected_variable, poll_id}})
									.then(({status}) => {
										if (status === 200) {
											this.$popup.insert('messages', [{
												message: 'Вариант выбран успешно!',
												type: 'success'
											}]);
										} else {
											this.$popup.insert('messages', [{
												message: 'При выборе опции произошла ошибка!',
												type: 'error'
											}]);
										}
									})
							})
							.catch(() => console.error("Judgevote on EOSIO exception"));
						break;
					case 1:
						this.$store.dispatch('pollFeed/setRightOption', {data: {selected_variable, poll_id}})
							.then(({status}) => {
								if (status === 200) {
									this.$popup.insert('messages', [{
										message: 'Вариант выбран успешно!',
										type: 'success'
									}]);
								} else {
									this.$popup.insert('messages', [{
										message: 'При выборе опции произошла ошибка!',
										type: 'error'
									}]);
								}
							});
						break;
					default:
						return;
				}
			},

			resetBowsBar() {

				this.transform_px = 0;
				this.swipe_in_progress = true;
				setTimeout(() => {
					this.swiped = false;
					this.swipe_in_progress = false;
				}, 150)

			},

			trackInteractionStart(e) {

				if (!this.swiped && Object.keys(this.option.bows).length > 2) {
					this.swipe_in_progress = true;

					let {clientX} = e.touches[0];

					if (clientX < 0) clientX = 0;
					if (clientX > this.block_width) clientX = this.block_width;

					this.transform_limit = this.$refs.containerRef.offsetWidth - 54;

					if (this.initialCoord === 0) this.initialCoord = clientX;
					this.difference = clientX - this.initialCoord;
				}
			},

			trackInteraction(e) {

				// Keep swiped if interaction end timeout is exist
				if (Number.isInteger(this.timerId)) {
					clearTimeout(this.timerId);
					this.timerId = null;
				}

				if (!this.swiped && Object.keys(this.option.bows).length > 2) {

					// Get panel width
					this.block_width = (25 * Object.keys(this.option.bows).length);

					// Set transform value
					let transform_value = this.block_width + 23 - 54;

					// Touch event check
					if (e.type === 'touchmove') {

						let {initialCoord, block_width, transform_limit} = this;

						let {clientX} = e.touches[0];

						if (clientX < Math.trunc(block_width * 0.1)) clientX = Math.trunc(block_width * 0.1);
						if (clientX > block_width) clientX = block_width;

						let difference = clientX - initialCoord;

						transform_limit = transform_limit - 54;
						transform_value = (transform_value > transform_limit) ? transform_limit : transform_value;

						if (difference > 50) {
							this.transform_px = transform_value;
							this.swiped = true;
							this.swipe_in_progress = false;
						}

						this.difference = difference;

					} else {

						if (!this.mobile) {
							this.transform_px = transform_value;
							this.swiped = true;
							this.swipe_in_progress = false;
						}

					}

				}
			},

			trackInteractionEnd(e) {

				// Touch event check
				if (e.type === 'touchend') {

					if (this.difference <= 50) {
						this.swiped = false;
						this.swipe_in_progress = false;
						this.transform_px = 0;
					}

				} else {

					// add short delay for smooth behavior
					this.timerId = setTimeout(this.resetBowsBar, 300);

				}

			},

		},
		computed: {

			...mapState("globalStore", {
				mainUser: state => state.mainUser
			}),

			mobile() {
				return this.$root.mobile;
			},

			logged_in() {
				return !!Object.keys(this.mainUser).length;
			},

			is_prediction() {
				return this.poll.type_of_poll === 1 || this.poll.type_of_poll === 2;
			},

			has_access() {
				switch (true) {
					case this.logged_in:
					case Number.isInteger(this.mainUser.id):
					case !this.expired:
					case !this.voted:
						return true;
					default:
						return false;
				}
			},

			temp_selected() {
				return this.$root.temp_selected_option === this.id;
			},

			expired() {
				return this.poll.votingOver
			},

			voted() {
				return this.payload.voted
			},

			correct() {
				return this.poll.correct_option === this.option.id
			},

			isClosed() {
				return this.poll.correct_option !== -1;
			},

			selected() {
				return this.payload.selectedOption === this.option.id
			},

			picture() {
				return this.option.picture ? this.publicPath + this.option.picture : null
			},

			percentage() {
				return this.voted ? this.option.voted_percentage : null
			},

			bows_length() {
				return Object.keys(this.option.bows).length
			},

			transform_shift() {
				return {
					// transform: `translateX(${this.$refs.bowsRef.offsetWidth + 54}px)`
					transform: `translateX(${this.transform_px}px)`
				}
			},

			optionWrapper() {
				let {selected, expired, correct} = this;
				let {type_of_poll} = this.poll;

				switch ((type_of_poll === 2 || type_of_poll === 1) && expired) {
					case selected && correct:
						return {opacity: '1'};
					case selected:
						return {opacity: '1'};
					default:
						return {opacity: '0.4'};
				}

			},

			bowsBarStyle() {
				let {transform_limit} = this;

				transform_limit = !!transform_limit ? {maxWidth: `${transform_limit}px`} : {};

				return transform_limit;
			},


			optionStyle() {
				let {selected, temp_selected, correct, picture, prediction} = this;

				let opacity = prediction ? {opacity: '0.3'} : {};
				let with_picture = picture ? {borderTopLeftRadius: '0', borderBottomLeftRadius: '0'} : {};

				switch (true) {
					case correct && (temp_selected || selected):
						return {
							backgroundColor: '#4BB48E',
							color: '#fff',
							...with_picture
						};
					case temp_selected || selected:
						return {
							backgroundColor: '#4B97B4',
							color: '#fff',
							...with_picture
						};
					case correct:
						return {
							backgroundColor: '#4BB48E',
							color: '#fff',
							...opacity,
							...with_picture
						};
					default:
						return {
							...opacity,
							...with_picture
						};
				}
			},

			progressBarStyle() {
				let {selected, temp_selected, correct, percentage} = this;

				let width = percentage ? {flex: `0 0 ${percentage}%`} : {display: 'none'};

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
				let {picture, pictureSize} = this;

				return {
					backgroundImage: `url('${picture}')`,
					flex: `0 0 ${pictureSize}px`,
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

	.option-instance {
		position: relative;
		right: 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		align-items: stretch;
		/*transition: 100ms;*/
		width: 100%;
		transition: 300ms;

		.desktop-bows {
			flex: 0 0 calc(100% - 60px);
		}

		.bows-bar {
			box-sizing: border-box;
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

			.bow {
				flex-shrink: 0;
			}

			.bow-1 {
				order: 1;
			}
		}

		.option-wrapper {
			width: calc(100% - 60px);
			display: flex;

			&.with-button {
				width: calc(100% - 82px);
			}

			.picture {
				background-repeat: no-repeat;
				background-size: cover;
				background-position: center;
				border: 0.5px solid #BCBEC3;
				border-radius: 6px 0 0 6px;

			}

			.option {
				width: 100%;
				/*word-break: break-all;*/

				position: relative;
				padding: 14.5px 9px 14.5px 12px;
				border: 1px solid #BCBEC3;
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
					width: calc(100% - 21px);

					.line {
						background-color: #BCBEC3;
					}
				}
			}

		}


	}
</style>
