<template>
	<div class="involved_users-panel">
		<slot name="description">
			<lang-string class="panel-caption" :title="'already_voted'">
				<template #text>
					:
				</template>
			</lang-string>
		</slot>
		
		<ReSwiper type="scroll" class="mt-9" :params="{stubLength: 1}">
			<template #scroll>
				<router-link v-for="(value, key) in users" :to="'/user/' + key">
					<ReBow :width="27" :height="27" :img="value" :id="key" />
				</router-link>
			</template>
		</ReSwiper>
	
	</div>
</template>

<script>
	import langString from '../../langString'
	import imageMixin from '../../mixins/imageMixin'
	import ReBow from "../../reusableСomponents/ReBow";
	import ReSwiper from "@/components/reusableСomponents/ReSwiper";
	
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
			ReSwiper,
			ReBow,
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
			color: #1A1E22;
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
