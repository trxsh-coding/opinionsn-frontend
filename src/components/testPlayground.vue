<template>
    <div class="wrapper-box">
	
	    <template v-for="n in 2">
		    <div class="popup-notify error mb-10">
			    <icon-base
					    class="mb-auto"
					    fill="#3d3d3d"
					    width="20"
					    height="20"
					    viewBox="0 0 174.239 174.239"
					    icon-name="icon-error">
				    <icon-error />
			    </icon-base>
			
			    <span class="ml-10 mr-8">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, ipsa!</span>
			
			    <icon-base
					    class="mb-auto"
					    fill="none"
					    stroke="#3d3d3d"
					    width="20"
					    height="20"
					    viewBox="0 0 19 19"
					    icon-name="close">
				    <icon-cross/>
			    </icon-base>
		    </div>
		
		    <div class="popup-notify success mb-10">
			    <icon-base
					    class="mb-auto"
					    fill="#3d3d3d"
					    width="20"
					    height="20"
					    viewBox="0 0 512 512"
					    icon-name="icon-success">
				    <icon-success />
			    </icon-base>
			
			    <span class="ml-10 mr-8">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem est molestiae quas quidem recusandae?</span>
			
			    <icon-base
					    class="mb-auto"
					    fill="none"
					    stroke="#3d3d3d"
					    width="20"
					    height="20"
					    viewBox="0 0 19 19"
					    icon-name="close">
				    <icon-cross/>
			    </icon-base>
		    </div>
		
		    <div class="popup-notify warning mb-10">
			    <icon-base
					    class="mb-auto"
					    fill="#3d3d3d"
					    width="20"
					    height="20"
					    viewBox="0 0 330 330"
					    icon-name="icon-warning">
				    <icon-warning />
			    </icon-base>
			
			    <span class="ml-10 mr-8">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto magnam quibusdam sed? Cupiditate id illum sit.</span>
			
			    <icon-base
					    class="mb-auto"
					    fill="none"
					    stroke="#3d3d3d"
					    width="20"
					    height="20"
					    viewBox="0 0 19 19"
					    icon-name="close">
				    <icon-cross/>
			    </icon-base>
		    </div>
	    </template>
	    

		<option-reusable :percentage="55" :bows="bows" correct :picture="picture" :id="123" @selectOption="selectOption">
			<template>
				Да, потому что киберпанк в моде
			</template>
			<template #badge>
				<badge-reusable :counter="Object.keys(bows).length - 1" :size="21"></badge-reusable>
			</template>
		</option-reusable>

		<hr>

		<picture-reusable :size="60" :img="picture" :counter="6" rounded></picture-reusable>

		<hr>

		<dropdown-list-reusable
				@handleDropdownList="handleDropdownList"
				width="100">

			<template>
				Кино
			</template>

			<template #icon>
				<icon-base
					class="ml-14 mr-4"
					fill="#023F52"
					width="6"
					height="10"
					viewBox="0 0 10 6"
					icon-name="drop-arrow">
					<icon-drop-arrow />
				</icon-base>
			</template>

			<template #items>
				<li>123123123</li>
				<li>456456456</li>
				<li>789789789</li>
			</template>


		</dropdown-list-reusable>

		<hr>

		<button-reusable @click.native="showLog">
			<span>123456</span>
		</button-reusable>

		<hr>

	 

		<div class="test-wrapper">
<!--			<explanation-reusable :explain="explain" :comments="comments"></explanation-reusable>-->

<!--			<popover-reusable attach-point="top-left">-->
<!--				<span>================================================</span>-->
<!--			</popover-reusable>-->

			<circle-progress-bar-reusable :percent="100" bar-size="5" :size="78"/>
		</div>

	    <div class="crimson-div pointer mb-20" @click="createPopup"></div>
	    <div class="blue-div pointer mb-20" @click="showTimerId"></div>
	    
	    <div class="green-div pointer mb-20" @click="getUserRating"></div>

	    <short-poll-reusable type-of-layout="column" :poll="polls[1727]"></short-poll-reusable>
		<switch-component :height="21" :width="34"  :bor-rad="18" color="#B7B9BE"/>
		<el-date-picker></el-date-picker>
	    <loader-reusable></loader-reusable>

	    <textarea v-model="textarea_value" ref="textareaRef"></textarea>
	    
	    <swiper-reusable>
		   
	    </swiper-reusable>

	</div>
</template>

