<template>
    <div class="question-media">
        <re-youtube class="mt-9"
                    v-if="content.length"
                    :link="content[0].url"
                    :height="mobile ? '200px' : '371px'"
                    width="100%"
        />

        <RePicture v-if="picture" @click.native="$popup.insert('pictures', poll.picture)"
                   class="pointer mt-9" :url="poll.picture | addAssetsPath" type="background"
                   width="100%" :height="mobile ? 216 : 303" bor-rad="6" />
        <ReSwiper v-if="pictures" type="usual" class="mt-9"
                  :usual-swiper-options="{slidesPerView: 1, spaceBetween: 10, pagination: pictures.length > 1, breakpoints: false}">
            <template #usual>
                <swiper-slide v-for="(item, index) in pictures">
                    <RePicture @click.native="pushToPopup(pictures, index)"
                               class="pointer" :url="item | addAssetsPath" type="background"
                               width="100%" :height="mobile ? 190 : 303" bor-rad="6" />
                </swiper-slide>
            </template>
        </ReSwiper>

    </div>
</template>

<script>
    import ReYoutube from "../../reusableСomponents/reYoutube";
    import RePicture from "../../reusableСomponents/RePicture";
    import ReSwiper from "../../reusableСomponents/ReSwiper";
    export default {
        name: "questionMedia",
        components: {ReSwiper, RePicture, ReYoutube},
        props:{
            content:Array,
            picture:String,
            pictures:Array
        },
        methods: {
            pushToPopup(arr, index) {
                arr = [...arr];
                this.$popup.insert('pictures',  [...arr.splice(index, 1), ...arr]);
            }
        },
        computed: {
            mobile() {
                return this.$root.mobile;
            },
        }
    }
</script>

<style lang="scss">
    .question-media {
        padding: 0 16px;

    }
</style>
