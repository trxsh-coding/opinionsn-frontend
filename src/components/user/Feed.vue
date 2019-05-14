<template>

    <div>
        <!-- Загрузка -->
        <div v-if="state.loading">
            <p align="center" style="font-size:10px;margin-top: 5px;color: darkgray">Загружаю...</p>
        </div>

        <!-- Выгрузка пользователя -->
        <div v-else-if="!items.length">
            <p align="center" style="font-size:10px;margin-top: 5px;color: darkgray">Нет событий</p>
        </div>

        <!-- Всё ок -->
		<div class="user-feed-filter">
			<ul>
				<li @click="changeTypeOfFeed(true)">
					<icon-base
						:class="{active: filteredFeed}"
						width="22"
						height="22"
						viewBox="0 0 22 22"
						icon-name="main"><icon-main/>
					</icon-base>
				</li>
				<li @click="changeTypeOfFeed(false)">
					<icon-base
						:class="{active: !filteredFeed}"
						width="22"
						height="22"
						viewBox="0 0 22 22"
						icon-name="main"><icon-main/>
					</icon-base>
				</li>
			</ul>
		</div>

		<div v-for="(item, index) in sanitizedItems" :key="index">
			<event :item="item"/>
			<!-- <div class="spinner" v-if="(index + 1 === sanitizedItems.length) && loading">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium quia similique adipisci soluta. Sequi esse ut cumque in commodi at, minus reiciendis consequatur aliquid quaerat ducimus nihil dolor, cupiditate odit optio voluptates exercitationem porro, laudantium alias dolorum. Cumque modi tempore neque vitae rerum odit voluptate? Mollitia placeat, itaque molestias quod voluptatibus odio fuga aliquid modi omnis aut velit reiciendis animi accusamus laborum atque sunt sequi ipsa. A explicabo eveniet perferendis consequatur natus accusantium vero facilis reprehenderit dolores ex ipsum, quisquam tempore quod hic inventore velit labore distinctio corrupti eum, asperiores error iusto cumque vitae aut. Ducimus, suscipit. Ea, voluptates iste.</div> -->
		</div>

		<mugen-scroll :handler="load" :should-handle="!loading">
			<div class="loading" v-if="!loading" v-loading="true"/>
		</mugen-scroll>

    </div>

</template>

<script>

    import event from '../voteFeed/event/Event.vue';
    import { mapState } from 'vuex';
    import IconBase from '../icons/IconBase'
    import IconMain from '../icons/IconMain'
    import MugenScroll from 'vue-mugen-scroll'

    export default {
        name: "userFeed",
        computed: {
            ...mapState('userFeed', {
				state: s => s,
				filteredFeed: ({filteredFeed}) => filteredFeed,
                items: s => s.items,
                loading: s => s.is_finished,

            }),

            userId(){

                return this.$route.params.id;

            },
            sanitizedItems(){
                let {items} = this;

                return items.map(item=>{
                    let {eventId, feedEventType} = item;
                    if (feedEventType) item.type = feedEventType;
                    // Do the ID swapping
                    if (item.type === "POLL_CREATED"){
                        item.pollId = eventId;
                        item.isPollEvent = true;
                    } else {
                        item.voteId = eventId;
                    }


                    return item;
                });
            }
        },
        methods: {

            load(){


				this.$store.dispatch(`userFeed/loadNextPage`, {params: { id :this.userId}});


            },

            changeTypeOfFeed(payload){

                this.$store.commit(`userFeed/setFilteredFeed`, payload);
                this.$store.dispatch(`userFeed/list`, {params: { id :this.userId}});
                this.$forceUpdate();

            }

        },

        mounted(){

            this.changeTypeOfFeed();

        },

        components: {
            event,
            IconBase,
            IconMain,
            MugenScroll
        },

        watch: {
            // userId: function(userId){
            //     if (!userId){
            //         console.warn('User not passed to props of User Feed');
            //         return;
            //     }
            //     //console.log(user);
            //     this.$store.dispatch(`userFeed/list`, {customUrl: `/api/rest/getFeedByUserId/${userId}`});
            // }
        }
    }
</script>

<style lang="scss">

	.loading {
		width: 100%;
		height: 90px;
		* {
			background-color: transparent !important;
		}
	}

    .user-feed-filter {

        background: #FFFFFF;
        border-radius: 6px;
        margin-bottom: 9px;
        padding: 6px 16px 7.8px 16px;
        ul {
            list-style: none;
            display: inline-flex;
            margin: 0;
            padding: 0;
            li {

                margin-right: 20px;

            }
            svg {

                g, path, rect {

                    fill:#FFFFFF;
                    stroke: #D0D5D9;
                }

				&.active {
					g, path, rect {
                    	stroke: #152D3A;
                	}
				}

            }
        }
    }

</style>
