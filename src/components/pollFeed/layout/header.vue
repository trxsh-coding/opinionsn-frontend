<template>
    <div id="poll-header">
        <author-headline :img="publicPath + imageUtil(author.path_to_avatar, 'S')" :size="36" textLayout="right" bor-rad="50%">
            <template #title>
                <span class="username">
                    {{author.username}}
                </span>
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
        <poll-annotation :poll="poll"/>

    </div>
</template>

<script>
    import authorHeadline from '../../reusableСomponents/PictureReusable'
    import langString from '../../langString'
    import imageMixin from "../../mixins/imageMixin";
    import pollAnnotation from "./pollAnnotation"
    import timeTrans from "../../timeTrans"
    export default {
        name: "postHeader",
        props:['author', 'poll'],
        mixins:[imageMixin],
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
        margin-left: 16%;
    }
</style>
