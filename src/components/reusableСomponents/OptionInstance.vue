<template>
	<div class="option-instance" ref="containerRef" :style="[transform_shift, optionWrapper]">
		
		<div v-if="mobile"
		     class="bows-bar"
		     ref="bowsRef"
		     :class="{'invisible': !voted, 'pl-8': swiped}"
		     :style="[optionStyle, bowsBarStyle, {backgroundColor: 'unset !important'}]"
		     @touchstart="trackTouchStart"
		     @touchmove="trackTouchMove"
		     @touchend="trackTouchEnd">
			
			<template v-if="option.bows">
				
				<template v-if="!swiped">
					<div v-if="bows_length <= 2" @click="$router.push({name: 'user', params: { id: Object.keys(option.bows)[0] }})" class="bow bow-1 mx-2 h-21 w-21"
					     :style="{backgroundImage: `url('${publicPath + Object.values(option.bows)[0]}')`}"></div>
					
					<div v-if="bows_length === 2" @click="$router.push({name: 'user', params: { id: Object.keys(option.bows)[1] }})" class="bow mx-2 h-21 w-21"
					     :style="{backgroundImage: `url('${publicPath + Object.values(option.bows)[1]}')`}"></div>
					
					<slot v-if="bows_length > 2" name="badge"></slot>
					
				</template>
				
				<ReSwiper v-if="bows_length > 2" type="scroll" class="bows-slider"
				          :params="{height: '100%', width: swiped ? '100%' : 'fit-content', stubLength: swiped && 1, reverse: true}">
					<template #scroll>
						<div
								v-for="(value, key, index) in option.bows" :to="'/user/' + key"
								v-show="swiped || index === 0"
								@click="swiped && $router.push({name: 'user', params: { id: key }})"
								class="bow mx-2 h-21 w-21"
								:style="{backgroundImage: `url('${publicPath + value}')`}"></div>
					</template>
				</ReSwiper>
				
			</template>
		</div>
		
		<button @click="setRightOption"
		        v-if="mainUser.authorities === 'ADMIN' && is_prediction">✓
		</button>
		
		<div
				class="option-wrapper"
				:class="{'pointer': !voted, 'with-button': mainUser.authorities === 'ADMIN' && is_prediction}">
			<div v-if="picture && picture.slice(-4) !== 'null'" @click="$emit('onPictureClick')"
			     class="picture" :style="pictureStyle"></div>
			
			<div class="option" :style="optionStyle" @click="selectOption">

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
			<involved-users-panel :users="option.bows" v-if="Object.keys(option.bows).length > 0">
				<template #description>
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
	import ReSwiper from "@/components/reusableСomponents/ReSwiper";
	
	export default {
		name: "OptionInstance",
		components: {ReSwiper, InvolvedUsersPanel},
		data() {
			return {
				publicPath: process.env.VUE_APP_ASSETS,
				initialCoord: 0,
				block_width: null,
				difference: 0,
				transform_px: 0,
				transform_limit: undefined,
				swiped: false,
				swipe_in_progress: false
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
			
			selectOption() {
				
				switch (true) {
					case !this.logged_in:
						if (this.$route.name === 'singlePoll') {
							this.$router.push({name: 'sign', query: {redirectToPoll: this.$route.params.id}}, () => {
								this.$popup.insert('messages', {
									message: `Авторизуйтесь чтобы проголосовать в опросе: "${this.poll.subject}"`,
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
							this.$root.timer_duration = 5000;
							
							this.$root.timer_id = setTimeout(() => {
								
								this.$store.dispatch(`${this.$route.name}/createVote`, {
									data: {
										selected_variable,
										poll_id,
										type_of_poll
									}
								})
									.then(() => {
										this.$root.timer_id = null;
										this.$root.timer_duration = 0;
									});
							}, 5000);
							this.$root.temp_selected_option = selected_variable;
						}
					};
					
					if (type_of_poll === 2) {
						userVote(poll_id, mainUser.id, selected_variable)
							.then(() => runTimeout())
							.catch(() => console.log("Error voting in EOSIO forecast"));
					} else {
						runTimeout();
					}
				}
				
			},
			
			setRightOption() {
				let {mainUser} = this;
				let selected_variable = this.option.id;
				let {id: poll_id, type_of_poll} = this.poll;
				
				switch (type_of_poll) {
					case 2:
						judgevote(poll_id, mainUser.id, selected_variable)
							.then(() => {
								this.$store.dispatch('pollFeed/setRightOption', {data: {selected_variable, poll_id}})
									.then(status => {
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
							.catch(() => console.log("Judgevote on EOSIO exception"));
						break;
					case 1:
						this.$store.dispatch('pollFeed/setRightOption', {data: {selected_variable, poll_id}})
							.then(status => {
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
				setTimeout(() => {
					this.swiped = false;
					this.swipe_in_progress = false;
				}, 300)
			},
			
			trackTouchStart(e) {
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
			
			trackTouchMove(e) {
				e.preventDefault();
				if (!this.swiped && Object.keys(this.option.bows).length > 2) {
					
					let {initialCoord, block_width, transform_limit} = this;
					let {clientX} = e.touches[0];
					
					this.block_width = (25 * Object.keys(this.option.bows).length);
					
					if (clientX < Math.trunc(block_width * 0.1)) clientX = Math.trunc(block_width * 0.1);
					if (clientX > block_width) clientX = block_width;
					
					let difference = clientX - initialCoord;
					let transform_value = block_width + 23 - 54;
					transform_limit = transform_limit - 54;
					transform_value = (transform_value > transform_limit) ? transform_limit : transform_value;
					
					if (difference > 50) {
						this.transform_px = transform_value;
						this.swiped = true;
						this.swipe_in_progress = false;
					}
					
					this.difference = difference;
				}
			},
			
			trackTouchEnd(e) {
				if (this.difference <= 50) {
					this.swiped = false;
					this.swipe_in_progress = false;
					this.transform_px = 0;
				}
			}
			
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
				let s = {};
				
				switch (this.poll.type_of_poll == 1 && expired) {
					case selected && correct:
						s = {...s, opacity: '1'};
						break;
					case selected:
						s = {...s, opacity: '1'};
						break;
					default:
						s = {...s, opacity: '0.4'};
						break;
				}
				
				return s;
				
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
				
				let width = percentage ? {width: `calc(${percentage}% - 21px)`} : {width: '0'};
				
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
			padding-left: 3px;
			padding-right: 6px;
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
				width: 21px;
				height: 21px;
				background-repeat: no-repeat;
				background-size: cover;
				border-radius: 50%;
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
