<template>
    <div class="player-block" :style="{width: width, height: height}">
        <RePicture :url="thumbnailUrl" :width="width" :height="height" v-if="thumbnail" bor-rad="4" class="br-6 mr-9"/>
        <youtube :video-id="videoId" fit-parent="true" resize="true" :height="height" :width="width" v-else/>
    </div>
</template>

<script>
    import RePicture from "./RePicture";
    export default {
        name: "reYoutube",
        components: {RePicture},
        props:{
            thumbnail: {
              type:Boolean,
              default: false
            },
            link:{
                type:String
            },
            width: {
                type:String,
                default(){
                    return '300'
                }
            },
            height: {
                type:String,
                default() {
                    return "auto";
                }
            }
        },

        data() {
            return {
                video_id:''
            }
        },
        watch:{
            link(val, oldVal){
               if(val !== oldVal){
                   console.log(val);
                   console.log(oldVal);
                   this.$forceUpdate()
               }
            }
        },
        computed: {
            validHost(){
                if(this.link.substring(0, 17) === 'https://youtu.be/') return true
            },
            videoId(){
               return this.$youtube.getIdFromUrl(this.link)
            },
            thumbnailUrl(){
                const id = this.getId();
                return `https://img.youtube.com/vi/${id}/0.jpg`
            }
        },
        methods: {
            getId () {
                this.video_id = this.$youtube.getIdFromUrl(this.link)
                return this.video_id
            }
        }
    }
</script>

<style lang="scss">
    .player-block {
        display: flex;
        justify-content: center;
        iframe {
            width: 100%;
        }
    }
</style>
