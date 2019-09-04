<template>
	<div class="modal-reusable" v-if="pictures.length">
  
		<div class="modal-overlay pl-63 pr-20 flex-align-center">
            <span class="option-text text-center fx-1">
                {{pictures[current_index].description}}
            </span>
            
			<icon-base
					@click.native="clearPictures"
					class="ml-10 pointer"
					fill="aqua"
					width="33"
					height="35"
					viewBox="0 0 13 14"
					icon-name="close">
				<icon-close/>
			</icon-base>
		</div>
  
		<div class="modal-window">
			<img class="main-picture pointer" :src="pictures[current_index].picture" @click="setNextPicture"/>
			
			<swiper-reusable
					class="pictures-section  flex"
					v-if="pictures.length >= 2"
					:height="150"
					width="100%"
					:amount-of-slides="'auto'"
					:spaceBetween="15"
					:swiper-type="mobile ? 'scroll' : 'usual'">
				<template #usual>
					<swiper-slide
							class="w-fit "
							v-for="({picture}, index) in pictures">
						
						<picture-reusable
								:key="index"
								:src="picture"
								:class="{borderedPicture : picture === pictures[current_index].picture}"
								@click.native="setCurrentIndex(index)"
								class="mr-12 p-0 pointer"
								pic-class="mb-5"
								:img="picture"
								:height="150"
								:width="200"
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
							@click.native="setCurrentIndex(index)"
							class="mr-12 p-0 pointer"
							pic-class="mb-5"
							:img="picture"
							:height="100"
							:width="170"
							text-layout="bottom">
					</picture-reusable>
				</template>
			</swiper-reusable>
		
		</div>
	
	</div>
</template>

<script>
	import PictureReusable from "./PictureReusable";
	import IconBase from "../icons/IconBase";
	import IconClose from "../icons/modal/IconClose";
	import ImageMixin from "../mixins/imageMixin"
	import SwiperReusable from "./swiperReusable";
	
	export default {
		name: "reusableModal",
		components: {SwiperReusable, IconBase, PictureReusable, IconClose},
		mixins: [ImageMixin],
		data() {
			return {
				publicPath: process.env.VUE_APP_MAIN_API,
				sorted_pictures: null,
				current_index: 0
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
				// return this.$popup.pictures.map(pic => this.publicPath + this.imageUtil(pic, 'L'));
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
			height: 100%;
			justify-content: center;
			
			.borderedPicture {
				border: 1.3px solid #FFFFFF;
				opacity: 0.7;
			}
			
			.main-picture {
				width: 100%;
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
			
		}
		
	}
</style>