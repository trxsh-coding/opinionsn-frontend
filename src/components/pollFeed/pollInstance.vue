<template>
    <div
            id="main-feed-layout"
            class="pt-12"
            :class="{'pr-20': mobile, 'pr-12': !mobile}">
        <post-header top-section-class="ml-60" :author="author" :poll="poll" :eventType="item.eventType">
            <template #annotation>
                <poll-anotation :poll="poll"/>
            </template>
        </post-header>
        <headline-body :poll="poll" :item="item"/>
            <re-option
                    class="mt-12"
                    v-for="(option, index) in combined_options"
                    v-bind="{payload: item, poll, option}"
                    v-show="options_visible || index < 5"
                    :disabled="combined_options.length > 5 && !options_visible"
                    @click.native="options_visible = true"
                    @onPictureClick="!$root.timer_id && pushToPopup(index)"
            >
                <template #default>
                    {{option.description}}
                </template>

                <template #badge>
                    <re-badge :counter="Object.keys(option.bows).length - 1" :size="21"></re-badge>
                </template>
                
            </re-option>

        <span v-if="!options_visible && combined_options.length > 5" class="options-load-btn pointer mt-9"
              @click="options_visible = true">Показать больше опций</span>

        <div class="counter-badges flex pl-60 my-12">

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

            <div v-if="poll.type_of_poll === 1 || poll.type_of_poll === 2"
                 class="comments-block flex-align-center mr-9">
                <icon-base
                        fill="BEC0C5"
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        icon-name="clocks">
                    <icon-clocks></icon-clocks>
                </icon-base>

                <span class="ml-6">
                    {{poll.votingOver ? lstr('end') : currentTime}}
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

        <Explanation
                v-for="(explain, index) in combinedVotes"
                v-show="index < explains_quantity"
                :explain="explain"
                :poll-id="poll.id"
                :poll-type="poll.type_of_poll"
                :author_picture="publicPath + author.path_to_avatar"
                :comments="comments"
                :options="options"
                :users="users"/>

        <span v-show="voted && !no_more_explains && combinedVotes.length > 5" class="explains-load-btn pointer my-9"
              @click="loadMoreExplains">Загрузить ещё...</span>

    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import postHeader from './layout/header'
    import headlineBody from './layout/headlineBody'
    import Explanation from "../reusableСomponents/Explanation";
    import ReOption from "../reusableСomponents/ReOption";
    import PictureReusable from "../reusableСomponents/PictureReusable";
    import IconBase from "../icons/IconBase";
    import IconCheck from "../icons/IconCheck";
    import IconBaloon from "../icons/IconBaloon";
    import IconClocks from "../icons/IconClocks";
    import IconBag from "../icons/IconBag";
    import TimeTrans from "../timeTrans";
    import PollAnotation from "./layout/pollAnnotation";
    import moment from 'moment'
    import {localString} from '../../utils/localString'
    import {finishEvent} from "../../EOSIO/eosio_impl";
    import {addCourt, addjudge} from "../../EOSIO/eosio_impl";
    import ReBadge from "@/components/reusableСomponents/ReBadge";
    import langString from "@/components/langString";

    const pad = (num, len = 2, char = '0') => {
        let init = `${num}`;

        while (init.length < (len * char.length)) {
            init = `${char}${init}`
        }

        return init;
    };

    export default {
        name: "layout",
        props: ['item'],
        mixins: [langString],
        components: {
            ReBadge,
            PollAnotation,
            TimeTrans,
            PictureReusable,
            ReOption,
            Explanation,
            postHeader,
            headlineBody,
            IconBase,
            IconCheck,
            IconBaloon,
            IconClocks,
            IconBag
        },
        data() {
            return {
                publicPath: process.env.VUE_APP_ASSETS,
                options_visible: false,
                explain_page: 1,
                EXPLAINS_LIMIT: 5,
                explains_quantity: 5,
                no_more_explains: false,
                currentTime: null,
                procid: null,
                showModal:false,
                currentPicture:null,
                currentDescription:null
            }
        },
        computed: {

            ...mapState('globalStore', {
                votes: ({votes}) => votes,
                polls: ({polls}) => polls,
                users: ({users}) => users,
                options: ({options}) => options,
                comments: ({comments}) => comments,
                mainUser: ({mainUser}) => mainUser,
            }),

            ...mapState('pollFeed', {
                loading: ({loading}) => loading
            }),

            ...mapState('lang', {

                _lang: state => {
                    return state.locale._lang
                },
                lang: state => state.locale

            }),

            mobile() {
                return this.$root.mobile;
            },

            lstr() {
                return (str) => localString(this.lang, str);
            },
	        
            relativeEndDate() {
                let {poll, _lang} = this;
                let {end_date} = poll;
                moment.locale(_lang);
	            return moment.utc(end_date);
            },
            
            poll() {
                let {item, polls} = this;

                return polls[item.id];

            },

            author() {

                let {poll, users} = this;

                return users[poll.author_id];
            },

            combined_options() {
                return this.poll.options_id.map(option_id => {
                    return this.options[option_id]
                });
            },
    
            // options_pictures_with(){
            //    return this.combined_options.map(({picture}) => picture)
            // },


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
        methods: {
    
            pushToPopup(index = 0) {
                let pics = this.combined_options.map(({picture, description}) => ({picture, description}));
                pics = [...pics.splice(index, 1), ...pics];
                this.$popup.insert('pictures', pics);
            },
            
            openModal(payload) {
                console.log(payload);
                this.showModal = payload;
            },
            
            getTime() {
                let end = this.relativeEndDate;
                let now = moment(new Date());
                let duration = moment.duration(end.diff(now));

                if (duration.asDays() > 1) {
                    this.currentTime = `${Math.floor(duration.asDays())} ${this.lstr('days')}`;
                } else if (duration > 1 && duration.asHours() < 24) {
                    this.currentTime = `${pad(duration.hours())}:${pad(duration.minutes())}:${pad(duration.seconds())}`;
                }
                else {
                    this.currentTime = this.lstr('end')
                }

                return this.currentTime;
            },
            loadMoreExplains() {

                let {
                    explain_page,
                    EXPLAINS_LIMIT,
                    poll,
                    no_more_explains,
                    explains_quantity
                } = this;

                if (!no_more_explains) {

                    this.$store.dispatch(`pollFeed/loadExplains`, {poll_id: poll.id, explain_page})
                        .then(() => {
                            this.explain_page += 1;
                            if (explains_quantity > this.poll.total_amount_of_votes) {
                                this.no_more_explains = true;
                            } else {
                                this.explains_quantity += EXPLAINS_LIMIT;
                            }
                        });

                }

            }

        },
        mounted() {
            if (!this.poll.votingOver) {
                this.procid = setInterval(() => {
                    this.getTime()
                }, 1 * 1000);
            }
        },
        beforeDestroy() {
            clearInterval(this.procid);
        },

    }
</script>

<style lang="scss">

    #main-feed-layout {
        background: #FFFFFF;
        border-radius: 6px 6px 0 0;
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: column;

        .option-reusable, #headline-body, .poll-header {
            /*padding-left: 10%;*/
        }

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

        .explains-load-btn,
        .options-load-btn {
            font-family: Helvetica Neue, Roboto;
            font-size: 10px;
            color: #BEC0C5;
            margin: 0 auto;
        }
    }

</style>
