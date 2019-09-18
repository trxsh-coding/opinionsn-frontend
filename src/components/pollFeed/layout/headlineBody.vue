<template>
	<div id="headline-body" class="ml-60">
		<div class="tags__item mb-4">
			{{poll.tags}}
		</div>
		
		<router-link class="subject__item" :class="{'pointer' : routeName !== 'singlePoll'}"
		             :to="{name: 'singlePoll', params: {id: poll.id}}">
			<span>
                {{poll.subject}}
            </span>
		</router-link>
		
		<div class="description__item mb-7">
			<text-trim :text="poll.description" :amount-of-letter="mobile ? 200 : 250"/>
		</div>
		
		<RePicture v-if="poll.picture" @click.native="$popup.insert('pictures', poll.picture)"
		           class="pointer" :url="publicPath + poll.picture"
		           width="100%" :height="mobile ? 190 : 303" bor-rad="6"/>
		
		<ReSwiper v-if="!poll.picture" type="usual"
		          :params="{slidesPerView: 1, spaceBetween: 10, pagination: poll.urlPhotos.length > 1, breakpoints: false}">
			<template #usual>
				<swiper-slide v-for="(picture, index) in poll.urlPhotos">
					<RePicture @click.native="pushToPopup(poll.urlPhotos, index)" class="pointer"
					           :url="publicPath + picture" width="100%" :height="mobile ? 190 : 303" bor-rad="6"/>
				</swiper-slide>
			</template>
		</ReSwiper>
		
		<bows-panel class="mt-9" :users="poll.bows" v-show="!item.voted && Object.keys(poll.bows).length > 0"/>
	
	</div>
</template>


<script>
	import bowsPanel from './involvedUsersPanel'
	import TextTrim from "../../reusableСomponents/textTrim";
	import ReSwiper from "@/components/reusableСomponents/ReSwiper";
	import RePicture from "@/components/reusableСomponents/RePicture";
	
	export default {
		name: "headlineBody",
		props: ['poll', 'item'],
		data() {
			return {
				
				publicPath: process.env.VUE_APP_ASSETS,
				showModal: false
				
			}
		},
		components: {
			RePicture,
			ReSwiper,
			TextTrim,
			bowsPanel,
		},
		computed: {
			
			routeName() {
				return this.$route.name
			},
			
			mobile() {
				return this.$root.mobile;
			},
		},
		methods: {
			openModal() {
				this.showModal = true
			},
			
			close() {
				this.showModal = false
			},
			
			pushToPoll(id) {
				
				if (this.$route.name !== 'singlePoll') {
					this.$router.push({name: 'singlePoll', params: {id}})
					
				}
				
			},
			
			pushToPopup(arr, index) {
				arr = [...arr];
				this.$popup.insert('pictures', [...arr.splice(index, 1), ...arr]);
			}
		}
	}
</script>

<style lang="scss">
	#headline-body {
		.tags__item {
			
			font-family: Roboto;
			font-style: normal;
			font-weight: normal;
			font-size: 12px;
			color: #4B97B4;
			
		}
		
		.subject__item {
			font-family: Roboto;
			font-style: normal;
			font-weight: 500;
			font-size: 16px;
			line-height: 18px;
			color: #1A1E22;
			
			
		}
		
		.description__item {
			
			span {
				font-family: Roboto, serif;
				font-style: normal;
				font-weight: normal;
				font-size: 13px;
				color: #1A1E22;
				line-height: 16px;
				
			}
			
		}
		
	}
</style>
