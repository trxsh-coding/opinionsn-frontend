<template lang="html">

    <div id="bookmark-feed" class="flex-column br-6 py-15 pr-20" :class="{ 'pt-58 pl-21 pr-20': mobile, 'bg-white pl-51': !mobile }">

        <ShortPoll v-if="filtered_polls.length" v-for="(poll, index) in filtered_polls" with-timestamp :class="{'mt-9': index > 0}" :poll="poll" width="100%" />
        
        <Loader
                class="mx-auto my-9"
                v-show="loading && !filtered_polls.length" />

        <lang-string v-show="!loading && !filtered_polls.length" class="finish-warning mx-auto my-9" title="You_have_no_bookmarks" />

    </div>

</template>



<script>
    import { mapState } from 'vuex';
	import ShortPoll from "../reusableСomponents/ShortPoll";
    import Loader from "../reusableСomponents/Loader";
    import langString from "../langString";

    export default {
		components: {Loader, ShortPoll, langString},
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

            isLoaded() {
                return this.filtered_polls;
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
