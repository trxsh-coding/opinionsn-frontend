<template>
    <div id="poll-header" class="mb-3">
        <author-headline class="mb-9" avatar :id="author.id" :img="publicPath + imageUtil(author.path_to_avatar, 'S')" :size="36" textLayout="right" bor-rad="50%">
            <template #title>
                <span class="username">
                    {{author.username}}
                </span>
                <span class="event__item">
                      <lang-string :title="eventType" />
                </span>
				<slot>

                </slot>

			</template>
            <template #description>
                <div class="description flex">
                    <span class="pr-9">
                    {{author.location}}
                </span>
                    <time-trans  :time="poll.date"/>
                </div>
            </template>
        </author-headline>

    </div>
</template>

<script>
    import authorHeadline from '../../reusableСomponents/PictureReusable'
    import langString from '../../langString'
    import imageMixin from "../../mixins/imageMixin";
    import pollAnnotation from "./pollAnnotation"
    import timeTrans from "../../timeTrans"
    import langMixin from "../../mixins/langMixin";
    export default {
        name: "postHeader",
        props:['author', 'poll', 'eventType'],
        mixins:[imageMixin, langMixin],
        data(){

            return {
                publicPath: process.env.VUE_APP_MAIN_API
            }

        },
        components: {
            authorHeadline,
            langString,
            pollAnnotation,
            timeTrans
        }
    }
</script>

<style lang="scss">
    #poll-header {
        padding-left: 10%;

        .event__item {

            font-family: Roboto;
            font-style: normal;
            font-weight: normal;
            font-size: 13px;
            color: #1A1E22;
            text-transform: lowercase;

        }

        @media only screen
        and (min-width: 300px)
        and (max-width: 765px){
            .picture-reusable {
                margin-left: 16%;
            }
        }
    }
</style>
