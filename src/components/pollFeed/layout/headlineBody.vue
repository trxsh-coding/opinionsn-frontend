<template>
    <div id="headline-body" class="ml-60">
        <div class="tags__item mb-4">
			{{poll.tags}}
        </div>
        <div class="subject__item " @click="pushToPoll(poll.id)" :class="{'pointer' : routeName !== 'singlePoll'}">
            <span>
                {{poll.subject}}
            </span>
        </div>
        <div class="description__item mb-7">
            <text-trim :text="poll.description" :amount-of-letter="mobile ? 200 : 250"/>
        </div>
            <subject-picture class="pointer" v-if="poll.picture" :img="publicPath + poll.picture" width="100%" only-picture :height="mobile ? 190 : 303" textLayout="right" bor-rad="6" @click.native="$popup.insert('pictures', poll.picture)"/>
        <swiper-carousel v-if="!poll.picture" :with-pagination="poll.urlPhotos.length > 1"  :amount-of-slides="1"  :space-between="10" :without-breakpoints="true"  >
            <template #swiperAnnotation>
                <swiper-slide v-for="picture in poll.urlPhotos">
                        <subject-picture  :img="publicPath + picture" width="100%" only-picture :height="mobile ? 190 : 303" textLayout="right" bor-rad="6" @click.native="$popup.insert('pictures',  poll.urlPhotos)"/>
                </swiper-slide>
            </template>
        </swiper-carousel>
        <bows-panel class="mt-9" :users="poll.bows" v-show="!item.voted && Object.keys(poll.bows).length > 0" />

    </div>
</template>


<script>
    import subjectPicture from '../../reusableСomponents/PictureReusable'
    import bowsPanel from './involvedUsersPanel'
    import SwiperCarousel from "../../reusableСomponents/swiperCarousel";
    import TextTrim from "../../reusableСomponents/textTrim";
    import ReusableModal from "../../reusableСomponents/reusableModal";

    export default {
        name: "headlineBody",
        props:['poll', 'item'],
        data() {
            return {

                publicPath: process.env.VUE_APP_MAIN_API,
                showModal:false

            }
        },
        components: {
            ReusableModal,
            TextTrim,
            subjectPicture,
            bowsPanel,
            SwiperCarousel
        },
        computed: {
            
            routeName(){
                return this.$route.name
            },
    
            mobile() {
                return this.$root.mobile;
            },
        },
        methods:{
            openModal(){
                this.showModal = true
            },
            close(){
                this.showModal = false
            },
            pushToPoll(id){

                if(this.$route.name !== 'singlePoll'){
                    this.$router.push({name: 'singlePoll', params: {id}})

                }

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
            font-size: 15px;
            line-height: 18px;
            color: #1A1E22;


        }
        .description__item {

           span {
               font-family: Roboto,serif;
               font-style: normal;
               font-weight: normal;
               font-size: 13px;
               color: #1A1E22;
               line-height: 16px;

           }

        }

    }
</style>
