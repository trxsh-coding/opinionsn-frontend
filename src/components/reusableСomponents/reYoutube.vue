<template>
    <div class="player-block" :style="{width: width, height: height}">
        <youtube :video-id="videoId" fit-parent="true" resize="true" :height="height" :width="width"/>
    </div>
</template>

<script>
    export default {
        name: "reYoutube",
        props:{
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
            }
        },
        methods: {
            getId () {
                this.video_id = this.$youtube.getIdFromUrl(this.link)
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