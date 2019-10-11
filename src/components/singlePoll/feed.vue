<template lang="html">

	<div v-if="item" id="poll-wrapper">
		<pollInstance :item="item"/>
	</div>

</template>


<script>
    import {mapGetters, mapState} from 'vuex';
	import pollInstance from "../pollFeed/pollInstance";

	export default {
		props: ['feed'],
        computed: {

            ...mapState('singlePoll', {
                state: s => s,
                item: s => s.items[0]
            }),

            ...mapGetters('globalStore', [
                'getItemFromStore'
            ]),

        },

		async mounted() {
			this.$store.commit('singlePoll/clearFeed');
			await this.$store.dispatch('singlePoll/list', {
				customUrl: `${process.env.VUE_APP_MAIN_API}/rest/v1/poll/${this.$route.params.id}`
			});

            /** Выставляем заголовок страницы с соответсвием с название поста */
			document.title = this.getItemFromStore({store: 'polls', id: this.$route.params.id}).subject;
		},


		components: {
			pollInstance
		}
	}
</script>

<style lang="scss">
	#poll-wrapper {
		.el-aside {

			margin-right: 12px;

		}

	}
</style>
