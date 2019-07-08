<template>
    <div id="opinion-feed-layout">
        <post-header :author="author" :poll="poll" :eventType="item.eventType">
			<slot name="headAnnotation"></slot>
		</post-header>

        <options-carousel
                v-if="!mobile"
                :amount-of-slides="3"
                :spaceBetween="9">
            <template #swiperAnnotation>
                <swiper-slide v-for="{option, isSelected} in sortedOptions">
                    <option-item class="option mr-9"  :selected="isSelected" :option="option" :width="180"  :height="45"/>
                </swiper-slide>
            </template>
        </options-carousel>

		<scroll-swiper-reusable v-if="mobile">
			<option-item class="option mr-9" v-for="{option, isSelected} in sortedOptions" :selected="isSelected" :option="option" :width="180"  :height="45"/>
		</scroll-swiper-reusable>

        <vote-annotation class="mt-21" :poll="poll" />

        <bows-panel class="mt-9" v-show="!!Object.keys(poll.bows).length" :users="poll.bows"  />

    </div>
</template>

<script>
    import PostHeader from "../pollFeed/layout/header";
    import storeMixin from "../mixins/storeMixin";
    import optionItem from "./layout/optionItem";
    import voteAnnotation from "../reusableСomponents/ShortPollReusable";
    import bowsPanel from "../pollFeed/layout/involvedUsersPanel";
	import ScrollSwiperReusable from "../reusableСomponents/ScrollSwiperReusable";
    import optionsCarousel from "../reusableСomponents/swiperCarousel";
    export default {
        name: "voteInstance",
        components: {optionsCarousel, ScrollSwiperReusable, bowsPanel, voteAnnotation, optionItem, PostHeader},
        props: ['item'],
        mixins:[storeMixin],
        data() {
            return {
                mobile: this.$root.mobile
            }
        },
    }
</script>

<style lang="scss">
    #opinion-feed-layout {
        margin-left: 21px;
        overflow-x: hidden;

		.option {
			border-radius: 6px;
		}

    }

</style>
