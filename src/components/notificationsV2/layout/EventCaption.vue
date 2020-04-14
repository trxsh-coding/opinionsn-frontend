<template>
    <div class="notification-header-block flex-align-center">
        <RePicture :url="author.pathToAvatar | addAssetsPath" size="28" class="caption-avatar pointer" rounded @click.native="RedirectToAuthor"/>
        <span class="bold-caption-13 pr-3 pointer" @click="RedirectToAuthor">{{author.username }}</span>
        <span class="caption">{{eventCaption.toLowerCase()}}</span>

    </div>
</template>

<script>
    import RePicture from '../../reusableСomponents/RePicture'
    import translateKeywordMixin from "../../mixins/translateKeywordMixin";
    export default {
        name: "NotificationEventCaption",
        props:['eventType', 'author'],
        components: {
            RePicture
        },
        mixins: [translateKeywordMixin],
        computed: {
            eventCaption(){
                switch (this.eventType) {
                    case 'SUBSCRIBE':
                        return this.translateKeyword('followed_you');
                    case 'LEADER_CREATED_POLL':
                        return this.translateKeyword('created_poll');
                    case 'LEADER_VOTED':
                        return this.translateKeyword('participated_in_question');
                    case 'USER_GUESSED':
                        return this.translateKeyword('you_guessed_in_prediction');
                    case 'POLL_EXPIRED':
                        return this.translateKeyword('prediction_has_expired');
                    case 'LEADER_CREATED_PREDICTION':
                        return this.translateKeyword('follower_created_prediction');
                    default :
                        return this.eventType
                }

            }
        },
        methods: {
           RedirectToAuthor(){
               this.$router.push({name:'user',params:{id:this.author.id}})
           }

        }
    }
</script>

<style lang="scss">
 .notification-header-block {
     margin-bottom: 5px;
    .caption-avatar {
        margin-right: 10px;
    };
    .bold {
     font-weight: bold;
    };
    .caption {
     font-size: 13px;
    };
 }
</style>
