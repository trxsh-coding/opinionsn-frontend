<template>
    <div id="opinion-feed-layout" :class="{'p-0 pl-51 pr-30': !mobile, 'pl-21 pr-20': mobile}">
        <post-header :class="{'ml-30': mobile}" :author="author" :poll="poll" :payload-time-stamp="item.timestamp" :eventType="item.eventType">
			<slot name="headAnnotation"></slot>
		</post-header>
	 
	    <ReSwiper v-if="!mobile && item.voted" :type="mobile ? 'scroll' : 'usual'"
	              :params="{stubLength: 1, slidesPerView: 3, spaceBetween: 9}">
			<template #usual>
				<swiper-slide v-for="{option, isSelected} in sortedOptions">
					<option-item class="option mr-9"  :selected="isSelected" :option="option" :width="180"  :height="45"/>
				</swiper-slide>
			</template>
		    
		    <template #scroll>
			    <option-item class="option mr-9" v-for="{option, isSelected} in sortedOptions" :selected="isSelected" :option="option" :width="180"  :height="45"/>
		    </template>
	    </ReSwiper>

        <ShortPoll class="mt-12" :class="{'m-0 mt-12': !item.voted}" :poll="poll"  />

        <!--<Explanation-->
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
    import ShortPoll from "../reusableСomponents/ShortPoll";
    import bowsPanel from "../pollFeed/layout/involvedUsersPanel";
    import Explanation from "../reusableСomponents/Explanation";
    import ReSwiper from "@/components/reusableСomponents/ReSwiper";
    export default {
        name: "voteInstance",
        components: {
	        ReSwiper,
            Explanation,
            bowsPanel, ShortPoll, optionItem, PostHeader},
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
