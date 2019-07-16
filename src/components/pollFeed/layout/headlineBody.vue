<template>
    <div id="headline-body" class="ml-60">
        <div class="tags__item mb-4">
			{{poll.tags}}
        </div>
        <div class="subject__item">
            <span>
                {{poll.subject}}
            </span>

        </div>
        <div class="description__item mb-7">
            <text-trim :text="poll.description"  :amount-of-letter="mobile ? '150' : '250'"/>
        </div>
        <subject-picture v-if="poll.picture" :img="publicPath + poll.picture" :width="mobile ? '295' : '471'" :height="mobile ? '190' : '303'" textLayout="right" bor-rad="6"/>
        <bows-panel class="mt-9" :users="poll.bows" v-show="!item.voted && Object.keys(poll.bows).length > 0" />

    </div>
</template>


<script>
    import subjectPicture from '../../reusableСomponents/PictureReusable'
    import bowsPanel from './involvedUsersPanel'
    import TextTrim from "../../reusableСomponents/textTrim";

    export default {
        name: "headlineBody",
        props:['poll', 'item'],
        data() {
            return {

                publicPath: process.env.VUE_APP_MAIN_API,
                mobile: this.$root.mobile

            }
        },
        components: {
            TextTrim,
            subjectPicture,
            bowsPanel
        }
    }
</script>

<style lang="scss">
    #headline-body {

        .subject__item {
            span {

                font-family: Roboto;
                font-style: normal;
                font-weight: 500;
                font-size: 15px;
                color: #1A1E22;


            }
        }
        .tags__item {

			font-family: Roboto;
			font-style: normal;
			font-weight: normal;
			font-size: 12px;
			color: #4B97B4;

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
        @media only screen
        and (min-width: 300px)
        and (max-width: 765px){

            .description__item {

                span {

                    font-family: Roboto;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 13px;
                    line-height: 16px;
                    color: #1A1E22;

                }



            }

        }

    }
</style>
