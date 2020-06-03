<template>
    <div class="users-recommendations-annotation ">
        <div class="flex-align-center">
            <RePicture :url="item.path_to_avatar | addAssetsPath" size="52" class="caption-avatar pointer mr-9" rounded @click.native="RedirectToAuthor"/>
            <div class="info-block flex-column">
            <span class="info-username">
                {{item.username}}
            </span>
                <span class="info-subject mt-2">{{item.subject}}</span>
                <span class="info-amount mt-3">{{item.amount_of_votes}} мнений</span>
            </div>
        </div>
        <div >
            <subscribe-button :id="item.id" :primary-style="false" :leader="false"/>
        </div>
    </div>
</template>

<script>
    import RePicture from "../../reusableСomponents/RePicture";
    import SubscribeButton from "../../BowsFeed/layout/SubscribeButton";
    export default {
        name: "usersAnnotation",
        components: {SubscribeButton, RePicture},
        props:{
            item:{
                type:Object,
                required:true
            }
        }
    }
</script>

<style lang="scss">
    .users-recommendations-annotation {
        padding: 8px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .subscribe-section {
            border-radius: 4px;
            .subscribe-block {
                margin-right: 0 !important;
            }
            background-color: #4B96B3;
            margin: 0;
            padding: 5px 10px 7px 11px;
            span {
                color:#ffffff;
            }
        }
        .info-username {
            font-weight: 500;
            font-size: 14px;
        }
        .info-subject {
            color: #8E8E93;
            font-size: 12px;
        }
        .info-amount {
            font-size: 10px;
        }
    }
</style>
