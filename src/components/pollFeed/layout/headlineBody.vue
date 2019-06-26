<template>
    <div id="headline-body">
        <div class="tags__item">
        </div>
        <div class="subject__item">
            <span>
                {{poll.subject}}
            </span>

        </div>
        <div class="description__item">
            <span>
                {{poll.description}}
            </span>
        </div>
        <subject-picture :img="publicPath + poll.picture" :width="295" :height="190" textLayout="right" bor-rad="6"/>
        <bows-panel class="mt-3 mb-6" :users="poll.bows" v-show="!item.voted && Object.keys(poll.bows).length > 0" />

    </div>
</template>

<script>
    import subjectPicture from '../../reusableСomponents/PictureReusable'
    import bowsPanel from './involvedUsersPanel'

    export default {
        name: "headlineBody",
        props:['poll', 'item'],
        data() {
            return {

                publicPath: process.env.VUE_APP_MAIN_API

            }
        },
        components: {
            subjectPicture,
            bowsPanel
        }
    }
</script>

<style lang="scss">
    #headline-body {
        margin-left: 16%;
        .tags__item {

            span {
                font-family: Roboto;
                font-style: normal;
                font-weight: 500;
                font-size: 15px;
                display: flex;
                align-items: center;
                color: #1A1E22;
            }

        }
        .description__item {

           span {
               font-family: Roboto,serif;
               font-style: normal;
               font-weight: normal;
               font-size: 13px;
               color: #1A1E22;
           }

        }

    }
</style>
