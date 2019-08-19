<template>
	<div class="option-reusable" ref="containerRef" :style="[transform_shift, optionWrapper]">
		
		<div v-if="bows && mobile"
		     class="bows-bar"
		     ref="bowsRef"
		     :class="{'invisible': !voted, 'pl-8': swiped}"
		     :style="[optionStyle, bowsBarStyle, {backgroundColor: 'unset !important'}]"
		     @touchstart="trackTouchStart"
		     @touchmove="trackTouchMove"
		     @touchend="trackTouchEnd">
			
			<slot v-if="Object.keys(bows).length > 2 && !swiped" name="badge"></slot>
			
			<scroll-swiper-reusable
					v-if="Object.keys(bows).length > 2"
					height="100%"
					:width="swiped ? '100%' : 'fit-content'"
					:stub-length="swiped && 1"
					class="bows-slider">
				<div
						v-for="(value, key, index) in bows" :to="'/user/' + key"
						v-show="swiped || index === 0"
						@click="swiped && $router.push({name: 'user', params: { id: key }})"
						class="bow mx-2 h-21 w-21"
						:style="{backgroundImage: `url('${publicPath + value}')`}"></div>
			</scroll-swiper-reusable>
			
			<div
					v-if="Object.keys(bows).length < 2"
					@click="swiped && $router.push({name: 'user', params: { id: Object.keys(bows)[0] }})"
					class="bow mx-2 h-21 w-21"
					:style="{backgroundImage: `url('${publicPath + Object.values(bows)[0]}')`}"></div>
		</div>
		
		<button @click="setRightOption(id, poll_id)" v-if="mainUser.authorities === 'ADMIN' && type_of_poll !== 0">✓
		</button>
		
		<div
				class="option-wrapper"
				:class="{'pointer': !voted, 'with-button': mainUser.authorities === 'ADMIN' && type_of_poll !== 0}"
				@click="selectOption(id)">
				<div v-if="picture && picture.slice(-4) !== 'null'" class="picture" :style="pictureStyle" @click="onPictureClick"></div>

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
	import {mainUser} from "../../store/modules/mainUser";
	import ScrollSwiperReusable from "@/components/reusableСomponents/ScrollSwiperReusable";
	import ReusableModal from "./reusableModal";

	export default {
		name: "OptionReusable",
		components: {ReusableModal, ScrollSwiperReusable, InvolvedUsersPanel},
		data() {
			return {
				publicPath: process.env.VUE_APP_MAIN_API,
				initialCoord: 0,
				block_width: null,
				difference: 0,
				transform_px: 0,
				transform_limit: undefined,
				swiped: false,
				swipe_in_progress: false,
				showModal:false
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
			expired: Boolean,
			description:String,
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
			onPictureClick(){
				this.$emit('picture-click', this.picture.slice(4, this.picture.length), this.description)
			},
			openModal(){
				this.showModal = true
			},

			selectOption(selected_variable) {
				
				if (this.voted) this.resetBowsBar();

				if (this.voted || !this.logged_in || this.expired || this.optionsVisible === false) return;

				if (!this.$root.timer_duration && !this.$root.timer_id) {

					const runTimeout = () => {

						if (this.accessCheck) {
							let {poll_id, type_of_poll, mainUser} = this;
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

					if (this.type_of_poll === 2) {
						userVote(this.poll_id, mainUser.id, selected_variable)
							.then(() => runTimeout())
							.catch(() => console.log("Error voting in EOSIO forecast"));
					} else {
						runTimeout();
					}
				}

			},
			
			setRightOption(option_id, poll_id) {
				let {mainUser, type_of_poll} = this;
				
				switch (type_of_poll) {
					case 2:
						judgevote(poll_id, mainUser.id, option_id)
							.then(() => {
								this.$store.dispatch('pollFeed/setRightOption', {data: {option_id, poll_id}})
									.then(status => {
										if (status === 200) {
											this.$popup.insert('messages', [{message: 'Вариант выбран успешно!', type: 'success'}]);
										} else {
											this.$popup.insert('messages', [{message: 'При выборе опции произошла ошибка!', type: 'error'}]);
										}
									})
							})
							.catch(() => console.log("Judgevote on EOSIO exception"));
						break;
					case 1:
						this.$store.dispatch('pollFeed/setRightOption', {data: {option_id, poll_id}})
							.then(status => {
								if (status === 200) {
									this.$popup.insert('messages', [{message: 'Вариант выбран успешно!', type: 'success'}]);
								} else {
									this.$popup.insert('messages', [{message: 'При выборе опции произошла ошибка!', type: 'error'}]);
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
				if (!this.swiped && Object.keys(this.bows).length > 2) {
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
				if (!this.swiped && Object.keys(this.bows).length > 2) {
					
					let {initialCoord, block_width, transform_limit} = this;
					let {clientX} = e.touches[0];
					
					this.block_width = (25 * Object.keys(this.bows).length);
					
					if (clientX < Math.trunc(block_width * 0.1)) clientX = Math.trunc(block_width * 0.1);
					if (clientX > block_width) clientX = block_width;
					
					let difference = clientX - initialCoord;
					let transform_value = block_width - 54;
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
				
				let s = {};
				
				switch (type_of_poll == 1 && expired) {
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
			
			filteredBows() {
				
				let {bows, enough_difference} = this;
				
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
				let {selected, temp_selected, correct, prediction, picture} = this;
				
				let opacity = prediction ? {opacity: '0.3'} : {};
				let withPicture = picture ? {borderTopLeftRadius: '0', borderBottomLeftRadius: '0'} : {};
				
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
