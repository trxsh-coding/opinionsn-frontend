<template>
    <div class="opinion-header-section">
        <div class="author-block relative">
            <RePicture :url="author.url | addAssetsPath" class="pointer" rounded size="33" @click.native="RedirectToAuthor(author.id)"/>
            <div class="caption-block ml-9 flex-column">
                <div class="flex-align-start">
                    <span class="bold-caption-13 pr-3 pointer" @click="RedirectToAuthor(author.id)">{{author.username}}</span>
                    <span class="font-13">{{translatedEvent(event)}}</span>
                </div>

                <time-trans :time="timeStamp" transformedTime class="time-caption mt-4"/>
            </div>
            <div class="header-tip">
                <ReTip  @action="setTipId" @close="setTipId" :active="tipId === id" top="107" left="0"/>

            </div>
        </div>
    </div>
</template>

<script>
    import RePicture from "../../reusableСomponents/RePicture";
    import TimeTrans from "../../timeTrans";
    import translateKeywordMixin from "../../mixins/translateKeywordMixin";
    import RedirectMixin from "../../mixins/RedirectMixin";
    import ReTip from "../../reusableСomponents/ReTip";
    import {mapState} from "vuex";
    export default {
        name: "OpinionHeader",
        mixins:[translateKeywordMixin, RedirectMixin],
        components: {ReTip, TimeTrans, RePicture},
        props: {
            url:String,
            event:String,
            author:Object,
            timeStamp:String,
            id:Number,
        },
        computed: {
            ...mapState('OpinionStore', {
                tipId: ({tipId}) => tipId,
            }),
        },
        methods: {
            translatedEvent(event){
                switch (event) {
                    case 'VOTED':
                        return this.translateKeyword('voted');
                    default :
                        return  this.translateKeyword(event.toLowerCase())
                }
            },

            setTipId(){
                this.$store.commit('OpinionStore/setTipId', this.tipId === this.id ? null : this.id )
            }
        }
    }
</script>

<style lang="scss">
    .opinion-header-section {
        align-items: flex-start;

        .header-tip {
            display: flex;
            align-items: center;
            flex: 1;
            justify-content: flex-end;
            .tip-icon {
                flex: 0;
                display: flex;
                justify-content: flex-end;
            }
        }
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
