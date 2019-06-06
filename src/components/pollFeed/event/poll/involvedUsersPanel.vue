<template>
    <div class="involved_users-panel">

		<lang-string class="panel-caption" :title="'poll_bows_caption'"/>

		<swiper class="mt-5" :options="swiperOption">
			<swiper-slide class="user-picture-wrapper" v-for="(value, key) in users" :key="i">

				<router-link :to="'/user/' + key">
					<div
						class="user-picture pointer picture-22x22 rounded"
						:style="{ 'background-image': 'url(' + value + ')' }" />
				</router-link>

			</swiper-slide>
		</swiper>

	</div>
</template>

<script>
	import langString from '../../../langString'

    export default {
        name: "involvedUsersPanel",
		data() {
			return {
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