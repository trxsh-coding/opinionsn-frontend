<template>
	<div class="modal-reusable" v-if="pictures.length">
  
		<div class="modal-overlay pl-56 pr-20 flex-align-center">
            <span class="option-text text-center fx-1">
                {{pictures[current_index].description}}
            </span>
            
			<icon-base
					@click.native="clearPictures"
					class="ml-10 pointer"
					fill="aqua"
					width="26"
					height="28"
					viewBox="0 0 13 14"
					icon-name="close">
				<icon-close/>
			</icon-base>
		</div>
  
		<div class="modal-window">
			<swiper :options="swiperOptions" class="modal-swiper" @slideChange="changeSwiperIndex" ref="modalSwiper">
				<swiper-slide v-for="({picture}) in pictures">
					<div class="main-picture" :style="{backgroundImage: `url('${picture}')`}" />
				</swiper-slide>
			</swiper>
			<ReSwiper class="pictures-section flex" v-if="pictures.length >= 2" :type="$root.is_mobile_device ? 'scroll' : 'usual'"
			          :params="{height: 150, width: '100%'}" :usual-swiper-options="{slidesPerView: 'auto', spaceBetween: 15}">
				<template #usual>
					<swiper-slide
							class="w-fit" v-for="({picture}, index) in pictures">
						<picture-reusable
								:key="index"
								:src="picture"
								:class="{borderedPicture : picture === pictures[current_index].picture}"
								@click.native="setCurrentIndex(index)"
								class="mr-12 p-0 pointer"
								:img="picture"
								:height="75"
								:width="100"
								without-text
								text-layout="bottom">
						</picture-reusable>
					</swiper-slide>
				</template>

				<template #scroll>
					<picture-reusable
							v-for="({picture}, index) in pictures"
							:key="index"
							:src="picture"
							:class="{borderedPicture : picture === pictures[current_index].picture}"
							class="mr-12 p-0 pointer"
							:img="picture"
							:height="auto"
							:width="170"
							@click.native="setCurrentIndex(index)"
							without-textout="bottom">
					</picture-reusable>
				</template>
			</ReSwiper>
		
		</div>
	
	</div>
</template>

<script>
	import PictureReusable from "./PictureReusable";
	import IconBase from "../icons/IconBase";
	import IconClose from "../icons/modal/IconClose";
	import ImageMixin from "../mixins/imageMixin"
	import ReSwiper from "@/components/reusableСomponents/ReSwiper";
	
	export default {
		name: "ModalWindow",
		components: {ReSwiper, IconBase, PictureReusable, IconClose},
		mixins: [ImageMixin],
		data() {
			return {
				publicPath: process.env.VUE_APP_ASSETS,
				sorted_pictures: null,
				current_index: 0,
				swiperOptions: {
					authoHeight:true,
					spaceBetween:100
				}

			}
		},
        watch: {
            pictures({length}) {
                if (length) {
                    document.addEventListener('keyup', this.clearOnEscKey);
                } else {
                    document.removeEventListener('keyup', this.clearOnEscKey);
                }
            }
        },
		computed: {
			mobile() {
				return this.$root.mobile
			},
			pictures() {
				if (!this.$popup.pictures.some((x) => typeof x !== 'string')) {
					return this.$popup.pictures.map(picture => ({picture: this.publicPath + this.imageUtil(picture, 'L')}))
				} else {
					return this.$popup.pictures.map(({picture, description}) => ({
						picture: this.publicPath + this.imageUtil(picture, 'L'),
						description
					}));
				}
				
			}
			
		},
		methods: {
			changeSwiperIndex(args){
				this.current_index = this.$refs.modalSwiper.swiper.activeIndex;
			},
			clearPictures() {
				this.sorted_pictures = null;
				this.current_index = 0;
				this.$popup.clear('pictures');
			},
            
            clearOnEscKey({keyCode}) {
                if (keyCode === 27) {
                    this.clearPictures();
                }
            },
			
			setNextPicture() {
				this.current_index += 1;
				
				if (this.current_index >= this.pictures.length) this.clearPictures();
				
			},
   
			setCurrentIndex(index) {
				this.current_index = index;
				this.$refs.modalSwiper.swiper.activeIndex = index;
			},
   
		},
	}
</script>

<style lang="scss">
	.white {
		color: white;
	}
	
	.modal-reusable {
		position: fixed;
		z-index: 9999999;
		width: 100vw;
		height: 100vh;
		background: #000000f2;
		
		.modal-overlay {
			position: fixed;
			z-index: 9999999;
			width: 100%;
			height: 80px;
			background: #242424f2;
            overflow: hidden;
			
			.option-text {
				color: #ffffff;
                @media screen and (max-width: 425px) {
                    font-size: 13px;
                }
			}
		}
		
		.picture-description {
			padding: 15px;
			
			span {
				font-family: Roboto;
				font-style: normal;
				font-weight: normal;
				font-size: 13px;
				color: #FFFFFF;
			}
			
		}
		
		.modal-window {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			height: 100%;
			justify-content: center;
			.modal-swiper {
				width: 1000px;
				height: auto;
				.swiper-slide {

				}
			}
			.borderedPicture {
				border: 1.3px solid #FFFFFF;
				opacity: 0.7;
			}
			
			.main-picture {
				background-position: center;
				background-size: contain;
				background-repeat: no-repeat;
				width: 1000px;
				height: 80vh;
			}
			
			.pictures-section {
				position: fixed;
                width: 100vw;
				bottom: 5px;
				
			}
			
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: fit-content;
		}
		
		@media only screen and (max-width: 400px) {
			
			.preview-picture {
				width: 70px !important;
			}
			.main-picture {
				height: 30vh !important;
			}
			.pictures-section {
				.picture {
					height: 100px;
				}
			}
			
		}
		
	}
</style>