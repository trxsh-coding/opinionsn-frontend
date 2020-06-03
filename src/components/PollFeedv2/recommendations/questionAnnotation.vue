<template>
    <div>
        <transition name="fade">
            <div class="recommendation-annotation relative" @click="RedirectToContent(item.id)" :style="wrapperStyle" v-if="visible">
                <div class="header-block flex-align-center">
                    <RePicture  :url="item.path_to_avatar | addAssetsPath" size="32" class=" recom-picture flex pointer mr-8" rounded/>
                    <div class="user-info-block">
                        <span class=" font-13">{{item.username}}</span>
                        <time-trans :time="item.date" transformedTime class="content-time font-11"/>
                    </div>
                </div>
                <div class="recom-content-block">
                    <span class="subject-span">{{item.subject}}</span>

                </div>
                <div class="overlay"></div>

            </div>

        </transition>

    </div>
</template>

<script>
    import RePicture from "../../reusableСomponents/RePicture";
    import TimeTrans from "../../timeTrans";
    import RedirectMixin from "../../mixins/RedirectMixin";
    import YoutubeLinkMixin from "../../mixins/YoutubeLinkMixin";
    export default {
        name: "recommendation-annotation",
        components: {TimeTrans, RePicture},
        mixins:[RedirectMixin, YoutubeLinkMixin],
        data(){
            return {
                visible:false
            }
        },
        props: {
            item:{
                type:Object,
                required:true
            }
        },
        computed: {
            link(){
              return this.item.youtube_link
            },
            wrapperStyle(){
                const {picture} = this.item;
                const url = picture ? process.env.VUE_APP_ASSETS + picture : this.thumbnailUrl;
                return {
                    backgroundImage:`url('${url }')`,
                    backgroundSize:'cover'
                }
            }
        },
        methods: {
            setVisible(){
                this.visible = true
            }
        },
        mounted() {
            setTimeout( () => this.setVisible(), 500)
        }
    }
</script>

<style lang="scss">
 .fade-enter-active, .fade-leave-active {
     transition: opacity .5s;
 }
 .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
     opacity: 0;
 }
 .recommendation-annotation{
     overflow: hidden;
     min-width: 225px;
     height: 148px;
     padding: 14px;
     background-color: #8E8E93;
     margin-right: 7px;
     border-radius: 8px;
     .recom-picture {
         img {
             z-index: 10;
         }
     }
     .subject-span {
         display: flex;
         margin-top: 9px;
         z-index: 100;
         color: #ffffff;
         font-size: 12px;
     }
     .recom-content-block {
         z-index: 10;
         display: flex;
         span {
             z-index: 10;
         }
     }
     .header-block {
         .user-info-block {
             z-index: 10;

             span {
                 color:#ffffff;
                 z-index: 10;
             }
         }

     }
     .content-block {
         margin-top: 9px;
         z-index: 10;
         .content-span {
             z-index: 10;
             span {
                 z-index: 10;
                 color: #ffffff;
                 font-size: 12px;
             }
         }

     }
     .overlay {
         overflow: hidden;
         position: absolute;
         width: 100%;
         height: 100%;
         opacity: 0.4;
         background-color: #000000;
         top:0;
         left: 0;
         z-index: 1 !important;
     }
 }
</style>
