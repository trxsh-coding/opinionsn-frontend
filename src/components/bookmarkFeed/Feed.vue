<template lang="html">

    <div id="bookmark-feed">

        <short-poll-reusable v-for="(poll, index) in filtered_polls" :poll="poll" width="100%"></short-poll-reusable>

    </div>

</template>



<script>
    import { mapState } from 'vuex';
	import ShortPollReusable from "../reusableСomponents/ShortPollReusable";

    export default {
		components: {ShortPollReusable},
		computed: {

            ...mapState('bookmarkFeed', {
                payload: ({items}) => items,
            }),

			...mapState('globalStore', {
                polls: ({polls}) => polls,
            }),

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
