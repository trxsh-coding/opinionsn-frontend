<template>
    <div class="opinion-subject-content flex-align-center">
        <div class="picture-block" v-if="url">
            <RePicture

                    @click.native="RedirectToContent"
                    class="mr-10 pointer"
                    :url="url | addAssetsPath"
                    :width="mobile ? 170 : 246"
                    :height="mobile ? 107 : 152"
                    bor-rad="4"
            />
        </div>
        <div class="video-thumbnail-block pointer" v-else="contentLink">
            <ReYoutube thumbnail :width="mobile ? 170 : 246" :height="mobile ? 107 : 152"  class="pointer br-4" :link="contentLink" @click.native="RedirectToContent"/>
        </div>
        <div class="subject-block bold-caption-14">
            <span @click="RedirectToContent" class="pointer">{{poll.subject}}</span>
            <icons-section
                    :votes="poll.total_amount_of_votes"
                    :comments="poll.total_amount_of_comments"
                    :end-date="poll.end_date"
            />
        </div>
    </div>
</template>

<script>
    import RePicture from "../../reusableСomponents/RePicture";
    import {mapState} from "vuex";
    import Amount from "../../iconsV2/Amount";
    import Comments from "../../iconsV2/Comments";
    import IconBase from "../../icons/IconBase";
    import Time from "../../iconsV2/Time";
    import IconsSection from "./iconsSection";
    import ReYoutube from "../../reusableСomponents/reYoutube";
    export default {
        name: "SubjectContent",
        components: {ReYoutube, IconsSection, Time, Comments, IconBase, Amount, RePicture},
        props:{
            id:Number
        },
        computed: {
            ...mapState("globalStore", {
                polls: ({polls}) => polls,
            }),
            url(){
              const {poll} = this;
              return poll.picture || poll.urlPhotos[0]
            },
            mobile() {
                return this.$root.mobile;
            },
            contentLink(){
              return this.poll.content[0].url
            },

            poll(){
                const {polls, id} = this;
                return polls[id]
            },
        },
        methods: {
            RedirectToContent(){
                this.$router.push({name: 'singlePoll', params: {id: this.id}})
            }
        }
    }
</script>

<style lang="scss">

</style>
