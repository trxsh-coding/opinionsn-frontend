<template>
    <div class="wrapper-box">
		<loading-spinner></loading-spinner>

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

		<dropdown-list-reusable @handleDropdownList="handleDropdownList">

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

		<short-poll-reusable type-of-layout="column" :poll="polls[1727]"></short-poll-reusable>

	</div>
</template>

<script>

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




	export default {
        name: "testPlayground",
		components: {
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
			loadingSpinner
		},
		data() {
			return {
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
		computed: {

			...mapState('globalStore', {
				polls: ({polls}) =>polls,
			}),

		},
		methods: {
			selectOption(id) {
				console.log(id);
			},
			handleDropdownList(isListVisible) {
				console.log('isListVisible', isListVisible);
			},
			showLog() {
				console.log('===LOG===');
			}
		},
	}
</script>

<style scoped lang="scss">
	.wrapper-box {
		width: 100%;

		.test-wrapper {
			position: relative;
			width: 300px;
			height: 300px;

			margin-left: 50%;
			transform: translateX(-50%);
		}

	}
</style>