<script>
	import { Message } from 'element-ui';
	import { mapState } from 'vuex';
    import PictureReusable from "./reusableСomponents/PictureReusable";
	import OptionReusable from "./reusableСomponents/OptionReusable";
	import BadgeReusable from "./reusableСomponents/BadgeReusable";
	import DropdownListReusable from "./reusableСomponents/DropdownListReusable";
	import IconBase from "./icons/IconBase";
	import IconDropArrow from "./icons/IconDropArrow";
	import ButtonReusable from "./reusableСomponents/ButtonReusable";
	import ExplanationReusable from "./reusableСomponents/ExplanationReusable";
	import ShortPollReusable from "./reusableСomponents/ShortPollReusable";
	import loadingSpinner from "./reusableСomponents/loadingSpinner";
	import PopoverReusable from "./reusableСomponents/PopoverReusable";
	import CircleProgressBarReusable from "./reusableСomponents/CircleProgressBarReusable";
	import SwitchComponent from "./reusableСomponents/switchComponent";
	import LoaderReusable from "./reusableСomponents/LoaderReusable";
	import SwiperReusable from "@/components/reusableСomponents/swiperReusable";
	import IconWarning from "./icons/IconWarning";
	import IconError from "./icons/IconError";
	import IconSuccess from "./icons/IconSuccess";
	import IconCross from "./icons/IconCross";
	
	import axios from "axios";
	
	export default {
        name: "testPlayground",
		components: {
			SwiperReusable,
			LoaderReusable,
			SwitchComponent,
			CircleProgressBarReusable,
			PopoverReusable,
			ShortPollReusable,
			ExplanationReusable,
			ButtonReusable,
			DropdownListReusable,
			BadgeReusable,
			PictureReusable,
			OptionReusable,
			IconBase,
			IconDropArrow,
			loadingSpinner,
			IconWarning,
			IconError,
			IconSuccess,
			IconCross
		},
		data() {
			return {
				message: undefined,
				timer_id: null,
				statistic: undefined,
				textarea_value: '',
				bows: [
					{
						img: require('./assets/icons/icon-logo.png'),
						url: '/admin/test_playground'
					},
					{
						img: require('./assets/icons/icon-logo.png'),
						url: '/admin/test_playground'
					},
					{
						img: require('./assets/icons/icon-logo.png'),
						url: '/admin/test_playground'
					}
				],
				picture: require('./assets/icons/icon-logo.png'),
				explain: {
					img: require('./assets/icons/icon-logo.png'),
					username: "Oloir",
					explain: "И как же они развращают? Если даже собираются в отдельных местах",
					option: "Нет, я за более традиционные решения, которые ведут к классическим"
				},
				comments: [
					{
						img: require('./assets/icons/icon-logo.png'),
						username: "Oloir",
						comment: "И как же они развращают? Если даже собираются в отдельных местах",
						option: "Нет, я за более традиционные решения, которые ведут к классическим"
					},
					{
						img: require('./assets/icons/icon-logo.png'),
						username: "Oloir",
						comment: "И как же они развращают? Если даже собираются в отдельных местах",
						option: "Нет, я за более традиционные решения, которые ведут к классическим"
					},
					{
						img: require('./assets/icons/icon-logo.png'),
						username: "Oloir",
						comment: "И как же они развращают? Если даже собираются в отдельных местах",
						option: "Нет, я за более традиционные решения, которые ведут к классическим"
					},
				]
			}
		},
		watch: {
			textarea_value() {
				this.calcHeight(this.$refs.textareaRef);
			}
		},
		computed: {

			...mapState('globalStore', {
				polls: ({polls}) =>polls,
			}),

		},
		methods: {
			
			createPopup() {
				this.$popup.insert('messages', {message: 'ОШИБКА!!!', type: 'warning'})
			},

        	executeTimeout() {
		        let runTimeout = () => {
		        	this.timer_id = setTimeout(() => { console.log('==QWERTY==') }, 1000);
		        };
		        runTimeout();
	        },

			showTimerId() {
				clearTimeout(this.timer_id);
			},

			selectOption(id) {
				console.log(id);
			},
			
			handleDropdownList(isListVisible) {
				console.log('isListVisible', isListVisible);
			},
			
			showLog() {
				console.log('===LOG===');
			},
			
			calcHeight(el) {
				el.style.height = 'auto';
				let calculated = el.offsetHeight + el.scrollHeight - el.clientHeight;
				el.style.height = calculated + 'px';
			},
			
			getUserRating() {
				// axios.get(`${process.env.VUE_APP_MAIN_API}/rest/v1/user/rating/1?month=6&year=2019`)
				// 	.then(({data}) => { this.statistic = data })
				axios.get(`${process.env.VUE_APP_MAIN_API}/rest/v1/user/rating/kek`)
					.then(({data}) => { this.statistic = data })
			}
			
		},
	}
</script>

<style lang="scss">
	.wrapper-box {
		width: 100%;
		
		.popup-notify {
			width: 380px;
			min-height: 48px;
			border-radius: 6px;
			padding: 15px 10px;
			display: flex;
			align-items: center;
			word-break: break-all;
			color: #3d3d3d;
			
			&.error {
				background: #ff000026;
			}
			
			&.success {
				background: #00ff2b26;
			}
			
			&.warning {
				background: #fafa0026;
			}
			
		}

		.crimson-div {
			width: 40px;
			height: 40px;
			background-color: crimson;
		}

		.blue-div {
			position: fixed;
			left: 20%;
			width: 40px;
			height: 40px;
			background-color: blue;
		}
		
		.green-div {
			position: fixed;
			left: 30%;
			width: 40px;
			height: 40px;
			background-color: green;
		}

		.test-wrapper {
			position: relative;
			width: 300px;
			height: 300px;

			margin-left: 50%;
			transform: translateX(-50%);
		}

		.dropdown-list-reusable {
			left: 100px;
		}

	}

	textarea {
		width: 200px;
		height: 40px;
		overflow: scroll;
		resize: none;
	}
</style>
