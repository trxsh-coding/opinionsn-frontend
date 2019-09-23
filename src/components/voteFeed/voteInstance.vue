<template>
    <div id="opinion-feed-layout" :class="{'p-0 pl-51 pr-30': !mobile, 'pl-21 pr-20': mobile}">
<!--        <post-header :class="{'ml-30': mobile}" :author="author" :poll="poll" :payload-time-stamp="item.timestamp" :eventType="item.eventType">-->
<!--			<slot name="headAnnotation"></slot>-->
<!--		</post-header>-->
	    
	    <PostHeader v-bind="postHeaderProps" />
	    
	    <ReSwiper class="mt-9" :type="mobile ? 'scroll' : 'usual'" :params="{stubLength: 1}"
	              :usual-swiper-options="{slidesPerView: 3, spaceBetween: 9}">
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

        <bows-panel class="mt-9 px-20" v-show="!!Object.keys(poll.bows).length" :users="poll.bows"  />

    </div>
</template>

<script>
    import storeMixin from "../mixins/storeMixin";
    import optionItem from "./layout/optionItem";
    import ShortPoll from "../reusableСomponents/ShortPoll";
    import bowsPanel from "../pollFeed/layout/involvedUsersPanel";
    import ReSwiper from "@/components/reusableСomponents/ReSwiper";
    import RePicture from "@/components/reusableСomponents/RePicture";
    import PostHeader from "@/components/voteFeed/layout/PostHeader";
    
    export default {
        name: "voteInstance",
        components: {
	        PostHeader,
	        RePicture,
	        ReSwiper,
            bowsPanel, ShortPoll, optionItem},
        props: ['item'],
        mixins:[storeMixin],

	    computed: {
		    mobile() {
			    return this.$root.mobile;
		    },
		
		    postHeaderProps() {
		    	let {id, path_to_avatar, username} = this.author,
				    {eventType, timestamp} = this.item;
		    	return {
	                id,
				    path_to_avatar,
				    username,
				    eventType,
				    timestamp
			    }
		    }
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
