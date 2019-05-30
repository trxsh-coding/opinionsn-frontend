<template>
    <div class="content-wrapper" id="poll-block">
        <div class="content-block relative" :class="{padding : poll.picture}">
            <bookmark :poll="poll" :item="item"></bookmark>

            <div class="picture-block" :class="{searchBlock: searchBlock}" :style="{ 'background-image': 'url(' + publicPath + poll.picture + ')' } " v-if="poll.picture">
            </div>
            <div class="text-block">
                <div class="link-div flex  pointer" @click="pollLink(poll.id)">
                    <div class="description-block wb" :class="{order_3: searchBlock, searchBlock: searchBlock}">
                        {{poll.subject}}
                    </div>
                    <div v-if="author" class="author-block" :class="{order_1: searchBlock}">
                        <div class="author-avatar" :style="{ 'background-image': 'url(' + publicPath +author.path_to_avatar + ')' } " @click="userLink(author.id)"></div>
                        <span class="span__item" :class="{searchBlock: searchBlock}" >{{author.username}}</span>
                    </div>
                    <slot name="subject_header">
                        <div class="topic">
                            <span>{{poll.subject_header}}</span>
                        </div>
                    </slot>
					<slot name="tags"/>

                </div>
                <icon-block class="relative" :poll="poll" :item="item">
                <div slot="icon-comments">
                </div>
                <div slot="bookmark">
                </div>
            </icon-block>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import { mapState } from 'vuex';
    import IconBlock from '../../icons/IconBlock'
    import bookmark from '../../icons/bookmark'
    import langString from './../../langString.vue'

    export default {
        data(){

            return {

                publicPath: process.env.VUE_APP_MAIN_API


            }

        },
        name: "PollBlock",
        props: ['poll', 'author', 'item', 'searchBlock'],
        computed: {

            ...mapState('globalStore', {

                userMap: ({users}) => users,


            }),

            ...mapState('lang',{
                _lang : state => {return state.locale.langSelector}
            }),


            author(){
                let {userMap, poll} = this;
                return this.userMap[this.poll.author_id]

            },

            relativeEndDate(){
                //console.log('Getter is called');
                let {poll, _lang} = this;
                let {end_date} = poll;
                moment.locale(_lang);

                let relTime = moment(end_date).fromNow();

                return relTime;
            },


        },
        components: {
            langString,
            IconBlock,
            bookmark

        },
        methods: {

            pollLink(id){
                this.$router.push({name:'singlePoll',params:{id:id}})

            },

            userLink(userId) {
                this.$router.push({name:'user',params:{id:userId}})
            },
        }
    }

</script>

