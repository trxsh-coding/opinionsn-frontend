<template>
	<div class="involved_users-panel">
		<slot name="description">
			<lang-string class="panel-caption" :title="'friends_who_voted_in_this_poll'">
				<template #text>
					:
				</template>
			</lang-string>
		</slot>
		
		
		<ScrollSwiper class="mt-9" :stub-length="1">
			
			<router-link v-for="(value, key) in users" :to="'/user/' + key">
				<bow-reusable :width="27" :height="27" :img="value" :id="key">
				
				</bow-reusable>
			</router-link>
		
		</ScrollSwiper>
	
	</div>
</template>

<script>
	import langString from '../../langString'
	import imageMixin from '../../mixins/imageMixin'
	import ScrollSwiper from "../../reusableСomponents/ScrollSwiper";
	import BowReusable from "../../reusableСomponents/bowReusable";
	
	export default {
		name: "involvedUsersPanel",
		mixins: [imageMixin],
		data() {
			return {
				publicPath: process.env.VUE_APP_ASSETS,
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
			BowReusable,
			ScrollSwiper,
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
		
		.user-picture {
			width: 27px;
			height: 27px;
			background-repeat: no-repeat;
			background-size: cover;
			
			&.is_mobile_device {
				width: 22px;
				height: 22px;
				background-repeat: no-repeat;
				background-size: cover;
			}
		}
		
		@media only screen and (min-width: 300px) and (max-width: 765px) {
			.user-picture {
				width: 22px;
				height: 22px;
				background-repeat: no-repeat;
				background-size: cover;
			}
		}
	}
</style>
