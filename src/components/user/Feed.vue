<template>

    <div class="feed">
		<vote-instance class="mt-12" v-for="item in items" :item="item">
			<template #headAnnotation>

				<lang-string class="annotation" v-if="item.eventType === 'POLL_CREATED'" :title="'created_a_poll'"/>
				<lang-string class="annotation" v-else :title="'voted'"/>

			</template>
		</vote-instance>
    </div>

</template>

<script>
    import { mapState } from 'vuex';
    import MugenScroll from 'vue-mugen-scroll'
	import ShortPollReusable from "../reusableСomponents/ShortPollReusable";
	import VoteInstance from "../voteFeed/voteInstance";
	import langString from "../langString";

	export default {
        name: "userFeed",
		components: {
			VoteInstance,
			ShortPollReusable,
			MugenScroll,
			langString
		},
		props: {
        	feed_type: {
        		type: Number,
				required: true,
				default: function () {
					return 1;
				}
			}
		},
        computed: {
            ...mapState('userFeed', {
				state: s => s,
				filteredFeed: ({filteredFeed}) => filteredFeed,
                items: s => s.items,
                loading: s => s.is_finished,

            }),

			...mapState('globalStore', {
				votes: ({votes}) => votes,
				polls: ({polls}) => polls,
			}),

			userId(){

				return this.$route.params.id;

			},

            sanitizedItems(){
                let {items, votes, polls} = this;

                return items.map( ({id, eventType}) => {

                    if (eventType === "POLL_CREATED"){
						return polls[id];
                    } else {
                    	return polls[votes[id].poll_id]
                    }
                });

            }
        },

        methods: {

            load() {


				this.$store.dispatch(`userFeed/loadNextPage`, {params: { id : this.userId}});


            },

            changeTypeOfFeed() {

            	let { feed_type } = this;
            	let payload;

            	switch (feed_type) {
					case 1:
						payload = true;
						break;
					case 2:
						payload = false;
						break;
					default:
						payload = false;
				}

                this.$store.commit(`userFeed/setFilteredFeed`, payload);
                this.$store.dispatch(`userFeed/list`, {params: { id : this.userId}});
                this.$forceUpdate();

            }

        },

        mounted() {

            this.changeTypeOfFeed();

        },

		watch: {
			userId(oldUserId, newUserId) {
				if (oldUserId !== newUserId) this.changeTypeOfFeed();
			},
			feed_type(old, current) {
				if (old !== current) this.changeTypeOfFeed();
			}
		},

    }
</script>

<style lang="scss">

	.feed {

		.annotation {
			font-family: Roboto;
			font-style: normal;
			font-weight: normal;
			font-size: 12px;
			text-transform: lowercase;
			color: #1A1E22;
		}

	}

</style>
