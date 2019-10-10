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
		
		<div class="description__item">
			<text-trim :text="poll.description" :amount-of-letter="mobile ? 200 : 250"/>
		</div>
		
		<bows-panel class="mt-7" :users="poll.bows" v-show="!item.voted && Object.keys(poll.bows).length > 0"/>

		<re-youtube class="mt-9" v-if="poll.content.length" :link="poll.content[0].url" :height="mobile ? '200px' : '371px'" width="100%"/>

		<RePicture v-if="poll.picture" @click.native="$popup.insert('pictures', poll.picture)"
		           class="pointer mt-9" :url="poll.picture | assetsPath" type="background"
		           width="100%" :height="mobile ? 190 : 303" bor-rad="6" />
		
		<ReSwiper v-if="!poll.picture" type="usual" class="mt-9"
		          :usual-swiper-options="{slidesPerView: 1, spaceBetween: 10, pagination: poll.urlPhotos.length > 1, breakpoints: false}">
			<template #usual>
				<swiper-slide v-for="(picture, index) in poll.urlPhotos">
					<RePicture @click.native="pushToPopup(poll.urlPhotos, index)"
					           class="pointer" :url="picture | assetsPath" type="background"
					           width="100%" :height="mobile ? 190 : 303" bor-rad="6" />
				</swiper-slide>
			</template>
		</ReSwiper>
	
	</div>
</template>


<script>
	import bowsPanel from './involvedUsersPanel'
	import TextTrim from "../../reusableСomponents/textTrim";
	import ReSwiper from "@/components/reusableСomponents/ReSwiper";
	import ReYoutube from "../../reusableСomponents/reYoutube";
	import ReExplain from "../../reusableСomponents/ReExplain";
	import RePicture from "@/components/reusableСomponents/RePicture";
	import assetsPathMixin from "@/components/mixins/assetsPathMixin";
	
	export default {
		name: "headlineBody",
		props: ['poll', 'item'],
		mixins: [assetsPathMixin],
		data() {
			return {
				showModal: false
			}
		},
		components: {
			RePicture,
			ReExplain,
			ReYoutube,
			ReSwiper,
			TextTrim,
			bowsPanel,
		},

		watch: {
			subject(newValue, oldValue) {
				if (newValue !== oldValue) document.title = newValue;
			}
		},

		computed: {
			
			routeName() {
				return this.$route.name
			},
			
			mobile() {
				return this.$root.mobile;
			},

			subject() {
				return this.poll.subject;
			}
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
				this.$popup.insert('pictures',  [...arr.splice(index, 1), ...arr]);
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
