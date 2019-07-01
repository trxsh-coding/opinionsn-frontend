<template>
    <div id="main-feed-layout" class="mb-12">
        <post-header :author="author" :poll="poll"/>
        <headline-body :poll="poll" :item="item"/>
        <options-section
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

		<div class="counter-badges flex ml-60 mt-12">

			<div class="explains-block flex-align-center mr-9">
				<icon-base
					fill="BEC0C5"
					width="13"
					height="10"
					viewBox="0 0 13 10"
					icon-name="check">
					<icon-check></icon-check>
				</icon-base>

				<span class="ml-6">{{poll.total_amount_of_votes}}</span>
			</div>

			<div class="comments-block flex-align-center mr-9">
				<icon-base
					fill="BEC0C5"
					width="13"
					height="13"
					viewBox="0 0 13 13"
					icon-name="baloon">
					<icon-baloon></icon-baloon>
				</icon-base>

				<span class="ml-6">{{poll.total_amount_of_comments}}</span>
			</div>

			<div v-if="poll.type_of_poll === 1 || 2" class="comments-block flex-align-center mr-9">
				<icon-base
					fill="BEC0C5"
					width="13"
					height="13"
					viewBox="0 0 13 13"
					icon-name="clocks">
					<icon-clocks></icon-clocks>
				</icon-base>

				<span class="ml-6">
					<time-trans :time="poll.end_date"></time-trans>
				</span>
			</div>

			<div v-if="poll.type_of_poll === 2" class="comments-block flex-align-center">
				<icon-base
					fill="BEC0C5"
					width="13"
					height="15"
					viewBox="0 0 13 15"
					icon-name="bag">
					<icon-bag></icon-bag>
				</icon-base>

				<span class="ml-6">{{poll.fund}}</span>
			</div>

		</div>

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
	import IconBase from "../icons/IconBase";
	import IconCheck from "../icons/IconCheck";
	import IconBaloon from "../icons/IconBaloon";
	import IconClocks from "../icons/IconClocks";
	import IconBag from "../icons/IconBag";
	import TimeTrans from "../timeTrans";


	export default {
        name: "layout",
        props:['item'],
		components: {
			TimeTrans,
			PictureReusable,
			BadgeReusable,
			OptionsSection,
			explainSection,
			postHeader,
			headlineBody,
			IconBase,
			IconCheck,
			IconBaloon,
			IconClocks,
			IconBag
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
            }),


            // POLL GETTER

            poll: function () {
                let {item, polls} = this;

                return polls[item.id];

            },
            // USER GETTER

            author: function () {

                let {poll, users} = this;

                return users[poll.author_id];
            },
            // OPTION GETTER
			//
			// accessCheck() {
			// 	switch (true) {
			// 		case author
			// 	}
			// },

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
