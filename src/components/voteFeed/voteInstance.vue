<template>
    <div id="opinion-feed-layout" :class="{'p-0 pl-51 pr-30': !mobile, 'pl-21 pr-20': mobile}">
        <post-header :class="{'ml-30': mobile}" :author="author" :poll="poll" :eventType="item.eventType">
			<slot name="headAnnotation"></slot>
		</post-header>

        <options-carousel
                v-if="!mobile && item.voted"
                :amount-of-slides="3"
                :spaceBetween="9">
            <template #swiperAnnotation>
                <swiper-slide v-for="{option, isSelected} in sortedOptions">
                    <option-item class="option mr-9"  :selected="isSelected" :option="option" :width="180"  :height="45"/>
                </swiper-slide>
            </template>
        </options-carousel>

		<scroll-swiper-reusable v-if="mobile" :stub-length="1">
			<option-item class="option mr-9" v-for="{option, isSelected} in sortedOptions" :selected="isSelected" :option="option" :width="180"  :height="45"/>
		</scroll-swiper-reusable>

        <vote-annotation class="mt-12" :class="{'m-0 mt-12': !item.voted}" :poll="poll"  />

        <!--<explanation-reusable-->
                <!--v-if="item.voted"-->
                <!--:explain=""-->
                <!--without_avatar />-->

        <bows-panel class="mt-9 px-20" v-show="!!Object.keys(poll.bows).length" :users="poll.bows"  />

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
    import ExplanationReusable from "../reusableСomponents/ExplanationReusable";
    export default {
        name: "voteInstance",
        components: {
            ExplanationReusable,
            optionsCarousel, ScrollSwiperReusable, bowsPanel, voteAnnotation, optionItem, PostHeader},
        props: ['item'],
        mixins:[storeMixin],
	    computed: {
		    mobile() {
			    return this.$root.mobile;
		    },
	    },
        mounted() {
            // this.$store.dispatch(`userPage/list`, {customUrl: `${process.env.VUE_APP_MAIN_API}/rest/v1/user/${this.poll.author_id}`});
        }
    }
</script>

<style lang="scss">
    #opinion-feed-layout {
        overflow-x: hidden;

		.option {
			border-radius: 6px;
		}

    }

</style>
