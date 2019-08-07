<template lang="html">

    <div id="bookmark-feed" class="flex-column" :class="{ 'pt-58 pl-30 pr-20': mobile, 'bg-white': !mobile }">

        <short-poll-reusable v-for="(poll, index) in filtered_polls" :class="{'mt-9': index > 0}" :poll="poll" width="100%" />
        <loader-reusable
                class="mx-auto my-9"
                v-show="loading" />

    </div>

</template>



<script>
    import { mapState } from 'vuex';
	import ShortPollReusable from "../reusableСomponents/ShortPollReusable";
    import LoaderReusable from "../reusableСomponents/LoaderReusable";

    export default {
        data() {
            return {
                mobile: this.$root.mobile
            }
        },
		components: {LoaderReusable, ShortPollReusable},
		computed: {

            ...mapState('bookmarkFeed', {
                payload: ({items}) => items,
                loading: ({loading}) => loading
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
