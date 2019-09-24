<template>
	<div class="involved_users-panel">
		<slot name="description">
			<span class="panel-caption">{{lstr('already_voted')}}:</span>
		</slot>
		
		<ReSwiper type="scroll" class="mt-5" :params="{stubLength: 1}">
			<template #scroll>
				<router-link class="flex pointer mr-12" v-for="({id, pathToAvatar}) in users" :to="'/user/' + id">
					<RePicture :url="assetsPath + pathToAvatar" size="27" rounded />
				</router-link>
			</template>
		</ReSwiper>
	
	</div>
</template>

<script>
	import imageMixin from '../../mixins/imageMixin'
	import ReSwiper from "@/components/reusableСomponents/ReSwiper";
	import langMixin from "@/components/mixins/langMixin";
	import RePicture from "@/components/reusableСomponents/RePicture";
	
	export default {
		name: "involvedUsersPanel",
		mixins: [imageMixin, langMixin],
		data() {
			return {
				assetsPath: process.env.VUE_APP_ASSETS,
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
			RePicture,
			ReSwiper,
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
