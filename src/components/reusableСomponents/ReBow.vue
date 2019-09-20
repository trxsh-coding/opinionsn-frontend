<template>
	<div class="bow-reusable">
		<div class="user-picture pointer rounded" :style="pictureStyle"
		     :class="{'is_mobile_device': $root.mobile}">
		
		</div>
<!--		<span class="bow-username" v-if="routeName === 'voteFeed'">-->
<!--              {{username}}-->
<!--        </span>-->
	</div>
</template>

<script>
	import imageMixin from "../mixins/imageMixin";
	import {mapState} from 'vuex'
	
	export default {
		name: "ReBow",
		mixins: [imageMixin],
		props: {
			width: Number,
			height: Number,
			img: String,
			size: Number,
			value: Object,
			id: [Number, String]
		},
		data() {
			return {
				publicPath: process.env.VUE_APP_ASSETS,
			}
		},
		computed: {
			...mapState('globalStore', {
				
				users: ({users}) => users,
				
				
			}),
			routeName() {
				return this.$route.name
			},
			// username() {
			// 	return this.users[this.id].username
			// },
			pictureStyle() {
				let {width, height, img} = this;
				return {
					width: `${width}px`,
					height: `${height}px`,
					borderRadius: `50%`,
					backgroundImage: `url('${this.publicPath + img}')`,
				};
			}
		}
	}
</script>

<style lang="scss">
	.bow-reusable {
		.bow-username {
			
			
			font-family: Roboto;
			font-style: normal;
			font-weight: normal;
			font-size: 11px;
			color: #1A1E22;
			
			
		}
		
		.user-picture {
			background-size: cover !important;
			background-position: center;
			
		}
		
		@media only screen and (min-width: 300px) and (max-width: 765px) {
			.bow-username {
				font-size: 10px;
			}
		}
	}


</style>
