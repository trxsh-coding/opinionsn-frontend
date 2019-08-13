<template lang="html">

    <div id="bookmark-feed" class="flex-column br-6 pr-20" :class="{ 'pt-58 pl-21 pr-20': mobile, 'bg-white pl-51': !mobile }">

        <short-poll-reusable v-for="(poll, index) in filtered_polls" :class="{'mt-9': index > 0}" :poll="poll" width="100%" />
        
        <loader-reusable
                class="mx-auto my-9"
                v-show="loading" />
        
        <lang-string v-show="!loading && !filtered_polls.length" class="finish-warning mx-auto my-9" title="You_have_no_bookmarks" />

    </div>

</template>



<script>
    import { mapState } from 'vuex';
	import ShortPollReusable from "../reusableСomponents/ShortPollReusable";
    import LoaderReusable from "../reusableСomponents/LoaderReusable";
    import langString from "../langString";

    export default {
		components: {LoaderReusable, ShortPollReusable, langString},
		computed: {

            ...mapState('bookmarkFeed', {
                payload: ({items}) => items,
                loading: ({loading}) => loading
            }),

			...mapState('globalStore', {
                polls: ({polls}) => polls,
            }),
            
            mobile() {
                return this.$root.mobile;
            },

			filtered_polls() {
            	return this.payload.map(({id}) => this.polls[id])
			}

        },
        mounted () {

            this.$store.dispatch(`bookmarkFeed/list`);

        },
    }
</script>

<style lang="scss">

    #bookmark-feed {
		position: relative;
		width: 100%;
    }

</style>
