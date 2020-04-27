<template>
    <div class="opinion-header-section">
        <div class="author-block">
            <RePicture :url="author.url | addAssetsPath" class="pointer" rounded size="33" @click.native="RedirectToAuthor(author.id)"/>
            <div class="caption-block ml-9 flex-column">
                <div class="flex-align-start">
                    <span class="bold-caption-13 pr-3 pointer" @click="RedirectToAuthor(author.id)">{{author.username}}</span>
                    <span class="font-13">{{translatedEvent(event)}}</span>
                </div>

                <time-trans :time="timeStamp" transformedTime class="time-caption mt-4"/>
            </div>
            <div>

            </div>
        </div>
    </div>
</template>

<script>
    import RePicture from "../../reusableСomponents/RePicture";
    import TimeTrans from "../../timeTrans";
    import translateKeywordMixin from "../../mixins/translateKeywordMixin";
    import RedirectMixin from "../../mixins/RedirectMixin";
    export default {
        name: "OpinionHeader",
        mixins:[translateKeywordMixin, RedirectMixin],
        components: {TimeTrans, RePicture},
        props: {
            url:String,
            event:String,
            author:Object,
            timeStamp:String,
        },
        computed: {

        },
        methods: {
            translatedEvent(event){
                switch (event) {
                    case 'VOTED':
                        return this.translateKeyword('voted');
                    default :
                        return  this.translateKeyword(event.toLowerCase())
                }
            }
        }
    }
</script>

<style lang="scss">
    .opinion-header-section {
        align-items: flex-start;
        .author-block {
            display:flex;
            flex-direction: row;
            height: 100%;
            .caption-block {
                justify-content: space-evenly;
            }
            .username-caption {
                font-weight: bold;
                font-size: 13px;
            }
            .time-caption {
                font-weight: 500;
                font-size: 9px;
                color: #8E8E93;
            }
        }
    }
</style>
