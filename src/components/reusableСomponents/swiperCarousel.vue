<template>
    <div class="swiper-section">
        <swiper :options="swiperOption" class="category-section mb-6">
                <slot name="swiperAnnotation">

                </slot>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    export default {
        name: "swiperCarousel",
        props: {
            items:{
                type:Object,
            },
            amountOfSlides: {
                type:Number
            },
            spaceBetween: {
                type: Number
            }
        },
        data() {
            return {
                swiperOption: {
                    slidesPerView: this.amountOfSlides,
                    spaceBetween: this.spaceBetween,
                    freeMode: true,
                    breakpoints: {
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 50
                        },
                        640: {
                            slidesPerView: 4,
                            spaceBetween: 80
                        },
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 10
                        }
                    }
                }            }
        },

    }
</script>

<style lang="scss">
    .swiper-section {
    }
</style>
