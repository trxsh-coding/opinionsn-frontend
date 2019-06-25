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

		<picture-reusable :size="60" :img="picture" :counter="6" bor-rad="50%"></picture-reusable>

		<dropdown-list-reusable>

			<template #items>
				<li>123123123</li>
				<li>456456456</li>
				<li>789789789</li>
			</template>


		</dropdown-list-reusable>

	</div>
</template>

<script>
    import PictureReusable from "./reusableСomponents/PictureReusable";
	import OptionReusable from "./reusableСomponents/OptionReusable";
	import BadgeReusable from "./reusableСomponents/BadgeReusable";
	import DropdownListReusable from "./reusableСomponents/DropdownListReusable";

	export default {
        name: "testPlayground",
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
		components: {
			DropdownListReusable,
			BadgeReusable,
			PictureReusable,
			OptionReusable
		},
		methods: {
			selectOption(id) {
				console.log(id);
			}
		},
	}
</script>

<style scoped lang="scss">
	.wrapper-box {
		width: 100%;
	}
</style>