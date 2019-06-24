<template>
    <div class="wrapper-box">
		<picture-reusable :img="require('../assets/logo.png')" :size="60" textLayout="left" :counter="10" bor-rad="50%">
			<template #title>
				qwerty
			</template>
			<template #description>
				qwertydsdfs
			</template>
		</picture-reusable>
	</div>
</template>

<script>
    import PictureReusable from "./reusableСomponents/PictureReusable";

	export default {
        name: "testPlayground",
		components: {
			PictureReusable
		},
		mounted() {
			console.log(require('../assets/logo.png'));
			console.log(this.picture);
		}
	}
</script>

<style scoped lang="scss">
	.wrapper-box {
		width: 100%;
	}
</style>