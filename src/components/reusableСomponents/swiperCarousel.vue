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
                type: [Number, String]
            },
            spaceBetween: {
                type: Number
            },
            withoutBreakpoints: {
                type: Boolean,
                default() {
                    return false;
                }
            }
        },
        computed: {
            swiperOption() {

                let breakpoints = this.withoutBreakpoints ? {} : {
                    breakpoints: {
                        1024: {
                            slidesPerView: 1,
                            spaceBetween: 100
                        },
                        768: {
                            slidesPerView: 1,
                            spaceBetween: 50
                        },
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 100
                        },
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 10
                        }
                    }
                };

                return {
                    slidesPerView: this.amountOfSlides,
                    spaceBetween: this.spaceBetween,
                    ...breakpoints
                };
            }
        },

    }
</script>

<style lang="scss">
    .swiper-section {
    }
</style>