<style lang="scss" scoped>
    #poll-block {

        .content-block {
            padding: 15px 12px 12px 15px;
            background: #FFFFFF;
            border-radius: 12px;
            display: flex;
	            .bookmark-block {

                position: absolute;
                top: 0;
                right: 18px;

            }
            .topic {
                margin-bottom: 12px;
                span {
                    background: #A1ABB0;
                    border-radius: 15px;
                    padding: 2px 9px;
                    color: #ffffff;
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: 300;
                    line-height: 14px;
                    font-size: 12px;
                    letter-spacing: -0.1px;
                    color: #FFFFFF;

                }
            }

            .text-block {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 100%;

                .link-div {

                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                }

				.hashtags {
					font-family: Roboto;
					font-style: normal;
					font-weight: 300;
					font-size: 12px;
					line-height: 14px;
					color: #4B97B4;

					overflow: hidden;
					order: 2;

					max-height: 28px;
					margin-bottom: 3px;
				}

            }

            .picture-block {
                flex-shrink: 0;
                background-repeat: no-repeat;
                background-size: cover !important;
                background-position: center;
                background-size: 50% 50%;
                margin-right: 12px;
                border-radius: 6px

            }

            .icon-block {
                display: flex;
                svg {
                    margin-right: 5px;
                }
                span {
                    padding-right: 15px;
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: normal;
                    line-height: 20px;
                    font-size: 12px;
                    letter-spacing: -0.2px;
                    color: #6D7D85;
                }
            }

        }

        .padding {

            padding: 12px !important;

        }
        .author-avatar {
            width: 21px;
            height: 21px;
            border-radius: 1000px;
            background-size: 50% 50%;
            background-repeat: no-repeat;
            background-size: cover;
            margin-right: 7px;
        }
        .author-block {
            display: flex;
            align-items: center;
            margin-bottom: 9px;

			order: unset;

			&.order_1 {
				order: 1;
			}

            span {
                font-family: Roboto;
                font-style: normal;
                font-weight: 500;
                line-height: 12px;
                font-size: 13px;
                color: #738189;

            }
        }
        .tags-block {
            margin: 7px 0  4px 0;
            margin-bottom: 5px;
            span {
                font-family: Roboto;
                font-style: normal;
                font-weight: 300;
                line-height: 12px;
                font-size: 12px;
                letter-spacing: -0.2px;
                color: #2861CD;
            }
        }
        .description-block {
            max-height: 54px;
            margin-bottom: 9px;
            overflow-y: hidden;
            font-family: Roboto;
            font-style: normal;
            font-weight: 500;
            font-size: 15px;
            letter-spacing: -0.1px;
            color: #152D3A;

			order: unset;

			&.order_3 {
				order: 3;
			}

			&.searchBlock {
				overflow: hidden;
				max-height: 15px;
			}

            span {
                font-family: Roboto;
                font-style: normal;
                font-weight: 500;
                line-height: 19px;
                font-size: 16px;
                letter-spacing: -0.1px;
                color: #152D3A;
            }
        }



        .display {
            display: inline !important;
            margin-right: 5px;
        }
        .icon-accept {
            display: none;
            span {
                font-family: Roboto;
                font-style: normal;
                font-weight: normal;
                line-height: 12px;
                font-size: 12px;
                letter-spacing: -0.2px;
                color: #828D92;
                padding: 0 14px 0 6px;
            }
        }

        .options-block {
            padding: 9px 46px 9px 9px;
            border-radius: 0 0 6px 6px;
            display: flex;
            align-items: flex-end;

            .main-option {
                background:#4B97B4 !important ;
            }



            .options {
                margin: 0;
                flex-direction: column;
            }
            .extra {
                background: #D0D5D9;
                min-height: 32px;
                padding: 6px 7px;
                line-height: 20px;
                display: flex;
                align-items: center;
                border-radius: 6px;
            }
            .extra-long {
                max-height: 80px;
                margin-left: 0px;
            }
            .option {
                background: #C4CCD0;
                min-height: 32px;
                display: flex;
                padding: 6px 7px;
                border-radius: 6px;
                margin-right: 6px;
                color: #D0D5D9 !important;
                list-style: none;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                max-width: 137px;
                path {
                    fill: #ffffff;
                }


                .text-block {
                    flex-shrink: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;

                    min-height: 30px;
                }



            }
            .picture-with-options {
                border-radius: 6px 6px 0 0;
                min-height: 112px;
                max-width: 151px;
                background-repeat: no-repeat;
                background-size: cover !important;
                background-position: center;
                filter: grayscale(100%);
            }
            .picture-option {
                width: 160px;
                border-radius: 0px 0px 6px 6px;
            }
            span {
                font-family: Roboto;
                font-style: normal;
                font-weight: normal;
                line-height: 15px;
                font-size: 14px;
                letter-spacing: -0.1px;
                color: #ffffff;
            }
            .is-voted {
                font-family: Roboto;
                font-style: normal;
                font-weight: 500;
                line-height: 18px;
                font-size: 14px;
                letter-spacing: -0.1px;
                color: #ffffff;
                filter: none;
            }
        }

        @media only screen and (max-device-width : 700px) {

            .content-block {

                .bookmark-block {

                    position: absolute;
                    right: 18px;

                }

            }



            .author-block {

                .author-avatar {

                    height: 15px;
                    width: 15px;

                }
                .span__item {

                    font-size: 11px;

					&.searchBlock {
						font-family: Roboto;
						font-style: normal;
						font-weight: 500;
						font-size: 13px;
						line-height: 13px;
						color: #152D3A;
					}

                }

            }

            .description-block {

                font-size: 13px;
                max-height: 48px;
            }

            .description-block, .author-block, .topic {

                margin-bottom: 5px !important;

            }


            .picture-block {

                height: 111px !important;
                width: 111px !important;

				&.searchBlock {
					height: 90px !important;
					width: 90px !important;
				}

            }

        }

    }
</style>
