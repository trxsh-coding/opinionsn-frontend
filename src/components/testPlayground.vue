<template>
    <div class="wrapper-box">

		<option-reusable :percentage="55" :bows="bows" correct :picture="picture" :id="123" @selectOption="selectOption">
			<template>
				Да, потому что киберпанк в моде
			</template>
			<template #badge>
				<badge-reusable :counter="Object.keys(bows).length - 1" :size="21"></badge-reusable>
			</template>
		</option-reusable>

		<picture-reusable :size="60" :img="picture" :counter="6" rounded></picture-reusable>

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

			<!--	class="ml-14 mr-4"  -->

			<template #items>
				<li>123123123</li>
				<li>456456456</li>
				<li>789789789</li>
			</template>


		</dropdown-list-reusable>

		<button-reusable>
			<span>123456</span>
		</button-reusable>

	</div>
</template>

<script>
    import PictureReusable from "./reusableСomponents/PictureReusable";
	import OptionReusable from "./reusableСomponents/OptionReusable";
	import BadgeReusable from "./reusableСomponents/BadgeReusable";
	import DropdownListReusable from "./reusableСomponents/DropdownListReusable";
	import IconBase from "./icons/IconBase";
	import IconDropArrow from "./icons/IconDropArrow";
	import ButtonReusable from "./reusableСomponents/ButtonReusable";


	export default {
        name: "testPlayground",
		components: {
			ButtonReusable,
			DropdownListReusable,
			BadgeReusable,
			PictureReusable,
			OptionReusable,
			IconBase,
			IconDropArrow
		},
		data() {
			return {
				bows: [
					{
						img: require('../assets/logo.png'),
						url: '/admin/test_playground'
					},
					{
						img: require('../assets/logo.png'),
						url: '/admin/test_playground'
					},
					{
						img: require('../assets/logo.png'),
						url: '/admin/test_playground'
					}
				],
				picture: require('./reusableСomponents/pic.png')
			}
		},
		methods: {
			selectOption(id) {
				console.log(id);
			},
			handleDropdownList(isListVisible) {
				console.log('isListVisible', isListVisible);
			}
		},
	}
</script>

<style scoped lang="scss">
	.wrapper-box {
		width: 100%;

	}
</style>