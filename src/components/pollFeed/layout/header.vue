<template>
    <div id="poll-header" class="mb-4">
        <div class="top-section">
            <author-headline
                    pic-class="mr-9"
                    class="mb-12 ml-60 pointer"
                    avatar
                    :id="author.id"
                    :img="publicPath + imageUtil(author.path_to_avatar, 'S')"
                    :size="36"
                    textLayout="right"
                    rounded>
                <template #title>
                <span class="username">
                    {{author.username}}
                </span>
                    <span class="event__item">
                      <lang-string :title="user_caption" />
                </span>
                    <slot>

                    </slot>

                </template>
                <template #description>
                    <div class="description flex">
                    <span v-show="!!author.location" class="pr-9">
                        {{author.location}}
                    </span>
                        <time-trans v-show="!!poll.date" :time="poll.date"/>
                    </div>
                </template>
            </author-headline>
            <div class="info-block">
                <dropdown-list-reusable list-class="w-fit">
                    <template #icon>
                        <icon-base
                                width="13"
                                height="4"
                                viewBox="0 0 13 4"
                                icon-name="icon-more">
                            <icon-more />
                        </icon-base>

                    </template>
                    <template #items>
                            <span class="dropdown-actions pointer"  @click="deletePoll(poll.id)">Удалить опрос</span>
                    </template>
                </dropdown-list-reusable>


            </div>
        </div>
        <slot name="annotation"></slot>

    </div>
</template>

<script>
    import authorHeadline from '../../reusableСomponents/PictureReusable'
    import langString from '../../langString'
    import imageMixin from "../../mixins/imageMixin";
    import pollAnnotation from "./pollAnnotation"
    import timeTrans from "../../timeTrans"
    import langMixin from "../../mixins/langMixin";
    import IconBase from "../../icons/IconBase";
    import IconMore from "../../icons/IconMore";
    import DropdownListReusable from "../../reusableСomponents/DropdownListReusable";

    export default {
        name: "postHeader",
        props:['author', 'poll', 'eventType'],
        mixins:[imageMixin, langMixin],
        components: {
            DropdownListReusable,
            IconBase,
            authorHeadline,
            langString,
            pollAnnotation,
            timeTrans,
            IconMore
        },
        data() {
            return {
                publicPath: process.env.VUE_APP_MAIN_API
            }
        },
        computed: {
            user_caption() {
                let { eventType } = this,
                    { type_of_poll } = this.poll;

                if (eventType) {
                    switch (eventType) {
                        case 'POLL_CREATED':
                            return "created_a_poll";
                        case 'VOTED_AND_EXPLAINED':
                            return "voted_and_commented";
                        case 'VOTED':
                            return "voted";
                        case 'EXPLAINED':
                            return "explained";
                        default:
                            return ""
                    }
                } else {
                    switch (type_of_poll) {
                        case 0:
                            return "created_a_poll";
                        case 1:
                            return "created_a_prediction";
                        default:
                            return ""
                    }
                }
            }
        },
        methods: {
            deletePoll(poll_id){

                this.$store.dispatch(`pollFeed/deletePoll`, poll_id );

            }
        }
    }
</script>

<style lang="scss">
    #poll-header {
        .top-section {
            display: flex;
            justify-content: space-between;
        }
        .event__item {

            font-family: Roboto;
            font-style: normal;
            font-weight: normal;
            font-size: 13px;
            color: #1A1E22;
            text-transform: lowercase;

        }
    }
</style>
