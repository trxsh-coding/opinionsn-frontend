<template>
    <div id="main-feed-layout" class="mb-12">
        <post-header :author="author" :poll="poll"/>
        <headline-body :poll="poll" :item="item"/>
        <options-section
				:access-check="pollAccessCheck"
				v-for="option in combinedOptions"
				:bows="option.bows"
				class="mt-12"
				:id="option.id"
				:percentage="voted && option.voted_percentage"
				:type_of_poll="poll.type_of_poll"
				:poll_id="poll.id"
				:voted="voted"
				:selected="item.selectedOption === option.id"
				:correct="poll.correct_option === option.id"
				:picture="option.picture ? publicPath + option.picture : null"
        >
            <template #default>
				{{option.description}}
			</template>

			<template #badge>
				<badge-reusable :counter="Object.keys(option.bows).length - 2" :size="21" ></badge-reusable>
			</template>
        </options-section>

		<counter-badges class="ml-60 mt-12" :poll="poll"></counter-badges>

        <explain-section
				class="ml-21 mt-12"
                v-for="explain in combinedVotes"
                :explain="explain"
                :poll_id="poll.id"
                :author_picture="publicPath + author.path_to_avatar"
                :comments="comments"
                :options="options"
                :users="users"/>

		<hr class="ml-54 mt-12">
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import postHeader from './layout/header'
    import headlineBody from './layout/headlineBody'
    import explainSection from "../reusableСomponents/ExplanationReusable";
    import OptionsSection from "../reusableСomponents/OptionReusable";
	import BadgeReusable from "../reusableСomponents/BadgeReusable";
	import PictureReusable from "../reusableСomponents/PictureReusable";
	import CounterBadges from "../reusableСomponents/counterBadges";

	export default {
        name: "layout",
        props:['item'],
		components: {
			CounterBadges,
			PictureReusable,
			BadgeReusable,
			OptionsSection,
			explainSection,
			postHeader,
			headlineBody
		},
        data () {
            return {

                publicPath: process.env.VUE_APP_MAIN_API

            }
        },
        computed: {

            ...mapState('globalStore', {
                votes: ({votes}) =>votes,
                polls: ({polls}) =>polls,
                users: ({users}) =>users,
                options: ({options})=>options,
                comments: ({comments}) => comments,
                mainUser: ({mainUser}) => mainUser,
            }),

            // POLL GETTER

            poll: function () {
                let {item, polls} = this;

                return polls[item.id];

            },

			pollAccessCheck() {
				let { mainUser, poll, voted } = this;

				if (mainUser) {

					switch (true) {
						case !!mainUser.id:
						case !poll.votingOver:
						case !voted:
							return true;
						default:
							return false;
					}

				} else {
					return false;
				}



			},

            // USER GETTER

            author: function () {

                let {poll, users} = this;

                return users[poll.author_id];
            },
            // OPTION GETTER

            combinedOptions: function () {

                let {poll, options} = this;

                let options_id = poll.options_id;

                    return options_id.map(option_id => {

                        return options[option_id]

                });

            },



            // VOTE GETTER

            combinedVotes: function () {

                let {poll, votes} = this;

                let votes_id = poll.explains_id;

                return votes_id.map(vote_id => {

                    return votes[vote_id]

                });

            },

			voted() {
            	return this.item.voted;
			},

        },
        methods : {


        },

    }
</script>

<style lang="scss">
	#main-feed-layout {
		position: relative;
		width: 100%;
		hr {
			margin: 0;
			border: none;
			height: 1px;
			background-color: #BCBEC3;
			opacity: 0.7;
			box-shadow: 0px 0px 15px rgba(56, 56, 56, 0.05);
			border-radius: 2px;
		}

		.counter-badges {

			svg {
				position: relative;
				top: -2px;
			}

			* {
				font-family: Roboto;
				font-style: normal;
				font-weight: normal;
				font-size: 12px;
				color: #BEC0C5;
			}

		}
	}
</style>
