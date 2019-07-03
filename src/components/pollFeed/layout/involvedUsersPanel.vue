<template>
    <div class="involved_users-panel">

		<lang-string class="panel-caption" :title="'friends_who_voted_in_this_poll'">
			<template #text>
				:
			</template>
		</lang-string>

		<scroll-swiper-reusable class="mt-9" :stub-length="1">

			<router-link v-for="(value, key) in users" :to="'/user/' + key">
				<div
					class="user-picture pointer picture-22x22 rounded"
					:style="{ 'background-image': 'url(' + publicPath + imageUtil(value, 'S') + ')' }" ></div>
			</router-link>

		</scroll-swiper-reusable>

	</div>
</template>

<script>
	import langString from '../../langString'
	import imageMixin from '../../mixins/imageMixin'
	import ScrollSwiperReusable from "../../reusableСomponents/ScrollSwiperReusable";
    export default {
        name: "involvedUsersPanel",
		mixins:[imageMixin],
		data() {
			return {
				publicPath: process.env.VUE_APP_MAIN_API,
				swiperOption: {
					slidesPerView: 2.7,
					spaceBetween: 10,
					width: 22,
					breakpoints: {
						// when window width is <= 320px
						765: {
							slidesPerView: 'auto'
						}
					}
				}
			}
		},
		props: ['users'],
		components: {
			ScrollSwiperReusable,
			langString
		}
    }
</script>

<style lang="scss" scoped>
	.involved_users-panel {

		.panel-caption {
			font-family: Roboto;
			font-style: normal;
			font-weight: normal;
			font-size: 13px;
			color: #828D92;
		}

		.user-picture-wrapper {
			width: unset !important;
			height: unset !important;
		}


	}
</style>
