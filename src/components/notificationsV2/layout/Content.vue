<template>
    <div class="notification-content-block">
        <RePicture  v-if="picture" :url="picture | addAssetsPath" width="57" height="36" class="br-3 mr-9 pointer" @click.native="RedirectToContent"/>
        <ReYoutube v-else="contentLink" thumbnail width="57" height="36"  class="pointer" :link="contentLink" @click.native="RedirectToContent"/>
        <div class="subject-block flex-column">
            <span class="content-text pointer" @click="RedirectToContent">
                {{initiator.subject}}
            </span>
            <time-trans :time="date" transformedTime class="content-time"/>
        </div>
    </div>
</template>

<script>
    import RePicture from "../../reusableСomponents/RePicture";
    import TimeTrans from "../../timeTrans";
    import ReYoutube from "../../reusableСomponents/reYoutube";
    export default {
        name: "notificationContent",
        components: {ReYoutube, TimeTrans, RePicture},
        props: ['initiator', 'date'],
        computed: {
            picture(){
                return this.initiator.picture
            },
            contentLink(){
                return this.initiator.contentLink

            }
        },
        methods: {
            RedirectToContent(){
                this.$router.push({name: 'singlePoll', params: {id: this.initiator.id}})
            }
        }
    }
</script>

<style lang="scss">
    .notification-content-block {
        display: flex;

        .content-text  {
            font-size: 13px;
            font-weight: bold;
        }
        .content-time {
            margin-top: 4px;
            font-size: 9px;
            color: #8E8E93;

        }
    }
</style>
